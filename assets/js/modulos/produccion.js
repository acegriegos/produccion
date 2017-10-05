var atiempo = [];
$(function(){
    $(".menu").click(function(){
        $(".menu").removeClass('active');
        $(this).addClass('active');
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)) {
            case 1:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',1,'');
                $("#mantproduccion").html(p);
                $("#data-table-procesos").DataTable({
                    bFilter : false,
                    bScrollInfinite : true,
                    bSort : false,
                    bLengthChange : false,
                    bPaginate :  false,
                    bInfo : false
                });
                // var spot = arr('login',4,'ifnull(max(id)+1,1)',119,'1',0,0,0)[0][0];
                // $("#spot").val(spot);
                // $("#count").val(spot);
                // QUEDA PARA VERSION 2.0
                $("#mantproduccion").removeClass('nopadding');
                setTimeout(function(){$("#vnombre").focus()},200);
                Materialize.updateTextFields();
                break;
            case 2:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',2,'');
                $("#mantproduccion").html(p);
                $("#data-table-tareaproducciones").DataTable({
                    bFilter : false,
                    bScrollInfinite : true,
                    bSort : false,
                    bLengthChange : false,
                    bPaginate :  false,
                    bInfo : false
                });
                $("#mantproduccion").addClass('nopadding');
                $("#ftareaproducciones .zelda").data('triforce',{vidusuario:'',vidsucursal:''});
                setTimeout(function(){$("#vnombre").focus()},200);
                // setTimeout(function(){$("#vproceso").focus()},200);
                break;
            case 3:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',3,'');
                $("#mantproduccion").html(p);
                $("#mantproduccion").removeClass('nopadding');
                setTimeout(function(){$("#proceso").focus()},200);
                break;
            case 4:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',4,'');
                $("#mantproduccion").html(p);
                $("#mantproduccion").removeClass('nopadding');
                break;
        }
        $('select').material_select();
        $('.collapsible').collapsible();
        $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '4%' // Ending top style attribute
        });
    });
    $("#data-table-procesos").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
    $("#m1").click();
});

$(document).ready(function(){
    $('select').material_select();
    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 200, // Transition out duration
        starting_top: '4%', // Starting top style attribute
        ending_top: '4%', // Ending top style attribute
        ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
            // ready
        }
    });
    $("#data-table-procesos").removeClass('hide');
});

$(document).on("click",".start",function(){
    var id = $(this).attr('id').substr(5);
    var tiempo = {
        hora: 0,
        minuto: 0,
        segundo: 0
    };
    $(this).prop('disabled',true);
    $("#stop"+id).prop('disabled',false);
    atiempo[id] = setInterval(function(){
        // Segundos
        tiempo.segundo++;
        if(tiempo.segundo >= 60) {
            tiempo.segundo = 0;
            tiempo.minuto++;
        }

        // Minutos
        if(tiempo.minuto >= 60) {
            tiempo.minuto = 0;
            tiempo.hora++;
        }
        $("#horas"+id).text(tiempo.hora < 10 ? '0' + tiempo.hora : tiempo.hora);
        $("#minutos"+id).text(tiempo.minuto < 10 ? '0' + tiempo.minuto : tiempo.minuto);
        $("#segundos"+id).text(tiempo.segundo < 10 ? '0' + tiempo.segundo : tiempo.segundo);
    }, 1000);
    var idproceso = $(this).attr('idproceso');
    var idlinea = $(this).attr('idlinea');
    var cantidad = $(this).attr('cantidad');
    var idtarea = $(this).attr('idtarea');
    var identity = arr('login',4,'',148,'1,0,'+idproceso+','+idlinea+','+cantidad,0,0,0)[0][0];
    arr('login',4,'',149,'1,0,1,'+idtarea+','+identity+',now(),@@usr,@@impresa',0,0,0);

});

$(document).on("click",".pause",function(){
    var id = $(this).attr('id').substr(5);
    clearInterval(atiempo[id]);
    $(this).addClass('hide');
    $("#start"+id).removeClass('hide');
});

$(document).on("click",".stop",function(){
    var id = $(this).attr('id').substr(5);
    clearInterval(atiempo[id]);
    $(this).prop('disabled',true);
    $("#start"+id).prop('disabled',false);
});

$(document).on("click",".nexttask",function(){
    var id = $(this).attr('id').substr(1);
});

// $(document).on("keydown","#cprod",function(e){
//     var charCode = e.which || e.keyCode;
//     var charStr = String.fromCharCode(charCode);
//     if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
//         $(".autocomplete-content").remove();
//             $("#cprod").autocomplete({
//                 limit: 10,
//                 data: console.log(arr('login',4,'nombre,null',11,'nombre like "%'+$(this).val()+'%" limit 10',0,0,0,1))
//             }); 
//         $("#cprod").siblings($(".autocomplete-content")).css('width','25%');
//     }
// });
$(document).on("keydown","#cprod",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#cprod").autocomplete({
                limit: 10,
                data: arr('login',4,'',198,'1,"'+$(this).val()+'",0',0,0,0,1)
            });
        $("#cprod").siblings($(".autocomplete-content")).css('width','25%');
    } 
});




$(document).on("keyup","#cprod",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        chargeprod($(this).val());
        var prod = arr('login',4,'id,nombre,codigo',11,'nombre = "'+$(this).val()+'"',0,0,0)[0][0];
        makeprocess(parseInt(prod[0]),prod[1],prod[2],'b');
    }
});

$(document).on("click","#chargeprod",function(){
    chargeprod($("#cprod").val());
});

$(document).on("keydown","#proceso",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    autocomplete(charCode,charStr,'proceso',146);
});

$(document).on("keydown","#proc",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    autocomplete(charCode,charStr,'proceso',146);
});

$(document).on("keydown","#tsk",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    autocomplete(charCode,charStr,'tsk',134);
});

$(document).on("keyup","#proceso",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        arr('login',6,'',197,'"'+$(this).val()+'"',0,1,$("#listatareaxprocesos"));
        $("#data-table-tareaxprocesos").show(500);
        $("#cantidad").val(1);
        $("#cantidad").select();
    }
});

$(document).on("blur","#proceso",function(){
    var id = arr('login',4,'id',11,'nombre = "'+$(this).val()+'"',0,0,0)[0][0];
    if (id != undefined) {
        var idlinea = arr('login',4,'idlinea,idproducto',146,'nombre = "'+$(this).val()+'"',0,0,0)[0][0];
        $("#idlinea").val(idlinea[0]);
        $("#idproceso").val(idlinea[1]);
        Materialize.updateTextFields();
        $(this).css('border-bottom','1px solid #4CAF50');
        $(this).css('box-shadow','0 1px 0 0 #4CAF50');
    }else{
        $("#idproceso").val(0);
        if ($(this).val() != '')
            $(this).css('border-bottom','1px solid #9e9e9e');
            $(this).css('box-shadow','none');
    }
});

