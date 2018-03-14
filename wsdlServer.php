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

$file = fopen("assets/xml/".date('YmdHis').".txt", "w+");
            foreach($_POST as $key => $value){
             fwrite($file, $key.'='.$value.'\r\n');
            }
            
            fclose($file);

// if (isset($_POST['respuestaXml'])) {
//     $file = fopen("assets/xml/".date('YmdHis').".xml", "w+");
//             fwrite($file, base64_decode($_POST['respuestaXml']));
//             fclose($file);
// }

?>
