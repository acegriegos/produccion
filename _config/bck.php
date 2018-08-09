<?php 
    set_time_limit(0);
    $mdb = isset($_GET['base']) ? $_GET['base'] : 'production';
    $user = isset($_GET['user']) ? $_GET['user'] : 'itech01';
    $pass = isset($_GET['psse']) ? $_GET['psse'] : 'Login2Help';
    $ruta = isset($_GET['ruta']) ? "/".$_GET['ruta'] : "";
    $fecha = date('D_H');

    if (isset($_GET['url']))
        $archivo = $_GET['url'];
    else
        $archivo = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN' ? "C:/xampp/htdocs".$ruta."/assets/respaldo/" : "/opt/lampp/htdocs".$ruta."/assets/respaldo/";
    
    $archivo = $archivo.strtoupper($mdb)."_".strtoupper($fecha).".sql";

    shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --routines --events --triggers > ".$archivo);
 ?>