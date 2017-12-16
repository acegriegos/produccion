<?php /* Smarty version 2.6.17, created on 2017-12-16 02:44:21
         compiled from ajax/productos/ajaxmantProductos.tpl */ ?>

<div class="pequeño" id="mantProd" >
<div class="row">
<div class="input-field col s11 m8 l5">
<a class="prefix dropdown-button tooltipped small mdi mdi-magnify pbtn"  data-activates='filtr_1' data-position="button" data-tooltip="Cambiar Filtro"></a>
<ul id='filtr_1' class='dropdown-content' style="width: auto;">
<li><a class="optns" tipo="codigo,codigointerno,nombre" href="#!" fltr="1">Código, Código Interno o Nombre</a></li>
<li><a class="optns" tipo="codigo" href="#!" fltr="4">Código</a></li>
<li><a class="optns" tipo="codigointerno" href="#!" fltr="5">Código Interno</a></li>
<li><a class="optns" tipo="nombre" href="#!" fltr="2">Nombre</a></li>
<li><a class="optns" tipo="marca" href="#!" fltr="3">Marca</a></li>
</ul>
<input type="text" id="search_productos" maxlength="100" num="v14" var="0,1">
<label class="truncate" for="search_productos">Buscar Producto por Código, Código Interno o Nombre</label>
</div>
<div class="col s12 m4 l7 per4102">
<a id="addproduct" class="btn-floating waves-effect waves-light blue right z-depth-5 modal-trigger" href="#modal-productos"><i class="mdi mdi-plus"></i></a>
</div>
</div>
<div class="row pequeño">
<div class="col s12 m12 l12 pequeño">
<table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-productos" cellspacing="0" width="100%" >
<thead>
<tr>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Código</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Código Interno</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Marca</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Precio Costo</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Precio Venta</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Ganancia</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
</tr>
</thead>
<tbody id="listaproductos">
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['PROD']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<tr>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][1]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][2]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][3]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][29]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][6]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][12]; ?>
</td>
<td style="padding: 10px; color:black;"><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][9]; ?>
</td>
<td>
<a class="btn-color pbtn info mdi mdi-alert-circle mdi-24px blueh 4110" id="info<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-info2" title="Mostrar Informacion del Producto"></a>
<a class="btn-color pbtn descuentos per4103 modal-trigger" id="desc<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-descuentos" title="Mostrar Descuentos del Producto" style="color:black;"><img src="../assets/img/icon/percent.svg"></a>
<a class="btn-color pbtn salidainv mdi mdi-arrow-down-bold-box mdi-24px per4104 modal-trigger" id="s<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-movinventario" title="Movimiento de Inventario" style="color:black;"></a>
<a class="btn-color pbtn editprod mdi mdi-pencil mdi-24px per4108 modal-trigger" id="m<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-productos" title="Editar Producto" style="color:black;"></a>
<a class="btn-color pbtn cdel delprod mdi mdi-close mdi-24px per4109" id="d<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" title="Eliminar Producto" style="color:black;"></a>
</td>
</tr>
<?php endfor; endif; ?>
</tbody>
</table>

<ul class="pagination right" vtbl="14" modulo="productos"></ul>

<br><br><br>
</div>
</div>

