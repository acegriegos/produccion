<div class="row" id="ftaller-revisiones">
	<input type="hidden" class="zelda">
	<div class="col s12 m12 l12">
		<div class="card white darken-1 z-depth-3">
			<div class="card-content">
				<div class="row marginzero">
					<div class="input-field col s3 m3 l3">
						<select type="select" id="assgnmechanic">
							<option value="0">Seleccione un mecanico</option>
							{section name=LE loop=$MEC}
							<option value="{$MEC[LE][0]}">{$MEC[LE][1]}</option>
							{/section}
						</select>
						<label for="assgnmechanic">Asignar mecánico</label>
					</div>
				</div>
			</div>
		</div>
		
	</div>
</div>