<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Cache-Control" content="max-age=86400"/>
	<title>Productos</title>
	{$STY}
	<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-productos.css?v=10.0.0.83">
</head>
<body>
{$NAV}
	<div class="bdy pequeño">
		<div class="card z-depth-3 pequeño">
			<div class="card-header center blue-grey white-text z-depth-1 pequeño">
				<p class="flow-text head1">Productos - {$smarty.session.EMPRESA}</p>
			</div>
			<nav class="navbar navbar-dark head2 z-depth-1" style="margin-top: -25px;">
				<ul class="nav navbar-nav">
					<li class="nav-item menu3 active per4101" id="m1">
						<a class="nav-link" href="#" title="Productos">Productos</a>
					</li>
					<li class="nav-item menu3 per4110" id="m2">
						<a class="nav-link" href="#" title="Servicios">Servicios</a>
					</li>
					{if $smarty.session.BUSS neq 1}
					<li class="nav-item menu3 per4114" id="m3">
						<a class="nav-link" href="#" title="Paquetes">Paquetes</a>
					</li>
					{/if}
				</ul>
			</nav>
			<br>
			<div id="bdymantInventario"></div>
		</div>
	</div> <!-- END BDY -->
{$SCR}
<script src="../assets/js/modulos/productos.js?v=10.0.0.83"></script>

</body>
</html>