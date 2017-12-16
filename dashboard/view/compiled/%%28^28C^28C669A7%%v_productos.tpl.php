<?php /* Smarty version 2.6.17, created on 2017-12-16 02:44:20
         compiled from v_productos.tpl */ ?>
<DOCTYPE html>
	<html lang="es">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta http-equiv="Cache-Control" content="max-age=86400"/>
		<title>Productos</title>
	</head>
	<?php echo $this->_tpl_vars['STY']; ?>

	<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-productos.css">
	<body>
	<?php echo $this->_tpl_vars['NAV']; ?>

		<div class="bdy pequeño">
			<div class="card z-depth-5 pequeño">
				<div class="card-header center blue-grey white-text z-depth-1 pequeño">
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
	<?php echo $this->_tpl_vars['SCR']; ?>

	<script src="../assets/js/modulos/productos.js?v=0.18"></script>

</body>
</html>