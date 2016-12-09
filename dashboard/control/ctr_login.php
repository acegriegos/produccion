<?php  
	
	require_once 'model/m_login.php';
   	$log = new _login();

    if (!isset($_REQUEST['accion'])) {

    	if (session_status() !== PHP_SESSION_ACTIVE){
		    session_start();
		}

    	if (isset($_POST['pss'])) {
    		require_once '../_config/ecy.php';
    		$log->ini($_POST['id'],$_POST['pss']);
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
              
              header("Location: ../dashboard/main");
           }
  
		   }
    	}else{
    		if (isset($_SESSION['USR'])) {
		        header("Location: ../dashboard/main");
		    }
		    else{
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
        print_r($_POST);
   			break;
   		case 3:
   			$log->ini($_POST['arreglo']['id'],$_POST['arreglo']['pss']);
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
   			$transaccion = $log->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
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
      array_push($salida, array($transaccion[0][0] => null,$transaccion[1][0] => null));
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
		
    print_r(json_encode($salida));	
	
	 }
    }

    function cambioDia($log)
     {  
        indicadores($log);
        $log->genkidama(2,15,'valor=1','descr="Cambio de Dia"');
     } 

     function indicadores($log){
        require_once '../assets/libs/nusoapLT/nusoap.php';

        $tipoCambio = "";
        $parametros = array(
               "tcIndicador"=>318,
               "tcFechaInicio"=>date('d/m/Y'),
               "tcFechaFinal"=>date('d/m/Y'),
               "tcNombre"=>"LoginTech",
               "tnSubNiveles"=>"N");
        $oSoapClient = new nusoap_client("http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx?WSDL",true);
        $aRespuesta = $oSoapClient->call("ObtenerIndicadoresEconomicosXML", $parametros);
        $xml = (array) simplexml_load_string($aRespuesta['ObtenerIndicadoresEconomicosXMLResult']); 
        $xml = array_values($xml);     
        $tipoCambio = (string) $xml[0]->NUM_VALOR;

        $log->genkidama(2,54,'valor='.number_format($tipoCambio,2),'id=2');

        $parametros2 = array(
               "tcIndicador"=>317,
               "tcFechaInicio"=>date('d/m/Y'),
               "tcFechaFinal"=>date('d/m/Y'),
               "tcNombre"=>"LoginTech",
               "tnSubNiveles"=>"N");
        $oSoapClient = new nusoap_client("http://indicadoreseconomicos.bccr.fi.cr/indicadoreseconomicos/WebServices/wsIndicadoresEconomicos.asmx?WSDL",true);

        $aRespuesta = $oSoapClient->call("ObtenerIndicadoresEconomicosXML", $parametros2);
        $xml = (array) simplexml_load_string($aRespuesta['ObtenerIndicadoresEconomicosXMLResult']);
        $xml = array_values($xml); 
        $tipoCambio = (string) $xml[0]->NUM_VALOR;

       $log->genkidama(2,54,'valor='.number_format($tipoCambio,2),'id=3');
     }	
			   
?>