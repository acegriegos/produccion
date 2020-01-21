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
	   	$smarty->display('v_contabilidad.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   				
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');

				$smarty->assign('VCUE',$kakaroto->kamehameha('',33,''));
				
				$smarty->display('ajax/contabilidad/cuentas.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   				
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');

	   			$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,simbolo',54,'1 > 0 order by principal desc, nombre'));
	   			$smarty->display('ajax/contabilidad/asientos.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			// require_once '../_config/mySmarty.php';
	   				
	   			// $smarty  = new mySmarty();
	   			// $smarty->setModule('dashboard');

	   			// $smarty->assign('SUC',$kakaroto->kamehameha('id,nombre,simbolo',54,'1 > 0 order by principal desc, nombre'));
	   			// $smarty->display('ajax/contabilidad/asientos.tpl');

	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
 	
	   			$transaccion = $kakaroto->kamehameha('',85,$_REQUEST['id']);
	   			$datos = $transaccion[0];
	   			$ocultar = '';
	   			$oc = '';
	   			$repetir = 0;//isset($_REQUEST['x']) ? 1 : 0;

	   			if($_REQUEST['tp'] == 'true')
	   				require_once 'view/ajax/contabilidad/transaccpv.php';
	   			else{
	   				/*$medio = $kakaroto->kamehameha('tfact',40,'idsucursal = @@impresa')[0][0];
	   				if ($medio) {
	   					require_once 'view/ajax/contabilidad/facturamedia.php';
	   				}else*/
	   					require_once 'view/ajax/contabilidad/transacc.php';
   					
	   			}
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