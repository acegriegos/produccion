$(function(){
	$("#fproduccions").submit(function(){return false});
	$("#data-table-recetas").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });
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
            alert("Ready");
            console.log(1);
        }
    });

    $("#vproducto").autocomplete({
        limit: 20,
        data: arr('login',4,'nombre,null',116,'nombre like "%'+$("#vproducto").val()+'%" limit 20',0,0,0,1)
    });

    var spot = arr('login',4,'ifnull(max(id)+1,1)',119,'1',0,0,0)[0][0];
    $("#spot").val(spot);
    $("#count").val(spot);
    $("#data-table-recetas").removeClass('hide');
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

$(document).on("keyup","#vcodigo",function(e){
    var code = e.which || e.keyCode;
    var id = parseInt($("#count").val());
    var nombre = $("#vnombre").val();
    var codigo = $(this).val();
    if (code == 13)
        addrecipe(id,nombre,codigo);
});

$(document).on("keyup","#vproducto",function(e){
    var code = e.which || e.keyCode;
    $(".autocomplete-content").show('500')
    if (code == 13)
        $("#vcantidad").focus();

});

$(document).on("keyup","#vcantidad",function(e){
    var code = e.which || e.keyCode;
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    if (code == 13) {
        var validacion = arr('login',4,'nombre,precio',116,'nombre = \"'+nombre+'\"',0,0,0)[0];
        if (validacion[0] != undefined) {
            addproduct(nombre,cantidad,idmedida,medida,validacion[0][1]);
        }else{
            Materialize.toast('Nombre de Producto no Valido', 4000, 'red');
            $("#vcantidad").val('');
            $("#vproducto").select();
        }
    }
});

$(document).on("change","#vproducto",function(){
    var nombre = $(this).val();
    var idunidad = arr('login',4,'idunidad',116,'nombre = \"'+nombre+"\"",0,0,0)[0][0];
    $("#vidunidad").val(idunidad);
    $('select').material_select();
    $("#vcantidad").focus();
});

$(document).on("click","#addproduct",function(){
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    var precio = arr('login',4,'format((precio / '+cantidad+'),2)',116,'nombre = \"'+nombre+'\"',0,0,0)[0][0];
    addproduct(nombre,cantidad,idmedida,medida,precio)
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
    var testimado = $("#vestimado"+id).val() == '' ? 0 : $("#vestimado"+id).val();
    var horasmaquina = $("#vhorasmaquina"+id).val() == '' ? 0 : $("#vhorasmaquina"+id).val();
    var horashombre = $("#vhorashombre"+id).val() == '' ? 0 : $("#vhorashombre"+id).val();
    if (total != '0.00') {
        //guarda receta en tabla prodcutos
        var idreceta = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+total+',100,1,1,0,0,0,0,8,@@usr,@@impresa,""',0,0,0);
        if (idreceta[0] != '[object Object]') {
            //guarda detalles de la receta
            arr('login',4,'',120,'1,0,'+idreceta[0][0]+','+testimado+','+horasmaquina+','+horashombre,0,0,0);
            //guarda productos de la receta
            $(".product").each(function(){
                var idproducto = $(this).attr('id').substr(4);
                if ($("#prec"+idproducto).attr('spot') == id) {
                    var cantidad = $("#cant"+idproducto).text();
                    arr('login',4,'',121,'1,0,'+idreceta[0][0]+','+idproducto+','+cantidad,0,0,0);
                }
            });
        }else{
            Materialize.toast(idreceta[0]['ERROR'], 6000, 'red');
        }
        arr('login',6,'idreceta,producto,precioventa',99,'idproducto > 0 order by producto limit 20',0,1,$("#listarecetas"));
        $("#makerecipe").html('');
        $("#vnombre").val('');
        $("#vcodigo").val('');
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
    // if (total != '0.00') {
    //     //guarda receta en tabla prodcutos
        // var idreceta = arr('login',4,'',78,'2,'+id+',\"'+codigo+'\",\"'+nombre+'\",'+total+',0,'+total+',100,1,1,0,0,0,0,8,@@usr,@@impresa,""',0,0,0);
    //     if (idreceta[0] != '[object Object]') {
    //         //guarda detalles de la receta
    //         arr('login',4,'',120,'2,0,'+idreceta[0][0]+','+testimado+','+horasmaquina+','+horashombre,0,0,0);
    //         //borrar todos los productos de la receta
                // arr('login',4,'',121,'3,0,'+idreceta[0][0]+',0,0',0,0,0);
                var det = arr('login',4,'',121,'3,0,'+idreceta[0][0]+',0,0',0,0,0);
    //         //guarda productos de la receta
    //         $(".product").each(function(){
    //             var idproducto = $(this).attr('id').substr(4);
    //             if ($("#prec"+idproducto).attr('spot') == id) {
    //                 var cantidad = $("#cant"+idproducto).text();
    //                 arr('login',4,'',121,'1,0,'+idreceta[0][0]+','+idproducto+','+cantidad,0,0,0);
    //             }
    //         });
    //     }else{
    //         Materialize.toast(idreceta[0]['ERROR'], 6000, 'red');
    //     }
    //     arr('login',6,'idreceta,producto,precioventa',99,'idproducto > 0 order by producto limit 20',0,1,$("#listarecetas"));
    //     $("#makerecipe").html('');
    // }else{
    //     Materialize.toast('Es necesario agregar productos a la receta', 6000, 'orange lighten-2');
    // }
});

