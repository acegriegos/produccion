<?php 
    
    require_once '../dashboard/model/m_login.php';
    $log = new _login();

    $config = $log->kamehameha('',42,'@@impresa')[0];

    if ($config[19]) { //24-7
        //CONSULTAR CEDULAS
        $curl = curl_init($config[18]);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

        $params = array(
          "cmd" => 6);

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

        $json_response;
        require_once 'mysqlDB.php';
        // require_once '../wsdlClient.php';
        $db = new DBClass();
        $salida = [];

        foreach ($json_response->rs as $obj) {
            $ced = $db->ejecutar('select cedula from sucursales "'.$obj[0]);
            print_r($ced->fetch_all()[0]);
            echo '<br>';
            // if($ced->num_rows){
            //     compras($url,$ced->fetch_all()[0],$isp);    
            // }
            
        }

        echo '<hr>';
        print_r($_SESSION);

    }else{ //NORMAL

    session_start();

    if (!isset($_SESSION['IMPRESA'])) {
        if (isset($_GET['imp'])) {
            $_SESSION['IMPRESA'] = $_GET['imp'];
        }else{
            echo "Usuaro sin Registrar";
            exit(0);
        }
    }
    
    require_once 'mysqlDB.php';
    require_once '../wsdlClient.php';
    $db = new DBClass();
    $salida = [];

    //ESTADO PROCESANDO

    //FACTURAS Y TICKETS

    $lista = $db->ejecutar('select id from facturas where feestado in(2,9) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa in(1,7) limit 40');
    

    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();

        foreach ($lista as $obj) {
            $fe = new facturaElectronica($obj[0]);

            $estado = $fe->estado();
            $nesatdo = 2;
            if(isset($estado['estado'])){
                switch ($estado['estado']) {
                    case 'aceptado':
                        $nesatdo = 1;
                        break;
                    case 'rechazado':
                        $nesatdo = 3;
                        break;
                    case 'procesando':
                        $nesatdo = 2;
                        break;
                    case 'Sin Internet':
                        $nesatdo = 2;
                        break;
                    case 'Sin Subir':
                        $nesatdo = 0;
                        break;
                    default:
                        break;
                }

                $rs = $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
                $salida['PROCESS']['FACTURAS'][$obj[0]] = $estado['estado'];
            }
        }
    }
    
    //ACPTACIONES ACEPTACIONES-PARCIALES RECHAZOS

    $lista = $db->ejecutar('select id from facturas where feestado in(2,9) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and chat_lenght(referencia) = 50 order by id desc limit 20');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('^'.$obj[0]);

            $estado = $fe->estado();
            $nesatdo = 2;
            if(isset($estado['estado'])){
                switch ($estado['estado']) {
                    case 'aceptado':
                        $nesatdo = 1;
                        break;
                    case 'rechazado':
                        $nesatdo = 3;
                        break;
                    case 'procesando':
                        $nesatdo = 2;
                        break;
                    case 'Sin Internet':
                        $nesatdo = 2;
                        break;
                    case 'Sin Subir':
                        $nesatdo = 0;
                        break;
                    default:
                        break;
                }

                $db->ejecutar('call shadow(2,64,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
                $salida['PROCESS']['COMPRAS'][$obj[0]] = $estado['estado'];
            }
        }
    }

    //NC ND

    $lista = $db->ejecutar('select a.id from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(2,9) and a.idtipo in(5,6) order by id desc limit 10');

    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('-'.$obj[0]);

            $estado = $fe->estado();
            $nesatdo = 2;
            if(isset($estado['estado'])){
                switch ($estado['estado']) {
                    case 'aceptado':
                        $nesatdo = 1;
                        break;
                    case 'rechazado':
                        $nesatdo = 3;
                        break;
                    case 'procesando':
                        $nesatdo = 2;
                        break;
                    case 'Sin Internet':
                        $nesatdo = 2;
                        break;
                    case 'Sin Subir':
                        $nesatdo = 0;
                        break;
                    default:
                        break;
                }

                $db->ejecutar('call shadow(2,301,"feestado = '.$nesatdo.'","id = '.$obj[0].'")');
                $salida['PROCESS']['CUENTAS'][$obj[0]] = $estado['estado'];
            }
        }
    }

    //ESTADO SIN ENVIAR, SIN INTERNET
    //TIQUETES Y FACTURAS
    /*$lista = $db->ejecutar('select id from facturas where feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and idtipoventa in(1,7) order by id desc limit 10');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica($obj[0]);

            $rs = $fe->recepcion();

            if(is_array($rs)){
                $db->ejecutar('call shadow(2,64,"feestado = 2","id = '.$obj[0].'")');
                $salida['SEND']['FACTURAS'][$obj[0]] = 'done';
            }else{
                $db->ejecutar('call shadow(2,64,"feestado = 8,comentario=concat(comentario,\" '.$rs.'\")","id = '.$obj[0].'")');
                $salida['SEND']['FACTURAS'][$obj[0]] = 'fail';
            }   
        }
    }

    //A A-P R
    $lista = $db->ejecutar('select id from facturas where feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and char_length(referencia) = 50 order by id desc limit 10');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('^'.$obj[0]);

            $rs = $fe->recepcion();
            if(is_array($rs)){
                $db->ejecutar('call shadow(2,64,"feestado = 2","id = '.$obj[0].'")');
                $salida['SEND']['COMPRAS'][$obj[0]] = 'done';
            }else{
                $db->ejecutar('call shadow(2,64,"feestado = 8,comentario=concat(comentario,\" '.$rs.'\")","id = '.$obj[0].'")');
                $salida['SEND']['COMPRAS'][$obj[0]] = 'fail';
            }
        }
    }

    //NC ND
    $lista = $db->ejecutar('select a.id from estadoscuentas a join facturas b on b.id = a.idfactura and b.idsucursal = '.$_SESSION['IMPRESA'].' where a.feestado in(0,7) and a.idtipo in(5,6) order by id desc limit 10');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('-'.$obj[0]);

            $rs = $fe->recepcion();
            if(is_array($rs)){
                $db->ejecutar('call shadow(2,301,"feestado = 2","id = '.$obj[0].'")');
                $salida['SEND']['CUENTAS'][$obj[0]] = 'done';
            }else{
                $db->ejecutar('call shadow(2,301,"feestado = 8,comentario=concat(comentario,\" '.$rs.'\")","id = '.$obj[0].'")');
                $salida['SEND']['CUENTAS'][$obj[0]] = 'fail';
            }
            
        }
    }
*/

    $sucursal = $log->kamehameha('cedula,isprueba',39,'id=@@impresa')[0];
    compras($config[18],$sucursal[0],$sucursal[1]);
    echo json_encode($salida);

    }//NORMAL

