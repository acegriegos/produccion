<?php 
    
    require_once '../dashboard/model/m_login.php';
    $log = new _login();

    $config = $log->kamehameha('',42,'@@impresa')[0];
    $sucursal = $log->kamehameha('cedula,isprueba',39,'id=@@impresa')[0];

    $curl = curl_init($config[18]);
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

    $params = array(
      "cmd" => 4,
      "ced" => $sucursal[0],
      "isp" => $sucursal[1]);

    $postData = "";

    foreach($params as $k => $v)
    {
       $postData .= $k . '='.urlencode($v).'&';
    }

    $postData = rtrim($postData, '&');

    curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

    $json_response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    curl_close($curl);
    $json_response = json_decode($json_response);
    
    foreach ($json_response->rs as $obj) {
        $obj[17] = $obj[17] == 'CRC' ? 1 : 2;
        $idproveedor = $log->kamehameha("vid",264,'replace(cedula,"-","") = '.$obj[39]);

        if(!sizeof($idproveedor))
           $log->genkidama(1,264,'',$obj[37].',"'.$obj[38].'","'.$obj[39].'","'.$obj[40].'","'.$obj[41].'","'.$obj[42].'","'.$obj[43].'","'.$obj[44].'","'.$obj[45].'","'.$obj[46].'","'.$obj[47].'"');
        
        $compra = $log->kamehameha('id',262,'referencia = "'.$obj[16].'"');

        if (!sizeof($compra)) {
            echo "Referencia Nueva: ".$obj[16].'<br>';
           $log->genkidama(1,262,'','null,"'.$obj[1].'","'.$obj[2].'","'.$obj[3].'","'.$obj[4].'","'.$obj[5].'","'.$obj[6].'","'.$obj[49].'","'.$obj[8].'","'.$obj[9].'","'.$obj[10].'","'.$obj[11].'","'.$obj[12].'","'.$obj[13].'","'.$obj[14].'","'.$obj[15].'","'.$obj[16].'","'.$obj[17].'","'.$obj[18].'","'.$obj[19].'","'.$obj[48].'","'.$obj[21].'","'.$obj[22].'","'.$obj[23].'","'.$obj[24].'","'.$obj[25].'","'.$obj[26].'","'.$obj[27].'"');
           $compra = $log->kamehameha('id',262,'referencia = '.$obj[16])[0][0];
        }else{
            echo "Referencia Existente: ".$obj[16].'<br>';
            $compra = $compra[0][0];
        }

        $log->genkidama(1,63,'','null,"'.$compra.'","'.$obj[31].'",null,null,"'.$obj[32].'","'.$obj[33].'","'.$obj[34].'",0,"'.$obj[35].'","'.$obj[30].'","'.$obj[36].'","","",0');
    }
    
 ?>