<?php 
	$path_info = parse_path();
	$modulo = $path_info['call_parts'][0];
	
	require_once '../_config/expiracion.php';


	if (is_file('control/ctr_'.$modulo.'.php') && hper($modulo) ) { //
		require_once 'control/ctr_'.$modulo.'.php';
	}else{
		require_once '../_config/error.php';
	}

	function make_smarty(){
		require '../_config/mySmarty.php';

		$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');
	   	$pg = $smarty->fetch('../view/menuSmarty.php');
	    $sty = $smarty->fetch('../view/styles.php');
        $scr = $smarty->fetch('../view/scripts.php');
    
        $smarty->assign('STY',$sty);
        $smarty->assign('SCR',$scr);
	   	$smarty->assign('NAV',$pg);
	 	return $smarty;
	}

	function make_smarty_ajax(){
		require '../_config/mySmarty.php';

		$smarty  = new mySmarty();
	   	$smarty->setModule('dashboard');

	 	return $smarty;
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

	function hper($vmodulo)
	{
		include_once '../_config/mysqlDB.php';
		$db = new DBClass();

		$rs = $db->ejecutar("select if(b.tipo <> 1,0,1) from permisos a join permisosusuarios b on a.id = b.idpermiso where a.href = '".$vmodulo."'");
		$rs = $rs->num_rows > 0 ? $rs->fetch_all()[0][0] : 1;
		return $rs;
	}

 ?>