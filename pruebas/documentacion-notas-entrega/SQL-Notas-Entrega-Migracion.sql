-- MIGRACION LOCAL DE NOTAS DE ENTREGA - 2026-10-06
-- Validada para la base `pruebas` con MariaDB 10.3.7. Ejecutar una sola vez.
-- Crea cuatro tablas, sus IDs en `tablas` y el tipo de movimiento 10.
-- No modifica inventario, facturacion, movimientos, consecutivos ni SP.
-- Los SP y el backend se desarrollaran despues de instalar este esquema.
-- Para otra instalacion, revisar el nombre de la base, los IDs y el esquema.
-- TI aprobo `tablas.id` 520-523; 516-517 estan ocupados en `pruebas`.
-- El proveedor de ensayo `clientes.id` 500 se creo SOLO en la base local
-- `pruebas`, con bisproveedor=1; no forma parte de esta migracion.
-- Tipo 10 = Notas de Entrega (aun no insertado); 7 = Devolucion (ya existe).
-- Nota con idcliente NULL: al facturar se usa facturas.idcliente=0 y
-- facturas.comodin=notasentrega.nombre_cliente, patron actual de contado.
-- `facturas.comodin` admite 64 caracteres: el nombre libre debe caber ahi.
-- Estados de nota: 1 pendiente, 2 facturada, 3 anulada. No hay borrador.
-- Las devoluciones parciales mantienen la nota; al devolver todo se anula.
-- Cantidades de entrega y devolucion: dos decimales.
-- El id de notasentrega sera el numero impreso.

USE `pruebas`;

