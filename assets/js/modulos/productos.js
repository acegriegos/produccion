$(function(){

	$(".menu3").click(function(){
		var id = $(this).attr('id').substr(1);
		$(".menu3").removeClass('active');
		$(this).addClass('active');

		switch(parseInt(id)){
			case 1:
				$("#mantServ").remove();
				$("#mantPaquetes").remove();
				var tabla = $("#data-table-productos").DataTable();
				tabla.destroy();
				var p = mantenimiento('productos',1,'');
				$("#bdymantInventario").html(p);
				$("#data-table-productos").DataTable({
					bFilter: false
				});
				break;
			case 2:
				$("#mantProd").remove();
				$("#mantPaquetes").remove();
				var tabla = $("#data-table-servicios").DataTable();
				tabla.destroy();
				var p = mantenimiento('productos',2,'');
				$("#bdymantInventario").html(p);
				$("#data-table-servicios").dataTable({
					bFilter: false
				});
				$("#prove").hide();
				$(".ganServ").hide();
				$("#opOtro").hide();
				break;
			case 3:
				$("#mantServ").remove();
				$("#mantProd").remove();
				var p = mantenimiento('productos',3,'');
				$("#bdymantInventario").html(p);
					
					var options = {

						  url: function(phrase) {
						  	getDatos();
						    return 'view/getPkg.php';
						  },

						  getValue: function(element) {
						    return element[0];
						  },

						  ajaxSettings: {
						    dataType: "json",
						    method: "POST",
						    data: {
						      dataType: "json"
						    }
						  },

						  preparePostData: function(data) {
						    data.phrase = $("#textProd").val();
						    return data;
						  },

						  requestDelay: 400
						};

					$("#descrP").easyAutocomplete(options);

				// BADGE
					$('#textProd')
					.on('tokenfield:createtoken', function (e) {
						var data = e.attrs.value.split('|')
						e.attrs.value = data[1] || data[0]
						e.attrs.label = data[1] ? data[0] + ' (' + data[1] + ')' : data[0]
					})
					.on('tokenfield:edittoken', function (e) {
						if (e.attrs.label !== e.attrs.value) {
						  var label = e.attrs.label.split(' (')
						  e.attrs.value = label[0] + '|' + e.attrs.value
						}
					})
					.on('tokenfield:removedtoken', function (e) {
						
					})
					.tokenfield();
					// BADGE

				break;
		}
	});

	$("#m1").click();
});

$(document).on("keyup","#cantProd",function(e){
	if (e.which == 13) {
		$("#agInvProPqts").click();
		$("#descrP").val('');
		$("#cantProd").val('');
	}
});

$(document).on("keyup","#textProd-tokenfield",function(e){
	if (e.which == 36) {
		$("#descrP").focus();
	}
});

$(document).on("click",".load",function(){

	$("#accmodalProd").html('Editar Producto');
	$("#accmodalServ").html('Editar Servicio');

	$("#addV").html('Editar');

	if ($("#voptServ").val() == '') {
		if ($("#otros").is(':checked')) {
			$("#otros").click();
			$("#isPeriodo").click();
		}
	}

	var idS = $(this).attr('id').substr(1);
	$("#idServ").val(idS);

	var grav = $("#visgravado").val();
	if (grav == 1) {
		$("#inputGrav").prop("checked",true);
	}else{
		$("#inputExc").prop("checked",true);
	}

	var per = $("#vperiodo").val();
	  if (per == 0) {
	  	$("#otros").prop("checked",false);
		$("#isPeriodo").prop("checked",false);
		$(".inpSPeriodo").prop("disabled",true);
		$(".inpSPeriodo").prop("checked",false);
	} else if (per == 30) {
		$("#otros").prop("checked",false);
		$("#isPeriodo").prop("checked",true);
		$(".inpSPeriodo").prop("disabled",false);
		$("#mensual").prop("checked",true);
	} else if (per == 365) {
		$("#otros").prop("checked",false);
		$("#isPeriodo").prop("checked",true);
		$(".inpSPeriodo").prop("disabled",false);
		$("#anual").prop("checked",true);
	} else {
		var arr = {}
		
		arr['sel'] = 'periodo';
		arr['tbl'] = 16;
		arr['where'] = 'id = '+idS;

		var opcDia = mantenimiento('login',4,arr)[0][0][0];

		$("#isPeriodo").prop("checked",true);
		$(".inpSPeriodo").prop("disabled",false);
		$("#otros").prop("checked",true);
		$("#otros").click();
		$("#voptServ").val(opcDia);
	}

		var idS = $("#idServ").val();
			if (idS != 0) {

				var arr = {}
				arr['sel'] = 'idproveedor';
				arr['tbl'] = 16;
				arr['where'] = 'id ='+idS;
				var idprov = mantenimiento('login',4,arr)[0][0][0];

				$("#outsourcing").prop('checked',true);
				$("#prove").show();
				$(".ganServ").show();
				$("#vidprovee").val(idprov);
			}

			if ($("#vidprovee").val() == 0 ) {
				$("#outsourcing").prop('checked',false);
				$("#prove").hide();
				$(".ganServ").hide();
			}
});

