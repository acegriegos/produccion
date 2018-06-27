<div class="card-header center head1" style="margin: 0 !important">
	<p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Factura</p>
</div>
<div class="row">
	<div class="col s12 m12 pequeño" id="fdevoluciones">
		<div class="card bg1 z-depth-3">
			<div class="card-content white-text center-align" style="padding-top: 0.5% !important; padding-bottom: 1% !important">
				<div class="col s12 m8 l8 right-align" style="padding-right: 10% !important; "><span class="card-title"><b>Factura: <span > <?php echo $transaccion[0][2]; ?></span></b></span>
					<input type="hidden" class="zelda">
				</div>
			</div>
			<div class="card-content white-text" style="padding: 0.1% !important">
				<div class="row">
					<div class="col s12 m8">
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Nombre: </b><span> <?php echo $transaccion[0][1]; ?> </span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Fecha: </b><span id="ifecha"> <?php echo $transaccion[0][4]; ?></span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Monto Original de la Factura: </b><span id="imonto"> <?php echo $transaccion[0][8]; ?></span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Saldo Actual:</b> <span id="isaldo"> <?php $length=sizeof($transaccion)-1; echo $transaccion[$length][5]; ?></span></p>
						</div>
						<div class="col s12 m4 l4">
							<p style="padding-top: 1%"><b>Tipo de Factura: </b><span id="isaldo"> <?php echo $transaccion[0][11]; ?></span></p>
						</div>
					</div>
					<div class="col s12 m12 l4">
						<div class="row" style=" padding-top: 10%;">
							<div class="col s12">
								<button href="#!" class="waves-effect waves-light btn btn2 rigth z-depth-3" id="btn-div"><i class="mdi mdi-24px mdi-credit-card left"></i>Realizar Nota</button>
							</div>
						</div>
					</div>
				</div>
			</div><!-- card-content -->
			<div id="festadoscuentas" class="divabono" visible="0">
				<input type="hidden" id="vid" value="0">
				<input type="hidden" id="vidtipo" value="3">
				<input type="hidden" id="videstado" value="1">
				<input type="hidden" id="vidfactura" value="<?php echo $transaccion[0][0]; ?>">
				<input type="hidden" id="vdebe" value="0">
				<input type="hidden" id="vhaber" value="0">
				<input type="hidden" id="vconsecutivo" value="0">
				<input type="hidden" id="vidtipopago" value="0">
				<div class="row">
					<div class="col s12">
						<div class="card bg1">
							<div class="card-content pequeño white-text">
								<div class="center-align"><span class="card-title">Notas</span></div>
								<div class="row padd">
									<div class="col s12 m12 center-align ">
										<div class="switch">
											<label style="color: white; font-size: 1.2em">
												<b style="color: white !important">Débito</b>
												<input type="checkbox" class="dcn" value="1" id="ncd" checked>
												<span class="lever"></span>
												<b style="color: white !important" >Credito</b>
											</label>
										</div>
									</div>
									<div class="input-field col s12 m12 padd">
										<i class="mdi mdi-24px mdi-credit-card prefix"></i>
										<input id="vvalor" type="text"  class="validate eder" autocomplete="off">
										<label for="vvalor" style="color: white !important">Monto</label>
									</div>
									<div class="input-field col s12 padd">
										<textarea id="vcomentario" class="materialize-textarea" type="textarea"></textarea>
										<label for="vcomentario" style="color: white !important">Comentario:</label>
									</div>
									<div class="row">
										<div class="col s12 m6">
											<p>
												<input type="checkbox" id="tipoimpresion" title="Seleccione esta opción para imprimir la factura en formato de impresión 'Punto de Venta'"/>
												<label for="tipoimpresion" style="color: white !important">Punto Venta</label>
											</p>
										</div>
									</div>
									<div class="row">
										<div class="col s12 m10 offset-m2 ">
											<button href="#!" class="waves-effect btn btn2 waves-light z-depth-3 add" modulo="estadoscuenta" >Realizar Nota</button>
											<button href="#!" class="waves-effec btn btn1 waves-light z-depth-3" id="btn-divsalir">Salir</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>  
				</div> <!-- end divabono -->
			</div><!-- festadoscuentas -->
		</div><!-- cardblue -->
		<div class="card-block pequeño" >
			<div class="row pequeño">
				<div class="col s12 pequeño">
					<table id="data-table-cuentas-detalle" class="table centered highlight bordered dt-responsive nowrap pequeño z-depth-3 ">
						<thead>
							<tr>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Movimientos</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Fecha</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Monto</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;"><?php echo $transaccion[0][12] == 1 ? "Valor Factura" : "Saldo" ?> </th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Usuario</th>
							</tr>
						</thead>
						<tbody >
							<?php foreach ($transaccion as $obj) { ?>
							<tr>
								<td><?php echo $obj[9]; ?></td>
								<td><?php echo $obj[4]; ?></td>
								<td><?php echo $obj[8]; ?></td>
								<td><?php echo $obj[5]; ?></td>
								<td><?php echo $obj[10]; ?></td>
							</tr>
							<?php } ?>
						</tbody>
					</table>
				</div>
				<div class="col s4 offset-s8  l2 offset-l10">
				<button href="#!" class="waves-effec btn btn1 waves-light z-depth-3 " id="btn-navsalir">Salir</button></div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function(){
		permisos(310,311);
	})
</script>