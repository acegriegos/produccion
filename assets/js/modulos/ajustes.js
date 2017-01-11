$(function(){
	$(".modal").modal();
	$("#m1").click();
	$("script").each(function(){
		$(this).remove();
	});
	
});

$(document).on("click",".menu3",function(){
	$(".menu3").removeClass('active');
	$(this).addClass('active');
	
	var id = parseInt($(this).attr('id').substr(1));
	switch(id){
		case 1:
			var p = mantenimiento('ajustes',1,'');
			$("#majustes").html(p);
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 50;
			arr['where'] = '';
			var e = mantenimiento('login',4,arr)[0][0];
			$("#vnombre").val(e[0]);
			$("#vcedula").val(e[1]);
			$("#vtelefono").val(e[2]);
			$("#vcorreo").val(e[3]);
			$("#vdireccion").val(e[4]);
			$("#vlogo").attr('src',e[5]);
			$("#vfechainicio").val(e[6]);
			$("#vfechafinal").val(e[7]);
			$("#data-table-monedas").dataTable({
				bFilter : false,
				order : []
			});
			$("#data-table-tipousuarios").dataTable({
				bFilter : false,
				order : []
			});
			$("#data-table-tipopagos").dataTable({
				bFilter : false,
				order : []
			});
			$("#data-table-nivelesclientes").dataTable({
				bFilter : false,
				order : []
			});
			
			$(".wsdl-op").hide()
			break;
		case 2:
			var p = mantenimiento('ajustes',2,'');
			$("#majustes").html(p);
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 51;
			arr['where'] = 'id > 0 order by id';
			var imp = mantenimiento('login',6,arr);
			$("#dimpuestos").html(imp);
			break;
		case 3:
			var p = mantenimiento('ajustes',3,'');
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
			var p = mantenimiento('ajustes',4,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			break;
		case 5:
			var p = mantenimiento('ajustes',5,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			break;
		case 6:
			var p = mantenimiento('ajustes',6,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			break;
	}

	$(".modal").modal()	
	$('.tooltipped').tooltip({delay: 50});
	$('.dropdown-button').dropdown();

});

$(document).on("click","#addimp",function(){
	if ($("#vimpuesto").val() != '') {

		var nombre = $("#vimpuesto").val();
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 48;
		arr['where'] = '1,0,\"'+nombre+'\",0.00,0,0';
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
	arr['where'] = '3,'+id+',"",0.00,0,0';
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
		arr['where'] = '2,'+id+',"",'+valor+',0,0';
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

$(document).on("click","#vprincipal",function(){

	if($(this).is(":checked"))
		$(this).attr('value',1)
	
	else
		$(this).attr('value',0)
	
});

$(document).on("change","#vidprovincia",function(){
	var id = $("option:selected",this).val();
	arr('login',6,'id,nombre',9,'idprovincia = '+id+' and id > 0 order by nombre','',1,$("#vidcanton"))
});


$(document).on("click",".numcon",function(){
	var vdeep = parseInt($(this).parent().parent().attr('deep'));
	var vndeep = parseInt($(this).parent().parent().attr('ndeep'))+1;
	
	if($(".cuecon[deep^='"+vdeep+"']:visible").filter(function(){ return $(this).attr('ndeep') == vndeep}).length == 0)
		$(".cuecon[deep^='"+vdeep+"']").filter(function(){ return $(this).attr('ndeep') == vndeep}).show()
	else
		$(".cuecon[deep^='"+vdeep+"']").filter(function(){ return $(this).attr('ndeep') >= vndeep}).hide()
});


$(document).on("keyup",'.editc',function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		var valorc = $(this).val();
		if(valorc == '')
			notify('','Error','Cuenta Requiere Nombre','danger')
		else{
			rs = arr('login',4,'',37,'2,'+$(this).attr('tp')+',0,"'+valorc+'",0,0,0,0');
			if (rs['succed'] == 0) 
				notify('','Error',rs['ERROR'],'danger')
			else
				notify('','','Cambio de Nombre Correcto','success')
		}
	};
	
});

$(document).on("click",'.dsc',function(){
	
	if ($('option',this).length == 1) {


	cuentas_arr = arr('login',4,'id,nombre',33,'','',0,'');
    cuentas = '';

    for (var i = 0; i < cuentas_arr[0].length; i++) {
        cuentas += '<option value="'+cuentas_arr[0][i][0]+'">'+cuentas_arr[0][i][1]+'</option>';
    }

    $(this).html('')
    $(this).html(cuentas)

    }
});

/*DESCUENTOS*/

// $(document).on("click","#modalDescuento",function(){
	
// });

$(document).on("click",".descfactc",function(){
	var valor = $(this).attr('tp');
	arr('login',7,2,15,'valor='+valor,'descr="descuentoVenta"',0,0);
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
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
		case 'moneda':
			if (vmodulo['tip'] == '') {
				err = validarMonedas();
				if ( err ) {
					return err;
				}
			}
			break;
		case 'wsdl':
			if (vmodulo['tip'] == '') {
				err = validarWSDL();
				if ( err ) {
					return err;
				}
			}
			break;
		default:
			return 'Módulo "'+vmodulo['modulo']+'" no Existente';
			break;
	}
	
	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	console.log(salida)
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

function validarMonedas(){
	if ($("#vnombremon").val() == '') {
		$("#vnombremon").focus();
		return "Nombre de la Moneda Requerido";
	}

	if ($("#vsimbolo").val() == '') {
		$("#vsimbolo").focus();
		return "Símbolo de la Moneda Requerido";
	}
	return false;
}

function validarWSDL(){
	if ($("#vwsdl").is(":checked")) {
		if($("#vwsdlsnom").val() == ''){
			$("#vwsdlsnom").focus()
			return 'Dirección HTML Requerida'
		}
		if($("#vxmlsen").val() == ''){
			$("#vxmlsen").focus()
			return 'Petición XML Requerida'
		}
		if($("#vxmlreq").val() == ''){
			$("#vxmlreq").focus()
			return 'Respuesta XML Requerida'
		}
		if($("#vobtener").val() == ''){
			$("#vobtener").focus()
			return 'Nombre de Arreglo Requerido'
		}
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
			return 'Cargar Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(vtabla){

	var arr = {}

	switch(vtabla){
		case 'monedas':
			arr['sel'] = 'id,nombre,valor,if(principal,"Moneda por Defecto",""),simbolo';
			arr['tbl'] = 54;
			arr['where'] = 'id > 0 order by principal desc,nombre';
			break;
		default:
			console.error('ERROR: autodestrucción');
			break;
	}

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

/*MONEDAS*/

$(document).on('click','#iswsdl',function(){
	
	if ($(this).is(':checked'))
		$(".wsdl-op").show()
	else
		$(".wsdl-op").hide()
});

$(document).on('change','#vwsdl',function(){
	
	if ($('option:selected',this).val() == 0)
		$(".add-wsdl").show()
	else
		$(".add-wsdl").hide()
});

/*-------*/

function endDetail(vid,vacc,modulo){

	setTimeout(function(){ deadclear(modulo); }, 2500);
    thorload(modulo);

}