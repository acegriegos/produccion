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
                }else{
                    $fe = new facturaElectronica(0);
                    $db = new DBClass();
                    $xml = file_get_contents('./assets/xml/'.$id);
                    $fe->loadXML_FILE($xml,$salida,$db,$_REQUEST['ced']);
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
                        $salida['ERROR'] = 'Clave o PIN no Válidos';    
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
                         
                    switch($nid){
                        case 'T':
                            unset($rxml[$tiqueta]['Receptor']);
                            $fe->tdoc = 'TiqueteElectronico';
                            $fe->xmldoc = 'tiqueteElectronico';
                            $id = '!'.substr($id, 1,strlen($id));
                            $tp = 'Tiquete';
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
                            $intpdf = 0;
                            break;
                        case 'D':
                            if(isset($rxml[$tiqueta]['Receptor']['Identificacion']['Numero'])){
                                $cliente = $rxml[$tiqueta]['Receptor']['Nombre'];
                                $cedula  = $rxml[$tiqueta]['Receptor']['Identificacion']['Numero'];
                            }
                            $fe->tdoc = 'NotaDebitoElectronica';
                            $fe->xmldoc = 'notaDebitoElectronica';
                            $id = '^'.substr($id, 1,strlen($id));
                            $tp = 'Nora Débito';
                            $intpdf = 0;
                            break;
                    }

                    $repetir = isset($_REQUEST['view']) ? 1 : 0;
                    $intsuc = $db->ejecutar('call fe_integracion("'.$id.'",'.$_SESSION['IMPRESA'].',curdate(),'.$repetir.')');

                    $intsuc = $intsuc->fetch_all()[0];
                    $_REQUEST['sucname'] = $intsuc[11];
                    
                    $fe->info['FechaEmision'] = $rxml[$tiqueta]['FechaEmision'];
                    $fe->info['Emisor']['Identificacion']['Tipo'] = $rxml[$tiqueta]['Emisor']['Identificacion']['Tipo'];
                    $fe->info['Emisor']['Identificacion']['Numero'] = $rxml[$tiqueta]['Emisor']['Identificacion']['Numero'];
                    $rxml[$tiqueta]['Clave'] = $intsuc[0];
                    $rxml[$tiqueta]['CodigoActividad'] = $intsuc[12];
                    $rxml[$tiqueta]['NumeroConsecutivo'] = substr($rxml[$tiqueta]['Clave'], 21,20);

                    $fe->info['NumeroConsecutivo'] = $rxml[$tiqueta]['NumeroConsecutivo'];
                    $fe->info['Clave'] = $rxml[$tiqueta]['Clave'];

                    $rxml[$tiqueta]['Emisor']['Nombre'] = $intsuc[1];
                    $rxml[$tiqueta]['Emisor']['Identificacion']['Tipo'] = $intsuc[2];
                    $rxml[$tiqueta]['Emisor']['Identificacion']['Numero'] = $intsuc[3];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Barrio'] = $intsuc[4];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Canton'] = $intsuc[5];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Distrito'] = $intsuc[6];
                    $rxml[$tiqueta]['Emisor']['Ubicacion']['Provincia'] = $intsuc[7];

                    if ($intsuc[7] != '') {
                        $rxml[$tiqueta]['Emisor']['Telefono']['CodigoPais'] = $intsuc[8];
                        $rxml[$tiqueta]['Emisor']['Telefono']['NumTelefono'] = $intsuc[9];
                    }else{
                        unset($rxml[$tiqueta]['Emisor']['Telefono']);
                    }

                    $rxml[$tiqueta]['Emisor']['CorreoElectronico'] = $intsuc[10];

                    
                    $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
                    <'.$fe->tdoc.' xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$fe->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$fe->xmldoc.' https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.3/'.$fe->xmldoc.'" />');
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
                    //unlink('C:/FACTURA_XML/'.$tid.'.xml');

                    if (isset($_REQUEST['view'])) {
                        header("Content-type: text/xml; encoding='UTF-8'");
                        print_r($xml);
                    }else{
                        
                        $salida["Base"] = $db->ejecutar('insert into integraciones values(null,"'.$rxml[$tiqueta]['Clave'].'","../assets/xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml","'.$tid.'",3,'.$_REQUEST['sucursal'].',"'.$cliente.'","'.$cedula.'",'.$rxml[$tiqueta]['ResumenFactura']['TotalComprobante'].')')    ;
                        
                        $salida["Integracion"] = $fe->integracion($xml,$db,$_REQUEST['sucursal']);
                        if ($cliente) {
                            $cbody = $db->ejecutar("select concat('<b>Factura Electrónica N° ',".$fe->info['NumeroConsecutivo'].",'</b>','<br><br>Emisor: ',b.nombre,', ced.',b.cedula,'<br>Receptor: ',a.cliente,', ced.',a.cedula,'<br><br> <a href=\"https://fe.logintechcr.com/wsdlClient.php?ref=',hex(aes_encrypt(concat(".$fe->info['Clave'].",',',b.isPrueba,',',b.user_atv,',',b.pass_atv),'salvenawilly')),'\">Verificar Mensaje Hacienda</a>') from integraciones a join sucursales b on a.idsucursal = b.id where a.factura = '".$tid."'")->fetch_all()[0][0];
                            if($intpdf){
                                $salida["PDF"] = $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                                $salida["Mail"] = $fe->enviarCorreo($rxml[$tiqueta]['Receptor']['CorreoElectronico'],$tp." N° ".$fe->info['NumeroConsecutivo'],$cbody,[0=>'xml/'.$_REQUEST['ruta'].'/'.$fe->info['NumeroConsecutivo'].'.xml',1=>'pdf/'.$tp.' No'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf']);
                            }
                            unlink('./assets/pdf/'.$tp.' No'.$fe->info['NumeroConsecutivo'].', '.$_REQUEST['sucname'].'.pdf');
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
             case 14: //PDF INTEGRACION
                $db = new DBClass();
                $xml = file_get_contents('./assets/xml/'.$_REQUEST['ruta'].'/'.$_REQUEST['cons'].'.xml');
                $fe->procesarPDF($xml,$db,$_REQUEST['sucursal']);
                break;
            case 15: //ENVIAR CORREO Integracion
                break;
            case 16: //OBTENER RESPUESTA HACIENDA Y GUARDAR EN ARCHIVO
                $salida = [];
                $xml = $fe->estado();
                if ($xml) {
                    $salida['succed'] = 1;
                    $salida['arhivo'] = "../assets/xml/RH_".$fe->info['NumeroConsecutivo'].", ".$_REQUEST['sucname'].".xml";
                    $salida['mfile'] = file_put_contents("../assets/xml/RH_".$fe->info['NumeroConsecutivo'].", ".$_REQUEST['sucname'].".xml", $xml['xml']);
                }else
                    $salida['succed'] = 0;
                echo json_encode($salida);
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
        var $sumaexonerados = 0;
        var $sumagravados = 0;
        var $exo = 0;
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
            
            $inv_xml = simplexml_load_string($_xml);
            if (!isset($inv_xml->Clave)) {
                $inv_xml = simplexml_load_string(utf8_encode($_xml));
                if (!isset($inv_xml->Clave)) {
                    $salida = ['succed' => 0,'ERROR' => 'XML no Válido'];
                    return false;
                }
            }
            
            $ispruebas = 0;
            if(strpos($_xml, 'SANDBOX') > -1)
                $ispruebas = 1;

            if (!isset($inv_xml->Emisor->Identificacion->Numero)) {
                $inv_xml = (Array) $inv_xml;
                
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

                if (!isset($inv_xml['NombreEmisor'])) {
                    $salida = ['succed' => 0,'ERROR' => 'Comprobante no Válido'];
                    return false;
                }

                if (!strlen(trim($inv_xml['NombreEmisor']))) {
                    $salida = ['succed' => 0,'ERROR' => 'Comprobante no Válido'];
                    return false;
                }

                // if($inv_xml['NumeroCedulaReceptor'] != $cedula && $cedula != ''){
                //     $salida = ['succed' => 0,'ERROR' => 'Receptor Inválido '.$cedula];
                //     return false;
                // }

                $salida['clave'] = $inv_xml['Clave'];

                $sub = $inv_xml['TotalFactura']-$inv_xml['MontoTotalImpuesto'];
                $_exo = $inv_xml['TotalFactura']-$sub-$inv_xml['MontoTotalImpuesto'];

                $idprov = $db->ejecutar('call sp_rmantclientes("'.$inv_xml['NombreEmisor'].'","'.$inv_xml['NumeroCedulaEmisor'].'","","",'.$inv_xml['TipoIdentificacionEmisor'].',0,0,0,0,0)');
                if(isset($idprov->num_rows)) 
                    $idprov = $idprov->fetch_all()[0][0];
                else{
                     $salida = ['succed' => 0,'ERROR' => $idprov,'mod'=>'PROVEEDOR R'];
                    return false;
                }
                $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,1,1,'.$idprov.',1,0,'.$inv_xml['MontoTotalImpuesto'].','.$sub.','.$_exo.',0,0,0,0,"'.$inv_xml['Clave'].'","'.$inv_xml['Clave'].'",1,1,0,"",0,"","",now(),1,"",'.$inv_xml['Mensaje'].',"'.$inv_xml['NumeroCedulaReceptor'].'",'.$ispruebas.')');
                if(isset($idfact->num_rows)){
                    $idfact = $idfact->fetch_all()[0][0];
                    $salida['ifactura'] = $idfact;
                }
                else{
                    $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantfacturas(1,null,2,1,1,'.$idprov.',1,0,'.$inv_xml['MontoTotalImpuesto'].','.$sub.','.$_exo.',0,0,0,0,"'.$inv_xml['Clave'].'","'.$inv_xml['Clave'].'",1,1,0,"",0,"","",now(),1,"",'.$inv_xml['Mensaje'].',"'.$inv_xml['NumeroCedulaReceptor'].'",'.$ispruebas.')'.'\',\''.$idfact.'\')');
                    $salida = ['succed' => 0,'ERROR' => $idfact,'mod'=>'Factura R'];
                    return false;
                }
                if ($idfact) {

                    $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"Mensaje de Hacienda","",1,'.$sub.',8,'.$inv_xml['MontoTotalImpuesto'].',1,0,0,0)');

                    if (!isset($iddet->num_rows)) {
                        $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantdetallefacturas(1,0,'.$idfact.',"Mensaje de Hacienda","",1,'.$sub.',8,'.$inv_xml['MontoTotalImpuesto'].',1,0,0,0)');
                        $salida = ['succed' => 0,'ERROR' => $iddet,'mod'=>'Detalle Factura R'];
                        //$db->ejecutar('call sp_rrollback('.$idfact.')');1
                        return false;
                    }
                }
                return false;
            }

            if(!isset($inv_xml->Emisor->Identificacion->Numero)){
                $salida = ['succed' => 0,'ERROR' => 'Receptor Requerido'];
                return false;
            }

            // if($inv_xml->Receptor->Identificacion->Numero != $cedula && $cedula != ''){
            //     $salida = ['succed' => 0,'ERROR' => 'Receptor Inválido '.$cedula];
            //     return false;
            // }

            $salida['clave'] = (array)$inv_xml->Clave;
            $salida['clave'] = $inv_xml->Clave[0];

            if (strlen($salida['clave']) != 50){
                $salida = ['succed' => 0,'ERROR' => 'Clave no Válida'];
                return false;
            }

            $prov = [];
            $prov['cedula'] = (array) $inv_xml->Emisor->Identificacion->Numero;
            $prov['cedula'] = $prov['cedula'][0];
            if (trim($prov['cedula']) != trim(substr($salida['clave'], 9,12))) {
                $salida = ['succed' => 0,'ERROR' => 'Cédula no Válida'];
                return false;
            }

            $prov['nombre'] = (array) $inv_xml->Emisor->Nombre;
            $prov['nombre'] = $prov['nombre'][0];
            
            $prov['tipo']       = (array) $inv_xml->Emisor->Identificacion->Tipo;
            $prov['tipo']       = $prov['tipo'][0];

            $prov['barrio']     = isset($inv_xml->Emisor->Ubicacion->Barrio) ? (array) $inv_xml->Emisor->Ubicacion->Barrio : 0;
            $prov['barrio'] = $prov['barrio'] == 0 ? $prov['barrio'] : $prov['barrio'][0];

            $prov['distrito']   = isset($inv_xml->Emisor->Ubicacion->Distrito) ? (array) $inv_xml->Emisor->Ubicacion->Distrito : 0;
            $prov['distrito'] = $prov['distrito'] == 0 ? $prov['distrito'] : $prov['distrito'][0];

            $prov['canton']     = isset($inv_xml->Emisor->Ubicacion->Canton) ? (array) $inv_xml->Emisor->Ubicacion->Canton : 0;
            $prov['canton']  = $prov['canton']  == 0 ? $prov['canton']  : $prov['canton'] [0];

            $prov['provincia']  = isset($inv_xml->Emisor->Ubicacion->Provincia) ? (array) $inv_xml->Emisor->Ubicacion->Provincia : 0;
            $prov['provincia'] = $prov['provincia'] == 0 ? $prov['provincia'] : $prov['provincia'][0];

            $prov['otrassenas'] = isset($inv_xml->Emisor->Ubicacion->OtrasSenas) ? (array) $inv_xml->Emisor->Ubicacion->OtrasSenas : 0;
            $prov['otrassenas'] = $prov['otrassenas'] == 0 ? $prov['otrassenas'] : $prov['otrassenas'][0];

            $prov['correo']     = isset($inv_xml->Emisor->CorreoElectronico) ? (array) $inv_xml->Emisor->CorreoElectronico : 0;
            $prov['correo'] = $prov['correo'] == 0 ? $prov['correo'] : $prov['correo'][0];

            $prov['telefono']   = isset($inv_xml->Emisor->Telefono->NumTelefono) ? (array) $inv_xml->Emisor->Telefono->NumTelefono : 0;
            $prov['telefono'] = $prov['telefono'] == 0 ? $prov['telefono'] : $prov['telefono'][0];

            $prov['pais']       = isset($inv_xml->Emisor->Telefono->CodigoPais) ? (array) $inv_xml->Emisor->Telefono->CodigoPais : 0;
            $prov['pais'] = $prov['pais'] == 0 ? $prov['pais'] : $prov['pais'][0];

            $prov['id']         = $db->ejecutar('call sp_rmantclientes("'.$prov['nombre'].'","'.$prov['cedula'].'","'.$prov['correo'].'","'.$prov['telefono'].'",'.$prov['tipo'].','.$prov['barrio'].','.$prov['distrito'].','.$prov['canton'].','.$prov['provincia'].','.$prov['pais'].')');
            if(isset($prov['id']->num_rows)) 
                $prov['id'] = $prov['id']->fetch_all()[0][0];
            else{
                 $salida = ['succed' => 0,'ERROR' => $prov['id'],'mod'=>'PROVEEDOR'];
                return false;
            }


            $fecha = (array) $inv_xml->FechaEmision;
            $fecha = date('Y-m-d H:i:s',strtotime($fecha[0]));

            $fact['tipoventa'] = (array) $inv_xml->CondicionVenta;
            $fact['tipoventa'] = $fact['tipoventa'][0];
            $fact['plazo']     = isset($inv_xml->PlazoCredito) ? (array) $inv_xml->PlazoCredito : 0;
            $fact['plazo']     = $fact['plazo'] == 0 ? $fact['plazo'] : isset($fact['plazo'][0]) ? $fact['plazo'][0] : 0;
            preg_match_all('!\d+!', $fact['plazo'], $matches);
            $fact['plazo']     = $matches[0][0];
            $fact['tipopago']  = (array) $inv_xml->MedioPago;
            $fact['tipopago']  = $fact['tipopago'][0];

            $version = '4.2';

            $fact['moneda']    = (array) $inv_xml->ResumenFactura->CodigoMoneda;
        
            if(!isset($fact['moneda'][0]))  { //4.2
                $fact['moneda'] = (array) $inv_xml->ResumenFactura->CodigoTipoMoneda->CodigoMoneda;
                $fact['moneda'] = isset($fact['moneda'][0]) ? $fact['moneda'][0] : 'CRC';
                $version = '4.3';
            }
            else
                $fact['moneda']    = $fact['moneda'][0];

            if($version == '4.3'){
                $fact['divisa']    = (array) $inv_xml->ResumenFactura->CodigoTipoMoneda->TipoCambio;
                $fact['divisa']    = isset($fact['divisa'][0]) ? $fact['divisa'][0] : 0;
                $fact['divisa']    = $fact['divisa'] == 0 ? 1 : $fact['divisa'];
            }else{
                $fact['divisa']    = (array) $inv_xml->ResumenFactura->TipoCambio;
                $fact['divisa']    = isset($fact['divisa'][0]) ? $fact['divisa'][0] : 0;
                $fact['divisa']    = $fact['divisa'] == 0 ? 1 : $fact['divisa'];
            }

            $fact['subtotal']  = (array) $inv_xml->ResumenFactura->TotalGravado;
            $fact['subtotal']  = isset($fact['subtotal'][0]) ? $fact['subtotal'][0] : 0;
            $fact['exento']    = (array) $inv_xml->ResumenFactura->TotalExento;
            $fact['exento']    = isset($fact['exento'][0]) ? $fact['exento'][0] : 0;
            $fact['exonerado']    = (array) $inv_xml->ResumenFactura->TotalExonerado;
            $fact['exonerado']    = isset($fact['exento'][0]) ? $fact['exento'][0] : 0;
            $fact['descuento'] = (array) $inv_xml->ResumenFactura->TotalDescuentos;
            $fact['descuento'] = isset($fact['descuento'][0]) ? $fact['descuento'][0]: 0;
            $fact['impuesto']  = (array) $inv_xml->ResumenFactura->TotalImpuesto;
            $fact['impuesto']  = isset($fact['impuesto'][0]) ? $fact['impuesto'][0] : 0 ;
            $fact['cedula'] = (array) $inv_xml->Receptor->Identificacion->Numero;
            $fact['cedula'] = $fact['cedula'][0];
            $_divisa = trim($fact['moneda']) != 'CRC' ? $fact['divisa'] : 1;
            $ireferencia = isset($inv_xml->InformacionReferencia) ? $inv_xml->InformacionReferencia->Numero : '';

            $idfact = $db->ejecutar('call sp_rmantfacturas(1,null,2,'.$fact['tipoventa'].','.$fact['tipopago'].','.$prov['id'].',1,0,'.$fact['impuesto']*$_divisa.','.$fact['subtotal']*$_divisa.','.$fact['exento']*$_divisa.','.$fact['descuento']*$_divisa.','.$fact['exonerado']*$_divisa.',0,'.$fact['plazo'].',"'.$ireferencia.'","'.$salida['clave'].'","'.$fact['moneda'].'",1,0,"",0,"","","'.$fecha.'",'.$fact['divisa'].',"",9,"'.$fact['cedula'].'",'.$ispruebas.')');

            if(isset($idfact->num_rows)){
                $idfact = $idfact->fetch_all()[0][0];
                $salida['ifactura'] = $idfact;
            }
            else{
                $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantfacturas(1,null,2,'.$fact['tipoventa'].','.$fact['tipopago'].','.$prov['id'].',1,0,'.$fact['impuesto'].','.$fact['subtotal'].','.$fact['exento'].','.$fact['descuento'].',0,0,'.$fact['plazo'].',"'.$ireferencia.'","'.$fact['moneda'].'",1,0,"",0,"","","'.$fecha.'",'.$fact['divisa'].',"",9,"'.$fact['cedula'].'",'.$ispruebas.')'.'\',\''.$idfact.'\')');
                $salida = ['succed' => 0,'ERROR' => $idfact,'mod'=>'Factura'];
                return false;
            }

            if ($idfact) {

                $ciclo = (array) $inv_xml->DetalleServicio;
                
                if (!isset($ciclo['LineaDetalle']->NumeroLinea)) {
                    $ciclo = $ciclo['LineaDetalle'];
                }
                $salida['codigo'] = [];

                foreach ($ciclo as $ind=>$key) {
                    $vunidad = (array)$key->UnidadMedida;
                    $vunidad = $vunidad[0] == 'Otros' ? (array)$key->UnidadMedidaComercial : (array)$key->UnidadMedida;
                    $vunidad = isset($vunidad[0]) ? $vunidad[0] : $vunidad ;
                    // $vunidad = $vunidad == 0 ? 1 : $vunidad;

                    $num = (array)$key->NumeroLinea;
                    $dcodigo = '';
                    if(isset($key->Codigo)) 
                        $dcodigo = (array)$key->Codigo; 
                    else
                        if(isset($key->CodigoComercial)) 
                            $dcodigo =  1; 
                        else 
                            $dcodigo = 2;//  (array)$key->CodigoComercial->Codigo : '';
                    $salida['codigo'][$ind] = $dcodigo;
                    $dcodigo = isset($dcodigo[0]) ? $dcodigo[0] : '';     
                    
                    $dcantidad = (array)$key->Cantidad;
                    $ddetalle = (array)$key->Detalle;
                    $dunitario = (array)$key->PrecioUnitario;
                    $dsubtotal = (array)$key->SubTotal;
                    if(isset($key->MontoDescuento))
                        $ddescuento = (array)$key->MontoDescuento;
                    else 
                        $ddescuento = isset($key->Descuento->MontoDescuento) ? (array)$key->Descuento->MontoDescuento : 0;
                    $ddescuento = $ddescuento == 0 ? $ddescuento : $ddescuento[0];
                    $dtarifa = 0;
                    $timv = 0;
                    $dimpuesto = isset($key->ImpuestoNeto) ? is_numeric($key->ImpuestoNeto) ? (array) $key->ImpuestoNeto : 0 : 0;
                    $dimpuesto = $dimpuesto[0] == 0 ? isset($key->Impuesto) ? (array) $key->Impuesto->Monto : 0 : $dimpuesto;
                    $dimpuesto = $dimpuesto == 0 ? 0 : $dimpuesto[0];
                    
                    if(isset($key->Impuesto)){

                        for ($i = 0; $i < sizeof($key->Impuesto); $i++) {

                            $timpuesto = (array) $key->Impuesto[$i]->Codigo;
                            $timpuesto = $timpuesto[0];

                            if( $timpuesto == '01'){
                                $dtarifa = isset($key->Impuesto[$i]->Tarifa) ? (array)$key->Impuesto[$i]->Tarifa : 0;
                                $dtarifa = $dtarifa == 0 ? $dtarifa : $dtarifa[0];
                                $timv = isset($key->Impuesto[$i]->CodigoTarifa) ? (array)$key->Impuesto[$i]->CodigoTarifa : 0;
                                $timv = is_array($timv) ? $timv[0] : $timv;
                            }
                        }
                    }
                    $pexo = isset($key->Impuesto->Exoneracion->MontoExoneracion) ? (array)$key->Impuesto->Exoneracion->MontoExoneracion : 0;
                    $pexo = is_array($pexo) ? $pexo[0] : $pexo; 
                    $dcodigo =  is_array($dcodigo) ? $dcodigo[0] : $dcodigo;
                    $ddescuento = is_array($ddescuento) ? $ddescuento[0] : $ddescuento;
                    $vunidad = is_array($vunidad) ? isset($vunidad[0]) ? $vunidad[0]  : 0 : $vunidad;

                    $iddet = $db->ejecutar('call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.addslashes($ddetalle[0]).'","'.$dcodigo.'",'.$dcantidad[0].','.$dunitario[0]*$_divisa.','.$ddescuento*$_divisa.','.$dimpuesto*$_divisa.',"'.$vunidad.'",'.$dtarifa.','.$timv.','.$pexo.')');
                    
                    if (!isset($iddet->num_rows)) {
                        $db->ejecutar('insert into registroSQL values(null,now(),\''.'call sp_rmantdetallefacturas(1,0,'.$idfact.',"'.addslashes($ddetalle[0]).'","'.$dcodigo.'",'.$dcantidad[0].','.$dunitario[0]*$_divisa.','.$ddescuento*$_divisa.','.$dimpuesto*$_divisa.',"'.$vunidad.'",'.$dtarifa.','.$timv.','.$pexo.')');
                        $salida = ['succed' => 0,'ERROR' => $iddet,'mod'=>'Detalle Factura'];
                        //$db->ejecutar('call sp_rrollback('.$idfact.')');
                        return false;
                    }

                }
            }
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
                            $sRespuesta = str_replace($sError, '', $sRespuesta);
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
                 $ocargos = $this->getJSON('call fe_getOtrosCargos("'.$this->id.'")');
                if($ocargos)
                    $data['OtrosCargos'] = $ocargos; 
                $data['ResumenFactura'] = $this->getJSON('call fe_getResumen("'.$this->id.'")');

                $tdetalle = isset($data['DetalleServicio']) ? sizeof($data['DetalleServicio']) : 0;
                if (!$tdetalle && $this->opcion < 5) 
                    return ['error'=>'No hay Detalle'];

                $data['ResumenFactura']['TotalImpuesto'] = str_replace(',', '', number_format($this->sumaimpuestos,5));
                $totoc = isset($data['ResumenFactura']['TotalOtrosCargos']) ? $data['ResumenFactura']['TotalOtrosCargos'] : 0;
                $data['ResumenFactura']['TotalComprobante'] = str_replace(',', '', number_format($data['ResumenFactura']['TotalComprobante'] + $this->sumaimpuestos+$totoc,5));
                if (round($this->sumadescuentos - $data['ResumenFactura']['TotalDescuentos'],5) != 0) 
                     return ['error'=>'Descuentos Difieren'];

                /*if (round($data['ResumenFactura']['TotalGravado']+$data['ResumenFactura']['TotalExento']+(isset($data['ResumenFactura']['TotalExonerado']) ? $data['ResumenFactura']['TotalExonerado'] : 0)) != round($data['ResumenFactura']['TotalVenta'])) 
                     return ['error'=>'Inconsistencia en Precios, '.($data['ResumenFactura']['TotalGravado']+$data['ResumenFactura']['TotalExento'])." - ".$data['ResumenFactura']['TotalVenta']];*/

                if ($this->ref) {
                    $refxml = $this->getJSON('call fe_getReferencia('.substr($this->id, 1).')');
                    $data['InformacionReferencia'] = $refxml;
                }

                //$data['Normativa'] = ['NumeroResolucion' => 'DGT-R-48-2016', 'FechaResolucion' => '07-10-2016 08:00:00'];
                $otros = $this->getJSON('call fe_getOtros('.$this->id.')');

                if ($otros) {
                    $data['Otros'] = $otros['Otros'] ;
                }
                
            }

            if (!isset($this->info['Emisor']['CorreoElectronico']) && substr($this->id, 0,1) != '!') {
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

            $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
            <'.$this->tdoc.' xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$this->xmldoc.'" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
                xsi:schemaLocation="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$this->xmldoc.' https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.3/'.$this->xmldoc.'" />');
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
                        //$codigo = ['Tipo'=>$value[1],'Codigo'=>$value[2]];
                        $detalle['Codigo'] = $value[2];//$codigo;
                        $detalle['Cantidad'] = $value[3];
                        $detalle['UnidadMedida'] = $value[4];
                        $detalle['UnidadMedidaComercial'] = $value[5];
                        $detalle['Detalle'] = $value[6];
                        $detalle['PrecioUnitario'] = $value[7];
                        $detalle['MontoTotal'] = $value[8];
                        if ($value[9] > 0) {
                            $this->sumadescuentos += $value[9];
                            $detalle['Descuento']['MontoDescuento'] = $value[9];
                            $detalle['Descuento']['NaturalezaDescuento'] = $value[10];
                        }
                        $detalle['SubTotal'] = $value[11];
                        
                        $sum_imp = 0;
                        if ($value[12] != '') {
                            
                            $obj = $value[12];//explode(']', $value[12]);
                            
                            // foreach ($array_impuestos as $obj) {
                                $sub_array = explode(',', $obj);
                              
                                if (strlen($sub_array[0])) {
                                    
                                    $impuesto = ['Codigo'=>str_pad($sub_array[0], 2,0,STR_PAD_LEFT),'CodigoTarifa'=> str_pad($sub_array[3], 2,0,STR_PAD_LEFT) ,'Tarifa'=>$sub_array[1],'Monto'=>$sub_array[2]];

                                    if ($value[16] != '' && $value[21] > 0){
                                        $this->exo = 1;

                                        $exoneracion =   ['TipoDocumento' => $value[16], 'NumeroDocumento' => $value[17], 'NombreInstitucion' => $value[18],'FechaEmision' => $value[19],'PorcentajeExoneracion' => $value[21], 'MontoExoneracion' => number_format($sub_array[2]*($value[21]/100),5,'.','')];

                                        $this->sumaexonerados += $value[11];//$sub_array[2];
                                        $sub_array[2] = $sub_array[2]*(1-$exoneracion['PorcentajeExoneracion']/100);

                                        $impuesto['Exoneracion'] = $exoneracion;
                                        
                                        // $impuesto['Monto'] = $sub_array[2];
                                        // $impuesto['Tarifa'] = str_replace(',','',ceil(number_format(($sub_array[2]/$value[8])*100)));
                                        $sum_imp += $impuesto['Monto']-$impuesto['Exoneracion']['MontoExoneracion'];
                                    }else{
                                        $this->sumagravados += $value[11];
                                        $sum_imp += $sub_array[2];
                                    }

                                    $this->sumaimpuestos += $sub_array[2];
                                    array_push($detalle, ['Impuesto' => $impuesto]);
                                }
                            // }

                        }

                        $detalle['ImpuestoNeto'] = number_format($sum_imp,5,'.','');
                        $detalle['MontoTotalLinea'] = $value[15] + number_format($sum_imp,5,'.','');
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

            $xmlns_keyinfo='xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$this->xmldoc.'" '.
             'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
             'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
             'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
             
            $xmnls_signedprops='xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$this->xmldoc.'" '.
            'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
            'xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" '.
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';

            
            $xmnls_signeg='xmlns="https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.3/'.$this->xmldoc.'" '.
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
                    $linea['41'] =  $_xml[$this->tdoc]['Receptor']['CorreoElectronico'];
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
            $_POST['subject'] = substr($id,0,1) == '^' ? $cnf[3]." del Consecutivo ".$cnf[4] : $cnf[3]." N° ".$num;
            $_POST['to'] = $to;
            $_POST['idtabla'] = $this->idtabla;

            if(!$mh){

                $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
                $actual_link = str_replace('wsdlClient.php','/dashboard/login', $actual_link);

                if(substr($id,0,1) == '^')
                    $_POST['adjunto'] = [0=>'xml/'.$tit.' No'.$num.', '.$_SESSION['EMPRESA'].'.xml'];
                else{
                $_POST['adjunto'] = [0=>'xml/'.$tit.' No'.$num.', '.$_SESSION['EMPRESA'].'.xml',1=>'pdf/'.$tit.' No'.$num.', '.$_SESSION['EMPRESA'].'.pdf'];
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