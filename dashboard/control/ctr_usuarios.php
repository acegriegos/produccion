<?php  
require_once 'model/m_general.php';
$kakaroto = new _general();

if (!isset($_REQUEST['accion'])) {
	require '../_config/mySmarty.php';
	$smarty = new mySmarty();

	$smarty->setModule('dashboard');
	$pg = $smarty->fetch('../view/menuSmarty.php');
	$sty = $smarty->fetch('../view/styles.php');
	$scr = $smarty->fetch('../view/scripts.php');
	
	$smarty->assign('STY',$sty);
	$smarty->assign('SCR',$scr);
	$smarty->assign('NAV',$pg);
	$smarty->display('v_usuarios.tpl');
}else{
	$pagina = 0;
	switch ($_REQUEST['accion']) {
		case 1:
			$transaccion = $kakaroto->kamehameha($_REQUEST['arreglo']['sel'],$_REQUEST['arreglo']['tbl'],$_REQUEST['arreglo']['where']);
			break;
		case 2:
			$pagina = 1;
			if ($_REQUEST['arreglo'] == 1){ 
				$usr = $kakaroto->kamehameha('',7,'@@impresa,@@usr');
				$cia = $kakaroto->kamehameha('id,nombre',13,'id > 0 and id in(select vidempresa from usuarios where id = @@usr)');
				$suc = $kakaroto->kamehameha('',155,'@@usr');
				$tusr = $kakaroto->kamehameha('id,nombre',27,'id > 0 and id  <> 2');
			}
			else if ($_REQUEST['arreglo'] == 2) 
				$usr = $kakaroto->kamehameha('id,Nombre',1,"id > 1 and FIND_IN_SET(@@impresa,idsucursal)");
			else{ 
				$usr = $kakaroto->kamehameha('id,Nombre',1,"id > 1 and FIND_IN_SET(@@impresa,idsucursal)");
				$acc = $kakaroto->kamehameha('id,nombre',305,"");
				$log = $kakaroto->kamehameha('',304,$_REQUEST['arreglo']['where']);
				if($_REQUEST['arreglo']['id'] == 2)
					$tbl = 1;
				$_REQUEST['arreglo'] = 3;
			}
			if($_REQUEST['arreglo'] != 3) 
				$tusr = $kakaroto->kamehameha('id,nombre',27,'id > 0 and id  <> 2');

			include 'view/ajax/usuarios/'.$_REQUEST['arreglo'].'.php';
			break;
		case 3:
			if (!$_REQUEST['arreglo']['tipo']) {
				$kakaroto->sql = "UPDATE permisosUsuarios set tipo = ".$_REQUEST['arreglo']['permiso']." where id = ".$_REQUEST['arreglo']['id'];
			}else
			$kakaroto->sql = "UPDATE permisosTipoUsuario set tipo = ".$_REQUEST['arreglo']['permiso']." where id = ".$_REQUEST['arreglo']['id'];

			$transaccion = $kakaroto->ejecutarSelect();
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