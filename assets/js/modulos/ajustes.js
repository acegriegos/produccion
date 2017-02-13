$(function(){
	$(".modal").modal();
	$("#m1").click();
	$("#addMoneda").click(function(){
		deadclear('moneda');
	})

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
				bLengthChange : false,
				order : []
			});
			$("#data-table-tipousuarios").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			$("#data-table-tipopagos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			$("#data-table-bancos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			$("#data-table-nivelesclientes").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			
			$(".wsdl-op").hide();
			break;
		case 2:
			var p = mantenimiento('ajustes',2,'');
			$("#majustes").html(p);
			$("#data-table-descuentos").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			break;
		case 3:
			var p = mantenimiento('ajustes',3,'');
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 51;
			arr['where'] = 'id > 0 order by id';
			var imp = mantenimiento('login',6,arr);
			$("#dimpuestos").html(imp);
			$("#majustes").html(p);
			
			break;
		case 4:
			var p = mantenimiento('ajustes',4,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			break;
		case 5:
			var p = mantenimiento('ajustes',5,'');
			$("#data-table-sucursales").dataTable({
				bFilter : false,
				bScrollInfinite : true,
				bSort : false,
				bLengthChange : false,
				bPaginate :  false,
				bInfo : false
			});
			$("#majustes").html('');
			$("#majustes").html(p);
			break;
		case 6:
			var p = mantenimiento('ajustes',6,'');
			$("#majustes").html('');
			$("#majustes").html(p);
			$("#data-table-bodegas").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			$("#data-table-inventarios").dataTable({
				bFilter : false,
				bLengthChange : false,
				order : []
			});
			var arr = {};
			arr['sel'] = 'idcuenta';
			arr['tbl'] = 88;
			arr['where'] = 'idfila = 0 and idtipo = 10';
			var def = mantenimiento('login',4,arr)[0][0];
			$("#vidcuenta").val(def);

			break;
	}

	$(".modal").modal()	
	$('.tooltipped').tooltip({delay: 50});
	$('.dropdown-button').dropdown();
	$('select').material_select();
	$(".collapsible").collapsible(); 
	$('.datepicker').pickadate({
    	selectMonths: true, // Creates a dropdown to control month
    	selectYears: 15 // Creates a dropdown of 15 years to control year
  	});


	$("#modal-tipopagos").modal({
		complete: function(){
			$("#vnombre_pago").attr('id','tmp_pagos');
	    	$("#tmp").attr('id','vnombre_pago');
	    	$("#tmp_l_pagos").attr('for','tmp_pagos');
		}
	});

	$("#modal-bancos").modal({
		complete: function(){
			$("#vnombre_banco").attr('id','bname-mod');
			$("#tmp").attr('id','vnombre_banco');
		}
	});
});

$(document).on("click",".load[modulo=bodega]",function(){
    $("#addbod").attr('id','actbod');
    $("#actbod").removeClass('add');
    $("#actbod").addClass('edit');
    $("#actbod").text('save');
    $("#vbodega").select();
});

$(document).on("click",".load[modulo=inventario]",function(){
    $("#addinv").attr('id','actinv');
    $("#actinv").removeClass('add');
    $("#actinv").addClass('edit');
    $("#actinv").text('save');
    $("#vinventario").select();
});

$(document).on("click","#actbod",function(){
    $("#actbod").attr('id','addbod');
    $("#addbod").removeClass('edit');
    $("#addbod").addClass('add');
    $("#addbod").text('add');
});

$(document).on("change","#vidbode",function(){
    var id = $(this).val();
    var tabla = $("#data-table-inventarios").DataTable();
    tabla.destroy();
    arr('login',6,'id,nombre',111,'idbodega = '+id,'',1,$("#listainventarios"));
    $("#data-table-inventarios").DataTable({
    	bFilter :  false,
        bLengthChange : false,
        order : []
    });
});

$(document).on("click",".load[id^=i]",function(){
	$("#vnombre_banco").attr('id','tmp');
	$("#bname-mod").attr('id','vnombre_banco');
})

