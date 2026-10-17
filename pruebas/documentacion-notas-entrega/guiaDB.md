# Guía de instalación de base de datos — Notas de Entrega

Guía operativa para instalar o actualizar el soporte de base de datos del módulo en MariaDB 10.3. El código PHP no ejecuta estos cambios automáticamente.

> **Antes de empezar:** confirma la base seleccionada y haz un respaldo. Los scripts incluidos usan `USE pruebas`; si el destino tiene otro nombre, cambia esa instrucción en cada archivo que vayas a ejecutar. No ejecutes la migración inicial sobre una base donde ya existe el módulo. Las migraciones incrementales de destinatarios, facturas y órdenes se ejecutan una sola vez por base.

## Caso más probable: la base aún no tiene instalado el módulo

Usa este flujo si la base ya tiene el sistema de la empresa, pero todavía no tiene las tablas ni los procedimientos de Notas de Entrega. Primero confirma que los IDs aprobados estén disponibles. La migración inicial hace `INSERT` directos y se detendrá si encuentra colisiones:

```sql
SELECT id, nombre
FROM tablas
WHERE id IN (520, 521, 522, 523)
   OR nombre IN ('notasentrega', 'detallenotasentrega',
                 'devolucionesnotasentrega', 'detalledevolucionesnotasentrega');

SELECT id, nombre
FROM tipomovimientos
WHERE id = 10 OR nombre = 'Notas de Entrega';
```

Revisa cualquier resultado con TI antes de seguir. Cuando no haya conflictos y el esquema base de la aplicación ya exista, ejecuta los archivos completos en este orden:

1. [SQL-Notas-Entrega-Migracion.sql](SQL-Notas-Entrega-Migracion.sql) — crea las cuatro tablas, sus entradas en `tablas` y el tipo de movimiento `10`. Esta versión inicial crea el campo intermedio `idproveedor`.
2. [SQL-Notas-Entrega-Destinatarios.sql](SQL-Notas-Entrega-Destinatarios.sql) — migra ese campo intermedio a `destinatario`.
3. [SQL-Notas-Entrega-Emision.sql](SQL-Notas-Entrega-Emision.sql) — instala `sp_emitir_nota_entrega`.
4. [SQL-Notas-Entrega-Devoluciones.sql](SQL-Notas-Entrega-Devoluciones.sql) — instala `sp_devolver_nota_entrega`.
5. [SQL-Notas-Entrega-Facturacion.sql](SQL-Notas-Entrega-Facturacion.sql) — instala `sp_facturar_notas_entrega`.
6. [SQL-Notas-Entrega-Desde-Facturas.sql](SQL-Notas-Entrega-Desde-Facturas.sql) — agrega el origen factura y el estado cerrado, permite inventario cero en sus líneas e instala `sp_emitir_nota_desde_factura`.
7. [SQL-Notas-Entrega-Desde-Ordenes-Compra.sql](SQL-Notas-Entrega-Desde-Ordenes-Compra.sql) — agrega la referencia a la orden de compra, actualiza la emisión regular para aceptar líneas de orden y artículos locales, y bloquea la anulación de las líneas que vienen de la orden.

No uses esta secuencia si las tablas del módulo ya existen. La migración inicial no está diseñada para repetirse ni para reanudarse desde la mitad si falla. Los `ALTER TABLE` incrementales tampoco son repetibles: si un archivo termina con error después de agregar columnas, revisa el estado antes de volver a ejecutarlo para evitar duplicar columnas o índices.

Antes de ejecutar las etapas incrementales sobre una base existente, revisa qué origen ya está instalado:

```sql
SHOW COLUMNS FROM notasentrega LIKE 'origen';
SHOW COLUMNS FROM notasentrega LIKE 'idfactura_origen';
SHOW COLUMNS FROM notasentrega LIKE 'idordencompra_origen';
SHOW COLUMNS FROM detallenotasentrega LIKE 'iddetallefactura_origen';
```

Si aparecen `origen`, `idfactura_origen` e `iddetallefactura_origen`, omite el SQL de Desde Facturas y ejecuta solo el SQL de órdenes si aún falta `idordencompra_origen`. Si `idordencompra_origen` ya existe, no repitas esa migración: comprueba también que `sp_emitir_nota_entrega` tenga diez parámetros y que existan los procedimientos reemplazados. Las migraciones incrementales no se repiten porque sus `ALTER TABLE` no son idempotentes.

## Si el módulo ya existe y conserva `idproveedor`

Para una base que ya tiene las tablas de Notas de Entrega y todavía conserva `detallenotasentrega.idproveedor`:

