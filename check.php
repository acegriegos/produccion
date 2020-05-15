<?php

 require_once '_config/mysqlDB.php';
 $base = new DBClass();

 $rs = $base->ejecutar('select p12,pass_n,nombre,id from sucursales where id >= 0')->fetch_all();

 foreach($rs as $obj){
echo $obj[2].": ";
 if(file_exists($obj[0])){
 if(openssl_pkcs12_read(file_get_contents($obj[0]), $certs, $obj[1])){

	    $publicKey = $certs["cert"];

	    $certData = openssl_x509_parse($publicKey);
	    $fexp = gmdate("Y-m-d H:i:s",$certData['validTo_time_t']);
	    echo ' '.$fexp.'<br>';
	    $base->ejecutar('update ajustessucursales set exp_p12 = "'.$fexp.'" where idsucursal = '.$obj[3]);

	}else{
	    echo ' PIN o Llave no Validos <br>';
	}
}else{
 echo ' Llave no Existente<br>';
}
}

?>