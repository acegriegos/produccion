<br>
<div class="row">
	<div class="input-field col s6 m6 l6">
		<input type="text" id="search_vehiculos" maxlength="100" num="v500" var="0,1">
		<label class="truncate" for="search_vehiculos">Buscar vehículo</label>
	</div>
</div>
<div class="row">
	<div class="col s12 m12 l12">
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
<br>

<div id="modal-addvehiculos" class="modal modal-fixed-footer">
	<div class="modal-header">
		<ul class="tabs white-text" style="background-color:#0B3861">
			<li class="tab col s3"><a class="white-text">Agregar Vehículo</a></li>
		</ul>
	</div>
	<div class="modal-content">
		<div class="row">
			<div class="input-field col s6 m6 l6">
				<input type="text" id="vplaca" class="validate">
				<label for="vplaca">Placa</label>
			</div>
			<div class="input-field col s6 m6 l6">
				<select type="select" id="vidmarca">
					<option value="">Seleccione una marca</option>
					{section name=LE loop=$MARCA}
						<option value="{$MARCA[LE][0]}">{$MARCA[LE][1]}</option>
					{/section}
				</select>
			</div>
		</div>
		<div class="row">
			<div class="input-field col s6 m6 l6">
				<input type="text" id="vvin" class="validate">
				<label for="vvin">VIN</label>
			</div>
			<div class="input-field col s6 m6 l6">
				<select type="select" id="vidmodelo">
					<option value="">Seleccione un modelo</option>
				</select>
			</div>
		</div>
	</div>
	<div class="modal-footer ">
		<a class="modal-action waves-effect waves-green btn-flat z-depth-5 edit">Agregar</a>
		<a class="modal-action waves-effect waves-green btn-flat z-depth-5 add hide">Guardar</a>
		<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
	</div>
</div>