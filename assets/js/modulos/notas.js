$(function(){
	$("#fnotass").submit(function(){return false});
	$("#data-table-notass").dataTable();
	$("[id^=ftr]").hide();
	


});

$(document).on("click","#Iadd",function(){
	deadclear('notas')

});
$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15, // Creates a dropdown of 15 years to control year
    	format: 'yyyy-mm-dd'
  	});
   fecha = new Date();
    $('.vfecha').pickadate();

	$('select').material_select();

$("#data-table-Notas").dataTable({

		bFilter: false,
		order : [],
		"bLengthChange": false
	});


function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'notas':
			if (vmodulo['tip'] == '') {
				err = validarnotas();
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

function validarnotas() {


	return false;
}

function endDetail(vid){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'notas':
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