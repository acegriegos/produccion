$(function(){
	$("#fclientes").submit(function(){return false});
	$("#data-table-clientes").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});
	console.clear();
});

$(document).on("click",".contacto",function(){
	var id = $(this).attr('id').substr(1);
	var cli = arr('login',4,'',4,id+',0,"","0,1"',0,0,0)[0][0];
	console.log(cli)
	$("#ncli").text(cli[1]);
	$("#tel1").val(cli[5]);
	$("#tel2").val(cli[6]);
	$("#direccion1").val(cli[7]);
	$("#direccion2").val(cli[8]);
	$("#direccion3").val(cli[9]);
	Materialize.updateTextFields();
});

$(document).on("click",".borrow",function(){
	var id = $(this).attr('id').substr(1);
	$("#vidcliente").val(id);
	$("#vcredito").focus();
});

$(document).on("click","#addcli",function(){
	var acc = $(this).attr('acc') == 1 ? 'agregar' : 'Editar';
	var modulo = $(this).attr('modulo');
	deadclear(modulo.slice(0,-1));
	$("#titcli").text(acc+" "+modulo);
	$("#vnombre").focus();
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
		case 'prestamocliente':
			if (vmodulo['tip'] == '') {
				err = validarprestamo();
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

function validarclientes() {
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return 'Nombre del cliente requerido';
	}

	if ($("#vcedula").val() == '') {
		$("#vcedula").focus();
		return 'Cédula del cliente requerido';
	}

	if ($("#vdireccion").val() == '') {
		$("#vdireccion").val("");
	}

	if ($("#vtelefono1").val() == '') {
		$("#vtelefono1").val("");
	}

	if ($("#vtelefono2").val() == '') {
		$("#vtelefono2").val("");
	}

	return false;
}

function validarprestamo() {
	if ($("#vcredito").val() == '' || $("#vcredito").val() == 0) {
		return 'Valor debe ser mayor a 0';
	}

	return false;
}

function endDetail(vid,vacc,modulo){
	switch(modulo) {
		case 'cliente':
			if (vacc == 1) {
				deadclear(modulo);
			}
			thorload(modulo);
			$(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
			break;
		case 'prestamocliente':
			if (vacc == 1) {
				deadclear(modulo);
			}
			thorload('cliente');
			$(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
			break;
	}
	
    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'cliente':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 4;
			vmodulo['where'] = vid+',0,"","0,1"';
			break;
		case 'prestamocliente':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 4;
			vmodulo['where'] = vid+',0,"","0,1"';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(vmodulo){
	switch(vmodulo){
		case 'clientes':
			var arr = {}
			arr['sel'] = '';
			arr['tbl'] = 4;
			arr['where'] = '0,0,"","0,10"';
			break;
		case 'prestamoclientes':
			var arr = {}
			arr['sel'] = '';
			arr['tbl'] = 4;
			arr['where'] = '0,0,"","0,10"';
			break;
	}
	

	return arr;
}

function postload(vmodulo) {
	switch(vmodulo) {
		case 'cliente':
			$("#btncli").removeClass('add');
			$("#btncli").addClass('edit');
			$("#btncli").text('Aceptar');
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
}