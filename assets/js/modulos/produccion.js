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
	/*Materialize.updateTextFields();
	$("#vnombre").focus();*/

	$("#vproducto").autocomplete({
	    limit: 20,
		data: arr('login',4,'nombre,null',11,'nombre like "%'+$("#vproducto").val()+'%" and isproducto = 0 limit 20',0,0,0,1)
	});

    $('select').material_select();

});

$(document).on("click","#addrecipe",function(){
	var id = parseInt($("#count").val());
    var nombre = $("#vnombre").val();
    addrecipe(id,nombre);
    
});

$(document).on("keyup","#vnombre",function(e){
    var code = e.which || e.keyCode;
    var id = parseInt($("#count").val());
    var nombre = $(this).val();
    if (code == 13)
        addrecipe(id,nombre);
});

$(document).on("keyup","#vproducto",function(e){
    var code = e.which || e.keyCode;
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
        var validacion = arr('login',4,'nombre,precio',42,'nombre = \"'+nombre+'\"',0,0,0)[0];
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
    var idunidad = arr('login',4,'idunidad',42,'nombre = \"'+nombre+"\"",0,0,0)[0][0];
    $("#vidunidad").val(idunidad);
    $('select').material_select();
    $("#vcantidad").focus();
});

$(document).on("click","#addproduct",function(){
    var nombre = $("#vproducto").val();
    var cantidad = $("#vcantidad").val();
    var idmedida = $("#vidunidad").val();
    var medida = $("#vidunidad option:selected").attr('unidad');
    var precio = arr('login',4,'precio',42,'nombre = \"'+nombre+'\"',0,0,0)[0][0]
    addproduct(nombre,cantidad,idmedida,medida,precio)
});

$(document).on("click",".titrecipe",function(){
    var id = $(this).attr('id').substr(9);
    var nombre = $(this).text();
    $("#vnombre").val(nombre)
    $("#spot").val(id);
});

$(document).on("click",".del",function(){
    var id = $(this).attr('id').substr(1);
    Materialize.toast('Desea Borrar este Producto? <button type="button" class="waves-effect waves-light btn blue accept" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="fa fa-times"></i></button>', 10000, 'rounded');
});

$(document).on("click",".cancel",function(){
    $('#toast-container').remove();
});

$(document).on("click",".accept",function(){
    var id = $(this).attr('id').substr(3);
    $('#toast-container').remove();
    $("#p"+id).remove();
});

$(document).on("click",".deltit",function(){
    var id = $(this).attr('id').substr(2);
    Materialize.toast('Desea Borrar esta Receta? <button type="button" class="waves-effect waves-light btn blue acctit" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="fa fa-times"></i></button>', 10000, 'rounded');
});

$(document).on("click",".acctit",function(){
    var id = $(this).attr('id').substr(3);
    $('#toast-container').remove();
    $("#r"+id).remove();
    $("#vnombre").select();
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
    var manoobra = $("#vmanoobra"+id).val() == '' ? 0 : parseFloat($("#vmanoobra"+id).val());
    var ganancia = $("#vganancia"+id).val() == '' ? 0 : parseFloat($("#vganancia"+id).val());
    var idproducto = parseInt($("#idproducto").val());
    idproducto += 1;
    if (nombre != ''  && cantidad != '') {
        $("#productos"+id).append('<li class="collection-item dismissable" id="p'+idproducto+'"><div><span id="prod'+idproducto+'" class="product">'+nombre+'</span><input type="hidden" id="prec'+idproducto+'" spot="'+id+'" value="'+precio+'"> - cantidad: <span id="cant'+idproducto+'">'+cantidad+'</span> (<span id="idmedida'+idproducto+'">'+medida+'<span>)<i class="fa fa-times right red-text del but" id="d'+idproducto+'"></i></div></li>');
    }
    $("#idproducto").val(idproducto)
    vaciar('insumos');

    var prectot = 0;
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

    if (manoobra != 0)
        prectot += manoobra;
    

    if (ganancia != 0)
        prectot = prectot * ((ganancia/100)+1)
    

    $("#total"+id).text('¢ '+(prectot).formatMoney(2,'.',','))
    $("#htotal"+id).val(prectot)

}

function addrecipe(id,nombre) {
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
    //<h4><span class="red-text">0.00</span></h4>
    if (opc != 1) {
        if (nombre != '') {
            $("#recetas").append('<div class="col s6 m6 recipes" id="r'+id+'" nombre="'+rnombre+'"><ul class="collection with-header" id="productos'+id+'"><li class="collection-header"><h4><span id="titreceta'+id+'" class="titrecipe but">'+nombre+'</span><i class="fa fa-times but right red-text deltit" id="dt'+id+'"></i></h4></li></ul><div class="card row"><div class="input-field col s6 m6"><input id="vmanoobra'+id+'" type="text" class="validate manoobra"><label for="vmanoobra">Mano de Obra</label></div><div class="input-field col s6 m6"><i class="material-icons prefix">%</i><input id="vganancia'+id+'" type="text" class="validate ganancia"><label for="vganancia">Ganancia</label></div>.<div class="col s12 m12"><div class="col s2 m2"><h4 class="hide-on-small-only">Total:</h4></div><div class="col s10 m10"><h4 class="right"><span class="red-text" id="total'+id+'">¢0.00</span><input type="hidden" id="htotal'+id+'" value="0"></h4></div></div></div></div>');
        }
        $("#count").val(id);
        $("#spot").val($("#count").val());
        $("#vnombre").select();
    }else{
        Materialize.toast('Receta&nbsp;&nbsp;<b>'+nombre+'</b>&nbsp;&nbsp;ha sido creada&nbsp;&nbsp;<i class="fa fa-times but cancel"></i>', 6000, 'red');
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
		case 'produccion':
			if (vmodulo['tip'] == '') {
				err = validarproduccion();
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

function validarproduccion() {


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

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}

function endDetail(vid) {
	setTimeout(function(){ console.log('Registro Ingresado') }, 2000);
	return false;
}