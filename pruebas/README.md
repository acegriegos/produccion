# Copia de pruebas — ejecución local

Este documento explica cómo abrir la copia de pruebas del sistema existente desde la terminal integrada de Visual Studio Code en este equipo Windows. El desarrollo del Módulo de Notas de Entrega está en `C:\logintech\apache\htdocs\produccion\pruebas`; la carpeta principal contiene la aplicación de referencia.

## Qué se ejecuta

- **Apache** recibe las peticiones web y ejecuta los archivos PHP. No hay un proceso de «backend» adicional que iniciar.
- **MariaDB** guarda los datos. La aplicación utiliza la conexión definida en `_config/mysqlDB.php`.
- **PHP 7.2.9** está integrado con el Apache instalado. No hay un `composer.json` en la raíz ni hace falta ejecutar Composer para abrir esta copia.

Las rutas de `dashboard/.htaccess` necesitan Apache; abrir `index.php` directamente desde VS Code no inicia la aplicación.

## Arranque desde VS Code

1. Abre la carpeta `C:\logintech\apache\htdocs\produccion\pruebas` en VS Code.
2. Abre **Terminal → Nueva terminal** y comprueba si Apache y MariaDB ya están escuchando:

   ```powershell
   Get-NetTCPConnection -State Listen -LocalPort 3306,8080 -ErrorAction SilentlyContinue |
       Select-Object LocalPort,OwningProcess
   ```

   `3306` corresponde a MariaDB y `8080` a Apache. Si aparecen ambos puertos, ya están iniciados y puedes ir al paso 5. No inicies otra instancia sobre el mismo puerto.

3. Si **MariaDB no está iniciado**, abre una terminal nueva y ejecuta:

   ```powershell
   & 'C:\logintech\mariadb\bin\mysqld.exe' --defaults-file='C:\logintech\mariadb\my.cnf' --console
   ```

   Deja esa terminal abierta. Esta instalación usa los datos de `C:\logintech\mariadb\data` y el puerto `3306`.

4. Si **Apache no está iniciado**, abre otra terminal nueva y ejecuta:

   ```powershell
   & 'C:\logintech\apache\bin\httpd.exe' -t -d 'C:/logintech/apache'
   & 'C:\logintech\apache\bin\httpd.exe' -d 'C:/logintech/apache'
   ```

   El primer comando debe mostrar `Syntax OK`; el segundo inicia el servidor. Deja abierta esa terminal.

