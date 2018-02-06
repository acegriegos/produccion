$(function(){
	arr('login',6,'',182,'@@usr',0,1,$("#listacierrespendientes"));
	var monto = arr('login',4,'monto',404,'idusuario = @@usr and date_format(fecha,"%Y-%m-%d")',0,0,0)[0][0];
	if (monto == undefined) {
		$(".tt").removeAttr('id')
		$(".tt").addClass('tooltipped')
		$('.tt').tooltip({delay: 50,tooltip: 'Debe iniciar caja'});
	}else{
		$(".tt").attr('id','chkcierre');
	}

	$('.chips').material_chip();

	$("#data-table-facturas").DataTable({
	    bFilter: false,
	    bScrollInfinite: true,
	    bSort: false,
	    bLengthChange: false,
	    order: [],
	    bPaginate: false,
	    info: false
	});

    $("#data-table-estadocuenta").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });

    Materialize.updateTextFields();

	$('#modal-tipomonedas').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '2%' // Ending top style attribute
	});

	$(".zelda").data('triforce',{ vtotal:0 });
});

$(document).on("click","#refresh",function(){
	var tabla1 = $("#data-table-facturas").DataTable();
	var tabla2 = $("#data-table-estadocuenta").DataTable();
	tabla1.destroy();
	tabla2.destroy();
	arr('login',6,'',182,'@@usr',0,1,$("#listacierrespendientes"));
	$("#data-table-facturas").DataTable({
	    bFilter: false,
	    bScrollInfinite: true,
	    bSort: false,
	    bLengthChange: false,
	    order: [],
	    bPaginate: false,
	    info: false
	});
	$("#data-table-estadocuenta").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });
	$("#tcontado").text('0.00');
	$("#tcredito").text('0.00');
	$("#tabono").text('0.00');
	$("#tnotcre").text('0.00');
	$("#tnotdeb").text('0.00');
	$("#chkcierre").removeAttr('vfecha');
	$(".tt").removeClass('modal-trigger');
});

// $(document).on("click","#chkcierre",function(){
// 	if ($(this).attr('vfecha') != undefined)
// 		Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" vfecha="'+$(this).attr('vfecha')+'"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
// 	else
// 		Materialize.toast('Seleccione un cierre', 4000, 'green');
// });

$(document).on("click","#chkcierre",function(){
	if (!$(this).hasClass('tooltipped')) {
		if ($(this).attr('vfecha') == undefined) {
			Materialize.toast('Seleccione un cierre', 4000, 'green');
		}else{
			$(this).addClass('modal-trigger');
			$("#modal-tipomonedas").modal('open');
			$("#totalizar").attr('vfecha',$(this).attr('vfecha'));
		}
	}
	
});

$(document).on("blur",".mnd",function(e){
	var total = totalizar();
	$("#totcashier").text(total.formatMoney(2,'.',','));
});

$(document).on("click","#totalizar",function(){
	// chkcierre
	if ($(this).attr('vfecha') != undefined)
		Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" vfecha="'+$(this).attr('vfecha')+'"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
	else
		Materialize.toast('Seleccione un cierre', 4000, 'green');
});

$(document).on("click","#docierre",function(){
	var total = $(".zelda").data('triforce')['vtotal'];
	var idfactura = arr('login',4,'id',64,'idtipoventa = 1 and idusuario = @@usr and date_format(fecha,"%Y-%m-%d") = "'+$(this).attr('vfecha')+'" and isregistrada = 0',0,0,0)[0];
	var idestadocuenta = arr('login',4,'id',191,'id > 0',0,0,0)[0];
	var idcierre = arr('login',4,'',189,'@@usr,"'+$(this).attr('vfecha')+'",@@impresa',0,0,0)[0][0];

	if (total == 0)
		Materialize.toast('Monto debe ser mayor a 0', 4000, 'green');

	// for (var i = 0, len = idfactura.length ; i < len; i++) {
	// 	arr('login',4,'',190,'1,0,'+idcierre+','+idfactura[i]+',1',0,0,0)
	// }
	// for (var a = 0, leng = idestadocuenta.length; a < leng; a++) {
	// 	arr('login',4,'',190,'1,0,'+idcierre+','+idestadocuenta[a]+',2',0,0,0)
	// }

	$('#toast-container').remove();
	$(".getfacturas[vfecha="+$(this).attr('vfecha')+"]").siblings().remove();

	window.open('cierres?accion=1&id='+idcierre+'&fecha='+$(this).attr('vfecha'));
});

