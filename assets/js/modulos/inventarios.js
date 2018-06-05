$(function(){
    $('select').material_select();
});

$(document).on("change","#vidinventario",function(){
	var id = $(this).val();
	var tabla = $("#data-table-inventarios").DataTable();
	tabla.destroy();
	arr('login',6,'',127,id,0,1,$("#listainventarios"));
	$("#data-table-inventarios").DataTable({
        bFilter : true,
        bScrollInfinite : true,
        bSort : true,
        bLengthChange : true,
        bPaginate :  false,
        bInfo : false,
    });

});

$(document).on("change","#vidbodega",function(){
	$("#listainventarios").html('');
});

$(document).on("click",".del",function(){
    var id = $(this).attr('id').substr(1);
    Materialize.toast('Desea Borrar este Insumo? <button type="button" class="waves-effect waves-light btn blue accept" id="acc'+id+'"><i class="mdi mdi-plus"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-delete"></i></button>', 10000, 'rounded');
});

$(document).on("click",".cancel",function(){
    $('#toast-container').remove();

});

$(document).on("click",".accept",function(){
    var id = $(this).attr('id').substr(3);
    $('#toast-container').remove();
	arr('login',4,'',28,'3,'+id+',"",0,0,0,00,@@usr',0,0,0);
    arr('login',6,'id,nombre,precio,cantidad,sunidad',42,'1','',1,$("#listainsumos"));

});

$(document).on("click",".load",function(){
	$("#addtipo").removeClass('add');
	$("#addtipo").addClass('edit');
	$("#addtipo").html('Guardar');
    $("#addtipo").attr('id','acttipo');

});

$(document).on("click","#editCanDevo",function(){
	// var id = $(this).attr('id').substr(4);
	$(".editCantDevo").removeAttr('readonly');
	$(".cantDevo").removeClass('label-default');
	$(".cantDevo").addClass('label-warning');
	// #f0ad4e
});

$(document).on("click","#editCannotDevo",function(){
	// var id = $(this).attr('id').substr(4);
	$(".editCantDevo").attr('readonly', true);
	$(".editCantDevo").val('');
	$(".cantDevo").removeClass('label-warning');
	$(".cantDevo").addClass('label-default');
});

$(document).on("click","#editCanInsu",function(){
	// var id = $(this).attr('id').substr(4);
	$(".editCantInsu").removeAttr('readonly');
	$(".cantInsu").removeClass('label-default');
	$(".cantInsu").addClass('label-warning');
	// #f0ad4e
});

$(document).on("click","#editCannotInsu",function(){
	// var id = $(this).attr('id').substr(4);
	$(".editCantInsu").attr('readonly', true);
	$(".editCantInsu").val('');
	$(".cantInsu").removeClass('label-warning');
	$(".cantInsu").addClass('label-default');
});

$(document).on("click","#editCanGasto",function(){
	$("#detalleGasto").removeAttr('readonly');
	$("#totGasto").removeAttr('readonly');
	$("#cantGasto").removeAttr('readonly');
	$("#commentFGasto").removeAttr('readonly');
});

$(document).on("click","#editCannotGasto",function(){
	$("#detalleGasto").attr('readonly', true);
	$("#totGasto").attr('readonly', true);
	$("#cantGasto").attr('readonly', true);
	$("#commentFGasto").attr('readonly', true);
});

$(document).on("click","#editCanCont",function(){
	$("#vdetallecont").removeAttr('readonly');
	$("#vidtipo").removeAttr('disabled');
	$("#vcantcont").removeAttr('readonly');
	$("#commentfdev").removeAttr('readonly')
});

$(document).on("click","#editCannotCont",function(){
	$("#vdetallecont").attr('readonly', true);
	$("#vidtipo").attr('disabled', true);
	$("#vcantcont").attr('readonly', true);
	$("#commentfdev").attr('readonly', true);
});

$(document).on("click","#Iadd",function(){
	deadclear('inventarios')

});

function validar (varreglo,vmodulo) {
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'insumo':
			if (vmodulo['tip'] == '') {
				err = validarinsumos();
				if ( err ) {
					return err;
				}
			}
			break;
		case 'tipoinsumo':
			if (vmodulo['tip'] == '') {
				err = validartipoinsumos();
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

function validarinsumos() {
	if ($("#vnombre").val() == ''){
	    $("#vnombre").focus();
	    return 'Nombre Insumo Requerido';
	}

	if ($("#vpreciocosto").val() <= 0){
	    $("#vpreciocosto").focus();
	    return 'Precio Costo deve ser Mayor a 0';
	}

	if ($("#vcantidad").val() < 0){
	    $("#vcantidad").focus();
	    return 'Cantidad debe ser Mayor o Igual a 0';
	}

	return false;
}

function validartipoinsumos() {
	if ($("#vnombretipo").val() == ''){
	    $("#vnombretipo").focus();
	    return 'Tipo de Insumo Requerido';
	}
	return false;
}

function cargar(vmodulo,vid) {
	switch(vmodulo['modulo']) {
		case 'insumos':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,precio as vpreciocosto,cantidad as vcantidad,idunidad as vidunidad';
			vmodulo['tbl'] = 42;
			vmodulo['where'] ='id = '+vid;
			break;
		case 'tipoinsumo':
			vmodulo['sel'] = 'id as vidtipo,nombre as vnombretipo';
			vmodulo['tbl'] = 100;
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
	    case 'insumos':
	    	var arr = {};
			arr['sel'] = 'id,nombre,precio,cantidad,sunidad';
			arr['tbl'] = 42;
			arr['where'] = '1';
	        break;
	    case 'tipoinsumos':
	    	var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 100;
			arr['where'] = 'id > 0 order by nombre limit 20';
	        break;
	}
	return arr;
}

function endDetail(id,acc,modulo) {
    thorload(modulo);
    deadclear(modulo);
}