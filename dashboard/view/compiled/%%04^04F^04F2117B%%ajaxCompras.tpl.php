<?php /* Smarty version 2.6.17, created on 2016-08-12 13:08:35
         compiled from ajax/ajaxCompras.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'date_format', 'ajax/ajaxCompras.tpl', 57, false),)), $this); ?>
<div class="row">
<div class="col-sm-2 col-xs-2">
<label class="c-input c-radio">
<input name="radio" type="radio" id="vidtipofactura" name="vidtipofactura" value="1" checked="checked">
<span class="c-indicator"></span>
Contado
</label>
</div>
<div class="col-sm-2 col-xs-2">
<label class="c-input c-radio">
<input name="radio" type="radio" id="cred" name="vidtipofactura" value="2">
<span class="c-indicator"></span>
Crédito
</label>
</div>
<div class="col-md-3 col-lg-3 der">
<div class="input-group input-group">
<span class="input-group-addon" id="nfact">N° Factura</span>
<input type="text" class="form-control" aria-label="Código" placeholder="Código" value="<?php echo $this->_tpl_vars['NFACT']; ?>
" disabled>
</div>
</div>
<div class="col-md-5 col-lg-5"></div>
</div>

<br>

<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Número Referencia</b></div>
<input type="text" class="form-control eder" id="vreferencia" placeholder="Numero de Referencia">
</div>
</div>
<div class="col-sm-6 col-xs-6">
<div class="input-group con">
<div class="input-group-addon"><b>Forma de Pago</b></div>
<select id="vtipopago" class="form-control" type="select">
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['TPAGO']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<option value="<?php echo $this->_tpl_vars['TPAGO'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['TPAGO'][$this->_sections['LE']['index']][1]; ?>
</option>
<?php endfor; endif; ?>
</select>
</div>
<div class="input-group cre" style="display: none;">
<div class="input-group-addon"><b>Plazo en Días</b></div>
<input type="text" id="vplazo" class="form-control" value="0" data-mask="999">
</div>
</div>
</div>

<br>

<div class="row">
<div class="col-md-4 col-lg-4"></div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b>Fecha Inclusión</b></div>
<input type="date" id="vfecha_inclucion" class="form-control" value="<?php echo ((is_array($_tmp=time())) ? $this->_run_mod_handler('date_format', true, $_tmp, '%Y-%m-%d') : smarty_modifier_date_format($_tmp, '%Y-%m-%d')); ?>
" >
</div>
<br>
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><b>Fecha Entrega</b></div>
<input type="date" id="vfecha_entrega" class="form-control" value="" >
</div>
<input type="hidden" id="tipopago" class="form-control" value="1"> 
</div>
<br>
</div>

  <!-- </div> -->
<div class="panel-body" style="border-top: 1px dashed rgb(238,238,238)">
<h3 class="card-footer"><b id="ncli">DATOS DEL PROVEEDOR</b></h3><br>

<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Cédula</b></div>
<input type="text" class="form-control" id="idprv" placeholder="Cédula del Proveedor">
<input type="hidden" id="vidproveedor" class="form-control" value="0">
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Nombre</b></div>
<input type="text" class="form-control" id="nprv" placeholder="Nombre del Proveedor">
</div>
</div>
<br><br>
<div class="col-md-12 col-lg-12">
<div class="input-group">
<div class="input-group-addon"><b>Dirección</b></div>
<input type="text" class="form-control" id="dprv" placeholder="Dirección del Proveedor">
</div>
</div>
</div>

<div class="card-block" style="border-top: 1px solid rgb(245,245,245);">
<h3 class="card-footer"><b id="det">INGRESAR PRODUCTOS</b></h3><br>
<div class="row">
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Código</b></div>
<input type="text" id="cod" class="form-control" value="" placeholder="Código">
</div>
</div>
<div class="col-md-6 col-lg-6">
<div class="input-group">
<div class="input-group-addon"><b>Descripción</b></div>
<input type="text" id="descr" class="form-control" value="" placeholder="Descripción de Producto">
</div>
<br>
</div>
<div class="col-md-3 col-lg-3">
<!-- <label class="c-input c-checkbox">
<input type="checkbox" id="prodprov">
<span class="c-indicator"></span>
Cargar Productos del Proveedor
</label> -->
</div>
</div>
<div class="alert alert-warning" align="center" style="display: none" id="alert-prod">
<strong >Producto no Existente,</strong>
Desea Agregarlo al Realizar la Compra?<br> <button type="button" class="btn btn-info" id="includ">Aceptar</button> <button type="button" class="btn btn-success" id="ninunclud">Declinar</button>
</div>
</div>

<div class="card-footer">
<div class="row">
<div class="col-md-2 col-lg-2"></div>
<div class="col-md-8 col-lg-8">
<h3 class="card-title" align="center"><b>DETALLE COMPRA</b></h3><br>
</div>
<div class="col-md-2 col-lg-2">
<button type="button" class="btn btn-info-outline der" id="del1">Eliminar Filas</button>
<br><br>
</div>
</div>
<div class="row">
<div class="table-responsive">
<table class="table table-striped table-bordered nowrap" id="table-detalle" cellspacing="0" width="100%">
<thead>
<tr>
<th><i class="fa fa-trash" aria-hidden="true" title="Elimina varias filas seleccionadas presionando sobre el botón 'Eliminar Filas'"></i></th>
<th>Descripción</th>
<th style="width: 13%">Cantidad</th>
<th style="width: 13%">Costo</th>
<th style="width: 13%">Precio</th>
<th style="width: 13%">Margen</th>
<th style="width: 13%">Total Margen</th>
<th style="width: 8%" align="center">%</th>
<th style="width: 2%">Acciones</th>
</tr>
</thead>
<tbody id="detallecompra">
<tr id="f1">
<td>
<div class="checkbox">
<label class="c-input c-checkbox">
<input type="checkbox">
<span class="c-indicator" class="delf" name="eliminarf" value="1" style="float: right;"></span>
</label>
</div>
</td>
<td>  <span class="checkbox" id="prod1"></span><input type="hidden" id="vidproducto1" class="constante1" value=""><input type="hidden" id="vidfactura1" value="?"></td>
<td><input type="number" id="vcantidad1" idx=1 class="form-control xort" value="1" min="1"></td>
<td><input type="text" id="vcosto1" idx=1 class="form-control xort eder" value="0.00" data-mask="99999999.99"></td>
<td><input type="text" id="vprecio1" idx=1 class="form-control xort eder" value="0.00" data-mask="99999999.99"></td>
<td align="right"><div class="checkbox"> <span class="valores" id="margen1">0.00</span></div></td>
<td align="right"><div class="checkbox"> <span class="valores" id="totm1">0.00</span></div></td>
<td align="left">
<div class="checkbox"><span id="prcent1" value="0">0.00</span></div>
</td>
<td><div class="checkbox "> <input type="checkbox" class="delf" name="eliminarf" value="1" style="float: right;"> <i class="fa fa-random btn" id="pr1" title="Ver Otros Precios" data-toggle="modal" href='#modal-precios'></i> </div></td>
</tr>
</tbody>
</table>
</div>
</div>
</div>

<div class="card-footer">
<h3 class="card-title"><b>DESGLOCE DE COMPRA</b></h3><br>

<div class="row">
<div class="col-md-6 col-lg-6">
<strong>
<table class="table table-striped table-hover" style="border: 1px solid #e2e2e2;">
<thead>
<tr>
<tr>
<td>SUBTOTAL:</td>
<td align="right"><span><b>¢</b></span><span id="subtot" type="html" value="0">0.00</span></td>
</tr>
<tr>
<td>I.M.V:</td>
<td align="right"><span><b>¢</b></span><span id="imv" type="html" value="0">0.00</span></td>
</tr>
<td>TOTAL:</td>
<td align="right"><span><b>¢</b></span><span id="tot" type="html" value="0">0.00</span>
<input type="hidden" id="vtsubtotal" value="0">
</td>
<tr>
<td>FLETE:</td>
<td align="right"><span><b>¢</b></span><span id="flete" type="html" value="0">0.00</span></td>
</tr>
<tr>
<td>DESCUENTO:</td>
<td align="right"><span><b>¢</b></span><span id="descuento" type="html" value="0">0.00</span></td>
</tr>
</tr>
</thead>
<tbody>
</tbody>
</table>
<!--  -->
<div class="col-md-12 col-lg-12">
<div class="row">
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>FLETE</b></small></div>
<input type="text" id="flet" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99">
<div class="input-group-addon"><small><b>¢</b></small></div>
</div>
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>DESC</b></small></div>
<input type="text" id="cod" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99">
<div class="input-group-addon"><small><b>%</b></small></div>
</div>
</div>
<div class="col-md-4 col-lg-4">
<div class="input-group">
<div class="input-group-addon"><small><b>AJUSTE</b></small></div>
<input type="text" id="ajust" class="form-control form-control-sm" value="0" placeholder="0.00" data-mask="999999999.99">
<div class="input-group-btn">
<button type="button" class="btn btn-sm" id="btnAjuste" accion="1">+</button>
</div>
<!-- <div class="input-group-addon"><small><b>+</b></small></div> -->
</div>
</div>
</div>
</div>
<!--  -->
</strong>
</div>
<div class="col-md-6 col-lg-6">
<textarea id="vcomentario" class="form-control" cols="25" placeholder="Comentario de la Compra" type="textarea" style="max-height: 100px"></textarea><br>
<div class="row">
<div class="col-md-12 col-lg-12">
<button class="btn btn-primary-outline der add" modulo="compra" codigo="1" id="comprar" detalle="1">Ingresar Compra</button>
<button type="button" class="btn btn-primary der edit per105 inv" codigo="1" modulo="compra" detalle="1" id="actualizar">Actualizar</button>
<input type="hidden" class="load" value="" codigo="1" modulo="compra" detalle="1">
<div class="checkbox" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'">
<label class="c-input c-checkbox">
<input type="checkbox">
<span class="c-indicator" value="0" value="1" id="t_p"></span>
Punto Venta
</label>
</div>
<br>
<div class="card-footer"><br>
<span class="card-title" style="font-size: 3.8em"><h4>TOTAL:</h4><strong><span>¢</span><span id="total" type="html">0.00</span></strong></span>
</div>
</div>
</div>
</div>
</div>
</div>

<br>

<div class="alert alert-danger err_" id="err1" style="display:none">
<strong id="errm1"></strong>
</div>
<div class="alert alert-success suc_" id="suc1" style="display:none">
<strong id="sucm1"></strong>
</div>