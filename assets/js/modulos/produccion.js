var centesimas = 0;
var segundos = 0;
var minutos = 0;
var horas = 0;
$(function(){
    $(".menu").click(function(){
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)) {
            case 1:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',1,'');
                $("#mantproduccion").html(p);
                $("#data-table-recetas").DataTable({
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
                setTimeout(function(){$("#vnombre").focus()},200);
                // setTimeout(function(){$("#vreceta").focus()},200);
                break;
            case 3:
                $("#mantproduccion").html('');
                var p = mantenimiento('produccion',3,'');
                $("#mantproduccion").html(p);
                $("#receta").autocomplete({
                    limit: 10,
                    data: arr('login',4,'producto,null',99,'producto like "%'+$("#receta").val()+'%" limit 10',0,0,0,1)
                })
                $("#mantproduccion").removeClass('nopadding');
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
            endingTop: '4%', // Ending top style attribute
            ready: function(modal, trigger) { // Callback for Modal open. Modal and trigger parameters available.
                // alert("Ready");
                console.log(modal, trigger);
            }
        });
    });
	$("#data-table-recetas").dataTable({
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
    $("#data-table-recetas").removeClass('hide');
    
});

$(document).on("click",".productline",function(){
    var id = parseInt($(this).attr('id').substr(2));
    switch(id) {
        case 1:
            arr('login',6,'id,nombre',134,'id > 0 order by nombre limit 10',0,1,$("#listatareaproducciones"));
            $("#vnombre").focus();
            break;
        case 2:
            $("#vreceta").focus();
            break;
        case 3:
            arr('login',6,'idlinea,idreceta,receta',137,'1',0,1,$("#listamantlinea"));
            break;
    }
});

$(document).on("keyup",".tarea",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        var tipo = $(this).attr('id').substr(0,1);
        $("#"+tipo+"estimado").focus();
});

$(document).on("keydown",".tarea",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    var tipo = $(this).attr('id').substr(0,1);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("#"+tipo+"tarea").autocomplete({
            limit: 10,
            data: arr('login',4,'nombre,null',134,'nombre like \"%'+$("#"+tipo+"tarea").val()+'%\" and id > 0 limit 10',0,0,0,1)
        });
        $("#"+tipo+"tarea").siblings($(".autocomplete-content")).css('width','25%');
    }
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
    $(".selreceta").addClass('chselreceta');
    $(".chselreceta").removeClass('selreceta')
});

// $(document).on("keyup","#vnomlinea",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13) {
//         $("#nl").text($(this).val());
//         $("#atarea").focus();
//     }

// });

$(document).on("keyup","#receta",function(e){
    $(".autocomplete-content").show('500');
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#linea").focus();
    }
});

