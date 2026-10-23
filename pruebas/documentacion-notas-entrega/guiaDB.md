# Guía de base de datos — Notas de Entrega

Esta es la guía operativa para instalar o actualizar el módulo en una copia de la aplicación. Ejecuta los SQL en el orden indicado y en la base que usa la aplicación.

> Los archivos SQL de esta carpeta instalan únicamente el módulo. No crean la base completa de Aceros Griegos. Una base realmente vacía necesita primero el esquema y los datos base de la aplicación, que no están versionados en este repositorio.

## Requisitos y alcance

- MariaDB 10.3 o compatible con los procedimientos, transacciones, claves foráneas, restricciones CHECK y funciones JSON usados por los scripts.
- PHP con mysqli y el esquema completo de la aplicación existente.
- La cuenta que ejecute los scripts necesita permisos para crear y alterar tablas, índices y claves, actualizar datos de la migración y crear/reemplazar procedimientos. La cuenta de la aplicación necesita los permisos de lectura/escritura y ejecución de procedimientos que ya usa el resto del sistema. No se incluyen GRANT con usuarios específicos.
- La base debe tener los catálogos y estructuras que consume el sistema: clientes, usuarios, sucursales, permisos, permisosusuarios, productos, unidades, dimensiones, inventarios, detalle de inventarios, movimientos, facturas, detalle de facturas, consecutivos, monedas, tipos de factura, ajustes y tablas de soporte de facturación.
- También deben existir la función convercion y el procedimiento krattos, provistos por la aplicación base. Los SQL de Notas de Entrega no los crean.
- En esta copia los scripts apuntan explícitamente a la base pruebas. Antes de ejecutar, confirma SELECT DATABASE(); y que la aplicación esté configurada para usar esa misma base. No ejecutes los scripts contra una base productiva por accidente.
- El módulo no instala extensiones, funciones ni triggers propios. Sus procedimientos usan funciones JSON que vienen con MariaDB.

No hay una herramienta automática de migraciones en esta copia y PHP no aplica SQL al iniciar. Los archivos SQL son migraciones manuales, algunas de una sola ejecución. No ejecutes el instalador inicial y el procedimiento de actualización sobre la misma instalación.

## Instalación limpia del módulo

Usa este procedimiento cuando la base existente de la aplicación todavía no tenga ninguna de las cuatro tablas del módulo. No aplica a una instancia MariaDB sin esquema de la aplicación.

### 1. Comprobar la base y sus dependencias

Conéctate a la base de pruebas de la aplicación y ejecuta:

    SELECT DATABASE() AS base_seleccionada, VERSION() AS version_mariadb;

    SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME IN (
        'clientes', 'usuarios', 'sucursales', 'permisos', 'permisosusuarios',
        'productos', 'unidades', 'dimensioproductos', 'inventarios',
        'detalleinventarios', 'movimientos', 'tablas', 'tipomovimientos',
        'facturas', 'detallefacturas', 'consecutivos', 'ajustes',
        'monedas', 'tipofacturas', 'correos', 'estadoscuentas', 'log',
        'msdetallefacturas'
      )
    ORDER BY TABLE_NAME;

    SELECT ROUTINE_NAME, ROUTINE_TYPE
    FROM information_schema.ROUTINES
    WHERE ROUTINE_SCHEMA = DATABASE()
      AND ((ROUTINE_TYPE = 'FUNCTION' AND ROUTINE_NAME = 'convercion')
        OR (ROUTINE_TYPE = 'PROCEDURE' AND ROUTINE_NAME = 'krattos'));

El nombre de la base debe ser pruebas. La consulta de tablas debe devolver todos los objetos listados y la consulta de rutinas debe mostrar convercion como FUNCTION y krattos como PROCEDURE. Si falta una dependencia, instala o repara primero la aplicación base.

Comprueba que el módulo no esté instalado parcialmente y que los identificadores reservados estén disponibles:

    SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME IN (
        'notasentrega', 'detallenotasentrega',
        'devolucionesnotasentrega', 'detalledevolucionesnotasentrega'
      );

    SELECT id, nombre
    FROM tablas
    WHERE id BETWEEN 520 AND 523
       OR nombre IN (
         'notasentrega', 'detallenotasentrega',
         'devolucionesnotasentrega', 'detalledevolucionesnotasentrega'
       );

    SELECT id, nombre
    FROM tipomovimientos
    WHERE id = 10 OR nombre = 'Notas de Entrega';

