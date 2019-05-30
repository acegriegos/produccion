<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {  
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 86400');   
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
}


if (isset($_POST['respuestaXml'])) {
    file_put_contents('./assets/xml/'.$_POST['clave'].'.xml', base64_decode($_POST['respuestaXml']) );
    //RESPUESTA DE HACIENDA
}else{
    $cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : '';
    $salida = [];
    switch ($cmd) {
        case 1: //CARGA DE PERMISOS POR CLIENTE
            require_once '_config/mysqlDB.php';
            
            $cliente = isset($_POST['client_id']) ? $_POST['client_id'] : '';
            $salida['error'] = 0;

            // if (strlen($cliente) == 0){
            //     $salida['msj'] = 'CLIENTE NO VALIDO';
            //     $salida['error'] = 1;
            // }else{
            //     $salida['msj'] = 'VAMO BIEN';
            //     $salida['error'] = 0;
            // }
            $db = new DBClass();

            $rs = $db->ejecutar('select * from logintech.permisosLogintech');
            $salida['permisos'] = $rs->fetch_all();

            break;
        case 2: //CARGA DE INFORMACION FE
            require_once '_config/mysqlDB.php';
            $db = new DBClass();

            $userComprobante = isset($_POST['ucp']) ? $_POST['ucp'] : '';

            if ($userComprobante == '' || !strpos($userComprobante, '@prod.')) {
               $salida['msj'] = 'USUARIO COMPROBANTE ELECTRONICO NO VALIDO';
               $salida['error'] = 1;
               break;
            }

            $passComprobante = isset($_POST['ccp']) ? $_POST['ccp'] : '';

            if ($passComprobante == '') {
               $salida['msj'] = 'CONTRASEÑA COMPROBANTE ELECTRONICO NO VALIDA';
               $salida['error'] = 2;
               break;
            }

            $pin = isset($_POST['plc']) ? $_POST['plc'] : '';

            if ($pin == '') {
               $salida['msj'] = 'PIN LLAVE CRIPTOGRAFICA NO VALIDA';
               $salida['error'] = 3;
               break;
            }

            $archivo = isset($_FILES['llc']) ? $_FILES['llc'] : '';

            if ($archivo == '') {
               $salida['msj'] = 'LLAVE CRIPTOGRAFICA NO VALIDA';
               $salida['error'] = 4;
               break;
            }

            $correo = isset($_POST['uce']) ? $_POST['uce'] : '';

            if ($correo == '') {
               $salida['msj'] = 'CORREO ELECTRONICO NO VALIDO';
               $salida['error'] = 5;
               break;
            }

            $telefono = isset($_POST['ute']) ? $_POST['ute'] : '';

            if ($telefono == '') {
               $salida['msj'] = 'TELEFONO NO VALIDO';
               $salida['error'] = 6;
               break;
            }

            $barrio = isset($_POST['ube']) ? $_POST['ube'] : '';

            if ($barrio == '') {
               $salida['msj'] = 'BARRIO NO VALIDO';
               $salida['error'] = 7;
               break;
            }
            
            $ubicacion = isset($_POST['ude']) ? $_POST['ude'] : '';

            if ($ubicacion == '') {
               $salida['msj'] = 'UBICACION NO VALIDA';
               $salida['error'] = 8;
               break;
            }

            $sysuser = isset($_POST['sysuser']) ? $_POST['sysuser'] : '';
            $rs = $db->ejecutar("select count(id) from usuarios where id > 0 and user = '".$sysuser."'")->fetch_all()[0][0];

            if ($sysuser == '') {
               $salida['msj'] = 'USUARIO DEL SISTEMA NO VALIDO ';
               $salida['error'] = 9;
               break;
            }

            if ($rs >= 1) {
               $salida['msj'] = 'USUARIO DEL SISTEMA EXISTENTE ';
               $salida['error'] = 9;
               break;
            }

            $pswd = isset($_POST['pswd']) ? $_POST['pswd'] : '';

            if ($pswd == '') {
               $salida['msj'] = 'CONTRASEÑA DEL SISTEMA NO VALIDA';
               $salida['error'] = 10;
               break;
            }

            $temp = $_FILES['llc']['tmp_name'];
            $dir_separator = DIRECTORY_SEPARATOR;
            $folder = 'assets/p12';
            $name = $_FILES['llc']['name'];
            $target_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.$name;

            if (file_exists($target_path)) {
              $salida['msj'] = 'LLAVE CRIPTOGRAFICA YA EXISTENTE';
              $salida['error'] = 11;
              break;
            }
    
            move_uploaded_file($temp, $target_path);
            if(!openssl_pkcs12_read(file_get_contents($target_path), $certs, $pin)){
                unset($target_path);
                $salida['msj'] = 'PIN O LLAVE CRIPTOGRAFICA INVALIDAS';
                $salida['error'] = 12;
            }else{
                $user = $userComprobante;
                $pass = $passComprobante;
                $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut/protocol/openid-connect/token";
                $cli_id = "api-prod";
                
                $curl = curl_init($curl_hacienda);
                curl_setopt($curl, CURLOPT_HEADER, true);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);
                curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

                $params = array(
                  "client_id" => $cli_id,
                  "client_secret" => "",
                  "scope" => "",
                  "username" => $user,
                  "password" => $pass,
                  "grant_type" => "password");

                $postData = "";

                foreach($params as $k => $v)
                {
                   $postData .= $k . '='.urlencode($v).'&';
                }

                $postData = rtrim($postData, '&');

                curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

                $json_response = curl_exec($curl);
                $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

                curl_close($curl);
                $json_response = json_decode($json_response);
                if (isset($json_response->access_token)) {
                    $publicKey = $certs["cert"];
                    $certData   = openssl_x509_parse($publicKey);

                    switch ($certData['subject']['OU']) {
                      case 'CPJ':
                        $tipo = 2;
                        $cedula = substr($certData['subject']['serialNumber'],4);
                        break;
                      case 'CPF':
                        $tipo = 1;
                        $cedula = substr($certData['subject']['serialNumber'],5);
                        break;
                      case 'DIMEX':
                        $tipo = 3;
                        $cedula = substr($certData['subject']['serialNumber'],6);
                        break;
                      default:
                        $cedula = substr($certData['subject']['serialNumber'],5);
                        $tipo = 4;
                        break;
                    }
                    unset($target_path);

                    $accept = isset($_POST['acept']) ? $_POST['acept'] : 0;
                    $recibo = isset($_POST['recibo']) ? $_POST['recibo'] : '';

                    $salida['CN'] = $certData['subject']['CN'];
                    $salida['cedula'] = $cedula;
                    $salida['tipo'] = $tipo;

                    if($accept){
                        $salida['error'] = 0;
                        $salida['correo'] = $correo;
                        
                        $rs = $db->ejecutar("insert into sucursales values(null,'".$salida['CN']."',1,'','".$salida['cedula']."','','',".$salida['tipo'].",0,'assets/p12/".$name."','".$pin."',NULL,1,0,1,'".$userComprobante."','".$passComprobante."',1,'',NULL,NULL,NULL,120,0)");
                        $rs = $db->ejecutar("select id from sucursales where cedula = '".$salida['cedula']."'")->fetch_all()[0][0];

                        $db->ejecutar("insert into correos values(null,".$rs.",39,'".$correo."')");
                        $db->ejecutar("insert into telefonos values(null,3,'".$telefono."',39,".$rs.",52)");
                        $db->ejecutar("insert into ubicaciones values(null,".$barrio.",'".$ubicacion."','0','0',39,".$rs.")");
                        
                        $db->ejecutar("INSERT INTO usuarios VALUES(null, '".$sysuser."', 2, '".$salida['CN']."', md5(aes_encrypt('".$pswd."','lt6969')), '".$salida['cedula']."', '".$correo."', 0, NULL, '00:15:00', '23:55:00', '".$rs."')");
                        $db->ejecutar("insert into consecutivos(idsucursal) values(".$rs.")");
                        $db->ejecutar("insert into ajustessucursales(vid,idsucursal,pv,cbarras,impresora,margenes,recibo,punitventa,iniciofact,isivi,pipme) values(null,".$rs.",1,0,null,0,0,0,0,1,'http://35.188.212.38/produccion/wsdlServer.php')");
                    }else{
                        $salida['error'] = 14;
                    }
                }else{
                    unset($target_path);
                    $salida['msj'] = "USUARIO O CONTRASEÑA ATV INVALIDOS";
                    $salida['error'] = 13;
                }
                
            }
            break;
        case 3: //SIC HACIENDA
            require_once 'assets/libs/nusoapLT/nusoap.php';
            // $options = [
            //     'uri' => 'http://schemas.xmlsoap.org/soap/envelope/',
            //     'style' => SOAP_RPC,
            //     'use' => SOAP_ENCODED,
            //     'soap_version' => SOAP_1_1,
            //     'cache_wsdl' => WSDL_CACHE_NONE,
            //     'connection_timeout' => 30,
            //     'trace' => true,
            //     'encoding' => 'UTF-8',
            //     'exceptions' => true
            // ];

            $params = [
                'origen' => 'Fisico', // Fisico,  Juridico o DIMEX
                'cedula' => '',
                'ape1' => 'MIRANDA',
                'ape2' => '',
                'nomb1' => 'LUIS',
                'nomb2' => 'MIGUEL',
                'razon' => '',
                'Concatenado' => ''
            ];
            

            $wsdl = "http://196.40.56.20/wsInformativasSICWEB/Service1.asmx?WSDL";
            $oSoapClient = new nusoap_client($wsdl,true);
            $rs = $oSoapClient->call("ObtenerDatos", $params);
            $salida = isset($rs['ObtenerDatosResult']['diffgram']['DocumentElement']['Table']) ? $rs['ObtenerDatosResult']['diffgram']['DocumentElement']['Table'] : '';
            print_r($salida);
            break;
        case 4:
          if (!isset($_POST['ced'])) {
            $salida['msj'] = 'DATOS REQUERIDOS';
            $salida['error'] = 1;
          }else{
            require_once '_config/mysqlDB.php';
            $base = new DBClass();

            $rs = $base->ejecutar('call sp_rgetAll("'.$_POST['ced'].'",'.$_POST['isp'].')');
            if (isset($rs->num_rows)) {
                $salida['rs'] = $rs->fetch_all();
            }else
                $salida['error'] = $rs;
            
            $salida['sql'] = 'call sp_rgetAll("'.$_POST['ced'].'",'.$_POST['isp'].')';
          }
          break;
        case 5: //GUARDAR EN HACIENDA
          require_once '_config/mysqlDB.php';
          $base = new DBClass();

          $salida['rs'] = $base->ejecutar('insert into hacienda values(null,now(),"'.$_REQUEST['clave'].'","'.$_REQUEST['correos'].'")');
          break;
        case 6:
          require_once '_config/mysqlDB.php';
          $base = new DBClass();

          $rs = $base->ejecutar('select cedula from recepciones where !isin and !isprueba group by cedula');
          
          if (isset($rs->num_rows)) {
              $salida['rs'] = $rs->fetch_all();
          }else
              $salida['error'] = $rs;
            
          break;
        default:
           $salida['msj'] = 'WSDL LOGINTECH';
           $salida['error'] = 1;
            break;
    }

    echo json_encode($salida);
}
?>
