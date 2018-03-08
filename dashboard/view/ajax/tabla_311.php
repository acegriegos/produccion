<div class="card-header center head1" style="margin: 0 !important">
	<p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Factura</p>
</div>
<div id="fdevoluciones" class="row">
	<div class="col s12 m12 pequeño">
		<div class="card bg1 z-depth-3">
			<div class="card-content white-text center-align" style="padding-top: 0.5% !important; padding-bottom: 1% !important">
				<div class="col s12 m8 l8 right-align" style="padding-right: 10% !important; "><span class="card-title"><b>Factura: <span><?php echo $transaccion[0][0]; ?></span></b></span> 
				</div>
			</div>
			<div class="card-content white-text" style="padding: 0.1% !important">
				<div class="row">
					<div class="col s12 m8">
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Nombre: </b><span> <?php echo $transaccion[0][1]; ?></span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"> <b>Fecha: </b><span id="ifecha"> <?php echo $transaccion[0][2]; ?></span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Monto Original de la Factura: </b><span id="imonto"> <?php echo $transaccion[0][4]; ?></span></p>
						</div>
						<div class="col s12 m6">
							<p style="padding-top: 1%"><b>Saldo Actual:</b> <span id="isaldo"> <?php echo $transaccion[0][4]; ?></span></p>
						</div>
						<div class="col s12 m4 l4">
							<p style="padding-top: 1%"><b>Tipo de Factura: </b><span id="isaldo"> <?php echo $transaccion[0][3]; ?></span></p>
						</div>
					</div>
					<div class="col s12 m12 l4">
						<div class="row" style=" padding-top: 10%;">
							<div class="col s12">
								<button href="#!" class="waves-effect waves-light btn btn2 rigth z-depth-3" id="btn-div"><i class="mdi mdi-24px mdi-credit-card left"></i>Realizar Devolución</button>
							</div>
						</div>
					</div>
				</div>
			</div><!-- card-content -->
			<div class="divabono" visible="0">
				<!-- <input type="hidden" id="vid" value="0">
				<input type="hidden" id="vidtipo" value="3">
				<input type="hidden" id="videstado" value="1">
				<input type="hidden" id="vidfactura" value="<?php echo $transaccion[0][0]; ?>">
				<input type="hidden" id="vdebe" value="0">
				<input type="hidden" id="vhaber" value="0">
				<input type="hidden" id="vconsecutivo" value="0">
				<input type="hidden" id="vidtipopago" value="0"> -->
				<input type="hidden" id="factura" value="0">
				<input type="hidden" class="zelda">
				<div class="row">
					<div class="col s12">
						<div class="card bg1">
							<div class="card-content pequeño white-text">
								<div class="center-align"><span class="card-title">Devoluciones</span></div>
								<div class="row padd">
									<!-- <div class="col s12 m12 center-align ">
										<div class="switch">
											<label style="color: white; font-size: 1.2em">
												<b style="color: white !important">Devolución</b>
												<input type="checkbox" class="dcn" value="1" id="ncd">
												<span class="lever"></span>
												<b style="color: white !important">Cambio</b>
											</label>
										</div>
									</div> -->
									<input type="hidden" id="vfecha" value="1990-01-01">
									<div class="input-field col s12 padd">
										<select type="select" id="vidinventario"></select>
										<label for="vidinventario" style="color: white !important">Seleccionar inventario:</label>
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
										<div class="col s12 m10 offset-m2">
											<button href="#!" class="waves-effect btn btn2 waves-light z-depth-3 add" modulo="devolucione" varias="1" tp="5">Devolver</button>
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
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Devolver</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Producto</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important; width: 15%">Cantidad</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Unidad</th>
								<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Motivo</th>
							</tr>
						</thead>
						<tbody vtabla="detalledevolucione" id="fdetalledevoluciones" tp="4" rollback>
							<?php foreach ($transaccion as $obj) { ?>
							<tr id="dd<?php echo $obj[8]; ?>" class="ciclos">
								<td class="tdlist">
									<p>
										<input type="checkbox" name="devolucion" id="devprod<?php echo $obj[8]; ?>" value="0" idproducto="<?php echo $obj[9]; ?>">
										<label for="devprod<?php echo $obj[8]; ?>"></label>
									</p>
								</td>
								<td class="tdlist"><?php echo $obj[5]; ?></td>
								<td class="tdlist">
									<span id="spncant<?php echo $obj[8]; ?>"><?php echo $obj[6]; ?></span>
									<section class="hide" id="dcantdev<?php echo $obj[8]; ?>">
										<input type="text" class="validate cantdev" id="cantdev<?php echo $obj[8]; ?>" style="margin-bottom: 0;">
									</section>
								</td>
								<td class="tdlist"><?php echo $obj[7]; ?></td>
								<td>
									<select id="estadodevolucion<?php echo $obj[8]; ?>" class="estadodevolucion" type="select" style="margin-bottom: 0w"></select>
								</td>
							</tr>
							<script type="text/javascript">
								$(function(){
									$("#dd<?php echo $obj[8]; ?>").data('triforce',{vid:0,viddevolucion:0,vidproducto:0,vcantidad:0,vidtipodevolucion:0,vidinventario:0});
								});	
							</script>
							<?php } ?>
						</tbody>
					</table>
				</div>
				<div class="col s4 offset-s8  l2 offset-l10"><br>
				<button href="#!" class="waves-effec btn btn1 waves-light z-depth-3" id="btn-navsalir">Salir</button></div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function(){

		permisos(310,311);
	})
</script>