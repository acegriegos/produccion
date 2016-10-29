<?php /* Smarty version 2.6.17, created on 2016-10-29 13:39:21
         compiled from ajax/ajaxVerNotaPago.tpl */ ?>
<div id="mantVerNP">
	<h2 align="center">Ver Notas y Pagos</h2>
	<hr>
	<div class="row">
	<div class="col-md-3 col-lg-3">
		<div class="card card-header">
			<div class="row">
				<div class="col-md-6 col-lg-6">
					<label class="c-input c-radio">
						<input id="verNotas" name="radio" type="radio">
						<span class="c-indicator"></span>
						Notas
					</label>
				</div>
				<div class="col-md-6 col-lg-6">
					<label class="c-input c-radio">
						<input id="verPagos" name="radio" type="radio">
						<span class="c-indicator"></span>
						Pagos
					</label>
				</div>
			</div>
			<br>
			<div class="row">
			<span class="card card-header" style="font-size: 0.9em; width: 90%">Número</span>
				<div class="col-md-10 col-lg-10">
					<input type="text" class="form-control" placeholder="Número o Referencia">
				</div>
				<div class="col-md-2 col-lg-2">
					<button type="button" id="ingProv" class="btn btn-primary der" style="padding: 6px 12px; border-radius: 42px;"><i class="fa fa-search" style="font-size: 0.9em"></i></button>
				</div>
			</div><br>
			<div class="row">
			<span class="card card-header" style="font-size: 0.9em; width: 90%">Cliente</span>
				<div class="col-md-10 col-lg-10">
					<input type="text" class="form-control" placeholder="Nombre de Cliente">
				</div>
				<div class="col-md-2 col-lg-2">
					<button type="button" id="ingProv" class="btn btn-primary der" style="padding: 6px 12px; border-radius: 42px;"><i class="fa fa-search" style="font-size: 0.9em"></i></button>
				</div>
			</div><br>
			<div class="row">
			<span class="card card-header" style="font-size: 0.9em; width: 90%">Entre las Fechas</span>
				<div class="col-md-10 col-lg-10">
					<input type="date" class="form-control form-control-sm">
					<input type="date" class="form-control form-control-sm">		
				</div>
				<div class="col-md-2 col-lg-2">
					<button type="button" id="ingProv" class="btn btn-primary der" style="padding: 34px 12px; border-radius: 10px;"><i class="fa fa-search" style="font-size: 0.9em"></i></button>
				</div>
			</div>
		</div>
	   </div>

	<div class="col-md-9 col-lg-9">
		<div class="card card-header">
			<div class="table-responsive">
                <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-inventarios" cellspacing="0" width="100%" >
                    <thead>
                        <tr>
                            <th style="width: 12%">Código</th>
                            <th>Factura</th>
                            <th>Cliente</th>
                            <th>Fecha Modificación</th>
                            <th>Monto</th>
                            <th>Saldo</th>
                            <th style="width: 15%">Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="listaContable">
                        <!-- [section name=LE loop=$PROD] -->
                        <tr>
                            <td>1<!-- ($PROD[LE][1]) --></td>
                            <td>5483<!-- ($PROD[LE][3]) --></td>
                            <td>Homero Simpson<!-- ($PROD[LE][4]) --></td>
                            <td>16-07-2016 03:25:00<!-- ($PROD[LE][5]) --></td>
                            <td>¢2,750.00<!-- ($PROD[LE][6]) --></td>
                            <td>¢14,350.00<!-- ($PROD[LE][6]) --></td>
                            <td>
                                <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
                                <!-- <i class="fa fa-info-circle btn" id="c" data-toggle="modal" href="#modal-invContaComment" modulo="inventario" title="Detalle de Activo" style="color: #3C8FAD"></i> -->
                                <i class="fa fa-print btn" codigo="" id="p" data-toggle="modal" href="#modal-invConta" modulo="inventario"></i>
                                <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d" style="color: #D9534F" title="Anular"></i>
                            </td>
                        </tr>
                        <!-- [/section] -->
                    </tbody>
                </table>
            </div>
		</div>
	</div>

	</div>
	</div>

</div>