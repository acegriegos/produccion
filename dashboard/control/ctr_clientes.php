<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty1.php');
	    
	    $smarty->assign('PRO',$kakaroto->kamehameha('*',8,'1 order by id'));
	    $smarty->assign('CANT',$kakaroto->kamehameha('*',9,'1 order by id'));
	    $smarty->assign('DIS',$kakaroto->kamehameha('*',10,'1 order by id'));
	    $smarty->assign('ESTCLIE',$kakaroto->kamehameha('*',68,'id >= 0 order by nombre'));
	    $smarty->assign('NVLCLIE',$kakaroto->kamehameha('*',69,'id > 0 and !bisproveedor order by id'));
	    $smarty->assign('CLIE',$kakaroto->kamehameha('*',29,'1 order by vnombre'));

	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_clientes.tpl');
	   	
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$transaccion = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
	   			break;
	   		case 2:

	   			break;
	   		case 3:
	   			
	   			break;
	   		case 4:
	   			
	   			break;
	   		case 5:
	   			
	   			break;
	   			// $transaccion = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
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