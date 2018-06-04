$(document).ready(function(){
    $("#t1").click();
    $('.modal').modal();
    $("input#descfalla, textarea#danos, textarea#accesorios").characterCounter();
});

$(document).on("click",".menu",function(){
    var id = $(this).attr('id').substr(1);
    $(".menu").removeClass('active');
    $(this).addClass('active');
    switch(parseInt(id)) {
        case 1:
            var p = mantenimiento('taller',1,'');
            $("#mtaller").html(p);
            $(".zelda").data('triforce',{vid : 0,vidvehiculo : 0,vdanos : '',vaccesorios : '',vkm : 0,vgasolina : 0,vobservaciones : 0,vidmecanico : 0,vidusuario : 0,vidsucursal : ''});
            $("select").material_select();
            break;
        case 2:
            var p = mantenimiento('taller',2,'');
            $("#mtaller").html(p);
            $("#data-table-boletas").DataTable({
                bFilter: false,
                bScrollInfinite: true,
                bSort: false,
                bLengthChange: false,
                order: [],
                bPaginate: false,
                info: false
            });
            break;
        case 3:
            var p = mantenimiento('taller',3,'');
            $("#mtaller").html(p);
            $("#data-table-vehiculos").DataTable({
                bFilter: false,
                bScrollInfinite: true,
                bSort: false,
                bLengthChange: false,
                order: [],
                bPaginate: false,
                info: false
            });
            break;
    }
});

$(document).on("keyup","#mecanico",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#serv").focus();
    }
});

$(document).on("blur","#mecanico",function(){
    var nombre = $(this).val();
    var idmecanico = arr('login',4,'id',1,'nombre = "'+nombre+'" or user = "'+nombre+'"',0,0,0)[0][0];
    if (idmecanico != undefined) {
        $("#vidmecanico").val(idmecanico[0]);
        $(".zelda").data('triforce')['vidmecanico'] = idmecanico[0];
    }else{
        $("#vidmecanico").val(0);
    }
});

$(document).on("focus","#cant",function(){
    var precio = arr('login',4,'truncate(venta,2)',11,'nombre = "'+$("#prod").val()+'"',0,0,0)[0][0];
    $("#htot").val(precio);
    $("#tot").val(precio);
    Materialize.updateTextFields();
});

$(document).on("keyup","#cant",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        addprod();
        $("#tot").focus();
    }else if (code == 8) {
        $("#tot").val(0)
    }else{
        var cant = $(this).val();
        var precio = $("#htot").val();
        var total = parseFloat(cant * precio);
        $("#tot").val(total.toFixed(2));
    }
});

$(document).on("keyup","#prod",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#cant").val(1);
        $("#cant").select();
    }
});

$(document).on("click","#addserv",function(){
    var nombre = $("#serv").val();
    addserv(nombre);
});

$(document).on("click",".delserv",function(){
    var id = $(this).attr('id').substr(3);
    $("#dsrv"+id).remove();
});

$(document).on("click",".delprod",function(){
    var id = $(this).attr('id').substr(3);
    $("#prdct"+id).remove();
});

$(document).on("click",".editprod",function(){
    var id = $(this).attr('id').substr(2);
    $("#cant"+id).removeAttr('readonly');
    $("#cant"+id).select();
});

$(document).on("keyup","#serv",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var nombre = $(this).val();
        addserv(nombre);
    }
});

$(document).on("keyup","#vreferencia",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#mecanico").focus();
    }
});

$(document).on("blur","#vreferencia",function(){
    $(".zelda").data('triforce')['vreferencia'] = $(this).val();
});

$(document).on("keyup","#vkm",function(e){
    var code = e.which || e.keyCode;
    $(".zelda").data('triforce')['vkm'] = $(this).val();
    if (code == 13) {
        $("#vreferencia").focus();
    }
});

$(document).on("change","#gasolina",function(){
    $(".zelda").data('triforce')['vgasolina'] = $(this).val();
});

$(document).on("keyup","#descfalla",function(){
    $(".zelda").data('triforce')['vobservaciones'] = $(this).val();
});

$(document).on("change","#idmecanico",function(){
   $(".zelda").data('triforce')['vidmecanico'] = $(this).val(); 
});
// $(document).on("blur","#vkm",function(){
//     $(".zelda").data('triforce')['vkm'] = $(this).val();
// });

