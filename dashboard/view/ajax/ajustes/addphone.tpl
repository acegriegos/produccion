
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
      </ul>

      <input type="hidden" id="_idfila" value="{$smarty.post.arreglo.vidfila}">
      <input type="hidden" id="_idtabla" value="{$smarty.post.arreglo.vidtabla}">

</div>

{literal}
<script type="text/javascript">
    $(function(){
        $("#telefono_in").focus();
        
        if(!$("#ftelefonos .ciclos").length && parseInt($("#slideTelefono").data('idfila')) != parseInt($("#_idfila").val())){

            var telefonos = getDatos('',19,$("#_idfila").val()+","+$("#_idtabla").val(),0,0,0);
            console.log(telefonos)
            var str = '';
            $("#slideTelefono").data('idfila',$("#_idfila").val());

            for (var i = 0; i < telefonos[0].length; i++) {
                str += '<div id="tgl'+(i+1)+'}" class="chpphone chip ciclos" tp="'+telefonos[0][i][1]+'" country="'+telefonos[0][i][5]+'" gid="'+telefonos[0][i][0]+'"> <span id="t0_'+(i+1)+'}" class="_tel">'+telefonos[0][i][2]+'</span> <img id="ftpt0_'+(i+1)+'}" src="../assets/img/icon/'+telefonos[0][i][3]+'.png"> <i id="td_'+(i+1)+'}" class="close_phone mdi mdi-close right" style="cursor: pointer;"></i></div>';

               $("#slideTelefono").data('fila'+(i+1),{vtelefono:telefonos[0][i][2],vidtipotel:telefonos[0][i][1],vidtelefono:telefonos[0][i][0],vaccion:2,vidpais:telefonos[0][i][5]});  
            }
        }

        if ($("#slideTelefono").data('fila1') != undefined) {
            var num = $("#ftelefonos .ciclos").length +1;
            var tstr = '';
            while($("#slideTelefono").data('fila'+num) != undefined){
                var del = $("#slideTelefono").data('fila'+num)['vtelefono'].substring(0,1);
                var vtipo = del == 2 || del == 4 ? 2 : 3;
    
                if (vtipo == 1) { tipotel = 'home'; }else if (vtipo == 2) { tipotel = 'business'; }else if (vtipo == 3) { tipotel = 'phone'; }

                tstr += '<div id="tgl'+num+'" class="chpphone chip ciclos" tp="'+vtipo+'" country="'+$("#slideTelefono").data('fila'+num)['vidpais']+'" gid="'+$("#slideTelefono").data('fila'+num)['vid']+'"> <span id="t0_'+num+'" class="_tel">'+$("#slideTelefono").data('fila'+num)['vtelefono']+'</span> <img id="ftpt0_'+num+'" src="../assets/img/icon/'+tipotel+'.png"> <i id="td_'+num+'" class="close_phone mdi mdi-close right"></i></div>';
                num++;
            }

            $("#ftelefonos").html(tstr);
        }
    });
</script>
{/literal}