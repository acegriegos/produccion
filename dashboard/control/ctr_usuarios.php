<?php  
require_once 'model/m_general.php';
$kakaroto = new _general();

if (!isset($_REQUEST['accion'])) {
	require '../_config/mySmarty.php';
	$smarty = new mySmarty();

	$smarty->setModule('dashboard');
	$pg = $smarty->fetch('../view/menuSmarty.php');

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
			$usr = $kakaroto->kamehameha('Id,Usuario,Nombre,Cedula,Correo,`Tipo Usuario`,`Hora Entrada`,`Hora Salida`',7,"");
			$cia = $kakaroto->kamehameha('id,nombre',13,'id > 0');
			$suc = $kakaroto->kamehameha('id,nombre',39,'id > 0');
			$tusr = $kakaroto->kamehameha('id,nombre',27,'id > 0');
		}

		else if ($_REQUEST['arreglo'] == 2) 
			$usr = $kakaroto->kamehameha('id,Nombre',2,"");

		else{ 
			$usr = $kakaroto->kamehameha('id,Nombre',2,"");
			$log = $kakaroto->kamehameha('Usuario,accion,descripcion,Fecha',11,$_REQUEST['arreglo']['where']);
			if($_REQUEST['arreglo']['id'] == 2)
				$tbl = 1;
			$_REQUEST['arreglo'] = 3;
		}

		if($_REQUEST['arreglo'] != 3) 
			$tusr = $kakaroto->kamehameha('id,nombre',27,'id > 0');

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