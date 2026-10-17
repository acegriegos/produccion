# Notas de Entrega — interfaz y comprobante

> Estado al 2026-10-16: emisión regular, consultas, anulaciones, facturación e impresión forman parte del módulo. Esta rama añade la selección de notas desde facturas. En `pruebas` el SQL incremental ya está instalado; para habilitarlo en otra base, seguir [guiaDB.md](guiaDB.md).
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Backend](Backend-Notas-Entrega.md)

## Referencia dentro del sistema

La pantalla de ventas de la copia de pruebas en `http://127.0.0.1:8080/produccion/pruebas/dashboard/facturacion?tf=1` es la referencia visual y de uso indicada para seleccionar clientes y artículos. Su contenido se carga desde `dashboard/view/ajax/facturas/ajaxVentas.tpl` mediante `dashboard/control/ctr_facturacion.php`; intervienen `assets/js/modulos/facturacion.js` y `assets/js/modulos/ventas.js`.

La nueva interfaz conserva navegación, estilos y permisos visibles del sistema. Agrega un selector de destinatario **en cada línea de artículo** con cuatro opciones fijas y la posibilidad de escribir otro nombre.

## Implementación de esta etapa

La opción **Notas de Entrega** aparece bajo Facturación para usuarios con la misma clase de permiso de Ventas (`per2`); el controlador vuelve a exigir permiso de escritura de facturación o administrador `id = 1`. La ruta `dashboard/notasentrega` sirve la vista, y `?accion=contexto`, `buscar`, `unidades`, `emitir`, `listar` y `ver` sirven JSON. Las búsquedas de cliente y producto consultan la base mediante parámetros preparados y muestran hasta 25 resultados; se exige seleccionar una coincidencia, no basta escribir texto. Los destinatarios son opciones locales de la interfaz, no se buscan en la base. El producto muestra el saldo del inventario `6` y unidades compatibles con su unidad base. El saldo visible es orientativo: el SP valida y bloquea el saldo al emitir.

El formulario crea una clave UUID por solicitud lógica. Si falla la red y la persona reintenta sin cambiar los datos, usa la misma clave para evitar otra salida de material. El botón se deshabilita durante el envío. Después de una emisión confirmada se abre el detalle de la nota. El listado filtra estado, cliente registrado o contado, fechas y usuario, con páginas de 25 registros. El detalle conserva los valores guardados al emitir y la boleta se imprime sin precios ni impuestos.

La boleta ofrece los formatos **Punto de venta** y **A4** mediante un selector junto al botón de impresión, siguiendo el control de `Ver facturas`. Punto de venta conserva el tamaño definido por la impresora y presenta cada material en un bloque compacto con su encabezado «# Código y material»; A4 imprime en orientación vertical con márgenes de 12 mm. Ambos formatos incluyen número, cliente, fecha, responsable, sucursal, estado, materiales, destinatario por línea, cantidades, observaciones y espacio para recibido por, sin precios ni impuestos. El historial y el formulario de anulaciones quedan fuera de la impresión.

## Selector de origen y emisión desde factura

El panel de emisión presenta tres opciones: **Nota regular**, **Desde factura** y **Desde orden de compra**. La tercera aparece deshabilitada y marcada como próxima etapa. Cambiar a factura muestra una búsqueda por consecutivo para ventas emitidas de la sucursal activa (`F-`, `T-`, `S-`, `E-` o `FC-` para contingencia).

Al elegir una factura, la pantalla muestra su número, fecha y cliente y presenta únicamente líneas de producto con su descripción, unidad y cantidad facturada. No solicita ni muestra precios, descuentos, impuestos o totales. Si la factura se creó desde una nota, precarga el destinatario guardado en esa línea, incluido un nombre libre; en otros casos queda listo para seleccionarlo. Las líneas aparecen sin seleccionar; se pueden marcar individualmente o todas de una vez, y cada cantidad admite hasta el máximo de su línea. Cada artículo conserva su propio destinatario y una indicación opcional.

La emisión desde factura no modifica el inventario, no calcula un saldo conjunto con notas previas y deja la nota en estado **Cerrada desde factura**. Esa nota no se puede anular ni seleccionar para facturar desde el módulo. En consulta e impresión se conserva el número de la factura fuente para reconocer el origen.

## Pantallas previstas

