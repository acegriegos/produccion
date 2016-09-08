 <!DOCTYPE html>
 <html lang="es">
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="Cache-Control" content="max-age=86400"/>
     <title></title>
 
     <link href="assets/css/bootstrap.css" rel="stylesheet">
     <link rel="stylesheet" type="text/css" href="assets/libs/DataTables-1.10.4/media/css/jquery.dataTables.css">
     <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
 
     <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
     <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
     <!--[if lt IE 9]>
       <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
       <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
     <![endif]-->
   </head>
   <body>
     <?php 	
		if (!isset($_REQUEST['modulo'])) {
			?>
			<div class="alert alert-danger" style="text-align: center; margin-top:5%">
				<strong>ACCESO DENEGADO!</strong><br> No tiene Permisos
			</div>
			<?php
		}else{
			echo "<div class=\"container\">";
			$modulo = $_REQUEST['modulo'];

			if (is_file("dashboard/control/ctr_".$modulo.".php")) 
				unlink("dashboard/control/ctr_".$modulo.".php");

			if (is_file("dashboard/model/m_".$modulo.".php")) 
				unlink("dashboard/model/m_".$modulo.".php");

			if (is_file("dashboard/view/v_".$modulo.".tpl")) 
				unlink("dashboard/view/v_".$modulo.".tpl");

      if (is_file("assets/css/modulos/style-".$modulo.".css")) {
        unlink("assets/css/modulos/style-".$modulo.".css");
      }

      if (is_file("assets/js/modulos/".$modulo.".js")) {
        unlink("assets/js/modulos/".$modulo.".js");
      }

			echo "<h2><b>Módulo Eliminado: $modulo</b></h2><br>";

			echo "</div>";
		} ?>
 	
     <script src="assets/js/jquery.js"></script>
     <script src="assets/js/bootstrap.min.js"></script>
     <script src="assets/libs/DataTables-1.10.4/media/js/jquery.dataTables.js"></script>
   </body>
 </html>