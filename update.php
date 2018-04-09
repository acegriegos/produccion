<?php 
    
    require_once 'config/mysqlDB.php';

    $db = new DBClass();
    $mdb = $db->getDB();
    $salida = [];
    $errors = [];
    shell_exec("> ./assets/update/update.log");

    if (!file_exists("assets/update/update.sql")) {
        shell_exec("mysqldump --user=itech01 --password=Login2Help ".$mdb." --no-create-info --skip-triggers --ignore-table=".$mdb.".tablas --ignore-table=".$mdb.".accesos --ignore-table=".$mdb.".ajustes --ignore-table=".$mdb.".estadopresupuestos --ignore-table=".$mdb.".estadofacturas --ignore-table=".$mdb.".tipoacciones --ignore-table=".$mdb.".tipoakeys --ignore-table=".$mdb.".tipoasientos --ignore-table=".$mdb.".tipociclos --ignore-table=".$mdb.".tipoclientes --ignore-table=".$mdb.".tipocontable --ignore-table=".$mdb.".tipocuentas --ignore-table=".$mdb.".tipodevoluciones --ignore-table=".$mdb.".tipoestadocuentas --ignore-table=".$mdb.".tipofacturaimpresiones --ignore-table=".$mdb.".tipofacturas --ignore-table=".$mdb.".tipoflotilla --ignore-table=".$mdb.".tipoimpresion --ignore-table=".$mdb.".tipoimpresiones --ignore-table=".$mdb.".tipojerarquia --ignore-table=".$mdb.".tiporutas --ignore-table=".$mdb.".tipotelefonos --ignore-table=".$mdb.".tipoventas > ./assets/update/info.sql");
        shell_exec("mysqldump --user=itech01 --password=Login2Help ".$mdb." --routines --events --triggers > ./assets/update/full.sql");

        shell_exec("curl -f https://logintechcr.com/descargas/struct.lt -o ./assets/update/struct.lt");
        shell_exec("openssl enc -aes256 -in ./assets/update/struct.lt -out ./assets/update/update.sql -d -k Login2Help");
        shell_exec("sed -i -e 's/`root`/`itech01`/g' ./assets/update/update.sql");
        shell_exec("sed -i -e 's/`%`/`localhost`/g' ./assets/update/update.sql";); 
        shell_exec("sed -i -e 's/developer/'".$mdb."'/g' ./assets/update/update.sql");
    }

    shell_exec("mysql -uitech01 -pLogin2Help ".$mdb." < ./assets/update/update.sql >> ./assets/update/update.log 2>&1");
    shell_exec("mysql -uitech01 -pLogin2Help -f ".$mdb." < ./assets/update/info.sql >> ./assets/update/update.log 2>&1");

    $salida['update'] = 1;

    if(filesize("assets/update/update.log")){

        $file = fopen("assets/update/update.log",'r');
        while(!feof($file))
        {
         $linea = fgets($file);
         if (strlen($linea)) {
             array_push($errors, $linea);
         }
        }
        fclose($file);

        $salida['errores'] = $errors;
        $salida['update'] = 0;

        shell_exec("mysql -uitech01 -pLogin2Help ".$mdb." < ./assets/update/full.sql");
        $salida['rollback'] = 1;
    }else{
        unlink("assets/update/info.sql");
        unlink("assets/update/update.sql");
    }

    if (file_exists("assets/update/full.sql")) {
        unlink("assets/update/full.sql");
        unlink("assets/update/struct.lt");
    }

    echo json_encode($salida);
    
    exit(0);
 ?>