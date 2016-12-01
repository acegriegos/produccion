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

	$(".moneda").click(function(){
		if ($(this).attr('id') == 'dol1') {
			$("#dol2").attr('disabled', true);
			$("#con2").attr('disabled', false);
			$("#eur2").attr('disabled', false);
			$("#dol2").attr('checked', false);
		}else if ($(this).attr('id') == 'con1') {
			$("#con2").attr('disabled', true);
			$("#dol2").attr('disabled', false);
			$("#eur2").attr('disabled', false);
			$("#con2").attr('checked', false);
		}else if ($(this).attr('id') == 'eur1') {
			$("#eur2").attr('disabled', true);
			$("#dol2").attr('disabled', false);
			$("#con2").attr('disabled', false);
			$("#eur2").attr('checked', false);
		}
	});

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

//STEPS
	$(document).on("click",".right",function(){
		var val = parseFloat($(".container").attr('position'));
		if (val == 0) {

			$("#stp1").removeClass('active');
			$("#stp1").addClass('complete');
			$("#stp2").removeClass('disabled');
			$("#stp2").addClass('active');
			$(".container").attr('position',1);
			$(".progress-bar").animate({
			    width: "200%"
			}, 50);
		}else if (val == 1) {
			$("#stp2").removeClass('active');
			$("#stp2").addClass('complete');
			$("#stp3").removeClass('disabled');
			$("#stp3").addClass('active');
			$(".container").attr('position',2);
			$(".progress-bar").animate({
			    width: "400%"
			}, 50);
		}else if (val == 2) {
			$("#stp3").removeClass('active');
			$("#stp3").addClass('complete');
			$("#stp4").removeClass('disabled');
			$("#stp4").addClass('active');
			$(".container").attr('position',3);
			$(".progress-bar").animate({
			    width: "600%"
			}, 50);
		}
	});

	$(document).on("click",".left",function(){
		var val = parseFloat($(".container").attr('position'));
		if (val == 3) {
			$("#stp4").removeClass('active');
			$("#stp4").addClass('disabled');
			$("#stp3").removeClass('complete');
			$("#stp3").addClass('active');
			$(".container").attr('position',2);
			$(".progress-bar").animate({
			    width: "400%"
			}, 50);
		}else if (val == 2) {
			$("#stp3").removeClass('active');
			$("#stp3").addClass('disabled');
			$("#stp2").removeClass('complete');
			$("#stp2").addClass('active');
			$(".container").attr('position',1);
			$(".progress-bar").animate({
			    width: "200%"
			}, 50);
		}else if (val == 1) {
			$("#stp2").removeClass('active');
			$("#stp2").addClass('disabled');
			$("#stp1").removeClass('complete');
			$("#stp1").addClass('active');
			$(".container").attr('position',0);
			$(".progress-bar").animate({
			    width: "0%"
			}, 50);
		}
	});
//END STEPS

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