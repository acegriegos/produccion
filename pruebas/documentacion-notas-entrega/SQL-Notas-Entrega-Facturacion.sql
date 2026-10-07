-- Facturacion atomica de notas de entrega. MariaDB 10.3.
-- Instalar despues de la migracion y de los SP de emision y devoluciones.
-- Crea el encabezado con la misma numeracion y efectos contables de ventas,
-- pero inserta detallefacturas directamente para no descontar stock de nuevo.
USE `pruebas`;

DROP PROCEDURE IF EXISTS `sp_facturar_notas_entrega`;
DELIMITER $$
CREATE PROCEDURE `sp_facturar_notas_entrega`(
    IN p_sucursal INT,
    IN p_usuario INT,
    IN p_notas LONGTEXT,
    IN p_factura LONGTEXT,
    IN p_lineas LONGTEXT
)
procedimiento: BEGIN
    DECLARE v_i INT DEFAULT 0;
    DECLARE v_total_notas INT DEFAULT 0;
    DECLARE v_total_lineas INT DEFAULT 0;
    DECLARE v_ultima_nota INT DEFAULT 0;
    DECLARE v_nota INT DEFAULT 0;
    DECLARE v_ultima_detalle INT DEFAULT 0;
    DECLARE v_detalle INT DEFAULT 0;
    DECLARE v_detalle_nota INT DEFAULT 0;
    DECLARE v_detalle_cantidad INT DEFAULT 0;
    DECLARE v_lineas_pendientes INT DEFAULT 0;
    DECLARE v_usuario_existe INT DEFAULT 0;
    DECLARE v_sucursal_existe INT DEFAULT 0;
    DECLARE v_nota_existe INT DEFAULT 0;
    DECLARE v_linea_existe INT DEFAULT 0;
    DECLARE v_factura_existe INT DEFAULT 0;
    DECLARE v_notas_ya_facturadas INT DEFAULT 0;
    DECLARE v_factura_repetida INT DEFAULT NULL;
    DECLARE v_primera_nota TINYINT DEFAULT 1;
    DECLARE v_cliente_base INT DEFAULT NULL;
    DECLARE v_nombre_base VARCHAR(150) DEFAULT NULL;
    DECLARE v_cliente_actual INT DEFAULT NULL;
    DECLARE v_nombre_actual VARCHAR(150) DEFAULT NULL;
    DECLARE v_estado TINYINT DEFAULT 0;
    DECLARE v_factura_actual INT DEFAULT NULL;
    DECLARE v_producto INT DEFAULT 0;
    DECLARE v_unidad INT DEFAULT 0;
    DECLARE v_cantidad DECIMAL(23,2) DEFAULT 0;
    DECLARE v_stock DECIMAL(12,4) DEFAULT 0;
    DECLARE v_devuelta DECIMAL(23,2) DEFAULT 0;
    DECLARE v_stock_devuelto DECIMAL(12,4) DEFAULT 0;
    DECLARE v_texto VARCHAR(600) DEFAULT NULL;
    DECLARE v_elemento LONGTEXT DEFAULT NULL;
    DECLARE v_precio DECIMAL(23,5) DEFAULT 0;
    DECLARE v_descuento DECIMAL(23,5) DEFAULT 0;
    DECLARE v_costo DECIMAL(23,5) DEFAULT 0;
    DECLARE v_imv DECIMAL(13,5) DEFAULT 0;
    DECLARE v_exento DECIMAL(23,5) DEFAULT 0;
    DECLARE v_exonerado DECIMAL(23,5) DEFAULT 0;
    DECLARE v_comision_linea DECIMAL(5,2) DEFAULT 0;
    DECLARE v_idexoneracion VARCHAR(512) DEFAULT NULL;
    DECLARE v_comodin_linea VARCHAR(512) DEFAULT NULL;
    DECLARE v_idimpuestos VARCHAR(255) DEFAULT NULL;
    DECLARE v_iddescuentos VARCHAR(255) DEFAULT NULL;
    DECLARE v_subtotal DECIMAL(23,5) DEFAULT 0;
    DECLARE v_descuento_total DECIMAL(23,5) DEFAULT 0;
    DECLARE v_imv_total DECIMAL(13,5) DEFAULT 0;
    DECLARE v_exento_total DECIMAL(23,5) DEFAULT 0;
    DECLARE v_exonerado_total DECIMAL(23,5) DEFAULT 0;
    DECLARE v_total DECIMAL(23,5) DEFAULT 0;
    DECLARE v_tipo_venta INT DEFAULT 0;
    DECLARE v_tipo_factura INT DEFAULT 0;
    DECLARE v_tipo_pago INT DEFAULT 0;
    DECLARE v_plazo INT DEFAULT 0;
    DECLARE v_moneda INT DEFAULT 0;
    DECLARE v_divisa DECIMAL(10,2) DEFAULT 0;
    DECLARE v_orden VARCHAR(45) DEFAULT '';
    DECLARE v_comentario VARCHAR(512) DEFAULT '';
    DECLARE v_referencia VARCHAR(55) DEFAULT '';
    DECLARE v_extra VARCHAR(200) DEFAULT '';
    DECLARE v_agente INT DEFAULT 0;
    DECLARE v_terminal INT DEFAULT 1;
    DECLARE v_actividad VARCHAR(10) DEFAULT '';
    DECLARE v_cliente_factura INT DEFAULT 0;
    DECLARE v_comodin_factura VARCHAR(64) DEFAULT '';
    DECLARE v_comision_factura DECIMAL(5,2) DEFAULT 0;
    DECLARE v_nombre_tipo VARCHAR(255) DEFAULT '';
    DECLARE v_version VARCHAR(512) DEFAULT '';
    DECLARE v_consecutivo INT DEFAULT 0;
    DECLARE v_idfactura INT DEFAULT 0;
    DECLARE v_iddetallefactura INT DEFAULT 0;
    DECLARE v_peso DECIMAL(23,5) DEFAULT NULL;
    DECLARE v_unidad_peso INT DEFAULT 0;
    DECLARE v_factor DECIMAL(23,5) DEFAULT 1;
    DECLARE v_transaccion TINYINT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        IF v_transaccion = 1 THEN
            ROLLBACK;
        END IF;
        DROP TEMPORARY TABLE IF EXISTS tmp_ne_facturar_lineas;
        DROP TEMPORARY TABLE IF EXISTS tmp_ne_facturar_notas;
        RESIGNAL;
    END;

    IF p_sucursal IS NULL OR p_sucursal < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Sucursal invalida';
    END IF;
    IF p_usuario IS NULL OR p_usuario <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario invalido';
    END IF;
    IF p_notas IS NULL OR JSON_VALID(p_notas) = 0 OR JSON_TYPE(p_notas) <> 'ARRAY' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Lista de notas invalida';
    END IF;
    IF p_factura IS NULL OR JSON_VALID(p_factura) = 0 OR JSON_TYPE(p_factura) <> 'OBJECT' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Encabezado de factura invalido';
    END IF;
    IF p_lineas IS NULL OR JSON_VALID(p_lineas) = 0 OR JSON_TYPE(p_lineas) <> 'ARRAY' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Detalle de factura invalido';
    END IF;

    SET v_total_notas = JSON_LENGTH(p_notas);
    SET v_total_lineas = JSON_LENGTH(p_lineas);
    IF v_total_notas < 1 OR v_total_notas > 100 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Selecciona entre 1 y 100 notas';
    END IF;
    IF v_total_lineas < 1 OR v_total_lineas > 1000 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La factura requiere entre 1 y 1000 lineas';
    END IF;

    SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.idtipoventa'));
    IF v_texto IS NULL OR v_texto NOT REGEXP '^(1|7|8|10)$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de comprobante invalido';
    END IF;
    SET v_tipo_venta = CAST(v_texto AS UNSIGNED);

    SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.idtipo'));
    IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,2}$'
       OR CAST(v_texto AS UNSIGNED) > 127 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de factura invalido';
    END IF;
    SET v_tipo_factura = CAST(v_texto AS UNSIGNED);

    SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.idtipopago'));
    IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,2}$'
       OR CAST(v_texto AS UNSIGNED) > 127 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Forma de pago invalida';
    END IF;
    SET v_tipo_pago = CAST(v_texto AS UNSIGNED);

    SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.plazo')), '0');
    IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,3})$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Plazo invalido';
    END IF;
    SET v_plazo = CAST(v_texto AS UNSIGNED);
    IF v_plazo >= 90 THEN
        SET v_tipo_factura = 10;
    END IF;

    SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.idmoneda'));
    IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,2}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Moneda invalida';
    END IF;
    SET v_moneda = CAST(v_texto AS UNSIGNED);
    SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.divisa'));
    IF v_texto IS NULL OR v_texto NOT REGEXP '^(0|[1-9][0-9]{0,7})([.][0-9]{1,2})?$'
       OR CAST(v_texto AS DECIMAL(10,2)) <= 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de cambio invalido';
    END IF;
    SET v_divisa = CAST(v_texto AS DECIMAL(10,2));

    SET v_orden = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.oc')), 'null'), '');
    SET v_comentario = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.comentario')), 'null'), '');
    SET v_referencia = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.referencia')), 'null'), '');
    SET v_extra = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.extra')), 'null'), '');
    SET v_actividad = COALESCE(NULLIF(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.actividadreceptor')), 'null'), '');
    IF CHAR_LENGTH(v_orden) > 45 OR CHAR_LENGTH(v_comentario) > 512
       OR CHAR_LENGTH(v_referencia) > 55 OR CHAR_LENGTH(v_extra) > 200
       OR CHAR_LENGTH(v_actividad) > 10 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un dato del encabezado excede su longitud permitida';
    END IF;

    -- La nota conserva a su responsable; no asignamos un agente aparte.
    SET v_agente = 0;
    SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(p_factura, '$.terminal')), '1');
    IF v_texto NOT REGEXP '^[1-9][0-9]{0,4}$' THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Terminal invalida';
    END IF;
    SET v_terminal = CAST(v_texto AS UNSIGNED);

    DROP TEMPORARY TABLE IF EXISTS tmp_ne_facturar_notas;
    CREATE TEMPORARY TABLE tmp_ne_facturar_notas (
        id INT NOT NULL PRIMARY KEY
    ) ENGINE=MEMORY DEFAULT CHARSET=utf8mb4;

    DROP TEMPORARY TABLE IF EXISTS tmp_ne_facturar_lineas;
    CREATE TEMPORARY TABLE tmp_ne_facturar_lineas (
        posicion INT NOT NULL PRIMARY KEY,
        iddetallenota INT NOT NULL UNIQUE,
        idnota INT NULL,
        idproducto INT NULL,
        idunidad INT NULL,
        cantidad DECIMAL(23,2) NULL,
        cantidad_inventario DECIMAL(12,4) NULL,
        precio DECIMAL(23,5) NOT NULL,
        descuento DECIMAL(23,5) NOT NULL,
        costo DECIMAL(23,5) NOT NULL,
        imv DECIMAL(13,5) NOT NULL,
        exento DECIMAL(23,5) NOT NULL,
        exonerado DECIMAL(23,5) NOT NULL,
        comision DECIMAL(5,2) NOT NULL,
        idexoneracion VARCHAR(512) NULL,
        comodin VARCHAR(512) NULL,
        idimpuestos VARCHAR(255) NULL,
        iddescuentos VARCHAR(255) NULL
    ) ENGINE=MEMORY DEFAULT CHARSET=utf8mb4;

    SET v_i = 0;
    WHILE v_i < v_total_notas DO
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(p_notas, CONCAT('$[', v_i, ']')));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$'
           OR CAST(v_texto AS UNSIGNED) > 2147483647 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Numero de nota invalido';
        END IF;
        INSERT IGNORE INTO tmp_ne_facturar_notas (id) VALUES (CAST(v_texto AS UNSIGNED));
        IF ROW_COUNT() <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No repitas una nota en la factura';
        END IF;
        SET v_i = v_i + 1;
    END WHILE;

    SET v_i = 0;
    WHILE v_i < v_total_lineas DO
        SET v_elemento = JSON_EXTRACT(p_lineas, CONCAT('$[', v_i, ']'));
        IF v_elemento IS NULL OR JSON_TYPE(v_elemento) <> 'OBJECT' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Una linea de factura no es valida';
        END IF;
        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.iddetallenota'));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^[1-9][0-9]{0,9}$'
           OR CAST(v_texto AS UNSIGNED) > 2147483647 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Numero de linea de nota invalido';
        END IF;
        SET v_detalle = CAST(v_texto AS UNSIGNED);

        SET v_texto = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.precio'));
        IF v_texto IS NULL OR v_texto NOT REGEXP '^(0|[1-9][0-9]{0,17})([.][0-9]{1,5})?$'
           OR CAST(v_texto AS DECIMAL(23,5)) <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Precio de linea invalido';
        END IF;
        SET v_precio = CAST(v_texto AS DECIMAL(23,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.descuento')), '0');
        IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,17})([.][0-9]{1,5})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Descuento de linea invalido';
        END IF;
        SET v_descuento = CAST(v_texto AS DECIMAL(23,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.costo')), '0');
        IF v_texto NOT REGEXP '^-?(0|[1-9][0-9]{0,17})([.][0-9]{1,5})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Costo de linea invalido';
        END IF;
        SET v_costo = CAST(v_texto AS DECIMAL(23,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.imv')), '0');
        IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,7})([.][0-9]{1,5})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Impuesto de linea invalido';
        END IF;
        SET v_imv = CAST(v_texto AS DECIMAL(13,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.exento')), '0');
        IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,17})([.][0-9]{1,5})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Monto exento de linea invalido';
        END IF;
        SET v_exento = CAST(v_texto AS DECIMAL(23,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.exonerado')), '0');
        IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,17})([.][0-9]{1,5})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Monto exonerado de linea invalido';
        END IF;
        SET v_exonerado = CAST(v_texto AS DECIMAL(23,5));

        SET v_texto = COALESCE(JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.comision')), '0');
        IF v_texto NOT REGEXP '^(0|[1-9][0-9]{0,2})([.][0-9]{1,2})?$' THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Comision de linea invalida';
        END IF;
        SET v_comision_linea = CAST(v_texto AS DECIMAL(5,2));

        SET v_idexoneracion = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.idexoneracion'));
        IF v_idexoneracion = 'null' THEN SET v_idexoneracion = NULL; END IF;
        SET v_comodin_linea = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.comodin'));
        IF v_comodin_linea = 'null' THEN SET v_comodin_linea = NULL; END IF;
        SET v_idimpuestos = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.idimpuestos'));
        IF v_idimpuestos = 'null' THEN SET v_idimpuestos = NULL; END IF;
        SET v_iddescuentos = JSON_UNQUOTE(JSON_EXTRACT(v_elemento, '$.iddescuentos'));
        IF v_iddescuentos = 'null' THEN SET v_iddescuentos = NULL; END IF;
        IF CHAR_LENGTH(COALESCE(v_idexoneracion, '')) > 512
           OR CHAR_LENGTH(COALESCE(v_comodin_linea, '')) > 512
           OR CHAR_LENGTH(COALESCE(v_idimpuestos, '')) > 255
           OR CHAR_LENGTH(COALESCE(v_iddescuentos, '')) > 255 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Un dato de linea excede su longitud permitida';
        END IF;

        INSERT INTO tmp_ne_facturar_lineas (
            posicion, iddetallenota, precio, descuento, costo, imv, exento,
            exonerado, comision, idexoneracion, comodin, idimpuestos, iddescuentos
        ) VALUES (
            v_i + 1, v_detalle, v_precio, v_descuento, v_costo, v_imv,
            v_exento, v_exonerado, v_comision_linea, v_idexoneracion,
            v_comodin_linea, v_idimpuestos, v_iddescuentos
        );
        SET v_i = v_i + 1;
    END WHILE;

    START TRANSACTION;
    SET v_transaccion = 1;

    SELECT COUNT(*) INTO v_usuario_existe FROM usuarios WHERE id = p_usuario;
    SELECT COUNT(*) INTO v_sucursal_existe FROM sucursales WHERE id = p_sucursal;
    IF v_usuario_existe = 0 OR v_sucursal_existe = 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario o sucursal no existen';
    END IF;

    -- Bloquear las notas en orden estable para serializar facturación y devoluciones.
    SET v_ultima_nota = 0;
    SET v_primera_nota = 1;
    WHILE v_ultima_nota < 2147483647 DO
        SELECT COALESCE(MIN(id), 0) INTO v_nota
          FROM tmp_ne_facturar_notas WHERE id > v_ultima_nota;
        IF v_nota = 0 THEN
            SET v_ultima_nota = 2147483647;
        ELSE
            SELECT COUNT(*) INTO v_nota_existe
              FROM notasentrega WHERE id = v_nota AND idsucursal = p_sucursal;
            IF v_nota_existe <> 1 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota no encontrada en sucursal';
            END IF;
            SELECT idcliente, nombre_cliente, idestado, idfactura
              INTO v_cliente_actual, v_nombre_actual, v_estado, v_factura_actual
              FROM notasentrega
             WHERE id = v_nota AND idsucursal = p_sucursal
             FOR UPDATE;
            IF v_estado = 2 AND v_factura_actual IS NOT NULL THEN
                IF v_factura_repetida IS NULL THEN
                    SET v_factura_repetida = v_factura_actual;
                ELSEIF v_factura_repetida <> v_factura_actual THEN
                    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las notas ya pertenecen a facturas distintas';
                END IF;
                SET v_notas_ya_facturadas = v_notas_ya_facturadas + 1;
            ELSEIF v_estado <> 1 OR v_factura_actual IS NOT NULL THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota no pendiente de factura';
            END IF;
            IF v_primera_nota = 1 THEN
                SET v_cliente_base = v_cliente_actual;
                SET v_nombre_base = TRIM(v_nombre_actual);
                SET v_primera_nota = 0;
            ELSEIF NOT (v_cliente_base <=> v_cliente_actual) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las notas deben ser del mismo cliente';
            ELSEIF v_cliente_base IS NULL
                AND LOWER(TRIM(COALESCE(v_nombre_base, ''))) <> LOWER(TRIM(COALESCE(v_nombre_actual, ''))) THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Las notas de contado deben tener el mismo nombre';
            END IF;

            -- La devolucion tambien bloquea primero la nota y luego sus lineas.
            SET v_ultima_detalle = 0;
            WHILE v_ultima_detalle < 2147483647 DO
                SELECT COALESCE(MIN(id), 0) INTO v_detalle
                  FROM detallenotasentrega
                 WHERE idnota = v_nota AND id > v_ultima_detalle;
                IF v_detalle = 0 THEN
                    SET v_ultima_detalle = 2147483647;
                ELSE
                    SELECT id INTO v_detalle FROM detallenotasentrega
                     WHERE id = v_detalle FOR UPDATE;
                    SET v_ultima_detalle = v_detalle;
                END IF;
            END WHILE;
            SELECT COUNT(*) INTO v_detalle_cantidad
              FROM detallenotasentrega WHERE idnota = v_nota;
            IF v_detalle_cantidad = 0 THEN
                SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nota sin lineas para facturar';
            END IF;
            SET v_ultima_nota = v_nota;
        END IF;
    END WHILE;

    -- Si se perdio la respuesta despues del COMMIT, devolver la factura ya
    -- creada solo cuando coincide exactamente el grupo de notas y sus lineas.
    IF v_notas_ya_facturadas > 0 THEN
        IF v_notas_ya_facturadas <> v_total_notas THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No mezcles notas facturadas con notas pendientes';
        END IF;
        SELECT COUNT(*) INTO v_nota_existe
          FROM notasentrega
         WHERE idsucursal = p_sucursal AND idfactura = v_factura_repetida;
        IF v_nota_existe <> v_total_notas THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La factura original incluye otras notas';
        END IF;
        SELECT COUNT(*) INTO v_lineas_pendientes
          FROM detallenotasentrega d
          INNER JOIN tmp_ne_facturar_notas tn ON tn.id = d.idnota
         WHERE d.iddetallefactura IS NOT NULL;
        SELECT COUNT(*) INTO v_linea_existe
          FROM tmp_ne_facturar_lineas tl
          INNER JOIN detallenotasentrega d ON d.id = tl.iddetallenota
          INNER JOIN tmp_ne_facturar_notas tn ON tn.id = d.idnota
          INNER JOIN detallefacturas df ON df.id = d.iddetallefactura
         WHERE df.idfactura = v_factura_repetida;
        IF v_lineas_pendientes <> v_total_lineas
           OR v_linea_existe <> v_total_lineas THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El reintento no coincide con las lineas de la factura original';
        END IF;
        SELECT COUNT(*) INTO v_factura_existe FROM facturas
         WHERE id = v_factura_repetida AND idsucursal = p_sucursal;
        IF v_factura_existe <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se encontro la factura original';
        END IF;
        SELECT CAST(consecutivo AS UNSIGNED), subtotal, descuento, imv, exento, exonerado
          INTO v_consecutivo, v_subtotal, v_descuento_total, v_imv_total,
               v_exento_total, v_exonerado_total
          FROM facturas
         WHERE id = v_factura_repetida AND idsucursal = p_sucursal;
        SET v_total = v_subtotal - v_descuento_total + v_imv_total
            + v_exento_total + v_exonerado_total;
        DROP TEMPORARY TABLE tmp_ne_facturar_lineas;
        DROP TEMPORARY TABLE tmp_ne_facturar_notas;
        COMMIT;
        SET v_transaccion = 0;
        SELECT v_factura_repetida AS idfactura, v_consecutivo AS consecutivo,
               v_total_notas AS notas_facturadas, v_total_lineas AS lineas_facturadas,
               v_total AS total, 1 AS repetida;
        LEAVE procedimiento;
    END IF;

    SELECT COUNT(*) INTO v_lineas_pendientes
      FROM detallenotasentrega d
      INNER JOIN tmp_ne_facturar_notas tn ON tn.id = d.idnota
     WHERE d.cantidad > COALESCE((
        SELECT SUM(dd.cantidad_devuelta)
          FROM detalledevolucionesnotasentrega dd
          INNER JOIN devolucionesnotasentrega dv ON dv.id = dd.iddevolucion
         WHERE dv.idnota = d.idnota AND dd.iddetallenota = d.id
     ), 0);
    IF v_lineas_pendientes <> v_total_lineas THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Incluye una sola linea por cada material pendiente';
    END IF;

    -- Un cliente registrado se identifica por ID; contado exige el mismo nombre libre.
    IF v_cliente_base IS NULL THEN
        SET v_cliente_factura = 0;
        SET v_comodin_factura = TRIM(COALESCE(v_nombre_base, ''));
        IF v_comodin_factura = '' OR CHAR_LENGTH(v_comodin_factura) > 64 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nombre de contado invalido para la factura';
        END IF;
    ELSE
        SET v_cliente_factura = v_cliente_base;
        SET v_comodin_factura = '';
        SELECT COUNT(*) INTO v_nota_existe FROM clientes WHERE id = v_cliente_base;
        IF v_nota_existe = 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El cliente de la nota ya no existe';
        END IF;
        SELECT COALESCE(MAX(comision), 0) INTO v_comision_factura
          FROM clientes WHERE id = v_cliente_base;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM tipofacturas WHERE id = v_tipo_factura) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Tipo de factura no existe';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM monedas WHERE id = v_moneda) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Moneda no existe';
    END IF;

    SET v_i = 1;
    WHILE v_i <= v_total_lineas DO
        SELECT iddetallenota, precio, descuento, costo, imv, exento,
               exonerado, comision, idexoneracion, comodin, idimpuestos, iddescuentos
          INTO v_detalle, v_precio, v_descuento, v_costo, v_imv, v_exento,
               v_exonerado, v_comision_linea, v_idexoneracion, v_comodin_linea,
               v_idimpuestos, v_iddescuentos
          FROM tmp_ne_facturar_lineas WHERE posicion = v_i;

        SELECT COUNT(*) INTO v_linea_existe
          FROM detallenotasentrega d
          INNER JOIN tmp_ne_facturar_notas tn ON tn.id = d.idnota
         WHERE d.id = v_detalle;
        IF v_linea_existe <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La linea no pertenece a las notas seleccionadas';
        END IF;
        SELECT d.idnota, d.idproducto, d.idunidad, d.cantidad,
               d.cantidad_inventario, d.iddetallefactura,
               COALESCE((SELECT SUM(dd.cantidad_devuelta)
                           FROM detalledevolucionesnotasentrega dd
                           INNER JOIN devolucionesnotasentrega dv ON dv.id = dd.iddevolucion
                          WHERE dv.idnota = d.idnota AND dd.iddetallenota = d.id), 0),
               COALESCE((SELECT SUM(dd.cantidad_inventario)
                           FROM detalledevolucionesnotasentrega dd
                           INNER JOIN devolucionesnotasentrega dv ON dv.id = dd.iddevolucion
                          WHERE dv.idnota = d.idnota AND dd.iddetallenota = d.id), 0)
          INTO v_detalle_nota, v_producto, v_unidad, v_cantidad, v_stock,
               v_factura_actual, v_devuelta, v_stock_devuelto
          FROM detallenotasentrega d
         WHERE d.id = v_detalle FOR UPDATE;
        IF v_factura_actual IS NOT NULL THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La linea ya esta vinculada a una factura';
        END IF;
        SET v_cantidad = v_cantidad - v_devuelta;
        SET v_stock = v_stock - v_stock_devuelto;
        IF v_cantidad <= 0 OR v_stock <= 0 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La linea seleccionada no tiene material pendiente';
        END IF;
        IF v_descuento > (v_precio * v_cantidad) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El descuento supera el subtotal de la linea';
        END IF;
        IF (v_exento + v_exonerado) > (v_precio * v_cantidad) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El monto exento o exonerado supera el subtotal de la linea';
        END IF;

        UPDATE tmp_ne_facturar_lineas
           SET idnota = v_detalle_nota, idproducto = v_producto, idunidad = v_unidad,
               cantidad = v_cantidad, cantidad_inventario = v_stock
         WHERE posicion = v_i;

        -- subtotal guarda solo la parte gravada; exento/exonerado se suman
        -- en sus campos y el descuento global se aplica una sola vez al total.
        SET v_subtotal = v_subtotal + (v_precio * v_cantidad) - v_exento - v_exonerado;
        SET v_descuento_total = v_descuento_total + v_descuento;
        SET v_imv_total = v_imv_total + v_imv;
        SET v_exento_total = v_exento_total + v_exento;
        SET v_exonerado_total = v_exonerado_total + v_exonerado;
        SET v_i = v_i + 1;
    END WHILE;

    SET v_total = v_subtotal - v_descuento_total + v_imv_total + v_exento_total + v_exonerado_total;
    IF v_total < 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El total de factura no puede ser negativo';
    END IF;

    -- Mantener numeracion atomica por sucursal igual que sp_mantfacturas.
    IF v_tipo_venta = 1 THEN
        SET @ne_col_consecutivo = 'consecutivo';
    ELSE
        SET @ne_col_consecutivo = CONCAT('consecutivo', v_tipo_venta - 1);
    END IF;
    IF NOT EXISTS (SELECT 1 FROM consecutivos WHERE idsucursal = p_sucursal) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No hay consecutivo configurado para la sucursal';
    END IF;
    SET @ne_sucursal_factura = p_sucursal;
    SET @ne_sql_consecutivo = CONCAT(
        'UPDATE consecutivos SET ', @ne_col_consecutivo,
        ' = LAST_INSERT_ID(', @ne_col_consecutivo,
        ' + 1) WHERE idsucursal = ? LIMIT 1'
    );
    PREPARE ne_facturar_consecutivo FROM @ne_sql_consecutivo;
    EXECUTE ne_facturar_consecutivo USING @ne_sucursal_factura;
    DEALLOCATE PREPARE ne_facturar_consecutivo;
    SET v_consecutivo = LAST_INSERT_ID();

    SELECT IFNULL((SELECT valor FROM ajustes WHERE descr = 'feversion' LIMIT 1), '')
      INTO v_version;
    SELECT COALESCE(MAX(nombre), 'Factura') INTO v_nombre_tipo
      FROM tipofacturas WHERE id = v_tipo_factura;

    INSERT INTO facturas (
        idtipoventa, idtipo, idtipopago, fecha, idcliente, idestado,
        isregistrada, imv, subtotal, exento, descuento, exonerado, oc, plazo,
        comentario, referencia, idmoneda, idusuario, comodin, idsucursal,
        consecutivo, extra, divisa, terminal, feestado, idexoneracion,
        mailstatus, idagente, comision, saldo, cobrado, codactividadReceptor
    ) VALUES (
        v_tipo_venta, v_tipo_factura, v_tipo_pago, NOW(), v_cliente_factura, 1,
        0, v_imv_total, v_subtotal, v_exento_total, v_descuento_total,
        v_exonerado_total, v_orden, v_plazo, v_comentario, v_referencia,
        v_moneda, p_usuario, v_comodin_factura, p_sucursal, v_consecutivo,
        v_extra, v_divisa, v_terminal, 7, v_version, 0, v_agente,
        v_comision_factura, 0, 0, v_actividad
    );
    SET v_idfactura = LAST_INSERT_ID();

    INSERT INTO log VALUES (
        NULL, 64, 1, CONCAT(v_nombre_tipo, ': ', v_consecutivo),
        p_usuario, NOW(), p_sucursal, v_idfactura
    );

    IF (v_tipo_venta IN (1, 7, 108, 8) AND v_tipo_factura IN (2, 3, 4, 5, 6, 10, 97)) THEN
        INSERT INTO estadoscuentas VALUES (
            NULL, 1, 1, v_idfactura, p_usuario, NOW(), v_total / v_divisa,
            v_total / v_divisa, 0, NULL, NULL, 0,
            CONCAT('Factura ', v_nombre_tipo, ': ', v_consecutivo),
            1, 7, v_moneda, v_divisa, '', NULL, 1
        );
        UPDATE facturas SET saldo = v_total WHERE id = v_idfactura;
    END IF;

    SET v_i = 1;
    WHILE v_i <= v_total_lineas DO
        SELECT iddetallenota, idnota, idproducto, idunidad, cantidad,
               cantidad_inventario, precio, descuento, costo, imv, comision,
               idexoneracion, comodin, idimpuestos, iddescuentos
          INTO v_detalle, v_detalle_nota, v_producto, v_unidad, v_cantidad,
               v_stock, v_precio, v_descuento, v_costo, v_imv, v_comision_linea,
               v_idexoneracion, v_comodin_linea, v_idimpuestos, v_iddescuentos
          FROM tmp_ne_facturar_lineas WHERE posicion = v_i;

        INSERT INTO detallefacturas (
            idfactura, idproducto, idservicio, idexoneracion, cantidad, precio,
            descuento, costo, imv, comodin, idunidad, idimpuestos, iddescuentos,
            idinventario, comision
        ) VALUES (
            v_idfactura, v_producto, 0, v_idexoneracion, CAST(v_cantidad AS CHAR),
            v_precio, v_descuento, v_costo, v_imv, v_comodin_linea, v_unidad,
            v_idimpuestos, v_iddescuentos, 6, v_comision_linea
        );
        SET v_iddetallefactura = LAST_INSERT_ID();

        -- La salida ya se registro al emitir la nota. Solo se conserva el peso
        -- auxiliar que agrega el flujo normal de facturacion a productos pesables.
        SELECT MAX(CASE WHEN codigo = 2 THEN valor END),
               MAX(CASE WHEN codigo = 2 THEN idunidad END),
               COALESCE(MAX(CASE WHEN codigo = 1 AND valor > 0 THEN valor END), 1)
          INTO v_peso, v_unidad_peso, v_factor
          FROM dimensioproductos WHERE idproducto = v_producto;
        IF v_peso IS NOT NULL AND v_peso > 0 THEN
            INSERT INTO msdetallefacturas (
                viddetalle, parancelaria, cabys, codigo, lote, peso, unidadpeso, oc
            ) VALUES (
                v_iddetallefactura, '', NULL, '', 0, (v_stock / v_factor) * v_peso,
                COALESCE(v_unidad_peso, 0), 0
            );
        END IF;

        UPDATE detallenotasentrega SET iddetallefactura = v_iddetallefactura
         WHERE id = v_detalle AND idnota = v_detalle_nota AND iddetallefactura IS NULL;
        IF ROW_COUNT() <> 1 THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No se pudo vincular la linea de nota';
        END IF;
        SET v_i = v_i + 1;
    END WHILE;

    UPDATE notasentrega n
    INNER JOIN tmp_ne_facturar_notas tn ON tn.id = n.id
       SET n.idestado = 2, n.idfactura = v_idfactura
     WHERE n.idsucursal = p_sucursal AND n.idestado = 1 AND n.idfactura IS NULL;
    IF ROW_COUNT() <> v_total_notas THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Una nota cambio mientras se preparaba la factura';
    END IF;

    DROP TEMPORARY TABLE tmp_ne_facturar_lineas;
    DROP TEMPORARY TABLE tmp_ne_facturar_notas;
    COMMIT;
    SET v_transaccion = 0;

    SELECT v_idfactura AS idfactura, v_consecutivo AS consecutivo,
           v_total_notas AS notas_facturadas, v_total_lineas AS lineas_facturadas,
           v_total AS total, 0 AS repetida;
END$$
DELIMITER ;
