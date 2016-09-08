<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes 2.0</title>
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->

</head>
<body>
<br>
{$NAV}
<div class="bdy">
<h3 class="card-header card-primary" style="color: #fff"><b>CLIENTES</b></h3><br>
<input type="hidden" id="vtabla" value="17">
<div class="row">
<div class="col-md-8 col-lg-8">
<div class="input-group">
<span class="input-group-btn">
<button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
</span>
<input type="search" class="form-control" placeholder="Nombre de Cliente">
</div>
</div>
<div class="col-md-4 col-lg-4">
<button type="button" id="ingClie" class="btn btn-primary der" data-toggle="modal" href="#modal-clientes" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
</div>
</div><br><br>

<div class="card-block">
<table class="table table-striped table-bordered table-hover dt-responsive nowrap">
<thead>
<tr>
<th>Cédula</th>
<th>Nombre</th>
<th>Teléfonos</th>
<th>Correo</th>
<th>Tipo</th>
<th>Acciones</th>
</tr>
</thead>
<tbody id="listaClientes">
{section name=LE loop=$CLIE}
<tr id="f1">
<td>{$CLIE[LE][1]}</td>
<td>{$CLIE[LE][2]}</td>
<td>{$CLIE[LE][4]}</td>
<td>{$CLIE[LE][5]}</td>
<td>{$CLIE[LE][6]}</td>
<td>
<i class="fa fa-pencil-square-o btn load" id="m{$CLIE[LE][0]}" data-toggle="modal" href='#modal-clientes' modulo="cliente"></i>
<i class="fa fa-times btn delete" codigo="1" modulo="cliente" id="d{$CLIE[LE][0]}" style="color: #D9534F"></i>
</td>
</tr>
{/section}
</tbody>
</table>
</div>

<div class="modal fade" id="modal-clientes">
<div class="modal-dialog" style="width: 70%">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
<h4 class="modal-title" id="titModal">Agregar Clientes</h4>
</div>
<div class="modal-body">
<div id="fclientes">
<div class="row">
<div class="col-md-2 col-lg-2">
<div class="radio">
<label class="c-input c-radio">
<input type="radio" name="tipoclie" id="cfisico" tipoClie="0" checked="checked">
<span class="c-indicator"></span>
Físico
</label>
</div>
</div>
<div class="col-md-2 col-lg-2">
<div class="radio">
<label class="c-input c-radio">
<input type="radio" name="tipoclie" id="cjuridico" tipoClie="1">
<span class="c-indicator"></span>
Jurídico
</label>
</div>
</div>
<input type="hidden" id="vidtipoCliente" class="form-control" value="0">
</div><br>

<div class="card-header" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title" id="titInfo"><b>Datos Personales</b></div>
<div class="row">
<div class="col-md-6 col-lg-6" id="colMod">
<div class="input-group">
<div class="input-group-addon" id="nomClie"><b>Nombre</b></div>
<input type="hidden" id="vid" value="0">
<input type="hidden" id="vidEstado" value="1">
<input type="hidden" id="vbisProveedor" value="0">
<input type="text" class="form-control" id="vnombre" placeholder="Nombre del Cliente">
</div>
</div>
<div class="col-md-6 col-lg-6 hid">
<div class="input-group">
<div class="input-group-addon"><b>Primer Apellido</b></div>
<input type="text" class="form-control" id="vapellido1" placeholder="Primer Apellido">
</div>
</div>
</div><br>
<div class="row">
<div class="col-md-6 col-lg-6 hid">
<div class="input-group">
<div class="input-group-addon"><b>Segundo Apellido</b></div>
<input type="text" class="form-control" id="vapellido2" placeholder="Segundo Apellido">
</div>
</div>
<div class="col-md-6 col-lg-6" id="colMod">
<div class="input-group">
<div class="input-group-addon"><b>Cédula</b></div>
<input type="text" class="form-control" id="vcedula" data-mask="9-9999-9999" placeholder="Cédula del Cliente">
</div>
</div>
</div><br>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Correo</b></div>
<input type="text" class="form-control" id="vcorreo1" placeholder="Correo Electrónico">
</div>
</div>

<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Crédito</b></div>
<input type="number" class="form-control" id="vcredito" placeholder="Crédito del Cliente">
</div> 
</div>

</div><br>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Plazo</b></div>
<input type="number" class="form-control" id="vplazo" placeholder="Plazo en Días">
<div class="input-group-addon"><b>días</b></div>
</div>
</div>
</div>
</div>
<br>

<div class="card-header" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Teléfonos</b></div>
<div class="row">
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-building" aria-hidden="true"></i></b></div>
<input type="text" class="form-control eder" id="vtrabajo" placeholder="Trabajo" data-mask="9999-9999">
</div> 
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-home" aria-hidden="true"></i></b></div>
<input type="text" class="form-control eder" id="vcasa" placeholder="Casa" data-mask="9999-9999">
</div> 
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-mobile" aria-hidden="true"></i></b></div>
<input type="text" class="form-control eder" id="vmovil" placeholder="Móvil" data-mask="9999-9999">
</div> 
</div>
</div>
</div>
<br>

<div class="card-header" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Direcciones</b></div>
<div class="row">
<div class="col-md-12 col-lg-12">
<div tabla="detalleubicacione" class="enrutador">
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Provincia</b></div>
<select name="" id="input" class="form-control" required="required">
<option value="">Selecciona una Provincia</option>
{section name=LE loop=$PRO}
<option value="{$PRO[LE][0]}">{$PRO[LE][1]}</option>
{/section}
</select>
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Cantón </b></div>
<select name="" id="input" class="form-control" required="required">
<option value="">Selecciona un Cantón</option>
{section name=LE loop=$CANT}
<option value="{$CANT[LE][0]}">{$CANT[LE][1]}</option>
{/section}
</select>
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>
</div>
</div>

<br>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Distrito</b></div>
<select name="" id="input" class="form-control" required="required">
<option value="">Selecciona un  Distrito</option>
{section name=LE loop=$DIS}
<option value="{$DIS[LE][0]}">{$DIS[LE][1]}</option>
{/section}
</select>
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Dirección Exacta </b></div>
<input type="text" id="vdireccion" class="form-control" value="" required="required">
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<br>

<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal" >Salir</button>
<button type="button" class="btn btn-primary add" id="agClie" codigo="1" modulo="cliente" enrutador="1" >Guardar</button>
</div>

</div>
</div>
</div>
</div></div></div>

<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/clientes.js"></script>

</div>
</body>
</html>