1. Ejecuta completo [SQL-Notas-Entrega-Destinatarios.sql](SQL-Notas-Entrega-Destinatarios.sql). Copia los nombres históricos desde `clientes.nombre`, crea `destinatario` y elimina la FK, el índice y la columna anterior. Es una migración de una sola vez.
2. Ejecuta completo [SQL-Notas-Entrega-Emision.sql](SQL-Notas-Entrega-Emision.sql). Reemplaza `sp_emitir_nota_entrega` para guardar el destinatario de cada línea.
3. Revisa si las columnas de origen factura ya existen. Si faltan, ejecuta [SQL-Notas-Entrega-Desde-Facturas.sql](SQL-Notas-Entrega-Desde-Facturas.sql) para agregarlas e instalar su procedimiento.
4. Si `idordencompra_origen` aún no existe, ejecuta [SQL-Notas-Entrega-Desde-Ordenes-Compra.sql](SQL-Notas-Entrega-Desde-Ordenes-Compra.sql). Requiere el origen factura, reemplaza `sp_emitir_nota_entrega` y `sp_devolver_nota_entrega`, y se aplica una sola vez.

La migración de destinatarios debe terminar correctamente antes de instalar los procedimientos. Los scripts de devoluciones y facturación no forman parte de esta actualización; ejecútalos solo si sus procedimientos aún no están instalados o necesitas actualizarlos.

## Si la base ya tiene `destinatario`

Antes de ejecutar una migración, revisa el estado de la tabla:

```sql
SELECT DATABASE();
SHOW COLUMNS FROM detallenotasentrega LIKE 'idproveedor';
SHOW COLUMNS FROM detallenotasentrega LIKE 'destinatario';
```

Si `destinatario` existe y `idproveedor` no existe, la migración de destinatarios ya está aplicada. No repitas esa migración. Revisa las columnas de origen con las consultas anteriores. Ejecuta `SQL-Notas-Entrega-Desde-Facturas.sql` solo si todavía faltan `origen`, `idfactura_origen` o `iddetallefactura_origen`. Después, ejecuta `SQL-Notas-Entrega-Desde-Ordenes-Compra.sql` solo si falta `idordencompra_origen`. Ejecuta `SQL-Notas-Entrega-Emision.sql` solo si necesitas actualizar la emisión regular antes de la migración de órdenes.

Si ambos campos existen, detente y revisa el estado de la migración antes de continuar. Si ninguno existe, no ejecutes la migración normal a ciegas: primero revisa un respaldo para recuperar los nombres históricos. El archivo [SQL-Notas-Entrega-Destinatarios-Reparacion.sql](SQL-Notas-Entrega-Destinatarios-Reparacion.sql) es una recuperación excepcional de la base local `pruebas`; asigna `No especificado (nota historica)` a líneas antiguas y **no es el procedimiento normal para producción**.

Si una migración de órdenes agregó `idordencompra_origen` pero falló al crear uno de los procedimientos, no vuelvas a ejecutar el archivo completo. La columna y el índice ya existirían y el `ALTER TABLE` volvería a fallar. Confirma el estado con la sección siguiente y solicita la corrección puntual del procedimiento que faltó.

## Cómo ejecutar los archivos en DBeaver

Los SQL de procedimientos incluyen `DELIMITER $$`. En DBeaver:

1. Abre las preferencias del editor SQL y entra a **SQL Processing**.
2. Desmarca **Blank line is statement delimiter**. Mantén desmarcada **Ignore native delimiter** para que se respete `DELIMITER`.
3. Guarda los cambios, abre el archivo completo y ejecútalo como script con **Execute SQL Script** (Alt+X). No ejecutes únicamente la línea seleccionada ni el `END$$` por separado.
4. Revisa el resultado completo. Si ocurrió un error al crear un procedimiento, verifica si quedó instalado: cada archivo primero ejecuta `DROP PROCEDURE IF EXISTS`.

La configuración de delimitadores aplica sobre todo a Emisión, Devoluciones y Facturación. Para los SQL de migración, también ejecuta el archivo completo.

## Comprobación al terminar

Ejecuta estas consultas en la misma conexión y base donde aplicaste los scripts:

