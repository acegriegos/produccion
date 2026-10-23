# Módulo de Notas de Entrega

## Naturaleza de la integración

Este módulo se desarrolla dentro de la copia de pruebas del sistema existente de Aceros Griegos, en `C:\logintech\apache\htdocs\produccion\pruebas`. Permite entregar acero cuando la factura debe esperar al siguiente período de facturación. La Nota de Entrega respalda la salida física, actualiza las existencias al emitirse y permanece identificada hasta su facturación posterior.

El módulo aprovecha los catálogos, la gestión de inventario, la facturación y los usuarios actuales. Añade únicamente lo necesario para registrar, emitir, consultar, imprimir, anular y facturar entregas sin perder su relación con los movimientos de stock.

## Problema y objetivo

Algunos clientes cierran su ciclo de facturación antes de que termine el mes, aunque todavía necesitan recibir material. Sin un registro específico, la entrega física, el comprobante, el inventario y la factura posterior pueden quedar separados o depender de controles manuales.

El objetivo es registrar cada entrega, generar una boleta de media hoja, descontar el inventario al emitirla y mantener la nota pendiente hasta facturar todo el material que continúa entregado. Las devoluciones previas reducen esa cantidad; la factura no vuelve a descontar inventario.

## Flujo general

1. Un usuario registra y emite la nota en una sola operación, con el nombre del cliente, uno o varios artículos, cantidades de hasta dos decimales y el destinatario correspondiente a cada artículo. Si el cliente es de contado, la nota guarda `idcliente = NULL` y su nombre libre.
2. Al guardar la nota, el sistema descuenta las existencias y permite imprimir la boleta. Su ID único es el número del comprobante; no hay borradores.
3. La nota queda pendiente de facturación y puede consultarse junto con el responsable y sus movimientos.
4. En el período correspondiente, se reúnen una o varias notas del mismo cliente y sucursal en una factura. Se facturan sus cantidades netas luego de devoluciones; los precios, descuentos e impuestos se definen en ese momento. Para cliente contado se usa `facturas.idcliente = 0` y el nombre libre en `facturas.comodin`.
5. La factura conserva el vínculo con todas las notas y sus líneas; el inventario ya descontado no se vuelve a afectar.

Como flujo separado, una factura de venta emitida puede originar una nota informativa con algunas de sus líneas y cantidades. Se conserva el cliente y los materiales sin precios, la nota queda cerrada y no genera movimientos de inventario ni anulaciones. Este flujo no calcula saldo contra notas anteriores.

Una orden de compra existente también puede originar una nota. El proveedor guardado en la orden se utiliza como cliente de la nota; cada línea seleccionada se copia con su cantidad pendiente completa y sin mover inventario. Se pueden agregar artículos del inventario actual, que sí generan salida y admiten anulaciones. Una misma orden puede alimentar varias notas mientras queden cantidades pendientes; las líneas provenientes de la orden no admiten anulación.

En el origen de orden, cada artículo solo requiere destinatario. No se solicita indicación, medida ni corte en estas líneas; la modalidad sigue el formato simple de la nota regular.

Antes de facturar, una nota puede registrar varias devoluciones parciales en estructuras propias del módulo, con movimientos tipo `7`. La nota original conserva su número y queda pendiente mientras aún haya material entregado; se anula al devolverlo todo. Una devolución posterior a la factura sigue el proceso de devoluciones de facturas.

## Decisiones confirmadas

