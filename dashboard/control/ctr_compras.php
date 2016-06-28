<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();
	    
	    if (!isset($_POST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    
	    $smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',14,'id > 0 order by id'));
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_compras.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_POST['accion']) {
	   		case 1:
	   			$transaccion = $kakaroto->kamehameha($_REQUEST['sel'],$_REQUEST['tbl'],$_REQUEST['where']);
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