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
                        d.cantidad_inventario, d.producto_codigo,
                        d.producto_descripcion, d.observaciones,
                        d.iddetallefactura
                 FROM detallenotasentrega d
                 LEFT JOIN clientes p ON p.id = d.idproveedor
                 LEFT JOIN unidades uni ON uni.id = d.idunidad
                 WHERE d.idnota = ? ORDER BY d.renglon'
            );
            if (!$detalle || !$detalle->bind_param('i', $idNota)
                || !$detalle->execute()) {
                throw new RuntimeException('No se pudo consultar el detalle de la nota.');
            }
            $resultado = $detalle->get_result();
            if ($resultado === false) {
                throw new RuntimeException('No se pudo leer el detalle de la nota.');
            }
            $nota['lineas'] = $resultado->fetch_all(MYSQLI_ASSOC);
            return $nota;
        } finally {
            if ($cabecera instanceof mysqli_stmt) {
                $cabecera->close();
            }
            if ($detalle instanceof mysqli_stmt) {
                $detalle->close();
            }
            $conexion->close();
        }
    }
}
