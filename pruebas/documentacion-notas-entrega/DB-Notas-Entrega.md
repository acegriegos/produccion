# Notas de Entrega — base de datos

> Estado al 2026-10-16: en la copia local `pruebas` están instalados el esquema de destinatarios, los orígenes desde facturas y órdenes de compra, y los cuatro procedimientos del módulo. Se verificaron la clave foránea de orden y la firma de diez parámetros de `sp_emitir_nota_entrega`. Hay diez órdenes locales de ensayo (`9374`–`9383`) para pruebas. En otras bases, seguir el orden de la [guía operativa de base de datos](guiaDB.md); PHP no ejecuta cambios de esquema automáticamente.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Backend](Backend-Notas-Entrega.md) · [Frontend](Frontend-Notas-Entrega.md)

## Cómo encaja en la base existente

La conexión de esta copia está en `_config/mysqlDB.php` y apunta a la base local `pruebas`. No se guardan claves en esta documentación. Los nombres y tipos se comprobaron contra esa base; otra instalación podría tener un esquema distinto.

| Necesidad | Estructura existente | Hallazgo para el módulo |
| --- | --- | --- |
| Cliente | `clientes`, `facturas.idcliente`, `facturas.comodin` | La nota admite `idcliente = NULL` con `nombre_cliente` obligatorio. Al facturar como cliente contado se usa `facturas.idcliente = 0` y `facturas.comodin = nombre_cliente`, siguiendo el patrón del módulo de ventas. `facturas.comodin` admite 64 caracteres; el nombre libre de la nota no puede exceder ese límite. |
| Destinatario de cada artículo | Valor de la línea en `detallenotasentrega` | Se elige entre `CURUBANDE`, `ZAGRA`, `METALMECANICA GRECIA`, `NELSON`, `CLIENTE RETIRO` o se escribe un nombre libre. No se consulta ni se crea una relación con `clientes` o `proveedorproductos`. |
| Artículo y unidad | `productos`, `unidades`, `dimensioproductos` | Se reutiliza el código, nombre, unidad y reglas de conversión existentes. `unidades.id` es `TINYINT`. |
| Existencia física | `inventarios`, `detalleinventarios` | Las notas regulares y sus artículos adicionales afectan «Producto Venta», `inventarios.id = 6`. Las líneas copiadas de una orden o una factura no mueven existencias. `detalleinventarios.cantidad` es `DECIMAL(12,4)`. |
| Historial de existencias | `movimientos`, `tipomovimientos`, `tablas` | `movimientos` ya guarda cantidad, producto, fecha, usuario, sucursal, `idtabla` e `idfila`. Las salidas y reversiones de notas se identificarán allí, sin usar `boletas`. |
| Factura y orden de compra | `facturas`, `detallefacturas` | Una nota regular puede apuntar a la factura que se creó al facturarla. Una nota desde factura guarda su fuente sin precios. Una nota desde orden conserva el ID de la orden y de cada línea usada; su proveedor se guarda como cliente de la nota. |
| Consecutivos | `consecutivos` | Tiene contadores por sucursal, pero las Notas de Entrega usarán su propio `id` como número impreso. No se ampliará esta tabla para el módulo. |
| Devoluciones | `devoluciones`, `detalledevoluciones` | TI indicó que el flujo previo a facturar tendrá estructuras nuevas para notas. Las tablas actuales se reservan para devoluciones relacionadas con facturas. |

En una migración normal, se copia a cada línea el nombre histórico relacionado con `idproveedor` y después se elimina la relación con `clientes`; ese dato no se usa como catálogo de destinatarios. En la copia local `pruebas`, una ejecución parcial eliminó `idproveedor` antes de completar la migración: las líneas afectadas se recuperaron con `No especificado (nota historica)` porque el nombre ya no podía derivarse de la tabla de detalle. La migración normal y esa recuperación local son escenarios distintos, descritos en `guiaDB.md`.

## Acuerdos del diseño

