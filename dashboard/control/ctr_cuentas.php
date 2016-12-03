<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	   
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
	   			// $smarty->assign('CLI',$kakaroto->kamehameha('idcliente,nombre',6,'tipo = "Proveedor"'));
	   			// $smarty->assign('UNI',$kakaroto->kamehameha('idunidad,nombre',12,'1 order by idunidad'));
	   			// $smarty->assign('PROD',$kakaroto->kamehameha('id,codigo,nombre,costo,ganancia,venta',14,'id > 0 order by nombre'));
	   			$smarty->display('ajax/ajaxmantCxP.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			// $smarty->assign('CLI',$kakaroto->kamehameha('idcliente,nombre',6,'tipo = "Proveedor"'));
	   			// $smarty->assign('UNI',$kakaroto->kamehameha('idunidad,nombre',12,'1 order by idunidad'));
	   			// $smarty->assign('PROD',$kakaroto->kamehameha('id,codigo,nombre,costo,ganancia,venta',14,'id > 0 order by nombre'));
	   			$smarty->display('ajax/ajaxmantCxC.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			// $smarty->assign('CLI',$kakaroto->kamehameha('idcliente,nombre',6,'tipo = "Proveedor"'));
	   			// $smarty->assign('UNI',$kakaroto->kamehameha('idunidad,nombre',12,'1 order by idunidad'));
	   			// $smarty->assign('PROD',$kakaroto->kamehameha('id,codigo,nombre,costo,ganancia,venta',14,'id > 0 order by nombre'));
	   			$smarty->display('ajax/ajaxVerNotaPago.tpl');
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