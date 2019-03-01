// var variables = [];

$(function () {
	config = getDatos('',42,'@@impresa',0,0)[0][0];

	$(".menu3").click(function () {
		var id = $(this).attr('id').substr(1);
		$(".menu3").removeClass('active');
		$(this).addClass('active');

		switch (parseInt(id)) {
			case 1:
				$("#mantServ").remove();
				$("#mantPaquetes").remove();
				var p = mantenimiento('productos', 1, '');
				$("#bdymantInventario").html(p);

				$("#boletaes").click(function(){
					$("#modal-esinventario").modal('open')
					$("#bpes").focus();
				});

				$("#boletainv").click(function(){
					var boleta = getDatos('',273,'1,0,@@usr,@@impresa,'+$("[name=mov]:checked").val()+','+$("#bod1").val()+','+$("#bod2").val()+',"'+$("#bol-comen").val()+'"',0,0,0);
					
					if(boleta.succed){
						boleta = boleta[0][0][0];
						var detbol;
						$(".mciclos").each(function(){
							detbol = getDatos('',274,'1,0,'+boleta+','+$(this).attr('idp')+','+$(this).find(".cdetbol").val()+',0',0,0,0);
						});
						$("#bol-comen").val('');
						$("#bes").html('');
						$("#bpes").focus();
						Materialize.toast('Boleta Ingresada Correctamente',4000,'green');
						window.open('productos?accion=4&id='+boleta+"&tp="+$("#p_v").is(':checked'));
					}else
						Materialize.toast(boleta['ERROR'],4000,'red');
					
				});

				$("[name=mov]").change(function(){
					if(parseInt($(this).val()) == 3)
						$(".bd2").removeClass('hide')
					else
						$(".bd2").addClass('hide')
				});

				if (config[5] == 1){
			        $("#p_v").attr('checked',true);
			    }else{
			        $("#p_v").attr('checked',false);
			    }

				$("#data-table-productos").DataTable({
					bFilter: false,
					bScrollInfinite: true,
					bSort: false,
					bLengthChange: false,
					order: [],
					bPaginate: false,
					info: false
				});
				$("#fproductos .zelda").data('triforce',{vid:0,vidmarca:0,vidfamilia:0,vidtipo:0,visinventariado:1,vidusuario:'',vidsucursal:'',visvariable:0,visgravamen:0})

				if($("#goldinventariado").length)
                    $("#fproductos .zelda").attr('inventariado',1);

				break;
			case 2:
				$("#mantProd").remove();
				$("#mantPaquetes").remove();
				var p = mantenimiento('productos', 2, '');
				$("#bdymantInventario").html(p);
				$("#data-table-servicios").dataTable({
					bFilter: false,
					bScrollInfinite: true,
					bSort: false,
					bLengthChange: false,
					order: [],
					bPaginate: false,
					info: false
				});
				$("#prove").hide();
				$(".ganServ").hide();
				$("#opOtro").hide();
				$("#fservicios .zelda").data('triforce',{vid:0,vidsucursal:'',vidusuario:'',vpganancia:0,vexento:100,vperiodo:0,vdias:0})
				break;
			case 3:
				$("#mantServ").remove();
				$("#mantProd").remove();
				var p = mantenimiento('productos', 3, '');
				$("#bdymantInventario").html(p);
				$("#data-table-paquetes").DataTable({
					bFilter: false,
					bScrollInfinite: true,
					bSort: false,
					bLengthChange: false,
					order: [],
					bPaginate: false,
					info: false
				});
				$("#fpaquetes .zelda").data('triforce',{vid:0,vidsucursal:'',vidusuario:''})
				break;
		}
		paginate($("ul.pagination").attr('vtbl'));
		$('select').material_select();
		$('.dropdown-button').dropdown();
		$('.modal').modal({
			dismissible: true, // Modal can be dismissed by clicking outside of the modal
			opacity: .5, // Opacity of modal background
			in_duration: 300, // Transition in duration
			out_duration: 100, // Transition out duration
			startingTop: '4%', // Starting top style attribute
			endingTop: '4%' // Ending top style attribute
		});
		$('ul.tabs').tabs();
		$('.tooltipped').tooltip({delay: 50});
		$("#vidmoneda").change(function(){
	        cargarMoneda($('option:selected',this).val());

	        if((parseInt($(this).val()) == 1 || $("#agProd").hasClass('add'))){
	        	$("#costodivisa").addClass('hide');
	        	$("#icosto").removeClass('pbtn').removeClass('change_moneda');
	        	$("#icosto").val('¢');
	        	$("#cdivisa").prop('checked',false).change();
	        }
	        else{
	        	$("#costodivisa").removeClass('hide');
	        	$("#icosto").addClass('pbtn').addClass('change_moneda');
	        	$("#cdivisa").prop('checked',false).change();
	        }

	        $("#vdivisa").val($('option:selected',this).attr('dv'))
	    });
		cargarMoneda(0);

		$(".autocomplete").blur(function(){ 
	        $(".autocomplete-content").hide('500'); 
	    });
	});

	var pr = getParameterByName("pr"); //accesos
	var sr = getParameterByName("sr");
	var pq = getParameterByName("pq");
	var addpr = getParameterByName("addpr");
	var addsr = getParameterByName("addsr");
	var addpq = getParameterByName("addpq");

	if (pr) {
		$("#m1").click();
	} else if (sr) {
		$("#m2").click();
	} else if (pq) {
		$("#m3").click();
	} else if (addpr) {
		$("#m1").click();
		$("#agProd").click();
	} else if (addsr) {
		$("#m2").click();
		$("#addservice").click();
	} else if (addpq) {
		$("#m3").click();
		$("#addpackage").click();
	} else
		$("#m1").click();

	$("#pg").change(function(){
		if ($(this).is(":checked")) {
			$("#vexoneracion").val(13).removeAttr('readonly')
		}else
			$("#vexoneracion").val(0).attr('readonly',true)
	});
	
	permisos(4100,4200);
});

$(document).on("click",".change_moneda",function(e){
	if($(this).val() == '$')
		$(this).val('¢')
	else
		$(this).val('$')
});

$(document).on("keydown","#prodher",function(e){
	var nom = $(this).val();
	var charCode = e.which || e.keyCode;
    var charStr = keysight(e);
    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        $(".autocomplete-content").remove();
        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'nombre,null',11,'id > 0 and nombre like "%'+busqueda+'%" and find_in_set(idsucursal,concat("-1,",@@impresa))',0,0,0,1)
        })
        $(this).siblings($(".autocomplete-content")).css('width','100%');
    }else if (charCode == 13) {
    	$(this).blur();
    }
});

$(document).on("keydown","#bpes",function(e){
	var charCode = e.which || e.keyCode;
    var charStr = keysight(e);

    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        $(".autocomplete-content").remove();
        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'nombre,null',11,'id > 0 and nombre like "%'+busqueda+'%" and find_in_set(idsucursal,concat("-1,",@@impresa))',0,0,0,1)
        })
        $(this).siblings($(".autocomplete-content")).css('width','100%');
    }
});

$(document).on("keyup","#bpes",function(e){
	var code = e.which || e.keyCode
	if (code == 13) {
		$(this).blur();
	}
});


$(document).on("blur","#bpes",function(){
	if($(this).val().trim().length){
		var id = arr('login',4,'id',11,'(nombre = "'+$("#bpes").val()+'" or codigo = "'+$("#bpes").val()+'") and id > 0 and idsucursal in(-1,@@impresa) limit 1',0,0,0)[0][0];

		if (id != undefined){
		    $("#bpes").attr('idp',id);
		    var cinv = getDatos('if(count(cantidad),truncate(cantidad,2),"N")',97,'idproducto = '+id+' and idinventario = '+$("#bod1").val(),0,0,0);
		    console.log(cinv)
		    if(parseInt(cinv[0][0][0]) == -1){
		    	Materialize.toast('Producto no Existente en el Inventario',4000,'red');
				$("#bpes").focus().select();
		    	return false;
		    }
		    $("#cesin").html(cinv[0][0][0])
		    $("#cpes").focus().select();
		}
		else{
			Materialize.toast('Producto no Existente',4000,'red');
			$("#bpes").focus().select();
		    $("#bpes").attr('idp',0);
		}
	}else
		$(".autocomplete-content").remove();
});

$(document).on("keyup","#cpes",function(e){
	var code = e.which ||  e.keyCode
	if (code == 13) {
		$("#addline").click();
	}
});

$(document).on("click","#addline",function(e){
	var cina = parseFloat($("#cesin").html().replace(/,/g,''));
	var cant = $("#cpes").val().replace(/,/g,'');
	cant = isNaN(cant) ? 0 : parseFloat(cant);
	var id = parseFloat($("#bpes").attr('idp'));

	if (id <= 0) {
		Materialize.toast('Producto Requerido',4000,'red');
		$("#bpes").focus().select();
		return false
	}

	if (cant <= 0) {
		Materialize.toast('Cantidad debe ser Mayor a 0',4000,'red');
		$("#cpes").focus().select();
		return false
	}

	$("#bes").append('<tr class="mciclos" idp="'+id+'"><td style="padding: 0px">'+$("#bpes").val()+'</td><td style="padding: 0px"><input type="number" class="cdetbol browser-default" value="'+cant+'" style="border:0px;height: auto !important;"></td><td style="padding: 0px"><i class="mdi mdi-delete mdel"></i</td></tr>');

	$("#bpes").val('').attr('idp',0).focus();
	$("#cpes").val(0);
	$("#cesin").html('0.00')

})

