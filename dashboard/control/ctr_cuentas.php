<?php  
require_once 'model/m_general.php';
$kakaroto = new _general();

if (!isset($_REQUEST['accion'])) {
	require '../_config/mySmarty.php';
	$smarty  = new mySmarty();
	$smarty->setModule('dashboard');
	$pg = $smarty->fetch('../view/menuSmarty.php');
	$sty = $smarty->fetch('../view/styles.php');
	$scr = $smarty->fetch('../view/scripts.php');
	
	$smarty->assign('STY',$sty);
	$smarty->assign('SCR',$scr);
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
			//$smarty->assign('PRO',$kakaroto->kamehameha('',214,'2,0'));
			$smarty->assign('TIPOPAGO',$kakaroto->kamehameha('id,nombre',26,'id > 0 order by principal desc, nombre'));
			$smarty->assign('CLIDeta',$kakaroto->kamehameha('',213,'1,0'));
			$smarty->display('ajax/cuentas/ajaxmantCxP.tpl');
			break;
		case 2:
			$pagina = 1;
			require_once '../_config/mySmarty.php';
			$smarty  = new mySmarty();
			$smarty->setModule('dashboard');
			$smarty->assign('CLI',$kakaroto->kamehameha('',214,'1,0'));
			$smarty->assign('TIPOPAGO',$kakaroto->kamehameha('id,nombre',26,'id > 0 order by principal desc, nombre'));
			$smarty->assign('CLIDeta',$kakaroto->kamehameha('',213,'1,0'));
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
			$pagina = 1;
			$miscelaneos = $kakaroto->kamehameha('valor',15,'`descr` in("empresa","CJuridica","telefonos","correo","direccion")');
			$transaccion = $kakaroto->kamehameha('',186,$_REQUEST['id']);
			$datos = $transaccion[0];
			
			if($_REQUEST['tp'] == 1)
				require_once 'view/ajax/cuentas/recibopv.php';
			else
				require_once 'view/ajax/cuentas/recibo.php';
			break;
		case 5:
			$pagina = 1;

			$transaccion = $kakaroto->kamehameha('',230,$_REQUEST['id']);
			$miscelaneos = $kakaroto->kamehameha('valor',15,'`descr` in("empresa","CJuridica","telefonos","correo","direccion")');
			require_once 'view/ajax/cuentas/reciboVarias.php';
			//echo '<pre>'; print_r($transaccion[0]); echo '</pre>';
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