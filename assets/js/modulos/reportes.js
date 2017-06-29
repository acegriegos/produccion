$(function(){
	$("#freportess").submit(function(){return false});
	$("#data-table-reportess").dataTable();

	$(".menu5").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu5").removeClass('active');
		$(this).addClass('active');

		switch(parseInt(id)){
			case 1:
				// $("#mant_nombre_").hide();
				var p = mantenimiento('reportes',1,'');
				$("#mreportes").html(p);
				break;
			case 2:
				// $("#mant_nombre_").hide();
				var p = mantenimiento('reportes',2,'');
				$("#mreportes").html(p);
				break;
		}
	});

	$(".report").click(function(){
		var rep = $(this).attr('rep');
		window.open('?accion=1&rep='+rep,'',"width=2000, height=650");
		
	});
	$("#m1").click();
});


    $('select').material_select();

$(document).on("click","#Iadd",function(){
	deadclear('reportes')

});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'reportes':
			if (vmodulo['tip'] == '') {
				err = validarreportes();
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

function validarreportes() {



	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'reportes':
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