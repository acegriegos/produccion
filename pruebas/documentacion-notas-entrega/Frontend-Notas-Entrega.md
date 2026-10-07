# Notas de Entrega — interfaz y comprobante

> Estado al 2026-10-06: emisión, devoluciones, listado, detalle, historial y boleta provisional se integraron en `master` por los PR #3 y #4. Esta rama añade la selección de notas pendientes, la preparación de importes por línea y el enlace desde la nota a su factura. `sp_facturar_notas_entrega` está instalado en `pruebas`, pero todavía no se ha probado guardar una factura; el documento se crea sin registro fiscal ni pago.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Backend](Backend-Notas-Entrega.md)

## Referencia dentro del sistema

La pantalla de ventas de la copia de pruebas en `http://127.0.0.1:8080/produccion/pruebas/dashboard/facturacion?tf=1` es la referencia visual y de uso indicada para seleccionar clientes y artículos. Su contenido se carga desde `dashboard/view/ajax/facturas/ajaxVentas.tpl` mediante `dashboard/control/ctr_facturacion.php`; intervienen `assets/js/modulos/facturacion.js` y `assets/js/modulos/ventas.js`.

La nueva interfaz conserva navegación, estilos y permisos visibles del sistema. Agrega un selector de proveedor **en cada línea de artículo**, ausente en la venta revisada.

## Implementación de esta etapa

La opción **Notas de Entrega** aparece bajo Facturación para usuarios con la misma clase de permiso de Ventas (`per2`); el controlador vuelve a exigir permiso de escritura de facturación o administrador `id = 1`. La ruta `dashboard/notasentrega` sirve la vista, y `?accion=contexto`, `buscar`, `unidades`, `emitir`, `listar` y `ver` sirven JSON. Las búsquedas de cliente, producto y proveedor consultan la base mediante parámetros preparados y muestran hasta 25 resultados; se exige seleccionar una coincidencia, no basta escribir texto. El producto muestra el saldo del inventario `6` y unidades compatibles con su unidad base. El saldo visible es orientativo: el SP valida y bloquea el saldo al emitir.

El formulario crea una clave UUID por solicitud lógica. Si falla la red y la persona reintenta sin cambiar los datos, usa la misma clave para evitar otra salida de material. El botón se deshabilita durante el envío. Después de una emisión confirmada se abre el detalle de la nota. El listado filtra estado, cliente registrado o contado, fechas y usuario, con páginas de 25 registros. El detalle conserva los valores guardados al emitir y la boleta se imprime sin precios ni impuestos.

La boleta usa media hoja de 5,5 × 8,5 pulgadas como medida **provisional**; incluye número, cliente, fecha, responsable, sucursal, estado, materiales, proveedor por línea, cantidades, observaciones y espacios para firmas. Usuarios operativos deben confirmar medidas finales, copias y firmas antes de cerrar el diseño. El historial y el formulario de devoluciones se muestran fuera de la boleta y no aparecen al imprimirla.

## Pantallas previstas

| Pantalla | Datos y acciones principales |
| --- | --- |
| Listado de notas | Número, cliente, fecha, sucursal, responsable y estado; filtros para pendientes, facturadas y anuladas; acceso al detalle e impresión. |
| Registrar y emitir | Seleccionar cliente o introducir `nombre_cliente` libre; cargar artículo y elegir proveedor por línea, unidad y cantidad de hasta dos decimales. Para cliente contado limitar el nombre a 64 caracteres, capacidad de `facturas.comodin`. La sucursal proviene de la sesión y el inventario es el `6`. Al confirmar se emite, descuenta stock y habilita la boleta. |
| Detalle de nota | Muestra los datos originales, líneas, estado, número de factura cuando exista, cantidades devueltas y pendientes, y el historial de eventos. Si permanece pendiente, permite registrar una devolución parcial indicando las líneas y el motivo opcional. |
| Preparar factura | Desde el listado, seleccionar hasta 100 notas pendientes del mismo cliente. Cargar las cantidades netas por línea, omitir las totalmente devueltas, y definir precio unitario, descuento total, categoría de IVA, tipo de comprobante, tipo de factura, forma de pago y moneda. El encabezado y líneas se envían al backend; para contado se usa `idcliente = 0` y `comodin = nombre_cliente`. |

El proveedor representa a quien suministró cada artículo; puede ser distinto entre renglones y se elige de la lista general, incluso si varios proveedores ofrecen el mismo producto. El precio definitivo no se captura ni se presenta como definitivo al emitir una nota.

## Comportamiento de la interfaz

