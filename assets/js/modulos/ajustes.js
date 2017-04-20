$(function(){
	$(".modal").modal();
	$("#m1").click();
	$("#addMoneda").click(function(){
		deadclear('moneda');
	});
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
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 142;
			arr['where'] = '0';
			var desc = mantenimiento('login',4,arr)[0][0][0];
			if (desc != null) {
				var vdesc = mantenimiento('login',6,arr);
				$("#listadescuentos").html(vdesc);
			}
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
			$("#data-table-defecto").dataTable();

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
    	selectYears: 15, // Creates a dropdown of 15 years to control year
    	format: 'yyyy-mm-dd'
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

$(document).on("click",".editdesc",function(){
	var id = $(this).attr('id').substr(1);
	$("#iddescuento").val(id);
});

$(document).on("change","#tpdsc",function(){
	$("#descue").html('');
	var iddescuento = $("#iddescuento").val();
	var idtabla = $("option:selected",this).attr('tabla');
	var desc = arr('login',4,'',145,iddescuento+','+idtabla,0,0,0)[0];
	$("#descue").append('<option value="0">Seleccione una Opción</option>');
	for (var i = 0, len = desc.length; i < len; i++) {
		$("#descue").append('<option value="'+desc[i][0]+'">'+desc[i][1]+'</option>');
	}
	$("#descue").material_select();
	$(".options").addClass('hide');
});

$(document).on("change","#descue",function(){
	var id = $(this).val();
	if (id != 0) {
		$(".options").removeClass('hide');
		var optns = arr('login',4,'idciclo,date_format(f1,"%Y-%m-%d"),date_format(f2,"%Y-%m-%d"),extra,valor',79,'idtabla = '+$("#tpdsc option:selected").attr('tabla')+' and idfila = '+id,0,0,0)[0][0];
		var days = optns[3];
		$("#optdesc").val(optns[0]).change();
		$("#optdesc").material_select();
		if (optns[1] != null) {
			$("#f1").val(optns[1]);
			$("#f2").val(optns[2]);
		}else{
			$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
			$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		}
		$("#valor").val(optns[4]);
		Materialize.updateTextFields();
		if (optns[0] == 2) {
			$("#months").val(optns[3]);
			$("#days").val(0);
			$("select").material_select();
		}else if (optns[0] == 3) {
			days = days.split(',');
			$.each(days,function(index,value){
				$("#days").find("option[value='"+value+"']").prop('selected', true);
				$("#days").find("option[value='"+value+"']").val(value);
			});
			$("#months").val(0);
			
			$("select").material_select();
		}
	}else{
		$(".options").addClass('hide');
	}
});

$(document).on("change","#vidciclo",function(){
	var id = $(this).val();
	if (id == 0 || id == 4) {
		$("[vfecha]").addClass('hide');		
		$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$("#vmonths").val(0);
		$("#vdays").val(0);
	}else if (id == 1) {
		$("[vfecha=1]").removeClass('hide');
		$("[vfecha=2]").addClass('hide');
		$("[vfecha=3]").addClass('hide');
		fecha = new Date();
		$('#vf1').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
		$('#vf2').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()+1]);
		$("#vmonths").val(0);
		$("#vdays").val(0);
	}else if (id == 2) {
		$("[vfecha=2]").removeClass('hide');
		$("[vfecha=1]").addClass('hide');
		$("[vfecha=3]").addClass('hide');
		$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		var months = arr('login',4,'id,nombre',143,'1',0,0,0)[0];
		for (var i = 0, len = months.length; i < len; i++) {
			$("#vmonths").append('<option value="'+months[i][0]+'">'+months[i][1]+'</option>');
		}
		$("#vmonths").material_select();
		$("#vdays").val(0);
	}else if (id == 3) {
		$("[vfecha=1]").addClass('hide');
		$("[vfecha=2]").addClass('hide');
		$("[vfecha=3]").removeClass('hide');
		$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		var days = arr('login',4,'id,nombre',144,'1',0,0,0)[0];
		for (var i = 0, len = days.length; i < len; i++) {
			$("#vdays").append('<option value="'+days[i][0]+'">'+days[i][1]+'</option>');
		}
		$("#vdays").material_select();
		$("#vmonths").val(0);
	}
});

