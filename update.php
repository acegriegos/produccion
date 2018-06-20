<?php
    $tupdate = isset($_REQUEST['tupdate']) ? $_REQUEST['tupdate'] : 0;

    switch ($tupdate) {
        case 1: //CONFIGURACION MYSQLDB
            $mdb = isset($_REQUEST['nschema']) ? $_REQUEST['nschema'] : 'production';
            $source = "https://logintechcr.com/descargas/db.lt";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $data = curl_exec ($ch);
            $error = curl_error($ch);
            curl_close ($ch);

            $destination = "./_config/mysqlDB.php";
            $file = fopen($destination, "w+");
            fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($da$
            fclose($file);

            $archivo = file_get_contents($destination);
            $archivo = preg_replace('/developer/', $mdb, $archivo);
            file_put_contents($destination, $archivo);
            
            $salida['MYSQL'] = $error ? $error : 'OK';
            break;
        case 2: //CONFIGURACION BASE INICIAL
            require_once '_config/mysqlDB.php';
            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();
            $pass = $db->getPSS();
            $salida = [];
            set_time_limit(0);
            $salida['CONF'] = 'OK';
            
            $numtables = shell_exec("mysql -u".$user." -p".$pass." -e \"select count(*) as '' from information_schema.TABLES where table_schema = '".$mdb."'\";");

            if(trim($numtables) == 0){

                shell_exec("mysql -u".$user." -p".$pass." -e \"create schema if not exists ".$mdb."\"  >> ./assets/update/update.log 2>&1");
                shell_exec("mysql -u".$user." -p".$pass." -e \"grant all privileges on ".$mdb.".* to ".$user."@localhost identified by '".$pass."' \"  >> ./assets/update/update.log 2>&1");
                
                if(filesize("assets/update/update.log"))
                    $salida['CONF'] = 0;
            }
            break;
        case 3: //SCRIPT .INI INICIAL
            require_once '_config/mysqlDB.php';
            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();

            $salida = [];
            $salida['.INI'] = "character-set-server  = utf8mb4
            collation-server      = utf8mb4_general_ci
            lc_time_names         = es_CR
            default-time-zone = '-06:00'";

            $salida['SCRIPT_INICIAL'] = "INSERT INTO ".$mdb.".sucursales
            (id, nombre, idusuario, pfisico, consecutivo, consecutivo1, consecutivo2, consecutivo3, consecutivo4, consecutivo5, idtipoabono, idtipofactura, idtiponota, cedula, logo, encabezado, idtipocliente, isinventariado, p12, pass_n, idsucursal, fastshow, isPrueba, printSale, user_atv, pass_atv, idtiponegocio, consecutivo6, aceptacion, aceparcial, rechazo)
            VALUES(0, 'LOGIN TECHNOLOGIES S.A', 1, 'LOGINTECH', 250, 6, 0, 0, 0, 0, 1, 1, 1, '3-101-697761', '../assets/img/logo.png', '', 2, 1, 'assets/p12/310169776129.p12', 'CC68696816339C259913315B488EBADF', NULL, 1, 1, 0, 'cpj-3-101-697761@stag.comprobanteselectronicos.go.cr', 'l_?@Wsh%v[A*^0]p.W%b', 0, 16, 0, 0, 0);
            INSERT INTO ".$mdb.".usuarios
            (id, `user`, idTipoUsuario, nombre, clave, cedula, mail, bcambioPSSW, codigo, limite1, limite2, idsucursal)
            VALUES(1, 'sadmin', 1, 'Super Administrador', '2609e702ef61cc25826436e94d2cbe11', '202220222', 'info@logintechcr.com', 0, NULL, '00:00:00', '00:00:00', '-1');
            INSERT INTO ".$mdb.".usuarios
            (id, `user`, idTipoUsuario, nombre, clave, cedula, mail, bcambioPSSW, codigo, limite1, limite2, idsucursal)
            VALUES(2, 'admin', 1, 'Logintechcr', '2609e702ef61cc25826436e94d2cbe11', '123456789', 'info@logintechcr.com', 0, '', '00:00:00', '00:00:00', '-1');
            create temporary table ".$mdb.".tpermisos(id int,nombre varchar(64),codigo int,isvisble tinyint(2));
            insert into ".$mdb.".tpermisos select id,nombre,codigo,1 from ".$mdb.".permisos;
            insert into ".$mdb.".permisosLogintech select * from ".$mdb.".tpermisos;
            drop TEMPORARY table ".$mdb.".tpermisos;
            INSERT INTO ".$mdb.".monedas (id, nombre, simbolo, valor, principal, wsdl, suma, codigo) VALUES(1, 'Colones', '¢', 1.00, 1, 0, 0.00, 'CRC');INSERT INTO monedas (id, nombre, simbolo, valor, principal, wsdl, suma, codigo) VALUES(2, 'Dolares', '$', 560.46, 0, 1, 0.00, 'USD');INSERT INTO ".$mdb.".wsdls (wsid, wsurl, xmlsen, xmlreq, obtener, wsname) VALUES(1, 'http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx?WSDL', 'ObtenerIndicadoresEconomicosXML', 'ObtenerIndicadoresEconomicosXMLResult', 'INGC011_CAT_INDICADORECONOMIC,NUM_VALOR', 'Banco Central CR Venta'); INSERT INTO ".$mdb.".wsdls (wsid, wsurl, xmlsen, xmlreq, obtener, wsname) VALUES(2, 'http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx?WSDL', 'ObtenerIndicadoresEconomicosXML', 'ObtenerIndicadoresEconomicosXMLResult', 'INGC011_CAT_INDICADORECONOMIC,NUM_VALOR', 'Banco Central CR Compra');INSERT INTO ".$mdb.".tipopagos (id, nombre, bancos, extra, regex, principal, icono, idhacienda) VALUES(1, 'Efectivo', 4, NULL, NULL, 1, NULL, 1); INSERT INTO ".$mdb.".tipopagos (id, nombre, bancos, extra, regex, principal, icono, idhacienda) VALUES(2, 'Tarjeta', 2, 'Ultimos 4 dígitos', '([0-9]{4})', 0, '', 2); INSERT INTO ".$mdb.".tipopagos (id, nombre, bancos, extra, regex, principal, icono, idhacienda) VALUES(3, 'Deposito', 1, 'Numero de documento', NULL, 0, '', 4); INSERT INTO ".$mdb.".tipopagos (id, nombre, bancos, extra, regex, principal, icono, idhacienda) VALUES(4, 'Cheque', 0, 'Numero de referencia', NULL, 0, '', 3); INSERT INTO ".$mdb.".tipopagos (id, nombre, bancos, extra, regex, principal, icono, idhacienda) VALUES(5, 'Mixto', 5, NULL, NULL, 0, NULL, 99);INSERT INTO ".$mdb.".tipousuarios (id, nombre, defecto, bincierre) VALUES(1, 'Administrador', 1, 1);INSERT INTO ".$mdb.".tipousuarios (id, nombre, defecto, bincierre) VALUES(2, 'Servicio Profesional', 0, 0);INSERT INTO ".$mdb.".tipousuarios (id, nombre, defecto, bincierre) VALUES(3, 'Denegado', 0, 0);INSERT INTO ".$mdb."estadoclientes (id, nombre) VALUES(1, 'Activo');INSERT INTO ".$mdb."estadoclientes (id, nombre) VALUES(0, 'Inactivo');";
            break;
        case 4: //CONFIGURAION LOGINTECH
            $user = isset($_REQUEST['user']) ? $_REQUEST['user'] : '';
            $salida = [];

            $source = "http://erp.logintechcr.com/wsdlServer.php";
            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, $source);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_SSLVERSION,false);
            $params = array(
              "client_id" => $user,
              "cmd" => "1");

            $postData = "";

            foreach($params as $k => $v)
            {
               $postData .= $k . '='.urlencode($v).'&';
            }

            $postData = rtrim($postData, '&');

            curl_setopt($ch, CURLOPT_POSTFIELDS, $postData);

            $data = curl_exec ($ch);
            $error = curl_error($ch);

            curl_close ($ch);

            if ($error) 
                $salida['PERMISOS'] = $error;
            else{
                $salida['PERMISOS'] = $data;
            }
            break;        
        default: //CONFIGURACION BASE

            require_once '_config/mysqlDB.php';
            
            $db = new DBClass();
            $mdb = $db->getDB();
            $user = $db->getUSR();
            $pass = $db->getPSS();
            $salida = [];
            $errors = [];
            set_time_limit(0);

            fclose(fopen('./assets/update/update.log','w'));
            
            if (!file_exists("assets/update/update.sql")) {

                shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --complete-insert --no-create-info --skip-triggers --ignore-table=".$mdb.".tablas --ignore-table=".$mdb.".accesos --ignore-table=".$mdb.".ajustes --ignore-table=".$mdb.".estadopresupuestos --ignore-table=".$mdb.".estadofacturas --ignore-table=".$mdb.".permisos --ignore-table=".$mdb.".tipoacciones --ignore-table=".$mdb.".tipoakeys --ignore-table=".$mdb.".tipoasientos --ignore-table=".$mdb.".tipociclos --ignore-table=".$mdb.".tipoclientes --ignore-table=".$mdb.".tipocontable --ignore-table=".$mdb.".tipocuentas --ignore-table=".$mdb.".tipodevoluciones --ignore-table=".$mdb.".tipoestadocuentas --ignore-table=".$mdb.".tipofacturaimpresiones --ignore-table=".$mdb.".tipofacturas --ignore-table=".$mdb.".tipoflotilla --ignore-table=".$mdb.".tipoimpresion --ignore-table=".$mdb.".tipoimpresiones --ignore-table=".$mdb.".tipojerarquia --ignore-table=".$mdb.".tiporutas --ignore-table=".$mdb.".tipotelefonos --ignore-table=".$mdb.".tipoventas > ./assets/update/info.sql");
                shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --routines --events --triggers > ./assets/update/full.sql");

                $source = "https://logintechcr.com/descargas/struct.lt";
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, $source);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                curl_setopt($ch, CURLOPT_SSLVERSION,false);
                $data = curl_exec ($ch);
                $error = curl_error($ch); 
                curl_close ($ch);

                $destination = "./assets/update/update.sql";
                $file = fopen($destination, "w+");
                fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($data),'AES-256-CBC',base64_encode('".$pass."'))
                fclose($file);

                $archivo = file_get_contents('./assets/update/update.sql');
                $archivo = preg_replace('/`root`/', `".$user."`, $archivo);
                $archivo = preg_replace('/`%`/', `localhost`, $archivo);
                $archivo = preg_replace('/developer/', $mdb, $archivo);
                file_put_contents('./assets/update/update.sql', $archivo);
            }

            shell_exec("mysql -u".$user." -p".$pass." -f ".$mdb." < ./assets/update/update.sql >> ./assets/update/update.log 2>&1");
            shell_exec("mysql -u".$user." -p".$pass." -f ".$mdb." < ./assets/update/info.sql >> ./assets/update/update.log 2>&1");

            $salida['update'] = 1;

            if(filesize("assets/update/update.log")){

                $salida['update'] = 0;

                shell_exec("mysql -u".$user." -p".$pass." ".$mdb." < ./assets/update/full.sql");
                $salida['rollback'] = 1;
            }else{
                #unlink("assets/update/info.sql");
                unlink("assets/update/update.sql");
                #unlink("assets/update/full.sql");
            }
            break;
    }

    echo json_encode($salida);
    exit(0);
 ?>
