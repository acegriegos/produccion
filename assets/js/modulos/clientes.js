var cuentas = '<option value="0">Seleccione una Cuenta</option>';
var ind_1 = ind_2 = 1;

$(function(){
	$('ul.tabs').tabs();
	$('select').material_select();
	
	$("#fclientes").submit(function(){return false});

	$("#data-table-clientes").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});
	cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
	
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
		$('#videstado').material_select('update');
		ind_1 = 1;
		$("#shtelefonos").html('');
		$("#shcorreos").html('');
		obtenerCuentas(0);
		obtenerImpuestos(0);
		if($("#tipocliente").attr("tp") != 1)
			$("#tipocliente").click();

	});

	$("[id^=ln]").click(function(){
		var id = $(this).attr('id').substr(2);
		$(".ptr").hide()
		$(".parte"+id).show()
		$("[id^=ln]").removeClass('active')
		$(this).addClass('active')
	});

	$("#tipocliente").click(function(){
		if($(this).attr('tp') == 2){
			$(".cre").hide();
			$(this).attr('tp',1);
		}
		else{
			$(".cre").show();
			$(this).attr('tp',2);
		}
	});

	$("#telefono_in").keyup(function(e){
		var code = e.which || e.keyCode
		if (code == 39) {
			if($("#tptel option:selected").val() == ''){
				Materialize.toast("Debe Seleccionar un Tipo de Teléfono",4000,'danger');
				$("#tptel").focus()
			}else{
				rgex = arr('login',4,'regex,img',4,'id = ' + $("#tptel option:selected").val(),0,0,0)[0][0];
				if($(this).val().match(new RegExp(rgex[0]))){
					$("#shtelefonos").append('<li id="0_'+ind_1+'" tp="'+$("#tptel option:selected").val()+'"> <div class="collapsible-header" ><span class="badge">'+$(this).val()+'</span><i class="fa '+rgex[1]+'"></i></div> <div class="collapsible-body"><a class="btn-floating waves-effect waves-light blue edit_phone" id="m0_'+ind_1+'" title="Editar Teléfono"><i class="fa fa-pencil-square-o"></i></a> <a class="btn-floating waves-effect waves-light red del_phone" id="d0_'+ind_1+'" title="Eliminar Teléfono"><i class="fa fa-times"></i></a></div> </li>');
					$(this).val('');
					ind_1 += 1;
				}else{
					Materialize.toast("Número de Teléfono Inválido",4000,'danger');
				}
			}
		}
	});

	$("#correo_in").keyup(function(e){
		var code = e.which || e.keyCode
		if (code == 39) {
			if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
				$("#shcorreos").append('<li id="0_'+ind_2+'"> <div class="collapsible-header"><span class="badge">'+$(this).val()+'</div> <div class="collapsible-body"><a class="btn-floating waves-effect waves-light blue edit_mail" id="m0_'+ind_2+'" title="Editar Correo"><i class="fa fa-pencil-square-o"></i></a> <a class="btn-floating waves-effect waves-light red del_mail" id="d0_'+ind_2+'" title="Eliminar Correo"><i class="fa fa-times"></i></a></div> </li>');
					$(this).val('');
					ind_2 += 1;
			}else{
				Materialize.toast('Correo no Válido',4000,'danger');
				$(this).select();
			}
		}
	});

	$("#vidprovincia").change(function(){
		change_load('vidcanton',9,'id,nombre','id > 0 and idprovincia = '+$('option:selected',this).val());
	});

	$("#idcanton").change(function(){
		change_load('viddistrito',10,'id,nombre','id > 0 and idcanton = '+$('option:selected',this).val());
	});

});

$(document).on("click",".delcta",function(){
	tp = $(this).attr('tp');
	$("#vidcuenta").val(1);
	$("#fl"+tp).remove();
});

$(document).on("change",".cta-array",function(){
	$("#vidcuenta").val(1)
});

$(document).on("click",".load",function(){
	$("#titModal").html('Editar Cliente');
	$("#agClie").html('Editar');

	$("#agClie").removeClass('add');
	$("#agClie").addClass('edit');

	$("#ln1").click();
	obtenerCuentas($(this).attr('id').substr(1));
	obtenerImpuestos($(this).attr('id').substr(1));
});

