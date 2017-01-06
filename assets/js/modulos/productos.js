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
					bFilter: false,
        			bLengthChange : false
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
					bFilter: false,
        			bLengthChange : false
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
				$("#data-table-paquetes").DataTable({
					bFilter : false,
					bScrollInfinite : true,
					bSort : false,
					bLengthChange : false,
					bPaginate :  false,
					bInfo : false
				});

				break;
		}
		$('select').material_select();
		$('.dropdown-button').dropdown();
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 200, // Transition out duration
			starting_top: '6%', // Starting top style attribute
			ending_top: '5%' // Ending top style attribute
		});
	});
	$("#m1").click();
});
$(document).ready(function(){
	// Materialize

	//Materialize
});

$(document).on("click","#prueba",function(){
	// pruebas

});

$(document).on("click",".menuP",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuP").removeClass('active');
	$(this).addClass('active');
	switch(id){
		case 1:
			$("#financiero").addClass('hide');
			$("#dimpuestos").addClass('hide');
			$("#datosproductos").removeClass('hide');
			break;
		case 2:
			$("#datosproductos").addClass('hide');
			$("#dimpuestos").addClass('hide');
			$("#financiero").removeClass('hide');
			$("#vcosto").select();
			break;
		case 3:
			$("#datosproductos").addClass('hide');
			$("#financiero").addClass('hide');
			$("#dimpuestos").removeClass('hide');
			arr('login',6,'*',51,'id > 0',48,1,$("#imp"));
			$('select').material_select();
			break;

	}
});

$(document).on("click",".menuS",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuS").removeClass('active');
	$(this).addClass('active');
	switch(id){
		case 1:
			$("#datosservicios").removeClass('hide');
			$("#financiero").addClass('hide');
			$("#vcodigo").focus();
			break;
		case 2:
			$("#financiero").removeClass('hide');
			$("#datosservicios").addClass('hide');
			$("#vpbase").focus();
			break;
	}
});

$(document).on("keyup",".formprod",function(e){
    var code = e.which || e.keyCode;
    var id = $(this).attr('focus').substr(0,1);
    var focus = $(this).attr('focus');
    if (code == 13) {
    	if (id == 1) {
    		$("#tb"+id).click();
    		$("#"+focus.substr(1)).focus();
    	}else if (id == 2) {
    		$("#tb"+id).click();
    		$("#"+focus.substr(1)).select();
    	}else {
    		$("#tb3").click();
    		$("#"+focus.substr(1)).focus();
    	}
    }
});

$(document).on("click",".vfiltros",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#phs");
	switch(id) {
		case 1:
			$("#fgrande").attr('filter',id);
			elemento.text('Buscar por '+$(this).html())
			break;
		case 2:
			$("#fgrande").attr('filter',id);
			elemento.text('Buscar por '+$(this).html())
			break;
	}
});

$(document).on("click",".filtersrv",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#searchsrv");
	switch(id) {
		case 1:
			$("#fserv").attr('filter',id);
			elemento.attr('placeholder','Buscar por '+$(this).html());
			break;
		case 2:
			$("#fserv").attr('filter',id);
			elemento.attr('placeholder','Buscar por '+$(this).html());
			break;
	}
});

$(document).on("click",".filtropqt",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#lpq");
	switch(id) {
		case 1:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar por '+$(this).html());
			break;
		case 2:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar por '+$(this).html());
			break;
		case 3:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
		case 4:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
		case 5:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
		case 6:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
	}
});

function cambio_select(vto,vtabla,vval,vset){
    var tmp = $('#'+vto+' option').first().html();

    $('#'+vto).html('<option value="">'+tmp+'</option>');
    var res = arr('login',4,vval,vtabla,vset,0,0,0)[0];
    for (var i = 0; i < res.length; i++) {
        $('#'+vto).append('<option value="'+res[i][0]+'">'+res[i][1]+'</option>');
    }
    $('#'+vto).material_select('update');
};

$(document).on('click',"#unidad",function(){
    var tabla = $(this).attr('db');

    if ($("#iconunidad").is(':visible')) {
    	$(".unidad").html('');
    	$(".unidad").append('<a class="prefix btn-floating red btn-small" style="width: 2.5rem" id="unidad" db="'+tabla+'"><i class="fa fa-arrow-left" id="iconunidad"></i></a> <label for="ing_unidad">Unidad</label> <input type="text" id="ing_unidad" db="'+tabla+'" d-e-t="unidad">');
    }else{
    	var opc = '';
    	arr('login',4,'id,nombre,simbolo',vtbl,'vwhere','vcambio',vch,'velemto',vjson)
    	$(".unidad").html('<a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar Unidad" style="width: 2.5rem" id="unidad" db="107"><i class="fa fa-plus" id="iconunidad"></i></a><select type="select" id="vidunidad" class="_det"><option value="" simbol="">Seleccione un Unidad</option>{section name=LE loop=$UNI}<option value="{$UNI[LE][0]}">{$UNI[LE][1]}</option>{/section}</select><label for="vidunidad">Unidad</label>');
    }

    // if ($("."+vdet).is(":visible")) {
    //     $("."+vdet).hide();
    //     $("."+vdet).parent().append('<div class="_'+vdet+'"><a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar" href="#!" style="width: 2.5rem" det="'+vdet+'" db="'+tabla+'" id="_'+vdet+'"><i class="fa fa-plus" id="icon'+vdet+'"></i></a> <label for="ing_'+vdet+'">'+vdet.toUpperCase()+'</label> <input type="text" id="ing_'+vdet+'" db="'+tabla+'" d-e-t="'+vdet+'"></div>');
    //     $("#icon"+vdet).removeClass('fa-plus');
    //     $("#icon"+vdet).addClass('fa-arrow-left');
    //     $('#ing_'+vdet).focus();
    // }else{
    //     $("._"+vdet).remove();
    //     cambio_select('vid'+vdet,tabla,'id,nombre','id > 0');
    //     $("."+vdet).show();
    // }
    
});

$(document).on("click","#adddsct",function(){
	var desc = $("#dscts option:selected").val();
	var valor = $("#dscts option:selected").attr('valor');
	adddesc(desc,valor);
});