$(document).on("change","#optdesc",function(){
	var id = $(this).val();
	if (id == 0 || id == 4) {
		$("[vfecha]").addClass('hide');		
		$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$("#months").val(0);
		$("#days").val(0);
	}else if (id == 1) {
		$("[vfecha=1]").removeClass('hide');
		$("[vfecha=2]").addClass('hide');
		$("[vfecha=3]").addClass('hide');
		fecha = new Date();
		$('#f1').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
		$('#f2').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()+1]);
		$("#months").val(0);
		$("#days").val(0);
	}else if (id == 2) {
		$("[vfecha=2]").removeClass('hide');
		$("[vfecha=1]").addClass('hide');
		$("[vfecha=3]").addClass('hide');
		$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		var months = arr('login',4,'id,nombre',143,'1',0,0,0)[0];
		for (var i = 0, len = months.length; i < len; i++) {
			$("#months").append('<option value="'+months[i][0]+'">'+months[i][1]+'</option>');
		}
		$("#months").material_select();
		$("#days").val(0);
	}else if (id == 3) {
		$("[vfecha=1]").addClass('hide');
		$("[vfecha=2]").addClass('hide');
		$("[vfecha=3]").removeClass('hide');
		$('#f1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		$('#f2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
		var days = arr('login',4,'id,nombre',144,'1',0,0,0)[0];
		for (var i = 0, len = days.length; i < len; i++) {
			$("#days").append('<option value="'+days[i][0]+'">'+days[i][1]+'</option>');
		}
		$("#days").material_select();
		$("#months").val(0);
	}
});

$(document).on("click",".assigndesc",function(){
	var id = $(this).attr('id').substr(1);
	var nombre = arr('login',4,'nombre',94,'id = '+id,0,0,0)[0][0];
	$("#namedesc").text(nombre);
	$("#adddesc").attr('iddescuento',id);
	$('#vf1').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
	$('#vf2').pickadate().pickadate('picker').set('select', [1000, 00, 01]);
	$("#td1").change();
});

$(document).on("click","#adddesc",function(){
	var iddescuento = $(this).attr('iddescuento');
	var idciclo = $("#vidciclo").val();
	var f1 = $("#vf1").val()+' 00:00:00';
	var f2 = $("#vf2").val()+' 00:00:00';
	var idfila = 0;
	var tabla = $("[name=tipodesc]:checked").attr('tbl');
	var valor = $("#vvalor").val() == '' ? 0 : $("#vvalor").val();
	var extra = 0;

	if ($("[name=tipodesc]:checked").attr('text') == 1) {
		idfila = $("#vidfila").val() == '' ? 0 : $("#vidfila").val();
	}else{
		idfila = $("#voptns").val() == '' ? 0 : $("#voptns").val();
	}

	if (idciclo == 2) {
		extra = $("#vmonths").val();
	}else if (vidciclo == 3) {
		extra = $("#vdays").val() == '' ? 0 : $("#vdays").val();
	}

	if (idfila == 0) {
		Materialize.toast('Descuento sin asignar', 6000, 'red');
	}else if (valor == 0) {
		Materialize.toast('Valor debe ser mayor a 0', 6000, 'red');
	}else{
		var dsc = arr('login',4,'',95,'1,0,'+idciclo+','+iddescuento+',"'+f1+'","'+f2+'",'+idfila+','+tabla+','+valor+',\"'+extra+"\"",0,0,0);
		console.log(dsc)
		Materialize.toast('Descuento Agregado Correctamente', 4000, 'green');
		$("#vidciclo").val(0);
		$("#vidciclo").change();
		$("#td1").prop('checked',true)
		$("#vproducto").val('');
		$("#vcliente").val('');
		$("#vvalor").val('');
		$("select").material_select();
	}
});

