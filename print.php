<?php 
$fp=pfsockopen("192.168.31.153",515);
fputs($fp, 'hola');
fclose($fp);


$html = "<h1>Test de Impresión de Tickets</h1>";

$html = "Impresión automática desde la impresora escogida";

$printer='POS-80';

$enlace=printer_open($printer);

printer_write($enlace, $html);

printer_close($enlace);
 ?>
