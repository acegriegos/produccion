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
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-checkbox-multiple-marked-outline procact" id="c{$CIC[LE][0]}" title="Procesar Activos"></button>
                <button class="btn btn-floating btn2 mdi mdi-16px mdi-arrow-left-box history" id="d{$CIC[LE][0]}" title="Ver Trayectoria"></button>
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