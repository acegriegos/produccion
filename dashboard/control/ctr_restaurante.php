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
	   	$smarty->assign('MESAS',$kakaroto->kamehameha('id,nombre,idtipoocupado',800,'id > 0 and !bisbarra and idsucursal = @@impresa'));
	   	$smarty->assign('BARRAS',$kakaroto->kamehameha('id,nombre',800,'id > 0 and bisbarra and idsucursal = @@impresa'));
	   	$smarty->assign('FAM',$kakaroto->kamehameha('',804,'@@impresa'));
	   	$smarty->display('v_restaurante.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
	   			$transaccion = $kakaroto->kamehameha('date_format(fecha,"%d/%m/%Y"),curtime(),(select nombre from usuarios where id = idusuario),id,(select simbolo from monedas where id = idmoneda)',261,'idtipo = '.$_REQUEST['id'].' and idtipopago = '.$_REQUEST['tpago']);
	   			$detalle = $kakaroto->kamehameha('cantidad,precio*cantidad-descuento,(select nombre from productos where id = idproducto),imv',260,'idfactura = '.$transaccion[0][3]);
	   			
	   			include_once 'view/ajax/restaurantes/ordenpv.php';
	   			break;
	   		default:
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