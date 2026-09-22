<?php  
    require_once 'model/m_login.php';
    $log = new _login();
    
    if (!isset($_REQUEST['accion'])) {
      if (session_status() !== PHP_SESSION_ACTIVE){
        session_start(); 
      }

      if (isset($_POST['pss'])) {

        require_once '../_config/ecy.php';
        $log->ini($_POST['usr'],$_POST['pss']);
        $encrypt = new _cy();

        $user = $log->autenticar();
        if(sizeof($user) == 2){
          header("Location: ../dashboard/login");
        }else if (sizeof($user) == 1)
        {

          if($user[0][10] != ''){
            header("Location: ../dashboard/cambioPasswd.php?sr=".base64_encode($user[0][1])."&cr=".base64_encode($user[0][8])."&tr=".base64_encode($user[0][2]) );
            return false;
          }
     
              $_SESSION['USR']     = base64_encode($user[0][0]);
              $_SESSION['NUM']     = base64_encode($user[0][1]);
              $_SESSION['NOM']     = $user[0][2];
              $_SESSION['TIPO']    = $user[0][3];
              $_SESSION['EMPRESA'] = $user[0][4];
              $_SESSION['IMPRESA'] = $user[0][5];
              $_SESSION['TMP_CIA'] = $user[0][5];
              $_SESSION['TMPT']    = $user[0][11];
              $_SESSION['CRR']     = $user[0][8];
              $_SESSION['BUSS']    = $user[0][12] == 2 ? 3 : $user[0][12];
              $_SESSION['EXPR']    = $user[0][13];
              $mod = 'facturacion';

              switch ($user[0][12]) {
                case 0:
                case 2:
                case 3:
                  $caja = $log->kamehameha('',253,'"'.str_replace(' ', '', $_SERVER['REMOTE_ADDR']).'"');
                  
                  if ($caja[0][0]) {
                    if ($caja[0][1]) {
                      $_SESSION['CAJA']    = $caja[0][1];
                      $mod = 'facturacion';
                    }else{
                      $_SESSION['CAJA']    = 0;
                      $mod = $user[0][12] == 2 ? 'restaurante' : 'facturacion?tf=6';
                    }
                  }else{
                    $_SESSION['CAJA']    = 0;
                    $mod = 'facturacion';
                  }
                  break;
                case 4:
                  $mod = 'documentos';
                  break;
                case 5:
                  $mod = 'arrendamiento';
                  break;
                case 7:
                  $mod = 'cuentas?tf=2';
                  break;
                default:
                  $mod = 'facturacion';
                  break;
              }
              $vdir = $_POST['vdir'] == '' || $_POST['vdir'] == 'logout' ? $mod : $_POST['vdir'];
              
              header("Location: ../dashboard/$vdir");
           }
      }else{
        $mod = 'facturacion';
        
        if (isset($_SESSION['USR'])) {
            if ($_SESSION['BUSS'] == 1) {
              $mod = 'facturacion';
            }
            header("Location: ../dashboard/".$mod);
        }else{
        require '../_config/mySmarty.php';
       
        $smarty  = new mySmarty();
        $smarty->setModule('dashboard');
        $pg = $smarty->fetch('../view/menuSmarty.php');
        
        $smarty->display('login.tpl');

       }
    }
   }else{
   $pagina = 0;
   $tabla = 0;

    if (!isset($_REQUEST['arreglo'])) {
      header("Location: login");
    }

    switch ($_REQUEST['accion']) {
      case 1:
        $transaccion = $log->analizarTabla($_POST['arreglo']);
        break;
      case 2:
        $transaccion = $log->mantenimiento($_POST['arreglo']);
        break;
      case 3:
        $log->ini($_POST['arreglo']['user'],$_POST['arreglo']['pss']);
        $transaccion = $log->autenticar();

        if(isset($transaccion[0][7])){
          if ($transaccion[0][7] == 1 && !$transaccion[0][11])
            cambioDia($log,$transaccion);

          if(!$transaccion[0][11]){ //SOLO LOCAL
            $transaccion['tp'] = validarNube($log,$transaccion[0][5]);
            if($transaccion['tp'].is_array())
              $transaccion = [0=>$transaccion['tp']];

          }
        }
        break;
      case 4:
        $transaccion = $log->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        $tabla = $_REQUEST['arreglo']['tbl'];
        break;
      case 5:
        $transaccion = $log->kaioken($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        break;
      case 6:
        $pagina = 1;
        $otros = isset($_REQUEST['arreglo']['conteo']) ? $_REQUEST['arreglo']['conteo'] : '';

        if($otros != '')
          $transaccion = $log->sel_col($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        else
          $transaccion = $_REQUEST['arreglo']['sel'] == '-' ? $_REQUEST['arreglo']['where'] : $log->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);

        if (isset($_REQUEST['arreglo']['join'])) {
          $join = $log->kamehameha($_REQUEST['arreglo']['select'],$_REQUEST['arreglo']['join'],$_REQUEST['arreglo']['whr']);
        }
        if(isset($_REQUEST['arreglo']['cambio'])){
            $_REQUEST['arreglo']['tbl'] = $_REQUEST['arreglo']['cambio'];
        }
            
        if (!is_array($transaccion)) {
          $pagina = 0;
        }else{
          if($otros != '')
            include 'view/ajax/tabla_271.php';
          else
            include 'view/ajax/tabla_'.$_REQUEST['arreglo']['tbl'].'.php';
        }
        break;
      case 7:
        $transaccion = $log->genkidama($_REQUEST['arreglo']['accion'],$_REQUEST['arreglo']['tabla'],$_REQUEST['arreglo']['arg1'],$_REQUEST['arreglo']['arg2']);
        break;
      case 8:  //MOSTRAR SOLO PDFs
          $pagina = 1;
          if(!isset($_SESSION['IMPRESA']) && isset($_REQUEST['arreglo']['empresaid'])){
            $_SESSION['IMPRESA'] = $_REQUEST['arreglo']['empresaid'] ;
          }
          if (isset($_REQUEST['arreglo']['sel'])) {
            $transaccion = $log->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
            $datos = $transaccion;
          }
          
          if (isset($_REQUEST['arreglo']['mic']))
            $miscelaneos = $log->kamehameha('',50,'@@impresa')[0];

          if (isset($_REQUEST['arreglo']['id']))
            $id = $_REQUEST['arreglo']['id'];

          if (isset($_REQUEST['arreglo']['tit']))
            $tit = $_REQUEST['arreglo']['tit'];
          
          $filtros = ''; 
          if (isset($_REQUEST['arreglo']['filtro']))
            $filtros = $_REQUEST['arreglo']['filtro'];
          include 'view/pdf/'.$_REQUEST['arreglo']['arch'].'.php';  
        break;
        case 9:  //GENERAR SOLO XML
          $pagina = 1;
          unset($_REQUEST['accion']);
          if(!isset($_SESSION['IMPRESA']) && isset($_REQUEST['arreglo']['empresaid'])){
            $_SESSION['IMPRESA'] = $_REQUEST['arreglo']['empresaid'] ;
          }
          $estado = isset($_REQUEST['arreglo']['restado']) ? $_REQUEST['arreglo']['restado'] : 'Factura';
          require_once '../wsdlClient.php';
          $xml = new facturaElectronica($_REQUEST['arreglo']['id']);
          $archivo = fopen('../assets/xml/'.$estado.' No'.$_REQUEST['arreglo']['factura'].' '.$_REQUEST['arreglo']['sucursal'].'.xml', "w+");
          fwrite($archivo, $xml->getXMLRecepcion());
          fclose($archivo); 
        break;
      case 10: //SELECT CON COLUMNAS
        $pagina = 1;
        
        if ($_REQUEST['arreglo']['header'] == 1)
          $transaccion = $log->sel_col($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        else
          $transaccion = $log->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        
        include 'view/ajax/tabla_global.php'; 

        break;
      case 11:
        $pagina = 1;
        if(!isset($_SESSION['IMPRESA']) && isset($_REQUEST['arreglo']['empresaid'])){
          $_SESSION['IMPRESA'] = $_REQUEST['arreglo']['empresaid'] ;
        }
        $arch = str_replace('^', '#', $_REQUEST['arreglo']['archivo']);
        $save = $_REQUEST['arreglo']['save'];
        $tit = $_REQUEST['arreglo']['tit'];
        $tit2 = isset($_REQUEST['arreglo']['tit2']) ? $_REQUEST['arreglo']['tit2'] : '' ;
        $conteo = isset($_REQUEST['arreglo']['conteo']) ? $_REQUEST['arreglo']['conteo'] : '' ;
        $suma = isset($_REQUEST['arreglo']['suma']) ? $_REQUEST['arreglo']['suma'] : '' ;

        $vista = isset($_REQUEST['arreglo']['vista']) ? $_REQUEST['arreglo']['vista'] : '';
        $miscelaneos = $log->kamehameha('',50,'@@impresa')[0];
        $transaccion = $log->sel_col($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
        include 'view/ajax/tabla_excel.php'; 
        break;
      case 12: //IMPRESION EXTERNA FIJA
        $pagina = 1;
        /*error_reporting(E_ALL);

        $pagina = 1;
        error_reporting(E_ALL);

        include("../print/PrintSend.php");
        include("../print/PrintSendLPR.php");

        $lpr = new PrintSendLPR();
        $lpr->setHost($_REQUEST['arreglo']['ip']); //192.168.31.153
        $lpr->setPort($_REQUEST['arreglo']['port']);
        $lpr->setData(htmlspecialchars($_REQUEST['arreglo']['data']));//utf8_encode()

        $lpr->printJob($_REQUEST['arreglo']['cola']);*/
        $random = date('YmdHis');
        $archivo = 'C:\\logintech\\'.$random.'.txt';
        file_put_contents($archivo, $_REQUEST['arreglo']['data']);

        //print_r(exec('COPY /B '.$archivo.' \\\\'.$_REQUEST['arreglo']['ip'].'\\'.$_REQUEST['arreglo']['cola']));

        touch($archivo);

        break;
      case 13: //FORKING
        $pagina = 1;
        ob_end_clean();
        ignore_user_abort();
        ob_start();
        header("Connection: close");
        echo json_encode('procesing...');
        header("Content-Length: " . ob_get_length());
        ob_end_flush();
        flush();
        
        include '../_config/autofacturas.php';
        
        break;
      case 14: //MENSAJE DE HACIENDA
        $pagina = 1;
        $_REQUEST['id'] = $_REQUEST['arreglo']['id'];
        $_REQUEST['accion'] = 16;
        $_REQUEST['sucname'] = $_REQUEST['arreglo']['sucursal'];
        require_once '../wsdlClient.php';
        $fe = new facturaElectronica($_REQUEST['arreglo']['id']);
        break;
      case 15: //READ SERVER COMPRAS
        $pagina = 1;
        getCompras($_REQUEST['server'],$_REQUEST['ced'],$_REQUEST['isp'],$log);
        break;
      case 16: //READ XML FILE RETURN ARRAY
        $pagina = 1;

        if(!file_exists('../assets/xml/'.$_REQUEST['n_archivo'])){
          echo json_encode(['succed'=>0,'rs'=>'Archivo no Existente']);
        }else{
          $xml = (array) simplexml_load_file('../assets/xml/'.$_REQUEST['n_archivo']);
          unlink('../assets/xml/'.$_REQUEST['n_archivo']);
          echo json_encode(['succed'=>1,'rs'=>$xml]);
        }
        break;
      case 17: //INIDACADORES ECONOMICOS
        $pagina = 1;
        ob_end_clean();
        ignore_user_abort();
        ob_start();
        header("Connection: close");
        echo json_encode('LOAD INDICACORES...');
        header("Content-Length: " . ob_get_length());
        ob_end_flush();
        flush();
        echo "inicio<br>";
        indicadores($log);
        break;
      case 18: //MASIVA
        $pagina = 1;
        $tp = isset($_REQUEST['arreglo']['tp']) ? $_REQUEST['arreglo']['tp'] : 1;
        switch($tp){
          case 1:
            $transaccion = $log->ins_mass($_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
            break;
          case 2:
            break;
          case 3:
            break;
          default:
            break;
        } 
        break;
      case 19:
        $pagina = 1;
        ob_end_clean();
        ignore_user_abort();
        ob_start();
        header("Connection: close");
        echo json_encode('LOAD FUNCIONES...');
        header("Content-Length: " . ob_get_length());
        ob_end_flush();
        flush();
        echo "inicio<br>";

        $log->kamehameha('',146,$_REQUEST['empresa']);

        $datos_correo_conta = $log->kamehameha('if(dia_rep_cont = date_format(curdate(),"%d"),1,0),correoconta',40,'idsucursal='.$_REQUEST['empresa'])[0];

        correocontador($datos_correo_conta[0],$_REQUEST['nombre'],$datos_correo_conta[1],$log);

        indicadores($log);

        break;
      case 20:
        $pagina = 1;
        echo $_REQUEST['arreglo']['file'];
        unlink($_REQUEST['arreglo']['file']);
        break;
      default:
        break;

    }

   if(!$pagina){
      
      if (isset($_REQUEST['arreglo']['JSON'])) {
        $salida = array();
        
        if (is_array($transaccion))
          foreach ($transaccion as $obj) {
            $salida[$obj[0]] = $obj[1];
          }
        else
          print_r($transaccion);
        
      }else{
        
        if (is_array($transaccion)){
          $marcas = $transaccion;
          if ($tabla == 234) {
            $ahora = new DateTime('now');
            $reserved = $_SESSION['tuser'];

            $interval = substr((strtotime($ahora->format('Y-m-d H:i:s')) - strtotime($reserved->format('Y-m-d H:i:s')))/60,0,1);
            if ($interval >= 120) {
              $succed = '';
            }else
              $succed = 1;
            
          }else
            $succed = 1;
        }else{
          $marcas = array('ERROR'=>$transaccion);
          $succed = 0;
        }
        
        $salida = array('succed'=>$succed);
        array_push($salida, $marcas);

      }
      
      echo json_encode($salida);
     }
   }

    function cambioDia($log,&$transaccion)
     { 
        $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $actual_link = str_replace('ctr_login.php','/dashboard/login', $actual_link);

        $salida = $log->getCURL($actual_link,['accion'=>19,'empresa'=>$transaccion[0][5],'nombre'=>$transaccion[0][4]]);

        return $salida;
     } 


     function validarNube($log,$suc){
      $cliente = $log->kamehameha('',50,$suc)[0];

        $cliente = [
          'nombre'    => $cliente[0],
          'cedula'    => $cliente[1],
          'fantasia'    => $cliente[2],
          'tp'      => $cliente[10],
          'correo'    => $cliente[4],
          'tel'     => $cliente[5],
          'servicio'    => 1,
          'fcorte'    => date('Y-m-28'),
          'valor'     => 15000,
          'prueba'    => $cliente[19],
          'simplificado'  => $cliente[40]
        ];
        
        $cliente = json_encode($cliente);
        $rs = (array) json_decode($log->getCURL('https://sistema.apsycr.com/api.php',['cmd'=>1,'cliente'=>base64_encode($cliente)])['rs']);

        if(sizeof($rs)){
          if(isset($rs['akey']))
            $log->genkidama(2,39,'sysmod="'.$rs['akey'].'"','id='.$suc);

          if($rs['rs'] != 1)
            return ['0'=>'CUENTA INACTIVA','1'=>1];
        }

     }

     function correocontador($_dia,$sname,$crr,$log){        
        if($_dia){

          $actual_link = (isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? "https" : "http") . "://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
          $actual_link = str_replace('ctr_login.php','/dashboard/login', $actual_link);

          $monthStart = (new DateTime("first day of last month"))->format('Y-m-d');
          $monthEnd = (new DateTime("last day of last month"));
          $monthName = $monthEnd->format('m-Y');
          $narchivo = 'VENTAS DEL MES '.$monthName.' '.$sname;
          $carchivo = 'COMPRAS DEL MES '.$monthName.' '.$sname;

          $params = array(
            "accion" => 11,
            "arreglo[sel]" => '',
            "arreglo[tbl]" => 167,
            "arreglo[where]" => '0,"1,7,10",@@impresa,"0","0","1","'.$monthStart.'","'.$monthEnd->format('Y-m-d').'","0","0","","0"',
            'arreglo[vista]' => '0,1,2,3,4,5,8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36',
            'arreglo[conteo]' => 1,
            'arreglo[suma]' => ',8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36,',
            'arreglo[tit]' => 'VENTAS DEL MES '.$monthName,
            'arreglo[archivo]' => $narchivo,
            'arreglo[save]' => 1,
            'arreglo[empresaid]' => 0
          );

          $log->getCURL($actual_link,$params);

          $params['arreglo[where]'] = '0,"2,9",@@impresa,"0","0",2,"2022-01-01","2022-03-01","0","0","0","undefined"';
          $params['arreglo[archivo]'] = $carchivo;
          $params['arreglo[tit]'] = 'COMPRAS DEL MES '.$monthName;

          $log->getCURL($actual_link,$params);

          //ENVIAR POR CORREO
          require_once '../_config/correo.php';
          $_SESSION['IMPRESA'] = $_REQUEST['empresa'];
          $_SESSION['EMPRESA'] = $_REQUEST['nombre'];
          $_SESSION['BUSS']    = 0;
          $_SESSION['CRR']     = '';
          $_SESSION['NOM']     = '';
          
          $correo = new correo($crr,'ARCHIVOS DEL MES '.$monthName,"Se adjuntan los archivos correspondientes.",'../');
          $correo->enviar_adjunto(['excel/'.$narchivo.'.xlsx','excel/'.$carchivo.'.xlsx']);

        }
     }

     function indicadores($log){

        $param_salida = array();
        $param_salida['Indicador'] = 318;
        $param_salida['FechaInicio'] = date('d/m/Y');
        $param_salida['FechaFinal'] = date('d/m/Y');
        $param_salida['Nombre'] = 'apsy';
        $param_salida['SubNiveles'] = 'N';
        $param_salida['CorreoElectronico'] = 'info@apsycr.com';
        $param_salida['Token'] = '5PSCRPNR0F';

        $curl = curl_init('https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos');
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

        $postData = "";

        foreach($param_salida as $k => $v)
        {
           $postData .= $k . '='.urlencode($v).'&';
        }

        $postData = rtrim($postData, '&');

        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

        $json_response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        $uno = strpos($json_response, '<NUM_VALOR>');
        $dos = strpos($json_response, '</NUM_VALOR>');
        $venta = str_replace('<NUM_VALOR>', '', substr($json_response,$uno,$dos-$uno));

        $param_salida = array();
        $param_salida['Indicador'] = 317;
        $param_salida['FechaInicio'] = date('d/m/Y');
        $param_salida['FechaFinal'] = date('d/m/Y');
        $param_salida['Nombre'] = 'apsy';
        $param_salida['SubNiveles'] = 'N';
        $param_salida['CorreoElectronico'] = 'info@apsycr.com';
        $param_salida['Token'] = '5PSCRPNR0F';

        $curl = curl_init('https://gee.bccr.fi.cr/Indicadores/Suscripciones/WS/wsindicadoreseconomicos.asmx/ObtenerIndicadoresEconomicos');
        curl_setopt($curl, CURLOPT_HEADER, true);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_HEADER,'Content-Type: application/x-www-form-urlencoded');

        $postData = "";

        foreach($param_salida as $k => $v)
        {
           $postData .= $k . '='.urlencode($v).'&';
        }

        $postData = rtrim($postData, '&');

        curl_setopt($curl, CURLOPT_POSTFIELDS, $postData);

        $json_response = curl_exec($curl);
        $status = curl_getinfo($curl, CURLINFO_HTTP_CODE);

        curl_close($curl);
        $uno = strpos($json_response, '<NUM_VALOR>');
        $dos = strpos($json_response, '</NUM_VALOR>');
        $compra = str_replace('<NUM_VALOR>', '', substr($json_response,$uno,$dos-$uno));

        $log->genkidama(2,54,'valor=if(wsdl=1,'.number_format($venta,2).',valor),compra='.number_format($compra,2).',venta='.number_format($venta,2),'codigo="USD" and wsdl');
     }  

    function getCompras($url,$ced,$isp,&$log){
      
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
		
      if (isset($json_response->rs)) {

          foreach ($json_response->rs as $obj) {
              $obj[17] = trim($obj[17]) == 'CRC' ? 1 : 2;

              $idproveedor = $log->kamehameha("vid",264,'replace(cedula,"-","") = '.$obj[39]);
              //echo json_encode(['proveedor'=>$idproveedor]);

              if(!sizeof($idproveedor)){
                 $log->genkidama(1,264,'','null,"'.$obj[38].'","'.$obj[39].'","'.$obj[40].'","'.$obj[41].'","'.$obj[42].'","'.$obj[43].'","'.$obj[44].'","'.$obj[45].'","'.$obj[46].'","'.$obj[47].'"');
                 $idproveedor = $log->kamehameha("vid",264,'replace(cedula,"-","") = '.$obj[39]);
               }
              
              $idproveedor = $idproveedor[0][0];
              $compra = $log->kamehameha('id',262,'referencia = "'.$obj[16].'"');

              if (!sizeof($compra)) {
                echo "FACTURA<br>";
                 print_r($log->genkidama(1,262,'','null,"'.$obj[1].'","'.$obj[2].'","'.$obj[3].'","'.$obj[4].'","'.$idproveedor.'","'.$obj[6].'","'.$obj[49].'","'.$obj[8].'","'.$obj[9].'","'.$obj[10].'","'.$obj[11].'","'.$obj[12].'","'.$obj[13].'","'.$obj[14].'","'.$obj[15].'","'.$obj[16].'","'.$obj[17].'","'.$obj[18].'","'.$obj[19].'","'.$obj[48].'","'.$obj[21].'","'.$obj[22].'","'.$obj[23].'","'.$obj[24].'","'.$obj[25].'","'.$obj[26].'","'.$obj[27].'","'.$obj[54].'"'));
                 $compra = $log->kamehameha('id',262,'referencia = "'.$obj[16].'"')[0][0];
              }else{
                  $compra = $compra[0][0];
              }

              echo 'DET FACTURA<br>';
              $rs = $log->genkidama(1,263,'','null,"'.$compra.'","'.$obj[31].'",'.$obj[52].','.$obj[51].',"'.$obj[32].'","'.$obj[33].'","'.$obj[34].'",0,"'.$obj[35].'","'.str_replace('"', '\"', $obj[30]).'","'.$obj[36].'","'.$obj[50].'","",0');
              print_r($rs);
          }
      }
    }

    function verificar($log,$ced,$sysmod,$idsucursal,$tp){
      #VERIFICAR CLIENTE EXISTE
      $params = array('cmd' => 8,'cedula' => $ced,'sysmod'=>$sysmod,'isucursal'=>$idsucursal,'tp'=>$tp);
      $result = $log->getCurl('http://sistema.apsycr.com/wsdlServer.php',$params);
      return $result['error'] != '' ? $result['error'] : $result['rs'];

    }
         
?>