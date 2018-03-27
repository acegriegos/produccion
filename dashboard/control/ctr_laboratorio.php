<?php  
	   require_once 'model/m_general.php';
	   $kakaroto = new _general();

	   if (!isset($_REQUEST['accion'])) {

	   		make_smarty()->display('v_laboratorio.tpl');

	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			make_smarty()->display('ajax/laboratorio/entrada.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			$categorias = $kakaroto->kamehameha('id,nombre',69,'id > 0 and !bisproveedor order by nombre');
	   			require_once 'view/ajax/laboratorio/recepcion.php';
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('INV',$kakaroto->kamehameha('id,nombre',111,'id > 0 and idsucursal in(@@impresa,-1) order by nombre'));
	   			$smarty->display('ajax/laboratorio/ajustes.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('USR',$kakaroto->kamehameha('id,nombre',1,'id > 0 and idtipousuario = 4'));
	   			$smarty->assign('PER',$kakaroto->kamehameha('id,nombre',913,'id > 0'));
	   			$smarty->display('ajax/laboratorio/iniciacion.tpl');
	   			break;
	   		case 5:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CIC',$kakaroto->kamehameha('',912,'0,0,"2,@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/multiplicacion.tpl');
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			require_once 'view/ajax/laboratorio/enraizamiento.php';
	   			break;
	   		case 7:
	   			$pagina = 1;
	   			require_once 'view/ajax/laboratorio/aclimatacion.php';
	   			break;
	   		case 8:
	   			$pagina = 1;
	   			require_once 'view/ajax/laboratorio/qos.php';
	   			break;
	   		case 9:
	   			$pagina = 1;
	   			$transaccion = $kakaroto->kamehameha('id,idbandeja,idfrasco,cantidad',911,'id > 0 and idsucursal = @@impresa');
	   			$bandejas = $kakaroto->kamehameha('',411,$_REQUEST['arreglo']['invbandejas']);
	   			$frascos = $kakaroto->kamehameha('',411,$_REQUEST['arreglo']['invfrascos']);
	   			require_once 'view/ajax/laboratorio/relaciones.php';
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