$(document).on("click","#infoVehiculo",function(){
    var idcliente = $("#iclie").val();
    var placa = '';
    if ($("#placa").attr('sel') == undefined) {
        if ($("#placa").val() != '') {
            placa = $("#placa").val();
        }else{
            Materialize.toast('Debe seleccionar una placa', 4000, 'red');
        }
    }else{
        if ($("#placa").val() != 0)
            placa = $("#placa option:selected").text();
        else
            Materialize.toast('Debe seleccionar una placa', 4000, 'red');
    }
    
    var carinfo = arr('login',4,'',504,idcliente+',"'+placa+'"',0,0,0)[0];
    $("#i1").val(carinfo[0][0]);
    $("#i2").val(carinfo[0][1]);
    $("#i3").val(carinfo[0][2]);
    $("#i4").val(carinfo[0][3]);
    $("#i5").val(carinfo[0][4]);
    $("#i6").val(carinfo[0][5]);
    $("#i7").val(carinfo[0][6]);
    $("#i8").val(carinfo[0][7]);
    Materialize.updateTextFields();
});

$(document).on("blur","#nclie",function(){
    var nom = $(this).val().substr(0,$(this).val().indexOf('*')-1);
    var id = arr('login',4,'id',2,'id > 0 and concat(nombre," ",apellido1," ",apellido2) = "'+nom+'"',0,0,0)[0][0];
    if (id != undefined) {
        $("#iclie").val(id);
    }else{
        if ($("#placa").attr('sel') != undefined) {
            $(this).parent().siblings().html('');
            $(this).parent().siblings().append('<input type="text" id="placa" class="validate"><label for="placa">Placa o VIN del vehículo</label>');
            $("#placa").focus();
        }

        $("#iclie").val(0);
    }
});

$(document).on("change","#placa",function(){
    if ($(this).attr('sel') != undefined) {
        if ($(this).val() != 0) {
            $("#vidvehiculo").val($(this).val());
            $("#infoVehiculo").addClass('modal-trigger');
            $(".zelda").data('triforce')['vidvehiculo'] = $(this).val();
            setTimeout(function(){$("#danos").focus()},200);
        }else
            $("#infoVehiculo").removeClass('modal-trigger');
    }
});

$(document).on("keyup","#placa",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        if ($(this).attr('sel') == undefined) {
            var cliente = arr('login',4,'',504,'0,"'+$(this).val()+'"',0,0,0)[0][0];
            if (cliente != undefined) {
                $("#nclie").val(cliente[0]);
                $("#iclie").val(cliente[8]);
                $("#vkm").focus();
                $("#infoVehiculo").addClass('modal-trigger');
                $(".zelda").data('triforce')['vidvehiculo'] = cliente[9];
                Materialize.updateTextFields();
            }else{
                $("#nclie").val('');
                $("#iclie").val(0);
                $("#infoVehiculo").removeClass('modal-trigger');
                $(this).select();
            }
        }
    }
});

$(document).on("blur","input#placa",function(){
    var car = arr('login',4,'',504,'0,"'+$(this).val()+'"',0,0,0)[0][0];
    if (car != undefined) {
        $(".zelda").data('triforce')['vidvehiculo'] = car[9];
    }
    
});

