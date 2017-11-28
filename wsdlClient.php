<?php 
    require_once '_config/mysqlDB.php';
    
    header("Content-type: text/xml; encoding='UTF-8'");

    print recepcion(getBearer()); //->access_token

    function getBearer(){
        $curl = curl_init("https://idp.comprobanteselectronicos.go.cr/auth/realms/rut-stag/protocol/openid-connect/token");
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

        $params = array(
          "client_id" => "api-stag",
          "client_secret" => "",
          "username" => "cpj-3-101-697761@stag.comprobanteselectronicos.go.cr",
          "password" => ';_#:$XO;jY=Z+hd%JW|k',
          "grant_type" => "password");

        $postData = "";

        foreach($params as $k => $v)
        {
           $postData .= $k . '='.urlencode($v).'&';
        }

        $postData = rtrim($postData, '&');

        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

        $json_response = 123;//curl_exec($curl);

        //$status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);

        return json_decode($json_response);
    
    }

    function recepcion($Bearer)
    {
        $xml = getXMLRecepcion();

        $curl = curl_init("https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/recepcion");
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HTTPHEADER,['Content-Type: application/json','Authorization: bearer '.$Bearer]);

        $params = json_encode(array('clave'=>'50601011600310112345600100010100000000011999999999',
                                    'fecha'    =>  '2016-01-01T00:00:00-0600',
                                    'emisor'    =>  ['tipoIdentificacion' => '02', 'numeroIdentificacion' => '3101123456'],
                                    'receptor'  =>  ['tipoIdentificacion' => '02', 'numeroIdentificacion' => '3101123456'],
                                    'comprobanteXML' => $xml));

        curl_setopt($curl, CURLOPT_POSTFIELDS, $params);

        $json_response = $xml;//curl_exec($curl);

        curl_close($curl);
        return $json_response;
    }
   
    function getXMLRecepcion(){

        $data = [];
        $data['FacturaElectronica'] = getJSON('call fe_getencabezado(1)');

        $xml_data = new SimpleXMLElement('<?xml version="1.0" encoding="UTF-8"?>
<xs:schema xmlns="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:vc="http://www.w3.org/2007/XMLSchema-versioning" xmlns:ds="http://www.w3.org/2000/09/xmldsig#" targetNamespace="https://tribunet.hacienda.go.cr/docs/esquemas/2017/v4.2/facturaElectronica" elementFormDefault="qualified" attributeFormDefault="unqualified" version="4.2" vc:minVersion="1.1">
    <xs:import namespace="http://www.w3.org/2000/09/xmldsig#" schemaLocation="http://www.w3.org/TR/2008/REC-xmldsig-core-20080610/xmldsig-core-schema.xsd"/>     
</xs:schema>');
        array_to_xml($data,$xml_data);
        return $xml_data->asXML();
    }


    function array_to_xml( $data, &$xml_data ) {
        foreach( $data as $key => $value ) {
            if( is_numeric($key) ){
                $key = 'item'.$key; //dealing with <0/>..<n/> issues
            }
            if( is_array($value) ) {
                $subnode = $xml_data->addChild($key);
                array_to_xml($value, $subnode);
            } else {
                $xml_data->addChild("$key",htmlspecialchars("$value"));
            }
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
                                        $salida3[$narr1[$j]] = $narr1[$j+1];
                                    }
                                }
                                $salida2[$narr[$i]] = $salida3;
                            }else{
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
 ?>