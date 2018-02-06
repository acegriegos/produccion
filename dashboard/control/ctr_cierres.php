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
	   	$moneda = $kakaroto->kamehameha('id,simbolo',54,'id > 0 and principal = 1');
	   	$smarty->assign('MON',$moneda[0][1]);
	   	$smarty->assign('TMON',$kakaroto->kamehameha('id,nombre,idmoneda',405,'id > 0 and idmoneda = '.$moneda[0][0]));
	   	$smarty->display('v_cierres.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];

	   			$cierre = $kakaroto->kamehameha('',192,$_REQUEST['id'].',@@usr')[0];
	   			$facturas = $kakaroto->kamehameha('',183,'"'.$_REQUEST['fecha'].'",@@usr');
	   			$estados = $kakaroto->kamehameha('',185,'"'.$_REQUEST['fecha'].'",@@usr');
	   			
   				require_once 'view/reportes/cierrexusuario.php';
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