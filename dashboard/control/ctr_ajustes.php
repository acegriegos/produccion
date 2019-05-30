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
	   			$smarty->assign('IMPR',$kakaroto->kamehameha('id,nombre',159,'id > 0 order by nombre'));
	   			$smarty->assign('WSDL',$kakaroto->kamehameha('wsid,wsname',100,'wsid > 0 order by wsname'));
	   			$smarty->assign('TUSR',$kakaroto->kamehameha('',402,'0'));
	   			$smarty->assign('TPAG',$kakaroto->kamehameha('id,nombre,principal',26,'id >= 0 order by id'));
	   			$smarty->assign('CATC',$kakaroto->kamehameha('id,nombre',69,'id > 0 and idsucursal = @@impresa'));
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
	   			$smarty->assign('DCUE',$kakaroto->kamehameha('',89,''));
	   			$smarty->assign('RCUE',$kakaroto->kamehameha('id,nombre',36,'id > 0 and !ispadre order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxCuentasDefecto.tpl');
	   			
	   			break;
	   		case 5:
	   			$pagina = 1;
			   	$smarty->assign('SUC',$kakaroto->kamehameha('nombre',50,-1));
			   	$smarty->assign('PROV',$kakaroto->kamehameha('id,nombre',8,'id > 0 order by nombre'));
			   	$smarty->assign('IMPR',$kakaroto->kamehameha('id,nombre',159,'id > 0 order by nombre'));
			   	$smarty->display('ajax/ajustes/ajaxSucursales.tpl');
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0 order by nombre'));
	   			$smarty->assign('CDEF',$kakaroto->kamehameha('id,nombre,numero',36,'id > 0 and !ispadre order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxBodegas.tpl');
	   			break;
	   		case 7:
	   			$pagina = 1;
	   			$smarty->assign('VP',$kakaroto->kamehameha('vid,vnombre,vvalor',171,'1 order by vnombre'));
	   			$smarty->assign('ET',$kakaroto->kamehameha('id,nombre',176,'id > 0 order by id'));
	   			$smarty->display('ajax/ajustes/ajaxProduccion.tpl');
	   			break;
	   		case 8:
	   			$pagina = 1;
	   			$smarty->assign('ACC',$kakaroto->kamehameha('id,nombre,codigo',196,'id > 0 order by id'));
	   			$smarty->display('ajax/ajustes/ajaxAccesos.tpl');
	   			break;
	   		case 9:
	   			$pagina = 1;
				$smarty->display('ajax/ajustes/ajaxProductos.tpl');
	   			break;
	   		case 10:
	   			$pagina = 1;
	   			$smarty->assign('TELS',$kakaroto->kamehameha('',19,$_REQUEST['arreglo']['vidfila'].",".$_REQUEST['arreglo']['vidtabla']));
	   			$smarty->display('ajax/ajustes/addphone.tpl');
	   			break;
	   		case 11:
	   			$pagina = 1;
	   			$smarty->assign('CORS',$kakaroto->kamehameha('',18,$_REQUEST['arreglo']['vidfila'].",".$_REQUEST['arreglo']['vidtabla']));
	   			$smarty->display('ajax/ajustes/addmail.tpl');
	   			break;
	   		case 12:
	   			$pagina = 1;
	   			$smarty->assign('UBIC',$kakaroto->kamehameha('',92,$_REQUEST['arreglo']['vidfila'].",".$_REQUEST['arreglo']['vidtabla']));
	   			$smarty->assign('PRO',$kakaroto->kamehameha('*',8,'1 order by id'));
	   			$smarty->display('ajax/ajustes/addaddress.tpl');
	   			break;
	   		case 13:
	   			$pagina = 1;
	   			$smarty->assign('INV',$kakaroto->kamehameha('id,nombre',111,'id > 0 and idbodega = 1 and idsucursal in(-1,@@impresa) order by id'));
	   			$smarty->display('ajax/ajustes/ajaxRestaurante.tpl');
	   			break;
	   		case 14:
	   			$pagina = 1;
	   			$smarty->assign('RUB',$kakaroto->kamehameha('vid,nombre,if(idtiporubro,"Entrada","Salida")',281,'vid > 0 and idsucursal in(-1,@@impresa) order by nombre'));
	   			//print_r($kakaroto->kamehameha('vid,nombre,if(idtiporubro,"Entrada","Salida")',281,'vid > 0 and idsucursal in(-1,@@impresa) order by nombre'));
	   			$smarty->display('ajax/ajustes/ajaxRubros.tpl');
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