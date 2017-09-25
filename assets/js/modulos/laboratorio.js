$(function(){

	$('.datepicker').pickadate({
         labelMonthNext: 'Siguiente',
         labelMonthPrev: 'Anterior',
         labelMonthSelect: 'Seleccione un Mes',
         labelYearSelect: 'Seleccione un Año',
         monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre' ],
         monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
         weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
         weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
         weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
         today: 'Hoy',
         clear: 'Limpiar',
         close: 'Cerrar'
    });

    param = getParameterByName('accion');
    param = param == '' ? 1 : parseInt(param)

    $(".modal").modal();
    
    switch(param){
    	case 1:
    		loadRecepcion();
    		break;
    }

});

function loadRecepcion(){
	console.log(12)
	var fecha = new Date();
    var dpick = $('#vfecha').pickadate()
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'laboratorio':
			if (vmodulo['tip'] == '') {
				err = validarlaboratorio();
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

function validarlaboratorio() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'laboratorio':
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