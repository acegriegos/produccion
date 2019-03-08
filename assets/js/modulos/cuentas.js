var gtipo;
var paramTemp;
var config;

$(function(){
	param = parseInt(getParameterByName('tf'));
	paramTemp = param;
	config = getDatos('',42,'@@impresa',0,0)[0][0];

	switch(param){			
		case 2:
			arr("cuentas",1,'1',-1,'',0,1,$("#bdymantCuentas"));
			arr('login',6,'',214,2+',0,0,0,2,@@impresa',0,1,$("#listaCuentasx"));
			gtipo = 2;
			$("#gtit").html("Cuentas por Pagar");
			$("#shabonos").attr('href','vistanotaspagos?tp=1');
			break;
		default:
			param = 1;
			gtipo = 1;
			arr("cuentas",1,'1',-1,'',0,1,$("#bdymantCuentas"));
			arr('login',6,'',214,1+',0,0,0,2,@@impresa',0,1,$("#listaCuentasx"));
			$("#gtit").html("Cuentas por Cobrar");
			$("#shabonos").attr('href','vistanotaspagos');
			break;
	};
	cargarMoneda(0); 
	$('select').material_select();

	$("#monedas").change(function(){
	    cargarMoneda($('option:selected',this).val());
	});

	$("#ncli").keydown(function(e){
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();
			$("#ncli").autocomplete({
				limit: 20,
				data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'id > 0 and if('+gtipo+' = 1 ,!bisproveedor,bisproveedor) having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1),
                onAutocomplete: function(val){

                    var sql = "id > 0 and if("+gtipo+" = 1 ,!bisproveedor,bisproveedor) and concat(nombre,' ', apellido1,' ',apellido2,' *',replace(cedula, '-',''),'*') = '"+$("#ncli").val()+"' and idsucursal = @@impresa limit 1";
					var id = arr('login',4,'id,format(getsaldocliente(id,0),2),idmoneda',2,sql,0,0,0);
					var tabla = $("#data-table-facturas").DataTable();
					tabla.destroy();
					$("#monto").val(0)
					$("#referencia").val('');
					
					if ($("#ncli").val().trim().length) {
						if(id[0].length == 0) {
							Materialize.toast('Cliente no existente', 4000, 'red');
							$("#listaCuentasPm").html('');
							$("#hclie").val(0)
							$("#saldo").html('0.00')
						}else{
							var p = arr('login',4,'',214,gtipo+',0,'+id[0][0][0]+',0,0,@@impresa',0,0,0);
							var tabla = $("#listaCuentasPm");
							tabla.html('');
							for (var i = 0; i < p[0].length; i++) {
								var q = p[0][i];
								var check = '<td style="padding:0"> <input type="checkbox" id="check'+i+'" value="'+q[12]+'" vl="'+q[14]+'" class="factclie" style="margin:0px;"/><label for="check'+i+'"></label> </td>'; 
								var tdFecha = '<td style="padding:0">'+q[5]+'</td>';
								var tdSaldo = '<td style="padding:0">'+q[6]+'</td>';
								var tdAbono = '<td style="padding:0"><input type="text" id="ab'+i+'" class="eder vabono" value="'+q[14]+'" style="margin:0px;" /></td>';
								var trIdFactura = '<tr>'+check+'<td>'+q[3]+'</td>'+tdFecha+tdSaldo+tdAbono+'</tr>';
								tabla.append(trIdFactura);
							}
							$("#data-table-facturas").dataTable({
								bFilter : false,
						        bScrollInfinite : true,
						        bSort : true,
						        bLengthChange : true,
						        bPaginate :  false,
						        bInfo : false,
								order : [],
								"bLengthChange": false
							});
							$("#saldo").html(id[0][0][1])
							$("#hclie").val(id[0][0][0]);
							$("#monto").focus().select();
							$("#monedas").val(id[0][0][2]).change()
						}
					}
                }
			});
		}
	});

	$("#ncli").keyup(function(e){
		var charCode = e.which || e.keyCode;
		if (charCode == 13)
			$(this).blur();
	});

	$("#data-table-cuentas").dataTable({
		bFilter : true,
        bScrollInfinite : true,
        bSort : true,
        bLengthChange : true,
        bPaginate :  false,
        bInfo : false,
		order : [],
		"bLengthChange": false
	});

	$("#data-table-cuentas-x").dataTable({
		bFilter : true,
        bScrollInfinite : true,
        bSort : true,
        bLengthChange : true,
        bPaginate :  false,
        bInfo : false,
		order : [],
		"bLengthChange": false
	});

	$("#data-table-cuentas-detalle").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$("#festadoscuentas .zelda").data('triforce',{vid:0,vidusuario:'',vidsucursal:''});
});

