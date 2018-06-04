<div class="card card-block z-depth-3 pequeño row">

	<div class="col s12 m4 l4">
		<div id="faccesos" class="input-field">
			<input type="hidden" id="vid" value="0">
			<label id="vnombre" type="html" for="vcodigo">CODIGO</label>
			<input type="text" id="vcodigo" class="eder" maxlength="45">
		</div>

		<a href="#" modulo="acceso" class="edit der btn btn1">Guardar</a>
	</div>

	<div class="col s12 m8 l8">
		<table class="table responsive-table centered striped bordered highlight z-depth-3 pequeño" id="data-table-accesos" cellspacing="0" width="100%" >
			<thead class="tab1">
				<tr>
					<th style="border: 0;">Transacción</th>
					<th style="border: 0;">Código</th>
					<th style="border: 0; width: 18%">Acciones</th>
				</tr>
			</thead>
			<tbody id="listaAccesos">
				{section name=LE loop=$ACC}
				<tr>
					<td style="padding: 10px;">{$ACC[LE][1]}</td>
					<td style="padding: 10px;">{$ACC[LE][2]}</td>
					<td>
						<a class="pbtn load per4108 mdi mdi-pencil mdi-24px gtext" id="m{$ACC[LE][0]}" title="Editar Acceso" modulo="acceso"></a>
					</td>
                                  
				</tr>
				{/section}
			</tbody>
		</table>
	</div>
	<div class="col s12 m6 l6" id="modAccesos">
		
	</div>

</div>