$(document).on("change","#visheredado",function(){
	if ($(this).is(":checked")) {
		$("#prodher").removeAttr('disabled');
	}else{
		$("#prodher").attr('disabled',true);
		$("#prodher").val('');
	}
});

$(document).on("blur","#prodher",function(){
	var idheredado = arr('login',4,'id,idunidad',11,'nombre like "%'+$(this).val()+'%"',0,0,0)[0][0];
	$("#vidheredado").val(idheredado[0]);
	$("#vinvheredado").val(idheredado[1]);
	// if ($("#vidunidad").val() != idheredado[1]) {
		$(".equivalente").removeClass('hide');
		var uni = arr('login',4,'upper(nombre)',107,'id = '+idheredado[1],0,0,0)[0][0];
		$("#ud_equiv").text(uni);
	// }else{
	// 	$(".equivalente").addClass('hide');
	// }

});

$(document).on("click", ".delvar", function () {
	var id = $(this).attr('id').substr(1);
	$("#dv" + id).remove();
});

$(document).on("keyup", "#nom", function (e) {
	var code = e.which || e.keyCode;
	if (code == 13)
		$("#val").focus();
});

$(document).on("keyup", "#val", function (e) {
	var code = e.which || e.keyCode;
	if (code == 13) {
		var nom = $("#nom").val();
		var val = $(this).val();
		addfeat(nom, val)
	}
});

$(document).on("keyup", ".formprod", function (e) {
	var code = e.which || e.keyCode;
	var mod = $(this).attr('focus').substr(0, 1);
	var filtro = $(this).attr('focus').substr(1);
	if (code == 13) {
		$("#tb" + mod).click();
		if ($("#" + filtro).is('input'))
			$("#" + filtro).select().focus();
		else
			$("#" + filtro).prevAll('input.select-dropdown').trigger('open').focus();
	}

});

$(document).on("keyup", ".ffeat", function (e) {
	var code = e.which || e.keyCode;
});

$(document).on("change", ".chg", function () {
	if (!$(this).is(':checked')) {
		$(".chg0").addClass('hide');
		$(".chg1").removeClass('hide');
	} else {
		$(".chg1").addClass('hide');
		$(".chg0").removeClass('hide');
	}

});

$(document).on("keydown", "[id^=vcliente]", function (e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		var id = $(this).attr('id').substr(8);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {

			$(".autocomplete-content").remove();
			$("#vcliente" + id).autocomplete({
				limit: 10,
				data:arr('login', 4, 'concat(nombre," ",apellido1," ",apellido2," [",replace(cedula,"-",""),"]") as nom ,null', 2, ' id > 0 and !bisproveedor having nom like "%'+$(this).val()+'%" limit 10', 0, 0, 0, 1)
			});
			$("#vcliente" + id).siblings($(".autocomplete-content")).css('width', '25%');
		}
	}
});

$(document).on("keyup", "[id^=vcliente]", function (e) {
	var code = e.which || e.keyCode;
	var id = $(this).attr('id').substr(8);
	if (code == 13)
		$("#vgganancia" + id).select();
});

$(document).on("focus", "[id^=vcliente]", function () {
	var id = $(this).attr('id').substr(8);
	$("#vidcliente" + id).val(0);
});

$(document).on("blur", "[id^=vcliente]", function () {
	var nombre = $(this).val();
	var id = $(this).attr('id').substr(8);
	if (nombre != '') {
		var idc = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2," [",replace(cedula,"-",""),"]") like "%'+nombre+'%"',0,0,0)[0][0][0];

		$(".vidcliente").each(function () {
			var idcli = $(this).val();
			if (idcli == idc) {
				Materialize.toast('Cliente ' + nombre + ' ya se encuentra en la lista', 6000, 'red');
			}
		});
		$("#vidcliente" + id).val(idc);
	}
});

$(document).on("keyup","[id^=vexoneracion]",function(e){
    var code  = e.which || e.keyCode;
    if (code == 13) {
        if ($(this).attr('nc') != undefined) {
            $(".precclienete").append(addlineCliente());
            $("#vcliente"+$(".chg1").length).focus();
        }
    }

});

$(document).on("click", ".cl", function () {
	var idf = $(this).parent().parent().parent();
	if (idf.attr('idf') == 0)
		idf.remove()
	else{
		idf.addClass('hide');
		idf.attr('accion','3');
	}
});

$(document).on("click", ".optns", function () {
	var tipo = $(this).attr('tipo');
	$("#search_productos").attr('var', tipo);
	$("label[for=search_productos]").text('Buscar Producto por ' + $(this).text());
});

$(document).on("keyup", "#vpeso", function (e) {
	var code = e.which || e.keyCode;
	if (code == 13) {
		$("#vnombre").focus();
	}
});

$(document).on("change","#vidunidad",function(){
	var id = $(this).val();
	if (id != 1 && id != '') {
		$("#dpeso").removeClass('hide');
		setTimeout(function(){$("#vpeso").focus();},100);
	}else{
		$("#vpeso").val(0);
		$("#dpeso").addClass('hide');
		setTimeout(function(){$("#vnombre").focus();},100);
	}
	
	// if ($("#vinvheredado").val() != $(this).val()) {
		$(".equivalente").removeClass('hide');
		var uni = arr('login',4,'nombre',107,'id = '+$("#vinvheredado").val(),0,0,0)[0][0];
		$("#ud_equiv").text(uni);
	// }else{
		// $(".equivalente").addClass('hide');
	// }
});

$(document).on("blur","#vfamilia",function() {
	var nombre = $(this).val();
	var idfamilia = arr('login',4,'id',20,'nombre = "'+nombre+'"',0,0,0)[0][0];
	
	if (idfamilia != undefined){
		$("#fproductos .zelda").data('triforce')["vidfamilia"] = idfamilia[0];
	}
	else{
		$("#fproductos .zelda").data('triforce')["vidfamilia"] = 0;
		$("#fproductos .zelda").data('triforce')["vidtipo"] = 0;
		$("#fproductos .zelda").data('triforce')["vidmarca"] = 0;
	}
});

$(document).on("blur","#vtipo",function() {
	var nombre = $(this).val();
	var idtipo = arr('login',4,'id',21,'nombre = "'+nombre+'" and idfamilia = '+$("#fproductos .zelda").data('triforce')["vidfamilia"],0,0,0)[0][0];
	if (idtipo != undefined)
		$("#fproductos .zelda").data('triforce')["vidtipo"] = idtipo[0];
	else{
		$("#fproductos .zelda").data('triforce')["vidtipo"] = 0;
		$("#fproductos .zelda").data('triforce')["vidmarca"] = 0;
	}
});

$(document).on("blur","#vmarca",function() {
	var nombre = $(this).val();
	var idmarca = arr('login',4,'id',22,'nombre = "'+nombre+'" and idtipo = '+$("#fproductos .zelda").data('triforce')["vidtipo"],0,0,0)[0][0];
	if (idmarca != undefined)
		$("#fproductos .zelda").data('triforce')["vidmarca"] = idmarca[0];
	else{
		$("#fproductos .zelda").data('triforce')["vidmarca"] = 0;
	}

});

$(document).on("keyup","#vfamilia",function(e) {
	var charCode = e.which || e.keyCode;
	if (charCode == 13)
		$("#vtipo").focus();
});

$(document).on("keydown","#vfamilia",function(e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();
			$("#vfamilia").autocomplete({
				limit: 10,
				data: arr('login',4,'nombre,null',20,'nombre like "%'+$("#vfamilia").val()+'%" and idsucursal = @@impresa limit 10',0,0,0,1)
			});
			$("#vfamilia").siblings($(".autocomplete-content")).css('width','25%');
		}
	}
});

$(document).on("keyup","#vtipo",function(e) {
	var charCode = e.which || e.keyCode;
	if (charCode == 13)
		$("#vmarca").focus();
});

$(document).on("keydown", "#vtipo", function (e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();
			$("#vtipo").autocomplete({
				limit: 10,
				data: arr('login', 4, 'nombre,null', 21, 'idfamilia = ' + $("#fproductos .zelda").data('triforce')["vidfamilia"] + ' and nombre like \"%' + $("#vtipo").val() + '%\" and idsucursal = @@impresa limit 10', 0, 0, 0, 1)
			});
			$("#vtipo").siblings($(".autocomplete-content")).css('width', '25%');
		}
	}
});

$(document).on("keyup", "#vmarca", function (e) {
	var charCode = e.which || e.keyCode;
	if (charCode == 13)
		$("#vnombre").focus()
});

$(document).on("keydown", "#vmarca", function (e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);

		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();

			$("#vmarca").autocomplete({
				limit: 10,
				data: arr('login', 4, 'nombre,null', 22, 'idtipo = ' + $("#fproductos .zelda").data('triforce')["vidtipo"] + ' and nombre like \"%' + $("#vmarca").val() + '%\" and idsucursal = @@impresa limit 10', 0, 0, 0, 1)
			});

			$("#vmarca").siblings($(".autocomplete-content")).css('width', '25%');
		}
	}

});

