# Notas de Entrega — base de datos

> Estado: decisiones funcionales de TI incorporadas y [migración local](SQL-Notas-Entrega-Migracion.sql) validada sin ejecutarla el 2026-10-06. Todavía no se han creado las tablas del módulo ni desarrollado sus procedimientos.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Backend](Backend-Notas-Entrega.md) · [Frontend](Frontend-Notas-Entrega.md)

## Cómo encaja en la base existente

La conexión de esta copia está en `_config/mysqlDB.php` y apunta a la base local `pruebas`. No se guardan claves en esta documentación. Los nombres y tipos se comprobaron contra esa base; otra instalación podría tener un esquema distinto.

| Necesidad | Estructura existente | Hallazgo para el módulo |
| --- | --- | --- |
| Cliente | `clientes`, `facturas.idcliente`, `facturas.comodin` | La nota admite `idcliente = NULL` con `nombre_cliente` obligatorio. Al facturar como cliente contado se usa `facturas.idcliente = 0` y `facturas.comodin = nombre_cliente`, siguiendo el patrón del módulo de ventas. `facturas.comodin` admite 64 caracteres; el nombre libre de la nota no puede exceder ese límite. |
| Proveedor de cada artículo | `clientes`, `proveedorproductos` | Los proveedores están en `clientes` con `bisproveedor = 1`. Un artículo puede tener varios proveedores; la persona selecciona cualquiera de la lista. `proveedorproductos` puede aportar referencias, pero no debe limitar automáticamente la selección. |
| Artículo y unidad | `productos`, `unidades`, `dimensioproductos` | Se reutiliza el código, nombre, unidad y reglas de conversión existentes. `unidades.id` es `TINYINT`. |
| Existencia física | `inventarios`, `detalleinventarios` | Según TI, las notas afectarán «Producto Venta», `inventarios.id = 6`. `detalleinventarios.cantidad` es `DECIMAL(12,4)`. |
| Historial de existencias | `movimientos`, `tipomovimientos`, `tablas` | `movimientos` ya guarda cantidad, producto, fecha, usuario, sucursal, `idtabla` e `idfila`. Las salidas y reversiones de notas se identificarán allí, sin usar `boletas`. |
| Factura | `facturas`, `detallefacturas` | Varias notas pueden apuntar al mismo `facturas.id`; cada línea de nota debe rastrearse hasta su línea de factura. |
| Consecutivos | `consecutivos` | Tiene contadores por sucursal, pero las Notas de Entrega usarán su propio `id` como número impreso. No se ampliará esta tabla para el módulo. |
| Devoluciones | `devoluciones`, `detalledevoluciones` | TI indicó que el flujo previo a facturar tendrá estructuras nuevas para notas. Las tablas actuales se reservan para devoluciones relacionadas con facturas. |

En los datos locales se encontraron asociaciones en `proveedorproductos`, pero no había filas marcadas como proveedor en `clientes`. El 2026-10-01 se creó **solo en la base local `pruebas`** el cliente de ensayo `id = 500`, nombre `PROVEEDOR PRUEBA NOTAS ENTREGA`, activo y con `bisproveedor = 1`. Antes no existía, por eso el `UPDATE` propuesto por TI habría afectado cero filas. Este dato de prueba no forma parte de la migración para otras instalaciones.

## Acuerdos del diseño

- La nota se **registra y emite en una sola operación**: no habrá borradores. En ese momento se descuenta el inventario y queda pendiente de facturación.
- El mismo usuario registra y emite la nota; se guarda un solo `idusuario` tomado de la sesión. Los permisos se integrarán con las clases y la secuencia de acceso existentes, y se validarán también en el servidor. No se añade `idvendedor` independiente.
- Se guarda `idestado` como bandera con tres valores propuestos: `1` pendiente de factura, `2` facturada y `3` anulada. No existe estado borrador.
- La cantidad capturada y la devuelta tendrán dos decimales. `cantidad_inventario` conserva la cantidad exacta descontada o repuesta en la unidad de stock. No habrá `fecha_entrega` separada: la fecha de emisión identifica el registro y la salida; cada devolución tendrá su propia fecha.
- `idsucursal` sí se conserva. La sucursal activa está en la sesión PHP como `$_SESSION['IMPRESA']`; el servidor debe guardar ese valor en la nota al emitirla. No se confiará en una sucursal enviada libremente por el navegador.
- Cada línea tiene su propio proveedor, seleccionado de la lista general. No existe una relación exclusiva entre producto y proveedor.
- El inventario de origen del módulo será el `id = 6`, según TI. No se propone `idinventario` por línea mientras este alcance sea fijo.
- No se usarán `boletas` ni `sp_mantdetalleboletas` para emitir notas. Cada salida y reversión se registrará en `movimientos` con referencia a la línea de nota.
- Antes de facturar se admiten **varias devoluciones parciales de la misma nota**, en tablas propias. La nota conserva su ID y estado pendiente mientras quede material entregado. Cada devolución repone solo lo recibido. Cuando la suma de devoluciones alcanza todas las líneas, la nota pasa a anulada. Después de facturar se usa el flujo de devoluciones de facturas.
- El número impreso será `notasentrega.id`. `referencia` queda para un dato externo como pedido u orden de compra; no se usará como contador.