| Tema | Decisión |
| --- | --- |
| Inventario | Descontar al emitir la nota; no descontar de nuevo al facturarla. |
| Emisión | Registrar, emitir y habilitar la impresión en una sola operación, sin borradores. |
| Responsable | Guardar el usuario que registra y emite; reutilizar los permisos existentes en pantalla y servidor. No se guarda un vendedor independiente. |
| Estado | Guardar una bandera con pendiente, facturada, anulada o cerrada desde factura. |
| Fechas | Guardar fecha de emisión; las devoluciones guardan su propia fecha. No hay `fecha_entrega` en la nota. |
| Cantidades | Capturar y devolver hasta dos decimales; conservar la cantidad entregada, devuelta y sus equivalentes que afectaron inventario. |
| Destinatario | Elegir por artículo entre CURUBANDE, ZAGRA, METALMECANICA GRECIA, NELSON o CLIENTE RETIRO, o escribir otro nombre. Se guarda en la línea sin catálogo ni relación con clientes. |
| Cliente contado | Guardar `idcliente = NULL` y `nombre_cliente` obligatorio en la nota. La factura usa `idcliente = 0` y copia ese nombre a `comodin`; para contado el nombre no excede 64 caracteres. |
| Facturación | Una nota se factura una vez en una sola factura por la cantidad neta todavía entregada; una factura puede agrupar varias notas. |
| Importes | Definir precios, descuentos e impuestos al facturar. |
| Numeración | Usar el ID único de la nota como número de boleta. |
| Devolución parcial previa a factura | Admitir varias devoluciones y mantener la nota original; anular solo al devolver todas sus líneas. |
| Devolución de notas | Registrar en estructuras nuevas, separadas de las devoluciones de facturas. |
| Nota desde factura | Copiar líneas y cantidades elegidas sin precios; no modificar inventario, saldo o anulaciones. |
| Nota desde orden de compra | Copiar cantidades pendientes completas; no mover inventario en las líneas de la orden. Los artículos locales agregados sí descuentan stock y admiten anulaciones. No solicitar indicación por línea en esta modalidad. |
| Comprobante | Imprimible en formato de media hoja. |

## Estado del proyecto

El esquema del módulo, los orígenes desde facturas y órdenes y sus cuatro procedimientos están instalados en la base local `pruebas`. La migración de órdenes agregó `notasentrega.idordencompra_origen`, reemplazó los procedimientos de emisión y anulaciones y se verificó con diez órdenes de ensayo (`9374`–`9383`), que solo existen como datos locales de prueba. La columna `destinatario` reemplazó la relación de proveedor en `detallenotasentrega`; la guía [guiaDB.md](guiaDB.md) registra el estado local y el procedimiento correcto para otros entornos. El usuario probó desde la interfaz dos emisiones regulares, una con un destinatario predefinido y otra con **Otro**. Las líneas históricas afectadas por una migración parcial en esta base quedaron identificadas con `No especificado (nota historica)`. Esta rama agrega el origen de orden y queda pendiente la revisión funcional desde la interfaz.

## Próximas etapas

Emisión, anulaciones e impresión ya fueron revisadas e integradas. Los destinatarios y la modalidad desde facturas están implementados y probados. Esta rama agrega emisión desde órdenes de compra; su SQL ya se aplicó en `pruebas`. El usuario puede revisar desde la interfaz usando las órdenes de ensayo antes de dar el visto bueno para crear el PR. Se mantiene una rama `feat/` por cambio y revisión antes de cada PR.

## Secuencia de ramas y revisiones

Cada rama parte de `master` actualizado y termina en un PR hacia `master`, que es la rama principal de este repositorio. No se abrirá la siguiente rama sobre trabajo sin fusionar de la anterior.

Las primeras etapas (emisión, interfaz, anulaciones y facturación) ya se desarrollaron y se integraron en `master` mediante sus PR. La rama `feat/notas-entrega-destinatarios` reemplaza el proveedor por destinatario por línea; el usuario verificó dos casos desde la interfaz. Las etapas nuevas se desarrollarán en ramas `feat/` independientes y se presentarán para revisión antes de crear cada PR.

Dentro de cada rama habrá varios commits con cambios relacionados y pruebas de la regla que se introduce. Los comentarios en PHP y SQL explicarán transacciones, conversión de unidades, permisos y decisiones que evitan duplicados; las operaciones evidentes se dejarán legibles mediante nombres claros.

## Documentación de la integración

- [Guía de base de datos para TI](guiaDB.md): único punto de entrada para decidir qué SQL ejecutar, el orden y las verificaciones.
- [Base de datos](DB-Notas-Entrega.md): estructuras existentes, tablas propuestas, relaciones y reglas de consistencia.
- [Archivos SQL](guiaDB.md#archivos-sql-de-esta-guia): la guía describe uso y secuencia; cada script también incluye una referencia a ella.
- [Backend](Backend-Notas-Entrega.md): integración PHP/MariaDB, emisión, inventario, anulaciones y facturación sin doble descuento.
- [Frontend](Frontend-Notas-Entrega.md): pantallas, referencia visual y boleta imprimible.
- [README](../README.md): cómo arrancar y consultar el sistema local.

La documentación separa el estado local comprobado del procedimiento de instalación en otras bases. Para ejecutar SQL, seguir siempre `guiaDB.md`.
