$(function(){
	$("#fcontabilidads").submit(function(){return false});
	$("#data-table-contabilidads").dataTable();

});

$(document).on("click","#Iadd",function(){
	deadclear('contabilidad')

});


$(document).ready(function(){
	$("[modulo=scontabilidad]").attr('max',$("[cod]").length / 2) ;
	
	$("#vgenero").change(function(){
		slide($(this).attr('cod'),1);
		var arr = {};
		arr['sel'] = '*';
		arr['tbl'] = 35;
		arr['where'] = 'idtipocuenta = '+$("option:selected",this).val();
		$("#vsubgenero").html(mantenimiento('login',6,arr));
	});

	$("#vsubgenero").change(function(){
		slide($(this).attr('cod'),1);
	});

	$(".slidel").click(function(){
		slide($("[cod]:visible").attr('cod'),-1);
	});

	$("#vnombre").keyup(function(e){
		var code = e.which || e.keyCode;
		if (code == 13) {
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 37;
			arr['where'] = '1,0,'+$("#vsubgenero option:selected").val()+",\""+$(this).val()+"\"";
			
			var p = mantenimiento('login',4,arr);
			if (p['succed'] == 0) {
				$("#err1").show();
				$("#errm1").html(p[0]['ERROR']);
			}
		}
	});

});

function slide(cod,suma) {
	var max = $("[modulo=scontabilidad]").attr('max');
	var siguiente = parseInt(cod) + suma;
	$("[cod="+cod+"]").hide();
	$("[cod="+siguiente+"]").show();
	
	if (siguiente == 1) 
		$(".slidel").hide();
	else if(siguiente ==  max)
		$(".slidel").show();
	else
		$(".slidel").show();
}


function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'contabilidad':
			if (vmodulo['tip'] == '') {
				err = validarcontabilidad();
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

function validarcontabilidad() {



	return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'contabilidad':
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