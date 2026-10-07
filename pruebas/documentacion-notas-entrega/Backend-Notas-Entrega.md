# Notas de Entrega — backend e integración

> Estado al 2026-10-06: el esquema, `sp_emitir_nota_entrega`, `sp_devolver_nota_entrega` y `sp_facturar_notas_entrega` están instalados en `pruebas`. Emisión, devoluciones y sus pantallas se integraron por los PR #1, #3 y #4. Esta rama implementa el backend y la pantalla para preparar la facturación posterior; todavía no se ha probado guardar una factura de punta a punta.
>
> [Objetivo y flujo general](MODULO-NOTAS-DE-ENTREGA.md) · [Base de datos](DB-Notas-Entrega.md) · [Frontend](Frontend-Notas-Entrega.md)

## Arquitectura existente que se reutilizará

La aplicación actual usa Apache, PHP 7.2, Smarty y MariaDB. `dashboard/index.php` resuelve la ruta del módulo hacia `dashboard/control/ctr_<modulo>.php` y consulta el acceso del usuario; `_config/expiracion.php` participa en el control de sesión. Las pantallas se generan con plantillas en `dashboard/view/`, la lógica de datos se organiza en `dashboard/model/` y el acceso a MariaDB está en `_config/mysqlDB.php` y `_config/RUD.php`.

El módulo de facturación existente sirve como punto de integración: `dashboard/control/ctr_facturacion.php` muestra la venta y carga `dashboard/view/ajax/facturas/ajaxVentas.tpl`. La incorporación de notas debe seguir las convenciones del proyecto y conservar las rutas de venta ordinaria.

No se ha identificado un servicio Python necesario para este flujo. La descripción original menciona PHP, Python y APIs disponibles; se añadirá una integración adicional solo si la revisión del código demuestra que hace falta.

## Operaciones previstas

| Operación | Comportamiento requerido |
| --- | --- |
| Registrar y emitir nota | En una sola operación, guardar cliente registrado o `nombre_cliente` libre, sucursal activa, usuario autenticado y líneas con artículo, proveedor, unidad y cantidad de hasta dos decimales; validar existencias del inventario `6`, descontar stock y registrar un movimiento tipo `10` por línea. La nota nace pendiente y devuelve su ID para imprimir. |
| Consultar e imprimir | Recuperar la nota y sus líneas, estado e historial. La reimpresión debe mostrar los datos de la entrega original. |
| Listar pendientes | Filtrar notas emitidas sin factura por cliente, sucursal, fecha y responsable. |
| Registrar devolución | Admitir varios eventos parciales por nota mientras siga pendiente. Por cada línea, reponer solo lo recibido, guardar su cantidad en unidad de stock y registrar movimiento tipo `7`. Mantener la nota hasta devolver todas las líneas; entonces pasa a anulada. |
| Preparar factura | Agrupar notas pendientes del mismo cliente y sucursal; para contado exigir el mismo nombre libre y usar `facturas.idcliente = 0` con `comodin = nombre_cliente`. Definir precios, descuentos e impuestos sobre cantidades netas. Crear líneas sin otro descuento de inventario. |
| Consultar vínculo | Mostrar desde la nota su factura y desde la factura las notas y líneas de origen. |

La emisión, consulta e impresión base están integradas en `master`. Las devoluciones y su pantalla se integraron en el PR #4. Esta rama agrega el endpoint de facturación, los catálogos usados por el formulario, la selección de notas pendientes y la preparación de importes por cantidad neta.

## Instalación y contrato de emisión

