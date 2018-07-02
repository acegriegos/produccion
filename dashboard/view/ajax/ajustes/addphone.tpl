
<div class="row"

    <div class="col s12 input-field" style="margin: 0px;">
      <input type="text" id="pais" class="autocomplete pais" style="margin: 0px;">
      <input type="hidden" id="vidpais" value="52">
      <label for="pais">País</label>
    </div>

    <div class="input-field col s4" style="margin: 0px">
      <select type="select" id="vtp">
        
      </select>
    </div>

    <div class="input-field col s8" style="margin: 0px">
      <input type="text" class="validate tooltipped" id="telefono_in" data-mask="9999-9999" data-position="top" data-tooltip="Ingresar Teléfono">
      <label class="truncate" for="telefono_in">Ingresar Teléfono</label>
    </div>
      
      <ul class="collection col s12" id="vftelefonos" style="border: 0;">
        {section name=LE loop=$TELS}
          <div id="tgl{$TELS[LE][0]}" class="chpphone chip ciclos" tp="{$TELS[LE][1]}"> <span id="t0_'+cont+'" class="_tel">{$TELS[LE][2]}</span> <img id="ftpt0_{$TELS[LE][0]}" src="../assets/img/icon/{$TELS[LE][3]}.png"> <i id="td_{$TELS[LE][0]}" class="close_phone mdi mdi-close right"></i></div>
        {/section}
      </ul>

</div>

{literal}
<script type="text/javascript">
	$(function(){
		var tp = getDatos('*',4,'id > 0 order by id',0,0)[0];
		var sel = '';
		
		for (var i = 0; i < tp.length; i++) {
			sel += '<option value="'+tp[i][0]+'">'+tp[i][1]+'</option>';
		}

    //$("#tgl"+cont).data('triforce',{vaccion:1,vidtelefono:0,vidtipotel:vtipo,vtelefono:$("#telefono_in").val(),vidpais:52});
		$("#vtp").html(sel);
		$("#vtp").material_select('update');

	});
</script>
{/literal}
