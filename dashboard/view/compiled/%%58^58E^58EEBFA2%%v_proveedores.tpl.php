<?php /* Smarty version 2.6.17, created on 2016-12-01 22:11:54
         compiled from v_proveedores.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Proveedores</title>
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-proveedores.css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>
<body>
<br>
<?php echo $this->_tpl_vars['NAV']; ?>


<div class="bdy">
<h3 class="card-header card-primary" style="color: #fff"><b>PROVEEDORES</b></h3><br>
<div class="row">
<div class="col-md-8 col-lg-8">
<div class="input-group">
<span class="input-group-btn">
<button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
</span>
<input type="search" class="form-control" placeholder="Razón Social">
</div>
</div>
<div class="col-md-4 col-lg-4">
<button type="button" id="ingProv" class="btn btn-primary der" data-toggle="modal" href="#modal-proveedores" style="margin-right: 15px; padding: 12px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
</div>
</div><br><br>
<div class="card-block">
<table class="table table-striped table-bordered table-hover dt-responsive nowrap">
<thead>
<tr>
<th>Cédula Jurídica</th>
<th>Razón Social</th>
<th>Teléfonos</th>
<th>Correo</th>
<th>Web</th>
<th>Acciones</th>
</tr>
</thead>
<tbody id="listaclientes">
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['PROV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['LE']['show'] = true;
$this->_sections['LE']['max'] = $this->_sections['LE']['loop'];
$this->_sections['LE']['step'] = 1;
$this->_sections['LE']['start'] = $this->_sections['LE']['step'] > 0 ? 0 : $this->_sections['LE']['loop']-1;
if ($this->_sections['LE']['show']) {
    $this->_sections['LE']['total'] = $this->_sections['LE']['loop'];
    if ($this->_sections['LE']['total'] == 0)
        $this->_sections['LE']['show'] = false;
} else
    $this->_sections['LE']['total'] = 0;
if ($this->_sections['LE']['show']):

            for ($this->_sections['LE']['index'] = $this->_sections['LE']['start'], $this->_sections['LE']['iteration'] = 1;
                 $this->_sections['LE']['iteration'] <= $this->_sections['LE']['total'];
                 $this->_sections['LE']['index'] += $this->_sections['LE']['step'], $this->_sections['LE']['iteration']++):
$this->_sections['LE']['rownum'] = $this->_sections['LE']['iteration'];
$this->_sections['LE']['index_prev'] = $this->_sections['LE']['index'] - $this->_sections['LE']['step'];
$this->_sections['LE']['index_next'] = $this->_sections['LE']['index'] + $this->_sections['LE']['step'];
$this->_sections['LE']['first']      = ($this->_sections['LE']['iteration'] == 1);
$this->_sections['LE']['last']       = ($this->_sections['LE']['iteration'] == $this->_sections['LE']['total']);
?>
<tr id="f1">
<td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][1]; ?>
</td>
<td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][2]; ?>
</td>
<td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][4]; ?>
</td>
<td style="font-size: 0.9em"><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][5]; ?>
</td>
<td><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][6]; ?>
</td>
<td>
<i class="fa fa-pencil-square-o btn load" id="m<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href='#modal-proveedores' modulo="proveedore"></i>
<i class="fa fa-times btn delete" codigo="1" modulo="proveedore" id="d<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F"></i>
</td>
</tr>
<?php endfor; endif; ?>
</tbody>
</table>
</div>
<div class="modal fade" id="modal-proveedores">
<div class="modal-dialog"  style="width: 70%">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
<h4 class="modal-title" id="titModal">Agregar Proveedor</h4>
</div>
<div class="modal-body">
<form id="fclientes">
<nav class="navbar navbar-light bg-faded">
<div class="nav navbar-nav">
<a class="nav-item nav-link mnprov active" href="#" id="ln1">Información</a>
<a class="nav-item nav-link mnprov" href="#" id="ln2">Financiero</a>
<a class="nav-item nav-link mnprov" href="#" id="ln3">Logística</a>
</div>
</nav>
<div class="card-header parte1 ptr" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title" id="titInfo"><b>Datos Personales</b></div>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Razón Social</b></div>
<input type="text" class="form-control" id="vnombre" placeholder="Razón Social">
<input type="hidden" id="videstadocontable" value="1">
<input type="hidden" id="vidtipocliente" value="0">
<input type="hidden" id="vbisproveedor" value="1">
<input type="hidden" id="vbisnacional" value="1">
<input type="hidden" id="vdescuentop" value="0.00">
<input type="hidden" id="vdescuentom" value="0.00">
<input type="hidden" id="vapellido1" value="">
<input type="hidden" id="vapellido2" value="">
<input type="hidden" id="vidnivel" value="0">
<input type="hidden" id="vcredito" value="0">
<input type="hidden" id="vidcuenta" value="">
<input type="hidden" id="vplazo" value="0">
<input type="hidden" id="vid" value="0">
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Cédula</b></div>
<input type="text" class="form-control" id="vcedula" data-mask="9-999-999999" placeholder="Cédula Jurídica">
</div>
</div>
</div><br>
<div class="row" vtabla="correo" id="fcorreos">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Web</b></div>
<input type="text" class="form-control" id="vweb" placeholder="Página Web">
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Estado</b></div>
<select id="videstado" class="form-control" type="select">
<option value="">Seleccione un Estado</option>
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['ESTCLIE']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['LE']['show'] = true;
$this->_sections['LE']['max'] = $this->_sections['LE']['loop'];
$this->_sections['LE']['step'] = 1;
$this->_sections['LE']['start'] = $this->_sections['LE']['step'] > 0 ? 0 : $this->_sections['LE']['loop']-1;
if ($this->_sections['LE']['show']) {
    $this->_sections['LE']['total'] = $this->_sections['LE']['loop'];
    if ($this->_sections['LE']['total'] == 0)
        $this->_sections['LE']['show'] = false;
} else
    $this->_sections['LE']['total'] = 0;
if ($this->_sections['LE']['show']):

            for ($this->_sections['LE']['index'] = $this->_sections['LE']['start'], $this->_sections['LE']['iteration'] = 1;
                 $this->_sections['LE']['iteration'] <= $this->_sections['LE']['total'];
                 $this->_sections['LE']['index'] += $this->_sections['LE']['step'], $this->_sections['LE']['iteration']++):
$this->_sections['LE']['rownum'] = $this->_sections['LE']['iteration'];
$this->_sections['LE']['index_prev'] = $this->_sections['LE']['index'] - $this->_sections['LE']['step'];
$this->_sections['LE']['index_next'] = $this->_sections['LE']['index'] + $this->_sections['LE']['step'];
$this->_sections['LE']['first']      = ($this->_sections['LE']['iteration'] == 1);
$this->_sections['LE']['last']       = ($this->_sections['LE']['iteration'] == $this->_sections['LE']['total']);
?>
<option value="<?php echo $this->_tpl_vars['ESTCLIE'][$this->_sections['LE']['index']][0]; ?>
" selected><?php echo $this->_tpl_vars['ESTCLIE'][$this->_sections['LE']['index']][1]; ?>
</option>
<?php endfor; endif; ?>
</select>
</div>
</div>
</div><br>
</div>
<div class="card-header parte1 ptr" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Teléfonos</b></div>
<div class="row">
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-building-o" aria-hidden="true"></i></b></div>
<input type="text" class="form-control eder" id="vtrabajo" placeholder="Trabajo" data-mask="9999-9999">
</div> 
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-building" aria-hidden="true"></i></b></div>
<input type="text" class="form-control eder" id="vtrabajo2" placeholder="Trabajo2" data-mask="9999-9999">
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
<div class="card-header parte1 ptr" vtabla="correo" id="fcorreos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Correos</b></div>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-envelope-o" aria-hidden="true"></i><small> (1)</small></b></div>
<input type="text" class="form-control eder" id="vcorreo1" placeholder="ejemplo@dominio.com">
</div> 
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-envelope" aria-hidden="true"></i><small> (2)</small></b></div>
<input type="text" class="form-control eder" id="vcorreo2" placeholder="ejemplo@dominio.com">
</div>
</div>
</div><br>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-envelope" aria-hidden="true"></i><small> (3)</small></b></div>
<input type="text" class="form-control eder" id="vcorreo3" placeholder="ejemplo@dominio.com">
</div> 
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b><i class="fa fa-envelope-o" aria-hidden="true"></i><small> (4)</small></b></div>
<input type="text" class="form-control eder" id="vcorreo4" placeholder="ejemplo@dominio.com">
</div> 
</div>
</div><br>
</div>
<div class="card-header parte2 ptr" style="border-radius:5px;border-size:1px 1px 1px 1px;border-color: #D1D1D1;">
<div class="row">
<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
<div class="card-title"><b> Cuentas Contado <i class="fa fa-plus btn btn-success addcta" tp="1" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;display: none;"></i> </b></div>
<div id="ctacontado">
    
</div>
</div>

<div class="col-xs-6 col-sm-6 col-md-6 col-lg-6 cre">
<div class="card-title"><b> Cuentas Crédito <i class="fa fa-plus btn btn-success addcta" tp="2" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;display: none;"></i> </b></div>
<div id="ctacredito">
    
</div>
</div>
</div>
</div>
<!-- <div class="card-header parte3 ptr" vtabla="ubicacione" id="fubicaciones" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Direcciones</b></div>
<div class="row">
<div class="col-md-12 col-lg-12">
<div tabla="detalleubicacione" class="enrutador">
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Provincia</b></div>
<select class="form-control" type="select">
<option value="0">Seleccione una Provincia</option>
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['PRO']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
$this->_sections['LE']['show'] = true;
$this->_sections['LE']['max'] = $this->_sections['LE']['loop'];
$this->_sections['LE']['step'] = 1;
$this->_sections['LE']['start'] = $this->_sections['LE']['step'] > 0 ? 0 : $this->_sections['LE']['loop']-1;
if ($this->_sections['LE']['show']) {
    $this->_sections['LE']['total'] = $this->_sections['LE']['loop'];
    if ($this->_sections['LE']['total'] == 0)
        $this->_sections['LE']['show'] = false;
} else
    $this->_sections['LE']['total'] = 0;
if ($this->_sections['LE']['show']):

            for ($this->_sections['LE']['index'] = $this->_sections['LE']['start'], $this->_sections['LE']['iteration'] = 1;
                 $this->_sections['LE']['iteration'] <= $this->_sections['LE']['total'];
                 $this->_sections['LE']['index'] += $this->_sections['LE']['step'], $this->_sections['LE']['iteration']++):
$this->_sections['LE']['rownum'] = $this->_sections['LE']['iteration'];
$this->_sections['LE']['index_prev'] = $this->_sections['LE']['index'] - $this->_sections['LE']['step'];
$this->_sections['LE']['index_next'] = $this->_sections['LE']['index'] + $this->_sections['LE']['step'];
$this->_sections['LE']['first']      = ($this->_sections['LE']['iteration'] == 1);
$this->_sections['LE']['last']       = ($this->_sections['LE']['iteration'] == $this->_sections['LE']['total']);
?>
<option value="<?php echo $this->_tpl_vars['PRO'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['PRO'][$this->_sections['LE']['index']][1]; ?>
</option>
<?php endfor; endif; ?>
</select>
</div>
<div class="input-group">
<div class="input-group-addon"><b> Cantón </b></div>
<select class="form-control" type="select">
<option value="0">Seleccione un Cantón</option>
</select>
</div>
<div class="input-group">
<div class="input-group-addon"><b> Distrito </b></div>
<select id="viddistrito" class="form-control" type="select">
<option value="0">Seleccione un Distrito</option>
</select>
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Dirección Exacta </b></div>
<textarea id="vdireccion" class="form-control" rows="3"></textarea>
</div>
</div>
</div><br>
</div>
</div>
</div>
</div> -->
</form>
<div class="alert alert-danger err_" id="err1" style="display: none">
<strong id="errm1"></strong>
</div>
<div class="alert alert-success suc_" id="suc1" style="display: none">
<strong id="sucm1"></strong>
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
<button type="button" class="btn btn-primary add" id="agProv" codigo="1" modulo="cliente" varias="1" >Agregar</button>
</div>
</div>
</div>
</div>
</div> <!-- END BDY -->

</div>
<script src="../assets/js/modulos/proveedores.js"></script>
</body>
</html>