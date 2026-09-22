<?php 
	$mod = 'facturacion';
	
	switch ($modulo) {
		case 'login';
			if (isset($_SESSION['USR'])){
				if ($_SESSION['BUSS'] == 1) {
					$mod = 'facturacion';
				}
				$modulo = $mod;
			}
			break;
		case '':
			if (!isset($_SESSION['USR'])) 
				$modulo = 'login';
			else{
				if ($_SESSION['BUSS'] == 1) {
					$mod = 'facturacion';
				}
				$modulo = $mod;
			}
			break;
		case 'logout':
			session_start();

			if (isset($_SESSION['USR'])) {
				$token = $_COOKIE['apsy_token'] ?? null;
			    $modulo = cerrar_sesion($token,'Logout');
			}
			else
				$modulo = 'login';
			break;
		case 'dashboard':
			$modulo = "login";
			break;
		default:
			session_start(['cache_expire' => 0]); //, 'name' => 

			if (!isset($_SESSION['USR'])) {
				$modulo = 'login';
			}

			$token 		= $_COOKIE['apsy_token'] ?? null;
			$refresh 	= $_COOKIE['apsy_refresh'] ?? null;

			if(!$refresh)
				$modulo = cerrar_sesion('','Tiempo Maximo');
			
			if (!$token) {
				$modulo = cerrar_sesion('','Token Expired');
			}else{
				include_once '../_config/mysqlDB.php';
				$db = new DBClass();
				$res = $db->ejecutar("call sp_validate_token('".$token."')")->fetch_all(MYSQLI_ASSOC)[0];
				
				if ($res['ok'] != 1) {
				    $modulo = cerrar_sesion($token,'Validate');

				}else{
					// listo: usuario válido
					setcookie(
	                  "apsy_token",
	                  $token,
	                  time() + 3600,
	                  "/; samesite=Lax",
	                  "",
	                  $is_https,
	                  true
	              );

				  //$db->ejecutar('insert into auditar_token values(id,now(),"Renovacion de cookie : '.$token.'")');
				}
			}
			
			break;
	}

	function cerrar_sesion($token = '',$tipo= ''){

		include_once '../_config/mysqlDB.php';
		$db = new DBClass();

		$db->ejecutar('insert into auditar_token values(id,now(),"'.$tipo.': '.$token.'")');

		if($token){

			$db->ejecutar('delete FROM auth_tokens WHERE token = '.$token.';');
		}

		session_destroy();

		return 'login';
	}

?>