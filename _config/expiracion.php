<?php 
	$mod = 'main';
	
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
			    session_destroy();
			    $modulo = 'login';
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

			if (isset($_SESSION['EXPR'])) {
				if (!isset($_SESSION['tuser'])) {
					$_SESSION['tuser'] = new DateTime('now');
				}

				$ahora = new DateTime('now');
				$reserved = $_SESSION['tuser'];

				$interval = ceil((strtotime($ahora->format('Y-m-d H:i:s')) - strtotime($reserved->format('Y-m-d H:i:s')))/60);

				if ($interval >= $_SESSION['EXPR']) {
					session_destroy();
					$modulo = 'login';
				}else{
					$_SESSION['tuser'] = new DateTime('now');
				}
			}
			

			break;
	}



?>