var config;
var gtipo = 1;

$(function(){

	config = getDatos('',42,'@@impresa',0,0)[0][0];
	var abo = getDatos('nombre',1,'id=if("@@usr"="",0,@@usr)')[0];
	
	if(abo.length){
		$("#ulogged").html(abo[0][0])
		$(".abo").removeClass('hide')
	}

	var fecha = new Date();
	$("#fch").val(fecha.getFullYear()+'-'+(fecha.getMonth()+1).toString().padStart(2, '0')+'-'+(fecha.getDate().toString().padStart(2, '0')) )

	cargarLista();
	cargarMonedas();
	cargarTipoPago();

	$("#fact").focus().select();

	$("[name=tp]").change(function(){
		$("#fact").focus().select()
	})

	$("#fact").keyup(function(e){
		var code = e.wich || e.keyCode
		if (code == 13)
			$(this).blur()
	});

	$("#fact").blur(function(){
		var valor = $(this).val();
		valor = isNaN(valor) ? 0 : valor;

		$("#err_dia").addClass('hide');

		if(!$(this).val() )
			return false;

		if($("#choose:visible").length){
			$("#choose").parent().remove()
		}

		var tot = getDatos('truncate(subtotal+imv+exonerado+exento-descuento,2),id,idtipo,datediff(curdate(),fecha),date_format(fecha,"%d-%m-%Y")',64,'consecutivo = "'+$(this).val()+'" and idtipoventa = '+$("[name=tp]:checked").val());

		if(tot[0].length == '0'){
			Materialize.toast($("[for=tp"+$("[name=tp]:checked").val()+"]").html()+' no Existente',4000,'red')
			$(this).focus().select()
			return false;
		}

		if(tot[0][0][3] != '0'){
			$("#err_dia").removeClass('hide');
			$("#err_dia_dato").html(tot[0][0][4])
		}

		if(tot[0][0][2] != 1){
			 var $toastContent = $('<span id="choose" tot="'+tot[0][0][0]+'" pcn="'+tot[0][0][1]+'">'+$("[for=tp"+$("[name=tp]:checked").val()+"]").html()+' de Crédito desea Continuar?</span>').add($('<button class="btn-flat toast-action" id="cs">SI</button> <button class="btn-flat toast-action" id="cn">NO</button>'));
  			Materialize.toast($toastContent)

  			$("#choose").parent().css('background-color','green')
		}else{
			$("#vuelto_tot").html(parseFloat(tot[0][0][0]).formatMoney(2,'.',','));
			$("#vuelto_pcon").focus().select();
			$("#vuelto_pcon").attr('idfactura',tot[0][0][1])
		}
	});

	$("#ncli").keydown(function(e){
		var charCode = e.which || e.keyCode;
		var charStr = String.fromCharCode(charCode);
		if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
			$(".autocomplete-content").remove();
			$("#ncli").autocomplete({
				limit: 20,
				data: arr('login',4,'trim(concat(if(web <> "",web,nombre)," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'id > 0 and !bisproveedor  and idsucursal = @@impresa having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1),
                onAutocomplete: function(val){

                    var sql = "id > 0 and !bisproveedor and concat(if(web <> '',web,nombre),' *',replace(cedula, '-',''),'*') = '"+$("#ncli").val()+"' and idsucursal = @@impresa limit 1";
					var id = arr('login',4,'id,format(getsaldocliente(id,0),2),idmoneda',2,sql,0,0,0);
					var tabla = $("#data-table-facturas").DataTable();
					tabla.destroy();
					$("#monto").val(0)
					$("#referencia").val('');
					
					if ($("#ncli").val().trim().length) {
						if(id[0].length == 0) {
							Materialize.toast('Cliente no existente', 4000, 'red');
							$("#listaCuentasPm").html('');
							$("#hclie").val(0)
							$("#saldo").html('0.00')
						}else{
							var p = arr('login',4,'',214,1+',0,'+id[0][0][0]+',0,0,@@impresa',0,0,0);
							
							var tabla = $("#listaCuentasPm");
							tabla.html('');
							for (var i = 0; i < p[0].length; i++) {
								var q = p[0][i];
								var check = '<td style="padding:0"> <input type="checkbox" id="check'+i+'" value="'+q[12]+'" vl="'+q[14]+'" class="factclie" style="margin:0px;"/><label for="check'+i+'"></label> </td>'; 
								var tdFecha = '<td style="padding:0">'+q[5]+'</td>';
								var tdSaldo = '<td style="padding:0">'+q[6]+'</td>';
								var tdAbono = '<td style="padding:0"><input type="text" id="ab'+i+'" class="eder vabono" value="'+q[14]+'" style="margin:0px;" /></td>';
								var trIdFactura = '<tr>'+check+'<td>'+q[3]+'</td>'+tdFecha+tdSaldo+tdAbono+'</tr>';
								tabla.append(trIdFactura);
							}
							$("#data-table-facturas").dataTable({
								bFilter : false,
						        bScrollInfinite : true,
						        bSort : true,
						        bLengthChange : true,
						        bPaginate :  false,
						        bInfo : false,
								order : [],
								"bLengthChange": false
							});
							$("#saldo").html(id[0][0][1])
							$("#hclie").val(id[0][0][0]);
							$("#monto").focus().select();
							$("#monedas").val(id[0][0][2]).change()
						}
					}
                }
			});
		}
	});

	$("#fch").change(function(){
		cargarLista()
	});

	$("#vuelto_pcon").keyup(function(e){
		var code = e.keyCode || e.wich
		if(code == 13){
			$(this).blur()
		}
	});

	$("#_tar").keyup(function(e){
		var code = e.keyCode || e.wich
		if(code == 13){
			$(this).blur()
		}
	});

	$("#vuelto_pcon").blur(function(){
		var tot = $(this).val().replace(/,/g,'');
		tot = isNaN(tot) ? 0 : tot;
		tot = parseInt(tot)
		if(!tot){
			$("#_tar").val($("#vuelto_tot").html()).focus().select();
			return false;
		}
		$(this).val(parseFloat(tot).formatMoney(2,'.',',') )

		var pinic = (Math.ceil(parseInt($("#vuelto_tot").html().replace(/,/g,''))/5))*5
		if(pinic > tot){
			$("#_tar").val(parseFloat(pinic-tot).formatMoney(2,'.',',')).focus().select();
			return false;
		}
		var vvuelto = parseInt(tot-pinic);
		$("#vuelto_").html( (vvuelto).formatMoney(2,'.',',') )
		$("#_tar").val('0.00');

		$("#_dep").val('0.00');
		$("#proc_cierre").click();
	});
});

