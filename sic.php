<?php 
    $source = "https://apis.gometa.org/cedulas/".$_REQUEST['ced']."&key=FDcRP0mbFpJwTJz";
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $source);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_SSLVERSION,false);
    $data = curl_exec ($ch);
    $error = curl_error($ch);
    curl_close ($ch);

    $data = (array)json_decode($data);

    if (isset($data['results'][0]->type)) {
        switch ($data['results'][0]->type) {
            case 'F':
                $tipo = 1;
                $name = trim($data['results'][0]->firstname1.' '.$data['results'][0]->firstname2);
                $ap1 = $data['results'][0]->lastname1;
                $ap2 = $data['results'][0]->lastname2;
                $ced = $data['results'][0]->cedula;
                break;
            case 'C':
            case 'J':
                $tipo = 2;
                $name = $data['results'][0]->fullname;
                $ap1 = '';
                $ap2 = '';
                $ced = $data['results'][0]->cedula;
                break;
            case 'E':
                $tipo = 4;
                $name = $data['results'][0]->lastname2.' '.$data['results'][0]->firstname1;
                $ap1 = $data['results'][0]->lastname1;
                $ap2 = '';
                $ced = $data['results'][0]->cedula;
                break;
            default:
                $tipo = 3;
                $name = $data['results'][0]->fullname;
                $ap1 = '';
                $ap2 = '';
                $ced = $data['results'][0]->cedula;
                break;
         } 
        $salida['ap1'] = $ap1;
        $salida['ap2'] = $ap2;
        $salida['nom'] = $name;
        $salida['ced'] = $ced;
        $salida['tip'] = $tipo;
        $salida['succed'] = 1;
    }else{
        $salida['error'] = 'Cédula no Existente';
        $salida['succed'] = 0;
    }

    echo json_encode($salida);
    
 ?>