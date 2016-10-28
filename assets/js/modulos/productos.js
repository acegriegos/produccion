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
					// AUTO COMPLETE PRODUCTOS
					var optionsp = {

						  url: function(phrase) {
						  	getDatos('productos');
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

					$("#descrP").easyAutocomplete(optionsp);
						// AUTO COMPLETE PRODUCTOS

						// AUTO COMPLETE SERVICIOS
					var optionss = {

						  url: function(phrase) {
						  	getDatos('servicios');
						    return 'view/getServ.php';
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
						    data.phrase = $("#textServ").val();
						    return data;
						  },

						  requestDelay: 400
						};

					$("#descrS").easyAutocomplete(optionss);
						// AUTO COMPLETE SERVICIOS

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

					// BADGE
					$('#textServ')
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

$(document).on("click",".menuP",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuP").removeClass('active');
	$(this).addClass('active');
	$("#err1").hide();
	switch(id){
		case 1:
			$("#financiero").hide()
			$("#descuentos").hide();
			$("#datosproductos").show();
			break;
		case 2:
			$("#datosproductos").hide();
			$("#descuentos").hide();
			$("#financiero").show();
			arr('login',6,'*',51,'id > 0',48,1,$("#imp"));
			$("#vcosto").select();
			break;
		case 3:
			$("#datosproductos").hide();
			$("#financiero").hide();
			$("#descuentos").show();
			$("#maxdesc").focus();
			break;
	}
});

$(document).on("keyup","#maxdesc",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		$("#dscts").focus ();
	}
});

$(document).on("click","#adddsct",function(){
	var desc = $("#dscts").val();
	$("#err2").hide()
	if ($("#desc"+desc).text() == '') {
		if (desc != '' && desc <= parseFloat($("#maxdesc").val())) {
			$("#tbldesc").show();
			$("#listadescuentos").append('<tr id="'+desc+'"><td><span id="desc'+desc+'" class="descprod">'+desc+'%</span><span class="der"><i class="fa fa-times btn deldesc" id="deldesc'+desc+'"></i></span></td></tr>');
		}else{
			$("#err2").show();
			$("#errm2").html("Descuento Máximo es de "+$("#maxdesc").val()+"%");
			$("#dscts").focus();
		}
	}else{
		$("#err2").show();
		$("#errm2").html("Descuento del "+desc+"% Ya Existe");
	}
	
	$("#dscts").val('');
	$("#dscts").focus();
});

$(document).on("keyup","#dscts",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		if ($(this).val() != '' && $(this).val() <= parseFloat($("#maxdesc").val())) {
			$("#err2").hide();
			if ($("#desc"+$(this).val()).text() == '') {
				$("#tbldesc").show();
				$("#listadescuentos").append('<tr id="ld'+$(this).val()+'"><td><span id="desc'+$(this).val()+'" class="descprod">'+$(this).val()+'%</span><span class="der"><i class="fa fa-times btn deldesc" id="deldesc'+$(this).val()+'"></i></span></td></tr>');
			}else{
				$("#err2").show();
				$("#errm2").html("Descuento del "+$(this).val()+"% Ya Existe");
			}
			
			
		}else{
			$("#err2").show();
			$("#errm2").html("Descuento Máximo es de "+$("#maxdesc").val()+"%");
			$(this).focus();
		}
		$("#dscts").val('');
	}
	
});

$(document).on("click",".deldesc",function(){
	var id = $(this).attr('id').substr(7);
	$("#ld"+id).remove();
});