$(document).on("keyup","#searchCuentas",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		var filtro = ($(this).val()+'^'+getParameterByName("tf")+'^'+$("[name=ctas]:checked").val()).toString();
		var modulo = $(this).attr('modulo');
		var tbl = $(this).attr('num');
		filltable(filtro,modulo,tbl,0)
	}
});

$(document).on("change","[name='ctas']",function(){
	$(".detalle").show();
	var tabla = $("#data-table-cuentas-x").DataTable();
	tabla.destroy()
	//arr('login',6,'',214,getParameterByName('tf')+',0,0,1,2,@@impresa',0,1,$("#listaCuentasx"));  +++ -1
	arr('login',6,'',214,getParameterByName('tf')+',0,0,2,'+$(this).attr('value')+',@@impresa',0,1,$("#listaCuentasx"));
	$("#data-table-cuentas-x").dataTable({
		bFilter : true,
        bScrollInfinite : true,
        bSort : true,
        bLengthChange : true,
        bPaginate :  false,
        bInfo : false,
		order : [],
		"bLengthChange": false
	});
});

$(document).on("change","#cobInteres",function(){
	var totInt = parseFloat($("#totInt").val());
	var totSaldoVig = parseFloat($("#totSaldoVig").val());
	var totSaldo = 0;

	if ($("#cobInteres").is(':checked')) {
		$("#interes").show('slow');
		totSaldo = totSaldoVig + totInt;
		$("#totSaldoVig").val(totSaldo);
	}else{
		$("#interes").hide('slow');
		totSaldo = totSaldoVig - totInt;
		$("#totSaldoVig").val(totSaldo);
	}
});

$(document).on("click",".pagomu",function(){
	$(this).sideNav({
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
	$(this).sideNav('show');
	$("#data-table-facturas").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});

	$("#ncli").focus().select();
	if (config[5] == 1){
        $("#p_vm").attr('checked',true);
    }else{
        $("#p_vm").attr('checked',false);
    }
});

$(document).on("keyup",".vabono",function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		$(this).blur();
	}
})


$(document).on("blur",".vabono",function(){
	var id = $(this).attr('id').substr(2);
	if($("#check"+id).is(":checked")){
		var monto = parseFloat($("#check"+id).attr('vl'));
		var mt = parseFloat($("#monto").val());
		var nm = parseFloat($(this).val());
		nm = isNaN(nm) ? 0 : nm;
		var gm = mt-monto+nm;
		$("#monto").val(gm)
	}
})

$(document).on("click",".factclie",function(){
	var mt = parseFloat($("#monto").val());
	mt = isNaN(mt) ? 0 : mt;
	var id = $(this).attr('id').substr(5);
	var valor = parseFloat($("#ab"+id).val());
	valor = isNaN(valor) ? 0 : valor;

	if ($(this).is(":checked")) {
		mt += valor;
	}else{
		mt -= valor;
	}
	$("#monto").val(mt)
});

