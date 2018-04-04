<?php 
    require_once '_config/mysqlDB.php';
    if (isset($_REQUEST['accion'])) {
        $id = $_REQUEST['id'];
        $accion = $_REQUEST['accion'];

        $fe = new facturaElectronica($id);

        switch ($accion) {
            case 1://RECIBO DE FACTURA
                print_r($fe->recepcion());
                break;
            case 2://GET XML
                header("Content-type: text/xml; encoding='UTF-8'");
                print_r($fe->getXMLRecepcion());
                break;
            case 3://BEARER
                echo "<pre>";
                    print_r($fe->getBearer());
                echo "</pre>";
                break;
            case 4://Consulta ESTADO;
                print_r($fe->estado());
                break;
            case 5://Consulta General de Recibos
                $offset     =   !isset($_REQUEST['offset'])     ?   0  :   $_REQUEST['offset'];
                $limit      =   !isset($_REQUEST['limit'])      ?   50  :   $_REQUEST['limit'];
                $emisor     =   $fe->info['Emisor']['Identificacion']['Tipo'].$fe->info['Emisor']['Identificacion']['Numero'];
                $receptor   =   !isset($_REQUEST['receptor'])   ?   ''   :   $_REQUEST['receptor'];
                print_r($fe->getRecibos($id,$offset,$limit,$emisor,$receptor));
                break;
            case 6://ENCABEZADO
                echo json_encode($fe->info);
                break;
            case 7://PAYLOAD 

                $xml = $fe->getXMLRecepcion();
       
                echo json_encode($fe->getPayload($xml));
                break;
            case 8: //XML-ESTADO
                header("Content-type: text/xml; encoding='UTF-8'");
                $result = $fe->estado();
                print_r(base64_decode($result['xml']));
                break;
            case 9: //P12
                openssl_pkcs12_read(file_get_contents($fe->credenciales[0]), $certs, $fe->credenciales[3]);
                $publicKey    =$certs["cert"];
                $privateKey   =$certs["pkey"];
                
                $certData   = openssl_x509_parse($publicKey);
                $certDigest =base64_encode(openssl_x509_fingerprint($publicKey, "sha1", true));
                echo "<pre>";
                print_r($certData);
                echo "</pre>";
                break;
            default:
                print_r(json_encode(['ERROR'=>'Accion no Valida']));
                break;
        }
    }

    class facturaElectronica
    {
        var $info;
        var $id;
        var $bearer;
        var $credenciales;

        function __construct($vid){
            $this->id = $vid;
            $this->info = $this->getJSON('call fe_getencabezado('.$this->id.')');
            $db = new DBClass();
            if (!isset($_SESSION['IMPRESA']))
                session_start();

            $this->credenciales = $db->ejecutar('call fe_getCredentials('.$_SESSION['IMPRESA'].')')->fetch_all()[0];
        }

        function getBearer(){
            $curl = curl_init("https://idp.comprobanteselectronicos.go.cr/auth/realms/rut-stag/protocol/openid-connect/token");
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

            $params = array(
              "client_id" => "api-stag",
              "client_secret" => "",
              "scope" => "",
              "username" => $this->credenciales[1],
              "password" => $this->credenciales[2],
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

            $this->bearer = json_decode($json_response)->access_token;
            return $salida;
        
        }

        function getRecibos($id,$offset,$limit,$vemisor,$vreceptor){
            $this->getBearer();
            $emisor = $this->getEmisor($vemisor);
            //$receptor = $this->getReceptor($vreceptor);

            if ($id == 0) 
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/comprobantes/");
            else
                $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/comprobantes/".$this->getClave());
            
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/x-www-form-urlencoded','Authorization: bearer '.$this->bearer]);

            $params = array(
              "offset" => $offset,
              "limit" => $limit,
              "emisor" => $emisor,
              /* "receptor" => $receptor*/);

            $postData = "";

            foreach($params as $k => $v)
            {
               $postData .= $k . '='.urlencode($v).'&';
            }

            $postData = rtrim($postData, '&');

            curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

            $json_response = curl_exec($curl);

            curl_close($curl);
            $body = substr($json_response, strpos($json_response, 'CF-RAY'));
            $json = (array) json_decode(substr($body,strpos($body, '{')));
            
            return $json_response;
        }

        function recepcion()
        {
            $this->getBearer();
            
            if (!isset($this->info['Clave'])) {
                return "Factura no Existente - Clave no Valida";
            }

            $xml = $this->getXMLRecepcion();

            $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
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
                    $json_response = json_encode(['rs'=>'Factura Electronica Recibida','response'=>$rs]);
                    break;
                case 400:
                    /*AGARRAR ERROR*/
                    $rs = substr($rs, strpos($rs, 'X-Error-Cause')+14);
                    $rs = substr($rs, 0, strpos($rs,'X-')-3);
                    $json_response = json_encode(['rs'=>'Error Factura Electronica: '.$this->id.', '.$rs]);
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
            $this->getBearer();

            $clave = $this->getClave();

            $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion/".$clave);
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/x-www-form-urlencoded','Authorization: bearer '.$this->bearer]);

            $json_response = curl_exec($curl);

            curl_close($curl);
            $body = substr($json_response, strpos($json_response, 'CF-RAY'));
            $json = (array) json_decode(substr($body,strpos($body, '{')));
            $arreglo = isset($json['respuesta-xml']) ? (Array) simplexml_load_string(base64_decode($json['respuesta-xml'])) : 'Factura no Existente';

            if (isset($json['ind-estado'])) {
                $salida['factura']  = $this->id;
                $salida['estado']   = $json['ind-estado'];
                $salida['rs']       = $arreglo['DetalleMensaje'];
                $salida['xml']      = $json['respuesta-xml'];
            }else{
                $salida['factura']  = $this->id;
                $salida['estado']   = 'Sin Subir';
                $salida['rs']       = 'Factura en Servidor Local';
            }
            
            return $salida;
        }

        function getClave()
        {
            $encabezado = $this->getJSON('call fe_getencabezado('.$this->id.')');
            return isset($encabezado['Clave']) ? $encabezado['Clave'] : die("Factura no Existente");
        }

        function getEmisor($id){
            $rs = $this->getJSON('select lpad(replace(cedula,"-",""),12,0) as ced from sucursales where id = '.$id);
            return $rs ? $rs['ced'] : '';
        }

        function getReceptor($id){
            $rs = $this->getJSON('select lpad(replace(cedula,"-",""),12,0) as ced from clientes where id = '.$id);
            return $rs ? $rs['ced'] : '';
        }

        function getXMLRecepcion(){

            $data = [];
            
            $data[] = $this->info;
            $data['DetalleServicio'] = $this->getDetalle('call fe_getDetalle('.$this->id.')');
            $data['ResumenFactura'] = $this->getJSON('call fe_getResumen('.$this->id.')');
            // $data['InformacionReferencia'] = ['TipoDoc' => '', 'Numero' => '', 'FechaEmision' => '', 'Codigo' => '', 'Razon' => '' ];
            $data['Normativa'] = ['NumeroResolucion' => 'DGT-R-48-2016', 'FechaResolucion' => '07-10-2016 08:00:00'];
            // $data['Otros'] = ['OtroTexto' => '','OtroContenido' => ''];
            

            $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="utf-8" standalone="no"?>
            <FacturaElectronica xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" />');
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
                                        'callbackUrl'           => 'http://191.102.38.53:5381/wsdlServer.php',
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
                        $detalle['NumeroLinea'] = $fila;
                        $codigo = ['Tipo'=>$value[1],'Codigo'=>$value[2]];
                        $detalle['Codigo'] = $codigo;
                        $detalle['Cantidad'] = $value[3];
                        $detalle['UnidadMedida'] = $value[4];
                        $detalle['UnidadMedidaComercial'] = $value[5];
                        $detalle['Detalle'] = $value[6];
                        $detalle['PrecioUnitario'] = $value[7];
                        $detalle['MontoTotal'] = $value[8];
                        $detalle['MontoDescuento'] = $value[9];
                        $detalle['NaturalezaDescuento'] = $value[10];
                        $detalle['SubTotal'] = $value[11];
                        $exoneracion = ['TipoDocumento' => '', 'NumeroDocumento' => '', 'NombreInstitucion' => '','FechaEmision' => '', 'MontoImpuesto' => '', 'PorcentajeCompra' => '', 'PorcentajeCompra' => ''];

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

            openssl_pkcs12_read(file_get_contents($this->credenciales[0]), $certs, $this->credenciales[3]);
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

            $xmlns_keyinfo='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" '.
             'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
             'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
             'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';
             
            $xmnls_signedprops='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" '.
            'xmlns:ds="http://www.w3.org/2000/09/xmldsig#" '.
            'xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" '.
            'xmlns:xsd="http://www.w3.org/2001/XMLSchema" '.
            'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"';

            
            $xmnls_signeg='xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" '.
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
            $xml = str_replace('</FacturaElectronica>', $sig.'</FacturaElectronica>' , $xml);
       }

       private function firmarXMLA(&$xml){

        $signatureID    = 'id-'.$this->random();
        $reference1Id   = 'r-id1-'.$this->random(); 
        $propID         = 'xades-'.$this->random(); 
        $sigValue       = 'id'.$this->random(); 

        openssl_pkcs12_read(file_get_contents($this->credenciales[0]), $certs, $this->credenciales[3]);
        $publicKey    =$certs["cert"];
        $privateKey   =$certs["pkey"];

        $certData   = openssl_x509_parse($publicKey);
        $certDigest = base64_encode(openssl_x509_fingerprint($publicKey, "sha1", true));

        $publicPEM = "";
        openssl_x509_export($publicKey, $publicPEM);
        $publicPEM = str_replace("-----BEGIN CERTIFICATE-----", "", $publicPEM);
        $publicPEM = str_replace("-----END CERTIFICATE-----", "", $publicPEM);
        $publicPEM = str_replace("\r", "", str_replace("\n", "", $publicPEM));

        $kInfo = '<ds:KeyInfo xmlns:ds="http://www.w3.org/2000/09/xmldsig#">'.
        '<ds:X509Data>'.
        '<ds:X509Certificate>'.$publicPEM.'</ds:X509Certificate>'.
        '</ds:X509Data>'.
        '</ds:KeyInfo>';

        $kInfoDigest=$this->retC14DigestSha256($kInfo);

        $signTime1 = date('Y-m-d\TH:i:s-06:00');
        $digest = base64_encode(hash('sha1' , $xml, true ));

        $certData   = openssl_x509_parse($publicKey);
        $certDigest = base64_encode(openssl_x509_fingerprint($publicKey, "sha1", true));

        $certIssuer = array();
        foreach ($certData['issuer'] as $item=>$value) {
          $certIssuer[] = $item . '=' . $value;
        }
        $certIssuer = implode(', ', array_reverse($certIssuer));

        $sigProp = '<xades:SignedProperties Id="xades-'.$signatureID.'" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" xmlns:xades="http://uri.etsi.org/01903/v1.3.2#">'.
        '<xades:SignedSignatureProperties>'.
        '<xades:SigningTime>'.$signTime1.'</xades:SigningTime>'.
        '<xades:SigningCertificate>'.
        '<xades:Cert>'.
        '<xades:CertDigest>'.
        '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"/>'.
        '<ds:DigestValue>'.$certDigest.'</ds:DigestValue>'.
        '</xades:CertDigest>'.
        '<xades:IssuerSerial>'.
        '<ds:X509IssuerName>'.$certIssuer.'</ds:X509IssuerName>'.
        '<ds:X509SerialNumber>'.$certData['serialNumber'].'</ds:X509SerialNumber>'.
        '</xades:IssuerSerial>'.
        '</xades:Cert>'.
        '</xades:SigningCertificate>'.
        '<xades:SignaturePolicyIdentifier>'.
        '<xades:SignaturePolicyId>'.
        '<xades:SigPolicyId>'.
        '<xades:Identifier>'.
            'https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4.1/Resolucion_Comprobantes_Electronicos_DGT-R-48-2016.pdf</xades:Identifier>'.
        '</xades:SigPolicyId>'.
        '<xades:SigPolicyHash>'.
        '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>'.
        '<ds:DigestValue>'.$digest.'</ds:DigestValue>'.
        '</xades:SigPolicyHash>'.
        '</xades:SignaturePolicyId>'.
        '</xades:SignaturePolicyIdentifier>'.
        '</xades:SignedSignatureProperties>'.
        '<xades:SignedDataObjectProperties>'.
        '<xades:DataObjectFormat ObjectReference="#'.$reference1Id.'">'.
        '<xades:MimeType>application/octet-stream</xades:MimeType>'.
        '</xades:DataObjectFormat>'.
        '</xades:SignedDataObjectProperties>'.
        '</xades:SignedProperties>';

        $propDigest=$this->retC14DigestSha256($sigProp);

        $sigInfo = '<ds:SignedInfo>'.
        '<ds:CanonicalizationMethod Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'.
        '<ds:SignatureMethod Algorithm="http://www.w3.org/2001/04/xmldsig-more#rsa-sha256"/>'.
        '<ds:Reference Id="'.$reference1Id.'" Type="" URI="">'.
        '<ds:Transforms>'.
        '<ds:Transform Algorithm="http://www.w3.org/TR/1999/REC-xpath-19991116">'.
        '<ds:XPath>not(ancestor-or-self::ds:Signature)</ds:XPath>'.
        '</ds:Transform>'.
        '<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'.
        '</ds:Transforms>'.
        '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>'.
        '<ds:DigestValue>'.$kInfoDigest.'</ds:DigestValue>'.
        '</ds:Reference>'.
        '<ds:Reference Type="http://uri.etsi.org/01903#SignedProperties" URI="#'.$propID.'">'.
        '<ds:Transforms>'.
        '<ds:Transform Algorithm="http://www.w3.org/2001/10/xml-exc-c14n#"/>'.
        '</ds:Transforms>'.
        '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>'.
        '<ds:DigestValue>'.$propDigest.'</ds:DigestValue>'.
        '</ds:Reference>'.
        '</ds:SignedInfo>';

        $sinature = '<ds:Signature Id="'.$signatureID.'" xmlns:ds="http://www.w3.org/2000/09/xmldsig#">'.
        $sigInfo.
        '<ds:SignatureValue Id="'.$sigValue.'"></ds:SignatureValue>'.$kInfo.
        '<ds:Object>'.
        '<xades:QualifyingProperties xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Target="#'.$sigValue.'">'.
        $sigProp.
        '</xades:QualifyingProperties>'.
        '</ds:Object>'.
        '</ds:Signature>';

        // $d1p = new DOMDocument('1.0','UTF-8');
        // $d1p->loadXML($sinature);
        // $signaturePayload=$d1p->C14N();
        
        $signatureResult = "";
        $algo = "SHA256";

        openssl_sign($sinature, $signatureResult, $privateKey,$algo);
        $signatureResult = base64_encode($signatureResult);

        $sinature = str_replace('</ds:SignatureValue>', $signatureResult.'</ds:SignatureValue>', $sinature);
        $xml = str_replace('</FacturaElectronica>', $sinature.'</FacturaElectronica>' , $xml);
       }
    }   

 ?>