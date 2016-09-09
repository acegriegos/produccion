var ftr = 1;

$(function(){

	$(".menu3").click(function(){
		var id = parseInt($(this).attr('id').substr(1));
		$(".menu3").removeClass('active');
		$(this).addClass('active')
		
		$("#mcontabilidad").html(mantenimiento("contabilidad",id,''));

		switch(id){
			case 1:			
				$("[modulo=scontabilidad]").attr('max',$("[cod]").length / 2);
				break;
			case 2:
				//$('#datetimepicker2').datetimepicker();
				for (var i = 1; i < 10; i++) {
					$('#detalletransacciones').append('<tr id="f'+i+'"><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="c'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="d'+i+'"></td>  <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext" id="e'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext" id="h'+i+'"></td></tr>')
				}
            break;
		}

	});

	$("#m1").click();
});

$(document).on("click","#Iadd",function(){
	deadclear('contabilidad')
});

$(document).on("click",".vfiltros",function(){
	var id = parseInt($(this).attr('filtro').substr(1))
	var elemento = $("#vbusqueda");
	switch(id){
		case 1:
			elemento.attr("placeholder","Número / Descripción");
			elemento.focus();
			break;
		default:
			elemento.attr("placeholder",$(this).html());
			elemento.focus();
			break;
	}
	ftr = id;
});

$(document).on("keyup","[id^=f]",function(e){
	var code = e.which || e.keyCode;
	if(code == 46){
		$(this).remove();
		$('#detalletransacciones').append('<tr id="f'+i+'"><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="c'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" class="tdtext" id="d'+i+'"></td>  <td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext" id="e'+i+'"></td><td style="padding-bottom: 0px;padding-top: 0px;padding-right: 2px;padding-left: 2px;"><input type="text" style="text-align:right" class="tdtext" id="h'+i+'"></td></tr>')
	}
});

$(document).on("keyup",".tdtext",function(e){
	var code = e.which || e.keyCode;

	if(code == 13){
		var id = $(this).attr('id').substr(1);
		var spec = $(this).attr('id').substring(0,1);

		switch(spec){
			case 'c':

				$('#e'+id).focus()
				break;
		}
	}
});

$(document).on("click",".func",function(){
	var id = parseInt($(this).attr('fn').substr(1))
	$(".sub-tran").hide('fast');
	$("#t"+id).show('fast');
});

$(document).on("keyup","#vbusqueda",function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		arr('login',6,'',53,"'"+$(this).val()+"',"+ftr,33,1,$("#vcuentas"));
	}
});

$(document).ready(function(){

	$(".slidel").click(function(){
		//slide($("[cod]:visible").attr('cod'),-1);
	});

});

$(document).on("change","#vgenero",function(){
	var arr = {};
	arr['sel'] = 'id,nombre,numero';
	arr['tbl'] = 36;
	arr['where'] = 'idsubcuenta = '+$("option:selected",this).val();
	$(this).attr('lvl',$("option:selected",this).val());
	
	var rs = mantenimiento('login',6,arr);
	$(".myh3").append($("option:selected",this).attr('num')+"-"+$("option:selected",this).text()+"<br>"+"&nbsp>");
	if (rs.length == undefined) {
		slide($("[cod]:visible").attr('cod'),1);
		$("#vnombre").val('');
        $("#vnombre").focus();
        
	}
	else
		$(this).html(rs);
});

$(document).on("keyup","#vnombre",function(e){
	var code = e.which || e.keyCode
	if(code == 13)
		$(".addglobal").click();
})

$(document).on("click",".addglobal",function(){

	if($("#vnombre").is(":visible")){
		var arr = {}
		arr['sel'] = '';
		arr['tbl'] = 37;
		arr['where'] = '1,0,'+$("#vgenero").attr('lvl')+',"'+$('#vnombre').val()+'",@@usr';

		mantenimiento('login',4,arr);//INGRESAR CUENTA

		arr = {};
		arr['sel'] = 'id,nombre,numero';
		arr['tbl'] = 36;
		arr['where'] = 'idsubcuenta = '+$("#vgenero").attr('lvl');

		$("#vgenero").html(mantenimiento('login',6,arr));

		slide($("[cod]:visible").attr('cod'),-1);

		arr = {};
		arr['sel'] = '*';
		arr['tbl'] = 33;
		arr['where'] = '1 limit 20';
		$("#vcuentas").html(mantenimiento('login',6,arr));
		
	}else{
		slide($("[cod]:visible").attr('cod'),1);
		$("#vnombre").val('');
        $("#vnombre").focus();
	}
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

function cargarSintax(vtabla){
	
	return false;


}