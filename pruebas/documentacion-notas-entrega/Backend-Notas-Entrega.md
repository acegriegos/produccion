# Notas de Entrega — backend e integración

> Estado al 2026-10-16: en la base local `pruebas` están instalados el esquema de destinatarios, el origen desde facturas y la migración de órdenes de compra. Se verificaron la columna y clave foránea del origen de orden, los procedimientos reemplazados y los diez parámetros de `sp_emitir_nota_entrega`. Hay diez órdenes locales de ensayo (`9374`–`9383`); no forman parte de los SQL de despliegue. Esta rama queda pendiente de revisión funcional desde la interfaz. La guía operativa está en [guiaDB.md](guiaDB.md).
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Frontend](Frontend-Notas-Entrega.md)

## Arquitectura existente que se reutilizará

La aplicación actual usa Apache, PHP 7.2, Smarty y MariaDB. `dashboard/index.php` resuelve la ruta del módulo hacia `dashboard/control/ctr_<modulo>.php` y consulta el acceso del usuario; `_config/expiracion.php` participa en el control de sesión. Las pantallas se generan con plantillas en `dashboard/view/`, la lógica de datos se organiza en `dashboard/model/` y el acceso a MariaDB está en `_config/mysqlDB.php` y `_config/RUD.php`.

El módulo de facturación existente sirve como punto de integración: `dashboard/control/ctr_facturacion.php` muestra la venta y carga `dashboard/view/ajax/facturas/ajaxVentas.tpl`. La incorporación de notas debe seguir las convenciones del proyecto y conservar las rutas de venta ordinaria.

No se ha identificado un servicio Python necesario para este flujo. La descripción original menciona PHP, Python y APIs disponibles; se añadirá una integración adicional solo si la revisión del código demuestra que hace falta.

## Operaciones previstas

| Operación | Comportamiento requerido |
| --- | --- |
| Registrar y emitir nota | En una sola operación, guardar cliente registrado o `nombre_cliente` libre, sucursal activa, usuario autenticado y líneas con artículo, destinatario, unidad y cantidad de hasta dos decimales; validar existencias del inventario `6`, descontar stock y registrar un movimiento tipo `10` por línea. La nota nace pendiente y devuelve su ID para imprimir. |
| Consultar e imprimir | Recuperar la nota y sus líneas, estado e historial. La reimpresión debe mostrar los datos de la entrega original. |
| Listar pendientes | Filtrar notas emitidas sin factura por cliente, sucursal, fecha y responsable. |
| Registrar devolución | Admitir varios eventos parciales por nota mientras siga pendiente. Por cada línea, reponer solo lo recibido, guardar su cantidad en unidad de stock y registrar movimiento tipo `7`. Mantener la nota hasta devolver todas las líneas; entonces pasa a anulada. |
| Preparar factura | Agrupar notas pendientes del mismo cliente y sucursal; para contado exigir el mismo nombre libre y usar `facturas.idcliente = 0` con `comodin = nombre_cliente`. Definir precios, descuentos e impuestos sobre cantidades netas. Crear líneas sin otro descuento de inventario. |
| Consultar vínculo | Mostrar desde la nota su factura y desde la factura las notas y líneas de origen. |

La interfaz ofrece tres orígenes: nota regular, factura de venta y orden de compra. La modalidad de factura produce un comprobante informativo cerrado, sin precios ni movimientos de inventario. La modalidad de orden usa al proveedor como cliente, copia líneas seleccionadas por su cantidad pendiente completa sin mover existencias y permite agregar artículos locales, que sí descuentan inventario y admiten anulaciones.

## Instalación y contrato de emisión

La instalación de tablas y procedimientos se documenta en [guiaDB.md](guiaDB.md), que es la referencia operativa para elegir los SQL y su orden. En una base que ya tiene destinatarios, el origen desde factura se instala con [SQL-Notas-Entrega-Desde-Facturas.sql](SQL-Notas-Entrega-Desde-Facturas.sql) y después el origen desde orden con [SQL-Notas-Entrega-Desde-Ordenes-Compra.sql](SQL-Notas-Entrega-Desde-Ordenes-Compra.sql), cada uno una sola vez. Al final, [SQL-Notas-Entrega-Facturacion.sql](SQL-Notas-Entrega-Facturacion.sql) instala o reemplaza `sp_facturar_notas_entrega` para que las líneas de orden se puedan facturar sin existencia local. La aplicación no modifica el esquema automáticamente.

