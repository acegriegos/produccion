$(function(){
	console.clear();
	$("#data-table-historiales").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});
	$("#data-table-estadocuentas").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});
	$("#data-table-prestamos").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});
});

$(document).on("click","#Iadd",function(){
	deadclear('historial')

});

$(document).on("click",".historial",function(){
	var id = $(this).attr('id').substr(1);
	arr('login',6,'',6,id,0,1,$("#listaestadocuentas"));
});

$(document).on("click",".abonar",function(){
	var id = $(this).attr('id').substr(1);
	$("#prestamos").removeClass('hide');
	$("#vistapago").addClass('hide');
	arr('login',6,'',7,id+',1',0,1,$("#listaprestamos"));
});

$(document).on("click",".seleccionar",function(){
	$("#prestamos").addClass('hide');
	$("#vistapago").removeClass('hide');
	var idcliente = $(this).attr('idcliente');
	var cli = arr('login',4,'',7,idcliente+',0',0,0,0)[0][0];
	$("#ncli").text(cli[3]);
	$("#monto").val(cli[7]);
	$("#saldo").val(cli[8]);
	$("#dopay").attr('idcliente',cli[2]);
	$("#dopay").attr('idprestamo',cli[1]);
	$("#comentario").focus();
	Materialize.updateTextFields();
});

$(document).on("click","#search",function(){
	var tp = $(this).attr('tp');
	if (tp == 0) {
		$("#scli").removeClass('hide');
		$(this).attr('tp',1)
	}else{
		$("#scli").addClass('hide');
		$(this).attr('tp',0)
	}
});

// $(document).on("keyup","#monto",function(){
// 	var monto = $(this).val();
// 	var saldo = $("#saldo").val();
// 	var total = parseFloat(saldo - monto);
// 	var idmoneda = $("#idmoneda").val();
// 	var simbolo = arr('login',4,'simbolo',3,'id = '+idmoneda,0,0,0)[0][0]
// 	$("#tsaldo").text(simbolo+" "+total.formatMoney(2,'.',','))
// 	if (total < 0) {
// 		$("#tsaldo").removeClass('green-text');
// 		$("#tsaldo").addClass('red-text');
// 	}else if (total == 0){
// 		$("#tsaldo").removeClass('red-text');
// 		$("#tsaldo").addClass('green-text');
// 	}else{
// 		$("#tsaldo").removeClass('red-text');
// 		$("#tsaldo").removeClass('green-text');
// 	}
// });

$(document).on("click","#dopay",function(){
	var idcliente = $(this).attr('idcliente');
	var tipo = $(this).attr('tipo');
	var idprestamo = $(this).attr('idprestamo');
	var monto = $("#monto").val();
	var comentario = $("#comentario").val() == '' ? "" : $("#comentario").val();
	var idmoneda = $("#idmoneda").val();
	var saldo = $("#saldo").val();
	// no estoy mandando saldo
	var pago = arr('login',4,'',5,'1,0,'+tipo+','+idprestamo+','+idcliente+',now(),'+monto+','+monto+','+saldo+',0,0,"'+comentario+'",'+idmoneda+',@@usr,@@impresa',0,0,0);
	if (pago['succed'] == 0) {
		Materialize.toast(pago[0]['ERROR'], 4000, 'red');
	}else{
		Materialize.toast('Pago realizado correctamente', 4000, 'green');
		$("#monto").val('');
		$("#comentario").val('');
		$(".validate").css('border-bottom', '1px solid #9e9e9e');
        $(".validate").css('box-shadow', 'none');
		$("#monto").focus();
	}
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'historial':
			if (vmodulo['tip'] == '') {
				err = validarhistorial();
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

function validarhistorial() {


	return false;
}

function endDetail(vid,vacc,modulo){

    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'historial':
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