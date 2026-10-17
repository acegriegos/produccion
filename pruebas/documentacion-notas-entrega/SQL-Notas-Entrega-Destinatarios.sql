-- Cambia el detalle de notas de proveedor de catálogo a destinatario libre.
-- Ejecutar una sola vez en una base que ya tenga SQL-Notas-Entrega-Migracion.sql.
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
  DROP FOREIGN KEY `fk_dne_proveedor`;

ALTER TABLE `detallenotasentrega`
  DROP INDEX `idx_dne_proveedor`;

ALTER TABLE `detallenotasentrega`
  DROP COLUMN `idproveedor`;
