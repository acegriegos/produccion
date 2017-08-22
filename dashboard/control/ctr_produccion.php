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
	   	$smarty->display('v_produccion.tpl');
		}else{
		$pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('REC',$kakaroto->kamehameha('idproceso,proceso,precioventa',99,'1'));
	   			$smarty->assign('FAM',$kakaroto->kamehameha('id,nombre',20,'id > 0 order by id'));
	   			$smarty->assign('UNIP',$kakaroto->kamehameha('*',12,'idtipo in(0,1) order by idunidad'));
	   			$smarty->display('ajax/produccion/recetas.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('LPR',$kakaroto->kamehameha('id,nombre,hombre,maquina,bandejas',180,'id > 0 order by nombre limit 10'));
	   			$smarty->assign('UNI',$kakaroto->kamehameha('*',12,'idtipo = 2 order by idunidad'));
	   			$smarty->display('ajax/produccion/lineaproduccion.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->display('ajax/produccion/inicio.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			// require_once '../_config/mySmarty.php';
	   			// $smarty  = new mySmarty();
	   			// $smarty->setModule('dashboard');
	   			// $smarty->display('ajax/produccion/seguimiento.tpl');
	   			include 'view/seguimiento.php';
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