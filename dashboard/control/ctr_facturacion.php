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
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre,bancos,extra,regex,icono',26,'id >= 0 and id <> 99 order by principal desc,nombre'));
			   	$smarty->assign('BOD',$kakaroto->kamehameha('id,nombre',41,'id > 0 order by nombre'));
			   	$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,valor+suma as valor,simbolo',54,'id > 0 order by principal desc'));
			   	$smarty->assign('AG',$kakaroto->kamehameha('id,nombre',1,'id > 0 and idtipousuario = 4 and idsucursal = @@impresa  order by nombre'));
			   	$smarty->assign('NVLCLIE',$kakaroto->kamehameha('id,nombre',69,'id > 0 and idsucursal = @@impresa order by id'));
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
	   			else{
	   				$medio = $kakaroto->kamehameha('tfact',40,'idsucursal = @@impresa')[0][0];
	   				if ($medio) {
	   					require_once 'view/ajax/facturas/facturamedia.php';
	   				}else
	   					require_once 'view/ajax/facturas/factura.php';
   					
	   			}
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
	   				$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
	   			$_REQUEST['id'] = $_REQUEST['id'] < 0 ? -1*$_REQUEST['id'] : $_REQUEST['id'];
	   			$tabla = $kakaroto->kamehameha('(select count(*) from restaurantes.ajustes)',0,'');
	   			$tipo_servicio = 0;
	   			if(is_array($tabla)){
	   				$tipo_servicio = $kakaroto->kamehameha('(select valor from restaurantes.ajustes where descr = "SIC_TP")',0,'')[0][0];
	   			}
	   			$div = $_REQUEST['has'] == 1 && $tipo_servicio == 0 ? '1.23' : '1.13';
	   			$transaccion = $kakaroto->kamehameha('date_format(fecha,"%d/%m/%Y"),curtime(),(select nombre from usuarios where id = idusuario),id,(select simbolo from monedas where id = idmoneda)',261,'id = '.$_REQUEST['id']);
	   			$detalle = $kakaroto->kamehameha('cantidad,(precio*cantidad-descuento)/'.$div.',(select nombre from productos where id = idproducto),(precio*cantidad-descuento)*(select exoneracion/100 from productos where id = idproducto)',260,'idfactura = '.$_REQUEST['id']);
	   			
	   			include_once 'view/ajax/facturas/ordenpv.php';
        			
        	break;
        	case 11:
        		$pagina = 1;
        		$transaccion = $kakaroto->kamehameha('',296,$_REQUEST['arreglo']['idfact'].','.$_REQUEST['arreglo']['idtp']);

        		include_once 'view/ajax/facturas/showfacturas.php';
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