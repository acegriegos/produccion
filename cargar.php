<?php
    session_start();

    if(!empty($_FILES)){
        require_once '_config/mysqlDB.php';
        $base = new DBClass();
        
        if (isset($_REQUEST['accion'])) {

            if (is_array($_FILES['file']['name'])) {

                for ($i=0; $i < sizeof($_FILES['file']['name']); $i++) { 

                    $temp = $_FILES['file']['tmp_name'][$i];
                    $dir_separator = DIRECTORY_SEPARATOR;

                    switch ($_REQUEST['accion']) {
                        case 1: //IMAGENES SUCURSALES
                            $folder = 'assets/img/logos';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));
                            $target_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.'logo'.$REQUEST['idsucursal'].$ext;
                            $base->ejecutar("UPDATE sucursales SET logo = '.".$dir_separator.$folder.$dir_separator."logo".$REQUEST['idsucursal'].$ext."' WHERE id = ".$REQUEST['idsucursal']);
                            break;

                        case 2: //P12 SUCURSALES
                            $folder = 'assets/p12';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));
                            $target_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.'logo'.$REQUEST['idsucursal'].$ext;
                            $base->ejecutar("UPDATE sucursales SET p12 = '.".$dir_separator.$folder.$dir_separator."logo".$REQUEST['idsucursal'].$ext."' WHERE id = ".$REQUEST['idsucursal']);
                            break;
                         case 4: //SUBIR XML
                            $folder = 'assets/xml';
                            $name = $_FILES['file']['name'][$i];
                            $target_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.$name;
                            break;
                        default:
                            $index = $base->ejecutar('select lpad(count(id)+1, 2,0) from adjuntos where idtabla = 12 and idfila = "'.$_REQUEST['idcompra'].'"')->fetch_all()[0][0];

                            $folder = 'assets/imgupload';
                            $bname = '../assets/imgupload/';
                            $name = $_FILES['file']['name'][$i];
                            $ext = end(explode('.', $name));

                            $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator;
                            $target_path = $destination_path.'img'.$_REQUEST['idcompra'].$index.'.'.$ext;

                            $bname .= 'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                            $base->ejecutar('insert into adjuntos values(null,12,"'.$_REQUEST['idcompra'].'","'.$bname.'")');
                            break;
                    }

                    json_encode(move_uploaded_file($temp, $target_path));
                }
            }else{
                $temp = $_FILES['file']['tmp_name'];
                $dir_separator = DIRECTORY_SEPARATOR;

                switch ($_REQUEST['accion']) {
                    case 3: //VALIDAR P12
                        if ($_POST['clave'] == '') {
                            echo 'Clave de Llave Criptografica Vacia';
                        }else{
                            $folder = 'assets/p12';
                            $name = $_FILES['file']['name'];
                            $target_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator.$name;
                            move_uploaded_file($temp, $target_path);
                            if(!openssl_pkcs12_read(file_get_contents($target_path), $certs, $_POST['clave'])){
                                unset($target_path);
                                echo 'Clave o Archivo Invalidos';
                            }
                            else{
                                $user = $_POST['user'];
                                $pass = $_POST['pass'];
                                $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut/protocol/openid-connect/token";
                                $cli_id = "api-prod";
                                
                                if ($_POST['prueba'] == 1) {
                                    $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut-stag/protocol/openid-connect/token";
                                    $cli_id = "api-stag";
                                }

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

                                    $tipo = $certData['subject']['OU'] == 'CPJ' ? 1 : 0;
                                    $cedula = substr($certData['subject']['serialNumber'],$tipo ? 4 : 5);

                                    $salida = [];
                                    $salida['CN'] = $certData['subject']['CN'];
                                    $salida['cedula'] = $cedula;
                                    $salida['tipo'] = $tipo;
                                    unset($target_path);
                                    echo json_encode($salida);
                                }else{
                                    unset($target_path);
                                    echo "Usuario o Contraseña ATV Inválidos";
                                }
                                
                            }
                        }
                        break;
                    default: //Adjuntar Compras
                        $folder = 'assets/xml';
                        $bname = '../assets/xml/';

                        $destination_path = dirname(__FILE__).$dir_separator.$folder.$dir_separator;

                        $index = $base->ejecutar('select lpad(count(id)+1, 2,0) from adjuntos where idtabla = 12 and idfila = "'.$_REQUEST['idcompra'].'"')->fetch_all()[0][0];

                        $name = $_FILES['file']['name'];
                        $ext = end(explode('.', $name));
                        $target_path = $destination_path.'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                        
                        $bname .= 'img'.$_REQUEST['idcompra'].$index.'.'.$ext;
                        $base->ejecutar('insert into adjuntos values(null,12,"'.$_REQUEST['idcompra'].'","'.$bname.'")');
                        echo(json_encode(move_uploaded_file($temp, $target_path)));
                        break;
                }
                
            }
        }else{
            echo json_encode("ERROR");
        }
    }
?>