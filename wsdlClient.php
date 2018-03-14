<?php 
    require_once '_config/mysqlDB.php';
    if (isset($_REQUEST['accion'])) {
        $id = $_REQUEST['id'];
        $accion = $_REQUEST['accion'];

        $fe = new facturaElectronica($id);

        switch ($accion) {
            case 1:
                //RECIBO DE FACTURA
                print_r($fe->recepcion());
                break;
            case 2:
                //GET XML
                header("Content-type: text/xml; encoding='UTF-8'");
                print_r($fe->getXMLRecepcion());
                break;
            case 3:
                //BEARER
                echo "<pre>";
                    print_r($fe->getBearer());
                echo "</pre>";
                break;
            case 4:
                //Consulta ESTADO;
                print_r($fe->estado());
                break;
            case 5:
                //Consulta General de Recibos
                $offset     =   !isset($_REQUEST['offset'])     ?   ''  :   $_REQUEST['offset'];
                $limit      =   !isset($_REQUEST['limit'])      ?   ''  :   $_REQUEST['limit'];
                $emisor     =   !isset($_REQUEST['emisor'])     ?   0   :   $_REQUEST['emisor'];
                $receptor   =   !isset($_REQUEST['receptor'])   ?   0   :   $_REQUEST['receptor'];
                print_r($fe->getRecibos($id,$offset,$limit,$emisor,$receptor));
                break;
            case 6:
                $file = fopen("assets/xml/prueba.xml", "w+");
                fwrite($file, $fe->getXMLRecepcion());
                fclose($file);
                echo "Archivo Creado<br>";
                shell_exec("java -jar assets/libs/firmaXadesEpes/firmar-xades.jar assets/p12/310169776129.p12 6969 assets/xml/prueba.xml assets/xml/prueba-firmada.xml");
                echo "Archivo Firmado<br>";
                break;
            case 7: //ENCABEZADO
                echo json_encode($fe->info);
                break;
            case 8: //RECEPCION
                break;
            case 9: //PAYLOAD 

                $xml = $fe->getXMLRecepcion();
       
                $params = json_encode(array('clave'                 =>  $fe->info['clave'],
                                            'fecha'                 =>  $fe->info['FechaEmision'],
                                            'emisor'                =>  ['tipoIdentificacion' => $fe->info['Emisor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $fe->info['Emisor']['Identificacion']['Numero']],
                                            'receptor'              =>  ['tipoIdentificacion' => $fe->info['Receptor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $fe->info['Receptor']['Identificacion']['Numero']],
                                            'callbackUrl'           => 'http://191.102.38.53:5381/wsdlServer.php',
                                            'consecutivoReceptor'   => '',
                                            'comprobanteXml'        => base64_encode($xml)));
                echo $params;
                break;
            default:
                print_r(json_encode(['ERROR'=>'Accion no Valida']));
                break;
        }
    }else{
        $db = new DBClass();
        $db->ejecutar('insert into pruebas values(null,"'.json_encode($_POST).'")');
    }
    

    class facturaElectronica
    {
        var $info;
        var $id;
        var $bearer;

        function __construct($vid){
            $this->id = $vid;
            $this->info = $this->getJSON('call fe_getencabezado('.$this->id.')');
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
              "username" => "cpj-3-101-697761@stag.comprobanteselectronicos.go.cr",
              "password" => 'l[&qq[o$f$+c8Ro|x_@]',
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
            $receptor = $this->getReceptor($vreceptor);
            //offset:$offset&limit:$limit&emisor:$emisor&receptor:$receptor
            $clave = $id == 0 ? '' : $this->getClave();
            print_r($clave.'\n');

            $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/comprobantes/".$clave);
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, false);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/x-www-form-urlencoded','Authorization: bearer '.$this->bearer]);

            $params = array(
              "offset" => $offset,
              "limit" => $limit,
              "emisor" => $emisor,
              "receptor" => $receptor);

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

            /*//FIRMAR
            $file = fopen("assets/xml/".$this->info['clave'].".xml", "w+");
            fwrite($file, $this->getXMLRecepcion());
            fclose($file);
            
            shell_exec("java -jar ./assets/libs/firmaXadesEpes/firmar-xades.jar ./assets/p12/310169776129.p12 6969 ./assets/xml/".$this->info['clave'].".xml ./assets/xml/".$this->info['clave']."-firmada.xml");*/
            $xml = $this->getXMLRecepcion();

            $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl, CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$this->bearer]);
   
            $params = json_encode(array('clave'                 =>  $this->info['clave'],
                                        'fecha'                 =>  $this->info['FechaEmision'],
                                        'emisor'                =>  ['tipoIdentificacion' => $this->info['Emisor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $this->info['Emisor']['Identificacion']['Numero']],
                                        'receptor'              =>  ['tipoIdentificacion' => $this->info['Receptor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $this->info['Receptor']['Identificacion']['Numero']],
                                        'callbackUrl'           => 'http://191.102.38.53:5381/wsdlServer.php',
                                        'consecutivoReceptor'   => '',
                                        'comprobanteXml'        => base64_encode($xml)));
            /*base64_encode(file_get_contents("assets/xml/".$this->info['clave']."-firmada.xml))"*/
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
            // unlink("assets/xml/".$this->info['clave']."-firmada.xml");
            // unlink("assets/xml/".$this->info['clave'].".xml");

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
            if (isset($json['ind-estado'])) {
                $salida['factura']  = $this->id;
                $salida['estado']   = $json['ind-estado'];
                $salida['rs']       = ((array) simplexml_load_string(base64_decode($json['respuesta-xml']))->DetalleMensaje)[0];
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
            return isset($encabezado['clave']) ? $encabezado['clave'] : die("Factura no Existente");
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
            
            $data['FacturaElectronica'] = $this->info;
            $data['DetalleServicio'] = $this->getDetalle('call fe_getDetalle('.$this->id.')');
            $data['ResumenFactura'] = $this->getJSON('call fe_getResumen('.$this->id.')');
            $data['InformacionReferencia'] = ['TipoDoc' => '', 'Numero' => '', 'FechaEmision' => '', 'Codigo' => '', 'Razon' => '' ];
            $data['Normativa'] = ['NumeroResolucion' => 'Resolución DGT-R-13-2017', 'FechaResolucion' => '20-02-2017 08:05:00'];
            $data['Otros'] = ['OtroTexto' => '','OtroContenido' => ''];
            $data['LT'] = '';
            
            $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?>
            <xs:schema xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" targetNamespace="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" elementFormDefault="qualified" attributeFormDefault="unqualified" version="4.2" vc:minVersion="1.1">
                <xs:import namespace="http://www.w3.org/2000/09/xmldsig#" schemaLocation="http://www.w3.org/TR/2008/REC-xmldsig-core-20080610/xmldsig-core-schema.xsd"/>     
            </xs:schema>');
            $this->array_to_xml($data,$xml_data);

            $xml = $xml_data->asXML();
 
            $signatureID = $this->random();
            $signedInfoID = $this->random();
            $signedPropertiesID = $this->random();
            $signatureValueID = $this->random();
            $certificateID = $this->random();
            $referenceID = $this->random();
            $signatureSignedPropertiesID = $this->random();
            $signatureObjectID = $this->random();

            $signPolicy = array(
                "name" => "Indicates that the signer recognizes to have created, approved and sent the signed data object",
                "url" => "https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/Resolucion%20Comprobantes%20Electronicos%20%20DGT-R-48-2016.pdf",
                "digest" => "47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU="
            );

            $xmlns = array();
            $xmlns[] = 'xmlns:ds="http://www.w3.org/2000/09/xmldsig#"';
            // $xmlns[] = 'xmlns:fe="' . self::$SCHEMA_NS[$this->version] . '"';
            $xmlns[] = 'xmlns:xades="http://uri.etsi.org/01903/v1.3.2#"';
            $xmlns = implode(' ', $xmlns);

            openssl_pkcs12_read(file_get_contents('assets/p12/310169776129.p12'), $certs, 6969);
            $publicKey = openssl_x509_read($certs['cert']);
            $privateKey = openssl_pkey_get_private($certs['pkey']);
            $certData = openssl_x509_parse($publicKey);
            $certDigest = openssl_x509_fingerprint($publicKey, "sha1", true);
            $certDigest = base64_encode($certDigest);
            $certIssuer = array();
            foreach ($certData['issuer'] as $item=>$value) {
              $certIssuer[] = $item . '=' . $value;
            }
            $certIssuer = implode(',', $certIssuer);

            $signTime = strtotime(date("Y-m-d\TH:i:sP"));

            $prop = '<xades:SignedProperties Id="Signature' . $signatureID .
            '-SignedProperties' . $signatureSignedPropertiesID . '">' .
              '<xades:SignedSignatureProperties>' .
                '<xades:SigningTime>' . date('c', $signTime) . '</xades:SigningTime>' .
                '<xades:SigningCertificate>' .
                  '<xades:Cert>' .
                    '<xades:CertDigest>' .
                      '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1"></ds:DigestMethod>' .
                      '<ds:DigestValue>' . $certDigest . '</ds:DigestValue>' .
                    '</xades:CertDigest>' .
                    '<xades:IssuerSerial>' .
                      '<ds:X509IssuerName>' . $certIssuer . '</ds:X509IssuerName>' .
                      '<ds:X509SerialNumber>' . $certData['serialNumber'] . '</ds:X509SerialNumber>' .
                    '</xades:IssuerSerial>' .
                  '</xades:Cert>' .
                '</xades:SigningCertificate>' .
                '<xades:SignaturePolicyIdentifier>' .
                  '<xades:SignaturePolicyId>' .
                    '<xades:SigPolicyId>' .
                      '<xades:Identifier>' . $signPolicy['url'] . '</xades:Identifier>' .
                      '<xades:Description>' . $signPolicy['name'] . '</xades:Description>' .
                    '</xades:SigPolicyId>' .
                    '<xades:SigPolicyHash>' .
                      '<ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"></ds:DigestMethod>' .
                      '<ds:DigestValue>' . $signPolicy['digest'] . '</ds:DigestValue>' .
                    '</xades:SigPolicyHash>' .
                  '</xades:SignaturePolicyId>' .
                '</xades:SignaturePolicyIdentifier>' .
                '<xades:SignerRole>' .
                  '<xades:ClaimedRoles>' .
                    '<xades:ClaimedRole>emisor</xades:ClaimedRole>' .
                  '</xades:ClaimedRoles>' .
                '</xades:SignerRole>' .
              '</xades:SignedSignatureProperties>' .
              '<xades:SignedDataObjectProperties>' .
                '<xades:DataObjectFormat ObjectReference="#Reference-ID-' . $referenceID . '">' .
                  '<xades:Description>Factura electrónica</xades:Description>' .
                  '<xades:MimeType>text/xml</xades:MimeType>' .
                '</xades:DataObjectFormat>' .
              '</xades:SignedDataObjectProperties>' .
            '</xades:SignedProperties>';

            $publicPEM = "";
            openssl_x509_export($publicKey, $publicPEM);
            $publicPEM = str_replace("-----BEGIN CERTIFICATE-----", "", $publicPEM);
            $publicPEM = str_replace("-----END CERTIFICATE-----", "", $publicPEM);
            $publicPEM = str_replace("\n", "", $publicPEM);
            $publicPEM = str_replace("\r", "", chunk_split($publicPEM, 76));


            $privateData = openssl_pkey_get_details($privateKey);
            $modulus = chunk_split(base64_encode($privateData['rsa']['n']), 76);
            $modulus = str_replace("\r", "", $modulus);
            $exponent = base64_encode($privateData['rsa']['e']);


            $kInfo = '<ds:KeyInfo Id="Certificate' . $certificateID . '">' . "\n" .
               '<ds:X509Data>' . "\n" .
                 '<ds:X509Certificate>' . "\n" . $publicPEM . '</ds:X509Certificate>' . "\n" .
               '</ds:X509Data>' . "\n" .
               '<ds:KeyValue>' . "\n" .
                 '<ds:RSAKeyValue>' . "\n" .
                   '<ds:Modulus>' . "\n" . $modulus . '</ds:Modulus>' . "\n" .
                   '<ds:Exponent>' . $exponent . '</ds:Exponent>' . "\n" .
                 '</ds:RSAKeyValue>' . "\n" .
               '</ds:KeyValue>' . "\n" .
             '</ds:KeyInfo>';

             $propDigest = base64_encode(sha1(str_replace('<xades:SignedProperties',
              '<xades:SignedProperties ' . $xmlns, $prop), true));
            $kInfoDigest = base64_encode(sha1(str_replace('<ds:KeyInfo',
              '<ds:KeyInfo ' . $xmlns, $kInfo), true));
            $documentDigest = base64_encode(sha1($xml, true));

            $sInfo = '<ds:SignedInfo Id="Signature-SignedInfo' . $signedInfoID . '">' . "\n" .
               '<ds:CanonicalizationMethod Algorithm="http://www.w3.org/TR/2001/REC-xml-c14n-20010315">' .
               '</ds:CanonicalizationMethod>' . "\n" .
               '<ds:SignatureMethod Algorithm="http://www.w3.org/2000/09/xmldsig#rsa-sha1">' .
               '</ds:SignatureMethod>' . "\n" .
               '<ds:Reference Id="SignedPropertiesID' . $signedPropertiesID . '" ' .
               'Type="http://uri.etsi.org/01903#SignedProperties" ' .
               'URI="#Signature' . $signatureID . '-SignedProperties' .
               $signatureSignedPropertiesID . '">' . "\n" .
                 '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">' .
                 '</ds:DigestMethod>' . "\n" .
                 '<ds:DigestValue>' . $propDigest . '</ds:DigestValue>' . "\n" .
               '</ds:Reference>' . "\n" .
               '<ds:Reference URI="#Certificate' . $certificateID . '">' . "\n" .
                 '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">' .
                 '</ds:DigestMethod>' . "\n" .
                 '<ds:DigestValue>' . $kInfoDigest . '</ds:DigestValue>' . "\n" .
               '</ds:Reference>' . "\n" .
               '<ds:Reference Id="Reference-ID-' . $referenceID . '" URI="">' . "\n" .
                 '<ds:Transforms>' . "\n" .
                   '<ds:Transform Algorithm="http://www.w3.org/2000/09/xmldsig#enveloped-signature">' .
                   '</ds:Transform>' . "\n" .
                 '</ds:Transforms>' . "\n" .
                 '<ds:DigestMethod Algorithm="http://www.w3.org/2000/09/xmldsig#sha1">' .
                 '</ds:DigestMethod>' . "\n" .
                 '<ds:DigestValue>' . $documentDigest . '</ds:DigestValue>' . "\n" .
               '</ds:Reference>' . "\n" .
             '</ds:SignedInfo>';

            $signaturePayload = str_replace('<ds:SignedInfo', '<ds:SignedInfo ' . $xmlns, $sInfo);
            $signatureResult = "";

            $signaturePayload = str_replace('<ds:SignedInfo', '<ds:SignedInfo ' . $xmlns, $sInfo);
            $signatureResult = "";
            openssl_sign($signaturePayload, $signatureResult, $privateKey);
            $signatureResult = chunk_split(base64_encode($signatureResult), 76);
            $signatureResult = str_replace("\r", "", $signatureResult);

            $sig = '<ds:Signature xmlns:xades="http://uri.etsi.org/01903/v1.3.2#" Id="Signature' . $signatureID . '">' . "\n" .
                $sInfo . "\n" .
                '<ds:SignatureValue Id="SignatureValue' . $signatureValueID . '">' . "\n" .
                $signatureResult .
                '</ds:SignatureValue>' . "\n" .
                $kInfo . "\n" .
                '<ds:Object Id="Signature' . $signatureID . '-Object' . $signatureObjectID . '">' .
                '<xades:QualifyingProperties Target="#Signature' . $signatureID . '">' .
                    $prop .
                '</xades:QualifyingProperties>' .
                '</ds:Object>' .
            '</ds:Signature>';

            $xml = str_replace('<xs:LT/>', $sig , $xml);
            return $xml;
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
                        $impuesto = ['Codigo'=>$value[12],'Tarifa'=>$value[15],'Monto'=>$value[13], 'Exoneracion' =>  $exoneracion];
                        $detalle['Impuesto'] = $impuesto;
                        $detalle['MontoTotalLinea'] = $value[16];
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
    }   

 ?>