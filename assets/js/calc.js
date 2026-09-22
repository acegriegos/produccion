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

	$("#_saf").click(function(){
		if($("#fact").val().trim() == ''){
			Materialize.toast('Factura Requerida',4000,'red')
			return false;
		}
		let saldos = getDatos('lpad(consecutivo,10,0),referencia as favor,if(comodin<>"",comodin,ifnull((select nombre from clientes where id = facturas.idcliente),"")) as cliente',64,'ididtipoventa in(1,7,10,8) and referencia <> "" and idtipo in(1,2)');
		if(saldos[0].length){
			let lista = '';
			$.each(saldos[0],function(i,e){
				lista += '<div class="col s12"> '+e[0]+' </div>';
			})
		}
		$("#modal-saldo").modal('open')
	})

	$("#prevista").click(function(){
		window.open('dashboard/cierres?accion=1&a4&id=0&tp=1');
	})

	$("#fact").blur(function(){
		var valor = $(this).val();
		valor = isNaN(valor) ? 0 : valor;

		$("#err_dia").addClass('hide');

		if(!$(this).val() )
			return false;

		if($("#choose:visible").length){
			$("#choose").parent().remove()
		}

		var tot = getDatos('truncate(subtotal+imv+exonerado+exento-descuento,2)-ifnull((select sum(if(idpago=1,pagacon-vuelto,total)) from pagosmixtos where idfactura = facturas.id and anulada is null),0)-ifnull((select sum(if(idtipo = 6,-1,1)*valor) from estadoscuentas where idtipo in(3,7,5,10,6) and idfactura = facturas.id and idestado = 1),0),id,idtipo,datediff(curdate(),fecha),date_format(fecha,"%d-%m-%Y")',64,'consecutivo = "'+$(this).val()+'" and idtipoventa = '+$("[name=tp]:checked").val());

		console.log(tot)

		if(tot[0].length == '0'){
			Materialize.toast($("[for=tp"+$("[name=tp]:checked").val()+"]").html()+' no Existente',4000,'red')
			$(this).focus().select()
			return false;
		}

		if(parseFloat(tot[0][0][0]) <= 5){
			Materialize.toast('Factura Cancelada',4000,'red')
			$("#fact").val('')
			$("#fact").focus();
			return false;
		}

		if(tot[0][0][3] != '0'){
			$("#err_dia").removeClass('hide');
			$("#err_dia_dato").html(tot[0][0][4])
		}

		if(tot[0][0][2] != 1){
  			Materialize.toast('Factura no es de Contado',4000,'red')
  			$(this).parent().remove();
			$("#fact").val('')
			$("#fact").focus();
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
		
		var vvuelto = parseInt(tot-pinic);
		vvuelto = vvuelto < 0 ? 0 :vvuelto
		$("#vuelto_").html( (vvuelto).formatMoney(2,'.',',') )
		if(pinic > tot){
			$("#_tar").val(parseFloat(pinic-tot).formatMoney(2,'.',',')).focus().select();
			return false;
		}
		$("#_tar").val('0.00');

		
		$("#proc_cierre").focus();
	});
});

$("#_tar").blur(function(){
	var tot = $(this).val().replace(/,/g,'');
	tot = isNaN(tot) ? 0 : tot;
	tot = parseInt(tot);
	var pinic = parseInt($("#vuelto_").html().replace(/,/g,''))
	var efect = parseInt($("#vuelto_pcon").val().replace(/,/g,''))
	var _tot = pinic-efect-tot;
	
	/*if(pinic > 0 && ){
		let vuelto = pinic-tot
		$("#vuelto_").html(vuelto.formatMoney(2,'.',','));
	}*/

	if(_tot > 0){
		if($("#_cheq:visible").length){
			$("#_cheq").val(_tot.formatMoney(2,'.',',')).focus().select()
			$(this).val(tot.formatMoney(2,'.',','))
			return false;
		}
	}
	$("#proc_cierre").focus()
});

	$("#_cheq").keyup(function(e){
		var code = e.keyCode || e.wich
		if(code == 13){
			$(this).blur()
		}
	});

	$("#_cheq").blur(function(){
		$("#proc_cierre").focus()
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
	window.open('dashboard/cuentas?accion=5&id='+idestadocuenta[0][0][1]+'&tipo=1&tp='+tp);
	
});

$("#do_cierre").click(function(){
	Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" ><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
});

