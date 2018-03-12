<div id="mantPaquetes">
	<div class="row">
		<div class="col s12 m6">
			<div class="input-field col s2 m2 l1">
				<a class="prefix dropdown-button tooltipped small mdi mdi-magnify pbtn"  data-activates="fpqt"></a>
			</div>
			<div class="input-field col s9 m9">
				<input id="searchpqt" type="text" class="validate" style="margin-left: 1% !important;">
				<label for="searchpqt" id="lpq" style="margin-left: 1% !important;">Buscar por Código</label>
			</div>
			<ul id="fpqt" class="dropdown-content" filter="1">
				<li><a class="dropdown-item filtropqt" filtro="f1">Código</a></li>
				<li><a class="dropdown-item filtropqt" filtro="f2">Nombre</a></li>
			</ul>
		</div>
		<div class="col s12 m6">
			<a id="addpackage" class="btn-floating waves-effect waves-light btn2 right z-depth-3 modal-trigger" href="#modal-paquetes"><i class="mdi mdi-plus"></i></a>
		</div>
	</div>
	<br>
	<div class="row">
		<div class="col s12 m12 pequeño">
			<div class="table">
				<table class="table striped bordered highlight centered responsive-table z-depth-3" id="data-table-paquetes" cellspacing="0"  >
					<thead>
						<tr>
							<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Código</th>
							<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Nombre</th>
							<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Descuento</th>
							<th class="white-text tab1" style="border: 0; border-radius: 0px !important;">Total</th>
							<th class="white-text tab1" style="border: 0; border-radius: 0px !important;" >Acciones</th>
						</tr>
					</thead>
					<tbody id="listapqts">
						{section name=LE loop=$PAQ}
						<tr>
							<td style="padding: 10px;">{$PAQ[LE][1]}</td>
							<td style="padding: 10px;">{$PAQ[LE][2]}</td>
							<td style="padding: 10px;">{$PAQ[LE][3]}</td>
							<td style="padding: 10px;">{$PAQ[LE][4]}</td>
							<td style="padding: 10px;">
								<!-- <a class="btn-color pbtn loadserv per4112" id="m{$SERV[LE][0]}" href="#modal-servicios" title="Editar Servicio"><i class="fa fa-pencil-square-o"></i></a> -->
								<a class="btn-color pbtn loadpck modal-trigger" id="e{$PAQ[LE][0]}" href="#modal-paquetes" title="Editar Paquete"><i class="mdi mdi-pencil mdi-24px"></i></a>
								<a class="btn-color pbtn cdel delpck" id="d{$PAQ[LE][0]}" title="Eliminar Paquete"><i class="mdi mdi-close mdi-24px"></i></a>
							</td>
						</tr>
						{/section}
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<br>
	<div id="modal-paquetes" class="modal modal-fixed-footer grandemodal" style="width:70%;height:90%">
		<div class="modal-header center">
			<ul class="tabs head3">
				<li class="tab col s12" ><a class="white-text" id="titpqt">AGREGAR PAQUETE</a></li>
			</ul>
		</div>
		<div class="modal-content">
			<div class="row">
				<div class="input-field col s12 m6" style="margin: 0;">
					<input id="vcodigo" type="text" class="validate package" autocomplete="off">
					<input type="hidden" id="vid" value="">
					<label for="vcodigo">Codigo</label>
				</div>
				<div class="input-field col s12 m6" style="margin: 0;">
					<input id="vnombre" type="text" class="validate package">
					<label for="vnombre">Nombre del Paquete</label>
				</div>
			</div>
			<div class="row">
				<div class="col s12 m12 l8">
					<table class="responsive-table bordered highlight">
						<thead>
							<tr>
								<th class="white-text tab2" style="border: 0; border-radius: 0px !important;">Producto o servicio</th>
								<th class="white-text tab2" style="border: 0; border-radius: 0px !important;">Cantidad</th>
								<th class="white-text tab2 tduni" style="border: 0; border-radius: 0px !important;">Unidad</th>
								<th class="white-text tab2" style="border: 0; border-radius: 0px !important;"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td  style="padding: 10px;">
									<input type="text" id="prod" class="autocomplete" autocomplete="off">
									<input type="hidden" id="hprod" value="">
								</td>
								<td  style="padding: 10px;">
									<input id="cantidad" type="number" min="1">
								</td>
								<td  style="padding: 10px;" class="tduni">
									<select id="pqtunidad" class="select">
										{section name=LE loop=$UNI}
										<option value="{$UNI[LE][0]}" simbolo="{$UNI[LE][2]}">{$UNI[LE][1]}</option>
										{/section}
									</select>
								</td>
								<td  style="padding: 10px;">
									<button type="button" id="bProd" class="btn-floating waves-effect waves-light btn2"><i class="mdi mdi-plus">add</i></button>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div class="col s12 m12 l4">
					<span><b>Productos en paquete:</b></span>
					<section id="listapaquetes"><!-- JS --></section>
				</div>
			</div><br><hr><br>
			<div class="row">
				<div class="input-field col s12 m6">
					<input type="text" class="validate" id="vdescuento" value="">
					<label for="vdescuento">Descuento</label>
				</div>
				<div class="input-field col s12 m6">
					<input id="totpqt" type="text" value="0.00" readonly>
					<label for="totpqt">Total</label>
					<input type="hidden" id="htotal" value="0.00">
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<a class="waves-effect waves-green btn-flat modal-action" id="addpqt" style="margin-left: 2%; ">Agregar</a>
			<a class="waves-effect waves-red btn-flat modal-action modal-close" style="margin-left: 3% !important;">Salir</a>
		</div>
	</div>
	</div> <!-- End mantPaquetes -->