$(document).on("click","#addimp",function(){
	$("#err1").hide();
	var id = $("#imp option:selected").val();
	var nombre = $("#imp option:selected").text();
	var valor = $("#imp option:selected").attr('valor');

	if ($("#vimv"+id).val() == undefined) {
		if ($("#imp option:selected").val() != 0) {
			$("#impuestos").append('<div class="col-md-12 col-lg-12" id="newimp'+id+'"><div class="input-group"><div class="input-group-addon"><b>'+nombre+'</b></div><input type="text" class="form-control eder impuestos" id="vimv'+id+'" value="'+valor+'" readonly><div class="input-group-addon"><b>%</b></div><div class="input-group-addon btn delimp" id="dimp'+id+'"><i class="fa fa-times"></i></div></div><br></div>');


			totalizar($("#hvcosto").val(),$("#vganancia").val());
		}
		
	}else{
		$("#err1").show();
		$("#errm1").html("Impuesto "+nombre+" Agregado Anteriormente")
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
	$("#err1").hide();
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
		var isgravado = $("#visgravado").val();
		var idmodelo = $("#vidmodelo option:selected").val();
		var maxdesc = $("#maxdesc").val() == '' ? 0 : $("#maxdesc").val();

		// producto
		var idproducto = arr('login',4,'',78,'1,0,\"'+codigo+'\",\"'+nombre+'\",'+costo+','+ganancia+','+venta+','+idunidad+',0,'+minimo+','+maximo+','+isgravado+','+maxdesc+','+idmodelo+',@@usr,@@impresa','',0,'');

		if (idproducto[0][0] != undefined) {
			// financiero
			$(".impuestos").each(function(){
				var idimpuesto = $(this).attr('id').substr(4);
				var imp = arr('login',4,'',81,'1,0,'+idproducto[0][0]+','+idimpuesto,'',0,'');
			});

			// descuentos
			$(".descprod").each(function(){
				var valor = $(this).text().slice(0,-1);
				var descuentos = arr('login',4,'',82,'1,0,'+idproducto[0][0]+','+valor,'',0,'');
			});
		}else{
			$("#err1").show();
			$("#errm1").html(idproducto[0]['ERROR']);
		}

	}else{
		$("#err1").show();
		$("#errm1").html(valprod);
	}
});

$(document).on("click",".editprod",function(){
	var id = $(this).attr('id').substr(1);
	var p = arr('login',4,'idfamilia,idtipo,idmarca,idmodelo,isgravado,nombre,codigo,idunidad,minimo,maximo,costo,ganancia,fventa,maxdescuento',14,'id = '+id,'',0,'')[0][0];
	var imp = arr('login',4,'idimpuesto,impuesto,valor',83,'idproducto = '+id,'',0,'')[0];
	var desc = arr('login',4,'descuento',84,'idproducto = '+id,'',0,'')[0];
	//cargar
	$("#vidfamilia").val(p[0]).change();
	$("#vidtipo").val(p[1]);
	$("#vidmarca").val(p[2]).change();
	$("#vidmodelo").val(p[3]);
	$("#visgravado").val(p[4]);
	if (p[4] == 1) {
		$("#inputGrav").prop('checked',true);
	}else{
		$("#inputExc").prop('checked',true);
	}
	$("#vnombre").val(p[5]);
	$("#vcodigo").val(p[6]);
	$("#vidunidad").val(p[7]);
	$("#vminimo").val(p[8]);
	$("#vmaximo").val(p[9]);
	$("#vcosto").val(p[10]);
	$("#vganancia").val(p[11]);
	$("#vventa").val(p[12]);
	$("#maxdesc").val(p[13]);

	if (imp != '') {
			$("#impuestos").append('<div class="col-md-12 col-lg-12" id="newimp'+imp[i][0]+'"><div class="input-group"><div class="input-group-addon"><b>'+imp[i][1]+'</b></div><input type="text" class="form-control eder impuestos" id="vimv'+imp[i][0]+'" value="'+imp[i][2]+'" readonly><div class="input-group-addon"><b>%</b></div><div class="input-group-addon btn delimp" id="dimp'+imp[i][0]+'"><i class="fa fa-times"></i></div></div><br></div>');
		
	}

	if (desc != '') {
		for (var i = 0; i < desc.length; i++) {
			$("#tbldesc").show();
			$("#listadescuentos").append('<tr id="'+desc[i]+'"><td><span id="desc'+desc[i]+'" class="descprod">'+desc[i]+'%</span><span class="der"><i class="fa fa-times btn deldesc" id="deldesc'+desc[i]+'"></i></span></td></tr>');
		}
	}

});

