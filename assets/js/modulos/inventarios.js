$(function(){
	$("#finventarioss").submit(function(){return false});
	$("#data-table-inventarioss").dataTable();

	$(".menu5").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu5").removeClass('active');
		$(this).addClass('active');

		switch(parseInt(id)){
			case 1:
				$("#mantinsumos").hide();
				$("#mantgastos").hide();
				$("#mantcontable").hide();
				var p = mantenimiento('inventarios',1,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 2:
				$("#mantdevoluciones").hide();
				$("#mantgastos").hide();
				$("#mantcontable").hide();
				var p = mantenimiento('inventarios',2,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 3:
				$("#mantdevoluciones").hide();
				$("#mantinsumos").hide();
				$("#mantcontable").hide();
				var p = mantenimiento('inventarios',3,'');
				$("#bdymantInvGeneral").html(p);
				break;
			case 4:
				$("#mantdevoluciones").hide();
				$("#mantinsumos").hide();
				$("#mantgastos").hide();
				var p = mantenimiento('inventarios',4,'');
				$("#bdymantInvGeneral").html(p);
				break;
		}
	});

	$("#m4").click();

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
		case 'inventarios':
			if (vmodulo['tip'] == '') {
				err = validarinventarios();
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

function validarinventarios() {



	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'inventarios':
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