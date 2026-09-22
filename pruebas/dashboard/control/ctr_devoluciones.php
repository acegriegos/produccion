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
	   	$smarty->display('v_devoluciones.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			// hacer devoluciones
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->display('ajax/devoluciones/doDevolucion.tpl');
				break;
			case 2:
				// ver devoluciones
				$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->display('ajax/devoluciones/showDevolucion.tpl');
				break;
			case 3:
				// recibo devoluciones
				$pagina = 1;
				$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
				$transaccion = $kakaroto->kamehameha('',406,$_REQUEST['id']);
				$datos = $transaccion[0];
				
				if($_REQUEST['tp'] == 1)
					require_once 'view/ajax/cuentas/devolucionpv.php';
				else
					require_once 'view/ajax/cuentas/devolucion.php';
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