$(document).on("click",".editreceta",function(){
    var id = $(this).attr('id').substr(1);
    var vreceta = arr('login',4,'idproducto,producto,codigo,precioventa,preciocosto,idreceta,tiempoestimado,horasmaquina,horashombre',99,'idreceta = '+id,0,0,0)[0][0];
    var detalle = arr('login',4,'idproducto,producto,cantidad,preciocosto,simbolo',123,'idreceta = '+id,0,0,0)[0];
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
    $("#makerecipe").append('<div class="col s12 m12 l12 recipes" id="r'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="productos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="titreceta'+id+'" class="titrecipe but">'+vreceta[1]+'</span> - [Cod: <span id="codreceta'+id+'">'+vreceta[2]+'</span>]<i class="material-icons deltit right pbtn cdel btn-color" id="dt'+id+'">close</i><i class="material-icons actrecipe right pbtn blueh btn-color" id="ar'+id+'">save</i></h4></li><li class="collection-item padbotzero"><div class="row raddreceta gastos"><div class="input-field col s4 m4 l4"><input id="vestimado'+id+'" type="text" class="validate" value="'+vreceta[6]+'"><label for="vestimado'+id+'">Tiempo Estimado en minutos</label></div><div class="input-field col s4 m4 l4"><input id="vhorasmaquina'+id+'" type="text" class="validate" value="'+vreceta[7]+'"><label for="vhorasmaquina'+id+'">Horas Maquina</label></div><div class="input-field col s4 m4 l4"><input id="vhorashombre'+id+'" type="text" class="validate" value="'+vreceta[8]+'"><label for="vhorashombre'+id+'">Horas Hombre</label></div></div></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="total'+id+'">¢ '+vreceta[4]+'</span><input type="hidden" id="htotal'+id+'" value="'+vreceta[4]+'"></h4></div></div></div></div>');
    for (var i = 0, len = detalle.length; i < len; i++) {
        $("#productos"+id).append('<li class="collection-item dismissable" id="p'+detalle[i][0]+'"><div id="groupprodcts'+detalle[i][0]+'"><span id="prod'+detalle[i][0]+'" class="product">'+detalle[i][1]+'</span><input type="hidden" id="prec'+detalle[i][0]+'" spot="'+id+'" value="'+detalle[i][3]+'"> - Cantidad: <span id="cant'+detalle[i][0]+'">'+detalle[i][2]+'</span> (<span id="idmedida'+detalle[i][0]+'">'+detalle[i][4]+'<span>)<i class="material-icons right red-text del but" id="d'+detalle[i][0]+'">close</i></div></li>');
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
            $("#makerecipe").append('<div class="col s12 m12 l12 recipes" id="r'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="productos'+id+'"><li class="collection-header"><h4 class="marginzero"><span id="titreceta'+id+'" class="titrecipe but">'+nombre+'</span> - [Cod: <span id="codreceta'+id+'">'+codigo+'</span>]<i class="material-icons deltit right pbtn cdel btn-color" id="dt'+id+'">close</i><i class="material-icons savereceta right pbtn blueh btn-color" id="st'+id+'">save</i></h4></li><li class="collection-item padbotzero"><div class="row raddreceta gastos"><div class="input-field col s4 m4 l4"><input id="vestimado'+id+'" type="text" class="validate"><label for="vestimado'+id+'">Tiempo Estimado en minutos</label></div><div class="input-field col s4 m4 l4"><input id="vhorasmaquina'+id+'" type="text" class="validate"><label for="vhorasmaquina'+id+'">Horas Maquina</label></div><div class="input-field col s4 m4 l4"><input id="vhorashombre'+id+'" type="text" class="validate"><label for="vhorashombre'+id+'">Horas Hombre</label></div></div></li></ul><div class="card row"><div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="total'+id+'">¢ 0.00</span><input type="hidden" id="htotal'+id+'" value="0"></h4></div></div></div></div>');
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
		case 'gasto':
			if (vmodulo['tip'] == '') {
				err = validargasto();
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

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'produccion':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
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
    }
    return arr;
}

function endDetail(vid,vacc,vmodulo) {
	thorload(vmodulo)
}