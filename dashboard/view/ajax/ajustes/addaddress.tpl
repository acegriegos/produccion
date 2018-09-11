<div class="row">
  <div class="col s12">
    <div class="provincia input-field">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Provincia" href="#!" style="width: 2.5rem" det="provincia" d-b="8" prev="" sig="vidcanton"><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="vidprovincia" type="select" class="_det" primary="1">
        <option value="0">Seleccione una Provincia</option>
        {section name=LE loop=$PRO}
        <option value="{$PRO[LE][0]}">{$PRO[LE][1]}</option>
        {/section}
      </select>
    </div>
  </div>
  <div class="col s12">
    <div class="canton input-field">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Cantón" href="#!" style="width: 2.5rem" det="canton" d-b="9" prev="vidprovincia" sig="viddistrito"><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="vidcanton" type="select" class="_det">
        <option value="">Seleccione un Cantón</option>
      </select>
    </div>
  </div>
  <div class="col s12">
    <div class="distrito input-field ">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Distrito" href="#!" style="width: 2.5rem" det="distrito" d-b="10" prev="vidcanton" sig="vidbarrio"><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="viddistrito" type="select" class="_det">
        <option value="">Seleccione un Distrito</option>
      </select>
    </div>
  </div>
  <div class="col s12">
    <div class="distrito input-field ">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Barrio" href="#!" style="width: 2.5rem" det="barrio" d-b="84" prev="viddistrito" sig=""><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="vidbarrio" type="select" class="_det">
        <option value="">Seleccione un Barrio</option>
      </select>
    </div>
  </div>
  <div class="input-field col s12">
    <label for="direccion_in">Dirección Exacta</label>
    <textarea type="textarea" id="direccion_in" class="materialize-textarea" length="100"></textarea>
  </div>
</div>

{literal}
<script type="text/javascript">
    $(function(){
        $("select").material_select('update');
        $("#direccion_in").val($("#slideDireccion").data('direccion'));
        var barrio = $("#slideDireccion").data('idbarrio');

        if (barrio != '') {
          var distrito = getDatos('iddistrito',84,'id = '+barrio,0,0,0)[0][0][0];
          var canton = getDatos('idcanton',10,'id = '+distrito,0,0,0)[0][0][0];
          var provincia = getDatos('idprovincia',9,'id = '+canton,0,0,0)[0][0][0];

          $("#vidprovincia").val(provincia).material_select('update');
          $("#vidprovincia").change();
          $("#vidcanton").val(canton).material_select('update');
          $("#vidcanton").change();
          $("#viddistrito").val(distrito).material_select('update');
          $("#viddistrito").change();
          $("#vidbarrio").val(barrio).material_select('update');

          Materialize.updateTextFields();
        }
        
    });
</script>
{/literal}