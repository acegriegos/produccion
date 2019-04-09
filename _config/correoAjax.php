<?php 
require_once 'correo.php';
$correo = new correo($_POST['to'],$_POST['subject'],$_POST['body']);

ob_end_clean();
ignore_user_abort();
ob_start();
header("Connection: close");
echo json_encode(['success'=>1]);
header("Content-Length: " . ob_get_length());
ob_end_flush();
flush();

if($_POST['con_con']){
    $caccion = $_POST['accion'];
    $_REQUEST['accion'] = 99;

    require_once '../wsdlClient.php';
    include_once 'mysqlDB.php';
    sleep(10);
    $fe = new facturaElectronica($_POST['idfila']);
    $estado = $fe->estado();

    if(isset($estado['xml'])){

        $xml = $estado['xml'];
        file_put_contents("../assets/xml/RH_".$fe->info['NumeroConsecutivo'].", ".$_SESSION['EMPRESA'].".xml", $xml);
        array_push($_POST['adjunto'], "../assets/xml/RH_".$fe->info['NumeroConsecutivo'].", ".$_SESSION['EMPRESA'].".xml");

        if (isset($_POST['idtabla'])) {
            $db = new DBClass();

            switch($estado['estado']){
                case 'aceptado':
                    $state = 1;
                    break;
                case 'recibido':
                    $state = 9;
                    break;
                case 'rechazado':
                    $state = 3;
                    break;
                case 'procesando':
                    $state = 2;
                    break;
                case 'Sin Subir':
                    $state = 2;
                    break;
                case 'Sin Internet':
                    $state = 0;
                    break;
                case 'error':
                    $state = 8;
                    break;
                default:
                    $state = 0;
                    break;
            }

            $db->ejecutar('call shadow(2,'.$_POST['idtabla'].',"feestado = '.$state.'","id = '.$_POST['idfila'].'")');
        }

    }else{
        print_r($estado);
    }
    
    $correo->enviar_adjunto($_POST['adjunto']);

}else{
    switch ($_POST['accion']) {
    	case 1:
    		$correo->enviar();
    		break;
    	case 2:
    		$correo->enviar_general();
    		break;
    	case 3:
    		$correo->enviar_adjunto($_POST['adjunto']);
            break;
        default:
    		break;
    }
}


 ?>