$(document).on("click","#addprodline",function(){
    addprodline(1);
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

$(document).on("change","#aunidad",function(){
    addprodline(1);
});

$(document).on("change","#bunidad",function(){
    addprodline(2);
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
    var idreceta = $(".namereceta").attr('id').substr(1);
    var idlinea = arr('login',4,'',132,'1,0,'+idreceta,0,0,0);

    if (idlinea[0]['ERROR'] == undefined) {
        $(".aplines").each(function(){
            var idtarea = $(this).attr('id').substr(2);
            var idunidad = $("#auni"+idtarea).attr('idunidad');
            var order = $("#atorder"+idtarea).attr('orden');
            var estimado = $("#aest"+idtarea).attr('estimado');
            arr('login',4,'',131,'1,0,'+idtarea+','+idlinea[0][0]+','+estimado+','+idunidad+','+order,0,0,0)[0];
        });
        $("#listadetalles").html('');
        $("#tablelineas").addClass('hide');
        $(".dcline").addClass('hide');
        $("#drecipe").removeClass('hide');
        Materialize.toast('Linea de produccion guardada correctamente', 6000, 'green');
    }else{
        Materialize.toast(idlinea[0]['ERROR'], 6000, 'red');
    }    
});

$(document).on("click","#dsavelinea",function(){
    var idreceta = $(".namereceta").attr('id').substr(1);
    var nombre = $("#nombrelinea").val();
    var idlinea = arr('login',4,'',132,'1,0,\"'+nombre+'\",'+idreceta,0,0,0);

    if (idlinea[0]['ERROR'] == undefined) {
        $(".aplines").each(function(){
            var idtarea = $(this).attr('id').substr(2);
            var idunidad = $("#uni"+idtarea).attr('idunidad');
            var order = $("#torder"+idtarea).attr('orden');
            var estimado = $("#est"+idtarea).attr('estimado');
            arr('login',4,'',131,'1,0,'+idtarea+','+idlinea[0][0]+','+estimado+','+idunidad+','+order,0,0,0)[0];
        });
        Materialize.toast('Linea de produccion '+nombre+' Guardada Correctamente', 6000, 'green');
    }else{
        Materialize.toast(idlinea[0]['ERROR'], 6000, 'red');
    }    
});

$(document).on("click",".actlinea",function(){
    var id = $(this).attr('id').substr(1);
    var idreceta = $(this).attr('idreceta');
    var detalle = arr('login',4,'',138,id+','+idreceta,0,0,0)[0];
    $("#actrec").val(detalle[0][2]);
    $("#actrec").attr('idreceta',detalle[0][1])
    $("#listadetprod").html('');

    for (var i = 0, len = detalle.length; i < len; i++) {
        $("#listadetprod").append('<tr class="bpline" id="bp'+detalle[i][3]+'"><td id="btask'+detalle[i][3]+'">'+detalle[i][4]+'</td><td id="best'+detalle[i][3]+'" estimado="'+detalle[i][5]+'">'+detalle[i][6]+'</td><td id="buni'+detalle[i][3]+'" idunidad="'+detalle[i][6]+'">'+detalle[i][8]+'</td><td orden="'+detalle[i][8]+'" id="btorder'+detalle[i][3]+'"><span class="order" id="bsorder'+detalle[i][3]+'">'+detalle[i][9]+'</span><input type="hidden" class="horder" id="beorder'+detalle[i][3]+'"></td><td><i class="material-icons btn-color pbtn cdel deltarea" id="bdel'+detalle[i][3]+'">close</i></td></tr>');
    }
    Materialize.updateTextFields();
    $("#dactrec").removeClass('hide');
    $("#atarea").focus();
});

$(document).on("click",".viewreceta",function(){
    var id = $(this).attr('id').substr(1);
    var tabla = $("#data-table-detallerecetas").DataTable();
    tabla.destroy();
    arr('login',6,'',130,id,0,1,$("#listadetallerecetas"));
    $('#modal-detallerecetas').modal('open');
    $("#data-table-detallerecetas").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
});

$(document).on("click","#searchrecetas",function(){
    var nombre = $("#vreceta").val();
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

$(document).on("click",".selreceta",function(){
    var id = $(this).attr('id').substr(1);
    var receta = arr('login',4,'id,nombre',11,'id = '+id,0,0,0)[0][0];
    $('#modal-search').modal('close');
    $("#drecipe").addClass('hide');
    $(".dcline").removeClass('hide');
    $(".namereceta").text('');
    $(".namereceta").attr('id','r'+id);
    $(".namereceta").append(receta[1]+'<a class="material-icons pbtn blue-text mbutton" id="changerecipe" href="#modal-search">search</a>');
    $("#atarea").focus();
});

$(document).on("keyup","#vreceta",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var nombre = $(this).val();
        var receta = arr('login',4,'',139,'\"'+nombre+'\"',0,0,0)[0];
        if (receta[0][2] == null) {
            if (receta != '') {
                $("#drecipe").addClass('hide');
                $(".dcline").removeClass('hide');
                $("#tablelineas").removeClass('hide');
                $(".namereceta").text('');
                $(".namereceta").attr('id','r'+receta[0][0]);
                $(".namereceta").append(receta[0][1]+'<a class="material-icons pbtn blue-text mbutton" id="changerecipe" href="#modal-search">search</a>');
                $(this).val('');
                $("#atarea").focus();
            }else{
                   Materialize.toast('Receta "'+nombre+'" no Existente', 4000, 'red');
            }
        }else{
             Materialize.toast('Ya existe una linea de produccion asignada a esta receta', 6000, 'amber lighten-2');
             $(this).val('');
        }
        
        
    }
});

$(document).on("keydown","#vreceta",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
    
        $("#vreceta").autocomplete({
            limit: 10,
            data: arr('login',4,'receta,null',99,'receta like \"%'+$("#vreceta").val()+'%\" limit 10',0,0,0,1)
        });
    
        $("#vreceta").siblings($(".autocomplete-content")).css('width','25%');
    }
});

