<?php 
    require_once '_config/mysqlDB.php';
    $id = !isset($_REQUEST['id']) ? 42 : $_REQUEST['id'];
    $accion = !isset($_REQUEST['accion']) ? 1 : $_REQUEST['accion'];

    $fe = new facturaElectronica($id);

    switch ($accion) {
        case 1:
            //RECIBO DE FACTURA
            print_r($fe->recepcion());
            break;
        case 2:
            //GET XML
            header("Content-type: text/xml; encoding='UTF-8'");
            print $fe->getXMLRecepcion();
            break;
        case 3:
            //BEARER
            echo "<pre>";
                print_r($fe->getBearer());
            echo "<?pre>";
            break;
        case 4:
            //Consulta ESTADO;
            print_r($fe->estado());
            break;
        case 5:
            //Consulta General de Recibos
            $offset     = !isset($_REQUEST['offset']) ? '' : $_REQUEST['offset'];
            $limit      = !isset($_REQUEST['limit']) ? '' : $_REQUEST['limit'];
            $emisor   = !isset($_REQUEST['emisor']) ? 0 : $_REQUEST['emisor'];
            $receptor   = !isset($_REQUEST['receptor']) ? 0 : $_REQUEST['receptor'];
            print_r($fe->getRecibos($id,$offset,$limit,$emisor,$receptor));
            break;
        default:
            print_r(json_encode(['ERROR'=>'Accion no Valida']));
            break;
    }

    class facturaElectronica
    {
        var $info;
        var $id;
        var $bearer;

        function __construct($vid){
            $this->id = $vid;
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
              "password" => ')b](-&P>C?vC6>c*XeU$',
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
            // if ($status != 200) {
            //   echo "Error: call to URL failed with status $status, response $json_response, curl_error " . curl_error($curl) . ", curl_errno " . curl_errno($curl) . "\n";
            // }
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

            $xml = $this->getXMLRecepcion();

            $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
            curl_setopt($curl, CURLOPT_HEADER, true);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($curl,CURLINFO_HEADER_OUT,true);
            curl_setopt($curl, CURLOPT_POST, true);
            curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$this->bearer]);

            $params = json_encode(array('clave'     =>  $this->info['clave'],
                                        'fecha'     =>  $this->info['FechaEmision'],
                                        'emisor'    =>  ['tipoIdentificacion' => $this->info['Emisor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $this->info['Emisor']['Identificacion']['Numero']],
                                        'receptor'  =>  ['tipoIdentificacion' => $this->info['Receptor']['Identificacion']['Tipo'], 'numeroIdentificacion' => $this->info['Receptor']['Identificacion']['Numero']],
                                        'comprobanteXml' => base64_encode($xml)));

            curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

            $rs = curl_exec($curl);
            $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);
 
            switch ($status) {
                case 201:
                case 202:
                    $json_response = json_encode(['rs'=>'Factura Electronica Recibida']);
                    break;
                case 400:
                    $json_response = json_encode(['rs'=>'Error Factura Electronica: '.$this->id]);
                    break;
                default:
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
            return $this->getJSON('call fe_getencabezado('.$this->id.')')['clave'];
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
            $this->info = $this->getJSON('call fe_getencabezado('.$this->id.')');

            $data['FacturaElectronica'] = $this->info;
            $data['DetalleServicio'] = $this->getDetalle('call fe_getDetalle('.$this->id.')');
            $data['ResumenFactura'] = $this->getJSON('call fe_getResumen('.$this->id.')');
            $data['InformacionReferencia'] = ['TipoDoc' => '', 'Numero' => '', 'FechaEmision' => '', 'Codigo' => '', 'Razon' => '' ];
            $data['Normativa'] = ['NumeroResolucion' => 'Resolución DGT-R-13-2017', 'FechaResolucion' => '20-02-2017 08:05:00'];
            $data['Otros'] = ['OtroTexto' => '','OtroContenido' => ''];
            $data['Signature'] = '';

            $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?>
            <xs:schema xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" targetNamespace="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" elementFormDefault="qualified" attributeFormDefault="unqualified" version="4.2" vc:minVersion="1.1">
                <xs:import namespace="http://www.w3.org/2000/09/xmldsig#" schemaLocation="http://www.w3.org/TR/2008/REC-xmldsig-core-20080610/xmldsig-core-schema.xsd"/>     
            </xs:schema>');
            $this->array_to_xml($data,$xml_data);
            return $xml_data->asXML();
        }


        function array_to_xml( $data, &$xml_data ) {
            foreach( $data as $key => $value ) {
                if( is_array($value) ) {
                    $subnode =  is_numeric($key) ? $xml_data : $xml_data->addChild($key); 
                    $this->array_to_xml($value, $subnode);
                } else {
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
    }   

 ?>