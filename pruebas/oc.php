<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Lista OC</title>

	<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialize.min.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="./assets/css/modulos/style-menu.css?v=10.4.1.0">
    <link rel="stylesheet" type="text/css" href="./assets/css/materialdesignicons.min.css?v=10.4.1.0">
</head>
<body>
	<h4 class="center">Lista de Ordenes de Compra</h4>

	<div class="row">
		
	</div>

	<div class="row" id="lista">
		<table>
			<thead>
				<tr>
					<th>Proveedor</th>
					<th>Consecutivo</th>
					<th>Estado</th>
					<th>Fecha</th>
					<th>Usuario</th>
					<th>Adjudicación</th>
				</tr>
			</thead>
		</table>
	</div>

	<script src="./assets/js/jquery.js?v=10.4.1.0"></script>
    <script src="./assets/js/materialize.min.js?v=10.4.1.0"></script>
    <script src="./assets/js/asgard.js?v=10.4.1.0"></script>
    <script src="./assets/js/main.js?v=10.4.1.0"></script>
    <script type="text/javascript">
    	$(function(){
    		let lista = getDatos('',470,'')
    		if(lista[0].length){
    			$.each(lista[0],i,e){
    				console.log(e)
    			}
    		}
    	})
    </script>
</body>
</html>