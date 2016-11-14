var cuentas = '<select noClear="1" class="form-control cta-array" style="padding-top: 7%;"><option value="0">Seleccione una Cuenta</option>';

$(function(){
	
	$("#fclientes").submit(function(){return false});
	$("#data-table-clientess").dataTable();
	cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
	// get_loc()
	for (var i = 0; i < cuentas_arr[0].length; i++) {
		cuentas += '<option value="'+cuentas_arr[0][i][0]+'">'+cuentas_arr[0][i][1]+'</option>';
	}
	cuentas += '</select>';

	$("#fclientes input").keyup(function(e){
		var code = e.which || e.keyCode;
		if (code == 13) {
			// cnt = $(".navbar-nav > a").length;
			// act = parseInt($(".navbar-nav > a.active").attr('id').substr(2));
			// if(act != cnt)
			// 	$("#ln"+(act+1)).click()
			// else
				$("#agClie").click()
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

		obtenerCuentas('null');
	});

	$(".load").click(function(){
		$("#titModal").html('Editar Cliente');
		$("#agClie").html('Editar');

		$("#agClie").removeClass('add');
		$("#agClie").addClass('edit');

		$("#ln1").click();
		obtenerCuentas($(this).attr('id').substr(1));
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
});

$(document).on("change",".cta-array",function(){
	vcta = $(this).parent().parent().attr('id');
	fila = $(this).parent().attr('id').substr(2);
	valor = $('option:selected',this).val();

	$("#"+vcta+" > #fl"+fila).attr('id','fl'+valor);
	$("#"+vcta+" > #fl"+valor+" > #pr"+fila).attr('id','pr'+valor);
	$("#"+vcta+" > #fl"+valor+" > .delcetap > .delcta").attr('tp',valor);
});

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
		case 'correo':
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
	else if ($("#vdescuentop").val() > 100){$('#ln2').click(); $("#vdescuentop").focus(); return 'Descuento no Puede Superar el 100%';}
	else if (isNaN($("#vdescuentop").val())){$('#ln2').click(); $("#vdescuentop").focus(); return 'Descuento no es Numérico';}


	if ($("#vdescuentom").val() == '') {$("#vdescuentom").val(0)}
	else if ($("#vdescuentom").val() > 100){$('#ln2').click(); $("#vdescuentom").focus(); return 'Descuento Máximo no Puede Superar el 100%';}
	else if (isNaN($("#vdescuentom").val())){$('#ln2').click(); $("#vdescuentom").focus(); return 'Descuento Máximo no es Numérico';}

	if ($("#vlatitud").val() == ''){$("#vlatitud").val(0)}
	if ($("#vlongitud").val() == '') {$("#vlongitud").val(0)}

	
	if($("#vidcuenta").val() == 1){
		salida = '';
		vsum = 0;
		vdefecto = '';
		//VALIDAR CUENTAS IGUALES
		$("#ctacontado > .ctas").each(function(){
			vid = $(this).attr('id').substr(2);

			vsum += parseFloat($("#ctacontado > #fl"+vid+" > #pr"+vid).val());
			if($("#ctacontado > #fl"+vid+" > #pr"+vid).val() == 0 || $("#ctacontado > #fl"+vid+" > #pr"+vid).val() == ''){
				$('#ln2').click();
				$("#ctacontado > #fl"+vid+" > #pr"+vid).focus()
				salida = 'Campo Contable sin Datos';
			}

			if($("#ctacontado > #fl"+vid+" > .cta-array").val() == 0 ){
				$('#ln2').click();
				$("#ctacontado > #fl"+vid+" > .cta-array").focus()
				salida = 'Campo Contable no Válido';
			}

			vdefecto += '['+$("#ctacontado > #fl"+vid+" > .cta-array").val()+',2,?,0,1,'+$("#ctacontado > #fl"+vid+" > #pr"+vid).val()+',1]:';
		});

		if (vsum != 100) {
			$('#ln2').click();
			return 'Porcentajes Incorrectos en Cuentas Contado'
		}

		if (salida != '')  
			return salida
		vsum = 0;

		$("#ctacredito > .ctas").each(function(){
			vid = $(this).attr('id').substr(2);
			vsum += parseFloat($("#ctacredito > #fl"+vid+" > #pr"+vid).val());
			if($("#ctacredito > #fl"+vid+" > #pr"+vid).val() == 0 || $("#ctacredito > #fl"+vid+" > #pr"+vid).val() == ''){
				$('#ln2').click();
				$("#ctacredito > #fl"+vid+" > #pr"+vid).focus()
				salida = 'Campo Contable sin Datos';
			}

			if($("#ctacredito > #fl"+vid+" > .cta-array").val() == 0 ){
				$('#ln2').click();
				$("#ctacredito > #fl"+vid+" > .cta-array").focus()
				salida = 'Campo Contable no Válido';
			}

			vdefecto += '['+$("#ctacredito > #fl"+vid+" > .cta-array").val()+',2,?,0,3,'+$("#ctacredito > #fl"+vid+" > #pr"+vid).val()+',1]:';
		});

		if (salida != '')  
			return salida

		if (vsum != 100) {
			$('#ln2').click();
			return 'Porcentajes Incorrectos en Cuentas Crédito'
		}

		$("#vidcuenta").val(vdefecto);
	}

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

function getFila(valor,vporcentaje){

	return '<div class="input-group ctas" id="fl'+valor+'">'+cuentas+'<div class="input-group-addon">-</div><input type="number" noClear="1" class="form-control eder" id="pr'+valor+'" placeholder="Porcentaje de la Cuenta" value="'+vporcentaje+'"><div class="input-group-addon">%</div><div class="input-group-addon btn delcetap"><i class="fa fa-times delcta" tp="'+valor+'"></i></div></div>';
}

function obtenerCuentas(vid){
	var cont = arr('login',4,'',85,'1,1,'+vid,'',0,'');
	var cred = arr('login',4,'',85,'1,2,'+vid,'',0,'');

	$("#ctacontado").html('');
	$("#ctacredito").html('');

	for (var i = 0; i < cont[0].length; i++) {
		$("#ctacontado").html($("#ctacontado").html()+getFila(cont[0][i][0],cont[0][i][5]));
		$("#ctacontado > #fl"+cont[0][i][0]+" > .cta-array").val(cont[0][i][0])
	}

	for (var i = 0; i < cred[0].length; i++) {
		$("#ctacredito").html($("#ctacredito").html()+getFila(cred[0][i][0],cred[0][i][5]));
		$("#ctacredito > #fl"+cred[0][i][0]+" > .cta-array").val(cred[0][i][0])
	}
}