- Mostrar la bandera guardada: **pendiente de factura**, **facturada** o **anulada**; una nota con devolución parcial continúa pendiente mientras conserve alguna cantidad entregada.
- Mostrar la existencia disponible del inventario de venta `6` y avisar si la cantidad no alcanza. El backend volverá a validarla al emitir.
- Tras emitir, bloquear la edición de cliente, artículos, proveedores, cantidades e inventarios. Permitir consultar y reimprimir.
- Permitir varias devoluciones parciales sobre la misma nota. Mostrar el saldo por línea, aceptar una devolución igual a ese saldo y rechazar una mayor. Mostrar el historial de eventos y anular la nota solo al regresar todo lo entregado.
- Al agrupar pendientes, impedir mezclar clientes o sucursales; para contado comparar el nombre libre y requerir selección explícita. Mostrar si otro usuario ya facturó o devolvió la nota.
- Deshabilitar temporalmente el botón al enviar emisión o devolución para reducir clics repetidos. La prevención definitiva de duplicados se valida en el servidor y los SP.
- Desde una nota facturada, abrir la factura vinculada en la pantalla actual de facturas. La navegación inversa desde la factura a sus notas de origen queda pendiente de integrar con esa pantalla.
- La preparación calcula subtotal, descuento e IVA por línea para mostrar una suma previa. El servidor vuelve a calcular las cantidades netas y los totales al guardar.
- La factura se crea inicialmente con `isregistrada = 0`; el envío a Hacienda y el registro del pago siguen el proceso normal de facturación.

## Boleta imprimible

El comprobante se diseñará para **media hoja**. Debe identificar como mínimo el ID de la nota como número impreso, nombre del cliente aunque no esté registrado, fecha de emisión, materiales, cantidades, usuario responsable y estado de facturación. El proveedor por artículo forma parte de los datos registrados y se validará si debe aparecer en el impreso. El contenido exacto, medidas de papel, firmas, copias y modo de impresión quedan por confirmar con los usuarios operativos antes de cerrar el diseño.

El impreso debe servir como respaldo de entrega física. La factura se generará después, con importes definidos entonces.

## Integración técnica prevista

La vista usa PHP/Smarty y los scripts del proyecto. Los catálogos de clientes, artículos, proveedores y unidades se consultan a través de extensiones preparadas del backend; el inventario visible se consulta junto con el producto. La pantalla solo solicita operaciones autorizadas; las transiciones de estado y el inventario se controlan en el servidor, como se describe en [backend](Backend-Notas-Entrega.md).

No se ha establecido ninguna dependencia de WebSocket para este módulo.

## Pendientes de diseño y pruebas

1. Revisar visualmente emisión, devoluciones e impresión con una sesión real en Apache; confirmar el formato físico con usuarios operativos.
2. La devolución ya fue revisada e integrada en el PR #4; su procedimiento está instalado en `pruebas`. No volver a ejecutar la migración de tablas.
3. Revisar visualmente la preparación de factura y probar un caso completo antes del PR. El envío fiscal y la navegación desde la factura hacia sus notas quedan para integrar con el flujo normal de facturas.

## Registro de avance

| Fecha | Avance |
| --- | --- |
| 2026-09-25 | Se documentaron las pantallas y la referencia visual. No se ha implementado la interfaz. |
| 2026-10-01 | Se incorporó la emisión directa, el nombre libre de cliente y el proveedor elegido por línea. |
| 2026-10-01 | Se eliminó la fecha de entrega separada y se definió mostrar el usuario emisor y la fecha de emisión en la boleta. |
| 2026-10-05 | Se fijaron cantidades a dos decimales, devoluciones parciales acumulables y cliente contado `0` con nombre libre. |
| 2026-10-06 | Se añadieron emisión, búsqueda de catálogos, listado, detalle y boleta provisional. Pasaron sintaxis PHP/JS, consultas de catálogos, renderizado de plantilla y peticiones HTTP de pantalla, búsqueda, listado, emisión, reintento y detalle con sesión temporal. Un POST sin CSRF recibió `403`; la nota temporal se retiró y se restauró el stock. Falta revisión visual e impresión con una sesión interactiva real. |
| 2026-10-06 | Tras la revisión visual del usuario se corrigió el filtro `idcliente=-1`, se usaron selectores nativos para evitar duplicados de Materialize y se fijó el número de boleta en una línea al imprimir. La búsqueda de productos consulta inventario y dimensiones en bloque; «ANGULAR» pasó de alrededor de 1,1 s a unos 20 ms en el modelo local. La misma URL de listado que fallaba devolvió notas por HTTP con el usuario 2. |
| 2026-10-06 | El PR #3 integró la etapa de emisión en `master`. Se añadió a esta rama la captura de devoluciones parciales, el saldo devuelto por línea y el historial fuera del formato impreso. |
| 2026-10-06 | El PR #4 integró devoluciones e historial en `master`; el usuario instaló el SP de devolución y confirmó el flujo. El backend de facturación se implementa en otra rama; la interfaz todavía está pendiente. |
| 2026-10-06 | Se añadió la preparación de factura: selección múltiple de notas pendientes, datos de factura desde los catálogos actuales, cantidades netas, precio/descuento/IVA por línea, vínculo navegable desde la nota y total previo. La rutina SQL está instalada; falta revisar y probar el guardado completo. |
| 2026-10-06 | Desde el listado y el detalle de notas facturadas se añadió acceso separado para ver o imprimir la factura, usando el mismo recibo de ventas y su parámetro de impresión. |
