<div class="row">
	<div class="col s12 m5 l5">
		<ul class="collection">
			{section name="LE" loop=$QOS}
			<li class="pbtn collection-item qos center approve" idciclo="{$QOS[LE][0]}" lote="{$QOS[LE][1]}">{$QOS[LE][1]} (Cantidad Final: {$QOS[LE][2]})</li>
			{/section}
		</ul>
	</div>
	<div class="col s12 m7 l7">
		<div class="row">
			<div class="input-field col s12 m10 l10">
				<input type="text" class="validate" id="vloteaprv">
				<label for="vloteaprv">Lote</label>
			</div>
			<div class="col s12 m2 l2" style="margin-top: 1rem;">
				<a class="pbtn gtext evaluarlote" el="6" idciclo="0"><i class="mdi mdi-check mdi-24px" style="padding-right: 7px;"></i></a>
				<a class="pbtn gtext evaluarlote" el="7" idciclo="0"><i class="mdi mdi-close mdi-24px" style="padding-right: 7px;"></i></a>
			</div>
		</div>
	</div>
</div>

<div id="modal-evaluarlote" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
    <div class="card-header center head2 padding1">
      <p class="flow-text marginzero">Pruebas de QoS</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 20px;">
    <div class="row">
    	<div class="col s12 m5 l5">
    		<span style="font-size: 1.2em">Lote: <span id="ciclolote"></span></span>
    		<input type="hidden" id="vidtipoestado">
    		<input type="hidden" id="hidciclo" value="0">
    	</div>
		<div class="col s12 m7 l7">
			<label for="vidtipopruebas">Pruebas</label>
			<select multiple id="vidtipopruebas"></select>
		</div>
    </div>
    <div class="row">
		<div class="input-field col s12 m12 l12">
			<textarea id="vcomenpruebas" class="materialize-textarea"></textarea>
			<label for="vcomenpruebas">Comentario</label>
		</div>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="save-evaluacion">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>