$(document).on("click", ".menuP", function () {
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuP").removeClass('active');
	$(this).addClass('active');
	switch (id) {
		case 1:
			$("#financiero").addClass('hide');
			$("#dimpuestos").addClass('hide');
			$("#datosproductos").removeClass('hide');
			$("#features").addClass('hide');
			// $("#modal-productos").css('width','70%');
			break;
		case 2:
			$("#datosproductos").addClass('hide');
			$("#dimpuestos").addClass('hide');
			$("#financiero").removeClass('hide');
			$("#features").addClass('hide');
			$("#vcosto").select();
			// $("#modal-productos").css('width','70%');
			break;
		case 3:
			$("#datosproductos").addClass('hide');
			$("#financiero").addClass('hide');
			$("#dimpuestos").removeClass('hide');
			$("#features").addClass('hide');
			arr('login', 6, '*', 51, 'id > 0', 48, 1, $("#imp"));
			$('select').material_select();
			// $("#modal-productos").css('width','70%');
			break;
		case 4:
			$("#datosproductos").addClass('hide');
			$("#financiero").addClass('hide');
			$("#dimpuestos").addClass('hide');
			$("#features").removeClass('hide');
			// $("#modal-productos").css('width','80%');
			break;
	}
});

$(document).on("click", ".minvent", function () {
	var id = parseInt($(this).attr('id').substr(2));
	$(".minvent").removeClass('active');
	$(this).addClass('active');
	switch (id) {
		case 1:
			$("#ininvent").removeClass('hide');
			$("#outinvent").addClass('hide');
			$("#movinvent").addClass('hide');
			$("#spot").val(id)
			break;
		case 2:
			$("#outinvent").removeClass('hide');
			$("#ininvent").addClass('hide');
			$("#movinvent").addClass('hide');
			$("#spot").val(id)
			break;
		case 3:
			$("#movinvent").removeClass('hide');
			$("#ininvent").addClass('hide');
			$("#outinvent").addClass('hide');
			$("#spot").val(id)
			break;
	}
});

$(document).on("click", ".menuS", function () {
	var id = parseInt($(this).attr('id').substr(2));
	$(".menuS").removeClass('active');
	$(this).addClass('active');
	switch (id) {
		case 1:
			$("#datosservicios").removeClass('hide');
			$("#financiero").addClass('hide');
			$("#vcodigo").focus();
			break;
		case 2:
			$("#financiero").removeClass('hide');
			$("#datosservicios").addClass('hide');
			break;
	}
});


$(document).on("click", ".vfiltros", function () {
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#phs");
	switch (id) {
		case 1:
			$("#fgrande").attr('filter', id);
			elemento.text('Buscar por ' + $(this).html())
			break;
		case 2:
			$("#fgrande").attr('filter', id);
			elemento.text('Buscar por ' + $(this).html())
			break;
	}
});

$(document).on("click", ".filtropqt", function () {
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#lpq");
	switch (id) {
		case 1:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar por ' + $(this).html());
			break;
		case 2:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar por ' + $(this).html());
			break;
		case 3:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar ' + $(this).html());
			break;
		case 4:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar ' + $(this).html());
			break;
		case 5:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar ' + $(this).html());
			break;
		case 6:
			$("#fpqt").attr('filter', id);
			elemento.attr('placeholder', 'Buscar ' + $(this).html());
			break;
	}
});

$(document).on("click", ".info", function () {
	var id = $(this).attr('id').substr(4);
	var prod = arr('login', 4, 'nombre', 11, 'id = ' + id, 0, 0, 0)[0][0];
	var char = arr('login',4,'count(id)',193,'idproducto = ' + id,0,0,0)[0][0];
	if (char != 0) {
		$("#modal-info2").modal('open');
		$("#dprd").text(prod);
		arr('login', 6, 'nombre,valor', 193, 'id > 0 and idproducto = ' + id, 0, 1, $("#listainfo"))
	}else{
		Materialize.toast('No se encuentra caracteristicas relacionadas con este producto', 3000, 'red');
	}
	
});

$(document).on("click", "#addfeat", function () {
	var nombre = $("#nom").val();
	var val = $("#val").val();
	addfeat(nombre, val);
});

$(document).on("click", ".editprod", function () {
	$(".autocomplete-content").hide();
	$(".calcvv").val('0.00');
	var id = $(this).attr('id').substr(1);

	var p = arr('login',4,'',14,id+',0,",@@impresa","0,1"',0,0,0);
	var q = p[0][0];
	var preccat = arr('login',4,'',110,id,0,0,0)[0];
	var preccli = arr('login',4,'',165,id,0,0,0)[0];

	$("#listavariables").html('');
	var car = arr('login', 6, 'id,nombre,valor', 193, 'id > 0 and idproducto = ' + id, 194, 1, $("#listavariables"))[0];
	$(".accmodal").html("Actualizar Producto " + q[5]);
	$("#editprod").removeClass('hide');
	$("#editprod").attr('idprod', id);
	$("#impuestos").removeClass('hide');
	$("#vidfamilia").val(q[24]);
	$("#vfamilia").val(q[25]);
	$("#vidtipo").val(q[26]);
	$("#vtipo").val(q[27]);
	$("#vidmarca").val(q[28]);
	$("#vmarca").val(q[29]);
	$("#vpeso").val(q[18])
	$("#vidunidad").val(q[15]);
	$("#vidunidad").material_select();
	$("#vidinventario").val(q[30]);
	if ($("#vidinventario").attr('type') == 'select')
		$("#vidinventario").material_select();
	$("#vnombre").val(q[3]);
	$("#vcodigo").val(q[1]);
	$("#vcodigointerno").val(q[2])
	$("#vminimo").val(q[19]);
	$("#vmaximo").val(q[20]);
	$("#vmaxdescuento").val(q[22]);
	$("#vcosto").val(q[5]);
	$("#hvcosto").val(q[4]);
	$("#vgganancia").val( ((parseFloat(q[8])*100)/parseFloat($("#vcosto").val().replace(/,/g,''))).toFixed(2) );
	$("#vventa").val(q[11]);
	$("#hventa").val(q[10]);
	$("#vexoneracion").val(q[13]);

	$("#impuestos").html('');
	$(".chg1").html('');
	arr('login', 6, '', 153, id, 0, 1, $("#impuestos"))
	$("#impuestos").removeClass('hide');
	for (var i = 0; i < preccat.length; i++) {
		$("#vgganancia" + preccat[i][0]).val(preccat[i][1]);
		$("#vventa" + preccat[i][0]).val(preccat[i][2]);
		$("#vexoneracion" + preccat[i][0]).val(preccat[i][3]);
	}
	if (preccli != '') {
		for (var i = 0; i < preccli.length; i++) {
			$(".precclienete").append(addlineCliente(preccli[i]));
		}
	} else {
		$(".precclienete").append(addlineCliente());
	}
	$("#vcosto").blur();
	Materialize.updateTextFields();
});

$(document).on("click",".descuentos",function() {
	var id = $(this).attr('id').substr(4);
	var prod = arr('login', 4, 'nombre', 11, 'id = ' + id, '', 0, '')[0];
	$(".dprod").text(prod);
	var desc = arr('login',4,'',152,id,0,0,0);
	if (desc[0][0] != undefined) {
		arr('login',6,'',152,id,0,1,$("#listadescuentos"));
	} else {
		$("#listadescuentos").html('<span style="font-size: 1.5em;">No se encuentran descuentos asociados a este producto</span>')
	}
});

$(document).on("click", ".delprod", function () {
	var id = $(this).attr('id').substr(1);
	Materialize.toast('Desea Borrar este Producto?&nbsp;&nbsp;&nbsp;<button type="button" class="waves-effect waves-light btn btn2 accept" id="acc' + id + '"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn btn1 cancel"><i class="mdi mdi-window-close"></i></button>', 10000);
});

$(document).on("click", ".accept", function () {
	var id = $(this).attr('id').substr(3);
	arr('login',4,'',78,'3,'+id+',"","","",0,0,0,0,0,0,0,0,0,0,0,@@usr,0,@@impresa,""','',0,'');
	arr('login',6,'',14,'0,0,",@@impresa","0,10"',0,1,$("#listaproductos"));
	paginate(14);
	$('#toast-container').remove();
	Materialize.toast('Producto Eliminado Correctamente', 6000, 'red');
});

$(document).on("click", ".cancel", function () {
	$('#toast-container').remove();
});

$(document).on("keyup", "#prod", function (e) {
	// $(".autocomplete-content").show('500');
	var code = e.which || e.keyCode;
	if ($(this).val() != '') {
		if (code == 13) {
			var nombre = $("#prod").val();
			var unidad = 0;
			
			identify = nombre.substring(1,0);
			if (identify != '[') {
				unidad = arr('login',4,'idunidad',11,'id > 0 and nombre = "'+nombre+'"',0,0,0)[0][0];
			    nombre = nombre.substring(0, nombre.indexOf(' - '));
			}else{
				unidad = -1;
			    nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
			}
			
			if (unidad != 1 && unidad != -1) {
				$(".tduni").removeClass('hide');
			}else{
				$(".tduni").addClass('hide');
			}
			$("#cantidad").focus();
		}
	}
});

