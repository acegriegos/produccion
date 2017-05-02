<?php
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache');

require_once '_config/mysqlDB.php';
require_once '_config/ecy.php';
$cy = new _cy();
$base = new DBClass();
$usr = str_replace("\0","",$cy->decy($_SESSION['USR']));
$alerta = $base->ejecutar('call krattos("",211,'.$usr.')');
$salida = [];

$alerta = $alerta->fetch_all()[0];
if ($alerta[1] != 0) {
    $salida["data"] = "Tienes una Nueva Notificación\n\n";
    $base->ejecutar('call shadow(2,210,"isread = 0","isread is null and id > 0 and iduser_to = '.$usr.'")');
}else{
    $salida["data"] = "";
}
$salida["cantidad"] = $alerta[0];
    

echo "data:".json_encode($salida)."\n\n";


ob_end_flush();
flush();
sleep(5);
?>