5. Abre [http://127.0.0.1:8080/produccion/pruebas/](http://127.0.0.1:8080/produccion/pruebas/) en el navegador. La aplicación debe llevarte al acceso de `dashboard` de la copia de pruebas.

Si iniciaste un proceso en primer plano desde una terminal, puedes detenerlo con `Ctrl+C` en esa misma terminal. Si el puerto ya estaba activo antes de abrir VS Code, la instancia fue iniciada por otro proceso; no necesitas iniciarla de nuevo.

## Detener las instancias existentes

Si el programa se inició en una terminal que aún está abierta, usa `Ctrl+C` en esa terminal. Si ya estaba abierto antes de iniciar VS Code, usa estos pasos.

### Apache

En PowerShell:

```powershell
Get-Process -Name httpd -ErrorAction SilentlyContinue | Stop-Process
```

Si aparece «Access denied», abre PowerShell con los permisos del usuario que inició Apache o como administrador y repite el comando. Esta instalación no tiene Apache registrado como servicio de Windows.

### MariaDB

Si iniciaste MariaDB desde una terminal de VS Code, detenla con `Ctrl+C` en esa misma terminal. La cuenta `pruebas` configurada actualmente en `_config/mysqlDB.php` no tiene el permiso `SHUTDOWN`, por lo que no sirve para apagar una instancia iniciada fuera de esa terminal. La instancia que ya estaba abierta se cerró ordenadamente el 2026-09-23 con una cuenta administrativa preexistente; no se cambiaron los datos ni el archivo de conexión.

### Verificación

```powershell
Get-Process -Name httpd,mysqld -ErrorAction SilentlyContinue
```

Si no aparece ningún proceso, puedes iniciarlos desde dos terminales con los comandos de «Arranque desde VS Code».

## Base de datos: qué está configurado ahora

La conexión ya existía en `_config/mysqlDB.php` cuando se revisó el proyecto. Ese archivo define el servidor, el nombre de la base, el usuario y la clave; no copies la clave al README ni a mensajes.

El 2026-09-23 se comprobó que **actualmente** apunta a MariaDB local (`127.0.0.1:3306`) y a la base `pruebas`. Esta base no está vacía:

| Tabla | Registros |
| --- | ---: |
| `clientes` | 0 |
| `productos` | 5 061 |
| `facturas` | 0 |
| `usuarios` | 1 |
| `inventarios` | 8 |

Tiene 404 tablas en total. El archivo de conexión puede cambiar durante el desarrollo, así que comprueba su valor actual antes de importar datos o ejecutar consultas.

Existe un respaldo en `C:\logintech\production_20260922_091813.sql`. Contiene instrucciones `DROP TABLE` e inserciones; importarlo sobre una base existente puede reemplazar datos. La base `pruebas` ya contiene productos. Antes de importar, hay que confirmar el origen del respaldo y hacer una copia de seguridad de la base de destino.

## Consultar los datos con DBeaver

1. En el panel izquierdo, abre tu conexión MariaDB y luego la base **pruebas** → **Tables**.
2. Haz doble clic en una tabla, por ejemplo `usuarios`, y abre la pestaña **Data** para ver sus filas. En el menú de tu captura, **Read data in SQL console** también sirve. **Edit Table** cambia la estructura de la tabla; no hace falta para consultar datos.
3. En una consola SQL conectada a `pruebas`, puedes ejecutar estas consultas de solo lectura:

   ```sql
   SELECT DATABASE();
   SELECT id, user, nombre, idTipoUsuario FROM usuarios;
   SELECT COUNT(*) AS total_productos FROM productos;
   ```

La cuenta de conexión a MariaDB configurada en `_config/mysqlDB.php` es distinta de los usuarios que entran en la pantalla de la aplicación. No copies claves ni hashes de `usuarios` a este documento.

## Acceso de la aplicación en esta copia

El esquema local `pruebas` incluye `sp_Login`, pero no `sp_validate_token` ni `auth_tokens`. Esta copia de la aplicación ya usaba sesiones PHP y no depende del procedimiento de tokens que estaba presente en la carpeta principal. Al trasladar el trabajo a `pruebas`, se ajustó el manejo de sesión y de las consultas internas del login sin reemplazar el flujo propio de esta copia. No se insertaron usuarios por esa corrección.

También se trasladó la corrección de la recarga continua: las consultas internas enviadas a `/dashboard/login` ya no se redirigen a `facturacion`, y `assets/js/main.js` registra una respuesta inesperada en la consola sin reiniciar la página. Esta copia no importa WebSocket en `main.js`, por lo que no hizo falta modificarlo para ese fin.

## Si la pantalla falla

- Confirma que estén abiertos los puertos `3306` y `8080`.
- Si MariaDB indica que `ibdata1` «must be writable» al iniciarse, comprueba primero si ya hay otro `mysqld` activo con `Get-Process -Name mysqld`. No inicies dos procesos sobre la misma carpeta de datos.
- Revisa los errores de Apache en `C:\logintech\apache\logs\error.log`.
- Abre primero la ruta de esta copia `/produccion/pruebas/`; su `index.php` crea la carpeta `dashboard/view/compiled` que Smarty necesita para mostrar el login.

## Documentación del Módulo de Notas de Entrega

Las decisiones funcionales de TI recibidas el 2026-10-05 ya están incorporadas: devoluciones parciales sobre la misma nota, cliente contado `0` al facturar, cantidades a dos decimales e IDs `520`–`523` para las tablas del módulo. La migración se aplicó en la base local `pruebas` y el 2026-10-06 se verificaron las cuatro tablas, sus IDs en `tablas` y el tipo de movimiento `10`. No instalan SP ni cambian existencias por sí solos. **No vuelvas a ejecutar la migración sobre esa misma base.** Las cifras de tablas y registros indicadas arriba son una fotografía del 2026-09-23, no conteos actuales.

- [Objetivo y flujo general](documentacion-notas-entrega/MODULO-NOTAS-DE-ENTREGA.md)
- [Base de datos](documentacion-notas-entrega/DB-Notas-Entrega.md)
- [Migración SQL aplicada en `pruebas`](documentacion-notas-entrega/SQL-Notas-Entrega-Migracion.sql)
- [Backend](documentacion-notas-entrega/Backend-Notas-Entrega.md)
- [Frontend y boleta](documentacion-notas-entrega/Frontend-Notas-Entrega.md)