// $(document).on("keyup","#linea",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13)
//         $("#cantidad").val(1);
//         $("#cantidad").select();
// });

$(document).on("keyup","#cantidad",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        addprocess($("#idproceso").val(),$("#proceso").val(),$("#idlinea").val(),parseInt($(this).val()));
});

$(document).on("click","#toBuy",function(){
    window.open('facturacion?tf=2')
});

$(document).on("click",".productline",function(){
    var tata = parseInt($(this).parent().attr('id').substr(2));
    switch(tata) {
        case 1:
            arr('login',6,'id,nombre,horahombre,horamaquina',134,'id > 0 order by nombre limit 10',0,1,$("#listatareaproducciones"));
            $("#vnombre").focus();
            break;
        case 2:
            $("#vproceso").focus();
            break;
        case 3:
            arr('login',6,'idlinea,idproceso,proceso',137,'1',0,1,$("#listamantlinea"));
            break;
    }
});

$(document).on("keyup",".tarea",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        addprodline($(this).attr('id').substr(0,1));
});

$(document).on("keydown",".tarea",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    var tipo = $(this).attr('id').substr(0,1);
    autocomplete(charCode,charStr,tipo+'tarea',134);
});

$(document).on("click","#chrecipe",function(){
    var tabla = $("#data-table-search").DataTable();
    tabla.destroy();
    arr('login',6,'',129,'""',0,1,$("#listasearch"));
    $('#modal-search').modal('open');
    $("#data-table-search").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
    $(".selproceso").addClass('chselproceso');
    $(".chselproceso").removeClass('selproceso')
});

// $(document).on("keyup","#vnomlinea",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13) {
//         $("#nl").text($(this).val());
//         $("#atarea").focus();
//     }

// });

$(document).on("click","#addprodline",function(){
    addprodline("a");
});

$(document).on("click",".order",function(){
    var id = $(this).attr('id').substr(7);
    var orden = $("#asorder"+id).text();
    $("#asorder"+id).addClass('hide');
    $("#aeorder"+id).attr('type','number');
    $("#aeorder"+id).val(orden).select();
});

$(document).on("blur",".horder",function(){
    var id = $(this).attr('id').substr(7);
    var orden = $(this).val();
    $(this).attr('type','hidden');
    $("#asorder"+id).removeClass('hide');
    $("#asorder"+id).text(orden);
    $("#atorder"+id).attr('orden',orden);
});

$(document).on("click","#changerecipe",function(){
    $('#modal-search').modal('open');
    var tabla = $("#data-table-search").DataTable();
    tabla.destroy();
    arr('login',6,'',129,'""',0,1,$("#listasearch"));
    $("#data-table-search").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
});

$(document).on("click","#savelinea",function(){
    var idproceso = $(".nameproceso").attr('id').substr(1);
    var idlinea = arr('login',4,'',132,'1,0,'+idproceso+',@@usr,@@impresa',0,0,0);

    if (idlinea[0]['ERROR'] == undefined) {
        $(".aplines").each(function(){
            var idtarea = $(this).attr('id').substr(2);
            var order = $("#atorder"+idtarea).attr('orden');
            arr('login',4,'',131,'1,0,'+idtarea+','+idlinea[0][0]+','+order+',@@usr,@@impresa',0,0,0);
        });
        $("#listadetalles").html('');
        $("#tablelineas").addClass('hide');
        $(".dcline").addClass('hide');
        $("#drecipe").removeClass('hide');
        $("#nac").removeClass('hide');
        Materialize.toast('Linea de produccion guardada correctamente', 6000, 'green');
    }else{
        Materialize.toast(idlinea[0]['ERROR'], 6000, 'red');
    }
});

$(document).on("click","#dsavelinea",function(){
    var idproceso = $(".nameproceso").attr('id').substr(1);
    var nombre = $("#nombrelinea").val();
    var idlinea = arr('login',4,'',132,'1,0,'+idproceso+',@@usr,@@impresa',0,0,0);

    if (idlinea[0]['ERROR'] == undefined) {
        $(".bplines").each(function(){
            var idtarea = $(this).attr('id').substr(2);
            var order = $("#btorder"+idtarea).attr('orden');
            arr('login',4,'',131,'1,0,'+idtarea+','+idlinea[0][0]+','+order+',@@usr,@@impresa',0,0,0);
        });
        Materialize.toast('Linea de produccion '+nombre+' Guardada Correctamente', 6000, 'green');
    }else{
        Materialize.toast(idlinea[0]['ERROR'], 6000, 'red');
    }
});

$(document).on("click",".actlinea",function(){
    var id = $(this).attr('id').substr(1);
    var idproceso = $(this).attr('idproceso');
    var detalle = arr('login',4,'',138,id+','+idproceso,0,0,0)[0];
    var autoinc = 0;
    $("#actrec").val(detalle[0][2]);
    $("#actrec").attr('idproceso',detalle[0][1])
    $("#listadetprod").html('');

    for (var i = 0, len = detalle.length; i < len; i++) {
        $("#listadetprod").append('<tr class="bplines" id="bp'+detalle[i][3]+'"><td id="btask'+detalle[i][3]+'">'+detalle[i][4]+'</td><td id="besth'+detalle[i][3]+'" esth="'+detalle[i][6]+'">'+detalle[i][6]+'</td><td id="bestm'+detalle[i][3]+'" estm="'+detalle[i][7]+'">'+detalle[i][7]+'</td><td id="bband'+detalle[i][3]+'" bandejas="'+detalle[i][8]+'">'+detalle[i][8]+'</td><td orden="'+detalle[i][9]+'" id="btorder'+detalle[i][3]+'"><span class="order" id="bsorder'+detalle[i][0]+'">'+detalle[i][9]+'</span><input type="hidden" class="horder" id="beorder'+detalle[i][3]+'"></td><td><i class="material-icons btn-color pbtn cdel deltarea" id="bdel'+detalle[i][3]+'">close</i></td></tr>');
        autoinc++;
    }

    $("#bautoinc").val(autoinc);

    // <tr class="bpline" id="bp'+detalle[i][3]+'"><td id="btask'+detalle[i][3]+'">'+detalle[i][4]+'</td><td id="best'+detalle[i][3]+'" estimado="'+detalle[i][5]+'">'+detalle[i][6]+'</td><td id="buni'+detalle[i][3]+'" idunidad="'+detalle[i][6]+'">'+detalle[i][8]+'</td><td orden="'+detalle[i][8]+'" id="btorder'+detalle[i][3]+'"><span class="order" id="bsorder'+detalle[i][3]+'">'+detalle[i][9]+'</span><input type="hidden" class="horder" id="beorder'+detalle[i][3]+'"></td><td><i class="material-icons btn-color pbtn cdel deltarea" id="bdel'+detalle[i][3]+'">close</i></td></tr>

    Materialize.updateTextFields();
    $("#dactrec").removeClass('hide');
    $("#atarea").focus();
});

