<?php 
    
    require_once '../dashboard/model/m_login.php';
    $log = new _login();
    set_time_limit(0);

    // $fP = fSockOpen("ssl://google.com", 443, $errno, $errstr, 10);
    // if (!$fP) { echo json_encode(["rs"=>'Sin Internet',"erno"=>1]); exit(0); }

    $tw = $log->kamehameha('valor',15,'descr="24/7"')[0][0];

    if ($tw) { //24-7
        //CONSULTAR CEDULAS
        $config = $log->kamehameha('',42,'0')[0];
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
        $_SESSION['USR'] = base64_encode(1);

        foreach ($json_response->rs as $obj) {
            $ced = $db->ejecutar('select id,trim(replace(cedula,"-","")) from sucursales where trim(replace(cedula,"-","")) = "'.$obj[0].'"');
            if($ced->num_rows){
        $ced = $ced->fetch_all();
        echo '<hr>'.$ced[0][0].'<hr>';
        $_SESSION['IMPRESA'] = $ced[0][0];
        //print_r(compras($config[18],$ced[0][1],0,$log,$salida));
        echo '<br>';
            }
        }
    }else{ //NORMAL
        $config = $log->kamehameha('',42,'@@impresa')[0];

    if (session_status() == PHP_SESSION_NONE) {
        session_start();
    }

    if (!isset($_SESSION['IMPRESA'])) {
        if (isset($_GET['imp'])) {
            $_SESSION['IMPRESA'] = $_GET['imp'];
        }else{
            echo "Usuaro sin Registrar";
            exit(0);
        }
    }

    if(!isset($_COOKIE['AUTO'])){
        setcookie("AUTO",1, time()+10);
        ob_end_clean();
        ignore_user_abort();
        ob_start();
        header("Connection: close");
        echo json_encode(['success'=>1]);
        header("Content-Length: " . ob_get_length());
        ob_end_flush();
        flush();
    }else{
        echo "AUTO ACTIVADO";
        exit(0);
    }

    
    require_once 'mysqlDB.php';
    require_once '../wsdlClient.php';
    $db = new DBClass();
    $salida = [];
//ESTADO PROCESANDO

    //FACTURAS Y TICKETS

    $lista = $db->ejecutar('select a.id,group_concat(c.correo),mailstatus,if(idtipoventa in(1,10),1,0) from facturas a left join clientes b on b.id = a.idcliente left join correos c on c.idfila = b.id and c.idtabla = 2 where a.feestado in(2,9) and a.id > 0 and a.idsucursal = '.$_SESSION['IMPRESA'].' and a.idtipoventa in(1,7) group by a.id order by a.id limit 10');

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
                        /*if ($obj[2] == 0 && $obj[3]) # EVIOCORREO NORMAL
                            enviocorreoauto($db,$obj[0],$obj[1],0,$fe->info,$fe->titulo,64);
                        elseif ($obj[2] == 2 && $obj[3]) #ENVIAR SOLO RH
                            enviocorreoauto($db,$obj[0],$obj[1],1,$fe->info,$fe->titulo,64); */
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
                $salida['ESTADO']['FACTURAS'][$obj[0]] = $estado['estado'];
            }
        }
    }
    
    //ACPTACIONES ACEPTACIONES-PARCIALES RECHAZOS

    /*$lista = $db->ejecutar('select a.id,group_concat(distinct c.correo),mailstatus,if(idtipoventa in(1,10),1,0) from facturas a left join clientes b on b.id = a.idcliente left join correos c on c.idfila = b.id and c.idtabla = 2 where a.feestado in(2,9) and a.id > 1 and a.idsucursal = '.$_SESSION['IMPRESA'].' and char_length(a.referencia) = 50  group by a.id order by a.id limit 10');

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
                        if ($obj[2] == 0 && $obj[3]) # EVIOCORREO NORMAL
                            enviocorreoauto($db,$obj[0],$obj[1],0,$fe->info,$fe->titulo,64);
                        elseif ($obj[2] == 2 && $obj[3]) #ENVIAR SOLO RH
                            enviocorreoauto($db,$obj[0],$obj[1],1,$fe->info,$fe->titulo,64); 
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
    }*/

