<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {  
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 86400');
    header('Content-Type: text/html; charset=utf-8');   
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
}

header('Content-Type: application/json; charset=utf-8');

if (isset($_POST['respuestaXml'])) {
    file_put_contents('./assets/xml/'.$_POST['clave'].'.xml', base64_decode($_POST['respuestaXml']) );
    //RESPUESTA DE HACIENDA
}else{
    $cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : '';
    $salida = [];
    $salida['error'] = 0;
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
              unlink($target_path);
              $salida['msj'] = 'LLAVE CRIPTOGRAFICA YA EXISTENTE';
              $salida['error'] = 11;
              break;
            }
    
            move_uploaded_file($temp, $target_path);
            if(!openssl_pkcs12_read(file_get_contents($target_path), $certs, $pin)){
                unlink($target_path);
                $salida['msj'] = 'PIN O LLAVE CRIPTOGRAFICA INVALIDAS';
                $salida['error'] = 12;
            }else{
                $publicKey = $certs["cert"];

                $certData = openssl_x509_parse($publicKey);
                $exp_p12 = gmdate("Y-m-d H:i:s",$certData['validTo_time_t']);

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
                        
                        $rs = $db->ejecutar("insert into sucursales values(null,'".$salida['CN']."',1,'','".$salida['cedula']."','','',".$salida['tipo'].",'assets/p12/".$name."','".$pin."',NULL,0,0,1,'".$userComprobante."','".$passComprobante."',1,'',NULL,NULL,NULL,120,0,'',1)");
                        $rs = $db->ejecutar("select id from sucursales where cedula = '".$salida['cedula']."'")->fetch_all()[0][0]; 

                        $db->ejecutar("insert into correos values(null,".$rs.",39,'".$correo."')");
                        $db->ejecutar("insert into telefonos values(null,3,'".$telefono."',39,".$rs.",52)");
                        $db->ejecutar("insert into ubicaciones values(null,".$barrio.",'".$ubicacion."','0','0',39,".$rs.")");
                        
                        $db->ejecutar("INSERT INTO usuarios VALUES(null, '".$sysuser."', 2, '".$salida['CN']."', md5(aes_encrypt('".$pswd."','lt6969')), '".$salida['cedula']."', '".$correo."', 0, NULL, '00:15:00', '23:55:00', '".$rs."')");
                        $db->ejecutar("insert into consecutivos(idsucursal) values(".$rs.")");
                        $db->ejecutar("insert into ajustessucursales(vid,idsucursal,pv,cbarras,exp_p12,margenes,recibo,punitventa,iniciofact,isivi,pipme) values(null,".$rs.",1,0,'".$exp_p12."',0,0,0,0,1,'https://fe.logintechcr.com/wsdlServer.php')");
                        if(isset($_POST['referencia']))
                          $db->ejecutar('update usuarios set idsucursal = concat(idsucursal,",'.$rs.'") where id = '.$_POST['referencia'].' and id in(246);');
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
        case 3: //SINCRONIZADOR MANUAL
          require_once '_config/mysqlDB.php';
          $base = new DBClass();

          $rs = $base->ejecutar('select id,idfila,idtabla,idestado from sincro where id > '.$_POST['vid'].' and idsucursal in('.$_POST['vsucursal'].', -1)');

          if(isset($rs->num_rows)){
            $salida['rs'] = [];

            $rs = $rs->fetch_all();
            foreach ($rs as $obj) {
              switch ($obj[3]) {
                case 0: //SINCRONIZAR TODA LA TABLA
                  if($obj[2] == 11){
                    llenado_masivo($salida['rs'],11,$base,'id > 0');
                    llenado_masivo($salida['rs'],97,$base,'idproducto > 0');
                  }                   
                  break;
                case 1: //INSERTAR UNA FILA
                  $line = $base->ejecutar('call krattos("*",'.$obj[2].',"id = '.$obj[1].'")')->fetch_all();
                  array_push($salida['rs'], ['acc' => "1","tbl" => $obj[2], "row" => $obj[1],"bdy" => $line[0]]);
                  break;
                case 2: //ACTUALIZAR UNA FILA
                  actualizador($salida['rs'],$obj[2],$base,$obj[1]);
                  break; 
                default:
                  $salida['rs'] = 'opcion no valida';
                  break;
              }
            }

            if(sizeof($rs))
              $salida['last_id'] = $rs[sizeof($rs)-1][0];

            if(isset($_POST['vmore'])){
              $marr = json_decode($_POST['vmore']);
              $rback = [];
              $aid = 0;
              foreach ($marr as $obj) {
                $tbl = $base->ejecutar('call krattos("nombre",70,"id = '.$obj->tbl.'")')->fetch_all()[0][0];
                switch($obj->tbl){
                  case 65:
                    $obj->bdy[1] = $aid;
                    break;
                  default:
                    break;
                } 
                $arg = substr(substr(json_encode($obj->bdy),1),0,-1);
                $arg = substr($arg,strpos($arg, ','));

                $mrs = $base->ejecutar('insert into '.$tbl.' values(null'.$arg.')');
                $aid = $obj->tbl == 64 ? $base->ejecutar('select max(id) from facturas where idsucursal = '.$_POST['vsucursal'])->fetch_all()[0][0] : 0;

                if($mrs == 1)
                  array_push($rback,'update sincro set issync = 1 where id = '.$obj->row);
                else
                  array_push($rback,$mrs.' --- ARG: '.$arg);
                  
              }
              $salida['act'] = json_encode($rback);
            }

          }else{
            $salida['rs'] = $rs;
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
        case 7: //FE INTEGRACION EN LINEA
          $salida['error'] = 'REVIZAR CREDENCIALES';
          break;
        case 8: // REVICION DE USUARIOS
          if (!isset($_POST['cedula'])) {
            $salida = getError('CEDULA REQUERIDA');
            break;
          }

          require_once '_config/mysqlDB.php';
          $base = new DBClass();

          $rs = $base->ejecutar('call krattos("id",2,"!bisproveedor and trim(replace(cedula,\"-\",\"\")) = trim(replace(\"'.$_POST['cedula'].'\",\"-\",\"\")) and id > 0")');
          if(!isset($rs->num_rows)){
            $salida = getError($rs);
            break;
          }
          $rs=$rs->fetch_all();
          if(!sizeof($rs)){
            $salida = getError('CLIENTE NO REGISTRADO '.$_POST['cedula']);
            break;
          }

          // $sys = $base->ejecutar('call krattos("",80,"0,0,\"\",\"\",\"'.$_POST['sysmod'].'\"")')->fetch_all();
          // if(!sizeof($rs)){
          //   $salida = getError('PROBLEMAS CON LA LLAVE ');
          //   break;
          // }

          // $sys = explode(',', $sys);

          // $salida = getError($sys[0]);

          $salida['rs'] = $rs;

          break;
        case 9: //INCLUIR CLIENTE
          if(!isset($_POST['client'])){
            $salida = getError('Variable no Valida');
          }else{
            require_once '_config/mysqlDB.php';
            $base = new DBClass();
            $client = $_POST['client'];

            $rs = $base->ejecutar('call krattos("",172,"1,0,\"\",\"\",\"'.$client['nombre'].'\",\"'.$client['cedula'].'\",'.$client['tp'].',1,0,0,0,0,8,1,\"'.$client['fantasia'].'\",0,0,\"\",0,0,@idclie,1,0,0,\"\"")');

            if(isset($rs->num_rows)){
              $rs = $rs->fetch_all()[0][0];

              $correo = $base->ejecutar('call shadow(1,17,"","null,'.$rs.',2,\"'.$client['correo'].'\"")');
              $telefono = $base->ejecutar('call shadow(1,238,"","null,3,\"'.$client['tel'].'\",2,'.$rs.',52")');

              $serv = $base->ejecutar('call shadow(1,320,"idcliente,idservicio,next_fecha,fecha,monto,idtipo,tipofactura,nactualiza,nbase,variacion","'.$rs.','.$client['servicio'].',\"'.$client['fcorte'].'\",now(),'.$client['valor'].',1,1,0,0,0")');

              if(!isset($serv->num_rows))
                $salida = getError('SERVICIO-CLIENTES: '.$serv);
              else{
                $salida['rs'] = $base->ejecutar('call krattos("",80,"'.$rs.','.$client['servicio'].',\"'.$client['fcorte'].'\",0,\"\"")')->fetch_all()[0][0];
              }
            }
            else{
              if($client['issuc']){
                $idcliente = $base->ejecutar('id',2,'trim(replace(cedula,"-","")) = "'.$client['cedula'].'"');
                //$salida['rs'] = $idcliente;
                $salida = getError($client['issuc']);
              }
              else
                $salida = getError($rs);
            }
          }
          break;
        case 10: //AUTENTICAR
          require_once '_config/mysqlDB.php';
          $db = new DBClass();
          
          $_POST['usr'] = isset($_POST['usr']) ? $_POST['usr'] : '';
          $_POST['pswd'] = isset($_POST['pswd']) ? $_POST['pswd'] : '';
          
          $rs = $db->ejecutar('call krattos("",215,"\''.$_POST['usr'].'\',\''.$_POST['pswd'].'\'")');
          
          if(isset($rs->num_rows)){
            $rs = $rs->fetch_all();
            if (sizeof($rs) == 1) {
              $salida['succed'] = 1;
              $salida['rs'] = $rs; 
            }else{
              $salida['succed'] = 0;
              $salida['rs'] = $rs[0][0];
            }
          }else{
            $salida = getError($rs);
          }

          break;
        case 11: //CHECHEADOR MANUAL
          require_once '_config/mysqlDB.php';
          $db = new DBClass();

          switch ($_POST['acc']) {
            case 1:
              $salida['rs'] = $db->ejecutar('call krattos("valor",15,"descr = \"versionbms\"")')->fetch_all();
              break;
            
            default:
              # code...
              break;
          }
          break;
        default:
           $salida['msj'] = 'WSDL APSY SEND A REQUEST';
           $salida['error'] = 1;
            break;
    }

    echo json_encode($salida);
}