- La nota se **registra y emite en una sola operación**: no habrá borradores. En ese momento se descuenta el inventario y queda pendiente de facturación.
- El mismo usuario registra y emite la nota; se guarda un solo `idusuario` tomado de la sesión. Los permisos se integrarán con las clases y la secuencia de acceso existentes, y se validarán también en el servidor. No se añade `idvendedor` independiente.
- `idestado` representa `1` pendiente de factura, `2` facturada, `3` anulada y `4` cerrada desde una factura. No existe estado borrador. Las notas en estado `4` no se pueden facturar ni anular.
- `origen` identifica `1` nota regular, `2` nota creada desde factura y `3` nota creada desde orden de compra. La nota desde factura usa `idfactura_origen`; la de orden usa `idordencompra_origen`. `idfactura` mantiene su función de enlazar la factura que se cree al facturar notas regulares.
- La cantidad capturada y la devuelta tendrán dos decimales. `cantidad_inventario` conserva la cantidad exacta descontada o repuesta en la unidad de stock. No habrá `fecha_entrega` separada: la fecha de emisión identifica el registro y la salida; cada devolución tendrá su propia fecha.
- `idsucursal` sí se conserva. La sucursal activa está en la sesión PHP como `$_SESSION['IMPRESA']`; el servidor debe guardar ese valor en la nota al emitirla. No se confiará en una sucursal enviada libremente por el navegador.
- Cada línea guarda su propio destinatario como texto. La lista de cinco nombres es fija en la interfaz y permite ingresar otro nombre sin crear registros de catálogo.
- El inventario de origen del módulo será el `id = 6`, según TI. No se propone `idinventario` por línea mientras este alcance sea fijo.
- No se usarán `boletas` ni `sp_mantdetalleboletas` para emitir notas. Cada salida y reversión se registrará en `movimientos` con referencia a la línea de nota.
- Antes de facturar se admiten **varias devoluciones parciales de la misma nota**, en tablas propias. La nota conserva su ID y estado pendiente mientras quede material entregado. Cada devolución repone solo lo recibido. Cuando la suma de devoluciones alcanza todas las líneas, la nota pasa a anulada. Después de facturar se usa el flujo de devoluciones de facturas.
- El número impreso será `notasentrega.id`. `referencia` queda para un dato externo como pedido u orden de compra; no se usará como contador.

## Relaciones previstas

- Una nota contiene una o varias líneas: `detallenotasentrega.idnota → notasentrega.id`.
- Cada línea referencia el artículo mediante `idproducto → productos.id`; `destinatario` es una copia de texto independiente de los catálogos.
- Una factura puede agrupar varias notas completas. `notasentrega.idfactura` empieza en `NULL` y varias notas podrán recibir el mismo valor después de crear la factura.
- Una factura de venta puede originar varias notas informativas. `notasentrega.idfactura_origen` y `detallenotasentrega.iddetallefactura_origen` guardan el origen de cada una. No se calcula saldo acumulado contra notas anteriores, pero cada cantidad debe ser positiva y no superar la cantidad de su línea fuente.
- Una orden de compra puede originar varias notas mientras quede saldo por línea. `notasentrega.idordencompra_origen` guarda la orden y `detallenotasentrega.iddetallefactura_origen` identifica cada línea copiada. El SP serializa emisiones por orden y solo acepta la cantidad pendiente completa. Las líneas copiadas no mueven inventario ni admiten anulaciones; las líneas adicionales de inventario conservan el flujo regular.
- `detallenotasentrega.iddetallefactura` conserva el vínculo entre la línea física y la línea facturada.
- Las salidas usan movimiento tipo `10`, `idtabla = 521` (`detallenotasentrega`) e `idfila = detallenotasentrega.id`. Las devoluciones usan tipo `7`, `idtabla = 523` (`detalledevolucionesnotasentrega`) e `idfila = detalledevolucionesnotasentrega.id`; esa línea de devolución enlaza con la línea original. TI aprobó los IDs `520`–`523` para `tablas`.
- Una nota puede tener muchas devoluciones; cada devolución contiene una o varias líneas. La factura toma la cantidad original menos todas las devoluciones anteriores a facturar. No se crea una nota sustituta.

## Tabla propuesta: `notasentrega`

