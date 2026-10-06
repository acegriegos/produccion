# Notas de Entrega — backend e integración

> Estado: diseño técnico actualizado con las respuestas de TI del 2026-10-05. Todavía no hay controlador ni SP implementados para el módulo.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Frontend](Frontend-Notas-Entrega.md)

## Arquitectura existente que se reutilizará

La aplicación actual usa Apache, PHP 7.2, Smarty y MariaDB. `dashboard/index.php` resuelve la ruta del módulo hacia `dashboard/control/ctr_<modulo>.php` y consulta el acceso del usuario; `_config/expiracion.php` participa en el control de sesión. Las pantallas se generan con plantillas en `dashboard/view/`, la lógica de datos se organiza en `dashboard/model/` y el acceso a MariaDB está en `_config/mysqlDB.php` y `_config/RUD.php`.

El módulo de facturación existente sirve como punto de integración: `dashboard/control/ctr_facturacion.php` muestra la venta y carga `dashboard/view/ajax/facturas/ajaxVentas.tpl`. La incorporación de notas debe seguir las convenciones del proyecto y conservar las rutas de venta ordinaria.

No se ha identificado un servicio Python necesario para este flujo. La descripción original menciona PHP, Python y APIs disponibles; se añadirá una integración adicional solo si la revisión del código demuestra que hace falta.

## Operaciones previstas

| Operación | Comportamiento requerido |
| --- | --- |
| Registrar y emitir nota | En una sola operación, guardar cliente registrado o `nombre_cliente` libre, sucursal activa, usuario autenticado y líneas con artículo, proveedor, unidad y cantidad de hasta dos decimales; validar existencias del inventario `6`, descontar stock y registrar un movimiento tipo `10` por línea. La nota nace pendiente y devuelve su ID para imprimir. |
| Consultar e imprimir | Recuperar la nota y sus líneas, estado e historial. La reimpresión debe mostrar los datos de la entrega original. |
| Listar pendientes | Filtrar notas emitidas sin factura por cliente, sucursal, fecha y responsable. |
| Registrar devolución | Admitir varios eventos parciales por nota mientras siga pendiente. Por cada línea, reponer solo lo recibido, guardar su cantidad en unidad de stock y registrar movimiento tipo `7`. Mantener la nota hasta devolver todas las líneas; entonces pasa a anulada. |
| Preparar factura | Agrupar notas pendientes del mismo cliente y sucursal; para contado exigir el mismo nombre libre y usar `facturas.idcliente = 0` con `comodin = nombre_cliente`. Definir precios, descuentos e impuestos sobre cantidades netas. Crear líneas sin otro descuento de inventario. |
| Consultar vínculo | Mostrar desde la nota su factura y desde la factura las notas y líneas de origen. |

Los nombres definitivos de controladores, métodos y procedimientos se decidirán al implementar. Esta tabla describe el comportamiento, no rutas ya existentes.

## Punto crítico: facturación sin doble descuento

En el esquema local, `sp_mantdetallefacturas` descuenta `detalleinventarios` al insertar una línea de venta y registra un movimiento tipo `4` cuando corresponde. Ejemplo: la nota entrega 5 barras y resta 5 del stock; si luego se agrega la factura con el procedimiento normal, este vuelve a restar 5 y el sistema mostraría 10 barras menos aunque solo salieron 5.

Desarrollaremos una ruta específica para facturar notas: tomará las líneas de nota como origen, creará `detallefacturas` con precio, impuestos y descuentos elegidos al facturar, conservará los datos auxiliares que necesita la factura (incluido `msdetallefacturas` cuando aplique) y guardará el vínculo por línea. Esa ruta **no** actualizará `detalleinventarios` ni insertará otra salida en `movimientos`. Usará columnas explícitas al insertar para evitar depender del orden físico de la tabla. La venta normal seguirá usando su procedimiento actual. Compararemos ambos resultados para comprobar que solo difieren en el movimiento físico de stock y en el origen de la línea.

La preparación de la factura, sus líneas, los vínculos `notasentrega.idfactura` y `detallenotasentrega.iddetallefactura` y el cambio a facturada se confirman en una sola transacción. Se bloquean y revisan las notas para impedir que otro usuario registre una devolución o factura simultánea. Cada nota se factura una sola vez: se incluyen las cantidades que permanecen entregadas y se omiten las líneas totalmente devueltas.

