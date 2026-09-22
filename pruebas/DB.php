 <!DOCTYPE html>
 <html lang="es">
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="Cache-Control" content="max-age=86400"/>
     <title>SP-LT</title>
 
     <link href="assets/css/materialize.css" rel="stylesheet" type="text/css">
   </head>
   <body>
   	 
   	 <?php 

   	 if (!isset($_REQUEST['tabla'])) { ?>
		<div class="alert alert-danger" style="text-align: center; margin-top:5%">
			<strong>ACCESO DENEGADO!</strong><br> No tiene Permisos
		</div>
	 <?php }else{

	 	echo '<div class="container">';

	 	require_once '_config/mysqlDB.php';
	 	$mysql = new DBClass();
	 	$tabla = $_REQUEST['tabla'];
        $schema = isset($_REQUEST['schema']) ? $_REQUEST['schema'].'.' : '';
        $log = isset($_REQUEST['schema']) ? 'developer.' : '';

	 	$rs = $mysql->ejecutar("DESCRIBE ".$schema.$tabla);
	   
	 	if (isset($rs->num_rows)) { 
	 		$cols = $rs->fetch_all();
            $drop = 'DROP PROCEDURE IF EXISTS '.$schema.'sp_mant'.$tabla;
	 		print_r($mysql->ejecutar($drop));
            echo " - ".$drop;
	 		echo "<hr>";
	 		$param = 'CREATE PROCEDURE '.$schema.'sp_mant'.$tabla.'(vaccion tinyint(2),';
	 		foreach ($cols as $obj) {
	 			$param .= 'v'.$obj[0].' '.$obj[1].',';
	 		}
	 		$param = substr($param, 0,-1);
	 		$param .= ')BEGIN 
CASE vaccion 
WHEN 1 THEN  
	INSERT INTO '.$schema.$tabla.' VALUES(';

foreach ($cols as $obj) {
	switch ($obj[1]) {
		case 'datetime':
			$param .= 'now(),';
			break;
		
		default:
			switch ($obj[0]) {
			case 'id':
				$param .= 'null,';
				break;
			
			default:
				$param .= 'v'.$obj[0].',';
				break;
			}
			
			break;
	}
	
	
	
}
$param = substr($param, 0,-1);

	$param .= ');
SELECT @@identity;
/*INSERT INTO '.$log.'log values(null,0,1,\'\',vidusuario,now());*/  

WHEN 2 THEN  
	UPDATE '.$schema.$tabla.' SET ';

foreach ($cols as $obj) {
	switch ($obj[1]) {
		case 'datetime':
			$param .= $obj[0].' = now(),';
			break;
		
		default:
			switch ($obj[0]) {
			case 'id':
				$param .= '';
				break;
			
			default:
				$param .= $obj[0].' = v'.$obj[0].',';
				break;
			}
			
			break;
	}
}
$param = substr($param, 0,-1);

$param .= '
    WHERE id = vid;
	SELECT vid;
	/*INSERT INTO '.$log.'log values(null,0,2,\'\',vidusuario,now());*/

WHEN 3 THEN
	SELECT ifnull(if(min(id)-1 = 0,-1,min(id)-1),-1) FROM '.$tabla.' INTO @id;  
	UPDATE '.$tabla.' set id = @id where id = vid;
	SELECT @id;
    alter table '.$tabla.' AUTO_INCREMENT 1;
	/*INSERT INTO '.$log.'log values(null,0,3,\'\',vidusuario,now());*/
END CASE; 
END;';  
	 		 print_r($mysql->ejecutar($param));
             echo " - ".$param;

	 	}else{
	 		echo "Tabla ".$schema.$tabla." no Existe<br>";
            print_r($rs);
	 	}
	  }?>			 
 		</div>
     <script src="assets/js/jquery.js"></script>
     <script src="assets/js/materialize.min.js"></script>
     <script src="assets/libs/DataTables/media/js/jquery.dataTables.js"></script>
   </body>
 </html>