<div class="input-field">
    <input type="text" id="correo_in" tp="1">
    <label for="correo_in">Ingresar Correo</label>
</div>
<ul class="collection col s12" id="fcorreos" style="border: 0;">
</ul>

<input type="hidden" id="_idfila" value="{$smarty.post.arreglo.vidfila}">
<input type="hidden" id="_idtabla" value="{$smarty.post.arreglo.vidtabla}">

{literal}
<script type="text/javascript">
    $(function(){
        $("#correo_in").focus();

        if(!$("#fcorreos .ciclos").length || $("#slideCorreo").data('idfila') != $("#_idfila").val()){

            var correos = getDatos('',18,$("#_idfila").val()+","+$("#_idtabla").val(),0,0,0);
            var str = '';
            $("#slideCorreo").data('idfila',$("#_idfila").val());

            for (var i = 0; i < correos[0].length; i++) {
                str += '<div id="cgl'+(i+1)+'" class="chpcrr chip ciclos" gid="'+correos[0][i][0]+'"><span class="vcoo" id="c0_'+(i+1)+'" style="font-size: 16px;font-weight: bold;">'+correos[0][i][3]+'}</span><i id="cd_'+(i+1)+'" class="close close_mail mdi mdi-close"></i></div> ';

                $("#slideCorreo").data('fila'+(i+1),{vaccion:2,vidcorreo:correos[0][i][0],vcorreo:correos[0][i][3]});   
            }
        }

        if ($("#slideCorreo").data('fila1') != undefined) {
            var num = 1;
            var cstr = '';
            while($("#slideCorreo").data('fila'+num) != undefined){
                cstr += '<div id="cgl'+num+'" class="chpcrr chip ciclos"><span class="vcoo" id="c0_'+num+'" style="font-size: 16px;font-weight: bold;">'+$("#slideCorreo").data('fila'+num)['vcorreo']+'</span><i id="cd_'+num+'" class="close close_mail mdi mdi-close"></i></div>';
                num++;
            }
            $("#fcorreos").html(cstr);
        }
    });
</script>
{/literal}