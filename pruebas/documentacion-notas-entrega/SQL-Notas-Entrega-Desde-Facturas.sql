-- Permite emitir notas informativas a partir de facturas de venta.
-- Instalar en un modulo existente con destinatario ya migrado.
-- Para el orden y las precondiciones, consultar guiaDB.md.
-- MariaDB 10.3. Ejecutar el archivo completo como SQL Script en DBeaver.
-- Esta operacion no modifica existencias ni registra movimientos.
USE `pruebas`;

ALTER TABLE `notasentrega`
  DROP CONSTRAINT `chk_ne_estado`,
  ADD COLUMN `origen` TINYINT(3) UNSIGNED NOT NULL DEFAULT 1 AFTER `idestado`,
  ADD COLUMN `idfactura_origen` INT(11) NULL AFTER `idfactura`,
  ADD KEY `idx_ne_factura_origen` (`idfactura_origen`),
  ADD CONSTRAINT `fk_ne_factura_origen`
    FOREIGN KEY (`idfactura_origen`) REFERENCES `facturas` (`id`),
  ADD CONSTRAINT `chk_ne_estado` CHECK (`idestado` IN (1, 2, 3, 4)),
  ADD CONSTRAINT `chk_ne_origen` CHECK (`origen` IN (1, 2, 3));

ALTER TABLE `detallenotasentrega`
  DROP CONSTRAINT `chk_dne_stock`,
  ADD COLUMN `iddetallefactura_origen` INT(11) NULL AFTER `iddetallefactura`,
  ADD KEY `idx_dne_factura_origen` (`iddetallefactura_origen`),
  ADD CONSTRAINT `fk_dne_factura_origen`
    FOREIGN KEY (`iddetallefactura_origen`) REFERENCES `detallefacturas` (`id`),
  ADD CONSTRAINT `chk_dne_stock` CHECK (`cantidad_inventario` >= 0);

