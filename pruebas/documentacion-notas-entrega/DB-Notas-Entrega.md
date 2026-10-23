# Notas de Entrega — base de datos

Este documento describe el esquema final que resulta de aplicar todos los SQL del módulo en el orden de [guiaDB.md](guiaDB.md). La guía es la única referencia operativa para instalar o actualizar. El módulo reutiliza la base de la aplicación existente y no ejecuta migraciones automáticamente.

## Dependencias de la aplicación

Las tablas del módulo referencian las estructuras ya existentes de clientes, usuarios, sucursales, productos, unidades, detalle de inventarios, movimientos, facturas y detalle de facturas. Las pantallas y el procedimiento de facturación también usan catálogos de monedas, tipos de factura, formas de pago, consecutivos, ajustes y tablas de soporte de facturación.

Los procedimientos regulares convierten unidades mediante la función existente convercion. El modelo usa el procedimiento existente krattos para consultar catálogos de la aplicación. Ninguno de esos objetos se crea o reemplaza con los SQL de Notas de Entrega.

## Esquema final

Las cuatro tablas nuevas usan InnoDB y utf8mb4_unicode_ci. Las restricciones CHECK y claves foráneas se incluyen en los SQL. Las claves foráneas conservan la acción predeterminada del motor, sin reglas CASCADE explícitas. La tabla inicial de detalle se migra de idproveedor a destinatario mediante el SQL de destinatarios; por eso la definición final no conserva relación con proveedores.

### notasentrega

| Columna | Tipo | Nulable / valor por defecto |
| --- | --- | --- |
| id | INT(11), AUTO_INCREMENT | NOT NULL, clave primaria |
| idsucursal | INT(11) | NOT NULL |
| idcliente | INT(11) | NULL |
| nombre_cliente | VARCHAR(150) | NOT NULL |
| cliente_cedula | VARCHAR(45) | NULL |
| idusuario | INT(11) | NOT NULL |
| clave_operacion | CHAR(36) | NOT NULL |
| fecha_emision | DATETIME | NOT NULL, CURRENT_TIMESTAMP |
| idestado | TINYINT(3) | NOT NULL, 1 |
| origen | TINYINT(3) UNSIGNED | NOT NULL, 1 |
| referencia | VARCHAR(55) | NULL |
| observaciones | VARCHAR(512) | NULL |
| idfactura | INT(11) | NULL, factura posterior al facturar notas regulares |
| idfactura_origen | INT(11) | NULL, factura que originó la nota |
| idordencompra_origen | INT(11) | NULL, orden que originó la nota |
| fecha_anulacion | DATETIME | NULL |
| idusuario_anulador | INT(11) | NULL |
| motivo_anulacion | VARCHAR(255) | NULL |

Estados: 1 pendiente de facturar, 2 facturada, 3 anulada, 4 cerrada desde factura. Orígenes: 1 regular, 2 factura de venta, 3 orden de compra.

Índices: PRIMARY(id), UNIQUE uq_ne_operacion(clave_operacion), idx_ne_pendientes(idestado, idcliente, idsucursal, fecha_emision), idx_ne_factura(idfactura), idx_ne_usuario(idusuario), idx_ne_anulador(idusuario_anulador), idx_ne_sucursal(idsucursal), idx_ne_factura_origen(idfactura_origen), idx_ne_orden_origen(idordencompra_origen).

Claves foráneas: idsucursal → sucursales.id; idcliente → clientes.id; idusuario e idusuario_anulador → usuarios.id; idfactura, idfactura_origen e idordencompra_origen → facturas.id.

Restricciones: chk_ne_estado limita idestado a {1,2,3,4}; chk_ne_origen limita origen a {1,2,3}; chk_ne_nombre_cliente exige nombre_cliente no vacío; chk_ne_nombre_contado limita a 64 caracteres cuando idcliente es NULL para ajustarse al campo comodin de facturas.

### detallenotasentrega