$(document).on("click",".deldesc",function(){
	var id = $(this).attr('id').substr(7);
	$("#ld"+id).remove();
});

$(document).on("click","#gdesc",function(){
	var action = $(this).attr('action');
	var idproducto = $("#idproducto").val();
	if (action == 1) {
		$(".descprod").each(function(){
			var iddescuento = $(this).attr('id').substr(5);
			var descuentos = arr('login',4,'',95,'1,0,0,'+iddescuento+',null,null,'+idproducto+',11','',0,'');
			if (descuentos[0] != '[object Object]') {
				Materialize.toast('Descuento Agregado Correctamente', 6000, 'green');
			}else{
				Materialize.toast(descuentos[0]['ERROR'], 6000, 'red');
			}
		});
	}else{
		arr('login',7,'3',79,'idfila = '+idproducto+' and idtabla = 11','',0,'');

		$(".descprod").each(function(){
			var iddescuento = $(this).attr('id').substr(5);
			var descuentos = arr('login',4,'',95,'1,0,0,'+iddescuento+',null,null,'+idproducto+',11','',0,'');
			if (descuentos[0] != '[object Object]') {
				Materialize.toast('Descuento Agregado Correctamente', 6000, 'green');
			}else{
				Materialize.toast(descuentos[0]['ERROR'], 6000, 'red');
			}
		});
	}
});

$(document).on("click","#addimp",function(){
	var id = $("#imp option:selected").val();
	var nombre = $("#imp option:selected").text();
	var valor = $("#imp option:selected").attr('valor');

	if ($("#vimv"+id).val() == undefined) {
		$("#impuestos").removeClass('hide');
		if ($("#imp option:selected").val() != 0) {
			// $("#impuestos").append('<li class="collection-item dismissable" id="newimp'+id+'"><div><span class="impuestos" id="vimv'+id+'" value="'+valor+'">'+nombre+' - '+valor+'%</span><a class="secondary-content delimp" id="dimp'+id+'"><i class="material-icons">delete</i></a></div></li>');
			$("#impuestos").append('<li class="collection-item dismissable" id="newimp'+id+'"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv'+id+'" value="'+valor+'">'+nombre+' - '+valor+'%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo'+id+'" type="number" class="validate eder" value="0" style="margin: 0px;width: 50%"></div></div></li>')
			totalizar($("#hvcosto").val(),$("#vganancia").val());
		}
	}else{
		Materialize.toast('Impuesto '+nombre+' Agregado Anteriormente', 6000, 'yellow accent-4');
	}
});

$(document).on("click",".delimp",function(){
	var id = $(this).attr('id').substr(4);
	var costo = $("#hvcosto").val();
	var ganancia = $("#vganancia").val();
	totalizar(costo,ganancia)
});

$(document).on("click","#addprod",function(){
	var valprod = validarproductos();
	if (valprod == false) {
		var codigo = $("#vcodigo").val();
		var nombre = $("#vnombre").val();
		var costo = $("#vcosto").val();
		var ganancia = $("#vganancia").val();
		var venta = $("#hventa").val();
		var imv = $("#vimv").val();
		var idunidad = $("#vidunidad option:selected").val();
		var minimo = $("#vminimo").val();
		var maximo = $("#vmaximo").val();
		var maxdesc = $("#vmaxdescuento").val();
		var idmarca = $("#vidmarca option:selected").val();
		var exoneracion = $("#vexoneracion").val();
	//producto
		var idproducto = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+nombre+'\",'+costo+','+ganancia+','+venta+','+exoneracion+','+idunidad+','+minimo+','+maximo+','+maxdesc+','+idmarca+',0,@@usr,@@impresa,""','',0,'');
		if (idproducto[0][0] != undefined) {
			// financiero
			$(".impuestos").each(function(){
				var idimpuesto = $(this).attr('id').substr(4);	
				var imp = arr('login',4,'',86,'1,0,'+idproducto[0][0]+',11,'+idimpuesto+','+$("#impexo"+idimpuesto).val(),'',0,'');
			});
			$(".precionivel").each(function(){
				var idfila = $(this).attr('id').substr(1);
				if ($("#vventa"+idfila).val() > 0) {
					arr('login',4,'',108,'1,null,'+idproducto[0][0]+','+idfila+','+$("#vganancia"+idfila).val()+','+$("#vexoneracion"+idfila).val()+',@@usr,@@impresa',0,0,0)
				}
			});
			Materialize.toast('Producto Agregado Correctamente', 6000, 'green');
			arr('login',6,'id,codigo,nombre,marca,scosto,sventa,sganancia',14,'id > 0 order by nombre','',1,$("#listaproductos"));
			// vaciar('productos');
			Materialize.updateTextFields();
			$("#impuestos").addClass('hide');
		}else{
			Materialize.toast(idproducto[0]['ERROR'], 6000, 'red');
		}
	}else{
		Materialize.toast(valprod, 6000, 'red');
	}
});

$(document).on("click","#editprod",function(){
	var valprod = validarproductos();
	if (valprod == false) {
		var id = $(this).attr('idprod');
		var codigo = $("#vcodigo").val();
		var nombre = $("#vnombre").val();
		var costo = $("#vcosto").val();
		var ganancia = $("#vganancia").val();
		var venta = $("#hventa").val();
		var imv = $("#vimv").val();
		var idunidad = $("#vidunidad option:selected").val();
		var cantidad = $("#vcantidad").val();
		var minimo = $("#vminimo").val();
		var maximo = $("#vmaximo").val();
		var idmodelo = $("#vidmodelo option:selected").val();
		//producto
		var idproducto = arr('login',4,'',78,'2,'+id+',\"'+codigo+'\",\"'+nombre+'\",'+costo+','+ganancia+','+venta+','+idunidad+','+cantidad+','+minimo+','+maximo+',0,'+idmodelo+',@@usr,@@impresa','',0,'');
		//impuestos
		var isimp = arr('login',4,'id',87,'idfila='+idproducto[0][0],'',0,'');
		// var isimp = arr('login',4,'id',87,'idfila=3','',0,'');
		if (isimp[0][0] == undefined) {
			$(".impuestos").each(function(){
				var idimpuesto = $(this).attr('id').substr(4);
				var imp = arr('login',4,'',86,'1,0,'+idproducto[0][0]+',11,'+idimpuesto+',0.00','',0,'');
			});
		}else{
			arr('login',4,'',86,'3,0,'+idproducto[0][0]+',11,0,0.00','',0,'');
			$(".impuestos").each(function(){
				var idimpuesto = $(this).attr('id').substr(4);
				var imp = arr('login',4,'',86,'1,0,'+idproducto[0][0]+',11,'+idimpuesto+',0.00','',0,'');
			});
		}

		Materialize.toast('Producto Editado Correctamente', 6000, 'green');
		arr('login',6,'id,codigo,nombre,scosto,sventa,sganancia',14,'id > 0 order by nombre','',1,$("#listaproductos"));
		// vaciar('productos');
	}else{
		Materialize.toast(valprod, 6000, 'red');
	}
});