$(document).on("keydown","#prod",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#prod").autocomplete({
                limit: 10,
                data: arr('login',4,'',77,'0,0,1,"'+$("#prod").val()+'",@@impresa',0,0,0,1)
            }); 
        $("#prod").siblings($(".autocomplete-content")).css('width','25%');
    } 
});

$(document).on("blur","#prod",function(){
    var nombre = $(this).val();
    var id = 0;
    identify = nombre.substring(1,0);

    if (identify != '[') {
        nombre = nombre.substring(0, nombre.indexOf(' - '));
        id = arr('login',4,'id',11,'id > 0 and nombre = "'+nombre+'"',0,0,0)[0][0];
    }else{
        nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
        id = arr('login',4,'concat("-",id)',16,'id > 0 and nombre = "'+nombre+'"',0,0,0)[0][0];
    }
    $("#hprod").val(nombre);
    if (id != undefined)
    	$("#hprod").attr('identify',id);
    else
    	$("#hprod").attr('identify',0);
    
    
    
});

$(document).on("click","#porfact",function(){
	if ($("#vpfactura:visible").length) {
		$(".vpfactura").addClass('hide');
		$(".precio").removeClass('hide');
		$(".noextra").prop('checked',false)
		$(".noextra").removeAttr('disabled');
		$("#vpfactura").val(0)
	}else{
		$(".vpfactura").removeClass('hide');
		$(".precio").addClass('hide')
		$("#vprecio").val(0);
		$(".noextra").prop('checked',false)
		$(".noextra").attr('disabled','true')
		$("#vpfactura").focus().select();
	}	
});


$(document).on("click","#bProd",function(){
    if ($("#prod").val() != '' && $("#cantidad").val() != '') {
        var prod = $("#hprod").val();
        var cant = $("#cantidad").val();
        var uni = $("#pqtunidad").val();
        var sim = $("#pqtunidad option:selected").attr('simbolo');
        addprod(prod,cant,uni,sim)
    }
});

$(document).on("keyup","#cantidad",function(e){
    if ($(this).val() != '') {
        var prod = $("#hprod").val();
        var cant = $(this).val();
        var unidad = 1; //unidad select
        var code = e.which || e.keyCode;
        if (code == 13)
            addprod(prod,cant,unidad);
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
        var precio = parseFloat($("#htot"+pid).val());
        subtot += precio;
    });

    total = subtot / ((desc / 100)+1);
    $("#htotal").val(subtot);
    $("#totpqt").val(total.formatMoney(2,',','.'));
});

$(document).on("keyup","#vdescuento",function(){
    var total = 0;
    var desc = $(this).val() == '' ? 0 : $(this).val();
    var totpqt = parseFloat($("#htotal").val());
    total = totpqt / ((desc/100)+1);
    $("#totpqt").val(total.formatMoney(2,'.',','));
});

