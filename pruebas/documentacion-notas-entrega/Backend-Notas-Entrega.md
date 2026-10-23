# Notas de Entrega — backend e integración

## Arquitectura

La aplicación usa Apache, PHP, Smarty y MariaDB. La ruta dashboard/notasentrega pasa por dashboard/index.php, usa la vista dashboard/view/v_notasentrega.tpl, el controlador dashboard/control/ctr_notasentrega.php, el modelo dashboard/model/m_notasentrega.php y el cliente de pantalla assets/js/modulos/notasentrega.js.

El controlador valida sesión, sucursal, permiso de Facturación, formato de entrada y token CSRF. El modelo usa mysqli y consultas preparadas para datos de catálogo y llama los procedimientos de escritura. Los procedimientos transaccionales concentran reglas de stock, concurrencia, reintentos y vínculos. No se ejecuta SQL de migración desde PHP. La instalación está descrita en [guiaDB.md](guiaDB.md).

La autorización reutiliza el permiso de escritura del módulo Facturación (permisosusuarios.tipo = 1), con excepción del administrador de ID 1, según el código de esta copia. El menú aprovecha la clase de acceso existente. No se crea una categoría de permisos ni un administrador nuevo.

## Operaciones de API

Las peticiones JSON devuelven succed y una sección data o error. Las operaciones POST requieren Content-Type: application/json y X-CSRF-Token obtenido mediante GET ?accion=contexto.

| Método y acción | Uso |
| --- | --- |
| GET dashboard/notasentrega | Presenta emisión y consulta. |
| GET ?accion=contexto | Devuelve usuario, sucursal, token CSRF y máximo de 100 líneas. |
| GET ?accion=buscar | Busca clientes, productos o usuarios con término de dos o más caracteres; devuelve hasta 25 coincidencias. |
| GET ?accion=buscar-facturas | Busca ventas por consecutivo, opcionalmente con prefijo F, T, S, E o FC. No incluye precios ni totales. |
| GET ?accion=ver-factura-origen&id=N | Devuelve cliente y líneas de una factura de venta para preparar una nota informativa. |
| GET ?accion=buscar-ordenes | Busca órdenes de compra disponibles por consecutivo. |
| GET ?accion=ver-orden-origen&id=N | Devuelve proveedor/cliente y líneas pendientes de la orden, sin montos. |
| GET ?accion=unidades | Devuelve las unidades disponibles para el selector por línea. |
| GET ?accion=opciones-factura | Devuelve monedas, tipos de factura y formas de pago del sistema. |
| GET ?accion=listar | Filtra notas por estado, cliente, fechas, responsable y página, siempre en la sucursal activa. |
| GET ?accion=ver&id=N | Devuelve el detalle e historial de una nota de la sucursal activa. |
| POST ?accion=crear-cliente | Crea un cliente desde emisión, con nombre y cédula obligatorios y correo opcional. |
| POST ?accion=emitir | Emite una nota regular, descuenta inventario y registra el movimiento. |
| POST ?accion=emitir-desde-factura | Crea una nota informativa cerrada sin alterar inventario. |
| POST ?accion=emitir-desde-orden | Crea una nota desde una orden y permite mezclar líneas de orden con artículos del inventario local. |
| POST ?accion=devolver&id=N | Registra anulación parcial o total de líneas de inventario. |
| POST ?accion=facturar | Agrupa notas regulares pendientes y crea la factura con sus cantidades netas. |

Las reglas de negocio y errores de formato inválido responden normalmente con HTTP 422; faltas de sesión o permiso con 401/403, y recursos inexistentes con 404. En el listado, estado admite 0 a 4 (0 significa todos y 1, pendientes, es el valor inicial); idcliente = -1 significa todos, 0 contado y un entero positivo un cliente registrado. Fecha inicial/final son inclusivas y usan AAAA-MM-DD. idusuario = 0 significa todos; limite admite 1 a 100 y offset controla la página. Un filtro como idcliente = -1 se envía como entero, no como nombre de cliente.

## Contratos y reglas de origen

La emisión regular envía una clave UUID estable para reconocer reintentos, cliente registrado o datos de contado, referencia, observaciones y entre 1 y 100 líneas. Cada línea tiene producto, destinatario, unidad, cantidad positiva de hasta dos decimales e indicación opcional. El usuario y la sucursal se toman de la sesión. Un reintento idéntico no duplica nota ni salida; una misma clave con contenido distinto se rechaza.

La creación de cliente valida nombre y cédula, normaliza la cédula para evitar duplicados y comprueba que no exista el correo opcional. La inserción del cliente y su correo se confirma en una transacción.

Desde factura se permiten ventas emitidas de la sucursal activa con idtipoventa 1, 7, 8, 10 o 106. El usuario elige líneas y cantidades; cada cantidad debe ser positiva y no superar lo facturado en esa línea. No se controla saldo acumulado entre notas de una misma factura. Se deriva el cliente desde la factura, no se devuelven importes, se guarda estado 4 (cerrada) y no se generan movimientos. No permite anulaciones.

Desde orden se buscan facturas de tipo orden de compra (idtipoventa = 3), en estado 1 o 2 y de la sucursal activa. Se deriva el proveedor/cliente de la orden, se incluyen cantidades pendientes completas y se bloquea la orden durante la operación. Las líneas de orden tienen referencia a detallefacturas, cantidad_inventario igual a cero y no se pueden anular. Las líneas adicionales locales pasan por el flujo regular, descuentan inventario 6 y sí permiten anulaciones. El usuario selecciona destinatario por línea; esta modalidad no recoge indicación.

## Anulaciones y movimientos de inventario

Las tablas conservan los nombres históricos de devolución; en pantalla la acción se llama anulación. El procedimiento de anulación parcial verifica la cantidad todavía entregada por línea. La opción total calcula y registra todo el saldo pendiente de las líneas anulables. Las líneas de orden y de factura están protegidas por su referencia de origen.

La emisión regular registra una salida tipo 10 con idtabla 521 e idfila igual al ID de detallenotasentrega. La anulación de líneas locales repone stock y registra movimiento tipo 7 con idtabla 523 e idfila igual al ID de detalledevolucionesnotasentrega. La conversión de unidades usa la función existente convercion. Cada operación agrupa cambios en transacción y revierte todo si una validación falla.

## Facturación sin doble descuento

El procedimiento sp_facturar_notas_entrega crea encabezado y líneas de factura, guarda los vínculos en notasentrega.idfactura y detallenotasentrega.iddetallefactura y cambia las notas a estado 2 en una transacción. Toma la cantidad neta luego de anulaciones, comprueba que todas las notas pertenezcan al mismo cliente y sucursal y evita procesar una nota dos veces.

No llama a sp_mantdetallefacturas para crear líneas, porque el procedimiento habitual de ventas afecta inventario. La salida de las líneas locales ya se registró al emitir la nota; la factura no descuenta de nuevo. Las líneas provenientes de órdenes se facturan aunque no tengan existencia local. El encabezado empieza con isregistrada = 0 y sigue el proceso de registro fiscal de la aplicación.

## Instalación y revisión

El listado exacto de SQL, las precondiciones y las consultas de verificación están en [guiaDB.md](guiaDB.md). El esquema final de tablas, claves, índices y restricciones está en [DB-Notas-Entrega.md](DB-Notas-Entrega.md). No se ejecuta una migración ya aplicada; los scripts de estructura son de una sola ejecución y los procedimientos deben instalarse en el orden que prescribe la guía.
