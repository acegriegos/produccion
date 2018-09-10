<div class="input-field">
    <input type="text" id="correo_in" tp="1">
    <label for="correo_in">Ingresar Correo</label>
</div>
<ul class="collection col s12" id="vfcorreos" style="border: 0;">
    
    {section name=LE loop=$CORS}
      <div id="cgl{$CORS[LE][0]}" class="chpcrr chip ciclos"><span class="vcoo" id="c0_{$CORS[LE][0]}">{$CORS[LE][3]}</span><i id="cd_{$CORS[LE][0]}" class="close close_mail mdi mdi-close"></i></div>
    {/section}
</ul>

{literal}
<script type="text/javascript">
    $(function(){
        $("#correo_in").focus();
    });
</script>
{/literal}