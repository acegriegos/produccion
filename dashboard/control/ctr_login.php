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
		    	print_r($user);
		    }else if (sizeof($user) == 1)
		    {

          if($user[0][6] == '')
            header("Location: ../bienvenida/bienvenida.html");
          else{
            if ($user[0][7] == 0)
              cambioDia($log);

              $_SESSION['USR']     = trim($encrypt->ency($user[0][0]));
              $_SESSION['NUM']     = trim($encrypt->ency($user[0][1]));
              $_SESSION['NOM']     = $user[0][2];
              $_SESSION['TIPO']    = $user[0][3];
              $_SESSION['EMPRESA'] = $user[0][4];
              $_SESSION['IMPRESA'] = $user[0][5];
              $_SESSION['TMP_CIA'] = 0;
              
              $vdir = $_POST['vdir'] == '' || $_POST['vdir'] == 'logout' ? 'main' : $_POST['vdir'];
              header("Location: ../dashboard/$vdir");
           }
  
		   }
    	}else{
    		if (isset($_SESSION['USR'])) {
		        header("Location: ../dashboard/main");
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
   			}else
          include 'view/ajax/tabla_'.$_REQUEST['arreglo']['tbl'].'.php';
   				
   			break;
   		case 7:
   			$transaccion = $log->genkidama($_REQUEST['arreglo']['accion'],$_REQUEST['arreglo']['tabla'],$_REQUEST['arreglo']['arg1'],$_REQUEST['arreglo']['arg2']);
   			break;
   		case 8:
   			
		   	break;

   	}

	 if(!$pagina){
      
      if (isset($_REQUEST['arreglo']['JSON'])) {
        $salida = array();
        
        foreach ($transaccion as $obj) {
          $salida[$obj[0]] = $obj[1];
        }
      }else{
        
  	   	if (is_array($transaccion)){
  			$marcas = $transaccion;
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
        $log->genkidama(2,15,'valor=1','descr="Cambio de Dia"');
     } 

     function indicadores($log){
        require_once '../assets/libs/nusoapLT/nusoap.php';

        $wsdls = $log->kamehameha('*',102,'id > 0');
        $tipoCambio = "";
        foreach ($wsdls as $obj) {

          $parametros = $log->kamehameha('detalle,valordetwsdl',103,'idwsdl = '.$obj[4]);
          $param_salida = array();
          foreach ($parametros as $obj1) {
            $param_salida[$obj1[0]] = $obj1[1];
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