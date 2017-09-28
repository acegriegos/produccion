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