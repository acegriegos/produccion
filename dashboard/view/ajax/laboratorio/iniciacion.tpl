<div id="flaboratorio-ciclos">
    <input type="hidden" class="zelda">
    <div class="row">
    <div class="col s6 input-field">
      <input type="text" id="vvariedad" class="autocomplete eder" autocomplete="off">
      <label for="vvariedad">Variedad</label>
    </div>
    <div class="col s6 input-field">
      <input type="date" id="vfecha" class="datepicker eder">
    </div>
  </div>
  <div class="row">
    <div class="col s8 input-field">
        <div class="center" id="result00" >No se ha Elegido la Variedad</div>
        <div class="der">
            <br>
            <!-- <a href="#!" class="btn btn1 add der" modulo="laboratorio-ciclo" varias="1">Registrar</a> -->
            <a href="#modal-registrar" class="btn btn1 der" id="registrar">Registrar</a>
            <a href="#!" class="btn btn1 der" style="margin-right: 10px;">Listado de Iniciaciones</a>
            <span style="padding-right: 15px">Total Plantas: <span><b id="tplt">0</b></span></span>
            <input type="hidden" value="" id="vidsrvs">
        </div>
    </div>
    <div class="col s4">
      <div class="row">
        <div class="col s12 input-field">
          <select type="select" id="videncargado">
            <option value="0">Seleccione un Operario</option>
            {section name=LE loop=$USR}
            <option value="{$USR[LE][0]}">{$USR[LE][1]}</option>
            {/section}
          </select>
          <label for="vencargado">Operario</label>
        </div>
        <div class="col s12 input-field">
          <input type="text" id="vlote" value="">
          <label for="vlote">Lote</label>
        </div>
        <!-- <div class="col s12 input-field">
          <input type="text" id="vapendice" class="eder" value="0">
          <label for="vapendice">Apéndice</label>
        </div> -->
        <div class="col s12 input-field">
          <button class="prefix btn-floating btn2 mdi mdi-plus z-depth-2" id="mkformula" style="width: 40px"></button>
          <input type="text" id="cultivo" readonly value="-">
          <label for="cultivo">Medio Cultivo</label>
        </div>
        <div class="col s12 input-field">
          <button class="prefix btn-floating btn2 mdi mdi-plus z-depth-2" id="mkbandeja" style="width: 40px"></button>
          <input type="text" id="bandeja" readonly value="-">
          <label for="bandeja">Bandeja</label>
        </div>
        <div class="col s12 input-field">
          <textarea id="vcomentario" class="materialize-textarea comentario" type="textarea" data-length="255"></textarea>
          <label for="vcomentario">Comentario</label>
        </div>
      </div>
    </div>
  </div>
</div>

<div id="modal-formula" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
        <div class="card-header center white-text" style="background-color:#0B3861">
            <p class="flow-text marginzero">Agregar Medio de Cultivo</p>
        </div>
    </div>
  <div class="modal-content">
    
  </div>
  <div class="modal-footer ">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="mcultivo">Guardar</a>
  </div>
</div>

<div id="modal-bandeja" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
        <div class="card-header center white-text" style="background-color:#0B3861">
            <p class="flow-text marginzero">Agregar bandeja</p>
        </div>
    </div>
  <div class="modal-content row">
    <div class="col s6 m6 l6">
      <select type="select" id="invactivlab"></select>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="mbandeja">Guardar</a>
  </div>
</div>

<div id="modal-registrar" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
      <div class="card-header center white-text" style="background-color:#0B3861">
          <p class="flow-text marginzero">Iniciación</p>
      </div>
  </div>
  <div class="modal-content row">
    <div class="input-field col s3 m3 l3">
      <select id="vidrazon"></select>
      <label for="vidrazon">Razón</label>
    </div>
    <div class="input-field col s5 m5 l5">
      <input type="text" id="nomvar" class="validate autocomplete" autocomplete="off">
      <label for="nomvar">Variedad</label>
    </div>
    <div class="input-field col s4 m4 l4">
      <input type="number" id="cantact" class="validate">
      <label for="cantact">Cantidad</label>
    </div>
    <div class="input-field col s12 m12 l12">
      <textarea id="comentproc" class="materialize-textarea"></textarea>
      <label for="comentproc">Comentario</label>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5 add" modulo="laboratorio-ciclo" varias="1">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>