$(document).on("keyup","#nclie",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var nom = $("#nclie").val().substr(0,$(this).val().indexOf('*')-1);
        var id = arr('login',4,'id',2,'id > 0 and concat(nombre," ",apellido1," ",apellido2) = "'+nom+'"',0,0,0)[0][0];
        if (id != undefined) {
            var placa = arr('login',4,'id,placa',503,'idcliente = '+id,0,0,0)[0];
            if (placa.length > 1) {
                $("#placa").remove();
                $("label[for=placa]").remove();
                $(this).parent().siblings().append('<select type="select" id="placa" sel></select>');
                $(this).parent().siblings().children().append('<option value="0">Seleccione una placa</option>');
                for (var i = 0, len = placa.length; i < len; i++) {
                    $("#placa").append('<option value="'+placa[i][0]+'">'+placa[i][1]+'</option>');
                }
                $("#placa").material_select();
                $("#placa").prevAll('input.select-dropdown').trigger('open').focus();
            }else{
                if (placa[0] != undefined) {
                    $("#vidvehiculo").val(placa[0][0]);
                    $("#placa").val(placa[0][1]);
                    $("#vkm").focus();
                    $("#infoVehiculo").addClass('modal-trigger');
                }else{
                    Materialize.toast('Cliente no posee vehiculos,&nbsp&nbsp<a class="waves-effect waves-light white green-text btn modal-trigger" href="#modal-addcar">Agregar<a>', 5000, 'green');
                    $(this).select();
                }
            }
            Materialize.updateTextFields();
        }
    }else if (code == 8) {
        if ($(this).val() == '') {
            $(this).parent().next().html('');
            $(this).parent().siblings().first().append('<input type="text" id="placa" class="validate"><input type="hidden" id="vidvehiculo" value=""><label for="placa">Placa o VIN del vehículo</label>');
            $("#infoVehiculo").removeClass('modal-trigger');
            Materialize.updateTextFields();
        }
    }
});

$(document).on("keydown","#nclie",function(e){
	var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#nclie").autocomplete({
                limit: 10,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 10',0,0,0,1)
            });
        $("#nclie").siblings($(".autocomplete-content")).css('width','25%');
    } 
});

$(document).on("keyup","#danos",function() {
    $(".zelda").data('triforce')['vdanos'] = $(this).val()
});

$(document).on("keyup","#accesorios",function() {
    $(".zelda").data('triforce')['vaccesorios'] = $(this).val()
});



$(document).on("keydown",".servs",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $(".servs").autocomplete({
                limit: 10,
                data: arr('login',4,'',505,'0,""',0,0,0,1)
            });
        $(".servs").siblings($(".autocomplete-content")).css('width','25%');
    } 
});

$(document).on("keydown",".prods",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $(".prods").autocomplete({
                limit: 10,
                data: arr('login',4,'nombre,null',11,'id > 0 and nombre like "%'+$(this).val()+'%" limit 10',0,0,0,1)
            });
        $(".prods").siblings($(".autocomplete-content")).css('width','25%');
    } 
});

// autocomplete
$(document).on("keydown","#mecanico",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#mecanico").autocomplete({
                limit: 10,
                data: arr('login',4,'',506,'"'+$(this).val()+'",1',0,0,0,1)
            });
        $("#mecanico").siblings($(".autocomplete-content")).css('width','25%');
    } 
});

$(document).on("keyup",".cant",function(e) {
    var code = e.which || e.keyCode;
    var id = $(this).attr('id').substr(4);
    if (code == 13) {
        $("#prod").focus();
    }else if (code == 8) {
        $("#tot"+id).val(0);
    }
});

$(document).on("blur",".cant",function(e){
    var id = $(this).attr('id').substr(4);
    var cant = $(this).val();
    var prec = $("#htot"+id).val();
    var tot = parseFloat(cant * prec);
    $("#tot"+id).val(tot);
});

function addprod() {
    var count = $(".ciclos").length;
    var nombre = $("#prod").val();
    var cant = $("#cant").val();
    var total = $("#tot").val();
    var prod = arr('login',4,'id',11,'nombre = "'+nombre+'"',0,0,0)[0][0];
    if (prod != undefined) {
        count++
        $("#productos").append('<div class="row marginzero ciclos" id="db'+count+'"><div class="input-field col s5 m5 l5" style="width: 38%"><input type="text" id="prod'+count+'" class="autocomplete prods" value="'+nombre+'" readonly><label for="prod'+count+'">Producto</label></div><div class="input-field col s2 m2 l2" style="width: 13%"><input type="text" id="cant'+count+'" class="cant autocomplete" value="'+cant+'" readonly><label for="cant'+count+'">Cantidad</label></div><div class="input-field col s3 m3 l3"><input type="text" id="tot'+count+'" class="autocomplete" value="'+total+'" readonly><input type="hidden" id="htot'+count+'" value="'+total+'"><label for="tot'+count+'">Total</label><i class="mdi mdi-pencil prefix pbtn blueh editprod" id="ep'+count+'"></i><i class="mdi mdi-close prefix pbtn cdel delprod" id="prd'+count+'" style="margin-left:30px"></i></div></div>');
        $("#db"+count).data('triforce',{vid : 0,vidboleta : '?',vidservicio : 0,vidproducto : prod[0],vcantidad : cant,vsubtotal : total});
        Materialize.updateTextFields();
        // $(".zelda").dat('triforce')['vsubtotal'] = $("#htot").val();
        $("#prod").val('');
        $("#cant").val('');
        $("#tot").val('');
        setTimeout(function(){$("#prod").focus();},200);
    }else{
        Materialize.toast('Producto no existente', 4000, 'red');
        $("#cant").val('');
        setTimeout(function(){$("#prod").val('');$("#prod").focus();},100);
    }
}

