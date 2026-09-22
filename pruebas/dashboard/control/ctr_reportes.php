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
	
		$smarty->assign('TR',isset($_REQUEST['tr']) ? $_REQUEST['tr'] : 0);
		$smarty->assign('STY',$sty);
		$smarty->assign('SCR',$scr);
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_reportes.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;
	   			require '../_config/mySmarty.php';
			   	$smarty  = new mySmarty();
			   	$smarty->setModule('dashboard');
			   	$sty = $smarty->fetch('../view/styles.php');
				$scr = $smarty->fetch('../view/scripts.php');
				$smarty->assign('STY',$sty);
				$smarty->assign('SCR',$scr);
				$smarty->assign('MIS',$kakaroto->kamehameha('',50,'@@impresa')[0]);
				$smarty->assign('VAR',isset($_GET['tf']) ? $_GET['tf'] : '');
	            $smarty->display('reportes/'.$_REQUEST['rep'].'.tpl');
	   			break;
	   		case 2:
	   			
	   			break;
	   		case 3:
	   			
	   			break;
	   		case 4:
	   			
	   			break;
	   		case 5:
	   			$pagina = 1;
	   			for ($i=0; $i < $_REQUEST['fact']; $i++) { 
	   				$rs = $kakaroto->genkidama(1,64,'','null,1,1,1,now(),'.$i.',1,0,1300,10000,0,0,0,0,0,"","",1,1,"",1,"",""');
	   				echo "Factura: ";
	   				print_r($rs[0][0]);
	   				echo "<br>";
	   				for ($u=0; $u < $_REQUEST['cant']; $u++) { 
	   					$rs1 = $kakaroto->genkidama(1,65,'','null,'.$rs[0][0].','.$u.',0,0,1,1130,0');
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