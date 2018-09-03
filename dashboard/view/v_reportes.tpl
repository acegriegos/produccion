<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Reportes</title>
{$STY}
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-reportes.css?v=10.0.0.44">
</head>
{$NAV}
<body>
<div class="bdy pequeño"  style="font-size: 1.2em !important" >
<div class="card pequeño z-depth-5">
<div class="card-header center head1">
<p class="flow-text" style="font-size: 1.9em; margin-bottom: 0.3% !important">Reportes</p>
</div>
<div class="card-content">
<div class="row {if $smarty.session.BUSS eq 1}hide{/if}">
<div class="input-field col s12 m6 l5">
<a  class="prefix dropdown-button tooltipped"  data-activates="filtr_1" data-position="button" data-tooltip="Cambiar Filtro"><i class="mdi mdi-magnify mdi-24px"></i></a>
<input type="text" id="search_clientes" maxlength="100" num="v29" var="nombre">
<label class="truncate" for="search_clientes">Buscar Reporte por Nombre</label>
</div>
</div>
<div class="row">
{if $TR eq 1}
<div class="col s6 m3 l2 center-align padd">
<a class="report pbtn" rep="clientes"><i class="mdi mdi-account-multiple  mdi-48px padd"></i></a>
<div class="row">
<div class="col s12">
<p>Clientes</p>
</div>
</div>
</div>
{/if}
{if $TR eq 1 or $TR eq 0}
<div class="col s6 m3 l2 center-align ">
<a class="report pbtn" rep="ventas"><i class="mdi-48px mdi mdi-chart-areaspline"></i>
</a>
<div class="row">
<div class="col s12">
<p>Ventas</p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align padd">
<a class="report pbtn" rep="gananciasdtf"><i class="mdi mdi-chart-line  mdi-48px padd"></i></a>
<div class="row">
<div class="col s12">
<p>Ganancias Detallada Por Facturas </p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align padd">
<a class="report pbtn" rep="gananciaspf"><i class="mdi mdi-google-analytics  mdi-48px padd"></i></a>
<div class="row">
<div class="col s12">
<p>Ganancias Por Facturas </p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align padd">
<a class="report pbtn" rep="gananciasdxp"><i class="mdi mdi-elevator  mdi-48px padd"></i></a>
<div class="row">
<div class="col s12">
<p>Ganancias Por Productos </p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align hide">
<a class="report pbtn" rep="cotizaciones"><i class="mdi-clipboard-outline mdi-48px mdi padd"></i>
</a>
<div class="row">
<div class="col s12">
<p>Cotizaciones</p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align hide">
<a class="report pbtn" rep="pedidos"><i class="mdi-48px mdi mdi-cube-send"></i>
</a>
<div class="row">
<div class="col s12">
<p>Pedidos</p>
</div>
</div>
</div>
{/if}
{if $TR eq 1}
<div class="col s6 m3 l2 center-align hide">
<a class="report pbtn"><i class="mdi-48px mdi mdi-truck-fast"></i>
</a>
<div class="row hide">
<div class="col s12">
<p>Rutas</p>
</div>
</div>
</div>
{/if}
{if $TR eq 2 or $TR eq 0}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"  rep="compras"><i class="mdi-48px mdi mdi-chart-pie"></i>
</a>
<div class="row">
<div class="col s12">
<p>Compras</p>
</div>
</div>
</div>
{/if}
{if $TR eq 2}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-cart-plus"></i>
</a>
<div class="row">
<div class="col s12">
<p>Ordenes de Compras</p>
</div>
</div>
</div>
{/if}
{if $TR eq 2}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn" rep="proveedores"> <i class="mdi-48px mdi mdi-account-switch"></i>
</a>
<div class="row">
<div class="col s12">
<p>Proveedores</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-chart-bar"></i>
</a>
<div class="row">
<div class="col s12">
<p>Contabilidad</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-account-card-details"></i>
</a>
<div class="row">
<div class="col s12">
<p>Cuentas por Cobrar</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-account-card-details"></i>
</a>
<div class="row">
<div class="col s12">
<p>Cuentas por Pagar</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-briefcase-download"></i>
</a>
<div class="row">
<div class="col s12">
<p>Devoluciones</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-library-books"></i>
</a>
<div class="row">
<div class="col s12">
<p>Notas</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-chart-gantt"></i>
</a>
<div class="row">
<div class="col s12">
<p>Presupuesto</p>
</div>
</div>
</div>
{/if}
{if $TR eq 3}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn"><i class="mdi-48px mdi mdi-gift"></i>
</a>
<div class="row">
<div class="col s12">
<p>Regalías</p>
</div>
</div>
</div>
{/if}

{if $TR eq 3 or $TR eq 0}
<div class="col s6 m3 l2 center-align">
<a class="report pbtn" rep="d151"><i class="mdi-48px mdi mdi-chart-scatterplot-hexbin"></i>
</a>
<div class="row">
<div class="col s12">
<p>Declaraciones Informativas</p>
</div>
</div>
</div>
{/if}

</div>
</div>
</div>
<br>
<div id="mreportes"></div>
</div>
{$SCR}
<script src="../assets/js/modulos/reportes.js?v=10.0.0.44"></script>
</body>
</html>