function getError($msj){
  return  array('msj' => $msj, 'error' => 1);
}

function llenado_masivo(&$salida,$tbl,&$base,$where){
  $tbln = $base->ejecutar('call krattos("nombre",70,"id = '.$tbl.'")')->fetch_all()[0][0];

  array_push($salida, ['acc' => "0","tbl" => $tbl, "row" => 0,"bdy" => ""]);

  $line = $base->ejecutar('call krattos("*",'.$tbl.',"'.$where.'")')->fetch_all();
  $lstr = 'insert into '.$tbln.' values(';
  foreach ($line as $ll) {
    $lstr .= substr(substr(json_encode($ll),1),0,-1).' ),(';  
  }

  array_push($salida, ['acc' => "4","tbl" => 0, "row" => 0,"bdy" => substr($lstr,0,-2) ]);
}

function actualizador(&$salida,$tbl,&$base,$where){
  $tbln = $base->ejecutar('call krattos("nombre",70,"id = '.$tbl.'")')->fetch_all()[0][0];
  $line = $base->ejecutar('call krattos("*",'.$tbl.',"id = '.$where.'")')->fetch_all();
  $cls = $base->ejecutar('describe '.$tbln)->fetch_all();
  $act_str = '';
  foreach ($cls as $key => $value) {
    $act_str .= $value[0].' = "'.addslashes($line[0][$key]).'", ';
  }

  array_push($salida, ['acc' => "2","tbl" => $tbl, "row" => $where,"bdy" => substr($act_str,0,-2)]);

}

?>
