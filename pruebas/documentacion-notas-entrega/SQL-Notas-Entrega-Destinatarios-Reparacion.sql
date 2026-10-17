-- RECUPERACION EXCEPCIONAL SOLO PARA LA BASE LOCAL `pruebas`.
-- Consultar guiaDB.md antes de usar. No forma parte de la instalacion normal.
-- Recupera la base local si la columna idproveedor ya se elimino
-- pero destinatario no existe en detallenotasentrega.
-- Este archivo marca las lineas historicas como no especificadas, porque
-- el identificador del destinatario anterior ya no esta disponible en la tabla.
-- No usar en una base que aun conserva idproveedor; para ella usar la migracion normal.
USE `pruebas`;

ALTER TABLE `detallenotasentrega`
  ADD COLUMN `destinatario` VARCHAR(150) NULL AFTER `idproducto`;

UPDATE `detallenotasentrega`
SET `destinatario` = 'No especificado (nota historica)'
WHERE `destinatario` IS NULL OR TRIM(`destinatario`) = '';

ALTER TABLE `detallenotasentrega`
  MODIFY COLUMN `destinatario` VARCHAR(150) NOT NULL;
