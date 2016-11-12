$(function(){
	arr('login',6,'*',51,'id > 0 order by id','',1,$("#dimpuestos"));
	$("#mail").focus();
	$("#correo").submit(function(){
		if ($("#mail").val() != '') {
			var aleatorio = Math.random().toString(36).substring(7).toUpperCase();
			var code = arr('login',4,'',46,'\"'+aleatorio+'\",@@usr','',0,'')[0][0];
			var body = "<h2>Saludos de parte de Login Technologies S.A</h2><br><p>Gracias por comprar nuestros productos</p><br>Su codigo de activación es: "+code;
			enviarCorreo(1,$("#mail").val(),'Cambio de Contraseña Sistema LT',body,'');
			$(this).hide();
			$("#licencia").show();
			$("#suc1").show();
			$("#sucm1").html('Se ha enviado el código de activación a su correo');
			$("#vlicencia").focus();
		}else{
			$("#err1").show();
			$("#errm1").html('Correo Requerido');
		}
		return false;
	});
	// 2F78B7
// CAROUSEL
	$(".left").click(function(){
        $("#carousel").carousel("prev");
    });
    $(".right").click(function(){
        $("#carousel").carousel("next");
    });
// END CAROUSEL

	$("#licencia").submit(function(){
		var code = arr('login',4,'aes_decrypt(codigo,"lt2016")',1,'id = @@usr and bcambioPSSW = 1','',0,'')[0][0];
		if ($("#vlicencia").val() == code) {
			$("#licencia").hide();
			$("#bienvenida").show();
			$("#hb").hide();
			arr('login',6,'*',51,'id > 0 order by id','',1,$("#dimpuestos"));
		}else{
			$("#err4").show();
			$("#errm4").html('Código Erroneo');
		}
		return false;
	});

});

$(document).on("click","#addimp",function(){
	var nombre = $("#vimpuesto").val();
	mantimpuesto(nombre);
});

$(document).on("keyup","#vimpuesto",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		var nombre = $("#vimpuesto").val();
		mantimpuesto(nombre);
	}
});

$(document).on("click",".delimp",function(){
	var id = $(this).attr('id');
	var impuesto = arr('login',4,'',48,'3,'+id+',"",0.00','',0,'');
	$("#suc5").show();
	$("#sucm5").html('Impuesto de '+impuesto[0][0]+' Eliminado Correctamente');
	arr('login',6,'*',51,'id > 0','',1,$("#dimpuestos"));
});

$(document).on("click","#actinfo",function(){
	$(".infoempresa").each(function(){
		var id = $(this).attr('id');
		var valor = $("#"+id).val();
		var field = $(this).attr('field');
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 47;
		arr['where'] = '\"'+valor+'\",\"'+field+'\"';
		mantenimiento('login',4,arr);
	});
	$("input[name=impuesto]").each(function(){
		var id = $(this).attr('id');
		var value = $(this).val();
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '2,'+id+',"",\"'+value+'\"';
		mantenimiento('login',4,arr);
	});
	window.open('../dashboard/logout','_self');
});

// $(document).on("click","#addinfo",function(){
// 	var validar = validarAjuste();
// 	if(validar  == false){
// 		var arr = {};
// 		arr['sel'] = '';
// 		arr['tbl'] = 47;
// 		arr['where'] = '1,\"'+$("#vnombre").val()+'\",\"'+$("#vcedula").val()+'\",\"'+$("#vtelefono").val()+'\",\"'+$("#vcorreo").val()+'\",\"'+$("#vdireccion").val()+'\"'
// 		mantenimiento('login',4,arr);
// 		$("#info").hide();
// 		$("#imp").show();
// 	}else{
// 		$("#err2").show();
// 		$("#errm2").html(validar)
// 	}

// });

// $(document).on("click","#saveim",function(){

// 	var imv = $("#vimv").val();
// 	var ims = $("#vims").val();
// 	var imp = $("#vimp").val();
// 	var imsa = $("#vimsa").val();
// 	var validar = validarImpuesto();
// 	if(validar  == false){
// 		var arr = {};
// 		arr['sel'] = '';
// 		arr['tbl'] = 48;
// 		arr['where'] = '1,\"'+imv+'\",\"'+ims+'\",\"'+imp+'\",\"'+imsa+'\"'
// 		mantenimiento('login',4,arr);

// 		var arr = {};
// 		arr['accion'] = 2;
// 		arr['tabla'] = 1;
// 		arr['arg1'] = 'bcambioPSSW = 0';
// 		arr['arg2'] = 'id = @@usr';
// 		window.open('../dashboard/logout','_self');

// 	}else{
// 		$("#err2").show();
// 		$("#errm2").html(validar)
// 	}

// });

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

function mantimpuesto(nombre) {
	$("#err5").hide();
	if (nombre != '') {
		var impuesto = arr('login',4,'',48,'1,0,\"'+nombre+'\",0.00','',0,'');
		if (impuesto[0][0] != undefined) {
			arr('login',6,'*',51,'id > 0','',1,$("#dimpuestos"));
		}else{
			$("#err5").show();
			$("#errm5").html(impuesto[0]['ERROR']);
		}
		$("#vimpuesto").select();
	}
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