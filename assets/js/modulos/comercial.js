$(function(){
    dibujarGrafico("chartG1",'Reporte Morosidad de Ventas','Clientes','bar',{sel:'',tbl:212,where:'0,1'},0,1);
    permisos(1000,1500);

});

$(document).on("click","#Iadd",function(){
	deadclear('comercial')
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'comercial':
			if (vmodulo['tip'] == '') {
				err = validarcomercial();
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

function validarcomercial() {


	return false;
}

function endDetail(vid){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'comercial':
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