Para esta instalación limpia, las consultas de tablas y catálogos deben devolver cero filas. Si aparece una tabla o un registro, no continúes con el instalador inicial: identifica si la instalación está completa o quedó a medias. Los IDs 520–523 y el tipo de movimiento 10 son parte del contrato del módulo; si chocan con otros registros, detente y coordina la corrección con TI. No los borres ni los reasignes a ciegas.

### 2. Ejecutar los archivos

Abre cada archivo completo en DBeaver, selecciona la conexión a pruebas y usa **Execute SQL Script** (Alt+X). Ejecuta en este orden y espera a que cada archivo termine sin errores antes de continuar:

1. [SQL-Notas-Entrega-Migracion.sql](SQL-Notas-Entrega-Migracion.sql) — crea las cuatro tablas iniciales, registra sus IDs en tablas y agrega tipomovimientos.id = 10.
2. [SQL-Notas-Entrega-Destinatarios.sql](SQL-Notas-Entrega-Destinatarios.sql) — copia el nombre histórico de proveedor a cada línea y migra la columna a texto destinatario.
3. [SQL-Notas-Entrega-Emision.sql](SQL-Notas-Entrega-Emision.sql) — instala el procedimiento regular de emisión.
4. [SQL-Notas-Entrega-Devoluciones.sql](SQL-Notas-Entrega-Devoluciones.sql) — instala el procedimiento base de anulaciones parciales.
5. [SQL-Notas-Entrega-Desde-Facturas.sql](SQL-Notas-Entrega-Desde-Facturas.sql) — agrega el origen factura, permite líneas informativas con inventario cero e instala su procedimiento.
6. [SQL-Notas-Entrega-Desde-Ordenes-Compra.sql](SQL-Notas-Entrega-Desde-Ordenes-Compra.sql) — agrega el origen orden y reemplaza emisión/anulaciones por las versiones compatibles con líneas de orden y materiales locales.
7. [SQL-Notas-Entrega-Facturacion.sql](SQL-Notas-Entrega-Facturacion.sql) — instala el procedimiento final de facturación. Debe ser el último archivo de procedimientos, pues contempla las líneas de órdenes sin movimiento de inventario.

No ejecutes [SQL-Notas-Entrega-Destinatarios-Reparacion.sql](SQL-Notas-Entrega-Destinatarios-Reparacion.sql): es una recuperación excepcional de la base local cuando una ejecución parcial eliminó idproveedor antes de crear destinatario. Puede reemplazar el dato histórico por un texto genérico y no forma parte de una instalación nueva.

Los archivos de estructura Migracion, Destinatarios, Desde-Facturas y Desde-Ordenes-Compra no son repetibles. Los últimos tres contienen cambios de esquema que fallan si ya fueron aplicados. Los archivos de procedimientos eliminan el procedimiento anterior antes de crearlo; si la creación falla, verifica el estado antes de repetir el archivo.

### 3. Configuración del delimitador en DBeaver

Los archivos con procedimientos utilizan DELIMITER $$. En **Preferences → Editors → SQL Editor → SQL Processing**:

1. Desmarca **Blank line is statement delimiter**.
2. Mantén desmarcada **Ignore native delimiter**.
3. Guarda la preferencia y ejecuta el archivo completo con **Execute SQL Script** (Alt+X), no solo una selección ni una línea END$$.

### 4. Verificar el estado final

Ejecuta las consultas siguientes en la misma conexión:

    SELECT DATABASE();

    SHOW COLUMNS FROM notasentrega
    WHERE Field IN ('origen', 'idfactura_origen', 'idordencompra_origen');

    SHOW COLUMNS FROM detallenotasentrega
    WHERE Field IN ('destinatario', 'idproveedor', 'iddetallefactura_origen');

    SELECT TABLE_NAME
    FROM information_schema.TABLES
    WHERE TABLE_SCHEMA = DATABASE()
      AND TABLE_NAME IN (
        'notasentrega', 'detallenotasentrega',
        'devolucionesnotasentrega', 'detalledevolucionesnotasentrega'
      )
    ORDER BY TABLE_NAME;

    SELECT ROUTINE_NAME, ROUTINE_TYPE
    FROM information_schema.ROUTINES
    WHERE ROUTINE_SCHEMA = DATABASE()
      AND ROUTINE_TYPE = 'PROCEDURE'
      AND ROUTINE_NAME IN (
        'sp_emitir_nota_entrega', 'sp_devolver_nota_entrega',
        'sp_emitir_nota_desde_factura', 'sp_facturar_notas_entrega'
      )
    ORDER BY ROUTINE_NAME;

    SELECT SPECIFIC_NAME, COUNT(*) AS parametros
    FROM information_schema.PARAMETERS
    WHERE SPECIFIC_SCHEMA = DATABASE()
      AND SPECIFIC_NAME = 'sp_emitir_nota_entrega'
    GROUP BY SPECIFIC_NAME;

