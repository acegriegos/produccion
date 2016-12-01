<?php /* Smarty version 2.6.17, created on 2016-11-22 20:55:07
         compiled from ajax/ajaxmantInvGastos.tpl */ ?>
<link rel="stylesheet" href="../assets/css/bv2_toggle.css">

<div id="mantgastos">
	<h2 align="center">Mantenimiento Gastos</h2>
	<hr>

		<div class="row">
    <div class="col-md-12 col-lg-12">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-inventarios" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th style="width: 12%">Código</th>
                            <th>Referencia</th>
                            <th>Descripción</th>
                            <th>Cantidad</th>
                            <th>Total</th>
                            <th>Fecha</th>
                            <th>Detalle</th>
                            <th style="width: 15%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaGastos">
                        <!-- [section name=LE loop=$PROD] -->
                        <tr>
                        	<td>1</td>
                        	<td>PE-5548</td>
                            <td>Pago de Luz<!-- ($PROD[LE][1]) --></td>
                            <td>N/A<!-- ($PROD[LE][2]) --></td>
                            <td>¢29,500.00<!-- ($PROD[LE][3]) --></td>
                            <td>16-07-2016 03:25:00<!-- ($PROD[LE][4]) --></td>
                            <td>Electricidad Julio<!-- ($PROD[LE][5]) --></td>
                            <td>
                                <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
                                <i class="fa fa-info-circle btn" id="c" data-toggle="modal" href="#modal-invGastoComment" modulo="inventario" title="Detalle de Gasto" style="color: #3C8FAD"></i>
                                <i class="fa fa-print btn" codigo="" id="p" data-toggle="modal" href="#modal-invGasto" modulo="inventario"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d" style="color: #D9534F" title="Anular"></i>
                            </td>
                        </tr>
                        <!-- [/section] -->
                    </tbody>
                </table>
            </div>
    </div>
</div>

<div class="modal fade" id="modal-invGastoComment">
	<div class="modal-dialog">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				<h4 class="modal-title">Detalle de Gasto</h4>
				<h5 class="form-horizontal"><b>Referencia: <span id="numFGasto">PE-5548</span></b></h5>
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
						<input type="checkbox" checked data-toggle="toggle" data-off="<span id='editCannotGasto'>Editable</span>" data-on="<span id='editCanGasto'>Editar</span>" data-size="small" data-width="100" data-onstyle="warning-outline" data-offstyle="warning">
				<!-- <i class="fa fa-edit" id="editCan"></i> -->
					</div>
				</div><hr>
				<div class="row">
				<div class="col-md-12 col-lg-12">
					<div class="input-group">
						<span class="input-group-addon">Descripción</span>
						<input type="text" class="form-control" id="detalleGasto" value="Pago de Luz" readonly>
					</div>
				</div>
				</div><br>
				<div class="row">
				<div class="col-md-7 col-lg-7">
					<div class="input-group">
						<span class="input-group-addon">Total</span>
						<input type="text" class="form-control" id="totGasto" value="¢29,500.00" readonly>
					</div>
				</div>
				<div class="col-md-5 col-lg-5">
					<div class="input-group">
						<span class="input-group-addon">Cantidad</span>
						<input type="number" class="form-control" id="cantGasto" value="0" min="<?php echo 1; ?>
" readonly>
					</div>
				</div>
				
				</div>
				<br>
				<legend><small>Detalle</small></legend>
				<textarea id="vdetalle" class="form-control" rows="4" required="required" style="max-height: 200px" readonly></textarea>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-default" data-dismiss="modal">Salir</button>
				<button type="button" class="btn btn-primary" id="editGasto">Editar</button>
			</div>
		</div>
	</div>
</div>

</div> <!-- mantgasto -->

<script src="../assets/js/bv2_toggle.js"></script>