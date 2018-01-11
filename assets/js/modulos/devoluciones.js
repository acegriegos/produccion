$(function(){
	$("#fdevoluciones").submit(function(){return false});
	$("[id^=ftr]").hide();
	$(".chg_tipo").change(function() {
		var id = $(this).prop('value')
		if ($(this).is(':checked')){
			$("#ftr"+id).removeClass("hide");
			$("#ftr"+id).show();
		}
		else
			$("#ftr"+id).addClass("hide");

		Materialize.updateTextFields();
	});

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

	$("#srchfact").click(function(){
		var cliente = factura = num1 = num2 = 0;
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

		var p = arr('login',6,'',302,$("#cp").is(":checked")+','+factura+','+cliente +',"'+desde +'","'+hasta+'",'+num1+','+num2,0,1,$("#listafacturas"));
		
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

	$("#ftr0").show();
});

$(document).on("click",".detalle",function(){
	$(this).sideNav({
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
	$(this).sideNav('show');
	var id = $(this).attr('id').substr(1);
	
	var tabla= $("#data-table-cuentas-detalle").DataTable();
	tabla.destroy();
	var  datos=  arr('login',6,'',303,id,0,1,$("#listaDetalleFacturas"));


	$('select').material_select();
	$("#data-table-cuentas-detalle").dataTable({

		bFilter: false,
		order : [],
		"bLengthChange": false
	});
	$("#btn-navsalir").click(function(){
		
		$('.side-nav-cuentas').sideNav('hide');
		$('.button-collapse').sideNav('destroy');

	});
	
	$("#btn-divsalir").click(function(){

		$(".divabono").hide();
		$(".divabono").attr('visible',0);

	});

	$("#btn-div").click(function(){
		var vi = $(".divabono").attr('visible');
		if (vi == 0) {
			$(".divabono").show();
			$(".divabono").attr('visible',1);
		}else{
			$(".divabono").hide();
			$(".divabono").attr('visible',0);
		}
	});
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'devoluciones':
			if (vmodulo['tip'] == '') {
				err = validardevoluciones();
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

function validardevoluciones() {


	return false;
}

function endDetail(vid,vacc,modulo){

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