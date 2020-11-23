<?php 
    session_start();
    set_time_limit(0);

    if(!isset($_REQUEST['show'])){
         if(!isset($_COOKIE['SINCRO'])){
            setcookie("SINCRO",1, time()+10);
            ob_end_clean();
            ignore_user_abort();
            ob_start();
            header("Connection: close");
            header("Content-Encoding: none");
            echo json_encode(['success'=>1]);
            header("Content-Length: " . ob_get_length());
            ob_end_flush();
            flush();
        }else{
            echo "SINCRO ACTIVADO";
            exit(0);
        }
    }

    require_once '_config/mysqlDB.php';
    $base = new DBClass();

    $rs = $base->ejecutar('select id,idfila,idtabla,idestado from sincro where !issync and idsucursal = '.$_SESSION['IMPRESA'])->fetch_all();
    $sts = [];
    foreach ($rs as $obj) {
        switch ($obj[3]) {
            case 1:
                $whr = $obj[2] == 65 ? 'idfactura = '.$obj[1] : 'id = '.$obj[1];
                $line = $base->ejecutar('call krattos("*",'.$obj[2].',"'.$whr.'")')->fetch_all();
                foreach ($line as $_line) {
                    array_push($sts, ['acc' => "1","tbl" => $obj[2], "row" => $obj[0],"bdy" => $_line]);
                }
                
                break;
            case 2:
                break;
            case 3:
                break;
            default:
                break;
        }
    }

    $curl = curl_init($_REQUEST['server'].'/wsdlServer.php');
    curl_setopt($curl, CURLOPT_HEADER, true);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($curl, CURLOPT_POST, true);
    curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

    $params = array(
      "cmd" => "3",
      "vid" => $base->ejecutar('select valor from ajustes where descr = "is_sync"')->fetch_all()[0][0],
      "vsucursal" => $_SESSION['IMPRESA'],
      "vmore"=>json_encode($sts));

    $postData = "";

    foreach($params as $k => $v)
    {   
       $postData .= $k . '='.urlencode($v).'&';
    }

    $postData = rtrim($postData, '&');

    curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

    $json_response = curl_exec($curl);
    $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

    $json_arr = (array)json_decode($json_response);
    // echo $json_response;
    if(isset($_REQUEST['debug'])){
        echo '<pre>';
        print_r($json_arr);
        echo "</pre>";
    }
    if(!$json_arr['error'] && is_array($json_arr['rs'])){
        foreach ($json_arr['rs'] as $obj) {
            $tbl = $base->ejecutar('call krattos("nombre",70,"id = '.$obj->tbl.'")')->fetch_all()[0][0];

            switch ($obj->acc) {
                case 0:
                    echo "<br>SINCRONIZANDO LA TABLA ".$tbl;
                    $base->ejecutar('truncate '.$tbl);
                    break;
                case 1:
                    echo "<br>INGRESANDO FILA ";
                    print_r($base->ejecutar('insert into '.$tbl.' values('.substr(substr(json_encode($obj->bdy),1),0,-1).')'));
                    break;
                case 2:
                    echo "<br>ACTUALIZANDO FILA ";
                    print_r($base->ejecutar('update '.$tbl.' set '.$obj->bdy.' where id = '.$obj->row));
                    break;
                case 3:
                    echo "<br>ELIMINANDO FILA ";
                    print_r($base->ejecutar('delete from '.$tbl.' where id = '.$obj->row));
                    break;
                case 4:
                    echo '<br>INGRESO MASIVO ';
                    print_r($base->ejecutar($obj->bdy));
                    break;
                default:
                    echo "<br>ACCION NO VALIDA";
                    break;
            }
        }

        $base->ejecutar('call shadow(2,11,"idsucursal = '.$_SESSION['IMPRESA'].'","id > 0")');

        if(isset($json_arr['last_id'])){
            $base->ejecutar('update ajustes set valor = '.$json_arr['last_id'].' where descr = "is_sync"');
            echo "<br>ULTIMA LINEA: ".$json_arr['last_id'];    
        }

        if(isset($json_arr['act'])){
            $rbarr = json_decode($json_arr['act']);
            foreach ($rbarr as $obj) {
                $base->ejecutar($obj);
            }
        }
        
    }else
        echo $json_response;
 ?>