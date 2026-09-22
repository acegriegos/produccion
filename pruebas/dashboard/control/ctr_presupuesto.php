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
        $smarty->assign('SRC',$scr);
	   	$smarty->assign('NAV',$pg);
		$smarty->display('v_presupuesto.tpl');
	   }else{
	   	$pagina = 1;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			require '../_config/mySmarty.php';

	   			$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('MON',$kakaroto->kamehameha('id,simbolo,nombre',54,'id > 0'));
			   	$smarty->assign('SUC',$kakaroto->kamehameha('id,nombre',39,'id >= 0'));
			   	$smarty->display('ajax/presupuesto/mantenimiento.tpl');
	   			break;
	   		case 2:
	   			require '../_config/mySmarty.php';

	   			$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('PRE',$kakaroto->kamehameha('',225,'"","",0,"","",0,0,0'));
			   	$smarty->display('ajax/presupuesto/asignacion.tpl');
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