$(document).on("click","#editdesc",function(){
	var iddescuento = $("#iddescuento").val();
	var idtabla = $("#tpdsc option:selected").attr('tabla');
	var idfila = $("#descue").val();
	var idciclo = $("#optdesc").val();
	var f1 = $("#f1").val();
	var f2 = $("#f2").val();
	var valor = $("#valor").val();
	var days = $("#days").val();
	var months = $("#months").val();
	var extra = '';
	var id = arr('login',4,'id',79,'idfila = '+idfila+' and idtabla = '+idtabla+' and iddescuento = '+iddescuento,0,0,0)[0][0][0];
	if (idciclo == 2) {
		extra = months;
	}else if (idciclo == 3) {
		extra = days;
	}
	if (f1 == '1000-01-01' && f2 == '1000-01-01') {
		f1 = f2 = null;
	}
	var desc = arr('login',4,'',95,'2,'+id+','+idciclo+','+iddescuento+','+f1+','+f2+','+idfila+','+idtabla+','+valor+',\"'+extra+'\"',0,0,0);
	console.log(desc)
	Materialize.toast('Descuento Actualizado Correctamente', 4000, 'green');
	$("#tpdsc").val(0);
	$("#descue").val(0);
	// $("#vidciclo").val(0);
	// $("#vproducto").val('');
	// $("#vcliente").val('');
	// $("#vvalor").val('');
	$("select").material_select();
});

$(document).on("click","#gendesc",function(){
	var cuentas = arr('login',4,'id,nombre',36,'id > 0',0,0,0)[0];
	var defecto = arr('login',4,'idcuenta',89,'idtipo = 3',0,0,0)[0][0];
	var estados = arr('login',4,'id,nombre',141,'1',0,0,0)[0];
	for (var i = 0, len = estados.length; i < len; i++) {
		$("#videstado").append('<option value="'+estados[i][0]+'">'+estados[i][1]+'</option>');
		$("#videstado").val(1);
	}
	for (var i = 0, len = cuentas.length; i < len; i++) {
		$("#vidcuenta").append('<option value="'+cuentas[i][0]+'">'+cuentas[i][1]+'</option>');
		$("#vidcuenta").val(defecto);
	}
	$("select").material_select();
});

$(document).on("change","[name=tipodesc]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	var tbl = $(this).attr('tbl');
	var tp = $(this).attr('text');
	if (tbl != undefined) {
		$(".optns").removeClass('hide');
		if (tp == undefined) {
			$("#vproducto").addClass('hide');
			$("#vcliente").addClass('hide');
			$("#voptns").removeClass('hide');
			arr('login',6,'id,nombre',tbl,'id >= 0',15,1,$("#voptns"));
			$("#voptns").material_select();
		}else{
			if (tp == 1) {
				$("#voptns").addClass('hide');
				$("#vproducto").removeClass('hide');
				$("#vcliente").addClass('hide')
				$("#voptns").material_select();
			}else{
				$("#voptns").addClass('hide');
				$("#vproducto").addClass('hide');
				$("#vcliente").removeClass('hide')
				$("#voptns").material_select();
			}
		}
	}else{
		$(".optns").addClass('hide');
		$("#voptns").val(0);
		$("#voptns").material_select();
	}
});

$(document).on("keydown","#vproducto",function(e){
	var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("#vproducto").autocomplete({
            limit: 10,
            data: arr('login',4,'nombre,null',11,'nombre like \"%'+$("#vproducto").val()+'%\" limit 10',0,0,0,1)
        });
        $("#vproducto").siblings($(".autocomplete-content")).css('width','25%');
    }
});

$(document).on("blur","#vproducto",function(){
	var idproducto = arr('login',4,'id',11,'nombre = "'+$(this).val()+'"',0,0,0)[0][0];
	if (idproducto != undefined) {
		$("#vidfila").val(idproducto);
		$(this).css('border-bottom','1px solid #4CAF50');
		$(this).css('box-shadow','0 1px 0 0 #4CAF50');
	}else{
		$("#vidfila").val(0);
		$(this).css('border-bottom','1px solid #F44336');
		$(this).css('box-shadow','0 1px 0 0 #F44336');
	}
});

