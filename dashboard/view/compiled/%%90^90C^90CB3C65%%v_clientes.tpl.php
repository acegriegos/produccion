<?php /* Smarty version 2.6.17, created on 2016-10-30 18:02:23
         compiled from v_clientes.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta http-equiv="Cache-Control" content="max-age=86400"/>
<title>Clientes</title>
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/bootstrap.min.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/multiselect/css/multi-select.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-clientes.css">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-menu1.css">
<link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

<!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
<!--[if lt IE 9]>
<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
<?php echo '
<script type="text/javascript">
        
         function showLocation(position) {
            var latitude = position.coords.latitude;
            var longitude = position.coords.longitude;
            alert("Latitude : " + latitude + " Longitude: " + longitude);
         }

         function errorHandler(err) {
            if(err.code == 1) {
               alert("Error: Access is denied!");
            }
            
            else if( err.code == 2) {
               alert("Error: Position is unavailable!");
            }
         }
            
         function getLocation(){

            if(navigator.geolocation){
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            }
            
            else{
               alert("Sorry, browser does not support geolocation!");
            }
         }
            
      </script>
'; ?>

</head>
<body>
<br>
<?php echo $this->_tpl_vars['NAV']; ?>

<div class="bdy">
<h3 class="card-header card-primary" style="color: #fff"><b>CLIENTES</b></h3><br>

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
 <input type="button" onclick="getLocation();" value="Get Location"/>
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
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CLIE']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<td><?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][1]; ?>
</td>
<td><?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][2]; ?>
</td>
<td><?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][4]; ?>
</td>
<td><?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][5]; ?>
</td>
<td><?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][6]; ?>
</td>
<td>
<i class="fa fa-pencil-square-o btn load" id="m<?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href='#modal-clientes' modulo="cliente" title="Editar Cliente"></i>
<i class="fa fa-times btn delete" codigo="1" modulo="cliente" id="d<?php echo $this->_tpl_vars['CLIE'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F" title="Eliminar Cliente"></i>
</td>
</tr>
<?php endfor; endif; ?>
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

<nav class="navbar navbar-light bg-faded">
  <div class="nav navbar-nav">
    <a class="nav-item nav-link active" href="#" id="ln1">Información</a>
    <a class="nav-item nav-link" href="#" id="ln2">Financiero</a>
    <a class="nav-item nav-link" href="#" id="ln3">Logística</a>
    <a class="nav-item nav-link" href="#" id="ln4">Impuestos y Exoneraciones</a>
  </div>
</nav>

<div class="row parte1 ptr">
<div class="col-md-2 col-lg-2">
<div class="radio">
<label class="c-input c-radio">
<input type="radio" name="tipoclie" id="cfisico" tipoClie="1" checked="checked">
<span class="c-indicator"></span>
Físico
</label>
</div>
</div>
<div class="col-md-2 col-lg-2">
<div class="radio">
<label class="c-input c-radio">
<input type="radio" name="tipoclie" id="cjuridico" tipoClie="2">
<span class="c-indicator"></span>
Jurídico
</label>
</div>
</div>
<input type="hidden" id="vidtipocliente" value="1">
</div>

<div class="card-header parte1 ptr" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title" id="titInfo"><b>Datos Personales</b></div>
<div class="row">
<div class="col-md-6 col-lg-6" id="colMod">
<div class="input-group">
<div class="input-group-addon" id="nomClie"><b>Nombre</b></div>
<input type="hidden" id="vid" value="0">
<input type="hidden" id="vbisproveedor" value="0">

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
<div class="row" vtabla="correo" id="fcorreos">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>@</b></div>
<input type="text" class="form-control" id="vcorreo1" placeholder="Correo Electrónico">
<input type="hidden" id="vcorreo2" value="">
<input type="hidden" id="vcorreo3" value="">
</div>
</div>

<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Web</b></div>
<input type="text" class="form-control" id="vweb" placeholder="Página Web">
</div>
</div>

</div><br>

<div class="row">
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
</div>

</div>


<div class="card-header parte1 ptr" vtabla="telefono" id="ftelefonos" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
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

<div class="card-header parte2 ptr" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="row">
    <div class="col-md-6 col-lg-6">
    <div class="input-group">
    <div class="input-group-addon"><b>Categoría del Cliente</b></div>
    <select type="select" class="form-control" id="vidnivel">
        <option value="0">Seleccione una Categoría</option>
        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['NVLCLIE']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
        <option value="<?php echo $this->_tpl_vars['NVLCLIE'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['NVLCLIE'][$this->_sections['LE']['index']][1]; ?>
</option>
        <?php endfor; endif; ?>
    </select>
</div>
    </div>
</div> <br>

<div class="row">
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
        <div class="input-group-addon"><b>Descuento</b></div>
        <input type="number" class="form-control eder" id="vdescuentop" placeholder="Descuento Porcentual del Cliente">
        <div class="input-group-addon"><b>%</b></div>
        </div>
    </div>
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
        <div class="input-group-addon"><b>Descuento Max</b></div>
        <input type="number" class="form-control eder" id="vdescuentom" placeholder="Descuento Máximo">
        <div class="input-group-addon"><b>%</b></div>
        </div>
    </div>
</div><br>

<div class="row">   
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Plazo</b></div>
<input type="number" class="form-control eder" id="vplazo" placeholder="Plazo en Días">
<div class="input-group-addon"><b>días</b></div>
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Crédito</b></div>
<input type="number" class="form-control eder" id="vcredito" placeholder="Crédito del Cliente">
</div> 
</div>

</div>

</div>

<div class="card-header parte2 ptr" vtabla="defectocuenta" id="fdefectocuentas" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<input type="hidden" id="videstadocontable" value="1">
<input type="hidden" id="vidcuenta" value="">

<div class="row">
    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div class="card-title"><b> Cuentas Contado <i class="fa fa-plus btn btn-success addcta" tp="1" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;"></i> </b></div>
        <div id="ctacontado">
            
        </div>
    </div>

    <div class="col-xs-6 col-sm-6 col-md-6 col-lg-6">
        <div class="card-title"><b> Cuentas Crédito <i class="fa fa-plus btn btn-success addcta" tp="2" title="Agregar Cuenta" style="border-radius: 25px;width: 7%;padding: 0px;"></i> </b></div>
        <div id="ctacredito">
            
        </div>
    </div>
</div>

</div>

<div class="card-header parte3 ptr" vtabla="ubicacione" id="fubicaciones" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">
<div class="card-title"><b>Direcciones</b></div>

<input type="hidden" id="vbisnacional" value="1">

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
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>

<div class="input-group">
<div class="input-group-addon"><b> Cantón </b></div>
<select class="form-control" type="select">
<option value="0">Seleccione un Cantón</option>
</select>
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>

<div class="input-group">
<div class="input-group-addon"><b> Distrito</b></div>
<select id="viddistrito" class="form-control" type="select">
<option value="0">Seleccione un Distrito</option>
</select>
<div class="input-group-addon"><i class="fa fa-plus"></i></div>
</div>

</div>

<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b> Dirección Exacta </b></div>
<textarea id="vdireccion" class="form-control" rows="3"></textarea>
</div>
</div>

</div><br>

<div class="row">
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
        <div class="input-group-addon"><b> Latitud </b></div>
        <input type="text" class="form-control eder" id="vlatitud" placeholder="00.00">
        </div>
    </div>
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
        <div class="input-group-addon"><b> Longitud </b></div>
        <input type="text" class="form-control eder" id="vlongitud" placeholder="00.00">
        </div>
    </div>
</div>

</div>
</div>
</div>
</div>

<div class="card-header parte4 ptr" style="border-radius: 5px; border-size:1px 1px 1px 1px; border-color: #D1D1D1;">

</div>

</div>

<div class="modal-footer">
    <div class="alert alert-danger err_" id="err1" style="display: none">
        <strong id="errm1"></strong>
    </div>
    <div class="alert alert-success suc_" id="suc1" style="display: none">
        <strong id="sucm1"></strong>
    </div>
<button type="button" class="btn btn-default" data-dismiss="modal" >Salir</button>
<button type="button" class="btn btn-primary add" id="agClie" codigo="1" modulo="cliente" varias="1" >Guardar</button>
</div>

</div>

</div>
</div>
</div>
</div></div></div>

<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
<script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
<script src="../assets/libs/multiselect/js/jquery.multi-select.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/clientes.js"></script>

</div>
</body>
</html>