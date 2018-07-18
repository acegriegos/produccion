<?php 
    require_once 'mysqlDB.php';
            
    $db = new DBClass();
    $mdb = $db->getDB();
    $user = $db->getUSR();
    $pass = $db->getPSS();
    $fecha = date('D_H');
    shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --routines --events --triggers > C:/xampp/htdocs/assets/respaldo/".$fecha.".sql");
 ?>