$(document).on("click",".editprod",function(){
	var id = $(this).attr('id').substr(1);
	var p = arr('login',4,'',83,id,'',0,'');
	var q = p[0][0];
	var precios = arr('login',4,'',110,id,0,0,0)[0];
	$(".accmodal").html("Actualizar Producto "+q[5]);
	$("#addprod").addClass('hide');
	$("#editprod").removeClass('hide');
	$("#editprod").attr('idprod',id);
	$("#impuestos").removeClass('hide');
	$("#impuestos").html('');
	//cargar
	$("#vidfamilia").val(q[0]).change();
	$("#vidfamilia").material_select();
	$("#vidtipo").val(q[1]).change();
	$("#vidtipo").material_select();
	$("#vidmarca").val(q[2]);
	$("#vidmarca").material_select();
	$("#vidunidad").val(q[3]);
	$("#vidunidad").material_select();
	$("#vnombre").val(q[4]);
	$("#vcodigo").val(q[5]);
	$("#vminimo").val(q[6]);
	$("#vmaximo").val(q[7]);
	$("#vcosto").val(q[8]);
	$("#hvcosto").val(q[8]);
	$("#vganancia").val(q[9]);
	$("#vventa").val(q[10]);
	$("#hventa").val(q[11]);

	for (var i = 0; i < p[0].length; i++) {
		q = p[0][i]
		if (q[12] != '') {
			defecto = '';
			if (q[15] == 0)
				defecto = '<a class="secondary-content delimp" id="dimp'+q[12]+'"><i class="material-icons">delete</i></a>';

				$("#impuestos").removeClass('hide');
				$("#impuestos").append('<li class="collection-item dismissable" id="newimp'+q[12]+'"><div><span class="impuestos" id="vimv'+q[12]+'" value="'+q[14]+'">'+q[13]+' - '+q[14]+'%</span>'+defecto+'</div></li>');
		}
		
	}

	for (var i = 0; i < precios.length; i++) {
		$("#vganancia"+precios[i][0]).val(precios[i][1]);
		$("#vventa"+precios[i][0]).val(precios[i][2]);
		$("#vexoneracion"+precios[i][0]).val(precios[i][3]);
	}

	Materialize.updateTextFields();
});

$(document).on("click",".descuentos",function(){
	var id = $(this).attr('id').substr(4);
	var prod = arr('login',4,'nombre',11,'id = '+id,'',0,'')[0];
	$("#tbldesc").addClass('hide');
	$("#listadescuentos").html('');
	$("#idproducto").val(id);
	$("#dprod").text(prod);
	$('select').material_select('destroy');
	arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#dscts"));
	$('select').material_select();

	var ifdesc = arr('login',4,'count(id)',79,'idfila = '+id+' and idtabla = 11','',0,'')[0];

	if (ifdesc != 0) {
		var desc = arr('login',4,'iddescuento',79,'idfila = '+id+' and idtabla = 11','',0,'')[0];
		$.each( desc, function( index, value ){
			var valor = arr('login',4,'replace(valor,".00","")',94,'id = '+value,'',0,'')[0];
			index += 1;
    		$("#tbldesc").removeClass('hide');
			$("#listadescuentos").append('<li class="collection-item dismissable" id="ld'+index+'"><div><span class="descprod" id="vdesc'+index+'">'+valor+'%</span><a class="secondary-content"><i class="material-icons but deldesc" id="deldesc'+index+'">delete</i></a></div></li>');
		});
		$("#gdesc").attr('action',2)
	}else{
		$("#tbldesc").addClass('hide');
		$("#listadescuentos").html('');
		$("#gdesc").attr('action',1)
	}

	// arr('login',4,'vsel',vtbl,'vwhere','vcambio',vch,'velemto');

});

$(document).on("click",".delprod",function(){
	var id = $(this).attr('id').substr(1);

	arr('login',4,'',78,'3,'+id+',"","",0,0,0,0,0,0,0,0,0,@@usr,@@impresa','',0,'');
	var tblprod = arr('login',6,'id,codigo,nombre,scosto,sventa,sganancia',14,'id > 0 order by nombre','',1,$("#listaproductos"));
	Materialize.toast('Producto Eliminado Correctamente', 6000, 'red');

});

$(document).on("keyup","#prod",function(e){
	var code = e.which || e.keyCode;
	if ($(this).val() != '') {
		if (code == 13) {
			$("#cantidad").focus();
		}
	}
});

// $(document).on("blur","#prod",function(){
// 	var nombre = $(this).val();
// 	identify = nombre.substring(1,0);

// 	if (identify != '[') {
// 		nombre = nombre.substring(0, nombre.indexOf(' - '));
// 	}else{
// 		nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
// 	}
// 	$("#hprod").val(nombre);
// });

$(document).on("focus","#cantidad",function(){
	var nombre = $("#prod").val();
	identify = nombre.substring(1,0);

	if (identify != '[') {
		nombre = nombre.substring(0, nombre.indexOf(' - '));
	}else{
		nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
	}
	$("#hprod").val(nombre);
});

$(document).on("click","#bProd",function(){
	if ($("#prod").val() != '' && $("#cantidad").val() != '') {
		var prod = $("#hprod").val();
		var cant = $("#cantidad").val();
		addprod(prod,cant)
	}
});

