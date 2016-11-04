$(function(){
	$("#fajustess").submit(function(){return false});
	$("#m1").click();
});

$(document).on("click",".menu3",function(){

	$(".menu3").removeClass('active');
		$(this).addClass('active');
	
		var id = parseInt($(this).attr('id').substr(1));
		switch(id){
			case 1:
				var p = mantenimiento('ajustes',2,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				var arr = {};
				arr['sel'] = 'valor';
				arr['tbl'] = 50;
				arr['where'] = '';
				var e = mantenimiento('login',4,arr)[0];
				$("#vnombre").val(e[0]);
				$("#vcedula").val(e[1]);
				$("#vtelefono").val(e[2]);
				$("#vcorreo").val(e[3]);
				$("#vdireccion").val(e[4]);
				$("#vfechainicio").val(e[5]);
				$("#vfechafinal").val(e[6]);
				break;
			case 2:
				var p = mantenimiento('ajustes',3,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				var arr = {};
				arr['sel'] = '*';
				arr['tbl'] = 51;
				arr['where'] = 'id > 0 order by id';
				var imp = mantenimiento('login',6,arr);
				$("#dimpuestos").html(imp);
				break;
			case 3:
				var p = mantenimiento('ajustes',4,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				$("#data-table-sucursales").dataTable({
					bFilter : false,
					bScrollInfinite : true,
					bSort : false,
					bLengthChange : false,
					bPaginate :  false,
					bInfo : false
				});
				break;
			case 4:
				var p = mantenimiento('ajustes',1,'');
				$("#majustes").html('');
				$("#majustes").html(p);
				notify('i','hola','good','danger')
				break;
		}
		
});

$(document).on("click","#addimp",function(){
	if ($("#vimpuesto").val() != '') {

		var nombre = $("#vimpuesto").val();
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '1,0,\"'+nombre+'\",0.00';
		mantenimiento('login',4,arr);

		var arr2 = {};
		arr2['sel'] = '*';
		arr2['tbl'] = 51;
		arr2['where'] = 'id > 0 order by id';
		var p = mantenimiento('login',6,arr2);
		$("#dimpuestos").html('');
		$("#dimpuestos").html(p);
		$("#vimpuesto").val('');
	}
});

$(document).on("click",".delimp",function(){
	var id = $(this).attr('id');

	var arr = {};
	arr['sel'] = '';
	arr['tbl'] = 48;
	arr['where'] = '3,'+id+',"",0.00';
	mantenimiento('login',4,arr);

	var arr2 = {};
	arr2['sel'] = '*';
	arr2['tbl'] = 51;
	arr2['where'] = 'id > 0 order by id';
	var p = mantenimiento('login',6,arr2);
	$("#dimpuestos").html('');
	$("#dimpuestos").html(p);

});

$(document).on("click","#actinfo",function(){
	$("#suc1").hide();
	$("#err1").hide();

	var validar = validarAjuste();
	if (validar == false) {
		$(".infoempresa").each(function(){
			var valor = $(this).val();
			var campo = $(this).attr('field');
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 47;
			arr['where'] = '\"'+valor+'\",\"'+campo+'\"';
			mantenimiento('login',4,arr);
		});
		
		$("#suc1").show();
		$("#sucm1").html('Datos Ingresados Correctamente');
	}else{
		$("#err1").show();
		$("#errm1").html(validar);
	}
	
});

$(document).on("click","#actimp",function(){
	$("input[name=impuesto]").each(function(){
		var valor = $(this).val();
		var id = $(this).attr('id');

		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '2,'+id+',"",'+valor;
		mantenimiento('login',4,arr);
	});
	
});

$(document).on("click","#sfechafiscal",function(){
	var arr = {};
	arr['sel'] = '';
	arr['tbl'] = 52;
	arr['where'] = '\"'+$("#vfechainicio").val()+'\",\"'+$("#vfechafinal").val()+'\"';
	mantenimiento('login',4,arr);
});

$(document).on("click",".load",function(){
	$("#accsuc").removeClass("add");
	$("#accsuc").addClass("edit");
	$("#accsuc").html("Guardar");
});

$(document).on("change","#vidprovincia",function(){
	var id = $("option:selected",this).val();
	arr('login',6,'id,nombre',9,'idprovincia = '+id+' and id > 0 order by nombre','',1,$("#vidcanton"))
});

$(document).on("click",".cuecon",function(){
	var vdeep = parseInt($(this).attr('deep'));
	var vndeep = parseInt($(this).attr('ndeep'))+1;
	$(".cuecon[deep^='"+vdeep+"']").filter(function(){ return $(this).attr('ndeep') == vndeep}).toggle()
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'ajustes':
			if (vmodulo['tip'] == '') {
				err = validarajustes();
				if ( err ) {
					return err;
				}
			}
			break;
		case 'sucursale':
			if (vmodulo['tip'] == '') {
				err = validarsucursales();
				if ( err ) {
					return err;
				}
			}else{
				$("#vtelefono").val(1);
			}
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarsucursales() {
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre de la Sucursal Requerido";
	}

	if ($("#vtelefono").val() == '') {
		$("#vtelefono").focus();
		return "Teléfono de la Sucursal Requerido";
	}

	if ($("#vidprovincia").val() == 0) {
		$("#vidprovincia").focus();
		return "Provincia Requerido";
	}

	if ($("#vidcanton").val() == 0) {
		$("#vidcanton").focus();
		return "Cantón Requerido";
	}
}

function validarAjuste() {
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre de la Empresa Requerido";
	}

	if ($("#vcedula").val() == '') {
		$("#vcedula").focus();
		return "Cédula Jurídica Requerida";
	}

	if ($("#vtelefono").val() == '') {
		$("#vtelefono").focus();
		return "Teléfono de la Empresa Requerido";
	}

	if ($("#vcorreo").val() == '') {
		$("#vcorreo").focus();
		return "Correo de la Empresa Requerido";
	}

	if ($("#vdireccion").val() == '') {
		$("#vdireccion").focus();
		return "Dirección de la Empresa Requerida";
	}
	return false;
}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'sucursale':
			vmodulo['sel'] = 'vid,vconsecutivo,vfactura,vidusuario,vnombre,vtelefono,vidprovincia,vidcanton';
			vmodulo['tbl'] = 57;
			vmodulo['where'] ='vid = '+vid;
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = 'id,nombre,telefono';
	arr['tbl'] = 39;
	arr['where'] = 'id > 0 order by nombre';

	return arr;
}

/*cuentas clientes*/

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
		arr['where'] = '1,0,'+$("#vgenero").attr('lvl')+',"'+$('#vnombre').val()+'",@@usr,'+$("#vispadre").val();

		mantenimiento('login',4,arr);//INGRESAR CUENTA

		arr = {};
		arr['sel'] = 'id,nombre,numero';
		arr['tbl'] = 36;
		arr['where'] = 'idsubcuenta = '+$("#vgenero").attr('lvl');

		$("#vgenero").html(mantenimiento('login',6,arr));

		slide($("[cod]:visible").attr('cod'),-1);

		// arr = {};
		// arr['sel'] = '*';
		// arr['tbl'] = 33;
		// arr['where'] = '';
		// $("#vcuentas").html(mantenimiento('login',6,arr));
		
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