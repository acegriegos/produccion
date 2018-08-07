<?php 
    require_once '_config/mysqlDB.php';
    set_time_limit(0);
    
    if (isset($_REQUEST['accion'])) {
        $id = $_REQUEST['id'];
        $accion = $_REQUEST['accion'];

        if (!file_exists('./assets/xml/'.$id)) {
            $fe = new facturaElectronica($id);
        }
        
        switch ($accion) {
            case 1://RECIBO DE FACTURA
                $rs = $fe->recepcion();
                print_r($rs);
                // echo $fe->recepcion();
                break;
            case 2://GET XML
                if (isset($_REQUEST['view'])) {
                    header("Content-type: text/xml; encoding='UTF-8'");
                }else{
                    header("Content-type: application/octet-stream; name='excel';charset=UTF-8");
                    header("Content-Disposition: filename=".$fe->info['NumeroConsecutivo'].".xml");
                    header("Pragma: no-cache");
                    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
                    echo "\xEF\xBB\xBF";
                }
                
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
                    $salida['ERROR'] = 'Clave Criptofágica no Eistente';            
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
            default:
                echo json_encode(['ERROR'=>'Accion no Valida']);
                break;
        }
    }

    function loadXML_FILE($id,&$salida)
    {   
        $db = new DBClass();
        $inv_xml = simplexml_load_file('./assets/xml/'.$id);
        $sucursal = $db->ejecutar('call datosempresa('.$_SESSION['IMPRESA'].')')->fetch_all()[0];

        $salida['clave'] = ((array) $inv_xml->Clave)[0];
        if (strlen($salida['clave']) != 50){
            $salida = ['succed' => 0,'ERROR' => 'CLAVE NO VALIDA'];
            return false;
        }
        
        $salida['emisor']['cedula'] = ((array) $inv_xml->Emisor->Identificacion->Numero)[0];
        if (trim($salida['emisor']['cedula']) != trim(substr($salida['clave'], 9,12))) {
            $salida = ['succed' => 0,'ERROR' => 'CEDULA NO VALIDA'];
            return false;
        }

        // $scedula = ((array) $inv_xml->Receptor->Identificacion->Numero)[0];
        // if (trim(str_replace('-', '', $sucursal[1])) != trim($scedula)) {
        //     $salida = ['succed' => 0,'ERROR' => 'RECEPTOR INVALIDO'];
        //     return false;
        // }

        $salida['emisor']['nombre'] = ((array) $inv_xml->Emisor->Nombre)[0];
        $prov = $db->ejecutar('call krattos("id",2,"id > 0 and bisproveedor and idsucursal = '.$sucursal[9].' and replace(cedula,\"-\",\"\") = replace('.$salida['emisor']['cedula'].',\"-\",\"\") ")')->fetch_all();
        
        if(!sizeof($prov)){
            $salida['emisor']['tipo']       = ((array) $inv_xml->Emisor->Identificacion->Tipo)[0];
            $salida['emisor']['barrio']     = isset($inv_xml->Emisor->Ubicacion->Barrio) ? ((array) $inv_xml->Emisor->Ubicacion->Barrio)[0] : 0;
            $salida['emisor']['distrito']   = isset($inv_xml->Emisor->Ubicacion->Distrito) ? ((array) $inv_xml->Emisor->Ubicacion->Distrito)[0] : 0;
            $salida['emisor']['canton']     = isset($inv_xml->Emisor->Ubicacion->Canton) ? ((array) $inv_xml->Emisor->Ubicacion->Canton)[0] : 0;
            $salida['emisor']['provincia']  = isset($inv_xml->Emisor->Ubicacion->Provincia) ? ((array) $inv_xml->Emisor->Ubicacion->Provincia)[0] : 0;
            $salida['emisor']['otrassenas'] = isset($inv_xml->Emisor->Ubicacion->OtrasSenas) ? ((array) $inv_xml->Emisor->Ubicacion->OtrasSenas)[0] : 0;
            $salida['emisor']['correo']     = isset($inv_xml->Emisor->CorreoElectronico) ? ((array) $inv_xml->Emisor->CorreoElectronico)[0] : 0;
            $salida['emisor']['telefono']   = isset($inv_xml->Emisor->Telefono->NumTelefono) ? ((array) $inv_xml->Emisor->Telefono->NumTelefono)[0] : 0;
            $salida['emisor']['pais']       = isset($inv_xml->Emisor->Telefono->CodigoPais) ? ((array) $inv_xml->Emisor->Telefono->CodigoPais)[0] : 0;
            $salida['emisor']['id']         = 0;
        }else
            $salida['emisor']['id']     = $prov[0][0];
        $fecha = ((array) $inv_xml->FechaEmision)[0];
        $fecha = strtotime(substr(str_replace('T', ' ', $fecha),0,-6));
        $fecha = date('d/m/Y H:i:s',$fecha);
        $salida['factura']['fecha']     = $fecha;
        $salida['factura']['tipoventa'] = ((array) $inv_xml->CondicionVenta)[0];
        $salida['factura']['plazo']     = isset($inv_xml->PlazoCredito) ? ((array) $inv_xml->PlazoCredito)[0] : 0;
        $salida['factura']['tipopago']  = ((array) $inv_xml->MedioPago)[0];
        $salida['factura']['moneda']    = ((array) $inv_xml->ResumenFactura->CodigoMoneda)[0];
        $salida['factura']['divisa']    = ((array) $inv_xml->ResumenFactura->TipoCambio)[0];
        $salida['factura']['subtotal']  = ((array) $inv_xml->ResumenFactura->TotalGravado)[0];
        $salida['factura']['exento']    = ((array) $inv_xml->ResumenFactura->TotalExento)[0];
        $salida['factura']['descuento'] = ((array) $inv_xml->ResumenFactura->TotalDescuentos)[0];
        $salida['factura']['impuesto']  = ((array) $inv_xml->ResumenFactura->TotalImpuesto)[0];

        $ciclo = ((array) $inv_xml->DetalleServicio);
        $salida['detalle'] = [];

        foreach ($ciclo as $key) {
            $vunidad = ((array)$key->UnidadMedida)[0] == 'Otros' ? ((array)$key->UnidadMedidaComercial)[0] : ((array)$key->UnidadMedida)[0];
            $cunidad = $db->ejecutar('call krattos("if(count(id),id,0)",107,"id > 0 and simbolo = \"'.$vunidad.'\" ")')->fetch_all();

            $num = ((array)$key->NumeroLinea)[0];
            $detarray = ['numero' => $num,'codigo' => ((array)$key->Codigo->Codigo)[0],'cantidad' => ((array)$key->Cantidad)[0], 'unidad' => $vunidad, 'idunidad' => $cunidad, 'detalle' => ((array)$key->Detalle)[0], 'precio' => ((array)$key->PrecioUnitario)[0], 'descuento' => isset(((array)$key->MontoDescuento)[0]) ? ((array)$key->MontoDescuento)[0] : 0, 'impuesto' => isset(((array)$key->Impuesto->Monto)[0]) ? ((array)$key->Impuesto->Monto)[0] : 0];
            array_push($salida['detalle'], $detarray);
        }

        // $mxml = file_get_contents('./assets/xml/'.$id);
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

        function __construct($vid){
            $this->id = $vid;

            $this->info = $this->getJSON('call fe_getencabezado("'.$this->id.'")');
            $opcion = isset($this->info['NumeroConsecutivo']) ? substr($this->info['NumeroConsecutivo'],9,1) : 0;
            switch ($opcion) {
                case 2: //NOTA DE DEITO
                    $this->tdoc = 'NotaDebitoElectronica';
                    $this->xmldoc = 'notaDebitoElectronica';
                    $this->ref = 1;
                    break;
                case 3: //NOTA DE CREDITO
                    $this->tdoc = 'NotaCreditoElectronica';
                    $this->xmldoc = 'notaCreditoElectronica';
                    $this->ref = 1;
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
                    break;
                default: //FACTRA ELECTRONICA
                    break;
            }
              
            $db = new DBClass();
            if (!isset($_SESSION['IMPRESA']))
                session_start();
            if (!isset($_REQUEST['accion']))
                $this->preUbicacion = '../';
            $this->credenciales = $db->ejecutar('call fe_getCredentials('.$_SESSION['IMPRESA'].')')->fetch_all()[0];
        }

        function getBearer(){

            set_error_handler("warning_handler", E_WARNING);
            $fP = fSockOpen("ssl://google.com", 443, $errno, $errstr, 10);
            if (!$fP) { return "Sin Internet"; }

            $fP = fSockOpen("ssl://idp.comprobanteselectronicos.go.cr", 443, $errno, $errstr, 10);
            if (!$fP) { return "Problemas con el Servidor de Hacienda"; }
            restore_error_handler();
            
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
            $salida['credenciales'] = $this->credenciales;
            $json_response = json_decode($json_response);
            
            if (isset($json_response->access_token)) {
                $this->bearer = $json_response->access_token;
            }

            return $salida;
        
        }

        function getRecibos($id,$offset,$limit,$vreceptor){
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return $doBearer;

            if ($this->bearer == '') {
                $salida['factura']  = $this->id;
                $salida['estado']   = 'Problemas con la Llave Criptográfica';
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

        function recepcion()
        {
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return json_encode(['factura'=>$this->id,'succed'=>0,'rs'=>$doBearer,'erno'=>1]);
            
            if ($this->bearer == '') 
                return 'Problemas con la Llave Criptográfica';

            if (!isset($this->info['Clave']))
                return "Factura no Existente - Clave no Valida";

            $xml = $this->getXMLRecepcion();
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
                    break;
                case 400:
                    /*AGARRAR ERROR*/
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

        function estado()
        {
            $doBearer = $this->getBearer();
            if(!is_array($doBearer))
                return ['factura'=>$this->id,'estado'=>'Sin Internet','rs'=>$doBearer];

            if ($this->bearer == '')
               return 'Problemas con la Llave Criptográfica';

            $clave = $this->info['Clave'];

            if ($this->credenciales[2] == 1) 
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion/".$clave);
            else
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion/v1/recepcion/".$clave);

            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
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
                        $sRespuesta = ((Array) simplexml_load_string(base64_decode($aBody['respuesta-xml'])))['DetalleMensaje'];
                        $sRespuesta = str_replace(PHP_EOL, ' ', $sRespuesta);
                        $sError = strpos($sRespuesta, '[');

                        if ($sError != '') {
                            $sError     = substr($sRespuesta, strpos($sRespuesta, '[')-1);
                            $aError = explode(',',substr($sRespuesta, strpos($sRespuesta, '[')-1));
                            $sRespuesta = str_replace($sError, $aError[4], $sRespuesta);
                        }
                        $salida['rs'] = $sRespuesta;
                    }
                    $salida['factura']  = $this->id;
                    $salida['estado']   = $aBody['ind-estado'];
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
            
            $data[] = $this->info;
            $data['DetalleServicio'] = $this->getDetalle('call fe_getDetalle("'.$this->id.'")');
            $data['ResumenFactura'] = $this->getJSON('call fe_getResumen("'.$this->id.'")');

            if ($this->ref) {
                $refxml = $this->getJSON('call fe_getReferencia('.substr($this->id, 1).')');
                $data['InformacionReferencia'] = $refxml;
            }

            $data['Normativa'] = ['NumeroResolucion' => 'DGT-R-48-2016', 'FechaResolucion' => '07-10-2016 08:00:00'];
            // $data['Otros'] = ['OtroTexto' => '','OtroContenido' => ''];
            

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
                            $detalle['MontoDescuento'] = $value[9];
                            $detalle['NaturalezaDescuento'] = $value[10];
                        }
                        $detalle['SubTotal'] = $value[11];
                        $exoneracion = ['TipoDocumento' => $value[16], 'NumeroDocumento' => $value[17], 'NombreInstitucion' => $value[18],'FechaEmision' => $value[19], 'MontoImpuesto' =>$value[20], 'PorcentajeCompra' => $value[21]];
                        
                        if ($value[12] != '') {
                            $impuesto = ['Codigo'=>$value[12],'Tarifa'=>$value[13],'Monto'=>$value[14]];

                            if ($value[16] != '') 
                                $impuesto['Exoneracion'] = $exoneracion;

                            $detalle['Impuesto'] = $impuesto;
                        }
                        
                        
                        $detalle['MontoTotalLinea'] = $value[15];
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

       private function firmarXML(&$xml){
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
    }   

    function warning_handler($errno, $errstr, $errfile, $errline)
    {
        return true;
    /* Según el típo de error, lo procesamos */
    // switch ($errno) {
    //    case E_WARNING:
    //             echo "Hay un WARNING.<br />\n";
    //             echo "El warning es: ". $errstr ."<br />\n";
    //             echo "El fichero donde se ha producido el warning es: ". $errfile ."<br />\n";
    //             echo "La línea donde se ha producido el warning es: ". $errline ."<br />\n";
    //             /* No ejecutar el gestor de errores interno de PHP, hacemos que lo pueda procesar un try catch */
    //             return true;
    //             break;
            
    //         case E_NOTICE:
    //             echo "Hay un NOTICE:<br />\n";
    //             /* No ejecutar el gestor de errores interno de PHP, hacemos que lo pueda procesar un try catch */
    //             return true;
    //             break;
            
    //         default:
    //             /* Ejecuta el gestor de errores interno de PHP */
    //             return false;
    //             break;
    //         }
    }

 ?>