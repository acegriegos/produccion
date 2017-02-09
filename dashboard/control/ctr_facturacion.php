<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();
	    
	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    
	   	$smarty->assign('NAV',$pg);

	   	$smarty->display('v_facturacion.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',26,'id >= 0 order by nombre'));
			   	$smarty->display('ajax/facturas/ajaxVentas.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',26,'id > 0 order by id'));
			   	$smarty->display('ajax/facturas/ajaxCompras.tpl');
	   			break;
	   		case 3:
	   		case 4:
	   		case 5:
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('valor',15,'`descr` in("empresa","CJuridica","telefonos","correo","direccion","logo")');
	   			$factura = $kakaroto->kamehameha('idfactura,tipofactura,tipopago,fecha,cliente,fsubtotal,imv,tdescuento,flete,ajuste,ftotal,plazo,comentario,referencia,simbolo,usuario',72,'idfactura = "'.$_REQUEST['id'].'"')[0] or die(header("Location: error"));
	   			$detalle = $kakaroto->kamehameha('idfactura,idproducto,nombreproducto,codigoproducto,precio,cantidad,descuento,ftotal,ftotaldesc',73,'idfactura = "'.$_REQUEST['id'].'"');
	   			
	   			// if($_REQUEST['tp'] == 1)
   				include_once 'view/ajax/facturas/factura.php';
	   			// else
	   			// 	include_once 'view/reportes/compraPV.php';
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