$(document).on("click","#add_x",function(){
	var msj = '';

	if($("#vdet_cta").val() == ''){
		$("#vdet_cta").focus()
		msj = "Número de Cuenta Requerido";
	}

	if (arr('login',4,'count(id)',203,'cuenta = "'+$("#vdet_cta").val()+'"',0,0,0)[0][0][0] > 0) {
		$("#vdet_cta").focus()
		msj = "Número de Cuenta Ya Existente";
	}

	if($("#vdet_nom").val() == ''){
		$("#vdet_nom").focus()
		msj = "Nombre de Cuenta Requerido";
	}

	$("#fdetallebancos .collapsible-header").each(function(){
		if ($(this).attr('vdet_cta').trim() == $("#vdet_cta").val().trim()){
			$("#vdet_cta").focus()
			msj = "Número de Cuenta Ya Existente";
		}

		if ($(this).attr('vdet_nom').trim() == $("#vdet_nom").val().trim()){
			$("#vdet_nom").focus()
			msj = "Nombre de Cuenta Ya Existente";
		}

	})

	if (msj != '') {
		Materialize.toast(msj,4000,'red')
	}else{
		var mmon = '-';
		var mmonid = 0;
		if($("#vdet_moneda option:selected").val() != ''){
			mmon = $("#vdet_moneda option:selected").attr('simb');
			mmonid = $("#vdet_moneda option:selected").val();
		}
		$("#fdetallebancos").append('<li id="0"> <div class="collapsible-header ciclos" vid="0" vdet_moneda="'+mmonid+'" vctabnk="'+$("#vctabnk option:selected").val()+'" vidbanco="?" vdet_nom="'+$("#vdet_nom").val()+'" vdet_cta="'+$("#vdet_cta").val()+'">'+mmon+'<span class="badge">'+$("#vdet_nom").val()+': '+$("#vdet_cta").val()+' ['+$("#vctabnk option:selected").html()+']</span></div> </li>')
	
	}
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

$(document).on('click',".valorescc",function(){
	var vid = $(this).prop('id').substr(1);
	var p = arr('login',4,'',201,vid,0,0,0)[0][0];
	$("#fdetallenivelesclientes #vidnivel").val(p[0]);
	$("#cname-mod").html(p[1]);
	$("#fdetallenivelesclientes #viddetalle").val(p[2]);
	$("#fdetallenivelesclientes #vclie_descuento_max").val(p[3]);
	$("#fdetallenivelesclientes #vclie_descuento").val(p[4]);
	$("#fdetallenivelesclientes #vclie_plazo").val(p[5]);
	$("#fdetallenivelesclientes #vclie_credito").val(p[6]);
	$("#fdetallenivelesclientes #vprod_descuento_max").val(p[7]);
	$("#fdetallenivelesclientes #vprod_descuento").val(p[8]);
	$("#fdetallenivelesclientes #vdcontado").val(p[9]);
	$("#fdetallenivelesclientes #vhcontado").val(p[10]);
	$("#fdetallenivelesclientes #vdcredito").val(p[11]);
	$("#fdetallenivelesclientes #vhcredito").val(p[12]);
	$("#fdetallenivelesclientes #vprod_cuenta").val(p[13]);

	$("#fdetallenivelesclientes #vdcontado").attr('defecto',p[9]);
	$("#fdetallenivelesclientes #vhcontado").attr('defecto',p[10]);
	$("#fdetallenivelesclientes #vdcredito").attr('defecto',p[11]);
	$("#fdetallenivelesclientes #vhcredito").attr('defecto',p[12]);
	$("#fdetallenivelesclientes #vprod_cuenta").attr('defecto',p[13]);

	$("#fdetallenivelesclientes select").material_select('update');
	Materialize.updateTextFields();
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
				if (err)
					return err
			}
			break;
		case 'sucursale':
			if (vmodulo['tip'] == '') {
				err = validarsucursales();
				if (err)
					return err
			}else{
				$("#vtelefono").val(1);
			}
			break;
		case 'moneda':
			if (vmodulo['tip'] == '') {
				err = validarMonedas(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'wsdl':
			if (vmodulo['tip'] == '') {
				err = validarWSDL(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'detallenivelescliente':
			if (vmodulo['tip'] == '') {
				err = validarCategoria(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'nivelescliente':
			if (vmodulo['tip'] == '') {
				err = validarNiveles(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'tipopago':
			if (vmodulo['tip'] == '') {
				err = validarTP(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'banco':
			if (vmodulo['tip'] == '') {
				err = validarBancos(vmodulo['modulo']);
				if (err)
					return err
			}
			break;
		case 'detallebanco':
			break;
		case 'bodega':
			if (vmodulo['tip'] == '') {
				err = validarBodega();
				if (err)
					return err
			}
			break;
		case 'inventario':
			if (vmodulo['tip'] == '') {
				err = validarInventario();
				if (err)
					return err
			}
			break;
		default:
			return 'Módulo "'+vmodulo['modulo']+'" no Existente';
			break;
	}
	
	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	// console.log(salida)
	return salida;

}

function validarBancos(vmod){

	if ($("#f"+vmod+"s #vcomision").is(":visible")) {

		if (isNaN($("#f"+vmod+"s #vcomision").val()) || $("#f"+vmod+"s #vcomision").val() < 0 || $("#f"+vmod+"s #vcomision").val() > 100 ) {
			$("#f"+vmod+"s #vcomision").focus()
			return "Valores de Comisión Incorrectos";
		}

		if ($("#f"+vmod+"s #vcuenta option:selected").val() == $("#f"+vmod+"s #vcuenta").attr('defecto'))
			$("#f"+vmod+"s #vcuenta").attr('hid',0);
		else
			$("#f"+vmod+"s #vcuenta").removeAttr('hid');

	}else{
		if($("#f"+vmod+"s #vnombre_banco").val() == '' ){
			$("#f"+vmod+"s #vnombre_banco").focus();
			return "Campo Nombre Requerido";
		}
	}

	return false;
}

function validarTP(vmod){

	if($("#f"+vmod+"s #vnombre_pago").val() == '' ){
		$("#f"+vmod+"s #vnombre_pago").focus()
		return 'Nombre de Pago es Requerido';
	}

	if ($("#f"+vmod+" #vbancos").is(":visible")) {
		return "Imposible";
	}

	return 0;
}

function validarCategoria(vmod){

	$("#f"+vmod+"s .set0").each(function(){
		if(isNaN($(this).val()) || $(this).val() == '')
			$(this).val(0)
	});

	$("#f"+vmod+"s select").each(function(){
		if ($('option:selected',this).val() == $(this).attr('defecto'))
			$(this).attr('hid',0);
		else
			$(this).removeAttr('hid');
	});

	return 0;
}

function validarNiveles(vmod){

	if ($("#f"+vmod+"s #vnombre_nivel").val() == ''){
		$("#f"+vmod+"s #vnombre_nivel").focus()
		return 'Nombre de Nivel Requerido';
	}

	return false;
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

function validarMonedas(vmod){
	if ($("#f"+vmod+"s #vnombremon").val() == '') {
		$("#f"+vmod+"s #vnombremon").focus();
		return "Nombre de la Moneda Requerido";
	}

	if ($("#f"+vmod+"s #vsimbolo").val() == '') {
		$("#f"+vmod+"s #vsimbolo").focus();
		return "Símbolo de la Moneda Requerido";
	}
	return false;
}

function validarWSDL(vmod){
	if ($("#vwsdl").is(":checked")) {
		if($("#f"+vmod+"s #vwsdlsnom").val() == ''){
			$("#f"+vmod+"s #vwsdlsnom").focus()
			return 'Dirección HTML Requerida'
		}
		if($("#f"+vmod+"s #vxmlsen").val() == ''){
			$("#f"+vmod+"s #vxmlsen").focus()
			return 'Petición XML Requerida'
		}
		if($("#f"+vmod+"s #vxmlreq").val() == ''){
			$("#f"+vmod+"s #vxmlreq").focus()
			return 'Respuesta XML Requerida'
		}
		if($("#f"+vmod+"s #vobtener").val() == ''){
			$("#f"+vmod+"s #vobtener").focus()
			return 'Nombre de Arreglo Requerido'
		}
	}

	return false;
}

function validarBodega() {
	if ($("#vbodega").val() == ''){
	    $("#vbodega").focus();
	    return 'Nombre Bodega Requerido';
	}
}

function validarInventario() {
	if ($("#vinventario").val() == ''){
	    $("#vinventario").focus();
	    return 'Nombre Bodega Requerido';
	}
}

function cargar(vmodulo,vid) {
	switch(vmodulo['modulo']) {
		case 'sucursale':
			vmodulo['sel'] = 'vid,vconsecutivo,vfactura,vidusuario,vnombre,vtelefono,vidprovincia,vidcanton';
			vmodulo['tbl'] = 57;
			vmodulo['where'] ='vid = '+vid;
			break;
		case 'banco':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 204;
			vmodulo['where'] = vid;
			break;
		case 'bodega':
			vmodulo['sel'] = 'id as vidbodega,nombre as vbodega';
			vmodulo['tbl'] = 41;
			vmodulo['where'] = 'id = '+vid;
			break;
		case 'inventario':
			vmodulo['sel'] = 'id as vidinventario,nombre as vinventario,idbodega as vidbode,idcuenta as vidcuenta';
			vmodulo['tbl'] = 126;
			vmodulo['where'] = 'id = '+vid;
			break;
		default:
			console.log('Cargar Módulo no Existente');
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
		case 'nivelesclientes':
			arr['sel'] = '*';
			arr['tbl'] = 69;
			arr['where'] = 'id > 0';
			break;
		case 'tipopagos':
			arr['sel'] = '*';
			arr['tbl'] = 26;
			arr['where'] = 'id >= 0 order by id';
			break;
		case 'bancos':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 202;
			arr['where'] = 'id >= 0 order by nombre';
			break;
		case 'bodegas':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 41;
			arr['where'] = 'id > 0 order by nombre';
			break;
		case 'inventarios':
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 111;
			arr['where'] = 'id > 0 and idbodega = '+$("#vidbode").val()+' order by nombre';
			break;
		default:
			console.error('ERROR: autodestrucción: '+vtabla);
			break;
	}

	return arr;
}

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

$(document).on("keyup",".fast-edit-r",function(e){
    var code = e.which || e.keyCode
    if(code == 13)
        if($(this).val() == ''){
        	Materialize.toast('Nombre Necesario',4000,'red');
        	$(this).focus()
        }else{
        	var vid = $(this).parent().parent().prop('id').substr(2);
        	var p = arr('login',7,2,69,'nombre="'+$(this).val()+'"','id = '+vid,0,0);
        	if(p['succed']){
        		Materialize.toast('Cambio Realizado Correctamente',4000,'green')
        		thorload('nivelescliente');
        	}else{
        		$(this).select()
        		Materialize.toast('Valor Incorrecto',4000,'red')
        	}
        }
})

$(document).on("click",".load_x",function(){
    $("#vnombre_pago").attr('id','tmp');
    $("#tmp_pagos").attr('id','vnombre_pago');
    $("#tmp_l_pagos").attr('for','vnombre_pago');

    var vid = $(this).prop('id').substr(1);
    var p = arr('login',4,'*',26,'id = '+vid)[0][0];
   	$("#pname-mod").html(p[1])
    $("#ftipopagos #vid").val(p[0]);
    $("#ftipopagos #vnombre_pago").val(p[1]);
    if (p[0] > 0) {
    	$(".mix").show();
	    if(p[2] == 1) 
	    	$("#ftipopagos #vbancos").attr('checked',true);
	    else 
	    	$("#ftipopagos #vbancos").attr('checked',false);
	    
	    if(p[3]){
	    	$("#ftipopagos #extra").attr('checked',true);
	    	$("#ftipopagos #vextra").val(p[3]);
	    	$("#ftipopagos #vregex").val(p[4]);
	    }else{
	    	$("#ftipopagos #extra").attr('checked',false);
	    	$("#ftipopagos #vextra").val('');
	    	$("#ftipopagos #vregex").val('');
	    }
	    //$("#ftipopagos #vcuenta").val(p[5]);
    	$("#ftipopagos #vbancos").change();
    	$("#ftipopagos #extra").change();
    }else
    	$(".mix").hide();

    Materialize.updateTextFields();
    //$("#ftipopagos #vcuenta").material_select('update'); 
})

$(document).on("change","#extra",function(){
    if ($(this).is(':checked'))
    	$(".extra").removeClass('hide')
    else
    	$(".extra").addClass('hide')
})

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

$(document).on('change','#iswsdl',function(){
	
	if ($(this).is(':checked'))
		$(".wsdl-op").show()
	else{
		$(".wsdl-op").hide()
		$("#vwsdl").val(0);
		$("#vwsdl").material_select();
	}
});


/*-------*/

function endDetail(vid,vacc,modulo){
	switch(modulo){
		case 'detallenivelescliente':
			$("#f"+modulo+"s #viddetalle").val(vid);
			break;
		case 'bancos':
			break;
		case 'bodega':
			setTimeout(function(){ deadclear(modulo); $("#vbodega").focus()}, 100);
			thorload(modulo);
			break;
		case 'inventario':
			setTimeout(function(){ deadclear(modulo)}, 100);
			thorload(modulo);
			break;
		default:
			setTimeout(function(){ deadclear(modulo); }, 2500);
    		thorload(modulo);
			break;
	}
}