<?php  
	    require_once 'model/m_general.php';
	    $kakaroto = new _general();

	    if (!isset($_REQUEST['accion'])) {
	   	require_once '../_config/mySmarty.php';
	   
	   	$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    $sty = $smarty->fetch('../view/styles.php');
		$scr = $smarty->fetch('../view/scripts.php');
	
		$smarty->assign('STY',$sty);
		$smarty->assign('SCR',$scr);
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
	   			$smarty->assign('UNI',$kakaroto->kamehameha('',12,'"1,2,3"'));
	   			$smarty->assign('INV',$kakaroto->kamehameha('*',111,'id > 0 and idbodega = 1 and idsucursal in(-1,@@impresa) order by id'));
	   			$smarty->assign('PROD',$kakaroto->kamehameha('',14,'0,0,",@@impresa","0,10"'));
	   			$smarty->assign('NIV',$kakaroto->kamehameha('id,nombre',69,'id > 0 and idsucursal = @@impresa order by id'));
	   			$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,valor+suma as valor,simbolo',54,'id > 0 order by principal desc'));
	   			$smarty->display('ajax/productos/ajaxmantProductos.tpl');
	   			break;
	   		case 2:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('CLI',$kakaroto->kamehameha("id,nombre",2,"bisproveedor = 1"));
	   			$smarty->assign('SERV',$kakaroto->kamehameha('',13,'0,0,",@@impresa","0,10"'));
	   			$smarty->assign('MON',$kakaroto->kamehameha('id,nombre,valor+suma as valor,simbolo',54,'id > 0 order by principal desc'));
				$smarty->display('ajax/productos/ajaxmantServicios.tpl');
	   			break;
	   		case 3:
	   			$pagina = 1;
	   			require_once '../_config/mySmarty.php';
	   			$smarty  = new mySmarty();
	   			$smarty->setModule('dashboard');
	   			$smarty->assign('PAQ',$kakaroto->kamehameha('',62,'0,0,"0,@@impresa","0,10"'));
	   			$smarty->assign('UNI',$kakaroto->kamehameha('',12,'"0,1,3"'));
	   			$smarty->display('ajax/productos/ajaxmantPaquetes.tpl');
	   			break;
	   		case 4:
	   			$pagina = 1;
	   			$miscelaneos = $kakaroto->kamehameha('',50,'@@impresa')[0];
 	
	   			$transaccion = $kakaroto->kamehameha('',275,$_REQUEST['id']);
	   			$datos = $transaccion;

	   			if($_REQUEST['tp'] == 'true')
	   				require_once 'view/ajax/productos/boletapv.php';
	   			else{
	   				require_once 'view/ajax/productos/boleta.php';
	   			}
	   			break;
	   		case 5: 
	   			break;
	   		case 6:
	   			for ($i=0; $i < $_REQUEST['prod']; $i++) { 
	   				$rs = $kakaroto->genkidama(1,11,'','null,"z00'.$i.'","z000'.$i.'","z0prod'.$i.'",20*'.$i.',1*'.$i.',30*'.$i.',0,0,1,1,100,20,1,1,1,0,1,""');
	   				echo "Producto: ";
	   				print_r($rs[0][0]);
	   				echo "<br>";
	   				for ($u=0; $u < 1; $u++) { 
	   					$rs1 = $kakaroto->genkidama(1,97,'','null,6,'.$rs[0][0].',30');
	   					echo "Detalle No: ".($u+1)."<br>";
	   				}
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