$(document).on("click",".viewproceso",function(){
    var id = $(this).attr('id').substr(1);
    var tabla = $("#data-table-detalleprocesos").DataTable();
    tabla.destroy();
    arr('login',6,'',130,id,0,1,$("#listadetalleprocesos"));
    $('#modal-detalleprocesos').modal('open');
    $("#data-table-detalleprocesos").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
});

$(document).on("click","#searchprocesos",function(){
    var nombre = $("#vproceso").val();
    var tabla = $("#data-table-search").DataTable();
    tabla.destroy();
    arr('login',6,'',129,'\"'+nombre+'\"',0,1,$("#listasearch"));
    $('#modal-search').modal('open');
    $("#data-table-search").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
});

$(document).on("click",".selproceso",function(){
    var id = $(this).attr('id').substr(1);
    var proceso = arr('login',4,'id,nombre',11,'id = '+id,0,0,0)[0][0];
    $('#modal-search').modal('close');
    $("#drecipe").addClass('hide');
    $(".dcline").removeClass('hide');
    $(".nameproceso").text('');
    $(".nameproceso").attr('id','r'+id);
    $(".nameproceso").append(proceso[1]+'<a class="material-icons pbtn blue-text mbutton" id="changerecipe" href="#modal-search">search</a>');
    $("#atarea").focus();
});

$(document).on("keyup","#vproceso",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var nombre = $(this).val();
        var proceso = arr('login',4,'',139,'\"'+nombre+'\"',0,0,0)[0];
        if (proceso[0][2] == null) {
            if (proceso != '') {
                $("#drecipe").addClass('hide');
                $(".dcline").removeClass('hide');
                $("#tablelineas").removeClass('hide');
                $(".nameproceso").text('');
                $(".nameproceso").attr('id','r'+proceso[0][0]);
                $(".nameproceso").append(proceso[0][1]+'<a class="material-icons pbtn blue-text mbutton" id="changerecipe" href="#modal-search">search</a>');
                $(this).val('');
                $("#atarea").focus();
            }else{
                   Materialize.toast('Proceso "'+nombre+'" no Existente', 4000, 'red');
            }
        }else{
             Materialize.toast('Ya existe una linea de produccion asignada a esta proceso', 6000, 'amber lighten-2');
             $(this).val('');
        }
    }
});

$(document).on("keydown","#vproceso",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    autocomplete(charCode,charStr,'vproceso',99);
});

// $(document).on("keyup","#anombre",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13) {
//         $("#tablelineas").removeClass('hide');
//         var nombre = $(this).val();
//         var proceso = $("#vproceso").val();
//         $("#nomlinea").text(nombre);
//         $("#nomproceso").text(proceso);
//         $(".faddline").prop('disabled',false);
//         $("#aunidad").material_select();
//         $("#atarea").focus();
//     }
// });

$(document).on("click",".chselproceso",function(){
    var id = $(this).attr('id').substr(1);
    var proceso = arr('login',4,'id,nombre',11,'id = '+id,0,0,0)[0][0];
    $('#modal-search').modal('close');
    $("#actrec").val('');
    $("#actrec").attr('idproceso',proceso[0])
    $("#actrec").val(proceso[1]);
    $("#nombrelinea").focus();

});

$(document).on("click",".load[modulo=lineaproduccione]",function(){
    $("#addlinea").attr('id','actlinea');
    $("#actlinea").removeClass('add');
    $("#actlinea").addClass('edit');
    $("#actlinea").text('save');
});

$(document).on("click","#actlinea",function(){
    $("#actlinea").attr('id','addlinea');
    $("#addlinea").removeClass('edit');
    $("#addlinea").addClass('add');
    $("#addlinea").text('add');
});

$(document).on("click",".instoproduct",function(){
    var def = arr('login',4,'nombre',111,'id = 6',0,0,0)[0][0];
    var idprod = $(this).attr('id').substr(1);
    $("#savetoprod").attr('idproducto',idprod);
    $("#inventdefault").text(def);
    var exist = arr('login',4,'count(id)',11,'id = '+idprod+' and idmarca = 0',0,0,0)[0][0];
    if (exist != 0) {
        $("#noisprdct").removeClass('hide');
        $("#alrdyisprdct").addClass('hide');
        $("#savetoprod").removeClass('hide');
    }else{
        $("#alrdyisprdct").removeClass('hide');
        $("#noisprdct").addClass('hide');
        $("#savetoprod").addClass('hide');
    }
});

$(document).on("click","#savetoprod",function(){
    var idproducto = $(this).attr('idproducto');
    var idmarca = $("#vidmarca").val();
    var minimo = $("#vminimo").val();
    var maximo = $("#vmaximo").val();
    var descuento = $("#vmaxdesc").val();
    var ganancia = $("#vganancia").val();

    var validacion = validartoprod();
    if (validacion == false) {
        var upd = arr('login',4,'',122,idproducto+','+idmarca+','+minimo+','+maximo+','+descuento+','+ganancia,0,0,0);
        Materialize.toast('proceso Agregada a Productos', 4000, 'green');
    }else{
        Materialize.toast(validacion, 4000, 'red');
    }

});

$(document).on("keyup","#vgasto",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#vprecphora").focus();
    }
});

$(document).on("keyup","#vprecio",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {

    }
});

$(document).on("click","#addprocess",function(){
    var id = parseInt($("#count").val());
    var nombre = $("#vnombre").val();
    var codigo = $("#vcodigo").val();
    makeprocess(id,nombre,codigo,'a');
});

$(document).on("keyup","#vnombre",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#vcodigo").focus();
});

$(document).on("keyup","#vnombre[ku=1]",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#vhombre").focus();
    }
});

$(document).on("keyup","#vhombre",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#vidunidad1").prevAll('input.select-dropdown').trigger('open').focus();
});

$(document).on("change","#vidunidad1",function(){
    setTimeout(function(){
        $("#vmaquina").focus();
    },100);
});

$(document).on("keyup","#vmaquina",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#vidunidad2").prevAll('input.select-dropdown').trigger('open').focus();
});

$(document).on("change","#vidunidad2",function(){
    setTimeout(function(){
        $("#vbandejas").focus();
    },100);
});

$(document).on("keyup","#vbandejas",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#addlinea").click();
});