<div id="modal-productos" class="modal modal-fixed-footer grandemodal">
<div class="modal-header">
<ul class="tabs white-text" style="background-color:#0B3861">
<li class="tab col s3 menuP but" id="tb1"><a class="white-text">Datos Productos</a></li>
<li class="tab col s3 menuP but" id="tb2"><a class="white-text">Financiero</a></li>
<li class="tab col s3 menuP but" id="tb3"><a class="white-text">Impuestos</a></li>
<li class="tab col s3 menuP but" id="tb4"><a class="white-text">Características</a></li>
</ul>
</div>
<div class="modal-content" style="padding: 0px;">
<div id="datosproductos" style="padding: 30px 10px 0 10px">
<div class="row">
<div class="col s12 m12 l6" id="col1">
<div class="input-field marginzero">
<input id="vfamilia" type="text" class="validate autocomplete" autocomplete="off">
<label for="vfamilia">Familia</label>
<input type="hidden" id="vidfamilia" value="0">
</div>
<div class="input-field marginzero">
<input id="vtipo" type="text" class="validate autocomplete" autocomplete="off">
<label for="vtipo">Tipo</label>
<input type="hidden" id="vidtipo" value="0">
</div>
<div class="input-field marginzero">
<input id="vmarca" type="text" class="validate autocomplete" autocomplete="off">
<label for="vmarca">Marca</label>
<input type="hidden" id="vidmarca" value="0">
</div>
<div class="input-field marginzero" id="dinventario">
<select type="select" id="vidinventario">
<option value="0">Seleccione un Inventario</option>
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['INV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<option value="<?php echo $this->_tpl_vars['INV'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['INV'][$this->_sections['LE']['index']][1]; ?>
</option>
<?php endfor; endif; ?>
</select>
<label for="vidinventario">Inventario</label>
</div>

<div class="input-field marginzero">
<select type="select" id="vidunidad">
<option value="">Seleccione un Unidad</option>
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['UNI']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<option value="<?php echo $this->_tpl_vars['UNI'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['UNI'][$this->_sections['LE']['index']][1]; ?>
</option>
<?php endfor; endif; ?>
</select>
<label for="vidunidad">Unidad</label>
</div>
<div class="input-field marginzero hide" id="dpeso">
<input id="vpeso" type="number" class="validate" min="0" autocomplete="off">
<label for="vpeso">Peso</label>
</div>
</div>
<div class="col s12 m12 l6" id="col2">
<div class="input-field marginzero">
<input type="text" id="vnombre" class="formprod validate" value="" focus="1vcodigo" autocomplete="off">
<label for="vnombre">Nombre</label>
</div>
<div class="input-field marginzero">
<input type="text" id="vcodigo" class="formprod validate" value="" focus="1vcodigointerno" autocomplete="off">
<label class="active" for="vcodigo">Código</label>
<input type="hidden" id="vid" value="0">
<input type="hidden" id="vidmoneda" value="1">
<input type="hidden" id="vidusuario" value="">
<input type="hidden" id="vidsucursal" value="">
<input type="hidden" id="vimg" value="">
</div>
<div class="input-field marginzero">
<input type="text" id="vcodigointerno" class="formprod validate" value="" focus="1vminimo" autocomplete="off">
<label class="active" for="vcodigointerno">Código Interno</label>
</div>
<div class="input-field marginzero">
<input type="number" id="vminimo" class="formprod validate" value="" min="0" focus="1vmaximo" autocomplete="off">
<label class="active" for="vminimo">Mínimo</label>
</div>
<div class="input-field marginzero">
<input type="number" id="vmaximo" class="formprod validate" value="" min="0" focus="1vmaxdescuento" autocomplete="off">
<label class="active" for="vmaximo">Máximo</label>
</div>
<div class="input-field marginzero">
<i class="mdi prefix">%</i>
<input type="number" id="vmaxdescuento" class="formprod validate" value="" min="0" focus="2vcosto" autocomplete="off">
<label class="active" for="vmaxdescuento">Descuento Máximo</label>
</div><br><br>
</div>
</div>
</div>
<div id="financiero" class="row hide" style="padding: 20px 10px 0 10px">
<label><b>Precio General</b></label><br><br>
<div class="row">
<div class="col s12 m6 l3  center-align">
<label>Precio Costo</label>
<div class="input-field">
<i class="mdi prefix">¢</i>
<input type="text" id="vcosto" class="validate eder numeric cos calcvv" value="0.00" data-mask="9999999999.99" focus="vganancia" num="1">
<input type="hidden" id="hvcosto" value="">
</div>
</div>
<div class="col s12 m6 l3 center-align">
<label>Ganancia</label>
<div class="input-field">
<i class="mdi prefix">%</i>
<input type="text" id="vganancia" class="validate calcvv eder numeric gan" value="0.00" data-mask="9999999999.99" focus="vventa" num="2">
</div>
</div>
<div class="col s12 m6 l3 center-align">
<label>Precio Venta</label>
<div class="input-field">
<i class="mdi prefix">¢</i>
<input type="text" id="vventa" class="validate calcvv eder numeric ven" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="3">
<input type="hidden" id="hventa" value="">
</div>
</div>
<div class="col s12 m6 l3 center-align">
<label>Exoneración</label>
<div class="input-field">
<i class="mdi prefix">%</i>
<input type="text" id="vexoneracion" class="validate calcvv eder numeric exo" value="0.00" data-mask="9999999999.99">
</div>
</div>
</div>
<div class="row">
<div class="col s12 m3 l3">
<div class="switch">
<!-- <label>
Cliente
<input type="checkbox" class="chg" value="0">
<span class="lever"></span>
Categoria
</label> -->
</div>
</div>
</div>
<?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['NIV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
<div class="row precionivel chg0" id="f<?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][0]; ?>
">
<div class="col s12 m12 l3">
<label><b>Precio para Categoria: <?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][1]; ?>
</b></label><br>
</div>
<div class="col s12 m6 l3 center-align"><br>
<label>Ganancia</label>
<div class="input-field">
<i class="mdi prefix">%</i>
<input type="text" id="vganancia<?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][0]; ?>
" class="validate calcvv eder gan numeric" value="0.00" data-mask="9999999999.99" num="2">
</div>
</div>
<div class="col s12 m6 l3 center-align"><br>
<label>Precio Venta</label>
<div class="input-field">
<i class="mdi prefix">¢</i>
<input type="text" id="vventa<?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][0]; ?>
" class="validate calcvv eder ven numeric" value="0.00" data-mask="9999999999.99" num="3">
<input type="hidden" id="hventa<?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][0]; ?>
" class="hven" value="">
</div>
</div>
<div class="col s12 m6 l3 center-align"><br>
<label>Exoneración</label>
<div class="input-field">
<i class="mdi prefix">%</i>
<input type="text" id="vexoneracion<?php echo $this->_tpl_vars['NIV'][$this->_sections['LE']['index']][0]; ?>
" class="validate calcvv eder exo numeric" value="0.00" data-mask="9999999999.99" num="4">
</div>
</div>
</div>
<?php endfor; endif; ?>
<div class="row chg1 hide"></div>
</div>
<div id="dimpuestos" class="row hide" style="padding: 50px 10px 0 10px">
<div class="col s12">
<div class="col s2">

</div>
<div class="row">
<div class="col s12">
<ul class="collection hide  z-depth-5" id="impuestos"></ul>
</div>
</div>
</div>
</div>
<div id="features" class="row hide" style="padding: 30px 10px 0 10px">
<div class="col s5 m5 l5">
<div class="input-field col s12 m12 l12">
<input type="text" class="validate ffeat" id="nom">
<input type="hidden" id="cnt" value="0">
<label for="nom">Nombre</label>
</div>
<div class="input-field col s5 m5 l5">
<input type="text" class="validate ffeat autocomplete" id="val">
<label for="val">Valor</label>
</div>
<div class="col s1 m1 l1">
<button type="button" class="btn-floating waves-effect waves-light blue z-depth-4" id="addfeat"><i class="mdi mdi-plus">add</i></button>
</div>
</div>
<div class="col s7 m7 l7">
<div class="input-field col s6 m6 l6 right">
<input type="text" class="validate" id="fltr">
<label for="fltr">Filtro:</label>
</div>
<div class="col s12 m12 l12 pequeño">
<table class="table responsive-table pequeño centered striped bordered highlight z-depth-5" cellspacing="0" width="100%" >
<thead>
<tr>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Valor</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 20%">Acciones</th>
</tr>
</thead>
<tbody id="listavariables"></tbody>
</table>
</div>
</div>
</div>
</div>
<div class="modal-footer ">
<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
<a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="addprod">Agregar</a>
<a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="editprod">Guardar</a>
</div>
</div>

<div id="modal-movinventario" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
<div class="modal-content" style="padding: 0px;">
<ul class="tabs white-text" style="background-color:#0B3861">
<li class="tab col s3 minvent but per4105" id="mv1"><a class="white-text">Entrada Inventario</a></li>
<li class="tab col s3 minvent but per4106" id="mv2"><a class="white-text">Salida Inventario</a></li>
<li class="tab col s3 minvent but per4107" id="mv3"><a class="white-text">Movimiento Inventario</a></li>
</ul>
<ul class="tabs blue">
<li class="tab col s3" style="width: 100%">
<div class="row">
<div class="col s12 l6">
<a class="white-text">Producto:
<span id="nomprod"></span>
<input type="hidden" id="idprd" value="">
<input type="hidden" id="oldinvent" value="">
</a>
</div>
<div class="col s12 l6">
<a class="white-text">Cantidad:
<span id="prodcant"></span>
</a>
</div>
</div>
</li>
</ul>
<input type="hidden" id="spot" value="0">
<div id="ininvent" class="movsinvent" style="padding: 15px 10px 0 10px">
<div class="row">
<div class="input-field col s12 l6">
<select type="select" id="inidbodega">
<option value="0">Seleccione una Bodega</option>
</select>
<label for="inidbodega">Bodega</label>
</div>
<div class="input-field col s12 l6">
<select type="select" id="inidinventario">
<option value="0">Seleccione un Inventario</option>
</select>
<label for="inidinventario">Inventario</label>
</div>
<div class="input-field col s12 l4">
<input id="vincantidad" type="text" class="validate">
<label for="vincantidad">Cantidad Entrante</label>
</div>
<div class="input-field col s12  l8">
<input type="text" id="vincomentario" class="validate" length="150">
<label for="vincomentario">Comentario</label>
</div>
</div>
</div>
<div id="outinvent" class="movsinvent hide">
<div class="row">
<!-- <div class="input-field col s12 l6">
<select type="select" id="outidbodega">
<option value="0">Seleccione una Bodega</option>
</select>
<label for="outidbodega">Bodega Origen</label>
</div> -->
<!-- <div class="input-field col s12 l6">
<select type="select" id="outidinventario">
<option value="0">Seleccione un Inventario</option>
</select>
<label for="outidinventario">Inventario Origen</label>
</div> -->
<div class="input-field col s12 l6">
<select type="select" id="destidbodega">
<option value="0">Seleccione una Bodega</option>
</select>
<label for="destidbodega">Bodega</label>
</div>
<div class="input-field col s12 l6">
<select type="select" id="outidinventario">
<option value="0">Seleccione un Inventario</option>
</select>
<label for="outidinventario">Inventario</label>
</div>
<div class="input-field col s12 l6">
<input id="voutcantidad" type="text" class="validate">
<label for="voutcantidad">Cantidad Saliente</label>
</div>
<div class="input-field col s12 l6">
<input type="text" id="voutcomentario" class="validate" length="150">
<label for="voutcomentario">Comentario</label>
</div>
</div>
</div>
<div id="movinvent" class="movsinvent hide">
<div class="row">
<div class="input-field col s12 l6">
<select type="select" id="movidbodega">
<option value="0">Seleccione una Bodega</option>
</select>
<label for="movidbodega">Bodega Origen</label>
</div>
<div class="input-field col s12 l6">
<select type="select" id="movidinventario">
<option value="0">Seleccione un Inventario</option>
</select>
<label for="movidinventario">Inventario Origen</label>
</div>
<div class="input-field col s12 l6">
<select type="select" id="didbodega">
<option value="0">Seleccione una Bodega</option>
</select>
<label for="didbodega">Bodega Destino</label>
</div>
<div class="input-field col s12 l6">
<select type="select" id="didinventario">
<option value="0">Seleccione un Inventario</option>
</select>
<label for="didinventario">Inventario Destino</label>
</div>
<div class="input-field col s12 l6">
<input id="vmovcantidad" type="text" class="validate">
<label for="vmovcantidad">Cantidad</label>
</div>
<div class="input-field col s12 l6">
<input type="text" id="vmovcomentario" class="validate" length="150">
<label for="vmovcomentario">Comentario</label>
</div>
</div>
</div>
</div>
<div class="modal-footer">
<a class="modal-action waves-effect waves-light btn-flat white-text blue  z-depth-5" id="actinv">Guardar</a>
<a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue  z-depth-5" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-descuentos" class="modal modal-fixed-footer grandemodal" style="width:45%;height:90%">
<div class="modal-header">
<ul class="tabs white-text" style="background-color:#0B3861">
<li class="tab col s3"><a class="white-text">Mostrar Descuentos de Producto <span class="dprod"></span></a></li>
</ul>
</div>
<div class="modal-content" stylle="padding: 0px;">
<div class="row">
<ul class="collection with-header" id="listadescuentos">
<!-- <li class="collection-item"><div class="row"><div class="col s6 m6 l6">Nombre del Descuento: <span id="nmdesc1">Leche</span></div><div class="col s6 m6 l6"><a class="secondary-content">Valor: <span id="valdesc1">15%</span></a></div></div></li> -->
</ul>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue z-depth-5" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-info2" class="modal modal-fixed-footer grandemodal" >
<div class="modal-header">
<ul class="tabs white-text" style="background-color:#0B3861">
<li class="tab col s3"><a class="white-text">Mostrar Características del Producto <span id="dprd"></span></a></li>
</ul>
</div>
<div class="modal-content pequeño" stylle="padding: 0px;">
<div class="row pequeño"><br>
<table class="table pequeño responsive-table centered striped bordered highlight z-depth-5" cellspacing="0" width="100%" >
<thead>
<tr>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Valor</th>
</tr>
</thead>
<tbody id="listainfo"></tbody>
</table>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue z-depth-5" style="margin-right: 2%">Salir</a>
</div>
</div>

</div> <!-- End mantProductos -->

<!-- <script src="../assets/js/jquery.mask.min.js"></script> -->