DROP PROCEDURE IF EXISTS `sp_emitir_nota_desde_factura`;
DELIMITER $$
CREATE PROCEDURE `sp_emitir_nota_desde_factura`(
    IN p_sucursal INT,
    IN p_usuario INT,
    IN p_factura INT,
    IN p_clave CHAR(36),
    IN p_referencia VARCHAR(55),
    IN p_observaciones VARCHAR(512),
    IN p_lineas LONGTEXT
)
procedimiento: BEGIN
    DECLARE v_id INT;
    DECLARE v_insert_result INT;
    DECLARE v_existentes INT;
    DECLARE v_total INT;
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_j INT DEFAULT 0;
    DECLARE v_texto VARCHAR(64);
    DECLARE v_texto_anterior VARCHAR(64);
    DECLARE v_iddetalle_factura INT;
    DECLARE v_idproducto INT;
    DECLARE v_idunidad INT;
    DECLARE v_cantidad DECIMAL(23,2);
    DECLARE v_cantidad_facturada DECIMAL(23,5);
    DECLARE v_destinatario VARCHAR(150);
    DECLARE v_observacion_linea VARCHAR(255);
    DECLARE v_codigo_producto VARCHAR(45);
    DECLARE v_descripcion_producto VARCHAR(150);
    DECLARE v_detalle_count INT;
    DECLARE v_factura_count INT;
    DECLARE v_idcliente_factura INT;
    DECLARE v_idcliente INT;
    DECLARE v_nombre_cliente VARCHAR(150);
    DECLARE v_cedula_cliente VARCHAR(45);
    DECLARE v_nombre_catalogo VARCHAR(150);
    DECLARE v_cedula_catalogo VARCHAR(45);
    DECLARE v_comodin VARCHAR(64);
    DECLARE v_sucursal_anterior INT;
    DECLARE v_usuario_anterior INT;
    DECLARE v_cliente_anterior INT;
    DECLARE v_factura_anterior INT;
    DECLARE v_origen_anterior INT;
    DECLARE v_nombre_anterior VARCHAR(150);
    DECLARE v_cedula_anterior VARCHAR(45);
    DECLARE v_referencia_anterior VARCHAR(55);
    DECLARE v_observaciones_anteriores VARCHAR(512);
    DECLARE v_estado_anterior INT;
    DECLARE v_cantidad_anterior DECIMAL(23,2);
    DECLARE v_destinatario_anterior VARCHAR(150);
    DECLARE v_observacion_anterior VARCHAR(255);
    DECLARE v_referencia VARCHAR(55);
    DECLARE v_observaciones VARCHAR(512);

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;

    IF p_sucursal IS NULL OR p_sucursal < 0
       OR NOT EXISTS (SELECT 1 FROM sucursales WHERE id = p_sucursal) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sucursal invalida';
    END IF;
    IF p_usuario IS NULL OR p_usuario <= 0
       OR NOT EXISTS (SELECT 1 FROM usuarios WHERE id = p_usuario) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario invalido';
    END IF;
    IF p_factura IS NULL OR p_factura <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Factura invalida';
    END IF;
    IF p_clave IS NULL OR p_clave NOT REGEXP
       '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave de operacion invalida';
    END IF;
    IF p_lineas IS NULL OR JSON_VALID(p_lineas) = 0
       OR JSON_TYPE(p_lineas) <> 'ARRAY' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Detalle JSON invalido';
    END IF;

    SET v_total = JSON_LENGTH(p_lineas);
    IF v_total < 1 OR v_total > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La nota requiere entre 1 y 100 lineas';
    END IF;
    SET v_referencia = NULLIF(TRIM(p_referencia), '');
    SET v_observaciones = NULLIF(TRIM(p_observaciones), '');
    IF CHAR_LENGTH(v_referencia) > 55 OR CHAR_LENGTH(v_observaciones) > 512 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Referencia u observaciones demasiado largas';
    END IF;

    -- Validar datos y evitar repetir una línea de origen en la misma nota.
    WHILE v_i < v_total DO
        IF JSON_TYPE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, ']'))) <> 'OBJECT' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de factura invalida';
        END IF;
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].iddetallefactura')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Detalle de factura invalido';
        END IF;
        SET v_iddetalle_factura = CAST(v_texto AS UNSIGNED);
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].cantidad')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[0-9]{1,12}(\\.[0-9]{1,2})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad invalida';
        END IF;
        SET v_cantidad = CAST(v_texto AS DECIMAL(23,2));
        IF v_cantidad <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad debe ser positiva';
        END IF;
        IF COALESCE(JSON_TYPE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].destinatario'))), '') <> 'STRING' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destinatario invalido';
        END IF;
        SET v_destinatario = NULLIF(TRIM(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].destinatario')))), '');
        IF v_destinatario IS NULL OR CHAR_LENGTH(v_destinatario) > 150 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destinatario invalido';
        END IF;
        IF JSON_TYPE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].observaciones'))) = 'NULL' THEN
            SET v_observacion_linea = NULL;
        ELSE
            SET v_observacion_linea = NULLIF(TRIM(JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_i, '].observaciones')))), '');
        END IF;
        IF CHAR_LENGTH(v_observacion_linea) > 255 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Indicacion de linea muy larga';
        END IF;

        SET v_j = 0;
        WHILE v_j < v_i DO
            SET v_texto_anterior = JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_j, '].iddetallefactura')));
            IF CAST(v_texto_anterior AS UNSIGNED) = v_iddetalle_factura THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de factura repetida';
            END IF;
            SET v_j = v_j + 1;
        END WHILE;
        SET v_i = v_i + 1;
    END WHILE;

    START TRANSACTION;
    SELECT COUNT(*) INTO v_factura_count
      FROM facturas
     WHERE id = p_factura AND idsucursal = p_sucursal AND id > 0
       AND idtipoventa IN (1, 7, 8, 10, 106);
    IF v_factura_count <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Factura no disponible en la sucursal';
    END IF;
    SELECT f.idcliente, f.comodin, c.nombre, c.cedula
      INTO v_idcliente_factura, v_comodin, v_nombre_catalogo, v_cedula_catalogo
      FROM facturas f
      LEFT JOIN clientes c ON c.id = f.idcliente
     WHERE f.id = p_factura AND f.idsucursal = p_sucursal
       AND f.id > 0 AND f.idtipoventa IN (1, 7, 8, 10, 106)
     LIMIT 1 FOR UPDATE;

    IF v_idcliente_factura > 0 THEN
        SET v_idcliente = v_idcliente_factura;
        SET v_nombre_cliente = NULLIF(TRIM(v_nombre_catalogo), '');
        SET v_cedula_cliente = NULLIF(TRIM(v_cedula_catalogo), '');
        IF v_nombre_cliente IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente de factura sin nombre';
        END IF;
    ELSE
        SET v_idcliente = NULL;
        SET v_nombre_cliente = COALESCE(NULLIF(TRIM(v_comodin), ''), 'Cliente contado');
        SET v_cedula_cliente = NULL;
    END IF;

    INSERT INTO notasentrega
        (idsucursal, idcliente, nombre_cliente, cliente_cedula, idusuario,
         clave_operacion, idestado, origen, referencia, observaciones,
         idfactura_origen)
    VALUES
        (p_sucursal, v_idcliente, v_nombre_cliente, v_cedula_cliente, p_usuario,
         p_clave, 4, 2, v_referencia, v_observaciones, p_factura)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    SET v_insert_result = ROW_COUNT();
    SET v_id = LAST_INSERT_ID();
    SELECT COUNT(*) INTO v_existentes FROM detallenotasentrega WHERE idnota = v_id;

    IF v_existentes = 0 AND v_insert_result <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota existente sin detalle';
    END IF;
    IF v_existentes > 0 THEN
        SELECT idsucursal, idusuario, idcliente, idfactura_origen, origen,
               nombre_cliente, cliente_cedula, referencia, observaciones, idestado
          INTO v_sucursal_anterior, v_usuario_anterior, v_cliente_anterior,
               v_factura_anterior, v_origen_anterior, v_nombre_anterior,
               v_cedula_anterior, v_referencia_anterior,
               v_observaciones_anteriores, v_estado_anterior
          FROM notasentrega WHERE id = v_id FOR UPDATE;
        IF v_existentes <> v_total OR v_sucursal_anterior <> p_sucursal
           OR v_usuario_anterior <> p_usuario
           OR NOT (v_cliente_anterior <=> v_idcliente)
           OR v_factura_anterior <> p_factura OR v_origen_anterior <> 2
           OR v_estado_anterior <> 4 OR v_nombre_anterior <> v_nombre_cliente
           OR NOT (v_cedula_anterior <=> v_cedula_cliente)
           OR NOT (v_referencia_anterior <=> v_referencia)
           OR NOT (v_observaciones_anteriores <=> v_observaciones) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otra nota';
        END IF;
    END IF;

    SET v_i = 0;
    WHILE v_i < v_total DO
        SET v_iddetalle_factura = CAST(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].iddetallefactura'))) AS UNSIGNED);
        SET v_cantidad = CAST(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].cantidad'))) AS DECIMAL(23,2));
        SET v_destinatario = NULLIF(TRIM(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].destinatario')))), '');
        IF JSON_TYPE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].observaciones'))) = 'NULL' THEN
            SET v_observacion_linea = NULL;
        ELSE
            SET v_observacion_linea = NULLIF(TRIM(JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_i, '].observaciones')))), '');
        END IF;

        SELECT COUNT(*) INTO v_detalle_count
          FROM detallefacturas df
          INNER JOIN productos p ON p.id = df.idproducto
          INNER JOIN unidades u ON u.id = COALESCE(NULLIF(df.idunidad, 0), p.idunidad)
         WHERE df.id = v_iddetalle_factura AND df.idfactura = p_factura
           AND df.idproducto > 0
           AND df.cantidad REGEXP '^[0-9]+(\\.[0-9]+)?$'
           AND CAST(df.cantidad AS DECIMAL(23,5)) >= v_cantidad;
        IF v_detalle_count <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea o cantidad no pertenece a la factura';
        END IF;
        SELECT df.idproducto,
               COALESCE(NULLIF(df.idunidad, 0), p.idunidad),
               CAST(df.cantidad AS DECIMAL(23,5)), p.codigo,
               LEFT(COALESCE(NULLIF(TRIM(df.comodin), ''), p.nombre), 150)
          INTO v_idproducto, v_idunidad, v_cantidad_facturada,
               v_codigo_producto, v_descripcion_producto
          FROM detallefacturas df
          INNER JOIN productos p ON p.id = df.idproducto
          INNER JOIN unidades u ON u.id = COALESCE(NULLIF(df.idunidad, 0), p.idunidad)
         WHERE df.id = v_iddetalle_factura AND df.idfactura = p_factura
           AND df.idproducto > 0
           AND df.cantidad REGEXP '^[0-9]+(\\.[0-9]+)?$'
         LIMIT 1 FOR UPDATE;
        IF v_cantidad > v_cantidad_facturada THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad excede la cantidad facturada';
        END IF;

        IF v_existentes > 0 THEN
            SELECT COUNT(*), MAX(cantidad), MAX(destinatario), MAX(observaciones)
              INTO v_detalle_count, v_cantidad_anterior,
                   v_destinatario_anterior, v_observacion_anterior
              FROM detallenotasentrega
             WHERE idnota = v_id AND renglon = v_i + 1
               AND iddetallefactura_origen = v_iddetalle_factura;
            IF v_detalle_count <> 1 OR v_cantidad_anterior <> v_cantidad
               OR NOT (BINARY v_destinatario_anterior = BINARY v_destinatario)
               OR NOT (v_observacion_anterior <=> v_observacion_linea) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otro detalle';
            END IF;
        ELSE
            INSERT INTO detallenotasentrega
                (idnota, renglon, idproducto, destinatario, idunidad, cantidad,
                 cantidad_inventario, producto_codigo, producto_descripcion,
                 observaciones, iddetallefactura_origen)
            VALUES
                (v_id, v_i + 1, v_idproducto, v_destinatario, v_idunidad, v_cantidad,
                 0, v_codigo_producto, v_descripcion_producto,
                 v_observacion_linea, v_iddetalle_factura);
        END IF;
        SET v_i = v_i + 1;
    END WHILE;

    COMMIT;
    SELECT v_id AS idnota, IF(v_existentes > 0, 1, 0) AS repetida;
END$$
DELIMITER ;

-- Verificación de campos y procedimiento instalados.
SELECT COLUMN_NAME
FROM information_schema.COLUMNS
WHERE TABLE_SCHEMA = DATABASE()
  AND ((TABLE_NAME = 'notasentrega' AND COLUMN_NAME IN ('origen', 'idfactura_origen'))
    OR (TABLE_NAME = 'detallenotasentrega' AND COLUMN_NAME = 'iddetallefactura_origen'))
ORDER BY TABLE_NAME, COLUMN_NAME;

SELECT ROUTINE_NAME
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_TYPE = 'PROCEDURE'
  AND ROUTINE_NAME = 'sp_emitir_nota_desde_factura';
