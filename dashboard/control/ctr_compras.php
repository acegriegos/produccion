<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();
	    
	    if (!isset($_POST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty1.php');
	    
	   	$smarty->assign('NAV',$pg);

	   	$smarty->display('v_compras.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_POST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',26,'id > 0 order by id'));
			   	$smarty->display('ajax/ajaxFacturacion.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$smarty->assign('TPAGO',$kakaroto->kamehameha('id,nombre',26,'id > 0 order by id'));
			   	$smarty->display('ajax/ajaxCompras.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			$arr = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
	   			file_put_contents('view/getClie.php', json_encode($arr));
	   			print_r($arr);
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			$arr = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
	   			file_put_contents('view/getPrv.php', json_encode($arr));
	   			print_r($arr);
	   			break;
	   		case 5:
	   			$pagina = 1;
	   			$arr = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
	   			file_put_contents('view/getProdfact.php', json_encode($arr));
	   			print_r($arr);
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