$(function(){
	$(".menu").click(function(){
		var id = $(this).attr('id').substr(1);
		var bdy = $("#mainbdy");
		var p;
		bdy.html('');
		arr('rutas',id,'','','',0,1,bdy);
		$(".menu").removeClass('active');
		$("#m"+id).addClass('active');
        switch(parseInt(id)) {
        	case 1:
			    $("#data-table-rutas").dataTable({
					bFilter: false,
					order : [],
					"bLengthChange": false
				});
        		break;
        	case 2:
        		break;
        	case 3:
        		break;
        	default:
        	 	break;
        }

        $('.modal').modal(); 
	});

	$("#m1").click();

});

$(document).on("click","#ingRut",function(){
	deadclear('ruta');
	$("#vnombre").focus();
	$("#titrut").html('Ingresar Ruta');
	$("#garuta").removeClass('edit');
	$("#garuta").addClass('add');
});

$(document).on("click",".load",function(){
    $("#vnombre").select().focus();
    $("#titrut").html('Actualizar Ruta');
    $("#garuta").removeClass('add');
    $("#garuta").addClass('edit');
})

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'ruta':
			if (vmodulo['tip'] == '') {
				err = validarrutas();
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

function validarrutas() {

	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return 'Nombre de Ruta Requerido';
	}

	return false;
}

function endDetail(vid,vacc,modulo){

	if (vacc == 1) {
		setTimeout(function(){ deadclear('ruta'); }, 500);
	}
	
    thorload('ruta');

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'ruta':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,codigoruta as vcodigoruta';
			vmodulo['tbl'] = 208;
			vmodulo['where'] ='id = '+vid;
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
	arr['tbl'] = 208;
	arr['where'] = 'id > 0';

	return arr;
}