| Campo | Tipo propuesto | Uso y estado de decisión |
| --- | --- | --- |
| `id` | `INT`, clave primaria autoincremental | Identificador interno y número impreso de la nota. |
| `idsucursal` | `INT NOT NULL` | Sucursal activa al emitir, tomada de la sesión en el servidor. |
| `idcliente` | `INT NULL` | Cliente registrado; `NULL` indica contado con nombre libre. Al facturar se traduce a `facturas.idcliente = 0`. |
| `nombre_cliente` | `VARCHAR(150) NOT NULL` | Nombre obligatorio para boleta y consultas. Si `idcliente` es `NULL`, se exige un máximo de 64 caracteres para caber en `facturas.comodin`. |
| `cliente_cedula` | `VARCHAR(45) NULL` | Dato de impresión si se proporciona; su uso fiscal posterior requiere validación. |
| `idusuario` | `INT NOT NULL` | Usuario autenticado que registra y emite la nota en la misma operación; su rol determina si puede hacerlo. |
| `clave_operacion` | `CHAR(36) NOT NULL UNIQUE` | Clave estable de la solicitud para reconocer un reintento de emisión y evitar una segunda salida. |
| `fecha_emision` | `DATETIME NOT NULL` | Momento del registro, emisión y descuento de inventario. Sustituye `fecha_creacion` del modelo con borradores. |
| `idestado` | `TINYINT NOT NULL DEFAULT 1` | `1` pendiente, `2` facturada, `3` anulada y `4` cerrada desde factura. |
| `origen` | `TINYINT UNSIGNED NOT NULL DEFAULT 1` | `1` nota regular, `2` factura y `3` orden de compra. |
| `referencia` | `VARCHAR(55) NULL` | Pedido, orden u otra referencia externa; no equivale automáticamente al consecutivo. |
| `observaciones` | `VARCHAR(512) NULL` | Indicaciones de la entrega. |
| `idfactura` | `INT NULL` | Factura posterior; no es único porque una factura puede agrupar notas. |
| `idfactura_origen` | `INT NULL` | Factura de venta de la cual se copió la información. No se reutiliza `idfactura`, que representa la facturación posterior de notas regulares. |
| `idordencompra_origen` | `INT NULL` | Orden de compra de tipo `3` que originó la nota. Su proveedor se usa como cliente; las líneas de orden guardan el vínculo a `detallefacturas`. |
| `fecha_anulacion`, `idusuario_anulador`, `motivo_anulacion` | `DATETIME NULL`, `INT NULL`, `VARCHAR(255) NULL` | Evidencia de una anulación previa a factura. La fecha de devolución se guarda en la devolución correspondiente. |

La tabla `consecutivos` no necesita un contador nuevo para este módulo. El `id` es único en toda la tabla, aunque existan varias sucursales.

## Tabla propuesta: `detallenotasentrega`

Una nota puede contener varias líneas. El destinatario se elige o escribe independientemente para cada artículo.

| Campo | Tipo propuesto | Uso |
| --- | --- | --- |
| `id` | `INT`, clave primaria autoincremental | Identificador de la línea; será la referencia `movimientos.idfila`. |
| `idnota` | `INT NOT NULL` | `notasentrega.id`. |
| `renglon` | `INT NOT NULL` | Orden de impresión y facturación. |
| `idproducto` | `INT NOT NULL` | `productos.id`; el código y nombre pueden cargarse al seleccionar el producto. |
| `destinatario` | `VARCHAR(150) NOT NULL` | Nombre seleccionado o escrito para esta línea; no tiene clave foránea ni se guarda en un catálogo. |
| `idunidad` | `TINYINT NOT NULL` | `unidades.id`. |
| `cantidad` | `DECIMAL(23,2) NOT NULL` | Cantidad entregada en la unidad seleccionada; hasta dos decimales. |
| `cantidad_inventario` | `DECIMAL(12,4) NOT NULL` | Cantidad convertida y realmente descontada del stock; queda en cero en las líneas informativas desde factura y en las copiadas de una orden de compra. Las líneas locales añadidas a una nota de orden conservan el stock descontado. |
| `producto_codigo`, `producto_descripcion` | `VARCHAR(45)`, `VARCHAR(150)` | Copia al emitir para que una reimpresión conserve lo entregado aunque cambie el catálogo. |
| `observaciones` | `VARCHAR(255) NULL` | Medida, corte u otra indicación opcional. La interfaz no solicita este dato en el origen desde orden de compra y guarda `NULL` en esas líneas. |
| `iddetallefactura` | `INT NULL` | Línea de `detallefacturas` creada al facturar. |
| `iddetallefactura_origen` | `INT NULL` | Línea fuente de una factura o de una orden de compra; el encabezado determina cuál. No es única, porque una factura puede originar varias notas y una orden puede dividirse usando cantidades pendientes. |

