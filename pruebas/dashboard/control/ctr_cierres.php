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
	   	$moneda = $kakaroto->kamehameha('id,simbolo,valor+suma',54,'id > 0');
	   	$smarty->assign('MON',$moneda);
	   	$smarty->assign('CCIERRE',$kakaroto->kamehameha('ccierre',40,'idsucursal=@@impresa')[0][0]);
	   	$smarty->assign('TMON',$kakaroto->kamehameha('id,nombre,idmoneda,valor',405,'id > 0'));
	   	$smarty->assign('TEXT',$kakaroto->kamehameha('id,nombre',361,'id > 0'));
	   	$smarty->display('v_cierres.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];

	   			$cierreg = $kakaroto->kamehameha('',192,$_REQUEST['id']);
	   			$cierre = $cierreg[0];
	   			// $facturas = $kakaroto->kamehameha('',183,'"'.$_REQUEST['fecha'].'",@@usr');
	   			$estados = $kakaroto->kamehameha('',185,$_REQUEST['id']);
	 			
	 			if(isset($_REQUEST['a4'])){
	 				if($_REQUEST['id']){
	 					$datos = $kakaroto->kamehameha('consecutivo,date_format(fecha,"%d-%m-%Y %h:%i:%s %p"),(select nombre from usuarios where id = cierrecajas.idusuario),entradas,salidas,caja_inicial,caja_reportada',314,'id='.$_REQUEST['id'])[0];

   						$detalle = $kakaroto->kamehameha('',370,$_REQUEST['id']);
	 				}else{
	 					$tp_usuario = $kakaroto->kamehameha('idtipousuario',1,'id = @@usr')[0][0];
	 					$fecha=isset($_REQUEST['fecha'])?'"'.$_REQUEST['fecha'].'"':'curdate()';
	 					$datos = $kakaroto->kamehameha('',372,'@@usr,@@impresa,1,'.$fecha)[0];
	 					$detalle = $kakaroto->kamehameha('',372,'@@usr,@@impresa,0,'.$fecha);
	 				}
   					

	 				require_once 'view/reportes/cierrexusuariog.php';
   				}
	 			else{
	 				$cierreg = $kakaroto->kamehameha('',192,$_REQUEST['id']);
		   			$cierre = $cierreg[0];
		   			// $facturas = $kakaroto->kamehameha('',183,'"'.$_REQUEST['fecha'].'",@@usr');
		   			$estados = $kakaroto->kamehameha('',185,$_REQUEST['id']);
   					require_once 'view/reportes/cierrexusuario.php';
	 			}
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