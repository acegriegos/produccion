$(function(){
	$("#fproveedoress").submit(function(){return false});
	$("#data-table-proveedoress").dataTable();

	$("#ingProv").click(function(){
		$("#vcedula").focus();
		$("#titModal").html('Agregar Proveedor');
		$("#agProv").html('Agregar');

		$("#agProv").removeClass('edit');
		$("#agProv").addClass('add');
		
		deadclear('proveedor');



	})

	$(".load").click(function(){
		$("#titModal").html('Editar Proveedor');
		$("#agProv").html('Editar');

		$("#agProv").removeClass('add');
		$("#agProv").addClass('edit');
	})

});

$(document).on("click","#Iadd",function(){
	deadclear('proveedores');

});

function validar (varreglo,vmodulo) {
	
	var salida = {};
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'proveedore':
			if (vmodulo['tip'] == '') {
				err = validarproveedores();
				if ( err ) {
					return err;
				}
			}
			
			break;

		case 'correo':
			break;

		case 'telefono':
			break;

		default:
			console.error('varreglo');
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");

	return salida;

}

function validarproveedores() {

	if ($("#vnombre").val() == ''){ return 'El campo <b>Nombre</b> es requerido'; $("#vnombre").focus(); };
	if ($("#vcedula").val() == ''){	return 'El campo <b>Cédula</b> es requerida'; $("#vcedula").focus(); };

	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'proveedore':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 18;
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
	arr['tbl'] = 19;
	arr['where'] = 'id > 0';

	return arr;
}