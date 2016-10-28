$(function(){
	
	$("#fclientes").submit(function(){return false});
	$("#data-table-clientess").dataTable();

	$("#fclientes input").keyup(function(e){
		var code = e.which || e.keyCode;
		if (code == 13) {
			$("#agClie").click();
		}
	});

	$(".addcta").click(function(){
		tp = $(this).attr('tp');
		det = "ctacontado";
		if(tp == 2)
			det = "ctacredito";
		$("#vidcuenta").val(1);

		$("#"+det).append(getFila(0,'',0));
	});

	$("#ingClie").click(function(){
		$("#titModal").html('Agregar Cliente');
		$("#agClie").html('Agregar');

		$("#agClie").removeClass('edit');
		$("#agClie").addClass('add');

		deadclear('cliente');

		$("#ln1").click();
		$("#videstado").val(1);
		var cont = arr('login',4,'',85,'1,1,0','',0,'');
		var cred = arr('login',4,'',85,'1,2,0','',0,'');
		var conh = creh = '';

		for (var i = 0; i < cont[0].length; i++) {
			conh += getFila(cont[0][i][0],cont[0][i][1],cont[0][i][5]);
		}

		for (var i = 0; i < cred[0].length; i++) {
			creh += getFila(cred[0][i][0],cred[0][i][1],cred[0][i][5]);
		}

		$("#ctacontado").html(conh);
		$("#ctacredito").html(creh);
	});

	$(".load").click(function(){
		$("#titModal").html('Editar Cliente');
		$("#agClie").html('Editar');

		$("#agClie").removeClass('add');
		$("#agClie").addClass('edit');

		$("#ln1").click();
	})

	$("[id^=ln]").click(function(){
		var id = $(this).attr('id').substr(2);
		$(".ptr").hide()
		$(".parte"+id).show()
		$("[id^=ln]").removeClass('active')
		$(this).addClass('active')
	});

	$("#cuentasclientes").multiSelect();

});

$(document).on("click",".delcta",function(){
		tp = $(this).attr('tp');
		$("#vidcuenta").val(1);
		$("#fl"+tp).remove();
})
$(document).on("click","input[name='tipoclie']",function(){
	var tipo = $(this).attr('tipoClie');

	if (tipo == 1) {
		$("#titInfo").html('<b>Datos Personales<b/>');
		$("#nomClie").html('<b>Nombre</b>');
		$("#colMod").addClass("col-md-6 col-lg-6");
		$("#colMod").removeClass("col-md-12 col-lg-12");
		$("#vcedula").attr('data-mask', '9-9999-9999');
		$(".hid").show(300);
	} else if (tipo == 2) {
		$("#titInfo").html('<b>Información Jurídica<b/>');
		$("#nomClie").html('<b>Razón Social</b>');
		$("#colMod").removeClass("col-md-6 col-lg-6");
		$("#colMod").addClass("col-md-12 col-lg-12");
		$("#vcedula").attr('data-mask', '9-999-999999');
		$(".hid").css('display','none');
	}
});

$(document).on("click","#Iadd",function(){
	deadclear('clientes')
});

$(document).on("click","input[name=tipoclie]",function(){
	var tipo = $(this).attr('tipoClie');
	$("#vidtipocliente").val(tipo);
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
		case 'telefono':
			break;
		case 'ubicacione':
			break;	
		case 'defectocuenta':
			break;	
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarclientes() {

	if ($("#vnombre").val() == ''){ $('#ln1').click(); $("#vnombre").focus(); return 'El campo Nombre es requerido';  };
	if ($("#vcedula").val() == ''){	$('#ln1').click(); $("#vcedula").focus(); return 'El campo Cédula es requerida';  };
	if ($("#videstado").val() == '') {$('#ln1').click(); $("#videstado").focus(); return 'Debe Seleccionar un Estado';}
	if ($("#vcredito").val() == ''){$("#vcredito").val(0)}
	if ($("#vplazo").val() == '') {$("#vplazo").val(0)}
	if ($("#vdescuentop").val() == ''){$("#vdescuentop").val(0)}
	if ($("#vdescuentom").val() == '') {$("#vdescuentom").val(0)}
	if ($("#vlatitud").val() == ''){$("#vlatitud").val(0)}
	if ($("#vlongitud").val() == '') {$("#vlongitud").val(0)}
	return false;

}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'cliente':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 31;
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

	arr['sel'] = '*';
	arr['tbl'] = 29;
	arr['where'] = 'vid > 0';

	return arr;
}

function getFila(valor,vnombre,vporcentaje){
	return '<div class="input-group ctas" id="fl'+valor+'"><div class="input-group-addon" id="ct'+valor+'">'+vnombre+'</div><input type="number" class="form-control eder" id="pr'+valor+'" placeholder="Porcentaje de la Cuenta" value="'+vporcentaje+'"><div class="input-group-addon">%</div><div class="input-group-addon btn"><i class="fa fa-times delcta" tp="'+valor+'"></i></div></div>'
}