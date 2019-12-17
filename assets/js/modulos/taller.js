$(function(){

    /*CARGAR REFERENTE A TALLER.AJUSTES EL TIPO DE TALLER 1-CICLO, 2-CARROS, 3-COMPUTADORAS*/

    $("#data-table-boletas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });

    $("#ingBol").click(function(){
        $("#tit").html('INGRESAR BOLETA');;
        var cons = getDatos('lpad(consecutivo102+1,7,0)',252,'idsucursal=@@impresa');
        $("#cons").html(cons[0][0][0]);
        $("._bcliente").val('').focus();
        $("#vidcliente").val(0);
        $("#vcomentario").val('');

        $("#listelm").html('')
        $("#belem").data('index',0);
        $("#listrep").html('');
        $("#brep").data('index',0);
        $("#listrub").html('');
        $("#brub").data('index',0);
        $("#listext").html('');
        $("#bext").data('index',0);
    });

    $("#belem").change(function(){
        var index = parseInt($("#belem").data('index'))+1;
        var ht = '<li id="l'+index+'">  <a href="#" vid="'+$('option:selected',this).val()+'" class="truncate elemento col s9" style="text-align: left;padding:0px;">'+$('option:selected',this).html()+' </a>  <i class="mdi mdi-close red-text delelem pbtn" title="Eliminar Elemento" style="float:right;padding:0px;"></i>  <i class="mdi mdi-information infoelem pbtn" style="float:right;padding:0px;" title="Editar Descripcion"></i> </li>';
        $("#listelm").append(ht);
        $(this).val(0)
        $("#belem").data('index',index);
        $("#l"+index+" .elemento").data('rep',{});
        $("#l"+index+" .elemento").data('rot',{});
        $("#l"+index+" .elemento").data('rub',{});
        $("#l"+index+" .infoelem").click();
        $("#listrep").html('');
        $("#brep").data('index',0);
        $("#listrub").html('');
        $("#brub").data('index',0);
        $("#listext").html('');
        $("#bext").data('index',0);
    });

    $("#addDescr").click(function(){
        $(".elemento.active").data('descr',$("#descrip").val());
        $("#modal-descr").modal('close');
        $("#brep").focus()
    });

    $("#addBol").click(function(){
        if(!$("._bcliente").val().trim().length){
            Materialize.toast('Cliente Requerido',4000,'red');
            $("._bcliente").focus();
            return false;
        }

        if(!$(".elemento").length){
            Materialize.toast('Elemento Requerido',4000,'red');
            $("#belem").focus();
            return false;
        }

        var comodin = parseInt($("#vidcliente").val()) == 0 ? $("._bcliente").val() : '';
        var idbol = getDatos('',507,'1,0,@@usr,@@impresa,'+$("#vidcliente").val()+',"'+comodin+'","'+$("#vcomentario").val()+'",""');
        
        if(idbol['succed'] == 1){
            Materialize.toast('Registro Ingresado Correctamente',4000,'green');
            window.open('taller?accion=4&pv=1&id='+idbol[0][0][0]);

            //arr('login','',506,'@@idsucursal,@@usr',0,1,'')
        }else{
            Materialize.toast(idbol[0]['ERROR'],4000,'red');
        }
    });

    $("#brep").keyup(function(e){
        var code = e.which || e.keyCode;
        if(code == 13 && $(this).val().length && $(".elemento.active").length){
            var index = parseInt($(this).data('index'))+1;
            var ht = '<li id="r'+index+'" style="border-bottom: 1px solid black;">  <span>'+$(this).val()+'</span>  <i class="mdi mdi-close red-text delrep pbtn" style="float:right;padding:0px;" title="Eliminar"></i>  <i class="mdi mdi-pencil editrep pbtn" style="float:right;padding:0px;" title="Editar"></i> </li>';
            $("#listrep").append(ht);
            $(this).data('index',index);

            $(".elemento.active").data('rep')[index] = $(this).val();
            $(this).val('');
        }

    });

    $("#bext").keyup(function(e){
        var code = e.which || e.keyCode;
        if(code == 13 && $(this).val().length && $(".elemento.active").length){
            var index = parseInt($(this).data('index'))+1;
            var ht = '<li id="u'+index+'" style="border-bottom: 1px solid black;">  <span>'+$(this).val()+'</span>  <i class="mdi mdi-close red-text delrep pbtn" style="float:right;padding:0px;" title="Eliminar"></i>  <i class="mdi mdi-pencil editrep pbtn" style="float:right;padding:0px;" title="Editar"></i> </li>';
            $("#listext").append(ht);
            $(this).data('index',index);

            $(".elemento.active").data('rot')[index] = $(this).val();
            $(this).val('');
        }

    });

    $("#ingElem").click(function(){
        $("#modal-addElem").modal('open');
        $("#addelem").focus();
    });

    var mhtml = '<label for="_bcliente">Cliente</label><input type="text" class="autocomplete _bcliente" style="margin: 0px" autocomplete="off"><input type="hidden" id="vidcliente" value="0" /> <a class="mdi mdi-16px mdi-plus text-green pbtn" id="ingclie" style="position: absolute;top:4px;right: 0px;border-radius: 100%;outline: none;padding-top: 2px;padding-right: 8px; z-index: 180;cursor: pointer;max-width: 0px;" title="Agregar Cliente"></a>';
    $(".bcliente").html(mhtml);

    $("#ingclie").click(function(){
        $("#modal-clientes").modal('open');
        $("#c-ced").focus();
        
    });

    $("._bcliente").on("keydown",function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        var prov = $(this).attr('bisprov') == undefined ? '': 'and bisproveedor=1';
        var elm = $(this)

        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            elm.autocomplete({
                limit: 10,
                data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2,", ",cedula),null',2,'id > 0 '+prov+' and concat(nombre," ",cedula) like \"%'+elm.val()+'%\" and idsucursal in(-1,@@impresa) limit 10',0,0,0,1),
                onAutocomplete: function(val){
                    $(".bcliente").blur();
                }
            });
            elm.siblings($(".autocomplete-content")).css('width','25%').css('margin-top','5px');
        }
    });

    $("._bcliente").blur(function(){
        var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2,", ",cedula) = "'+$(this).val()+'" and id > 0 and !bisproveedor and idsucursal = @@impresa',0,0,0);
        
        if (id[0].length){
            $("#vidcliente").val(id[0]);
            $("._bcliente").css('border-bottom','1px solid green');
        }
        else{
            $("#vidcliente").val(0);
            $("._bcliente").css('border-bottom','1px solid red');
        }
    });

    $("#addclie").click(function(){
        if($("#slideCorreo").data('fila1') == undefined){
            Materialize.toast('Correo sin Asignar',4000,'red');
            $("#slideCorreo").click();
            return false;
        }

        if(isNaN($("#c-dias").val())){
            Materialize.toast('Valor no Numérico',4000,'red');
            $("#c-dias").focus().select();
            return false;
        }
        if(isNaN($("#c-max").val())){
            Materialize.toast('Valor no Numérico',4000,'red');
            $("#c-max").focus().select();
            return false;
        }
        if(parseInt($("#c-dias").val()) <= 0 && $("#c-dias").is(":visible")){
            Materialize.toast('Valor Debe ser Mayor a Cero(0)',4000,'red');
            $("#c-dias").focus().select();
            return false;
        }

        var isprov = 0;

        var pr = getDatos('',172,'1,0,"","","'+$("#c-nom").val()+'","'+$("#c-ced").val()+'",'+$("#c-nom").attr('tipo')+',1,'+isprov+',0,'+$("#c-max").val()+','+$("#c-dias").val()+',0,1,"",@@usr,0,"",0,@@impresa,@id,1,0,0,""',0,0,0);

        if(guardarSlide(1,pr,2)){
            Materialize.toast('Cliente Agregado Exitosamente',4000,'green');
            $("._bcliente").val($("#c-nom").val()+', '+$("#c-ced").val());
            $("#slideDireccion").data('idbarrio',0);
            $("#slideDireccion").data('direccion','');
            $(".c-st").addClass('hide');
            $("#c-ced").val('');
            ind_2 = 0;
            ind_1 = 0;
            $("#modal-clientes").modal('close');
            $("._bcliente").focus();
            var e = jQuery.Event("keyup");
            e.which = 13;
            $("._bcliente").trigger(e);
        }
        
    });
});

