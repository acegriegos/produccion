<?php 
    $consulta = str_replace('-', '', str_replace(' ', '', $_REQUEST['ced']));
    $source = "https://api.hacienda.go.cr/fe/ae?identificacion=".$consulta;
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $source);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION,0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $data = curl_exec($ch);
    $error = curl_error($ch);
    $status = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    curl_close ($ch);
    
    $data = (array)json_decode($data);
    
    if (isset($data['nombre'])) {
        $salida['ap1'] = "";
        $salida['ap2'] = "";
        $salida['nom'] = $data['nombre'];
        $salida['ced'] = $data['tipoIdentificacion'] == 3 ? $consulta :substr($consulta, 0,10);
        $salida['tip'] = $data['tipoIdentificacion'];
        $salida['succed'] = 1;
    }else{
        $salida['error'] = 'Cédula no Existente';
        $salida['succed'] = 0;
    }
    
    echo json_encode($salida);
    
 ?>