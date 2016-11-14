<?php /* Smarty version 2.6.17, created on 2016-11-11 16:40:18
         compiled from ajax/contabilidad/cuentas.tpl */ ?>
<div class="row">
            <div class="col-md-6 col-lg-6">
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
                

                <div class="card" id="show_cuentas">
                    <div class="card-header">
                        <div class="row">
                                <div class="col-md-3 col-lg-3" >
                                    <h3>Cuentas</h3>
                                </div>
                                <div class="col-md-9 col-lg-9" align="center">
                                    <div class="input-group">
                                        <div class="input-group-addon"><b>Buscar</b></div>
                                        <input type="text" class="form-control" id="vbusqueda" placeholder="Número / Descripción" maxlength="20">

                                        <div class="btn-group input-group-addon" role="group" id="fgrande">
                                            <i id="btnGroupDrop1" class="dropdown-toggle fa fa-navicon" data-toggle="dropdown" style="cursor: pointer;">
                                            </i>
                                            <div class="dropdown-menu" aria-labelledby="btnGroupDrop1">
                                                <a class="dropdown-item vfiltros" href="#" filtro="f1">Filtro Normal</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f2">Saldo Igual a</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f3">Saldo Mayor o Igual a</a>
                                                <a class="dropdown-item vfiltros" href="#" filtro="f4">Saldo Menor o Igual a</a>
                                                <a class="dropdown-item" href="#" id="refresh">Refrescar</a>
                                                <a class="dropdown-item" href="#" id="refresh4ever">Refrescar Contínuo</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <div class="card-block blc1">
                        <div class="row">
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Número de Cuenta
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Descripción
                            </div>
                            <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center">
                                Saldo(CRC)
                            </div>
                        </div>
                    </div>
                        <ul class="list-group list-group-flush" id="vcuentas">

                                  
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
                            
                                <li class="list-group-item view-cuenta" style="cursor: pointer;" id="c<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][3]; ?>
">
                                  <div class="row">
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                                        <?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][0]; ?>

                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="center" id="n<?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][3]; ?>
">
                                        <?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][1]; ?>

                                    </div>
                                    <div class="col-xs-4 col-sm-4 col-md-4 col-lg-4" align="right">
                                        <?php echo $this->_tpl_vars['VCUE'][$this->_sections['LE']['index']][2]; ?>

                                    </div>
                                  </div>
                                </li>
                            
                            <?php endfor; endif; ?>

                          </ul>
                        
                    </div>
            </div>
            <div class="col-md-6 col-lg-6">

                <div class="colDetalle"></div>

                <small class="myh3"></small>
                <div class="alert alert-danger err_" id="err1" style="display: none">
                    <strong id="errm1"></strong>
                </div>
                <div class="alert alert-danger inf_" id="inf1" style="display: none">
                    <strong id="infm1"></strong>
                </div>
            </div>
            

            </div>