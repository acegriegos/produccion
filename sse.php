<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

require_once '_config/mysqlDB.php';
require_once '_config/ecy.php';
$cy = new _cy();
$base = new DBClass();
$alerta = $base->ejecutar('call krattos("",211,'.str_replace("\0","",$cy->decy($_SESSION['USR'])).')');
if ($alerta->num_rows != 0) {
    $alerta = $alerta->fetch_all()[0];
    if ($alerta[0] != 0) {
        echo "data: Tienes una Nueva Notificación\n\n";
    }
    if ($alerta[1] != 0) {
        echo "cantidad: ".$alerta[1]."\n\n";
    }
    
}



ob_end_flush();
flush();
sleep(4);
?>