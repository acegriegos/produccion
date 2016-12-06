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

				$('#prod').autoComplete({
				    minChars: 1,
				    source: function(term, response){
				        term = term.toLowerCase();
				        msuggest = arr('login',4,'nombreprecio',77,'nombre like \"%'+term+'%\"','',0,'')[0];
				        response(msuggest);
					}
				});
				break;
		}
		$('select').material_select();
		$('.dropdown-button').dropdown();
		$('.modal').modal();
	});
	$("#m2").click();
});
$(document).ready(function(){
	// Materialize

	//Materialize
});

$(document).on("click",".menuP",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuP").removeClass('active');
	$(this).addClass('active');
	switch(id){
		case 1:
			$("#financiero").addClass('hide');
			$("#descuentos").addClass('hide');
			$("#datosproductos").removeClass('hide');
			break;
		case 2:
			$("#datosproductos").addClass('hide');
			$("#descuentos").addClass('hide');
			$("#financiero").removeClass('hide');
			$('select').material_select('destroy');
			arr('login',6,'*',51,'id > 0',48,1,$("#imp"));
			$('select').material_select();
			$("#vcosto").select();
			break;
		case 3:
			$("#datosproductos").addClass('hide');
			$("#financiero").addClass('hide');
			$("#descuentos").removeClass('hide');
			$("#dscts").focus();
			break;
	}
});

$(document).on("click",".vfiltros",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#phs");
	switch(id) {
		case 1:
			$("#fgrande").attr('filter',id);
			elemento.text('Buscar '+$(this).html())
			break;
		case 2:
			$("#fgrande").attr('filter',id);
			elemento.text('Buscar '+$(this).html())
			break;
	}
});

$(document).on("click",".filtersrv",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#searchsrv");
	switch(id) {
		case 1:
			$("#fserv").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
		case 2:
			$("#fserv").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
	}
});