$(document).on("click",".delprod",function(){
	var id = $(this).attr('id').substr(1);

	arr('login',4,'',78,'3,'+id+',"","",0,0,0,0,0,0,0,0,0,0,@@usr,@@impresa','',0,'');
	var tblprod = arr('login',6,'id,codigo,nombre,scosto,sventa,sganancia',14,'id > 0 order by nombre','',1,$("#listaproductos"));
	$("#suc3").show();
	$("#sucm3").html('Producto Eliminado Correctamente');

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
	var desc = $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());
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

$(document).on("keyup","#vdescuento",function(){
	var total = 0;
	var desc = $(this).val() == '' ? 0 : parseFloat($(this).val());
	var totpqt = parseFloat($("#htotal").val());
	total = totpqt / ((desc/100)+1);
	$("#totpqt").val(total.formatMoney(2,'.',','));
});

$(document).on("click","#addpqt",function(){
	var descuento = isNaN($("#vdescuento").val()) && $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());
	var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
	var arreglo = {};
	arreglo['where'] = '1,0,\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+',@@usr,@@impresa';
	var idpaquete = arr('login',4,'',60,arreglo['where'],'',0,'')[0][0];

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var idproducto = $(this).attr('idproducto');
		var idservicio = $(this).attr('idservicio');
		var array = {};
		array['where'] = '1,'+idpaquete+','+idproducto+','+idservicio+','+$("#c"+id).text()+',@@usr,@@impresa';
		arr('login',4,'',61,array['where'],'',0,'');
	});

	arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre','',1,$("#listapqts"));
	
	$("#vnombre").val('');
	$("#prod").val('');
	$("#hprod").val('');
	$("#cantidad").val('');
	$(".linea").remove();
	$("#vdescuento").val('0.00');
	$("#totpqt").val('0.00');
	$("#htotal").val('');
	var consecutivo = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
	var codigo = addZero(consecutivo,4);
	$("#vcodigo").val('PCK-'+codigo);



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

	var p = arr('login',4,'nombre,codigo,descuento,total',58,'id = '+id,'',0,'')[0][0];
	var descuento = (p[2] / 100)+1;
	var total = p[3] / descuento;
	$("#vnombre").val(p[0]);
	$("#vcodigo").val(p[1]);
	$("#vdescuento").val(p[2]);
	$("#htotal").val(p[3]);
	$("#totpqt").val(total.formatMoney(2,',','.'));
	
	arr('login',6,'idproducto,nombre,cantidad,ptotal',62,'idpaquete = '+id,'',1,$("#listapaquetes"))


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
	var desc = $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var cantidad = $("#hcant"+id).val();
		var precio = parseFloat($("#htot"+id).attr('precio'));
		precioprod = cantidad * precio;
		$("#htot"+id).val(precioprod);
		htotal += parseFloat($("#htot"+id).val());

	});

	total = htotal / ((desc / 100)+1);
	// alert(htotal+" "+total)

	$("#htotal").val(htotal);
	$("#totpqt").val(total.formatMoney(2,'.',','));

});

$(document).on("keyup",".ihcant",function(){
	var precioprod = 0;
	var htotal = 0;
	var total = 0;
	var desc = $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());

	$(".nomprod").each(function(){
		var id = $(this).attr('id').substr(1);
		var cantidad = $("#hcant"+id).val();
		var precio = parseFloat($("#htot"+id).attr('precio'));
		precioprod = cantidad * precio;
		$("#htot"+id).val(precioprod);
		htotal += parseFloat($("#htot"+id).val());

	});

	total = htotal / ((desc / 100)+1);
	// alert(htotal+" "+total)

	$("#htotal").val(htotal);
	$("#totpqt").val(total.formatMoney(2,'.',','));

});

