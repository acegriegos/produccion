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

	   	$smarty->assign('RUT',$kakaroto->kamehameha('id,nombre',208,'id > 0'));
	   	$smarty->display('v_arrendamiento.tpl');
	   }else{
	   require '../_config/mySmarty.php';
		$smarty  = new mySmarty();
		$smarty->setModule('dashboard');
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			$sty = $smarty->fetch('../view/styles.php');
		        $scr = $smarty->fetch('../view/scripts.php');
		    
		        $smarty->assign('STY',$sty);
		        $smarty->assign('SCR',$scr);
	   			$smarty->display('ajax/arrendamiento/vistageneral.tpl');
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