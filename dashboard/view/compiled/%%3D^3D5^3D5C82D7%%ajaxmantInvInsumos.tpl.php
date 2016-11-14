<?php /* Smarty version 2.6.17, created on 2016-11-11 16:04:49
         compiled from ajax/ajaxmantInvInsumos.tpl */ ?>
<link rel="stylesheet" href="../assets/css/bv2_toggle.css">

<div id="mantinsumos">
	<h2 align="center">Mantenimiento Insumos</h2>
	<hr>

	<div class="row">
    <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-inventarios" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th style="width: 12%">Código</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Motivo</th>
                            <th style="width: 15%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaInsumos">
                        <?php unset($this->_sections['LE']);
$this->_sections['LE']['name'] = 'LE';
$this->_sections['LE']['loop'] = is_array($_loop=$this->_tpl_vars['INSU']) ? count($_loop) : max(0, (int)$_loop); unset($_loop);
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
                        	<td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][1]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][2]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][3]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][4]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][5]; ?>
</td>
                            <td><?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][6]; ?>
</td>
                            <td>
                                <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
                                <i class="fa fa-info-circle btn" id="c<?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-invInsumoComment" modulo="inventario" title="Detalle de Insumo" style="color: #3C8FAD"></i>
                                <i class="fa fa-print btn" codigo="" id="p<?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][0]; ?>
" data-toggle="modal" href="#modal-invInsumo" modulo="inventario"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d<?php echo $this->_tpl_vars['INSU'][$this->_sections['LE']['index']][0]; ?>
" style="color: #D9534F" title="Anular"></i>
                            </td>
                        </tr>
                        <?php endfor; endif; ?>
                    </tbody>
                </table>
            </div>
    </div>
</div>

<div class="modal fade" id="modal-invInsumoComment">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Detalle de Insumo</h4>
				<h5 class="form-horizontal"><b>Factura-<span id="numFInsumo">5489</span></b></h5>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-9 col-sm-9">
						<div class="input-group">
							<span class="input-group-addon">Realizado por</span>
							<input type="text" class="form-control" id="nomUser" value="Rolando Rorrigo" readonly>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 eder">
						<input type="checkbox" checked data-toggle="toggle" data-off="<span id='editCannotInsu'>Editable</span>" data-on="<span id='editCanInsu'>Editar</span>" data-size="small" data-width="100" data-onstyle="warning-outline" data-offstyle="warning">
				<!-- <i class="fa fa-edit" id="editCan"></i> -->
					</div>
				</div>
				<hr>
				<small>
					<ul class="list-group">
						<li class="list-group-item">
							<div class="row">
								<div class="col-xs-8 col-sm-8">
									<span id="art2">Paletas de Madera</span>
								</div>
								<div class="col-xs-1 col-sm-1">
									<span class="label label-default label-pill pull-xs-right cantInsu" id="cant1" style="margin-top: 15%; font-size: 0.9em">15</span>
								</div>
								<div class="col-xs-3 col-sm-3">
									<input type="number" id="cantt1" class="form-control form-control-sm editCantInsu" value="" min="<?php echo 1; ?>
" required="required" title="" readonly>
								</div>
							</div>
						</li>
						<li class="list-group-item">						
							<div class="row">
								<div class="col-xs-8 col-sm-8">
									<span id="art2">Goma Blanca Scott</span>
								</div>
								<div class="col-xs-1 col-sm-1">
									<span class="label label-default label-pill pull-xs-right cantInsu" id="cant2" style="margin-top: 15%; font-size: 0.9em">15</span>
								</div>
								<div class="col-xs-3 col-sm-3">
									<input type="number" id="cantt2" class="form-control form-control-sm editCantInsu" value="" min="<?php echo 1; ?>
" required="required" title="" readonly>
								</div>
							</div>
						</li>
					</ul>
				</small><br>
                <div class="input-group der" style="width: 50%">
                    <div class="input-group-addon">Total</div>
                    <input type="text" class="form-control" id="totInsumo" placeholder="0.00" readonly>
                </div>
				<br>
				<legend><small>Motivo <small class="text-muted">- (Comentario)</small></small></legend>
				<textarea id="vdetalle" class="form-control" rows="4" required="required" style="max-height: 200px" readonly></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
				<button type="button" class="btn btn-primary" id="editInsumo">Editar</button>
			</div>
		</div>
	</div>
</div>

</div> <!-- mantinsumo -->

<script src="../assets/js/bv2_toggle.js"></script>