$(document).on("click","#btnPagar",function(){
	var validado = validarpago();

	if (validado == false) {

		var monto = $("#monto").val().replace(/,/g,'');

		var idfactura = val = vmonto = idestadocuenta = 0;
		var saldo = $("#saldo").html().replace(/,/g,'');

		if (!$(".factclie").length) {
			Materialize.toast('No hay Facturas que Cancelar',4000,'red');
			return false;
		}
		var vidmoneda = $("#monedas").val();
		var divisa = $("#monedas option:selected").attr('dv');
		var fechabol = $("#fecha").val();
		var idpag = arr('login',4,'',268,'1,0,@@usr,@@impresa',0,0,0)[0][0][0];

		if ($(".factclie:checked").length) {

			$(".factclie:checked").each(function(){
				idfactura = $(this).val();
				val = parseFloat($(this).attr('vl'));

				monto -= val;
				if(monto > 0){
					vmonto = val;
					idestadocuenta = arr('login',4,'',300,'1,0,7,1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
					console.log(idestadocuenta)
				}
				else{
					vmonto = val-monto*-1;
					idestadocuenta = arr('login',4,'',300,'1,0,7,1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
					console.log(idestadocuenta)
					return false;
				}	
			});
		}else{

			$(".factclie").each(function(){
				idfactura = $(this).val();
				val = parseFloat($(this).attr('vl'));
				monto -= val;
				if(monto > 0){
					vmonto = val;
					idestadocuenta = arr('login',4,'',300,'1,0,7,1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
					console.log(idestadocuenta)
				}
				else{
					vmonto = val-monto*-1;
					idestadocuenta = arr('login',4,'',300,'1,0,7,1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
					console.log(idestadocuenta)
					return false;
				}
			});
		}
		monto = $("#monto").val().replace(/,/g,'');
		if (parseFloat(monto) > parseFloat(saldo))
			Materialize.toast('Vuelto: '+parseFloat(monto)-parseFloat(saldo),4000)
		Materialize.toast('Pagos Realizados Exitosamente',4000,'green');
		arr('login',6,'',214,gtipo+',0,0,0,2,@@impresa',0,1,$("#listaCuentasx"));
		$("#ncli").val('')
		$("#listaCuentasPm").html('');
		$("#hclie").val(0)
		$("#monto").val('');
		$("#saldo").html('0.00');
		$("#comentario").val('');
		$("#referencia").val('')
		$("#idtipopagopagar").val(0).material_select('update');

		var tp = $("#p_vm").is(":checked") == true ? 1 : 2;
		window.open('cuentas?accion=5&id='+idpag+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
		
	}else{
		Materialize.toast(validado,4000,'red')
	}

	
});

function validarpago() {
	//validar
	/*if($("#idtipopagopagar option:selected").val() == 0){
		return 'Tipo de Pago Requerido'
	}*/
	return false;
}

$(document).on("click",".detalle",function(){
	$(this).sideNav({
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	gtipo = $(this).attr('tipo');
	var datos = arr('login',4,'',214,gtipo+','+id+',0,0,'+$("[name='ctas']:checked").attr('value')+',@@impresa',0,0,0)[0][0];

	var tabla = $("#data-table-cuentas-detalle").DataTable();
	tabla.destroy();
	arr('login',6,'',213,gtipo+','+id+',@@impresa',0,1,$("#listaCuentasxCDetalle"));
	
	var dias = parseInt(datos[7]);
	$("#ifac").text(datos[3]);
	$("#vidfactura").val(datos[12]);
	$("#isaldo").text(datos[6]);
	$("#isaldovista").text(datos[6]);
	if (dias < 0) {
		$("#idias").css('color','red');
	}
	if (config[5] == 1){
        $("#p_v").attr('checked',true);
    }else{
        $("#p_v").attr('checked',false);
    }
	$("#inombr").text(datos[1]);
	$("#ifecha").text(datos[5]);
	$("#iplazo").text(datos[8]);
	$("#idias").text(Math.abs(dias));
	$("#data-table-cuentas-detalle").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});
});

$(document).on("click","#btn-navsalir",function(){
	$('.side-nav-cuentas').sideNav('hide');
	$('.button-collapse').sideNav('destroy');
});

$(document).on("click","#btn-divsalir",function(){
	$(".divabono").hide();
	$(".divabono").attr('visible',0);
});

$(document).on("click","#btn-div",function(){
	var vi = $(".divabono").attr('visible');
	if (vi == 0) {
		var tp = arr('login',4,'idtipoabono',39,'id = @@impresa',0,0,0)[0][0];
		$(".divabono").show();
		$(".divabono").attr('visible',1);
		if (tp != 1)
			$("#vvalor").val(0.00).focus().select();
		
	}else{
	$(".divabono").hide();
	$(".divabono").attr('visible',0);
	}
});

$(document).on("click","#Iadd",function(){
	deadclear('cuentas');
});

$(document).on("click","#p",function(){
	deadclear('cuenta');
	var debe = parseFloat($("#totSaldoAdeud").val());
	$("#totSaldoVig").val(debe).toFixed(2);
});

$(document).on("keyup","#totAbonoF",function(e){
	var rs = kpress($(this).val());
	$("#errF").html('');
	if (isNaN(rs)) {
		$("#errF").html(rs);
		$("#inpG").addClass('has-danger');
		$("#totAbonoF").addClass('form-control-danger');
	}else{
		$("#totSaldoVig").val(rs);
		$("#inpG").removeClass('has-danger');
		$("#totAbonoF").removeClass('form-control-danger');
	}
});

function kpress(valor) {
	valor = isNaN(valor) || valor == '' ? -1 : parseFloat(valor);
	var saldo = $("#totSaldoAdeud").val().replace(/,/g,"");
	switch( parseInt(valor) ) {
	case -1:
		$("#totAbonoF").val('0');
		$("#totAbonoF").select();
		$("#totSaldoVig").val($("#totSaldoAdeud").val());
		return 'El valor ingresado debe ser un valor numérico';
		break;
	default:
		saldo = saldo - valor;
		if (saldo < 0)
			return 'El valor excede el monto del saldo adeudado';
		// INGRESAR ABONO
		return saldo;
		break;
	}
}

function validar (varreglo,vmodulo) {
	var salida = {}
	/*VALIDACION FRONT END*/
	switch(vmodulo['modulo']) {
		case 'cuentas':
			if (vmodulo['tip'] == '') {
				err = validarcuentas();
				if ( err ) {
					return err;
				}
			}
			break;
		case 'estadoscuenta':
			if (vmodulo['tip'] == '') {
				err = validarestadocuenta();
				if ( err ) {
					return err;
				}
			}
			break;
		default:
			return 'Módulo no Existente '+ vmodulo['modulo'];
			break;
	}
	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;
}

function validarcuentas() {
	return false;
}

function validarestadocuenta(){
	var saldo = $("#isaldovista").text();
	saldo = parseFloat(saldo.substr(1).replace(/,/g, ""));

	if (parseFloat($("#vvalor").val()) > saldo) {
		return "Monto no debe exceder al saldo";
	}

	if (isNaN($("#vvalor").val())) {
		$("#vvalor").select().focus(); 
		return "El Valor No es Numérico";
	}

	if ($('#vvalor').val() <=0) {
		$("#vvalor").select().focus(); 
		return "El Valor No puede ser 0";
	}

	if ($('#vidtipopago option:selected').val() == '') {
		$("#vidtipopago").focus(); 
		return "Tipo de Pago Requerido";
	}

return false;
}

function cargar(vmodulo,vid) {
	switch(vmodulo['modulo']) {
		case 'cuentas':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	return vmodulo;
}

function cargarSintax(){
	var arr = {}
	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';
	return arr;
}

function endDetail(vid,vacc,modulo) {
	if (vacc == 1) {
		var saldo = $("#isaldovista").text();
		saldo = parseFloat(saldo.substr(1).replace(/,/g, ""));
		var tsaldo = saldo - parseFloat($("#vvalor").val());
		$("#isaldovista").html('¢'+( saldo - parseFloat($("#vvalor").val()) ).formatMoney(5,'.',',') );
		$("#isaldo").html('¢'+( saldo - parseFloat($("#vvalor").val()) ).formatMoney(2,'.',','));
		$("#vidtipopago").val('');
		$("#vvalor").val(0.00);
		arr('login',6,'',213,gtipo+','+$("#vidfactura").val()+',@@impresa',0,1,$("#listaCuentasxCDetalle"));
		arr('login',6,'',214,gtipo+',0,0,0,2,@@impresa',0,1,$("#listaCuentasx"));
		$("#btn-div").click();
		var tp = $("#p_v").is(":checked") == true ? 1 : 2;
		window.open('cuentas?accion=4&id='+vid+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
	}
}
