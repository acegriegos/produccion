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
		arr['sel'] = 'codigo';
		arr['tbl'] = 1;
		arr['where'] = 'id = @@usr';
		var code = mantenimiento('login',4,arr)[0][0];
		// alert(code++$("#").)

		if ($("#vlicencia").val() == code) {
			$("#licencia").hide();
			$("#bienvenida").show();
			$("#hb").hide();
		}else{

		}
		return false;
	});

});

$(document).on("click",".addinfo",function(){
	var validar = validarAjuste();
	if(validar  == false){
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 47;
		arr['where'] = '1,\"'+$("#vnombre").val()+'\",\"'+$("#vcedula").val()+'\",\"'+$("#vtelefono").val()+'\",\"'+$("#vcorreo").val()+'\",\"'+$("#vdireccion").val()+'\"'
		mantenimiento('login',4,arr);
	}else{
		$("#err2").show();
		$("#errm2").html(validar)
	}

});

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