## Relaciones previstas

- Una nota contiene una o varias líneas: `detallenotasentrega.idnota → notasentrega.id`.
- Cada línea referencia artículo y proveedor: `idproducto → productos.id`; `idproveedor → clientes.id` con `bisproveedor = 1`.
- Una factura puede agrupar varias notas completas. `notasentrega.idfactura` empieza en `NULL` y varias notas podrán recibir el mismo valor después de crear la factura.
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
| `idestado` | `TINYINT NOT NULL DEFAULT 1` | Bandera propuesta: `1` pendiente, `2` facturada, `3` anulada. |
| `referencia` | `VARCHAR(55) NULL` | Pedido, orden u otra referencia externa; no equivale automáticamente al consecutivo. |
| `observaciones` | `VARCHAR(512) NULL` | Indicaciones de la entrega. |
| `idfactura` | `INT NULL` | Factura posterior; no es único porque una factura puede agrupar notas. |
| `fecha_anulacion`, `idusuario_anulador`, `motivo_anulacion` | `DATETIME NULL`, `INT NULL`, `VARCHAR(255) NULL` | Evidencia de una anulación previa a factura. La fecha de devolución se guarda en la devolución correspondiente. |

La tabla `consecutivos` no necesita un contador nuevo para este módulo. El `id` es único en toda la tabla, aunque existan varias sucursales.

## Tabla propuesta: `detallenotasentrega`

Una nota puede contener varias líneas. El proveedor se elige independientemente para cada artículo.

| Campo | Tipo propuesto | Uso |
| --- | --- | --- |
| `id` | `INT`, clave primaria autoincremental | Identificador de la línea; será la referencia `movimientos.idfila`. |
| `idnota` | `INT NOT NULL` | `notasentrega.id`. |
| `renglon` | `INT NOT NULL` | Orden de impresión y facturación. |
| `idproducto` | `INT NOT NULL` | `productos.id`; el código y nombre pueden cargarse al seleccionar el producto. |
| `idproveedor` | `INT NOT NULL` | `clientes.id` de un proveedor elegido de la lista, aunque haya otros para el mismo producto. |
| `idunidad` | `TINYINT NOT NULL` | `unidades.id`. |
| `cantidad` | `DECIMAL(23,2) NOT NULL` | Cantidad entregada en la unidad seleccionada; hasta dos decimales. |
| `cantidad_inventario` | `DECIMAL(12,4) NOT NULL` | Cantidad convertida y realmente descontada del stock al emitir; se conserva para auditoría y reversión. |
| `producto_codigo`, `producto_descripcion` | `VARCHAR(45)`, `VARCHAR(150)` | Copia al emitir para que una reimpresión conserve lo entregado aunque cambie el catálogo. |
| `observaciones` | `VARCHAR(255) NULL` | Medida, corte u otra indicación de la línea. |
| `iddetallefactura` | `INT NULL` | Línea de `detallefacturas` creada al facturar. |