El endpoint de esta etapa es `dashboard/notasentrega`, resuelto por `dashboard/index.php`. Usa la sesión existente: `USR` determina el usuario e `IMPRESA` la sucursal. Exige el permiso de escritura (`tipo = 1`) del módulo `facturacion` en `permisosusuarios`, salvo el administrador `id = 1`. Este permiso se reutiliza provisionalmente porque aún no existe un permiso propio del módulo; la opción de menú usa la misma clase visible que Ventas (`per2`). El controlador vuelve a comprobar el permiso en cada petición, pues la comprobación genérica de `dashboard/index.php` permite módulos sin fila de permiso.

| Método y acción | Entrada | Resultado |
| --- | --- | --- |
| `GET dashboard/notasentrega` | Sesión activa | Pantalla HTML de emisión y consulta |
| `GET ?accion=contexto` | Sesión activa | `data.idusuario`, `data.idsucursal`, `data.csrf_token`, `data.max_lineas` |
| `GET ?accion=buscar` | `tipo=clientes|productos|usuarios`, `q` de 2 a 80 caracteres | `data.resultados` con hasta 25 coincidencias; productos incluyen unidad base y saldo visible del inventario `6` |
| `GET ?accion=buscar-facturas` | `q` de al menos dos dígitos, opcionalmente precedidos por `F-`, `T-`, `S-`, `E-` o `FC-` | Hasta 25 facturas de venta de la sucursal activa, sin totales ni montos |
| `GET ?accion=ver-factura-origen&id=N` | ID interno de una factura de venta en la sucursal activa | Cliente y líneas de producto con cantidad, descripción y destinatario si se puede recuperar desde una nota vinculada; no selecciona campos de precio, descuento, impuesto ni total |
| `GET ?accion=buscar-ordenes` | `q` de al menos dos dígitos del consecutivo de una orden | Hasta 25 órdenes de compra tipo `3` en estado `1` o `2`, de la sucursal activa, con líneas pendientes |
| `GET ?accion=ver-orden-origen&id=N` | ID interno de una orden de compra | Proveedor usado como cliente y líneas de producto con cantidades pendientes, sin datos financieros |
| `GET ?accion=unidades` | Sesión activa | `data.unidades` para el selector por línea |
| `GET ?accion=opciones-factura` | Sesión activa | Monedas, tipos de factura y formas de pago configurados |
| `POST ?accion=emitir` | JSON y encabezado `X-CSRF-Token` obtenido de `contexto` | `201` con `data.idnota` y `data.repetida=false`; un reintento idéntico devuelve `200` y `repetida=true` |
| `POST ?accion=emitir-desde-factura` | `idfactura_origen`, `clave_operacion`, referencia/observaciones opcionales y líneas `{iddetallefactura, cantidad, destinatario, observaciones}` | `201` con `data.idnota`. La cantidad no puede superar la línea de factura y cada solicitud es idempotente. No se modifican existencias ni se registra un movimiento. |
| `POST ?accion=emitir-desde-orden` | `idordencompra_origen`, `clave_operacion`, referencia/observaciones y líneas de orden `{iddetalleorden, idproducto, idunidad, cantidad, destinatario}` mezcladas opcionalmente con artículos locales, que llevan `iddetalleorden=null`. El servidor admite `observaciones` nulas por compatibilidad de la estructura, pero la interfaz de esta modalidad no muestra campo de indicación. | `201` con `data.idnota`. Cada línea de orden debe usar su saldo pendiente completo y no mueve inventario; los artículos locales sí descuentan stock. La transacción protege saldo, reintentos y movimientos. |
| `GET ?accion=listar` | Filtros y paginación descritos abajo | `data.notas`, `limite`, `offset` y filtros aplicados |
| `GET ?accion=ver&id=N` | ID de nota | `data.nota` con cabecera, líneas, cantidades devueltas y pendientes, y eventos de devolución; `404` si no pertenece a la sucursal activa |
| `POST ?accion=devolver&id=N` | JSON con clave UUID, motivo opcional y líneas `{iddetallenota, cantidad_devuelta}`; encabezado `X-CSRF-Token` | `201` con `data.iddevolucion`; un reintento idéntico devuelve `200` con `repetida=true` |
| `POST ?accion=facturar` | JSON con 1–100 `idnotas`, encabezado `factura` y líneas de precio/impuestos referidas por `iddetallenota`; encabezado `X-CSRF-Token` | `201` con `data.idfactura`, consecutivo, total y cantidades procesadas. Se rechaza la operación si alguna nota ya no está pendiente o si las notas no corresponden al mismo cliente y sucursal. |

