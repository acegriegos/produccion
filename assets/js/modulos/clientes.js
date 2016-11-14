var cuentas = '<option value="0">Seleccione una Cuenta</option>';

$(function(){
	
	$("#fclientes").submit(function(){return false});
	$("#data-table-clientess").dataTable();
	cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
	get_loc();
	
	for (var i = 0; i < cuentas_arr[0].length; i++) {
		cuentas += '<option value="'+cuentas_arr[0][i][0]+'">'+cuentas_arr[0][i][1]+'</option>';
	}

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

		obtenerCuentas(0);
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
	$("#vidcuenta").val(1)
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
		///vsum = 0;
		vdefecto = '';
		$(".ctas").each(function(){
			vid = $(this).attr('id').substr(2);
			/*
			vsum += parseFloat($("#ctacontado > #fl"+vid+" > #pr"+vid).val());
			if($("#ctacontado > #fl"+vid+" > #pr"+vid).val() == 0 || $("#ctacontado > #fl"+vid+" > #pr"+vid).val() == ''){
				$('#ln2').click();
				$("#ctacontado > #fl"+vid+" > #pr"+vid).focus()
				salida = 'Campo Contable sin Datos';
			}*/

			if($("#my-array"+vid).val() == 0 ){
				$('#ln2').click();
				$("#my-array"+vid).focus()
				salida = 'Campo Contable no Válido';
			}

			vdefecto += '[null,'+$("#my-array"+vid).val()+',2,?,100,'+$("#my-array"+vid).attr('tp')+','+$("#my-array"+vid).attr('dh')+']:';
		});

		/*if (vsum != 100) {
			$('#ln2').click();
			return 'Porcentajes Incorrectos en Cuentas Contado'
		}*/

		if (salida != '')  
			return salida

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

function getFila(valor,vtipo,vdh,vtp){

	return '<div class="input-group ctas" id="fl'+valor+'"><select noClear="1" class="form-control cta-array" tp="'+vtp+'" dh="'+vdh+'" id="my-array'+valor+'" >'+cuentas+'</select><div class="input-group-addon" style="display:none" >-</div><input type="number" noClear="1" class="form-control eder" id="pr'+valor+'"  style="display:none" placeholder="Porcentaje de la Cuenta" value="100"><div class="input-group-addon">'+vtipo+'</div><div class="input-group-addon btn delcetap" style="display:none"><i class="fa fa-times delcta" tp="'+valor+'"></i></div></div>';
}

function obtenerCuentas(vid){
	var cuentasg = arr('login',4,'',85,'2,'+vid,'',0,'');

	$("#ctacontado").html('');
	$("#ctacredito").html('');

	for (var i = 0; i < cuentasg[0].length; i++) {
		if (cuentasg[0][i][5] == 1) {
			$("#ctacontado").append(getFila(cuentasg[0][i][0],cuentasg[0][i][8],cuentasg[0][i][7],cuentasg[0][i][5]));
		}else{
			$("#ctacredito").append(getFila(cuentasg[0][i][0],cuentasg[0][i][8],cuentasg[0][i][7],cuentasg[0][i][5]));
		}
		$("#my-array"+cuentasg[0][i][0]).val(cuentasg[0][i][1]);
	}

	$("#vidcuenta").val('');
}
