<?php 

    require_once '_config/mysqlDB.php';
    $mysql = new DBClass();

    $db = isset($_GET['db']) ? $_GET['db'] : 'developer';
    echo "MAPEANDO BASE DE DATOS: ".$db;
    echo "<hr>TRIGGERS<br>";
    $triggers = $mysql->ejecutar("select * from information_schema.TRIGGERS")->fetch_all();

    foreach ($triggers as $key) {
        $msql = "DROP TRIGGER IF EXISTS ".$key[2].";";
        $mysql->ejecutar($msql);
      
        $msql = "CREATE DEFINER=`itech01`@`localhost` TRIGGER ".$key[2]."  ".$key[11]." ".$key[3]." ON ".$key[6]." FOR EACH ROW ".$key[9].";";
        $rs = $mysql->ejecutar($msql);
        $rs = $rs == 1 ? $key[2]." Mapeado" : $key[2]." ".$rs;
        echo $rs."<br>";
  
    }
    echo "<hr>PROCEDURES<br>";

    $msql = "UPDATE mysql.proc SET DEFINER='itech01@localhost' WHERE db = '".$db."';";
    $rs = $mysql->ejecutar($msql);
    $rs = $rs == 1 ? "Procesado" : $rs;
    echo $rs."<br>";

    echo "<hr>EVENTS<br>";

    $msql = "UPDATE mysql.event SET DEFINER='itech01@localhost' WHERE db = '".$db."';";
    $rs = $mysql->ejecutar($msql);
    $rs = $rs == 1 ? "Procesado" : $rs;
    echo $rs."<br>";


 ?>