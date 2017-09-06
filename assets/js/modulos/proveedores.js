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

	// $("#fclientes input").keyup(function(e){
	// 	var code = e.which || e.keyCode;
	// 	if (code == 13) {
	// 		// cnt = $(".navbar-nav > a").length;
	// 		// act = parseInt($(".navbar-nav > a.active").attr('id').substr(2));
	// 		// if(act != cnt)
	// 		// 	$("#ln"+(act+1)).click()
	// 		// elsef
	// 			$("#agClie").click()
	// 	}
	// });

	$(".addcta").click(function(){
		tp = $(this).attr('tp');
		det = "ctacontado";
		if(tp == 2)
			det = "ctacredito";
		$("#vidcuenta").val(1);

		$("#"+det).append(getFila(0,'',0));
	});

	$("#ingClie").click(function(){
		$("#titModal").html('Agregar Proveedor');
		$("#agClie").html('Agregar');

		$("#agClie").removeClass('edit');
		$("#agClie").addClass('add');

		deadclear('cliente');

		$("#ln1").click();
		$("#videstado").val(1);
		// $('#videstado').material_select('update');
		$("#vidpais").val(52);
		$("#vidpais").change();
		$("#vidpais").material_select('update');
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
		}else{
			$(".cre").show();
			$(this).attr('tp',2);
		}
	});


	$("#vidpais").change(function(){
		$("#prefijo").html('('+$('option:selected',this).attr('cod')+')')
	});

	$("#btnaddcorreo").click(function(){
		var correo = $("#correo_in").val();
		var idfila = $(this).attr('idfila');
		crreo_addon_ckub(idfila,correo);
	});

	$("#correo_in").keyup(function(e){
		var correo = $("#correo_in").val();
		var idfila = $(this).attr('idfila');
		var code = e.which || e.keyCode
		if (code == 13) {
			crreo_addon_ckub(idfila,correo);
		}
	});

	$("#btnaddphone").click(function(){
		var telefono = $("#telefono_in").val();
		var idfila = $(this).attr('idfila');
		var htipo = $("#htipo").val();
		phone_addon_ckub(idfila,telefono,htipo);
	});

	$("#telefono_in").keyup(function(e){
		var telefono = $("#telefono_in").val();
		var idfila = $(this).attr('idfila');
		var htipo = $("#htipo").val();

		var code = e.which || e.keyCode
		if (code == 13) {
			phone_addon_ckub(idfila,telefono,htipo);
		}
	});

	$("#tptel").change(function(){
		var tipo = $(this).val();
		$("#htipo").val(tipo);
		console.log(tipo)
	});

	$("#idcanton").change(function(){
		change_load('viddistrito',10,'id,nombre','id > 0 and idcanton = '+$('option:selected',this).val());
	});

	$(".zelda").data('triforce',{vid:0,vidnivel:0,vdescuentom:0,vplazo:0,vcredito:0,vbisproveedor:1,vidcuenta:'',videstadocontable:1});

	var add = getParameterByName("add") //accesos
	if (add) {
		$("#ingClie").click()
	}

});

$(document).on("blur",".onblur",function(){
	var id = $(this).attr('id');

	if (id == 'vnombre') /*{*/
		$("#infvnombre0").html($("#vnombre").val());
	 // }else{ $("#infvnombre0").html('<span class="placeh">Nombre Cliente</span>') }

	 if (id == 'vapellido1') /*{*/
	 	$("#infvapellido0").html($("#vapellido1").val()); 
	 // }else{ $("#infvapellido0").html('<span class="placeh">Nombre Cliente</span>') }

	 if (id == 'vapellido2') /*{*/
	 	$("#infvapellido1").html($("#vapellido2").val());
	 // }else{ $("#infvapellido1").html('<span class="placeh">Nombre Cliente</span>') }

	 if (id == 'vcedula') /*{*/
	 	$("#infcedula1").html($("#vcedula").val());
	 // }else{ $("#infcedula1").html('<span class="placeh">808880888</span>') }

	 if (id == 'vcodigo') /*{*/
	 	$("#infcodigo6").html($("#vcodigo").val()); 
	// }else{ $("#infcodigo6").html('<span class="placeh">COD01</span>') }

	if (id == 'vweb') /*{*/
		$("#infweb7").html($("#vweb").val());
	 // }else{ $("#infweb7").html('<span class="placeh">www.example.com</span>') }
	});

$("#correo_in").focus(function(){
	$(".icorr").css({"height": "100px", "transition": "0.5s ease"});
});
$("#correo_in").blur(function(){
	$(".icorr").css({"height": "50px", "transition": "0.5s ease"});
});
$("#telefono_in").focus(function(){
	$(".iphone").css({"height": "100px", "transition": "0.5s ease"});
});
$("#telefono_in").blur(function(){
	$(".iphone").css({"height": "50px", "transition": "0.5s ease"});
});