Resultado esperado: existen las cuatro tablas y los cuatro procedimientos; destinatario es VARCHAR(150) NOT NULL; idproveedor no aparece; las columnas de origen factura y orden aparecen en sus tablas; sp_emitir_nota_entrega tiene diez parámetros.

La consulta de triggers debe devolver cero filas para estas cuatro tablas, pues el módulo no instala triggers. Para comprobar índices y claves foráneas:

    SHOW INDEX FROM notasentrega;
    SHOW INDEX FROM detallenotasentrega;
    SHOW CREATE TABLE notasentrega;
    SHOW CREATE TABLE detallenotasentrega;
    SHOW CREATE TABLE devolucionesnotasentrega;
    SHOW CREATE TABLE detalledevolucionesnotasentrega;

    SELECT TRIGGER_NAME, EVENT_OBJECT_TABLE, ACTION_TIMING, EVENT_MANIPULATION
    FROM information_schema.TRIGGERS
    WHERE TRIGGER_SCHEMA = DATABASE()
      AND EVENT_OBJECT_TABLE IN (
        'notasentrega', 'detallenotasentrega',
        'devolucionesnotasentrega', 'detalledevolucionesnotasentrega'
      );

El contrato final de columnas, índices y restricciones está documentado en [DB-Notas-Entrega.md](DB-Notas-Entrega.md).

## Actualización de una base existente sin perder datos

Usa este procedimiento para una base que ya tiene el módulo regular. La ruta más común antes de esta versión tiene destinatario por línea y todavía no tiene origen factura ni orden. Se conservan las notas y demás datos existentes; las migraciones de estructura se ejecutan solo si faltan sus columnas.

### 1. Respaldo e identificación

Antes de cambiar esquema, crea un respaldo completo que incluya rutinas y triggers. En PowerShell, desde el directorio del proyecto, sustituye el marcador por el usuario de la base y ejecuta:

    $backupDir = Join-Path $PWD 'backups'
    New-Item -ItemType Directory -Force -Path $backupDir | Out-Null
    $backupFile = Join-Path $backupDir 'pruebas_antes_notas_entrega.sql'
    $dbUser = '<USUARIO_DB>'
    & 'C:\logintech\mariadb\bin\mysqldump.exe' --host=127.0.0.1 --port=3306 "--user=$dbUser" --password --single-transaction --routines --triggers --events pruebas "--result-file=$backupFile"

El argumento --password solicita la clave de forma interactiva; no la escribas en el comando ni la guardes en el repositorio. Confirma que el archivo de respaldo tenga contenido y sea legible antes de seguir.

Luego ejecuta:

    SELECT DATABASE() AS base_seleccionada, VERSION() AS version_mariadb;
    SHOW COLUMNS FROM detallenotasentrega LIKE 'idproveedor';
    SHOW COLUMNS FROM detallenotasentrega LIKE 'destinatario';
    SHOW COLUMNS FROM notasentrega LIKE 'origen';
    SHOW COLUMNS FROM notasentrega LIKE 'idfactura_origen';
    SHOW COLUMNS FROM notasentrega LIKE 'idordencompra_origen';
    SHOW COLUMNS FROM detallenotasentrega LIKE 'iddetallefactura_origen';

Confirma que DATABASE() sea pruebas y usa las columnas para seleccionar los pasos que aún faltan:

- El esquema de destinatarios está en uno de dos estados válidos: idproveedor presente y destinatario ausente (requiere migración), o destinatario presente e idproveedor ausente (migración ya aplicada). Si ambos campos están presentes o ambos faltan, detente y revisa el estado.
- Para la migración desde factura, las columnas origen e idfactura_origen de notasentrega y iddetallefactura_origen de detallenotasentrega deben estar todas ausentes o todas presentes. Si están ausentes, aplica Desde-Facturas; si están presentes, omítelo. Si solo aparece parte del grupo, detente y revisa la migración parcial.
- Si idordencompra_origen está ausente y el grupo de origen factura ya está completo, aplica Desde-Ordenes-Compra una sola vez. Si idordencompra_origen ya existe, omite el archivo. Si el campo está presente pero la FK o procedimientos no están completos, detente y revisa antes de continuar. Si las columnas de origen factura existen pero falta su procedimiento, también detente: el SQL incremental no debe repetirse para recrearlo.
- Si existen ambas columnas de origen y sus relaciones, la estructura está actualizada. No vuelvas a ejecutar ningún SQL de estructura.

### 2. Instalar o reemplazar procedimientos en el orden correcto

Si todavía no se instaló el origen de órdenes y la base no está en un estado parcial, usa esta secuencia:

1. Si el paso de identificación mostró idproveedor presente y destinatario ausente, ejecuta SQL-Notas-Entrega-Destinatarios.sql una vez. Si destinatario ya existe, omítelo.
2. Ejecuta SQL-Notas-Entrega-Emision.sql.
3. Ejecuta SQL-Notas-Entrega-Devoluciones.sql.
4. Si faltan todas las columnas de origen factura, ejecuta SQL-Notas-Entrega-Desde-Facturas.sql. Si ya están instaladas, omítelo.
5. Si falta idordencompra_origen, ejecuta SQL-Notas-Entrega-Desde-Ordenes-Compra.sql.
6. Ejecuta SQL-Notas-Entrega-Facturacion.sql después de las migraciones de origen.

Los archivos Emision y Devoluciones reemplazan procedimientos base y deben ejecutarse antes de Desde-Ordenes-Compra.sql, que instala las versiones finales que protegen las líneas de orden. No los vuelvas a ejecutar después de la migración de órdenes. Facturacion reemplaza solo su procedimiento y va al final.

Si la base ya tiene idordencompra_origen, no uses la secuencia anterior. Verifica el estado final y no ejecutes archivos de estructura ni versiones base de emisión/anulación. Si el esquema está a medias o no coincide con ninguno de estos estados, conserva el respaldo y solicita revisión antes de ejecutar más DDL. No repitas un SQL solo porque la ejecución anterior mostró un error: algunos ALTER TABLE pueden haberse confirmado antes del fallo.

## Datos iniciales, administrador y configuración adicional

Los únicos registros obligatorios que agrega la instalación limpia son:

- tablas: IDs 520–523 para las cuatro tablas del módulo.
- tipomovimientos: ID 10, “Notas de Entrega”. El tipo 7 para el movimiento de anulación ya pertenece a la aplicación.

Los destinatarios fijos (CURUBANDE, ZAGRA, METALMECANICA GRECIA, NELSON y CLIENTE RETIRO) están definidos en la interfaz y no se insertan en catálogo. Clientes, correos, artículos, unidades, órdenes y usuarios son datos de la aplicación; no se generan datos de prueba con estos SQL.

El módulo no crea un administrador, usuarios ni contraseñas. Debe existir un usuario válido de la aplicación con acceso de escritura al permiso existente de Facturación; el administrador actual sigue el mecanismo oficial de alta y asignación de permisos de la empresa. No agregues una contraseña fija a un SQL versionado.

La nota se imprime desde el navegador y no requiere servicio de correo ni almacenamiento externo propio. La facturación y su registro fiscal dependen de los servicios y configuración ya usados por la aplicación; este módulo no sustituye esa configuración.

## Coordinación y archivos de migración

Los SQL son la herramienta de instalación para esta copia y no se ejecutan automáticamente junto con PHP. No se debe importar un esquema completo que ya traiga las tablas del módulo y luego ejecutar también SQL-Notas-Entrega-Migracion.sql. Para una actualización se ejecuta solo el tramo pendiente según el esquema comprobado; no se recrean tablas ni se reinsertan datos iniciales.

La guía refleja el orden en que se construyó el esquema final. La base local pudo haber recibido pasos anteriores manualmente; el estado de una base concreta se determina con las consultas de inspección, no por asumir que todos los SQL nunca se ejecutaron.