$(document).on("click","#addpqt",function(){
    var valpqt = validarpaquete();
    if (valpqt == false) {
        var descuento = $("#vdescuento").val() == '' ? 0 : $("#vdescuento").val();
        var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
        var invent = $("#invpqt").val();
        var idpaquete = arr('login',4,'',60,'1,0,\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+','+invent+',1,@@usr,@@impresa',0,0,0);
        if (idpaquete[0][0] != undefined) {
            $(".nomprod").each(function(){
                var id = $(this).attr('id').substr(1);
                var idproducto = $(this).attr('idproducto');
                var idservicio = $(this).attr('idservicio');
                var cantidad = parseFloat($("#c"+id).text());
                var idunidad = $("#u"+id).attr('idunidad');
                arr('login',4,'',61,'1,'+idpaquete[0][0]+','+idproducto+','+idservicio+','+cantidad+','+idunidad+',@@usr,@@impresa',0,0,0);
            });
            Materialize.toast('Paquete Agregado Correctamente', 6000, "green");
            arr('login',6,'',62,'0,0,"0,@@impresa","0,10"',0,1,$("#listapqts"));
            vaciar('paquetes');
            $("#listapaquetes").html('');
            $(".validate").css('border-bottom', '1px solid #9e9e9e');
            $(".validate").css('box-shadow', 'none');
        }else{
            Materialize.toast(idpaquete[0]['ERROR'], 6000, "red");
        }
    }else{
        Materialize.toast(valpqt, 6000, "red");
    }
});

$(document).on("click",".loadpck",function(){
    $("#titpqt").html('EDITAR PAQUETE')
    var id = $(this).attr('id').substr(1);
    var p = arr('login',4,'',62,id+',0',0,0,0)[0][0];
    $("#vid").val(p[0])
    $("#vnombre").val(p[2]);
    $("#vcodigo").val(p[1]);
    $("#vdescuento").val(p[5]);
    $("#htotal").val(p[6]);
    $("#totpqt").val(p[6]);
    $('select').material_select();
    Materialize.updateTextFields();
    $("#addpqt").attr('id','editpck');
    $("#editpck").html('Guardar');
    arr('login',6,'',62,id+',1',76,1,$("#listapaquetes"));
    setTimeout(function(){$("#prod").focus()},500);
});

$(document).on("click","#editpck",function(){
    var valpqt = validarpaquete();
    if (valpqt == false) {
        var id = $("#vid").val();
        var descuento = $("#vdescuento").val();
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
            arr('login',6,'',62,'0,0',0,1,$("#listapqts"));
            vaciar('paquetes');
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

$(document).on("click",".delpck",function(){
    var id = $(this).attr('id').substr(1);
    var paq = arr('login',4,'',60,'3,'+id+',"","",0,0,1,@@usr,@@impresa',0,0,0);
  
    arr('login',4,'',61,'3,'+id+',0,0,0,0,@@usr,@@impresa',0,0,0);
    Materialize.toast('Paquete Eliminado Correctamente', 6000, 'green');
    arr('login',6,'',62,'0,0',0,1,$("#listapqts"));
    // arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre',0,1,$("#listapqts"));
});

$(document).on("change","#vtipoinv",function(){
    var tipoinv = $("#vtipoinv option:selected").val();
});

$(document).on("click",".salidainv",function(){
    var id = $(this).attr('id').substr(1);
    var bod = arr('login',4,'*',41,'idsucursal in(@@impresa, -1)',0,0,0)[0];
    var p = arr('login',4,'',410,id+',0',0,0,0)[0][0];
    var cant = arr('login',4,'format(sum(cantidad),2)',97,'1',0,0,0)[0][0];
    $("#cantinv").text(cant);
    $("#inidbodega").val(0);
    $("#idinventario").val(0);
    $("#prcant").val('');
    $("#vcomentario").val('');
    $("#idprd").val(id);0
    $("#nomprod").text(p[0]);
    $("#prodcant").text(p[1])
    $("#inidbodega").text('');
    $("[for=vincantidad]").html('Cantidad Entrante ('+p[2]+')');
    $("#outidbodega").text('');
    $("#destidbodega").text('');
    $("#movidbodega").text('');
    $("#didbodega").text('');
    $("#inidbodega").append('<option value="0">Seleccione una bodega</option>');
    $("#outidbodega").append('<option value="0">Seleccione una bodega</option>');
    $("#destidbodega").append('<option value="0">Seleccione una bodega</option>');
    $("#movidbodega").append('<option value="0">Seleccione una bodega</option>');
	$("#didbodega").append('<option value="0">Seleccione una bodega</option>');

    for (var i = 0, len = bod.length; i < len; i++) {
    	$("#inidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#outidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#destidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#movidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#didbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
    };
    $('select').material_select();
    $("#mv1").click();
});

$(document).on("click","#actinv",function(){
    var spot = parseInt($("#spot").val());

    var elem = '';
    var vtbl = 0;
    var vacc = 0;
    var newinv = 0;
    var cantidad = 0;
    if (spot == 1) {
        elem = 'in';
        vacc = 2;
        cantidad = $("#v"+elem+"cantidad").val();
    }else if (spot == 2) {
        elem = 'out';
        vacc = 3;
        cantidad = $("#v"+elem+"cantidad").val();
    }else{
        elem = 'mov';
        newinv = $("#didinventario").val();
        vacc = 4;
        cantidad = $("#v"+elem+"cantidad").val();
    }
    var idprod = $("#idprd").val();
    var idinv = $("#"+elem+"idinventario").val();
    var comentario = $("#v"+elem+"comentario").val();
    var validar = validarMovimiento(elem);

    if (validar == false){
        var mov = arr('login',4,'',114,vacc+","+idprod+","+idinv+","+newinv+","+cantidad+",\""+comentario+"\",@@usr,@@impresa",0,0,0);
        console.log(mov);
        mov = mov[0][0];
        var max = arr('login',4,'maximo',11,'id = '+idprod,0,0,0)[0][0];
        if (parseFloat(mov[0]) > parseFloat(max)) {
            Materialize.toast('Alerta: Producto está sobre el maximo de cantidad', 6000, 'amber lighten-2');
        }else{
            Materialize.toast('Entrada Realizada Correctamente', 6000, 'green');
        }
        $("#prodcant").text(mov[0])
        // window.open('productos?accion=4&id='+mov[1]);
        //clearform
        switch (parseInt(spot)) {
        	case 1:
        	case 2:
        		$("#"+elem+"idbodega").val(0);
        		$("#"+elem+"idinventario").val(0);
        		$("#v"+elem+"cantidad").val(0);
        		$("#v"+elem+"comentario").val('');
        		$("select").material_select();
        		$(".validate").css('border-bottom', '1px solid #9e9e9e');
        		$(".validate").css('box-shadow', 'none');
        		break;
        	case 3:
        		$("#"+elem+"idbodega").val(0);
        		$("#didbodega").val(0);
        		$("#"+elem+"idinventario").val(0);
        		$("#didinventario").val(0);
        		$("#v"+elem+"cantidad").val(0);
        		$("#v"+elem+"comentario").val('');
        		$("select").material_select();
        		$(".validate").css('border-bottom', '1px solid #9e9e9e');
        		$(".validate").css('box-shadow', 'none');
        		break;
        	default:
        		break;
        }
        //clearform
    }else{
    Materialize.toast(validar, 6000, 'red');
    }
// vaciar('entinv')

});

$(document).on("change","#inidbodega",function(){
    var id = $(this).val();
    var elem = $(this).attr('id').substr(0,2);
    change_bodega(id,elem);
});

$(document).on("change","#outidbodega",function(){
    var id = $(this).val();
    var elem = $(this).attr('id').substr(0,3);
    change_bodega(id,elem);
});

$(document).on("change","#movidbodega",function(){
    var id = $(this).val();
    var elem = $(this).attr('id').substr(0,3);
    change_bodega(id,elem);
});

$(document).on("change","#destidbodega",function(){
    var id = $(this).val();
    var elem = $(this).attr('id').substr(0,4);
    change_bodega(id,elem);
});

$(document).on("change","#didbodega",function(){
    var id = $(this).val();
    var elem = $(this).attr('id').substr(0,1);
    change_bodega(id,elem);
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

$(document).on("change","#servpro",function(){
    if($(this).is(":checked") )
        $("#vservprofesional").val(1);
    else{
        $("#ms2").removeClass('hide')
        $("#vservprofesional").val(0);
        $("#vpganancia").val('');
        $("#vprecio").val('');
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

    if (serv[13] == 0)
        $("#servpro").prop('checked',false);
    else
        $("#servpro").prop('checked',true);

    $("#servpro").change();

    if ($("#vidinventario").attr('type') == 'select' && !$("#vidinventario option").length)
		arr('login',6,'id,nombre',111,'id > 0 and idsucursal in(-1,@@impresa)',15,1,$("#vidinventario"));

	$("#vpfactura").val(serv[4]);

    if (parseFloat($("#vpfactura").val()) == 0) {
		if ($("#vpfactura:visible").length)
			$("#porfact").click()
	}else{
		if (!$("#vpfactura:visible").length)
			$("#porfact").click()
	}
    
    $("#vprecio").val(serv[8]);
    $("#vpganancia").val(serv[9]);
    $("#addserv").removeClass('add');
    $("#addserv").addClass('edit');
    $("#addserv").html('Guardar')

    cargarMoneda(serv[12]);
    $("#vidmoneda").val(serv[12]);
    $("#vidmoneda").material_select('update');

    var hasimpuesto = getDatos('exoneracion',87,'idfila = '+serv[0]+' and idtabla = 16',0,0,0);

	if(hasimpuesto[0].length){
		hasimpuesto = parseInt(hasimpuesto[0][0][0]);
		if (hasimpuesto)
			$("#cexento").attr('checked',false);
		else
			$("#cexento").attr('checked',true);
	}else
		$("#cexento").attr('checked',false);

    Materialize.updateTextFields();
});

$(document).on("change","#inputExc",function(){
    var costo = isNaN($("#vcosto").val()) ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
    var ganancia = isNaN($("#vgganancia").val()) ? 0 : parseFloat($("#vgganancia").val().replace(/,/g,""));
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
    var ganancia = isNaN($("#vgganancia").val()) ? 0 : parseFloat($("#vgganancia").val().replace(/,/g,""));
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
	if (code == 13){
		if($(this).attr('focus') != undefined)
		$("#"+$(this).attr('focus')).select().focus();
	}
});

$(document).on("blur",".calcvv",function(){

	var num = $(this).attr('num') == undefined ? 0 : parseInt($(this).attr('num'));
	var costo = parseFloat($("#vcosto").val().replace(/,/,''))/parseFloat($("#vdivisa").val());
	var impuestos = parseFloat($("#vexoneracion").val());

	if (parseInt(num) == 1) {
		var tven = rven = 0;
		$(".gan").each(function(){
			var padre = $(this).parent().parent();
			var ganancia = padre.find('.gan').val().replace(/,/g,'');
			var venta = padre.find('.ven').val().replace(/,/g,'');

			tven = parseInt(venta) ? (((venta / (1+(impuestos/100)))/ costo) - 1)	 * 100 : 0;
			rven = parseInt(venta) ? ((venta / (1+impuestos/100) ) - costo) : 0;
			tven = isNaN(tven) ? 0 : tven;
			padre.find('.gan').val(tven.formatMoney(2,'.',','));
			padre.find('.rgan').val(rven.toFixed(5));
		});
	}else{
		var padre = $(this).parent().parent();
		var ganancia = padre.find('.gan').val() == undefined ? 0 : padre.find('.gan').val().replace(/,/g,'');
		var venta = padre.find('.ven').val() == undefined ? 0 : padre.find('.ven').val().replace(/,/g,'');
		var tgan = tven = rven = 0;

		costo = isNaN(costo) ? 0 : costo;
		ganancia = isNaN(ganancia) ? 0 : ganancia;
		venta = isNaN(venta) ? 0 : venta;

		switch(num){
			case 2: //POR GANANCIA
				rven = costo * (ganancia / 100);
				tven = costo * (1+impuestos/100) * ((ganancia / 100) + 1);
				padre.find('.ven').val(tven.formatMoney(2,'.',','));
				padre.find('.rgan').val(rven.toFixed(5));
				break;
			case 3: //POR VENTA
				rven = parseInt(venta) ? ((venta / (1+impuestos/100)) - costo) : 0;
				tven = parseInt(venta) ? (((venta / (1+impuestos/100)) / costo) - 1) * 100 : 0;
				padre.find('.gan').val(tven.formatMoney(2,'.',','));
				padre.find('.rgan').val(rven.toFixed(5));
				break;
			default:
				$("#vgganancia").blur();
				break;
		}	
	}

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
    $("#agProd").removeClass('edit');
	$("#agProd").addClass('add');
	$("#agProd").html('Agregar');
	$("#costodivisa").addClass('hide');
    $("#listavariables").html('');
    deadclear('producto');
    var imp = arr('login',4,'',200,'11,0',0,0,0)[0];
    $("#impuestos").html('');
    for (var i = 0, len = imp.length; i < len; i++) {
        $("#impuestos").append('<li class="collection-item dismissable" id="newimp'+imp[i][1]+'"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv'+imp[i][1]+'" rf="'+imp[i][3]+'" defecto="1">'+imp[i][5]+' : '+imp[i][3]+'%</span></div><div class="col s6"><label>Exención: </label> <i class="mdi mdi-percent di-24px por-num"></i><input id="impexo'+imp[i][1]+'" type="number" class="validate eder calcvv" noClear="1" value="'+imp[i][4]+'" style="margin: 0px;width: 50%"></div></div></li>');
    };
    $(".validate").css('border-bottom', '1px solid #9e9e9e');
    $(".validate").css('box-shadow', 'none');
    $("#vidunidad").val(1)
    Materialize.updateTextFields();
    $("select").material_select();
    setTimeout(function(){$("#vfamilia").focus();},500)
});

$(document).on("click","#addservice",function(){
	acc = 1;
    $(".accmodal").html('Agregar Servicio');
    $("#addV").html('Agregar');
    $("input[name=sPeriodo]").prop('checked',false);
    $("#vdescripcion").val('');
    deadclear('servicio');
    $("#isPeriodo").prop('checked',false);
    $("#outsourcing").prop('checked',false);
    $("#outsourcing").change();
    $("#servpro").prop('checked',false);
    // $("#servpro").change();
    $(".cper").attr('disabled',true);
    $(".cper").prop('checked',false);
	if ($("#vidinventario").attr('type') == 'select' && !$("#vidinventario option").length)
		arr('login',6,'id,nombre',111,'id > 0 and idsucursal in(-1,@@impresa)',15,1,$("#vidinventario"));
    
    arr('login',6,'id,if(nombre = "",pfisico,nombre)',39,'id > 0',15,1,$("#vsucursales"));
    $("#vdescripcion").characterCounter();
    $("#vidtipo").val(0);
    $("#ajaxServicio").html('');
    setTimeout(function(){$("#vcodigo").focus();},500);
    $("#addserv").removeClass('edit');
    $("#addserv").addClass('add');
    $("#vidmoneda").val(1);
    $('select').material_select();
});

$(document).on("click","#addpackage",function(){
    $("#titpqt").html("Agregar Paquete");
    vaciar('paquetes');
    arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#vdescuento"));
    arr('login',6,'id,nombre',111,'id > 0 and idsucursal in(-1,@@impresa)',15,1,$("#invpqt"))
    $('select').material_select();
    Materialize.updateTextFields();
    $("#editpck").attr('id','addpqt');
    $("#addpqt").html('Agregar');
    $("#listapaquetes").html('')
    setTimeout(function(){ $("#vcodigo").focus() },500);
});

$(document).on("click","#btn-servclie",function(){
	$("#modal-servcliente").modal('open')
});

$(document).on("change","#isPeriodo",function(){
    if ($("#isPeriodo").is(':checked')) {
        $("#diario").prop('checked',true);
        $(".cper").prop('disabled',false);
        $("#vperiodo").val(1);
        $("#vdias").val(0);
        $(".cliserv").removeClass('hide')
    }else{
        if ($("#botro").val() == 1)
            $("#otros").click();

        $(".cper").prop('disabled',true);
        $(".cper").prop('checked',false);
        $("#dhotro").addClass('hide');
        $("#vperiodo").val(0);
        $("#vdias").val(0);
        $(".cliserv").addClass('hide')
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

$(document).on("click","#isinventariado",function(){
    if ($(this).is(':checked')) {
    	$("#fproductos .zelda").data('triforce')['visinventariado'] = 1;
    	$(".inventariado").removeClass('hide')
    }else{
    	$("#fproductos .zelda").data('triforce')['visinventariado'] = 0;
    	$(".inventariado").addClass('hide')
    }
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

$(document).on("keyup",".package[id=vcodigo]",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		$("#vnombre").focus();
	}
});

$(document).on("keyup",".package[id=vnombre]",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		$("#prod").focus();
	}
});

function addfeat(nom,val) {
    if (nom != '' && val != '') {
        var cnt = parseInt($("#cnt").val());
        
        cnt++;
        $("#listavariables").append('<tr id="dv'+cnt+'" class="variables" nom="'+nom+'" var="'+val+'"><td style=" padding: 10px; color:black;">'+nom+'</td><td style=" padding: 10px; color:black;">'+val+'</td><td><a class="btn-color pbtn cdel delvar mdi mdi-close mdi-24px" id="d'+cnt+'" title="Eliminar Característica" style="color:black;"></a></td></tr>');
        
        $("#nom").val('');
        $("#val").val('');
        $("#nom").focus();
        $("#cnt").val(cnt);

        // var vari = arr('login',4,'',194,acc+','+id+',"'+nom+'","'+val+'",@@usr,@@impresa',0,0,0)[0];
    }else{

    }
}

function cambio_select(vto, vtabla, vval, vset) {
	var tmp = $('#' + vto + ' option').first().html();

	$('#' + vto).html('<option value="">' + tmp + '</option>');
	var res = arr('login', 4, vval, vtabla, vset, 0, 0, 0)[0];

	for (var i = 0; i < res.length; i++) {
		$('#' + vto).append('<option value="' + res[i][0] + '">' + res[i][1] + '</option>');
	}
	$('#' + vto).material_select('update');
};

function change_bodega(id, elem) {
	var inv = arr('login',4,'id,nombre',111,'id > 0 and idbodega = '+id+' order by id',0,0,0)[0];
	if (inv != '') {
		$("#"+elem+"idinventario").html('');
		$("#"+elem+"idinventario").append('<option value="0">Seleccione un Inventario</option>');
		for (var i = 0, len = inv.length; i < len; i++) {
			$("#"+elem+"idinventario").append('<option value="' + inv[i][0] + '">' + inv[i][1] + '</option>');
		}

	} else {
		$("#" + elem + "idinventario").html('');
		$("#" + elem + "idinventario").append('<option value="0">Seleccione un Inventario</option>');

	}
	$("#" + elem + "idinventario").material_select();
}

function validarMovimiento(elem) {
	switch (elem) {
		case 'in':
			if ($("#"+elem+"idinventario").val() == 0 || $("#"+elem+"idinventario").val() == '') {
				return 'Inventario Requerido';
			}
			if ($("#v"+elem+"cantidad").val() == '') {
				$("#v"+elem+"cantidad").focus();
				return 'Cantidad Requerido';
			}
			if ($("#v"+elem+"comentario").val() == '') {
				$("#v"+elem+"comentario").focus();
				return 'Comentario Requerido';
			}
			break;
			//falta
		case 'out':

			break;
		case 'mov':

			break;
	}

	return false;
}

function vaciar(modulo) {
	switch (modulo) {
		case 'productos':
			$("#vidfamilia").val(0);
			$("#vfamilia").val('');
			$("#vidtipo").val(0);
			$("#vtipo").val('');
			$("#vidmarca").val(0);
			$("#vmarca").val('');
			$("#vidunidad").val(0);
			if ($("#vidinventario").attr('noClear') == undefined) {
				$("#vidinventario").val(6);
				$("#vidinventario").material_select('update');
			}
			$("select").material_select();
			$("#vpeso").val('');
			$(".formprod").val('');
			$("#dvpeso").addClass('hide');
			$(".calcvv").val('0.00');
			$(".rem").remove();
			$(".rem2").val('');
			// $(".calcnc").val('0.00');
			$("#impuestos").html('');
			$("#listavariables").html('');
			$("#tb1").click();
			break;
		case 'paquetes':
			$("#vnombre").val('');
			$("#vcodigo").val('');
			$("#prod").val('');
			$("#hprod").val('');
			$("#cantidad").val('');
			$("#vdescuento").val(0);
			$("#vdescuento").val(0);
			$("#totpqt").val('0.00');
			$("#htotal").val('');
			break;
		case 'entinv':
			$("#inidbodega").val(0);
			$("#inidbodega").material_select();
			$("#inidinventario").val(0);
			$("#inidinventario").material_select();
			$("#vincantidad").val('');
			$("#vincomentario").val('');
			break;

	}
}

function totalizar(costo, ganancia, tipo, line) {
	costo = costo/parseFloat($("#vdivisa").val());
	var subtotal = 0;
	var hsubtotal = 0;
	var impuestos = 0;
	if (line == undefined) {
		line = '';
	}
	var exoneracion = $("#vexoneracion" + line).val() == '' ? 0 : parseFloat($("#vexoneracion" + line).val());

	$(".impuestos").each(function () {
		var id = $(this).attr('id').substr(4);
		impuestos += parseFloat($(this).attr('value') * (1 - parseFloat($("#impexo" + id).val()) / 100));
	});

	//  ((precio / base) - 1) * 100;
	switch (tipo) {
		case 1:
			if (ganancia == 0) {
				hsubtotal = costo * ((impuestos / 100) + 1);
				subtotal = costo * (((impuestos - (impuestos * (exoneracion / 100))) / 100) + 1);
			} else {
				hsubtotal = costo * ((impuestos / 100) + 1) * ((ganancia / 100) + 1);
				subtotal = costo * (((impuestos - (impuestos * (exoneracion / 100))) / 100) + 1) * ((ganancia / 100) + 1);
			}
			// $("#vcosto").val(costo.toFixed(2));
			$("#hventa" + line).val(hsubtotal.toFixed(2));
			$("#vventa" + line).val(subtotal.toFixed(2));
			break;
		case 2:
			hsubtotal = costo * ((impuestos / 100) + 1) * ((ganancia / 100) + 1);
			subtotal = costo * (((impuestos - (impuestos * (exoneracion / 100))) / 100) + 1) * ((ganancia / 100) + 1);
			$("#hventa" + line).val(hsubtotal.toFixed(2));
			$("#vventa" + line).val(subtotal.toFixed(2));
			break;
		default:
			subtotal = costo - ($("#vventa" + line).val() / (1 + (((impuestos - (impuestos * (exoneracion / 100)))) / 100)));
			$("#vganancia" + line).val(subtotal.toFixed(5));
			$("#vgganancia" + line).val( ((subtotal*100)/costo).toFixed(2) );
			break
	}

	$(".precionivel").each(function () {
		var id = $(this).attr('id').substr(1);
		var num = $(this).attr('num');
		ganancia = $("#vgganancia" + id).val();
		exoneracion = $("#vexoneracion" + id).val();
		if (ganancia != 0 || exoneracion != 0) {
			subtotal = costo * (((impuestos - (impuestos * (exoneracion / 100))) / 100) + 1) * ((ganancia / 100) + 1);
			$("#vventa" + id).val(subtotal.toFixed(2));
		}
	});

	// $(".preciocliente").each(function(){
	//     var id = $(this).attr('id').substr(1);
	//     ganancia = $("#vganancia"+id).val();
	//     exoneracion = $("#vexoneracion"+id).val();
	//     if (ganancia != 0 || exoneracion != 0) {
	//         subtotal = costo * (((impuestos - (impuestos*(exoneracion / 100))) / 100)+1) * ((ganancia / 100)+1);
	//         $("#vventa"+id).val(subtotal.toFixed(2));
	//     }
	// });
}

function addprod(prod, cant, uni, sim) {
	var id = $("#hprod").attr('identify');
	if (id.substr(0,1) == '-') {
		tipo = 2;
		id = id.substr(1)
	}else
		tipo = 1;
	
	var info = arr('login',4,'',77,id+','+tipo+',0,"",@@impresa',0,0,0)[0][0];
	var imv = arr('login',4,'',200,'11,0'+id,0,0,0)[0][0][3];
	
	var desc = $("#vdescuento").val() == '' ? 0 : parseFloat($("#vdescuento").val());
	var ptotal = 0;
	var total = 0;
	var idprod = 0;
	var idserv = 0;
	var scant = '';

	if (uni == 1) {
		// sin unidad
		// ptotal = info[4] * cant; //sin impuesto
		ptotal = (info[4] * ((imv/100) +1) ) * cant; //con impuesto
		
	}else{
		// con unidad
		var precio = arr('login',4,'',14,info[0]+',0,",@@impresa","0,1"',0,0,0)[0][0];
		ptotal = convert(info[0],cant,uni,precio[9]);
	}
	
	if (info[3].substr(0, 1) == '[') {
		idserv = info[0].substr(1);
		idprod = 0;
		scant = '';
		sim = undefined;
	} else {
		idprod = info[0];
		idserv = 0;
	}

	if (sim == undefined)
		sim = '';

	if ($("#l"+info[0]).html() == undefined) {
		$("#listapaquetes").append('<div class="chip head2 lighten-3" id="l'+info[0]+'"><input type="hidden" id="htot'+info[0]+'" value="'+ptotal+'" precio="'+info[4]+'"><span class="nomprod" id="n'+info[0]+'" idproducto="'+idprod+'" idservicio="'+idserv+'">'+prod+'</span> (<span class="hcant" id="c'+info[0]+'">'+cant+'</span><span class="huni" id="u'+info[0]+'" idunidad="'+uni+'">'+sim+'</span>)<i class="close mdi mdi-close mdi-24px cdel del" id="d'+info[0]+'"></i></div>');
	} else {
		$("#c"+info[0]).text(parseInt($("#c"+info[0]).text()) + parseInt(cant));
		var precio = parseFloat($("#htot"+info[0]).attr('precio'));
		var cantidad = parseFloat($("#c"+info[0]).text());
		$("#htot"+info[0]).val(precio * cantidad)
	}

	$(".nomprod").each(function () {
		var id = $(this).attr('id').substr(1);
		var precio = parseFloat($("#htot" + id).val());
		total += precio;
	});


	var totdesc = total / ((desc / 100) + 1);

	$("#htotal").val(total);
	$("#totpqt").val(totdesc.formatMoney(2, '.', ','));

	$("#pqtunidad").val(1);
	$(".tduni").addClass('hide');
	$("#prod").val('');
	$("#cantidad").val('');
	$("#hprod").val('');
	$("#prod").focus();
	$("select").material_select();
}

function validar(varreglo, vmodulo) {

	var salida = {}

	/*VALIDACION FRONT END*/

	switch (vmodulo['modulo']) {
		case 'servicio':
			if (vmodulo['tip'] == '') {
				err = validarservicios();
				if (err) {
					return err;
				}
			} else {
				$("#vprecio").val(0);
			}

			break;
		case 'producto':
			if (vmodulo['tip'] == '') {
				err = validarproductos();
				if (err) {
					return err;
				}
			} else {
				$("#vcodigo").val("");
				$("#vnombre").val("");
				$("#vcantidad").val('0.00');
				$("#vminimo").val(0);
				$("#vmaximo").val(0);
			}
			break;
		default:
			return 'Módulo no Existente: ' + vmodulo['modulo'];
			break;
	}

	salida = odin(varreglo, "f" + vmodulo['modulo'] + "s");
	return salida;

}

function validarproductos() {
	var registrar = 0;
	if ($("#fproductos .zelda").data('triforce')["vidfamilia"] == 0 && $("#vfamilia").val().trim().length) {
		
		var familia = arr('login', 4, '', 106, '1,0,\"' + $("#vfamilia").val() + '\",@@impresa', 0, 0, 0);
		if (familia[0][0] != undefined) {
			registrar = 1;
			$("#fproductos .zelda").data('triforce')["vidfamilia"] = familia[0][0][0];
		} else {
			$("#vfamilia").select().focus();
			return familia[0]['ERROR'];
		}
	}
	
	if ($("#fproductos .zelda").data('triforce')["vidtipo"] == 0 && ($("#vtipo").val().trim().length || $("#fproductos .zelda").data('triforce')["vidfamilia"] != 0)) {
		var tipo = arr('login', 4, '', 135, '1,0,\"' + $("#vtipo").val() + '\",' + $("#fproductos .zelda").data('triforce')["vidfamilia"]+',@@impresa', 0, 0, 0);
		if (tipo[0][0] != undefined) {
			registrar = 1;
			$("#fproductos .zelda").data('triforce')["vidtipo"] = tipo[0][0][0];
		} else {
			$("#vtipo").select().focus();
			return tipo[0]['ERROR'];
		}
	}
	if ($("#fproductos .zelda").data('triforce')["vidmarca"] == 0 && ($("#vmarca").val().length || $("#fproductos .zelda").data('triforce')["vidtipo"] != 0) || registrar) {
		var marca = arr('login', 4, '', 136, '1,0,\"' + $("#vmarca").val() + '\",' + $("#fproductos .zelda").data('triforce')["vidtipo"]+',@@impresa', 0, 0, 0);
		if (marca[0][0] != undefined) {
			$("#fproductos .zelda").data('triforce')["vidmarca"] = marca[0][0][0];

		} else {
			$("#vmarca").select().focus();
			return marca[0]['ERROR'];
		}
	}
	if ($("#vidinventario").val() == 0) {
		$("#tb1").click();
		$("#vidinventario").focus();
		return 'Inventario Requerido';
	}
	if ($("#vidunidad").val() == undefined || $("#vidunidad").val() == '') {
		$("#tb1").click();
		// $("#vidunidad").prevAll('input.select-dropdown').trigger('open').focus();
		return 'Unidad Requerida';
	}
	if ($("#vnombre").val() == '') {
		$("#tb1").click();
		$("#vnombre").focus();
		return 'Nombre Requerido';
	}
	if ($("#vcodigo").val() == '') {
		$("#tb1").click();
		$("#vcodigo").focus();
		return 'Código Requerido';
	}
	if ($("#vminimo").val() == '') {
		$("#vminimo").val(0);
	}
	if ($("#vmaximo").val() == '') {
		$("#vmaximo").val(0);
	}
	if ($("#vmaxdescuento").val() == '') {
		$("#vmaxdescuento").val(0);
	}
	if (isNaN($("#vcosto").val().replace(/,/g,''))) {
		$("#tb2").click();
		$("#vcosto").select()
		return 'Precio Costo Inválido';
	}
	if (isNaN($("#vgganancia").val().replace(/,/g,''))) {
		$("#vgganancia").val(0);
	}

	if($("#pesaje").is(":checked")){
		$("#fproductos .zelda").data('triforce')["visgravamen"] = 1;
	}else{
		$("#fproductos .zelda").data('triforce')["visgravamen"] = 0;
	}

	if($("#variable").is(":checked")){
		$("#fproductos .zelda").data('triforce')["visvariable"] = $("#variable").attr('ische');
	}else{
		$("#fproductos .zelda").data('triforce')["visvariable"] = 0;
	}

	if($("#fproductos .zelda").attr('inventariado') != undefined){
		if (isNaN($("#vcantidad").val()) ) {
			$("#vcantidad").focus();
			return 'Cantida Requerida';
		}

		if($("#goldinventariado").is(":checked")){
			$("#visinventariado").val(1)
		}else{
			$("#visinventariado").val(0)
		}
	}

	return false;
}

function validarservicios() {

	if ($("#vcodigo").val() == '') {
		$("#ms1").click();
		$("#vcodigo").focus();
		return 'Código Requerido';
	}

	if ($("#vnombre").val() == '') {
		$("#ms1").click();
		$("#vnombre").focus();
		return 'Nombre Requerido'
	}

	if ($("#outsourcing").is(":checked")) {
		if ($("#prov").val() == null) {
			$("#ms1").click();
			return 'Proveedor Requerido';
		}
	}

	if ($("#cexento").is(":checked"))
		$("#fservicios .zelda").data('triforce')['vexento'] = 0;
	else
		$("#fservicios .zelda").data('triforce')['vexento'] = 100;

	if ($("#vpganancia").val() == '') {
		$("#vpganancia").val(0);
	}

	if (!$("#isPeriodo").is(":checked"))
		$("#vdias").val(0);

	return false;

}

function llenarImpuesto(vidproducto){
	var imp = arr('login', 4, '', 200, '11,'+vidproducto, 0, 0, 0)[0];
	for (var i = 0, len = imp.length; i < len; i++) {
		$("#impuestos").append('<li class="collection-item dismissable" id="newimp' + imp[i][0] + '"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv' + imp[i][0] + '" rf="' + imp[i][3] + '" defecto="1">' + imp[i][1] + ' - ' + imp[i][2] + '%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo' + imp[i][0] + '" type="number" class="validate eder calcvv" value="0" style="margin: 0px;width: 50%"></div></div></li>');
	}
}

function validarpaquete() {
	if ($("#vcodigo").val() == '') {
		$("#vcodigo").focus();
		return "Código Paquete Requerido";
	}
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre Paquete Requerido";
	}
	if ($("#listapaquetes .chip").length <= 0) {
		return "Debe Agregar al Menos 1 Producto";
	}
	return false;
}

function cargar(vmodulo, vid) {

	switch (vmodulo['modulo']) {
		case 'producto':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 113;
			vmodulo['where'] = vid;
			break;

		case 'servicio':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,descripcion as vdescripcion,pfactura as vpfactura,periodo as vperiodo,idproveedor as vidproveedor,pcompra as vprecio,pganancia as vpganancia,idmoneda as vidmoneda,venta as vventa';
			vmodulo['tbl'] = 16;
			vmodulo['where'] = 'id = ' + vid;
			break;
		case 'paquetes':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 0;
			vmodulo['where'] = vid;
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	return vmodulo;
}

function cargarSintax(vtabla) {
	switch (vtabla) {
		case 'productos':
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 14;
			arr['where'] = '0,0,"'+$("#search_productos").val()+',@@impresa","0,10"';
			break;
		case 'servicios':
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 13;
			arr['where'] = '0,0,"'+$("#search_servicios").val()+',@@impresa","0,10"';
			break;
		case 'paquetes':
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 62;
			arr['where'] = '';
			break;
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
			arr['where'] = 'id > 0 and idfamilia = ' + $("#vidfamilia option:selected").val() + ' order by id';
			break;
		case 'marca':
			var arr = {};
			arr['sel'] = 'id,nombre';
			arr['tbl'] = 22;
			arr['where'] = 'id > 0 order by id';
			break;
		case 'modelo':
			
			break;
	}
	return arr;
}


function endDetail(id, acc, modulo) {

	if (acc == 3) {
		thorload(modulo);
		return false;
	}

	switch(modulo){
		case 'producto':

			$(".precionivel").each(function() {
				var gan_n = 0;
				var idlinea = $(this).attr('idn');
				var idfila = $(this).attr('id').substr(1);
				if (parseFloat($("#vventa" + idfila).val().replace(/,/g,'')) > 0) {
					imp_n = parseInt($("#vexoneracion").val());
					gan_n = (parseFloat($("#vventa" + idfila).val().replace(/,/g,''))/(1+(imp_n/100))) - parseFloat($("#vcosto").val().replace(/,/g,''));
					console.log(gan_n)
					acc = !parseInt(idlinea) ? 1 : acc;
					console.log(arr('login', 4, '', 108, acc+','+idlinea+',1,' + id[0][0] + ',' + idfila + ',' + gan_n + ',' + imp_n + ','+$("#vventa" + idfila).val().replace(/,/g,'')+',@@usr,@@impresa', 0, 0, 0));
				}
			});

			$(".preciocliente").each(function() {
				var idfila = $(this).attr('id').substr(1);
				if ($("#vventa" + idfila).val() > 0) {
					arr('login', 4, '', 162, '1,0,' + id[0][0] + ',' + $("#vidcliente" + idfila).val() + ',' + $("#vgganancia" + idfila).val() + ',' + $("#vexoneracion" + idfila).val() + ',@@usr,@@impresa,'+parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vgganancia"+idfila).val().replace(/,/g,""))/100)+1), 0, 0, 0)
				}
			});

			var vari = $(".variables");
			if (vari.length > 0) {
				vari.each(function () {
					arr('login',4,'',194,'1,0,"'+$(this).attr('nom')+'","'+$(this).attr('var')+'",'+id[0][0]+',@@usr,@@impresa',0,0,0);
				});
			}
			//exoneracion
			var imps = $(".impuestos");
			if (imps.length > 0) {
				$(".impuestos").each(function() {
					// vaccion,vid,vidfila,vidtabla,vidimpuesto,vexoneracion
					var idimp = $(this).attr('id').substr(4)
					arr('login',4,'',86,'1,0,'+id[0][0]+',11,'+idimp+','+$("#impexo"+idimp).val(),0,0,0);
				});
			}
			// fin exoneracion

			if($("#fproductos .zelda").attr('inventariado') != undefined){
				actualizar(97,'cantidad='+$("#vcantidad").val(),'idinventario = 6 and idproducto='+id[0][0]);
			}

			if ($("#cdivisa").is(":checked")) {
				actualizar(11,'divisa ='+$("#vidmoneda option:selected").attr('dv'),'id ='+id[0][0]);
			}

			thorload(modulo);
			deadclear(modulo);
			paginate(14);
			$("#vidunidad").val(1);
			$("#vidunidad").material_select('update');
			$("#tb1").click();
			break;
		case 'servicio':
			if (acc == 1) {
				deadclear(modulo);
				thorload(modulo);
				//HACER SP PARA AGARRAR VALOR O HACERLO DESDE EL TPL
				if ($("#cexento").is(":checked"))
					insertar(87,'','null,'+id[0][0]+',16,1,0,13');

			} else if (acc == 2) {
				thorload(modulo);
				var exon = $("#cexento").is(":checked") ? 0 : 100;

				var cantidad = getDatos('count(id)',87,'idfila = '+id[0][0]+' and idtabla = 16',0,0,0)
				cantidad = cantidad[0][0][0];
				if (parseInt(cantidad)) {
					actualizar(87,'exoneracion='+exon,'idfila = '+id[0][0]+' and idtabla = 16');
				}else{
					insertar(87,'','null,'+id[0][0]+',16,1,0,13');
				}
			}
			break;
		default:
			if (acc == 1) {
				deadclear(modulo);
				thorload(modulo);
			} else if (acc == 2) {
				thorload(modulo);
			}
			break;
	}	
	

}

function addlineCliente(preccli) {
	var vaccion = 2
	var vlinea = $(".preciocliente").length + 1;
	if (preccli == undefined){ 
		preccli = ['0.00','','0.00','0.00','0.00','0.00']
		vaccion = 1;
	}
	//DATA-MASK NO FUNCIONA
	var salida = '<tr class="preciocliente" id="c' + vlinea + '" accion="'+vaccion+'" idf="'+ preccli[6] +'" style="border: 1px solid #e2e2e2"><td class="center-align input-field" style="padding: 0px"><input type="text" id="vcliente' + vlinea + '" class="validate autocomplete" value="' + preccli[2] + '" style="font-size: 12px;margin: 0px"><input type="hidden" class="vidcliente" id="vidcliente' + vlinea + '" value="' + preccli[1] + '"></td> <td class="center-align input-field" style="padding: 0px"> <i class="mdi prefix">%</i><input type="text" id="vgganancia' + vlinea + '" class="validate calcvv eder" value="' + preccli[3] + '" data-mask="9999999999.99" focus="vventa" num="2" line="' + vlinea + '" style="margin: 0px"></td> <td class="center-align input-field" style="padding: 0px"><i class="mdi prefix moneda">¢</i><input type="text" id="vventa' + vlinea + '" class="validate calcvv eder" value="' + preccli[4] + '" data-mask="9999999999.99" focus="vexoneracion" num="3" line="' + vlinea + '" style="margin: 0px"><input type="hidden" id="hventa' + vlinea + '" value="' + preccli[4] + '"></td> <td class="center-align input-field" style="padding: 0px"><i class="mdi prefix">%</i><input type="text" id="vexoneracion' + vlinea + '" style="width: 70%;margin: 0px" class="validate calcvv eder" value="' + preccli[5] + '" data-mask="9999999999.99" nc="1" line="' + vlinea + '"> <i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i> </td></tr>';
	
	return salida;
}

function postload(vmodulo){
	switch(vmodulo){
		case 'producto':
			$("#agProd").removeClass('add');
			$("#agProd").addClass('edit');
			$("#agProd").html('Editar');
			if(parseInt($("#vidmoneda").val()) == 1)
				$("#costodivisa").addClass('hide')
			else
				$("#costodivisa").removeClass('hide')
		   	
		    if(parseInt($("#fproductos .zelda").data('triforce')['visgravamen'])){
		    	$("#pesaje").prop('checked',true);
		    }
		    else{
		    	$("#pesaje").prop('checked',false);
		    }

		    if(parseInt($("#fproductos .zelda").data('triforce')['visvariable'])){
		    	$("#variable").prop('checked',true);
		    }
		    else{
		    	$("#variable").prop('checked',false);
		    }

		    if(parseInt($("#visinventariado").val())){
		    	if(!$("#goldinventariado").is(":checked"))
		    		$("#goldinventariado").click();
		    }else{
		    	if($("#goldinventariado").is(":checked"))
		    		$("#goldinventariado").click();
		    }

		    if(parseInt($("#vexoneracion").val())){
		    	if(!$("#pg").is(":checked"))
		    		$("#pg").prop('checked',true).change();
		    }else{
		    	if($("#pg").is(":checked"))
		    		$("#pg").prop('checked',false).change();
		    }

		    $(".precionivel").each(function(){
		    	var id = $(this).attr('id').substr(1);
		    	var infonivel = getDatos('format(((venta/((exoneracion/100)+1)/'+$("#vcosto").val().replace(/,/g,'')+')-1)*100,2),venta,exoneracion,id',105,'idnivel = '+id+' and idtipoentrada = 1 and identrada = '+$("#fproductos .zelda").data('triforce')['vid'],0,0,0)[0][0];

		    	if(infonivel != undefined){
		    		$("#vgganancia"+id).val(infonivel[0])
		    		$("#vventa"+id).val(infonivel[1])
		    		$("#vexoneracion"+id).val(infonivel[2])
		    		$(this).attr('idn',infonivel[3])
		    	}else{
		    		$("#vgganancia"+id).val(0)
		    		$("#vventa"+id).val(0)
		    		$("#vexoneracion"+id).val(0)
		    		$(this).attr('idn',0);
		    	}
		    });

		    Materialize.updateTextFields();
			break;
		case 'servicio':
			var hasimpuesto = getDatos('exoneracion',87,'idfila = '+$("#fservicios .zelda").data('triforce')['vid']+' and idtabla = 16',0,0,0);

			break;
		default:
			break;
	}
}
