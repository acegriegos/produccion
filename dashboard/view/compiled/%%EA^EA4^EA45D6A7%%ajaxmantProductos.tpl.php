<?php /* Smarty version 2.6.17, created on 2016-12-02 23:03:51
         compiled from ajax/ajaxmantProductos.tpl */ ?>
<div id="mantProd">
<h2 align="center">Mantenimiento Productos</h2>
<hr>
<div class="row">
<div class="col s6">
<div class="input-field col s6">
<input id="searchprod" type="text" class="validate">
<label for="icon_prefix" id="phs">Buscar Nombre</label>
</div>
<a class="dropdown-button btn-floating btn-large waves-effect waves-light green" data-activates="fgrande"><i class="material-icons">search</i></a>
<ul id="fgrande" class="dropdown-content" filter="1">
<li><a class="dropdown-item vfiltros" filtro="f1">Código</a></li>
<li><a class="dropdown-item vfiltros" filtro="f2">Nombre</a></li>
</ul>       
</div>
<div class="col s6">
    <a id="ingInvProd" class="btn-floating btn-large waves-effect waves-light right blue" href="#modal-productos"><i class="material-icons">add</i></a>
    <!-- <button type="button" id="ingInvProd" class="btn btn-primary der" data-toggle="modal" href="#modal-productos" style="margin-right: 15px; padding: 16px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button> -->
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
    <th>Precio Venta</th>
    <th>Margen Ganancia</th>
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
    <a class="btn-floating waves-effect waves-light blue descuentos accion" id="desc<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-descuentos"><i class="material-icons">%</i></a>
    <a class="btn-floating waves-effect waves-light blue salidainv" id="desc<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" href="#modal-descuentos"><i class="material-icons">%</i></a>
    <!-- <span class="descuentos btn" id="desc<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-descuentos" title="Agregar Descuentos a Producto"><b>%</b></span>
    <i class="fa fa-outdent salidainv" id="s<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-salida" modulo="producto" title="Salida de Inventario"></i>
    <i class="fa fa-pencil-square-o btn editprod" id="m<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-productos" title="Editar Producto"></i>
    <i class="fa fa-times btn delprod" id="d<?php echo $this->_tpl_vars['PROD'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F" title="Eliminar Producto"></i> -->
    </td>
    </tr>
    <?php endfor; endif; ?>
    </tbody>
    </table>
    </div>
    <br>
    <div class="alert alert-danger err_" id="err3" style="display:none">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <strong id="errm3"></strong>
    </div>
    <div class="alert alert-success suc_" id="suc3" style="display:none">
        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        <strong id="sucm3"></strong>
    </div><br><br>
</div>
</div>

<!-- <nav class="navbar navbar-light bg-faded">
      <div class="nav navbar-nav">
        <a class="nav-item nav-link active menuP" href="#" id="tb1">Datos Producto</a>
        <a class="nav-item nav-link menuP" href="#" id="tb2">Financiero</a>
      </div>
    </nav> -->

<div id="modal-productos" class="modal modal-fixed-footer" style="width:70%">
    <div class="modal-content">
        <h4>Agregar Producto</h4><hr>
            <nav class="blue">
                <div class="nav-wrapper">
                    <ul id="nav-mobile" class="left hide-on-med-and-down">
                        <li class="menuP active" id="tb1"><a>Datos Productos</a></li>
                        <li class="menuP" id="tb2"><a>Financiero</a></li>
                    </ul>
                </div>
            </nav>
            <div id="datosproductos"><br>
                <div class="row">
                    <div class="col s6">
                        <div class="input-field">
                            <select>
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
                            <label>Seleccione una Familia</label>
                        </div>
                        <div class="input-field">
                            <select>
                                <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['TIP']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                <option value="<?php echo $this->_tpl_vars['TIP'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['TIP'][$this->_sections['LE']['index']][1]; ?>
</option>
                                <?php endfor; endif; ?>
                            </select>
                            <label>Seleccione un Tipo</label>
                        </div>
                        <div class="input-field">
                            <select>
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
                            <label>Seleccione una Marca</label>
                        </div>
                        <div class="input-field">
                            <select>
                                <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['MOD']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                <option value="<?php echo $this->_tpl_vars['MOD'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['MOD'][$this->_sections['LE']['index']][1]; ?>
</option>
                                <?php endfor; endif; ?>
                            </select>
                            <label>Seleccione un Modelo</label>
                        </div>
                        <div class="input-field">
                            <select>
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
                            <label>Seleccione una Unidad</label>
                        </div>
                    </div>
                    <div class="col s6">
                        <div class="input-field">
                            <input type="text" id="vnombre" class="validate" value="">
                            <label class="active" for="vnombre">Nombre</label>
                        </div>
                        <div class="input-field">
                            <input type="text" id="vcodigo" class="validate" value="">
                            <label class="active" for="vcodigo">Código</label>
                            <input type="hidden" id="vid" value="0">
                            <input type="hidden" id="vidusuario" value="">
                            <input type="hidden" id="vidsucursal" value="">
                        </div>
                        <div class="input-field">
                            <input type="number" id="vcantidad" class="validate" value="" min="1">
                            <label class="active" for="vcantidad">Cantidad</label>
                        </div>
                        <div class="input-field">
                            <input type="number" id="vminimo" class="validate" value="" min="1">
                            <label class="active" for="vminimo">Mínimo</label>
                        </div>
                        <div class="input-field">
                            <input type="number" id="vmaximo" class="validate" value="" min="1">
                            <label class="active" for="vmaximo">Máximo</label>
                        </div>
                    </div>
                </div>
            </div>
            <div id="financiero" class="hide">
            </div>
    </div>
    <div class="modal-footer">
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text blue" >Guardar</a>
        <a class="modal-action modal-close waves-effect waves-light btn-flat white-text grey lighten-1">Salir</a>
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
<div class="modal fade" id="modal-descuentos">
    <div class="modal-dialog" role="document" style="width: 60%">
        <div class="modal-content">
            <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    <span class="sr-only">Close</span>
                </button>
                <h4 class="modal-title">Agregar Descuentos a <span id="dprod"></span></h4>
            </div>
            <div class="modal-body">
                <div class="alert alert-danger err_" id="err2" style="display: none">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <strong id="errm2"></strong>
                </div>
                <div class="alert alert-success suc_" id="suc2" style="display: none">
                    <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                    <strong id="sucm2"></strong>
                </div>
                <div class="row">
                    <div class="col-md-6 col-lg-6">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Agregar</b></div>
                                <select id="dscts" class="form-control" required="required"></select>
                            <div class="input-group-addon"><b>%</b></div>
                            <div class="input-group-addon but" id="adddsct"><i class="fa fa-plus but"></i></div>
                            <input type="hidden" id="idproducto" class="form-control" value="">
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-6 inv" id="tbldesc">
                        <h3>Descuentos</h3>
                        <div id="listadescuentos" style="width:60%"></div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary" id="gdesc">Guardar</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
            </div>
        </div><!-- /.modal-content -->
    </div><!-- /.modal-dialog -->
</div><!-- /.modal -->

</div> <!-- End mantProductos -->

<script src="../assets/js/alertModal.js"></script>
<script src="../assets/js/jquery.mask.min.js"></script>