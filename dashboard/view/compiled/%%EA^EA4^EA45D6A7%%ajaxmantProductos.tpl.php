<?php /* Smarty version 2.6.17, created on 2016-09-14 00:01:07
         compiled from ajax/ajaxmantProductos.tpl */ ?>
<div id="mantProd">
<h2 align="center">Mantenimiento Productos</h2>
<hr>
<div class="row">
<div class="col-md-6 col-lg-6">
    <div class="input-group">
    <span class="input-group-btn">
    <button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
    </span>
    <input type="search" class="form-control" id="searchprod" placeholder="Nombre de Producto">
    </div>           
</div>
<div class="col-md-6 col-lg-6">
    <button type="button" id="ingInvProd" class="btn btn-primary der" data-toggle="modal" href="#modal-productos" style="margin-right: 15px; padding: 16px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
</div>
</div><br><br>

<div class="row">
<div class="col-md-12 col-lg-12">
    <div class="table-responsive">
    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-productos" cellspacing="0" width="100%" >
    <thead>
    <tr>
    <th style="width: 20%">Código</th>
    <th>Nombre</th>
    <th>Precio Costo</th>
    <th>Margen de Ganancia</th>
    <th>Precio Venta</th>
    <th>Acciones</th>
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
    <td><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][1]; ?>
</td>
    <td><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][2]; ?>
</td>
    <td><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][3]; ?>
</td>
    <td><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][4]; ?>
</td>
    <td><?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][5]; ?>
</td>
    <td>
    <i class="fa fa-pencil-square-o btn load" id="m<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-productos" modulo="producto" title="Editar Producto"></i>
    <i class="fa fa-outdent salidainv" id="s<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-salida" modulo="producto" title="Salida de Inventario"></i>
    <i class="fa fa-times btn delete" codigo="1" modulo="producto" id="d<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F" title="Eliminar Producto"></i>
    </td>
    </tr>
    <?php endfor; endif; ?>
    </tbody>
    </table>
    </div>
    <br><br>
</div>
</div>

<div class="modal fade" id="modal-productos">
<div class="modal-dialog" style="width: 80%">
<div class="modal-content">
<div class="modal-header">
    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
    <h4 class="modal-title accmodalProd">Agregar Producto</h4>
</div>
<div class="modal-body">
    <form id="fproductos">
    <!-- div row 1 -->
    <div class="row">
    <div class="col-xs-6 col-md-6">
        <div class="input-group">
        <div class="input-group-addon"><b>Familia</b></div>
        <select type="select" id="vidfamilia" class="form-control" required="required" cambio="1">
        <option value="0">Seleccione una Familia</option>
        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['FAM']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
        <option value="<?php echo $this->_tpl_vars['FAM'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['FAM'][$this->_sections['LE']['index']][1]; ?>
</option>
        <?php endfor; endif; ?>
        </select>
        <input type="text" id="newfam" class="form-control" value="" required="required" style="display:none">
        <div class="input-group-addon" id="dbck1" style="display:none"><i class="fa fa-reply bbck" tipo="1"></i></div>
        <div class="input-group-addon"><i class="fa fa-plus bjerarquia" id="baddj1" tipo="1" nombre="familia" ref="0"></i></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Tipo</b></div>
        <select type="select" id="vidtipo" class="form-control" required="required">
        <option value="0">Sin Tipo</option>
        </select>
        <input type="text" id="newtip" class="form-control" value="" required="required" style="display:none">
        <div class="input-group-addon" id="dbck2" style="display:none"><i class="fa fa-reply bbck" tipo="2"></i></div>
        <div class="input-group-addon"><i class="fa fa-plus" id="baddj2" tipo="2" nombre="tipo" ref="1" ref1="familia"></i></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Marca</b></div>
        <select type="select" id="vidmarca" class="form-control" required="required" cambio="1">
        <option value="0">Seleccione una Marca</option>
        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['MAR']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
        <option value="<?php echo $this->_tpl_vars['MAR'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['MAR'][$this->_sections['LE']['index']][1]; ?>