$(document).on("click","#docierre",function(){
	var idcierre = arr('login',4,'',189,'@@usr,@@impresa,0,"","1",0',0,0,0)
	idcierre = idcierre[0][0][0];
	$(".cancel").parent().remove();

	if(parseInt(idcierre)){
		var postcierre = getDatos();
		window.open('dashboard/cierres?accion=1&a4=1&tp=1&id='+idcierre);
		location.reload();
	}else{
		Materialize.toast('Error Generando el Cierre',4000,'red')
	}
});

$(document).on("click",".cancel",function(){
    $(".cancel").parent().remove()
});

$(document).on("click",".dopendiente",function(){
    $(this).parent().parent().hide()
    var tot = parseInt($("#vuelto_pcon").val().replace(/,/g,''));
    var tar = parseFloat($("#_tar").val().replace(/,/g,''));
    var che = parseFloat($("#_cheq").val().replace(/,/g,''));
    var factura = $("#vuelto_pcon").attr('idfactura');

    if(tot > 0){
        insertar(336,'','null,'+factura+',1,"",0,'+tot+','+$("#vuelto_").html().replace(/,/g,'')+',now(),0,null,@@usr,@@impresa,0,null,0')
	}

	if(tar > 0)
    	insertar(336,'','null,'+factura+',2,"",'+tar+',0,0,now(),0,null,@@usr,@@impresa,0,null,0')

    if(che > 0)
    	insertar(336,'','null,'+factura+',4,"",'+che+',0,0,now(),0,null,@@usr,@@impresa,0,null,0')

    actualizar(64,'idestado=3,idtipopago=5','id='+factura);

    setTimeout(function () {
		endProcesss()
	}, 1000);

});

$("#proc_cierre").click(function(){
	var tot = parseInt($("#vuelto_pcon").val().replace(/,/g,''));
	var tar = parseFloat($("#_tar").val().replace(/,/g,''));
	var che = parseFloat($("#_cheq").val().replace(/,/g,''));
	var rmonto = (Math.ceil(parseInt($("#vuelto_tot").html().replace(/,/g,''))/5))*5;
	
	var tipo = 0;
	var idpago = 1;
	var factura = $("#vuelto_pcon").attr('idfactura');
	tipo = tot>0? tipo+1 : tipo;
	tipo = tar>0? tipo+1 : tipo;
	tipo = che>0? tipo+1 : tipo;

	if(tot+tar+che == 0){
		var iszero = 1;
		
		if(iszero)
			Materialize.toast('Valor Debe ser Mayor a Zero',4000,'red')
		else{
			 setTimeout(function () {
				endProcesss()
			}, 3000);
		}

		return false;
		
	}

	if(tot+tar+che < rmonto){
		var $toastContent = $('<span>Valor Inferior</span>').add($('<button class="btn-flat toast-action green white-text dopendiente" tp="1">Proceder</button>'));
    	Materialize.toast($toastContent, 5000);
		//Materialize.toast('Valor Debe ser Mayor al Total de Factura',4000,'red')
		return false;
	}

	idpago = 5;

	if(tot > 0){
        insertar(336,'','null,'+factura+',1,"",0,'+tot+','+$("#vuelto_").html().replace(/,/g,'')+',now(),0,null,@@usr,@@impresa,0,null,0')
	}

    if(tar > 0)
        insertar(336,'','null,'+factura+',2,"",'+tar+',0,0,now(),0,null,@@usr,@@impresa,0,null,0')

    if(che > 0)
        insertar(336,'','null,'+factura+',4,"",'+che+',0,0,now(),0,null,@@usr,@@impresa,0,null,0')

	actualizar(64,'idestado=1,idtipopago='+idpago,'id='+factura);

	setTimeout(function () {
		endProcesss()
	}, 3000);
});