El cuerpo de emisión usa `clave_operacion` UUID estable por intento lógico, `idcliente` (ID registrado o `0`/`null` para contado), `nombre_cliente` obligatorio para contado, `cliente_cedula` opcional, `referencia` y `observaciones` opcionales y `lineas` (1 a 100). Cada línea contiene `idproducto`, `destinatario` (texto obligatorio de hasta 150 caracteres), `idunidad`, `cantidad` positiva de hasta dos decimales y `observaciones` opcionales. El servidor toma usuario y sucursal de la sesión, no del JSON. Un reintento con la misma clave y datos distintos responde `409`; reglas de negocio y formato inválido responden `422`. El cuerpo de error tiene `succed=false` y `error.codigo`/`error.mensaje`.

La solicitud de facturación incluye `idnotas` (IDs sin repetir), `factura` con `idtipoventa` (`1`, `7`, `8` o `10`), `idtipo`, `idtipopago`, `plazo`, `idmoneda`, `divisa`, `oc`, `comentario`, `referencia`, `extra`, `terminal` y `actividadreceptor`; los campos de texto adicionales son opcionales. Cada elemento de `lineas` debe identificar un `iddetallenota` pendiente e incluir `precio` por unidad y los valores financieros de esa línea para la cantidad neta: `descuento`, `costo`, `imv`, `exento`, `exonerado`, `comision`, `idexoneracion`, `comodin`, `idimpuestos` e `iddescuentos`. El procedimiento vuelve a calcular la cantidad, producto, unidad y equivalente de inventario desde la nota y las devoluciones. Debe enviarse exactamente una línea por cada material que todavía tenga saldo; no se envía material totalmente devuelto. Los totales del encabezado se calculan en el servidor a partir de esas líneas. Cliente, usuario, agente y sucursal no se aceptan desde el navegador: el cliente se deriva de las notas, el usuario y la sucursal de la sesión, y no se asigna un agente aparte porque la nota ya conserva a su responsable. Un reintento tras perder la respuesta devuelve la factura existente (HTTP `200`) solo si se envía el mismo conjunto completo de notas y líneas; no crea una segunda factura.

El listado acepta `estado` (`0` todos; `1` pendiente por defecto; `2` facturada; `3` anulada; `4` cerrada desde factura), `idcliente` (`-1` todos por defecto; `0` contado; positivo un cliente registrado), `fecha_desde` y `fecha_hasta` inclusivas (`AAAA-MM-DD`), `idusuario` (`0` todos) y `limite`/`offset` (máximo 100 filas por petición). Todos los filtros son parámetros preparados y siempre se restringe `idsucursal` a la sesión. La respuesta no incluye un total global; se avanza usando `offset` hasta recibir menos de `limite` filas.

La modalidad desde factura admite ventas emitidas (`idtipoventa` `1`, `7`, `8`, `10` y `106`) de la sucursal activa, incluidos documentos con cliente registrado o contado. Se pueden elegir algunas o todas las líneas y una cantidad parcial o completa de cada línea. No hay saldo acumulado contra notas anteriores, pero la cantidad de cada línea no puede superar el valor de la factura fuente. La nota se guarda en estado `4`, queda cerrada y no aparece entre las notas pendientes para facturar. No admite anulaciones. Las cantidades de la nota no alteran inventario, pues esta modalidad solo genera el comprobante informativo para la entrega.

El procedimiento de emisión comprueba la identidad de cada línea, incluido el texto del destinatario, en reintentos y guarda observaciones JSON `null` como SQL `NULL`. Revisa que la unidad elegida sea compatible con `productos.idunidad`, usa `convercion` para calcular `cantidad_inventario` y descuenta exclusivamente `detalleinventarios` del inventario `6`; el movimiento tipo `10` referencia la línea mediante `idtabla=521` e `idfila`. Si cualquier línea falla, revierte toda la nota y sus salidas.

