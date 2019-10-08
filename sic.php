<?php 
    $source = "https://api.hacienda.go.cr/fe/ae?identificacion=".$_REQUEST['ced'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $source);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION,false);
    $data = curl_exec ($ch);
    $error = curl_error($ch);
    curl_close ($ch);
    $data = (array)json_decode($data);
    
    if (isset($data['nombre'])) {
        $salida['ap1'] = "";
        $salida['ap2'] = "";
        $salida['nom'] = $data['nombre'];
        $salida['ced'] = substr($_REQUEST['ced'], 0,10);
        $salida['tip'] = $data['tipoIdentificacion'];
        $salida['succed'] = 1;
    }else{
        $salida['error'] = 'Cédula no Existente';
        $salida['succed'] = 0;
    }
    
    echo json_encode($salida);
    
 ?>