$(document).on("keyup","#cantidad",function(e){
	if ($(this).val() != '') {
		var prod = $("#hprod").val();
		var cant = $(this).val();
		var code = e.which || e.keyCode;
		if (code == 13) {
			addprod(prod,cant)
		}
	}
});

$(document).on("click",".del",function(){
	var id = $(this).attr('id').substr(1);
	var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));
	var subtot = 0;
	var total = 0;

	$("#l"+id).remove();

	$(".nomprod").each(function(){
		var pid = $(this).attr('id').substr(1);
		var precio = parseFloat($("#htot"+pid).val());
		subtot += precio;
	});

	total = subtot / ((desc / 100)+1);
	$("#htotal").val(subtot);
	$("#totpqt").val(total.formatMoney(2,',','.'));
});

$(document).on("change","#vdescuento",function(){
	var total = 0;
	var desc = $("option:selected",this).attr('valor') == '' ? 0 : parseFloat($("option:selected",this).attr('valor'));
	var totpqt = parseFloat($("#htotal").val());
	total = totpqt / ((desc/100)+1);
	$("#totpqt").val(total.formatMoney(2,'.',','));
});

$(document).on("click","#addpqt",function(){
	var valpqt = validarpaquete();
	if (valpqt == false) {
		var descuento = $("#vdescuento").val();
		var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
		var idpaquete = arr('login',4,'',60,'1,0,\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+',@@usr,@@impresa','',0,'');
		if (idpaquete[0][0] != undefined) {
			$(".nomprod").each(function(){
				var id = $(this).attr('id').substr(1);
				var idproducto = $(this).attr('idproducto');
				var idservicio = $(this).attr('idservicio');
				arr('login',4,'',61,'1,'+idpaquete[0][0]+','+idproducto+','+idservicio+','+$("#c"+id).text()+',@@usr,@@impresa','',0,'');
			});
			Materialize.toast('Paquete Agregado Correctamente', 6000, "green");
			arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));
			// vaciar('paquetes');
			$("#listapaquetes").html('');
			var consecutivo = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
			var codigo = addZero(consecutivo,4);
			$("#vcodigo").val('PCK-'+codigo);
		}else{
			Materialize.toast(idpaquete[0]['ERROR'], 6000, "red");

		}
	}else{
		Materialize.toast(valpqt, 6000, "red");

	}
});

$(document).on("click","#editpck",function(){
	var valpqt = validarpaquete();
	if (valpqt == false) {
		var id = $("#vid").val();
		var descuento = $("#vdescuento option:selected").val();
		var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
		var idpaquete = arr('login',4,'',60,'2,'+id+',\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+',@@usr,@@impresa','',0,'');
		if (idpaquete[0][0] != undefined) {
			$(".nomprod").each(function(){
				var id = $(this).attr('id').substr(1);
				var idproducto = $(this).attr('idproducto');
				var idservicio = $(this).attr('idservicio');
				arr('login',4,'',61,'1,'+idpaquete[0][0]+','+idproducto+','+idservicio+','+$("#c"+id).text()+',@@usr,@@impresa','',0,'');
			});
			Materialize.toast('Paquete Editado Correctamente', 6000, 'green');
			arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));
			// vaciar('paquetes');
			$("#listapaquetes").html('');
			var consecutivo = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
			var codigo = addZero(consecutivo,4);
			$("#vcodigo").val('PCK-'+codigo);
		}else{
			Materialize.toast(idpaquete[0]['ERROR'], 6000, 'red');
		}
	}else{
		Materialize.toast(valpqt, 6000, 'red');
	}
});

$(document).on("click",".loadpck",function(){
	var id = $(this).attr('id').substr(1);
	$("#titpqt").html("Actualizar Paquetes");
	$('select').material_select('destroy');
	arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#vdescuento"));
	var p = arr('login',4,'vnombre,vcodigo,iddescuento,htotal,totpqt,vid',76,'vid = '+id,'',0,'')[0][0];
	$("#vid").val(p[5])
	$("#vnombre").val(p[0]);
	$("#vcodigo").val(p[1]);
	$("#htotal").val(p[3]);
	$("#totpqt").val(p[4]);
	$("#vdescuento").val(p[2]);
	$('select').material_select();
	Materialize.updateTextFields();
	$("#addpqt").attr('id','editpck');
	$("#editpck").html('Guardar');
	arr('login',6,'*',62,'idpaquete = '+id,'',1,$("#listapaquetes"));
	setTimeout(function(){$("#prod").focus()},500);

});

$(document).on("click",".delpck",function(){
	var id = $(this).attr('id').substr(1);
	var array = {}
	array['where'] = '3,'+id+',"","",0.00,0.00,@@usr,@@impresa';
	arr('login',4,'',60,array['where'],'',0,'')[0];
	Materialize.toast('Paquete Eliminado Correctamente', 6000, 'green');

	var array2 = {}
	array2['where'] = '3,'+id+',0,0,0,@@usr,@@impresa';
	arr('login',4,'',61,array2['where'],'',0,'');
	arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));

});


$(document).on("change",".ihcant",function(){
	var precioprod = 0;
	var htotal = 0;
	var total = 0;
	var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var cantidad = $("#hcant"+id).val();
		var precio = parseFloat($("#htot"+id).attr('precio'));
		precioprod = cantidad * precio;
		$("#htot"+id).val(precioprod);
		htotal += parseFloat($("#htot"+id).val());

	});

	total = htotal / ((desc / 100)+1);

	$("#htotal").val(htotal);
	$("#totpqt").val(total.formatMoney(2,'.',','));

});

$(document).on("keyup",".ihcant",function(){
	var precioprod = 0;
	var htotal = 0;
	var total = 0;
	var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var cantidad = $("#hcant"+id).val();
		var precio = parseFloat($("#htot"+id).attr('precio'));
		precioprod = cantidad * precio;
		$("#htot"+id).val(precioprod);
		htotal += parseFloat($("#htot"+id).val());

	});

	total = htotal / ((desc / 100)+1);

	$("#htotal").val(htotal);
	$("#totpqt").val(total.formatMoney(2,'.',','));

});

