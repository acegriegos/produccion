# Módulo de Notas de Entrega

## Propósito y arquitectura

El módulo permite registrar e imprimir comprobantes de entrega y relacionar cada nota con su origen y su eventual factura. Se integra en la aplicación PHP existente y reutiliza su autenticación, permisos, clientes, productos, unidades, inventario y facturación.

La estructura sigue las capas del proyecto:

1. **Vista:** dashboard/view/v_notasentrega.tpl renderiza la pantalla con Smarty.
2. **Interacción:** assets/js/modulos/notasentrega.js controla pestañas, búsquedas, validación, emisión, consulta, impresión y preparación de facturas.
3. **Controlador:** dashboard/control/ctr_notasentrega.php procesa la ruta, valida sesión, permiso, CSRF y datos de entrada.
4. **Modelo:** dashboard/model/m_notasentrega.php consulta catálogos y llama los procedimientos almacenados.
5. **Base de datos:** las tablas y procedimientos guardan las notas, sus líneas, movimientos, anulaciones y vínculos de facturación.

No se incorpora otro framework ni un servicio separado. El detalle de instalación de SQL está en [guiaDB.md](guiaDB.md).

## Modalidades de emisión

La pantalla permite elegir un origen antes de emitir:

- **Nota regular:** se selecciona un cliente registrado o se escribe un cliente contado. Cada línea incluye artículo, destinatario, unidad, cantidad y una indicación opcional. El procedimiento descuenta inventario 6 al emitir.
- **Desde factura:** se busca una factura de venta y se seleccionan algunas o todas sus líneas, con cantidades parciales o completas. El comprobante no expone precios ni impuestos, no mueve inventario ni calcula saldo contra otras notas, y queda cerrado sin opción de anulación.
- **Desde orden de compra:** se busca una orden existente y se copian líneas elegidas por su cantidad pendiente completa. El proveedor de la orden se usa como cliente. También se pueden añadir artículos del inventario actual en la misma nota: las líneas de la orden no cambian inventario y no admiten anulación; las líneas locales sí generan salida y pueden anularse. Esta modalidad no solicita indicación por línea.

Cada línea guarda un destinatario en texto: CURUBANDE, ZAGRA, METALMECANICA GRECIA, NELSON, CLIENTE RETIRO o un nombre libre. No existe un catálogo de destinatarios.

## Consulta, anulaciones y facturación

La consulta permite filtrar por estado, cliente, rango de fechas y responsable. Una nota regular pendiente puede recibir varias anulaciones parciales o una anulación de todo el material pendiente. Cada anulación repone únicamente lo recibido de las líneas de inventario; no afecta materiales de orden ni notas cerradas desde factura. La nota regular pasa a anulada cuando todo el material entregado se devuelve.

Las notas regulares pendientes pueden agruparse para facturar si pertenecen al mismo cliente y sucursal. La factura incluye cantidades netas después de anulaciones, conserva el vínculo con nota y línea, y no vuelve a descontar inventario. Las notas creadas desde órdenes conservan también la cantidad de origen, aunque esas líneas no tuvieran stock local. Las notas creadas desde facturas no entran en este flujo.

El número de la nota es su ID. En el comprobante se puede elegir formato **Punto de venta** o **A4**. La referencia de una orden se presenta como C más su número y la referencia de una factura como F más su número; cada artículo lleva C, F o I según su origen. La impresión no muestra precios ni la sucursal, e imprime cantidad y unidad juntas en la misma línea.

## Acceso y dependencias

El módulo usa la sesión y el permiso existente de Facturación. El controlador vuelve a verificar permisos antes de aceptar operaciones. El registro de clientes nuevos requiere nombre y cédula; correo y otros datos permitidos son opcionales, y se rechaza una cédula o correo duplicado.

Los datos de usuarios, permisos, clientes, destinatarios fijos, productos y órdenes dependen de la aplicación base. Los scripts del módulo no crean un usuario administrador ni cargan datos de prueba. No hay envío de correo o almacenamiento externo nuevo para emitir e imprimir notas.

## Documentación

- [Guía de base de datos para TI](guiaDB.md): precondiciones, instalación limpia, actualización con respaldo, orden SQL y validación final.
- [Esquema de base de datos](DB-Notas-Entrega.md): columnas, tipos, valores por defecto, índices, claves, restricciones y catálogos iniciales.
- [Backend](Backend-Notas-Entrega.md): endpoints, validación, permisos, procedimientos e inventario.
- [Frontend y comprobante](Frontend-Notas-Entrega.md): pantallas, búsqueda, origen y formatos de impresión.
- [README de la copia de pruebas](../README.md): arranque local de esta aplicación.
