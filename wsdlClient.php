<?php 
    require_once '_config/mysqlDB.php';
    set_time_limit(0);
    
    if (isset($_REQUEST['accion'])) {

        $id = isset($_REQUEST['id']) ? $_REQUEST['id'] : 0;
        $accion = $_REQUEST['accion'];

        if (!file_exists('./assets/xml/'.$id)) {
            $fe = new facturaElectronica($id);
        }

        switch ($accion) {
            case 1://RECIBO DE FACTURA
                ob_end_clean();
                ignore_user_abort();
                ob_start();
                header("Connection: close");
                header("Content-Encoding: none");
                echo json_encode(['rs'=>'Documento Electronico Aprobado--','clave'=>$fe->info['Clave'],'num'=>$fe->info['NumeroConsecutivo'],'succes'=>1]);
                header("Content-Length: " . ob_get_length());
                ob_end_flush();
                flush();

                $rs = $fe->recepcion();
                $db = new DBClass();

                if(isset($_REQUEST['to']) && !isset($rs['erno'])){
                    if(strlen(trim($_REQUEST['to'])) > 8){
                        $fe->envioWsdlCorreo($db,$id,$_REQUEST['to']);
                    }else{

                    sleep(10);
                    $estado = $fe->estado();
                    
                    if(isset($estado['estado'])){

                            switch($estado['estado']){
                                case 'aceptado':
                                    $state = 1;
                                    break;
                                case 'recibido':
                                    $state = 9;
                                    break;
                                case 'rechazado':
                                    $state = 3;
                                    break;
                                case 'procesando':
                                    $state = 2;
                                    break;
                                case 'Sin Subir':
                                    $state = 2;
                                    break;
                                case 'Sin Internet':
                                    $state = 0;
                                    break;
                                case 'error':
                                    $state = 8;
                                    break;
                                default:
                                    $state = 0;
                                    break;
                            }

                            $rs = $db->ejecutar('call shadow(2,'.$fe->idtabla.',"feestado = '.$state.'","id = '.$_POST['idfila'].'")');

                        }else
                            echo json_encode($estado);
                    }
                }else
                    echo json_encode($rs);
                
                break;
            case 2://GET XML
                if (isset($_REQUEST['view'])) {
                    header("Content-type: text/xml; encoding='UTF-8'");
                }//else{
                //     header("Content-type: application/octet-stream; name='excel';charset=UTF-8");
                //     header("Content-Disposition: filename=".$fe->info['NumeroConsecutivo'].".xml");
                //     header("Pragma: no-cache");
                //     header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                //     echo "\xEF\xBB\xBF";
                // }
                print_r($fe->getXMLRecepcion());
                break;
            case 3://BEARER
                echo "<pre>";
                    print_r($fe->getBearer());
                echo "</pre>";
                break;
            case 4://Consulta ESTADO;
                echo json_encode($fe->estado(),JSON_UNESCAPED_UNICODE);
                break;
            case 5://Consulta General de Recibos
                $offset     =   !isset($_REQUEST['offset'])     ?   1  :   $_REQUEST['offset'];
                $limit      =   !isset($_REQUEST['limit'])      ?   50  :   $_REQUEST['limit'];
                $receptor   =   !isset($_REQUEST['receptor'])   ?   ''   :   $_REQUEST['receptor'];
                
                echo json_encode($fe->getRecibos($id,$offset,$limit,$receptor));
                
                break;
            case 6://ENCABEZADO
                echo json_encode($fe->info);
                break;
            case 7://PAYLOAD 
                $xml = $fe->getXMLRecepcion();
       
                echo json_encode($fe->getPayload($xml),JSON_UNESCAPED_UNICODE);
                break;
            case 8: //XML-ESTADO
                header("Content-type: text/xml; encoding='UTF-8'");
                $result = $fe->estado();
                print_r(base64_decode($result['xml']));
                break;
            case 9: //P12

                $salida = [];
        
                if(!file_exists($fe->credenciales[0])){
                    $salida['succed'] = 0;
                    $salida['ERROR'] = 'Clave Criptofágica no Existente: ';            
                }else{
                        
                    if(openssl_pkcs12_read(file_get_contents($fe->credenciales[0]), $certs, $fe->credenciales[1])){
                    
                                $publicKey    =$certs["cert"];
                            
                                $certData   = openssl_x509_parse($publicKey);
                                $salida['succed'] = 1;
                        $salida['certificado'] = $certData;
                    }else{
                        $salida['succed'] = 0;
                        $salida['ERROR'] = 'Llave o PIN no Válidos';    
                    }
                }
                
            echo json_encode($salida);
            break;
            case 10: //LEER XML
                $salida = ['succed'=>1];
                if (!file_exists('./assets/xml/'.$id)) {
                    $salida = ['succed'=>0,'ERROR'=>'ARCHIVO NO VALIDO'];
                }else{
                    $fe = new facturaElectronica(0);
                    $db = new DBClass();
                    $xml = file_get_contents('./assets/xml/'.$id);
                    $fe->loadXML_FILE($xml,$salida,$db,$_REQUEST['ced']);
                    touch('./assets/xml/'.$id);
                }

                echo json_encode($salida);
                break;
            case 11:
                $salida = [];
        
                if(!file_exists($fe->credenciales[0])){
                    $salida['succed'] = 0;
                    $salida['ERROR'] = 'Clave Criptofágica no Existente';            
                    }else{
                        
                    if(openssl_pkcs12_read(file_get_contents($fe->credenciales[0]), $certs, $fe->credenciales[1])){
                    
                            $publicKey =$certs["cert"];
                        
                            $certData = openssl_x509_parse($publicKey);
                            $certIssuer = $certInfo = array();
                            foreach ($certData['issuer'] as $item=>$value) {
                              $certIssuer[] = $item . '=' . $value;
                            }
                            $certIssuer = implode(', ', array_reverse($certIssuer));
                            $checkbeare = $fe->getBearer();
                            if(!is_array($checkbeare))
                                return $checkbeare;
                            $isprueb = strpos($certIssuer, 'SANDBOX') ? 1 : 0;
                            $hbearer = isset($checkbeare['respuesta']->access_token) ? 1 : 0;
                            $puser = strpos($checkbeare['consulta']['username'],'stag') ? 1 : 0;
                            $tipo = 2;
                            switch (substr($certData['subject']['serialNumber'],0,3)) {
                                case 'CPF':
                                    $tipo = 1;
                                    break;
                                
                                default:
                                    break;
                            }

                            $salida['succed'] = 0;
                            if (!$hbearer) {
                                $salida['ERROR'] = 'Credenciales de Usuario Inválidas';
                            }else{
                                if($isprueb != $puser){
                                    $salida['ERROR'] = 'Credenciales y Llave Criptofágica no son Consistentes';
                                }else{
                                    $salida['succed'] = 1;
                                    $salida['certificado']['razon'] = $certData['subject']['CN'];
                                    $salida['certificado']['cedula'] = substr($certData['subject']['serialNumber'],4);
                                    $salida['certificado']['tipo_cliente'] =  $tipo;
                                }
                            }
                    }else{
                        $salida['succed'] = 0;
                        $salida['ERROR'] = 'Llave o PIN no Válidos';    
                    }
                }
                echo json_encode($salida);
                break;
             case 12: //INTEGRACION XML GENERADO
                $salida = ['succed'=>1];
                if (!file_exists('C:/FACTURA_XML/'.$id.'.xml')) {
                    echo json_encode(['succed'=>0,'ERROR'=>'ARCHIVO NO VALIDO A']);
                }else{
                    $db = new DBClass();
                    $xml = file_get_contents('C:/FACTURA_XML/'.$id.'.xml');
                    $nombresuc = $db->ejecutar('select if(pfisico = "",nombre,pfisico) from sucursales where id = '.$_REQUEST['sucursal']);

                    $tid = $id;
                    $nid = substr($id, 0,1);
                    $cliente = '';
                    $cedula = '';
                    $rxml = $fe->XMLtoArray($xml);
                    $tp = 'Factura';
                    $intpdf = 1;
                    if(isset($rxml['FacturaElectronica']))
                     $tiqueta = 'FacturaElectronica';
                    else
                        $tiqueta = isset($rxml['NotaCreditoElectronica']) ?  'NotaCreditoElectronica' : 'NotaDebitoElectronica' ;

                    if (is_array($rxml[$tiqueta]['Receptor']['Nombre']))
                        if(!sizeof($rxml[$tiqueta]['Receptor']['Nombre']))
                            $rxml[$tiqueta]['Receptor']['Nombre'] = '';
                    $setiq = 'FacturaElectronica';

                    switch($nid){
                        case 'T':
                            unset($rxml[$tiqueta]['Receptor']);
                            $fe->tdoc = 'TiqueteElectronico';
                            $fe->xmldoc = 'tiqueteElectronico';
                            $id = '!'.substr($id, 1,strlen($id));
                            $tp = 'Tiquete';
                            $intpdf = 0;
                            break;
                        case 'F':
                            $cliente = $rxml[$tiqueta]['Receptor']['Nombre'];
                            $cedula  = $rxml[$tiqueta]['Receptor']['Identificacion']['Numero'];
                            $cedula = is_array($cedula) ? $cedula[0] : $cedula;
                            $id = substr($id, 1,strlen($id)); 
                            break;
                        case 'C':
                            if(isset($rxml[$tiqueta]['Receptor']['Identificacion']['Numero'])){
                                $cliente = $rxml[$tiqueta]['Receptor']['Nombre'];
                                $cedula  = $rxml[$tiqueta]['Receptor']['Identificacion']['Numero'];
                            }
                            $fe->tdoc = 'NotaCreditoElectronica';
                            $fe->xmldoc = 'notaCreditoElectronica';
                            $id = '-'.substr($id, 1,strlen($id));
                            $tp = 'Nota Crédito';
                            $intpdf = 1;
                            $setiq = 'NotaCreditoElectronica';
                            break;
                        case 'D':
                            if(isset($rxml[$tiqueta]['Receptor']['Identificacion']['Numero'])){
                                $cliente = $rxml[$tiqueta]['Receptor']['Nombre'];
                                $cedula  = $rxml[$tiqueta]['Receptor']['Identificacion']['Numero'];
                            }
                            $fe->tdoc = 'NotaDebitoElectronica';
                            $setiq = 'NotaDebitoElectronica';
                            $fe->xmldoc = 'notaDebitoElectronica';
                            $id = '-'.substr($id, 1,strlen($id));
                            $tp = 'Nora Débito';
                            $intpdf = 1;
                            break;
                    }

                    $repetir = isset($_REQUEST['view']) ? 1 : 0;
                    $intsuc = $db->ejecutar('call fe_integracion("'.$id.'",'.$_SESSION['IMPRESA'].',curdate(),'.$repetir.')');

                    $intsuc = $intsuc->fetch_all()[0];
                    $_REQUEST['sucname'] = $intsuc[11];
                    
                    $fe->info['FechaEmision'] = $rxml[$tiqueta]['FechaEmision'];
                    $fe->info['Emisor']['Identificacion']['Tipo'] = $rxml[$tiqueta]['Emisor']['Identificacion']['Tipo'];
                    $fe->info['Emisor']['Identificacion']['Numero'] = $rxml[$tiqueta]['Emisor']['Identificacion']['Numero'];
                    if(isset( $rxml[$tiqueta]['Receptor'] ) ){
                        $fe->info['Receptor']['Identificacion']['Tipo'] =  $rxml[$tiqueta]['Receptor']['Identificacion']['Tipo'];
                        $fe->info['Receptor']['Identificacion']['Numero'] =  $rxml[$tiqueta]['Receptor']['Identificacion']['Numero'];
                    }
                    $rxml[$tiqueta]['Clave'] = $intsuc[0];
                    $rxml[$tiqueta]['CodigoActividad'] = $intsuc[12];
                    $rxml[$tiqueta]['NumeroConsecutivo'] = substr($rxml[$tiqueta]['Clave'], 21,20);

                    $fe->info['NumeroConsecutivo'] = $rxml[$tiqueta]['NumeroConsecutivo'];
                    $fe->info['Clave'] = $rxml[$tiqueta]['Clave'];

                    $rxml[$tiqueta]['Emisor']['Nombre'] = $intsuc[1];
                    $rxml[$tiqueta]['Emisor']['Identificacion']['Tipo'] = $intsuc[2];
                    $rxml[$tiqueta]['Emisor']['Identificacion']['Numero'] = $intsuc[3];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Barrio'] = $intsuc[4];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Canton'] = $intsuc[6];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Distrito'] = $intsuc[5];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Provincia'] = $intsuc[7];

                    if ($intsuc[7] != '') {
                        $rxml[$tiqueta]['Emisor']['Telefono']['CodigoPais'] = $intsuc[8];
                        $rxml[$tiqueta]['Emisor']['Telefono']['NumTelefono'] = $intsuc[9];
                    }else{
                        unset($rxml[$tiqueta]['Emisor']['Telefono']);
                    }

                    $rxml[$tiqueta]['Emisor']['CorreoElectronico'] = $intsuc[10];

                    
                    $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
                    <'.$fe->tdoc.' xmlns="'.$this->linkVersion.$fe->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="'.$this->linkVersion.$fe->xmldoc.' '.$this->linkVersion.$fe->xmldoc.'" />');
                    $fe->array_to_xml($rxml,$xml_data);

                    $xml = $xml_data->asXML();
                    $xml = str_replace('<'.$setiq.'>', '', $xml);
                    $xml = str_replace('</'.$setiq.'></'.$setiq.'>', '</'.$fe->tdoc.'>', $xml);
                    $xml = str_replace('</'.$setiq.'>', '</'.$fe->tdoc.'>', $xml);
                    $xml = str_replace('</'.$fe->tdoc.'></'.$fe->tdoc.'>', '</'.$fe->tdoc.'>', $xml);

                    $delimiter = '#';
                    $startTag = 'LineaDetalle_';
                    $endTag = '_>';
                    $regex = $delimiter . preg_quote($startTag, $delimiter) 
                                        . '(.*?)' 
                                        . preg_quote($endTag, $delimiter) 
                                        . $delimiter 
                                        . 's';
                    $salida['regex'] = $regex;
                    $xml = preg_replace($regex,'LineaDetalle>',$xml);

                    $fe->firmarXML($xml);
                    file_put_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml', $xml);
                    unlink('C:/FACTURA_XML/'.$tid.'.xml');

                    if (isset($_REQUEST['view'])) {
                        header("Content-type: text/xml; encoding='UTF-8'");
                        print_r($xml);
                    }else{
                        $texo = isset($rxml[$tiqueta]['ResumenFactura']['TotalExonerado']) ? $rxml[$tiqueta]['ResumenFactura']['TotalExonerado'] : 0;
                        $salida["Base"] = $db->ejecutar('insert into integraciones values(null,"'.$rxml[$tiqueta]['Clave'].'","../assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml","'.$tid.'",2,'.$_REQUEST['sucursal'].',"'.$cliente.'","'.$cedula.'",'.$rxml[$tiqueta]['ResumenFactura']['TotalComprobante'].',now(),'.$rxml[$tiqueta]['ResumenFactura']['TotalImpuesto'].','.$rxml[$tiqueta]['ResumenFactura']['TotalDescuentos'].','.$rxml[$tiqueta]['ResumenFactura']['TotalGravado'].','.$texo.',"'.$rxml[$tiqueta]['ResumenFactura']['CodigoTipoMoneda']['CodigoMoneda'].'",'.$rxml[$tiqueta]['ResumenFactura']['TotalExento'].')')    ;
                        
                        $salida["Integracion"] = $fe->integracion($xml,$db,$_REQUEST['sucursal']);
                        $salida['cliente'] = $cliente;
                        if ($cliente) {
                            $cbody = $db->ejecutar("select concat('<b>Factura Electrónica No ',".$fe->info['NumeroConsecutivo'].",'</b>','<br><br>Emisor: ',b.nombre,', ced.',b.cedula,'<br>Receptor: ',a.cliente,', ced.',a.cedula,'<br><br> <a href=\"https://fe.logintechcr.com/wsdlClient.php?ref=',hex(aes_encrypt(concat(".$fe->info['Clave'].",',',b.isPrueba,',',b.user_atv,',',b.pass_atv),'salvenawilly')),'\">Verificar Mensaje Hacienda</a>') from integraciones a join sucursales b on a.idsucursal = b.id where a.factura = '".$tid."'")->fetch_all()[0][0];

                            if($intpdf){
                                $salida["PDF"] = $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                                $salida["Mail"] = $fe->enviarCorreo($rxml[$tiqueta]['Receptor']['CorreoElectronico'],$tp." No ".$fe->info['NumeroConsecutivo'],$cbody,[0=>'xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml',1=>'pdf/'.$tp.' No'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf'],$fe->info['Clave'],$db);
                            }
                            unlink('./assets/pdf/'.$tp.' No'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf');
                        }
                        
                        print_r($salida);
                    }
                    
                }
                
                break;
            case 13: //REFRESCAR TOKEN
                if (isset($_SESSION['IMPRESA'])){
                    ob_end_clean();
                    ignore_user_abort();
                    ob_start();
                    header("Connection: close");
                    header("Content-Encoding: none");
                    echo json_encode(['rs'=>'Token ACT']);
                    header("Content-Length: " . ob_get_length());
                    ob_end_flush();
                    flush();
                    echo $fe->refresh();
                }
                else
                    echo "NO HAY LOG IN";
                break;
            case 14: //PDF INTEGRACION
                $db = new DBClass();
                $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$_REQUEST['cons'].'.xml');
                $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                break;
            case 15: //Reenviar XML Integracion
                $db = new DBClass();
                if(isset($_REQUEST['new'])){
                    $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$_REQUEST['cons'].'.xml');

                    $rxml = $fe->XMLtoArray($xml);
                    $fe->tdoc = key($rxml);
                    $fe->xmldoc = strtolower( substr($fe->tdoc,0,1) ).substr($fe->tdoc, 1); 
                    $rxml = isset($rxml[$fe->tdoc][$fe->tdoc]) ? $rxml[$fe->tdoc][$fe->tdoc] : $rxml[$fe->tdoc]['FacturaElectronica'];
                    /*hacer estylo if largo*/
                    
                    switch(trim($fe->tdoc)){
                        case 'FacturaElectronica':
                            $id =  1;
                            break; 
                        case 'TiqueteElectronico': 
                            $id =  '!1';
                            break;
                        case 'NotaCreditoElectronica': 
                            $id =  '-1';
                            break;
                        default:
                            $id = '^1';
                            break;
                        }
                    /*$intsuc = $db->ejecutar('call fe_integracion("'.$id.'",'.$_SESSION['IMPRESA'].',curdate(),0)')->fetch_all()[0];
                    $rxml['Clave'] = $intsuc[0];
                    $rxml['NumeroConsecutivo'] = substr($rxml['Clave'], 21,20);

                    $fe->info['FechaEmision'] = $rxml['FechaEmision'];
                    $fe->info['Emisor']['Identificacion']['Tipo'] = $rxml['Emisor']['Identificacion']['Tipo'];
                    $fe->info['Emisor']['Identificacion']['Numero'] = $rxml['Emisor']['Identificacion']['Numero'];
                    $fe->info['NumeroConsecutivo'] = $rxml['NumeroConsecutivo'];
                    $fe->info['Clave'] = $rxml['Clave'];

                    if(isset($rxml['Receptor'])){
                        $fe->info['Receptor']['Identificacion']['Tipo'] = $rxml['Receptor']['Identificacion']['Tipo'];
                        $fe->info['Receptor']['Identificacion']['Numero'] = $rxml['Receptor']['Identificacion']['Numero'];
                    }*/

                    $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
                    <'.$fe->tdoc.' xmlns="'.$this->linkVersion.$fe->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="'.$this->linkVersion.$fe->xmldoc.' '.$this->linkVersion.$fe->xmldoc.'" />');
                    $fe->array_to_xml($rxml,$xml_data);
                    $xml = $xml_data->asXML();
                    $delimiter = '#';
                    $startTag = 'LineaDetalle_';
                    $endTag = '_>';
                    $regex = $delimiter . preg_quote($startTag, $delimiter) 
                                        . '(.*?)' 
                                        . preg_quote($endTag, $delimiter) 
                                        . $delimiter 
                                        . 's';
                    $xml = preg_replace($regex,'LineaDetalle>',$xml);
                    $fe->firmarXML($xml);
                    //file_put_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$rxml['NumeroConsecutivo'].'.xml', $xml);
                }else{
                    $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$_REQUEST['cons'].'.xml');
                }

                /*$salida["Integracion"] = $fe->integracion($xml,$db,0);
                print_r($salida);*/

                // header("Content-type: text/xml; encoding='UTF-8'");
                        print_r($xml);

                break;
            case 16: //OBTENER RESPUESTA HACIENDA Y GUARDAR EN ARCHIVO
                $salida = [];
                $xml = $fe->estado();
                if ($xml) {
                    $salida['succed'] = 1;
                    $salida['arhivo'] = "../assets/xml/RH_".$fe->info['NumeroConsecutivo']." ".$_REQUEST['sucname'].".xml";
                    $salida['mfile'] = file_put_contents("../assets/xml/RH_".$fe->info['NumeroConsecutivo']." ".$_REQUEST['sucname'].".xml", $xml['xml']);
                }else
                    $salida['succed'] = 0;
                echo json_encode($salida);
                break;
            case 17: //reenvio al cliente integracion
                ob_end_clean();
                ignore_user_abort();
                ob_start();
                header("Connection: close");
                header("Content-Encoding: none");
                echo json_encode(['success'=>1]);
                header("Content-Length: " . ob_get_length());
                ob_end_flush();
                flush();
                $db = new DBClass();
                $fact = $db->ejecutar('select substring(clave,22,20) from integraciones where substring(clave,30,2)*1 in(1,3) and factura = "'.$_REQUEST['cons'].'"')->fetch_all()[0][0];
                $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$fact.'.xml');
                $axml =  $fe->XMLtoArray($xml);
                $llave = key($axml);
                $fe->info['NumeroConsecutivo'] = $axml[$llave]['NumeroConsecutivo'];
                $fe->info['Clave'] = $axml[$llave]['Clave'];
                if($llave == 'FacturaElectronica'){
                    $tp = 'Factura';
                }

                 $cbody = $db->ejecutar("select concat('<b>Factura Electrónica No ',".$fe->info['NumeroConsecutivo'].",'</b>','<br><br>Emisor: ',b.nombre,', ced.',b.cedula,'<br>Receptor: ',a.cliente,', ced.',a.cedula,'<br><br> <a href=\"https://fe.logintechcr.com/wsdlClient.php?ref=',hex(aes_encrypt(concat(".$fe->info['Clave'].",',',b.isPrueba,',',b.user_atv,',',b.pass_atv),'salvenawilly')),'\">Verificar Mensaje Hacienda</a>'),b.pfisico from integraciones a join sucursales b on a.idsucursal = b.id where a.clave = '".$axml[$llave]['Clave']."'")->fetch_all()[0];
                $_REQUEST['sucname'] = $cbody[1];
                $para = isset($_REQUEST['crr']) ? $_REQUEST['crr'] : $axml[$llave]['Receptor']['CorreoElectronico'];
                $salida["PDF"] = $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                $salida["Mail"] = $fe->enviarCorreo($para,$llave." No ".$fe->info['NumeroConsecutivo'],$cbody[0],[0=>'xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml',1=>'pdf/'.$tp.' No'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf'],$fe->info['Clave'],$db);

                print_r($salida);

                break;
            default:
                break;
        }
    }else{

        if (isset($_POST['doc'])){
            $_POST['data'] = str_replace('<!--?xml version="1.0" encoding="UTF-8"?-->', '<?xml version="1.0" encoding="utf-8" standalone="no"?>', $_POST['data']);
            $_POST['data'] = str_replace('clave>', 'Clave>', $_POST['data']);
            $_POST['data'] = str_replace('nombreemisor>', 'NombreEmisor>', $_POST['data']);
            $_POST['data'] = str_replace('tipoidentificacionemisor>', 'TipoTdentificacionEmisor>', $_POST['data']);
            $_POST['data'] = str_replace('numerocedulaemisor>', 'NumeroCedulaEmisor>', $_POST['data']);
            $_POST['data'] = str_replace('nombrereceptor>', 'NombreReceptor>', $_POST['data']);
            $_POST['data'] = str_replace('tipoidentificacionreceptor>', 'TipoIdentificacionReceptor>', $_POST['data']);
            $_POST['data'] = str_replace('numerocedulareceptor>', 'NumeroCedulaReceptor>', $_POST['data']);
            $_POST['data'] = str_replace('mensaje>', 'Mensaje>', $_POST['data']);
            $_POST['data'] = str_replace('detalleMensaje>', 'DetalleMensaje>', $_POST['data']);
            $_POST['data'] = str_replace('montototalimpuesto>', 'MontoTotalImpuesto>', $_POST['data']);
            $_POST['data'] = str_replace('totalfactura>', 'TotalFactura>', $_POST['data']); 

            file_put_contents('./assets/xml/'.$_POST['doc'].'.xml', $_POST['data']);
        }
        if (isset($_REQUEST['rfile'])) {
            header("Content-type: application/octet-stream; name='excel';charset=UTF-8");
            header("Content-Disposition: filename=HACIENDA_".$_REQUEST['rfile'].".xml");
            header("Pragma: no-cache");
            header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
            echo "\xEF\xBB\xBF";
            echo file_get_contents('./assets/xml/'.$_REQUEST['rfile'].".xml");
        }
        if (isset($_POST['dfile'])) {
            unlink('./assets/xml/'.$_POST['dfile'].".xml");
        }
        if (isset($_REQUEST['ref'])){
            $fe = new facturaElectronica('');
            $det = $fe->getStatus($_REQUEST['ref']);
            ?>
    <!DOCTYPE html>
    <html>
    <head>
        <title>Mensaje Hacienda</title>
        <link rel="icon" type="image/png" href="assets/img/favicon.ico">
        <link rel="stylesheet" type="text/css" href="assets/css/materialize.min.css?v=10.4.1.0">
        <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.4.1.0">
        <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.4.1.0">
        <link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css?v=10.4.1.0">
        <link rel="stylesheet" type="text/css" href="../assets/css/materialdesignicons.min.css?v=10.4.1.0">
        <link rel="stylesheet" type="text/css" href="assets/css/system.min.css?v=10.4.1.0">
    </head>
    <body>
        
        <div class="container">
            <div class="row">
                <div class="col s4">
                    <a href="https://logintechcr.com" target="_new" style="cursor: pointer;" class="tooltipped" data-tooltip="LogintechCR" data-position="buttom"><img src="assets/img/login/logo_azulG.png" width="100px" height="100px"></a>
                </div>

                <div class="col s8">
                    <h2>Documentos Electrónicos</h2>
                    <b>Tipo: </b><?php switch(substr($det[0], 29,2)){case '01': echo 'Factura Electrónica';break;case '02': echo 'Nota de débito electrónica'; break;case '03': echo 'Nota de crédito electrónica';break;case '05': echo 'Confirmación de aceptación del comprobante electrónico';break;case '06': echo 'Confirmación de aceptación parcial del comprobante electrónico';break;case '07': echo 'Confirmación de rechazo del comprobante electrónico';break;}?> <br>
                    <b>Clave: </b> <span id="doc"><?php echo $det[0]; ?></span> <br>
                    <b>Consecutivo: </b> <?php echo substr($det[0], 21,20); ?> <br>
                    <b>Estado: </b> <?php echo strtoupper($det[4]['estado']); ?> <br>
                    <?php if(isset($det[4]['rs'])){ ?><b>Mensaje: </b> <?php echo $det[4]['rs']; ?> <br> <?php } ?>
                    <div id="dxml" style="display: none"><?php echo     $det[4]['xml']; ?></div>
                    <a href="#" class="btn bxml">Descargar Documento XML</a>
                </div>
            </div>
            
        </div>

        <div class="center" style="bottom: 15%;left:auto;">Documento Electrónico Emitido por Logintech <br> <a href="mailto:info@logintechcr.com">Contáctenos, Será un placer brindar nuestros servicios</a>, +(506) 6105-6852</div>

        <script src="assets/js/jquery.js?v=10.4.1.0"></script>
        <script src="assets/js/jquery.mask.min.js?v=10.4.1.0"></script>
        <script src="assets/js/materialize.min.js?v=10.4.1.0"></script>
        <script src="assets/libs/charts/chart.js?v=10.4.1.0"></script>
        <script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.4.1.0"></script>
        <script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.4.1.0"></script>
        <script type="text/javascript">
            $(function(){
                $('.tooltipped').tooltip({delay: 50});
                $(".bxml").click(function(e){
                    e.preventDefault();
                    $.post('wsdlClient.php',{doc:$("#doc").html(),data:$("#dxml").html()})
                        .done(function(data){
                            window.location = "wsdlClient.php?rfile="+$("#doc").html();
                        });
                    
                    /*setTimeout(function(){$.post('wsdlClient.php',{dfile:$("#doc").html()});},3000);*/
                });
            });
        </script>
    </body>
    </html>
<?php
        }
    }

    class facturaElectronica
    {
        var $pagina = 'api.comprobanteselectronicos.go.cr';
        var $info;
        var $id;
        var $bearer;
        var $credenciales;
        var $preUbicacion = '';
        var $tdoc = 'FacturaElectronica';
        var $xmldoc = 'facturaElectronica';
        var $ref = 0;
        var $opcion = 0;
        var $sumaimpuestos = 0;
        var $sumadescuentos = 0;
        var $sumaexonerados = 0;
        var $sumagravados = 0;
        var $idtabla = 64;
        var $titulo = 'Factura';

        function __construct($vid){
            $this->id = $vid;
            $this->info = $this->getJSON('call fe_getencabezado("'.$this->id.'")');
            $this->opcion = isset($this->info['NumeroConsecutivo']) ? substr($this->info['NumeroConsecutivo'],9,1) : 0;
            if ($vid != "0") {
                switch ($this->opcion) {
                case 2: //NOTA DE DEBITO
                    $this->tdoc = 'NotaDebitoElectronica';
                    $this->xmldoc = 'notaDebitoElectronica';
                    $this->ref = 1;
                    $this->idtabla = 301;
                    $this->titulo = 'Nota Debito';
                    break;
                case 3: //NOTA DE CREDITO
                    $this->tdoc = 'NotaCreditoElectronica';
                    $this->xmldoc = 'notaCreditoElectronica';
                    $this->ref = 1;
                    $this->idtabla = 301;
                    $this->titulo = 'Nota Credito';
                    break;
                case 4: //TIQUETE ELECTRONICO
                    $this->tdoc = 'TiqueteElectronico';
                    $this->xmldoc = 'tiqueteElectronico';
                    break;
                case 5: //APROBACION
                case 6: //APROBACION PARCIAL
                case 7: //RECHAZAR
                    $this->tdoc = 'MensajeReceptor';
                    $this->xmldoc = 'mensajeReceptor';
                    $this->titulo = 'Aceptacion';
                    break;
                case 8: //COMPRA ELECTTRONICA
                    $this->tdoc = 'FacturaElectronicaCompra';
                    $this->xmldoc = 'facturaElectronicaCompra';
                    $this->titulo = 'Compra';
                    break;
                case 9: //EXPORTACION ELECTTRONICA
                    $this->tdoc = 'FacturaElectronicaExportacion';
                    $this->xmldoc = 'facturaElectronicaExportacion';
                    $this->titulo = 'Exportacion';
                    break;
                default: //FACTRA ELECTRONICA
                    break;
                }
            }

            if(isset($_REQUEST['accion']))
                if ($_REQUEST['accion'] == 12 || $_REQUEST['accion'] == 14) 
                    $_SESSION['IMPRESA'] = $_REQUEST['sucursal'];

            if ($vid != '') {
                if (!isset($_SESSION['IMPRESA']))
                    session_start();
                if (!isset($_REQUEST['accion']))
                    $this->preUbicacion = '../';
                
                session_write_close();
                $db = new DBClass();
                $this->credenciales = $db->ejecutar('call fe_getCredentials('.$_SESSION['IMPRESA'].')')->fetch_all()[0];
                $this->getByVersion();
            }
            
        }

        function getByVersion(){
            $this->linkVersion = 'https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.4/';
            $this->tribunet    = 'https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.4/'.$this->xmldoc;
        }

        function getBearer(){

            set_error_handler("warning_handler", E_WARNING);
            $fP = fSockOpen("ssl://google.com", 443, $errno, $errstr, 10);
            if (!$fP) { return json_encode(["rs"=>'Sin Internet',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]); }

            $fP = fSockOpen("ssl://".$this->pagina, 443, $errno, $errstr, 10);
            if (!$fP) { return json_encode(["rs"=>'Problemas con el Servidor de Hacienda',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]); }
            restore_error_handler();

            if ($this->credenciales[6]) {
               $this->bearer = $this->credenciales[6];
               $salida = $this->credenciales;
            }else{
            $user = $this->credenciales[4];
            $pass = $this->credenciales[5];
            $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut/protocol/openid-connect/token";
            $cli_id = "api-prod";
            
            if ($this->credenciales[2] == 1) {
                $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut-stag/protocol/openid-connect/token";
                $cli_id = "api-stag";
            }

            $curl = curl_init($curl_hacienda);
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_POST, true);
            //curl_setopt($curl, CURLOPT_SSLVERSION, 6);
            curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

            $params = array(
              "client_id" => $cli_id,
              "client_secret" => " ",
              /*"scope" => "",*/
              "username" => $user,//$this->credenciales[1],
              "password" => $pass,//$this->credenciales[2],
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

            $salida['consulta'] = $params;
            $salida['respuesta'] = json_decode($json_response);
            if ($salida['respuesta'] == '') {
                return json_encode(["rs"=>'No se Recibe Respuesta de Hacienda',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]);
            }
            $salida['credenciales'] = $this->credenciales;
            $json_response = json_decode($json_response);

            if (isset($_REQUEST['ref'])){
                $this->bearer = $json_response->access_token;
            }

            if (isset($json_response->access_token) && !isset($_REQUEST['ref'])) {
                $this->bearer = $json_response->access_token;
                $db = new DBClass();
                $db->ejecutar('update sucursales set acces_tkn = "'.$this->bearer.'",rfh_tkn = "'.$json_response->refresh_token.'",tkn_time = now() where id = '.$_SESSION['IMPRESA']);
            }
            }

            return $salida;
        
        }

        function refresh(){
            $salida = [];
            set_error_handler("warning_handler", E_WARNING);
            $fP = fSockOpen("ssl://google.com", 443, $errno, $errstr, 10);
            if (!$fP) { return "Sin Internet"; }

            $fP = fSockOpen("ssl://".$this->pagina, 443, $errno, $errstr, 10);
            if (!$fP) { return "Problemas con el Servidor de Hacienda"; }
            restore_error_handler();

            $curl_hacienda = "https://idp.comprobanteselectronicos.go.cr/auth/realms/rut/protocol/openid-connect/token";
            $cli_id = "api-prod";

            if ($this->credenciales[2] == 1) {
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
              "refresh_token" => $this->credenciales[7],
              "grant_type" => "refresh_token");

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
            $salida['consulta'] = $params;
            $salida['respuesta'] = json_decode($json_response);
            if ($salida['respuesta'] == '') {
                return 'No se Recibe Respuesta de Hacienda';
            }
            $salida['credenciales'] = $this->credenciales;
            $json_response = json_decode($json_response);
            
            if (isset($json_response->access_token)) {
                $this->bearer = $json_response->access_token;
                $db = new DBClass();
                $db->ejecutar('update sucursales set acces_tkn = "'.$this->bearer.'",rfh_tkn = "'.$json_response->refresh_token.'",tkn_time = now() where id = '.$_SESSION['IMPRESA']);
            }else
                $salida = $json_response;
            

            return json_encode($salida);
        }

        function getRecibos($id,$offset,$limit,$vreceptor){
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return $doBearer;

            if ($this->bearer == '') {
                $salida['factura']  = $this->id;
                $salida['estado']   = 'Problemas con la Llave Criptográfica';
                $salida['bearer']   = $this->bearer;
                return $salida;
            }

            $emisor = $this->getEmisor();
            $receptor = strlen($vreceptor) == 14 ? '&receptor='.$vreceptor : '';

            if ($this->credenciales[2] == 1) {
                if ($id == 0) 
                    $curl = curl_init("https://api-sandbox.comprobanteselectronicos.go.cr/recepcion/v1/comprobantes/?emisor=".$emisor."&offset=".$offset."&limit=".$limit.$receptor);
                else
                    $curl = curl_init("https://api-sandbox.comprobanteselectronicos.go.cr/recepcion/v1/comprobantes/".$this->info['Clave']);
            }else{
                if ($id == 0) 
                    $curl = curl_init("https://".$this->pagina."/recepcion/v1/comprobantes/?emisor=".$emisor."&offset=".$offset."&limit=".$limit.$receptor);
                else
                    $curl = curl_init("https://".$this->pagina."/recepcion/v1/comprobantes/".$this->info['Clave']);
            }
            
            
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$this->bearer]);

            $json_response = curl_exec($curl);
            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            $header = substr($json_response, 0, curl_getinfo($curl, CURLINFO_HEADER_SIZE));
            $body = substr($json_response, strlen($header));

            $aHeader = array();

            foreach (explode("\r\n", $header) as $i => $line){
                if ($i === 0)
                    $aHeader['http_code'] = $line;
                else
                {
                    //list ($key, $value) = explode(': ', $line);
                    $sub = explode(': ', $line);
                    if($sub[0] != '')
                        $aHeader[$sub[0]] = $sub[1];
                }
            }

            switch ($status) {
                case 400:
                    $salida['factura']  = $this->id;
                    $salida['rs'] = $aHeader['X-Error-Cause'];
                    $salida['estado']   = 'Sin Subir';
                    break;
                case 200:
                case 201:
                case 202:
                case 206:
                    $salida = [];
                    foreach (json_decode($body) as $index => $key) {
                        $salida[$index] = [];
                        $salida[$index]['numfact'] = substr($key->clave,21,20);
                        $fecha = strtotime(substr(str_replace('T', ' ',$key->fecha),0,-6));
                        $fecha = date('d/m/Y H:i:s',$fecha);
                        $salida[$index]['fecha'] = $fecha;
                        $salida[$index]['receptor'] = isset($key->receptor->nombre) ? $key->receptor->nombre : '';
                        $salida[$index]['cedula'] = isset($key->receptor->numeroIdentificacion) ? $key->receptor->numeroIdentificacion : '';
                    }
                    break;       
                default:
                    $salida = $json_response;
                    break;
            }

            curl_close($curl);
            return $salida;
        }

        function integracion($xml,&$db,$suc){
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return json_encode(['factura'=>$this->id,'succed'=>0,'rs'=>$doBearer,'erno'=>1]);
            
            if ($this->bearer == '') 
                return 'Problemas con la Llave Criptográfica';

            if ($this->credenciales[2] == 1) 
                $curl = curl_init("https://api-sandbox.comprobanteselectronicos.go.cr/recepcion/v1/recepcion");
            else
                $curl = curl_init("https://".$this->pagina."/recepcion/v1/recepcion");
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$this->bearer]);

            $params = json_encode($this->getPayload($xml));

            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

            $rs = curl_exec($curl);
            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            switch ($status) {
                case 201:
                case 202:
                    $json_response = json_encode(['rs'=>'Documento Electronico Aprobado','clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo'],'succes'=>1]);
                    if($suc == 5){
                        procesarPDF($xml,$db,$suc);
                    }
                    break;
                case 400:
                    print_r($rs);
                    $rs = substr($rs, strpos($rs, 'X-Error-Cause')+14);
                    $rs = substr($rs, 0, strpos($rs,'X-')-3);
                    $json_response = json_encode(['rs'=>'Error Factura Electronica: '.$this->id.', '.$rs,'succes'=>0,'erno'=>2]);
                    break;
                default:
                    $json_response = $rs;
                    break;
            }

            curl_close($curl);
            return $json_response;
        }

        function recepcion()
        {
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return ['factura'=>$this->id,'succed'=>0,'rs'=>$doBearer,'erno'=>1];
            
            if ($this->bearer == '') 
                return ['factura'=>$this->id,'succed'=>0,'rs'=>'Problemas con la Llave Criptográfica','erno'=>1];

            if (!isset($this->info['Clave']))
                return ['factura'=>$this->id,'succed'=>0,'rs'=>"Factura no Existente - Clave no Valida",'erno'=>1];

            $xml = $this->getXMLRecepcion();
            if (is_array($xml)) {
                return 'Problemas Generando la Factura: '.$xml['error'].', no se Envió Hacienda';
            }

            if ($this->credenciales[2] == 1) 
                $curl = curl_init("https://api-sandbox.comprobanteselectronicos.go.cr/recepcion/v1/recepcion");
            else
                $curl = curl_init("https://".$this->pagina."/recepcion/v1/recepcion");
            
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, true);
            //curl_setopt($curl, CURLOPT_TIMEOUT,2);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$this->bearer]);

            $params = json_encode($this->getPayload($xml));

            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

            $rs = curl_exec($curl);
            
            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

            $db = new DBClass();
            switch ($status) {
                case 0:
                    $json_response = ["rs"=>'Superó Tiempo de Espera',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']];
                    break;
                case 201:
                case 202:
                case 100:
                    $json_response = ['rs'=>'Documento Electronico Aprobado','clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo'],'succes'=>1];
                    $midfila =  is_numeric(substr($this->id, 0,1)) ? $this->id : substr($this->id,1);
                    $act = $db->ejecutar('call shadow(2,'.$this->idtabla.',"feestado = 2","id = \"'.$midfila.'\"")');
                    break;
                case 400:
                    $rs = substr($rs, strpos($rs, 'X-Error-Cause')+14);
                    $rs = substr($rs, 0, strpos($rs,'X-')-3);

                    if(strpos($rs, 'recibido anteriormente') >= 0){
                        $db = new DBClass();
                        $midfila =  is_numeric(substr($this->id, 0,1)) ? $this->id : substr($this->id,1);
                        $act = $db->ejecutar('call shadow(2,'.$this->idtabla.',"feestado = 2","id = \"'.$midfila.'\"")');
                    }

                    $json_response = ['rs'=>'Error '.$this->tdoc.': '.$this->id.', '.$rs,'succes'=>0,'erno'=>2,'id'=>$this->id,'actualizacion' => $act,'sql'=>'call shadow(2,'.$this->idtabla.',"feestado = 2","id = \"'.$midfila.'\")'];
                    break;
                case 500:
                    $json_response = ["rs"=>'Error Interno en el Servidor de Hacienda',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']];
                    break; 
                default:
                    $json_response = $rs;
                    break;
            }

            curl_close($curl);
            return $json_response;
        }

        function loadXML_FILE($_xml,&$salida,&$db,$cedula)
        {       
            //$_xml = utf8_encode($_xml);
            $_xml = preg_replace ('/[^\x{0009}\x{000a}\x{000d}\x{0020}-\x{D7FF}\x{E000}-\x{FFFD}]+/u', '', $_xml);

            $inv_xml = simplexml_load_string($_xml);

            if(!$inv_xml){
                $salida = ['succed' => 0,'ERROR'=>'Archivo no es Xml Válido'];
                return false;
            }
                
            $tipofe = $inv_xml->getName();
            
            $ispruebas = 0;
            if(strpos($_xml, 'SANDBOX') > -1)
                $ispruebas = 1;

            $ns = $inv_xml->getNamespaces(true);
            $inv_xml->registerXPathNamespace('fe', $ns['']);

            if(!isset($inv_xml->xpath('//fe:Clave')[0])){
                $salida = ['succed' => 0,'ERROR'=>'XML no Electónico'];
                return false;
            }

            if( strlen($inv_xml->xpath('//fe:Clave')[0]) != 50){
                $salida = ['succed' => 0,'ERROR'=>'XML no Electónico'];
                return false;
            }

            switch ($tipofe) {
                case 'MensajeHacienda':
                    $salida =  $this->cargarRecepcion($inv_xml,$ispruebas,$db);
                    break;
                default:
                    if(strpos($_xml, 'xml-schemas/v4.3/'))
                        $version = '4.3';
                    else if(strpos($_xml, 'xml-schemas/v4.4/')){
                        $version = '4.4';
                    }
                    $salida = $this->cargarFacturaElectronica($inv_xml,$ispruebas,$db,$ns,$version,$cedula);
                    break;
            }

        }

        function cargarRecepcion($xml,$ispruebas,$db){
            $salida = ['succed' => 1];

            if(strpos($this->_getValue($xml,'DetalleMensaje'), 'ambiente de prueba') > -1)
                $ispruebas = 1;

            $salida['clave'] = $this->_getValue($xml,'Clave','');

            $idprov = $db->ejecutar('call sp_rmantclientes("'.$this->_getValue($xml,'NombreEmisor').'","'.$this->_getValue($xml,'NumeroCedulaEmisor').'","","",'.$this->_getValue($xml,'TipoIdentificacionEmisor').',0,0,0,0,0)');
            if(isset($idprov->num_rows)) 
                $idprov = $idprov->fetch_all()[0][0];
            else
                return ['succed' => 0,'ERROR' => $idprov,'mod'=>'PROVEEDOR R'];
            
            $sub = $this->_getValue($xml,'TotalFactura')-$this->_getValue($xml,'MontoTotalImpuesto');
            $msj = $this->_getValue($xml,'DetalleMensaje');
            if($this->_getValue($xml,'Mensaje') == '3'){ //RECHAZADO POR HACIENDA
                $matches = [];
                $pattern = '/' . preg_quote('[', '/') . '(.*?)' . preg_quote(']', '/') . '/s';
                preg_match_all($pattern, $msj, $matches);
                $rmatch = [];
                $pattern = '/' . preg_quote('""', '/') . '(.*?)' . preg_quote('""', '/') . '/s';
                preg_match_all($pattern, $matches[1][0], $rmatch);
                $msj = implode($rmatch[1],'->');
            }
            
            $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,1,1,'.$idprov.',1,"'.$this->_getValue($xml,'Mensaje').'",'.$this->_getValue($xml,'MontoTotalImpuesto').','.$sub.',0,0,0,0,0,"'.addslashes($msj).'","'.$salida['clave'].'",1,1,0,"",0,"","",now(),1,"","'.$this->_getValue($xml,'Mensaje').'","'.$this->_getValue($xml,'NumeroCedulaReceptor').'",'.$ispruebas.',"")');
            
            if(isset($idfact->num_rows)){
                $idfact = $idfact->fetch_all()[0][0];
                $salida['ifactura'] = $idfact;

                if ($idfact)
                    $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"Mensaje de Hacienda","",1,'.$sub.',0,'.$this->_getValue($xml,'MontoTotalImpuesto').',1,0,0,0,0,"",0)');

            }else
                return ['succed' => 0,'ERROR' => $idfact,'mod'=>'FACTURA R'];

            return $salida;
        }

        function cargarFacturaElectronica($xml,$ispruebas,$db,$ns,$version,$cedula){
            $salida = ['succed' => 1];

            $emisor = $xml->xpath('//fe:Emisor/fe:Identificacion/fe:Numero');

            if(empty($emisor))
                return ['succed' => 0,'ERROR' => 'Emisor Requerido'];

            $salida['clave']    = $this->_getValue($xml,'Clave','');

            $prov = [];
            $prov['cedula']     = $this->_getValue($xml,'Emisor/fe:Identificacion/fe:Numero');
            $prov['nombre']     = $this->_getValue($xml,'Emisor/fe:Nombre','');
            $prov['tipo']       = $this->_getValue($xml,'Emisor/fe:Identificacion/fe:Tipo');

            $ubicacion          = $this->_getValue($xml,'Emisor/fe:Ubicacion');

            $prov['barrio']     = $this->_getValue($xml,'Emisor/fe:Ubicacion/fe:Barrio',0);
            $prov['distrito']   = $this->_getValue($xml,'Emisor/fe:Ubicacion/fe:Distrito',0);
            $prov['canton']     = $this->_getValue($xml,'Emisor/fe:Ubicacion/fe:Canton',0);
            $prov['provincia']  = $this->_getValue($xml,'Emisor/fe:Ubicacion/fe:Provincia',0);
            $prov['otrassenas'] = $this->_getValue($xml,'Emisor/fe:Ubicacion/fe:OtrasSenas');

            $prov['correo']     = $this->_getValue($xml,'Emisor/fe:CorreoElectronico');
            $prov['telefono']   = $this->_getValue($xml,'Emisor/fe:Telefono/fe:NumTelefono');
            $prov['pais']       = $this->_getValue($xml,'Emisor/fe:Telefono/fe:CodigoPais','52');

            $prov['barrio']     = is_numeric($prov['barrio']) ? $prov['barrio'] : 0;

            $prov['id']         = $db->ejecutar('call sp_rmantclientes("'.$prov['nombre'].'","'.$prov['cedula'].'","'.$prov['correo'].'","'.$prov['telefono'].'",'.$prov['tipo'].','.$prov['barrio'].','.$prov['distrito'].','.$prov['canton'].','.$prov['provincia'].','.$prov['pais'].')');
            if(isset($prov['id']->num_rows)) 
                $prov['id'] = $prov['id']->fetch_all()[0][0];
            else
                return ['succed' => 0,'ERROR' => $prov['id'],'mod'=>'PROVEEDOR'];

            $fact = [];
            $fact['fecha']          = date('Y-m-d H:i:s',strtotime($this->_getValue($xml,'FechaEmision')));
            $fact['codActividad']   = $this->_getValue($xml,'CodigoActividadReceptor');
            $fact['tipoventa']      = $this->_getValue($xml,'CondicionVenta',0);
            $fact['plazo']          = $this->_getValue($xml,'PlazoCredito',0);
            preg_match_all('!\d+!', $fact['plazo'], $matches);
            $fact['plazo']          = isset($matches[0][0]) ? $matches[0][0] : 0;
            //if(sizeof($xml->ResumenFactura->MedioPago))

            $fact['tipopago']       = 1;
            $fact['moneda']         = $this->_getValue($xml,'ResumenFactura/fe:CodigoTipoMoneda/fe:CodigoMoneda');
            $fact['divisa']         = $this->_getValue($xml,'ResumenFactura/fe:CodigoTipoMoneda/fe:TipoCambio');
            $fact['subtotal']       = $this->_getValue($xml,'ResumenFactura/fe:TotalGravado',0);
            $fact['exento']         = $this->_getValue($xml,'ResumenFactura/fe:TotalExento',0);
            $fact['nosujeto']       = $this->_getValue($xml,'ResumenFactura/fe:TotalNoSujeto',0);
            $fact['exonerado']      = $this->_getValue($xml,'ResumenFactura/fe:TotalExonerado',0);
            $fact['descuento']      = $this->_getValue($xml,'ResumenFactura/fe:TotalDescuentos',0);
            $fact['impuesto']       = $this->_getValue($xml,'ResumenFactura/fe:TotalImpuesto',0);
            $fact['cedula']         = $cedula = '' ? $this->_getValue($xml,'Receptor/fe:Identificacion/fe:Numero') : $cedula;
            $fact['oc']             = $this->_getValue($xml,'ResumenFactura/fe:TotalOtrosCargos',0);
            $fact['ref']            = $this->_getValue($xml,'InformacionReferencia/fe:Numero','');

            $_divisa = trim($fact['moneda']) != 'CRC' ? $fact['divisa'] : 1;

            $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,
                '.$fact['tipoventa'].',
                '.$fact['tipopago'].',
                '.$prov['id'].',
                1,
                0,
                '.$fact['impuesto']*$_divisa.',
                '.$fact['subtotal']*$_divisa.',
                '.($fact['exento']+$fact['nosujeto'])*$_divisa.',
                '.$fact['descuento']*$_divisa.',
                '.$fact['exonerado']*$_divisa.',
                '.$fact['oc']*$_divisa.',
                '.$fact['plazo'].',
                "'.$fact['ref'].'",
                "'.$salida['clave'].'",
                "'.$fact['moneda'].'",
                1,
                0,
                "",
                0,
                "",
                "",
                "'.$fact['fecha'].'",
                '.$fact['divisa'].',
                "",
                9,
                "'.$fact['cedula'].'",
                '.$ispruebas.',
                "'.$fact['codActividad'].'")');

            if(isset($idfact->num_rows)){
                $idfact = $idfact->fetch_all()[0][0];
                $salida['ifactura'] = $idfact;

                if($idfact){
                    foreach($xml->xpath('//fe:DetalleServicio/fe:LineaDetalle') as $ciclo){
                        //print_r($ciclo);
                        $hijos      = $ciclo->children($ns['']);
                        $ddetalle   = addslashes((string)$hijos->Detalle);
                        $dcabys     = $version == '4.4' ? (string)$hijos->CodigoCABYS : (string)$hijos->Codigo;
                        $dcantidad  = (string)$hijos->Cantidad;
                        $dunitario  = (string)$hijos->PrecioUnitario;
                        $ddescuento = 0;
                        
                        foreach($hijos->Descuento as $linea_Descuento)
                            $ddescuento += (float)$linea_Descuento->children($ns[''])->MontoDescuento;

                        $dtarifa    = 0;
                        $timv       = 1;                    
                        $dimpuesto  = 0;
                        $cimp       = 0;
                        $dotros     = 0;
                        $pexo       = 0;

                        foreach ($hijos->Impuesto as $linea_Impuesto) {
                            $children = $linea_Impuesto->children($ns['']);

                            $timpuesto = (string)$children->Codigo;
                            if( preg_match('/\b01\b|\b07\b|\b08\b/i', $timpuesto) == 1){ #APLICA_IVA
                                $dtarifa    = (string)$children->Tarifa;
                                $timv       = $version == '4.4' ? (string)$children->CodigoTarifaIVA : (string)$children->CodigoTarifa;
                                $dimpuesto += (float) $children->Monto;

                                $pexo       = empty($children->Exoneracion) ? 0 : $children->Exoneracion->TarifaExonerada;

                            }else{ #OTROS_IMPUESTOS
                                $dotros += (float) $children->Monto;
                            }
                        }

                        $vunidad    = (string)$hijos->UnidadMedida;
                        if($vunidad == 'Otros'){
                            $vunidad =  (string)$hijos->UnidadMedidaComercial;
                        }

                        $cod = '';
                        $tcod = 0;

                        if(!empty($hijos->CodigoComercial)){
                            $cod = $hijos->CodigoComercial->Codigo;
                            $tcod = $hijos->CodigoComercial->Tipo;
                        }

                        $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.$ddetalle.'","'.$dcabys.'",'.$dcantidad.','.$dunitario*$_divisa.','.$ddescuento*$_divisa.','.$dimpuesto*$_divisa.',"'.$vunidad.'",'.$dtarifa.','.$timv.','.$pexo.','.$dotros.',"'.$cod.'",'.$tcod.')');
                        if(!$iddet->num_rows){
                          $salida['version'] = $version;
                          $salida['rdetalle'] = $iddet; 
                          $salida['rdetalle_sql'] = 'call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.$ddetalle.'","'.$dcabys.'",'.$dcantidad.','.$dunitario*$_divisa.','.$ddescuento*$_divisa.','.$dimpuesto*$_divisa.',"'.$vunidad.'",'.$dtarifa.','.$timv.','.$pexo.','.$dotros.',"'.$cod.'",'.$tcod.')'; 
                        }
                    }
                }
            }
            else
                return ['succed' => 0,'ERROR' => $idfact,'mod'=>'Factura'];

            return $salida;
        }

        function _getValue($xml,$path,$retorno=''){
            $dato = $xml->xpath('//fe:'.$path);
            if(empty($dato))
                return $retorno;
            else
                return (string) $dato[0];
        }

        function estado()
        {
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return ['factura'=>$this->id,'estado'=>'Sin Internet','rs'=>$doBearer];

            if ($this->bearer == '')
               return 'Problemas con la Llave Criptográfica';

            if (isset($_REQUEST['clave'])) {
                $clave = $_REQUEST['clave'];
            }else{
                if(!isset($this->info['Clave']))
                    return false;
                $clave = $this->info['Clave'];
            }

            if ($this->credenciales[2] == 1) 
                $curl = curl_init("https://api-sandbox.comprobanteselectronicos.go.cr/recepcion/v1/recepcion/".$clave);
            else
                $curl = curl_init("https://".$this->pagina."/recepcion/v1/recepcion/".$clave);

            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            //curl_setopt($curl, CURLOPT_TIMEOUT, 5);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/x-www-form-urlencoded','Authorization: bearer '.$this->bearer]);

            $json_response = curl_exec($curl);

            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
            $header = substr($json_response, 0, curl_getinfo($curl, CURLINFO_HEADER_SIZE));
            $body = substr($json_response, -curl_getinfo($curl, CURLINFO_CONTENT_LENGTH_DOWNLOAD));

            $aHeader = array();

            foreach (explode("\r\n", $header) as $i => $line){
                if ($i === 0)
                    $aHeader['http_code'] = $line;
                else
                {
                    //list ($key, $value) = explode(': ', $line);
                    $sub = explode(': ', $line);
                    if($sub[0] != '')
                        $aHeader[$sub[0]] = $sub[1];
                }
            }

            switch ($status) {
                case 0:
                    $salida = json_encode(["rs"=>'Supero Tiempo de Espera',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]);
                    break;
                case 400:
                    $salida['factura']  = $this->id;
                    $salida['rs'] = $aHeader['X-Error-Cause'];
                    $salida['estado']   = 'Sin Subir';
                    break;
                case 200:
                case 201:
                case 202:
                    $aBody = (array) json_decode(substr($body,strpos($body, '{')));
                    if (isset($aBody['respuesta-xml'])){
                        $sRespuesta = (Array) simplexml_load_string(base64_decode($aBody['respuesta-xml']));
                        $sRespuesta = $sRespuesta['DetalleMensaje'];
                        $sRespuesta = str_replace(PHP_EOL, ' ', $sRespuesta);
                        $sError = strpos($sRespuesta, '[');

                        if ($sError != '') {
                            $sError     = substr($sRespuesta, strpos($sRespuesta, '[')-1);
                            $aError = explode(',',substr($sRespuesta, strpos($sRespuesta, '[')-1));
                            $sRespuesta = $sRespuesta;//str_replace($sError, '', $sRespuesta);
                        }
                        $salida['xml'] = base64_decode($aBody['respuesta-xml']);
                        $salida['rs'] = $sRespuesta;
                    }
                    //$salida['toto'] = $json_response;
                    $salida['factura']  = $this->id;
                    $salida['estado']   = isset($aBody['ind-estado']) ? $aBody['ind-estado'] : $aBody;

                    break;
                 case 500:
                    $salida = json_encode(["rs"=>'Error Interno en el Servidor de Hacienda',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]);
                    break;        
                default:
                    $salida = $json_response;
                    break;
            }

            curl_close($curl);
            return $salida;
        }

        function getEmisor(){
            $rs = $this->getJSON('select concat(lpad(idtipocliente,2,0),lpad(replace(cedula,"-",""),12,0)) as ced from sucursales where id = '.$_SESSION['IMPRESA']);
            return $rs ? $rs['ced'] : '';
        }

        function getReceptor($id){
            $rs = $this->getJSON('select lpad(replace(cedula,"-",""),12,0) as ced from clientes where id = '.$id);
            return $rs ? $rs['ced'] : '';
        }

        function getXMLRecepcion(){
            $data = [];

            if ($this->xmldoc == 'mensajeReceptor') {
                $data[] = $this->getJSON('call fe_recepcion("'.$this->id.'")');
            }else{

                $data[] = $this->info;

                $schemaXML = $this->getXMLSchema($this->id);
                $data['DetalleServicio'] = $schemaXML['det'];
                
                if($data['DetalleServicio'] != ''){
                    $tdetalle = isset($data['DetalleServicio']) ? sizeof($data['DetalleServicio']) : 0;
                    if (!$tdetalle && $this->opcion < 5) 
                        return ['error'=>'No hay Detalle'];
                }else
                    unset($data['DetalleServicio']);
                    
                $ocargos = $this->getJSON('call fe_getOtrosCargos("'.$this->id.'")');
                if($ocargos)
                    $data['OtrosCargos'] = $ocargos; 
                $data['ResumenFactura'] = $schemaXML['res'];
    
                if($this->opcion == 9){
                    unset($data['ResumenFactura']['TotalExonerado']);
                    unset($data['ResumenFactura']['TotalServExonerado']);
                    unset($data['ResumenFactura']['TotalMercExonerada']);
                }

                $refxml = $this->getJSON('call fe_getReferencia('.$this->id.')');
                if (is_array($refxml)) {
                    if(sizeof($refxml))
                        $data['InformacionReferencia'] = $refxml;
                }

                //$data['Normativa'] = ['NumeroResolucion' => 'DGT-R-48-2016', 'FechaResolucion' => '07-10-2016 08:00:00'];
                $otros = $this->getJSON('call fe_getOtros('.$this->id.')');

                if ($otros)
                    array_push($data,$otros);                
                
            }

            if (!isset($this->info['Emisor']['CorreoElectronico']) && substr($this->id, 0,1) != '!') {
               return ['error'=>'Emisor sin Correo'];
            }

            if (isset($this->info['Receptor']['Identificacion']['Tipo'])) {

                if(isset($this->info['Receptor']['Telefono']['NumTelefono'])){
                    if (!is_numeric($this->info['Receptor']['Telefono']['NumTelefono'])) {
                        unset($this->info['Receptor']['Telefono']);
                    }

                    if (strlen($this->info['Receptor']['Telefono']['NumTelefono']) != 8) {
                        unset($this->info['Receptor']['Telefono']);
                    }
                }
                $tmcedula = strlen($this->info['Receptor']['Identificacion']['Numero']);
                switch ($this->info['Receptor']['Identificacion']['Tipo']) {
                    case '00':
                        break;
                    case '01':
                        if ($tmcedula != 9)
                            return ['error' => 'Formato Cédula no Valido'];
                        break;
                    case '02':
                        if ($tmcedula != 10)
                            return ['error' => 'Formato Cédula no Valido'];
                        break;
                    default:
                        if ($tmcedula != 10 && $tmcedula != 12)
                            return ['error' => 'Formato Cédula no Valido'];
                        break;
                }
            }
            $tmcedula = strlen($this->info['Emisor']['Identificacion']['Numero']);
            switch ($this->info['Emisor']['Identificacion']['Tipo']) {
                case '01':
                    if ($tmcedula != 9)
                        return ['error' => 'Formato Cédula no Valido a'];
                    break;
                case '02':
                    if ($tmcedula != 10)
                        return ['error' => 'Formato Cédula no Valido b'];
                    break;
                default :
                    
                    if ( $tmcedula != 12)
                         return ['error' => 'Formato Cédula no Valido '.$tmcedula];
                    break;
            }

             $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
            <'.$this->tdoc.' xmlns="'.$this->linkVersion.$this->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="'.$this->linkVersion.$this->xmldoc.' '.$this->tribunet.'" />');

            $this->array_to_xml($data,$xml_data);

            $xml = $xml_data->asXML();
 
            $this->firmarXML($xml);

            return $xml;
        }

        function getPayload($xml){
            $valores = array('clave'  =>  $this->info['Clave'],
                                        'fecha'                 =>  $this->info['FechaEmision'],
                                        'emisor'                =>  ['tipoIdentificacion' => $this->info['Emisor']['Identificacion']['Tipo'], 'numeroIdentificacion' => str_pad($this->info['Emisor']['Identificacion']['Numero'], 12,0,STR_PAD_LEFT)],
                                        'receptor'              =>  '',
                                        'callbackUrl'           => $this->credenciales[3],
                                        // 'consecutivoReceptor'   => '',
                                        'comprobanteXml'        => base64_encode($xml));
            if (isset($this->info['Receptor'])) 
                $valores['receptor'] = ['tipoIdentificacion' => $this->info['Receptor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $this->info['Receptor']['Identificacion']['Numero']];
            else
                unset($valores['receptor']);

            return $valores;
        }

        function array_to_xml( $data, &$xml_data ) {
            foreach( $data as $key => $value ) {
                if( is_array($value) ) {
                    $subnode =  is_numeric($key) ? $xml_data : $xml_data->addChild($key); 
                    $this->array_to_xml($value, $subnode);
                } else {
                    if ($key == 'Signature') {
                       $firma = $xml_data->addChild('Signature');
                       $firma->addAttribute('xmlns:ds','http://www.w3.org/2000/09/xmldsig#');
                       $firma->addChild();
                    }else{
                        if($value){
                            if(strpos($key,'*')){
                                $ccod = $xml_data->addChild(substr($key,0,strpos($key,'*')),htmlspecialchars("$value"));
                                $ccod->addAttribute('codigo',substr($key,strpos($key,'*')+1)); 
                            }else                        
                                $xml_data->addChild("$key",htmlspecialchars("$value"));
                        }
                    }
                }
             }
        }

        function getXMLSchema($id){
            $db = new DBClass();
            $rs = $db->ejecutar('call fe_getDetalle("'.$this->id.'")');

            $desgloceIVA = [];
            $salida = ['det'=>[],'res'=>[
                'CodigoTipoMoneda'          => ['CodigoMoneda'=>'--','TipoCambio'=>1], 
                'TotalServGravados'         => '0.00000',
                'TotalServExentos'          => '0.00000',
                'TotalServExonerado'        => '0.00000',
                'TotalMercanciasGravadas'   => '0.00000',    
                'TotalMercanciasExentas'    => '0.00000',     
                'TotalMercExonerada'        => '0.00000',
                'TotalGravado'              => '0.00000',
                'TotalExento'               => '0.00000',
                'TotalExonerado'            => '0.00000',
                'TotalVenta'                => '0.00000',
                'TotalDescuentos'           => '0.00000',
                'TotalVentaNeta'            => '0.00000',
                'TotalImpuesto'             => '0.00000',
                'TotalOtrosCargos'          => '0.00000',
                'TotalComprobante'          => '0.00000'
            ]];

            if (isset($rs->num_rows)) {
               foreach ($rs->fetch_all() as $key => $linea) {
                    $det                            = ['NumeroLinea' => ($key+1)];
                    $det['CodigoCABYS']                  = $linea[2];

                    if($linea[22])
                        $det['CodigoComercial']         = ['Tipo'=>'03','Codigo'=>$linea[22]];
                    
                    $det['Cantidad']                = $linea[3];
                    $det['UnidadMedida']            = $linea[4];
                    
                    if($linea[5])
                    $det['UnidadMedidaComercial']   = $linea[5];
                    
                    $det['Detalle']                 = $linea[6];
                    $det['PrecioUnitario']          = $linea[7];
                    $det['MontoTotal']              = $linea[8];
                    
                    if ($linea[9] > 0) {
                    $salida['res']['TotalDescuentos'] += $linea[9];
                    $det['Descuento']['MontoDescuento'] = $linea[9];
                    $det['Descuento']['CodigoDescuento'] = $linea[23];
                    $det['Descuento']['NaturalezaDescuento'] = $linea[10];
                    }

                    $det['SubTotal'] = $linea[11];
                    $det['BaseImponible'] = $linea[11];
                    $sum_imp = 0;
                    $tipo_linea = 1;

                    if ($linea[12] != '') {
                            
                        $obj = $linea[12];
                        $sub_array = explode(',', $obj);

                        if (strlen($sub_array[0])) {
                            
                            $impuesto = ['Codigo'       => str_pad($sub_array[0],2,0,STR_PAD_LEFT),
                                         'CodigoTarifaIVA' => str_pad($sub_array[3],2,0,STR_PAD_LEFT),
                                         'Tarifa'       => $sub_array[1] == 0 ? '0.0' :number_format($sub_array[1],1),
                                         'Monto'        => $sub_array[2] == 0 ? '0.00000' : str_replace(',', '', $sub_array[2])
                                     ];

                            if ($linea[16] != ''){
                                /*EXONERADO*/
                                $exoneracion = ['TipoDocumentoEX1'          => $linea[16],
                                                'NumeroDocumento'           => $linea[17],
                                                'Articulo'                  => $linea[24],
                                                'Inciso'                    => $linea[25],
                                                'NombreInstitucion'         => str_pad($linea[18],2,'0',STR_PAD_LEFT),
                                                'FechaEmisionEX'            => $linea[19],
                                                'TarifaExonerada'           => number_format($linea[20],2),
                                                'MontoExoneracion'          => $linea[21]
                                               ];
                                if($linea[16]!='03' && $linea[16]!= "02" && $linea[16]!= "06" && $linea[16]!= "07" && $linea[16]!= "08"){
                                    unset($exoneracion['Articulo']);
                                    unset($exoneracion['Inciso']);
                                }

                                $impuesto['Exoneracion'] = $exoneracion;
                                $tipo_linea = 2;
                                $sum_imp += $sub_array[2]-$linea[21];
                            }else{
                                $tipo_linea = $sub_array[1] == 0 ? 1 : 3;
                                $sum_imp += $sub_array[2];
                            }
                            
                            if(isset($desgloceIVA[$impuesto['CodigoTarifaIVA']]))
                                $desgloceIVA[$impuesto['CodigoTarifaIVA']]['TotalMontoImpuesto'] += number_format($sum_imp,5,'.','');
                            else
                                $desgloceIVA[$impuesto['CodigoTarifaIVA']] = [
                                    'Codigo'            => $impuesto['Codigo'],
                                    'CodigoTarifaIVA'   => $impuesto['CodigoTarifaIVA'],
                                    'TotalMontoImpuesto'=> number_format($sum_imp,5,'.','')
                                ];

                            array_push($det, ['Impuesto' => $impuesto]);
                        }
                    }else{
                         $impuesto = ['Codigo'       => '01',
                             'CodigoTarifaIVA' => '10',
                             'Tarifa'       => '0.0',
                             'Monto'        => '0.0'
                         ];

                         array_push($det, ['Impuesto' => $impuesto]);
                         if(!isset($desgloceIVA[10]))
                            $desgloceIVA[10] = [
                                'Codigo'            => '01',
                                'CodigoTarifaIVA'   => '10',
                                'TotalMontoImpuesto'=> '0.00'
                            ];

                    }
                    $det['ImpuestoAsumidoEmisorFabrica'] = '0.00000';
                    $det['ImpuestoNeto'] = number_format($sum_imp,5,'.','');
                    $det['MontoTotalLinea'] = number_format($linea[15] + $sum_imp,5,'.','');

                    $salida['res']['TotalImpuesto'] += $det['ImpuestoNeto'];
                    
                    switch ($tipo_linea.$linea[1]) {
                        case 101: //EXENTO_SERVICIO
                            $salida['res']['TotalServExentos']          += number_format( $linea[8] ,5,'.','');
                            break;
                        case 104: //EXENTO_PRODUCTO
                            $salida['res']['TotalMercanciasExentas']    += number_format( $linea[8] ,5,'.','');
                            break;
                        case 201: //EXONERADO_SERVICIO
                            if((1-($linea[20]/$sub_array[1])))
                                $salida['res']['TotalServGravados']         += number_format( $linea[8]*(1-($linea[20]/$sub_array[1])) ,5,'.','');
                            $salida['res']['TotalServExonerado']        += number_format( $linea[8]*(($linea[20]/$sub_array[1])) ,5,'.','');
                            break;
                        case 204: //EXONERADO_PRODUCTO
                            $salida['res']['TotalMercanciasGravadas']   += number_format( $linea[8]*(1-($linea[20]/$sub_array[1])) ,5,'.','');
                            $salida['res']['TotalMercExonerada']        += number_format( $linea[8]*(($linea[20]/$sub_array[1])) ,5,'.','');
                            break;
                        case 301: //GRAVADO_SERVICIO
                            $salida['res']['TotalServGravados']         += number_format( $linea[8] ,5,'.','');
                            break;
                        case 304: //GRAVADO_PRODUCTO
                            $salida['res']['TotalMercanciasGravadas']   += number_format( $linea[8] ,5,'.','');
                            break;
                        default:
                            break;
                    }
                    
                    array_push($salida['det'], ['LineaDetalle'=>$det]);
               }
            }else{
                return ['det' => '', 'res' => $this->getJSON('call fe_getResumen("'.$this->id.'")')];
            }
            if(isset($_REQUEST['debug'])){
                echo (1-($linea[20]/$sub_array[1]));
                echo $salida['res']['TotalServGravados'];
            }
            $salida['res']['TotalGravado']      = number_format( $salida['res']['TotalMercanciasGravadas']+$salida['res']['TotalServGravados'] ,5,'.','');
            $salida['res']['TotalExento']       = number_format( $salida['res']['TotalMercanciasExentas']+$salida['res']['TotalServExentos'] ,5,'.','');
            $salida['res']['TotalExonerado']    = number_format( $salida['res']['TotalMercExonerada']+$salida['res']['TotalServExonerado'] ,5,'.','');

            $salida['res']['TotalVenta']        = number_format( $salida['res']['TotalGravado']+$salida['res']['TotalExento']+$salida['res']['TotalExonerado'] ,5,'.','');

            $salida['res']['TotalVentaNeta']    = number_format( $salida['res']['TotalVenta']-$salida['res']['TotalDescuentos'] ,5,'.','');

            if($this->opcion == 3){
                $rest = $db->ejecutar('select b.codigo,a.divisa,0 from estadoscuentas a join monedas b on b.id = a.idmoneda where a.id = abs('.$this->id.');')->fetch_all();
            }else{  
                $rest = $db->ejecutar('select b.codigo,a.divisa,e.mesero,if(a.idtipo in(2),0,a.idtipopago) from facturas a join monedas b on b.id = a.idmoneda join ( (select id,0 as mesero from facturas where id not in(select idfactura from msfacturas where idfactura = '.$this->id.') and id = '.$this->id.') union (select a.id,ifnull(b.servmesero,0) from facturas a join msfacturas b on b.idfactura = a.id where a.id = '.$this->id.') ) e on e.id = a.id  where a.id = '.$this->id.';')->fetch_all();

                switch($rest[0][3]){
                    case 5://MIXTO
                        $mixtos = $db->ejecutar('select b.idhacienda,a.total from pagosmixtos a join tipopagos b on b.id = a.idpago where idfactura = '.$this->id);
                        break;
                    case 0://CREDITOS
                        break;
                    default:
                        $idhacienda_pago = $db->ejecutar('select lpad(idhacienda,2,0) from tipopagos where id ='.$rest[0][3])->fetch_all()[0][0];
                        
                        $salida_pagos = array_slice($salida['res'], 0,15);
                        $salida_pagos += ['MedioPago'=>['TipoMedioPago'=>$idhacienda_pago]];
                        $salida['res'] = $salida_pagos+$salida['res'];
                        break;
                }
            }

            $salida['res']['CodigoTipoMoneda']['CodigoMoneda']  = $rest[0][0];
            $salida['res']['CodigoTipoMoneda']['TipoCambio']    = $rest[0][1];
            $salida['res']['TotalOtrosCargos']                  = $rest[0][2];

            $salida['res']['TotalComprobante']  = number_format( $salida['res']['TotalVentaNeta']+$salida['res']['TotalImpuesto']+$salida['res']['TotalOtrosCargos'] ,5,'.','');

            $salida_res = array_slice($salida['res'], 0,13);
            foreach ($desgloceIVA as $key => $value) {
                if(!$value['TotalMontoImpuesto'])
                  $value['TotalMontoImpuesto'] = '0.0';
              
                array_push($salida_res,['TotalDesgloseImpuesto'=>$value]);
            }

            $salida['res'] = $salida_res+$salida['res'];
            return $salida;
        }

        function getJSON($query){

            $db = new DBClass();
            $rs = $db->ejecutar($query);

            if (isset($rs->num_rows)) {
                $salida = $entrada = [];
                $entrada[0] = $rs->fetch_all();
                $entrada[1] = $rs->fetch_fields();

                foreach ($entrada[1] as $key => $obj) {
                    if(!sizeof($entrada[0]))
                        return $salida;
                    
                    if ($entrada[0][0][$key] == '') 
                        continue;

                    if (strpos($entrada[0][0][$key], ',')) {
                        $salida2 = [];
                        $narr = explode(',', $entrada[0][0][$key]);
                        
                        for ($i=0; $i < sizeof($narr); $i++) { 
                            if ($i%2 == 0) {
                                if (strpos( $narr[$i+1],':')) {
                                    $salida3 = [];
                                    $narr1 = explode(':', $narr[$i+1]);
                                    for ($j=0; $j < sizeof($narr1); $j++) { 
                                        if ($j%2 == 0) {
                                            if (strpos( $narr1[$j+1],'^')) {
                                                $narr2 = explode('^', $narr1[$j+1]);
                                                for ($k=0; $k < $narr1[$j+1]; $k++) { 
                                                   $salida3[$narr1[$j]] = $narr2[$k];
                                                }
                                            }else{
                                                $salida3[$narr1[$j]] = $narr1[$j+1];
                                            }     
                                        }
                                    }
                                    $salida2[$narr[$i]] = $salida3;
                                }else{ 

                                    if(strpos( $narr[$i+1],'!')){
                                        $varr = explode('^', substr($narr[$i+1],2));
                                        foreach ($varr as $value) {
                                            array_push($salida2, [$narr[$i]=>$value]);
                                        }
                                    }else
                                        $salida2[$narr[$i]] = $narr[$i+1];
                                }
                                
                            }          
                        }
                        $salida[$obj->name] = $salida2;
                    }else{
                        $salida[$obj->name] = $entrada[0][0][$key];
                    }
                }

                return $salida;
            }else{
                return $rs;
            }
        }

        public function retC14DigestSha256($strcadena){
            $strcadena = str_replace("\r", "", str_replace("\n", "", $strcadena));
            $d1p = new DOMDocument('1.0','UTF-8');
            $d1p->loadXML($strcadena);
            $strcadena=$d1p->C14N();
            return base64_encode(hash('sha256' , $strcadena, true ));
        }

       public function firmarXML(&$xml){
            $signTime = NULL;
            $signPolicy = NULL;
            $publicKey = NULL;
            $privateKey = NULL;
            $cerROOT = NULL;
            $cerINTERMEDIO = NULL;


            $d = new DOMDocument('1.0');
            $d->loadXML($xml);
            $canonizadoreal=$d->C14N();

            $digest = base64_encode(hash('sha1' , $xml, true ));

            $POLITICA_FIRMA = array(
                "name"      => "",
                "url"       => "https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4.1/Resolucion%20Comprobantes%20Electronicos%20%20DGT-R-48-2016.pdf",
                "digest"    =>  $digest //digest en sha1 y base64
            );

            openssl_pkcs12_read(file_get_contents($this->preUbicacion.$this->credenciales[0]), $certs, $this->credenciales[1]);
            $publicKey    =$certs["cert"];
            $privateKey   =$certs["pkey"];
            $complem = openssl_pkey_get_details(openssl_pkey_get_private($privateKey));
            $Modulus = base64_encode($complem['rsa']['n']);
            $Exponent= base64_encode($complem['rsa']['e']);

            $signPolicy       = $POLITICA_FIRMA;
            $signatureID      = "Signature-".$this->id;
            $signatureValue   = "SignatureValue-".$this->id*2;
            $XadesObjectId    = "XadesObjectId-".$this->id*3;
            $KeyInfoId        = "KeyInfoId-".$signatureID;
            
            $Reference0Id     = "Reference-".$this->id*4;
            $Reference1Id     = "ReferenceKeyInfo";
            
            $SignedProperties = "SignedProperties-".$signatureID; 

            $xmlns_keyinfo='xmlns="'.$this->linkVersion.$this->xmldoc.'" '.
             'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
             'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
             'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
             
            $xmnls_signedprops='xmlns="'.$this->linkVersion.$this->xmldoc.'" '.
            'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
            'xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" '.
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';

            
            $xmnls_signeg='xmlns="'.$this->linkVersion.$this->xmldoc.'" '.
            'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
            
            $signTime1 = date('Y-m-d\TH:i:s-06:00');

            $certData   = openssl_x509_parse($publicKey);
            $certDigest = base64_encode(openssl_x509_fingerprint($publicKey, "sha1", true));

            $certIssuer = array();
            foreach ($certData['issuer'] as $item=>$value) {
              $certIssuer[] = $item . '=' . $value;
            }
            $certIssuer = implode(', ', array_reverse($certIssuer));

            $prop = '<xades:SignedProperties Id="' . $SignedProperties .  '">' .
              '<xades:SignedSignatureProperties>'.
                  '<xades:SigningTime>' .  $signTime1 . '</xades:SigningTime>' .
                  '<xades:SigningCertificate>'.
                      '<xades:Cert>'.
                          '<xades:CertDigest>' .
                              '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />'.
                              '<ds:DigestValue>' . $certDigest . '</ds:DigestValue>'.
                          '</xades:CertDigest>'.
                          '<xades:IssuerSerial>' .
                              '<ds:X509IssuerName>'   . $certIssuer       . '</ds:X509IssuerName>'.
                              '<ds:X509SerialNumber>' . $certData['serialNumber'] . '</ds:X509SerialNumber>' .
                          '</xades:IssuerSerial>'.
                      '</xades:Cert>'.
                  '</xades:SigningCertificate>' .
                  '<xades:SignaturePolicyIdentifier>'.
                      '<xades:SignaturePolicyId>' .
                          '<xades:SigPolicyId>'.
                              '<xades:Identifier>' . $signPolicy['url'] .  '</xades:Identifier>'.
                              '<xades:Description />'.
                          '</xades:SigPolicyId>'.
                          '<xades:SigPolicyHash>' .
                              '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1" />'. 
                              '<ds:DigestValue>' . $signPolicy['digest'] . '</ds:DigestValue>'.
                          '</xades:SigPolicyHash>'.
                      '</xades:SignaturePolicyId>' .
                  '</xades:SignaturePolicyIdentifier>'.
              '</xades:SignedSignatureProperties>'.
              '<xades:SignedDataObjectProperties>'.
                  '<xades:DataObjectFormat ObjectReference="#'. $Reference0Id . '">'.
                      '<xades:MimeType>text/xml</xades:MimeType>'.
                      '<xades:Encoding>UTF-8</xades:Encoding>'.
                  '</xades:DataObjectFormat>'.
              '</xades:SignedDataObjectProperties>'.
              '</xades:SignedProperties>';

              // Prepare key info
            $publicPEM = "";
            openssl_x509_export($publicKey, $publicPEM);
            $publicPEM = str_replace("-----BEGIN CERTIFICATE-----", "", $publicPEM);
            $publicPEM = str_replace("-----END CERTIFICATE-----", "", $publicPEM);
            $publicPEM = str_replace("\r", "", str_replace("\n", "", $publicPEM));  
         
            $kInfo = '<ds:KeyInfo Id="'.$KeyInfoId.'">' . 
                        '<ds:X509Data>'  .  
                            '<ds:X509Certificate>'  . $publicPEM .'</ds:X509Certificate>' .
                        '</ds:X509Data>' .
                        '<ds:KeyValue>'.                
                        '<ds:RSAKeyValue>'.
                            '<ds:Modulus>'.$Modulus .'</ds:Modulus>'.
                            '<ds:Exponent>'.$Exponent .'</ds:Exponent>'.
                        '</ds:RSAKeyValue>'.
                        '</ds:KeyValue>'.
                     '</ds:KeyInfo>';

            $aconop=str_replace('<xades:SignedProperties', '<xades:SignedProperties ' . $xmnls_signedprops, $prop);
            $propDigest=$this->retC14DigestSha256($aconop);

            $keyinfo_para_hash1=str_replace('<ds:KeyInfo', '<ds:KeyInfo ' . $xmlns_keyinfo, $kInfo);
            $kInfoDigest=$this->retC14DigestSha256($keyinfo_para_hash1);

            $documentDigest = base64_encode(hash('sha256' , $canonizadoreal, true ));

            // Prepare signed info
            $sInfo = '<ds:SignedInfo>' . 
              '<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315" />' . 
              '<ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" />' . 
              '<ds:Reference Id="' . $Reference0Id . '" URI="">' . 
              '<ds:Transforms>' . 
              '<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature" />' .  
              '</ds:Transforms>' . 
              '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />' .
              '<ds:DigestValue>' . $documentDigest . '</ds:DigestValue>' . 
              '</ds:Reference>' . 
              '<ds:Reference Id="'.  $Reference1Id . '" URI="#'.$KeyInfoId .'">' . 
              '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />' .
              '<ds:DigestValue>' . $kInfoDigest . '</ds:DigestValue>' . 
              '</ds:Reference>' . 
              '<ds:Reference Type="http://uri.etsi.org/01903#SignedProperties" URI="#' . $SignedProperties . '">' . 
              '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256" />' . 
              '<ds:DigestValue>' . $propDigest . '</ds:DigestValue>' . 
              '</ds:Reference>' . 
              '</ds:SignedInfo>';


            $signaturePayload = str_replace('<ds:SignedInfo', '<ds:SignedInfo ' . $xmnls_signeg, $sInfo);

            $sig = '<ds:Signature xmlns:ds="http://www.w3.org/2000/09/xmldsig#" Id="' . $signatureID . '">'. 
               $sInfo . 
              '<ds:SignatureValue Id="' . $signatureValue . '"></ds:SignatureValue>'  . $kInfo . 
              '<ds:Object Id="'.$XadesObjectId .'">'.
              '<xades:QualifyingProperties xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Id="QualifyingProperties-012b8df6-b93e-4867-9901-83447ffce4bf" Target="#' . $signatureID . '">' . $prop .
              '</xades:QualifyingProperties></ds:Object></ds:Signature>';

            $d1p = new DOMDocument('1.0','UTF-8');
            $d1p->loadXML($signaturePayload);
            $signaturePayload=$d1p->C14N();
            
            $signatureResult = "";
            $algo = "SHA256";

            openssl_sign($signaturePayload, $signatureResult, $privateKey,$algo);
            $signatureResult = base64_encode($signatureResult);

            $sig = str_replace('</ds:SignatureValue>', $signatureResult.'</ds:SignatureValue>', $sig);
            $xml = str_replace('</'.$this->tdoc.'>', $sig.'</'.$this->tdoc.'>' , $xml);
       }

       function getStatus($ref){
            $db = new DBClass();
            $rs = $db->ejecutar('select aes_decrypt(unhex("'.$ref.'"),"salvenawilly") as info');
            if ($rs->num_rows != 1) {
                return ['ERROR'=>'Referencia no Valida'];
            }
            $rs = $rs->fetch_all()[0][0];
            $rs = explode(',', $rs);

            $this->credenciales[2] = $rs[1];
            $this->credenciales[4] = $rs[2];
            $this->credenciales[5] = $rs[3];
            $this->credenciales[6] = '';
            $_REQUEST['clave'] = $rs[0];

            $estatus = $this->estado();
            array_push($rs, $estatus);
            return $rs;
        }

        function XMLtoArray($xml) {
            $previous_value = libxml_use_internal_errors(true);
            $dom = new DOMDocument('1.0', 'UTF-8');
            $dom->preserveWhiteSpace = false; 
            $dom->loadXml($xml);
            libxml_use_internal_errors($previous_value);
            if (libxml_get_errors()) {
                return [];
            }
            return $this->DOMtoArray($dom);
        }      

        function DOMtoArray($root) {
            $result = array();

            if ($root->hasAttributes()) {
                $attrs = $root->attributes;
                foreach ($attrs as $attr) {
                    $result['@attributes'][$attr->name] = $attr->value;
                }
            }

            if ($root->hasChildNodes()) {
                $children = $root->childNodes;
                if ($children->length == 1) {
                    $child = $children->item(0);
                    if (in_array($child->nodeType,[XML_TEXT_NODE,XML_CDATA_SECTION_NODE])) {
                        $result['_value'] = $child->nodeValue;
                        return count($result) == 1
                            ? $result['_value']
                            : $result;
                    }

                }
                $groups = array();
                foreach ($children as $child) {
                    if (!isset($result[$child->nodeName])) {
                        $result[$child->nodeName] = $this->DOMtoArray($child);
                    } else {
                        /*if (!isset($groups[$child->nodeName])) {
                            $result[$child->nodeName] = array($result[$child->nodeName]);
                            $groups[$child->nodeName] = 1;
                        }
                        $result[$child->nodeName][] = $this->DOMtoArray($child);*/
                        $result[$child->nodeName.'_'.sizeof($result).'_'] = $this->DOMtoArray($child);
                    }
                }
            }
            return $result;
        }

        function procesarPDF($xml,&$db,$suc){
            $_xml = $this->XMLtoArray($xml);
            $transaccion = [];
            $ind = 0;

            foreach ($_xml[$this->tdoc]['DetalleServicio'] as $obj) {
                
                $linea = [];
                $linea['0'] = $_xml[$this->tdoc]['NumeroConsecutivo'];
                $linea['1'] = $_xml[$this->tdoc]['CondicionVenta'] == '01' ? 'Contado' : 'Crédito';
                $linea['2'] = $_xml[$this->tdoc]['CondicionVenta'] == '01' ? $_xml[$this->tdoc]['MedioPago'] == '01' ? 'Efectivo' : 'Tarjeta' : '';
                $linea['3'] = substr($_xml[$this->tdoc]['FechaEmision'], 0,10);
                $linea['3'] = substr($linea['3'],8,2).'/'.substr($linea['3'], 5,2).'/'.substr($linea['3'], 0,4).' '.substr($_xml[$this->tdoc]['FechaEmision'], 11,8);;
                if (isset($_xml[$this->tdoc]['Receptor'])) {
                    $linea['4'] = $_xml[$this->tdoc]['Receptor']['Nombre'];
                    $linea['34'] = $_xml[$this->tdoc]['Receptor']['Identificacion']['Numero'];
                }else{
                    $linea['4'] = '';
                    $linea['34'] = '';
                }    
                
                $linea['5'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalImpuesto'],2);
                $linea['6'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalDescuentos'],2);
                $linea['7'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalExonerado'],2);
                $linea['8'] = number_format(0,2);
                $linea['9'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalGravado'],2);
                $linea['10'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalComprobante'],2);
                $linea['11'] = $_xml[$this->tdoc]['CondicionVenta'] == '01' ? 0 : $_xml[$this->tdoc]['PlazoCredito'];
                $linea['12'] = '';
                $linea['13'] = '';
                $linea['14'] = $_xml[$this->tdoc]['ResumenFactura']['CodigoTipoMoneda']['CodigoMoneda'];
                $linea['15'] = $_xml[$this->tdoc]['ResumenFactura']['CodigoTipoMoneda']['CodigoMoneda'] == 'CRC' ? '¢' : '$';
                $linea['16'] = '';
                $linea['17'] = $_REQUEST['sucname'];
                $linea['18'] = $obj['Cantidad'];
                $linea['19'] = $obj['Detalle'];
                $linea['20'] = number_format($obj['PrecioUnitario'],2);
                $linea['21'] = isset($obj['MontoDescuento']) ? $obj['MontoDescuento'] : 0;
                $linea['22'] = number_format($obj['SubTotal'],2);
                $linea['23'] = isset($obj['UnidadMedidaComercial']) ? $obj['UnidadMedidaComercial'] : $obj['UnidadMedida'];
                $linea['41'] = '';

                if (isset($_xml[$this->tdoc]['Receptor'])) {
                    $linea['24'] = '1';
                    $linea['25'] = 'Venta';
                    $linea['30'] = 'Cliente';
                    $linea['41'] =  isset($_REQUEST['crr']) ? $_REQUEST['crr'] : $_xml[$this->tdoc]['Receptor']['CorreoElectronico'];
                }else{
                    $linea['24'] = '7';
                    $linea['25'] = 'Tiquete';
                    $linea['30'] = '';
                }
                $linea['26'] = $_xml[$this->tdoc]['CondicionVenta'] == '01' ? 1 : 2;
                $linea['27'] = '';
                $linea['28'] = isset($obj['Impuesto']) ? number_format($obj['Impuesto']['Monto'],2) : 0;
                $linea['29'] = isset($obj['Impuesto']) ? '' : '*';
                $linea['31'] = '';
                $linea['32'] = $_xml[$this->tdoc]['Clave'];
                $linea['33'] = isset($obj['Impuesto']['Exoneracion']) ? $obj['Impuesto']['Exoneracion']['TipoDocumento'].'^'.$obj['Impuesto']['Exoneracion']['NumeroDocumento'].'^'.$obj['Impuesto']['Exoneracion']['NombreInstitucion'].'^'.$obj['Impuesto']['Exoneracion']['FechaEmision'].'^'.$obj['Impuesto']['Exoneracion']['PorcentajeExoneracion'].'^'.$obj['Impuesto']['Exoneracion']['MontoExoneracion'] : ''; //EXONERACION
                $linea['35'] = '';
                $linea['36'] = isset($obj['Codigo']) ? $obj['Codigo']['Codigo'] : '';
                $linea['46'] = 0;
                $linea['47'] = 0;
                $linea['48'] = '';
                $linea['49'] = '';
                $linea['50'] = '';
                $linea['51'] = '';
                $linea['52'] = '';
                $linea['53'] = '';
                $linea['54'] = '';
                $linea['37'] = '';
                $ffin = '';
                if ($_xml[$this->tdoc]['CondicionVenta'] == '02') {
                    $date_c=date_create($_xml[$this->tdoc]['FechaEmision']);
                    $date_c=date_add($date_c,date_interval_create_from_date_string( $_xml[$this->tdoc]['PlazoCredito']." days"));
                    $ffin = date_format($date_c,"d/m/Y");
                }
               
                $linea['55'] = $ffin;

                $transaccion[$ind] = $linea;
                $ind += 1;
            }

            $datos = $transaccion;
            $miscelaneos = $db->ejecutar('call krattos("",50,'.$suc.')')->fetch_all()[0];
            $tit = $this->tdoc;
            $url2 = 1;

            include 'dashboard/view/pdf/recibo.php';
        }

        function enviarCorreo($crr,$sub,$bdy,$adj){
            $url2 = 1;
            require_once '_config/correo.php';

            $correo = new correo($crr,$sub,$bdy,'',0);
            $correo->enviar_adjunto($adj);
        }

        function envioWsdlCorreo(&$db,$id,$to,$mh = 0,$vurl = 99){
            $cnf = $db->ejecutar('call sp_msg0("'.$id.'");')->fetch_all()[0];
            $num = $this->info['NumeroConsecutivo'];
            $tit = $this->titulo;

            $url2 = $vurl;
            $_POST['con_con'] = 1;
            $_POST['accion'] = 3;
            $_POST['body'] = $cnf[0];
            $_POST['idfila'] = $id;
            $_POST['subject'] = substr($id,0,1) == '^' ? $cnf[3]." del Consecutivo ".$cnf[4] : $cnf[3]." No ".$num;
            $_POST['to'] = $to;
            $_POST['idtabla'] = $this->idtabla;

            if(!$mh){

                $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                $actual_link = str_replace('wsdlClient.php','/dashboard/login', $actual_link);

                if(substr($id,0,1) == '^')
                    $_POST['adjunto'] = [0=>'xml/'.$tit.' No'.$num.' '.$_SESSION['EMPRESA'].'.xml'];
                else{
                $_POST['adjunto'] = [0=>'xml/'.$tit.' No'.$num.' '.$_SESSION['EMPRESA'].'.xml',1=>'pdf/'.$tit.' No'.$num.' '.$_SESSION['EMPRESA'].'.pdf'];
                //MAKE ARCHIVOS
                //PDF
                $_arch = isset($_REQUEST['arch']) ? $_REQUEST['arch'] : 'recibo';
                $pdftbl = $this->idtabla == 64 ? 72 : 186;
                $tid = $this->idtabla == 64 ? $id : $id*-1;

                $_arreglo = ['arch'=> $_arch,'id'=>$tid,"mic"=>1,"tit"=>$tit ,"sel"=>'',"tbl"=>$pdftbl,"where"=>$tid,"empresaid"=>$_SESSION['IMPRESA']];

                $curl = curl_init($actual_link);
                curl_setopt($curl, CURLOPT_HEADER, true);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);

                $params = array(
                  "accion" => 8,
                  "arreglo" => $_arreglo);

                $postData = http_build_query($params);

                $postData = rtrim($postData, '&');
                curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
                $json_response = curl_exec($curl);
                }
                //XML
                $_arreglo = ['id'=>$id,"factura"=>$num,"sucursal"=>$_SESSION['EMPRESA'],"empresaid"=>$_SESSION['IMPRESA'],'restado' => $tit];

                $curl = curl_init($actual_link);
                curl_setopt($curl, CURLOPT_HEADER, true);
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                curl_setopt($curl, CURLOPT_POST, true);

                $params = array(
                  "accion" => 9,
                  "arreglo" => $_arreglo);

                $postData = http_build_query($params);

                $postData = rtrim($postData, '&');
                curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
                $json_response = curl_exec($curl);
                curl_close($curl);
            }else
                $_POST['adjunto'] = []; 

            switch($url2){
                case 98:
                    require_once './correoAjax.php';
                    break;
                default:
                    require_once './_config/correoAjax.php';
                    break;
            }
        }
    }   

    function warning_handler($errno, $errstr, $errfile, $errline)
    {
        return true;
    }

 ?>