$(document).on("click",".chpcrr",function(){
	var id = $(this).attr('id').substr(4);
	$("#schp"+id).remove();
	$("#ichp"+id).remove();
});

$(document).on("click",".chpphone",function(){
	var id = $(this).attr('id').substr(5);
	$("#stchp"+id).remove();
	$("#itchp"+id).remove();
});


$("#vidprovincia").change(function(){
	var prov = $("#vidprovincia option:selected").text();
	$("#infprovincia8").html(prov);
});
$("#vidcanton").change(function(){
	var prov = $("#vidcanton option:selected").text();
	$("#infcanton9").html(prov);
});
$("#viddistrito").change(function(){
	var prov = $("#viddistrito option:selected").text();
	$("#infdistrito10").html(prov);
});
$("#vdireccion").keyup(function(){
	var dir = $(this).val();
	$("#infdireccion11").html(dir)
});

$(document).on("click",".del_phone",function(){
	var id = $(this).attr('id').substr(3);
	Materialize.toast('Desea Borrar este Telefono? <button type="button" class="waves-effect waves-light btn blue acctel" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".edit_phone",function(){
	var id = $(this).attr('id').substr(3);
	var tel = $("#tel"+id).text();
	$("#telefono_in").attr('idfila',id);
	$("#telefono_in").val(tel);
	Materialize.updateTextFields();
});

$(document).on("click",".del_mail",function(){
	var id = $(this).attr('id').substr(3);
	Materialize.toast('Desea Borrar este Correo? <button type="button" class="waves-effect waves-light btn blue accmail" id="acc'+id+'"><i class="material-icons">check</i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="material-icons">close</i></button>', 10000, 'rounded');
});

$(document).on("click",".edit_mail",function(){
	var id = $(this).attr('id').substr(3);
	var mail = $("#mail"+id).text();
	$("#correo_in").attr('idfila',id);
	$("#correo_in").val(mail);
	Materialize.updateTextFields();
});

$(document).on("click",".acctel",function(){
	var id = $(this).attr('id').substr(3);
	$("#shtelefonos #0_"+id).remove();
	$('#toast-container').remove();
});

$(document).on("click",".accmail",function(){
	var id = $(this).attr('id').substr(3);
	$("#shcorreos #0_"+id).remove();
	$('#toast-container').remove();
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
	var tipo = parseInt($(this).attr('tipoClie'));
	$("#vidtipocliente").val(tipo);

	switch(tipo){
		case 1:
		$("#titInfo").html('<b>Datos Personales<b/>');
		$("#nomClie").html('Nombre');
		$(".hid").show(300);
		break;
		case 3:
		$("#titInfo").html('<b>Información Tributaria<b/>');
		$("#nomClie").html('Razón Social');
		$("#vapellido1").val('');
		$("#vapellido2").val('');
		$(".hid").css('display','none');
		break;
		case 4:
		$("#titInfo").html('<b>Datos Personales Extranjeros<b/>');
		$("#nomClie").html('Nombre');
		$(".hid").show(300);
		break;
		default:
		$("#titInfo").html('<b>Información Jurídica<b/>');
		$("#nomClie").html('Razón Social');
		$("#vapellido1").val('');
		$("#vapellido2").val('');
		$(".hid").css('display','none');
		break;
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


			if($("#vidcuenta").val() == 1){
				salida = '';
				vdefecto = '';
				$(".ctas").each(function(){
					vid = $(this).attr('id').substr(2);

					if($("#my-array"+vid).val() == 0 ){
						$('#ln2').click();
						$("#my-array"+vidprovincia).focus()
						salida = 'Campo Contable no Válido';
					}

					vdefecto += '[null,'+$("#my-array"+vid).val()+',2,?,100,'+$("#my-array"+vid).attr('tp')+','+$("#my-array"+vid).attr('dh')+']:';
				});

				if (salida != '')  
					return salida

				$("#vidcuenta").val(vdefecto);
			}

			$("#vtelefono").val('');
			$("#shtelefonos li[id^=0_]").each(function(){
				t_valor = $("#vtelefono").val()
				$("#vtelefono").val(t_valor+'[null,'+$(this).attr('tp')+',"'+$('.collapsible-header > .badge',this).html()+'",?]:')
			});

			$("#vcorreo").val('');
			$("#shcorreos .chip[id^=0_]").each(function(){
				t_valor = $("#vcorreo").val()
				$("#vcorreo").val(t_valor+'[null,?,"'+$(".vcoo",this).html()+'"]:')
			});

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
			arr['tbl'] = 30;
			arr['where'] = 'vid > 0 order by nombre';

			return arr;
		}

		function getFila(valor,vtipo,vdh,vtp){
	//<i class="fa fa-times delcta" delcetap tp="'+valor+'"></i>
	//<input type="number" noClear="1" class="form-control eder" id="pr'+valor+'" value="100">

	return '<div class="row ctas" id="fl'+valor+'"><div class="col s2">'+vtipo+'</div> <div class="col s10"><select noClear="1" class="browser-default cta-array der" tp="'+vtp+'" dh="'+vdh+'" id="my-array'+valor+'" >'+cuentas+'</select></div></div>';
}

function obtenerCuentas(vid){
	var cuentasg = arr('login',4,'',85,'2,'+vid+',"5,6"','',0,'');

	$("#ctacontado").html('');
	$("#ctacredito").html('');

	for (var i = 0; i < cuentasg[0].length; i++) {
		if (cuentasg[0][i][5] == 5) {
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

function postload(modulo) {
	switch(modulo) {
		case 'cliente':
		var tipo = $("#vidtipocliente").val();
		$("[tipoclie="+tipo+"]").prop('checked',true);
		$("[tipoclie="+tipo+"]").change();
		$("#infvnombre0").html($("#vnombre").val());
		$("#infvapellido0").html($("#vapellido1").val()); 
		$("#infvapellido1").html($("#vapellido2").val());
		$("#infcedula1").html($("#vcedula").val()); 
		$("#shcorreos .chip[id^=0_]").each(function(){
				t_valor = $("#vcorreo").val()
				$("#infcorreo2").html($("#vcorreo").val(t_valor+'[null,?,"'+$(".vcoo",this).html()+'"]:'))
			});
		$("#infcodigo6").html($("#vcodigo").val()); 
		$("#infweb7").html($("#vweb").val());
		$("#infprovincia8").html($("#vidprovincia").val());
		/*$("#infcanton9").html($("#vidcanton").val());
		$("#infdistrito10").html($("#viddistrito").val());
		$("#infdireccion11").html($("#vdireccion").val());
		$("#inftelefono4").html($("#telefono_in").val());*/






		break;
	}
}

function crreo_addon_ckub(vfila,vcorreo){
	var cont = parseInt($(".chpcrr").length) + 1;
	//if (vfila == undefined) {
		if ($("#correo_in").val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
			$("#shcorreos").append('<div id="0_'+cont+'" class="chpcrr chip"><span class="vcoo">'+$("#correo_in").val()+'</span><i class="close material-icons">close</i></div>');
			$("#shcorreos").removeClass('hide');
			$("#correo_in").val('');
			ind_2 += 1;
			$('.collapsible').collapsible();
			$(".chpcr").remove();
			$("#infcorreo2").append('<div id="ichp'+cont+'" class="chpcrr chip">'+vcorreo+'</div>');
		}else{
			Materialize.toast('Correo no Válido',4000,'danger');
			$("#correo_in").select();
		}
	// }else{
	// 	$("#mail"+vfila).text($("#correo_in").val());
	// 	$("#correo_in").removeAttr('idfila');
	// 	$("#correo_in").val('');
	// }
}

function phone_addon_ckub(vfila,vphone,vtipo){
	var tipotel;
	var cont = parseInt($(".chpphone").length) + 1;
	
	if (vtipo == 1) { tipotel = 'home'; }else if (vtipo == 2) { tipotel = 'business'; }else if (vtipo == 3) { tipotel = 'phone'; }
	//if (vfila == undefined) {
		if ($("#telefono_in").val()) {
			$("#shtelefonos").append('<div id="stchp'+cont+'" class="chpphone chip"><img src="../../assets/img/icon/'+tipotel+'.png">'+$("#telefono_in").val()+'<i class="close material-icons">close</i></div>');
			$("#shtelefonos").removeClass('hide');
			$("#telefono_in").val('');
			ind_2 += 1;
			$('.collapsible').collapsible();
			$(".chpph").remove();
			$("#inftelefono4").append('<div id="itchp'+cont+'" class="chpphone chip"><img src="../../assets/img/icon/'+tipotel+'.png">'+vphone+'</div>');
		}else{
			Materialize.toast('Correo no Válido',4000,'danger');2
			$("#telefono_in").select();
		}
	// }else{
	// 	$("#mail"+vfila).text($("#correo_in").val());
	// 	$("#correo_in").removeAttr('idfila');
	// 	$("#correo_in").val('');
	// }
}

$(document).on('click','[id^=dc]',function(){
	var id = $(this).attr('id').substr(2);
})