$(document).on("click",".filtropqt",function(){
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#searchpqt");
	switch(id) {
		case 1:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
			break;
		case 2:
			$("#fpqt").attr('filter',id);
			elemento.attr('placeholder','Buscar '+$(this).html());
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

$(document).on("keyup",".formprod",function(e){
	var code = e.which || e.keyCode;
	var pos = $(this).attr('id');
	if (code == 13) {
		sendfocus(pos);
	}
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
			$("#impuestos").append('<li class="collection-item dismissable" id="newimp'+id+'"><div><span class="impuestos" id="vimv'+id+'" value="'+valor+'">'+nombre+' - '+valor+'%</span><a class="secondary-content delimp" id="dimp'+id+'"><i class="material-icons">delete</i></a></div></li>');
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
	$("#newimp"+id).remove();

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
		var cantidad = $("#vcantidad").val() == '' ? 0 : $("#vcantidad").val();
		var minimo = $("#vminimo").val();
		var maximo = $("#vmaximo").val();
		var isgravado = $("#visgravado").val();
		var idmodelo = $("#vidmodelo option:selected").val();
	//producto
		var idproducto = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+nombre+'\",'+costo+','+ganancia+','+venta+','+idunidad+','+cantidad+','+minimo+','+maximo+',0,'+idmodelo+',@@usr,@@impresa','',0,'');
	
		if (idproducto[0][0] != undefined) {
			// financiero
			$(".impuestos").each(function(){
				var idimpuesto = $(this).attr('id').substr(4);	
				var imp = arr('login',4,'',86,'1,0,'+idproducto[0][0]+',11,'+idimpuesto+',0.00','',0,'');
			});
			Materialize.toast('Producto Agregado Correctamente', 6000, 'green');
			arr('login',6,'id,codigo,nombre,scosto,sventa,sganancia',14,'id > 0 order by nombre','',1,$("#listaproductos"));
			vaciar('productos');
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
		vaciar('productos');
	}else{
		Materialize.toast(valprod, 6000, 'red');
	}
});

$(document).on("click",".editprod",function(){
	var id = $(this).attr('id').substr(1);
	var p = arr('login',4,'idfamilia,idtipo,idmarca,idmodelo,nombre,codigo,idunidad,minimo,maximo,costo,ganancia,fventa,venta,maxdescuento',14,'id = '+id,'',0,'')[0][0];
	var cant = arr('login',4,'replace(cantidad,".00","")',97,'idproducto = '+id,'',0,'')[0][0];
	var imp = arr('login',4,'idimpuesto,impuesto,valor',83,'idproducto = '+id,'',0,'')[0];
	$(".accmodalProd").html("Actualizar Producto "+p[5]);
	$("#addprod").addClass('hide');
	$("#editprod").removeClass('hide');
	$("#editprod").attr('idprod',id);
	$("#impuestos").removeClass('hide');
	$("#impuestos").html('');
	//cargar
	$("#vidfamilia").val(p[0]);
	$("#vidtipo").val(p[1]);
	$("#vidmarca").val(p[2]);
	$("#vidmodelo").val(p[3]);
	$("#vnombre").val(p[4]);
	$("#vcodigo").val(p[5]);
	$("#vidunidad").val(p[6]);
	$("#vcantidad").val(cant)
	$("#vminimo").val(p[7]);
	$("#vmaximo").val(p[8]);
	$("#vcosto").val(p[9]);
	$("#hvcosto").val(p[9]);
	$("#vganancia").val(p[10]);
	$("#vventa").val(p[11]);
	$("#hventa").val(p[12]);
	$("#maxdesc").val(p[13]);

	if (imp != '') {
		for (var i = 0; i < imp.length; i++) {
			$("#impuestos").removeClass('hide');
			$("#impuestos").append('<li class="collection-item dismissable" id="newimp'+imp[i][0]+'"><div><span class="impuestos" id="vimv'+imp[i][0]+'" value="'+imp[i][2]+'">'+imp[i][1]+' - '+imp[i][2]+'%</span><a class="secondary-content delimp" id="dimp'+imp[i][0]+'"><i class="material-icons">delete</i></a></div></li>');

		}
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

$(document).on("blur","#prod",function(){
	var nombre = $(this).val();
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
		var precio = $("#htot"+pid).val();
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
		var descuento = $("#vdescuento option:selected").val();
		var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
		var idpaquete = arr('login',4,'',60,'1,0,\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+',@@usr,@@impresa','',0,'');
		if (idpaquete[0][0] != undefined) {
			$(".nomprod").each(function(){
				var id = $(this).attr('id').substr(1);
				var idproducto = $(this).attr('idproducto');
				var idservicio = $(this).attr('idservicio');
				arr('login',4,'',61,'1,'+idpaquete[0][0]+','+idproducto+','+idservicio+','+$("#c"+id).text()+',@@usr,@@impresa','',0,'');
			});
			Materialize.toast('Paquete Agregado Correctamente', 6000);
			arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));
			vaciar('paquetes');
			$("#listapaquetes").html('');
			var consecutivo = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
			var codigo = addZero(consecutivo,4);
			$("#vcodigo").val('PCK-'+codigo);
		}else{
			Materialize.toast(idpaquete[0]['ERROR'], 6000);

		}
	}else{
		Materialize.toast(valpqt, 6000);

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
			Materialize.toast('Paquete Editado Correctamente', 6000);
			arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));
			vaciar('paquetes');
			$("#listapaquetes").html('');
			var consecutivo = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
			var codigo = addZero(consecutivo,4);
			$("#vcodigo").val('PCK-'+codigo);
		}else{
			Materialize.toast(idpaquete[0]['ERROR'], 6000);
		}
	}else{
		Materialize.toast(valpqt, 6000);
	}
});

$(document).on("click","#editon",function(){
	$(".del").show();
	$(".hcant").hide();
	$(".ihcant").attr("type","number");
	$(".hcant").each(function(){
		var id = $(this).attr('id').substr(1);
		var cant = $("#c"+id).text();
		$("#hcant"+id).val(cant);
	});
});
$(document).on("click","#editoff",function(){
	$(".del").hide();
	$(".hcant").show();
	$(".ihcant").attr("type","hidden");
});


