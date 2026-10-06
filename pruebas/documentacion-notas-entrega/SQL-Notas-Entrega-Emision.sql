-- Backend de emision de notas de entrega. MariaDB 10.3.
-- Instalar despues de SQL-Notas-Entrega-Migracion.sql en la base `pruebas`.
-- El procedimiento es atomico: cabecera, lineas, stock y movimientos se
-- confirman juntos. Nunca usar sp_mantdetallefacturas para esta operacion.
USE `pruebas`;

DROP PROCEDURE IF EXISTS `sp_emitir_nota_entrega`;
DELIMITER $$
CREATE PROCEDURE `sp_emitir_nota_entrega`(
    IN p_sucursal INT,
    IN p_cliente INT,
    IN p_nombre_cliente VARCHAR(150),
    IN p_cliente_cedula VARCHAR(45),
    IN p_usuario INT,
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
    DECLARE v_producto INT;
    DECLARE v_proveedor INT;
    DECLARE v_unidad INT;
    DECLARE v_cantidad DECIMAL(23,2);
    DECLARE v_cantidad_ajustada DECIMAL(12,3);
    DECLARE v_cantidad_stock DECIMAL(10,2);
    DECLARE v_factor DECIMAL(12,4) DEFAULT 1;
    DECLARE v_factor_texto VARCHAR(32);
    DECLARE v_dimension_count INT;
    DECLARE v_stock_count INT;
    DECLARE v_stock_id INT;
    DECLARE v_stock_actual DECIMAL(12,4);
    DECLARE v_stock_final DECIMAL(12,4);
    DECLARE v_detalle_id INT;
    DECLARE v_producto_codigo VARCHAR(45);
    DECLARE v_producto_nombre VARCHAR(150);
    DECLARE v_heredado INT;
    DECLARE v_unidad_base INT;
    DECLARE v_nombre VARCHAR(150);
    DECLARE v_cedula VARCHAR(45);
    DECLARE v_referencia VARCHAR(55);
    DECLARE v_observaciones VARCHAR(512);
    DECLARE v_linea_observaciones VARCHAR(255);
    DECLARE v_texto VARCHAR(64);
    DECLARE v_sucursal_anterior INT;
    DECLARE v_cliente_anterior INT;
    DECLARE v_nombre_anterior VARCHAR(150);
    DECLARE v_cedula_anterior VARCHAR(45);
    DECLARE v_usuario_anterior INT;
    DECLARE v_referencia_anterior VARCHAR(55);
    DECLARE v_observaciones_anteriores VARCHAR(512);

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
    IF p_cliente IS NOT NULL AND p_cliente <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente invalido';
    END IF;
    IF p_clave IS NULL OR p_clave NOT REGEXP
       '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave de operacion invalida';
    END IF;
    IF p_lineas IS NULL OR JSON_VALID(p_lineas) = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Detalle JSON invalido';
    END IF;
    IF JSON_TYPE(p_lineas) <> 'ARRAY' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Detalle debe ser una lista';
    END IF;
    SET v_total = JSON_LENGTH(p_lineas);
    IF v_total < 1 OR v_total > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La nota requiere entre 1 y 100 lineas';
    END IF;

    SET v_referencia = NULLIF(TRIM(p_referencia), '');
    SET v_observaciones = NULLIF(TRIM(p_observaciones), '');
    IF p_cliente IS NULL THEN
        SET v_nombre = TRIM(COALESCE(p_nombre_cliente, ''));
        SET v_cedula = NULLIF(TRIM(p_cliente_cedula), '');
        IF v_nombre = '' OR CHAR_LENGTH(v_nombre) > 64 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nombre contado obligatorio, maximo 64 caracteres';
        END IF;
    ELSE
        IF NOT EXISTS (SELECT 1 FROM clientes WHERE id = p_cliente) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente no existe';
        END IF;
        -- La boleta conserva la identidad del catalogo al momento de emitir.
        SELECT TRIM(COALESCE(nombre, '')), NULLIF(TRIM(cedula), '')
          INTO v_nombre, v_cedula FROM clientes WHERE id = p_cliente;
        IF v_nombre = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente sin nombre';
        END IF;
    END IF;

    START TRANSACTION;
    -- La clave unica serializa reintentos simultaneos. En un reintento no
    -- se crean detalles ni movimientos y no se vuelve a descontar stock.
    INSERT INTO notasentrega
        (idsucursal, idcliente, nombre_cliente, cliente_cedula, idusuario,
         clave_operacion, idestado, referencia, observaciones)
    VALUES
        (p_sucursal, p_cliente, v_nombre, v_cedula, p_usuario,
         p_clave, 1, v_referencia, v_observaciones)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    SET v_insert_result = ROW_COUNT();
    SET v_id = LAST_INSERT_ID();
    SELECT COUNT(*) INTO v_existentes FROM detallenotasentrega WHERE idnota = v_id;
    IF v_existentes = 0 AND v_insert_result <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota existente sin detalle';
    END IF;
    IF v_existentes > 0 THEN
        SELECT idsucursal, idcliente, nombre_cliente, cliente_cedula, idusuario,
               referencia, observaciones
          INTO v_sucursal_anterior, v_cliente_anterior, v_nombre_anterior,
               v_cedula_anterior,
               v_usuario_anterior, v_referencia_anterior,
               v_observaciones_anteriores
          FROM notasentrega WHERE id = v_id FOR UPDATE;
        IF v_existentes <> v_total OR v_sucursal_anterior <> p_sucursal
           OR v_usuario_anterior <> p_usuario
           OR NOT (v_cliente_anterior <=> p_cliente)
           OR (p_cliente IS NULL AND (v_nombre_anterior <> v_nombre
               OR NOT (v_cedula_anterior <=> v_cedula)))
           OR NOT (v_referencia_anterior <=> v_referencia)
           OR NOT (v_observaciones_anteriores <=> v_observaciones) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otra nota';
        END IF;
    END IF;

    WHILE v_i < v_total DO
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].idproducto')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto invalido';
        END IF;
        SET v_producto = CAST(v_texto AS UNSIGNED);
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].idproveedor')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Proveedor invalido';
        END IF;
        SET v_proveedor = CAST(v_texto AS UNSIGNED);
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].idunidad')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,2}$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unidad invalida';
        END IF;
        SET v_unidad = CAST(v_texto AS UNSIGNED);
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].cantidad')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[0-9]{1,12}(\\.[0-9]{1,2})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad invalida';
        END IF;
        SET v_cantidad = CAST(v_texto AS DECIMAL(23,2));
        IF v_cantidad <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad debe ser positiva';
        END IF;
        -- MariaDB 10.3 convierte JSON null en el texto 'null' al aplicar
        -- JSON_UNQUOTE. Conservar SQL NULL evita falsos cambios en reintentos.
        IF JSON_TYPE(JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].observaciones'))) = 'NULL' THEN
            SET v_linea_observaciones = NULL;
        ELSE
            SET v_linea_observaciones = NULLIF(TRIM(JSON_UNQUOTE(
                JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, '].observaciones')))), '');
        END IF;
        IF CHAR_LENGTH(v_linea_observaciones) > 255 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Observacion de linea muy larga';
        END IF;

        IF v_existentes > 0 THEN
            IF NOT EXISTS (
                SELECT 1 FROM detallenotasentrega
                 WHERE idnota = v_id AND renglon = v_i + 1
                   AND idproducto = v_producto AND idproveedor = v_proveedor
                   AND idunidad = v_unidad AND cantidad = v_cantidad
                   AND observaciones <=> v_linea_observaciones
            ) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otro detalle';
            END IF;
        ELSE
            IF NOT EXISTS (SELECT 1 FROM productos WHERE id = v_producto) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no existe';
            END IF;
            SELECT codigo, nombre, idheredado, idunidad
              INTO v_producto_codigo, v_producto_nombre, v_heredado, v_unidad_base
              FROM productos WHERE id = v_producto;
            IF v_producto_nombre IS NULL OR TRIM(v_producto_nombre) = ''
               OR v_unidad_base IS NULL OR COALESCE(v_heredado, 0) <> 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto no apto para nota';
            END IF;
            IF NOT EXISTS (SELECT 1 FROM clientes
                           WHERE id = v_proveedor AND bisproveedor = 1) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Proveedor no existe';
            END IF;
            IF NOT EXISTS (SELECT 1 FROM unidades WHERE id = v_unidad) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unidad no existe';
            END IF;
            -- La tabla unidades no agrupa de forma fiable las familias
            -- fisicas. Restringimos las combinaciones a unidades compatibles.
            SET v_factor = 1;
            SELECT COUNT(*), MAX(valor) INTO v_dimension_count, v_factor_texto
              FROM dimensioproductos
             WHERE idproducto = v_producto AND codigo = '1' AND idunidad = 8;
            IF v_dimension_count > 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dimension ambigua';
            END IF;
            IF v_dimension_count = 1 THEN
                IF v_factor_texto IS NULL OR v_factor_texto NOT REGEXP
                   '^[0-9]+(\\.[0-9]+)?$' OR CAST(v_factor_texto AS DECIMAL(12,4)) <= 0 THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Dimension invalida';
                END IF;
                SET v_factor = CAST(v_factor_texto AS DECIMAL(12,4));
            END IF;
            IF NOT (
                (v_unidad_base = 1 AND
                  ((v_dimension_count = 1 AND v_unidad IN (1, 8, 9)) OR
                   (v_dimension_count = 0 AND v_unidad = 1)))
                OR (v_unidad_base = 8 AND
                    (v_unidad IN (8, 9) OR
                     (v_dimension_count = 1 AND v_unidad = 1)))
                OR (v_unidad_base = 2 AND v_unidad IN (2, 3, 4))
                OR (v_unidad_base NOT IN (1, 2, 8) AND
                    v_unidad = v_unidad_base)
            ) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Unidad incompatible con producto';
            END IF;
            IF v_unidad <> 1 THEN
                SET v_factor = 1;
            END IF;
            -- La misma conversion de ventas produce el valor exacto que
            -- guardamos en la linea, restamos y registramos en movimientos.
            IF v_cantidad * v_factor > 999999999.999 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad excede conversion disponible';
            END IF;
            SET v_cantidad_ajustada = ROUND(v_cantidad * v_factor, 3);
            SET v_cantidad_stock = convercion(v_unidad, v_cantidad_ajustada);
            IF v_cantidad_stock IS NULL OR v_cantidad_stock <= 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cantidad convertida invalida';
            END IF;
            -- Buscar sin bloqueo evita que el escaneo sin indice compuesto
            -- bloquee todo el inventario; luego se bloquea solo su PK.
            SELECT COUNT(*), MIN(id) INTO v_stock_count, v_stock_id
              FROM detalleinventarios
             WHERE idinventario = 6
               AND idproducto = CAST(v_producto AS CHAR CHARACTER SET utf8mb4)
                                    COLLATE utf8mb4_unicode_ci;
            IF v_stock_count <> 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Producto sin saldo unico en inventario 6';
            END IF;
            SELECT cantidad INTO v_stock_actual
              FROM detalleinventarios WHERE id = v_stock_id FOR UPDATE;
            IF v_stock_actual IS NULL OR v_stock_actual < v_cantidad_stock THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock insuficiente';
            END IF;
            UPDATE detalleinventarios
               SET cantidad = cantidad - v_cantidad_stock
             WHERE id = v_stock_id AND cantidad >= v_cantidad_stock;
            IF ROW_COUNT() <> 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Stock cambio durante la emision';
            END IF;
            SELECT cantidad INTO v_stock_final
              FROM detalleinventarios WHERE id = v_stock_id;
            INSERT INTO detallenotasentrega
                (idnota, renglon, idproducto, idproveedor, idunidad, cantidad,
                 cantidad_inventario, producto_codigo, producto_descripcion,
                 observaciones)
            VALUES
                (v_id, v_i + 1, v_producto, v_proveedor, v_unidad, v_cantidad,
                 v_cantidad_stock, v_producto_codigo, v_producto_nombre,
                 v_linea_observaciones);
            SET v_detalle_id = LAST_INSERT_ID();
            INSERT INTO movimientos
                (idtipomovimiento, cant, fecha, idproducto, comentario,
                 idsucursal, idusuario, catual, idtabla, idfila, comodin)
            VALUES
                (10, -v_cantidad_stock, NOW(), v_producto, 'Nota de entrega',
                 p_sucursal, p_usuario, v_stock_final, 521, v_detalle_id, NULL);
        END IF;
        SET v_i = v_i + 1;
    END WHILE;
    COMMIT;
    SELECT v_id AS idnota, IF(v_existentes > 0, 1, 0) AS repetida;
END$$
DELIMITER ;