```sql
SELECT DATABASE();
SHOW COLUMNS FROM detallenotasentrega LIKE 'destinatario';
SHOW COLUMNS FROM detallenotasentrega LIKE 'idproveedor';
SHOW COLUMNS FROM notasentrega LIKE 'origen';
SHOW COLUMNS FROM notasentrega LIKE 'idfactura_origen';
SHOW COLUMNS FROM notasentrega LIKE 'idordencompra_origen';
SHOW COLUMNS FROM detallenotasentrega LIKE 'iddetallefactura_origen';

SELECT CONSTRAINT_NAME, COLUMN_NAME, REFERENCED_TABLE_NAME, REFERENCED_COLUMN_NAME
FROM information_schema.KEY_COLUMN_USAGE
WHERE TABLE_SCHEMA = DATABASE()
  AND TABLE_NAME = 'notasentrega'
  AND COLUMN_NAME = 'idordencompra_origen';

SELECT ROUTINE_NAME
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_TYPE = 'PROCEDURE'
  AND ROUTINE_NAME IN (
    'sp_emitir_nota_entrega',
    'sp_devolver_nota_entrega',
    'sp_facturar_notas_entrega',
    'sp_emitir_nota_desde_factura'
  )
ORDER BY ROUTINE_NAME;

SELECT SPECIFIC_NAME, COUNT(*) AS parametros
FROM information_schema.PARAMETERS
WHERE SPECIFIC_SCHEMA = DATABASE()
  AND SPECIFIC_NAME = 'sp_emitir_nota_entrega'
GROUP BY SPECIFIC_NAME;
```

Para el esquema final, `destinatario` debe existir como `VARCHAR(150) NOT NULL` e `idproveedor` debe devolver cero filas. En el esquema con origen de órdenes, `idordencompra_origen` debe tener una clave foránea hacia `facturas.id` y `sp_emitir_nota_entrega` debe mostrar diez parámetros. Deben aparecer los cuatro procedimientos cuando instalaste el paquete completo. Si solo aplicaste una actualización parcial, confirma los procedimientos que corresponden a los archivos ejecutados y verifica que los anteriores sigan instalados.

## Estado de la copia local de desarrollo

En la base local `pruebas`, la migración de destinatarios quedó reparada y verificada: `destinatario` existe como campo obligatorio y `idproveedor` ya no está. Las líneas históricas afectadas por la ejecución parcial quedaron con el texto `No especificado (nota historica)`, porque el identificador anterior ya se había eliminado. Los cuatro procedimientos están instalados. El usuario confirmó dos emisiones desde la interfaz, una con un destinatario fijo y otra con **Otro**.

El SQL de emisión desde factura está instalado en `pruebas`; se verificaron las columnas de origen y `sp_emitir_nota_desde_factura` en MariaDB. La migración de órdenes también fue aplicada en `pruebas`: existe `notasentrega.idordencompra_origen`, el procedimiento de emisión tiene diez parámetros y se reemplazaron los procedimientos de emisión y anulaciones. Se agregaron diez órdenes locales de ensayo, consecutivos `9374` a `9383`, para probar el flujo; esos registros son datos de desarrollo y no se incluyen en los SQL de despliegue.

En otra base, ejecuta Desde Facturas después de la migración de destinatarios y de instalar los procedimientos regulares; luego ejecuta Desde Órdenes de Compra una sola vez. La nota de origen factura queda en estado `4` (cerrada), no mueve inventario y no admite anulaciones. Se pueden emitir varias notas desde la misma factura sin saldo acumulado entre ellas; cada cantidad queda limitada a la cantidad de su línea de factura.

La ruta normal para una base que conserva `idproveedor` sigue siendo la migración de destinatarios del primer apartado; no se debe copiar a otras bases el marcador histórico de la reparación local.

## Archivos SQL de esta guía

| Archivo | Uso |
| --- | --- |
| `SQL-Notas-Entrega-Migracion.sql` | Instalación inicial de las tablas del módulo, solo para base nueva. |
| `SQL-Notas-Entrega-Destinatarios.sql` | Migración normal, una sola vez, desde `idproveedor` a texto `destinatario`. |
| `SQL-Notas-Entrega-Destinatarios-Reparacion.sql` | Recuperación excepcional local cuando ambas columnas faltan; reemplaza nombres históricos por un marcador. |
| `SQL-Notas-Entrega-Emision.sql` | Instala o reemplaza el procedimiento de emisión compatible con destinatarios. |
| `SQL-Notas-Entrega-Devoluciones.sql` | Instala o reemplaza el procedimiento de anulaciones/devoluciones parciales. |
| `SQL-Notas-Entrega-Facturacion.sql` | Instala o reemplaza el procedimiento de facturación de notas. |
| `SQL-Notas-Entrega-Desde-Facturas.sql` | Migración incremental de origen factura e instalación de la emisión cerrada desde una venta. Requiere el módulo con destinatarios ya instalado y se ejecuta una sola vez por base. |
| `SQL-Notas-Entrega-Desde-Ordenes-Compra.sql` | Migración incremental de origen orden de compra. Requiere el SQL de origen factura; agrega la columna y clave foránea, reemplaza los procedimientos de emisión y anulaciones, y se ejecuta una sola vez por base. |

