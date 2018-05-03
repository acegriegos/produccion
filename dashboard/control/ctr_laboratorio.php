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
	   			$smarty = make_smarty();
	   			$smarty->assign('CANT',$kakaroto->kamehameha('id,format(valor,0),upper((select a.simbolo from unidades a where a.id = laboratorio.referencias.idunidad))',922,'id > 0'));
	   			$smarty->display('ajax/laboratorio/entrada.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			// $categorias = $kakaroto->kamehameha('id,nombre',69,'id > 0 and !bisproveedor order by nombre');
	   			require_once 'view/ajax/laboratorio/recepcion.php';
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			$smarty = make_smarty();
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
	   			$smarty->display('ajax/laboratorio/tejidoscultivos.tpl');
	   			break;
	   		case 6:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CIC',$kakaroto->kamehameha('',912,'0,0,"3,@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/avispas.tpl');
	   			break;
	   		case 7:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CIC',$kakaroto->kamehameha('',912,'0,0,"4,@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/hongos.tpl');
	   			break;
	   		case 8:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('QOS',$kakaroto->kamehameha('',928,'0,0,"@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/qos.tpl');
	   			break;
	   		case 9:
	   			$pagina = 1;
	   			$transaccion = $kakaroto->kamehameha('id,idbandeja,idfrasco,cantidad',911,'id > 0 and idsucursal = '.$_REQUEST['arreglo']['idsucursal']);
	   			$bandejas = $kakaroto->kamehameha('',411,$_REQUEST['arreglo']['invbandejas']);
	   			$frascos = $kakaroto->kamehameha('',411,$_REQUEST['arreglo']['invfrascos']);
	   			require_once 'view/ajax/laboratorio/relaciones.php';
	   			break;
	   		case 10: //seguimiento
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->display('ajax/laboratorio/seguimiento.php');
	   			break;
	   		case 11:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CANT',$kakaroto->kamehameha('id,format(valor,0),upper((select a.simbolo from unidades a where a.id = laboratorio.referencias.idunidad))',922,'id > 0'));
	   			$smarty->display('ajax/laboratorio/entrada1.tpl');
	   			break;
	   		case 12:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CANT',$kakaroto->kamehameha('id,format(valor,0),upper((select a.simbolo from unidades a where a.id = laboratorio.referencias.idunidad))',922,'id > 0'));
	   			$smarty->display('ajax/laboratorio/entrada2.tpl');
	   			break;
	   		case 13:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CANT',$kakaroto->kamehameha('id,format(valor,0),upper((select a.simbolo from unidades a where a.id = laboratorio.referencias.idunidad))',922,'id > 0'));
	   			$smarty->display('ajax/laboratorio/entrada3.tpl');
	   			break;
	   		case 14:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CANT',$kakaroto->kamehameha('id,format(valor,0),upper((select a.simbolo from unidades a where a.id = laboratorio.referencias.idunidad))',922,'id > 0'));
	   			$smarty->display('ajax/laboratorio/entrada4.tpl');
	   			break;
	   		case 15:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CIC',$kakaroto->kamehameha('',912,'0,0,"4,@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/BiologiaMolecular.tpl');
	   			break;
	   		case 16:
	   			$pagina = 1;
	   			$smarty = make_smarty();
	   			$smarty->assign('CIC',$kakaroto->kamehameha('',912,'0,0,"4,@@impresa","0,10"'));
	   			$smarty->display('ajax/laboratorio/sustratos.tpl');
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