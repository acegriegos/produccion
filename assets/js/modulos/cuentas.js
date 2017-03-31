$(function(){
	 param = parseInt(getParameterByName('tf'));
	 switch(param){
	 	case 1:
	 		arr("cuentas",param,'1',-1,'',0,1,$("#bdymantCuentas"));
	 		break;
	 	case 2:
	 		arr("cuentas",param,'1',-1,'',0,1,$("#bdymantCuentas"));
	 		break;	
	 	default:
	 		$("#bdymantCuentas").html("Valor no Valido")
	 		break; 


	 }

	$("#fcuentass").submit(function(){return false});
	$("#data-table-cuentass").dataTable();

	$(".menu4").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu4").removeClass('active');
		$(this).addClass('active');

		switch(parseInt(id)){
			case 1:
				$("#mantCxC").remove();
				$("#mantVerNP").remove();
				// var tabla = $("#data-table-productos").DataTable();
				// tabla.destroy();
				var p = mantenimiento('cuentas',1,'');
				$("#bdymantCuentas").html(p);
				// $("#data-table-productos").DataTable({
				// 	bFilter: false
				// });
				break;
			case 2:
				$("#mantCxP").remove();
				$("#mantVerNP").remove();
				// var tabla = $("#data-table-productos").DataTable();
				// tabla.destroy();
				var p = mantenimiento('cuentas',2,'');
				$("#bdymantCuentas").html(p);
				// $("#data-table-productos").DataTable({
				// 	bFilter: false
				// });
				break;
			case 3:
				$("#mantCxC").remove();
				$("#mantCxP").remove();
				// var tabla = $("#data-table-productos").DataTable();
				// tabla.destroy();
				var p = mantenimiento('cuentas',3,'');
				$("#bdymantCuentas").html(p);
				// $("#data-table-productos").DataTable({
				// 	bFilter: false
				// });
				break;
		}
	});

	$("#m3").click();

	$("#totSaldoAdeud").val(10000.85);
	$("#totInt").val(2000.00);

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

	switch( parseInt(valor) ){
			case -1:
				$("#totAbonoF").val('0');
				$("#totAbonoF").select();
				$("#totSaldoVig").val($("#totSaldoAdeud").val());
				return 'El valor ingresado debe ser un valor numérico';
				break;

			default:
				saldo = saldo - valor;
				if (saldo < 0) {
					return 'El valor excede el monto del saldo adeudado';
				}
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
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarcuentas() {

	

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