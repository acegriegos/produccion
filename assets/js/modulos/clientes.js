$(function(){
	
	$("#fclientess").submit(function(){return false});
	$("#data-table-clientess").dataTable();

	$("#ingClie").click(function(){
		$("#titModal").html('Agregar Cliente');
		$("#agClie").html('Agregar');

		$("#agClie").removeClass('edit');
		$("#agClie").addClass('add');

		deadclear('cliente');

		$("#ln1").click();
		$("#videstado").val(1);
	});

	$(".load").click(function(){
		$("#titModal").html('Editar Cliente');
		$("#agClie").html('Editar');

		$("#agClie").removeClass('add');
		$("#agClie").addClass('edit');
	})

	$("[id^=ln]").click(function(){
		var id = $(this).attr('id').substr(2);
		$(".ptr").hide()
		$(".parte"+id).show()
		$("[id^=ln]").removeClass('active')
		$(this).addClass('active')
	});

	$("#cuentasclientes").multiSelect();

});

$(document).on("click","input[name='tipoclie']",function(){
	var tipo = $(this).attr('tipoClie');

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
	var tipo = $(this).attr('tipoClie');
	$("#vidtipocliente").val(tipo);
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
		case 'telefono':
			break;
		case 'ubicacione':
			break;	
		case 'defectocuenta':
			break;	
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarclientes() {

	if ($("#vnombre").val() == ''){ $('#ln1').click(); $("#vnombre").focus(); return 'El campo Nombre es requerido';  };
	if ($("#vcedula").val() == ''){	$('#ln1').click(); $("#vcedula").focus(); return 'El campo Cédula es requerida';  };
	if ($("#videstado").val() == 0) {$('#ln1').click(); $("#videstado").focus(); return 'Debe Seleccionar un Estado';}
	if ($("#vcredito").val() == ''){$("#vcredito").val(0)}
	if ($("#vplazo").val() == '') {$("#vplazo").val(0)}
	if ($("#vdescuentop").val() == ''){$("#vdescuentop").val(0)}
	if ($("#vdescuentom").val() == '') {$("#vdescuentom").val(0)}
	if ($("#vlatitud").val() == ''){$("#vlatitud").val(0)}
	if ($("#vlongitud").val() == '') {$("#vlongitud").val(0)}
	return false;

}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'cliente':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 31;
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
	arr['tbl'] = 29;
	arr['where'] = 'vid > 0';

	return arr;
}