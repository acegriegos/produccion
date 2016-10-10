$(function(){
	$("#fajustess").submit(function(){return false});
	$("#data-table-ajustess").dataTable();

	$("#m3").click();
	//carga datos de la empresa
		// fin

	

});

$(document).on("click",".menu3",function(){
	$(".menu3").removeClass('active');
		$(this).addClass('active');
	
		var id = parseInt($(this).attr('id').substr(1));
		switch(id){
			case 1:
				var p = mantenimiento('ajustes',2,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				var arr = {};
				arr['sel'] = 'valor';
				arr['tbl'] = 50;
				arr['where'] = '';
				var e = mantenimiento('login',4,arr)[0];
				$("#vnombre").val(e[0]);
				$("#vcedula").val(e[1]);
				$("#vtelefono").val(e[2]);
				$("#vcorreo").val(e[3]);
				$("#vdireccion").val(e[4]);
				$("#vfechainicio").val(e[5]);
				$("#vfechafinal").val(e[6]);
				break;
			case 2:
				var p = mantenimiento('ajustes',3,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				var arr = {};
				arr['sel'] = '*';
				arr['tbl'] = 51;
				arr['where'] = 'id > 0 order by id';
				var imp = mantenimiento('login',6,arr);
				$("#dimpuestos").html(imp);
				break;
			case 3:
				var p = mantenimiento('ajustes',4,'');
				$("#majustes").html('');
				$("#majustes").html(p);
		}
		
});

$(document).on("click","#addimp",function(){
	if ($("#vimpuesto").val() != '') {

		var nombre = $("#vimpuesto").val();
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '1,0,\"'+nombre+'\",0.00';
		mantenimiento('login',4,arr);

		var arr2 = {};
		arr2['sel'] = '*';
		arr2['tbl'] = 51;
		arr2['where'] = 'id > 0 order by id';
		var p = mantenimiento('login',6,arr2);
		$("#dimpuestos").html('');
		$("#dimpuestos").html(p);
		$("#vimpuesto").val('');
	}
});

$(document).on("click",".delimp",function(){
	var id = $(this).attr('id');

	var arr = {};
	arr['sel'] = '';
	arr['tbl'] = 48;
	arr['where'] = '3,'+id+',0.00';
	mantenimiento('login',4,arr);

	var arr2 = {};
	arr2['sel'] = '*';
	arr2['tbl'] = 51;
	arr2['where'] = 'id > 0 order by id';
	var p = mantenimiento('login',6,arr2);
	$("#dimpuestos").html('');
	$("#dimpuestos").html(p);

});

$(document).on("click","#actinfo",function(){
	$("#suc1").hide();
	$("#err1").hide();

	var validar = validarAjuste();
	if (validar == false) {
		$(".infoempresa").each(function(){
			var valor = $(this).val();
			var campo = $(this).attr('field');
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 47;
			arr['where'] = '\"'+valor+'\",\"'+campo+'\"';
			mantenimiento('login',4,arr);
		});
		
		$("#suc1").show();
		$("#sucm1").html('Datos Ingresados Correctamente');
	}else{
		$("#err1").show();
		$("#errm1").html(validar);
	}
	
});

$(document).on("click","#actimp",function(){
	$("input[name=impuesto]").each(function(){
		var valor = $(this).val();
		var id = $(this).attr('id');

		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '2,'+id+',"",'+valor;
		mantenimiento('login',4,arr);
	});
	
});

$(document).on("click","#sfechafiscal",function(){
	var arr = {};
	arr['sel'] = '';
	arr['tbl'] = 52;
	arr['where'] = '\"'+$("#vfechainicio").val()+'\",\"'+$("#vfechafinal").val()+'\"';
	mantenimiento('login',4,arr);
});

$(document).on("click","#Iadd",function(){
	deadclear('ajustes')
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'ajustes':
			if (vmodulo['tip'] == '') {
				err = validarajustes();
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

function validarAjuste() {
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre de la Empresa Requerido";
	}

	if ($("#vcedula").val() == '') {
		$("#vcedula").focus();
		return "Cédula Jurídica Requerida";
	}

	if ($("#vtelefono").val() == '') {
		$("#vtelefono").focus();
		return "Teléfono de la Empresa Requerido";
	}

	if ($("#vcorreo").val() == '') {
		$("#vcorreo").focus();
		return "Correo de la Empresa Requerido";
	}

	if ($("#vdireccion").val() == '') {
		$("#vdireccion").focus();
		return "Dirección de la Empresa Requerida";
	}
	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'ajustes':
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