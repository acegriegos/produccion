<?php  
require_once 'model/m_general.php';
$kakaroto = new _general();

if (!isset($_REQUEST['accion'])) {
	require '../_config/mySmarty.php';

	$smarty  = new mySmarty();
	$smarty->setModule('dashboard');
	$pg = $smarty->fetch('../view/menuSmarty.php');

	$smarty->assign('NAV',$pg);
	$smarty->display('v_cuentas.tpl');
}else{
	$pagina = 0;
	switch ($_REQUEST['accion']) {
		case 1:
		$pagina = 1;
		require_once '../_config/mySmarty.php';
		$smarty  = new mySmarty();
		$smarty->setModule('dashboard');
		$smarty->assign('PRO',$kakaroto->kamehameha('',208,'2,0'));
		$smarty->display('ajax/cuentas/ajaxmantCxP.tpl');
		break;
		case 2:
		$pagina = 1;
		require_once '../_config/mySmarty.php';
		$smarty  = new mySmarty();
		$smarty->setModule('dashboard');
		$smarty->assign('CLI',$kakaroto->kamehameha('',208,'1,0'));
		$smarty->assign('CLIDeta',$kakaroto->kamehameha('',209,'1,0'));
		$smarty->display('ajax/cuentas/ajaxmantCxC.tpl');
		break;
		case 3:
		$pagina = 1;
		require_once '../_config/mySmarty.php';
		$smarty  = new mySmarty();
		$smarty->setModule('dashboard');
		$smarty->display('ajax/cuentas/ajaxVerNotaPago.tpl');
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