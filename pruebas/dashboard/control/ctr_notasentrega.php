<?php
// Esta ruta debe pasar por dashboard/index.php para aplicar expiración de sesión.
if (isset($_SERVER['SCRIPT_FILENAME'])
    && realpath($_SERVER['SCRIPT_FILENAME']) === realpath(__FILE__)) {
    http_response_code(404);
    exit;
}

require_once __DIR__ . '/../model/m_notasentrega.php';

function ne_responder($estado, array $cuerpo)
{
    http_response_code($estado);
    header('Content-Type: application/json; charset=UTF-8');
    header('Cache-Control: no-store');
    header('X-Content-Type-Options: nosniff');
    $json = json_encode($cuerpo, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    echo $json === false
        ? '{"succed":false,"error":{"codigo":"respuesta_invalida","mensaje":"No se pudo preparar la respuesta."}}'
        : $json;
    exit;
}

function ne_error($codigo, $mensaje, $estado)
{
    throw new NotaEntregaReglaException($codigo, $mensaje, $estado);
}

function ne_entero($valor, $nombre, $minimo, $maximo)
{
    if (is_int($valor)) {
        $entero = $valor;
    } elseif (is_string($valor)
        && preg_match($minimo < 0 ? '/^-?(0|[1-9][0-9]*)$/D'
            : '/^(0|[1-9][0-9]*)$/D', $valor)
        && strlen($valor) <= ($minimo < 0 ? 11 : 10)) {
        $entero = (int) $valor;
    } else {
        ne_error('dato_invalido', $nombre . ' debe ser un número entero.', 422);
    }

    if ($entero < $minimo || $entero > $maximo) {
        ne_error('dato_invalido', $nombre . ' está fuera de rango.', 422);
    }
    return $entero;
}

function ne_longitud($texto)
{
    // La instalación PHP no requiere mbstring. Esta cuenta coincide con
    // CHAR_LENGTH de MariaDB para cadenas UTF-8 válidas.
    $longitud = preg_match_all('/./us', $texto);
    if ($longitud === false) {
        ne_error('texto_invalido', 'El texto debe estar en UTF-8.', 422);
    }
    return $longitud;
}

function ne_texto($valor, $nombre, $maximo, $obligatorio)
{
    if ($valor === null && !$obligatorio) {
        return null;
    }
    if (!is_string($valor)) {
        ne_error('dato_invalido', $nombre . ' debe ser texto.', 422);
    }
    $texto = trim($valor);
    if ($texto === '') {
        if ($obligatorio) {
            ne_error('dato_invalido', $nombre . ' es obligatorio.', 422);
        }
        return null;
    }
    if (ne_longitud($texto) > $maximo) {
        ne_error('dato_invalido', $nombre . ' supera ' . $maximo . ' caracteres.', 422);
    }
    if (preg_match('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', $texto)) {
        ne_error('texto_invalido', $nombre . ' contiene caracteres no permitidos.', 422);
    }
    return $texto;
}

function ne_sesion()
{
    if (session_status() !== PHP_SESSION_ACTIVE) {
        session_start();
    }
    $codificado = isset($_SESSION['USR']) ? $_SESSION['USR'] : null;
    if (!is_string($codificado)) {
        ne_error('sin_sesion', 'Inicia sesión para continuar.', 401);
    }
    $usuarioTexto = base64_decode($codificado, true);
    if ($usuarioTexto === false) {
        ne_error('sin_sesion', 'Inicia sesión para continuar.', 401);
    }
    try {
        $usuario = ne_entero($usuarioTexto, 'Usuario', 1, 2147483647);
        $sucursal = ne_entero(
            isset($_SESSION['IMPRESA']) ? $_SESSION['IMPRESA'] : null,
            'Sucursal activa',
            0,
            2147483647
        );
    } catch (NotaEntregaReglaException $error) {
        ne_error('sin_sesion', 'Selecciona una sucursal e inicia sesión para continuar.', 401);
    }
    return array($usuario, $sucursal);
}

function ne_token()
{
    if (!isset($_SESSION['notas_entrega_csrf'])) {
        $_SESSION['notas_entrega_csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['notas_entrega_csrf'];
}

function ne_validar_token()
{
    $esperado = isset($_SESSION['notas_entrega_csrf'])
        ? $_SESSION['notas_entrega_csrf'] : '';
    $recibido = isset($_SERVER['HTTP_X_CSRF_TOKEN'])
        ? $_SERVER['HTTP_X_CSRF_TOKEN'] : '';
    if (!is_string($recibido) || $esperado === ''
        || !hash_equals($esperado, $recibido)) {
        ne_error('csrf_invalido', 'Actualiza la página y vuelve a intentar.', 403);
    }
}

function ne_cantidad($valor)
{
    if (!is_string($valor) && !is_int($valor) && !is_float($valor)) {
        ne_error('cantidad_invalida', 'La cantidad debe ser numérica.', 422);
    }
    $cantidad = (string) $valor;
    if (!preg_match('/^[0-9]{1,12}(\.[0-9]{1,2})?$/D', $cantidad)
        || (float) $cantidad <= 0) {
        ne_error(
            'cantidad_invalida',
            'La cantidad debe ser positiva y tener como máximo dos decimales.',
            422
        );
    }
    // Se envía como cadena JSON para conservar exactamente sus decimales.
    return $cantidad;
}

function ne_decimal_factura($valor, $nombre, $maximoDecimales, $permitirNegativo, $maximoEnteros)
{
    if (!is_string($valor) && !is_int($valor) && !is_float($valor)) {
        ne_error('dato_invalido', $nombre . ' debe ser numérico.', 422);
    }
    $texto = trim((string) $valor);
    $signo = $permitirNegativo ? '-?' : '';
    $patron = '/^' . $signo . '(0|[1-9][0-9]{0,' . ($maximoEnteros - 1) . '})'
        . '(\.[0-9]{1,' . $maximoDecimales . '})?$/D';
    if (!preg_match($patron, $texto)) {
        ne_error('dato_invalido', $nombre . ' tiene un formato o precisión inválidos.', 422);
    }
    return $texto;
}

function ne_fecha_filtro($valor, $nombre)
{
    if ($valor === null || $valor === '') {
        return null;
    }
    if (!is_string($valor) || !preg_match('/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/D', $valor)) {
        ne_error('dato_invalido', $nombre . ' debe tener formato AAAA-MM-DD.', 422);
    }
    $fecha = DateTimeImmutable::createFromFormat('!Y-m-d', $valor);
    if ($fecha === false || $fecha->format('Y-m-d') !== $valor) {
        ne_error('dato_invalido', $nombre . ' no es una fecha válida.', 422);
    }
    return $valor;
}

function ne_normalizar_nota(array $datos)
{
    $clienteOriginal = isset($datos['idcliente']) ? $datos['idcliente'] : null;
    // En facturación el cliente contado usa 0; en la nota se guarda NULL.
    $idCliente = ($clienteOriginal === null || $clienteOriginal === ''
        || $clienteOriginal === 0 || $clienteOriginal === '0')
        ? null : ne_entero($clienteOriginal, 'Cliente', 1, 2147483647);

    $nombreCliente = ne_texto(
        isset($datos['nombre_cliente']) ? $datos['nombre_cliente'] : null,
        'Nombre del cliente',
        $idCliente === null ? 64 : 150,
        $idCliente === null
    );
    $cedula = ne_texto(
        isset($datos['cliente_cedula']) ? $datos['cliente_cedula'] : null,
        'Identificación del cliente',
        45,
        false
    );

    $clave = isset($datos['clave_operacion']) ? $datos['clave_operacion'] : null;
    if (!is_string($clave) || !preg_match(
        '/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/D',
        $clave
    )) {
        ne_error('clave_invalida', 'La clave de operación debe ser un UUID.', 422);
    }

    $lineas = isset($datos['lineas']) ? $datos['lineas'] : null;
    if (!is_array($lineas) || count($lineas) < 1 || count($lineas) > 100
        || array_keys($lineas) !== range(0, count($lineas) - 1)) {
        ne_error('detalle_invalido', 'La nota requiere entre 1 y 100 líneas.', 422);
    }

    $normalizadas = array();
    foreach ($lineas as $indice => $linea) {
        if (!is_array($linea)) {
            ne_error('detalle_invalido', 'La línea ' . ($indice + 1) . ' es inválida.', 422);
        }
        $normalizadas[] = array(
            'idproducto' => ne_entero(
                isset($linea['idproducto']) ? $linea['idproducto'] : null,
                'Producto de línea ' . ($indice + 1), 1, 2147483647
            ),
            'idproveedor' => ne_entero(
                isset($linea['idproveedor']) ? $linea['idproveedor'] : null,
                'Proveedor de línea ' . ($indice + 1), 1, 2147483647
            ),
            'idunidad' => ne_entero(
                isset($linea['idunidad']) ? $linea['idunidad'] : null,
                'Unidad de línea ' . ($indice + 1), 1, 127
            ),
            'cantidad' => ne_cantidad(
                isset($linea['cantidad']) ? $linea['cantidad'] : null
            ),
            'observaciones' => ne_texto(
                isset($linea['observaciones']) ? $linea['observaciones'] : null,
                'Observaciones de línea ' . ($indice + 1), 255, false
            )
        );
    }

    return array(
        'idcliente' => $idCliente,
        'nombre_cliente' => $nombreCliente === null ? '' : $nombreCliente,
        'cliente_cedula' => $cedula,
        'clave_operacion' => strtolower($clave),
        'referencia' => ne_texto(
            isset($datos['referencia']) ? $datos['referencia'] : null,
            'Referencia', 55, false
        ),
        'observaciones' => ne_texto(
            isset($datos['observaciones']) ? $datos['observaciones'] : null,
            'Observaciones', 512, false
        ),
        'lineas' => $normalizadas
    );
}

function ne_normalizar_devolucion(array $datos)
{
    $clave = isset($datos['clave_operacion']) ? $datos['clave_operacion'] : null;
    if (!is_string($clave) || !preg_match(
        '/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/D',
        $clave
    )) {
        ne_error('clave_invalida', 'La clave de operación debe ser un UUID.', 422);
    }

    $lineas = isset($datos['lineas']) ? $datos['lineas'] : null;
    if (!is_array($lineas) || count($lineas) < 1 || count($lineas) > 100
        || array_keys($lineas) !== range(0, count($lineas) - 1)) {
        ne_error('detalle_invalido', 'La devolución requiere entre 1 y 100 líneas.', 422);
    }

    $normalizadas = array();
    $idsDetalle = array();
    foreach ($lineas as $indice => $linea) {
        if (!is_array($linea)) {
            ne_error('detalle_invalido', 'La línea ' . ($indice + 1) . ' es inválida.', 422);
        }
        $idDetalle = ne_entero(
            isset($linea['iddetallenota']) ? $linea['iddetallenota'] : null,
            'Línea de nota ' . ($indice + 1), 1, 2147483647
        );
        if (isset($idsDetalle[$idDetalle])) {
            ne_error('detalle_invalido', 'No repitas una línea en la misma devolución.', 422);
        }
        $idsDetalle[$idDetalle] = true;
        $normalizadas[] = array(
            'iddetallenota' => $idDetalle,
            'cantidad_devuelta' => ne_cantidad(
                isset($linea['cantidad_devuelta']) ? $linea['cantidad_devuelta'] : null
            )
        );
    }

    return array(
        'clave_operacion' => strtolower($clave),
        'motivo' => ne_texto(
            isset($datos['motivo']) ? $datos['motivo'] : null,
            'Motivo', 255, false
        ),
        'lineas' => $normalizadas
    );
}

function ne_normalizar_facturacion(array $datos)
{
    $idsNotas = isset($datos['idnotas']) ? $datos['idnotas'] : null;
    if (!is_array($idsNotas) || count($idsNotas) < 1 || count($idsNotas) > 100
        || array_keys($idsNotas) !== range(0, count($idsNotas) - 1)) {
        ne_error('notas_invalidas', 'Selecciona entre 1 y 100 notas.', 422);
    }
    $notasNormalizadas = array();
    foreach ($idsNotas as $indice => $idNota) {
        $id = ne_entero($idNota, 'Nota ' . ($indice + 1), 1, 2147483647);
        if (isset($notasNormalizadas[$id])) {
            ne_error('notas_invalidas', 'No repitas una nota en la factura.', 422);
        }
        $notasNormalizadas[$id] = $id;
    }
    $notasNormalizadas = array_values($notasNormalizadas);

    $cabecera = isset($datos['factura']) ? $datos['factura'] : null;
    if (!is_array($cabecera)) {
        ne_error('factura_invalida', 'Faltan los datos de facturación.', 422);
    }
    $tipoVenta = ne_entero(isset($cabecera['idtipoventa']) ? $cabecera['idtipoventa'] : null,
        'Tipo de comprobante', 1, 10);
    if (!in_array($tipoVenta, array(1, 7, 8, 10), true)) {
        ne_error('factura_invalida', 'El tipo de comprobante no está disponible para notas.', 422);
    }
    $facturaNormalizada = array(
        'idtipoventa' => $tipoVenta,
        'idtipo' => ne_entero(isset($cabecera['idtipo']) ? $cabecera['idtipo'] : null,
            'Tipo de factura', 1, 127),
        'idtipopago' => ne_entero(isset($cabecera['idtipopago']) ? $cabecera['idtipopago'] : null,
            'Forma de pago', 1, 127),
        'plazo' => ne_entero(isset($cabecera['plazo']) ? $cabecera['plazo'] : 0,
            'Plazo', 0, 9999),
        'idmoneda' => ne_entero(isset($cabecera['idmoneda']) ? $cabecera['idmoneda'] : null,
            'Moneda', 1, 127),
        'divisa' => ne_decimal_factura(isset($cabecera['divisa']) ? $cabecera['divisa'] : null,
            'Tipo de cambio', 2, false, 8),
        'oc' => ne_texto(isset($cabecera['oc']) ? $cabecera['oc'] : null, 'Orden de compra', 45, false),
        'comentario' => ne_texto(isset($cabecera['comentario']) ? $cabecera['comentario'] : null,
            'Comentario', 512, false),
        'referencia' => ne_texto(isset($cabecera['referencia']) ? $cabecera['referencia'] : null,
            'Referencia', 55, false),
        'extra' => ne_texto(isset($cabecera['extra']) ? $cabecera['extra'] : null, 'Datos de pago', 200, false),
        'terminal' => ne_entero(isset($cabecera['terminal']) ? $cabecera['terminal'] : 1,
            'Terminal', 1, 99999),
        'actividadreceptor' => ne_texto(
            isset($cabecera['actividadreceptor']) ? $cabecera['actividadreceptor'] : null,
            'Actividad económica del cliente', 10, false
        )
    );
    if ((float) $facturaNormalizada['divisa'] <= 0) {
        ne_error('factura_invalida', 'El tipo de cambio debe ser mayor que cero.', 422);
    }

    $lineas = isset($datos['lineas']) ? $datos['lineas'] : null;
    if (!is_array($lineas) || count($lineas) < 1 || count($lineas) > 1000
        || array_keys($lineas) !== range(0, count($lineas) - 1)) {
        ne_error('detalle_invalido', 'La factura requiere entre 1 y 1000 líneas.', 422);
    }
    $lineasNormalizadas = array();
    $idsDetalle = array();
    foreach ($lineas as $indice => $linea) {
        if (!is_array($linea)) {
            ne_error('detalle_invalido', 'La línea ' . ($indice + 1) . ' es inválida.', 422);
        }
        $idDetalle = ne_entero(
            isset($linea['iddetallenota']) ? $linea['iddetallenota'] : null,
            'Línea de nota ' . ($indice + 1), 1, 2147483647
        );
        if (isset($idsDetalle[$idDetalle])) {
            ne_error('detalle_invalido', 'No repitas una línea en la factura.', 422);
        }
        $idsDetalle[$idDetalle] = true;
        $precio = ne_decimal_factura(isset($linea['precio']) ? $linea['precio'] : null,
            'Precio de línea ' . ($indice + 1), 5, false, 18);
        if ((float) $precio <= 0) {
            ne_error('detalle_invalido', 'El precio de cada línea debe ser mayor que cero.', 422);
        }
        $lineasNormalizadas[] = array(
            'iddetallenota' => $idDetalle,
            'precio' => $precio,
            'descuento' => ne_decimal_factura(isset($linea['descuento']) ? $linea['descuento'] : '0',
                'Descuento de línea ' . ($indice + 1), 5, false, 18),
            'costo' => ne_decimal_factura(isset($linea['costo']) ? $linea['costo'] : '0',
                'Costo de línea ' . ($indice + 1), 5, true, 18),
            'imv' => ne_decimal_factura(isset($linea['imv']) ? $linea['imv'] : '0',
                'Impuesto de línea ' . ($indice + 1), 5, false, 8),
            'exento' => ne_decimal_factura(isset($linea['exento']) ? $linea['exento'] : '0',
                'Monto exento de línea ' . ($indice + 1), 5, false, 18),
            'exonerado' => ne_decimal_factura(isset($linea['exonerado']) ? $linea['exonerado'] : '0',
                'Monto exonerado de línea ' . ($indice + 1), 5, false, 18),
            'comision' => ne_decimal_factura(isset($linea['comision']) ? $linea['comision'] : '0',
                'Comisión de línea ' . ($indice + 1), 2, false, 3),
            'idexoneracion' => ne_texto(isset($linea['idexoneracion']) ? $linea['idexoneracion'] : null,
                'Exoneración de línea ' . ($indice + 1), 512, false),
            'comodin' => ne_texto(isset($linea['comodin']) ? $linea['comodin'] : null,
                'Detalle adicional de línea ' . ($indice + 1), 512, false),
            'idimpuestos' => ne_texto(isset($linea['idimpuestos']) ? $linea['idimpuestos'] : null,
                'Impuestos de línea ' . ($indice + 1), 255, false),
            'iddescuentos' => ne_texto(isset($linea['iddescuentos']) ? $linea['iddescuentos'] : null,
                'Descuentos de línea ' . ($indice + 1), 255, false)
        );
    }

    return array(
        'idnotas' => $notasNormalizadas,
        'factura' => $facturaNormalizada,
        'lineas' => $lineasNormalizadas
    );
}

try {
    list($idUsuario, $idSucursal) = ne_sesion();
    $modelo = new _notasentrega();
    if (!$modelo->puedeOperar($idUsuario)) {
        ne_responder(403, array(
            'succed' => false,
            'error' => array('codigo' => 'sin_permiso', 'mensaje' => 'No tienes permiso para operar notas de entrega.')
        ));
    }

    $metodo = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : 'GET';
    $accion = isset($_GET['accion']) ? $_GET['accion'] : '';

    if ($metodo === 'GET') {
        if ($accion === '') {
            header('Cache-Control: no-store');
            $smarty = make_smarty();
            $smarty->display('v_notasentrega.tpl');
            exit;
        }
        if ($accion === 'contexto') {
            ne_responder(200, array(
                'succed' => true,
                'data' => array(
                    'idusuario' => $idUsuario,
                    'idsucursal' => $idSucursal,
                    'csrf_token' => ne_token(),
                    'max_lineas' => 100
                )
            ));
        }
        if ($accion === 'buscar') {
            $tipo = isset($_GET['tipo']) ? $_GET['tipo'] : '';
            if (!in_array($tipo, array('clientes', 'productos', 'proveedores', 'usuarios'), true)) {
                ne_error('dato_invalido', 'Catálogo no disponible.', 422);
            }
            $termino = ne_texto(isset($_GET['q']) ? $_GET['q'] : null,
                'Búsqueda', 80, true);
            if (ne_longitud($termino) < 2) {
                ne_error('dato_invalido', 'Escribe al menos dos caracteres para buscar.', 422);
            }
            ne_responder(200, array('succed' => true,
                'data' => array('resultados' => $modelo->buscarCatalogo($tipo, $termino))));
        }
        if ($accion === 'unidades') {
            ne_responder(200, array('succed' => true,
                'data' => array('unidades' => $modelo->listarUnidades())));
        }
        if ($accion === 'opciones-factura') {
            ne_responder(200, array('succed' => true,
                'data' => $modelo->opcionesFacturacion()));
        }
        if ($accion === 'listar') {
            $limite = ne_entero(isset($_GET['limite']) ? $_GET['limite'] : 50, 'Límite', 1, 100);
            $offset = ne_entero(isset($_GET['offset']) ? $_GET['offset'] : 0, 'Desplazamiento', 0, 100000);
            $estado = ne_entero(isset($_GET['estado']) ? $_GET['estado'] : 1, 'Estado', 0, 3);
            // -1: todos los clientes; 0: contado (idcliente SQL NULL).
            $idCliente = ne_entero(isset($_GET['idcliente']) ? $_GET['idcliente'] : -1,
                'Cliente', -1, 2147483647);
            $desde = ne_fecha_filtro(isset($_GET['fecha_desde']) ? $_GET['fecha_desde'] : null,
                'Fecha inicial');
            $hasta = ne_fecha_filtro(isset($_GET['fecha_hasta']) ? $_GET['fecha_hasta'] : null,
                'Fecha final');
            if ($desde !== null && $hasta !== null && $desde > $hasta) {
                ne_error('dato_invalido', 'La fecha inicial no puede superar la fecha final.', 422);
            }
            $idUsuarioFiltro = ne_entero(isset($_GET['idusuario']) ? $_GET['idusuario'] : 0,
                'Usuario', 0, 2147483647);
            ne_responder(200, array(
                'succed' => true,
                'data' => array(
                    'notas' => $modelo->listar($idSucursal, $limite, $offset, $estado,
                        $idCliente, $desde, $hasta, $idUsuarioFiltro),
                    'limite' => $limite,
                    'offset' => $offset,
                    'estado' => $estado,
                    'idcliente' => $idCliente,
                    'fecha_desde' => $desde,
                    'fecha_hasta' => $hasta,
                    'idusuario' => $idUsuarioFiltro
                )
            ));
        }
        if ($accion === 'ver') {
            $idNota = ne_entero(isset($_GET['id']) ? $_GET['id'] : null, 'Número de nota', 1, 2147483647);
            $nota = $modelo->ver($idSucursal, $idNota);
            if ($nota === null) {
                ne_responder(404, array(
                    'succed' => false,
                    'error' => array('codigo' => 'nota_no_encontrada', 'mensaje' => 'No se encontró la nota en la sucursal activa.')
                ));
            }
            ne_responder(200, array('succed' => true, 'data' => array('nota' => $nota)));
        }
        ne_responder(404, array(
            'succed' => false,
            'error' => array('codigo' => 'accion_desconocida', 'mensaje' => 'Acción no disponible.')
        ));
    }

    if ($metodo !== 'POST') {
        header('Allow: GET, POST');
        ne_responder(405, array(
            'succed' => false,
            'error' => array('codigo' => 'metodo_no_permitido', 'mensaje' => 'Usa GET o POST.')
        ));
    }
    if (!in_array($accion, array('', 'emitir', 'devolver', 'facturar'), true)) {
        ne_responder(404, array(
            'succed' => false,
            'error' => array('codigo' => 'accion_desconocida', 'mensaje' => 'Acción no disponible.')
        ));
    }
    if (!isset($_SERVER['CONTENT_TYPE'])
        || stripos($_SERVER['CONTENT_TYPE'], 'application/json') !== 0) {
        ne_responder(415, array(
            'succed' => false,
            'error' => array('codigo' => 'contenido_invalido', 'mensaje' => 'Envía la operación como JSON.')
        ));
    }

    ne_validar_token();
    $crudo = file_get_contents('php://input');
    $maximoCuerpo = $accion === 'facturar' ? 2097152 : 131072;
    if ($crudo === false || strlen($crudo) > $maximoCuerpo) {
        ne_error('contenido_invalido', 'La solicitud supera el tamaño permitido.', 413);
    }
    $datos = json_decode($crudo, true, 12);
    if (json_last_error() !== JSON_ERROR_NONE || !is_array($datos)) {
        ne_error('contenido_invalido', 'El cuerpo debe ser un objeto JSON válido.', 400);
    }

    if ($accion === 'devolver') {
        $idNota = ne_entero(isset($_GET['id']) ? $_GET['id'] : null,
            'Número de nota', 1, 2147483647);
        $devolucion = ne_normalizar_devolucion($datos);
        session_write_close();
        $resultado = $modelo->devolver($idSucursal, $idUsuario, $idNota, $devolucion);
        ne_responder($resultado['repetida'] ? 200 : 201, array(
            'succed' => true,
            'data' => $resultado
        ));
    }

    if ($accion === 'facturar') {
        $facturacion = ne_normalizar_facturacion($datos);
        session_write_close();
        $resultado = $modelo->facturar($idSucursal, $idUsuario, $facturacion);
        ne_responder($resultado['repetida'] ? 200 : 201, array('succed' => true, 'data' => $resultado));
    }

    $nota = ne_normalizar_nota($datos);
    // Se libera el bloqueo de la sesión antes de entrar a la transacción SQL.
    // La clave de operación y el SP protegen reintentos y solicitudes paralelas.
    session_write_close();
    $resultado = $modelo->emitir($idSucursal, $idUsuario, $nota);
    ne_responder($resultado['repetida'] ? 200 : 201, array(
        'succed' => true,
        'data' => $resultado
    ));
} catch (NotaEntregaReglaException $error) {
    ne_responder($error->estadoHttp(), array(
        'succed' => false,
        'error' => array(
            'codigo' => $error->codigoPublico(),
            'mensaje' => $error->getMessage()
        )
    ));
} catch (Throwable $error) {
    error_log('Notas de entrega: ' . $error->getMessage());
    ne_responder(500, array(
        'succed' => false,
        'error' => array(
            'codigo' => 'error_interno',
            'mensaje' => 'No se pudo completar la operación. Intenta de nuevo.'
        )
    ));
}
