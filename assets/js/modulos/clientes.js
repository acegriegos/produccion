$(function(){
	$("#fclientess").submit(function(){return false});
	$("#data-table-clientess").dataTable();

});

$(document).on("click","input[name='tipoclie']",function(){
	var tipo = $(this).val();

	if (tipo == 1) {
		$("#titInfo").html('<b>Datos Personales<b/>');
		$("#nomClie").html('<b>Nombre</b>');
		$("#colMod").addClass("col-md-6 col-lg-6");
		$("#colMod").removeClass("col-md-12 col-lg-12");
		$("#vcedula").attr('data-mask', '9-9999-9999');
		$(".hid").show(300);
	} else if (tipo == 2) {
		$("#titInfo").html('<b>Información Jurídica<b/>');
		$("#nomClie").html('<b>Razón Social</b>');
		$("#colMod").removeClass("col-md-6 col-lg-6");
		$("#colMod").addClass("col-md-12 col-lg-12");
		$("#vcedula").attr('data-mask', '9-999-999999');
		$(".hid").css('display','none');
	}
});

$(document).on("click","#Iadd",function(){
	deadclear('clientes')
});

$(document).on("click","input[name=tipoclie]",function(){
	
	var tipo = $(this).attr('value');
	$("#vidtipoCliente").val(tipo);
	
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'cliente':
			if (vmodulo['tip'] == '') {
				err = validarclientes();
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

function validarclientes() {


	return false;

}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'cliente':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 28;
			vmodulo['where'] = vid;
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '*';
	arr['tbl'] = 6;
	arr['where'] = 'id > 0';

	return arr;
}

// function guardarEnrutador(enrutador,id){
// 	alert(id)
// 	if (enrutador == 1) {

// 		var varreglo = {};

// 		$(".enrutador").each(function(i,obj){
// 			varreglo['modulo'] = $(obj).attr('tabla');
//     		varreglo['atributos'] = mantenimiento('login',1,varreglo);
// 		});
// 	}
// }