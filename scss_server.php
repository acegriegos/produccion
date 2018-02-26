<?php
require "assets/libs/scssphp/scss.inc.php";

$scss = new scssc();
$scss->setFormatter("scss_formatter_compressed");

$server = new scss_server("assets/css", null, $scss);
$server->serve();
?>