$(document).on("blur","#vcliente",function(){
	var idcliente = arr('login',4,'id',2,'trim(concat(nombre," ",apellido1," ",apellido2)) = "'+$(this).val()+'"',0,0,0)[0][0];
	if (idcliente != undefined) {
		$("#vidfila").val(idcliente);
		$(this).css('border-bottom','1px solid #4CAF50');
		$(this).css('box-shadow','0 1px 0 0 #4CAF50');
	}else{
		$("#vidfila").val(0);
		$(this).css('border-bottom','1px solid #F44336');
		$(this).css('box-shadow','0 1px 0 0 #F44336');
	}
});

$(document).on("keydown","#vcliente",function(e){
	var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("#vcliente").autocomplete({
            limit: 10,
            data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2)),null',2,'idtipocliente = 1 and nombre like \"%'+$("#vcliente").val()+'%\" limit 10',0,0,0,1)
        });
        $("#vcliente").siblings($(".autocomplete-content")).css('width','25%');
    }
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

	if (isNaN($("#vcomision_txt").val()) || $("#vcomision_txt").val() < 0 || $("#vcomision_txt").val() > 100 ) {
		$("#vcomision_txt").focus()
		return "Valores de Comisión Incorrectos";
	}

	var ctacom = 0;
	if ($("#vctacom option:selected").val() != $("#vctacom").attr('defecto') && $("#vcomision_txt").val() > 0)
		ctacom = $("#vctacom option:selected").val();

	var comi = 0;
	if ($("#vcomision_txt").val() > 0){
		if ($("#vdat_moneda option:selected").val() == '')
			comi = $("#vcomision_txt").val();
		else
			comi = $("#vdat_moneda option:selected").attr('simb')+$("#vcomision_txt").val()
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
		$("#fdetallebancos").append('<li id="0"> <div class="collapsible-header ciclos" vid="0" vaccion="1" vdet_moneda="'+mmonid+'" vctabnk="'+$("#vctabnk option:selected").val()+'" vidbanco="?" vdet_nom="'+$("#vdet_nom").val()+'" vdet_cta="'+$("#vdet_cta").val()+'" vcomision="'+comi+'" vctacom="'+ctacom+'">'+mmon+'<span class="badge">'+$("#vdet_nom").val()+': '+$("#vdet_cta").val()+' ['+$("#vctabnk option:selected").html()+']</span></div> </li>')
	
	}
});

$(document).on("click",".load[modulo=impuesto]",function(){
	$("#addimp").attr('id','actimp');
	$("#actimp").text('Actualizar');
	$("#actimp").removeClass('add');
	$("#actimp").addClass('edit');
});

