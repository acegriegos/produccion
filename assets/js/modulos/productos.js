// var variables = [];

$(function () {
	$(".menu3").click(function () {
		var id = $(this).attr('id').substr(1);
		$(".menu3").removeClass('active');
		$(this).addClass('active');
		switch (parseInt(id)) {
			case 1:
				$("#mantServ").remove();
				$("#mantPaquetes").remove();
				var tabla = $("#data-table-productos").DataTable();
				tabla.destroy();
				var p = mantenimiento('productos', 1, '');
				$("#bdymantInventario").html(p);
				$("#data-table-productos").DataTable({
					bFilter: false,
					bScrollInfinite: true,
					bSort: false,
					bLengthChange: false,
					order: [],
					bPaginate: false,
					info: false
				});
				break;
			case 2:
				$("#mantProd").remove();
				$("#mantPaquetes").remove();
				var tabla = $("#data-table-servicios").DataTable();
				tabla.destroy();
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
				break;
		}
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
		$("#addproduct").click();
	} else if (addsr) {
		$("#m2").click();
		$("#addservice").click();
	} else if (addpq) {
		$("#m3").click();
		$("#addpackage").click();
	} else
		$("#m1").click();
	
	paginate($("ul.pagination").attr('vtbl'))

});

$(document).ready(function () {

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

$(document).on("change", "#vidinventario", function () {
	setTimeout(function(){
		$(this).prevAll('input.select-dropdown').trigger('close');
		$("#vidunidad").prevAll('input.select-dropdown').trigger('open').focus();
	},300);
});

// focus
$(document).on("keyup", ".formprod", function (e) {
	var code = e.which || e.keyCode;
	var mod = $(this).attr('focus').substr(0, 1);
	var filtro = $(this).attr('focus').substr(1);
	if (code == 13) {
		$("#tb" + mod).click();
		$("#" + filtro).select();
	}

});

$(document).on("keyup", ".ffeat", function (e) {
	var code = e.which || e.keyCode;

});

// end focus

// Quick add
// $(document).on("click",".qckadd",function(){
//     var elemento = $(this).attr('element');
//     $(this).text('save');
//     $(this).removeClass('qckadd');
//     $(this).addClass('savelem');
//     $("#v"+elemento).removeClass('autocomplete')
//     $("#v"+elemento).val('');
//     $("#v"+elemento).focus();
// });

// $(document).on("click",".savelem",function(){
//     var elemento = $(this).attr('element');
//     var id = 0;
//     var nombre = $("#v"+elemento).val();
//     var db = $(this).attr('d-b');
//     var tbl = $(this).attr('tbl');
//     var ant = $(this).attr('ant');
//     var idant = $("#vid"+ant).val();
//     if (nombre != '') {
//         if (ant != undefined) {
//             id = arr('login',4,'',db,'1,0,\"'+nombre+'\",'+idant,0,0,0)
//         }else{
//             id = arr('login',4,'',db,'1,0,\"'+nombre+'\"',0,0,0);
//         }

//         if (id[0]['ERROR'] == undefined) {
//             Materialize.toast('Elemento agregado correctamente', 6000, 'green');
//             $(this).text('add');
//             $(this).removeClass('savelem');
//             $(this).addClass('qckadd');
//             $("#v"+elemento).addClass('autocomplete')
//             $("#vid"+elemento).val(id[0][0][0])
//             $("#v"+elemento).val(id[0][0][1]);
//             $("#v"+elemento).focus();
//         }else{
//             Materialize.toast(id[0]['ERROR'], 6000, 'red');
//         }
//     }else{
//         $(this).text('add');
//         $(this).removeClass('savelem');
//         $(this).addClass('qckadd');
//         $("#v"+elemento).addClass('autocomplete');
//         $("#v"+elemento).focus();
//     } 
// });
// Fin Quick add

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
		$("#vganancia" + id).select();
});

$(document).on("focus", "[id^=vcliente]", function () {
	var id = $(this).attr('id').substr(8);
	$("#vidcliente" + id).val(0);
});

$(document).on("blur", "[id^=vcliente]", function () {
	var nombre = $(this).val();
	var id = $(this).attr('id').substr(8);
	if (nombre != '') {
		var idc = arr('login', 4, 'id', 2, 'concat(nombre," ",apellido1," ",apellido2," [",replace(cedula,"-",""),"]") like "%' + nombre + '%"', 0, 0, 0)[0][0][0];

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
    var line = parseInt($(this).attr('line'));
    if (code == 13) {
        if ($(this).attr('nc') != undefined) {
            line++;
            $(".chg1").append('<div class="row preciocliente rem" id="c'+line+'" accion="1" idf="0"><div class="col s12 m6 l3 center-align"><br><label>Nombre Cliente</label><div class="input-field"><input type="text" id="vcliente'+line+'" class="validate autocomplete" value=""><input type="hidden" class="vidcliente" id="vidcliente'+line+'" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Ganancia</label><div class="input-field"><i class="material-icons prefix">%</i><input type="text" id="vganancia'+line+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vventa" num="1" line="'+line+'"></div></div><div class="col s12 m6 l3 center-align"><br><label>Precio Venta</label><div class="input-field"><i class="material-icons prefix">¢</i><input type="text" id="vventa'+line+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="2" line="'+line+'"><input type="hidden" id="hventa'+line+'" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Exoneración</label><div class="input-field"><i class="material-icons prefix">%</i><input type="text" style="width: 70%" id="vexoneracion'+line+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" nc="1" num="3" line="'+line+'"> <i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i></div></div></div>');
            $("#vcliente"+line).focus();
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

	if (id != 1) {

		$("#dpeso").removeClass('hide');
		setTimeout(function(){$("#vpeso").focus();},100);
	}else{
		$("#vpeso").val(0);
		$("#dpeso").addClass('hide');
		setTimeout(function(){$("#vnombre").focus();},100);
	}
	
});

$(document).on("blur", "#vfamilia", function () {
	var nombre = $(this).val();
	var idfamilia = arr('login', 4, 'id', 20, 'nombre = \"' + nombre + '\"', 0, 0, 0)[0][0];
	if (idfamilia != undefined)
		$("#vidfamilia").val(idfamilia);
	else
		$("#vidfamilia").val(0);
});

$(document).on("blur", "#vtipo", function () {
	var nombre = $(this).val();
	var idtipo = arr('login', 4, 'id', 21, 'nombre = \"' + nombre + '\" and idfamilia = ' + $("#vidfamilia").val(), 0, 0, 0)[0][0];
	if (idtipo != undefined)
		$("#vidtipo").val(idtipo);
	else
		$("#vidtipo").val(0);
});

$(document).on("blur", "#vmarca", function () {
	var nombre = $(this).val();
	var idmarca = arr('login', 4, 'id', 22, 'nombre = \"' + nombre + '\" and idtipo = ' + $("#vidtipo").val(), 0, 0, 0)[0][0];
	if (idmarca != undefined)
		$("#vidmarca").val(idmarca);
	else
		$("#vidmarca").val(0);

});

$(document).on("keyup", "#vfamilia", function (e) {
	var charCode = e.which || e.keyCode;
	if (charCode == 13)
		$("#vtipo").focus();
});

$(document).on("keydown", "#vfamilia", function (e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();
			$("#vfamilia").autocomplete({
				limit: 10,
				data: arr('login', 4, 'nombre,null', 20, 'nombre like \"%' + $("#vfamilia").val() + '%\" limit 10', 0, 0, 0, 1)
			});
			$("#vfamilia").siblings($(".autocomplete-content")).css('width', '25%');
		}
	}
});

$(document).on("keyup", "#vtipo", function (e) {
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
				data: arr('login', 4, 'nombre,null', 21, 'idfamilia = ' + $("#vidfamilia").val() + ' and nombre like \"%' + $("#vtipo").val() + '%\" limit 10', 0, 0, 0, 1)
			});
			$("#vtipo").siblings($(".autocomplete-content")).css('width', '25%');
		}
	}
});

