<div class="row">
  
  <div class="col s8">
    
    <div class="row">

      <div class="col s6">
        <label>Preparación de Medio Cultivo</label>
      </div>

      <div class="col s6 input-field">
        
        <select id="ciclo-mc" style="width: 50%">
          {section name=LE loop=$CIC}
            <option value="{$CIC[LE][0]}">{$CIC[LE][1]}</option>
          {/section}
        </select>
        <label for="ciclo-mc">Ciclo</label>
      </div>

      <div class="col s10">
        <table class="responsive-table striped highlight ">
          <thead class="tab1">
            <th></th>
            <th>Componente</th>
            <th>Cantidad</th>
          </thead>
          <tbody id="mcul-lista"></tbody>
        </table>
      </div>

      <div class="col s2 input-field">
        <select id="mc-cantidad" style="width: 50%">
          {section name=LE loop=$CANT}
            <option value="{$CANT[LE][0]}" mul="{$CANT[LE][1]}">{$CANT[LE][1]} {$CANT[LE][2]}</option>
          {/section}
        </select>
        <label for="mc-cantidad">Cantidad</label>
      </div>
    </div>
  </div>

  <div class="col s4">
    <label>Listado de Medios</label>
  </div>

</div>