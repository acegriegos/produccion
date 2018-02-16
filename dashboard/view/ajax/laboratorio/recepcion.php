<div id="flaboratorio-explantes">
  <input type="hidden" class="zelda">
  <div class="row">
    <div class="col s6 input-field">
      <input type="text" id="vnombre" class="eder">
      <label for="vnombre">Identificación</label>
    </div>
    <div class="col s6 input-field">
      <input type="date" id="vfecha" class="datepicker eder">
    </div>
  </div>
  <div class="row">
    <div class="col s6">
      <div class="input-field">
        <input type="text" id="ncli" placeholder="Nombre o Cédula del Cliente" class="eder autocomplete" addG="1">
        <label for="ncli">Procedencia</label>
      </div>
      <div class="input-field">
        <input type="text" id="vvariedad" class="eder autocomplete" placeholder="Nombre de la Variedad">
        <label for="vvariedad">Variedad</label>
      </div>
      <div class="input-field">
        <input type="text" id="cantidad" class="eder numeric" value="0.00">
        <label for="cantidad">Cantidad</label>
      </div>
      <div class="input-field hide">
        <input type="text" id="expectativa hide" class="eder numeric" value="0">
        <label for="expectativa">Expectativa</label>
      </div>
      
    </div>
    <div class="col s6">
      <table class="responsive-table highlight">
        <thead>
          <tr>
            <th></th>
            <th>Dirección</th>
            <th>Región</th>
            <th>Finca <a class="der" id="addFin" style="height:30px; width: 30px"> <button class="mdi mdi-plus btn-floating blue z-depth-5"></button></a></th>
          </tr>
        </thead>
        <tbody id="fincas">
          <tr>
            <td colspan="3" class="center">No Hay Datos Registrados</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <div class="row">
    <input type="hidden" id="vresponsable">
    <div class="col s1">
      <span class="prefix hide">Rango:</span>
    </div>
    <div class="col s2">
      <div class="input-field hide">
        <input type="text" id="vrango1" class="eder" value="0">
        <label for="vrango1">Desde</label>
      </div>
    </div>
    <div class="col s2">
      <div class="input-field hide">
        <input type="text" id="vrango2" class="eder" value="0">
        <label for="vrango2">Hasta</label>
      </div>
    </div>
    <a href="#!" class="btn add der" modulo="laboratorio-explante">Ingresar</a>
    <a href="#!" class="btn der" style="margin-right: 10px;">Listado de Recepciones</a>
  </div>
</div>
