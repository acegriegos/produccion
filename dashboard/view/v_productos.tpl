<DOCTYPE html>
	<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Cache-Control" content="max-age=86400"/>
		<title>Productos</title>
	</head>
	{$STY}
	<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
	<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-productos.css">
	<body>
	{$NAV}
		<div class="bdy">
			<div class="card z-depth-5">
				<div class="card-header center blue-grey white-text z-depth-1">
					<p class="flow-text"  style="background-color:#0B3861;" >Productos</p>
				</div>
				<nav class="navbar navbar-dark blue z-depth-1" style="margin-top: -25px;">
					<ul class="nav navbar-nav">
						<li class="nav-item menu3 active per4101" id="m1">
							<a class="nav-link" href="#" title="Productos">Productos</a>
						</li>
						<li class="nav-item menu3 per4110" id="m2">
							<a class="nav-link" href="#" title="Servicios">Servicios</a>
						</li>
						<li class="nav-item menu3 per4114" id="m3">
							<a class="nav-link" href="#" title="Paquetes">Paquetes</a>
						</li>
					</ul>
				</nav>
				<br>
				<div id="bdymantInventario"></div>
			</div>
		</div> <!-- END BDY -->
	{$SCR}
	<script src="../assets/js/modulos/productos.js?v=0.10"></script>

</body>
</html>