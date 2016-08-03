<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require_once '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_productos.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('FAM',$kakaroto->kamehameha('id,nombre',20,'id > 0 order by id'));
	   			$smarty->assign('TIP',$kakaroto->kamehameha('id,nombre',21,'id > 0 order by id'));
	   			$smarty->assign('MAR',$kakaroto->kamehameha('id,nombre',22,'id > 0 order by id'));
	   			$smarty->assign('MOD',$kakaroto->kamehameha('id,nombre',23,'id > 0 order by id'));
	   			$smarty->assign('CLI',$kakaroto->kamehameha('idcliente,nombre',6,'tipo = "Proveedor"'));
	   			$smarty->assign('UNI',$kakaroto->kamehameha('idunidad,nombre',12,'1 order by idunidad'));
	   			$smarty->assign('PROD',$kakaroto->kamehameha('id,codigo,nombre,costo,ganancia,venta',14,'id > 0 order by nombre'));
	   			$smarty->display('ajax/ajaxmantProductos.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('CLI',$kakaroto->kamehameha('idcliente,nombre',6,'tipo = "Proveedor"'));
	   			$smarty->assign('SERV',$kakaroto->kamehameha('*',13,'Codigo > 0 order by Codigo limit 20'));
	   			$smarty->display('ajax/ajaxmantServicios.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			//PAQ
	   			//PROD
	   			//SERV
	   			$smarty->display('ajax/ajaxmantPaquetes.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			$arr = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
	   			file_put_contents('view/getPkg.php', json_encode($arr));
	   			print_r($arr);
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