<?php /* Smarty version 2.6.17, created on 2016-11-04 14:39:50
         compiled from ajax/ajustes/ajaxCuentasDefecto.tpl */ ?>
<div class="card">
    
    <div class="card-block">
        <h3>Ingresar Cuenta</h3>
        <div class="input-group" modulo="scontabilidad">
            <div class="input-group-addon slide" cod="1"><b>Cuenta</b></div>
            
            <select class="form-control slide" cod="1" id="vgenero" lvl="0">
                <option value="0">Seleccione una Opción</option>
                <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CUE']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                    <option value="<?php echo $this->_tpl_vars['CUE'][$this->_sections['LE']['index']][0]; ?>
" num="<?php echo $this->_tpl_vars['CUE'][$this->_sections['LE']['index']][2]; ?>
"><?php echo $this->_tpl_vars['CUE'][$this->_sections['LE']['index']][1]; ?>
</option>
                <?php endfor; endif; ?>
            </select>

            <div class="input-group-addon slide" cod="2" style="display:none"><b>Descripción</b></div>
            <input type="text" class="form-control slide" cod="2" style="display:none" id="vnombre" placeholder="Nombre Cuenta" maxlength="40">
            <div class="input-group-addon addglobal btn" title="Agregar Cuenta"><i class="fa fa-plus"></i></div>
            <div class="input-group-addon moveL btn" style="display:none"><i class="fa fa-arrow-left"></i></div>
            <div class="input-group-addon slider btn" style="display:none"><i class="fa fa-arrow-right"></i></div>
            <div class="input-group-addon" title="Cuenta Padre">
                <input type="checkbox" id="continuo" checked>
                <input type="hidden" id="vispadre" value="1">
            </div>
        </div><br>
         <h3>Modificar Cuentas</h3>
        <div id="vcuentas">
            <li class="list-group-item cuecon" style="cursor: pointer;">
              <b><div class="row">
                <div class="col-md-4 col-lg-4" align="center">
                    Nombre de la Cuenta
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    Número de la Cuenta
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    Acciones
                </div>
              </div></b>
            </li>
            <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['VCUE']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
            <li class="list-group-item cuecon" style="cursor: pointer;<?php if ($this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][4] != 1): ?>display: none;<?php endif; ?>" deep="<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][3]; ?>
" ndeep="<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][4]; ?>
">
              <div class="row">
                <div class="col-md-4 col-lg-4" align="center">
                    <input type="text" tp="<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][0]; ?>
" class="editc" value="<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][1]; ?>
" title="Editar Nombre" style="border: 0px; width:100%; " <?php if ($this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][4] == 1): ?> readonly <?php endif; ?>>
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    <?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][2]; ?>

                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    <?php if ($this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][4] != 1): ?>
                    <input type="checkbox" class="ispadr" id="ip<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][5]; ?>
" <?php if ($this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][5] == 1): ?> checked <?php endif; ?>>
                    <i class="fa fa-times btn" id="ec<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][0]; ?>
" title="Eliminar Cuenta"></i>
                    <?php endif; ?>
                </div>
              </div>
            </li>
            <?php endfor; endif; ?>
        </div>
        <br>
         <h3>Cuentas por Defecto</h3>

        <div class="alert alert-danger err_" id="err1" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" style="display: none">
            <strong id="sucm1"></strong>
        </div>
    </div>
</div>