//ESTADO SIN ENVIAR, SIN INTERNET
    //TIQUETES Y FACTURAS
    //ESTADOS DE CORREO = 0 => SE ENVIO PARCIAL O NULO, 1 => SE ENVIO BIEN, 2 => VOLVER A ENVIAR

     $lista = $db->ejecutar('select a.id,group_concat(c.correo) from facturas a left join clientes b on b.id = a.idcliente left join correos c on c.idfila = b.id and c.idtabla = 2 where a.feestado in(0,7) and a.id > 0 and a.idsucursal = '.$_SESSION['IMPRESA'].' and a.idtipoventa in(1,7) group by a.id order by a.id limit 5');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            
            $fe = new facturaElectronica($obj[0]);
            $rs = $fe->recepcion();
            // if($obj[1])
            //     $fe->envioWsdlCorreo($db,$obj[0],$obj[1],0,98);

            $salida['SEND']['FACTURAS'][$obj[0]] = $rs;//'done';
        }
    }

    //A A-P R
    $lista = $db->ejecutar('select id from facturas where feestado in(0,7) and id > 1 and idsucursal = '.$_SESSION['IMPRESA'].' and char_length(referencia) = 50 order by id desc limit 10');
    if(isset($lista->num_rows)){
        $lista = $lista->fetch_all();
        foreach ($lista as $obj) {
            $fe = new facturaElectronica('^'.$obj[0]);
            $rs = $fe->recepcion();
            $salida['SEND']['COMPRAS'][$obj[0]] = 'done compra';
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


    $sucursal = $log->kamehameha('cedula,isprueba',39,'id=@@impresa')[0];
    //compras($config[18],$sucursal[0],$sucursal[1],$log,$salida);
    echo json_encode($salida);
    unset($_SESSION['AUTO']);
}//NORMAL

function enviocorreoauto(&$db,$id,$to,$mh = 0,$info,$tit,$idtabla){

    $cnf = $db->ejecutar("call krattos('',73,".$id.")")->fetch_all()[0];
    $num = $info['NumeroConsecutivo'];

    $_POST['con_con'] = 1;
    $_POST['accion'] = 3;
    $_POST['body'] = $cnf[0];
    $_POST['idfila'] = $id;
    $_POST['subject'] = $cnf[3]." N° ".$num;
    $_POST['to'] = $to;
    $_POST['idtabla'] = $idtabla;
    if(!$mh){
        $_POST['adjunto'] = [0=>'xml/'.$tit.' N°'.$num.', '.$_SESSION['EMPRESA'].'.xml',1=>'pdf/'.$tit.' N°'.$num.', '.$_SESSION['EMPRESA'].'.pdf'];

        //MAKE ARCHIVOS
        //PDF
        $_arreglo = ['arch'=>'recibo','id'=>$id,"mic"=>1,"tit"=>$tit ,"sel"=>'',"tbl"=>72,"where"=>$id,"empresaid"=>$_SESSION['IMPRESA']];

        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $actual_link = str_replace('autofacturas.php','/dashboard/login', $actual_link);
        $curl = curl_init($actual_link);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);

        $params = array(
          "accion" => 8,
          "arreglo" => $_arreglo);

        $postData = http_build_query($params);

        $postData = rtrim($postData, '&');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
        $json_response = curl_exec($curl);
        print_r($json_response);

        //XML
        $_arreglo = ['id'=>$id,"factura"=>$num,"sucursal"=>$_SESSION['EMPRESA'],"empresaid"=>$_SESSION['IMPRESA']];

        $curl = curl_init($actual_link);
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);

        $params = array(
          "accion" => 9,
          "arreglo" => $_arreglo);

        $postData = http_build_query($params);

        $postData = rtrim($postData, '&');
        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);
        $json_response = curl_exec($curl);
        curl_close($curl);
    }else
        $_POST['adjunto'] = []; 

   require_once './correoAjax.php';
}

// function compras($url,$ced,$isp,&$log,&$salida){
    
    
    
//     $temporales = $log->kamehameha('id,fecha',262,'id>0 and datediff(curdate(),fecha) >= 7 limit 20');

//     foreach ($temporales as $obj) {
//         $f1 = new DateTime($obj[1]);
//         $f2 = new DateTime();
//         $dif = $f2->diff($f1)->format('%a');
//         $salida['time'] = $dif;
//         if($dif >= 7){
//             $idfact = $log->kamehameha('',266,$obj[0].',@@usr,@@impresa,5')[0][0];
//             if ($dif <= 38) {
//                 $salida['COMPRAS'][$obj[0]] = "ENVIAR HACIENDA";
//                 include_once '../wsdlClient.php';
//                 $fe = new facturaElectronica('^'.$idfact);
//             }else
//                 $salida['COMPRAS'][$obj[0]] = "GUARDAR";
            
//         }else
//             $salida['COMPRAS'][$obj[0]] = "diferencia en dias: ".$dif;
//     }
// }

?>
