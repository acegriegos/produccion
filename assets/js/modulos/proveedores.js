var cuentas = '<option value="0">Seleccione una Cuenta</option>';

$(function(){
	cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
	for (var i = 0; i < cuentas_arr[0].length; i++) {
		cuentas += '<option value="'+cuentas_arr[0][i][0]+'">'+cuentas_arr[0][i][1]+'</option>';
	}

	$("#fproveedoress").submit(function(){return false});
	$("#data-table-proveedoress").dataTable();
	$('.dropdown-button').dropdown();
	$('.modal').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		in_duration: 300, // Transition in duration
		out_duration: 200, // Transition out duration
		starting_top: '6%', // Starting top style attribute
		ending_top: '5%' // Ending top style attribute
	});

	$(".load").click(function(){
		$("#titModal").html('Editar Proveedor');
		$("#agProv").html('Editar');
		$("#agProv").removeClass('add');
		$("#agProv").addClass('edit');
	});
});

$(document).ready(function() {
    $('select').material_select();
  });

$(document).ready(function(){
	$("#ingProv").click(function(){
		$("#vcedula").focus();
		$("#titModal").html('Agregar Proveedor');
		$("#agProv").html('Agregar');

		$("#agProv").removeClass('edit');
		$("#agProv").addClass('add');
		deadclear('proveedor');
		$("#ln1").click();
		$("#videstado").val('');
		obtenerCuentas(0);
	});
});

$(document).on("click",".mnprov",function(){
	var id = $(this).attr('id').substr(2);
	$(".ptr").hide();
	$(".parte"+id).show();
	$(".mnprov").removeClass('active');
	$(this).addClass('active');
});

$(document).on("click","#ln2",function(){
	arr('login',6,'id,nombre,valor,concat(replace(valor,".00",""),"%")',94,'id > 0','',1,$("#vdescuentop"));
});

$(document).on("click",".typephone",function(){
	var tipo = parseInt($(this).attr('tipo').substr(1));
	var ai = $("#num").val();
	ai += 1;
	switch(tipo){
		case 1:
			$("#variostelefonos").append('<div class="col-md-4 col-lg-4" id="dt'+ai+'"><div class="input-group"><div class="input-group-addon"><b><i class="fa fa-home" aria-hidden="true"></i></b></div><input type="text" class="form-control eder" id="vtrabajo" vidtipo="'+tipo+'" placeholder="Casa" data-mask="9999-9999"><div class="input-group-addon asterisco delphone but" num="'+ai+'"><i class="fa fa-times"></i></div></div></div>');
			break;
		case 2:
			$("#variostelefonos").append('<div class="col-md-4 col-lg-4" id="dt'+ai+'"><div class="input-group"><div class="input-group-addon"><b><i class="fa fa-mobile" aria-hidden="true"></i></b></div><input type="text" class="form-control eder" id="vtrabajo" vidtipo="'+tipo+'" placeholder="Movil" data-mask="9999-9999"><div class="input-group-addon asterisco delphone but" num="'+ai+'"><i class="fa fa-times"></i></div></div></div>');
			break;
		case 3:
			$("#variostelefonos").append('<div class="col-md-4 col-lg-4" id="dt'+ai+'"><div class="input-group"><div class="input-group-addon"><b><i class="fa fa-building" aria-hidden="true"></i></b></div><input type="text" class="form-control eder" id="vtrabajo" vidtipo="'+tipo+'" placeholder="Trabajo" data-mask="9999-9999"><div class="input-group-addon asterisco delphone but" num="'+ai+'"><i class="fa fa-times"></i></div></div></div>');
			break;
		case 4:
			$("#variostelefonos").append('<div class="col-md-4 col-lg-4" id="dt'+ai+'"><div class="input-group"><div class="input-group-addon"><b><i class="fa fa-fax" aria-hidden="true"></i></b></div><input type="text" class="form-control eder" id="vtrabajo" vidtipo="'+tipo+'" placeholder="Fax" data-mask="9999-9999"><div class="input-group-addon asterisco delphone but" num="'+ai+'"><i class="fa fa-times"></i></div></div></div>');
			break;
	}
	$("#num").val(ai);
});

$(document).on("click",".delphone",function(){
	var id = $(this).attr('num');
	$("#dt"+id).remove();
});

$(document).on("click","#addmail",function(){
	var id = parseInt($(this).attr('num'));
	id += 1;
	$("#varioscorreos").append('<div class="col-md-6 col-lg-6" id="dm'+id+'"><div class="input-group"><div class="input-group-addon"><b><i class="fa fa-envelope" aria-hidden="true"></i><small> ('+id+')</small></b></div><input type="text" class="form-control eder" id="vcorreo1" placeholder="ejemplo@dominio.com"><div class="input-group-addon asterisco but"><i class="fa fa-times delmail" num="'+id+'"></i></div></div></div>');
	$(this).attr('num',id);

});

$(document).on("click",".delmail",function(){
	var id = $(this).attr('num');
	$("#dm"+id).remove();
});

function validar (varreglo,vmodulo) {
	
	var salida = {};

		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'cliente':
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
			console.error(varreglo);
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");

	return salida;

}

function validarproveedores() {

	if ($("#vnombre").val() == '') {
		$("#ln1").click();
		$("#vnombre").focus();
		return "Razón Social Requerido"
	}
	if ($("#vcedula").val() == '') {
		$("#ln1").click();
		$("#vcedula").focus();
		return "Cédula Jurídica Requerida"
	}
	if ($("#videstado").val() == '') {
		$("#ln1").click();
		$("#videstado").focus();
		return "Estado Requerido"
	}
	if ($("#vtrabajo").val() == '' && $("#vtrabajo2").val() == '' && $("#vmovil").val() == '') {
		$("#ln1").click();
		$("#videstado").focus();
		return "Al Menos un Teléfono es Requerido"
	}
	
	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'proveedore':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 32;
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

	arr['sel'] = 'vid,vcedula,vnombre,vtelefonos,vcorreos,vweb';
	arr['tbl'] = 30;
	arr['where'] = 'vid > 0';

	return arr;
}

function getFila(valor,vtipo,vdh,vtp){

	return '<div class="input-group ctas" id="fl'+valor+'"><select noClear="1" class="form-control cta-array" tp="'+vtp+'" dh="'+vdh+'" id="my-array'+valor+'" >'+cuentas+'</select><div class="input-group-addon" style="display:none" >-</div><input type="number" noClear="1" class="form-control eder" id="pr'+valor+'"  style="display:none" placeholder="Porcentaje de la Cuenta" value="100"><div class="input-group-addon"><b>'+vtipo+'</b></div><div class="input-group-addon btn delcetap" style="display:none"><i class="fa fa-times delcta" tp="'+valor+'"></i></div></div>';
}

function obtenerCuentas(vid){
	var cuentasg = arr('login',4,'',85,'2,'+vid+',"5,6"','',0,'');

	$("#ctacontado").html('');
	$("#ctacredito").html('');

	for (var i = 0; i < cuentasg[0].length; i++) {
		if (cuentasg[0][i][5] == 5) {
			$("#ctacontado").append(getFila(cuentasg[0][i][0],cuentasg[0][i][8],cuentasg[0][i][7],cuentasg[0][i][5]));
		}else{
			$("#ctacredito").append(getFila(cuentasg[0][i][0],cuentasg[0][i][8],cuentasg[0][i][7],cuentasg[0][i][5]));
		}
		$("#my-array"+cuentasg[0][i][0]).val(cuentasg[0][i][1]);
	}

	$("#vidcuenta").val('');
}