CREATE TABLE `notasentrega` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idsucursal` INT(11) NOT NULL,
  `idcliente` INT(11) NULL,
  `nombre_cliente` VARCHAR(150) NOT NULL,
  `cliente_cedula` VARCHAR(45) NULL,
  `idusuario` INT(11) NOT NULL,
  `clave_operacion` CHAR(36) NOT NULL,
  `fecha_emision` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idestado` TINYINT(3) NOT NULL DEFAULT 1,
  `referencia` VARCHAR(55) NULL,
  `observaciones` VARCHAR(512) NULL,
  `idfactura` INT(11) NULL,
  `fecha_anulacion` DATETIME NULL,
  `idusuario_anulador` INT(11) NULL,
  `motivo_anulacion` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ne_operacion` (`clave_operacion`),
  KEY `idx_ne_pendientes` (`idestado`, `idcliente`, `idsucursal`, `fecha_emision`),
  KEY `idx_ne_factura` (`idfactura`),
  KEY `idx_ne_usuario` (`idusuario`),
  KEY `idx_ne_anulador` (`idusuario_anulador`),
  KEY `idx_ne_sucursal` (`idsucursal`),
  CONSTRAINT `fk_ne_sucursal` FOREIGN KEY (`idsucursal`) REFERENCES `sucursales` (`id`),
  CONSTRAINT `fk_ne_cliente` FOREIGN KEY (`idcliente`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_ne_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_ne_anulador` FOREIGN KEY (`idusuario_anulador`) REFERENCES `usuarios` (`id`),
  CONSTRAINT `fk_ne_factura` FOREIGN KEY (`idfactura`) REFERENCES `facturas` (`id`),
  CONSTRAINT `chk_ne_estado` CHECK (`idestado` IN (1, 2, 3)),
  CONSTRAINT `chk_ne_nombre_cliente` CHECK (CHAR_LENGTH(TRIM(`nombre_cliente`)) > 0),
  CONSTRAINT `chk_ne_nombre_contado` CHECK (`idcliente` IS NOT NULL OR CHAR_LENGTH(TRIM(`nombre_cliente`)) <= 64)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `detallenotasentrega` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idnota` INT(11) NOT NULL,
  `renglon` INT(11) NOT NULL,
  `idproducto` INT(11) NOT NULL,
  `idproveedor` INT(11) NOT NULL,
  `idunidad` TINYINT(3) NOT NULL,
  `cantidad` DECIMAL(23,2) NOT NULL,
  `cantidad_inventario` DECIMAL(12,4) NOT NULL,
  `producto_codigo` VARCHAR(45) NULL,
  `producto_descripcion` VARCHAR(150) NOT NULL,
  `observaciones` VARCHAR(255) NULL,
  `iddetallefactura` INT(11) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_dne_nota_renglon` (`idnota`, `renglon`),
  UNIQUE KEY `uq_dne_detallefactura` (`iddetallefactura`),
  KEY `idx_dne_producto` (`idproducto`),
  KEY `idx_dne_proveedor` (`idproveedor`),
  KEY `idx_dne_unidad` (`idunidad`),
  CONSTRAINT `fk_dne_nota` FOREIGN KEY (`idnota`) REFERENCES `notasentrega` (`id`),
  CONSTRAINT `fk_dne_producto` FOREIGN KEY (`idproducto`) REFERENCES `productos` (`id`),
  CONSTRAINT `fk_dne_proveedor` FOREIGN KEY (`idproveedor`) REFERENCES `clientes` (`id`),
  CONSTRAINT `fk_dne_unidad` FOREIGN KEY (`idunidad`) REFERENCES `unidades` (`id`),
  CONSTRAINT `fk_dne_detallefactura` FOREIGN KEY (`iddetallefactura`) REFERENCES `detallefacturas` (`id`),
  CONSTRAINT `chk_dne_cantidad` CHECK (`cantidad` > 0),
  CONSTRAINT `chk_dne_stock` CHECK (`cantidad_inventario` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Una nota puede tener varias devoluciones parciales. Cada evento tiene
-- sus propias lineas; el SP valida pertenencia, saldo, estado y stock.
CREATE TABLE `devolucionesnotasentrega` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `idnota` INT(11) NOT NULL,
  `fecha` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idusuario` INT(11) NOT NULL,
  `clave_operacion` CHAR(36) NOT NULL,
  `motivo` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_devne_operacion` (`clave_operacion`),
  KEY `idx_devne_nota` (`idnota`),
  KEY `idx_devne_usuario` (`idusuario`),
  CONSTRAINT `fk_devne_nota` FOREIGN KEY (`idnota`) REFERENCES `notasentrega` (`id`),
  CONSTRAINT `fk_devne_usuario` FOREIGN KEY (`idusuario`) REFERENCES `usuarios` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `detalledevolucionesnotasentrega` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `iddevolucion` INT(11) NOT NULL,
  `iddetallenota` INT(11) NOT NULL,
  `cantidad_devuelta` DECIMAL(23,2) NOT NULL,
  `cantidad_inventario` DECIMAL(12,4) NOT NULL,
  `idunidad` TINYINT(3) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_ddevne_linea` (`iddevolucion`, `iddetallenota`),
  KEY `idx_ddevne_detallenota` (`iddetallenota`),
  KEY `idx_ddevne_unidad` (`idunidad`),
  CONSTRAINT `fk_ddevne_devolucion` FOREIGN KEY (`iddevolucion`) REFERENCES `devolucionesnotasentrega` (`id`),
  CONSTRAINT `fk_ddevne_detallenota` FOREIGN KEY (`iddetallenota`) REFERENCES `detallenotasentrega` (`id`),
  CONSTRAINT `fk_ddevne_unidad` FOREIGN KEY (`idunidad`) REFERENCES `unidades` (`id`),
  CONSTRAINT `chk_ddevne_cantidad` CHECK (`cantidad_devuelta` > 0),
  CONSTRAINT `chk_ddevne_stock` CHECK (`cantidad_inventario` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- IDs confirmados por TI. Los INSERT fallan si el destino ya usa un ID/nombre;
-- comprobar el catalogo del destino antes de ejecutar. No usar INSERT IGNORE.
INSERT INTO `tablas` (`id`, `nombre`) VALUES
  (520, 'notasentrega'),
  (521, 'detallenotasentrega'),
  (522, 'devolucionesnotasentrega'),
  (523, 'detalledevolucionesnotasentrega');

INSERT INTO `tipomovimientos` (`id`, `nombre`) VALUES (10, 'Notas de Entrega');

-- CONTRATO DE MOVIMIENTOS PARA LOS SP POR DESARROLLAR:
-- Salida: tipo=10, idtabla=521, idfila=detallenotasentrega.id, cant negativa.
-- Retorno: tipo=7, idtabla=523, idfila=detalledevolucionesnotasentrega.id,
--          cant positiva; la linea de retorno enlaza a la linea original.
-- Reintentos y simultaneidad deben controlarse en el servidor/BD; deshabilitar
-- botones en JavaScript es solo una ayuda visual.
-- Al facturar se usan cantidades netas; no se crea otro movimiento de stock.

-- Comprobacion de la instalacion: el resultado esperado es 4, 4 y 1.
SELECT
  (SELECT COUNT(*) FROM information_schema.tables
   WHERE table_schema = DATABASE()
     AND table_name IN ('notasentrega', 'detallenotasentrega',
                        'devolucionesnotasentrega', 'detalledevolucionesnotasentrega')) AS tablas_creadas,
  (SELECT COUNT(*) FROM `tablas`
   WHERE (`id` = 520 AND `nombre` = 'notasentrega')
      OR (`id` = 521 AND `nombre` = 'detallenotasentrega')
      OR (`id` = 522 AND `nombre` = 'devolucionesnotasentrega')
      OR (`id` = 523 AND `nombre` = 'detalledevolucionesnotasentrega')) AS catalogo_registrado,
  (SELECT COUNT(*) FROM `tipomovimientos`
   WHERE `id` = 10 AND `nombre` = 'Notas de Entrega') AS tipo_registrado;
