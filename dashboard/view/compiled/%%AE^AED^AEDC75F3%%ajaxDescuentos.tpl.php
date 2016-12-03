<?php /* Smarty version 2.6.17, created on 2016-12-02 21:07:55
         compiled from ajax/ajustes/ajaxDescuentos.tpl */ ?>
<div class="card">
    
    <div class="card-block">
        <h3>Descuentos del Sistema</h3>
        <label class="radio-inline">
            <b>Descuento en Factura de Venta:</b>
        </label>
        <label class="radio-inline">
            <input type="radio" class="descfactc" name="descfact" tp="1" <?php if ($this->_tpl_vars['DESCF'] == 1): ?> checked <?php endif; ?>> Suma
        </label>
        <label class="radio-inline">
            <input type="radio" class="descfactc" name="descfact" tp="2" <?php if ($this->_tpl_vars['DESCF'] == 2): ?> checked <?php endif; ?>> Mayor
        </label>
        <hr>
        <a href="#modal-descuentos" class="btn btn-success" data-toggle="modal">Generar Descuento</a>      
    </div>

    <div class="modal fade" id="modal-descuentos">
            <div class="modal-dialog" role="document" style="width: 75%">
                <div class="modal-content" >
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                            <span class="sr-only">Close</span>
                        </button>
                        <h4 class="modal-title">Crear Descuento</h4>
                    </div>
                    <div class="modal-body">
                        <div class="input-group">
                            <div class="input-group-addon"><b>Nombre del Descuento</b></div>
                            <input type="text" id="vnombre" class="form-control" value="" placeholder="Opcional">
                        </div>
                        <b><label>Tipo de Descuento</label></b><br>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td1" value="1" checked> Producto
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td2" value="2"> Tipo de Producto
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td3" value="3"> Familia de Producto
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td4" value="4"> Marca de Producto
                        </label>
                         <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td5" value="5"> Modelo de Producto
                        </label><br>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td6" value="6"> Cliente
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td7" value="7"> Estado de Cliente
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td8" value="8"> Categoría de Cliente
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td9" value="9"> Producto por Cliente
                        </label>
                        <label class="radio-inline tipodes">
                            <input type="radio" name="tipodesc" id="td10" value="10"> Ubicación de Cliente
                        </label>

                        <div class="filtro0">
                            <label><b>Filtrar:</b> </label>
                            <label class="radio-inline">
                                <input type="radio" name="filr0" id="tf1" value="1" checked> Unidad
                            </label>
                            <label class="radio-inline">
                                <input type="radio" name="filr0" id="tf2" value="2"> Estadística
                            </label>
                        </div>

                        <div class="filtro1">
                            <label><b>Opciones del Descuento</b></label>
                            <div class="input-group">
                            <div class="input-group-addon"><b>Período</b></div>
                            <select type="select" id="vidciclo" class="form-control">
                                 <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['CICLOS']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                                    <option value="<?php echo $this->_tpl_vars['CICLOS'][$this->_sections['LE']['index']][0]; ?>
"><?php echo $this->_tpl_vars['CICLOS'][$this->_sections['LE']['index']][1]; ?>
</option>
                                 <?php endfor; endif; ?>
                            </select>
                            </div>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Salir</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
</div>