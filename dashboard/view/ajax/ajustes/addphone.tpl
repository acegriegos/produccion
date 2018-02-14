
<div class="row">
    <div class="col s12 input-field">
      <input type="text" id="pais" class="autocomplete">
      <input type="hidden" id="vidpais" value="52">
      <label for="pais">País</label>
    </div>

    <div class="input-field col s12">
      <select type="select" id="tptel">
        
      </select>
      <input type="hidden" id="htipo">
    </div>

    <div class="input-field col s12">
      <input type="text" class="validate tooltipped" id="telefono_in" data-mask="9999-9999" data-position="top" data-tooltip="Ingresar Teléfono con la Tecla [right]">
      <input type="hidden" id="vtelefono" fill="19">
      <label class="truncate" for="telefono_in">Ingresar Teléfono</label>
    <ul class="collection" vtabla="telefono" id="ftelefonos" hasTabla="1" tp="4" style="border: 0;"></ul>
  </div>
</div>

{literal}
<script type="text/javascript">
	$(function(){
		var tp = getDatos('*',4,'id > 0 order by id',0,0)[0];
		var sel = '<option value="" disabled selected>Seleccione Tipo de Teléfono</option>';
		
		for (var i = 0; i < tp.length; i++) {
			sel += '<option value="'+tp[i][0]+'">'+tp[i][1]+'</option>';
		}

		$("#tptel").html(sel);
		$("#tptel").material_select('update');

	});
</script>
{/literal}