$(document).on("blur",".ihcant",function(){
	var id = $(this).attr('id').substr(5);
	var valor = $(this).val();
	$("#c"+id).text(valor);
	$("#editoff").click();
});

$(document).on("change","#vtipoinv",function(){
	var tipoinv = $("#vtipoinv option:selected").val();
});

$(document).on("click",".salidainv",function(){
	var id = $(this).attr('id').substr(1);

	var arr = {}
	arr['sel'] = 'nombre';
	arr['tbl'] = 14;
	arr['where'] = 'id = '+id;

	var nom = mantenimiento('login',4,arr)[0][0];
	$("#nomprod").html(nom);
});

$(document).on("keyup","#searchprod",function(e){
	var code = e.which || e.keyCode;
	var filtro = $("#fgrande").attr('filter');

	var variable = $(this).val();
	if (code == 13) {
		filtrarprod(variable,filtro);
	}
	
});

$(document).on("keyup","#searchpqt",function(e){
	var code = e.which || e.keyCode;
	var filtro = $("#fpqt").attr('filter');
	var variable = $(this).val();
	if (code == 13) {
		filterpck(variable,filtro)
	}
});

$(document).on("keyup","#searchsrv",function(e){
	var code = e.which || e.keyCode;
	var filtro = $("#fserv").attr('filter');
	var variable = $(this).val();
	if (code == 13) {
		filterserv(variable,filtro)
	}
});

$(document).on("click",".loadserv",function(){
	var id = $(this).attr('id').substr(1);
	var serv = arr('login',4,'*',16,'id = '+id,'',0,'')[0][0];
	$(".accmodal").html('Actualizar Servicio '+serv[2])
	$("#vid").val(serv[0]);
	$("#vcodigo").val(serv[1]);
	$("#vnombre").val(serv[2]);
	$("#vdescripcion").val(serv[3]);
	$("#vpbase").val(serv[4]);
	if (serv[5] == 1) {
		$("#isPeriodo").prop('checked',true).change();
		//otros
		$(".opPeriodo").removeClass('hide');
		$("#dhotro").addClass('hide');
		$("#diario").prop('checked',true);
		$("#vdias").val(0);
	}else if (serv[5] == 2) {
		$("#isPeriodo").prop('checked',true).change();
		//otros
		$(".opPeriodo").removeClass('hide');
		$("#dhotro").addClass('hide');
		$("#mensual").prop('checked',true);
		$("#vdias").val(0);
	}else if (serv[5] == 3) {
		$("#isPeriodo").prop('checked',true).change();
		//otros
		$(".opPeriodo").removeClass('hide');
		$("#dhotro").addClass('hide');
		$("#anual").prop('checked',true);
		$("#vdias").val(0);
	}else if (serv[5] == 4) {
		$("#isPeriodo").prop('checked',true).change();
		//otros
		$(".opPeriodo").addClass('hide');
		$("#dhotro").removeClass('hide');
		$("#dotros").removeClass('hide');
		$("#otros").prop('checked',true);
		$("#botro").val(1);
		$("#vdias").val(serv[6]);
	}else{
		$(".opPeriodo").removeClass('hide');
		$("#dhotro").addClass('hide');
		$("#isPeriodo").prop('checked',false).change();
		$("#vdias").val(0);
	}
	$("#vidproveedor").val(serv[7]);
	if (serv[7] != 0) {
		$("#outsourcing").prop('checked',true);
		$("#prov").prop('disabled',false);
		$("#prov").val(serv[7]);
		$("#prov").material_select();
		$("#boutsrc").val(1);
	}else{
		$("#outsourcing").prop('checked',false);
		$("#prov").prop('disabled',true);
		$("#prov").val(0);
		$("#prov").material_select();
		$("#boutsrc").val(0);

	}
	$("#vpcompra").val(serv[8]);
	$("#vpganancia").val(serv[9]);
	$("#vidmoneda").val(serv[12]);
	$("#addserv").removeClass('add');
	$("#addserv").addClass('edit');
	$("#addserv").html('Guardar')


	Materialize.updateTextFields();
});

$(document).on("change","#inputExc",function(){
	var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
	var ganancia = isNaN($("#vganancia").val()) ? 0 : parseFloat($("#vganancia").val().replace(/,/g,""));
	var imv = isNaN($("#vimv").val()) ? 0 : parseFloat($("#vimv").val().replace(/,/g,""));

	if ($(this).is(":checked")) {
		$("#vimv").val('0.00');
		vventa = costo * ((ganancia/100)+1);
		$("#vventa").val( (vventa).toFixed(2) );
	}
});

$(document).on("change","#inputGrav",function(){
	$("#vimv").val('13.00');
	var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
	var ganancia = isNaN($("#vganancia").val()) ? 0 : parseFloat($("#vganancia").val().replace(/,/g,""));
	var imv = isNaN($("#vimv").val()) ? 0 : parseFloat($("#vimv").val().replace(/,/g,""));

	if ($(this).is(":checked")) {
		vventa = costo * ((ganancia/100)+1) * ((imv/100)+1);
		$("#vventa").val( (vventa).toFixed(2) );
	}
});

$(document).on("click",".bbck",function(){
	var tipo = parseInt($(this).attr('tipo'));
	switch(tipo){
		case 1:
			$("#newfam").hide(500);
			$("#dbck1").hide(500);
			$("#vidfamilia").show(500);
			$("#baddj1").addClass('bjerarquia');
			break;
		case 2:
			$("#newtip").hide(500);
			$("#dbck2").hide(500);
			$("#vidtipo").show(500);
			$("#baddj2").addClass('bjerarquia');
			break;
		case 3:
			$("#newmar").hide(500);
			$("#dbck3").hide(500);
			$("#vidmarca").show(500);
			$("#baddj3").addClass('bjerarquia');
			break;
		case 4:
			$("#newmod").hide(500);
			$("#dbck4").hide(500);
			$("#vidmodelo").show(500);
			$("#baddj4").addClass('bjerarquia');
			break;
	}
});

$(document).on("keyup","#cantProd",function(e){
	if (e.which == 13) {
		$("#agInvProPqts").click();
		$("#descrP").val('');
		$("#cantProd").val('');
	}
});

