<div id="flaboratorio-ciclos" tp="5">
    <input type="hidden" class="zelda">
    <div class="row">
    <div class="col s6 input-field">
      <input type="text" id="vvariedad" class="autocomplete eder">
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
            <a href="#!" class="btn btn1 add der" modulo="laboratorio-ciclo">Registrar</a>
            <!-- <a class="btn btn1 der modal-trigger" href="#modal-perdidas" style="margin-right: 10px;">Pérdidas</a> -->
            <a href="#!" class="btn btn1 der" style="margin-right: 10px;">Listado de Iniciaciones</a>
            <span style="padding-right: 15px">Total Plantas: <span><b id="tplt">0</b></span></span>
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
<div class="modal modal-fixed-footer grandemodal" id="modal-formula" style="height: 80%; width: 75%">
    <div class="modal-header">
        Agregar Medio de Cultivo
    </div>
    <div class="modal-content">
    </div>

    <div class="modal-footer">
      <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
      <button type="button" class="waves-effect waves-green btn-flat" id="mcultivo" >Guardar</button>
    </div>

</div>

<div class="modal modal-fixed-footer grandemodal" id="modal-bandeja" style="height: 80%; width: 75%">
    <div class="modal-header">
        Agregar Bandeja
    </div>
    <div class="modal-content row">
      <div class="col s6 m6 l6">
        <select type="select" id="invactivlab"></select>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
      <button type="button" class="modal-action modal-close waves-effect waves-green btn-flat" id="mbandeja" >Guardar</button>
    </div>
</div>

<!-- <div class="modal modal-fixed-footer grandemodal" id="modal-perdidas" style="height: 80%; width: 75%">
    <div class="modal-header">
        Registrar perdidas
    </div>
    <div class="modal-content row">
      <div class="input-field col s6 m6 l6">
        <select type="select" id="tperdidas">
          <option value="0" disabled selected>Seleccione una opción</option>
          {section name=LE loop=$PER}
          <option value="{$PER[LE][0]}">{$PER[LE][1]}</option>
          {/section}
        </select>
        <label for="tperdidas">Tipo pérdidas</label>
      </div>
      <div class="input-field col s6 m6 l6">
        <input type="number" id="lperdidas" class="validate">
        <label for="lperdidas">Pérdidas</label>
      </div>
      <div class="input-field col s6 m6 l6">
        <input type="text" id="pcomentario" class="validate">
        <label for="pcomentario">Comentario</label>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="modal-action modal-close waves-effect waves-red btn-flat">Salir</button>
      <button type="button" class="modal-action modal-close waves-effect waves-green btn-flat" id="rperdidas" >Guardar</button>
    </div>
</div> -->