$(document).on("click",".loadpck",function(){

	var id = $(this).attr('id').substr(1);
	$("#titpqt").html("Editar Paquetes");
	arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',89,'id > 0 order by nombre','',1,$("#vdescuento"));

	var p = arr('login',4,'vnombre,vcodigo,iddescuento,htotal,totpqt,vid',76,'vid = '+id,'',0,'')[0][0];
	$("#vid").val(p[5])
	$("#vnombre").val(p[0]);
	$("#vcodigo").val(p[1]);
	$("#vdescuento").val(p[2]);
	$("#htotal").val(p[3]);
	$("#totpqt").val(p[4]);

	$("#addpqt").hide();
	$("#editpck").show();
	
	arr('login',6,'idproducto,producto,idservicio,servicio,cantidad,precio,ptotal',62,'idpaquete = '+id,'',1,$("#listapaquetes"))
	setTimeout(function(){$("#prod").focus()},500);

});

$(document).on("click",".delpck",function(){
	var id = $(this).attr('id').substr(1);
	var array = {}
	array['where'] = '3,'+id+',"","",0.00,0.00,@@usr,@@impresa';
	arr('login',4,'',60,array['where'],'',0,'');

	var array2 = {}
	array2['where'] = '3,'+id+',0,0,0,@@usr,@@impresa';
	arr('login',4,'',61,array2['where'],'',0,'');

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

// $(document).on("click",".bjerarquia",function(){
// 	var tipo = parseInt($(this).attr('tipo'));
// 	switch(tipo){
// 		case 1:
// 			$("#vidfamilia").hide(500);
// 			$("#newfam").show(500);
// 			$("#dbck1").show(500);
// 			$(this).removeClass('bjerarquia');
// 			$(this).addClass('sjerarquia');
// 			$("#newfam").focus();
// 			$("#newfam").select();
// 			break;
// 		case 2:
// 			$("#vidtipo").hide(500);
// 			$("#newtip").show(500);
// 			$("#dbck2").show(500);
// 			$(this).removeClass('bjerarquia');
// 			$(this).addClass('sjerarquia');
// 			$("#newtip").focus();
// 			$("#newtip").select();
// 			break;
// 		case 3:
// 			$("#vidmarca").hide(500);
// 			$("#newmar").show(500);
// 			$("#dbck3").show(500);
// 			$(this).removeClass('bjerarquia');
// 			$(this).addClass('sjerarquia');
// 			$("#newmar").focus();
// 			$("#newmar").select();
// 			break;
// 		case 4:
// 			$("#vidmodelo").hide(500);
// 			$("#newmod").show(500);
// 			$("#dbck4").show(500);
// 			$(this).removeClass('bjerarquia');
// 			$(this).addClass('sjerarquia');
// 			$("#newmod").focus();
// 			$("#newmod").select();
// 			break;
// 	}
// });

// $(document).on("click",".sjerarquia",function(){
// 	var tipo = $(this).attr('tipo');
// 	var ref = $(this).attr('ref');
// 	var nom = $(this).attr('nombre');
// 	var nombre = $("#new"+nom.substr(0,3)).val();
// 	var idref1 = $("#vid"+$(this).attr('ref1')+" option:selected").val();
// 	var idref2 = $("#vid"+$(this).attr('ref2')+" option:selected").val();
// 	// console.log("tipo: "+tipo+" ,nombre: "+nombre+" ,ref1: "+idref1+" ,ref2: "+idref2)
// 	var valj = valjerarquia(tipo);

// 	if (valj == false) {

// 		$("#err1").hide();
// 		$("#suc1").hide();

// 		if (ref == 0) {
// 			var arr = {};
// 			arr['sel'] = '';
// 			arr['tbl'] = 24;
// 			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",0,0,@@usr,@@impresa';
// 			var p = mantenimiento('login',4,arr)[0][0];

// 			$("#new"+nom.substr(0,3)).hide(500);
// 			$("#vid"+nom).show(500);
// 			$("#vid"+nom).empty();
// 			var cargar = cargarSintax(nom);
// 			var tbl = mantenimiento('login',6,cargar);
// 			$("#vid"+nom).html(tbl);
// 			$("#vid"+nom).val(p).change();
// 			$(this).removeClass('sjerarquia');
// 			$(this).addClass('bjerarquia');
// 			$("#dbck"+tipo).hide(500);

// 		}else if(ref == 1){
// 			var arr = {};
// 			arr['sel'] = '';
// 			arr['tbl'] = 24;
// 			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",'+idref1+',0,@@usr,@@impresa';
// 			var p = mantenimiento('login',4,arr)[0][0];

// 			$("#new"+nom.substr(0,3)).hide(500);
// 			$("#vid"+nom).show(500);
// 			$("#vid"+nom).empty();
// 			var cargar = cargarSintax(nom);
// 			var tbl = mantenimiento('login',6,cargar);
// 			$("#vid"+nom).html(tbl);
// 			$("#vid"+nom).val(p).change();
// 			$(this).removeClass('sjerarquia');
// 			$(this).addClass('bjerarquia');
// 			$("#dbck"+tipo).hide(500);

// 		}else{
// 			var arr = {};
// 			arr['sel'] = '';
// 			arr['tbl'] = 24;
// 			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",'+idref1+','+idref2+',@@usr,@@impresa';
// 			var p = mantenimiento('login',4,arr)[0][0];

// 			$("#new"+nom.substr(0,3)).hide(500);
// 			$("#vid"+nom).show(500);
			
// 			$("#vid"+nom).empty();
// 			var cargar = cargarSintax(nom);
// 			var tbl = mantenimiento('login',6,cargar);
// 			$("#vid"+nom).html(tbl);
// 			$("#vid"+nom).val(p).change();
// 			$(this).removeClass('sjerarquia');
// 			$(this).addClass('bjerarquia');
// 			$("#dbck"+tipo).hide(500);

// 		}
// 	}else{
// 		$("#err1").show();
// 		$("#err1").html(valj);
// 	}	
// });

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

$(document).on("keyup",".calcvv",function(){
	var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
	var ganancia = isNaN($("#vganancia").val()) ? 0 : parseFloat($("#vganancia").val().replace(/,/g,""));
	$("#hvcosto").val(costo);
	// var venta = 0;

	totalizar(costo,ganancia)
	// if (imv == undefined && ganancia == 0) {
	// 	venta = costo;
	// }else{
	// 	venta = costo * ((ganancia/100)+1);
	// }
	// $("#vventa").val( (venta).toFixed(2) );
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
	tkn(prodStr,subtotal,prodCant)
	$("#textProd-tokenfield").focus();
	

});

$(document).on("focus","#textProd-tokenfield",function(){
	var e = jQuery.Event( 'keyup', { which: 13 } );
	$("#textProd-tokenfield").trigger(e);
	alert("focus")
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

$(document).on("keyup","#textProd-tokenfield",function(e){

	if (e.which == 13) {

		var text = $("#s"+(consec-1)).html();
		var cantidad = text.substring(text.lastIndexOf('(')+1, text.lastIndexOf(')'));
		var precio = text.substring(text.indexOf('¢')+1, text.indexOf('(')-1);

		$("#s"+(consec-1)).attr({'precio':precio,'cantidad':cantidad});
	}

});


$(document).on("click","#ingInvProd",function(){
	$("#fproductos").submit(function(){return false});
	$("#addprod").removeClass('hide');
	$("#editprod").addClass('hide');
	$(".accmodalProd").html('Agregar Producto');
	$("#ajaxProductos").html('');
	$("#impuestos").addClass('hide');
	$("#impuestos").html('');
	vaciar('productos');
	Materialize.updateTextFields();
	setTimeout(function(){$("#vfamilia").focus();},500)

});

$(document).on("change","#vidmoneda",function(){
	
});

$(document).on("click","#ingInvServ",function(){
	$("#accmodalServ").html('Agregar Servicio');
	$("#addV").html('Agregar');
	
	$("input[name=sPeriodo]").prop('checked',false);
	$("#vdescripcion").val('');

	deadclear('servicio');
	Materialize.updateTextFields();
	$("#vdescripcion").characterCounter();
	$("#vidtipo").val(0);
	$("#ajaxServicio").html('');
});

$(document).on("click","#ingInvPqts",function(){
	
	$("#titpqt").html("Agregar Paquetes");
	var number = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
	var codigo = addZero(number,4);
	$("#vcodigo").val('PCK-'+codigo);
	vaciar('paquetes');
	$("#listapaquetes").html('');
	$("#editpck").hide();
	$("#addpqt").show();
	arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#vdescuento"));
	Materialize.updateTextFields();
	setTimeout(function(){ $("#vnombre").focus() },500);

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

function sendfocus(pos) {
	switch(pos){
		case 'vnombre':
			$("#vcodigo").focus();
			break;
		case 'vcodigo':
			$("#vcantidad").focus();
			break;
		case 'vcantidad':
			$("#vminimo").focus();
			break;
		case 'vminimo':
			$("#vmaximo").focus();
			break;
		case 'vmaximo':
			$("#tb2").click();
			$("#vcosto").focus();
			break;
		case 'vcosto':
			$("#vganancia").select();
			$("#vganancia").focus();
			break;
		case 'vganancia':
			$("#vventa").focus();
			break;
	}
}

function adddesc(vdesc,vvalor) {
	if ($("#vdesc"+vdesc).text() == '') {
		$("#tbldesc").removeClass('hide');
		$("#listadescuentos").append('<li class="collection-item dismissable" id="ld'+vdesc+'"><div><span class="descprod" id="vdesc'+vdesc+'">'+vvalor+'%</span><a class="secondary-content"><i class="material-icons but deldesc" id="deldesc'+vdesc+'">delete</i></a></div></li>');
	}else{
		Materialize.toast('Descuento del '+vvalor+'% Ya Existe', 6000, 'yellow accent-4');;
	}
	$("#dscts").focus();
}

function vaciar(modulo){
	switch (modulo){
		case 'productos':
			$("#vidfamilia").val(0);
			$("#vidtipo").val(0);
			$("#vidmarca").val(0);
			$("#vidmodelo").val(0);
			$("#vnombre").val('');
			$("#vcodigo").val('');
			$("#vidunidad").val(0);
			$("#vcantidad").val(0);
			$("#vminimo").val(0);
			$("#vmaximo").val(0);
			$("#vcosto").val('0.00');
			$("#hvcosto").val('0.00');
			$("#vganancia").val('0.00');
			$("#vventa").val('0.00');
			$("#hventa").val('');
			$("#impuestos").html('');
			$("#maxdesc").val('');
			$("#dscts").val('');
			$("#tbldesc").hide();
			$("#listadescuentos").html('');
			$("#tb1").click();
			break;
		case 'paquetes':
			$("#vnombre").val('');
			$("#prod").val('');
			$("#hprod").val('');
			$("#cantidad").val('');
			$(".linea").remove();
			$("#vdescuento").val(0);
			$("#totpqt").val('0.00');
			$("#htotal").val('');
			break;

	}
}

function totalizar(costo,ganancia) {
	var subtotal = 0;
	var impuestos = 0;
	
	$(".impuestos").each(function(){
		var id = $(this).attr('id').substr(4);
		impuestos += parseFloat($(this).attr('value'));
	});

	if (ganancia == 0) {
		subtotal = costo * ((impuestos / 100)+1);
	}else{
		subtotal = costo * ((impuestos / 100)+1) * ((ganancia / 100)+1);
	}
	
	$("#vventa").val(subtotal.formatMoney(2,',','.'));
	$("#hventa").val(subtotal)
	$("#vventa").val(subtotal.formatMoney(2,'.',','));

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
		$("#listapaquetes").append('<li class="list-group-item linea" id="l'+info[0]+'"><input type="hidden" id="htot'+info[0]+'" value="'+ptotal+'" precio="'+info[1]+'"><span class="tag tag-default tag-pill pull-xs-right hcant" id="c'+info[0]+'">'+cant+'</span><input type="hidden" class="form-control ihcant pull-xs-right" style="max-width:22%" id="hcant'+info[0]+'" value=""><label class="nomprod" id="n'+info[0]+'" idproducto="'+idprod+'" idservicio="'+idserv+'">'+prod+'</label><i class="fa fa-times btn del inv" id="d'+info[0]+'"></i></li>');
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

function valjerarquia(tipo){

	var id = parseInt(tipo);
	switch(id){
		case 1:
			var validar = validarfamilia();
			break;
		case 2:
			var validar = validartipo();
			break;
		case 3:
			var validar = validarmarca();
			break;
		case 4:
			var validar = validarmodelo();
			break;
	}
	return validar;
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
	if ($("#vminimo").val() == 0){
		$("#tb1").click()
		$("#vminimo").select();
		return 'Mínimo Requerido';
	}
	if ($("#vmaximo").val() == 0){
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

function validarfamilia(){

	if ($("#newfam").val() == '') {
		$("#newfam").focus();
		return "Nombre Familia Requerido";
	}
	return false;
}

function validartipo(){
	if ($("#newtip").val() == '') {
		$("#newtip").focus();
		return "Nombre Tipo Requerido";
	}
	return false;
}

function validarmarca(){
	if ($("#newmar").val() == '') {
		$("#newmar").focus();
		return "Nombre Marca Requerido";
	}
	return false;
}

function validarmodelo(){
	if ($("#newmod").val() == '') {
		$("#newmod").focus();
		return "Nombre Modelo Requerido";
	}
	return false;
}

function cargar(vmodulo,vid) {

	switch(vmodulo['modulo']) {
		case 'producto':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,costo as vcosto,ganancia as vganancia,venta as vventa,imv as vimv,idunidad as vidunidad,isgravado as visgravado,idmoneda as vidmoneda,idfamilia as vidfamilia,idtipo as vidtipo,idmarca as vidmarca,idmodelo as vidmodelo,replace(cantidad,".00","") as vcantidad,minimo as vminimo,maximo as vmaximo';
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
			arr['sel'] = 'id,codigo,nombre,scosto,sventa,sganancia';
			arr['tbl'] = 14;
			arr['where'] = 'id > 0 order by nombre';
			break;
		case 'servicios':
			var arr = {};
			arr['sel'] = '*';
			arr['tbl'] = 13;
			arr['where'] = '`Codigo` > 0';
			break;
		case 'paquetes':
			var arr = {};
			arr['sel'] = 'vid,vcodigo,vnombre,vdescuento,totpqt';
			arr['tbl'] = 72;
			arr['where'] = 'vid > 0 order by nombre';
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

function getDatos(vmodulo){
	
	switch (vmodulo){
		case 'productos':
			var array = {};

		    array['sel'] = 'concat(nombre," - ¢ ",venta) as nombre, id, venta';
		    array['tbl'] = 11;
		    array['where'] = 'nombre like "%'+$("#descrP").val()+'%" and id > 0';

		    p = mantenimiento('productos',4,array);
		    return p;
		break;

		case 'servicios':
			var array = {};

		    array['sel'] = 'concat(nombre," - ¢ ",pbase) as nombre, id, pbase';
		    array['tbl'] = 16;
		    array['where'] = 'nombre like "%'+$("#descrS").val()+'%" and id > 0';

		    p = mantenimiento('productos',5,array);
		    return p;
		break;
	}
}