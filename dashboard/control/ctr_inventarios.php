<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	   
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_inventarios.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			//PROD
	   			$smarty->display('ajax/ajaxmantInvDevoluciones.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('INSU',$kakaroto->kamehameha('*',42,''));
	   			$smarty->display('ajax/ajaxmantInvInsumos.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			//PROD
	   			$smarty->display('ajax/ajaxmantInvGastos.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('TIP',$kakaroto->kamehameha('*',38,''));
	   			$smarty->assign('INV',$kakaroto->kamehameha('*',40,''));
	   			$smarty->display('ajax/ajaxmantInvContable.tpl');
	   			break;
	   		case 5:
	   			
	   			break;
	   		// $transaccion = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
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