| Columna | Tipo | Nulable / valor por defecto |
| --- | --- | --- |
| id | INT(11), AUTO_INCREMENT | NOT NULL, clave primaria |
| idnota | INT(11) | NOT NULL |
| renglon | INT(11) | NOT NULL |
| idproducto | INT(11) | NOT NULL |
| destinatario | VARCHAR(150) | NOT NULL |
| idunidad | TINYINT(3) | NOT NULL |
| cantidad | DECIMAL(23,2) | NOT NULL |
| cantidad_inventario | DECIMAL(12,4) | NOT NULL |
| producto_codigo | VARCHAR(45) | NULL |
| producto_descripcion | VARCHAR(150) | NOT NULL |
| observaciones | VARCHAR(255) | NULL |
| iddetallefactura | INT(11) | NULL, detalle facturado posteriormente |
| iddetallefactura_origen | INT(11) | NULL, línea de factura u orden de origen |

Índices: PRIMARY(id), UNIQUE uq_dne_nota_renglon(idnota, renglon), UNIQUE uq_dne_detallefactura(iddetallefactura), idx_dne_producto(idproducto), idx_dne_unidad(idunidad), idx_dne_factura_origen(iddetallefactura_origen).

Claves foráneas: idnota → notasentrega.id; idproducto → productos.id; idunidad → unidades.id; iddetallefactura e iddetallefactura_origen → detallefacturas.id. destinatario es texto libre, sin FK ni catálogo.

Restricciones: chk_dne_cantidad exige cantidad > 0; chk_dne_stock exige cantidad_inventario >= 0. Las notas informativas desde factura y las líneas tomadas de órdenes pueden tener cantidad_inventario = 0. Las líneas agregadas desde inventario guardan la cantidad efectivamente descontada.

### devolucionesnotasentrega

El nombre de estas tablas se conserva por compatibilidad con los procedimientos y la estructura inicial; en la interfaz, el usuario registra una anulación o anulación parcial.

| Columna | Tipo | Nulable / valor por defecto |
| --- | --- | --- |
| id | INT(11), AUTO_INCREMENT | NOT NULL, clave primaria |
| idnota | INT(11) | NOT NULL |
| fecha | DATETIME | NOT NULL, CURRENT_TIMESTAMP |
| idusuario | INT(11) | NOT NULL |
| clave_operacion | CHAR(36) | NOT NULL |
| motivo | VARCHAR(255) | NULL |

Índices: PRIMARY(id), UNIQUE uq_devne_operacion(clave_operacion), idx_devne_nota(idnota), idx_devne_usuario(idusuario). Claves foráneas: idnota → notasentrega.id; idusuario → usuarios.id. Una nota puede tener varios eventos de anulación; idnota no es único.

### detalledevolucionesnotasentrega

| Columna | Tipo | Nulable / valor por defecto |
| --- | --- | --- |
| id | INT(11), AUTO_INCREMENT | NOT NULL, clave primaria |
| iddevolucion | INT(11) | NOT NULL |
| iddetallenota | INT(11) | NOT NULL |
| cantidad_devuelta | DECIMAL(23,2) | NOT NULL |
| cantidad_inventario | DECIMAL(12,4) | NOT NULL |
| idunidad | TINYINT(3) | NOT NULL |

Índices: PRIMARY(id), UNIQUE uq_ddevne_linea(iddevolucion, iddetallenota), idx_ddevne_detallenota(iddetallenota), idx_ddevne_unidad(idunidad). Claves foráneas: iddevolucion → devolucionesnotasentrega.id; iddetallenota → detallenotasentrega.id; idunidad → unidades.id. Restricciones: chk_ddevne_cantidad exige cantidad_devuelta > 0; chk_ddevne_stock exige cantidad_inventario > 0.

## Datos iniciales obligatorios

La migración inicial agrega solamente los registros técnicos requeridos:

| Catálogo | ID | Valor |
| --- | ---: | --- |
| tablas | 520 | notasentrega |
| tablas | 521 | detallenotasentrega |
| tablas | 522 | devolucionesnotasentrega |
| tablas | 523 | detalledevolucionesnotasentrega |
| tipomovimientos | 10 | Notas de Entrega |

El tipo de movimiento 7 ya pertenece a la aplicación y no se vuelve a insertar. Los cinco destinatarios fijos se configuran en el frontend; no hay tabla de destinatarios ni registros iniciales de clientes, proveedores, productos, usuarios, órdenes o notas. Los datos de prueba locales no forman parte de los scripts de instalación.

Los IDs 520–523 están fijados porque las consultas genéricas de movimientos guardan el ID de tabla. Si hay una colisión en otra instalación, no cambies esos IDs sin coordinar la actualización de todos los procedimientos y referencias con TI.