$(document).on("click",".cancel",function(){
    $('#toast-container').remove();
});

$(document).on("click",".getfacturas",function(){
	var curdate = now();
	var fecha = $(this).attr('vfecha') == 'HOY' ? curdate : $(this).attr('vfecha');
	
	$("#chkcierre").attr('vfecha',fecha);
	arr('login',6,'',183,'"'+fecha+'",@@usr',0,1,$("#listafacturas"));
	arr('login',6,'',185,'"'+fecha+'",@@usr',0,1,$("#listanotasabonos"));
	// cambiar
	var totcont = arr('login',4,'format(sum(subtotal+imv-descuento+flete+ajuste+plazo),2) as total',64,'idusuario = @@usr and idtipoventa = 1 and idtipo = 1 and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];
	var totcred = arr('login',4,'format(sum(subtotal+imv-descuento+flete+ajuste+plazo),2) as total',64,'idusuario = @@usr and idtipoventa = 1 and idtipo = 2 and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];
	var tabono = arr('login',4,'format(sum(valor),2) as total',301,'idtipo = 3 and idusuario = @@usr and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];
	var tnotcre = arr('login',4,'monto',187,'idusuario = @@usr and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0];
	var tnotdeb = arr('login',4,'monto',188,'idusuario = @@usr and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0];
	// end cambiar
	if (totcont != null)
		$("#tcontado").text(totcont);
	else
		$("#tcontado").text('0.00')

	if (totcred != null)
		$("#tcredito").text(totcred);
	else
		$("#tcredito").text('0.00')

	if (tabono != null)
		$("#tabono").text(tabono);
	else
		$("#tabono").text('0.00')

	if (tnotcre != null)
		$("#tnotcre").text(tnotcre);
	else
		$("#tnotcre").text('0.00')

	if (tnotdeb != null)
		$("#tnotdeb").text(tnotdeb);
	else
		$("#tnotdeb").text('0.00')
});

$(document).on("click","#filtro",function(){
	$(".inv").show();
});

$(document).on("click","#order",function(){
	if ($(this).attr('value') == 1) {
		arr('login',6,'contador,fecha',182,'idusuario = @@usr order by fecha asc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',2);
	}else{
		arr('login',6,'contador,fecha',182,'idusuario = @@usr order by fecha desc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',1);
	}
});

$(document).on("keyup","#vfecha",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		var fecha = $(this).val();
		var dates = arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
		$("#vfecha").focus();
	}
});

$(document).on("change","#vfecha",function(e){
	var fecha = $(this).val();
	arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
	$("#vfecha").focus();
});

function totalizar() {
	var valor = arr('login',4,'id,valor',405,'id > 0',0,0,0)[0];
	var total = 0;
	for (var i = 0, len = valor.length; i < len; i++) {
		var monto = $("#m"+valor[i][0]).val();
		if (monto != 0 || monto != '') {
			if ( $("#m"+valor[i][0]).attr('id').substr(1) == valor[i][0] )
				total += monto * valor[i][1];
		}
	}
	$(".zelda").data('triforce')['vtotal'] = total;
	return total;
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'cierres':
			if (vmodulo['tip'] == '') {
				err = validarcierres();
				if ( err ) {
					return err;
				}
			}
			
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarcierres() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'cierres':
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