// $(document).on("keyup","#anombre",function(e){
//     var code = e.which || e.keyCode;
//     if (code == 13) {
//         $("#tablelineas").removeClass('hide');
//         var nombre = $(this).val();
//         var receta = $("#vreceta").val();
//         $("#nomlinea").text(nombre);
//         $("#nomreceta").text(receta);
//         $(".faddline").prop('disabled',false);
//         $("#aunidad").material_select();
//         $("#atarea").focus();
//     }
// });

$(document).on("click",".chselreceta",function(){
    var id = $(this).attr('id').substr(1);
    var receta = arr('login',4,'id,nombre',11,'id = '+id,0,0,0)[0][0];
    $('#modal-search').modal('close');
    $("#actrec").val('');
    $("#actrec").attr('idreceta',receta[0])
    $("#actrec").val(receta[1]);
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
    var def = arr('login',4,'nombre',111,'id = 7',0,0,0)[0][0];
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
        Materialize.toast('Receta Agregada a Productos', 4000, 'green');
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

$(document).on("click","#addrecipe",function(){
	var id = parseInt($("#count").val());
    var nombre = $("#vnombre").val();
    var codigo = $("#vcodigo").val();
    addrecipe(id,nombre,codigo);
});

$(document).on("keyup","#vnombre",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#vcodigo").focus();
});

$(document).on("keyup","#vnombre[ku=1]",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $("#addlinea").click();
    }
    
});

$(document).on("keyup","#vcodigo",function(e){
    var code = e.which || e.keyCode;
    var id = parseInt($("#count").val());
    var nombre = $("#vnombre").val();
    var codigo = $(this).val();
    if (code == 13)
        addrecipe(id,nombre,codigo);
});

$(document).on("keydown","#vproducto",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
    
        $("#vproducto").autocomplete({
            limit: 10,
            data: arr('login',4,'nombre,null',116,'nombre like \"%'+$("#vproducto").val()+'%\" limit 10',0,0,0,1)
        });
    
        $("#vproducto").siblings($(".autocomplete-content")).css('width','25%');
    }

    if (charCode == 13)
        $("#vcantidad").focus();

});

$(document).on("keydown","#vcantidad",function(e){
    var code = e.which || e.keyCode;
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    if (code == 13) {
        var validacion = arr('login',4,'format(precio / '+cantidad+',2)',116,'nombre = \"'+nombre+'\"',0,0,0)[0][0];
        // ? precio o costo
        if (validacion[0] != undefined)
            addproduct(nombre,cantidad,idmedida,medida,validacion[0]);
        else
            Materialize.toast('Nombre de Producto no Valido', 4000, 'red');
            $("#vcantidad").val('');
            $("#vproducto").select();
        
    }
});

$(document).on("change","#vidunidad",function(){
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    var precio = arr('login',4,'format(precio / '+cantidad+')',116,'nombre = \"'+nombre+'\"',0,0,0)[0];
    if (precio != undefined)
        addproduct(nombre,cantidad,idmedida,medida,precio);
    else
        Materialize.toast('Nombre de Producto no Valido', 4000, 'red');
        $("#vcantidad").val('');
        $("#vproducto").select();
});

$(document).on("blur","#vproducto",function(){
    var nombre = $(this).val();
    var idunidad = arr('login',4,'idunidad',116,'nombre = \"'+nombre+"\"",0,0,0)[0][0];
    $("#vidunidad").val(idunidad);
    $('select').material_select();
});

$(document).on("click","#addproduct",function(){
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    var precio = arr('login',4,'format(precio / '+cantidad+',2)',116,'nombre = \"'+nombre+'\"',0,0,0)[0][0];
    console.log(precio)
    if (precio != undefined)
        addproduct(nombre,cantidad,idmedida,medida,precio);
    else
        Materialize.toast('Nombre de Producto no Valido', 4000, 'red');
        $("#vcantidad").val('');
        $("#vproducto").select();
    
});

