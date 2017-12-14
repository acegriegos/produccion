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
	   	$smarty->display('v_taller.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->display('ajax/taller/ingresarBoleta.tpl');
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