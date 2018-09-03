<?php 

    
        $options = [
        'uri' => 'http://schemas.xmlsoap.org/soap/envelope/',
        'style' => SOAP_RPC,
        'use' => SOAP_ENCODED,
        'soap_version' => SOAP_1_1,
        'cache_wsdl' => WSDL_CACHE_NONE,
        'connection_timeout' => 30,
        'trace' => true,
        'encoding' => 'UTF-8',
        'exceptions' => true
    ];
// El webservice en Hacienda hace la consulta utilizando los valores
// de parámetro que no estén vacíos, así que se puede hacer una consulta
// haciendo combinaciones.
    $params = [
        'origen' => 'Fisico', // Fisico,  Juridico o DIMEX
        'cedula' => '020665057727',
        'ape1' => '',
        'ape2' => '',
        'nomb1' => '',
        'nomb2' => '',
        'razon' => '',
        'Concatenado' => ''
    ];
    $wsdl = "http://196.40.56.20/wsInformativasSICWEB/Service1.asmx?WSDL";
    try {
        $soap = new SoapClient($wsdl, $options);
        $data = $soap->ObtenerDatos($params);
    } catch (Exception $e) {
        echo str_replace('"', '\'', $e->getMessage());
        return false;
    }
    echo "Respueta:<br>";
    $soap_response = $data->ObtenerDatosResult->any;
    $xml = str_replace(array("diffgr:", "msdata:"), '', $soap_response);

    print_r($xml);
    echo count($datos->diffgram->DocumentElement->Table);
 ?>