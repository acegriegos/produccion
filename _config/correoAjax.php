<?php 

require_once 'correo.php';

$correo = new correo($_POST['to'],$_POST['subject'],$_POST['body']);
//echo $_POST['to'];
switch ($_POST['accion']) {
	case 1:
		print_r($correo->enviar());
		break;
	case 2:
		print_r($correo->enviar_general());
		break;
	case 3:
		print_r($correo->enviar_adjunto($_POST['adjunto']));
		break;
}



 ?>