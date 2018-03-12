<div class="row" id="ftaller-boletas">
	<input type="hidden" class="zelda">
	<div class="col s12 m12 l12">
		<div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero">
					<div class="input-field col s5 m5 l5">
						<input type="text" id="nclie" class="validate autocomplete">
						<input type="hidden" id="iclie" value="0">
						<label for="nclie">Nombre o cédula del cliente</label>
					</div>
					<div class="input-field col s5 m5 l5">
						<input type="text" id="placa" class="validate">
						<label for="placa">Placa o VIN del vehículo</label>
					</div>
					<div class="col s2 m2 l2">
						<a class="waves-effect waves-light green btn right" href="#modal-infoVehiculo" id="infoVehiculo">Información</a>
					</div>
				</div>
			</div>
		</div>
		<div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero"> <!-- vtabla="danocarroceria" id="fdanocarrocerias" hasTabla="1" tp="4" -->
					<div class="input-field col s12 m12 l12">
						<textarea id="danos" class="materialize-textarea" data-length="1000"></textarea>
						<label for="danos">Daños en carroceria</label>
					</div>
				</div>
				<div class="row marginzero" vtabla="accesorio" id="faccesorios" hasTabla="1" tp="4">
					<div class="input-field col s12 m12 l12">
						<textarea id="accesorios" class="materialize-textarea" data-length="1000"></textarea>
						<label for="accesorios">Accesorios dentro del auto</label>
					</div>
				</div>
				<div class="row marginzero">
					<div class="input-field col s3 m3 l3">
						<input type="text" id="vkm" class="validate">
						<label for="vkm">Kilometraje actual</label>
					</div>
					<div class="input-field col s3 m3 l3">
						<select type="select" id="gasolina">
							<option value="0">Seleccione una opción</option>
							{section name=LE loop=$GAS}
							<option value="{$GAS[LE][0]}">{$GAS[LE][1]}</option>
							{/section}
						</select>
						<label for="gasolina">Cantidad combustible</label>
					</div>
					<div class="input-field col s6 m6 l6">
						<input id="descfalla" type="text" data-length="200">
            			<label for="descfalla">Descripción de la falla</label>
					</div>
				</div>
			</div>
		</div>
		<div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero">
					<div class="col s3 m3 l3">
						<select type="select" id="idmecanico">
							<option value="0">Seleccione una opción</option>
							{section name=LE loop=$MEC}
							<option value="{$MEC[LE][0]}">{$MEC[LE][1]}</option>
							{/section}
						</select>
						<label for="idmecanico" style="padding-top: 30px">Asignar mecánico</label>
					</div>
					<div class="col s9 m9 l9">
						<a class="waves-effect waves-light green btn right add" modulo="taller-boleta" tp="5">Crear Boleta</a>
					</div>
					<!-- <a class="waves-effect waves-light blue btn right" style="margin-left: 10px">Facturar Boleta</a> -->
				</div>
			</div>
		</div>
		<!-- <div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero" vtabla="detalleboleta" id="fdetalleboletas" hasTabla="1" tp="4">
					<div class="col s3 m3 l3" id="servicios" style="padding: 0"> -->
						<!-- <div class="input-field">
							<input type="text" id="serv1" class="validate">
							<label for="serv1">Servicio</label>
						</div> -->
					<!-- </div>
					<div class="col s1 m1 l1"></div>
					<div class="col s8 m8 l8" id="productos" style="padding: 0"> -->
						<!-- <div class="row marginzero">
							<div class="input-field col s5 m5 l5" style="width: 38%">
									<input type="text" id="prod1" class="validate autocomplete">
									<label for="prod1">Producto</label>
							</div>
							<div class="input-field col s2 m2 l2" style="width: 13%">
								<input type="text" id="cant1" class="validate autocomplete">
								<label for="cant1">Cantidad</label>
							</div>
							<div class="input-field col s3 m3 l3">
								<input type="text" id="tot1" class="validate autocomplete">
								<label for="tot1">Total</label>
							</div>
						</div> -->
					<!-- </div>
					<span class="right" style="margin-right: 240px;font-size: 2em;padding-bottom: 2%">TOTAL: ¢0.00</span>
				</div>
				<div class="row marginzero">
					<a class="waves-effect waves-light blue btn right" style="margin-left: 10px">Facturar Boleta</a>
					<a class="waves-effect waves-light green btn right add" modulo="taller-boleta" varias="1" tp="5">Crear Boleta</a>
				</div>
			</div>
		</div> -->
	</div>
</div>

<div id="modal-infoVehiculo" class="modal modal-fixed-footer grandemodal">
	<div class="modal-header">
        <div class="card-header center white-text" style="background-color:#0B3861">
            <p class="flow-text marginzero">Información Vehículo</p>
        </div>
    </div>
	<div class="modal-content row" style="padding: 0px;margin-top: 15px">
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i1">
			<label for="i1">Nombre cliente</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i2">
			<label for="i2">Cédula</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i3">
			<label for="i3">Teléfono</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i4">
			<label for="i4">Placa</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i5">
			<label for="i5">Modelo</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i6">
			<label for="i6">Marca</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i7">
			<label for="i7">Año</label>
		</div>
		<div class="input-field col s12 m6 l6">
			<input type="text" class="validate" id="i8">
			<label for="i8">VIN</label>
		</div>
	</div>
	<div class="modal-footer ">
		<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
	</div>
</div>