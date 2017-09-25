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