$(document).on("click","input[name='tipoclie']",function(){
	var tipo = $(this).attr('tipoClie');

	if (tipo == 1) {
		$("#titInfo").html('<b>Datos Personales<b/>');
		$("#nomClie").html('Nombre');
		$("#colMod").addClass("col s12 m4 l4");
		$("#colMod").removeClass("col s12 m12 l12");
		$("#vcedula").attr('data-mask', '9-9999-9999');
		$(".hid").show(300);
	} else if (tipo == 2) {
		$("#titInfo").html('<b>Información Jurídica<b/>');
		$("#nomClie").html('Razósn Social');
		$("#colMod").removeClass("col s12 m4 l4");
		$("#colMod").addClass("col s12 m12 l12");
		$("#vcedula").attr('data-mask', '9-999-999999');
		$(".hid").css('display','none');
	}
});

$(document).on("click","#Iadd",function(){
	deadclear('clientes')
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

	$("#shtelefonos li[id^=0_]").each(function(){
		t_valor = $("#vtelefono").val()
		$("#vtelefono").val(t_valor+'[null,'+$(this).attr('tp')+',"'+$('.collapsible-header > .badge',this).html()+'",?]:')
	});

	$("#shcorreos li[id^=0_]").each(function(){
		t_valor = $("#vcorreo").val()
		$("#vcorreo").val(t_valor+'[null,?,"'+$('.collapsible-header > .badge',this).html()+'"]:')
	});
	console.log($("#vcorreo").val())
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
	arr['where'] = 'vid > 0 order by nombre';

	return arr;
}

function getFila(valor,vtipo,vdh,vtp){
	//<i class="fa fa-times delcta" delcetap tp="'+valor+'"></i>
	//<input type="number" noClear="1" class="form-control eder" id="pr'+valor+'" value="100">

	return '<div class="row ctas" id="fl'+valor+'"><div class="col s2">'+vtipo+'</div> <div class="col s10"><select noClear="1" class="browser-default cta-array der" tp="'+vtp+'" dh="'+vdh+'" id="my-array'+valor+'" >'+cuentas+'</select></div></div>';
}

function obtenerCuentas(vid){
	var cuentasg = arr('login',4,'',85,'2,'+vid+',"1,2"','',0,'');

	$("#ctacontado").html('');
	$("#ctacredito").html('');

	for (var i = 0; i < cuentasg[0].length; i++) {
		if (cuentasg[0][i][5] == 1) {
			$("#ctacontado").append(getFila(cuentasg[0][i][0],cuentasg[0][i][7],cuentasg[0][i][4],cuentasg[0][i][5]));
		}else{
			$("#ctacredito").append(getFila(cuentasg[0][i][0],cuentasg[0][i][7],cuentasg[0][i][4],cuentasg[0][i][5]));
		}
		$("#my-array"+cuentasg[0][i][0]).val(cuentasg[0][i][1]);
	}

	$("#vidcuenta").val('');
}

function obtenerImpuestos(vid){
	var imp = arr('login',4,'',200,'2,'+vid,0,'',0)[0];
	
	$("#showimpuestos").html('');

	for (var i = 0; i < imp.length; i++) {
		fila = imp[i];
		addIM(fila[0],fila[1],fila[2],fila[3],fila[4]);
	}
}

function addIM(vid,vimpuesto,vnombre,vvalor,vexoneracion){
	$("#showimpuestos").append('<li class="collection-item dismissable" id="newimp'+vid+'"><div><span class="impuestos" id="vimv'+vid+'" value="'+vvalor+'" timv="'+vimpuesto+'">'+vnombre+' - '+vvalor+'%</span><a class="secondary-content delimp" id="dimp'+vid+'"><i class="material-icons">delete</i></a></div></li>')
}

function endDetail(vid,vacc,modulo){

	setTimeout(function(){ deadclear('cliente'); }, 2500);
    thorload('cliente');
    if (vacc == 1) {
	    $("#shcorreos").html('');
	    $("#shtelefonos").html('');
    }
}