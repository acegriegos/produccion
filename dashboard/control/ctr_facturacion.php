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

	   	//$smarty->assign('IP',$_SERVER);
	   	$smarty->assign('EXOS',$kakaroto->kamehameha('idhacienda,nombre',126,'id > 0 order by nombre'));
	   	$smarty->display('v_facturacion.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',26,'id >= 0 order by principal desc,nombre'));
			   	$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0 order by nombre'));
			   	$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,valor+suma as valor,simbolo',54,'id > 0 order by principal desc'));
			   	$smarty->display('ajax/facturas/ajaxVentas.tpl');
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
 	
	   			$transaccion = $kakaroto->kamehameha('',72,$_REQUEST['id']);
	   			$datos = $transaccion[0];
	   			$ocultar = '';
	   			$oc = '';
	   			$repetir = 0;//isset($_REQUEST['x']) ? 1 : 0;

	   			if($_REQUEST['tp'] == 'true')
	   				require_once 'view/ajax/facturas/facturapv.php';
	   			else
   					require_once 'view/ajax/facturas/factura.php';
	   			break;
	   		case 7:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
	   			$transaccion = $kakaroto->kamehameha('',157,$_REQUEST['id']);
	   			$datos = $transaccion[0];
	   			
	   			require 'view/ajax/facturas/orden.php';
	   			break;
	   		case 8:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
	   			
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$pg = $smarty->fetch('../view/menuSmarty.php');
			    $sty = $smarty->fetch('../view/styles.php');
				$scr = $smarty->fetch('../view/scripts.php');
			
				$smarty->assign('STY',$sty);
				$smarty->assign('SCR',$scr);
			   	$smarty->assign('NAV',$pg);
	   			$smarty->assign('TF',$_REQUEST['tf']);

	   			$smarty->display('v_verFacturas.tpl');
	   			break;
	   		case 9:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
	   			$transaccion = $kakaroto->kamehameha('',157,$_REQUEST['id']);
	   			$datos = $transaccion[0];
	   			require 'view/ajax/facturas/orden.php';
	   			break;
	   		case 10:
	   			
        	break;

	   	}
		if(!$pagina){
		   	if (is_array($transaccion) or die(header("Location: error"))){
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