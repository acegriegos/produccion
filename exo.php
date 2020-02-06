<?php 
    $source = "https://api.hacienda.go.cr/fe/ex?autorizacion=".$_REQUEST['exo'];
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $source);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION,0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    $data = curl_exec($ch);
    $error = curl_error($ch);
    curl_close ($ch);
    
    $data = (array)json_decode($data);
    
    if (isset($data['numeroDocumento'])) {
        /*if($data['identificacion'] == $_REQUEST['ced']){*/
            $salida = $data;
            $salida['succed'] = 1;
        /*}else{
            $salida['error'] = 'Exoneración no Enlazada';
            $salida['succed'] = 0;
        }*/
    }else{
        $salida['error'] = 'Exoneración no Existente';
        $salida['succed'] = 0;
    }
    
    echo json_encode($salida);
    
 ?>