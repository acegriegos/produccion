<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {  
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");  
    header('Access-Control-Allow-Credentials: true');  
    header('Access-Control-Max-Age: 86400');   
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");  

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");  
}


if (isset($_POST['respuestaXml'])) {
    echo "string";
    //RESPUESTA DE HACIENDA
}else{
    $cmd = isset($_REQUEST['cmd']) ? $_REQUEST['cmd'] : '';
    $salida = [];
    switch ($cmd) {
        case 1:
            require_once '_config/mysqlDB.php';
            
            $cliente = isset($_POST['client_id']) ? $_POST['client_id'] : '';
            
            if (strlen($cliente) == 0){
                $salida['msj'] = 'CLIENTE NO VALIDO';
                $salida['error'] = 1;
            }else{
                $salida['msj'] = 'VAMO BIEN';
                $salida['error'] = 0;
            }
            break;
        
        default:
           $salida['msj'] = 'WSDL LOGINTECH';
           $salida['error'] = 1;
            break;
    }

    echo json_encode($salida);
}

?>
