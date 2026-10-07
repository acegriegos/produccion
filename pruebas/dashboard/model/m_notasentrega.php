<?php
require_once __DIR__ . '/../../_config/mysqlDB.php';

/**
 * Error de una regla de emisión que se puede mostrar al usuario.
 * Los errores técnicos de MariaDB se registran, pero no se envían al navegador.
 */
class NotaEntregaReglaException extends RuntimeException
{
    private $codigoPublico;
    private $estadoHttp;

    public function __construct($codigoPublico, $mensaje, $estadoHttp)
    {
        parent::__construct($mensaje);
        $this->codigoPublico = $codigoPublico;
        $this->estadoHttp = $estadoHttp;
    }

    public function codigoPublico()
    {
        return $this->codigoPublico;
    }

    public function estadoHttp()
    {
        return $this->estadoHttp;
    }
}

class _notasentrega
{
    private function conexion()
    {
        $db = new DBClass();
        if (!$db->conect() || !($db->mysql_conexion instanceof mysqli)) {
            throw new RuntimeException('No se pudo abrir la conexión de notas de entrega.');
        }

        $conexion = $db->mysql_conexion;
        if (!$conexion->set_charset('utf8mb4')) {
            $conexion->close();
            throw new RuntimeException('No se pudo configurar UTF-8 para notas de entrega.');
        }
        return $conexion;
    }

