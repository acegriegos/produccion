$(function(){

	$("#correo").submit(function(){
		if ($("#vcorreo").val() != '') {
			var aleatorio = Math.random().toString(36).substring(7).toUpperCase();
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 46;
			arr['where'] = '\"'+aleatorio+'\",@@usr';
			var code = mantenimiento('login',4,arr)[0][0];

			var body = "<h2>Saludos de parte de Login Technologies S.A</h2><br><p>Gracias por comprar nuestros productos</p><br>Su codigo de activación es: "+code;
			enviarCorreo(1,$("#vcorreo").val(),'Cambio de Contraseña Sistema LT',body,'');
			$(this).hide();
			$("#licencia").show();
			$("#suc1").show();
			$("#sucm1").html('Se ha enviado el código de activación a su correo');
		}else{
			$("#err1").show();
			$("#errm1").html('Correo Requerido');
		}
		return false;
	});

	$("#licencia").submit(function(){
		var arr = {};
		arr['sel'] = 'aes_decrypt(codigo,"lt2016")';
		arr['tbl'] = 1;
		arr['where'] = 'id = @@usr and bcambioPSSW = 1';
		var code = mantenimiento('login',4,arr)[0][0];

		if ($("#vlicencia").val() == code) {
			$("#licencia").hide();
			$("#bienvenida").show();
			$("#hb").hide();
		}else{

		}
		return false;
	});

});

$(document).on("click","#addinfo",function(){
	var validar = validarAjuste();
	if(validar  == false){
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 47;
		arr['where'] = '1,\"'+$("#vnombre").val()+'\",\"'+$("#vcedula").val()+'\",\"'+$("#vtelefono").val()+'\",\"'+$("#vcorreo").val()+'\",\"'+$("#vdireccion").val()+'\"'
		mantenimiento('login',4,arr);
		$("#info").hide();
		$("#imp").show();
	}else{
		$("#err2").show();
		$("#errm2").html(validar)
	}

});

$(document).on("click","#saveim",function(){

	var imv = $("#vimv").val();
	var ims = $("#vims").val();
	var imp = $("#vimp").val();
	var imsa = $("#vimsa").val();
	var validar = validarImpuesto();
	if(validar  == false){
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '1,\"'+imv+'\",\"'+ims+'\",\"'+imp+'\",\"'+imsa+'\"'
		mantenimiento('login',4,arr);

		var arr = {};
		arr['accion'] = 2;
		arr['tabla'] = 1;
		arr['arg1'] = 'bcambioPSSW = 0';
		arr['arg2'] = 'id = @@usr';
		window.open('../dashboard/logout','_self');

	}else{
		$("#err2").show();
		$("#errm2").html(validar)
	}

});

// $(document).on("click","#finish",function(){
// 	if ($(this).attr('valida') == 2) {
		
// 		var arr = {};
// 		arr['accion'] = 2;
// 		arr['tabla'] = 1;
// 		arr['arg1'] = 'bcambioPSSW = 0';
// 		arr['arg2'] = 'id = @@usr';
// 		window.open('../dashboard/logout','_self');

// 	}
// });

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

function validarImpuesto() {
	if ($("#vimv").val() == '') {
		$("#vimv").focus();
		return "Impuesto de Venta Requerid";
	}

	if ($("#vims").val() == '') {
		$("#vims").focus();
		return "Impuesto de Servicio Requerido";
	}

	if ($("#vimp").val() == '') {
		$("#vimp").focus();
		return "Impuesto al Patrimonio Requerido";
	}

	if ($("#vimsa").val() == '') {
		$("#vimsa").focus();
		return "Impuesto a las Sociedades Requerido";
	}
	return false;
}