function addserv(nom) {
    var count = $(".ciclos").length;
    var serv = arr('login',4,'id,precio',16,'if(locate("%",nombre),substr(nombre,1,locate("%",nombre)-2),nombre) = "'+nom+'"',0,0,0)[0][0];
    if (serv != undefined) {
        count++
        $("#servicios").append('<div class="input-field ciclos" id="db'+count+'"></i><input type="text" id="serv'+count+'" class="validate autocomplete servs" value="'+nom+'"><label for="serv'+count+'">Servicio</label><i class="mdi mdi-close prefix pbtn cdel delserv" id="dlt'+count+'"></div>');
        $("#db"+count).data('triforce',{vid : 0,vidboleta : '?',vidservicio : serv[0][0],vidproducto : 0,vcantidad : 0,vsubtotal : serv[0][1]});
        Materialize.updateTextFields();
        $("#serv").val('');
    }else{
        Materialize.toast('Servicio no existente', 4000, 'red');
        $("#serv").select();
    }
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    /*VALIDACION FRONT END*/
    switch(vmodulo['modulo']) {
        case 'taller-boleta':
            if (vmodulo['tip'] == '') {
                err = validarboleta();
                if ( err ) {
                    return err;
                }
            }
            break; 
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    return salida;

}

function validarboleta() {
    if ($(".zelda").data('triforce')['vidvehiculo'] == 0) {
        $("#nclie").focus();
        return "Placa del cliente requerido";
    }

    // if ($(".zelda").data('triforce')['vidmecanico'] == 0) {
    //     $("#mecanico").focus();
    //     return "Nombre del mecánico requerido";
    // }
    return false;
}

function cargar(vmodulo,vid) {
    switch(vmodulo['modulo']) {
        case 'mecanico':
            vmodulo['sel'] = '';
            vmodulo['tbl'] = 31;
            vmodulo['where'] = '';
            break;
        default:
            return 'Módulo no Existente';
            break;
    }

    return vmodulo;
}

function cargarSintax(modulo){
    var arr = {}
    switch(modulo) {
        case 'mecanicos':
            arr['sel'] = '';
            arr['tbl'] = 29;
            arr['where'] = '';
            break;
    }
    return arr;
}

function endDetail(vid,vacc,vmodulo) {
    switch(vmodulo) {
        case 'taller-boleta':
            if (vacc == 1) {
                deadclear(vmodulo);
                $("#nclie").parent().next().html('');
                $("#nclie").parent().next().html('<input type="text" id="placa" class="validate"><label for="placa">Placa o VIN del vehículo</label>');
                $("#nclie").parent().next().next().html('');
                $("#nclie").parent().next().next().html('<a class="waves-effect waves-light green btn right" href="#modal-infoVehiculo" id="infoVehiculo">Información</a>');
                $("#infoVehiculo").removeClass('modal-trigger');
                $("select").material_select();
                $("#danos").val('');
                $("#accesorios").val('');
                Materialize.updateTextFields();
                $(".validate").css('border-bottom', '1px solid #9e9e9e');
                $(".validate").css('box-shadow', 'none');
                $("#nclie").focus();
                // window.open('taller?accion=4&id='+vid);
                $(".zelda").data('triforce',{vid : 0,vidvehiculo : 0,vdanos : '',vaccesorios : '',vkm : 0,vgasolina : 0,vobservaciones : 0,vidmecanico : 0,vidusuario : 0,vidsucursal : ''});
            }
            break;
    }
}