$(document).on("click",".titrecipe",function(){
    var id = $(this).attr('id').substr(9);
    var nombre = $(this).text();
    $("#vnombre").val(nombre)
    $("#spot").val(id);
    Materialize.toast('Receta '+nombre+' Seleccionada', 4000, 'green');
});

$(document).on("click",".del",function(){
    var id = $(this).attr('id').substr(1);
    var spot = $("#prec"+id).attr('spot');
    Materialize.toast('Desea Borrar este Producto? <button type="button" class="waves-effect waves-light btn blue accept" id="acc'+id+'" spot="'+spot+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".deltarea",function(){
    var id = $(this).attr('id').substr(4);
    var tipo = $(this).attr('id').substr(0,1);
    Materialize.toast('Desea Borrar esta Tarea? <button type="button" class="waves-effect waves-light btn blue acctar" id="acc'+id+'" tipo="'+tipo+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
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
    var id = $(this).attr('id').substr(3);
    var spot = $(this).attr('spot');
    var prectot = 0;
    $('#toast-container').remove();
    $("#p"+id).remove();
    $(".product").each(function(){
        var idprod = $(this).attr('id').substr(4);
        if ($("#prec"+idprod).attr('spot') == spot) {
            var precio = parseFloat($("#prec"+idprod).val());
            var cantidad = parseFloat($("#cant"+idprod).text());
            var tprecio = 0;
            tprecio = precio * cantidad;
            prectot += tprecio;
        }
    });
    $("#total"+spot).text('¢ '+prectot.toFixed(2));
    $("#htotal"+spot).val('¢ '+prectot.toFixed(2));
});

$(document).on("click",".deltit",function(){
    var id = $(this).attr('id').substr(2);
    Materialize.toast('Desea Borrar esta Receta? <button type="button" class="waves-effect waves-light btn blue acctit" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".delreceta",function(){
    var id = $(this).attr('id').substr(1);
    Materialize.toast('Desea Eliminar esta Receta? <button type="button" class="waves-effect waves-light btn blue acctit" id="accdelrec'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".accdelrec",function(){
    var id = $(this).attr('id').substr(9);
    $('#toast-container').remove();
    arr('login',4,'',120,'3,'+id+',"",0,0,0',0,0,0);
    arr('login',6,'idreceta,producto,precioventa',99,'id > 0 order by nombre limit 20',0,1,$("#listarecetas"));

});

$(document).on("click",".savereceta",function(){
    var id = $(this).attr('id').substr(2);
    var nombre = $("#titreceta"+id).text();
    var codigo = $("#codreceta"+id).text() == '' ? 'N/A' : $("#codreceta"+id).text();
    var total = $("#total"+id).text().substr(2);
    if (total != '0.00') {
        //guarda receta en tabla prodcutos
        var idreceta = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+total+',100,0,1,1,0,0,0,7,@@usr,1,@@impresa,""',0,0,0);
        if (idreceta[0] != '[object Object]') {
            //guarda productos de la receta
            $(".product").each(function(){
                var idproducto = $(this).attr('id').substr(4);
                if ($("#prec"+idproducto).attr('spot') == id) {
                    var cantidad = $("#cant"+idproducto).text();
                    arr('login',4,'',121,'1,0,'+idreceta[0][0]+','+idproducto+','+cantidad,0,0,0);
                }
            });
            arr('login',6,'idreceta,receta,precioventa',99,'idreceta > 0 order by receta limit 20',0,1,$("#listarecetas"));
            $("#makerecipe").html('');
            $("#vnombre").val('');
            $("#vcodigo").val('');
            $("#daddprod").addClass('hide');
        }else{
            Materialize.toast(idreceta[0]['ERROR'], 6000, 'red');
        }
        
    }else{
        Materialize.toast('Es necesario agregar productos a la receta', 6000, 'orange lighten-2');
    }
});

$(document).on("click",".actrecipe",function(){
    var id = $(this).attr('id').substr(2);
    var nombre = $("#titreceta"+id).text();
    var codigo = $("#codreceta"+id).text() == '' ? 'N/A' : $("#codreceta"+id).text();
    var total = $("#total"+id).text().substr(2);
    var testimado = $("#vestimado"+id).val() == '' ? 0 : $("#vestimado"+id).val();
    var horasmaquina = $("#vhorasmaquina"+id).val() == '' ? 0 : $("#vhorasmaquina"+id).val();
    var horashombre = $("#vhorashombre"+id).val() == '' ? 0 : $("#vhorashombre"+id).val();
    if (total != '0.00') {
        //guarda receta en tabla prodcutos
        var idreceta = arr('login',4,'',78,'2,'+id+',\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+total+',100,0,1,1,0,0,0,8,@@usr,1,@@impresa,""',0,0,0);
        if (idreceta[0] != '[object Object]') {
            //guarda detalles de la receta
            arr('login',4,'',120,'2,0,'+idreceta[0][0]+','+testimado+','+horasmaquina+','+horashombre,0,0,0);
            //borrar todos los productos de la receta
                arr('login',4,'',121,'3,0,'+idreceta[0][0]+',0,0',0,0,0);
                var det = arr('login',4,'',121,'3,0,'+idreceta[0][0]+',0,0',0,0,0);
            //guarda productos de la receta
            $(".product").each(function(){
                var idproducto = $(this).attr('id').substr(4);
                if ($("#prec"+idproducto).attr('spot') == id) {
                    var cantidad = $("#cant"+idproducto).text();
                    arr('login',4,'',121,'1,0,'+idreceta[0][0]+','+idproducto+','+cantidad,0,0,0);
                }
            });
            Materialize.toast('Receta '+nombre+' Agregada Correctamente', 6000, 'green');
        }else{
            Materialize.toast(idreceta[0]['ERROR'], 6000, 'red');
        }
        arr('login',6,'idproducto,producto,precioventa',99,'idreceta > 0 order by producto limit 20',0,1,$("#listarecetas"));
        // 'idproducto,producto,precioventa',99,'1'
        $("#makerecipe").html('');

    }else{
        Materialize.toast('Es necesario agregar productos a la receta', 6000, 'orange lighten-2');
    }
});

$(document).on("click",".editreceta",function(){
    var id = $(this).attr('id').substr(1);
    var vreceta = arr('login',4,'idreceta,receta,codigo,precioventa,preciocosto',99,'idreceta = '+id,0,0,0)[0][0];
    var detalle = arr('login',4,'',119,id,0,0,0)[0];
    var rnombre = vreceta[1].replace(/\s+/g, '');
    $("#edtitcod").removeClass('hide');
    $("#addrecipe").addClass('hide');
    $("#edtitcod").attr('receta',id);
    $("#vnombre").val(vreceta[1]);
    $("#vcodigo").val(vreceta[2]);
    $("#spot").val(id);
    var count = parseInt($("#count").val());
    count += 1;
    $("#count").val(count);
    $("#makerecipe").html('');
    $("#makerecipe").append('<div class="col s12 m12 l12 recipes" id="r'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="productos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="titreceta'+id+'" class="titrecipe but">'+vreceta[1]+'</span> - [Cod: <span id="codreceta'+id+'">'+vreceta[2]+'</span>]<i class="material-icons deltit right pbtn cdel btn-color" id="dt'+id+'">close</i><i class="material-icons actrecipe right pbtn blueh btn-color" id="ar'+id+'">save</i></h4></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="total'+id+'">¢ '+vreceta[4]+'</span><input type="hidden" id="htotal'+id+'" value="'+vreceta[4]+'"></h4></div></div></div></div>');
    for (var i = 0, len = detalle.length; i < len; i++) {
        $("#productos"+id).append('<li class="collection-item dismissable" id="p'+detalle[i][2]+'"><div id="groupprodcts'+detalle[i][2]+'"><span id="prod'+detalle[i][2]+'" class="product">'+detalle[i][3]+'</span><input type="hidden" id="prec'+detalle[i][2]+'" spot="'+id+'" value="'+detalle[i][5]+'"> - Cantidad: <span id="cant'+detalle[i][2]+'">'+detalle[i][4]+'</span> (<span id="idmedida'+detalle[i][2]+'">'+detalle[i][6]+'<span>)<i class="material-icons right red-text del but" id="d'+detalle[i][2]+'">close</i></div></li>');
    }
    $("#daddprod").removeClass('hide');
    
    Materialize.updateTextFields()
});

$(document).on("click","#edtitcod",function(){
    var id = $(this).attr('receta');
    var nombre = $("#vnombre").val();
    var codigo = $("#vcodigo").val();
    $("#titreceta"+id).text(nombre);
    $("#codreceta"+id).text(codigo);
    $(this).addClass('hide');
    $("#addrecipe").removeClass('hide');
    $("#vnombre").val('');
    $("#vcodigo").val('');
});

$(document).on("click",".acctit",function(){
    var id = $(this).attr('id').substr(3);
    $('#toast-container').remove();
    $("#r"+id).remove();
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

function addprodline(tipo) {
    var tabla = "";
    if (tipo == 1) {
        tipo = "a";
        tabla = "listadetalles";
    }else{
        tipo = "b";
        tabla = "listadetprod";
    }

    var pass = 1;
    var nombre = $("#"+tipo+"tarea").val();
    var estimado = $("#"+tipo+"estimado").val();
    var idunidad = $("#"+tipo+"unidad").val();
    var unidad = $("#"+tipo+"unidad option:selected").text();
    var orden = 0;
    var count = parseInt($("#"+tipo+"autoinc").val());
    var line = arr('login',4,'id,nombre',134,'nombre = \"'+nombre+'\"',0,0,0)[0];
    var validar = validateprodline(tipo);
    if (line != '') {
        if (validar == false) {
            $("."+tipo+"plines").each(function(){
                var id = $(this).attr('id').substr(2);
                if (line[0][0] == id) {
                    pass = 0;
                }
            });
            if (pass == 1) {
                count ++;
                $("#"+tabla).append('<tr class="'+tipo+'plines" id="'+tipo+'p'+line[0][0]+'"><td id="'+tipo+'task'+line[0][0]+'">'+line[0][1]+'</td><td id="'+tipo+'est'+line[0][0]+'" estimado="'+estimado+'">'+estimado+'</td><td id="'+tipo+'uni'+line[0][0]+'" idunidad="'+idunidad+'">'+unidad+'</td><td orden="'+count+'" id="'+tipo+'torder'+line[0][0]+'"><span class="order" id="'+tipo+'sorder'+line[0][0]+'">'+count+'</span><input type="hidden" class="horder" id="'+tipo+'eorder'+line[0][0]+'"></td><td><i class="material-icons btn-color pbtn cdel deltarea" id="'+tipo+'del'+line[0][0]+'">close</i></td></tr>');
                //aqui quede
                $("#atarea").val('');
                $("#aestimado").val('');
                $("#aunidad").val(0);
                $("#aunidad").material_select();
                $("#aautoinc").val(count);
                $("#atarea").focus();
            }else{
                Materialize.toast('Tarea de Produccion ha sido agregada anteriormente', 6000, 'amber lighten-2');
                $("#atarea").val('');
                $("#aestimado").val('');
                $("#atarea").focus();
            }
        }else{
            Materialize.toast(validar, 6000, 'red');
        }
    }else{
        Materialize.toast('Tarea de Producción no existe', 6000, 'red');
        $("#atarea").val('');
        $("#aestimado").val('');
        $("#aunidad").val(0);
        $("#aunidad").material_select();
        $("#atarea").focus();
    }
}

// CRONOMETRO //

function inicio () {
    control = setInterval(cronometro,10);
    document.getElementById("inicio").disabled = true;
    document.getElementById("parar").disabled = false;
    document.getElementById("continuar").disabled = true;
    document.getElementById("reinicio").disabled = false;
}
function parar () {
    clearInterval(control);
    document.getElementById("parar").disabled = true;
    document.getElementById("continuar").disabled = false;
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
    document.getElementById("inicio").disabled = false;
    document.getElementById("parar").disabled = true;
    document.getElementById("continuar").disabled = true;
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

function totalizar(id,ganancia,manoobra) {
    var total = parseFloat($("#htotal"+id).val());
    if (manoobra != 0)
        ttotal = total + manoobra;

    if (ganancia != 0)
        ttotal = total * ((ganancia/100)+1)

    $("#total"+id).text('¢ '+(ttotal).formatMoney(2,'.',','));
}

function addproduct(nombre,cantidad,idmedida,medida,precio) {
    var id = $("#spot").val();
    var idproducto = arr('login',4,'id',14,'nombre like \"'+nombre+'\"',0,0,0)[0][0];
    var tiempo = $("#vestimado"+id).val() == '' ? 0 : parseFloat($("#vestimado"+id).val());
    var horash = $("#vhorasmaquina"+id).val() == '' ? 0 : parseFloat($("#vestimado"+id).val());
    var horasm = $("#vhorashombre"+id).val() == '' ? 0 : parseFloat($("#vhorashombre"+id).val());
    var prectot = 0;
    var validac = 1;

    // validacion
    if (nombre != ''  && cantidad != '') {
        $(".product").each(function(){
            var idprod = $(this).attr('id').substr(4);
            if ($("#prec"+idprod).attr('spot') == id && idprod == idproducto) {
                validac = 0;
            }else{
                return false;
            }
        });
    }
    // fin validacion
    if (validac == 1) {
        $("#productos"+id).append('<li class="collection-item dismissable" id="p'+idproducto+'"><div id="groupprodcts'+idproducto+'"><span id="prod'+idproducto+'" class="product">'+nombre+'</span><input type="hidden" id="prec'+idproducto+'" spot="'+id+'" value="'+precio+'"> - Cantidad: <span id="cant'+idproducto+'">'+cantidad+'</span> (<span id="idmedida'+idproducto+'">'+medida+'<span>)<i class="material-icons right red-text del but" id="d'+idproducto+'">close</i></div></li>');
    }else{
        cantidad = parseFloat($("#cant"+idproducto).text()) + parseFloat(cantidad);
        $("#cant"+idproducto).text(cantidad);
    }

    vaciar('insumos');

    // calculo
    $(".product").each(function(){
        var idprod = $(this).attr('id').substr(4);
        if ($("#prec"+idprod).attr('spot') == id) {
            var precio = parseFloat($("#prec"+idprod).val());
            var cantidad = parseFloat($("#cant"+idprod).text());
            var tprecio = 0;
            tprecio = precio * cantidad;
            prectot += tprecio;
        }
    });
    // fin calculo

    /*
    Adiciones
    */

    $("#total"+id).text('¢ '+(prectot).toFixed(2));
    $("#htotal"+id).val(prectot);

}

function addrecipe(id,nombre,codigo) {
    var opc = 0;
    var rnombre = nombre.replace(/\s+/g, '');
    id += 1;

    $(".recipes").each(function(){
        if ($(this).attr('nombre') == rnombre) {
            opc = 1;
            return false;
        }else{
            opc = 0;
        }
    });

    if (opc != 1) {
        if (nombre != '') {
            $("#makerecipe").append('<div class="col s12 m12 l12 recipes" id="r'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="productos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="titreceta'+id+'" class="titrecipe but">'+nombre+'</span> - [Cod: <span id="codreceta'+id+'">'+codigo+'</span>]<i class="material-icons deltit right pbtn cdel btn-color" id="dt'+id+'">close</i><i class="material-icons savereceta right pbtn blueh btn-color" id="st'+id+'">save</i></h4></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="total'+id+'">¢ 0.00</span><input type="hidden" id="htotal'+id+'" value="0"></h4></div></div></div></div>');
        }
        $("#daddprod").removeClass('hide');
        $("#count").val(id);
        $("#spot").val($("#count").val());
        setTimeout(function(){$("#vproducto").focus();},100);
        
    }else{
        Materialize.toast('Receta&nbsp;&nbsp;<b>'+nombre+'</b>&nbsp;&nbsp;ha sido creada&nbsp;&nbsp;<i class="material-icons but cancel">close</i>', 6000, 'red');
    }
}

function vaciar(modulo) {
    switch(modulo) {
        case 'insumos':
            $("#vproducto").val('');
            $("#vcantidad").val('');
            $("#vidunidad").val(0);
            $('select').material_select();
            $("#vproducto").focus();
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
    if ($("#vnombre").val() == ''){
        $("#vnombre").focus();
        return 'Nombre Requerido';
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
            vmodulo['sel'] = 'id as vid,nombre as vnombre';
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
            arr['sel'] = 'id,nombre';
            arr['tbl'] = 134;
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
            $("#vnombre").focus();
            break;
        case 'tareaproducciones':
            deadclear(modulo.substring(0, modulo.length - 1));
            $("#vnombre").focus();
            break;
    }
    
}