## Inventario y anulaciones

La emisión usa las existencias del inventario de venta `6` para todas las sucursales y registra la sucursal de sesión en la nota y el movimiento. La comprobación y el descuento ocurren bajo control transaccional para impedir consumo concurrente del mismo saldo. Una salida se vincula con `movimientos.idtabla = 521` e `idfila = detallenotasentrega.id`. Reintentar una emisión confirmada con la misma `clave_operacion` devuelve el resultado previo sin crear movimientos adicionales.

TI confirmó tipo `10` para salida y `7` para devolución; el SQL propuesto agrega el `10`. Cada devolución se vincula con `movimientos.idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. Nuestros SP guardan devolución, reposición y movimiento en una transacción; aceptan devolver una cantidad igual al saldo disponible, pero jamás mayor. Varias devoluciones pueden afectar la misma línea original. Cuando todas las líneas llegan a cero se registra un solo usuario anulador y la nota pasa a anulada. Las devoluciones posteriores a la factura usan el flujo fiscal existente.

Los SP propuestos `sp_emitir_nota_entrega`, `sp_devolver_nota_entrega` y `sp_facturar_notas_entrega` están descritos en [base de datos](DB-Notas-Entrega.md). Los desarrollaremos aquí y los someteremos a revisión de TI; si TI aporta otros, compararemos su comportamiento antes de adoptarlos.

Las tablas, tipos, índices y estados propuestos están en [la especificación de base de datos](DB-Notas-Entrega.md).

## Validaciones y acceso

- Confirmar artículo, proveedor, unidad y sucursal. La nota puede comenzar sin cliente de catálogo con nombre obligatorio; al facturar ese caso se usa cliente contado `0` y se copia el nombre a `facturas.comodin` (máximo 64 caracteres). El proveedor se selecciona **por línea** desde todos los proveedores disponibles; no está ligado exclusivamente al artículo.
- Exigir cantidades positivas y suficientes existencias al emitir; no confiar únicamente en la validación de la pantalla.
- Impedir editar los datos materiales de una nota emitida, facturar una anulada, anular una facturada o vincular una nota dos veces.
- Reutilizar el acceso por módulo, clases HTML y datos de sesión existentes; el mismo usuario registra y emite. Ocultar acciones no autorizadas en la pantalla y verificar la autorización también en PHP antes de llamar a los SP.
- Guardar usuario y fecha de cada transición relevante para poder reconstruir la historia de la entrega.

## Pendientes de implementación

1. Ejecutar una vez la [migración local validada](SQL-Notas-Entrega-Migracion.sql) en `pruebas`. El 2026-10-06 se verificaron la base, los IDs `520`–`523`, el tipo `10` y la sintaxis de las tablas sin modificar la base.
2. Implementar nuestros SP de emisión, devolución y facturación sin segundo descuento, con transacciones, bloqueo de saldos y `clave_operacion` estable para reintentos.
3. Verificar la conversión de cantidades con dos decimales y los productos con dimensiones especiales; `f_units_mts` solo presenta texto.
4. Integrar la autorización existente en pantalla **y** servidor, y conectar controladores PHP con los SP.
5. Probar varias devoluciones de una misma línea, devolución total, cliente contado, agrupación, emisiones repetidas, concurrencia e inventario sin doble movimiento.

## Registro de avance

| Fecha | Avance |
| --- | --- |
| 2026-09-25 | Se documentó el diseño de integración. No se han creado controladores ni cambiado procedimientos del módulo. |
| 2026-10-01 | Se incorporaron los acuerdos de TI: emisión directa, inventario `6`, proveedor por línea y devoluciones de notas separadas. |
| 2026-10-01 | Se simplificó el responsable a un solo usuario, se confirmó una bandera de tres estados y se mantuvo `cantidad_inventario` para la reversión. |
| 2026-10-01 | Se asumió el desarrollo de los SP del módulo y se definió una ruta dedicada para líneas de factura originadas en notas, sin segundo descuento. |
| 2026-10-05 | TI confirmó devoluciones parciales acumulables, cliente contado `0` con `comodin`, catálogo `520`–`523`, cantidades a dos decimales e inventario `6` compartido. |
| 2026-10-06 | Se comprobó la migración local sin ejecutarla; el próximo paso es instalar el esquema y comenzar los SP. |