| Pantalla | Datos y acciones principales |
| --- | --- |
| Listado de notas | Número, cliente, fecha, sucursal, responsable y estado; filtros para pendientes, facturadas, anuladas y cerradas desde factura; acceso al detalle e impresión. |
| Registrar y emitir | Seleccionar cliente o introducir `nombre_cliente` libre; cargar artículo y elegir uno de los cuatro destinatarios predefinidos (`CURUBANDE`, `ZAGRA`, `METALMECANICA GRECIA`, `NELSON`) o escribir otro, además de unidad y cantidad de hasta dos decimales. Para cliente contado limitar el nombre a 64 caracteres, capacidad de `facturas.comodin`. La sucursal proviene de la sesión y el inventario es el `6`. Al confirmar se emite, descuenta stock y habilita la boleta. |
| Detalle de nota | Muestra los datos originales, líneas, estado, número de factura cuando exista, cantidades anuladas y pendientes, y el historial de eventos. Si permanece pendiente, permite registrar anulaciones parciales por línea o anular con un botón todo el material pendiente. El botón de impresión permite elegir Punto de venta o A4. |
| Preparar factura | Desde el listado, seleccionar hasta 100 notas pendientes del mismo cliente. Cargar las cantidades netas por línea, omitir las totalmente anuladas y definir precio unitario, descuento total, categoría de IVA, tipo de comprobante, tipo de factura, forma de pago y moneda. El encabezado y líneas se envían al backend; para contado se usa `idcliente = 0` y `comodin = nombre_cliente`. |

El destinatario se define por artículo y puede variar entre renglones. Las cuatro opciones acordadas aparecen directamente en la pantalla; la opción **Otro** permite capturar un nombre libre. Ese texto se guarda como parte de la línea de nota y no se registra en un catálogo. El precio definitivo no se captura ni se presenta como definitivo al emitir una nota.

## Comportamiento de la interfaz

- Mostrar la bandera guardada: **pendiente de factura**, **facturada**, **anulada** o **cerrada desde factura**; una nota con anulación parcial continúa pendiente mientras conserve alguna cantidad entregada.
- Mostrar la existencia disponible del inventario de venta `6` y avisar si la cantidad no alcanza. El backend volverá a validarla al emitir.
- Tras emitir, bloquear la edición de cliente, artículos, destinatarios, cantidades e inventarios. Permitir consultar y reimprimir.
- Permitir varias anulaciones parciales sobre la misma nota y una opción de un clic para anular todo el material pendiente. Mostrar el saldo por línea, aceptar una cantidad igual a ese saldo y rechazar una mayor. Mostrar el historial y anular la nota cuando todo el material entregado haya sido recibido.
- Al agrupar pendientes, impedir mezclar clientes o sucursales; para contado comparar el nombre libre y requerir selección explícita. Mostrar si otro usuario ya facturó o devolvió la nota.
- Deshabilitar temporalmente el botón al enviar emisión o devolución para reducir clics repetidos. La prevención definitiva de duplicados se valida en el servidor y los SP.
- Desde una nota facturada, abrir la factura vinculada en la pantalla actual de facturas. La navegación inversa desde la factura a sus notas de origen queda pendiente de integrar con esa pantalla.
- La preparación calcula subtotal, descuento e IVA por línea para mostrar una suma previa. El servidor vuelve a calcular las cantidades netas y los totales al guardar.
- La factura se crea inicialmente con `isregistrada = 0`; el envío a Hacienda y el registro del pago siguen el proceso normal de facturación.

## Boleta imprimible

El comprobante debe identificar como mínimo el ID de la nota como número impreso, nombre del cliente aunque no esté registrado, fecha de emisión, materiales, cantidades, usuario responsable y estado de facturación. El destinatario seleccionado para cada artículo forma parte de los datos guardados y aparece en el impreso.

El impreso debe servir como respaldo de entrega física. La factura se generará después, con importes definidos entonces.

## Integración técnica prevista

La vista usa PHP/Smarty y los scripts del proyecto. Los catálogos de clientes, artículos y unidades se consultan a través de extensiones preparadas del backend; los destinatarios no requieren catálogo. El inventario visible se consulta junto con el producto. La pantalla solo solicita operaciones autorizadas; las transiciones de estado y el inventario se controlan en el servidor, como se describe en [backend](Backend-Notas-Entrega.md).

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
| 2026-10-16 | Se reemplazó proveedor por destinatario por línea, con cuatro valores fijos y captura libre sin catálogo. La migración normal conserva los nombres anteriores; una reparación parcial de la copia local usó un marcador para las líneas cuyo proveedor ya no se podía recuperar. El usuario confirmó dos emisiones desde la interfaz. |