$(document).on("keyup","#vcodigo",function(e){
    var code = e.which || e.keyCode;
    var id = parseInt($("#acount").val());
    var nombre = $("#vnombre").val();
    var codigo = $(this).val();
    if (code == 13)
        makeprocess(id,nombre,codigo,'a');

});

$(document).on("keydown",".vproducto",function(e){
    var tipo = $(this).attr('id').substr(0,1);
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $('#'+tipo+'producto').autocomplete({
                limit: 10,
                data: arr('login',4,'',77,'0,0,1,"'+$(this).val()+'"',0,0,0,1)
            });
        $('.'+tipo+'producto').siblings($(".autocomplete-content")).css('width','25%');
    }

    if (charCode == 13) {
        setTimeout(function(){$("#"+tipo+"cantidad").focus();},100);
    }
});

$(document).on("keyup",".vcantidad",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var tipo = $(this).attr('id').substr(0,1);
        $("#"+tipo+"idunidad").prevAll('input.select-dropdown').trigger('open').focus();
    }
});

// $(document).on("change",".vidunidad",function(){
//     var tipo = $(this).attr('id').substr(0,1);
//     var nombre = $("#"+tipo+"producto").val();
//     var cantidad = $("#"+tipo+"cantidad").val();
//     var idunidad = $("#"+tipo+"idunidad").val();
//     var medida = $("#"+tipo+"idunidad option:selected").attr('unidad');
//     var prod = arr('login',4,'id,replace(precio,",","")',116,'nombre = \"'+nombre+'\"',0,0,0)[0][0];
//     if (prod != undefined) {
//         var precio = convert(prod[0],cantidad,idunidad,prod[1]);
//         addproduct(nombre,cantidad,idunidad,medida,precio,tipo);
//     }else{
//         Materialize.toast('Nombre de Producto no Valido', 4000, 'red');
//         $("#"+tipo+"cantidad").val('');
//         $("#"+tipo+"producto").select();
//     }
// });

$(document).on("click",".addproduct",function(){
    var tipo = $(this).attr('tipo');
    var nombre = $("#"+tipo+"producto").val();
    if (nombre.substr(0,1) != '[') {
        nombre = nombre.substr(0,nombre.indexOf('-'));
    }else{
        nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
    }
    var cantidad = $("#"+tipo+"cantidad").val();
    var idunidad = $("#"+tipo+"idunidad").val();
    var medida = $("#"+tipo+"idunidad option:selected").attr('unidad');
    var prod = arr('login',4,'',116,'0,"'+nombre+'"',0,0,0);
    // id,replace(precio,",","") as precio
    if (prod['succed'] == 1) {
        if (prod[0][0] != undefined) {
            prod = prod[0][0]
            var precio = convert(prod[0],cantidad,idunidad,prod[3]);
            addproduct(nombre,cantidad,idunidad,medida,precio,tipo);
        }else{

        }


    }else{
        Materialize.toast('Nombre de Producto no Valido', 4000, 'red');

        $("#"+tipo+"cantidad").val('');
        $("#"+tipo+"producto").select();
    }
});

$(document).on("blur","#vproducto",function(){
    var nombre = $(this).val();
    var idunidad = arr('login',4,'idunidad',116,'nombre = \"'+nombre+"\"",0,0,0)[0][0];
    $("#vidunidad").val(idunidad);
    $('select').material_select();
});

$(document).on("click",".titrecipe",function(){
    var id = $(this).attr('id').substr(9);
    var nombre = $(this).text();
    $("#vnombre").val(nombre)
    $("#spot").val(id);
    Materialize.toast('proceso '+nombre+' Seleccionada', 4000, 'green');
});

$(document).on("click",".del",function(){
    var id = $(this).attr('id').substr(2);
    var tipo = $(this).attr('id').substr(0,1);
    var spot = $("#"+tipo+"prec"+id).attr('spot');
    Materialize.toast('Desea Borrar este Producto?&nbsp;&nbsp;&nbsp;<button type="button" class="waves-effect waves-light btn blue accept" id="'+tipo+'acc'+id+'" spot="'+spot+'"><i class="mdi mdi-check mdi-24px"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close mdi-24px"></i></button>', 10000, 'rounded');
});

$(document).on("click",".deltarea",function(){
    var id = $(this).attr('id').substr(4);
    var tipo = $(this).attr('id').substr(0,1);
    Materialize.toast('Desea Borrar esta Tarea?&nbsp;&nbsp;&nbsp;<button type="button" class="waves-effect waves-light btn blue acctar" id="acc'+id+'" tipo="'+tipo+'"><i class="mdi mdi-check mdi-24px"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close mdi-24px"></i></button>', 10000, 'rounded');
});

$(document).on("click",".acctar",function(){
    var id = $(this).attr('id').substr(3);
    var tipo = $(this).attr('tipo');
    $("#"+tipo+"p"+id).remove();
    $('#toast-container').remove();
});

$(document).on("click",".cancel",function(){
    $('#toast-container').remove();
});

$(document).on("click",".accept",function(){
    var tipo = $(this).attr('id').substr(0,1);
    var id = $(this).attr('id').substr(4);
    var spot = $(this).attr('spot');
    var prectot = 0;
    $('#toast-container').remove();
    $("#"+tipo+"p"+id).remove();
    $("."+tipo+"product").each(function(){
        var idprod = $(this).attr('id').substr(5);
        if ($("#"+tipo+"prec"+idprod).attr('spot') == spot) {
            var precio = parseFloat($("#"+tipo+"prec"+idprod).val());
            prectot += precio;
        }
    });
    $("#"+tipo+"total"+spot).text('¢ '+prectot.toFixed(2));
    $("#"+tipo+"htotal"+spot).val('¢ '+prectot.toFixed(2));
});

