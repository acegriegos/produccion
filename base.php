 <!DOCTYPE html>
 <html lang="es">
   <head>
     <meta charset="utf-8">
     <meta http-equiv="X-UA-Compatible" content="IE=edge">
     <meta name="viewport" content="width=device-width, initial-scale=1.0">
     <meta http-equiv="Cache-Control" content="max-age=86400"/>
     <title></title>
 
     <link href="assets/css/bootstrap.css" rel="stylesheet">
 
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
			echo "<h2><b>Módulo: $modulo</b></h2><br>";

			$nuevoarchivo = fopen("dashboard/control/ctr_".$modulo.".php", "w+"); 
			
			$contenido = "<?php  
	    require_once 'model/m_general.php';
	    \$kakaroto = new _general();

	    if (!isset(\$_REQUEST['accion'])) {
	   	require '../_config/mySmarty.php';
	   
	   	\$smarty  = new mySmarty();
	   	\$smarty->setModule('dashboard');
	   	\$pg = \$smarty->fetch('../view/menuSmarty1.php');
	   
	   	\$smarty->assign('NAV',\$pg);
	   	\$smarty->display('v_".$modulo.".tpl');
	   }else{
	   \$pagina = 0;
	   	switch (\$_REQUEST['accion']) {
	   		case 1:

	   			break;
	   		case 2:

	   			break;
	   		case 3:
	   			
	   			break;
	   		case 4:
	   			
	   			break;
	   		case 5:
	   			
	   			break;
	   	}
		if(!\$pagina){
		   	if (is_array(\$transaccion)){
				\$marcas = \$transaccion;
				\$succed = 1;
				}else{
					\$marcas = array('ERROR'=>\$transaccion);
					\$succed = 0;
				}
		
				\$salida = array('succed'=>\$succed);
				array_push(\$salida, \$marcas);
				print_r(json_encode(\$salida));	
		
		   }
	    }	
			   
?>";

			fwrite($nuevoarchivo,$contenido); 
 			fclose($nuevoarchivo);
 			if (is_file("dashboard/control/ctr_".$modulo.".php")) 
 				echo "Archivo Controlador Creado<br>";

 	/* 		$nuevoarchivo = fopen("dashboard/model/m_".$modulo.".php", "w+"); 

// 			$contenido = "<?php 
				
// 	require_once '../_config/RUD.php';

// 	class _".$modulo." extends RUD
// 	{
		
// 	}
			
// ?>";

			fwrite($nuevoarchivo,$contenido); 
			fclose($nuevoarchivo);
			if (is_file("dashboard/model/m_".$modulo.".php")) 
				echo "Archivo Modelo Creado<br>";*/

			$nuevoarchivo = fopen("dashboard/view/v_".$modulo.".tpl", "w+"); 
			
			$contenido = "<!DOCTYPE html>
<html lang=\"es\">
  <head>
    <meta charset=\"utf-8\">
    <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <meta http-equiv=\"Cache-Control\" content=\"max-age=86400\"/>
    <title></title>
    <link rel=\"icon\" type=\"image/png\" href=\"../assets/img/favicon.ico\">
    <link href=\"../assets/css/bootstrap.min.css\" rel=\"stylesheet\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/libs/DataTables/media/css/jquery.dataTables.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/libs/DataTables/media/css/dataTables.responsive.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/libs/iconos/css/font-awesome.min.css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/css/modulos/style-".$modulo.".css\">
    <link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/css/modulos/style-menu1.css\">
	<link rel=\"stylesheet\" type=\"text/css\" href=\"../assets/css/system.min.css\">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src=\"https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js\"></script>
      <script src=\"https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js\"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    {\$NAV}
    <div class=\"bdy\">

    </div>
    <script src=\"../assets/js/bootstrap.min.js\"></script>
    <script src=\"../assets/js/mask/jquery.mask.js\"></script>
    <script src=\"../assets/libs/DataTables/media/js/jquery.dataTables.min.js\"></script>
    <script src=\"../assets/libs/DataTables/media/js/dataTables.responsive.min.js\"></script>
    <script src=\"../assets/js/asgard.js\"></script>
    <script src=\"../assets/js/modulos/".$modulo.".js\"></script>
  </body>
</html>";

			fwrite($nuevoarchivo,$contenido); 
			fclose($nuevoarchivo);
			if (is_file("dashboard/view/v_".$modulo.".tpl")) 
				echo "Archivo Vista Creado<br>";

			echo "</div>";
			fopen("assets/css/modulos/style-".$modulo.".css", "w+");

			$nuevoarchivo = fopen("assets/js/modulos/".$modulo.".js", "w+");

			$contenido = "\$(function(){
	\$(\"#f".$modulo."s\").submit(function(){return false});
	\$(\"#data-table-".$modulo."s\").dataTable();

});

\$(document).on(\"click\",\"#Iadd\",function(){
	deadclear('".$modulo."')

});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case '".$modulo."':
			if (vmodulo['tip'] == '') {
				err = validar".$modulo."();
				if ( err ) {
					return err;
				}
			}
			
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,\"f\"+vmodulo['modulo']+\"s\");
	return salida;

}

function validar".$modulo."() {


	return false;
}

function endDetail(vid){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case '".$modulo."':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}

function endDetail(vid) {
	setTimeout(function(){ console.log('Registro Ingresado') }, 2000);
	return false;
}";

			fwrite($nuevoarchivo,$contenido); 
			fclose($nuevoarchivo);

			exec("chmod 777 /opt/lampp/htdocs/demo2.0/ -R");
		} ?>
 	
     <script src="assets/js/jquery.js"></script>
     <script src="assets/js/bootstrap.min.js"></script>
     <script src="assets/libs/DataTables/media/js/jquery.dataTables.js"></script>
   </body>
 </html>