$(document).on("change","input[name=visgravado]",function(){
	if ($("#inputGrav").is(":checked")) {
		$("#inputGrav").val(1);
		$("#inputExc").val(0);
		$("#visgravado").val(1);
	} else {
		$("#inputGrav").val(0);
		$("#inputExc").val(1);
		$("#visgravado").val(0);
	}
});

$(document).on("keyup",".calcvv",function(){
	var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
	var ganancia = isNaN($("#vganancia").val()) ? 0 : parseFloat($("#vganancia").val().replace(/,/g,""));
	var imv = isNaN($("#vimv").val()) || $("#vimv").val() <= 0 ? mantenimiento('login',4,{sel:'valor',tbl:15,where:'descr="imv"'})[0][0][0] : parseFloat($("#vimv").val().replace(/,/g,""));
	var vventa = 0;

	if (costo != 0 && imv != 0) {
		vventa = costo * ((ganancia/100)+1) * ((imv/100)+1);
	}

	$("#vventa").val( (vventa).toFixed(2) );
});

$(document).on("keyup",".vcalcServ",function(){
	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));
	var tganancia = 0;
	
	if (compra != 0) 
		tganancia = (((base / compra)-1)*100);

	$("#vpganancia").val(tganancia.formatMoney(0,'.',','));
	$("#vpcompra").val(compra.toFixed(2));

});

$(document).on("keyup","#vpcompra",function(){
	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));
	var tbase = base;

	var tganancia = (((base / compra)-1)*100);
	if (base == 0)
		tbase = ((compra * ((ganancia / 100)+1)));

	$("#vpganancia").val(tganancia.formatMoney(0,'.',','));
	$("#vpbase").val(tbase.toFixed(2));
});

$(document).on("keyup","#vpganancia",function(){
	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));

	var tbase = ((compra * ((ganancia / 100)+1)));

	$("#vpbase").val(tbase.toFixed(2));
	$("#vpcompra").val(compra.toFixed(2));
});


$(document).on("click","#agInvProPqts",function(){

	var prodStr = $("#descrP").val();
	var prodPrec = prodStr.substr(prodStr.indexOf('¢')+1);
	prodStr = prodStr.substr(0,prodStr.indexOf('¢')+1);
	var prodCant = $("#cantProd").val();
	var idProdStr = $("#idProdStr").val();
	var cProdStr = $("#cProdStr").val();
	var subtotal = (parseFloat(prodPrec)*prodCant).toFixed(2);

	var gDatos = getDatos();
	// alert(gDatos);

	$("#textProd-tokenfield").focus();
	$("#textProd-tokenfield").val(prodStr+subtotal+'|'+prodCant);
	$("#textProd-tokenfield").select();

});

$(document).on("keyup","#textProd-tokenfield",function(e){

	if (e.which == 13) {

		var text = $("#s"+(consec-1)).html();
		var cantidad = text.substring(text.lastIndexOf('(')+1, text.lastIndexOf(')'));
		var precio = text.substring(text.indexOf('¢')+1, text.indexOf('(')-1);

		$("#s"+(consec-1)).attr({'precio':precio,'cantidad':cantidad});
	}

});


$(document).on("click","#ingInvProd",function(){
	$("#accmodalProd").html('Agregar Producto');
	$("#addV").html('Agregar');
	
	deadclear('producto');

	$("#vidtipo").val(0);
	$("#ajaxProductos").html('');

	var arr = {};
	arr['sel'] = 'valor';
	arr['tbl'] = 15;
	arr['where'] = 'id = 8';

	var imv = mantenimiento('login',4,arr)[0][0];
	$("#vimv").val(imv);
});

$(document).on("click","#ingInvServ",function(){
	$("#accmodalServ").html('Agregar Servicio');
	$("#addV").html('Agregar');
	
	$("input[name=sPeriodo]").prop('checked',false);
	$("vdescripcion").val('');

	deadclear('servicio');

	$("#vidtipo").val(0);
	$("#ajaxServicio").html('');
});

