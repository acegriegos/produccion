<div class="card-header center white-text" style="background-color:#0B3861; margin: 0 !important">
	<p class="flow-text" style="font-size: 1.9em; margin: 0 !important">Detalle de la Factura</p>
</div>
<div id="fdevoluciones" class="row">
	<div class="col s12 m12 pequeño">
		<div class="card blue z-depth-5">
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
					</div>
					<!-- <div class="col s12 m12 l4">
						<div class="row" style=" padding-top: 10%;">
							<div class="col s12">
								<button href="#!" class="waves-effect waves-light btn rigth z-depth-5 "  id="btn-div" style="background-color:#0B3861;"><i class="mdi mdi-24px mdi-credit-card left"></i>Realizar Devolución</button>
							</div>
						</div>
					</div> -->
				</div>
			</div><!-- card-content -->
			
		</div><!-- cardblue -->
		<div class="card-block pequeño" >
			<div class="row pequeño">
				<div class="col s12 pequeño">
					<table id="data-table-cuentas-detalle" class="table centered highlight bordered dt-responsive nowrap pequeño z-depth-5 ">
						<thead>
							<tr>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Consecutivo</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Fecha</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Comentario</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 15%">Usuario</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">acciones</th>
							</tr>
						</thead>
						<tbody vtabla="detalledevolucione" id="fdetalledevoluciones" tp="4" rollback>
							<?php foreach ($transaccion as $obj) { ?>
							<tr>
								<td class="tdlist"><?php echo $obj[3]; ?></td>
								<td class="tdlist"><?php echo $obj[4]; ?></td>
								<td class="tdlist"><?php echo $obj[5]; ?></td>
								<td class="tdlist"><?php echo $obj[6]; ?></td>
								<td>
									<a class="mdi mdi-printer mdi-24px btn-color blueh pbtn" title="Imprimir devolución" id="p<?php echo $obj[0]; ?>" href="devoluciones?accion=3&id=<?php echo $obj[7]; ?>&tp=1"></a>
									<a class="mdi mdi-close mdi-24px btn-color cdel pbtn anular" title="Anular devolución" id="a<?php echo $obj[0]; ?>"></a>
								</td>
							</tr>
							<?php } ?>
						</tbody>
					</table>
				</div>
				<div class="col s4 offset-s8 l2 offset-l10"><br>
				<button href="#!" class="waves-effec btn waves-light z-depth-5" id="btn-navsalir">Salir</button></div>
			</div>
		</div>
	</div>
</div>
<script type="text/javascript">
	$(function(){

		permisos(310,311);
	})
</script>