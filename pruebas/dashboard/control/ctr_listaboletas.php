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
    
        $smarty->assign('STY',$sty);
        $smarty->assign('SCR',$scr);
	   	$smarty->assign('NAV',$pg);
	   	$smarty->assign('LBO',$kakaroto->kamehameha('lpad(id,10,0) as id,date_format(fecha,"%d/%m/%Y %H:%i:%s") as fecha, case idtipo when 1 then "Entrada de Inventario" when 2 then "Salida de Inventario" else "Movimiento entre Inventarios" end as tipo,(select nombre from usuarios where id = idusuario) as usuario,id',284,'id > 0 and idsucursal = @@impresa order by date_format(fecha,"%Y%m%d") desc'));
	   $smarty->display('v_listaboletas.tpl');
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