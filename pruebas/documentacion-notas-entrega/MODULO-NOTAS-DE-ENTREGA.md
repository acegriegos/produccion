# Módulo de Notas de Entrega

## Naturaleza de la integración

Este módulo se desarrolla dentro de la copia de pruebas del sistema existente de Aceros Griegos, en `C:\logintech\apache\htdocs\produccion\pruebas`. Permite entregar acero cuando la factura debe esperar al siguiente período de facturación. La Nota de Entrega respalda la salida física, actualiza las existencias al emitirse y permanece identificada hasta su facturación posterior.

El módulo aprovecha los catálogos, la gestión de inventario, la facturación y los usuarios actuales. Añade únicamente lo necesario para registrar, emitir, consultar, imprimir, anular y facturar entregas sin perder su relación con los movimientos de stock.

## Problema y objetivo

Algunos clientes cierran su ciclo de facturación antes de que termine el mes, aunque todavía necesitan recibir material. Sin un registro específico, la entrega física, el comprobante, el inventario y la factura posterior pueden quedar separados o depender de controles manuales.

El objetivo es registrar cada entrega, generar una boleta de media hoja, descontar el inventario al emitirla y mantener la nota pendiente hasta facturar todo el material que continúa entregado. Las devoluciones previas reducen esa cantidad; la factura no vuelve a descontar inventario.

## Flujo general

1. Un usuario registra y emite la nota en una sola operación, con el nombre del cliente, uno o varios artículos, cantidades de hasta dos decimales y el proveedor correspondiente a cada artículo. Si el cliente es de contado, la nota guarda `idcliente = NULL` y su nombre libre.
2. Al guardar la nota, el sistema descuenta las existencias y permite imprimir la boleta. Su ID único es el número del comprobante; no hay borradores.
3. La nota queda pendiente de facturación y puede consultarse junto con el responsable y sus movimientos.
4. En el período correspondiente, se reúnen una o varias notas del mismo cliente y sucursal en una factura. Se facturan sus cantidades netas luego de devoluciones; los precios, descuentos e impuestos se definen en ese momento. Para cliente contado se usa `facturas.idcliente = 0` y el nombre libre en `facturas.comodin`.
5. La factura conserva el vínculo con todas las notas y sus líneas; el inventario ya descontado no se vuelve a afectar.

Antes de facturar, una nota puede registrar varias devoluciones parciales en estructuras propias del módulo, con movimientos tipo `7`. La nota original conserva su número y queda pendiente mientras aún haya material entregado; se anula al devolverlo todo. Una devolución posterior a la factura sigue el proceso de devoluciones de facturas.

## Decisiones confirmadas

| Tema | Decisión |
| --- | --- |
| Inventario | Descontar al emitir la nota; no descontar de nuevo al facturarla. |
| Emisión | Registrar, emitir y habilitar la impresión en una sola operación, sin borradores. |
| Responsable | Guardar el usuario que registra y emite; reutilizar los permisos existentes en pantalla y servidor. No se guarda un vendedor independiente. |
| Estado | Guardar una bandera con tres valores: pendiente, facturada o anulada. |
| Fechas | Guardar fecha de emisión; las devoluciones guardan su propia fecha. No hay `fecha_entrega` en la nota. |
| Cantidades | Capturar y devolver hasta dos decimales; conservar la cantidad entregada, devuelta y sus equivalentes que afectaron inventario. |
| Proveedor | Registrar el proveedor que suministró **cada artículo**; puede variar por línea. |
| Cliente contado | Guardar `idcliente = NULL` y `nombre_cliente` obligatorio en la nota. La factura usa `idcliente = 0` y copia ese nombre a `comodin`; para contado el nombre no excede 64 caracteres. |
| Facturación | Una nota se factura una vez en una sola factura por la cantidad neta todavía entregada; una factura puede agrupar varias notas. |
| Importes | Definir precios, descuentos e impuestos al facturar. |
| Numeración | Usar el ID único de la nota como número de boleta. |
| Devolución parcial previa a factura | Admitir varias devoluciones y mantener la nota original; anular solo al devolver todas sus líneas. |
| Devolución de notas | Registrar en estructuras nuevas, separadas de las devoluciones de facturas. |
| Comprobante | Imprimible en formato de media hoja. |

## Estado del proyecto

El sistema existente ya se ejecutó localmente y se pudo ingresar. Al 2026-10-06 el esquema de cuatro tablas, los IDs `520`–`523` y el tipo de movimiento `10` están verificados en la base local `pruebas`. `sp_emitir_nota_entrega` está instalado y el backend PHP de emisión, listado y detalle está implementado en esta rama. Se probaron la conversión, el inventario, los reintentos y la reversión de una nota temporal, sin conservar datos de prueba. El proveedor de prueba `id = 500` existe solo en esta base. Aún faltan la prueba HTTP con sesión real, las pantallas, las devoluciones y la facturación posterior.

## Próximas etapas

No queda una decisión funcional indispensable pendiente de TI. La emisión de backend está lista para revisión en esta rama. Tras revisar y fusionar este PR, sigue su interfaz y la boleta; luego se implementarán las devoluciones y la facturación posterior. Durante la interfaz se concretarán un permiso propio del módulo, si TI lo solicita, y el formato físico de media hoja.

## Secuencia de ramas y revisiones

Cada rama parte de `master` actualizado y termina en un PR hacia `master`, que es la rama principal de este repositorio. No se abrirá la siguiente rama sobre trabajo sin fusionar de la anterior.

1. `feat/notas-entrega-emision-backend`: SP transaccional para emitir y descontar stock; modelo y controlador PHP para crear, listar y consultar notas. Revisaremos primero el contrato de datos, después el movimiento de inventario y al final la conexión PHP.
2. `feat/notas-entrega-emision-frontend`: formulario, listado y boleta de media hoja que usan el backend ya revisado.
3. `feat/notas-entrega-devoluciones`: devoluciones parciales, reposición de stock, historial y anulación por devolución total. Se dividirá backend e interfaz en dos PR si el cambio resulta demasiado grande para una revisión clara.
4. `feat/notas-entrega-facturacion-backend`: agrupación, cálculo de cantidad neta y líneas de factura sin otro descuento de inventario.
5. `feat/notas-entrega-facturacion-frontend`: selección de notas pendientes y preparación de precios, impuestos y descuentos.

Dentro de cada rama habrá varios commits con cambios relacionados y pruebas de la regla que se introduce. Los comentarios en PHP y SQL explicarán transacciones, conversión de unidades, permisos y decisiones que evitan duplicados; las operaciones evidentes se dejarán legibles mediante nombres claros.

## Documentación de la integración

- [Base de datos](DB-Notas-Entrega.md): estructuras existentes, tablas propuestas, relaciones y reglas de consistencia.
- [Migración local aplicada](SQL-Notas-Entrega-Migracion.sql): cuatro tablas, registros en `tablas` y tipo de movimiento `10`, verificados en `pruebas`.
- [Procedimiento de emisión](SQL-Notas-Entrega-Emision.sql): emisión atómica, inventario `6`, movimientos tipo `10` y reintentos idempotentes; instalado por separado después de la migración.
- [Backend](Backend-Notas-Entrega.md): integración PHP/MariaDB, emisión, inventario, anulaciones y facturación sin doble descuento.
- [Frontend](Frontend-Notas-Entrega.md): pantallas, referencia visual y boleta imprimible.
- [README](../README.md): cómo arrancar y consultar el sistema local.

Estos archivos se actualizarán conforme se implementen y verifiquen las partes del módulo. Cada documento distingue el diseño previsto del comportamiento que ya existe o está implementado.