No se proponen IDs de movimiento en esta tabla. La salida se localiza mediante movimiento tipo `10`, `idtabla = 521` e `idfila = detallenotasentrega.id`. Cada devolución se localiza por su propia línea con tipo `7`, `idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. La tabla existente `movimientos` no impone unicidad a estos campos; los SP deben bloquear la nota, comprobar el saldo y reconocer la `clave_operacion` antes de insertar. Deshabilitar el botón en JavaScript evita clics repetidos por accidente, pero no sustituye esas validaciones.

Precios, descuentos e impuestos **no se copian ni se devuelven a la interfaz de emisión desde factura**. Las notas regulares conservan el flujo existente, donde los precios se definen al facturarlas.

### Cantidad de factura frente a cantidad de inventario

En la base local, `detallefacturas` guarda `cantidad` e `idunidad`, pero no una columna equivalente a `cantidad_inventario`. Al insertar una línea de venta, `sp_mantdetallefacturas` calcula la salida con `convercion(vidunidad, vcantidad)` y contempla `dimensioproductos` en algunos casos. `convercion` recibe `DECIMAL(12,3)` y devuelve `DECIMAL(10,2)`; por ello el módulo recibirá cantidades con **máximo dos decimales**, como indicó TI. `f_units_mts` devuelve texto para presentar unidades, no un número para calcular inventario.

`cantidad_inventario` guarda el resultado efectivamente descontado del inventario `6` y debe coincidir con la magnitud del movimiento de salida. El detalle de cada devolución guarda también su `cantidad_inventario` efectivamente repuesta. Para la última devolución de una línea se repone el remanente exacto: `cantidad_inventario` original menos la suma ya repuesta, evitando diferencias acumuladas de redondeo. Los SP verificarán que ninguna conversión sea cero, negativa o exceda el saldo físico.

## Devoluciones parciales previas a la factura

TI confirmó los nombres y la estructura general de estas tablas, separadas de `devoluciones` y `detalledevoluciones` de facturas:

| Tabla nueva | Campos principales propuestos | Función |
| --- | --- | --- |
| `devolucionesnotasentrega` | `id`, `idnota`, `fecha`, `idusuario`, `clave_operacion`, `motivo` | Registrar cada evento de devolución; `idnota` **no es único**, pues una nota admite varios eventos. |
| `detalledevolucionesnotasentrega` | `id`, `iddevolucion`, `iddetallenota`, `cantidad_devuelta`, `cantidad_inventario`, `idunidad` | Registrar cuánto regresó de cada línea, en la unidad entregada y en la unidad repuesta al stock. |

Ejemplo: la nota entrega 10 barras y descuenta 10. Una primera devolución de 3 repone 3 y deja 7 entregadas; otra devolución de 2 repone 2 y deja 5. Si se factura entonces, la línea de factura será por 5 barras y la nota pasará a facturada. Si antes de facturar regresan también las 5 restantes, la nota pasa a anulada. En ningún caso se crea una nota sustituta ni se repone dos veces la misma cantidad.

El procedimiento comprueba que cada `iddetallenota` pertenece a la nota de la devolución, que la unidad coincide con la de esa línea y que `0 < cantidad_devuelta <= cantidad - suma_devuelta_previa`. El evento se permite solo mientras la nota está pendiente y sin factura. Las claves foráneas propuestas por sí solas no garantizan estas reglas entre varias filas.

## Registro en `tablas` y movimientos

`tablas` es un catálogo de nombres de tablas con IDs numéricos utilizado por las consultas genéricas del proyecto. No crea las tablas físicas. Los IDs confirmados por TI son `520` para `notasentrega`, `521` para `detallenotasentrega`, `522` para `devolucionesnotasentrega` y `523` para `detalledevolucionesnotasentrega`.

La propuesta inicial `516`–`519` se descartó porque `516` y `517` ya pertenecen a otros objetos en `pruebas`. TI aprobó `520`–`523`, confirmados libres de nuevo el 2026-10-06. La [migración local](SQL-Notas-Entrega-Migracion.sql) registra esos IDs después de crear las tablas. Para otra instalación hay que revisar las colisiones y el nombre de la base antes de ejecutarla.

El tipo `7` («Devolucion») ya existe; el SQL agrega el tipo `10` («Notas de Entrega») después de comprobar el destino. La salida usa tipo `10`, `idtabla = 521` e `idfila = detallenotasentrega.id`. La devolución usa tipo `7`, `idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. Cada movimiento registra cantidad con signo, usuario, sucursal y saldo resultante. No se usará el flujo de boletas internas.

