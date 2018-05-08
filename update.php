<?php 
    
    require_once '_config/mysqlDB.php';
   
    $db = new DBClass();
    $mdb = $db->getDB();
    $user = $db->getUSR();
    $pass = $db->getPSS();
    $salida = [];
    $errors = [];
    set_time_limit(0);

    $numtables = shell_exec("mysql -u".$user." -p".$pass." -e \"select count(*) as '' from information_schema.TABLES where table_schema = '".$mdb."'\";");

    fclose(fopen('./assets/update/update.log','w'));

    if(trim($numtables) == 0){

        shell_exec("mysql -u".$user." -p".$pass." -e \"create schema if not exists ".$mdb."\"  2>&1");
        shell_exec("mysql -u".$user." -p".$pass." -e \"grant all privileges on ".$mdb.".* to ".$user."@localhost identified by '".$pass."' \"  2>&1");

        $source = "https://logintechcr.com/descargas/struct.lt";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $source);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSLVERSION,false);
        $data = curl_exec ($ch);
        $error = curl_error($ch); 
        curl_close ($ch);

        $destination = "./assets/update/update.sql";
        $file = fopen($destination, "w+");
        fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($data),'AES-256-CBC',base64_encode('".$pass."'))
        fclose($file);

        $archivo = file_get_contents('./assets/update/update.sql');
        $archivo = preg_replace('/`root`/', `".$user."`, $archivo);
        $archivo = preg_replace('/`%`/', `localhost`, $archivo);
        $archivo = preg_replace('/developer/', $mdb, $archivo);
        file_put_contents('./assets/update/update.sql', $archivo);
        shell_exec("mysql -u".$user." -p".$pass." -f ".$mdb." < ./assets/update/update.sql >> ./assets/update/update.log 2>&1");

        unlink("assets/update/update.sql");
    }else{

    
    if (!file_exists("assets/update/update.sql")) {

        shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --no-create-info --skip-triggers --ignore-table=".$mdb.".tablas --ignore-table=".$mdb.".accesos --ignore-table=".$mdb.".ajustes --ignore-table=".$mdb.".estadopresupuestos --ignore-table=".$mdb.".estadofacturas --ignore-table=".$mdb.".tipoacciones --ignore-table=".$mdb.".tipoakeys --ignore-table=".$mdb.".tipoasientos --ignore-table=".$mdb.".tipociclos --ignore-table=".$mdb.".tipoclientes --ignore-table=".$mdb.".tipocontable --ignore-table=".$mdb.".tipocuentas --ignore-table=".$mdb.".tipodevoluciones --ignore-table=".$mdb.".tipoestadocuentas --ignore-table=".$mdb.".tipofacturaimpresiones --ignore-table=".$mdb.".tipofacturas --ignore-table=".$mdb.".tipoflotilla --ignore-table=".$mdb.".tipoimpresion --ignore-table=".$mdb.".tipoimpresiones --ignore-table=".$mdb.".tipojerarquia --ignore-table=".$mdb.".tiporutas --ignore-table=".$mdb.".tipotelefonos --ignore-table=".$mdb.".tipoventas > ./assets/update/info.sql");
        shell_exec("mysqldump --user=".$user." --password=".$pass." ".$mdb." --routines --events --triggers > ./assets/update/full.sql");

        $source = "https://logintechcr.com/descargas/struct.lt";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $source);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_SSLVERSION,false);
        $data = curl_exec ($ch);
        $error = curl_error($ch); 
        curl_close ($ch);

        $destination = "./assets/update/update.sql";
        $file = fopen($destination, "w+");
        fputs($file, base64_decode($data)); //openssl_decrypt(base64_decode($data),'AES-256-CBC',base64_encode('".$pass."'))
        fclose($file);

        $archivo = file_get_contents('./assets/update/update.sql');
        $archivo = preg_replace('/`root`/', `".$user."`, $archivo);
        $archivo = preg_replace('/`%`/', `localhost`, $archivo);
        $archivo = preg_replace('/developer/', $mdb, $archivo);
        file_put_contents('./assets/update/update.sql', $archivo);
    }

    shell_exec("mysql -u".$user." -p".$pass." -f ".$mdb." < ./assets/update/update.sql >> ./assets/update/update.log 2>&1");
    shell_exec("mysql -u".$user." -p".$pass." -f ".$mdb." < ./assets/update/info.sql >> ./assets/update/update.log 2>&1");

    $salida['update'] = 1;

    if(filesize("assets/update/update.log")){

        $salida['update'] = 0;

        shell_exec("mysql -u".$user." -p".$pass." ".$mdb." < ./assets/update/full.sql");
        $salida['rollback'] = 1;
    }else{
        unlink("assets/update/info.sql");
        unlink("assets/update/update.sql");
        unlink("assets/update/full.sql");
    }

    echo json_encode($salida);
    }
    exit(0);
 ?>