$("#_tar").blur(function(){
	var tot = $(this).val().replace(/,/g,'');
	tot = isNaN(tot) ? 0 : tot;
	tot = parseInt(tot);
	var pinic = (Math.ceil(parseInt($("#vuelto_tot").html().replace(/,/g,''))/5))*5
	var efect = parseInt($("#vuelto_pcon").val().replace(/,/g,''))
	var _tot = pinic-efect-tot;
	if(_tot > 0){
		$("#_dep").val(_tot.formatMoney(2,'.',',')).focus().select()
		$(this).val(tot.formatMoney(2,'.',','))
		return false;
	}
	$("#proc_cierre").click()
});

	$("#_dep").keyup(function(e){
		var code = e.keyCode || e.wich
		if(code == 13){
			$(this).blur()
		}
	});

	$("#_dep").blur(function(){
		$("#proc_cierre").click()
	})

$(document).on("click","#btnPagar",function(){

	var monto = $("#monto").val().replace(/,/g,'');

	var idfactura = val = vmonto = idestadocuenta = 0;
	var saldo = $("#saldo").html().replace(/,/g,'');
	var idtipo = gtipo==2 ? 8 : 7;

	if (!$(".factclie").length) {
		Materialize.toast('No hay Facturas que Cancelar',4000,'red');
		return false;
	}
	var vidmoneda = $("#monedas").val();
	var divisa = $("#monedas option:selected").attr('dv');
	var fechabol = $("#fecha").val();	
	var idpag = getDatos('ec7+1',252,'idsucursal = @@impresa',0,0,0)[0][0][0];

	actualizar(252,'ec7 = ec7+1','idsucursal = @@impresa')

	if ($(".factclie:checked").length) {

		$(".factclie:checked").each(function(){
			idfactura = $(this).val();
			val = parseFloat($(this).attr('vl'));

			monto -= val;
			if(monto > 0){
				vmonto = val;
				idestadocuenta = arr('login',4,'',300,'1,0,'+idtipo+',1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
				console.log(idestadocuenta)
			}
			else{
				vmonto = val-monto*-1;
				idestadocuenta = arr('login',4,'',300,'1,0,'+idtipo+',1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
				console.log(idestadocuenta)
				return false;
			}	
		});
	}else{

		$(".factclie").each(function(){
			idfactura = $(this).val();
			val = parseFloat($(this).attr('vl'));
			monto -= val;
			if(monto > 0){
				vmonto = val;
				idestadocuenta = arr('login',4,'',300,'1,0,'+idtipo+',1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
			}
			else{
				vmonto = val-monto*-1;
				idestadocuenta = arr('login',4,'',300,'1,0,'+idtipo+',1,'+idfactura+',@@usr,'+vmonto+',0,'+vmonto+','+idpag+','+$("#idtipopagopagar").val()+',"'+$("#comentario").val()+'",@@impresa,"'+$("#referencia").val()+'",'+vidmoneda+','+divisa+',"'+fechabol+'"',0,0,0);
				return false;
			}
		});
	}
	monto = $("#monto").val().replace(/,/g,'');
	if (parseFloat(monto) > parseFloat(saldo))
		Materialize.toast('Vuelto: '+parseFloat(monto)-parseFloat(saldo),4000)
	Materialize.toast('Pagos Realizados Exitosamente',4000,'green');
	arr('login',6,'',214,gtipo+',0,0,0,2,@@impresa',0,1,$("#listaCuentasx"));
	$("#ncli").val('')
	$("#listaCuentasPm").html('');
	$("#hclie").val(0)
	$("#monto").val('');
	$("#saldo").html('0.00');
	$("#comentario").val('');
	$("#referencia").val('')
	$("#idtipopagopagar").val(0).material_select('update');

	var tp = $("#p_vm").is(":checked") == true ? 1 : 2;
	window.open('dashboard/cuentas?accion=5&id='+idestadocuenta[0][0][1]+'&tn='+$(".add[modulo=estadoscuenta]").attr('tipo')+'&tp='+tp);
	
});

$("#do_cierre").click(function(){
	Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" ><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
});

$(document).on("click","#docierre",function(){
	var idcierre = arr('login',4,'',189,'@@usr,@@impresa,0,"","1",0,""',0,0,0)
	idcierre = idcierre[0][0][0];
	$(".cancel").parent().remove();

	if(parseInt(idcierre)){
		var postcierre = getDatos();
		window.open('dashboard/cierres?accion=1&a4=1&id='+idcierre);
		location.reload();
	}else{
		Materialize.toast('Error Generando el Cierre',4000,'red')
	}
});

$(document).on("click",".cancel",function(){
    $(".cancel").parent().remove()
});

$("#proc_cierre").click(function(){
	var tot = parseInt($("#vuelto_pcon").val().replace(/,/,''));
	var tar = parseFloat($("#_tar").val().replace(/,/,''));
	var dep = parseFloat($("#_dep").val().replace(/,/,''));
	var rmonto = (Math.ceil(parseInt($("#vuelto_tot").html().replace(/,/g,''))/5))*5;
	
	var tipo = 0;
	var idpago = 1;
	var factura = $("#vuelto_pcon").attr('idfactura');
	tipo = tot>0? tipo+1 : tipo;
	tipo = tar>0? tipo+1 : tipo;
	tipo = dep>0? tipo+1 : tipo;

	if(tot+tar+dep < rmonto){
		Materialize.toast('Valor Debe ser Mayor al Total de Factura',4000,'red')
		return false;
	}

	eliminar(336,'idfactura='+factura);

	if(tipo > 1){
		idpago = 5;

		if(tot > 0){
            insertar(336,'','null,'+factura+',1,"",'+tot)
		}

        if(tar > 0)
            insertar(336,'','null,'+factura+',2,"",'+tar)

        if(dep > 0)
            insertar(336,'','null,'+factura+',3,"",'+dep)

	}else{
		if(tot > 0){
			getDatos('',349,$("#vuelto_pcon").attr('idfactura')+','+tot+','+$("#vuelto_").html().replace(/,/,''));
		}

		if(tar > 0){
			console.log(eliminar(363,'ifactura='+$("#vuelto_pcon").attr('idfactura')))
			idpago = 2;
		}

		if(dep > 0){
			eliminar(363,'ifactura='+$("#vuelto_pcon").attr('idfactura'))
			idpago = 3;
		}
	}

	actualizar(64,'idtipopago='+idpago,'id='+$("#vuelto_pcon").attr('idfactura'));

	setTimeout(function () {
		endProcesss()
	}, 3000);
});

function endProcesss(){
	cargarLista();
	$("#fact").val('').focus().select();
	$("#_tar").val('0.00');
	$("#_dep").val('0.00');
	$("#vuelto_pcon").val('0.00');
	$("#vuelto_").html('0.00');
	$("#vuelto_tot").html('0.00')
	$("#vuelto_pcon").attr('idfactura',0)

	$("#err_dia").addClass('hide');
}

$(document).on('click','#cn',function(){
	$(this).parent().remove();
	$("#fact").val('')
	$("#fact").focus();
});

$(document).on('click','#cs',function(){
	
	$("#vuelto_tot").html(parseFloat($("#choose").attr('tot')).formatMoney(2,'.',','));
	$("#vuelto_pcon").focus().select();
	$("#vuelto_pcon").attr('idfactura',$("#choose").attr('pcn'))

	$(this).parent().remove();
});

$(document).on("click",".pagomu",function(){
		
	$(this).sideNav({
		edge: 'left', // Choose the horizontal origin
		closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
	});
	$(this).sideNav('show');

	$("#data-table-facturas").dataTable({
		bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
	});

	$("#ncli").focus().select();
	if (config[5] == 1){
        $("#p_vm").attr('checked',true);
    }else{
        $("#p_vm").attr('checked',false);
    }
});

$(document).on("click",".factclie",function(){
	var mt = parseFloat($("#monto").val());
	mt = isNaN(mt) ? 0 : mt;
	var id = $(this).attr('id').substr(5);
	var valor = parseFloat($("#ab"+id).val());
	valor = isNaN(valor) ? 0 : valor;

	if ($(this).is(":checked")) {
		mt += valor;
	}else{
		mt -= valor;
	}
	$("#monto").val(parseFloat(mt).formatMoney(2,'.',''))
});	

function cargarLista(){
	var lista = '';
	var vstr = vstrs = vtar = vtars = '';
	var tfact = tsecp = tfact_tar = tspec_tar =  0;

	lista = getDatos('',350,'"'+$("#fch").val()+'",@@usr');

	for (var i = 0; i < lista[0].length; i++) {
		
		if(lista[0][i][5] == '8'){
			if(lista[0][i][0])
			vstrs += '<tr> <td colspan="3">'+lista[0][i][0]+'</td> </tr> <tr style="border-bottom: 1px dashed black;"> <td style="text-align: right;">'+lista[0][i][3]+'</td> <td style="text-align: right;">'+lista[0][i][1]+'</td> <td style="text-align: right;">'+lista[0][i][2]+'</td> </tr>';

			tsecp += parseInt(lista[0][i][1].replace(/,/g,''))-parseInt(lista[0][i][2].replace(/,/g,''))
		}
		else{
			vstr += '<tr> <td colspan="3">'+lista[0][i][0]+'</td> </tr> <tr style="border-bottom: 1px dashed black;"> <td style="text-align: right;">'+lista[0][i][3]+'</td> <td style="text-align: right;">'+lista[0][i][1]+'</td> <td style="text-align: right;">'+lista[0][i][2]+'</td> </tr>';
				
			tfact += parseInt(lista[0][i][1].replace(/,/g,''))-parseInt(lista[0][i][2].replace(/,/g,''))
		}
	};

	$("#listavueltos").html(vstr)
	$("#listavueltos_spec").html(vstrs)
	$("#ttot").html(tfact.formatMoney(0,'.',','))
	$("#stot").html(tsecp.formatMoney(0,'.',','))

	lista = getDatos('concat(case idtipoventa when 1 then "F-" when 7 then "T-" else "S-" end,consecutivo),subtotal+imv+exonerado+exento-descuento,idtipoventa',64,'idtipopago = 2 and date_format(fecha,"%Y-%m-%d") = "'+$("#fch").val()+'"');

	$.each(lista[0],function(v,e){
		if(e[2] == '8'){
			vtars += '<tr> <td>'+e[0]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+'</td> </tr>';
			tspec_tar += parseFloat(e[1])
		}else{
			vtar += '<tr> <td>'+e[0]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+'</td> </tr>';
			tfact_tar += parseFloat(e[1])
		}
	});

	$("#listavueltos_tar").html(vtar)
	$("#listavueltos_spec_tar").html(vtars)
	$("#ttot_tar").html(tfact_tar.formatMoney(2,'.',','))
	$("#stot_tar").html(tspec_tar.formatMoney(2,'.',','))
}


function limpiar(){
	$("#fact").val('');
	$("#fact").focus().select();
	$("#vuelto_pcon").val('');
	$("#vuelto_").html('0.00');
	$("#vuelto_tot").html('0.00')
}

function cargarMonedas(){
	var lista = getDatos('id,nombre,valor+suma as valor,simbolo',54,'id > 0 order by principal desc');
	var slista = '';

	$.each(lista[0],function(v,e){
		slista += '<option value="'+e[0]+'" dv="'+e[2]+'">'+e[1]+'</option>'
	});

	$("#monedas").html(slista).material_select('update')
}

function cargarTipoPago(){
	var lista = getDatos('id,nombre',26,'id > 0 order by principal desc, nombre');
	var slista = '';

	$.each(lista[0],function(v,e){
		slista += '<option value="'+e[0]+'" >'+e[1]+'</option>'
	});

	$("#idtipopagopagar").html(slista).material_select('update')
}