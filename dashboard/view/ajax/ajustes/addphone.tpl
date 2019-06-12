
<div class="row">

    <div class="col s6 input-field" style="margin: 0px;">
      <input type="text" id="pais" class="autocomplete pais" style="margin: 0px;">
      <input type="hidden" id="vidpais" value="52">
      <label for="pais">País</label>
    </div>

    <div class="input-field col s6" style="margin: 0px">
      <input type="text" class="validate tooltipped" id="telefono_in" data-position="top" data-tooltip="Ingresar Teléfono" autocomplete="off">
      <label class="truncate" for="telefono_in">Ingresar Teléfono</label>
    </div>
      
      <ul class="collection col s12" id="ftelefonos" style="border: 0;">
        {section name=LE loop=$TELS}
          <div id="tgl{$smarty.section.LE.index+1}" class="chpphone chip ciclos" tp="{$TELS[LE][1]}" country="{$TELS[LE][5]}" gid="{$TELS[LE][0]}"> <span id="t0_{$smarty.section.LE.index+1}" class="_tel">{$TELS[LE][2]}</span> <img id="ftpt0_{$smarty.section.LE.index+1}" src="../assets/img/icon/{$TELS[LE][3]}.png"> <i id="td_{$smarty.section.LE.index+1}" class="close_phone mdi mdi-close right"></i></div>
        {/section}
      </ul>

</div>

{literal}
<script type="text/javascript">
    $(function(){
        $("#telefono_in").focus();

        $("#ftelefonos .ciclos").each(function(index){
          var id = $(this).attr('gid');
          $("#slideTelefono").data('fila'+(index+1),{vtelefono:$("#t0_"+(index+1)).html(),vidtipotel:$(this).attr('tp'),vidtelefono:id,vaccion:2,vidpais:$(this).attr('country')});
        });

        if ($("#slideTelefono").data('fila1') != undefined) {
            var num = $("#ftelefonos .ciclos").length +1;
            while($("#slideTelefono").data('fila'+num) != undefined){
                var del = $("#slideTelefono").data('fila'+num)['vtelefono'].substring(0,1);
                var vtipo = del == 2 || del == 4 ? 2 : 3;
    
                if (vtipo == 1) { tipotel = 'home'; }else if (vtipo == 2) { tipotel = 'business'; }else if (vtipo == 3) { tipotel = 'phone'; }

                $("#ftelefonos").append('<div id="tgl'+num+'" class="chpphone chip ciclos" tp="'+vtipo+'" country="'+$("#slideTelefono").data('fila'+num)['vidpais']+'" gid="'+$("#slideTelefono").data('fila'+num)['vid']+'"> <span id="t0_'+num+'" class="_tel">'+$("#slideTelefono").data('fila'+num)['vtelefono']+'</span> <img id="ftpt0_'+num+'" src="../assets/img/icon/'+tipotel+'.png"> <i id="td_'+num+'" class="close_phone mdi mdi-close right"></i></div>');
                num++;
            }
        }
    });
</script>
{/literal}