Después de aplicar **una sola vez** [SQL-Notas-Entrega-Migracion.sql](SQL-Notas-Entrega-Migracion.sql), instalar [SQL-Notas-Entrega-Emision.sql](SQL-Notas-Entrega-Emision.sql) y, tras revisar esta etapa, [SQL-Notas-Entrega-Devoluciones.sql](SQL-Notas-Entrega-Devoluciones.sql). La migración ya está aplicada en la base local `pruebas`: no debe repetirse allí. Cada archivo de procedimiento usa `DROP PROCEDURE IF EXISTS` para reemplazar solo el SP que declara. Antes de instalar en otro entorno, revisar el nombre de base en `USE`, los IDs `520`–`523`, el tipo `10` y el proveedor de prueba local, que no forma parte de la migración.

El endpoint de esta etapa es `dashboard/notasentrega`, resuelto por `dashboard/index.php`. Usa la sesión existente: `USR` determina el usuario e `IMPRESA` la sucursal. Exige el permiso de escritura (`tipo = 1`) del módulo `facturacion` en `permisosusuarios`, salvo el administrador `id = 1`. Este permiso se reutiliza provisionalmente porque aún no existe un permiso propio del módulo; la opción de menú usa la misma clase visible que Ventas (`per2`). El controlador vuelve a comprobar el permiso en cada petición, pues la comprobación genérica de `dashboard/index.php` permite módulos sin fila de permiso.

| Método y acción | Entrada | Resultado |
| --- | --- | --- |
| `GET dashboard/notasentrega` | Sesión activa | Pantalla HTML de emisión y consulta |
| `GET ?accion=contexto` | Sesión activa | `data.idusuario`, `data.idsucursal`, `data.csrf_token`, `data.max_lineas` |
| `GET ?accion=buscar` | `tipo=clientes|productos|proveedores`, `q` de 2 a 80 caracteres | `data.resultados` con hasta 25 coincidencias; productos incluyen unidad base y saldo visible del inventario `6` |
| `GET ?accion=unidades` | Sesión activa | `data.unidades` para el selector por línea |
| `GET ?accion=opciones-factura` | Sesión activa | Monedas, tipos de factura y formas de pago configurados |
| `POST ?accion=emitir` | JSON y encabezado `X-CSRF-Token` obtenido de `contexto` | `201` con `data.idnota` y `data.repetida=false`; un reintento idéntico devuelve `200` y `repetida=true` |
| `GET ?accion=listar` | Filtros y paginación descritos abajo | `data.notas`, `limite`, `offset` y filtros aplicados |
| `GET ?accion=ver&id=N` | ID de nota | `data.nota` con cabecera, líneas, cantidades devueltas y pendientes, y eventos de devolución; `404` si no pertenece a la sucursal activa |
| `POST ?accion=devolver&id=N` | JSON con clave UUID, motivo opcional y líneas `{iddetallenota, cantidad_devuelta}`; encabezado `X-CSRF-Token` | `201` con `data.iddevolucion`; un reintento idéntico devuelve `200` con `repetida=true` |
| `POST ?accion=facturar` | JSON con 1–100 `idnotas`, encabezado `factura` y líneas de precio/impuestos referidas por `iddetallenota`; encabezado `X-CSRF-Token` | `201` con `data.idfactura`, consecutivo, total y cantidades procesadas. Se rechaza la operación si alguna nota ya no está pendiente o si las notas no corresponden al mismo cliente y sucursal. |

El cuerpo de emisión usa `clave_operacion` UUID estable por intento lógico, `idcliente` (ID registrado o `0`/`null` para contado), `nombre_cliente` obligatorio para contado, `cliente_cedula` opcional, `referencia` y `observaciones` opcionales y `lineas` (1 a 100). Cada línea contiene `idproducto`, `idproveedor`, `idunidad`, `cantidad` positiva de hasta dos decimales y `observaciones` opcionales. El servidor toma usuario y sucursal de la sesión, no del JSON. Un reintento con la misma clave y datos distintos responde `409`; reglas de negocio y formato inválido responden `422`. El cuerpo de error tiene `succed=false` y `error.codigo`/`error.mensaje`.

