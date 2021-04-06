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
        <option value="0">Seleccione un Cantón</option>
      </select>
    </div>
  </div>
  <div class="col s12">
    <div class="distrito input-field ">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Distrito" href="#!" style="width: 2.5rem" det="distrito" d-b="10" prev="vidcanton" sig="vidbarrio"><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="viddistrito" type="select" class="_det">
        <option value="0">Seleccione un Distrito</option>
      </select>
    </div>
  </div>
  <div class="col s12">
    <div class="distrito input-field ">
      <a class="btn-floating btn2 tooltipped hide" data-position="button" data-tooltip="Ingresar Barrio" href="#!" style="width: 2.5rem" det="barrio" d-b="84" prev="viddistrito" sig=""><i class="mdi mdi-plus mdi-24px"></i></a>
      <select id="vidbarrio" type="select" class="_det">
        <option value="0">Seleccione un Barrio</option>
      </select>
    </div>
  </div>
  <div class="input-field col s12">
    <label for="direccion_in">Dirección Exacta</label>
    <textarea type="textarea" id="direccion_in" class="materialize-textarea" length="100"></textarea>
  </div>

  <input type="hidden" id="_idfila" value="{$smarty.post.arreglo.vidfila}">
  <input type="hidden" id="_idtabla" value="{$smarty.post.arreglo.vidtabla}">
</div>

{literal}
<script type="text/javascript">
    $(function(){
        if($("#slideDireccion").data('idfila') != $("#_idfila").val()){

            var direccion = getDatos('',92,$("#_idfila").val()+","+$("#_idtabla").val(),0,0,0);
            console.log(direccion)
            $("#slideDireccion").data('idfila',$("#_idfila").val());
            if(direccion[0].length)
              $("#slideDireccion").data('fila1',{vaccion:2,vidubicacion:direccion[0][0][0],vdireccion:direccion[0][0][1],vidbarrio:direccion[0][0][2],iddistrito:direccion[0][0][4],idcanton:direccion[0][0][6],idprovincia:direccion[0][0][8],vlatitud:direccion[0][0][12],vlongitud:direccion[0][0][13]});
            else
              $("#slideDireccion").data('fila1',{vaccion:1,vidubicacion:0,vdireccion:'',vidbarrio:0,iddistrito:0,idcanton:0,idprovincia:0,vlatitud:0,vlongitud:0});
        }
        
          var barrio = $("#slideDireccion").data('fila1');

          $("select").material_select();

            var distrito = barrio['iddistrito'];
            var canton = barrio['idcanton'];
            var provincia = barrio['idprovincia'];
            var barrio = barrio['vidbarrio']
       
            $("#vidprovincia").val(provincia).material_select('update');
            $("#vidprovincia").change();
            $("#vidcanton").val(canton).material_select('update');
            $("#vidcanton").change();
            $("#viddistrito").val(distrito).material_select('update');
            $("#viddistrito").change();
            $("#vidbarrio").val(barrio).material_select('update');

          $("#direccion_in").val($("#slideDireccion").data('fila1')['vdireccion']);
          Materialize.updateTextFields();
        
        
    });
</script>
{/literal}