<?php /* Smarty version 2.6.17, created on 2016-09-19 19:44:56
         compiled from ajax/contabilidad/asientos.tpl */ ?>
<?php require_once(SMARTY_CORE_DIR . 'core.load_plugins.php');
smarty_core_load_plugins(array('plugins' => array(array('modifier', 'date_format', 'ajax/contabilidad/asientos.tpl', 20, false),)), $this); ?>
<div class="row">
    <div class="col-md-2 col-lg-2">
        <ul class="list-group">
          <li class="list-group-item btn func" fn="f1" id="fn1">Realizar Transacción</li>
          <li class="list-group-item btn func" fn="f2">Ver Transacciones</li>
        </ul>
    </div>

    <div class="col-md-9 col-lg-9" id="show_transac">
        
        <!-- Funcion 1 -->
        <div id='ftransacciones'>  
        <div style="display: none" class="sub-tran" id="t1">
            <div class="input-group">
                <div class="input-group-addon"><b>Descripción</b></div>
                <input type="text" class="form-control" id="vdescripcion" placeholder="Descripcion de la Transacción" maxlength="100">
            </div>
            <div class="input-group">
                <div class="input-group-addon"><i class="fa fa-calendar"></i></div>
                <input type="date" class="form-control" id="vfecha" style="height: 38px;" value="<?php echo ((is_array($_tmp=time())) ? $this->_run_mod_handler('date_format', true, $_tmp, '%Y-%m-%d') : smarty_modifier_date_format($_tmp, '%Y-%m-%d')); ?>
">
                <div class="input-group-addon">Moneda</div>
                <select type="select" id="vidmoneda" class="form-control" required="required">
                    <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['MON']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                        <option value="<?php echo $this->_tpl_vars['MON'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['MON'][$this->_sections['LE']['index']][1]; ?>
</option>
                    <?php endfor; endif; ?>
                </select>
            </div>
           
           <!-- <div class="form-group">
                <div class='input-group date' id='datetimepicker2'>
                    <input type='text' class="form-control" value="<?php echo ((is_array($_tmp=time())) ? $this->_run_mod_handler('date_format', true, $_tmp, '%d/%m/%Y') : smarty_modifier_date_format($_tmp, '%d/%m/%Y')); ?>
" />
                    <span class="input-group-addon btn">
                        <span><i class="fa fa-calendar"></i></span>
                    </span>
                </div>
            </div> -->
           
            <br>
            <table class="table trtable">
                <thead>
                    <tr>
                        <th>Cuenta</th>
                        <th>Descripción</th>
                        <th>Debe</th>
                        <th>Haber</th>
                        <th>ODT</th>
                        <th>Comentario</th>
                    </tr>
                </thead>
                <tbody id="detalletransaccione">
                    
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2" align="center">
                            <b>TOTAL</b>
                        </td>
                        <td id="totDebe" align="right">0.00</td>
                        <td id="totHber" align="right">0.00</td>
                        <td colspan="2"></td>
                    </tr>
                    <tr>
                        <td colspan="6">
                            <input type="hidden" id="vidempresa" value="<?php echo $_SESSION['IMPRESA']; ?>
">
                            <button type="button" class="btn btn-primary add der" codigo="1" modulo="transaccione" detalle="1">Aceptar</button>
                            <div class="alert alert-danger" align="center" style="height: 38px; padding: 6px;display: none" id="err1">
                                <small><strong id="errm1"></strong></small>
                            </div>
                            <div class="alert alert-success" align="center" style="height: 38px; padding: 6px;display: none" id="suc1">
                                <small><strong id="sucm1"></strong></small>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>

        </div>
        <!-- /Funcion 1 -->

    </div>
</div>