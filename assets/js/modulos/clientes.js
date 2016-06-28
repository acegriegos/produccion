$(function(){
	$("#fclientes").submit(function(){return false});
	$("#data-table-clientes").dataTable();

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

function guardarEnrutador(enrutador,id){
	alert(id)
	if (enrutador == 1) {

		var varreglo = {};

		$(".enrutador").each(function(i,obj){
			varreglo['modulo'] = $(obj).attr('tabla');
    		varreglo['atributos'] = mantenimiento('login',1,varreglo);
		});
	}
}