El SP de devolución bloquea la nota y cada línea, valida el saldo todavía entregado y registra evento, detalle, reposición y movimiento tipo `7` dentro de una transacción. En la devolución final de una línea repone el remanente exacto de inventario que salió originalmente. La clave UUID reconoce un reintento idéntico; una clave usada con otros datos responde `409`. La nota permanece pendiente mientras conserve material entregado y se anula únicamente al devolverlo todo.

El archivo [SQL-Notas-Entrega-Devoluciones.sql](SQL-Notas-Entrega-Devoluciones.sql) instala o reemplaza `sp_devolver_nota_entrega` para el flujo regular. La migración [SQL-Notas-Entrega-Desde-Ordenes-Compra.sql](SQL-Notas-Entrega-Desde-Ordenes-Compra.sql) agrega la clave foránea del origen de orden y reemplaza emisión y anulaciones para aplicar las reglas de ese origen. Se ejecuta una sola vez después de Desde Facturas; no se vuelve a ejecutar una migración ya aplicada.

## Punto crítico: facturación sin doble descuento

En el esquema local, `sp_mantdetallefacturas` descuenta `detalleinventarios` al insertar una línea de venta y registra un movimiento tipo `4` cuando corresponde. Ejemplo: la nota entrega 5 barras y resta 5 del stock; si luego se agrega la factura con el procedimiento normal, este vuelve a restar 5 y el sistema mostraría 10 barras menos aunque solo salieron 5.

Esta rama implementa una ruta específica para facturar notas: toma las líneas de nota como origen, crea `detallefacturas` con precio, impuestos y descuentos elegidos al facturar, conserva los datos auxiliares necesarios (incluido `msdetallefacturas` cuando aplica) y guarda el vínculo por línea. La ruta **no** actualiza `detalleinventarios` ni inserta otra salida en `movimientos`. Usa columnas explícitas al insertar para evitar depender del orden físico de la tabla. La venta normal sigue usando su procedimiento actual.

La preparación de la factura, sus líneas, los vínculos `notasentrega.idfactura` y `detallenotasentrega.iddetallefactura` y el cambio a facturada se confirman en una sola transacción. Se bloquean las notas por ID ascendente y luego sus líneas, igual que el proceso de devoluciones, para impedir una devolución o factura simultánea. Cada nota se factura una sola vez: se incluyen las cantidades que permanecen entregadas y se omiten las líneas totalmente devueltas. El encabezado nace con `isregistrada = 0`, igual que una factura nueva del módulo de ventas; esta pantalla todavía no envía el documento a Hacienda ni registra un pago.

## Inventario y anulaciones

La emisión regular usa las existencias del inventario de venta `6` y registra la sucursal de sesión en la nota y el movimiento. Una nota desde orden combina líneas de origen (sin movimientos) con artículos locales (con salida tipo `10`); el procedimiento bloquea la orden para calcular el saldo de forma serial. Una salida se vincula con `movimientos.idtabla = 521` e `idfila = detallenotasentrega.id`. Reintentar una emisión confirmada con la misma `clave_operacion` devuelve el resultado previo sin crear movimientos adicionales.

