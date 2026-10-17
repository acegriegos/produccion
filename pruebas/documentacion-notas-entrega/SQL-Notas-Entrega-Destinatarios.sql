-- MIGRACION NORMAL A DESTINATARIO LIBRE. MariaDB 10.3.
-- Antes de ejecutar, consultar guiaDB.md y confirmar que idproveedor exista.
-- Aplicar una sola vez en una base que ya tenga el esquema inicial y preserve idproveedor.
-- No ejecutar si la tabla ya tiene destinatario y no tiene idproveedor.
-- La retirada de la FK, su índice y la columna anterior se hace en el mismo ALTER.
-- Conserva en cada línea el nombre del proveedor histórico antes de quitar la FK.
USE `pruebas`;

ALTER TABLE `detallenotasentrega`
  ADD COLUMN `destinatario` VARCHAR(150) NULL AFTER `idproducto`;

UPDATE `detallenotasentrega` d
LEFT JOIN `clientes` c ON c.`id` = d.`idproveedor`
SET d.`destinatario` = LEFT(
  COALESCE(NULLIF(TRIM(c.`nombre`), ''), CONCAT('Destinatario #', d.`idproveedor`)),
  150
);

ALTER TABLE `detallenotasentrega`
  MODIFY COLUMN `destinatario` VARCHAR(150) NOT NULL;

ALTER TABLE `detallenotasentrega`
  DROP FOREIGN KEY `fk_dne_proveedor`,
  DROP INDEX `idx_dne_proveedor`,
  DROP COLUMN `idproveedor`;