</option>
        <?php endfor; endif; ?>
        </select>
        <input type="text" id="newmar" class="form-control" value="" required="required" style="display:none">
        <div class="input-group-addon" id="dbck3" style="display:none"><i class="fa fa-reply bbck" tipo="3"></i></div>
        <div class="input-group-addon"><i class="fa fa-plus bjerarquia" id="baddj3" tipo="3" nombre="marca" ref="0"></i></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Modelo</b></div>
        <select type="select" id="vidmodelo" class="form-control" required="required">
        <option value="0">Sin Modelo</option>
        </select>
        <input type="text" id="newmod" class="form-control" value="" required="required" style="display:none">
        <div class="input-group-addon" id="dbck4" style="display:none"><i class="fa fa-reply bbck" tipo="4"></i></div>
        <div class="input-group-addon"><i class="fa fa-plus" id="baddj4" tipo="4" nombre="modelo" ref="2" ref1="marca" ref2="tipo"></i></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Nombre</b></div>
        <input type="text" class="form-control eder" id="vnombre" placeholder="Nombre de Producto">
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Código</b></div>
        <input type="text" class="form-control eder" id="vcodigo" placeholder="Código de Producto">
        <input type="hidden" id="vid" value="0">
        <input type="hidden" id="vidusuario" value="">
        <input type="hidden" id="vidsucursal" value="">
        </div><br>
    </div>
    <!-- div row -->
    <div class="col-xs-6 col-md-6">
        <div class="input-group">
        <div class="input-group-addon"><b>Precio Costo</b></div>
        <input type="text" class="form-control eder calcvv" id="vcosto" placeholder="Precio Costo" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Ganancia</b></div>
        <input type="text" class="form-control eder calcvv" id="vganancia" placeholder="Ganancia de Producto" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>%</b></div>
        </div><br>

        <div class="input-group">
        <div class="input-group-addon"><b>IMV</b></div>
        <input type="text" class="form-control eder calcvv" id="vimv" placeholder="Impuesto de Venta" data-mask="999999999.99"  value="0.00">
        <div class="input-group-addon"><b>%</b></div>
        </div><br>
        <div class="input-group">
        <div class="input-group-addon"><b>Precio Venta</b></div>
        <input type="text" class="form-control eder" id="vventa" placeholder="Precio Venta" data-mask="999999999.99" readonly  value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
        </div><br>  

        <div class="row">
        <div class="col-md-8 col-lg-8">
        <div class="input-group">
        <div class="input-group-addon"><b>Unidad</b></div>
        <select id="vidunidad" class="form-control" type="select">
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
</option>';
        <?php endfor; endif; ?>
        </select>
        </div>
        </div>
        </div><br>

        <div class="row">
        <div class="form-control" style="margin-left: 2.5%; width: 510px; height: 50px;">
        <div class="col-md-5 col-lg-5">
            <div class="radio">
            <label class="c-input c-radio">
            <b>Tipo de producto:</b>
            </label>
            </div>
        </div>
        <div class="col-md-1 col-lg-1"></div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
            <label class="c-input c-radio">
            <input name="visgravado" type="radio" id="inputGrav" value="0" checked>
            <input type="hidden" id="visgravado" value="1">
            <span class="c-indicator"></span>
            Gravado
            </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
            <label class="c-input c-radio">
            <input name="visgravado" type="radio" id="inputExc" value="1">
            <span class="c-indicator"></span>
            Excento
            </label>
            </div>
        </div>
        </div>
        </div>
    </div>
    </div> <!-- div row -->
    <hr>
    <div class="row">
    <div class="col-xs-4 col-lg-4">
        <div class="input-group">
        <div class="input-group-addon"><b>Cantidad a Inventariar</b></div>
        <input type="number" class="form-control eder" id="vcantidad" placeholder="Cantidad" min="1">
        </div>
    </div>
     <div class="col-xs-4 col-lg-4">
        <div class="input-group">
        <div class="input-group-addon"><b>Mínimo en Inventario</b></div>
        <input type="number" class="form-control eder" id="vminimo" placeholder="Mínimo" min="1">
        <!-- <input type="hidden" id="" value="0" min="<?php echo 0; ?>
" data-mask="999999999.99"> -->
        </div>
    </div>
    <div class="col-xs-4 col-lg-4">
        <div class="input-group">
        <div class="input-group-addon"><b>Máximo en Inventario</b></div>
        <input type="number" class="form-control eder" id="vmaximo" placeholder="Máximo" min="1">
        <!-- <input type="hidden" id="" value="0" min="<?php echo 0; ?>
" data-mask="999999999.99"> -->
        </div>
    </div>
    </div>
    </form>
</div>

    <div class="alert alert-danger err_" id="err1" style="display: none">
    <strong id="errm1"></strong>
    </div>
    <div class="alert alert-success suc_" id="suc1" style="display: none">
    <strong id="sucm1"></strong>
    </div>

    <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
        <button type="button" class="btn btn-primary add" id="addV" codigo="1" modulo="producto">Agregar</button>
    </div>
</div>
</div>
</div>

<div class="modal fade" id="modal-salida">
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                <h4 class="modal-title">Salida de Inventario</h4>
                <h5 class="form-horizontal"><b>Producto: <span id="nomprod"></span></b></h5>
            </div>
            <div class="modal-body">
                <p>Elija el inventario a enviar este producto y defina un motivo:</p>
                <div class="input-group">
                <div class="input-group-addon">Tipo</div>
                <select id="vtipoinv" class="form-control" type="select">
                <option value="0">Seleccione un inventario...</option>
                <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['TIPOINV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                <option value="<?php echo $this->_tpl_vars['TIPOINV'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['TIPOINV'][$this->_sections['LE']['index']][1]; ?>
</option>
                <?php endfor; endif; ?>
                </select>
                </div>
                <br>
                <div class="input-group">
                    <span class="input-group-addon" id="titcom">Motivo</span>
                    <textarea name="" id="vdetalle" class="form-control" rows="2" required="required" placeholder="Detalle..."></textarea>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                <button type="button" class="btn btn-primary">Aceptar</button>
            </div>
        </div>
    </div>
</div>

</div> <!-- End mantProductos -->

<script src="../assets/js/alertModal.js"></script>