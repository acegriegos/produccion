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
                echo json_encode(['rs'=>'Documento Electronico Aprobado','clave'=>$fe->info['Clave'],'num'=>$fe->info['NumeroConsecutivo'],'succes'=>1]);
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
                        $salida['ERROR'] = 'Clave o PIN no Válidos';    
                    }
                }
                
            echo json_encode($salida);
            break;
            case 10: //LEER XML
                $salida = ['succed'=>1];
                if (!file_exists('./assets/xml/'.$id)) {
                    $salida = ['succed'=>0,'ERROR'=>'ARCHIVO NO VALIDO'];
                }else
                    loadXML_FILE($id,$salida);

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
                        $salida['ERROR'] = 'Clave o PIN no Válidos';    
                    }
                }
                echo json_encode($salida);
                break;
             case 12: //INTEGRACION XML GENERADO
                $salida = ['succed'=>1];
                if (!file_exists('./assets/xml/'.$_REQUEST['ruta'].'/'.$id.'.xml')) {
                    echo json_encode(['succed'=>0,'ERROR'=>'ARCHIVO NO VALIDO ']);
                }else{
                    $db = new DBClass();
                    $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$id.'.xml');
                    $nombresuc = $db->ejecutar('select if(pfisico = "",nombre,pfisico) from sucursales where id = '.$_REQUEST['sucursal']);

                    $tid = $id;
                    $nid = substr($id, 0,1);
                    $cliente = '';
                    $cedula = '';
                    $rxml = $fe->XMLtoArray($xml);
                    $tp = 'Factura';

                    if (is_array($rxml['FacturaElectronica']['Receptor']['Nombre']))
                        if(!sizeof($rxml['FacturaElectronica']['Receptor']['Nombre']))
                            $rxml['FacturaElectronica']['Receptor']['Nombre'] = '';
                         
                    switch($nid){
                        case 'F':
                        if (!strlen($rxml['FacturaElectronica']['Receptor']['Nombre'])) {
                            unset($rxml['FacturaElectronica']['Receptor']);
                            $fe->tdoc = 'TiqueteElectronico';
                            $fe->xmldoc = 'tiqueteElectronico';
                            $id = '!'.substr($id, 1,strlen($id));
                            $tp = 'Tiquete';
                        }else{
                            $cliente = $rxml['FacturaElectronica']['Receptor']['Nombre'];
                            $cedula  = $rxml['FacturaElectronica']['Receptor']['Identificacion']['Numero'];
                            $id = substr($id, 1,strlen($id));
                        }
                        break;
                        case 'C':
                            $cliente = $rxml['FacturaElectronica']['Receptor']['Nombre'];
                            $cedula  = $rxml['FacturaElectronica']['Receptor']['Identificacion']['Numero'];
                            $fe->tdoc = 'NotaCreditoElectronica';
                            $fe->xmldoc = 'notaCreditoElectronica';
                            $id = '-'.substr($id, 1,strlen($id));
                            $tp = 'Nota Crédito';
                        break;
                        case 'D':
                            $cliente = $rxml['FacturaElectronica']['Receptor']['Nombre'];
                            $cedula  = $rxml['FacturaElectronica']['Receptor']['Identificacion']['Numero'];
                            $fe->tdoc = 'NotaDebitoElectronica';
                            $fe->xmldoc = 'notaDebitoElectronica';
                            $id = '^'.substr($id, 1,strlen($id));
                            $tp = 'Nora Débito';
                        break;
                    }

                    $repetir = isset($_REQUEST['view']) ? 1 : 0;
                    $intsuc = $db->ejecutar('call fe_integracion("'.$id.'",'.$_SESSION['IMPRESA'].',curdate(),'.$repetir.')');

                    $intsuc = $intsuc->fetch_all()[0];
                    $_REQUEST['sucname'] = $intsuc[11];
                    
                    $fe->info['FechaEmision'] = $rxml['FacturaElectronica']['FechaEmision'];
                    $fe->info['Emisor']['Identificacion']['Tipo'] = $rxml['FacturaElectronica']['Emisor']['Identificacion']['Tipo'];
                    $fe->info['Emisor']['Identificacion']['Numero'] = $rxml['FacturaElectronica']['Emisor']['Identificacion']['Numero'];
                    $rxml['FacturaElectronica']['Clave'] = $intsuc[0];
                    $rxml['FacturaElectronica']['NumeroConsecutivo'] = substr($rxml['FacturaElectronica']['Clave'], 21,20);

                    $fe->info['NumeroConsecutivo'] = $rxml['FacturaElectronica']['NumeroConsecutivo'];
                    $fe->info['Clave'] = $rxml['FacturaElectronica']['Clave'];

                    $rxml['FacturaElectronica']['Emisor']['Nombre'] = $intsuc[1];
                    $rxml['FacturaElectronica']['Emisor']['Identificacion']['Tipo'] = $intsuc[2];
                    $rxml['FacturaElectronica']['Emisor']['Identificacion']['Numero'] = $intsuc[3];
                    $rxml['FacturaElectronica']['Emisor']['Ubicacion']['Barrio'] = $intsuc[4];
                    $rxml['FacturaElectronica']['Emisor']['Ubicacion']['Canton'] = $intsuc[5];
                    $rxml['FacturaElectronica']['Emisor']['Ubicacion']['Distrito'] = $intsuc[6];
                    $rxml['FacturaElectronica']['Emisor']['Ubicacion']['Provincia'] = $intsuc[7];

                    if ($intsuc[7] != '') {
                        $rxml['FacturaElectronica']['Emisor']['Telefono']['CodigoPais'] = $intsuc[8];
                        $rxml['FacturaElectronica']['Emisor']['Telefono']['NumTelefono'] = $intsuc[9];
                    }else{
                        unset($rxml['FacturaElectronica']['Emisor']['Telefono']);
                    }

                    $rxml['FacturaElectronica']['Emisor']['CorreoElectronico'] = $intsuc[10];

                    
                    $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?><'.$fe->tdoc.' xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/'.$fe->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />');
                    $fe->array_to_xml($rxml,$xml_data);

                    $xml = $xml_data->asXML();
                    $xml = str_replace('<FacturaElectronica>', '', $xml);
                    $xml = str_replace('</FacturaElectronica></'.$fe->tdoc.'>', '</'.$fe->tdoc.'>', $xml);

                    $delimiter = '#';
                    $startTag = '_';
                    $endTag = '_>';
                    $regex = $delimiter . preg_quote($startTag, $delimiter) 
                                        . '(.*?)' 
                                        . preg_quote($endTag, $delimiter) 
                                        . $delimiter 
                                        . 's';
                    $xml = preg_replace($regex,'>',$xml);

                    $fe->firmarXML($xml);
                    file_put_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml', $xml);
                    unlink('./assets/xml/'.$_REQUEST['ruta'].'/'.$tid.'.xml');

                    if (isset($_REQUEST['view'])) {
                        header("Content-type: text/xml; encoding='UTF-8'");
                        print_r($xml);
                    }else{
                        
                        $salida["Base"] = $db->ejecutar('insert into integraciones values(null,"'.$rxml['FacturaElectronica']['Clave'].'","../assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml","'.$tid.'",3,'.$_REQUEST['sucursal'].',"'.$cliente.'","'.$cedula.'",'.$rxml[$fe->tdoc]['ResumenFactura']['TotalComprobante'].')');
                        
                        $salida["Integracion"] = $fe->integracion($xml,$db,$_REQUEST['sucursal']);
                        if ($cliente) {
                            $cbody = $db->ejecutar("select concat('<b>Factura Electrónica N° ',".$fe->info['NumeroConsecutivo'].",'</b>','<br><br>Emisor: ',b.nombre,', ced.',b.cedula,'<br>Receptor: ',a.cliente,', ced.',a.cedula,'<br><br> <a href=\"https://fe.logintechcr.com/wsdlClient.php?ref=',hex(aes_encrypt(concat(".$fe->info['Clave'].",',',b.isPrueba,',',b.user_atv,',',b.pass_atv),'salvenawilly')),'\">Verificar Mensaje Hacienda</a>') from integraciones a join sucursales b on a.idsucursal = b.id where a.factura = '".$tid."'")->fetch_all()[0][0];

                            $salida["PDF"] = $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                            $salida["Mail"] = $fe->enviarCorreo($rxml['FacturaElectronica']['Receptor']['CorreoElectronico'],$tp." N° ".$fe->info['NumeroConsecutivo'],$cbody,[0=>'xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml',1=>'pdf/'.$tp.' N°'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf']);
                            unlink('./assets/pdf/'.$tp.' N°'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf');
                        }
                        
                        print_r($salida);
                    }
                    
                }
                
                break;
            case 13: //REFRESCAR TOKEN
                if (isset($_SESSION['IMPRESA']))
                    echo $fe->refresh();
                else
                    echo "NO HAY LOG IN";
                break;
            case 14: //NC INTEGRACION
                $salida = ['succed'=>1];
                $db = new DBClass();
                $exists = $db->ejecutar('SELECT count(id),substring(clave,22,20) as consecutivo,cliente from integraciones where factura = "'.$id.'"')->fetch_all()[0];
                $cliente = '';

                if($exists[0]){
                    $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$exists[1].'.xml');
                    $oxml = $xml;
                    $tipodoc = substr($exists[1], 8,2);
                    switch($tipodoc){
                        case '01':
                            $xml = str_replace('FacturaElectronica', 'NotaCreditoElectronica', $xml);
                            $xml = str_replace('facturaElectronica', 'notaCreditoElectronica', $xml);
                            $cliente = $exists[2];
                            $otit = 'FacturaElectronica';
                            break;
                        case '04':
                            $xml = str_replace('TiqueteElectronico', 'NotaCreditoElectronica', $xml);
                            $xml = str_replace('tiqueteElectronico', 'notaCreditoElectronica', $xml);
                            $otit = 'TiqueteElectronico';
                            break;
                        default:
                            break;
                    }
                    $fe->tdoc = 'NotaCreditoElectronica';
                    $fe->xmldoc = 'notaCreditoElectronica';
                    
                    $rxml = $fe->XMLtoArray($xml);
                    unset($rxml['NotaCreditoElectronica']['ds:Signature']);
                    $intsuc = $db->ejecutar('call fe_integracion("-'.$id.'",'.$_SESSION['IMPRESA'].',curdate(),0)')->fetch_all()[0];
                    $_REQUEST['sucname'] = $intsuc[1];
                    $rxml['NotaCreditoElectronica']['Clave'] = $intsuc[0];
                    $rxml['NotaCreditoElectronica']['NumeroConsecutivo'] = substr($intsuc[0], 21,20);
                    $fechaorig = $rxml['NotaCreditoElectronica']['FechaEmision'];
                    $rxml['NotaCreditoElectronica']['FechaEmision'] = date('Y-m-d\TH:i:s-06:00');

                    $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?><NotaCreditoElectronica xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/notaCreditoElectronica" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />');

                    $fe->array_to_xml($rxml,$xml_data);

                    $xml = $xml_data->asXML();
                    $xml = str_replace('<NotaCreditoElectronica>', '', $xml);
                    $xml = str_replace('</NotaCreditoElectronica></NotaCreditoElectronica>', '</NotaCreditoElectronica>', $xml);
                    $xml = str_replace('</ResumenFactura>','</ResumenFactura><InformacionReferencia><TipoDoc>'.$tipodoc.'</TipoDoc><Numero>'.$exists[1].'</Numero><FechaEmision>'.$fechaorig.'</FechaEmision><Codigo>01</Codigo><Razon>Factura anulada debido a: Monto Incorrecto</Razon></InformacionReferencia>',$xml);

                    $fe->info['FechaEmision'] = $rxml['NotaCreditoElectronica']['FechaEmision'];
                    $fe->info['Emisor']['Identificacion']['Tipo'] = $rxml['NotaCreditoElectronica']['Emisor']['Identificacion']['Tipo'];
                    $fe->info['Emisor']['Identificacion']['Numero'] = $rxml['NotaCreditoElectronica']['Emisor']['Identificacion']['Numero'];
                    $fe->info['NumeroConsecutivo'] = $rxml['NotaCreditoElectronica']['NumeroConsecutivo'];
                    $fe->info['Clave'] = $rxml['NotaCreditoElectronica']['Clave'];
                    $fe->firmarXML($xml);

                    file_put_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml', $xml);

                    $salida["Base"] = $db->ejecutar('insert into integraciones values(null,"'.$fe->info['Clave'].'","../assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml","'.$id.'",3,'.$_REQUEST['sucursal'].',"","",0)');
                    $salida["Integracion"] = $fe->integracion($xml,$db,$_REQUEST['sucursal']);

                    if ($cliente) {
                        $cbody = $db->ejecutar("select concat('<b>Nota Crédito Electrónica N° ',".$fe->info['NumeroConsecutivo'].",'</b>','<br><br>Emisor: ',b.nombre,', ced.',b.cedula,'<br>Receptor: ',a.cliente,', ced.',a.cedula,'<br><br> <a href=\"https://fe.logintechcr.com/wsdlClient.php?ref=',hex(aes_encrypt(concat(".$fe->info['Clave'].",',',b.isPrueba,',',b.user_atv,',',b.pass_atv),'salvenawilly')),'\">Verificar Mensaje Hacienda</a>') from integraciones a join sucursales b on a.idsucursal = b.id where a.factura = '".$id."'")->fetch_all()[0][0];

                        $fe->tdoc = $otit;
                        $salida["PDF"] = $fe->procesarPDF($oxml,$db,$_REQUEST['sucursal']);
                        $salida["Mail"] = $fe->enviarCorreo($rxml['NotaCreditoElectronica']['Receptor']['CorreoElectronico'],"Nota Crédito N° ".$fe->info['NumeroConsecutivo'],$cbody,[0=>'xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml',1=>'pdf/Factura N°'.$exists[1].', '.$_REQUEST['sucname'].'.pdf']);
                        unlink('./assets/pdf/Factura N°'.$exists[1].', '.$_REQUEST['sucname'].'.pdf');
                    }

                }else{
                    $salida = ['succed'=>0,'ERROR'=>'FACTURA NO EXISTENTE'];
                }
                echo json_encode($salida);
                break;
            case 15: //ENVIAR CORREO Integracion
                break;
            case 16: //OBTENER RESPUESTA HACIENDA Y GUARDAR EN ARCHIVO
                $salida = [];
                $xml = $fe->estado();
                if ($xml) {
                    $salida['succed'] = 1;
                    $salida['arhivo'] = "../assets/xml/".$fe->info['NumeroConsecutivo'].".xml";
                    $salida['mfile'] = file_put_contents("../assets/xml/RH_".$fe->info['NumeroConsecutivo'].", ".$_REQUEST['sucname'].".xml", $xml['xml']);
                }else
                    $salida['succed'] = 0;
                echo json_encode($salida);
                break;
            case 99: //
                break;
            default:
                echo json_encode(['ERROR'=>'Accion no Valida']);
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
        <link rel="stylesheet" type="text/css" href="assets/css/materialize.min.css?v=10.0.0.47">
        <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/jquery.dataTables.css?v=10.0.0.47">
        <link rel="stylesheet" type="text/css" href="assets/libs/DataTables/media/css/dataTables.responsive.css?v=10.0.0.47">
        <link rel="stylesheet" type="text/css" href="assets/css/modulos/style-menu.css?v=10.0.0.47">
        <link rel="stylesheet" type="text/css" href="assets/fonts/materialdesignicons/materialdesignicons.css?v=10.0.0.47">
        <link rel="stylesheet" type="text/css" href="assets/css/system.min.css?v=10.0.0.47">
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

        <script src="assets/js/jquery.js?v=10.0.0.47"></script>
        <script src="assets/js/jquery.mask.min.js?v=10.0.0.47"></script>
        <script src="assets/js/materialize.min.js?v=10.0.0.47"></script>
        <script src="assets/libs/charts/chart.js?v=10.0.0.47"></script>
        <script src="assets/libs/DataTables/media/js/jquery.dataTables.min.js?v=10.0.0.47"></script>
        <script src="assets/libs/DataTables/media/js/dataTables.responsive.min.js?v=10.0.0.47"></script>
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

    function loadXML_FILE($id,&$salida)
    {   
        $db = new DBClass();
        $inv_xml = simplexml_load_file('./assets/xml/'.$id);
        unlink('./assets/xml/'.$id);
        $sucursal = $db->ejecutar('call datosempresa('.$_SESSION['IMPRESA'].')')->fetch_all()[0];

        $salida['clave'] = (array) $inv_xml->Clave;
        
        if (!isset($inv_xml->Emisor->Identificacion->Numero)) {

            if (!isset($inv_xml->Mensaje)) {
                $salida = ['succed' => 0,'ERROR' => 'El Comprobante Electrónico no es Respuesta de Hacienda'];
                return false;
            }

            $inv_xml = (array) $inv_xml;

            if ($inv_xml['Mensaje'] == 3) {
                $salida = ['succed' => 0,'ERROR' => 'El Comprobante Electrónico no fue Aceptado'];
                return false;
            }

            if (substr($inv_xml['Clave'], 30,1) >= 5) {
                $salida = ['succed' => 0,'ERROR' => 'Comprobante no Válido'];
                return false;
            }

            if (strlen($inv_xml['Clave']) != 50){
                $salida = ['succed' => 0,'ERROR' => 'Clave no Válida'];
                return false;
            }

            $rs_compra = $db->ejecutar('call krattos("count(id),idestado",64,"id > 0 and idtipoventa = 2 and referencia = \"'.$inv_xml['Clave'].'\"")')->fetch_all()[0];

            if ($rs_compra[0] > 0) {
                $str = "";
                switch ($rs_compra[1]) {
                    case 5:
                        $str = "Aceptada";
                        break;
                    case 6:
                        $str = "Aceptada Parcial";
                        break;
                    case 7:
                        $str = "Rechazada";
                        break;
                    default:
                        break;
                }
                $salida = ['succed' => 0,'ERROR' => 'Factura '.$str];
                return false;
            }

            $scedula = $inv_xml['NumeroCedulaReceptor'];

            if ( strpos(trim(str_replace('-', '', $sucursal[1])), trim($scedula)) ) {
                $salida = ['succed' => 0,'ERROR' => 'Receptor Inválido'];
                return false;
            }

            $prov = $db->ejecutar('call krattos("id",2,"id > 0 and bisproveedor and idsucursal = '.$sucursal[9].' and replace(cedula,\"-\",\"\") = replace('.$inv_xml['NumeroCedulaEmisor'].',\"-\",\"\") ")')->fetch_all();

            if (isset($prov[0]))
                if(sizeof($prov[0]))
                    $prov = $prov[0][0][0];
            else
                $prov = 0;

            $salida = ['succed' => 2,'clave' => $inv_xml['Clave'],'emisor' => $inv_xml['NombreEmisor'],'cedula'=>$inv_xml['NumeroCedulaEmisor'],'impuesto'=>$inv_xml['MontoTotalImpuesto'],'total'=>$inv_xml['TotalFactura'],'idprov'=>$prov];
            return false;
        }

        $salida['clave'] = $salida['clave'][0];

        // if ($salida['clave'] != $_GET['hclave']) {
        //     $salida = ['succed' => 0,'ERROR' => 'Documento no es el Mismo al Mensaje de Hacienda'];
        //     return false;
        // }

        if (strlen($salida['clave']) != 50){
            $salida = ['succed' => 0,'ERROR' => 'Clave no Válida'];
            return false;
        }
        
        $rs_compra = $db->ejecutar('call krattos("count(id),idestado",64,"id > 0 and idtipoventa = 2 and referencia = \"'.$salida['clave'].'\"")')->fetch_all()[0];

        
        if ($rs_compra[0] > 0) {
            $str = "";
            switch ($rs_compra[1]) {
                case 5:
                    $str = "Aceptada";
                    break;
                case 6:
                    $str = "Aceptada Parcial";
                    break;
                case 7:
                    $str = "Rechazada";
                    break;
                default:
                    break;
            }
            $salida = ['succed' => 0,'ERROR' => 'Factura '.$str];
            return false;
        }

        $salida['emisor']['cedula'] = (array) $inv_xml->Emisor->Identificacion->Numero;
        $salida['emisor']['cedula'] = $salida['emisor']['cedula'][0];
        if (trim($salida['emisor']['cedula']) != trim(substr($salida['clave'], 9,12))) {
            $salida = ['succed' => 0,'ERROR' => 'Cédula no Válida'];
            return false;
        }

        $scedula = isset($inv_xml->Receptor->Identificacion->Numero) ? (array) $inv_xml->Receptor->Identificacion->Numero : 0;
        $scedula = isset($scedula[0]) ? $scedula[0] : 0;

        if (strpos(trim(str_replace('-', '', $sucursal[1])), trim($scedula))) {
            $salida = ['succed' => 0,'ERROR' => 'Receptor Inválido'];
            return false;
        }

        $salida['emisor']['nombre'] = (array) $inv_xml->Emisor->Nombre;
        $salida['emisor']['nombre'] = $salida['emisor']['nombre'][0];

        $prov = $db->ejecutar('call krattos("id",2,"id > 0 and bisproveedor and idsucursal = '.$sucursal[9].' and replace(cedula,\"-\",\"\") = replace('.$salida['emisor']['cedula'].',\"-\",\"\") ")')->fetch_all();
        
        if(!sizeof($prov)){

            $salida['emisor']['tipo']       = (array) $inv_xml->Emisor->Identificacion->Tipo;
            $salida['emisor']['tipo']       = $salida['emisor']['tipo'][0];

            $salida['emisor']['ap1'] = '';
            $salida['emisor']['ap2'] = '';

            $salida['emisor']['barrio']     = isset($inv_xml->Emisor->Ubicacion->Barrio) ? (array) $inv_xml->Emisor->Ubicacion->Barrio : 0;
            $salida['emisor']['barrio'] = $salida['emisor']['barrio'] == 0 ? $salida['emisor']['barrio'] : $salida['emisor']['barrio'][0];

            $salida['emisor']['distrito']   = isset($inv_xml->Emisor->Ubicacion->Distrito) ? (array) $inv_xml->Emisor->Ubicacion->Distrito : 0;
            $salida['emisor']['distrito'] = $salida['emisor']['distrito'] == 0 ? $salida['emisor']['distrito'] : $salida['emisor']['distrito'][0];

            $salida['emisor']['canton']     = isset($inv_xml->Emisor->Ubicacion->Canton) ? (array) $inv_xml->Emisor->Ubicacion->Canton : 0;
            $salida['emisor']['canton']  = $salida['emisor']['canton']  == 0 ? $salida['emisor']['canton']  : $salida['emisor']['canton'] [0];

            $salida['emisor']['provincia']  = isset($inv_xml->Emisor->Ubicacion->Provincia) ? (array) $inv_xml->Emisor->Ubicacion->Provincia : 0;
            $salida['emisor']['provincia'] = $salida['emisor']['provincia'] == 0 ? $salida['emisor']['provincia'] : $salida['emisor']['provincia'][0];

            $salida['emisor']['otrassenas'] = isset($inv_xml->Emisor->Ubicacion->OtrasSenas) ? (array) $inv_xml->Emisor->Ubicacion->OtrasSenas : 0;
            $salida['emisor']['otrassenas'] = $salida['emisor']['otrassenas'] == 0 ? $salida['emisor']['otrassenas'] : $salida['emisor']['otrassenas'][0];

            $salida['emisor']['correo']     = isset($inv_xml->Emisor->CorreoElectronico) ? (array) $inv_xml->Emisor->CorreoElectronico : 0;
            $salida['emisor']['correo'] = $salida['emisor']['correo'] == 0 ? $salida['emisor']['correo'] : $salida['emisor']['correo'][0];

            $salida['emisor']['telefono']   = isset($inv_xml->Emisor->Telefono->NumTelefono) ? (array) $inv_xml->Emisor->Telefono->NumTelefono : 0;
            $salida['emisor']['telefono'] = $salida['emisor']['telefono'] == 0 ? $salida['emisor']['telefono'] : $salida['emisor']['telefono'][0];

            $salida['emisor']['pais']       = isset($inv_xml->Emisor->Telefono->CodigoPais) ? (array) $inv_xml->Emisor->Telefono->CodigoPais : 0;
            $salida['emisor']['pais'] = $salida['emisor']['pais'] == 0 ? $salida['emisor']['pais'] : $salida['emisor']['pais'][0];

            $salida['emisor']['id']         = 0;
        }else{
            $salida['emisor']['correo']     = isset($inv_xml->Emisor->CorreoElectronico) ? (array) $inv_xml->Emisor->CorreoElectronico : 0;
            $salida['emisor']['correo'] = $salida['emisor']['correo'] == 0 ? $salida['emisor']['correo'] : $salida['emisor']['correo'][0];
            $salida['emisor']['id']         = $prov[0][0];
        }
        
        $fecha = (array) $inv_xml->FechaEmision;
        $fecha = $fecha[0];
        if (strpos($fecha, '.')) {
            $fecha = substr($fecha, 0,strpos($fecha, '.'));
        }
        $fecha = strlen($fecha) > 19 ? strtotime(substr(str_replace('T', ' ', $fecha),0,-6)) : strtotime(str_replace('T', ' ', $fecha));
        $fechasistema =  date('Y/m/d H:i:s',$fecha);
        $fecha = date('d/m/Y H:i:s',$fecha);
        $salida['factura']['fecha']     = $fecha;
        $salida['factura']['fsistema']  = $fechasistema;
        $salida['factura']['tipoventa'] = (array) $inv_xml->CondicionVenta;
        $salida['factura']['tipoventa'] = $salida['factura']['tipoventa'][0];
        $salida['factura']['plazo']     = isset($inv_xml->PlazoCredito) ? (array) $inv_xml->PlazoCredito : 0;
        $salida['factura']['plazo']     = !$salida['factura']['plazo'] || !sizeof($salida['factura']['plazo'])? 0 : $salida['factura']['plazo'][0];
        preg_match_all('!\d+!', $salida['factura']['plazo'], $matches);
        $salida['factura']['plazo']     = sizeof($matches[0]) ? $matches[0][0] : 0;
        $salida['factura']['tipopago']  = (array) $inv_xml->MedioPago;
        $salida['factura']['tipopago']  = isset($salida['factura']['tipopago'][0]) ? $salida['factura']['tipopago'][0] : 1;

        $salida['factura']['moneda']    = (array) $inv_xml->ResumenFactura->CodigoMoneda;
        $salida['factura']['moneda']    = isset($salida['factura']['moneda'][0]) ? $salida['factura']['moneda'][0] : 'CRC';
        $salida['factura']['divisa']    = (array) $inv_xml->ResumenFactura->TipoCambio;
        $salida['factura']['divisa']    = isset($salida['factura']['divisa'][0]) ? $salida['factura']['divisa'][0] : 0;
        $salida['factura']['divisa']    = $salida['factura']['divisa'] == 0 ? 1 : $salida['factura']['divisa'];

        $salida['factura']['subtotal']  = (array) $inv_xml->ResumenFactura->TotalGravado;
        $salida['factura']['subtotal']  = isset($salida['factura']['subtotal'][0]) ? $salida['factura']['subtotal'][0] : 0;
        $salida['factura']['exento']    = (array) $inv_xml->ResumenFactura->TotalExento;
        $salida['factura']['exento']    = isset($salida['factura']['exento'][0]) ? $salida['factura']['exento'][0] : 0;
        $salida['factura']['descuento'] = (array) $inv_xml->ResumenFactura->TotalDescuentos;
        $salida['factura']['descuento'] = isset($salida['factura']['descuento'][0]) ? $salida['factura']['descuento'][0]: 0;
        $salida['factura']['impuesto']  = (array) $inv_xml->ResumenFactura->TotalImpuesto;
        $salida['factura']['impuesto']  = isset($salida['factura']['impuesto'][0]) ? $salida['factura']['impuesto'][0] : 0;

        $ciclo = (array) $inv_xml->DetalleServicio;
        
        if (!isset($ciclo['LineaDetalle']->NumeroLinea)) {
            $ciclo = $ciclo['LineaDetalle'];
        }

        $salida['detalle'] = [];

        foreach ($ciclo as $key) {
            $vunidad = (array)$key->UnidadMedida;
            $vunidad = $vunidad[0] == 'Otros' ? (array)$key->UnidadMedidaComercial : (array)$key->UnidadMedida;
            $vunidad = isset($vunidad[0]) ? $vunidad[0] : 1 ;
            $vunidad = $vunidad == 0 ? 1 : $vunidad;
            $cunidad = $db->ejecutar('call krattos("if(count(id),id,0)",107,"id > 0 and simbolo = \"'.$vunidad.'\" ")')->fetch_all();

            $num = (array)$key->NumeroLinea;
            $dcodigo = (array)$key->Codigo->Codigo;
            $dcodigo = isset($dcodigo[0]) ? $dcodigo[0] : '';
            if ($vunidad != 'Sp') {
                $detid = $db->ejecutar('call krattos("idproducto",104,"id > 0 and codigo = \"'.$dcodigo.'\" and idproveedor = '.$salida['emisor']['id'].'")');
                $detid = isset($detid->num_rows) ? $detid->num_rows > 0 ? $detid->fetch_all()[0][0] : 0: 0;
            }else{
                $detid = 0;
            }
            
            $dcantidad = (array)$key->Cantidad;
            $ddetalle = (array)$key->Detalle;
            $dunitario = (array)$key->PrecioUnitario;
            $dsubtotal = (array)$key->SubTotal;
            $ddescuento = isset($key->MontoDescuento) ? (array)$key->MontoDescuento : 0;
            $ddescuento = $ddescuento == 0 ? $ddescuento : $ddescuento[0];
            $dimpuesto = isset($key->Impuesto->Monto) ? (array)$key->Impuesto->Monto : 0;
            $dimpuesto = $dimpuesto == 0 ? $dimpuesto : $dimpuesto[0];

            $detarray = ['numero' => $num[0],
            'codigo' => $dcodigo,
            'cantidad' => $dcantidad[0], 
            'unidad' => $vunidad, 'idunidad' => $cunidad[0],
             'detalle' => $ddetalle[0],
              'precio' => $dsubtotal[0], 'descuento' => $ddescuento, 'impuesto' => $dimpuesto,
              'unitario' => $dunitario[0],'idproducto'=>$detid];
            array_push($salida['detalle'], $detarray);
        }
    }

    class facturaElectronica
    {
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
        var $exo = 0;
        var $idtabla = 64;
        var $titulo = 'Factura';

        function __construct($vid){
            $this->id = $vid;
            $this->info = $this->getJSON('call fe_getencabezado("'.$this->id.'")');
            $this->opcion = isset($this->info['NumeroConsecutivo']) ? substr($this->info['NumeroConsecutivo'],9,1) : 0;
            if ($vid != "0") {
                switch ($this->opcion) {
                case 2: //NOTA DE DEITO
                    $this->tdoc = 'NotaDebitoElectronica';
                    $this->xmldoc = 'notaDebitoElectronica';
                    $this->ref = 1;
                    $this->idtabla = 301;
                    $titulo = 'Nota Debito';

                    break;
                case 3: //NOTA DE CREDITO
                    $this->tdoc = 'NotaCreditoElectronica';
                    $this->xmldoc = 'notaCreditoElectronica';
                    $this->ref = 1;
                    $this->idtabla = 301;
                    $titulo = 'Nota Credito';
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
                    $titulo = 'Aceptacion';
                    break;
                case 8: //COMPRA ELECTTRONICA
                    $this->tdoc = 'FacturaElectronicaCompra';
                    $this->xmldoc = 'facturaElectronicaCompra';
                    $titulo = 'Compra';
                    break;
                case 9: //EXPORTACION ELECTTRONICA
                    $this->tdoc = 'FacturaElectronicaExportacion';
                    $this->xmldoc = 'facturaElectronicaExportacion';
                    $titulo = 'Exportacion';
                    break;
                default: //FACTRA ELECTRONICA
                    break;
                }
            }

            if(isset($_REQUEST['accion']))
                if ($_REQUEST['accion'] == 12 || $_REQUEST['accion'] == 14) 
                    $_SESSION['IMPRESA'] = $_REQUEST['sucursal'];

            if ($vid != '') {
                $db = new DBClass();
                if (!isset($_SESSION['IMPRESA']))
                    session_start();
                if (!isset($_REQUEST['accion']))
                    $this->preUbicacion = '../';
                
                session_write_close();
                $this->credenciales = $db->ejecutar('call fe_getCredentials('.$_SESSION['IMPRESA'].')')->fetch_all()[0];
            }
            
        }

        function getBearer(){

            set_error_handler("warning_handler", E_WARNING);
            $fP = fSockOpen("ssl://google.com", 443, $errno, $errstr, 10);
            if (!$fP) { return json_encode(["rs"=>'Sin Internet',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']]); }

            $fP = fSockOpen("ssl://idp.comprobanteselectronicos.go.cr", 443, $errno, $errstr, 10);
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
            curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

            $params = array(
              "client_id" => $cli_id,
              "client_secret" => "",
              "scope" => "",
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

            $fP = fSockOpen("ssl://idp.comprobanteselectronicos.go.cr", 443, $errno, $errstr, 10);
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
                    $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/comprobantes/?emisor=".$emisor."&offset=".$offset."&limit=".$limit.$receptor);
                else
                    $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/comprobantes/".$this->info['Clave']);
            }else{
                if ($id == 0) 
                    $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/comprobantes/?emisor=".$emisor."&offset=".$offset."&limit=".$limit.$receptor);
                else
                    $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/comprobantes/".$this->info['Clave']);
            }
            
            
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/x-www-form-urlencoded','Authorization: bearer '.$this->bearer]);

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
                    $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
            else
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/recepcion");
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
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
            else
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/recepcion");
            
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

            switch ($status) {
                case 0:
                    $json_response = ["rs"=>'Superó Tiempo de Espera',"erno"=>1,'clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo']];
                    break;
                case 201:
                case 202:
                case 100:
                    $json_response = ['rs'=>'Documento Electronico Aprobado','clave'=>$this->info['Clave'],'num'=>$this->info['NumeroConsecutivo'],'succes'=>1];
                    break;
                case 400:
                    $rs = substr($rs, strpos($rs, 'X-Error-Cause')+14);
                    $rs = substr($rs, 0, strpos($rs,'X-')-3);

                    if(strpos($rs, 'recibido anteriormente') >= 0){
                        $db = new DBClass();
                        $act = $db->ejecutar('call shadow(2,'.$this->idtabla.',"feestado = 2,mailstatus=0","id = '.$this->id.'")')->fetch_all();
                    }

                    $json_response = ['rs'=>'Error '.$this->tdoc.': '.$this->id.', '.$rs,'succes'=>0,'erno'=>2,'id'=>$this->id,'actualizacion' => $act];
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

        function estado()
        {
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return ['factura'=>$this->id,'estado'=>'Sin Internet','rs'=>$doBearer];

            if ($this->bearer == '')
               return 'Problemas con la Llave Criptográfica';

            if (isset($_REQUEST['clave'])) {
                $clave = $_REQUEST['clave'];
            }else
                $clave = $this->info['Clave'];

            if ($this->credenciales[2] == 1) 
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion/".$clave);
            else
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/recepcion/".$clave);

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
                            $sRespuesta = str_replace($sError, $aError[4], $sRespuesta);
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

                $data['DetalleServicio'] = $this->getDetalle('call fe_getDetalle("'.$this->id.'")');
                $data['ResumenFactura'] = $this->getJSON('call fe_getResumen("'.$this->id.'")');

                $tdetalle = isset($data['DetalleServicio']) ? sizeof($data['DetalleServicio']) : 0;
                if (!$tdetalle && $this->opcion < 5) 
                    return ['error'=>'No hay Detalle'];

                $data['ResumenFactura']['TotalImpuesto'] = str_replace(',', '', number_format($this->sumaimpuestos,5));
                
                $data['ResumenFactura']['TotalComprobante'] = str_replace(',', '', number_format($data['ResumenFactura']['TotalComprobante'] + $this->sumaimpuestos,5));
                if (round($this->sumadescuentos - $data['ResumenFactura']['TotalDescuentos'],5) != 0) 
                     return ['error'=>'Descuentos Difieren'];

                if (round($data['ResumenFactura']['TotalGravado']+$data['ResumenFactura']['TotalExento']) != round($data['ResumenFactura']['TotalVenta'])) 
                     return ['error'=>'Inconsistencia en Precios, '.($data['ResumenFactura']['TotalGravado']+$data['ResumenFactura']['TotalExento'])." - ".$data['ResumenFactura']['TotalVenta']];

                if ($this->ref) {
                    $refxml = $this->getJSON('call fe_getReferencia('.substr($this->id, 1).')');
                    $data['InformacionReferencia'] = $refxml;
                }

                $data['Normativa'] = ['NumeroResolucion' => 'DGT-R-48-2016', 'FechaResolucion' => '07-10-2016 08:00:00'];
                // $data['Otros'] = ['OtroTexto' => '','OtroContenido' => ''];
            }

            if (!isset($this->info['Emisor']['CorreoElectronico'])) {
               return ['error'=>'Emisor sin Correo'];
            }

            if (isset($this->info['Receptor']['Identificacion']['Tipo'])) {

                if(isset($this->info['Receptor']['Telefono']['NumTelefono'])){
                    if (!is_numeric($this->info['Receptor']['Telefono']['NumTelefono'])) {
                        return ['error' => 'Telefono no Valido'];
                    }

                    if (strlen($this->info['Receptor']['Telefono']['NumTelefono']) != 8) {
                        return ['error' => 'Telefono no Valido'];
                    }
                }

                switch ($this->info['Receptor']['Identificacion']['Tipo']) {
                    case '01':
                        if (strlen($this->info['Receptor']['Identificacion']['Numero']) != 9)
                            return ['error' => 'Formato Cédula no Valido'];
                        break;
                    case '02':
                        if (strlen($this->info['Receptor']['Identificacion']['Numero']) != 10)
                            return ['error' => 'Formato Cédula no Valido'];
                        break;
                    default :
                        $tmcedula = strlen($this->info['Receptor']['Identificacion']['Numero']);
                        if ( $tmcedula != 10)
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

            if ($this->sumaimpuestos == 0 and $this->exo) {
                $data['ResumenFactura']['TotalServExentos'] += $data['ResumenFactura']['TotalServGravados'];
                $data['ResumenFactura']['TotalMercanciasExentas'] += $data['ResumenFactura']['TotalMercanciasGravadas'];
                $data['ResumenFactura']['TotalExento'] += $data['ResumenFactura']['TotalGravado'];

                $data['ResumenFactura']['TotalGravado'] = str_replace(',', '', number_format(0,5));
                $data['ResumenFactura']['TotalMercanciasGravadas'] = str_replace(',', '', number_format(0,5));
                $data['ResumenFactura']['TotalServGravados'] = str_replace(',', '', number_format(0,5));

                $data['ResumenFactura']['TotalExento'] = str_replace(',', '', number_format($data['ResumenFactura']['TotalExento'],5));
                $data['ResumenFactura']['TotalMercanciasExentas'] = str_replace(',', '', number_format($data['ResumenFactura']['TotalMercanciasExentas'],5));
                $data['ResumenFactura']['TotalServExentos'] = str_replace(',', '', number_format($data['ResumenFactura']['TotalServExentos'],5));
            }

            $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
            <'.$this->tdoc.' xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/'.$this->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />');
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
                    }else
                        $xml_data->addChild("$key",htmlspecialchars("$value"));
                }
             }
        }

        function getDetalle($query)
        {
            $db = new DBClass();
            $rs = $db->ejecutar($query);

            if (isset($rs->num_rows)) {
                $entrada = [];
                $entrada = $rs->fetch_all();
                $linea = $detalle = [];
                $fila = $iddetalle = 0;
                $globalmexo = $entrada[0][20];

                foreach ($entrada as $value) { 
                    if ($iddetalle != $value[0]) {
                        $fila++;
                        $iddetalle = $value[0];
                        $detalle = [];
                        $detalle['NumeroLinea'] = $fila;
                        $codigo = ['Tipo'=>$value[1],'Codigo'=>$value[2]];
                        $detalle['Codigo'] = $codigo;
                        $detalle['Cantidad'] = $value[3];
                        $detalle['UnidadMedida'] = $value[4];
                        $detalle['UnidadMedidaComercial'] = $value[5];
                        $detalle['Detalle'] = $value[6];
                        $detalle['PrecioUnitario'] = $value[7];
                        $detalle['MontoTotal'] = $value[8];
                        if ($value[9] > 0) {
                            $this->sumadescuentos += $value[9];
                            $detalle['MontoDescuento'] = $value[9];
                            $detalle['NaturalezaDescuento'] = $value[10];
                        }
                        $detalle['SubTotal'] = $value[11];
                        $exoneracion = ['TipoDocumento' => $value[16], 'NumeroDocumento' => $value[17], 'NombreInstitucion' => $value[18],'FechaEmision' => $value[19], 'MontoImpuesto' =>$value[20], 'PorcentajeCompra' => $value[21]];
                        $sum_imp = 0;
                        if ($value[12] != '') {
                            
                            $array_impuestos = explode(']', $value[12]);
                            
                            foreach ($array_impuestos as $obj) {
                                $sub_array = explode(',', $obj);
                                if (strlen($sub_array[0])) {
                                    
                                    $impuesto = ['Codigo'=>str_pad($sub_array[0], 2,0,STR_PAD_LEFT),'Tarifa'=>$sub_array[1],'Monto'=>$sub_array[2]];

                                    if ($value[16] != ''){
                                        $this->exo = 1;
                                        $impuesto['Exoneracion'] = $exoneracion;
                                        if ($exoneracion['MontoImpuesto']  > 0 && $globalmexo) { //POR MONTO

                                            if ($globalmexo >= $sub_array[2]) {
                                                $sub_array[2] = 0;
                                                $globalmexo -= $sub_array[2];
                                            }else{
                                                $sub_array[2] = $sub_array[2] - $globalmexo;
                                                $globalmexo = 0;    
                                            }                                            
                                        }else{ //POR PORCENTAJE
                                            $sub_array[2] = $sub_array[2]*(1-$exoneracion['PorcentajeCompra']/100);
                                        }
                                        $this->sumaimpuestos += $sub_array[2];
                                        $sum_imp += $sub_array[2];
                                        $impuesto['Monto'] = $sub_array[2];
                                        $impuesto['Tarifa'] = str_replace(',','',ceil(number_format(($sub_array[2]/$value[8])*100)));
                                    }else{
                                        $this->sumaimpuestos += $sub_array[2];
                                        $sum_imp += $sub_array[2];
                                    }

                                    array_push($detalle, ['Impuesto' => $impuesto]);
                                }
                            }
                        }
                        
                        $detalle['MontoTotalLinea'] = $value[15] + $sum_imp;
                        array_push($linea, ['LineaDetalle'=>$detalle]);
                    }
                    
                }
                $detserv = $linea;
                $salida = $detserv;

                return $salida;
            }else{
                return $rs;
            }
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


        public function random() {
            if (function_exists('random_int')) {
              return random_int(0x10000000, 0x7FFFFFFF);
            } else {
              return rand(100000, 999999);
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
                "url"       => "https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4/Resolucion%20Comprobantes%20Electronicos%20%20DGT-R-48-2016.pdf",
                "digest"    =>  $digest //digest en sha1 y base64
            );

            openssl_pkcs12_read(file_get_contents($this->preUbicacion.$this->credenciales[0]), $certs, $this->credenciales[1]);
            $publicKey    =$certs["cert"];
            $privateKey   =$certs["pkey"];
            $complem = openssl_pkey_get_details(openssl_pkey_get_private($privateKey));
            $Modulus = base64_encode($complem['rsa']['n']);
            $Exponent= base64_encode($complem['rsa']['e']);

            $signPolicy       = $POLITICA_FIRMA;
            $signatureID      = "Signature-".$this->random();
            $signatureValue   = "SignatureValue-".$this->random();
            $XadesObjectId    = "XadesObjectId-".$this->random();
            $KeyInfoId        = "KeyInfoId-".$signatureID;
            
            $Reference0Id     = "Reference-".$this->random();
            $Reference1Id     = "ReferenceKeyInfo";
            
            $SignedProperties = "SignedProperties-".$signatureID; 

            $xmlns_keyinfo='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/'.$this->xmldoc.'" '.
             'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
             'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
             'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
             
            $xmnls_signedprops='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/'.$this->xmldoc.'" '.
            'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
            'xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" '.
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';

            
            $xmnls_signeg='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/'.$this->xmldoc.'" '.
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
                $linea['2'] = isset($_xml[$this->tdoc]['MedioPago']) ? $_xml[$this->tdoc]['MedioPago'] == '01' ? 'Efectivo' : 'Tarjeta' : 'N/A';
                $linea['3'] = substr($_xml[$this->tdoc]['FechaEmision'], 0,10);
                if (isset($_xml[$this->tdoc]['Receptor'])) {
                    $linea['4'] = $_xml[$this->tdoc]['Receptor']['Nombre'];
                    $linea['34'] = $_xml[$this->tdoc]['Receptor']['Identificacion']['Numero'];
                }else{
                    $linea['4'] = '';
                    $linea['34'] = '';
                }    
                
                $linea['5'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalImpuesto'],2);
                $linea['6'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalDescuentos'],2);
                $linea['7'] = 0;
                $linea['8'] = 0;
                $linea['9'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalGravado'],2);
                $linea['10'] = number_format($_xml[$this->tdoc]['ResumenFactura']['TotalComprobante'],2);
                $linea['11'] = $_xml[$this->tdoc]['CondicionVenta'] == '01' ? 0 : $_xml[$this->tdoc]['PlazoCredito'];
                $linea['12'] = '';
                $linea['13'] = '';
                $linea['14'] = $_xml[$this->tdoc]['ResumenFactura']['CodigoMoneda'];
                $linea['15'] = $_xml[$this->tdoc]['ResumenFactura']['CodigoMoneda'] == 'CRC' ? '¢' : '$';
                $linea['16'] = '';
                $linea['17'] = $_REQUEST['sucname'];
                $linea['18'] = $obj['Cantidad'];
                $linea['19'] = $obj['Detalle'];
                $linea['20'] = number_format($obj['PrecioUnitario'],2);
                $linea['21'] = isset($obj['MontoDescuento']) ? $obj['MontoDescuento'] : 0;
                $linea['22'] = number_format($obj['SubTotal'],2);
                $linea['23'] = isset($obj['UnidadMedidaComercial']) ? $obj['UnidadMedidaComercial'] : $obj['UnidadMedida'];

                if (isset($_xml[$this->tdoc]['Receptor'])) {
                    $linea['24'] = '1';
                    $linea['25'] = 'Venta';
                    $linea['30'] = 'Cliente';
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
                $linea['33'] = ''; //EXONERACION
                $linea['35'] = '';
                $linea['36'] = isset($obj['Codigo']) ? $obj['Codigo']['Codigo'] : '';

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

            $cnf = $db->ejecutar("call krattos('',73,".$id.")")->fetch_all()[0];
            $num = $this->info['NumeroConsecutivo'];
            $tit = $this->titulo;

            $url2 = $vurl;
            $_POST['con_con'] = 1;
            $_POST['accion'] = 3;
            $_POST['body'] = $cnf[0];
            $_POST['idfila'] = $id;
            $_POST['subject'] = $cnf[3]." N° ".$num;
            $_POST['to'] = $to;
            $_POST['idtabla'] = $this->idtabla;
            if(!$mh){
                $_POST['adjunto'] = [0=>'xml/'.$tit.' N°'.$num.', '.$_SESSION['EMPRESA'].'.xml',1=>'pdf/'.$tit.' N°'.$num.', '.$_SESSION['EMPRESA'].'.pdf'];

                //MAKE ARCHIVOS
                //PDF
                $_arreglo = ['arch'=>'recibo','id'=>$id,"mic"=>1,"tit"=>$tit ,"sel"=>'',"tbl"=>72,"where"=>$id,"empresaid"=>$_SESSION['IMPRESA']];

                $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                $actual_link = str_replace('wsdlClient.php','/dashboard/login', $actual_link);
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
                print_r($json_response);

                //XML
                $_arreglo = ['id'=>$id,"factura"=>$num,"sucursal"=>$_SESSION['EMPRESA'],"empresaid"=>$_SESSION['IMPRESA']];

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