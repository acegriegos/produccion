<?php /* Smarty version 2.6.17, created on 2016-11-14 16:17:56
         compiled from ajax/ajaxmantServicios.tpl */ ?>
<div id="mantServ">
<h2 align="center">Mantenimiento Servicios</h2>
<hr>
<div class="row">
    <div class="col-md-6 col-lg-6">
        <div class="input-group">
            <span class="input-group-btn">
            <button class="btn btn-primary" type="button"><i class="fa fa-search"></i><span style="color: transparent">.</span></button>
            </span>
            <input type="search" class="form-control" placeholder="Nombre de Servicio">
        </div>            
    </div>
    <div class="col-md-6 col-lg-6">
        <button type="button" id="ingInvServ" class="btn btn-primary der" data-toggle="modal" href="#modal-servicios" style="margin-right: 15px; padding: 16px 18px; border-radius: 42px;"><i class="fa fa-plus" style="font-size: 0.8em"></i></button>
    </div>
</div><br><br>
    
    <div class="row">
        <div class="col-md-12 col-lg-12">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-servicios" cellspacing="0" width="100%">
                        <thead>
                            <tr>
                                <th style="width: 20%">Código</th>
                                <th>Nombre</th>
                                <th>Precio</th>
                                <th>Período</th>
                                <th>Outsourcing</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody id="listaservicios">
                            <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['SERV']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                <td><?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][0]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][1]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][2]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][3]; ?>
</td>
                                <td><?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][4]; ?>
</td>
                                <td>
                                    <i class="fa fa-pencil-square-o btn load" id="m<?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-servicios" modulo="servicio"></i>
                                    <i class="fa fa-times btn delete" codigo="1" modulo="servicio" id="d<?php echo $this->_tpl_vars['SERV'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F"></i>
                                </td>
                            </tr>
                            <?php endfor; endif; ?>
                        </tbody>
                    </table>
                </div>
        </div>
    </div>
    
    <div class="modal fade" id="modal-servicios">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <h4 class="modal-title accmodalServ">Agregar Servicio</h4>
                </div>
                <div class="modal-body">
                <form id="fservicios">
                    <input type="hidden" id="vid" value="0">
<input type="hidden" id="vidmoneda" value="1">
<div class="input-group">
        <div class="input-group-addon"><b>Nombre</b></div>
        <input type="text" class="form-control" id="vnombre" placeholder="Nombre de Servicio">
    </div><br>
    <div class="row">
        <div class="col-md-12 col-lg-12">
            <div class="input-group">
                <div class="input-group-addon"><b>Descripción</b></div>
                <textarea class="form-control" rows="2" id="vdescripcion" placeholder="Descripción de Servicio" type="textarea"></textarea>
            </div><br>
        </div>
    </div>

    <div class="input-group">
        <div class="input-group-addon"><b>Precio Base</b></div>
        <input type="text" class="form-control eder pout" id="vpbase" placeholder="Precio de Servicio" data-mask="999999999.99" value="0.00">
        <div class="input-group-addon"><b>¢</b></div>
    </div><br>
    <input type="hidden" id="vfcreacion" value="1990-01-01 00:00:00">
    <div class="row">
    <div class="form-control" style="margin-left: 1.2%; width: 570px; height: 50px;">
        <div class="col-md-3 col-lg-3">
            <div class="checkbox">
            <label class="c-input c-checkbox">
                <input type="checkbox">
                <span class="c-indicator" value="0" id="isPeriodo"></span>
                <b>Por período</b><small type="checkbox" style="color: #A3A3A3" title="Seleccione esta opción si el servicio que desea agregar se va a repetir periódicamente">&nbsp;&nbsp;?</small>
            </label>
                <!-- <label>
                    <input type="checkbox" value="0" id="isPeriodo">
                    <b>Por período</b><small type="checkbox" style="color: #A3A3A3" title="Seleccione esta opción si el servicio que desea agregar se va a repetir periódicamente">      ?</small>
                </label> -->
            </div>
        </div>
        <div class="col-md-3 col-lg-3 opPeriodo">
            <div class="radio">
                <label class="c-input c-radio">
                    <input type="radio" name="sPeriodo" class="inpSPeriodo" value="30" id="mensual">
                    <input type="hidden" id="vperiodo" value="0">
                    <span class="c-indicator"></span>
                    Mensual
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3 opPeriodo">
            <div class="radio">
                <label class="c-input c-radio">
                    <input type="radio" name="sPeriodo" class="inpSPeriodo" value="365" id="anual">
                    <span class="c-indicator"></span>
                    Anual
                </label>
            </div>
        </div>
        <div class="col-md-3 col-lg-3">
            <div class="radio">
                <label class="c-input c-radio">
                    <input type="radio" name="sPeriodo" id="otros" class="inpSPeriodo" value="0">
                    <span class="c-indicator"></span>
                    Otros
                </label>
            </div>
        </div>
        <div class="col-md-6 col-lg-6" id="opOtro" >
            <div class="input-group">
                <div class="input-group-addon"><b>Otros:</b></div>
                <input type="text" class="form-control eder" id="voptServ" placeholder="en Días" data-mask="999999999">
            </div>
        </div>
        </div>
        </div><br>

        <div class="row">
        <div class="col-md-11 col-lg-11">
        <div class="checkbox">
        <input type="hidden" id="idServ" value="0">
            <label class="c-input c-checkbox">
                <input type="checkbox" id="outsourcing" value="0">
                <span class="c-indicator"></span>
                <b>Outsourcing</b> <small>- Seleccione esta opción si es necesario <i>sub-contratar</i> el servicio de un tercero para el préstamo de éste servcio</small>
            </label>
        </div>
        </div>
            <div class="col-md-11 col-lg-11" id="prove">
                <div class="input-group">
                    <div class="input-group-addon"><b>Proveedor</b></div>
                    <select id="vidprovee" class="form-control" type="select" value="0">
                        <option value="0">Seleccione un proveedor</option>
                        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CLI']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                        <option value="<?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['CLI'][$this->_sections['LE']['index']][1]; ?>
</option>;
                        <?php endfor; endif; ?>
                        
                    </select>
                    <input type="hidden" id="vidproveedor" value="0">
                </div>
            </div>
            </div>

            <div class="row">
                <div class="col-md-6 col-lg-6 ganServ">
                    <br><div class="input-group">
                    <div class="input-group-addon"><b>Compra</b></div>
                    <input type="text" class="form-control eder pout" id="vpcompra" placeholder="Precio de Compra" data-mask="999999999.99" value="0.00">
                    <div class="input-group-addon"><b>¢</b></div>
                </div><br>
                </div>
                <div class="col-md-6 col-lg-6 ganServ">
                    <br><div class="input-group">
                    <div class="input-group-addon"><b>Ganancia</b></div>
                    <input type="text" class="form-control eder pout" id="vpganancia" placeholder="Local" data-mask="999999999" value="0.00">
                    <div class="input-group-addon"><b>%</b></div>
                    </div><br>
                </div>
            </div>                 

                    <div class="alert alert-danger err_" id="err1" style="display: none">
                        <strong id="errm1"></strong>
                    </div>
                    <div class="alert alert-success suc_" id="suc1" style="display: none">
                        <strong id="sucm1"></strong>
                    </div>
                </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
                    <button type="button" class="btn btn-primary add" id="addV" codigo="1" modulo="servicio">Agregar</button>
                </div>
            </div>
        </div>
    </div> <!-- End mantProductos -->

<script src="../assets/js/alertModal.js"></script>