<?php 
    
    // require_once ('assets/libs/nusoapLT/nusoap.php');
    // $wsdl = "http://localhost/dev/wsdlServer.php?wsdl";
    // $wsdl = "https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/";

    //  OAUTH2 

    // $client = new nusoap_client($wsdl,array('username' => 'cpj-3-101-697761@stag.comprobanteselectronicos.go.cr',
    //                                         'password' => ';_#:$XO;jY=Z+hd%JW|k',
    //                                         'authtype' => 'oauth2'));
    // print_r($client);
    // $err = $client->getError();
    // if ($err) {
    //    echo '<h2>Constructor error</h2>' . $err;
    //    exit();
    // }
    // $params = array(
    //     'factura'=>'4'
    // );

    // $result=$client->call('auth', '' );
    // print_r($client->getHeader());

    // if (!$result) {
    //     echo "<pre>";
    //     echo json_encode(array('error' => $result));
    //     echo "</pre>";
    // }else{
    //     echo "<pre>";
    //     echo json_encode(array('resultado' => $result));
    //     echo "</pre>";
    // }
    
    // $url         = "https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/"; 
    // $client     = new SoapClient($url, array("trace" => 1, "exception" => 0));
    // print_r($client);

    $url = 'https://api.comprobanteselectronicos.go.cr/recepcion-sandbox/v1/';
    $data = array('key1' => 'value1', 'key2' => 'value2');

    // use key 'http' even if you send the request to https://...
    $options = array(
        'http' => array(
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST'//,
            //'content' => http_build_query($data)
        )
    );
    
    $context  = stream_context_create($options);
    $result = file_get_contents($url, false, $context);
    if ($result === FALSE) { /* Handle error */ }

    var_dump($result);

?>