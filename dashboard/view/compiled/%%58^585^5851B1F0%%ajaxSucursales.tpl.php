<?php /* Smarty version 2.6.17, created on 2016-09-16 20:51:16
         compiled from ../view/ajax/ajaxSucursales.tpl */ ?>
<div class="card">
    <h3 class="card-header">Datos de la Empresa</h3>
    <div class="card-block">
        <div class="row">
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Nombre</b></div>
                    <input type="text" class="form-control" id="vnombre" placeholder="Nombre Sucursal">
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon"><b>Teléfono</b></div>
                    <input type="text" class="form-control" id="vtelefono" placeholder="Teléfono Sucursal">
                </div>
            </div>
            <br><br>
            <div class="col-md-6 col-lg-6">
                <div class="input-group">
                    <div class="input-group-addon">Localización</div>
                    <select id="vcanton" class="form-control" required="required">
                        <option value="0">Seleccione un Cantón</option>
                        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CAN']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                            <option value="<?php echo $this->_tpl_vars['CAN'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['CAN'][$this->_sections['LE']['index']][1]; ?>
</option>
                        <?php endfor; endif; ?>
                    </select>
                </div>
            </div>
            <div class="col-md-6 col-lg-6">
                <button type="button" class="btn btn-primary">Guardar</button>
            </div>
        </div><br>
        <div class="alert alert-danger err_" id="err1" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
            <strong id="sucm1"></strong>
        </div>
    </div>
</div>