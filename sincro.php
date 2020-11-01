<?php 
    session_start();
    if (!isset($_SESSION['USR'])) {
        header('Location: ./dashboard/login');
    }
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

    $server = $base->ejecutar('select valor from ajustes where descr = "sincro"')->fetch_all()[0][0];

    $rs = $base->ejecutar('select id,idfila,idtabla,idestado,cmd from sincro where !issync and idsucursal = '.$_SESSION['IMPRESA'].' limit 20')->fetch_all();
    
    if(isset($_REQUEST['debug'])){
        echo "RESPUETA BASE<hr><pre>";
        print_r($rs);
        echo "</pre>";
    }
    $sts = [];

    foreach ($rs as $obj) {
        $variables = explode(',', $obj[4]);
        switch ($obj[2]) {
            case 1:
                $whr = $obj[3] == 0 ? 'id > 2' : 'id = '.$obj[1];
                break;
            default:
                $whr = $obj[3] == 0 ? 'id > 0' : 'id = '.$obj[1]; 
                break;
        }
        $acc = $obj[3] == 0 ? 1 : $obj[3];
        dosts($obj[0],$sts,$obj[2],$whr,$obj[1],$acc,$base,0,0,0);

        if (is_array($variables)) {
            $whr = $variables[0];
            unset($variables[0]);

            foreach ($variables as $nexo) {
                if($nexo)
                    dosts($obj[0],$sts,$nexo,$whr,$nexo,$acc,$base,1,$obj[1],$obj[2]);
            }
        }
    }
    if(isset($_REQUEST['debug'])){
        echo 'FILAS DE SINCRONIZACION<hr>';
        echo "<pre>";
        print_r($sts);
        echo "</pre>";
    }

    $curl = curl_init($server.'/wsdlServer.php');
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

    if(isset($_REQUEST['debug']) && !isset($json_arr['error']))
        echo 'ERROR SERVER<hr>'.$json_response.'<br><br>';

    if(isset($_REQUEST['debug'])){
        echo "RESPUESTA DEL SERVER <hr>";
        echo '<pre>';
        print_r($json_arr);
        echo "</pre>";
    }

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

    /*$rs = $base->ejecutar('select id,idfila,idtabla,idestado from sincro where !issync and idsucursal = '.$_SESSION['IMPRESA'])->fetch_all();
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
    
    
    
    // echo $json_response;
    
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
        
    }else
        echo $json_response;*/

    function dosts($id,&$sts,$tbl,$whr,$row,$acc,&$base,$memory,$one,$two){
        $search = '';
        if(strpos($whr,'$1') !== false){
            $search = $whr;
        }

        if(strpos($tbl,':') === false)
            $mrow = 'id';
        else{
            $mrow = substr($tbl, strpos($tbl,':')+1);
            $tbl = substr($tbl,0,strpos($tbl,':'));
        }

        if(strpos($tbl,'^') !== false){
            $whr = substr($tbl, strpos($tbl,'^')+1);
            $tbl = substr($tbl,0,strpos($tbl,'^'));
        }

        if(strpos($whr,'$1') !== false){
            $search = trim(str_replace('=','',substr($whr,0,strpos($whr,'$1'))));
            $whr = str_replace('$1', $one,$whr);
            $whr = str_replace('$2', $two,$whr);
        }        

        $line = $base->ejecutar('call krattos("*",'.$tbl.',"'.$whr.'")');
        if(!isset($line->num_rows))
            echo 'SQL<hr>call krattos("*",'.$tbl.',"'.$whr.'")<br>RS:'.$line.'<br>';

        while ($_row = $line->fetch_array(MYSQLI_ASSOC)) {

            if($_row > 0)
                array_push($sts, ['id'=>$id,'acc' => $acc,"tbl" => $tbl, "row" => $_row[$mrow],"bdy" => $_row,'memory' => $memory,'mrow'=>$mrow,'search'=>$search]);
        }
    }
 ?>