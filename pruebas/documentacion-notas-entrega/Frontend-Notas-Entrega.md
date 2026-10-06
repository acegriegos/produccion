# Notas de Entrega — interfaz y comprobante

> Estado al 2026-10-06: esta rama implementa el formulario de emisión, las búsquedas de catálogos, el listado, el detalle y una boleta imprimible provisional. El backend de emisión ya se incorporó a `master`. Devoluciones, agrupación para factura y vínculos desde la factura siguen pendientes.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Backend](Backend-Notas-Entrega.md)

## Referencia dentro del sistema

La pantalla de ventas de la copia de pruebas en `http://127.0.0.1:8080/produccion/pruebas/dashboard/facturacion?tf=1` es la referencia visual y de uso indicada para seleccionar clientes y artículos. Su contenido se carga desde `dashboard/view/ajax/facturas/ajaxVentas.tpl` mediante `dashboard/control/ctr_facturacion.php`; intervienen `assets/js/modulos/facturacion.js` y `assets/js/modulos/ventas.js`.

La nueva interfaz conserva navegación, estilos y permisos visibles del sistema. Agrega un selector de proveedor **en cada línea de artículo**, ausente en la venta revisada.

## Implementación de esta etapa

La opción **Notas de Entrega** aparece bajo Facturación para usuarios con la misma clase de permiso de Ventas (`per2`); el controlador vuelve a exigir permiso de escritura de facturación o administrador `id = 1`. La ruta `dashboard/notasentrega` sirve la vista, y `?accion=contexto`, `buscar`, `unidades`, `emitir`, `listar` y `ver` sirven JSON. Las búsquedas de cliente, producto y proveedor consultan la base mediante parámetros preparados y muestran hasta 25 resultados; se exige seleccionar una coincidencia, no basta escribir texto. El producto muestra el saldo del inventario `6` y unidades compatibles con su unidad base. El saldo visible es orientativo: el SP valida y bloquea el saldo al emitir.

El formulario crea una clave UUID por solicitud lógica. Si falla la red y la persona reintenta sin cambiar los datos, usa la misma clave para evitar otra salida de material. El botón se deshabilita durante el envío. Después de una emisión confirmada se abre el detalle de la nota. El listado filtra estado, cliente registrado o contado, fechas y usuario, con páginas de 25 registros. El detalle conserva los valores guardados al emitir y la boleta se imprime sin precios ni impuestos.

La boleta usa media hoja de 5,5 × 8,5 pulgadas como medida **provisional**; incluye número, cliente, fecha, responsable, sucursal, estado, materiales, proveedor por línea, cantidades, observaciones y espacios para firmas. Usuarios operativos deben confirmar medidas finales, copias y firmas antes de cerrar el diseño. No se presentan saldos netos de devoluciones ni acciones de facturación porque esas operaciones aún no existen.

## Pantallas previstas

| Pantalla | Datos y acciones principales |
| --- | --- |
| Listado de notas | Número, cliente, fecha, sucursal, responsable y estado; filtros para pendientes, facturadas y anuladas; acceso al detalle e impresión. |
| Registrar y emitir | Seleccionar cliente o introducir `nombre_cliente` libre; cargar artículo y elegir proveedor por línea, unidad y cantidad de hasta dos decimales. Para cliente contado limitar el nombre a 64 caracteres, capacidad de `facturas.comodin`. La sucursal proviene de la sesión y el inventario es el `6`. Al confirmar se emite, descuenta stock y habilita la boleta. |
| Detalle de nota | En esta etapa muestra datos originales, líneas, estado y número de factura cuando exista. Las cantidades devueltas, movimientos e historial se añadirán con el backend de devoluciones. |
| Facturación de pendientes (futuro) | Seleccionar una o varias notas del mismo cliente y sucursal; las de contado deben compartir el mismo nombre libre. Mostrar cantidades netas positivas, omitir líneas totalmente devueltas y permitir definir precio, descuento e impuestos. La factura contado usa `idcliente = 0` y `comodin = nombre_cliente`. |

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

La vista usa PHP/Smarty y los scripts del proyecto. Los catálogos de clientes, artículos, proveedores y unidades se consultan a través de extensiones preparadas del backend; el inventario visible se consulta junto con el producto. La pantalla solo solicita operaciones autorizadas; las transiciones de estado y el inventario se controlan en el servidor, como se describe en [backend](Backend-Notas-Entrega.md).

No se ha establecido ninguna dependencia de WebSocket para este módulo.

## Pendientes de diseño y pruebas

1. Revisar visualmente la pantalla y la impresión con una sesión real en Apache; confirmar el formato físico con usuarios operativos.
2. En etapas posteriores, añadir devoluciones, saldo neto por línea, agrupación de notas en factura y vínculo inverso desde la factura.
3. Probar las acciones de devolución y agrupación cuando existan sus SP y pantallas.

## Registro de avance

| Fecha | Avance |
| --- | --- |
| 2026-09-25 | Se documentaron las pantallas y la referencia visual. No se ha implementado la interfaz. |
| 2026-10-01 | Se incorporó la emisión directa, el nombre libre de cliente y el proveedor elegido por línea. |
| 2026-10-01 | Se eliminó la fecha de entrega separada y se definió mostrar el usuario emisor y la fecha de emisión en la boleta. |
| 2026-10-05 | Se fijaron cantidades a dos decimales, devoluciones parciales acumulables y cliente contado `0` con nombre libre. |
| 2026-10-06 | Se añadieron emisión, búsqueda de catálogos, listado, detalle y boleta provisional. Pasaron sintaxis PHP/JS, consultas de catálogos, renderizado de plantilla y peticiones HTTP de pantalla, búsqueda, listado, emisión, reintento y detalle con sesión temporal. Un POST sin CSRF recibió `403`; la nota temporal se retiró y se restauró el stock. Falta revisión visual e impresión con una sesión interactiva real. |
| 2026-10-06 | Tras la revisión visual del usuario se corrigió el filtro `idcliente=-1`, se usaron selectores nativos para evitar duplicados de Materialize y se fijó el número de boleta en una línea al imprimir. La búsqueda de productos consulta inventario y dimensiones en bloque; «ANGULAR» pasó de alrededor de 1,1 s a unos 20 ms en el modelo local. La misma URL de listado que fallaba devolvió notas por HTTP con el usuario 2. |
