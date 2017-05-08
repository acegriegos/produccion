<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    $pg = $smarty->fetch('../view/menuSmarty.php');
	    $sty = $smarty->fetch('../view/scripts.php');
		$scr = $smarty->fetch('../view/styles.php');
	
		$smarty->assign('STY',$sty);
		$smarty->assign('SCR',$scr);
	    $smarty->assign('PRO',$kakaroto->kamehameha('*',8,'id > 0 order by id'));
	    $smarty->assign('TPTEL',$kakaroto->kamehameha('*',4,'id > 0 order by id'));
	    $smarty->assign('PAISES',$kakaroto->kamehameha('*',209,'id > 0 order by nombre'));
	    $smarty->assign('PROV',$kakaroto->kamehameha('*',30,'1 order by nombre'));
	    $smarty->assign('ESTCLIE',$kakaroto->kamehameha('id,nombre',68,'id > 0 order by nombre limit 10'));
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_proveedores.tpl');
	   	
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
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