## Consistencia que debe conservar la implementación

1. La operación única de crear y emitir guarda cabecera, líneas, descuentos en `detalleinventarios` y movimientos, o no guarda nada si falla.
2. Repetir una solicitud con la misma `clave_operacion` no puede emitir ni devolver dos veces. Un bloqueo de la nota y sus líneas impide carreras entre devolución y facturación. JavaScript deshabilita botones durante el envío, pero el servidor mantiene esta garantía.
3. Solo se facturan notas en estado `1` del mismo cliente y sucursal. Si son de contado, la selección es explícita y todas deben tener el mismo nombre libre tras recortar espacios y comparar sin distinguir mayúsculas; la factura usa `idcliente = 0` y copia el nombre de la primera nota a `comodin`. En una sola operación se crean factura y líneas de cantidades **netas**, se guardan `idfactura` e `iddetallefactura` y las notas pasan a estado `2`. Las líneas totalmente devueltas no producen línea de factura. Una línea copiada de orden puede facturarse con cantidad positiva aunque `cantidad_inventario` sea cero; las líneas locales de esa misma nota siguen requiriendo stock registrado.
4. El procedimiento actual `sp_mantdetallefacturas` descuenta stock al crear una línea de venta. Las líneas procedentes de notas necesitan una ruta que conserve cálculos de facturación y vínculos, pero **sin repetir el descuento**. La venta normal mantiene su conducta actual.
5. Cada devolución parcial aumenta el inventario únicamente por lo recibido y conserva la nota pendiente mientras exista saldo entregado. Al devolver todas las líneas, la nota pasa a `3` anulada. Después de facturar se usa el proceso fiscal existente.
6. Una nota en estado `1` no tiene factura ni fecha de anulación; en estado `2` tiene factura y no está anulada; en estado `3` registra su anulación y no se puede facturar. Las transiciones deben mantener estos campos coherentes.
7. Una nota de origen factura se guarda en estado `4`, conserva la factura y línea de origen, y deja `cantidad_inventario = 0` porque no realiza movimiento físico de inventario. No se puede incluir en el flujo de facturación de notas ni en el de anulaciones.

### Procedimientos y restricciones

Nosotros desarrollamos los SP del módulo y entregaremos su comportamiento a TI para revisión. No esperamos que TI entregue esos procedimientos:

- `sp_emitir_nota_entrega` (**implementado**): en una transacción valida usuario/sucursal, cliente o nombre libre, destinatario, producto, unidad y existencias; guarda cabecera y líneas con `clave_operacion`, convierte y descuenta stock del inventario `6`, y genera una salida tipo `10` por línea. Si llega de nuevo la misma clave, comprueba que sea la misma solicitud y devuelve el resultado previo sin otra salida. Para instalación, seguir el orden correspondiente de [guiaDB.md](guiaDB.md).
- `sp_devolver_nota_entrega` (**instalado en `pruebas` y validado por el usuario**): bloquea nota y líneas, exige estado pendiente sin factura, verifica pertenencia y `0 < cantidad_a_devolver <= cantidad_entregada - suma_devuelta_previa`. Guarda un evento con `clave_operacion` y sus líneas; repone solo el saldo recibido, crea un movimiento tipo `7` por línea y pasa la nota a anulada únicamente si todas sus líneas quedan en cero. El detalle usa la unidad original de la línea y la última devolución repone el remanente de inventario exacto. El archivo separado reemplaza únicamente este procedimiento.
- `sp_facturar_notas_entrega` (**actualizado en esta rama**): bloquea las notas seleccionadas, valida cliente/sucursal y estado pendiente, resuelve cliente contado `0` y nombre `comodin`, deriva producto, unidad y cantidades netas desde las notas y anulaciones, crea encabezado y líneas, guarda `idfactura` e `iddetallefactura` y pasa cada nota a facturada. Permite stock cero únicamente en líneas copiadas de una orden; las líneas locales continúan exigiendo una cantidad de inventario positiva. La operación completa hace `COMMIT` o `ROLLBACK`; no altera `detalleinventarios` ni inserta otro movimiento de salida. Se instala desde [SQL-Notas-Entrega-Facturacion.sql](SQL-Notas-Entrega-Facturacion.sql), después de las migraciones de origen.
- `sp_emitir_nota_desde_factura` (**instalado en `pruebas`**): valida que la factura sea una venta de la sucursal activa, deriva cliente y materiales en el servidor, limita cada cantidad a la cantidad de su línea fuente, guarda estado `4`, origen y referencias. No lee ni devuelve precios, no descuenta ni aumenta inventario, no registra movimientos y no controla saldo acumulado entre notas. Se instala desde [SQL-Notas-Entrega-Desde-Facturas.sql](SQL-Notas-Entrega-Desde-Facturas.sql). Estas notas no admiten anulaciones.
- `sp_emitir_nota_entrega` con soporte de órdenes (**instalado en `pruebas` y verificado**): recibe el ID opcional de una orden. Bloquea la orden, deriva proveedor/cliente, valida la línea y su saldo pendiente completo; copia esas líneas sin movimientos. Las líneas sin ID de origen se tratan como artículos adicionales y descuentan inventario. La migración reemplaza la versión de nueve parámetros por una de diez.
- `sp_devolver_nota_entrega` con protección de origen (**instalado en `pruebas`**): permite anular líneas adicionales de inventario, pero rechaza las líneas copiadas de una orden o factura, que tienen `iddetallefactura_origen`.

