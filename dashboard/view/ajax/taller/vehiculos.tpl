<div class="row">
	<div class="col s12 m12 l12">
		<div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero">
					<table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-vehiculos" cellspacing="0" width="100%" >
						<thead>
							<tr>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Placa</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cliente</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">VIN</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important;">Descripción</th>
								<th class="white-text blue" style="border: 0; border-radius: 0px !important; width: 18%;">Acciones</th>
							</tr>
						</thead>
						<tbody id="listavehiculos">
						{section name=LE loop=$CAR}
							<tr>
								<td style="padding: 10px; color:black;">{$CAR[LE][1]}</td>
								<td style="padding: 10px; color:black;">{$CAR[LE][2]}</td>
								<td style="padding: 10px; color:black;">{$CAR[LE][3]}</td>
								<td style="padding: 10px; color:black;">{$CAR[LE][4]}</td>
								<td>
									<a class="btn-color pbtn load mdi mdi-pencil mdi-24px per4108 modal-trigger" id="m{$CAR[LE][0]}" href="#modal-productos" title="Editar Producto" style="color:black;"></a>
									<a class="btn-color pbtn cdel delprod mdi mdi-close mdi-24px per4109" id="d{$CAR[LE][0]}" title="Eliminar Producto" style="color:black;"></a>
								</td>
							</tr>
						{/section}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>