La solicitud de facturación incluye `idnotas` (IDs sin repetir), `factura` con `idtipoventa` (`1`, `7`, `8` o `10`), `idtipo`, `idtipopago`, `plazo`, `idmoneda`, `divisa`, `oc`, `comentario`, `referencia`, `extra`, `terminal` y `actividadreceptor`; los campos de texto adicionales son opcionales. Cada elemento de `lineas` debe identificar un `iddetallenota` pendiente e incluir `precio` por unidad y los valores financieros de esa línea para la cantidad neta: `descuento`, `costo`, `imv`, `exento`, `exonerado`, `comision`, `idexoneracion`, `comodin`, `idimpuestos` e `iddescuentos`. El procedimiento vuelve a calcular la cantidad, producto, unidad y equivalente de inventario desde la nota y las devoluciones. Debe enviarse exactamente una línea por cada material que todavía tenga saldo; no se envía material totalmente devuelto. Los totales del encabezado se calculan en el servidor a partir de esas líneas. Cliente, usuario, agente y sucursal no se aceptan desde el navegador: el cliente se deriva de las notas, el usuario y la sucursal de la sesión, y no se asigna un agente aparte porque la nota ya conserva a su responsable. Un reintento tras perder la respuesta devuelve la factura existente (HTTP `200`) solo si se envía el mismo conjunto completo de notas y líneas; no crea una segunda factura.

El listado acepta `estado` (`0` todos; `1` pendiente por defecto; `2` facturada; `3` anulada), `idcliente` (`-1` todos por defecto; `0` contado; positivo un cliente registrado), `fecha_desde` y `fecha_hasta` inclusivas (`AAAA-MM-DD`), `idusuario` (`0` todos) y `limite`/`offset` (máximo 100 filas por petición). Todos los filtros son parámetros preparados y siempre se restringe `idsucursal` a la sesión. La respuesta no incluye un total global; se avanza usando `offset` hasta recibir menos de `limite` filas.

El procedimiento de emisión comprueba la identidad de cada línea en reintentos y guarda observaciones JSON `null` como SQL `NULL`. Revisa que la unidad elegida sea compatible con `productos.idunidad`, usa `convercion` para calcular `cantidad_inventario` y descuenta exclusivamente `detalleinventarios` del inventario `6`; el movimiento tipo `10` referencia la línea mediante `idtabla=521` e `idfila`. Si cualquier línea falla, revierte toda la nota y sus salidas.

El SP de devolución bloquea la nota y cada línea, valida el saldo todavía entregado y registra evento, detalle, reposición y movimiento tipo `7` dentro de una transacción. En la devolución final de una línea repone el remanente exacto de inventario que salió originalmente. La clave UUID reconoce un reintento idéntico; una clave usada con otros datos responde `409`. La nota permanece pendiente mientras conserve material entregado y se anula únicamente al devolverlo todo.

El archivo [SQL-Notas-Entrega-Devoluciones.sql](SQL-Notas-Entrega-Devoluciones.sql) instala o reemplaza solo `sp_devolver_nota_entrega`. Se aplica después de la migración ya instalada; no se vuelve a ejecutar la migración.

## Punto crítico: facturación sin doble descuento

En el esquema local, `sp_mantdetallefacturas` descuenta `detalleinventarios` al insertar una línea de venta y registra un movimiento tipo `4` cuando corresponde. Ejemplo: la nota entrega 5 barras y resta 5 del stock; si luego se agrega la factura con el procedimiento normal, este vuelve a restar 5 y el sistema mostraría 10 barras menos aunque solo salieron 5.

Esta rama implementa una ruta específica para facturar notas: toma las líneas de nota como origen, crea `detallefacturas` con precio, impuestos y descuentos elegidos al facturar, conserva los datos auxiliares necesarios (incluido `msdetallefacturas` cuando aplica) y guarda el vínculo por línea. La ruta **no** actualiza `detalleinventarios` ni inserta otra salida en `movimientos`. Usa columnas explícitas al insertar para evitar depender del orden físico de la tabla. La venta normal sigue usando su procedimiento actual.

