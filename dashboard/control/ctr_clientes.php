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
		
		$_REQUEST['is'] = isset($_REQUEST['is']) ? $_REQUEST['is'] : 0;
		$smarty->assign('STY',$sty);
		$smarty->assign('SCR',$scr);
	    $smarty->assign('PRO',$kakaroto->kamehameha('*',8,'1 order by id'));
	    $smarty->assign('ESTCLIE',$kakaroto->kamehameha('*',68,'id >= 0 order by nombre'));
	    $smarty->assign('NVLCLIE',$kakaroto->kamehameha('*',69,'id > 0 and idsucursal = @@impresa order by id'));
	    $smarty->assign('TPTEL',$kakaroto->kamehameha('*',4,'id > 0 order by id'));
	    $smarty->assign('IMP',$kakaroto->kamehameha('*',51,'id > 0 order by nombre'));
	    $smarty->assign('CLIE',$kakaroto->kamehameha('',76,'0,0,",'.$_REQUEST['is'].',@@impresa","0,10"'));
	    $smarty->assign('AGE',$kakaroto->kamehameha('id,nombre',1,'id > 0 and idtipousuario = 4 order by nombre'));
	    $smarty->assign('MON',$kakaroto->kamehameha('id,simbolo',54,'id > 0 order by principal desc'));
	    $smarty->assign('EXOS',$kakaroto->kamehameha('idhacienda,nombre',126,'id > 0 order by nombre'));
	    
	   	$smarty->assign('NAV',$pg);
	   	$smarty->display('v_clientes.tpl');
	   	
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