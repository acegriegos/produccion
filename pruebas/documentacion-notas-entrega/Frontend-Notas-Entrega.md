# Notas de Entrega — interfaz y comprobante

## Pantalla y selección del origen

La pantalla se sirve en dashboard/notasentrega. El usuario puede cambiar entre tres modalidades: **Nota regular**, **Desde factura** y **Desde orden de compra**.

En la emisión regular se selecciona o crea el cliente, se buscan artículos y se define destinatario, unidad, cantidad y una indicación opcional. Nombre y cédula son obligatorios para crear cliente; el correo es opcional. La búsqueda exige elegir una coincidencia del catálogo. Los destinatarios fijos son CURUBANDE, ZAGRA, METALMECANICA GRECIA, NELSON y CLIENTE RETIRO; **Otro** permite escribir un nombre para esa línea.

En **Desde factura**, se busca una venta de la sucursal activa y se seleccionan líneas y cantidades. La pantalla no muestra precio, descuento, impuesto ni total. Se puede elegir destinatario e indicación por línea. Al emitir, la nota queda cerrada, no mueve inventario y no ofrece anulación.

En **Desde orden de compra**, se busca la orden existente. El proveedor de la orden se usa como cliente y las líneas seleccionadas se copian por la cantidad pendiente completa. Se puede agregar material local a la misma nota. La modalidad no muestra indicación por línea: cada material solo tiene destinatario. Las líneas de orden no afectan inventario ni se anulan; el material local sí descuenta stock y admite anulaciones.

## Consulta, detalle y factura

La pestaña de consulta permite buscar por estado, cliente, fecha inicial/final y responsable. Las fechas vacías no filtran por fecha. El cliente puede ser todos, contado o un cliente registrado. La lista muestra número, fecha, cliente, responsable, estado, factura asociada y acciones. El detalle muestra las líneas y sus cantidades entregadas, anuladas y pendientes, además del historial de anulaciones.

Una nota regular pendiente puede anularse por cantidades parciales o con la acción de anulación total. Las líneas de origen de factura u orden no muestran acción de anulación. La preparación de factura agrupa notas regulares pendientes del mismo cliente, muestra cantidad neta y permite definir precios, descuentos e impuestos en ese momento. La factura preparada sigue el proceso normal de registro fiscal de Ventas.

## Comprobante impreso

La impresión permite elegir **Punto de venta** o **A4**, siguiendo el selector de formato utilizado en la consulta de facturas. Ambos formatos omiten sucursal y datos financieros. Muestran el número de nota en una misma línea con su título, cliente, identificación disponible, fecha, responsable, estado, referencia, líneas, destinatarios y espacio de recibido por.

La referencia de una orden aparece como C seguido del número de orden; la de una factura, como F seguido del número de factura. Cada línea presenta C para orden, F para factura o I para inventario local. Cantidad y unidad aparecen juntas en una línea. El formato Punto de venta dispone cada material en un bloque y mantiene el encabezado “# Código y material” en todos los productos.

## Pruebas funcionales recomendadas

- Emitir una nota regular con dos artículos y distintos destinatarios; comprobar stock, número de nota y visualización del detalle.
- Crear un cliente con nombre y cédula, y confirmar que se rechace una cédula o correo duplicado.
- Aplicar una anulación parcial y luego una total; comprobar saldo, historial, inventario y estado final.
- Emitir desde factura con una cantidad parcial; comprobar estado cerrado, ausencia de movimiento de inventario y que no aparezca como pendiente de facturar o anular.
- Emitir desde orden solo con líneas de la orden y luego combinar una línea local; comprobar que solo el material local afecte inventario y admita anulación.
- Imprimir en A4 y Punto de venta; comprobar referencias C/F y marcas por material, destinatario, cantidad y unidad en una sola línea.

La instalación de base de datos se explica en [guiaDB.md](guiaDB.md). El contrato de endpoints y reglas de servidor está en [Backend-Notas-Entrega.md](Backend-Notas-Entrega.md).
