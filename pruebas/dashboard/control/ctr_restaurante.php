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
	   	$smarty->assign('MESAS',$kakaroto->kamehameha('id,nombre,idtipoocupado',800,'id > 0 and !bisbarra and idsucursal = @@impresa'));
	   	$smarty->assign('BARRAS',$kakaroto->kamehameha('id,nombre',800,'id > 0 and bisbarra and idsucursal = @@impresa'));
	   	$smarty->assign('FAM',$kakaroto->kamehameha('',804,'@@impresa'));
	   	$smarty->display('v_restaurante.tpl');
	   }else{
	   $pagina = 0;
	   	switch ($_REQUEST['accion']) {
	   		case 1:
	   			$pagina = 1;

        		if($_REQUEST['arreglo']['tp'] == 1){
        			$transaccion = $kakaroto->kamehameha('',808,$_REQUEST['arreglo']['id'].',0');
        			echo "VISTA";
        		} //VISTA HTML
        		else{

        			$transaccion = $kakaroto->kamehameha('',808,$_REQUEST['arreglo']['id'].',1');
        			if(sizeof($transaccion[0])){
        				$nom = $_SESSION['EMPRESA'].'_COCINA_'.date('YmdHmi');
        				include_once 'view/ajax/restaurantes/comanda.php';
        				shell_exec("start-process 'C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe' -ArgumentList '/S /T C:\logintech\apache\htdocs\produccion\assets\pdf\C-".$nom.".pdf'");
        			}

        			if(sizeof($transaccion[0])){
        				$nom = $_SESSION['EMPRESA'].'_BEBIDAS_'.date('YmdHmi');
	        			$transaccion = $kakaroto->kamehameha('',808,$_REQUEST['arreglo']['id'].',2');
	        			include_once 'view/ajax/restaurantes/comanda.php';
	        			shell_exec("start-process 'C:\Program Files (x86)\Adobe\Acrobat Reader DC\Reader\AcroRd32.exe' -ArgumentList '/S /T C:\logintech\apache\htdocs\produccion\assets\pdf\C-".$nom.".pdf'");
	        		}

        		} //CREAR ARCHIVO Y MANDAR A IMPRIMIR
	   			
	   			break;
	   		default:
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