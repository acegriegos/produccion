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
	   	$smarty->display('v_rutas.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
				require '../_config/mySmarty.php';
	
				$smarty  = new mySmarty();
				$smarty->setModule('dashboard');
				$smarty->assign('USRS',$kakaroto->kamehameha('id,nombre',1,'id > 0'));
				$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0'));
				$smarty->assign('FLOT',$kakaroto->kamehameha('id,nombre',216,'id > 0 and tipo = 1'));

				$smarty->assign('RUT',$kakaroto->kamehameha('*',208,'id>0'));
				$smarty->display('ajax/rutas/mantenimiento.tpl');
				break;
	   		case 2:
	   			$pagina = 1;
				require '../_config/mySmarty.php';
	
				$smarty  = new mySmarty();
				$smarty->setModule('dashboard');

				$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0'));
				$smarty->assign('RUT',$kakaroto->kamehameha('*',208,'id>0'));
				$smarty->display('ajax/rutas/zona.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
				$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
				$transaccion = '';
				// $transaccion = $kakaroto->kamehameha('',186,$_REQUEST['id']);
				$datos = $transaccion[0];
				require_once 'view/ajax/rutas/invxruta.php';
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