function endProcesss(){
	cargarLista();
	$("#fact").val('').focus().select();
	$("#_tar").val('0.00');
	$("#_cheq").val('0.00');
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

$(document).on("click",".deltrans",function(){
	if($("#tdel").length){
		Materialize.Toast.removeAll();
	}
	let tipo = $(this).attr('tipo')
	let id = $(this).attr('vid')
	let idfact = $(this).attr('idfact')
	let padre = $(this).parent().parent()
	var $toastContent = $('<span id="tdel" >Desea Eliminar Este Registro? </span>').add($('<a class="btn red" style="margin:2px" id="delrg" inid="'+id+'" intip="'+tipo+'" idfact="'+idfact+'">Elminar</a> <a class="btn btn-default" id="delc">Cancelar</a>'));
    Materialize.toast($toastContent,10000,'',function(){padre.css('background-color','white'); });
	padre.css('background-color','red')
})

$(document).on("click","#delc",function(){
	Materialize.Toast.removeAll();
})

$(document).on("click","#delrg",function(){
	let id = $(this).attr('inid')
	//let tipo = $(this).attr('intip')
	let factura = $(this).attr('idfact')
	
	console.log(actualizar(336,'anulada=now(),idusuario_anular=@@usr','id='+id))
	actualizar(64,'idestado=1','id='+idfact)
	Materialize.Toast.removeAll();
	cargarLista()
})

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
	var vstr = vstrs = vtar = vtars = vcheq = vscheq = vsf = vssf = '';
	var tfact = tsecp = tfact_tar = tspec_tar = tcheq = tscheq = tsf = tssf =  0;

	lista = getDatos('',350,'"'+$("#fch").val()+'",@@usr,0');
	let delbtn = '';

	for (var i = 0; i < lista[0].length; i++) {
		delbtn = lista[0][i][9] == '0' ? '' : '<i class="mdi mdi-close red-text deltrans" style="float:right;cursor:pointer" vid="'+lista[0][i][8]+'" tipo="'+lista[0][i][9]+'" idfact="'+lista[0][i][10]+'" title="Eliminar Registro"></i>'
		
		if(lista[0][i][5] == '8'){
			if(lista[0][i][0])
			vstrs += '<tr> <td colspan="3">'+lista[0][i][0]+'  '+lista[0][i][7]+' '+delbtn+'</td> </tr> <tr style="border-bottom: 1px dashed black;"> <td style="text-align: right;">'+lista[0][i][3]+'</td> <td style="text-align: right;">'+lista[0][i][1]+'</td> <td style="text-align: right;">'+lista[0][i][2]+'</td> </tr>';

			tsecp += parseInt(lista[0][i][1].replace(/,/g,''))-parseInt(lista[0][i][2].replace(/,/g,''))
		}
		else{
			vstr += '<tr> <td colspan="3">'+lista[0][i][0]+'  '+lista[0][i][7]+' '+delbtn+'</td> </tr> <tr style="border-bottom: 1px dashed black;"> <td style="text-align: right;">'+lista[0][i][3]+'</td> <td style="text-align: right;">'+lista[0][i][1]+'</td> <td style="text-align: right;">'+lista[0][i][2]+' </td> </tr>';
				
			tfact += parseInt(lista[0][i][1].replace(/,/g,''))-parseInt(lista[0][i][2].replace(/,/g,''))
		}
	};

	$("#listavueltos").html(vstr)
	$("#listavueltos_spec").html(vstrs)
	$("#ttot").html(tfact.formatMoney(0,'.',','))
	$("#stot").html(tsecp.formatMoney(0,'.',','))

	lista = getDatos('',350,'"'+$("#fch").val()+'",@@usr,1');

	$.each(lista[0],function(v,e){

		delbtn = e[6] == '0' ? '' : '<i class="mdi mdi-close red-text deltrans" style="float:right;cursor:pointer" vid="'+e[5]+'" tipo="'+e[6]+'" title="Eliminar Registro"></i>';

		if(e[2] == '8'){
			switch(e[4]){
				case '2':
				vtars += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tspec_tar += parseFloat(e[1])
				break;
				case '4':
				vscheq += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tscheq += parseFloat(e[1])
				break;
				case '6':
				vssf += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tssf += parseFloat(e[1])
				break;
				default:
				break;
			}
			
		}else{
			switch(e[4]){
				case '2':
				vtar += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tfact_tar += parseFloat(e[1])
				break;
				case '4':
				vcheq += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tcheq += parseFloat(e[1])
				break;
				case '6':
				vsf += '<tr style="border-bottom: 1px dashed black;"> <td>'+e[0]+' '+e[3]+'</td> <td style="text-align: right;">'+parseFloat(e[1]).formatMoney(2,'.',',')+' '+delbtn+'</td> </tr>';
				tsf += parseFloat(e[1])
				default:
				break;
			}
			
		}
	});

	$("#listavueltos_tar").html(vtar)
	$("#listavueltos_spec_tar").html(vtars)
	$("#listavueltos_cheq").html(vcheq)
	$("#listavueltos_spec_cheq").html(vscheq)
	$("#listavueltos_cre").html(vsf)
	$("#listavueltos_spec_cre").html(vssf)

	$("#ttot_tar").html(tfact_tar.formatMoney(2,'.',','))
	$("#stot_tar").html(tspec_tar.formatMoney(2,'.',','))
	$("#ttot_cheq").html(tcheq.formatMoney(2,'.',','))
	$("#stot_cheq").html(tscheq.formatMoney(2,'.',','))
	$("#ttot_cre").html(tsf.formatMoney(2,'.',','))
	$("#stot_cre").html(tssf.formatMoney(2,'.',','))
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