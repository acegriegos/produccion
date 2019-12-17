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
	   			$smarty->assign('GAS',$kakaroto->kamehameha('*',508,'id > 0'));
	   			$smarty->assign('MEC',$kakaroto->kamehameha('',506,'"",0'));
	   			$smarty->display('ajax/taller/ingresarBoleta.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('BOL',$kakaroto->kamehameha('',509,'0,0,"","0,10"'));
	   			$smarty->display('ajax/taller/buscarBoleta.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('MARCA',$kakaroto->kamehameha('id,nombre',500,'id > 0'));
	   			$smarty->display('ajax/taller/vehiculos.tpl');
	   			break;
	   		case 4:
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
	   			$transaccion = $kakaroto->kamehameha('',508,$_REQUEST['id']);
	   			if($_REQUEST['pv'] == 0)
	   				require_once 'view/ajax/taller/boleta.php';
	   			else
	   				require_once 'view/ajax/taller/boletapv.php';
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