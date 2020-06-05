$(function(){
	
	$("#usr_name").focus()

	$(".mn2").click(function(){
		var num = $(this).attr('num')
		$(".sect").addClass('hide')
		$("#sect"+num).removeClass('hide')
	});

	$("#mnt-empleado").click(function(){
		$("#modal-empleado").modal('open')
	});

});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'rrhh':
			if (vmodulo['tip'] == '') {
				err = validarrrhh();
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

function validarrrhh() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'rrhh':
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