function compras($url,$ced,$isp){
    $curl = curl_init($url);
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

    $params = array(
      "cmd" => 4,
      "ced" => $ced,
      "isp" => $isp);

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
        $obj[17] = $obj[17] == 'CRC'|| $obj[17] == 1 ? 1 : 2;
        $idproveedor = $log->kamehameha("vid",264,'replace(cedula,"-","") = '.$obj[39]);

        if(!sizeof($idproveedor))
           $log->genkidama(1,264,'',$obj[37].',"'.$obj[38].'","'.$obj[39].'","'.$obj[40].'","'.$obj[41].'","'.$obj[42].'","'.$obj[43].'","'.$obj[44].'","'.$obj[45].'","'.$obj[46].'","'.$obj[47].'"');
        
        $compra = $log->kamehameha('id',262,'referencia = "'.$obj[16].'"');

        if (!sizeof($compra)) {
            $salida['RS_HACIENDA'][$obj[0]]['Referencia'] = "Referencia Nueva: ".$obj[16].'';
           $log->genkidama(1,262,'','null,"'.$obj[1].'","'.$obj[2].'","'.$obj[3].'","'.$obj[4].'","'.$obj[5].'","'.$obj[6].'","'.$obj[49].'","'.$obj[8].'","'.$obj[9].'","'.$obj[10].'","'.$obj[11].'","'.$obj[12].'","'.$obj[13].'","'.$obj[14].'","'.$obj[15].'","'.$obj[16].'","'.$obj[17].'","'.$obj[18].'","'.$obj[19].'","'.$obj[48].'","'.$obj[21].'","'.$obj[22].'","'.$obj[23].'","'.$obj[24].'","'.$obj[25].'","'.$obj[26].'","'.$obj[27].'"');
           $compra = $log->kamehameha('id',262,'referencia = '.$obj[16])[0][0];
        }else{
            $salida['RS_HACIENDA'][$obj[0]]['Referencia'] =  "Referencia Existente: ".$obj[16].'';
            $compra = $compra[0][0];
        }

        $log->genkidama(1,63,'','null,"'.$compra.'","'.$obj[31].'",null,null,"'.$obj[32].'","'.$obj[33].'","'.$obj[34].'",0,"'.$obj[35].'","'.$obj[30].'","'.$obj[36].'","","",0');

    }
    $temporales = $log->kamehameha('id,fecha',262,'id>0 and datediff(curdate(),fecha) >= 7 limit 20');

    foreach ($temporales as $obj) {
        $f1 = new DateTime($obj[1]);
        $f2 = new DateTime();
        $dif = $f2->diff($f1)->format('%a');
        $salida['time'] = $dif;
        if($dif >= 7){
            $idfact = $log->kamehameha('',266,$obj[0].',@@usr,@@impresa,5')[0][0];
            if ($dif <= 38) {
                $salida['COMPRAS'][$obj[0]] = "ENVIAR HACIENDA";
                include_once '../wsdlClient.php';
                $fe = new facturaElectronica('^'.$idfact);
            }else
                $salida['COMPRAS'][$obj[0]] = "GUARDAR";
            
        }else
            $salida['COMPRAS'][$obj[0]] = "diferencia en dias: ".$dif;
    }
}

?>
