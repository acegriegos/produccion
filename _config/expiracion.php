<?php 

	switch ($modulo) {
		case 'login';
			if (isset($_SESSION['USR']))
				$modulo = 'main';
			break;
		case '':
			if (!isset($_SESSION['USR'])) 
				$modulo = 'login';
			else
				$modulo = 'main';
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
			session_start();

			if (!isset($_SESSION['USR'])) {
				$modulo = 'login';
			}

			if (!isset($_SESSION['tuser'])) {
				$_SESSION['tuser'] = new DateTime('now');
			}

			$ahora = new DateTime('now');
			$reserved = $_SESSION['tuser'];

			$interval = ceil((strtotime($ahora->format('Y-m-d H:i:s')) - strtotime($reserved->format('Y-m-d H:i:s')))/60);

			if ($interval >= 120) {
				session_destroy();
				$modulo = 'login';
			}else{
				$_SESSION['tuser'] = new DateTime('now');
			}

			break;
	}



?>