La preparación de la factura, sus líneas, los vínculos `notasentrega.idfactura` y `detallenotasentrega.iddetallefactura` y el cambio a facturada se confirman en una sola transacción. Se bloquean las notas por ID ascendente y luego sus líneas, igual que el proceso de devoluciones, para impedir una devolución o factura simultánea. Cada nota se factura una sola vez: se incluyen las cantidades que permanecen entregadas y se omiten las líneas totalmente devueltas. El encabezado nace con `isregistrada = 0`, igual que una factura nueva del módulo de ventas; esta pantalla todavía no envía el documento a Hacienda ni registra un pago.

## Inventario y anulaciones

La emisión usa las existencias del inventario de venta `6` para todas las sucursales y registra la sucursal de sesión en la nota y el movimiento. La comprobación y el descuento ocurren bajo control transaccional para impedir consumo concurrente del mismo saldo. Una salida se vincula con `movimientos.idtabla = 521` e `idfila = detallenotasentrega.id`. Reintentar una emisión confirmada con la misma `clave_operacion` devuelve el resultado previo sin crear movimientos adicionales.

TI confirmó tipo `10` para salida y `7` para devolución; el SQL propuesto agrega el `10`. Cada devolución se vincula con `movimientos.idtabla = 523` e `idfila = detalledevolucionesnotasentrega.id`. Nuestros SP guardan devolución, reposición y movimiento en una transacción; aceptan devolver una cantidad igual al saldo disponible, pero jamás mayor. Varias devoluciones pueden afectar la misma línea original. Cuando todas las líneas llegan a cero se registra un solo usuario anulador y la nota pasa a anulada. Las devoluciones posteriores a la factura usan el flujo fiscal existente.

`sp_emitir_nota_entrega` y `sp_devolver_nota_entrega` están instalados en `pruebas` y el flujo de devoluciones fue probado por el usuario. Esta rama agrega `sp_facturar_notas_entrega`, el endpoint PHP y la pantalla para seleccionar notas y asignar precios/impuestos. El procedimiento de facturación está instalado, pero no se ha invocado con una nota ni se ha creado una factura de prueba; la factura queda pendiente de registro fiscal.

Las tablas, tipos, índices y estados propuestos están en [la especificación de base de datos](DB-Notas-Entrega.md).

## Validaciones y acceso

- Confirmar artículo, proveedor, unidad y sucursal. La nota puede comenzar sin cliente de catálogo con nombre obligatorio; al facturar ese caso se usa cliente contado `0` y se copia el nombre a `facturas.comodin` (máximo 64 caracteres). El proveedor se selecciona **por línea** desde todos los proveedores disponibles; no está ligado exclusivamente al artículo.
- Exigir cantidades positivas y suficientes existencias al emitir; no confiar únicamente en la validación de la pantalla.
- Impedir editar los datos materiales de una nota emitida, facturar una anulada, anular una facturada o vincular una nota dos veces.
- Reutilizar el acceso por módulo, clases HTML y datos de sesión existentes; el mismo usuario registra y emite. Ocultar acciones no autorizadas en la pantalla y verificar la autorización también en PHP antes de llamar a los SP.
- Guardar usuario y fecha de cada transición relevante para poder reconstruir la historia de la entrega.

## Pendientes de implementación

1. Revisar la pantalla y la impresión con una sesión interactiva real. Ya se verificaron por SQL la conversión de 1,25 barras a 7,50 unidades, reintento, stock insuficiente, precisión inválida, unidad incompatible y rollback si falla la segunda línea. Además, una petición HTTP con sesión temporal emitió, reintentó y consultó una nota; la nota se retiró y se restauró el stock.
2. El usuario confirmó el flujo de devoluciones y su SQL está instalado en `pruebas`.
3. Revisar e instalar el SP de facturación y probar cantidades netas sin segundo descuento antes de integrar el cambio.

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
