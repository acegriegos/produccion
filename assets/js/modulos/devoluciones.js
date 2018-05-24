$(function(){
	$("#fdevoluciones").submit(function(){return false});
	$("[id^=ftr]").hide();

	$("#data-table-facturas").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        bPaginate: false,
        info: false,
        order: []
    });

	// $("#ncli").keydown(function(e){
	// 	var charCode = e.which || e.keyCode;
	// 	var charStr = String.fromCharCode(charCode);
	// 	if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
	// 		$(".autocomplete-content").remove();
	// 		$("#ncli").autocomplete({
	// 			limit: 20,
	// 			data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
	// 		});
	// 		$("#ncli").siblings($(".autocomplete-content")).css('width','25%');
	// 	}
	// });

	$("#ftr0").show();
});

$(document).on("click","#srchfact",function(){
	var cliente = factura = num1 = num2 = cambio = 0;
	var desde = hasta = "";
	if ($("#cp").is(":checked")) {
		if ($("#nprov").val() != '') {
			cliente = $("#nprov").attr("idc"); 
		}
	}else{
		if ($("#ncli").val() != '') {
			cliente = $("#ncli").attr("idc"); 
		}
	}
	if ($("#vfac").val() != '') {
		factura = $("#vfac").val() == '' ? 0 : $("#vfac").val();
	}
	if ($("#vnum1").val() != '') {
		num1 = $("#vnum1").val() == '' ? 0 : $("#vnum1").val();
		num2 = $("#vnum2").val() == '' ? 0 : $("#vnum2").val();

	}
	if ($("#desde").val() != '') {
		desde = $("#desde").val();
		hasta = $("#hasta").val();
	}
	$("#data-table-facturas").DataTable().destroy();
	if ($(".chgtipo").is(":checked")) {
		cambio = 401;
	}
	var p = arr('login',6,'',302,$("#cp").is(":checked")+','+factura+','+cliente+',"'+desde +'","'+hasta+'",'+num1+','+num2,cambio,1,$("#listafacturas"));
	
	$("#data-table-facturas").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        bPaginate: false,
        info: false,
        order: []
    });
});

$(document).on("change",".chg_tipo",function(){
	var id = $(this).prop('value')
	if ($(this).is(':checked')){
		$("#ftr"+id).removeClass("hide");
		$("#ftr"+id).show();
	}
	else
		$("#ftr"+id).addClass("hide");

	Materialize.updateTextFields();
});

$(document).on("change",".chgtipo",function(){
	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
	$("#listafacturas").html('');
	$("#data-table-facturas").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        bPaginate: false,
        info: false,
        order: []
    });
	Materialize.updateTextFields();
});

$(document).on("click",".detalle",function(){
	$(this).sideNav({
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	detalle(id,1);
});

$(document).on("click",".verdetalle",function(){
	$(this).sideNav({
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	detalle(id,2);
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
	var vi = $(".divabono").attr('visible'), total = 0;
	if (vi == 0) {
		$(".divabono").show();
		$(".divabono").attr('visible',1);
	}else{
		$(".divabono").hide();
		$(".divabono").attr('visible',0);
	}
	// triforce
	$(".zelda").data('triforce',{vid: 0,vidfactura: 0,vcomentario: '',vidmoneda: 1,vidsucursal: ''});
	$(".zelda").data('triforce')['vidfactura'] = $("#factura").val();
	$("#vidinventario").change();
	$("[name=devolucion]").each(function(i) {
		var id = $(this).attr('id').substr(7);
		if ($(this).is(":checked")) {
			$("#dd"+id).data('triforce')['vaccion'] = 0;
			$("#dd"+id).data('triforce')['vid'] = 0;
			$("#dd"+id).data('triforce')['viddevolucion'] = '?';
			$("#dd"+id).data('triforce')['vidproducto'] = $(this).attr('idproducto');
			$("#dd"+id).data('triforce')['vcantidad'] = $("#cantdev"+id).val();
			$("#dd"+id).data('triforce')['vidtipodevolucion'] = $("#estadodevolucion"+id).val();
		}else{
			$("#dd"+id).removeData();
		}
	});
});

$(document).on("change","[name=devolucion]",function(){
	var id = $(this).attr('id').substr(7);
	var chk = $(this).is(":checked");
	if (chk) {
		$("#dcantdev"+id).removeClass('hide');
		$("#spncant"+id).addClass('hide');
		$("#cantdev"+id).focus();
	}else{
		$("#dcantdev"+id).addClass('hide');
		$("#spncant"+id).removeClass('hide');
	}
});

$(document).on("keyup","#vcomentario",function(){
	var comen = $(this).val();
	$(".zelda").data('triforce')['vcomentario'] = comen;
});

$(document).on("change","#vidinventario",function(){
	$("[name=devolucion]").each(function(){
		if ($(this).is(':checked')) {
			var id = $(this).attr('id').substr(7);
			$("#dd"+id).data('triforce')['vidinventario'] = $("#vidinventario").val();
		}
	});
});

function detalle(id,tipo) {
	var tabla = $("#data-table-cuentas-detalle").DataTable();
	tabla.destroy();
	if (tipo == 1) {
		arr('login',6,'',311,id,0,1,$("#listaDetalleFacturas"));
		arr('login',6,'id,nombre',312,'id > 0 order by nombre',15,1,$(".estadodevolucion"));
		var invent = arr('login',4,'id,nombre',111,'id > 0 and find_in_set(idsucursal,"-1,@@impresa") order by id',0,0,0)[0];
		for (var i = 0, len = invent.length; i < len; i++) {
			$("#vidinventario").append('<option value="'+invent[i][0]+'">'+invent[i][1]+'</option>');
		}
		$("#factura").val(id);
	}else
		arr('login',6,'',409,id,0,1,$("#listaDetalleFacturas"));
	
	$('select').material_select();
	$("#data-table-cuentas-detalle").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        bPaginate: false,
        info: false,
        order: []
	});
}

function validar (varreglo,vmodulo) {
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'devolucione':
			if (vmodulo['tip'] == '') {
				err = validardevoluciones();
				if ( err ) {
					return err;
				}
			}
			break;
			case 'detalledevolucione':
			if (vmodulo['tip'] == '') {
				err = validardetalle();
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

function validardetalle() {
	// if ($("#vvalor").val() == '') {
	// 	$("#vvalor").val(100.00)
	// 	// return 'Debe seleccionar 1 o mas productos';
	// }

	return false;
}

function validardevoluciones() {
	

	return false;
}

function endDetail(vid,vacc,modulo){
	if (vacc == 1) {
		var tipo = $("#p_v").is(':checked') == true ? 0 : 1;
		window.open('devoluciones?accion=3&id='+vid+'&tp='+tipo);
		$("#vfecha").addClass('hide');
	    // setTimeout(function(){location.reload();},1000);
	}
    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'devoluciones':
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