## Relaciones y comportamiento de datos

- Una nota tiene una o varias líneas. El número impreso es notasentrega.id; no se agrega un consecutivo independiente.
- Una línea regular o adicional de inventario registra una salida del inventario 6, movimiento tipo 10, idtabla 521 e idfila igual a detallenotasentrega.id.
- La anulación de una línea regular repone solo la cantidad recibida, movimiento tipo 7, idtabla 523 e idfila igual a detalledevolucionesnotasentrega.id. El stock exacto se guarda en cantidad_inventario.
- Las líneas desde factura u orden tienen referencia de origen en iddetallefactura_origen y no cambian inventario. No se pueden anular. En una nota desde orden, los artículos adicionales del inventario sí tienen salida y pueden anularse.
- Una nota desde factura se cierra con estado 4 y no se factura ni se anula desde este módulo. No se lleva saldo entre varias notas de la misma factura.
- La facturación de una nota regular o de orden guarda idfactura e iddetallefactura, usa las cantidades todavía entregadas y no vuelve a descontar inventario. Una factura puede agrupar varias notas del mismo cliente y sucursal.
- La clave de operación identifica reintentos. Los procedimientos usan transacciones y bloqueos para controlar emisión, anulaciones, orden pendiente y facturación.

No todas estas reglas se pueden representar con una FK o CHECK porque dependen de sumas entre filas y estados. Se validan en los procedimientos almacenados; los índices únicos complementan la protección contra duplicados.

## Funciones, procedimientos, triggers y extensiones

Al completar el orden de guiaDB.md deben existir estos cuatro procedimientos del módulo:

| Procedimiento | Archivo que lo instala en el esquema final |
| --- | --- |
| sp_emitir_nota_entrega | SQL-Notas-Entrega-Desde-Ordenes-Compra.sql |
| sp_devolver_nota_entrega | SQL-Notas-Entrega-Desde-Ordenes-Compra.sql |
| sp_emitir_nota_desde_factura | SQL-Notas-Entrega-Desde-Facturas.sql |
| sp_facturar_notas_entrega | SQL-Notas-Entrega-Facturacion.sql |

SQL-Notas-Entrega-Emision.sql y SQL-Notas-Entrega-Devoluciones.sql instalan versiones base previas a la migración de órdenes. No deben ejecutarse después de Desde-Ordenes-Compra.sql porque reemplazarían los procedimientos finales.

El módulo no crea triggers, funciones SQL ni extensiones. Depende de convercion y krattos ya instalados por la aplicación. JSON_VALID, JSON_TYPE, JSON_EXTRACT y JSON_LENGTH son funciones integradas de MariaDB.

## Esquema previo e historial de cambios

La secuencia de migración documentada deja la siguiente evolución:

1. SQL-Notas-Entrega-Migracion.sql crea las cuatro tablas y sus catálogos técnicos. La definición inicial de detallenotasentrega usa la columna idproveedor.
2. SQL-Notas-Entrega-Destinatarios.sql copia el nombre del proveedor histórico, agrega destinatario y elimina la FK, índice y columna idproveedor.
3. SQL-Notas-Entrega-Desde-Facturas.sql agrega origen e idfactura_origen a la cabecera; agrega iddetallefactura_origen al detalle; amplía los estados y permite stock cero para líneas informativas.
4. SQL-Notas-Entrega-Desde-Ordenes-Compra.sql agrega idordencompra_origen y su FK, y reemplaza emisión/anulaciones para manejar líneas de orden.
5. SQL-Notas-Entrega-Facturacion.sql reemplaza el procedimiento de facturación para cubrir las líneas de orden.

No se eliminan notas, facturas, productos ni órdenes existentes al aplicar esas migraciones. La migración normal de destinatarios conserva el texto que puede recuperar del cliente/proveedor histórico. La reparación excepcional de una instalación parcial es solo para el entorno descrito en guiaDB.md.

Para instalar o actualizar, seguir [Guía de base de datos](guiaDB.md). Para el comportamiento de endpoints y procedimientos, consultar [Backend](Backend-Notas-Entrega.md); para pantallas y comprobante, consultar [Frontend](Frontend-Notas-Entrega.md).
