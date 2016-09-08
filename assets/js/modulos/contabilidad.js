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

	$(".slidel").click(function(){
		//slide($("[cod]:visible").attr('cod'),-1);
	});

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

		$("#show_cuentas").append('<div class="card-block"><div class="row" id="vcuentas"><div class="col-md-6 col-lg-6">{$VCUE[LE][0]}</div><div class="col-md-6 col-lg-6">{$VCUE[LE][1]}</div></div></div>');
		
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