$(document).on("keyup","#cantServ",function(e){
	if (e.which == 13) {
		$("#agInvSerPqts").click();
		$("#descrS").val('');
		$("#cantServ").val('');
	}
});

$(document).on("click",".load",function(){
	$("#accmodalProd").html('Editar Producto');
	$("#accmodalServ").html('Editar Servicio');
	$("#addV").removeClass('add');
	$("#addV").addClass('edit');
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

$(document).on("keyup",".calcvv",function(e){
	var code = e.which || e.keyCode;
	var focus = $(this).attr('focus');
	var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
	var ganancia = isNaN($("#vganancia").val()) ? 0 : parseFloat($("#vganancia").val().replace(/,/g,""));
	$("#hvcosto").val(costo);
	totalizar(costo,ganancia);

	if (code == 13) {
		$("#"+focus).select();
	}
});

// $(document).on("keyup",".vcalcServ",function(){
// 	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
// 	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
// 	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));
// 	var tganancia = 0;
	
// 	if (compra != 0) 
// 		tganancia = (((base / compra)-1)*100);

// 	$("#vpganancia").val(tganancia.formatMoney(0,'.',','));
// 	$("#vpcompra").val(compra.toFixed(2));

// });

// $(document).on("keyup","#vpcompra",function(){
// 	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
// 	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
// 	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));
// 	var tbase = base;

// 	var tganancia = (((base / compra)-1)*100);
// 	if (base == 0)
// 		tbase = ((compra * ((ganancia / 100)+1)));

// 	$("#vpganancia").val(tganancia.formatMoney(0,'.',','));
// 	$("#vpbase").val(tbase.toFixed(2));
// });

// $(document).on("keyup","#vpganancia",function(){
// 	var base = isNaN($("#vpbase").val()) ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
// 	var compra = isNaN($("#vpcompra").val()) ? 0 : parseFloat($("#vpcompra").val().replace(/,/g,""));
// 	var ganancia = isNaN($("#vpganancia").val()) ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));

// 	var tbase = ((compra * ((ganancia / 100)+1)));

// 	$("#vpbase").val(tbase.toFixed(2));
// 	$("#vpcompra").val(compra.toFixed(2));
// });


$(document).on("click","#agInvProPqts",function(){
	var prodStr = $("#descrP").val();
	var prodPrec = prodStr.substr(prodStr.indexOf('¢')+1);
	prodStr = prodStr.substr(0,prodStr.indexOf('¢')+1);
	var prodCant = $("#cantProd").val();
	var idProdStr = $("#idProdStr").val();
	var cProdStr = $("#cProdStr").val();
	var subtotal = (parseFloat(prodPrec)*prodCant).toFixed(2);

	var gDatos = getDatos();
	tkn(prodStr,subtotal,prodCant)
	$("#textProd-tokenfield").focus();
});

$(document).on("click","#agInvSerPqts",function(){
	var servStr = $("#descrS").val();
	var servPrec = servStr.substr(servStr.indexOf('¢')+1);
	servStr = servStr.substr(0,servStr.indexOf('¢')+1);
	var servCant = $("#cantServ").val();
	var idServStr = $("#idServStr").val();
	var cServStr = $("#cServStr").val();
	var subtotal = (parseFloat(servPrec)*servCant).toFixed(2);

	var gDatos = getDatos();
	

	$("#textServ-tokenfield").focus();
	$("#textServ-tokenfield").val(servStr+subtotal+'|'+servCant);
	$("#textServ-tokenfield").select();
});

$(document).on("click","#addproduct",function(){
	$("#fproductos").submit(function(){return false});
	$("#addprod").removeClass('hide');
	$("#editprod").addClass('hide');
	$(".accmodalProd").html('Agregar Producto');
	$("#ajaxProductos").html('');
	$("#impuestos").addClass('hide');
	// $("#impuestos").html('');
	var imp = arr('login',4,'impuesto,nombre,valor',109,'',0,0,0)[0];
	$("#impuestos").removeClass('hide');
	for (var i = 0; i < imp.length; i++) {
		$("#impuestos").append('<li class="collection-item dismissable" id="newimp'+imp[i][0]+'"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv'+imp[i][0]+'" value="'+imp[i][2]+'">'+imp[i][1]+' - '+imp[i][2]+'%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo'+imp[i][0]+'" type="number" class="validate eder" value="0" style="margin: 0px;width: 50%"></div></div></li>')
	}
	
	// vaciar('productos');
	Materialize.updateTextFields();
	
});

$(document).on("change","#vidmoneda",function(){
	
});

$(document).on("click","#addservice",function(){
	$(".accmodal").html('Agregar Servicio');
	$("#addV").html('Agregar');
	
	$("input[name=sPeriodo]").prop('checked',false);
	$("#vdescripcion").val('');

	deadclear('servicio');
	Materialize.updateTextFields();
	$("#vdescripcion").characterCounter();
	$('select').material_select();
	$("#vidtipo").val(0);
	$("#ajaxServicio").html('');
	setTimeout(function(){$("#vcodigo").focus();},500);
	
});

$(document).on("click","#addpackage",function(){
	$("#titpqt").html("Agregar Paquetes");
	var number = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
	var codigo = addZero(number,2);
	$("#vcodigo").val('PCK-'+codigo);
	// vaciar('paquetes');
	$('select').material_select('destroy');
	arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#vdescuento"));
	$('select').material_select();
	Materialize.updateTextFields();
	$('#prod').autocomplete({
		limit: 20,
		data: arr('login',4,'concat(nombre," - ¢",replace(precio,".00","")),null',77,'nombre like "%'+$("#prod").val()+'%" limit 20',0,0,0,1)
	});
	$("#editpck").attr('id','addpqt');
	$("#addpqt").html('Agregar');
	$("#listapaquetes").html('')
	setTimeout(function(){ $("#vnombre").focus() },500);
});

$(document).on("change","#isPeriodo",function(){
	if ($("#isPeriodo").is(':checked')) {
		$("#diario").prop('checked',true);
		$(".cper").prop('disabled',false);
		$("#vperiodo").val(1);
		$("#vdias").val(0);
	}else{
		if ($("#botro").val() == 1)
			$("#otros").click();

		$(".cper").prop('disabled',true);
		$(".cper").prop('checked',false);
		$("#dhotro").addClass('hide');
		$("#vperiodo").val(0);
		$("#vdias").val(0);
	}
});

$(document).on("change",".cper",function(){
	var dias = $(this).attr('valor');
	$("#vperiodo").val(dias)
});

$(document).on("keyup","#voptServ",function(){
	var opotros = parseInt($("#voptServ").val());
	$("#vperiodo").val(opotros)
});

$(document).on("click","#otros",function(){
	if ($("#botro").val() == 0) {
		$(".opPeriodo").addClass('hide');
		$("#dotros").removeClass('hide');
		$("#dhotro").removeClass('hide');
		Materialize.updateTextFields();
		setTimeout(function(){$("#vdias").select();},100);
		$("#botro").val(1);
	}else{
		$("#dhotro").addClass('hide');
		$(".opPeriodo").removeClass('hide');
		$("#botro").val(0);
	}
});	

$(document).on("change","#outsourcing",function(){
	if ($("#boutsrc").val() == 0) {
		$("#prov").attr('disabled',false);
		$('select').material_select();
		$("#boutsrc").val(1);
	}else{
		$("#boutsrc").val(0);
		$("#prov").attr('disabled',true);
		$("#prov").val(0);
		$("#vidproveedor").val(0);
		$('select').material_select();
	}
});

$(document).on("change","#prov",function(){
	var id = $(this).val();
	$("#vidproveedor").val(id)
});

function adddesc(vdesc,vvalor) {
	if ($("#vdesc"+vdesc).text() == '') {
		$("#tbldesc").removeClass('hide');
		$("#listadescuentos").append('<li class="collection-item dismissable" id="ld'+vdesc+'"><div><span class="descprod" id="vdesc'+vdesc+'">'+vvalor+'%</span><a class="secondary-content"><i class="material-icons but deldesc" id="deldesc'+vdesc+'">delete</i></a></div></li>');
	}else{
		Materialize.toast('Descuento del '+vvalor+'% Ya Existe', 6000, 'yellow accent-4');;
	}
	$("#dscts").focus();
}

// function vaciar(modulo){
// 	switch (modulo){
// 		case 'productos':
// 			$("#vidfamilia").val(0);
// 			$("#vidtipo").val(0);
// 			$("#vidmarca").val(0);
// 			$("#vidmodelo").val(0);
// 			$("#vnombre").val('');
// 			$("#vcodigo").val('');
// 			$("#vidunidad").val(0);
// 			$("#vcantidad").val(0);
// 			$("#vminimo").val(0);
// 			$("#vmaximo").val(0);
// 			$("#vcosto").val('0.00');
// 			$("#hvcosto").val('0.00');
// 			$("#vganancia").val('0.00');
// 			$("#vventa").val('0.00');
// 			$("#hventa").val('');
// 			$("#impuestos").html('');
// 			$("#maxdesc").val('');
// 			$("#dscts").val('');
// 			$("#tbldesc").hide();
// 			$("#listadescuentos").html('');
// 			$("#tb1").click();
// 			break;
// 		case 'paquetes':
// 			$("#vnombre").val('');
// 			$("#prod").val('');
// 			$("#hprod").val('');
// 			$("#cantidad").val('');
// 			$(".linea").remove();
// 			$("#vdescuento").val(0);
// 			$("#totpqt").val('0.00');
// 			$("#htotal").val('');
// 			break;

// 	}
// }

function totalizar(costo,ganancia) {
	var subtotal = 0;
	var impuestos = 0;
	var exoneracion = 0;
	
	$(".impuestos").each(function(){
		var id = $(this).attr('id').substr(4);
		impuestos += parseFloat($(this).attr('value'));
		exoneracion = $("#vexoneracion").val() == '' ? 0 : parseFloat($("#vexoneracion").val())
	});

	if (ganancia == 0) {
		subtotal = costo * (((impuestos - (impuestos*(exoneracion/100))) / 100)+1);
	}else{
		subtotal = costo * (((impuestos - (impuestos*(exoneracion/100))) / 100)+1) * ((ganancia / 100)+1);
	}
	$("#hventa").val(subtotal)
	$("#vventa").val(subtotal.formatMoney(2,'.',','));

	$(".precionivel").each(function(){
		var id = $(this).attr('id').substr(1);
		ganancia = parseFloat($("#vganancia"+id).val());
		exoneracion = parseFloat($("#vexoneracion"+id).val());
		if (ganancia != 0 || exoneracion != 0) {
			subtotal = costo * (((impuestos - (impuestos*(exoneracion/100))) / 100)+1) * ((ganancia / 100)+1);
			$("#vventa"+id).val(subtotal.formatMoney(2,'.',','));
		}
		
	});

}

function addprod(prod,cant) {
	var info = arr('login',4,'id,precio,nombreprecio',77,'nombre = \"'+prod+'\"','',0,'')[0][0];
	var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));
	var ptotal = info[1] * cant;
	var total = 0;
	var idprod = 0;
	var idserv = 0;
	
	if (info[2].substr(0,1) == '[') {
		idserv = info[0].substr(1);
		idprod = 0;
	}else{
		idprod = info[0];
		idserv = 0;
	}

	if ($("#l"+info[0]).html() == undefined) {
		$("#listapaquetes").append('<div class="chip blue lighten-3" id="l'+info[0]+'"><input type="hidden" id="htot'+info[0]+'" value="'+ptotal+'" precio="'+info[1]+'"><span class="nomprod" id="n'+info[0]+'" idproducto="'+idprod+'" idservicio="'+idserv+'">'+prod+'</span> (<span class="hcant" id="c'+info[0]+'">'+cant+'</span>)<i class="close material-icons del" id="d'+info[0]+'">close</i></div>');
	}else{
		$("#c"+info[0]).text( parseInt($("#c"+info[0]).text()) + parseInt(cant) );
		var precio = parseFloat($("#htot"+info[0]).attr('precio'));
		var cantidad = parseFloat($("#c"+info[0]).text());
		$("#htot"+info[0]).val(precio * cantidad)
	}

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var precio = parseFloat($("#htot"+id).val());
		total += precio;
	});
	
	
	var totdesc = total / ((desc/100)+1);

	$("#htotal").val(total);
	$("#totpqt").val(totdesc.formatMoney(2,',','.'));

	$("#prod").val('');
	$("#cantidad").val('');
	$("#hprod").val('');
	$("#prod").focus();



}

