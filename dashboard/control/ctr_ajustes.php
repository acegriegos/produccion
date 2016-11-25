<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty1.php');
	   
	   	
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_ajustes.tpl');
	   }else{
	   $pagina = 0;
	   require '../_config/mySmarty.php';
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	switch ($_REQUEST['accion']) {

	   		case 1:
	   			$pagina = 1;
	   			$smarty->assign('CUE',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and idsubcuenta = 0 order by nombre'));
	   			$smarty->assign('VCUE',$kakaroto->kamehameha('id,nombre,rpad(numero,10,0),numero,deep,ispadre',36,'1 order by numero'));
	   			$smarty->assign('DCUE',$kakaroto->kamehameha('*',89,''));
	   			$smarty->display('ajax/ajustes/ajaxCuentasDefecto.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			include 'view/ajax/ajustes/ajaxDatosEmpresa.tpl';
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			include 'view/ajax/ajustes/ajaxImpuestos.tpl';
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			
			   	$smarty->assign('SUC',$kakaroto->kamehameha('id,nombre,telefono',39,'id > 0 order by nombre'));
			   	$smarty->assign('PROV',$kakaroto->kamehameha('id,nombre',8,'id > 0 order by nombre'));
			   	$smarty->display('ajax/ajustes/ajaxSucursales.tpl');
	   			break;
	   		case 5:
	   			$pagina = 1;
	   			
			   	$smarty->assign('DESCF',$kakaroto->kamehameha('valor',15,'descr = "descuentoVenta"')[0][0]);
			   	$smarty->assign('CICLOS',$kakaroto->kamehameha('*',90,'1 order by id'));
			   	$smarty->display('ajax/ajustes/ajaxDescuentos.tpl');
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