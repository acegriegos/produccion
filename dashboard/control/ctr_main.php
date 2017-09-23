<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_POST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	   	$sty = $smarty->fetch('../view/styles.php');
		$scr = $smarty->fetch('../view/scripts.php');

	   	$smarty->assign('NAV',$pg);
	   	$smarty->assign('STY',$sty);
	   	$smarty->assign('SCR',$scr);
	   	$smarty->display('v_main.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_POST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../assets/libs/braintree/Braintree.php';
	   			

	   			$nonceFromTheClient = $_POST["payment_method_nonce"];
	   			$result = Braintree_Transaction::sale([
				  'amount' => '10.00',
				  'paymentMethodNonce' => 'fake-valid-visa-nonce',//$nonceFromTheClient,
				  'options' => [
				    'submitForSettlement' => True
				  ]
				]);
				echo "<pre>";
				print_r($result);
				echo "</pre>";
	   			break;
	   		case 2:
	   			require_once '../assets/libs/braintree/Braintree.php';

				$transaccion = Braintree_ClientToken::generate();
	   			break;
	   		case 3:

	   			$idsuc = $_POST['arreglo'] >= 0 ? $_POST['arreglo'] : 0;
	   				
	   			$sucursal = $kakaroto->kamehameha('id,nombre',39,'id = '.$idsuc)[0][0];

	   			$_SESSION['EMPRESA'] = $sucursal[1];
              	$_SESSION['IMPRESA'] = $sucursal[0];
              	$_SESSION['TMP_CIA'] = $_POST['arreglo'] >= 0 ? 1 : 0;

              	$transaccion = $sucursal;

	   			break;
	   		case 4:
	   			
	   			break;
	   		case 5:
	   			
	   			break;
	   	}
		if(!$pagina){
		   	if (is_array($transaccion)){
				$marcas = $transaccion;
				$succed = 1;
				}else{
					$marcas = array('ERROR'=>$transaccion);
					$succed = 0;
				}
		
				$salida = array('succed'=>$succed);
				array_push($salida, $marcas);
				print_r(json_encode($salida));	
		
		   }
	    }	
			   
?>