<?php 
	$path_info = parse_path();
	$modulo = $path_info['call_parts'][0];
	
	require_once '../_config/expiracion.php';

	// include '../_config/mysqlDB.php';
	// include_once '../_config/ecy.php';

	// $cy = new _cy();
	// $db = new DBClass();
	// $usr = $cy->decy($_SESSION['USR']);

	// $rs = $db->ejecutar("SELECT 10")->fetch_all()[0][0];

	//tipo from permisosUsuarios p join permisos m on p.idpermiso = m.id where p.idusuario = '".$usr."' and m.nombre = '".$modulo."'"

	if (is_file('control/ctr_'.$modulo.'.php') ) {
		require_once 'control/ctr_'.$modulo.'.php';
	}else{
		require_once '../_config/error.php';
	}
	
	function parse_path() {
	  $path = array();
	  if (isset($_SERVER['REQUEST_URI'])) {
	    $request_path = explode('?', $_SERVER['REQUEST_URI']);

	    $path['base'] = rtrim(dirname($_SERVER['SCRIPT_NAME']), '\/');
	    $path['call_utf8'] = substr(urldecode($request_path[0]), strlen($path['base']) + 1);
	    $path['call'] = utf8_decode($path['call_utf8']);
	    if ($path['call'] == basename($_SERVER['PHP_SELF'])) {
	      $path['call'] = '';
	    }
	    $path['call_parts'] = explode('/', $path['call']);
	    $path['query_utf8'] = urldecode($request_path[0]);
	    $path['query'] = utf8_decode(urldecode($request_path[0]));
	    $vars = explode('&', $path['query']);
	    foreach ($vars as $var) {
	      $t = explode('=', $var);
	      $path['query_vars'][$t[0]] = $t[0];
	    }
	  }
	return $path;
	}

 ?>