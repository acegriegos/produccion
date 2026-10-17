-- Emisión desde orden de compra y artículos adicionales del inventario.
-- Requiere SQL-Notas-Entrega-Desde-Facturas.sql ya instalado.
-- Ejecutar el archivo completo una sola vez por base. No repetir si la columna ya existe.
USE `pruebas`;

ALTER TABLE `notasentrega`
  ADD COLUMN `idordencompra_origen` INT(11) NULL AFTER `idfactura_origen`,
  ADD KEY `idx_ne_orden_origen` (`idordencompra_origen`),
  ADD CONSTRAINT `fk_ne_orden_origen`
    FOREIGN KEY (`idordencompra_origen`) REFERENCES `facturas` (`id`);
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
    IN p_lineas LONGTEXT,
    IN p_idordencompra INT
)
procedimiento: BEGIN
    DECLARE v_id INT;
    DECLARE v_insert_result INT;
    DECLARE v_existentes INT;
    DECLARE v_total INT;
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_j INT DEFAULT 0;
    DECLARE v_producto INT;
    DECLARE v_iddetalle_origen INT;
    DECLARE v_producto_origen INT;
    DECLARE v_unidad_origen INT;
    DECLARE v_cantidad_origen DECIMAL(23,2);
    DECLARE v_cantidad_usada DECIMAL(23,2);
    DECLARE v_cantidad_pendiente DECIMAL(23,2);
    DECLARE v_idcliente INT;
    DECLARE v_detalle_count INT;
    DECLARE v_lineas_orden INT DEFAULT 0;
    DECLARE v_destinatario VARCHAR(150);
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
    DECLARE v_texto_anterior VARCHAR(64);
    DECLARE v_sucursal_anterior INT;
    DECLARE v_cliente_anterior INT;
    DECLARE v_origen_anterior INT;
    DECLARE v_orden_anterior INT;
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
    IF p_idordencompra IS NOT NULL AND p_idordencompra <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Orden de compra invalida';
    END IF;
    IF p_idordencompra IS NULL AND p_cliente IS NOT NULL AND p_cliente <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente invalido';
    END IF;
    IF p_idordencompra IS NOT NULL AND p_cliente IS NOT NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El proveedor se obtiene de la orden';
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
    IF p_idordencompra IS NOT NULL THEN
        SET v_nombre = '';
        SET v_cedula = NULL;
        SET v_idcliente = NULL;
    ELSEIF p_cliente IS NULL THEN
        SET v_nombre = TRIM(COALESCE(p_nombre_cliente, ''));
        SET v_cedula = NULLIF(TRIM(p_cliente_cedula), '');
        SET v_idcliente = NULL;
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
        SET v_idcliente = p_cliente;
        IF v_nombre = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Cliente sin nombre';
        END IF;
    END IF;

    START TRANSACTION;
    IF p_idordencompra IS NOT NULL THEN
        SET v_idcliente = NULL;
        -- La lectura con bloqueo ocurre antes de consultar el saldo. Dos
        -- emisiones de la misma orden quedan serializadas por esta fila.
        SELECT idcliente INTO v_idcliente
          FROM facturas
         WHERE id = p_idordencompra AND idsucursal = p_sucursal
           AND idtipoventa = 3 AND idestado IN (1, 2) AND idcliente > 0
         FOR UPDATE;
        IF v_idcliente IS NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Orden no disponible en esta sucursal';
        END IF;
        SELECT TRIM(COALESCE(nombre, '')), NULLIF(TRIM(cedula), '')
          INTO v_nombre, v_cedula FROM clientes WHERE id = v_idcliente;
        IF v_nombre = '' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Proveedor de la orden sin nombre';
        END IF;
    END IF;
    -- La clave unica serializa reintentos simultaneos. En un reintento no
    -- se crean detalles ni movimientos y no se vuelve a descontar stock.
    INSERT INTO notasentrega
        (idsucursal, idcliente, nombre_cliente, cliente_cedula, idusuario,
         clave_operacion, idestado, origen, idfactura_origen,
         idordencompra_origen, referencia, observaciones)
    VALUES
        (p_sucursal, v_idcliente, v_nombre, v_cedula, p_usuario,
         p_clave, 1, IF(p_idordencompra IS NULL, 1, 3), NULL,
         p_idordencompra, v_referencia, v_observaciones)
    ON DUPLICATE KEY UPDATE id = LAST_INSERT_ID(id);
    SET v_insert_result = ROW_COUNT();
    SET v_id = LAST_INSERT_ID();
    SELECT COUNT(*) INTO v_existentes FROM detallenotasentrega WHERE idnota = v_id;
    IF v_existentes = 0 AND v_insert_result <> 1 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota existente sin detalle';
    END IF;
    IF v_existentes > 0 THEN
        SELECT idsucursal, idcliente, nombre_cliente, cliente_cedula, idusuario,
               origen, idordencompra_origen, referencia, observaciones
          INTO v_sucursal_anterior, v_cliente_anterior, v_nombre_anterior,
               v_cedula_anterior, v_usuario_anterior,
               v_origen_anterior, v_orden_anterior, v_referencia_anterior,
               v_observaciones_anteriores
          FROM notasentrega WHERE id = v_id FOR UPDATE;
        IF v_existentes <> v_total OR v_sucursal_anterior <> p_sucursal
           OR v_usuario_anterior <> p_usuario
           OR NOT (v_cliente_anterior <=> v_idcliente)
           OR v_origen_anterior <> IF(p_idordencompra IS NULL, 1, 3)
           OR NOT (v_orden_anterior <=> p_idordencompra)
           OR (v_idcliente IS NULL AND (v_nombre_anterior <> v_nombre
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
        IF COALESCE(JSON_TYPE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].destinatario')
        )), '') <> 'STRING' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destinatario invalido';
        END IF;
        SET v_destinatario = NULLIF(TRIM(JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].destinatario')
        ))), '');
        IF v_destinatario IS NULL OR CHAR_LENGTH(v_destinatario) > 150 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Destinatario invalido';
        END IF;
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
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(
            p_lineas, CONCAT('$[', v_i, '].iddetallefactura_origen')
        ));
        IF v_texto IS NULL OR LOWER(v_texto) = 'null' OR v_texto = '' THEN
            SET v_iddetalle_origen = NULL;
        ELSE
            IF v_texto NOT REGEXP '^[1-9][0-9]{0,9}$' THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de orden invalida';
            END IF;
            SET v_iddetalle_origen = CAST(v_texto AS UNSIGNED);
            SET v_lineas_orden = v_lineas_orden + 1;
            IF p_idordencompra IS NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La linea de origen requiere una orden';
            END IF;
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
                   AND idproducto = v_producto
                   AND BINARY destinatario = BINARY v_destinatario
                   AND idunidad = v_unidad AND cantidad = v_cantidad
                   AND iddetallefactura_origen <=> v_iddetalle_origen
                   AND observaciones <=> v_linea_observaciones
            ) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Clave usada con otro detalle';
            END IF;
        ELSE
          IF v_iddetalle_origen IS NOT NULL THEN
            SET v_j = 0;
            WHILE v_j < v_i DO
                SET v_texto_anterior = JSON_UNQUOTE(JSON_EXTRACT(
                    p_lineas, CONCAT('$[', v_j, '].iddetallefactura_origen')));
                IF v_texto_anterior IS NOT NULL
                   AND LOWER(v_texto_anterior) <> 'null'
                   AND CAST(v_texto_anterior AS UNSIGNED) = v_iddetalle_origen THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea de orden repetida';
                END IF;
                SET v_j = v_j + 1;
            END WHILE;

            SELECT COUNT(*) INTO v_detalle_count
              FROM detallefacturas df
             WHERE df.id = v_iddetalle_origen AND df.idfactura = p_idordencompra
               AND df.idproducto > 0
               AND df.cantidad REGEXP '^[0-9]+(\\.[0-9]+)?$'
               AND CAST(df.cantidad AS DECIMAL(23,5)) > 0;
            IF v_detalle_count <> 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Linea no pertenece a la orden';
            END IF;
            SELECT df.idproducto, p.codigo,
                   LEFT(COALESCE(NULLIF(TRIM(df.comodin), ''), p.nombre), 150),
                   COALESCE(NULLIF(df.idunidad, 0), p.idunidad),
                   TRUNCATE(CAST(df.cantidad AS DECIMAL(23,5)), 2)
              INTO v_producto_origen, v_producto_codigo, v_producto_nombre,
                   v_unidad_origen, v_cantidad_origen
              FROM detallefacturas df
              INNER JOIN productos p ON p.id = df.idproducto
              INNER JOIN unidades u
                ON u.id = COALESCE(NULLIF(df.idunidad, 0), p.idunidad)
             WHERE df.id = v_iddetalle_origen AND df.idfactura = p_idordencompra
             FOR UPDATE;
            IF v_producto <> v_producto_origen OR v_unidad <> v_unidad_origen THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El producto o unidad no coincide con la orden';
            END IF;
            SELECT COALESCE(SUM(dne.cantidad), 0) INTO v_cantidad_usada
              FROM detallenotasentrega dne
              INNER JOIN notasentrega ne ON ne.id = dne.idnota
             WHERE ne.origen = 3 AND ne.idordencompra_origen = p_idordencompra
               AND dne.iddetallefactura_origen = v_iddetalle_origen;
            SET v_cantidad_pendiente = v_cantidad_origen - v_cantidad_usada;
            IF v_cantidad_pendiente <= 0 OR v_cantidad <> v_cantidad_pendiente THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La cantidad debe ser el saldo pendiente de la orden';
            END IF;
            INSERT INTO detallenotasentrega
                (idnota, renglon, idproducto, destinatario, idunidad, cantidad,
                 cantidad_inventario, producto_codigo, producto_descripcion,
                 observaciones, iddetallefactura_origen)
            VALUES
                (v_id, v_i + 1, v_producto, v_destinatario, v_unidad, v_cantidad,
                 0, v_producto_codigo, v_producto_nombre,
                 v_linea_observaciones, v_iddetalle_origen);
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
                (idnota, renglon, idproducto, destinatario, idunidad, cantidad,
                 cantidad_inventario, producto_codigo, producto_descripcion,
                 observaciones, iddetallefactura_origen)
            VALUES
                (v_id, v_i + 1, v_producto, v_destinatario, v_unidad, v_cantidad,
                 v_cantidad_stock, v_producto_codigo, v_producto_nombre,
                 v_linea_observaciones, NULL);
            SET v_detalle_id = LAST_INSERT_ID();
            INSERT INTO movimientos
                (idtipomovimiento, cant, fecha, idproducto, comentario,
                 idsucursal, idusuario, catual, idtabla, idfila, comodin)
            VALUES
                (10, -v_cantidad_stock, NOW(), v_producto, 'Nota de entrega',
                 p_sucursal, p_usuario, v_stock_final, 521, v_detalle_id, NULL);
          END IF;
        END IF;
        SET v_i = v_i + 1;
    END WHILE;
    IF p_idordencompra IS NOT NULL AND v_lineas_orden = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Selecciona al menos una linea de la orden';
    END IF;
    COMMIT;
    SELECT v_id AS idnota, IF(v_existentes > 0, 1, 0) AS repetida;
END$$
DELIMITER ;

-- Reemplaza anulaciones para impedir anular líneas cubiertas por una orden.
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
         WHERE id = v_linea AND idnota = p_nota
           AND iddetallefactura_origen IS NULL;
        IF v_detalle_count <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La linea de orden no admite anulacion';
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

-- Verifica la migracion y los procedimientos reemplazados.
SHOW COLUMNS FROM `notasentrega` LIKE 'idordencompra_origen';
SHOW COLUMNS FROM `detallenotasentrega` LIKE 'iddetallefactura_origen';
SELECT ROUTINE_NAME, COUNT(*) AS parametros
FROM information_schema.PARAMETERS
WHERE SPECIFIC_SCHEMA = DATABASE()
  AND SPECIFIC_NAME = 'sp_emitir_nota_entrega'
GROUP BY ROUTINE_NAME;
SELECT ROUTINE_NAME
FROM information_schema.ROUTINES
WHERE ROUTINE_SCHEMA = DATABASE()
  AND ROUTINE_TYPE = 'PROCEDURE'
  AND ROUTINE_NAME IN ('sp_emitir_nota_entrega', 'sp_devolver_nota_entrega')
ORDER BY ROUTINE_NAME;