No se proponen IDs de movimiento en esta tabla. La salida se localiza mediante movimiento tipo `10`, `idtabla = 521` e `idfila = detallenotasentrega.id`. Cada devolución se localiza por su propia línea con tipo `7`, `idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. La tabla existente `movimientos` no impone unicidad a estos campos; los SP deben bloquear la nota, comprobar el saldo y reconocer la `clave_operacion` antes de insertar. Deshabilitar el botón en JavaScript evita clics repetidos por accidente, pero no sustituye esas validaciones.

Precios, descuentos e impuestos **no se fijan en la nota**; se definen al crear la factura.

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
3. Solo se facturan notas en estado `1` del mismo cliente y sucursal. Si son de contado, la selección es explícita y todas deben tener el mismo nombre libre tras recortar espacios y comparar sin distinguir mayúsculas; la factura usa `idcliente = 0` y copia el nombre de la primera nota a `comodin`. En una sola operación se crean factura y líneas de cantidades **netas**, se guardan `idfactura` e `iddetallefactura` y las notas pasan a estado `2`. Las líneas totalmente devueltas no producen línea de factura.
4. El procedimiento actual `sp_mantdetallefacturas` descuenta stock al crear una línea de venta. Las líneas procedentes de notas necesitan una ruta que conserve cálculos de facturación y vínculos, pero **sin repetir el descuento**. La venta normal mantiene su conducta actual.
5. Cada devolución parcial aumenta el inventario únicamente por lo recibido y conserva la nota pendiente mientras exista saldo entregado. Al devolver todas las líneas, la nota pasa a `3` anulada. Después de facturar se usa el proceso fiscal existente.
6. Una nota en estado `1` no tiene factura ni fecha de anulación; en estado `2` tiene factura y no está anulada; en estado `3` registra su anulación y no se puede facturar. Las transiciones deben mantener estos campos coherentes.

### Propuesta nuestra para los procedimientos y las restricciones

Nosotros desarrollaremos los SP del módulo y entregaremos su comportamiento a TI para revisión. No esperamos que TI entregue esos procedimientos. Los nombres siguientes son **propuestos**, todavía no son objetos existentes:

- `sp_emitir_nota_entrega`: en una transacción valida usuario/sucursal, cliente o nombre libre, proveedor, producto, unidad y existencias; guarda cabecera y líneas con `clave_operacion`, convierte y descuenta stock del inventario `6`, y genera una salida tipo `10` por línea. Si llega de nuevo la misma clave, comprueba que sea la misma solicitud y devuelve el resultado previo sin otra salida.
- `sp_devolver_nota_entrega`: bloquea nota y líneas, exige estado pendiente sin factura, verifica pertenencia, unidad y `0 < cantidad_a_devolver <= cantidad_entregada - suma_devuelta_previa`. Guarda un evento con `clave_operacion` y sus líneas; repone solo el saldo recibido, crea un movimiento tipo `7` por línea y pasa la nota a anulada únicamente si todas sus líneas quedan en cero.
- `sp_facturar_notas_entrega`: bloquea las notas seleccionadas, valida cliente/sucursal y estado pendiente, resuelve cliente contado `0` y nombre `comodin`, crea factura y líneas por las cantidades netas positivas, guarda `idfactura` e `iddetallefactura` y pasa cada nota a facturada. La operación completa hace `COMMIT` o `ROLLBACK`; no altera `detalleinventarios` ni inserta otro movimiento de salida.

La ruta nueva de detalle de factura replicará **solo lo necesario para la línea y sus datos auxiliares** del flujo actual (por ejemplo, el peso en `msdetallefacturas` cuando aplique). Usará nombres explícitos de columnas y verificaciones de paridad con la facturación normal. No llamará a `sp_mantdetallefacturas` en su acción de venta, porque esa acción descuenta inventario y registra un movimiento tipo `4`. El procedimiento actual de ventas ordinarias permanece como está.

Las claves foráneas y los `CHECK` del borrador son barreras adicionales. Las reglas que involucran varias filas (pertenencia de la línea, suma ya devuelta, estado, movimiento único y factura única) se validarán en los SP con bloqueo transaccional. Al probarlos se comprobará que los mantenimientos actuales no intenten borrar registros referenciados.

## Decisiones cerradas y trabajo pendiente

| Tema | Decisión del 2026-10-05 | Trabajo de implementación |
| --- | --- | --- |
| Cliente contado | Nota con `idcliente = NULL` y `nombre_cliente`; factura con `idcliente = 0` y `comodin` igual al nombre. | Validar nombre no vacío y máximo 64 caracteres para contado; comparar nombres al agrupar. |
| Devoluciones | Se admiten varias devoluciones parciales y se conserva la nota original. Anular solo cuando todo el material vuelve. | Implementar sumas por línea, bloqueo y reposición exacta. |
| Acceso | TI indica que ya existe secuencia de permisos por clases en HTML. | Reutilizarla para mostrar acciones y verificar permisos también en el servidor. |
| Inventario | Todas las sucursales usan inventario `6`; la sucursal de la nota se registra en movimientos. | Confirmar en el SP el saldo del producto y la sucursal de sesión. |
| Movimientos | Salida tipo `10` desde tabla `521`; devolución tipo `7` desde tabla `523`. | Validar referencias, reintentos y concurrencia en el SP. Los botones JS son ayuda visual. |
| Catálogo `tablas` | TI aprobó IDs `520`–`523`. | Comprobar que sigan libres en el destino antes de ejecutar el SQL. |
| Unidades | Cantidades visibles con dos decimales; `convercion` calcula y `f_units_mts` solo presenta texto. | Verificar el resultado convertido y la precisión/límites de la función existente, sobre todo con dimensiones especiales. |
| Facturación | Nosotros creamos la ruta de líneas netas sin segundo descuento de inventario. | Implementar SP y comparar importes y datos auxiliares con la venta normal. |
| Integridad | Nosotros definimos SP y reglas; TI revisa. | Probar claves foráneas, `CHECK`, bloqueos, devoluciones repetidas y facturación simultánea. |

La [migración local](SQL-Notas-Entrega-Migracion.sql) incluye las cuatro tablas, sus IDs en `tablas` y el tipo de movimiento `10`; excluye datos de prueba y SP. **Todavía no se ha ejecutado.** El 2026-10-06 se confirmó conexión a `pruebas` en MariaDB 10.3.7, ausencia de las cuatro tablas, IDs `520`–`523` y tipo `10` libres, tablas referenciadas InnoDB y sintaxis de los cuatro `CREATE TABLE` aceptada mediante preparación sin ejecución. El archivo selecciona explícitamente `pruebas` y termina con una consulta que debe devolver `4`, `4` y `1`. Esta verificación no sustituye la prueba de la migración y los procedimientos funcionando juntos.
