<div class="card pequeño">
   <div class="row  pequeño" style="margin-bottom: 0px">
    <div class="col s12 m6 l6 pequeño">
        <label for="selectUser" >Elegir Usuario a Desplegar</label>
        
        <select id="selectUser" type="select" style="width: 70%">
            <option value="0">--Selecione un Usuario--</option>
            <?php foreach ($usr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>
    
    <div class="col s12 m6 l6 pequeño">
        <label for="selectType" >Elegir Tipo de Usuario a Desplegar</label>
        
        <select id="selectType" style="width: 70%">
            <option value="0">--Selecione un Tipo de Usuario--</option>
            <?php foreach ($tusr as $obj) { ?>
            <option value="<?php echo $obj[0] ?>"><?php echo $obj[1] ?></option>
            <?php } ?>
        </select>
    </div>

</div>
<div class="row pequeño hide">
    <div class="col s12 m12 l12 pequeño ">
      <table class="display table pequeño bordered highlight responsive-table striped centered" id="data-table-usuariosPermisos">
        <thead class="tab1">
            <tr>
                <th style="border: 0; border-radius: 0px !important;">Ventana</th>
                <th style="border: 0; border-radius: 0px !important;">Habilitar</th>
                <th style="border: 0; border-radius: 0px !important;">deshabilitar</th>
            </tr>
        </thead>
        <tbody id="lista">
            
        </tbody>
    </table>
</div>
</div>


<div id="listapermisos" class="row"></div>

</div>

<div id="modal-peruser" class="modal modal-fixed-footer mymodal">
  <div class="modal-content" style="padding-top: 0px; padding-bottom: 0px;">
    <h4 class="center tit_per"></h4>
   
    <div class="row _perlista">

    </div>

  </div>
  <div class="modal-footer">
    <a href="#!" class="modal-action waves-effect waves-green btn-flat modal-close">Salir</a>
  </div>
</div>

<script type="text/javascript">
    $(function(){
        let diviciones = getDatos('nombre,codigo',384,'1 order by nombre')[0]
        
        let strdiv = ''
        $.each(diviciones,(i,e)=>{
            strdiv += '<div class="col s6 m4 diviciones center" codigo="'+e[1]+'"> <span class="s12"><b>'+e[0]+'</b></span> <div class="sdiv"></div> </div>';
        })
        $("#listapermisos").html(strdiv)

        let lpermisos = getDatos('(select id from permisos where codigo=permisoscliente.codigo),nombre,href,substring(lpad(codigo,4,0),1,2) as indice',383,'isvisible order by nombre')[0]
        let strlista = ''
        
        $.each(lpermisos,(i,e)=>{
            strlista = '<div class="row"><div class="col s6 pername">'+ e[1]+' </div>  <div class="switch col s6"> <label> <input disabled vid="'+e[0]+'" class="perline" type="checkbox"> <span class="lever"></span> </label> <i class="mdi mdi-account mdi-24px shlistauser shlista pbtn"></i> <i class="mdi mdi-account-multiple mdi-24px shlistatipo shlista pbtn"></i> </div> </div>';

            $(".diviciones[codigo="+e[3]+"] .sdiv").append(strlista)
        })

        $(".sdiv").filter(function(){ return $(this).html() == ''}).parent().remove()
    })
</script>