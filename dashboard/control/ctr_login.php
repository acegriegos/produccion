<?php  
	
	  require_once 'model/m_login.php';
   	$log = new _login();

    if (!isset($_REQUEST['accion'])) {

    	if (session_status() !== PHP_SESSION_ACTIVE){
		    session_start();
        //exit(0);  
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

            if ($user[0][7] == 0)
              cambioDia($log);
     
              $_SESSION['USR']     = base64_encode($user[0][0]);
              $_SESSION['NUM']     = base64_encode($user[0][1]);
              $_SESSION['NOM']     = $user[0][2];
              $_SESSION['TIPO']    = $user[0][3];
              $_SESSION['EMPRESA'] = $user[0][4];
              $_SESSION['IMPRESA'] = $user[0][5];
              $_SESSION['TMP_CIA'] = $user[0][5];
              $_SESSION['TMPT']    = $user[0][11];
              $_SESSION['CRR']     = $user[0][8];
              $_SESSION['BUSS']    = $user[0][12];
              $mod = 'main';
              if ($user[0][12] != 0) {
                $mod = 'facturacion';
              }
              $vdir = $_POST['vdir'] == '' || $_POST['vdir'] == 'logout' ? $mod : $_POST['vdir'];
              header("Location: ../dashboard/$vdir");
           }
    	}else{
        $mod = 'main';
        
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
		    
		   	$smarty->assign('NAV',$pg);
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
          include 'view/ajax/tabla_'.$_REQUEST['arreglo']['tbl'].'.php';
        }
   			break;
   		case 7:
   			$transaccion = $log->genkidama($_REQUEST['arreglo']['accion'],$_REQUEST['arreglo']['tabla'],$_REQUEST['arreglo']['arg1'],$_REQUEST['arreglo']['arg2']);
   			break;
   		case 8:  //MOSTRAR SOLO PDFs
          $pagina = 1;

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
           
          include 'view/pdf/'.$_REQUEST['arreglo']['arch'].'.php';  
		   	break;
        case 9:  //GENERAR SOLO XML
          $pagina = 1;
          unset($_REQUEST['accion']);
          $estado = isset($_REQUEST['arreglo']['restado']) ? $_REQUEST['arreglo']['restado'] : 'Factura';
          require_once '../wsdlClient.php';
          $xml = new facturaElectronica($_REQUEST['arreglo']['id']);
          $archivo = fopen('../assets/xml/'.$estado.' N°'.$_REQUEST['arreglo']['factura'].', '.$_REQUEST['arreglo']['sucursal'].'.xml', "w+");
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

    function cambioDia($log)
     {  
        indicadores($log);
        $log->kamehameha('',146,'');
     } 

     function indicadores($log){
        require_once '../assets/libs/nusoapLT/nusoap.php';

        $wsdls = $log->kamehameha('',102,'');
        $tipoCambio = "";
        foreach ($wsdls as $obj) {

          $parametros = $log->kamehameha('',103,$obj[4]);
          $param_salida = array();
          foreach ($parametros as $obj1) {
            $param_salida[$obj1[1]] = $obj1[2];
          };

          $oSoapClient = new nusoap_client($obj[1],true);
          $aRespuesta = $oSoapClient->call($obj[2], $param_salida);
          $xml = (array) simplexml_load_string($aRespuesta[$obj[3]]);

          while (strpos($obj[5], ',')) {
            $valor = substr($obj[5], 0,strpos($obj[5], ','));
            $obj[5] = substr($obj[5], strpos($obj[5], ',')+1);
            $xml = (array) $xml[$valor];
          }          
    
          $tipoCambio = (string) $xml[$obj[5]];
          $log->genkidama(2,54,'valor='.number_format($tipoCambio,2),'id='.$obj[0]);
        };
     }	
			   
?>