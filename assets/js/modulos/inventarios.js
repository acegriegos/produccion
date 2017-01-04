$(function(){
	$("#finventarioss").submit(function(){return false});
	

	$(".menu5").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu5").removeClass('active');
		$(this).addClass('active');

		switch(parseInt(id)){
			case 1:
				var p = mantenimiento('inventarios',1,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 2:
				var p = mantenimiento('inventarios',2,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 3:
				var p = mantenimiento('inventarios',3,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 4:
				var p = mantenimiento('inventarios',4,'');
				$("#bdymantInvGeneral").html(p);
				break;
		}
		$('#addtipoinsumo').sideNav({
			menuWidth: 300, // Default is 240
			edge: 'right', // Choose the horizontal origin
			closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
			draggable: true // Choose whether you can drag to open on touch screens
      });

		$('.modal').modal({
		    dismissible: true, // Modal can be dismissed by clicking outside of the modal
		    opacity: .5, // Opacity of modal background
		    in_duration: 300, // Transition in duration
		    out_duration: 200, // Transition out duration
		    starting_top: '6%', // Starting top style attribute
		    ending_top: '5%' // Ending top style attribute
		});
		$('select').material_select();
	});

	$("#m1").click();

});

$(document).ready(function(){
	
});

$(document).on("click","#addtipoinsumo",function(){
	alert(1)
	// $("#data-table-tipoinsumos").dataTable({
	// 	bFilter : false,
	// 	bScrollInfinite : true,
	// 	bSort : false,
	// 	bLengthChange : false,
	// 	bPaginate :  false,
	// 	bInfo : false
	// });
    // arr('login',6,'*',100,'id > 0 order by nombre limit 20',0,1,$("#listatipoinsumos"))
});

$(document).on("click",".del",function(){
    var id = $(this).attr('id').substr(1);
    Materialize.toast('Desea Borrar este Insumo? <button type="button" class="waves-effect waves-light btn blue accept" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="fa fa-times"></i></button>', 10000, 'rounded');
    
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