function filtrarprod(variable,filtro){
	arr('login',6,'',93,'\''+variable+'\','+filtro,14,1,$("#listaproductos"));
}

function filterpck(variable,filtro){
	arr('login',6,'',96,'\''+variable+'\','+filtro,76,1,$("#listapqts"));
}

function filterserv(variable,filtro){
	arr('login',6,'',98,'\''+variable+'\','+filtro,13,1,$("#listaservicios"));
}

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
			}else{
				$("#vpbase").val(0);
				$("#vpcompra").val(0);
			}
			
			break;
		case 'producto':
			if (vmodulo['tip'] == '') {
				err = validarproductos();
				if ( err ) {
					return err;
				}
			}else{
				$("#vcodigo").val("");
				$("#vnombre").val("");
				$("#vcantidad").val('0.00');
				$("#vminimo").val(0);
				$("#vmaximo").val(0);
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

	if ($("#vidfamilia").val() == 0) {
		$("#tb1").click()
		$("#vidfamilia").focus();
		return "Familia Requerido"
	}

	if ($("#vidtipo").val() == 0) {
		$("#tb1").click()
		$("#vidtipo").focus();
		return "Tipo Requerido"
	}
	if ($("#vidmarca").val() == 0) {
		$("#tb1").click()
		$("#vidmarca").focus();
		return "Marca Requerido"
	}

	if ($("#vidmodelo").val() == 0) {
		$("#tb1").click()
		$("#vidmodelo").focus();
		return "Modelo Requerido"
	}
	
	if ($("#vnombre").val() == ''){
		$("#tb1").click()
		$("#vnombre").focus();
		return 'Nombre Requerido';
	}
	if ($("#vcodigo").val() == ''){
		$("#tb1").click()
		$("#vcodigo").focus();
		return 'Código Requerido';
	}
	if ($("#vminimo").val() < 0){
		$("#tb1").click()
		$("#vminimo").select();
		return 'Mínimo Requerido';
	}
	if ($("#vmaximo").val() < 0){
		$("#tb1").click()
		$("#vmaximo").select();
		return 'Máximo Requerido';
	}
	if ($("#vcosto").val() == '0.00'){
		$("#tb2").click();
		$("#vcosto").select()
		return 'Precio Costo Requerido';
	}
	if ($("#vcosto").val() <= 0){
		$("#tb2").click();
		$("#vcosto").select()
		return 'Precio Costo Debe ser Mayor a 0';
	}
	
	if ($("#vventa").val() == '' || $("#vventa").val() == '0.00'){
		$("#tb2").click();
		$("#vventa").focus();
		return 'Precio de Venta Requerido';
	}

	return false;

}

