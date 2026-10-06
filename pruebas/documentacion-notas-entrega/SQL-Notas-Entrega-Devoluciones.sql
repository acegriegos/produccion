-- Procedimiento transaccional para devoluciones previas a facturar.
-- Instalar una vez que existan las tablas de SQL-Notas-Entrega-Migracion.sql.
-- No ejecutar la migración nuevamente en la base local `pruebas`.
USE `pruebas`;

DROP PROCEDURE IF EXISTS `sp_devolver_nota_entrega`;
DELIMITER $$
CREATE PROCEDURE `sp_devolver_nota_entrega`(
    IN p_sucursal INT,
    IN p_usuario INT,
    IN p_nota INT,
    IN p_clave CHAR(36),
    IN p_motivo VARCHAR(255),
    IN p_lineas LONGTEXT
)
procedimiento: BEGIN
    DECLARE v_id INT;
    DECLARE v_insert_result INT;
    DECLARE v_total INT;
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_j INT DEFAULT 0;
    DECLARE v_texto VARCHAR(64);
    DECLARE v_texto_anterior VARCHAR(64);
    DECLARE v_linea INT;
    DECLARE v_cantidad DECIMAL(23,2);
    DECLARE v_nota_count INT;
    DECLARE v_estado INT;
    DECLARE v_factura INT;
    DECLARE v_nota_anterior INT;
    DECLARE v_usuario_anterior INT;
    DECLARE v_motivo_anterior VARCHAR(255);
    DECLARE v_lineas_evento INT;
    DECLARE v_idproducto INT;
    DECLARE v_idunidad INT;
    DECLARE v_cantidad_original DECIMAL(23,2);
    DECLARE v_cantidad_devuelta DECIMAL(23,2);
    DECLARE v_cantidad_pendiente DECIMAL(23,2);
    DECLARE v_stock_original DECIMAL(12,4);
    DECLARE v_stock_devuelto DECIMAL(12,4);
    DECLARE v_stock_pendiente DECIMAL(12,4);
    DECLARE v_cantidad_ajustada DECIMAL(12,3);
    DECLARE v_reponer DECIMAL(12,4);
    DECLARE v_factor DECIMAL(12,4) DEFAULT 1;
    DECLARE v_factor_texto VARCHAR(32);
    DECLARE v_dimension_count INT;
    DECLARE v_detalle_count INT;
    DECLARE v_stock_count INT;
    DECLARE v_stock_id INT;
    DECLARE v_stock_actual DECIMAL(12,4);
    DECLARE v_stock_final DECIMAL(12,4);
    DECLARE v_detalle_devolucion INT;
    DECLARE v_pendientes INT;
    DECLARE v_motivo VARCHAR(255);

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
    IF p_nota IS NULL OR p_nota <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota invalida';
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
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La devolucion requiere entre 1 y 100 lineas';
    END IF;
    SET v_motivo = NULLIF(TRIM(p_motivo), '');
    IF CHAR_LENGTH(v_motivo) > 255 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Motivo de devolucion muy largo';
    END IF;

    -- Validar forma, valores y duplicados antes de iniciar cambios.
    WHILE v_i < v_total DO
        IF JSON_TYPE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, ']'))) <> 'OBJECT' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de devolucion invalida';
        END IF;
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].iddetallenota')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de nota invalida';
        END IF;
        SET v_linea = CAST(v_texto AS UNSIGNED);
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].cantidad_devuelta')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[0-9]{1,12}(\\.[0-9]{1,2})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad devuelta invalida';
        END IF;
        SET v_cantidad = CAST(v_texto AS DECIMAL(23,2));
        IF v_cantidad <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad devuelta debe ser positiva';
        END IF;

        SET v_j = 0;
        WHILE v_j < v_i DO
            SET v_texto_anterior = JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_j, '].iddetallenota')));
            IF CAST(v_texto_anterior AS UNSIGNED) = v_linea THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea repetida en la devolucion';
            END IF;
            SET v_j = v_j + 1;
        END WHILE;
        SET v_i = v_i + 1;
    END WHILE;

    START TRANSACTION;
    SELECT COUNT(*) INTO v_nota_count FROM notasentrega
     WHERE id = p_nota AND idsucursal = p_sucursal;
    IF v_nota_count <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota no encontrada en sucursal';
    END IF;
    SELECT idestado, idfactura INTO v_estado, v_factura
      FROM notasentrega WHERE id = p_nota FOR UPDATE;

    -- La clave única hace seguro reintentar una solicitud interrumpida.
    INSERT INTO devolucionesnotasentrega
        (idnota, idusuario, clave_operacion, motivo)
    VALUES (p_nota, p_usuario, p_clave, v_motivo)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    SET v_insert_result = ROW_COUNT();
    SET v_id = LAST_INSERT_ID();

    IF v_insert_result <> 1 THEN
        SELECT idnota, idusuario, motivo INTO v_nota_anterior,
               v_usuario_anterior, v_motivo_anterior
          FROM devolucionesnotasentrega WHERE id = v_id;
        SELECT COUNT(*) INTO v_lineas_evento
          FROM detalledevolucionesnotasentrega WHERE iddevolucion = v_id;
        IF v_nota_anterior <> p_nota OR v_usuario_anterior <> p_usuario
           OR NOT (v_motivo_anterior <=> v_motivo)
           OR v_lineas_evento <> v_total THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otra devolucion';
        END IF;

        SET v_i = 0;
        WHILE v_i < v_total DO
            SET v_linea = CAST(JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_i, '].iddetallenota'))) AS UNSIGNED);
            SET v_cantidad = CAST(JSON_UNQUOTE(JSON_EXTRACT(
                p_lineas, CONCAT('$[', v_i, '].cantidad_devuelta'))) AS DECIMAL(23,2));
            SELECT COUNT(*), MAX(cantidad_devuelta)
              INTO v_detalle_count, v_cantidad_devuelta
              FROM detalledevolucionesnotasentrega
             WHERE iddevolucion = v_id AND iddetallenota = v_linea;
            IF v_detalle_count <> 1 OR v_cantidad_devuelta <> v_cantidad THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otro detalle de devolucion';
            END IF;
            SET v_i = v_i + 1;
        END WHILE;

        COMMIT;
        SELECT v_id AS iddevolucion, 1 AS repetida;
        LEAVE procedimiento;
    END IF;

    IF v_estado <> 1 OR v_factura IS NOT NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota no pendiente o ya facturada';
    END IF;

    SET v_i = 0;
    WHILE v_i < v_total DO
        SET v_linea = CAST(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].iddetallenota'))) AS UNSIGNED);
        SET v_cantidad = CAST(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].cantidad_devuelta'))) AS DECIMAL(23,2));

        SELECT COUNT(*) INTO v_detalle_count FROM detallenotasentrega
         WHERE id = v_linea AND idnota = p_nota;
        IF v_detalle_count <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea no pertenece a la nota';
        END IF;
        SELECT idproducto, idunidad, cantidad, cantidad_inventario
          INTO v_idproducto, v_idunidad, v_cantidad_original, v_stock_original
          FROM detallenotasentrega
         WHERE id = v_linea AND idnota = p_nota FOR UPDATE;

        SELECT COALESCE(SUM(cantidad_devuelta), 0),
               COALESCE(SUM(cantidad_inventario), 0)
          INTO v_cantidad_devuelta, v_stock_devuelto
          FROM detalledevolucionesnotasentrega WHERE iddetallenota = v_linea;
        SET v_cantidad_pendiente = v_cantidad_original - v_cantidad_devuelta;
        SET v_stock_pendiente = v_stock_original - v_stock_devuelto;
        IF v_cantidad > v_cantidad_pendiente THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad excede saldo pendiente de la linea';
        END IF;

        -- La devolución final repone el remanente exacto de la salida original.
        IF v_cantidad = v_cantidad_pendiente THEN
            SET v_reponer = v_stock_pendiente;
        ELSE
            SET v_factor = 1;
            SELECT COUNT(*), MAX(valor) INTO v_dimension_count, v_factor_texto
              FROM dimensioproductos
             WHERE idproducto = v_idproducto AND codigo = '1' AND idunidad = 8;
            IF v_dimension_count > 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dimension ambigua para devolucion';
            END IF;
            IF v_dimension_count = 1 THEN
                IF v_factor_texto IS NULL OR v_factor_texto NOT REGEXP
                   '^[0-9]+(\\.[0-9]+)?$'
                   OR CAST(v_factor_texto AS DECIMAL(12,4)) <= 0 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dimension invalida para devolucion';
                END IF;
                SET v_factor = CAST(v_factor_texto AS DECIMAL(12,4));
            END IF;
            IF v_idunidad <> 1 THEN
                SET v_factor = 1;
            END IF;
            IF v_cantidad * v_factor > 999999999.999 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad excede conversion disponible';
            END IF;
            SET v_cantidad_ajustada = ROUND(v_cantidad * v_factor, 3);
            SET v_reponer = convercion(v_idunidad, v_cantidad_ajustada);
            IF v_reponer IS NULL OR v_reponer <= 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad convertida invalida';
            END IF;
            IF v_reponer > v_stock_pendiente THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad convertida excede saldo de inventario';
            END IF;
        END IF;
        IF v_reponer IS NULL OR v_reponer <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad de inventario a reponer invalida';
        END IF;

        SELECT COUNT(*), MIN(id) INTO v_stock_count, v_stock_id
          FROM detalleinventarios
         WHERE idinventario = 6
           AND idproducto = CAST(v_idproducto AS CHAR CHARACTER SET utf8mb4)
                                COLLATE utf8mb4_unicode_ci;
        IF v_stock_count <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto sin saldo unico en inventario 6';
        END IF;
        SELECT cantidad INTO v_stock_actual
          FROM detalleinventarios WHERE id = v_stock_id FOR UPDATE;
        IF v_stock_actual IS NULL OR v_stock_actual + v_reponer > 99999999.9999 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Saldo de inventario excede capacidad';
        END IF;

        INSERT INTO detalledevolucionesnotasentrega
            (iddevolucion, iddetallenota, cantidad_devuelta,
             cantidad_inventario, idunidad)
        VALUES (v_id, v_linea, v_cantidad, v_reponer, v_idunidad);
        SET v_detalle_devolucion = LAST_INSERT_ID();

        UPDATE detalleinventarios SET cantidad = cantidad + v_reponer
         WHERE id = v_stock_id;
        SELECT cantidad INTO v_stock_final FROM detalleinventarios WHERE id = v_stock_id;
        INSERT INTO movimientos
            (idtipomovimiento, cant, fecha, idproducto, comentario,
             idsucursal, idusuario, catual, idtabla, idfila, comodin)
        VALUES
            (7, v_reponer, NOW(), v_idproducto, 'Devolucion de nota de entrega',
             p_sucursal, p_usuario, v_stock_final, 523, v_detalle_devolucion, NULL);

        SET v_i = v_i + 1;
    END WHILE;

    SELECT COUNT(*) INTO v_pendientes
      FROM detallenotasentrega d
     WHERE d.idnota = p_nota
       AND d.cantidad > COALESCE((
            SELECT SUM(dd.cantidad_devuelta)
              FROM detalledevolucionesnotasentrega dd
             WHERE dd.iddetallenota = d.id
       ), 0);
    IF v_pendientes = 0 THEN
        UPDATE notasentrega
           SET idestado = 3,
               fecha_anulacion = NOW(),
               idusuario_anulador = p_usuario,
               motivo_anulacion = COALESCE(v_motivo, 'Devolucion total de material')
         WHERE id = p_nota AND idestado = 1 AND idfactura IS NULL;
    END IF;

    COMMIT;
    SELECT v_id AS iddevolucion, 0 AS repetida;
END$$
DELIMITER ;
