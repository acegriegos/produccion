<div class="row">
	<div class="col s12 m5 l5">
		<ul class="collection">
			{section name="LE" loop=$QOS}
			<li class="pbtn collection-item qos center approve">{$QOS[LE][1]} (Cantidad Final: {$QOS[LE][2]})</li>
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
				<a class="pbtn btn-floating btn1 evaluarlote modal-trigger" href="#modal-evaluarlote" el="0"><i class="mdi mdi-check" style="padding-right: 7px;"></i></a>
				<a class="pbtn btn-floating btn3 evaluarlote modal-trigger" href="#modal-evaluarlote" el="1"><i class="mdi mdi-close" style="padding-right: 7px;"></i></a>
				<a class="waves-effect waves-light btn modal-trigger" href="#modal-evaluarlote">Modal</a>
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
      
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="save-evaluacion">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>