function validarservicios() {
	if ($("#vcodigo").val() == '') {
		$("#ms1").click();
		$("#vcodigo").focus();
		return 'Código Requerido';
	}

	if ($("#vnombre").val() == ''){
		$("#ms1").click();
		$("#vnombre").focus();
		return 'Nombre Requerido'
	}
	if ($("#vdescripcion").val() == ''){
		$("#ms1").click();
		$("#vdescripcion").focus();
		return 'Descripción Requerido'
	}

	if ($("#outsourcing").is(":checked")) {
		if ($("#prov").val() == null) {
			$("#ms1").click();
			return 'Proveedor Requerido';
		}
	}

	if ($("#vpbase").val() == ''){
		$("#ms2").click();
		$("#vpbase").focus();
		return 'Precio Base Requerido'
	}

	if ($("#vpcompra").val() == '') {
		$("#ms2").click();
		$("#vpcompra").focus();
		return 'Precio Compra Requerido';
	}

	if ($("#vpganancia").val() == '') {
		$("#vpganancia").val(0);
	}

	if (!$("#isPeriodo").is(":checked"))
		$("#vdias").val(0);

	return false;
}

function validarpaquete(){
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre Paquete Requerido";
	}
	if ($("#totpqt").val() == '0.00') {
		return "Debe Agregar al Menos 1 Producto";
	}
	return false;
}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'producto':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,costo as vcosto,ganancia as vganancia,venta as vventa,imv as vimv,idunidad as vidunidad,isgravado as visgravado,idmoneda as vidmoneda,idfamilia as vidfamilia,idtipo as vidtipo,idmarca as vidmarca,idbodega as vidbodega,cantidad as vcantidad,minimo as vminimo,maximo as vmaximo';
			vmodulo['tbl'] = 14;
			vmodulo['where'] ='id = '+vid;
			break;

		case 'servicio':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,descripcion as vdescripcion,pbase as vpbase,periodo as vperiodo,idproveedor as vidproveedor,pcompra as vpcompra,pganancia as vpganancia,idmoneda as vidmoneda';
			vmodulo['tbl'] = 16;
			vmodulo['where'] ='id = '+vid;
			break;
		case 'paquetes':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 14;
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
			arr['sel'] = 'id,codigo,nombre,isprod,scosto,sventa,sganancia';
			arr['tbl'] = 14;
			arr['where'] = 'id > 0 order by nombre limit 20';
			break;
		case 'servicios':
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 13;
			arr['where'] = 'id > 0 order by nombre limit 20';
			break;
		case 'paquetes':
			var arr = {};
			arr['sel'] = 'vid,vcodigo,vnombre,vdescuento,totpqt';
			arr['tbl'] = 72;
			arr['where'] = 'vid > 0 order by nombre limit 20';
			break;
		case 'familia':
			var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 20;
			arr['where'] = 'id > 0 order by id';
			break;
		case 'tipo':
			var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 21;
			arr['where'] = 'id > 0 and idfamilia = '+$("#vidfamilia option:selected").val()+' order by id';
			break;
		case 'marca':
			var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 22;
			arr['where'] = 'id > 0 order by id';
			break;
		case 'modelo':
			var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 23;
			arr['where'] = 'id > 0 and idmarca = '+$("#vidmarca option:selected").val()+' order by id';
			break;
	}
		return arr;

}