$(document).on("click","#Iadd",function(){
	deadclear('productos');

});

$(document).on("change","#isPeriodo",function(){	

	if ($("#isPeriodo").is(':checked')) {
		$(".inpSPeriodo").removeAttr('disabled');
		$("#isPeriodo").val(1);
	}else{
		$(".inpSPeriodo").attr('disabled',true);
		$(".inpSPeriodo").attr('checked',false);
		$("#isPeriodo").val(0);
	}
});

$(document).on("change",".inpSPeriodo",function(){
	var dias = $("input[name='sPeriodo']:checked").val();
	$("#vperiodo").val(dias)
});

$(document).on("keyup","#voptServ",function(){
	var opotros = parseInt($("#voptServ").val());
	$("#vperiodo").val(opotros)
});

$(document).on("click","#otros",function(){
		$(".opPeriodo").toggle(0.5);
		$("#opOtro").toggle(0.5);
});

$(document).on("click","#outsourcing",function(){
		$("#prove").toggle(0.5);
		$(".ganServ").toggle(0.5);

		if ($("#outsourcing").is(":checked")) {
			$("#vpbase").addClass('vcalcServ');
		}else{
			$("#vpbase").removeClass('.vcalcServ');
		}
});

$(document).on("change","#vidprovee",function(){
	var opcProv = $("#vidprovee option:selected").val();

	$("#vidproveedor").val(opcProv);
});

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'servicio':
			if (vmodulo['tip'] == '') {
				err = validarservicios();
				if ( err ) {
					return err;
				}
			}
			
			break;
		case 'producto':
			if (vmodulo['tip'] == '') {
				err = validarproductos();
				if ( err ) {
					return err;
				}
			}
			break;
		default:
			return 'Módulo no Existente: '+vmodulo['modulo'];
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarproductos() {
	
	if ($("#vnombre").val() == ''){ return 'Nombre Requerido'};
	if ($("#vcodigo").val() == ''){ return 'Código Requerido'};
	if ($("#vcosto").val() == ''){	return 'Precio de Costo Requerido'};
	if ($("#vganancia").val() == ''){	return 'Porcentaje de Ganancia Requerido'};
	if ($("#vventa").val() == ''){	return 'Precio de Venta Requerido'};
}

function validarservicios() {

	if ($("#vnombre").val() == ''){ return 'Nombre Requerido'};
	if ($("#vdescripcion").val() == ''){ return 'Descripción Requerido'};
	if ($("#vpbase").val() == ''){ return 'Precio Base Requerido'};

	if($("#outsourcing").is(":checked")){
		if($("#vpcompra").val() == '' || isNaN($("#vpcompra").val()) || $("#vpcompra").val() == '.'){
			$("#vpcompra").focus();
			$("#vpcompra").select();
			return 'Valor de Compra no Válido';
		}
	} else if($("#vidproveedor option:selected").val() == 0){
		$("#vidproveedor").focus();
		return 'Proveedor Requerido';
	}

	if ($("#vpcompra").val() == '') {
		$("#vpcompra").val(0);
	}

	if ($("#vpganancia").val() == '') {
		$("#vpganancia").val(0);
	}
	return false;
}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'producto':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,costo as vcosto,ganancia as vganancia,venta as vventa,imv as vimv,idunidad as vidunidad,isgravado as visgravado,idmoneda as vidmoneda';
			vmodulo['tbl'] = 11;
			vmodulo['where'] ='id = '+vid;
			break;

		case 'servicio':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,descripcion as vdescripcion,pbase as vpbase,periodo as vperiodo,idproveedor as vidproveedor,pcompra as vpcompra,pganancia as vpganancia,idmoneda as vidmoneda';
			vmodulo['tbl'] = 16;
			vmodulo['where'] ='id = '+vid;
			break;

		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function cargarSintax(vtabla){

	switch(vtabla) {
		case 'productos':
			var arr = {};
			arr['sel'] = 'id,codigo,nombre,costo,ganancia,venta';
			arr['tbl'] = 11;
			arr['where'] = 'id > 0 order by nombre';
			break;
		case 'servicios':
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 13;
			arr['where'] = '`Codigo` > 0 order by nombre';
			break;
}
		return arr;

}

function getDatos(){
	
	var array = {};

    array['sel'] = 'concat(nombre," - ¢ ",venta) as nombre, id, venta';
    array['tbl'] = 11;
    array['where'] = 'nombre like "%'+$("#descrP").val()+'%" and id > 0';

    p = mantenimiento('productos',4,array);
    return p;

}