$(document).on("click","#actimp",function(){
	$("#actimp").attr('id','addimp');
	$("#addimp").text('Agregar');
	$("#addimp").removeClass('edit');
	$("#addimp").addClass('add');
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
		
		Materialize.toast('Datos Ingresados Correctamente',4000,'green');
	}else
		Materialize.toast(validar,4000,'red');
	
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

$(document).on("click","#ftipopagos #vprincipal",function(){

	if($(this).is(":checked"))
		$(this).attr('value',1)
	else
		$(this).attr('value',0)
	
});

$(document).on("click","#fmonedas #principal",function(){
	if($(this).is(":checked"))
		$("#fmonedas #vprincipal").attr('value',1)
	else
		$("#fmonedas #vprincipal").attr('value',0)
	
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
			Materialize.toast('Cuenta Requiere Nombre',4000,'red')
		else{
			rs = arr('login',4,'',37,'2,'+$(this).attr('tp')+',0,"'+valorc+'",0,0');
			if (rs['succed'] == 0) 
				Materialize.toast(rs[0]['ERROR'],4000,'red')
			else
				Materialize.toast('Cambio de Nombre Exitoso',4000,'green')
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
		case 'descuento':
			if (vmodulo['tip'] == '') {
				err = validarDescuento();
				if (err)
					return err
			}
			break;
		case 'impuesto':
			if (vmodulo['tip'] == '') {
				err = validarImpuesto();
				if (err)
					return err
			}else{
				$("#vvalor").val()
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

	if($("#f"+vmod+"s #vnombre_banco").val() == '' && !$("#f"+vmod+"s #vcomision_txt").is(":visible")){
		$("#f"+vmod+"s #vnombre_banco").focus();
		return "Campo Nombre Requerido";
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

	if ($("#f"+vmod+"s #vsuma").val() == '' || isNaN($("#f"+vmod+"s #vsuma").val()) ) {
		$("#f"+vmod+"s #vsuma").val(0.00);
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

function validarDescuento() {
	if ($("#vnombre").val() == ''){
	    $("#vnombre").focus();
	    return 'Nombre Descuento Requerido';
	}
}

function validarImpuesto() {
	if ($("#vnombre").val() == ''){
	    $("#vnombre").focus();
	    return 'Nombre Impuesto Requerido';
	}
	if ($("#vresumen").val() == ''){
	    $("#vresumen").focus();
	    return 'Abreviatura Impuesto Requerida';
	}
	if ($("#vvalor").val() == ''){
	    $("#vvalor").focus();
	    return 'Valor Impuesto Requerido';
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
		case 'impuesto':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,resumen as vresumen,valor as vvalor';
			vmodulo['tbl'] = 51;
			vmodulo['where'] = 'id = '+vid;
			break;
		case 'moneda':
			vmodulo['sel'] = 'id as vid,nombre as vnombremon,simbolo as vsimbolo,valor as vvalor,suma as vsuma,principal as vprincipal,wsdl as vwsdl';
			vmodulo['tbl'] = 54;
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
			arr['sel'] = 'id,nombre,principal';
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
		case 'descuentos':
			arr['sel'] = '';
			arr['tbl'] = 142;
			arr['where'] = '0';
			break;
		case 'impuestos':
			arr['sel'] = 'id,nombre,resumen,valor';
			arr['tbl'] = 51;
			arr['where'] = 'id > 0 order by nombre limit 100';
			break;
		case 'monedas':
			arr['sel'] = 'id,nombre,valor,if(principal,"Moneda por Defecto",""),simbolo';
			arr['tbl'] = 54;
			arr['where'] = 'id > 0 order by principal desc,nombre';
		default:
			console.error('ERROR: autodestrucción: '+vtabla);
			break;
	}

	return arr;
}
$(document).on("click",".moveL",function(){
	$("#vgenero").data('sum',parseInt($("#vgenero").data('sum'))-1)
	if($("#vgenero").data('sum') == 0) 
		$(".moveL").hide();
	var arr = {}

    arr['sel'] = 'id,nombre,numero';
	arr['tbl'] = 36;
	arr['where'] = 'ispadre and idsubcuenta = (select idsubcuenta from cuentas where id = '+$("#vgenero").data('lvl')+')';
	var rs = mantenimiento('login',6,arr);
	var str = $("#myub").html();

	$("#myub").html(str.substr(0,str.lastIndexOf('&gt')));
	$("#vgenero").html(rs);
	$("#vgenero").material_select('update')
});

$(document).on("click","[name='cta-def']",function(){
	var id_def = $(this).attr('id').substr(1);
	var id_cta = $("#cta"+id_def).attr('pr');
	var nom = $("#def"+id_def+" td").first().html();

	$("#vdefecto").data('elemento',{def:id_def, default:id_cta, cta:0})
	$("#vdefecto").val(id_cta);
	$("#ldef-cta").html(nom);
	$("#vdefecto").material_select('update');
	$("#vdefecto").focus();

	$(this).change();
	
	$('#modal-defcta').modal('open');
});

$(document).on("change","#vgenero",function(){
	var ant = $("option:selected",this).html();
	var arr = {};
	arr['sel'] = 'id,nombre,numero';
	arr['tbl'] = 36;
	arr['where'] = 'ispadre and idsubcuenta = '+$("option:selected",this).val();
	$(this).data('lvl',$("option:selected",this).val());
	$(this).data('sum') == undefined ? $(this).data('sum',1) : $(this).data('sum',parseInt($(this).data('sum'))+1);
	$(".moveL").show();

	var rs = mantenimiento('login',6,arr);

	if (rs.length == undefined) {
		Materialize.toast('No hay Cuentas Asociadas',4000,'red')
		$("#vnombre").val('');
        $("#vnombre").focus();
	}
	else{
		$("#myub").append(">"+ant)
		$(this).html(rs);
		$(this).material_select('update')
	}
});

$(document).on("click","#listamonedas .load",function(){
    $("#monbtn").html('Guardar');
    $("#monbtn").removeClass('add');
    $("#monbtn").addClass('edit');
});

$(document).on("click","#addMoneda",function(){
    $("#monbtn").html('Aceptar');
    $("#monbtn").removeClass('edit');
    $("#monbtn").addClass('add');
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
    	
    	switch(parseInt(p[2])){
    		case 0:
    			$("#ftipopagos #vbancos").click();
    			break;
    		case 1:
    			$("#ftipopagos #acr").click();
    			break;
    		case 2:
    			$("#ftipopagos #dat").click();
    			break;
    		default:
    			// $('input:radio[name=vbancos]:checked').prop('checked', false);
    			break;
    	}
	    
	    if (p[5] == 1) 
	    	$("#ftipopagos #vprincipal").attr('checked',true);
	    else
	    	$("#ftipopagos #vprincipal").attr('checked',false);
	    
	    if(p[3]){
	    	$("#ftipopagos #extra").prop('checked',true);
	    	$("#ftipopagos #vextra").val(p[3]);
	    	$("#ftipopagos #vregex").val(p[4]);
	    }else{
	    	$("#ftipopagos #extra").prop('checked',false);
	    	$("#ftipopagos #vextra").val('');
	    	$("#ftipopagos #vregex").val('');
	    }

    	$("#ftipopagos #extra").change();
    	$("#ftipopagos #vprincipal").change();
    }else
    	$(".mix").hide();

    Materialize.updateTextFields();
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

	if($("#vnombre").val() == ''){
		$("#vnombre").focus()
		Materialize.toast('Nombre Requerido',4000,'red')
		return false;
	}

	var arr = {}
	arr['sel'] = '';
	arr['tbl'] = 37;
	arr['where'] = '1,0,'+$("#vgenero").data('lvl')+',"'+$('#vnombre').val()+'",@@usr,'+$("#vispadre").val();

	var p = mantenimiento('login',4,arr);//INGRESAR CUENTA
	if(p['succed'] != 0){
		// arr = {};
		// arr['sel'] = 'id,nombre,numero';
		// arr['tbl'] = 36;
		// arr['where'] = 'ispadre and idsubcuenta = '+$("#vgenero").attr('lvl');

		// var q = mantenimiento('login',6,arr);
		// $("#vgenero").html(q);
		// $("#vgenero").material_select('update');
		$("#m4").click()

	}else{
		Materialize.toast(p[0]['ERROR'],4000,'red')
    	$("#vnombre").focus();
	}
		
});

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

function postload(vmodulo){
	console.log(vmodulo)
	switch(vmodulo){
		case 'moneda':
			if( $("#vwsdl option:selected").val() != 0)
				$("#iswsdl").prop('checked',1);
			else
				$("#iswsdl").prop('checked',0);
				$("#iswsdl").change();

			$("#f"+vmodulo+"s #vprincipal").attr('value') == 1 ? $("#principal").prop('checked',1) : $("#principal").prop('checked',0);
			$("#principal").change();

		break;
	}
}