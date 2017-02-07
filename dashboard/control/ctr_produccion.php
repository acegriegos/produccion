<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	   
	   	$smarty->assign('NAV',$pg);
	   	$smarty->assign('UNI',$kakaroto->kamehameha('*',12,'1 order by idunidad'));
		$smarty->assign('REC',$kakaroto->kamehameha('idreceta,producto,precioventa',99,'1'));
		$smarty->assign('FAM',$kakaroto->kamehameha('id,nombre',20,'id > 0 order by id'));
		$smarty->assign('DEF',$kakaroto->kamehameha('nombre',111,'id = 7')[0][0]);
	   	$smarty->display('v_produccion.tpl');
		}else{
		$pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			break;
	   		case 2:
	   			break;
	   		case 3:
	   			
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