TI confirmó tipo `10` para salida y `7` para devolución; la migración inicial registra el tipo `10`. Cada devolución se vincula con `movimientos.idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. Los SP guardan devolución, reposición y movimiento en una transacción; aceptan devolver una cantidad igual al saldo disponible, pero jamás mayor. Varias anulaciones pueden afectar la misma línea original. Cuando todas las líneas llegan a cero se registra un solo usuario anulador y la nota pasa a anulada. Las devoluciones posteriores a la factura usan el flujo fiscal existente.

En `pruebas` están instalados los cuatro procedimientos del módulo, incluido `sp_emitir_nota_desde_factura`. La migración de órdenes ya reemplazó `sp_emitir_nota_entrega` por su versión de diez parámetros, agregó `idordencompra_origen` y actualizó la protección de anulaciones. Hay diez órdenes de ensayo locales; el usuario debe revisar desde la interfaz el origen de orden y la combinación con artículos locales. La factura preparada desde notas queda inicialmente sin registro fiscal (`isregistrada = 0`); su envío a Hacienda y el registro del pago siguen el flujo normal de facturación.

Las tablas, tipos, índices y estados implementados están descritos en [la especificación de base de datos](DB-Notas-Entrega.md).

## Validaciones y acceso

- Confirmar artículo, destinatario, unidad y sucursal. La nota puede comenzar sin cliente de catálogo con nombre obligatorio; al facturar ese caso se usa cliente contado `0` y se copia el nombre a `facturas.comodin` (máximo 64 caracteres). El destinatario se selecciona **por línea** entre cinco opciones fijas —`CURUBANDE`, `ZAGRA`, `METALMECANICA GRECIA`, `NELSON` y `CLIENTE RETIRO`— o se escribe libremente; no se consulta ni guarda en el catálogo de clientes.
- Exigir cantidades positivas y suficientes existencias al emitir; no confiar únicamente en la validación de la pantalla.
- Impedir editar los datos materiales de una nota emitida, facturar una anulada, anular una facturada o vincular una nota dos veces.
- Reutilizar el acceso por módulo, clases HTML y datos de sesión existentes; el mismo usuario registra y emite. Ocultar acciones no autorizadas en la pantalla y verificar la autorización también en PHP antes de llamar a los SP.
- Guardar usuario y fecha de cada transición relevante para poder reconstruir la historia de la entrega.

## Estado de instalación y pruebas

En la base local `pruebas` están instalados los procedimientos de emisión, devoluciones y facturación. El usuario confirmó el flujo de devoluciones y, para el cambio de destinatarios, probó dos emisiones desde la interfaz: una con destinatario fijo y otra con **Otro**. La verificación técnica de la instalación y el tratamiento especial de las líneas históricas están descritos en [guiaDB.md](guiaDB.md). La experiencia de prueba de cada entorno puede diferir según sus datos y su versión de esquema.

## Registro de avance

| Fecha | Avance |
| --- | --- |
| 2026-09-25 | Se documentó el diseño de integración. No se han creado controladores ni cambiado procedimientos del módulo. |
| 2026-10-01 | Se incorporaron los acuerdos de TI: emisión directa, inventario `6`, proveedor por línea y devoluciones de notas separadas. |
| 2026-10-01 | Se simplificó el responsable a un solo usuario, se confirmó una bandera de tres estados y se mantuvo `cantidad_inventario` para la reversión. |
| 2026-10-01 | Se asumió el desarrollo de los SP del módulo y se definió una ruta dedicada para líneas de factura originadas en notas, sin segundo descuento. |
| 2026-10-05 | TI confirmó devoluciones parciales acumulables, cliente contado `0` con `comodin`, catálogo `520`–`523`, cantidades a dos decimales e inventario `6` compartido. |
| 2026-10-06 | Se comprobó el SQL de la migración local sin ejecutarlo en esa revisión. |
| 2026-10-06 | El usuario aplicó la migración y se verificaron cuatro tablas, IDs `520`–`523` y tipo `10` en `pruebas`. Se inició la rama `feat/notas-entrega-emision-backend`. |
| 2026-10-06 | El PR #3 integró la emisión y su interfaz en `master`. La rama de devoluciones añadió el SP, el endpoint transaccional, el saldo por línea y el historial/pantalla; el usuario instaló el SP y confirmó el flujo. El PR #4 quedó integrado en `master`. |
| 2026-10-06 | La rama `feat/notas-entrega-facturacion-backend` agrega el endpoint y el SQL transaccional para facturar cantidades netas. El procedimiento reutiliza la numeración y efectos de encabezado de ventas y omite el descuento de inventario; falta instalar su SQL y construir la pantalla de facturación en una etapa posterior. |
| 2026-10-06 | Se añadió la pantalla de selección y preparación de importes; los catálogos de moneda, tipo de factura y forma de pago responden desde el modelo local. Falta instalar el procedimiento, probar el guardado y revisar el cambio antes del PR. |
| 2026-10-16 | Se instaló en `pruebas` el SQL de origen desde órdenes de compra. La migración agregó su clave foránea y reemplazó emisión/anulaciones; se verificó la firma de diez parámetros y se prepararon diez órdenes locales para la revisión del usuario. |
| 2026-10-16 | La emisión recibe `destinatario` como texto, sin relación con proveedores. Se agregó una migración incremental para conservar los nombres históricos y se actualizó el contrato del procedimiento. |
| 2026-10-16 | La migración parcial local se recuperó con el SQL excepcional; las líneas históricas afectadas quedaron con marcador porque `idproveedor` ya no existía. La guía `guiaDB.md` centraliza el orden de instalación. El usuario confirmó emisiones correctas con destinatario fijo y libre. |