$(document).on("keyup", "#vmarca", function (e) {
	var charCode = e.which || e.keyCode;
	if (charCode == 13)
		$("#vidinventario").prevAll('input.select-dropdown').trigger('open').focus();
});

$(document).on("keydown", "#vmarca", function (e) {
	if ($(this).hasClass('autocomplete') == true) {
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);

		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();

			$("#vmarca").autocomplete({
				limit: 10,
				data: arr('login', 4, 'nombre,null', 22, 'idtipo = ' + $("#vidtipo").val() + ' and nombre like \"%' + $("#vmarca").val() + '%\" limit 10', 0, 0, 0, 1)
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
			$("#vpbase").focus();
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

$(document).on("click", ".filtersrv", function () {
	var id = parseInt($(this).attr('filtro').substr(1));
	var elemento = $("#searchsrv");
	switch (id) {
		case 1:
			$("#fserv").attr('filter', id);
			elemento.attr('placeholder', 'Buscar por ' + $(this).html());
			break;
		case 2:
			$("#fserv").attr('filter', id);
			elemento.attr('placeholder', 'Buscar por ' + $(this).html());
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
		arr('login', 6, 'nombre,valor', 193, 'idproducto = ' + id, 0, 1, $("#listainfo"))
	}else{
		Materialize.toast('No se encuentra caracteristicas relacionadas con este producto', 6000, 'red');
	}
	
});

$(document).on("click", "#addfeat", function () {
	var nombre = $("#nom").val();
	var val = $("#val").val();
	addfeat(nombre, val);
});

$(document).on("click", "#adddsct", function () {
	var desc = $("#dscts option:selected").val();
	var valor = $("#dscts option:selected").attr('valor');
	var nombre = $("#dscts option:selected").html();
	nombre = nombre.substr(0, nombre.indexOf('-'));
	adddesc(desc, valor, nombre);
});

$(document).on("click", ".deldesc", function () {
	var id = $(this).attr('id').substr(7);
	$("#ld" + id).remove();
});

$(document).on("click", "#gdesc", function () {
	var action = $(this).attr('action');
	var idproducto = $("#idproducto").val();
	if (action == 1) {
		$(".descprod").each(function () {
			var iddescuento = $(this).attr('id').substr(5);
			var descuentos = arr('login', 4, '', 95, '1,0,0,' + iddescuento + ',null,null,' + idproducto + ',11', '', 0, '');
			if (descuentos[0] != '[object Object]') {
				Materialize.toast('Descuento Agregado Correctamente', 6000, 'green');
			} else {
				Materialize.toast(descuentos[0]['ERROR'], 6000, 'red');
			}

		});
	} else {
		arr('login', 7, '3', 79, 'idfila = ' + idproducto + ' and idtabla = 11', '', 0, '');

		$(".descprod").each(function () {
			var iddescuento = $(this).attr('id').substr(5);
			var descuentos = arr('login', 4, '', 95, '1,0,0,' + iddescuento + ',null,null,' + idproducto + ',11', '', 0, '');
			if (descuentos[0] != '[object Object]') {
				Materialize.toast('Descuento Agregado Correctamente', 6000, 'green');
			} else {
				Materialize.toast(descuentos[0]['ERROR'], 6000, 'red');
			}
		});
	}

});

$(document).on("click", "#addimp", function () {
	var id = $("#imp option:selected").val();
	var nombre = $("#imp option:selected").text();
	var valor = $("#imp option:selected").attr('valor');

	if ($("#vimv" + id).val() == undefined) {
		$("#impuestos").removeClass('hide');
		if ($("#imp option:selected").val() != 0) {
			$("#impuestos").append('<li class="collection-item dismissable" id="newimp' + id + '"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv' + id + '" value="' + valor + '" defecto="0">' + nombre + ' - ' + valor + '%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo' + id + '" type="number" class="validate eder calcvv" value="0" style="margin: 0px;width: 50%"></div></div></li>')
			totalizar($("#hvcosto").val(), $("#vganancia").val());
		}
	} else {
		Materialize.toast('Impuesto ' + nombre + ' Agregado Anteriormente', 6000, 'yellow accent-4');
	}
});

$(document).on("click", ".delimp", function () {
	var id = $(this).attr('id').substr(4);
	var costo = $("#hvcosto").val();
	var ganancia = $("#vganancia").val();
	totalizar(costo, ganancia);
	$("#newimp" + id).remove();
});

$(document).on("click", "#addprod", function () {
	var valprod = false;
	if (valprod == false) {
		var codigo = $("#vcodigo").val().replace(/"/g,'\\"');
		var codigointerno = $("#vcodigointerno").val().replace(/"/g,'\\"');
		var nombre = $("#vnombre").val().replace(/"/g,'\\"');
		var costo = $("#vcosto").val().replace(/,/g,'');
		var ganancia = $("#vganancia").val();
		var venta = parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vganancia").val().replace(/,/g,""))/100)+1);
		var exoneracion = $("#vexoneracion").val() == '' || $("#vexoneracion").val() == '0.00' ? 0 : $("#vexoneracion").val();
		var peso = $("#vpeso").val();
		var idunidad = $("#vidunidad option:selected").val();
		var minimo = $("#vminimo").val();
		var maximo = $("#vmaximo").val();
		var maxdesc = $("#vmaxdescuento").val() == '' ? 0 : $("#vmaxdescuento").val();
		var idmoneda = $("#vidmoneda").val();
		var idinventario = $("#vidinventario option:selected").val();
		var vari = $(".variables");
		var pass = 1;

		if (idunidad == 1) {
			peso = peso * 1000;
		} else if (idunidad == 3) {
			peso = peso / 1000;
		} else if (idunidad == 4) {
			peso = peso * 1000;
		} else if (idunidad == 6) {
			peso = peso / 1000;
		} else if (idunidad == 8) {
			peso = peso / 100;
		}

		if ($("#vidfamilia").val() == 0) {
			var familia = arr('login', 4, '', 106, '1,0,\"' + $("#vfamilia").val() + '\"', 0, 0, 0);
			if (familia[0][0] != undefined) {
				$("#vidfamilia").val(familia[0][0][0])
			} else {
				Materialize.toast(familia[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}
		if ($("#vidtipo").val() == 0) {
			var tipo = arr('login', 4, '', 135, '1,0,\"' + $("#vtipo").val() + '\",' + $("#vidfamilia").val(), 0, 0, 0);
			if (tipo[0][0] != undefined) {
				$("#vidtipo").val(tipo[0][0][0])
			} else {
				Materialize.toast(tipo[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}
		if ($("#vidmarca").val() == 0) {
			var marca = arr('login', 4, '', 136, '1,0,\"' + $("#vmarca").val() + '\",' + $("#vidtipo").val(), 0, 0, 0);
			if (marca[0][0] != undefined) {
				$("#vidmarca").val(marca[0][0][0])

			} else {
				Materialize.toast(marca[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}

		if (pass == 1) {
			var idmarca = $("#vidmarca").val();
			var idproducto = arr('login',4,'',78,'1,0,"'+codigo+'","'+codigointerno+'","'+nombre+'",'+costo+','+ganancia+','+venta+','+exoneracion+','+peso+','+idunidad+','+minimo+','+maximo+','+maxdesc+','+idmarca+','+idinventario +',@@usr,'+idmoneda+',@@impresa,""',0,0,0);

			if (idproducto[0][0] != undefined) { //validar si guarda correctamente
				//agregar impuestos
				$(".impuestos").each(function () {
					var idimpuesto = $(this).attr('id').substr(4);
					if ($(this).attr('defecto') == 1 && ($("#impexo" + idimpuesto).val() == '' || $("#impexo" + idimpuesto).val()) == 0) {
						return false;
					} else {
						arr('login', 4, '', 86, '1,0,' + idproducto[0][0] + ',11,' + idimpuesto + ',' + $("#impexo" + idimpuesto).val(), 0, 0, 0);
					}
				});
				//agrega niveles productos
				$(".precionivel").each(function () {
					var idfila = $(this).attr('id').substr(1);
					if ($("#vventa" + idfila).val() > 0) {
						arr('login', 4, '', 108, '1,0,' + idproducto[0][0] + ',' + idfila + ',' + $("#vganancia" + idfila).val() + ',' + $("#vexoneracion" + idfila).val() + ',@@usr,@@impresa', 0, 0, 0)
					}
				});

				$(".preciocliente").each(function () {
					var idfila = $(this).attr('id').substr(1);
					if ($("#vventa" + idfila).val() > 0) {
						arr('login', 4, '', 162, '1,0,' + idproducto[0][0] + ',' + $("#vidcliente" + idfila).val() + ',' + $("#vganancia" + idfila).val() + ',' + $("#vexoneracion" + idfila).val() + ',@@usr,@@impresa,'+parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vganancia"+idfila).val().replace(/,/g,""))/100)+1), 0, 0, 0)
					}
				});

				if (vari.length > 0) {
					vari.each(function () {
						arr('login', 4, '', 194, '1,0,"' + $(this).attr('nom') + '","' + $(this).attr('var') + '",' + idproducto[0][0] + ',@@usr,@@impresa', 0, 0, 0)
					});
				}

				Materialize.toast('Producto Agregado Correctamente', 6000, 'green');
				arr('login', 6, '',14, '0,0,"",10', 0, 1, $("#listaproductos"));
				paginate(14);
				vaciar('productos');
				var imp = arr('login', 4, 'impuesto,nombre,valor', 109, '', 0, 0, 0)[0];
				for (var i = 0, len = imp.length; i < len; i++) {
					$("#impuestos").append('<li class="collection-item dismissable" id="newimp' + imp[i][0] + '"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv' + imp[i][0] + '" value="' + imp[i][2] + '" defecto="1">' + imp[i][1] + ' - ' + imp[i][2] + '%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo' + imp[i][0] + '" type="number" class="validate eder calcvv" value="0" style="margin: 0px;width: 50%"></div></div></li>');
				}
				$(".validate").css('border-bottom', '1px solid #9e9e9e');
				$(".validate").css('box-shadow', 'none');
				Materialize.updateTextFields();
				$("#vfamilia").focus();
			} else {
				Materialize.toast(idproducto[0]['ERROR'], 6000, 'red');
			}
		}
	} else {
		Materialize.toast(valprod, 6000, 'red');
	}
});

$(document).on("click", "#editprod", function () {
	var valprod = validarproductos();
	if (valprod == false) {
		var id = $(this).attr('idprod');
		var codigo = $("#vcodigo").val();
		var codigointerno = $("#vcodigointerno").val();
		var nombre = $("#vnombre").val();
		var costo = $("#vcosto").val().replace(/,/g,'');
		var ganancia = $("#vganancia").val().replace(/,/g,'');
		var venta = parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vganancia").val().replace(/,/g,""))/100)+1);
		var exoneracion = $("#vexoneracion").val() == '' || $("#vexoneracion").val() == '0.00' ? 0 : $("#vexoneracion").val();
		var peso = $("#vpeso").val();
		var idunidad = $("#vidunidad option:selected").val();
		var minimo = $("#vminimo").val();
		var maximo = $("#vmaximo").val();
		var maxdesc = $("#vmaxdescuento").val() == '' ? 0 : $("#vmaxdescuento").val();
		var idmoneda = $("#vidmoneda").val();
		var vari = $(".variables");
		var pass = 1;

		if (idunidad == 1)
			peso = peso * 1000;
		else if (idunidad == 3)
			peso = peso / 1000;
		else if (idunidad == 4)
			peso = peso * 1000;
		else if (idunidad == 6)
			peso = peso / 1000;
		else if (idunidad == 8)
			peso = peso / 100;
		

		if ($("#vidfamilia").val() == 0) {
			var familia = arr('login', 4, '', 106, '1,0,\"' + $("#vfamilia").val() + '\"', 0, 0, 0);
			if (familia[0][0] != undefined) {
				$("#vidfamilia").val(familia[0][0][0])
			} else {
				Materialize.toast(familia[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}
		if ($("#vidtipo").val() == 0) {
			var tipo = arr('login', 4, '', 135, '1,0,\"' + $("#vtipo").val() + '\",' + $("#vidfamilia").val(), 0, 0, 0);
			if (tipo[0][0] != undefined) {
				$("#vidtipo").val(tipo[0][0][0])
			} else {
				Materialize.toast(tipo[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}
		if ($("#vidmarca").val() == 0) {
			var marca = arr('login', 4, '', 136, '1,0,\"' + $("#vmarca").val() + '\",' + $("#vidtipo").val(), 0, 0, 0);
			if (marca[0][0] != undefined) {
				$("#vidmarca").val(marca[0][0][0])
			} else {
				Materialize.toast(marca[0]['ERROR'], 6000, 'red');
				pass = 0;
			}
		}

		if (pass == 1) {

			var idmarca = $("#vidmarca").val();
			var idproducto = arr('login', 4, '', 78, '2,' + id + ',\"' + codigo + '\",\"' + codigointerno + '\",\"' + nombre + '\",' + costo + ',' + ganancia + ',' + venta + ',' + exoneracion + ',' + peso + ',' + idunidad + ',' + minimo + ',' + maximo + ',' + maxdesc + ',' + idmarca + ',0,@@usr,1,@@impresa,""', '', 0, '');
			if (idproducto[0][0] != undefined) {

				$(".impuestos").each(function () {

					var idimpuesto = $(this).attr('id').substr(4);
					if ($(this).data('defecto') != $("#impexo" + idimpuesto).val()) {
						var imp = arr('login', 4, '', 86, '2,0,' + idproducto[0][0] + ',11,' + idimpuesto + ',' + $("#impexo" + idimpuesto).val(), '', 0, '');
					}
				});

				$(".precionivel").each(function () {
		
					var idfila = $(this).attr('id').substr(1);
					arr('login', 4, '', 108, '3,null,1,' + idproducto[0][0] + ',' + idfila + ',0,0,0,@@usr,@@impresa', 0, 0, 0);

					if ($("#vventa" + idfila).val().replace(/,/g,'') > 0) {
						 arr('login', 4, '', 108, '1,null,1,' + idproducto[0][0] + ',' + idfila + ',' + $("#vganancia" + idfila).val().replace(/,/g,'') + ',' + $("#vexoneracion" + idfila).val().replace(/,/g,'') + ','+ parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vganancia"+ idfila).val().replace(/,/g,""))/100)+1)+', @@usr,@@impresa', 0, 0, 0)


						
					}
					
				});
	
				$(".preciocliente").each(function () {
				
					var idfila = $(this).attr('id').substr(1);
					var idpxp = $(this).attr('idf');
					var accion = $(this).attr('accion');
					var valor = parseFloat($("#vventa" + idfila).val().replace(/,/g,''));
					// arr('login', 4, '', 108, '3,null,' + idproducto[0][0] + ',' + $("#vidcliente" + idfila).val() + ',0,0,@@usr,@@impresa', 0, 0, 0);
					if ( valor > 0) {
						arr('login', 4, '', 162, accion+','+idpxp+',' + idproducto[0][0] + ',' + $("#vidcliente" + idfila).val() + ',' + $("#vganancia" + idfila).val() + ',' + $("#vexoneracion" + idfila).val() + ',@@usr,@@impresa,'+parseFloat($("#vcosto").val().replace(/,/g,""))*((parseFloat($("#vganancia"+ idfila).val().replace(/,/g,""))/100)+1), 0, 0, 0);
					}
				});

				if (vari.length > 0) {
					arr('login', 4, '', 194, '3,0,"","",' + idproducto[0][0] + ',@@usr,@@impresa', 0, 0, 0)
					vari.each(function () {
						arr('login', 4, '', 194, '1,0,"' + $(this).attr('nom') + '","' + $(this).attr('var') + '",' + idproducto[0][0] + ',@@usr,@@impresa', 0, 0, 0)
					});
				}

				Materialize.toast('Producto Editado Correctamente', 6000, 'green');
				arr('login', 6, '',14, '0,0,"",10', '', 1, $("#listaproductos"));
				paginate(14);

				$(".validate").css('border-bottom', '1px solid #9e9e9e');
				$(".validate").css('box-shadow', 'none');
				Materialize.updateTextFields();
				$("#vfamilia").focus();
				/*$("#impuestos").addClass('hide');*/
			} else {
				Materialize.toast(idproducto[0]['ERROR'], 6000, 'red');
			}
		}
	} else {
		Materialize.toast(valprod, 6000, 'red');
	}
});

$(document).on("click", ".editprod", function () {
	$(".autocomplete-content").hide();
	$(".calcvv").val('0.00');
	var id = $(this).attr('id').substr(1);
	var p = arr('login', 4, '',14, id+',0,"","0,1"', 0, 0, 0);

	var q = p[0][0];
	var preccat = arr('login', 4, '', 110, id, 0, 0, 0)[0];
	var preccli = arr('login', 4, '', 165, id, 0, 0, 0)[0];

	$("#listavariables").html('');
	var car = arr('login', 6, 'id,nombre,valor', 193, 'idproducto = ' + id, 194, 1, $("#listavariables"))[0];
	var line = arr('login', 4, 'count(id)', 69, 'id > 0', 0, 0, 0)[0][0];
	$("#dinventario").addClass('hide');
	$(".accmodal").html("Actualizar Producto " + q[5]);
	$("#addprod").addClass('hide');
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
	$("#vidinventario").material_select();
	$("#vnombre").val(q[3]);
	$("#vcodigo").val(q[1]);
	$("#vcodigointerno").val(q[2])
	$("#vminimo").val(q[19]);
	$("#vmaximo").val(q[20]);
	$("#vmaxdescuento").val(q[22]);
	$("#vcosto").val(q[5]);
	$("#hvcosto").val(q[4]);
	$("#vganancia").val(q[8]);
	$("#vventa").val(q[11]);
	$("#hventa").val(q[10]);
	$("#vexoneracion").val(q[13]);
	if (q[15] != 1) {
		$("#dpeso").removeClass('hide');
	}else{
		$("#dpeso").addClass('hide');
	}
	$("#impuestos").html('');
	$(".chg1").html('');
	arr('login', 6, '', 153, id, 0, 1, $("#impuestos"))
	$("#impuestos").removeClass('hide');
	for (var i = 0; i < preccat.length; i++) {
		$("#vganancia" + preccat[i][0]).val(preccat[i][1]);
		$("#vventa" + preccat[i][0]).val(preccat[i][2]);
		$("#vexoneracion" + preccat[i][0]).val(preccat[i][3]);
	}
	if (preccli != '') {
		for (var i = 0; i < preccli.length; i++) {
			line++
			$(".chg1").append('<div class="row preciocliente rem" id="c' + line + '" accion="2" idf="'+ preccli[i][6] +'"><div class="col s12 m6 l3 center-align"><br><label>Nombre Cliente</label><div class="input-field"><input type="text" id="vcliente' + line + '" class="validate autocomplete" value="' + preccli[i][2] + '"><input type="hidden" class="vidcliente" id="vidcliente' + line + '" value="' + preccli[i][1] + '"></div></div><div class="col s12 m6 l3 center-align"><br><label>Ganancia</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" id="vganancia' + line + '" class="validate calcnc eder" value="' + preccli[i][3] + '" data-mask="9999999999.99" focus="vventa" num="2" line="' + line + '"></div></div><div class="col s12 m6 l3 center-align"><br><label>Precio Venta</label><div class="input-field"><i class="mdi prefix">¢</i><input type="text" id="vventa' + line + '" class="validate calcnc eder" value="' + preccli[i][4] + '" data-mask="9999999999.99" focus="vexoneracion" num="3" line="' + line + '"><input type="hidden" id="hventa' + line + '" value="' + preccli[i][4] + '"></div></div><div class="col s12 m6 l3 center-align"><br><label>Exoneración</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" id="vexoneracion' + line + '" style="width: 70%" class="validate calcnc eder" value="' + preccli[i][5] + '" data-mask="9999999999.99" nc="1" line="' + line + '"> <i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i> </div></div></div>');
		}
	} else {
		var countniv = arr('login', 4, 'count(id)+1', 69, 'id > 0', 0, 0, 0)[0][0];
		$(".chg1").append('<div class="row preciocliente" id="c' + countniv + '" accion="1" idf="0"><div class="col s12 m6 l3 center-align"><br><label>Nombre Cliente</label><div class="input-field"><input type="text" id="vcliente' + countniv + '" class="validate autocomplete rem2" value=""><input type="hidden" class="vidcliente rem2" id="vidcliente' + countniv + '" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Ganancia</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" id="vganancia' + countniv + '" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vventa" num="2" line="' + countniv + '"></div></div><div class="col s12 m6 l3 center-align"><br><label>Precio Venta</label><div class="input-field"><i class="mdi prefix">¢</i><input type="text" id="vventa' + countniv + '" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="3" line="' + countniv + '"><input type="hidden" id="hventa' + countniv + '" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Exoneración</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" style="width: 70%" id="vexoneracion' + countniv + '" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" nc="1" line="' + countniv + '"> <i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i></div></div></div>');
	}
	$("#vcosto").blur();
	Materialize.updateTextFields();
});

$(document).on("click",".descuentos",function() {
	var id = $(this).attr('id').substr(4);
	var prod = arr('login', 4, 'nombre', 11, 'id = ' + id, '', 0, '')[0];
	$(".dprod").text(prod);
	var desc = arr('login', 4, '', 152, id, 0, 0, 0)[0][0];
	if (desc != undefined) {
		arr('login', 6, '', 152, id, 0, 1, $("#listadescuentos"));
	} else {
		$("#listadescuentos").append('<span style="font-size: 1.5em;">No se encuentran descuentos asociados a este producto</span>')
	}
});

$(document).on("click", ".delprod", function () {
	var id = $(this).attr('id').substr(1);
	Materialize.toast('Desea Borrar este Producto?&nbsp;&nbsp;&nbsp;<button type="button" class="waves-effect waves-light btn blue accept" id="acc' + id + '"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-window-close"></i></button>', 10000, 'rounded');
});

$(document).on("click", ".accept", function () {
	var id = $(this).attr('id').substr(3);
	arr('login', 4, '', 78, '3,' + id + ',"","","",0,0,0,0,0,0,0,0,0,0,0,@@usr,0,@@impresa,""', '', 0, '');
	arr('login', 6, '',14, '0,0,""', 0, 1, $("#listaproductos"));
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
	// if ($(this).val() != '') {
		if (code == 13) {
	// 		var nombre = $("#prod").val();
	// 		var unidad = 0;
			
	// 		identify = nombre.substring(1,0);
	// 		if (identify != '[') {
	// 			unidad = arr('login',4,'idunidad',11,'id > 0 and nombre = "'+nombre+'"',0,0,0)[0][0];
	// 		    nombre = nombre.substring(0, nombre.indexOf(' - '));
	// 		}else{
	// 			unidad = -1;
	// 		    nombre = nombre.substring(0, nombre.indexOf(' - ')).replace('[SERV] ','');
	// 		}
			
	// 		if (unidad != 1 && unidad != -1) {
	// 			$(".tduni").removeClass('hide');
	// 		}else{
	// 			$(".tduni").addClass('hide');
	// 		}
			$("#cantidad").focus();
		}
	// }
});

$(document).on("keydown","#prod",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#prod").autocomplete({
                limit: 10,
                data: arr('login',4,'',77,'0,0,1,"'+$("#prod").val()+'"',0,0,0,1)
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
    var desc = $(this).val();
    var totpqt = parseFloat($("#htotal").val());
    total = totpqt / ((desc/100)+1);
    $("#totpqt").val(total.formatMoney(2,'.',','));
});

$(document).on("click","#addpqt",function(){
    var valpqt = validarpaquete();
    if (valpqt == false) {
        var descuento = $("#vdescuento").val() == '' ? 0 : $("#vdescuento").val();
        var total = isNaN($("#htotal").val()) ? '0.00' : parseFloat($("#htotal").val());
        var idpaquete = arr('login',4,'',60,'1,0,\"'+$("#vcodigo").val()+'\",\"'+$("#vnombre").val()+'\",'+descuento+','+total+',1,@@usr,@@impresa',0,0,0);
        if (idpaquete[0][0] != undefined) {
            $(".nomprod").each(function(){
                var id = $(this).attr('id').substr(1);
                var idproducto = $(this).attr('idproducto');
                var idservicio = $(this).attr('idservicio');
                var cantidad = $("#c"+id).text();
                var idunidad = $("#u"+id).attr('idunidad');
                arr('login',4,'',61,'1,'+idpaquete[0][0]+','+idproducto+','+idservicio+','+cantidad+','+idunidad+',@@usr,@@impresa',0,0,0);
            });
            Materialize.toast('Paquete Agregado Correctamente', 6000, "green");
            arr('login',6,'',62,'0,0',0,1,$("#listapqts"));
            vaciar('paquetes');
            $("#listapaquetes").html('');
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
    console.log(paq)
    arr('login',4,'',61,'3,'+id+',0,0,0,0,@@usr,@@impresa',0,0,0);
    Materialize.toast('Paquete Eliminado Correctamente', 6000, 'green');
    arr('login',6,'',62,'0,0',0,1,$("#listapqts"));
    // arr('login',6,'vid,vcodigo,vnombre,vdescuento,totpqt',76,'vid > 0 order by vnombre',0,1,$("#listapqts"));
});


// $(document).on("change",".ihcant",function(){
//     var precioprod = 0;
//     var htotal = 0;
//     var total = 0;
//     var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));

//     $(".nomprod").each(function(){
//         var id = $(this).attr('id').substr(1);
//         var cantidad = $("#hcant"+id).val();
//         var precio = parseFloat($("#htot"+id).attr('precio'));
//         precioprod = cantidad * precio;
//         $("#htot"+id).val(precioprod);
//         htotal += parseFloat($("#htot"+id).val());

//     });

//     total = htotal / ((desc / 100)+1);

//     $("#htotal").val(htotal);
//     $("#totpqt").val(total.formatMoney(2,'.',','));

// });

// $(document).on("keyup",".ihcant",function(){
//     var precioprod = 0;
//     var htotal = 0;
//     var total = 0;
//     var desc = $("#vdescuento option:selected").attr('valor') == '' ? 0 : parseFloat($("#vdescuento option:selected").attr('valor'));

//     $(".nomprod").each(function(){
//         var id = $(this).attr('id').substr(1);
//         var cantidad = $("#hcant"+id).val();
//         var precio = parseFloat($("#htot"+id).attr('precio'));
//         precioprod = cantidad * precio;
//         $("#htot"+id).val(precioprod);
//         htotal += parseFloat($("#htot"+id).val());

//     });

//     total = htotal / ((desc / 100)+1);

//     $("#htotal").val(htotal);
//     $("#totpqt").val(total.formatMoney(2,'.',','));

// });

// $(document).on("blur",".ihcant",function(){
//     var id = $(this).attr('id').substr(5);
//     var valor = $(this).val();
//     $("#c"+id).text(valor);
//     $("#editoff").click();
// });

$(document).on("change","#vtipoinv",function(){
    var tipoinv = $("#vtipoinv option:selected").val();
});

$(document).on("click",".salidainv",function(){
    var id = $(this).attr('id').substr(1);
    var bod = arr('login',4,'*',41,'id > 0',0,0,0)[0];
    var p = arr('login',4,'',410,id+',0',0,0,0)[0][0];
    var cant = arr('login',4,'replace(sum(cantidad),".00","")',97,'1',0,0,0)[0][0];
    $("#cantinv").text(cant);
    $("#inidbodega").val(0);
    $("#idinventario").val(0);
    $("#prcant").val('');
    $("#vcomentario").val('');
    $("#idprd").val(id);0
    $("#nomprod").text(p[0]);
    $("#prodcant").text(p[1])
    $("#inidbodega").text('');
    $("#outidbodega").text('');
    $("#destidbodega").text('');
    $("#movidbodega").text('');
    $("#didbodega").text('');
    for (var i = 0, len = bod.length; i < len; i++) {
    	$("#inidbodega").append('<option value="0">Seleccione una bodega</option>');
    	$("#inidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#outidbodega").append('<option value="0">Seleccione una bodega</option>');
        $("#outidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#destidbodega").append('<option value="0">Seleccione una bodega</option>');
        $("#destidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#movidbodega").append('<option value="0">Seleccione una bodega</option>');
        $("#movidbodega").append('<option value="'+bod[i][0]+'">'+bod[i][1]+'</option>');
        $("#didbodega").append('<option value="0">Seleccione una bodega</option>');
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
        var mov = arr('login',4,'',114,vacc+","+idprod+","+idinv+","+newinv+","+cantidad+",\""+comentario+"\",@@usr,@@impresa",0,0,0)[0][0];
        console.log(mov)
        var max = arr('login',4,'maximo',11,'id = '+idprod,0,0,0)[0][0];
        if (parseFloat(mov[0]) > parseFloat(max)) {
            Materialize.toast('Alerta: Producto está sobre el maximo de cantidad', 6000, 'amber lighten-2');
        }else{
            Materialize.toast('Entrada Realizada Correctamente', 6000, 'green');
        }
        $("#prodcant").text(mov[0])
        // window.open('productos?accion=4&id='+mov[1]);
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
        $("#vpbase").val('');
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
    $("#vperiodo").val(serv[5]);
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

    if (serv[13] == 0)
        $("#servpro").prop('checked',false);
    else
        $("#servpro").prop('checked',true);

    $("#dinvent").hide();
    $("#servpro").change();
    $("#vpbase").val(serv[4]);
    $("#vprecio").val(serv[8]);
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

// $(document).on("keyup",".calcvv",function(e){
//     var code = e.which || e.keyCode;
//     var num = $(this).attr('num') == undefined ? 0 : parseInt($(this).attr('num'));
//     var costo = isNaN($("#vcosto").val()) || $("#vcosto").val() == '' ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
//     var ganancia = isNaN($("#vganancia").val()) || $("#vganancia").val() == '' ?  0 : parseFloat($("#vganancia").val().replace(/,/g,""));
//     $("#hvcosto").val(costo);
//     totalizar(costo,ganancia,num);
//     if (code == 13) {
//         var focus = $(this).attr('focus');
//         if (focus == 'impuesto') {
//             $("#tb3").click();
//         }else{
//             $("#"+focus).select();
//         }
        
//     }
// });

$(document).on("keyup",".calcvv",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) 
		$(this).blur();
});

$(document).on("blur",".calcvv",function(){
	var num = $(this).attr('num') == undefined ? 0 : parseInt($(this).attr('num'));
	var costo = $("#vcosto").val().replace(/,/,'');
	var impuestos = 0;

	$(".impuestos").each(function () {
		var id = $(this).attr('id').substr(4);
		impuestos += parseFloat($(this).attr('value') * (1 - parseFloat($("#impexo" + id).val()) / 100));
	});

	if (parseInt(num) == 1) {
		$(".gan").each(function(){
			var padre = $(this).parent().parent().parent();
			var ganancia = padre.find('.gan').val().replace(/,/g,'');
			var exoneracion = padre.find('.exo').val().replace(/,/g,'');
			var venta = padre.find('.ven').val().replace(/,/g,'');
			tven = parseInt(venta) ? (((venta / (1 + (((impuestos - (impuestos * (exoneracion / 100)))) / 100))) / costo) - 1) * 100 : 0;
			tven = isNaN(tven) ? 0 : tven;
			padre.find('.gan').val(tven.formatMoney(2,'.',','));
		});
	}else{
		var padre = $(this).parent().parent().parent();
		var ganancia = padre.find('.gan').val().replace(/,/g,'');
		var exoneracion = padre.find('.exo').val().replace(/,/g,'');
		var venta = padre.find('.ven').val().replace(/,/g,'');
		var tgan = tven = hven = 0;

		costo = isNaN(costo) ? 0 : costo;
		ganancia = isNaN(ganancia) ? 0 : ganancia;
		exoneracion = isNaN(exoneracion) ? 0 : exoneracion;
		venta = isNaN(venta) ? 0 : venta;

		switch(num){
			case 2: //POR GANANCIA
				hven = costo * ((impuestos / 100) + 1) * ((ganancia / 100) + 1);
				tven = costo * (((impuestos - (impuestos * (exoneracion / 100))) / 100) + 1) * ((ganancia / 100) + 1);

				padre.find('.ven').val(tven.formatMoney(2,'.',','));
				padre.find('.hven').val(hven.formatMoney(2,'.',','));
				break;
			case 3: //POR VENTA
			case 4: //POR EXONERACION
				tven = parseInt(venta) ? (((venta / (1 + (((impuestos - (impuestos * (exoneracion / 100)))) / 100))) / costo) - 1) * 100 : 0;
				padre.find('.gan').val(tven.formatMoney(2,'.',','));
				break;
			default:
				break;
		}	
	}
	

});	

$(document).on("keyup",".calcnc",function(e){
    var code = e.which || e.keyCode;
    var ln = $(this).attr('line');
    var num = $(this).attr('num') == undefined ? 0 : parseInt($(this).attr('num'));
    var costo = isNaN($("#vcosto").val()) || $("#vcosto").val() == '' ? 0 : parseFloat($("#vcosto").val().replace(/,/g,""));
    var ganancia = isNaN($("#vganancia"+ln).val()) || $("#vganancia"+ln).val() == '' ?  0 : parseFloat($("#vganancia"+ln).val().replace(/,/g,""));
    $("#hvcosto").val(costo);
    totalizar(costo,ganancia,num,ln);
    if (code == 13) {
        var focus = $(this).attr('focus');
        $("#"+focus+ln).select();
    }
});

$(document).on("keyup",".vcalcserv",function(){

    var base = isNaN($("#vpbase").val()) || $("#vpbase").val() == '' ? 0 : parseFloat($("#vpbase").val().replace(/,/g,""));
    var precio = isNaN($("#vprecio").val()) || $("#vprecio").val() == '' ? 0 : parseFloat($("#vprecio").val().replace(/,/g,""));
    var ganancia = isNaN($("#vpganancia").val()) || $("#vpganancia").val() == '' ? 0 : parseFloat($("#vpganancia").val().replace(/,/g,""));
    var tganancia = 0;
    var tipo = parseInt($(this).attr('num'));
    switch(tipo) {
        case 1:
            if (ganancia == 0) {
                tganancia = base;
            }else{
                tganancia = base * ((ganancia / 100)+1);
            }
            $("#vprecio").val(tganancia.toFixed(2));
            break;
        case 2:
            tganancia = base * ((ganancia / 100)+1);
            $("#vprecio").val(tganancia.toFixed(2));
            break;
        case 3:
            tganancia = ((precio / base) - 1) * 100;
            $("#vpganancia").val(tganancia.toFixed(2));
            break;
    }


    Materialize.updateTextFields();

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
    $("#fproductos").submit(function(){return false});
    $("#addprod").removeClass('hide');
    $("#editprod").addClass('hide');
    $(".accmodalProd").html('Agregar Producto');
    $("#dinventario").removeClass('hide');
    $("#listavariables").html('');
    if ($("[id^=vcliente]").length == 0) {
        var countniv = arr('login',4,'count(id)+1',69,'id > 0',0,0,0)[0][0];
        $(".chg1").append('<div class="row preciocliente" id="c'+countniv+'" accion="1" idf="0"><div class="col s12 m6 l3 center-align"><br><label>Nombre Cliente</label><div class="input-field"><input type="text" id="vcliente'+countniv+'" class="validate autocomplete rem2" value=""><input type="hidden" class="vidcliente rem2" id="vidcliente'+countniv+'" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Ganancia</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" id="vganancia'+countniv+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vventa" num="2" line="'+countniv+'"></div></div><div class="col s12 m6 l3 center-align"><br><label>Precio Venta</label><div class="input-field"><i class="mdi prefix">¢</i><input type="text" id="vventa'+countniv+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" focus="vexoneracion" num="3" line="'+countniv+'"><input type="hidden" id="hventa'+countniv+'" value=""></div></div><div class="col s12 m6 l3 center-align"><br><label>Exoneración</label><div class="input-field"><i class="mdi prefix">%</i><input type="text" style="width: 70%" id="vexoneracion'+countniv+'" class="validate calcnc eder" value="0.00" data-mask="9999999999.99" nc="1" line="'+countniv+'"> <i class="mdi mdi-delete der red-text pbtn mdi-24px cl"></i></div></div></div>');
    }
    var imp = arr('login',4,'impuesto,nombre,valor',109,'',0,0,0)[0];
    vaciar('productos');
    $("#impuestos").removeClass('hide');
    for (var i = 0, len = imp.length; i < len; i++) {
        $("#impuestos").append('<li class="collection-item dismissable" id="newimp'+imp[i][0]+'"><div class="row" style="margin: 0px"><div class="col s6"><span class="impuestos" id="vimv'+imp[i][0]+'" value="'+imp[i][2]+'" defecto="1">'+imp[i][1]+' - '+imp[i][2]+'%</span></div><div class="col s6"><label>Exoneracion</label><input id="impexo'+imp[i][0]+'" type="number" class="validate eder calcvv" value="0" style="margin: 0px;width: 50%"></div></div></li>');
    };
    $(".validate").css('border-bottom', '1px solid #9e9e9e');
    $(".validate").css('box-shadow', 'none');
    Materialize.updateTextFields();
    setTimeout(function(){$("#vfamilia").focus();},500)
});

$(document).on("click","#addservice",function(){
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
    arr('login',6,'id,nombre',111,'id > 0',15,1,$("#vidinventario"));
    arr('login',6,'id,if(nombre = "",pfisico,nombre)',39,'id > 0',15,1,$("#vsucursales"));
    $("#vdescripcion").characterCounter();
    $('select').material_select();
    $("#vidtipo").val(0);
    $("#ajaxServicio").html('');
    $("#dinvent").show();
    setTimeout(function(){$("#vcodigo").focus();},500);
});

$(document).on("click","#addpackage",function(){
    $("#titpqt").html("Agregar Paquete");
    vaciar('paquetes');
    arr('login',6,'id,nombre,replace(valor,".00",""),concat(replace(valor,".00",""),"%")',94,'id > 0 order by nombre','',1,$("#vdescuento"));
    $('select').material_select();
    Materialize.updateTextFields();
    $("#editpck").attr('id','addpqt');
    $("#addpqt").html('Agregar');
    $("#listapaquetes").html('')
    setTimeout(function(){ $("#vcodigo").focus() },500);
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

function adddesc(vdesc, vvalor, nombre) {
	if ($("#vdesc" + vdesc).text() == '') {
		$("#tbldesc").removeClass('hide');
		$("#listadescuentos").append('<li class="collection-item dismissable" id="ld' + vdesc + '"><div>' + nombre + ' - <span class="descprod" id="vdesc' + vdesc + '">' + vvalor + '%</span><a class="secondary-content"><i class="mdi mdi-close mdi-24px but deldesc" id="deldesc' + vdesc + '"></i></a></div></li>');
	} else {
		Materialize.toast('Descuento del ' + vvalor + '% Ya Existe', 6000, 'yellow accent-4');;
	}
	$("#dscts").focus();
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
			$("#vidinventario").val(0);
			$("select").material_select();
			$("#vpeso").val('');
			$(".formprod").val('');
			$("#dvpeso").addClass('hide');
			$(".calcvv").val('0.00');
			$(".rem").remove();
			$(".rem2").val('');
			$(".calcnc").val('0.00');
			$("#impuestos").html('');
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
		case 3:
			subtotal = ((($("#vventa" + line).val() / (1 + (((impuestos - (impuestos * (exoneracion / 100)))) / 100))) / costo) - 1) * 100;
			$("#vganancia" + line).val(subtotal.toFixed(2));
			break;
		default:
			subtotal = ((($("#vventa" + line).val() / (1 + (((impuestos - (impuestos * (exoneracion / 100)))) / 100))) / costo) - 1) * 100;
			$("#vganancia" + line).val(subtotal.toFixed(2));
			break
	}

	$(".precionivel").each(function () {
		var id = $(this).attr('id').substr(1);
		var num = $(this).attr('num');
		ganancia = $("#vganancia" + id).val();
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
	
	var info = arr('login',4,'',77,id+','+tipo+',0,""',0,0,0)[0][0];
	var imv = arr('login',4,'',200,'11,'+id,0,0,0)[0][0][3];
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
		var precio = arr('login',4,'',14,info[0]+',0,"","0,1"',0,0,0)[0][0];
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

	if ($("#l" + info[0]).html() == undefined) {
		$("#listapaquetes").append('<div class="chip blue lighten-3" id="l' + info[0] + '"><input type="hidden" id="htot' + info[0] + '" value="' + ptotal + '" precio="' + info[4] + '"><span class="nomprod" id="n' + info[0] + '" idproducto="' + idprod + '" idservicio="' + idserv + '">' + prod + '</span> (<span class="hcant" id="c' + info[0] + '">' + cant + '</span><span class="huni" id="u' + info[0] + '" idunidad="' + uni + '">' + sim + '</span>)<i class="close mdi mdi-close mdi-24px cdel del" id="d' + info[0] + '"></i></div>');
	} else {
		$("#c" + info[0]).text(parseInt($("#c" + info[0]).text()) + parseInt(cant));
		var precio = parseFloat($("#htot" + info[0]).attr('precio'));
		var cantidad = parseFloat($("#c" + info[0]).text());
		$("#htot" + info[0]).val(precio * cantidad)
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
				$("#vpbase").val(0);
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

	if ($("#vfamilia").val() == '') {
		$("#tb1").click();
		$("#vfamilia").focus();
		return "Familia Requerido";
	}
	if ($("#vtipo").val() == '') {
		$("#tb1").click();
		$("#vtipo").focus();
		return "Tipo Requerido";
	}
	if ($("#vmarca").val() == '') {
		$("#tb1").click();
		$("#vmarca").focus();
		return "Marca Requerido";
	}
	if ($("#vpeso").val() == '') {
		$("#vpeso").val(0);
	}
	if ($("#vidunidad").val() == undefined) {
		$("#tb1").click();
		return 'Unidad Requerida';
	}
	if ($("#vidinventario").val() == 0) {
		$("#tb1").click();
		$("#vidinventario").focus();
		return 'Inventario Requerido';
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
	if ($("#vminimo").val() == 0) {
		$("#tb1").click();
		$("#vminimo").select();
		return 'Mínimo Requerido';
	}
	if ($("#vmaximo").val() == '') {
		$("#vmaximo").val(0);
	}
	if ($("#vmaxdescuento").val() == '') {
		$("#vmaxdescuento").val(0);
	}
	// if ($("#vcosto").val() == '0.00') {
	// 	$("#tb2").click();
	// 	$("#vcosto").select()
	// 	return 'Precio Costo Requerido';
	// }
	// if ($("#vcosto").val() <= 0) {
	// 	$("#tb2").click();
	// 	$("#vcosto").select()
	// 	return 'Precio Costo Debe ser Mayor a 0';
	// }

	if (isNaN($("#vcosto").val().replace(/,/g,''))) {
		$("#tb2").click();
		$("#vcosto").select()
		return 'Precio Costo Inválido';
	}

	if (isNaN($("#vganancia").val().replace(/,/g,''))) {
		$("#vganancia").val(0);
	}



	// if ($("#vventa").val() == '' || $("#vventa").val() == '0.00') {
	// 	$("#tb2").click();
	// 	$("#vventa").focus();
	// 	return 'Precio de Venta Requerido';
	// }

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
	if ($("#vdescripcion").val() == '') {
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

	if ($("#vpbase").val() == '') {
		$("#ms2").click();
		$("#vpbase").focus();
		return 'Precio Base Requerido'
	}

	if ($("#vprecio").val() == '') {
		$("#ms2").click();
		$("#vprecio").focus();
		return 'Precio Compra Requerido';
	}

	if ($("#vpganancia").val() == '') {
		$("#vpganancia").val(0);
	}

	if (!$("#isPeriodo").is(":checked"))
		$("#vdias").val(0);

	return false;

}

function validarpaquete() {
	if ($("#vnombre").val() == '') {
		$("#vnombre").focus();
		return "Nombre Paquete Requerido";
	}
	if ($("#totpqt").val() == '0.00') {
		return "Debe Agregar al Menos 1 Producto";
	}
	return false;
}

function cargar(vmodulo, vid) {

	switch (vmodulo['modulo']) {
		case 'producto':
			vmodulo['sel'] = 'vid,codigo as vcodigo,nombre as vnombre,costo as vcosto,ganancia as vganancia,venta as vventa,imv as vimv,idunidad as vidunidad,isgravado as visgravado,idmoneda as vidmoneda,idfamilia as vidfamilia,idtipo as vidtipo,idmarca as vidmarca,idbodega as vidbodega,cantidad as vcantidad,minimo as vminimo,maximo as vmaximo';
			vmodulo['tbl'] = 14;
			vmodulo['where'] = 'id = ' + vid;
			break;

		case 'servicio':
			vmodulo['sel'] = 'id as vid,codigo as vcodigo,nombre as vnombre,descripcion as vdescripcion,pbase as vpbase,periodo as vperiodo,idproveedor as vidproveedor,pcompra as vprecio,pganancia as vpganancia,idmoneda as vidmoneda';
			vmodulo['tbl'] = 16;
			vmodulo['where'] = 'id = ' + vid;
			break;
		case 'paquetes':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 14;
			vmodulo['where'] = 'id = ' + vid;
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
			arr['where'] = '0,0,"","0,10"';
			break;
		case 'servicios':
			var arr = {};
			arr['sel'] = '';
			arr['tbl'] = 13;
			arr['where'] = '';
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
	if (acc == 1) {
		deadclear(modulo);
		thorload(modulo);
	} else if (acc == 2) {
		thorload(modulo);
	}

}