    /**
     * El menú oculta acciones mediante clases HTML, pero eso no autoriza una
     * petición HTTP. Se exige el permiso de escritura de facturación en BD.
     */
    public function puedeOperar($idUsuario)
    {
        if ($idUsuario === 1) {
            return true;
        }

        $conexion = $this->conexion();
        $sentencia = null;
        try {
            $sentencia = $conexion->prepare(
                "SELECT 1 FROM permisos p
                 INNER JOIN permisosusuarios pu ON pu.idpermiso = p.id
                 WHERE p.href = 'facturacion'
                   AND pu.idusuario = ? AND pu.tipo = 1
                 LIMIT 1"
            );
            if (!$sentencia || !$sentencia->bind_param('i', $idUsuario)
                || !$sentencia->execute()) {
                throw new RuntimeException('No se pudo verificar el permiso de notas de entrega.');
            }
            $resultado = $sentencia->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer el permiso de notas de entrega.');
            }
            return $resultado->num_rows > 0;
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    /**
     * Catálogos acotados para la pantalla. Ningún término de búsqueda entra
     * como SQL; tampoco se confía en una relación producto-proveedor exclusiva.
     */
    public function buscarCatalogo($tipo, $termino)
    {
        $conexion = $this->conexion();
        $sentencia = null;
        // Los comodines escritos por el usuario se tratan como texto literal.
        $patron = '%' . str_replace(array('=', '%', '_'),
            array('==', '=%', '=_'), $termino) . '%';
        try {
            if ($tipo === 'clientes' || $tipo === 'proveedores') {
                $condicion = $tipo === 'proveedores' ? ' AND bisproveedor = 1' : '';
                $sentencia = $conexion->prepare(
                    'SELECT id, nombre, cedula FROM clientes
                     WHERE id > 0' . $condicion . '
                       AND (nombre LIKE ? ESCAPE \'=\' OR cedula LIKE ? ESCAPE \'=\')
                     ORDER BY nombre LIMIT 25'
                );
                if (!$sentencia || !$sentencia->bind_param('ss', $patron, $patron)) {
                    throw new RuntimeException('No se pudo preparar la búsqueda de clientes.');
                }
            } elseif ($tipo === 'productos') {
                $sentencia = $conexion->prepare(
                    'SELECT p.id, p.codigo, p.nombre, p.idunidad
                     FROM productos p
                     WHERE p.id > 0 AND COALESCE(p.idheredado, 0) = 0
                       AND (p.nombre LIKE ? ESCAPE \'=\' OR p.codigo LIKE ? ESCAPE \'=\')
                     ORDER BY (p.codigo = ?) DESC, p.nombre LIMIT 100'
                );
                if (!$sentencia || !$sentencia->bind_param('sss', $patron, $patron, $termino)) {
                    throw new RuntimeException('No se pudo preparar la búsqueda de productos.');
                }
            } else {
                throw new InvalidArgumentException('Catálogo no disponible.');
            }
            if (!$sentencia->execute() || ($resultado = $sentencia->get_result()) === false) {
                throw new RuntimeException('No se pudo consultar el catálogo.');
            }
            $filas = $resultado->fetch_all(MYSQLI_ASSOC);
            if ($tipo === 'productos') {
                return $this->completarProductos($conexion, $filas, $termino);
            }
            return $filas;
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    private function completarProductos($conexion, array $productos, $termino)
    {
        if (!$productos) {
            return array();
        }
        // La búsqueda textual ya fue preparada. Estos IDs vienen de la BD y
        // se convierten a enteros antes de usarse en las dos consultas masivas.
        $ids = array();
        foreach ($productos as $producto) {
            $ids[] = "'" . (int) $producto['id'] . "'";
        }
        $lista = implode(',', $ids);
        $saldos = array();
        $resultado = $conexion->query(
            'SELECT idproducto, COUNT(*) AS saldos, MAX(cantidad) AS saldo
             FROM detalleinventarios WHERE idinventario = 6
               AND idproducto IN (' . $lista . ') GROUP BY idproducto'
        );
        if ($resultado === false) {
            throw new RuntimeException('No se pudo consultar el inventario de los productos.');
        }
        foreach ($resultado as $fila) {
            $saldos[(string) $fila['idproducto']] = $fila;
        }
        $dimensiones = array();
        $resultado = $conexion->query(
            'SELECT idproducto FROM dimensioproductos
             WHERE codigo = \'1\' AND idunidad = 8
               AND idproducto IN (' . $lista . ') GROUP BY idproducto'
        );
        if ($resultado === false) {
            throw new RuntimeException('No se pudo consultar las dimensiones de los productos.');
        }
        foreach ($resultado as $fila) {
            $dimensiones[(int) $fila['idproducto']] = true;
        }
        foreach ($productos as &$producto) {
            $id = (string) (int) $producto['id'];
            $producto['saldos'] = isset($saldos[$id]) ? $saldos[$id]['saldos'] : 0;
            $producto['saldo'] = isset($saldos[$id]) ? $saldos[$id]['saldo'] : null;
            $producto['tiene_dimension'] = isset($dimensiones[(int) $id]) ? 1 : 0;
        }
        unset($producto);
        usort($productos, function ($a, $b) use ($termino) {
            $aExacto = strcasecmp($a['codigo'], $termino) === 0;
            $bExacto = strcasecmp($b['codigo'], $termino) === 0;
            if ($aExacto !== $bExacto) {
                return $aExacto ? -1 : 1;
            }
            $aDisponible = (int) $a['saldos'] === 1 && (float) $a['saldo'] > 0;
            $bDisponible = (int) $b['saldos'] === 1 && (float) $b['saldo'] > 0;
            if ($aDisponible !== $bDisponible) {
                return $aDisponible ? -1 : 1;
            }
            return strcmp($a['nombre'], $b['nombre']);
        });
        return array_slice($productos, 0, 25);
    }

    public function listarUnidades()
    {
        $conexion = $this->conexion();
        try {
            $resultado = $conexion->query('SELECT id, nombre, simbolo FROM unidades ORDER BY id');
            if ($resultado === false) {
                throw new RuntimeException('No se pudo consultar las unidades.');
            }
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } finally {
            $conexion->close();
        }
    }

    /**
     * Catálogos que utiliza la pantalla para emitir una factura desde notas.
     * Las formas de pago provienen del mismo catálogo usado por ventas.
     */
    public function opcionesFacturacion()
    {
        $conexion = $this->conexion();
        $formasPago = array();
        $sentencia = null;
        try {
            $resultado = $conexion->query(
                'SELECT id, nombre, valor + suma AS divisa, simbolo
                 FROM monedas WHERE id > 0 ORDER BY principal DESC, nombre'
            );
            if ($resultado === false) {
                throw new RuntimeException('No se pudieron consultar las monedas.');
            }
            $monedas = $resultado->fetch_all(MYSQLI_ASSOC);

            $resultado = $conexion->query(
                'SELECT id, nombre FROM tipofacturas WHERE id > 0 ORDER BY id'
            );
            if ($resultado === false) {
                throw new RuntimeException('No se pudieron consultar los tipos de factura.');
            }
            $tiposFactura = $resultado->fetch_all(MYSQLI_ASSOC);

            $sentencia = $conexion->prepare('CALL krattos(?, ?, ?)');
            $columnas = 'id,nombre';
            $tabla = 26;
            $filtro = 'id > 0 and bancos <> 99 order by principal desc,nombre';
            if (!$sentencia || !$sentencia->bind_param('sis', $columnas, $tabla, $filtro)
                || !$sentencia->execute()) {
                throw new RuntimeException('No se pudieron consultar las formas de pago.');
            }
            do {
                $resultado = $sentencia->get_result();
                if ($resultado instanceof mysqli_result) {
                    $formasPago = $resultado->fetch_all(MYSQLI_ASSOC);
                    $resultado->free();
                    break;
                }
            } while ($sentencia->more_results() && $sentencia->next_result());

            return array(
                'monedas' => $monedas,
                'tipos_factura' => $tiposFactura,
                'formas_pago' => $formasPago
            );
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    /**
     * El SP es dueño de la transacción: crea cabecera y líneas, descuenta
     * inventario 6 y registra los movimientos juntos. Reusar la misma clave
     * permite reconocer un reintento sin una segunda salida de material.
     */
    public function emitir($idSucursal, $idUsuario, array $nota)
    {
        $lineasJson = json_encode($nota['lineas'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($lineasJson === false) {
            throw new NotaEntregaReglaException('detalle_invalido', 'No se pudo codificar el detalle.', 422);
        }

        $idCliente = $nota['idcliente'];
        $nombreCliente = $nota['nombre_cliente'];
        $cedula = $nota['cliente_cedula'];
        $clave = $nota['clave_operacion'];
        $referencia = $nota['referencia'];
        $observaciones = $nota['observaciones'];

        $conexion = $this->conexion();
        $sentencia = null;
        try {
            $sentencia = $conexion->prepare(
                'CALL sp_emitir_nota_entrega(?, ?, ?, ?, ?, ?, ?, ?, ?)'
            );
            if (!$sentencia || !$sentencia->bind_param(
                'iississss',
                $idSucursal,
                $idCliente,
                $nombreCliente,
                $cedula,
                $idUsuario,
                $clave,
                $referencia,
                $observaciones,
                $lineasJson
            )) {
                throw new RuntimeException('No se pudo preparar la emisión de la nota.');
            }

            if (!$sentencia->execute()) {
                $this->lanzarErrorEmision($sentencia->errno, $sentencia->error);
            }
            $resultado = $sentencia->get_result();
            if ($resultado === false || !($fila = $resultado->fetch_assoc())) {
                throw new RuntimeException('La emisión no devolvió el número de nota.');
            }
            return array(
                'idnota' => (int) $fila['idnota'],
                'repetida' => (bool) $fila['repetida']
            );
        } catch (mysqli_sql_exception $error) {
            $this->lanzarErrorEmision($error->getCode(), $error->getMessage());
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    private function lanzarErrorEmision($numero, $mensaje)
    {
        if ((int) $numero === 1644) {
            $conflicto = strpos($mensaje, 'Clave usada') !== false
                || strpos($mensaje, 'Stock insuficiente') !== false
                || strpos($mensaje, 'Stock cambio') !== false;
            throw new NotaEntregaReglaException(
                $conflicto ? 'conflicto' : 'regla_negocio',
                $mensaje,
                $conflicto ? 409 : 422
            );
        }
        throw new RuntimeException('Error técnico al emitir la nota: ' . $mensaje);
    }

    /**
     * Registra una devolución parcial. El procedimiento bloquea la nota,
     * repone solo el material recibido y protege los reintentos por UUID.
     */
    public function devolver($idSucursal, $idUsuario, $idNota, array $devolucion)
    {
        $lineasJson = json_encode($devolucion['lineas'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        if ($lineasJson === false) {
            throw new NotaEntregaReglaException('detalle_invalido', 'No se pudo codificar el detalle de la devolución.', 422);
        }

        $clave = $devolucion['clave_operacion'];
        $motivo = $devolucion['motivo'];
        $conexion = $this->conexion();
        $sentencia = null;
        try {
            $sentencia = $conexion->prepare(
                'CALL sp_devolver_nota_entrega(?, ?, ?, ?, ?, ?)'
            );
            if (!$sentencia || !$sentencia->bind_param(
                'iiisss', $idSucursal, $idUsuario, $idNota, $clave, $motivo, $lineasJson
            )) {
                throw new RuntimeException('No se pudo preparar la devolución de la nota.');
            }
            if (!$sentencia->execute()) {
                $this->lanzarErrorDevolucion($sentencia->errno, $sentencia->error);
            }
            $resultado = $sentencia->get_result();
            if ($resultado === false || !($fila = $resultado->fetch_assoc())) {
                throw new RuntimeException('La devolución no devolvió su número de operación.');
            }
            return array(
                'iddevolucion' => (int) $fila['iddevolucion'],
                'repetida' => (bool) $fila['repetida']
            );
        } catch (mysqli_sql_exception $error) {
            $this->lanzarErrorDevolucion($error->getCode(), $error->getMessage());
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    private function lanzarErrorDevolucion($numero, $mensaje)
    {
        if ((int) $numero === 1644) {
            if (strpos($mensaje, 'Nota no encontrada') !== false) {
                throw new NotaEntregaReglaException('nota_no_encontrada', $mensaje, 404);
            }
            $conflicto = strpos($mensaje, 'Clave usada') !== false
                || strpos($mensaje, 'Nota no pendiente') !== false
                || strpos($mensaje, 'Cantidad excede saldo') !== false
                || strpos($mensaje, 'Stock cambio') !== false;
            throw new NotaEntregaReglaException(
                $conflicto ? 'conflicto' : 'regla_negocio',
                $mensaje,
                $conflicto ? 409 : 422
            );
        }
        throw new RuntimeException('Error técnico al registrar la devolución: ' . $mensaje);
    }

    /**
     * Factura una o varias notas pendientes con cantidades netas. El SP bloquea
     * notas y líneas, crea las líneas de factura sin tocar inventario y actualiza
     * todos los vínculos dentro de la misma transacción.
     */
    public function facturar($idSucursal, $idUsuario, array $facturacion)
    {
        $notasJson = json_encode($facturacion['idnotas']);
        $facturaJson = json_encode(
            $facturacion['factura'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        $lineasJson = json_encode(
            $facturacion['lineas'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        if ($notasJson === false || $facturaJson === false || $lineasJson === false) {
            throw new NotaEntregaReglaException(
                'factura_invalida', 'No se pudieron preparar los datos de la factura.', 422
            );
        }

        $conexion = $this->conexion();
        $sentencia = null;
        try {
            $sentencia = $conexion->prepare(
                'CALL sp_facturar_notas_entrega(?, ?, ?, ?, ?)'
            );
            if (!$sentencia || !$sentencia->bind_param(
                'iisss', $idSucursal, $idUsuario, $notasJson, $facturaJson, $lineasJson
            )) {
                throw new RuntimeException('No se pudo preparar la factura de notas.');
            }
            if (!$sentencia->execute()) {
                $this->lanzarErrorFacturacion($sentencia->errno, $sentencia->error);
            }

            $filaFactura = null;
            do {
                $resultado = $sentencia->get_result();
                if ($resultado instanceof mysqli_result) {
                    while ($fila = $resultado->fetch_assoc()) {
                        if (isset($fila['idfactura'])) {
                            $filaFactura = $fila;
                        }
                    }
                    $resultado->free();
                }
            } while ($sentencia->more_results() && $sentencia->next_result());

            if (!is_array($filaFactura)) {
                throw new RuntimeException('La facturación no devolvió el número de factura.');
            }
            return array(
                'idfactura' => (int) $filaFactura['idfactura'],
                'consecutivo' => (string) $filaFactura['consecutivo'],
                'notas_facturadas' => (int) $filaFactura['notas_facturadas'],
                'lineas_facturadas' => (int) $filaFactura['lineas_facturadas'],
                'total' => (string) $filaFactura['total'],
                'repetida' => !empty($filaFactura['repetida'])
            );
        } catch (mysqli_sql_exception $error) {
            $this->lanzarErrorFacturacion($error->getCode(), $error->getMessage());
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    private function lanzarErrorFacturacion($numero, $mensaje)
    {
        if ((int) $numero === 1644) {
            if (strpos($mensaje, 'Nota no encontrada') !== false) {
                throw new NotaEntregaReglaException('nota_no_encontrada', $mensaje, 404);
            }
            $conflicto = strpos($mensaje, 'no pendiente') !== false
                || strpos($mensaje, 'mismo cliente') !== false
                || strpos($mensaje, 'mismo nombre') !== false
                || strpos($mensaje, 'facturas distintas') !== false
                || strpos($mensaje, 'notas facturadas') !== false
                || strpos($mensaje, 'factura original') !== false
                || strpos($mensaje, 'reintento no coincide') !== false
                || strpos($mensaje, 'ya vinculada') !== false
                || strpos($mensaje, 'cambio mientras') !== false;
            throw new NotaEntregaReglaException(
                $conflicto ? 'conflicto' : 'factura_invalida',
                $mensaje,
                $conflicto ? 409 : 422
            );
        }
        throw new RuntimeException('Error técnico al facturar las notas: ' . $mensaje);
    }

    public function listar($idSucursal, $limite, $desplazamiento, $estado,
                           $idCliente, $desde, $hasta, $idUsuario)
    {
        $conexion = $this->conexion();
        $sentencia = null;
        try {
            $sentencia = $conexion->prepare(
                'SELECT n.id, n.idsucursal, n.idcliente, n.nombre_cliente,
                        n.fecha_emision, n.idestado, n.referencia, n.idfactura,
                        n.idusuario, u.nombre AS usuario_nombre,
                        (SELECT COUNT(*) FROM detallenotasentrega d
                         WHERE d.idnota = n.id) AS total_lineas
                 FROM notasentrega n
                 LEFT JOIN usuarios u ON u.id = n.idusuario
                 WHERE n.idsucursal = ? AND (? = 0 OR n.idestado = ?)
                   AND (? = -1 OR n.idcliente = ?
                        OR (? = 0 AND n.idcliente IS NULL))
                   AND (? IS NULL OR n.fecha_emision >= ?)
                   AND (? IS NULL OR n.fecha_emision < DATE_ADD(?, INTERVAL 1 DAY))
                   AND (? = 0 OR n.idusuario = ?)
                 ORDER BY n.id DESC LIMIT ? OFFSET ?'
            );
            if (!$sentencia || !$sentencia->bind_param(
                'iiiiiissssiiii', $idSucursal, $estado, $estado,
                $idCliente, $idCliente, $idCliente,
                $desde, $desde, $hasta, $hasta,
                $idUsuario, $idUsuario, $limite, $desplazamiento
            ) || !$sentencia->execute()) {
                throw new RuntimeException('No se pudo consultar la lista de notas.');
            }
            $resultado = $sentencia->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer la lista de notas.');
            }
            return $resultado->fetch_all(MYSQLI_ASSOC);
        } finally {
            if ($sentencia instanceof mysqli_stmt) {
                $sentencia->close();
            }
            $conexion->close();
        }
    }

    public function ver($idSucursal, $idNota)
    {
        $conexion = $this->conexion();
        $cabecera = null;
        $detalle = null;
        try {
            $cabecera = $conexion->prepare(
                'SELECT n.id, n.idsucursal, n.idcliente, n.nombre_cliente,
                        n.cliente_cedula, n.idusuario, u.nombre AS usuario_nombre,
                        n.fecha_emision, n.idestado, n.referencia,
                        n.observaciones, n.idfactura, n.fecha_anulacion,
                        n.idusuario_anulador, n.motivo_anulacion
                 FROM notasentrega n
                 LEFT JOIN usuarios u ON u.id = n.idusuario
                 WHERE n.id = ? AND n.idsucursal = ? LIMIT 1'
            );
            if (!$cabecera || !$cabecera->bind_param('ii', $idNota, $idSucursal)
                || !$cabecera->execute()) {
                throw new RuntimeException('No se pudo consultar la nota.');
            }
            $resultado = $cabecera->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer la nota.');
            }
            $nota = $resultado->fetch_assoc();
            $cabecera->close();
            $cabecera = null;
            if (!$nota) {
                return null;
            }

            $detalle = $conexion->prepare(
                'SELECT d.id, d.renglon, d.idproducto, d.idproveedor,
                        p.nombre AS proveedor_nombre, d.idunidad,
                        uni.nombre AS unidad_nombre, d.cantidad,
                        COALESCE(dev.cantidad_devuelta, 0) AS cantidad_devuelta,
                        d.cantidad - COALESCE(dev.cantidad_devuelta, 0) AS cantidad_pendiente,
                        d.cantidad_inventario, d.producto_codigo,
                        d.producto_descripcion, d.observaciones,
                        d.iddetallefactura
                 FROM detallenotasentrega d
                 LEFT JOIN clientes p ON p.id = d.idproveedor
                 LEFT JOIN unidades uni ON uni.id = d.idunidad
                 LEFT JOIN (
                    SELECT dd.iddetallenota, SUM(dd.cantidad_devuelta) AS cantidad_devuelta
                    FROM detalledevolucionesnotasentrega dd
                    INNER JOIN devolucionesnotasentrega dn ON dn.id = dd.iddevolucion
                    WHERE dn.idnota = ? GROUP BY dd.iddetallenota
                 ) dev ON dev.iddetallenota = d.id
                 WHERE d.idnota = ? ORDER BY d.renglon'
            );
            if (!$detalle || !$detalle->bind_param('ii', $idNota, $idNota)
                || !$detalle->execute()) {
                throw new RuntimeException('No se pudo consultar el detalle de la nota.');
            }
            $resultado = $detalle->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer el detalle de la nota.');
            }
            $nota['lineas'] = $resultado->fetch_all(MYSQLI_ASSOC);

            $historial = $conexion->prepare(
                'SELECT d.id, d.fecha, d.idusuario, u.nombre AS usuario_nombre, d.motivo
                 FROM devolucionesnotasentrega d
                 LEFT JOIN usuarios u ON u.id = d.idusuario
                 WHERE d.idnota = ? ORDER BY d.fecha, d.id'
            );
            if (!$historial || !$historial->bind_param('i', $idNota)
                || !$historial->execute()) {
                throw new RuntimeException('No se pudo consultar el historial de devoluciones.');
            }
            $resultado = $historial->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer el historial de devoluciones.');
            }
            $nota['devoluciones'] = $resultado->fetch_all(MYSQLI_ASSOC);
            $historial->close();
            $historial = null;

            if ($nota['devoluciones']) {
                $indicePorId = array();
                foreach ($nota['devoluciones'] as $indice => $evento) {
                    $idDevolucion = (int) $evento['id'];
                    $nota['devoluciones'][$indice]['lineas'] = array();
                    $indicePorId[$idDevolucion] = $indice;
                }
                $lineasHistorial = $conexion->prepare(
                    'SELECT dd.iddevolucion, d.renglon, d.producto_codigo,
                            d.producto_descripcion, dd.cantidad_devuelta,
                            dd.idunidad, u.nombre AS unidad_nombre
                     FROM detalledevolucionesnotasentrega dd
                     INNER JOIN devolucionesnotasentrega dn ON dn.id = dd.iddevolucion
                     INNER JOIN detallenotasentrega d ON d.id = dd.iddetallenota
                     LEFT JOIN unidades u ON u.id = dd.idunidad
                     WHERE dn.idnota = ?
                     ORDER BY dn.fecha, dn.id, d.renglon'
                );
                if (!$lineasHistorial || !$lineasHistorial->bind_param('i', $idNota)
                    || !$lineasHistorial->execute()) {
                    throw new RuntimeException('No se pudieron consultar las líneas devueltas.');
                }
                $resultado = $lineasHistorial->get_result();
                if ($resultado === false) {
                    throw new RuntimeException('No se pudieron leer las líneas devueltas.');
                }
                while ($linea = $resultado->fetch_assoc()) {
                    $idDevolucion = (int) $linea['iddevolucion'];
                    if (isset($indicePorId[$idDevolucion])) {
                        unset($linea['iddevolucion']);
                        $nota['devoluciones'][$indicePorId[$idDevolucion]]['lineas'][] = $linea;
                    }
                }
                $lineasHistorial->close();
                $lineasHistorial = null;
            }
            return $nota;
        } finally {
            if ($cabecera instanceof mysqli_stmt) {
                $cabecera->close();
            }
            if ($detalle instanceof mysqli_stmt) {
                $detalle->close();
            }
            if (isset($historial) && $historial instanceof mysqli_stmt) {
                $historial->close();
            }
            if (isset($lineasHistorial) && $lineasHistorial instanceof mysqli_stmt) {
                $lineasHistorial->close();
            }
            $conexion->close();
        }
    }
}
