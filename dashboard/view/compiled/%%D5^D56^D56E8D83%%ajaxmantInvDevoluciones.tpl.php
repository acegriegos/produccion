<?php /* Smarty version 2.6.17, created on 2016-10-29 11:41:17
         compiled from ajax/ajaxmantInvDevoluciones.tpl */ ?>
<link rel="stylesheet" href="../assets/css/bv2_toggle.css">

<div id="mantdevoluciones">
<h2 align="center">Mantenimiento Devoluciones</h2>
<hr>

<div class="row">
    <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-inventarios" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th style="width: 12%">Código</th>
                            <th>Factura</th>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th style="width: 15%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaDevoluciones">
                        <!-- [section name=LE loop=$PROD] -->
                        <tr>
                            <td>215<!-- ($PROD[LE][1]) --></td>
                            <td>5489<!-- ($PROD[LE][2]) --></td>
                            <td>Papel Higiénico 2ble Hoja<!-- ($PROD[LE][3]) --></td>
                            <td>2<!-- ($PROD[LE][4]) --></td>
                            <td>¢7,500.00<!-- ($PROD[LE][5]) --></td>
                            <td>16-07-2016 03:25:00<!-- ($PROD[LE][6]) --></td>
                            <td>
                                <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
                                <i class="fa fa-info-circle btn" id="c" data-toggle="modal" href="#modal-invDevoComment" modulo="inventario" title="Detalle de Devolución" style="color: #3C8FAD"></i>
                                <i class="fa fa-print btn" codigo="" id="p" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d" style="color: #D9534F" title="Anular"></i>
                            </td>
                        </tr>
                        <!-- [/section] -->
                    </tbody>
                </table>
            </div>
    </div>
</div>

<div class="modal fade" id="modal-invDevoComment">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Detalle de Devolución</h4>
				<h5 class="form-horizontal"><b>Factura-<span id="vnumfdevo">5489</span></b></h5>
			</div>
			<div class="modal-body">
				<div class="row">
					<div class="col-xs-9 col-sm-9">
						<div class="input-group">
							<span class="input-group-addon">Realizado por</span>
							<input type="text" class="form-control" id="nomUser" value=""><b>
						</div>
					</div>
					<div class="col-xs-3 col-sm-3 eder">
						<input type="checkbox" checked data-toggle="toggle" data-off="<span id='editCannotDevo'>Editable</span>" data-on="<span id='editCanDevo'>Editar</span>" data-size="small" data-width="100" data-onstyle="warning-outline" data-offstyle="warning">
				<!-- <i class="fa fa-edit" id="editCan"></i> -->
					</div>
				</div>
				<hr>
				<small>
					<ul class="list-group">
						<li class="list-group-item">
							<div class="row">
								<div class="col-xs-8 col-sm-8">
									<span id="art2">Tornillos Planos</span>
								</div>
								<div class="col-xs-1 col-sm-1">
									<span class="label label-default label-pill pull-xs-right cantDevo" id="cant1" style="margin-top: 15%; font-size: 0.9em">15</span>
								</div>
								<div class="col-xs-3 col-sm-3">
									<input type="number" id="cantt1" class="form-control form-control-sm editCantDevo" value="" min="<?php echo 1; ?>
" required="required" title="" readonly>
								</div>
							</div>
						</li>
						<li class="list-group-item">						
							<div class="row">
								<div class="col-xs-8 col-sm-8">
									<span id="art2">Tornillos Planos</span>
								</div>
								<div class="col-xs-1 col-sm-1">
									<span class="label label-default label-pill pull-xs-right cantDevo" id="cant2" style="margin-top: 15%; font-size: 0.9em">15</span>
								</div>
								<div class="col-xs-3 col-sm-3">
									<input type="number" id="cantt2" class="form-control form-control-sm editCantDevo" value="" min="<?php echo 1; ?>
" required="required" title="" readonly>
								</div>
							</div>
						</li>
					</ul>
				</small>
                <br>
                <div class="input-group der" style="width: 50%">
                    <div class="input-group-addon">Total</div>
                    <input type="text" class="form-control" id="vtotdevo" placeholder="0.00" readonly>
                </div>
				<br>
				<legend><small>Comentario</small></legend>
				<textarea id="vdetalle" class="form-control" rows="4" required="required" style="max-height: 200px" readonly></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
				<button type="button" class="btn btn-primary" id="editDevo">Editar</button>
			</div>
		</div>
	</div>
</div>
</div>

<script src="../assets/js/bv2_toggle.js"></script>