<div id="flaboratorio-ciclos">
  <input type="hidden" class="zelda">
  <div class="row">
    <div class="col s10 input-field">
      <div class="col s12 head1 padding1 center"><b><h6>Listado de Procesos Actuales</h6></b></div>
      <table class="responsive-table highlight striped">
        <thead class="tab2">
          <tr>
            <td>Etapa</td>
            <td>Variedad</td>
            <td>Días</td>
            <td>Fecha Inicio</td>
            <td>Lote</td>
            <td>Acciones</td>
          </tr>
        </thead>
        <tbody id="listaciclos">
          <!--  -->
        </tbody>
      </table>
    </div>
    <div class="col s2 input-field">
      <label for="vfehca"><i class="mdi mdi-calendar mdi-24px gtext"></i></label>
      <input type="date" id="vfecha" class="datepicker eder">
    </div>
  </div>
</div>

<div id="modal-vmediocultivo" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header head2 padding1">
    <div class="card-header center white-text">
      <p class="flow-text marginzero">Ver medio cultivo y bandejas</p>
    </div>
  </div>
  <div class="modal-content" style="padding: 0px;">
    <table class="table responsive-table centered striped bordered highlight z-depth-3 pequeño" id="data-table-mediocultivos" cellspacing="0" width="100%">
      <thead class="tab1">
        <tr>
          <th style="border: 0; border-radius: 0px !important;">Nombre</th>
          <th style="border: 0; border-radius: 0px !important;">Cantidad</th>
        </tr>
      </thead>
    <tbody id="listamediocultivos"></tbody>
  </table>
</div>
<div class="modal-footer ">
  <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-proc-ciclo" class="modal modal-fixed-footer grandemodal">
<div class="modal-header head2 padding1">
  <div class="card-header center white-text">
    <p class="flow-text marginzero"><span id="titciclo"></span></p>
  </div>
</div>
<div class="modal-content">
  <div class="row">
    <div class="input-field col s12 m6 l6">
      <span style="font-size: 1.2em">Registro de cantidad final de variedad <span id="varfinal"></span></span>
    </div>
    <div class="input-field col s12 m4 l4">
      <input type="number" class="validate" id="cantfinal">
      <label for="cantfinal">Cantidad</label>
    </div>
  </div><hr>
  <div class="row marginzero">
    <p>Registrar Pérdidas</p>
    <div class="input-field col s12 m3 l3">
      <select type="select" id="srazon"></select>
      <label for="srazon">Razón</label>
    </div>
    <div class="input-field col s12 m4 l4">
      <input type="text" id="svari" disabled>
      <input type="hidden" id="idserv" value="0">
      <label for="svari">Variedad</label>
    </div>
    <div class="input-field col s12 m4 l4">
      <input type="number" id="cantsrv" class="validate">
      <label for="cantsrv">Cantidad</label>
    </div>
  </div>
  <div class="row">
    <p>Asignar bandejas y medio de cultivo</p>
    <div class="col s12 m12 l12">
      <a class="btn btn3 der">Medios de Cultivo</a>
      <input type="hidden" id="hidmediocultivo" value="0">
      <a class="btn btn3 der" id="assbandeja" style="margin-right: 10px;">Bandejas</a>
      <input type="hidden" id="hidbandeja" value="0">
    </div>
  </div>
</div>
<div class="modal-footer">
  <a class="modal-action waves-effect waves-green btn-flat z-depth-3" id="doproc">Agregar</a>
  <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
</div>
</div>

<div id="modal-invstats" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header head2 padding1">
    <div class="card-header center white-text">
      <p class="flow-text marginzero"><span id="titinvstat"></span></p>
    </div>
  </div>
  <div class="modal-content" style="padding: 0px;">
    <div class="row">
      <div class="input-field col s12 m4 l4">
        <select type="select" id="vactivo"></select>
        <label for="vactivo">Activo</label>
        <input type="hidden" id="vidciclo" value="0">
      </div>
      <div class="input-field col s12 m3 l3">
        <input type="number" id="vcant" class="validate">
        <label for="vcant">Cantidad</label>
      </div>
      <div class="input-field col s12 m4 l4">
        <select type="select" id="vidrazon"></select>
        <label for="vidrazon">Razón</label>
      </div>
      <div class="col s12 m1 l1" style="margin-top: 1rem">
        <a class="btn btn-floating btn2 waves-effect waves-light mdi mdi-plus mdi-24px" id="addActivo"></a>
      </div>
    </div>
    <div class="row" style="align-content: center;">
      <table class="responsive-table highlight z-depth-3" id="tabla-activos">
        <thead class="tab1">
          <tr>
            <td class="center">Activo</td>
            <td class="center">Cantidad</td>
            <td class="center">Razón</td>
            <td class="center">Acciones</td>
          </tr>
        </thead>
        <tbody id="listaactivos">
          <!-- <tr>
            <td class="center">Bandeja 20uds</td>
            <td class="center">10</td>
            <td class="center">Virus</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </div>
  <div class="modal-footer">
    <a class="modal-action waves-effect waves-green btn-flat z-depth-3" id="doinvstat">Agregar</a>
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-3" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-bandeja" class="modal modal-fixed-footer grandemodal">
<div class="modal-header head2 padding1">
  <div class="card-header center white-text">
    <p class="flow-text marginzero">Asignar bandeja</p>
  </div>
</div>
<div class="modal-content row">
  <div class="col s6 m6 l6">
  <select type="select" id="cbandeja"></select>
</div>
</div>
<div class="modal-footer">
<a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
<a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="chgbandeja">Guardar</a>
</div>
</div>