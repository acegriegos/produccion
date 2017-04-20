<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	   
	   	
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
	   			$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,valor,if(principal,"Moneda por Defecto",""),simbolo',54,'id > 0 order by principal desc,nombre'));
	   			$smarty->assign('WSDL',$kakaroto->kamehameha('wsid,wsname',100,'wsid > 0 order by wsname'));
	   			
	   			$smarty->assign('TUSR',$kakaroto->kamehameha('id,nombre,defecto',27,'id > 0 order by defecto desc'));
	   			$smarty->assign('TPAG',$kakaroto->kamehameha('id,nombre,principal',26,'id >= 0 order by id'));
	   			$smarty->assign('CATC',$kakaroto->kamehameha('id,nombre',69,'id > 0'));
	   			$smarty->assign('CUE',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and !ispadre order by nombre'));	
	   			$smarty->assign('BNK',$kakaroto->kamehameha('id,nombre',202,'id > 0 order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxDatosEmpresa.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
			   	$smarty->assign('DESCF',$kakaroto->kamehameha('valor',15,'descr = "descuentoVenta"')[0][0]);
			   	$smarty->assign('CICLOS',$kakaroto->kamehameha('*',90,'1 order by id'));
			   	$smarty->display('ajax/ajustes/ajaxDescuentos.tpl');
	   			
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			$smarty->assign('IMP',$kakaroto->kamehameha('id,nombre,resumen,valor',51,'id > 0 order by nombre limit 100'));
	   			$smarty->display('ajax/ajustes/ajaxImpuestos.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			$smarty->assign('CUE',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and idsubcuenta = 0 order by nombre'));
	   			$smarty->assign('VCUE',$kakaroto->kamehameha('id,nombre,rpad(numero,10,0),numero,deep,ispadre',36,'1 order by numero'));
	   			$smarty->assign('DCUE',$kakaroto->kamehameha('*',89,''));
	   			$smarty->assign('RCUE',$kakaroto->kamehameha('id,nombre',36,'id > 0 and !ispadre order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxCuentasDefecto.tpl');
	   			
	   			break;
	   		case 5:
	   			$pagina = 1;
			   	$smarty->assign('SUC',$kakaroto->kamehameha('id,nombre',39,'id > 0 order by nombre'));
			   	$smarty->assign('PROV',$kakaroto->kamehameha('id,nombre',8,'id > 0 order by nombre'));
			   	print_r($kakaroto->kamehameha('id,nombre,telefono',39,'id > 0 order by nombre'));
			   	//$smarty->display('ajax/ajustes/ajaxSucursales.tpl');
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0 order by nombre'));
	   			$smarty->assign('CDEF',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and !ispadre order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxBodegas.tpl');
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