$(document).on('click','.infoelem',function(){
    $("#modal-descr").modal('open');
    var elm = $(this).parent().find('.elemento');

    if(elm.data('descr') != undefined)
        $("#descrip").val(elm.data('descr'))
    else
        $("#descrip").val('')

    $(".elemento").removeClass('active');
    elm.addClass('active');
    $("#descrip").focus().select()
});

$(document).on('click','.delelem',function(){
    $(this).parent().remove();
});

$(document).on('click','.delrep',function(){
    $(this).parent().remove();
});

$(document).on('click','.elemento',function(){
    $(".elemento").removeClass('active');
    $(this).addClass('active');

    $("#listrep").html('');
    if($(this).data('rep') != ''){
        $.each($(this).data('rep'),function(ind,val){
            var ht = '<li id="r'+ind+'" style="border-bottom: 1px solid black;">  <span>'+val+'</span>  <i class="mdi mdi-close red-text delrep pbtn" style="float:right;padding:0px;" title="Eliminar"></i>  <i class="mdi mdi-pencil editrep pbtn" style="float:right;padding:0px;" title="Editar"></i> </li>';
            $("#listrep").append(ht);
            $("#brep").data('index',ind);
        });
    }else{
        $("#brep").data('index',0);
    }

    $("#listext").html('');
    if($(this).data('rot') != ''){
        $.each($(this).data('rot'),function(ind,val){
            var ht = '<li id="r'+ind+'" style="border-bottom: 1px solid black;">  <span>'+val+'</span>  <i class="mdi mdi-close red-text delrep pbtn" style="float:right;padding:0px;" title="Eliminar"></i>  <i class="mdi mdi-pencil editrep pbtn" style="float:right;padding:0px;" title="Editar"></i> </li>';
            $("#listext").append(ht);
            $("#bext").data('index',ind);
        });
    }else{
        $("#bext").data('index',0);
    }
    
    $("#listrub").html('');
    $("#brub").data('index',0);
})