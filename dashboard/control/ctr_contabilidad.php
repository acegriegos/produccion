<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty1.php');
	   
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_contabilidad.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   				
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');

	   			$smarty->assign('CUE',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and idsubcuenta = 0 order by nombre'));
				$smarty->assign('VCUE',$kakaroto->kamehameha('*',33,'1 limit 20'));
				
				$smarty->display('ajax/contabilidad/cuentas.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   				
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');

	   			$smarty->display('ajax/contabilidad/asientos.tpl');
	   			break;
	   		case 3:
	   			
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