La ruta de facturación de notas replica **solo lo necesario para la línea y sus datos auxiliares** del flujo actual (por ejemplo, el peso en `msdetallefacturas` cuando aplique). Usa nombres explícitos de columnas y evita llamar a `sp_mantdetallefacturas`, porque esa rutina descuenta inventario y registra un movimiento tipo `4`. El procedimiento de ventas ordinarias permanece sin cambios.

Las claves foráneas y los `CHECK` del borrador son barreras adicionales. Las reglas que involucran varias filas (pertenencia de la línea, suma ya devuelta, estado, movimiento único y factura única) se validarán en los SP con bloqueo transaccional. Al probarlos se comprobará que los mantenimientos actuales no intenten borrar registros referenciados.

## Decisiones cerradas y estado de implementación

| Tema | Decisión del 2026-10-05 | Trabajo de implementación |
| --- | --- | --- |
| Cliente contado | Nota con `idcliente = NULL` y `nombre_cliente`; factura con `idcliente = 0` y `comodin` igual al nombre. | Validación de nombre y agrupación incluidas en el flujo. |
| Devoluciones | Se admiten varias devoluciones parciales y se conserva la nota original. Anular solo cuando todo el material vuelve. | Implementado, instalado y probado en `pruebas`. |
| Acceso | TI indicó que ya existe secuencia de permisos por clases en HTML. | La interfaz reutiliza los permisos existentes y el servidor los valida antes de operar. |
| Inventario | Todas las sucursales usan inventario `6`; la sucursal de la nota se registra en movimientos. | Emisión y anulaciones validan existencias y usan la sucursal de la sesión. |
| Movimientos | Salida tipo `10` desde tabla `521`; devolución tipo `7` desde tabla `523`. | Los SP registran los movimientos y manejan transacciones y reintentos; los botones JS son ayuda visual. |
| Catálogo `tablas` | TI aprobó IDs `520`–`523`. | Incluidos en la migración inicial; verificar que no haya colisiones antes de instalar en otro entorno. |
| Unidades | Cantidades visibles con dos decimales; `convercion` calcula y `f_units_mts` solo presenta texto. | La conversión y validaciones se realizan durante la emisión; la cantidad de inventario se conserva para anulaciones. |
| Facturación | La ruta de notas crea líneas netas sin un segundo descuento de inventario. | Procedimiento y pantalla están implementados e instalados en `pruebas`; la factura sigue el registro fiscal normal después de su preparación. |
| Integridad | Los SP y restricciones mantienen las relaciones y transiciones. | La lógica transaccional cubre claves de operación, estado de nota, cantidades devueltas y vínculo único de factura. |

La migración local instaló las cuatro tablas, sus IDs `520`–`523` en `tablas` y el tipo de movimiento `10` en `pruebas`; esos elementos se verificaron en MariaDB 10.3.7. El SQL inicial no incluye procedimientos ni datos de prueba. En esta base también se verificó el origen desde facturas y el origen desde órdenes, con los procedimientos correspondientes. Las diez órdenes de ensayo (`9374`–`9383`) son datos locales creados para validar el flujo y no deben copiarse a producción. El usuario confirmó emisiones regulares con destinatarios fijos y libres; queda revisar el flujo de órdenes desde la interfaz. La secuencia completa para otros entornos está en [guiaDB.md](guiaDB.md).
