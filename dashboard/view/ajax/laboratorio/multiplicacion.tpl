<div id="flaboratorio-ciclos">
    <input type="hidden" class="zelda">
    <div class="row">
    <div class="col s10 input-field">
      <div class="center"><b>Listado de Procesos Actuales</b></div>
      <table class="responsive-table highlight">
          <thead>
              <tr>
                  <td>Etapa</td>
                  <td>Variedad</td>
                  <td>Días</td>
                  <td>Fecha Inicio</td>
                  <td>Lote</td>
                  <td>Acciones</td>
              </tr>
          </thead>
          <tbody>
            {section name=LE loop=$CIC}
            <tr>
              <td>{$CIC[LE][2]}</td>
              <td>{$CIC[LE][3]}</td>
              <td>{$CIC[LE][4]}</td>
              <td>{$CIC[LE][5]}</td>
              <td>{$CIC[LE][6]}</td>
              <td>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-refresh procmult" id="a{$CIC[LE][0]}" title="Procesar Multiplicacion"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-view-list mcb" id="b{$CIC[LE][0]}" title="Ver Medio Cultivo y Bandejas"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-checkbox-multiple-marked-outline invstats" id="c{$CIC[LE][0]}" title="Procesar Activos" tipo="1"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-arrow-left-box history" id="d{$CIC[LE][0]}" title="Ver Trayectoria"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-basket-unfill invstats" id="f{$CIC[LE][0]}" title="Registrar Pérdidas" tipo="0"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-arrow-collapse-right procenr" id="e{$CIC[LE][0]}" title="Procesar a Enraizamiento"></button>
              </td>
            </tr>
            {/section}
          </tbody>
      </table>
    </div>
    <div class="col s2 input-field">
      <input type="date" id="vfecha" class="datepicker eder">
    </div>
  </div>
</div>

<div id="modal-vmediocultivo" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
        <div class="card-header center white-text" style="background-color:#0B3861">
            <p class="flow-text marginzero">Ver medio cultivo y bandejas</p>
        </div>
    </div>
  <div class="modal-content" style="padding: 0px;">
    <table class="table responsive-table centered striped bordered highlight z-depth-5 pequeño" id="data-table-mediocultivos" cellspacing="0" width="100%" >
      <thead>
        <tr>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Nombre</th>
          <th class="white-text blue" style="border: 0; border-radius: 0px !important;">Cantidad</th>
        </tr>
      </thead>
      <tbody id="listamediocultivos">
      <!-- section -->
        <!-- <tr>
          <td style="padding: 10px; color:black;">abc</td>
          <td style="padding: 10px; color:black;">def</td>
        </tr> -->
      <!-- section -->
      </tbody>
    </table>
  </div>
  <div class="modal-footer ">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
  </div>
</div>

<div id="modal-invstats" class="modal modal-fixed-footer grandemodal">
  <div class="modal-header">
      <div class="card-header center white-text" style="background-color:#0B3861">
          <p class="flow-text marginzero" id="titinvstat"></p>
      </div>
  </div>
  <div class="modal-content row">
    <div class="input-field col s3 m3 l3">
      <select id="vidrazon"></select>
      <label for="vidrazon">Razón</label>
    </div>
    <div class="input-field col s5 m5 l5">
      <input type="text" id="nomact" class="validate autocomplete">
      <input type="hidden" id="vidciclo" value="0">
      <input type="hidden" id="hnomact" value="0">
      <label for="nomact">Nombre activo</label>
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
  <div class="modal-footer ">
    <a class="modal-action modal-close waves-effect waves-red btn-flat z-depth-5" style="margin-right: 2%">Salir</a>
    <a class="modal-action waves-effect waves-green btn-flat z-depth-5" id="prcactivo">Agregar</a>
  </div>
</div>