$(document).on("click",".deltit",function(){
    var id = $(this).attr('id').substr(3);
    var tipo = $(this).attr('id').substr(0,1);
    Materialize.toast('Desea Borrar esta proceso? <button type="button" class="waves-effect waves-light btn blue acctit" id="'+tipo+'acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".delproceso",function(){
    var id = $(this).attr('id').substr(1);
    Materialize.toast('Desea Eliminar esta proceso? <button type="button" class="waves-effect waves-light btn blue acctit" id="accdelrec'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".accdelrec",function(){
    var id = $(this).attr('id').substr(9);
    $('#toast-container').remove();
    // arr('login',4,'',120,'3,'+id+',"",0,0,0',0,0,0);
    arr('login',6,'idproceso,producto,precioventa',99,'id > 0 order by nombre limit 20',0,1,$("#listaprocesos"));

});

$(document).on("click",".saveproceso",function(){
    var id = $(this).attr('id').substr(3);
    var tipo = $(this).attr('id').substr(0,1);
    var nombre = $("#"+tipo+"titproceso"+id).text();
    var codigo = $("#"+tipo+"codproceso"+id).text() == '' ? 'N/A' : $("#"+tipo+"codproceso"+id).text();
    var total = $("#"+tipo+"total"+id).text().substr(2);
    var imp = arr('login',4,'',200,'11,0',0,0,0)[0][0][3];
    var idproceso = 0;

    if (total != '0.00') {
        var prod =  arr('login',4,'id',11,'nombre = "'+nombre+'"',0,0,0)[0][0];
        if (prod == undefined) {
            //guarda proceso en tabla prodcutos
            idproceso = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+(total * ((imp/100)+1) )+',0,0,1,1,0,0,0,7,@@usr,1,@@impresa,""',0,0,0);
        }else{
            var inv = arr('login',4,'id',97,'idproducto = '+id+' and idinventario = 7',0,0,0)[0][0];
            if (inv != undefined) {
                arr('login',7,'1',97,'','null,7,'+id+',0',0,0);
            }
            idproceso = id;
        }
        if (idproceso[0] != '[object Object]') {
            //guarda productos de la proceso
            $("."+tipo+"product").each(function(){
                var idproducto = $(this).attr('id').substr(5);
                if ($("#"+tipo+"prec"+idproducto).attr('spot') == id) {
                    var cantidad = $("#"+tipo+"cant"+idproducto).text();
                    var idunidad = $("#"+tipo+"idmedida"+idproducto).attr('medida');
                    arr('login',4,'',121,'1,0,'+idproceso[0][0]+','+idproducto+','+cantidad+','+idunidad+',@@usr,@@impresa',0,0,0);
                }
            });
            arr('login',6,'idproceso,proceso,precioventa',99,'idproceso > 0 order by proceso limit 20',0,1,$("#listaprocesos"));
            $("#"+tipo+"makerecipe").html('');
            $("#vnombre").val('');
            $("#vcodigo").val('');
            $("#"+tipo+"daddprod").addClass('hide');
            $(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
            Materialize.toast('Proceso Guardado Correctamente', 6000, 'green');
        }else{
            Materialize.toast(idproceso[0]['ERROR'], 6000, 'red');
        }
    }else{
        Materialize.toast('Es necesario agregar productos al proceso', 6000, 'orange lighten-2');
    }
});

$(document).on("click",".actrecipe",function(){
    var id = $(this).attr('id').substr(3);
    var nombre = $("#atitproceso"+id).text();
    var codigo = $("#acodproceso"+id).text() == '' ? 'N/A' : $("#acodproceso"+id).text();
    var total = $("#atotal"+id).text().substr(2);
    var imp = arr('login',4,'',200,'11,0',0,0,0)[0][0][3];
    if (total != '0.00') {
        //guarda proceso en tabla productos
        // cargar el codigo interno y ganancia en un hide para actualizar
        var idproceso = arr('login',4,'',78,'2,'+id+',\"'+codigo+'\",\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+(total * ((imp/100)+1) )+',0,0,1,1,0,0,0,7,@@usr,1,@@impresa,null',0,0,0);
        if (idproceso[0] != '[object Object]') {
            //borrar todos los productos de la proceso
            arr('login',4,'',121,'3,0,'+idproceso[0][0]+',0,0,0,@@usr,@@impresa',0,0,0);
            //guarda productos de la proceso
            $(".aproduct").each(function(){
                var idproducto = $(this).attr('id').substr(4);
                if ($("#aprec"+idproducto).attr('spot') == id) {
                    var cantidad = $("#acant"+idproducto).text();
                    var idunidad = $("#aidmedida"+idproducto).attr('medida');
                    arr('login',4,'',121,'1,0,'+idproceso[0][0]+','+idproducto+','+cantidad+','+idunidad+',@@usr,@impresa',0,0,0);
                }
            });
            $(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
            Materialize.toast('Proceso '+nombre+' Agregada Correctamente', 6000, 'green');
        }else{
            Materialize.toast(idproceso[0]['ERROR'], 6000, 'red');
        }
        arr('login',6,'idproceso,proceso,precioventa',99,'idproceso > 0 order by proceso limit 20',0,1,$("#listaprocesos"));
        $("#amakerecipe").html('');

    }else{
        Materialize.toast('Es necesario agregar productos al proceso', 6000, 'orange lighten-2');
    }
});

$(document).on("click",".editproceso",function(){
    var id = $(this).attr('id').substr(1);
    var vproceso = arr('login',4,'idproceso,proceso,codigo,precioventa,preciocosto',99,'idproceso = '+id,0,0,0)[0][0];
    var detalle = arr('login',4,'',119,id,0,0,0)[0];
    var rnombre = vproceso[1].replace(/\s+/g, '');
    var count = parseInt($("#count").val());
    var precioconv = 0;
    count += 1;
    $("#edtitcod").removeClass('hide');
    $("#addprocess").addClass('hide');
    $("#edtitcod").attr('proceso',id);
    $("#vnombre").val(vproceso[1]);
    $("#vcodigo").val(vproceso[2]);
    $("#spot").val(id);
    $("#count").val(count);
    $("#amakerecipe").html('');
    $("#amakerecipe").append('<div class="col s12 m12 l12 recipes" id="ar'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="aproductos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="atitproceso'+id+'" class="titrecipe but">'+vproceso[1]+'</span> - [Cod: <span id="acodproceso'+id+'">'+vproceso[2]+'</span>]<i class="material-icons deltit right pbtn cdel btn-color" id="adt'+id+'">close</i><i class="material-icons actrecipe right pbtn blueh btn-color" id="aar'+id+'">save</i></h4></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="atotal'+id+'">¢ '+vproceso[4]+'</span><input type="hidden" id="ahtotal'+id+'" value="'+vproceso[4]+'"></h4></div></div></div></div>');
    for (var i = 0, len = detalle.length; i < len; i++) {
        precioconv = convert(detalle[i][1],detalle[i][5],detalle[i][8],detalle[i][4]);
        $("#aproductos"+id).append('<li class="collection-item dismissable" id="ap'+detalle[i][1]+'"><div id="agroupprodcts'+detalle[i][1]+'"><span id="aprod'+detalle[i][1]+'" class="aproduct">'+detalle[i][3]+'</span><input type="hidden" id="aprec'+detalle[i][1]+'" spot="'+id+'" value="'+precioconv+'"> - Cantidad: <span id="acant'+detalle[i][1]+'">'+detalle[i][5]+'</span> (<span id="aidmedida'+detalle[i][1]+'" medida="'+detalle[i][8]+'">'+detalle[i][7]+'<span>)<i class="material-icons right red-text del but" id="ad'+detalle[i][1]+'">close</i></div></li>');
    }
    $("#adaddprod").removeClass('hide');

    Materialize.updateTextFields()
});

$(document).on("click","#edtitcod",function(){
    var id = $(this).attr('proceso');
    var nombre = $("#vnombre").val();
    var codigo = $("#vcodigo").val();
    $("#atitproceso"+id).text(nombre);
    $("#acodproceso"+id).text(codigo);
    $(this).addClass('hide');
    $("#addprocess").removeClass('hide');
    // $("#vnombre").val('');
    // $("#vcodigo").val('');
});

$(document).on("click",".acctit",function() {
    var tipo = $(this).attr('id').substr(0,1);
    var id = $(this).attr('id').substr(4);
    $('#toast-container').remove();
    $("#"+tipo+"r"+id).remove();
    $("#vnombre").select();
    $("#daddprod").addClass('hide');
});


$(document).on("keyup",".manoobra",function(){
    var id = $(this).attr('id').substr(9);
    var manoobra = $(this).val() == '' ? 0 : parseFloat($(this).val());
    var ganancia = $("#vganancia"+id).val() == '' ? 0 : parseFloat($("#vganancia"+id).val());
    totalizar(id,ganancia,manoobra)
});

$(document).on("keyup",".ganancia",function(){
    var id = $(this).attr('id').substr(9);
    var ganancia = $(this).val() == '' ? 0 : parseFloat($(this).val());
    var manoobra = $("#vmanoobra"+id).val() == '' ? 0 : parseFloat($("#vmanoobra"+id).val());
    totalizar(id,ganancia,manoobra)
});

$(document).on("click","#changeprod",function(){
    $("#hprod").attr('idproducto',0);
    $("#assproc").addClass('hide');
    $("#dchargeprod").removeClass('hide');
    $("#cprod").select();
});

$(document).on("change","#includeprice",function(){
    var id = $("#hprod").attr('idproducto');
    if ($(this).is(':checked')) {
        var precio = arr('login',4,'costo',11,'id = '+id,0,0,0)[0][0];
        $("#btotal"+id).text('¢ '+precio);
    }else{
        $("#btotal"+id).text('¢ '+parseFloat($("#bhtotal"+id).val()).formatMoney(2,'.',''))
    }
});

// funciones

function chargeprod(prod) {
    if (prod != '') {
        var prod = arr('login',4,'id,nombre',11,'nombre = "'+prod+'"',0,0,0)[0][0];
        if (prod != undefined) {
            $("#dchargeprod").addClass('hide');
            $("#assproc").removeClass('hide');
            $("#hprod").attr('idproducto',prod[0]);
            $("#hprod").text(prod[1]+' ');
            $("#aprod").focus();
        }
    }
}

function addprodline(tipo) {
    // if (tipo == 'a') {
    //     tabla = "listadetalles";
    // }else if (tipo == 'b') {
    //     tabla = "listadetprod";
    // }else{
    //     tabla = "listaasstp";
    // }
    var tabla = "lista"+tipo;
    var pass = 1;
    var nombre = $("#"+tipo+"tarea").val();
    var count = parseInt($("#"+tipo+"autoinc").val());
    var tsk = arr('login',4,'id,nombre,hombre,maquina,bandejas',180,'nombre = \"'+nombre+'\"',0,0,0)[0];
    var validar = validateprodline(tipo);
    if (tsk != '') {
        if (validar == false) {
            $("."+tipo+"plines").each(function(){
                var id = $(this).attr('id').substr(2);
                if (tsk[0][0] == id) {
                    pass = 0;
                }
            });
            if (pass == 1) {
                count ++;
                $("#"+tabla).append('<tr class="'+tipo+'plines" id="'+tipo+'p'+tsk[0][0]+'"><td id="'+tipo+'task'+tsk[0][0]+'">'+tsk[0][1]+'</td><td id="'+tipo+'esth'+tsk[0][0]+'" esth="'+tsk[0][2]+'">'+tsk[0][2]+'</td><td id="'+tipo+'estm'+tsk[0][0]+'" estm="'+tsk[0][3]+'">'+tsk[0][3]+'</td><td id="'+tipo+'band'+tsk[0][0]+'" bandejas="'+tsk[0][4]+'">'+tsk[0][4]+'</td><td orden="'+count+'" id="'+tipo+'torder'+tsk[0][0]+'"><span class="order" id="'+tipo+'sorder'+tsk[0][0]+'">'+count+'</span><input type="hidden" class="horder" id="'+tipo+'eorder'+tsk[0][0]+'"></td><td><i class="material-icons btn-color pbtn cdel deltarea" id="'+tipo+'del'+tsk[0][0]+'">close</i></td></tr>');

                $("#"+tipo+"tarea").val('');
                $("#"+tipo+"estimado").val('');
                $("#"+tipo+"unidad").val(0);
                $("#"+tipo+"unidad").material_select();
                $("#"+tipo+"autoinc").val(count);
                $("#"+tipo+"tarea").focus();
            }else{
                Materialize.toast('Tarea de Produccion ha sido agregada anteriormente', 6000, 'amber lighten-2');
                $("#"+tipo+"tarea").val('');
                $("#"+tipo+"estimado").val('');
                $("#"+tipo+"tarea").focus();
            }
        }else{
            Materialize.toast(validar, 6000, 'red');
        }
    }else{
        Materialize.toast('Tarea de Producción no existe', 6000, 'red');
        $("#"+tipo+"tarea").val('');
        $("#"+tipo+"estimado").val('');
        $("#"+tipo+"unidad").val(0);
        $("#"+tipo+"unidad").material_select();
        $("#"+tipo+"tarea").focus();
    }
}

function validateaddprod(nom,cant,uni) {
    if (nom == ''){
        $("#vproducto").focus();
        return 'Insumo Requerido';
    }
    if (cant <= 0){
        $("#vcantidad").focus();
        return 'Cantidad debe ser mayor a 0';
    }
    if (cant == ''){
        $("#vcantidad").focus();
        return 'Cantidad Requerida';
    }
    if (uni == 0){
        $("#vidunidad").focus();
        return 'Unidad Requerida';
    }
    return false;
}

function parpadear() {
    var o = parseInt($("#o").val());
    if (o == 1) {
        $("#t1").css('background-color','rgba(76,175,80,0.3');
        $("#o").val(2);
    }else{
        $("#t1").css('background-color','#fff');
        $("#o").val(1);
    }
}

// CRONOMETRO //

function inicio () {
    control = setInterval(cronometro,10);
    document.getElementById("start").disabled = true;
    document.getElementById("parar").disabled = false;
    document.getElementById("reinicio").disabled = false;
}
function parar () {
    clearInterval(control);
    document.getElementById("parar").disabled = true;
    document.getElementById("start").disabled = false;
}
function reinicio () {
    clearInterval(control);
    centesimas = 0;
    segundos = 0;
    minutos = 0;
    horas = 0;
    Centesimas.innerHTML = ":00";
    Segundos.innerHTML = ":00";
    Minutos.innerHTML = ":00";
    Horas.innerHTML = "00";
    document.getElementById("start").disabled = false;
    document.getElementById("parar").disabled = true;
    document.getElementById("reinicio").disabled = true;
}
function cronometro () {
    if (centesimas < 99) {
        centesimas++;
        if (centesimas < 10) { centesimas = "0"+centesimas }
        Centesimas.innerHTML = ":"+centesimas;
    }
    if (centesimas == 99) {
        centesimas = -1;
    }
    if (centesimas == 0) {
        segundos ++;
        if (segundos < 10) { segundos = "0"+segundos }
        Segundos.innerHTML = ":"+segundos;
    }
    if (segundos == 59) {
        segundos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0) ) {
        minutos++;
        if (minutos < 10) { minutos = "0"+minutos }
        Minutos.innerHTML = ":"+minutos;
    }
    if (minutos == 59) {
        minutos = -1;
    }
    if ( (centesimas == 0)&&(segundos == 0)&&(minutos == 0) ) {
        horas ++;
        if (horas < 10) { horas = "0"+horas }
        Horas.innerHTML = horas;
    }
}

// TERMINA CRONOMETRO //

function addprocess(idproceso,proceso,idlinea,cantidad) {
    // validar proceso
    var count = parseInt($("#count").val());
    var cnt = cantidad;
    var cantot = 0;
    count++;
    $("#inicio").append('<div class="row"><div class="col s12 m12 l12"><span class="reloj" id="horas'+count+'">00</span><span class="reloj">:</span><span class="reloj" id="minutos'+count+'">00</span><span class="reloj">:</span><span class="reloj" id="segundos'+count+'">00</span><span class="reloj hide" id="Centesimas'+count+'">:00</span><input type="button" class="waves-effect waves-light btn blue start" id="start'+count+'" value="Iniciar &#9658;" idproceso="'+idproceso+'" idlinea="'+idlinea+'" cantidad="'+cantidad+'" style="margin-left: 15px"><input type="button" class="waves-effect waves-light btn blue pause hide" id="pause'+count+'" value="Pausar &#9208;" style="margin-left: 15px"><input type="button" class="waves-effect waves-light btn blue stop" id="stop'+count+'" value="Detener &#8718;" disabled></div></div><div class="row"><div class="col s12 m7 l7"><ul class="collection with-header" id="detproc'+count+'"><li class="collection-header"><p class="marginzero" style="font-size: 1.5em;">Lista de Elementos para Proceso <span class="proc'+count+'">'+proceso+'</span></p></li></ul></div></div>');
    // cnt = 'NaN' ? 1 : cantidad;
    //detalleprocesos
    $("#inicio").removeClass('hide');
    var elem = arr('login',4,'',119,$("#idproceso").val(),0,0,0)[0];

    for (var i = 0, len = elem.length; i < len; i++) {
        var cant = parseInt(elem[i][5]);
        cantot = cant * cnt;

        var faltante = parseInt(elem[i][6] - cantot);
        if (faltante > 0) {
            faltante = 0;
        }else{
            faltante = Math.abs(faltante);
        }
        $("#detproc"+count).append('<li class="collection-item"><div class="row mbotcero"><div class="col s4 m6 l6"><span id="d'+elem[i][0]+'">'+elem[i][3]+'</span></div><div class="col s4 m2 l2"><span>Cantidad: <span id="c'+elem[i][0]+'">'+cantot+'</span></span></div><div class="col s4 m2 l2"><span>Actual: <span id="a'+elem[i][0]+'">'+elem[i][6]+'</span></span></div><div class="col s4 m2 l2"><span>Faltante: <span id="f'+elem[i][0]+'">'+faltante+'</span></span></div></div></li>');
    }
    $("#detproc"+count).append('<div><a class="waves-effect waves-light btn" id="toBuy" disabled>Ir a Compras</a></div>')
    $("#count").val(count);
    //vaciar
    $("#proceso").val('');
    $("#cantidad").val('');
    $("#proceso").focus();
    $("#proceso").css('border-bottom','1px solid #9e9e9e');
    $("#proceso").css('box-shadow','none');
    Materialize.updateTextFields();
}

function totalizar(id,ganancia,manoobra) {
    var total = parseFloat($("#htotal"+id).val());
    if (manoobra != 0)
        ttotal = total + manoobra;

    if (ganancia != 0)
        ttotal = total * ((ganancia/100)+1)

    $("#total"+id).text('¢ '+(ttotal).formatMoney(2,'.',','));
}

function addproduct(nombre,cantidad,idmedida,medida,precio,tipo) {
    var id = $("#"+tipo+"spot").val();
    var idproducto = arr('login',4,'id',11,'nombre = "'+nombre+'"',0,0,0)[0][0];
    var prectot = 0;
    var validac = 1;
    // validacion
    var validate = validateaddprod(nombre,cantidad,idmedida);
    if (validate == false) {
        $("."+tipo+"product").each(function() {
            var idprod = $(this).attr('id').substr(5);
            if ($("#"+tipo+"prec"+idprod).attr('spot') == id && idprod == idproducto) {
                validac = 0;
            }else{
                return false;
            }
        });
        // fin validacion
        if (validac == 1) {
            $("#"+tipo+"productos"+id).append('<li class="collection-item dismissable" id="'+tipo+'p'+idproducto+'"><div id="'+tipo+'groupprodcts'+idproducto+'"><span id="'+tipo+'prod'+idproducto+'" class="'+tipo+'product">'+nombre+'</span><input type="hidden" id="'+tipo+'prec'+idproducto+'" spot="'+id+'" value="'+precio+'"> - Cantidad: <span id="'+tipo+'cant'+idproducto+'">'+cantidad+'</span> (<span id="'+tipo+'idmedida'+idproducto+'" medida="'+idmedida+'">'+medida+'<span>)<i class="mdi mdi-close mdi-24px right red-text del but" id="'+tipo+'d'+idproducto+'"></i></div></li>');
        }else{
            cantidad = parseFloat($("#"+tipo+"cant"+idproducto).text()) + parseFloat(cantidad);
            $("#"+tipo+"cant"+idproducto).text(cantidad);
        }
        vaciar(tipo+'insumos');
        // calculo
        $("."+tipo+"product").each(function(){
            var idprod = $(this).attr('id').substr(5);
            if ($("#"+tipo+"prec"+idprod).attr('spot') == id) {
                var precio = parseFloat($("#"+tipo+"prec"+idprod).val());
                var cantidad = parseFloat($("#"+tipo+"cant"+idprod).text());
                var tprecio = 0;
                tprecio = precio;
                prectot += tprecio;
            }
        });
        // fin calculo
        $("#"+tipo+"total"+id).text('¢ '+(prectot).toFixed(2));
        $("#"+tipo+"htotal"+id).val(prectot);
    }else{
         Materialize.toast(validate, 6000, 'red');
    }
}
$(document).on("keyup","#acant",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#aidunidad").prevAll('input.select-dropdown').trigger('open').focus();
});

$(document).on("change","#aidunidad",function(){
    if ($("#aprod").val() != '') {
        $("#insprod").click();
    }
});

$(document).on("click","#insprod",function(){

});

function makeprocess(id,nombre,codigo,tipo) {
    var opc = 0;
    var rnombre = nombre.replace(/\s+/g, '');
    if (tipo == 1) {id += 1;}
    $("."+tipo+"recipes").each(function(){
        if ($(this).attr(tipo+'nombre') == rnombre) {
            opc = 1;
            return false;
        }else{
            opc = 0;
        }
    });

    if (nombre != '' && codigo != '') {
        if (opc != 1) {
            $("#"+tipo+"makerecipe").html('');
            $("#"+tipo+"makerecipe").append('<div class="col s12 m12 l12 '+tipo+'recipes" id="'+tipo+'r'+id+'" '+tipo+'nombre="'+rnombre+'"><ul class="collection with-header" id="'+tipo+'productos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="'+tipo+'titproceso'+id+'" class="'+tipo+'titrecipe but">'+nombre+'</span> - [Cod: <span id="'+tipo+'codproceso'+id+'">'+codigo+'</span>]<i class="mdi mdi-window-close mdi-36px deltit right pbtn cdel btn-color" id="'+tipo+'dt'+id+'"></i><i class="mdi mdi-content-save mdi-36px saveproceso right pbtn blueh btn-color" id="'+tipo+'st'+id+'"></i></h4></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="'+tipo+'total'+id+'">¢ 0.00</span><input type="hidden" id="'+tipo+'htotal'+id+'" value="0"></h4></div></div></div></div>');
            $("#"+tipo+"daddprod").removeClass('hide');
            $("#"+tipo+"count").val(id);
            $("#"+tipo+"spot").val($("#"+tipo+"count").val());
            setTimeout(function(){$("#"+tipo+"producto").focus();},100);

        }else{
            Materialize.toast('Proceso &nbsp;&nbsp;<b>'+nombre+'</b>&nbsp;&nbsp; creado anteriormente&nbsp;&nbsp;<i class="material-icons but cancel">close</i>', 6000, 'red');
        }
    }else
        Materialize.toast('Nombre y Código requeridos', 6000, 'red');
}

function vaciar(modulo) {
    var tipo = modulo.substr(0,1)
    modulo = modulo.substr(1);
    switch(modulo) {
        case 'insumos':
            $("#"+tipo+"producto").val('');
            $("#"+tipo+"cantidad").val('');
            $("#"+tipo+"idunidad").val(0);
            $('select').material_select();
            $("#"+tipo+"producto").focus();
            break;
    }
}

function validar (varreglo,vmodulo) {

    var salida = {}

        /*VALIDACION FRONT END*/

    switch(vmodulo['modulo']) {
        case 'tareaproduccione':
            if (vmodulo['tip'] == '') {
                err = validarlinea();
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

function validarlinea() {
    if ($("#vnombre").val() == '') {
        $("#vnombre").focus();
        return 'Nombre Requerido';
    }
    if ($("#vhombre").val() == '') {
        $("#vhombre").focus();
        return 'Duración Hombre Requerido';
    }
    if ($("#vidunidad1").val() == 0) {
        $("#vidunidad1").focus();
        return 'Unidad Requerido';
    }
    if ($("#vmaquina").val() == '') {
        $("#vmaquina").val(0);
    }
    if ($("#vidunidad2").val() == 0) {
        $("#vidunidad2").focus();
        return 'Unidad Requerido';
    }
    if ($("#vbandejas").val() == 0) {
        $("#vbandejas").focus();
        return 'Bandejas Requerido';
    }

    return false;
}

function validartoprod() {
    if ($("#vidmarca").val() == 0){
        $("#vidmarca").focus();
        return 'Marca Requerida';
    }
    if ($("#vminimo").val() == ''){
        $("#vminimo").focus();
        return 'Minimo de Inventario Requerido';
    }
    if ($("#vmaximo").val() == ''){
        $("#vmaximo").focus();
        return 'Maximo de Inventario Requerido';
    }
    if ($("#vdescuento").val() == ''){
        $("#vdescuento").val(0);
    }
    if ($("#vganancia").val() == ''){
        $("#vganancia").val(0);
    }
    return false;
}

function validateprodline(tipo) {
    if ($("#"+tipo+"tarea").val() == ''){
        $("#"+tipo+"tarea").focus();
        return 'Tarea de Produccion Requerida';
    }
    if ($("#"+tipo+"estimado").val() == ''){
        $("#"+tipo+"estimado").focus();
        return 'Tiempo Estimado Requerido';
    }
    if ($("#"+tipo+"unidad").val() == 0){
        $("#"+tipo+"unidad").click();
        return 'Unidad Requerida';
    }
    return false;
}

function cargar(vmodulo,vid) {
    switch(vmodulo['modulo']) {
        case 'tareaproduccione':
            vmodulo['sel'] = 'id as vid,nombre as vnombre,hombre as vhombre,idunidad1 as vidunidad1,maquina as vmaquina,idunidad2 as vidunidad2, bandejas as vbandejas';
            vmodulo['tbl'] = 134;
            vmodulo['where'] ='id = '+vid;
            break;
        default:
            return 'Módulo no Existente';
            break;
    }

    return vmodulo;
}

function cargarSintax(vtabla){
    switch(vtabla) {
        case 'gastos':
            var arr = {};
            arr['sel'] = 'id,nombre,precio';
            arr['tbl'] = 118;
            arr['where'] = 'id > 0 order by nombre limit 20';
            break;
        case 'tareaproducciones':
            var arr = {};
            arr['sel'] = 'id,nombre,hombre,maquina,bandejas';
            arr['tbl'] = 180;
            arr['where'] = 'id > 0 order by nombre limit 20';
            break;
    }
    return arr;
}

function endDetail(id,acc,modulo) {
    switch(modulo) {
        case 'tareaproduccione':
            thorload(modulo);
            deadclear(modulo);
            $(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
            $("#vnombre").focus();
            break;
    }

}
