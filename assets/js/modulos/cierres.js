$(function(){
	arr('login',6,'pendientes,fecha',182,'1 order by fecha desc',0,1,$("#listacierrespendientes"));

	$('.chips').material_chip();

	$("#data-table-facturas").DataTable({
        bFilter :  false,
        bLengthChange : false,
        order : []
    });

    $("#data-table-estadocuenta").DataTable({
        bFilter :  false,
        bLengthChange : false,
        order : []
    });

    Materialize.updateTextFields();

});

$(document).on("click",".getfacturas",function(){
	var date = new Date();
	var curdate = date.getFullYear()+'-'+addZero(date.getMonth()+1,2)+'-'+date.getDate();
	var fecha = $(this).attr('vfecha') == 'HOY' ? curdate : $(this).attr('vfecha');
	arr('login',6,'',183,'"'+fecha+'"',0,1,$("#listafacturas"));
	
	var totcont = arr('login',4,'format(sum(subtotal+imv-descuento+flete+ajuste+plazo),2) as total',64,'idtipo = 1 and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];
	var totcred = arr('login',4,'format(sum(subtotal+imv-descuento+flete+ajuste+plazo),2) as total',64,'idtipo = 2 and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];

	if (totcont != null)
		$("#tcontado").text(totcont);
	else
		$("#tcontado").text('0.00')

	if (totcred != null)
		$("#tcredito").text(totcred);
	else
		$("#tcredito").text('0.00')
});

$(document).on("click","#filtro",function(){
	$(".inv").show();
});

$(document).on("click","#order",function(){
	if ($(this).attr('value') == 1) {
		arr('login',6,'pendientes,fecha',182,'1 order by fecha asc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',2);
	}else{
		arr('login',6,'pendientes,fecha',182,'1 order by fecha desc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',1);
	}
});

$(document).on("keyup","#vfecha",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		console.log("asd")
		var fecha = $(this).val();
		var dates = arr('login',6,'pendientes,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
		console.log(dates)
		console.log(1)
		$("#vfecha").focus();
	}
});

$(document).on("change","#vfecha",function(e){
	var fecha = $(this).val();
	arr('login',6,'pendientes,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
	$("#vfecha").focus();
});


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