# Notas de Entrega — interfaz y comprobante

> Estado: diseño de interfaz actualizado con las respuestas de TI del 2026-10-05. El esquema se instaló en `pruebas` el 2026-10-06; todavía no se han creado pantallas del módulo.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Backend](Backend-Notas-Entrega.md)

## Referencia dentro del sistema

La pantalla de ventas de la copia de pruebas en `http://127.0.0.1:8080/produccion/pruebas/dashboard/facturacion?tf=1` es la referencia visual y de uso indicada para seleccionar clientes y artículos. Su contenido se carga desde `dashboard/view/ajax/facturas/ajaxVentas.tpl` mediante `dashboard/control/ctr_facturacion.php`; intervienen `assets/js/modulos/facturacion.js` y `assets/js/modulos/ventas.js`.

La nueva interfaz debe conservar los patrones reconocibles del sistema y ajustar los formularios donde la entrega requiera controles adicionales. En la venta revisada no aparece un selector de proveedor equivalente al solicitado para las notas; habrá que incorporarlo **en cada línea de artículo**.

## Pantallas previstas

| Pantalla | Datos y acciones principales |
| --- | --- |
| Listado de notas | Número, cliente, fecha, sucursal, responsable y estado; filtros para pendientes, facturadas y anuladas; acceso al detalle e impresión. |
| Registrar y emitir | Seleccionar cliente o introducir `nombre_cliente` libre; cargar artículo y elegir proveedor por línea, unidad y cantidad de hasta dos decimales. Para cliente contado limitar el nombre a 64 caracteres, capacidad de `facturas.comodin`. La sucursal proviene de la sesión y el inventario es el `6`. Al confirmar se emite, descuenta stock y habilita la boleta. |
| Detalle de nota | Datos originales, líneas, cantidad devuelta acumulada y cantidad todavía entregada por línea, movimientos, estado y vínculo a factura cuando exista. Acciones según estado y permisos. |
| Facturación de pendientes | Seleccionar una o varias notas del mismo cliente y sucursal; las de contado deben compartir el mismo nombre libre. Mostrar cantidades netas positivas, omitir líneas totalmente devueltas y permitir definir precio, descuento e impuestos. La factura contado usa `idcliente = 0` y `comodin = nombre_cliente`. |

El proveedor representa a quien suministró cada artículo; puede ser distinto entre renglones y se elige de la lista general, incluso si varios proveedores ofrecen el mismo producto. El precio definitivo no se captura ni se presenta como definitivo al emitir una nota.

## Comportamiento de la interfaz

- Mostrar la bandera guardada: **pendiente de factura**, **facturada** o **anulada**; una nota con devolución parcial continúa pendiente mientras conserve alguna cantidad entregada.
- Mostrar la existencia disponible del inventario de venta `6` y avisar si la cantidad no alcanza. El backend volverá a validarla al emitir.
- Tras emitir, bloquear la edición de cliente, artículos, proveedores, cantidades e inventarios. Permitir consultar y reimprimir.
- Permitir varias devoluciones parciales sobre la misma nota. Mostrar el saldo por línea, aceptar una devolución igual a ese saldo y rechazar una mayor. Mostrar el historial de eventos y anular la nota solo al regresar todo lo entregado.
- Al agrupar pendientes, impedir mezclar clientes o sucursales; para contado comparar el nombre libre y requerir selección explícita. Mostrar si otro usuario ya facturó o devolvió la nota.
- Deshabilitar temporalmente el botón al enviar emisión o devolución para reducir clics repetidos. La prevención definitiva de duplicados se valida en el servidor y los SP.
- Después de facturar, permitir navegar de la factura a todas sus notas de origen y de cada nota a la factura.

## Boleta imprimible

El comprobante se diseñará para **media hoja**. Debe identificar como mínimo el ID de la nota como número impreso, nombre del cliente aunque no esté registrado, fecha de emisión, materiales, cantidades, usuario responsable y estado de facturación. El proveedor por artículo forma parte de los datos registrados y se validará si debe aparecer en el impreso. El contenido exacto, medidas de papel, firmas, copias y modo de impresión quedan por confirmar con los usuarios operativos antes de cerrar el diseño.

El impreso debe servir como respaldo de entrega física. La factura se generará después, con importes definidos entonces.

## Integración técnica prevista

Las vistas nuevas seguirán las convenciones actuales de PHP/Smarty y los scripts del proyecto. Los catálogos de clientes, artículos, proveedores, unidades e inventarios se consultarán a través del backend existente o sus extensiones, sin duplicar datos fijos en JavaScript. La pantalla solo solicitará operaciones autorizadas; las transiciones de estado y el inventario se controlarán en el servidor, como se describe en [backend](Backend-Notas-Entrega.md).

No se ha establecido ninguna dependencia de WebSocket para este módulo.

## Pendientes de diseño y pruebas

1. Revisar en detalle los componentes reutilizables de la venta y el comportamiento de búsqueda de cliente/artículo.
2. Definir junto con usuarios los campos visibles y el formato final de la boleta de media hoja.
3. Integrar la secuencia de permisos por clases HTML existente y verificar los mismos permisos en el servidor. Definir mensajes para devoluciones parciales, saldo cero y notas ya facturadas.
4. Probar con notas de varias líneas, diferentes proveedores, falta de stock y agrupación de varias notas en una factura.

## Registro de avance

| Fecha | Avance |
| --- | --- |
| 2026-09-25 | Se documentaron las pantallas y la referencia visual. No se ha implementado la interfaz. |
| 2026-10-01 | Se incorporó la emisión directa, el nombre libre de cliente y el proveedor elegido por línea. |
| 2026-10-01 | Se eliminó la fecha de entrega separada y se definió mostrar el usuario emisor y la fecha de emisión en la boleta. |
| 2026-10-05 | Se fijaron cantidades a dos decimales, devoluciones parciales acumulables y cliente contado `0` con nombre libre. |