$(document).on("blur",".ihcant",function(){
	var id = $(this).attr('id').substr(5);
	var valor = $(this).val();
	$("#c"+id).text(valor);
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
	var filtro = $("#searchprod").val();
	filtrarprod(code,filtro)
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

$(document).on("change","#vidfamilia",function(){
	var idfamilia = $("#vidfamilia option:selected").val();
	var arr = {};
	arr['sel'] = 'id,nombre';
	arr['tbl'] = 21;
	arr['where'] = 'id > 0 and idfamilia = '+idfamilia+' order by id';
	var tip = mantenimiento('login',6,arr);

	$("#vidtipo").empty();
	$("#vidtipo").html(tip);
	$("#baddj2").addClass('bjerarquia');
});

$(document).on("change","#vidmarca",function(){
	var idmarca = $("#vidmarca option:selected").val();
	var arr = {};
	arr['sel'] = 'id,nombre';
	arr['tbl'] = 23;
	arr['where'] = 'id > 0 and idmarca = '+idmarca+' order by id';
	var mod = mantenimiento('login',6,arr);
	$("#vidmodelo").empty();
	$("#vidmodelo").html(mod);
	$("#baddj4").addClass('bjerarquia');
});

$(document).on("click","#bfam",function(){
	if ($("#vidfamilia").val() == 0) {
		$("#err1").show();
		$("#errm1").html("Debe Seleccionar una Familia");
	}else{
		$("#err1").hide();
	}
});

$(document).on("click","#bmod",function(){
	if ($("#vidmarca").val() == 0) {
		$("#err1").show();
		$("#errm1").html("Debe Seleccionar una Marca");
	}else{
		$("#err1").hide();
	}
});

$(document).on("click",".bjerarquia",function(){
	var tipo = parseInt($(this).attr('tipo'));
	switch(tipo){
		case 1:
			$("#vidfamilia").hide(500);
			$("#newfam").show(500);
			$("#dbck1").show(500);
			$(this).removeClass('bjerarquia');
			$(this).addClass('sjerarquia');
			$("#newfam").focus();
			$("#newfam").select();
			break;
		case 2:
			$("#vidtipo").hide(500);
			$("#newtip").show(500);
			$("#dbck2").show(500);
			$(this).removeClass('bjerarquia');
			$(this).addClass('sjerarquia');
			$("#newtip").focus();
			$("#newtip").select();
			break;
		case 3:
			$("#vidmarca").hide(500);
			$("#newmar").show(500);
			$("#dbck3").show(500);
			$(this).removeClass('bjerarquia');
			$(this).addClass('sjerarquia');
			$("#newmar").focus();
			$("#newmar").select();
			break;
		case 4:
			$("#vidmodelo").hide(500);
			$("#newmod").show(500);
			$("#dbck4").show(500);
			$(this).removeClass('bjerarquia');
			$(this).addClass('sjerarquia');
			$("#newmod").focus();
			$("#newmod").select();
			break;
	}
});

$(document).on("click",".sjerarquia",function(){
	var tipo = $(this).attr('tipo');
	var ref = $(this).attr('ref');
	var nom = $(this).attr('nombre');
	var nombre = $("#new"+nom.substr(0,3)).val();
	var idref1 = $("#vid"+$(this).attr('ref1')+" option:selected").val();
	var idref2 = $("#vid"+$(this).attr('ref2')+" option:selected").val();
	// console.log("tipo: "+tipo+" ,nombre: "+nombre+" ,ref1: "+idref1+" ,ref2: "+idref2)
	var valj = valjerarquia(tipo);

	if (valj == false) {

		$("#err1").hide();
		$("#suc1").hide();

		if (ref == 0) {
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 24;
			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",0,0,@@usr,@@impresa';
			var p = mantenimiento('login',4,arr)[0][0];

			$("#new"+nom.substr(0,3)).hide(500);
			$("#vid"+nom).show(500);
			$("#vid"+nom).empty();
			var cargar = cargarSintax(nom);
			var tbl = mantenimiento('login',6,cargar);
			$("#vid"+nom).html(tbl);
			$("#vid"+nom).val(p).change();
			$(this).removeClass('sjerarquia');
			$(this).addClass('bjerarquia');
			$("#dbck"+tipo).hide(500);

		}else if(ref == 1){
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 24;
			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",'+idref1+',0,@@usr,@@impresa';
			var p = mantenimiento('login',4,arr)[0][0];

			$("#new"+nom.substr(0,3)).hide(500);
			$("#vid"+nom).show(500);
			$("#vid"+nom).empty();
			var cargar = cargarSintax(nom);
			var tbl = mantenimiento('login',6,cargar);
			$("#vid"+nom).html(tbl);
			$("#vid"+nom).val(p).change();
			$(this).removeClass('sjerarquia');
			$(this).addClass('bjerarquia');
			$("#dbck"+tipo).hide(500);

		}else{
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 24;
			arr['where'] = '1,'+tipo+',0,\"'+nombre+'\",'+idref1+','+idref2+',@@usr,@@impresa';
			var p = mantenimiento('login',4,arr)[0][0];

			$("#new"+nom.substr(0,3)).hide(500);
			$("#vid"+nom).show(500);
			
			$("#vid"+nom).empty();
			var cargar = cargarSintax(nom);
			var tbl = mantenimiento('login',6,cargar);
			$("#vid"+nom).html(tbl);
			$("#vid"+nom).val(p).change();
			$(this).removeClass('sjerarquia');
			$(this).addClass('bjerarquia');
			$("#dbck"+tipo).hide(500);

		}
	}else{
		$("#err1").show();
		$("#err1").html(valj);
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
	$("#accmodalProd").html('Agregar Producto');
	$("#addV").html('Agregar');
	
	deadclear('producto');

	setTimeout(function(){ $("#fproductos").find($("#vidfamilia")).focus(); }, 500);
	$("#ajaxProductos").html('');

	$("#vcantidad").val(0);
	$("#vminimo").val(0);
	$("#vmaximo").val(0);
	$("#vcosto").val('0.00');
	$("#vganancia").val('0.00');
	var arr = {};
	arr['sel'] = 'valor';
	arr['tbl'] = 51;
	arr['where'] = 'id = 1';

	var imv = mantenimiento('login',4,arr)[0][0];
	$("#vimv").val(imv);
	$("#vidmoneda").change();
});

$(document).on("change","#vidmoneda",function(){
	var id = $("option:selected",this).val();
	var arr = {};
	arr['sel'] = 'valor,simbolo';
	arr['tbl'] = 54;
	arr['where'] = 'id = '+id;
	var s = mantenimiento('login',4,arr)[0][0];
	$(".simbolo").text(s[1])
	$("#vmoneda").val(s[0])
	$(".calcvv").keyup();
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

$(document).on("click","#ingInvPqts",function(){
	
	$("#titpqt").html("Agregar Paquetes");
	var number = arr('login',4,'ifnull(max(id)+1,1)',58,'1','',0,'')[0][0];
	var codigo = addZero(number,4);
	$("#vcodigo").val('PCK-'+codigo);
	$('#prod').autoComplete({
	    minChars: 1,
	    source: function(term, response){
	        term = term.toLowerCase();
	        // var arr = {};
	        // arr['sel'] = 'concat(nombre," - ",sventa)';
	        // arr['tbl'] = 14;
	        // arr['where'] = '';
	        // msuggest = mantenimiento('login',4,arr)[0]; 
	        msuggest = arr('login',4,'nombreprecio',77,'nombre like \"%'+term+'%\"','',0,'')[0];
	        response(msuggest);
		}
	});
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

function totalizar(costo,ganancia) {
	var subtotal = 0;
	var impuestos = 0;
	
	$(".impuestos").each(function(){
		var id = $(this).attr('id').substr(4);
		impuestos += parseFloat($(this).val());
	});

	if (ganancia == 0) {
		subtotal = costo * ((impuestos / 100)+1);
	}else{
		subtotal = costo * ((impuestos / 100)+1) * ((ganancia / 100)+1);
	}

	$("#hventa").val(subtotal)
	$("#vventa").val(subtotal.formatMoney(2,'.',','));

}

function addprod(prod,cant) {
	var info = arr('login',4,'id,precio,nombreprecio',77,'nombre = \"'+prod+'\"','',0,'')[0][0];
	var desc = $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());
	var ptotal = info[1] * cant;
	var total = 0;
	var idprod = 0;
	var idserv = 0;
	
	if (info[2].substr(0,1) == '[') {
		idserv = info[0];
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

function filtrarprod(code,filtro){
	if (code == 13) {
		var arr = {};
		arr['sel'] = '';
		arr['tbl'] = 25;
		arr['where'] = '\"'+filtro+'\"';
		var p = mantenimiento('login',6,arr);
		var tabla = $("#data-table-productos").DataTable();
	    tabla.destroy();
		$("#listaproductos").html(p);
		$("#data-table-productos").DataTable({
	        bFilter :  false,
        	bLengthChange : false
	    });
	}
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

	if ($("#vidtipo").val() == 0) {
		$("#tb1").click()
		$("#vidtipo").focus();
		return "Tipo Requerido"
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
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,costo as vcosto,ganancia as vganancia,venta as vventa,imv as vimv,idunidad as vidunidad,isgravado as visgravado,idmoneda as vidmoneda,idfamilia as vidfamilia,idtipo as vidtipo,idmarca as vidmarca,idmodelo as vidmodelo,SUBSTRING_INDEX(cantidad,".",1) as vcantidad,minimo as vminimo,maximo as vmaximo';
			vmodulo['tbl'] = 14;
			vmodulo['where'] ='id = '+vid;
			break;

		case 'servicio':
			vmodulo['sel'] = 'id as vid,nombre as vnombre,descripcion as vdescripcion,pbase as vpbase,periodo as vperiodo,idproveedor as vidproveedor,pcompra as vpcompra,pganancia as vpganancia,idmoneda as vidmoneda';
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
			arr['sel'] = 'id,codigo,nombre,scosto,sventa,ganancia';
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