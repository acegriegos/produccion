<?php /* Smarty version 2.6.17, created on 2016-12-02 21:08:01
         compiled from ajax/ajustes/ajaxSucursales.tpl */ ?>
<div class="row">
    <div class="col-md-4 col-lg-4">
        <div class="table-responsive">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-sucursales" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th style="width:10%">Telefono</th>
                            <th style="width:6%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listasucursales">
                        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['SUC']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                            <td><?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][1]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][2]; ?>
</td>
                            <td>
                                <i class="fa fa-pencil btn load" id="e<?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][0]; ?>
" codigo="1" modulo="sucursale"></i>
                                <i class="fa fa-times btn delete" id="d<?php echo $this->_tpl_vars['SUC'][$this->_sections['LE']['index']][0]; ?>
" codigo="1" modulo="sucursale"></i>
                            </td>
                        </tr>
                        <?php endfor; endif; ?>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <div class="col-md-8 col-lg-8">
        <form id="fsucursales">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Nombre</b></div>
                    <input type="text" class="form-control" id="vnombre" placeholder="Nombre Sucursal">
                    <input type="hidden" id="vidusuario" value="">
                    <input type="hidden" id="vidsucursal" value="">
                    <input type="hidden" id="vfactura" value="AB">
                    <input type="hidden" id="vconsecutivo" value="1">
                    <input type="hidden" id="vid" value="0">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Teléfono</b></div>
                    <input type="text" class="form-control" id="vtelefono" placeholder="Teléfono Sucursal">
                </div>
            </div>
        </div><br>
        <div class="row">
            <div class="col-md-2 col-lg-2">
                <strong>Ubicación:</strong>
            </div>
            <div class="col-md-5 col-lg-5">
                <div class="input-group">
                    <div class="input-group-addon"><b>Provincia</b></div>
                    <select type="text" id="vidprovincia" class="form-control" required="required" cambio="1">
                        <option value="0">Seleccione una Provincia</option>
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
                        <option value="<?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['PROV'][$this->_sections['LE']['index']][1]; ?>
</option>
                        <?php endfor; endif; ?>
                    </select>
                </div>
            </div>
            <div class="col-md-5 col-lg-5">
                <div class="input-group">
                    <div class="input-group-addon"><b>Cantón</b></div>
                    <select type="text" id="vidcanton" class="form-control" required="required">
                        <option value="0">Seleccione un Cantón</option>
                    </select>
                </div>
            </div>
        </div><br>
        <div class="row">    
            <div class="col-md-12 col-lg-12">
                <button type="button" class="btn btn-primary der add" id="accsuc" codigo="1" modulo="sucursale">Agregar</button>
            </div>
        </div><br>
        <div class="alert alert-danger err_" id="err1" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
            <strong id="sucm1"></strong>
        </div>
        </form>
    </div>
        </div>