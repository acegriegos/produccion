var config;
var guser = '@@usr';

$(function(){
	 config = getDatos('',42,'@@impresa',0,0)[0][0];

	$("#tpc").change(function(){
		if($(this).is(":checked")){
			$(".auto").removeClass('hide')
			$(".manu").addClass('hide')
		}else{
			var fecha = new Date();
			$('#mn-fecha').val(fecha.getFullYear()+'-'+("0"+(fecha.getMonth()+1)).slice(-2)+'-'+("0"+fecha.getDate()).slice(-2));
			$("#mn-fecha").change();

			$(".manu").removeClass('hide')
			$(".auto").addClass('hide');

			$("#mn-tefectivo").focus().select();
		}
	});

	permisos(7301,7302);

	$("#mn-fecha").change(function(){
		var info = getDatos('ifnull(sum(if(idtipo = 2,subtotal+exento+exonerado+imv-descuento,0)),0) as credito,ifnull(sum(subtotal+exento+exonerado+imv-descuento),0) as total,ifnull((select sum(valor) from estadoscuentas where date_format(fecha,"%Y-%m-%d") = date_format(facturas.fecha,"%Y-%m-%d") and idfactura = facturas.id and idtipo = 5 ),0) as nc, ifnull(sum(if(idtipo = 2,(select valor from estadoscuentas where idfactura = facturas.id and idtipo = 5 and date_format(fecha,"%Y-%m-%d") = date_format(facturas.fecha,"%Y-%m-%d") ),0)),0) as nc_cre,ifnull((select sum(valor) from estadoscuentas where date_format(fecha,"%Y-%m-%d") = "'+$(this).val()+'" and idtipo in(3,7) ),0) as abonos,ifnull((select sum(valor) from estadoscuentas where date_format(fecha,"%Y-%m-%d") = "'+$(this).val()+'" and idtipo in(5) ),0) as rnc',64,'idsucursal = @@impresa and date_format(fecha,"%Y-%m-%d") = "'+$(this).val()+'"');
	
		if(info[0].length){
			$("#mn-credito").val((parseFloat(info[0][0][0])-parseFloat(info[0][0][3])).formatMoney(2,'.',','));
			$("#mn-vdia").val((parseFloat(info[0][0][1])-parseFloat(info[0][0][2])).formatMoney(2,'.',','));
			//$("#mn-tncre").val(parseFloat(info[0][0][5]).formatMoney(2,'.',','))
			$("#mn-tabo").val(parseFloat(info[0][0][4]).formatMoney(2,'.',','))
			totalizar_mn();
		}
	});

	$(".numeric").keyup(function(e){
		var code = e.which || e.keyCode;
		if(code == 13){
			var next;
			switch ($(this).attr('id')) {
				case "mn-tefectivo":
					next = "mn-credito";
					var valor = parseFloat($(this).val().replace(/,/g,''))
					valor += parseFloat($("#mn-tabo").val().replace(/,/g,''))
					valor = valor.formatMoney(2,'.',',')
					$("#mn-deposito").val(valor);
					$("#mn-depositom").val(valor);					
					break;
				case "mn-credito":
					next = "mn-cheque";					
					break;
				case "mn-cheque":
					next = "mn-tarjeta";					
					break;
				case "mn-tarjeta":
					next = "mn-compra";					
					break;
				case "mn-compra":
					next = "mn-otros";					
					break;
				case "mn-otros":
					next = "mn-depositom";					
					break;
				case "mn-depositom":
					next = "mn-depositon";					
					break;
				case "mn-depositon":
					return false;		
					break;
				case "mn-tabo":
					break;
				default:
					console.log($(this).attr('id'))
					break;
			}
			totalizar_mn()
			$("#"+next).focus().select();
		}
	});

	$("#print-cierre").click(function(){
                      
        var str = '<style>           th, td {                 padding-top: 1%;                 background-color:none;             }  .borde{border-bottom: 1px solid black; margin-left:2%}        </style> <h3 align="center">'+$("#jstprint").html()+'</h3> <table style="width: 100%" cellspadding="2"> <tr style="margin-bottom: 2%"> <td style="width: 50%;text-align:right"></td> <td style="width: 3%;"></td> <td style="width: 47%;" align="center"></td></tr> <tr> <td></td> <td></td> <td style="text-align: right;"><b>Fecha: </b>'+$("#mn-fecha").val()+'</td> </tr>';

        var last = $("#mn-tbl tr").length-1;

        $("#mn-tbl tr").each(function(index){
            if(index != last)
            str += '<tr><td style="size: 8px;text-align: right;">'+$('td:nth-child(1)',this).html()+'</td> <td></td> <td style="size: 8px;text-align:left;">'+$('td:nth-child(2)',this).find('.numeric').val()+'</td> </tr>';
        });

        newWin= window.open("");
        newWin.document.write(str);
        newWin.print();
        newWin.close();

	});

	if (parseInt($("#BUSS").val()) != 1) {
		var monto = arr('login',4,'monto',404,'idusuario = '+guser+' and date_format(fecha,"%Y-%m-%d") and caja = '+$("#BUSS").attr('idcaja'),0,0,0)[0][0];
		if (monto == undefined) {
			$(".tt").removeAttr('id')
			$(".tt").addClass('tooltipped')
			$('.tt').tooltip({delay: 50,tooltip: 'Debe iniciar caja'});
		}else{
			$(".tt").attr('id','chkcierre');
		}
	}

	$("#cmixto").click(function(){
		var mefe = $("#mxtefe").val()
		mefe = isNaN(mefe) ? 0 : parseFloat(mefe);

		var mtar = $("#mxteta").val()
		mtar = isNaN(mtar) ? 0 : parseFloat(mtar);

		var mdep = $("#mxtede").val()
		mdep = isNaN(mdep) ? 0 : parseFloat(mdep);

		var suma = (mefe+mtar+mdep);

		if(suma != parseFloat($("#modal-mxt").attr('tot')) && suma != 0){
			Materialize.toast('Montos no Suman el Total de la Factura',4000,'red');
			return false;
		}

		if(suma > 0){
			var e_efe = getDatos('total',336,'idpago = 1 and idfactura = '+$("#modal-mxt").attr('rid'))
			var e_tar = getDatos('total',336,'idpago = 2 and idfactura = '+$("#modal-mxt").attr('rid'))
			var e_dep = getDatos('total',336,'idpago = 3 and idfactura = '+$("#modal-mxt").attr('rid'))

			if(e_efe[0].length)
				actualizar(336,'total='+mefe,'idpago = 1 and idfactura = '+$("#modal-mxt").attr('rid'))
			else{
				if(mefe)
					insertar(336,'','null,'+$("#modal-mxt").attr('rid')+',1,"",'+mefe);
			}

			if(e_tar[0].length)
				actualizar(336,'total='+mefe,'idpago = 2 and idfactura = '+$("#modal-mxt").attr('rid'))
			else{
				if(mtar)
					insertar(336,'','null,'+$("#modal-mxt").attr('rid')+',2,"",'+mtar);
			}

			if(e_dep[0].length)
				actualizar(336,'total='+mefe,'idpago = 3 and idfactura = '+$("#modal-mxt").attr('rid'))
			else{
				if(mdep)
					insertar(336,'','null,'+$("#modal-mxt").attr('rid')+',3,"",'+mdep);
			}

			var act = actualizar(64,'idtipopago=5','id='+$("#modal-mxt").attr('rid'));
			arr('login',6,'',183,'"'+$("#fcierre").html()+'",'+guser+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listafacturas"));
			$("#tcontado").text($("#hidet").attr('tcon'));
			$("#tcredito").text($("#hidet").attr('tcre'));
			$("#tefectivo").text($("#hidet").attr('tefe'));
			$("#ttarjeta").text($("#hidet").attr('ttar'));

		}
	});

	$("#mcierre").keyup(function(e){
		var code = e.wich || e.keyCode
		if (code == 13){
			$("#iniciarcaja").click();
		} 
			
	});

	$("#iniciarcaja").click(function(){
		var valor = $("#mcierre").val().replace(/,/g,'')

		if($("#mcierre").attr('readonly') != undefined){
			Materialize.toast('Caja Iniciada',4000,'red')
			return false;
		}

		if($("#BUSS").attr('ccierre') == '1'){
			$("#totalizar").attr('tp',2);
			$("#totcashier").html(parseInt(valor).formatMoney(2,'.',','))
			$("#modal-tipomonedas").modal('open');
		}else{
			if(isNaN(valor)){
				Materialize.toast('Valor Debe ser Numérico',4000,'red')
				$("#mcierre").focus().select();
				return false;
			}

			if(valor <= 0){
				Materialize.toast('Valor debe ser Mayor a 0',4000,'red');
				$("#mcierre").focus().select();
				return false;
			}

			var lcinic = insertar(404,'','null,@@usr,'+valor+',now(),null,null,@@impresa,0,'+$("#BUSS").attr('idcaja'));
			Materialize.toast('Caja Iniciada Correctamente',4000,'green');
			$("#mcierre").attr('readonly',true);
		}
	});

	$('.chips').material_chip();

	$("#data-table-facturas").DataTable({
	    bFilter: false,
	    bScrollInfinite: true,
	    bSort: false,
	    bLengthChange: false,
	    order: [],
	    bPaginate: false,
	    info: false
	});

    $("#data-table-estadocuenta").DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });



    Materialize.updateTextFields();

	$('#modal-tipomonedas').modal({
		dismissible: true, // Modal can be dismissed by clicking outside of the modal
		opacity: .5, // Opacity of modal background
		inDuration: 300, // Transition in duration
		outDuration: 200, // Transition out duration
		startingTop: '4%', // Starting top style attribute
		endingTop: '2%' // Ending top style attribute
	});

	$("#shcierre").click(function(){
		var datos = getDatos('id,date_format(fecha,"%d-%m-%Y") as fecha',314,'if((select rcaja from ajustessucursales where idsucursal = @@impresa) = 1,1,idusuario = '+guser+') and idsucursal=@@impresa order by id desc',0,0)[0];
		var str = '<h4>Lista de Cierres</h4><table class="table responsive-table centered striped bordered highlight z-depth-5"><thead><tr><th>Cierre</th><th>Fecha</th></tr></thead>';

		for (var i = 0; i < datos.length; i++) {
			str += '<tr id="'+datos[i][0]+'" class="pbtn filacierre"><td>'+datos[i][0]+'</td><td>'+datos[i][1]+'</td></tr>'
		}

		str += "</table>";

		$("#lista-cierres").html(str);
	});

	$(".zelda").data('triforce',{ vid:0,vidsucursal:'',vidusuario:'',vtotal:0 });

	if (parseInt(config[11]) == 3){
        
        $("#modal-usuario").modal({
	        dismissible:false
	    });
	    $("#modal-usuario").modal('open');
	    $("#ecouser").focus();
	}else{
		arr('login',6,'',182,guser+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listacierrespendientes"));
		$(".getfacturas").first().click()
	}

	$("#isdet").change(function(){
		if($(this).is(':checked'))
			$("#listafacturas").removeClass('hide')
		else
			$("#listafacturas").addClass('hide')
	})

	var hascaja = getDatos('monto',404,'fmonto is null and caja = '+$("#BUSS").attr('idcaja')+' and idsucursal = @@impresa',0,0,0);
	if(hascaja[0].length){
		$("#mcierre").val(parseFloat(hascaja[0][0][0]).formatMoney(2,'.',',')).attr('readonly',true);
	}else{
		if($("#BUSS").attr('ccierre') == '0'){
			$("#mcierre").focus().select()
		}
		else
			$("#modal-tipomonedas").modal('open')

	}
});

$(document).on("click","#chkcierre",function(){
	$("#totcashier").html(parseInt($("#mcierre").val().replace(/,/g,'')).formatMoney(2,'.',','))
	$("#modal-tipomonedas").modal('open');
	$("#totalizar").attr('tp',1);
});


$(document).on("click",".filacierre",function(){
	var id = $(this).attr('id');
	window.open('cierres?accion=1&id='+id);
});

$(document).on("keyup",".mnd",function(e){
	var code = e.which || e.keyCode;
	if(code == 13){
		$(this).blur();
	}
});

$(document).on("blur",".mnd",function(){
	var mn = $(this).attr('moneda');
	var total = totalizar(mn);
	$("#tc"+mn+' .tcaja').text(total.formatMoney(2,'.',','));
});

$(document).on("click","#totalizar",function(){
	// chkcierre
	var valor = $("#tc1 .tcaja").html().replace(/,/g,'');
	var valord = $("#tc2 .tcaja").html().replace(/,/g,'');

	if(parseInt(valor)+parseInt(valord) <= 0 && $("#BUSS").attr('ccierre') == '1'){
		Materialize.toast('Debe Incluir un Desgloce de Monedas',4000,'red');
		return false
	}

	if ($(this).attr('tp') == '1')
		Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" vfecha="'+$(this).attr('vfecha')+'"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
	else{ //GUARDDAR INICIO DE CAJA
		$("#mcierre").val(valor)
		var lcinic = insertar(404,'','null,@@usr,'+valor+',now(),null,null,@@impresa,0,'+$("#BUSS").attr('idcaja'));
		//if(parseInt(valord)>0)
			console.log(insertar(343,'','null,'+lcinic[0][0][0]+','+valord+',0,'+$("#tc2").attr('valor')));

		guardarMonedas(0,lcinic[0][0][0])
		Materialize.toast('Caja Iniciada Correctamente',4000,'green');
		$("#modal-tipomonedas").modal('close')
		$("#mcierre").attr('readonly',true);
	}
});

$(document).on("click","#docierre",function(){
	//var total = $(".zelda").data('triforce')['vtotal'];
	// var idfactura = arr('login',4,'id',64,'idtipoventa = 1 and idusuario = '+guser+' and date_format(fecha,"%Y-%m-%d") = "'+$(this).attr('vfecha')+'" and isregistrada = 0',0,0,0)[0];
	// var idestadocuenta = arr('login',4,'id',191,'id > 0',0,0,0)[0];

	/*if (total == 0)
		Materialize.toast('Monto debe ser mayor a 0', 4000, 'green');*/
	var idcierre = arr('login',4,'',189,''+guser+',@@impresa,'+$("#tc1 .tcaja").html().replace(/,/g,'')+',"'+$("#vcuentacierre").val()+'","'+$("#BUSS").attr('idcaja')+'",'+$("#tc2 .tcaja").html().replace(/,/g,''),0,0,0);
	console.log(idcierre)
	idcierre = idcierre[0][0][0];
	$(".cancel").parent().remove()
	
	if(parseInt(idcierre)){
		$(".getfacturas[vfecha="+$(this).attr('vfecha')+"]").siblings().remove();
		guardarMonedas(idcierre,0);
		window.open('cierres?accion=1&id='+idcierre);
		location.reload();
	}else{
		Materialize.toast('Error Generando el Cierre',4000,'red')
	}
});

$(document).on("click",".cancel",function(){
    $(".cancel").parent().remove()
});

$(document).on("click",".getfacturas",function(){
	var curdate = now();
	var fecha = $(this).attr('vfecha') == 'HOY' ? curdate : $(this).attr('vfecha');
	
	$("#chkcierre").attr('vfecha',fecha);

	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
   	$("#fcierre").html(fecha)
    arr('login',6,'',183,'"'+fecha+'",'+guser+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listafacturas"));
	$("#tcontado").text($("#hidet").attr('tcon'));
	$("#tcredito").text($("#hidet").attr('tcre'));
	$("#tefectivo").text($("#hidet").attr('tefe'));
	$("#ttarjeta").text($("#hidet").attr('ttar'));
	
	$("#data-table-facturas").DataTable({
	    bFilter: false,
	    bScrollInfinite: true,
	    bSort: false,
	    bLengthChange: false,
	    order: [],
	    bPaginate: false,
	    info: false
	});

	arr('login',6,'',185,'"'+fecha+'",'+guser+'',0,1,$("#listanotasabonos"));
	// cambiar
var tabono = arr('login',4,'format(sum(valor),2) as total',301,'idtipo = 3 and idusuario = '+guser+' and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0][0];
	var tnotcre = arr('login',4,'monto',187,'idusuario = '+guser+' and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0];
	var tnotdeb = arr('login',4,'monto',188,'idusuario = '+guser+' and (date_format(fecha,"%Y-%m-%d") = "'+fecha+'" or date_format(fecha,"%Y/%m/%d") = "'+fecha+'")',0,0,0)[0][0];
	// end cambiar

	if (tabono != null)
		$("#tabono").text(tabono);
	else
		$("#tabono").text('0.00')

	if (tnotcre != null)
		$("#tnotcre").text(tnotcre);
	else
		$("#tnotcre").text('0.00')

	if (tnotdeb != null)
		$("#tnotdeb").text(tnotdeb);
	else
		$("#tnotdeb").text('0.00')
});

$(document).on("click","#filtro",function(){
	$(".inv").show();
});

$(document).on("change",".ctip",function(){

	if($(this).val() == '5'){
		var mxtdat = getDatos('sum(if(idpago = 1,total,0)) as efe,sum(if(idpago = 2,total,0)) as tar,sum(if(idpago = 3,total,0)) as dep',336,'idfactura = '+$(this).parent().attr('rid')+' group by idfactura') 
		if(mxtdat[0].length){
			$("#mxtefe").val(mxtdat[0][0][0])
			$("#mxteta").val(mxtdat[0][0][1])
			$("#mxtede").val(mxtdat[0][0][2])
		}
		$("#modal-mxt").attr('rid',$(this).parent().attr('rid'))
		$("#modal-mxt").attr('tot',$(this).parent().attr('tot'))

		$("#mxttot").html(parseFloat($(this).parent().attr('tot')).formatMoney(2,'.',','))
		$("#modal-mxt").modal('open')
		$("#mxtefe").focus().select()
		return false;
	}

	switch($(this).parent().attr('tp')){
		case '1':
		case '3':
			var act = actualizar(64,'idtipopago='+$(this).val(),'id='+$(this).parent().attr('rid'));
			break;
		default:
			break;
	}
	eliminar(336,'idfactura='+$(this).parent().attr('rid'))

	arr('login',6,'',183,'"'+$("#fcierre").html()+'",'+guser+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listafacturas"));
	$("#tcontado").text($("#hidet").attr('tcon'));
	$("#tcredito").text($("#hidet").attr('tcre'));
	$("#tefectivo").text($("#hidet").attr('tefe'));
	$("#ttarjeta").text($("#hidet").attr('ttar'));
	
});

$(document).on("click",".cestado",function(){
	var paren = $(this).parent().parent().find('.rtp');
	switch(paren.attr('tp')){
		case '1':
			var act = actualizar(64,'idestado=2','id='+paren.attr('rid'));
			break;
		default:
			break;
	}

	arr('login',6,'',183,'"'+$("#fcierre").html()+'",'+guser+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listafacturas"));
	$("#tcontado").text($("#hidet").attr('tcon'));
	$("#tcredito").text($("#hidet").attr('tcre'));
	$("#tefectivo").text($("#hidet").attr('tefe'));
	$("#ttarjeta").text($("#hidet").attr('ttar'));
	
});

$(document).on("keyup","#vfecha",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		var fecha = $(this).val();
		var dates = arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
		if($("#isdet").is(':checked'))
			$("#listafacturas").removeClass('hide')
		else
			$("#listafacturas").addClass('hide')
		$("#vfecha").focus();
	}
});
var valor = arr('login',4,'id,valor',405,'id > 0',0,0,0)[0];

$(document).on("change","#vfecha",function(e){
	var fecha = $(this).val();
	arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
	$("#vfecha").focus();
});

function totalizar_mn(){
	var efectivo = $("#mn-tefectivo").val().replace(/,/g,'');
	efectivo = isNaN(efectivo) ? 0 : parseFloat(efectivo);

	var credito = $("#mn-credito").val().replace(/,/g,'');
	credito = isNaN(credito) ? 0 : parseFloat(credito);

	var tarjeta = $("#mn-tarjeta").val().replace(/,/g,'');
	tarjeta = isNaN(tarjeta) ? 0 : parseFloat(tarjeta);

	var cheque = $("#mn-cheque").val().replace(/,/g,'');
	cheque = isNaN(cheque) ? 0 : parseFloat(cheque);

	var compra = $("#mn-compra").val().replace(/,/g,'');
	compra = isNaN(compra) ? 0 : parseFloat(compra);

	var otros = $("#mn-otros").val().replace(/,/g,'');
	otros = isNaN(otros) ? 0 : parseFloat(otros);

	$("#mn-tdoc").val((credito+tarjeta+cheque-compra+otros).formatMoney(2,'.',','))

	var tdoc = $("#mn-tdoc").val().replace(/,/g,'');
	tdoc = isNaN(tdoc) ? 0 : parseFloat(tdoc);

	var tabo = $("#mn-tabo").val().replace(/,/g,'');
	tabo = isNaN(tabo) ? 0 : parseFloat(tabo)

	$("#mn-tocefe").val((tdoc+efectivo+tabo).formatMoney(2,'.',','));

	var tocefe = $("#mn-tocefe").val().replace(/,/g,'');
	tocefe = isNaN(tocefe) ? 0 : parseFloat(tocefe);

	var vdia = $("#mn-vdia").val().replace(/,/g,'');
	vdia = isNaN(vdia) ? 0 : parseFloat(vdia);

	$("#mn-dif").val((vdia-tocefe+tabo).formatMoney(2,'.',','))

	var tdeposito = $("#mn-deposito").val().replace(/,/g,'');
	tdeposito = isNaN(tdeposito) ? 0 : parseFloat(tdeposito);

	var depositon = $("#mn-depositom").val().replace(/,/g,'');
	depositon = isNaN(depositon) ? 0 : parseFloat(depositon);

	$("#mn-depositod").val((tdeposito-depositon).formatMoney(2,'.',','))
}

function totalizar(moneda) {
	
	var total = 0;
	$(".mnd[moneda="+moneda+"]").filter(function(){return parseFloat(this.value) > 0}).each(function(){
		total += parseFloat($(this).val())*parseFloat($(this).attr('vl'))
	})
	$(".zelda").data('triforce')['vtotal'] = total;
	return total;
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'cierres':
			if (vmodulo['tip'] == '') {
				err = validarcierres();
				if ( err ) {
					return err;
				}
			}
			
			break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarcierres() {


	return false;
}

function endDetail(vid,vacc,modulo){

	if(config[29] == '99'){
		var dinic = getDatos('dinicio',314,'id='+vid[0][0][0])
		//insertar(338,'','null,'+vid[0][0]+',314,'+acc+',"idproducto=$1,97,299",0,-1');
	}
    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'cierres':
			vmodulo['sel'] = '';
			vmodulo['tbl'] = 3;
			vmodulo['where'] ='';
			break;
		default:
			return 'Módulo no Existente';
			break;
	}
	
	return vmodulo;
}

function guardarMonedas(vidc,vidi){
	$(".mnd").each(function(i){
		if(parseInt($(this).val()) > 0 && $(this).attr('id').substr(1) != undefined){
			insertar(340,'','null,'+vidc+','+vidi+','+$(this).attr('id').substr(1)+','+$(this).val());
		}
	});
	return 'false';
}

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}

function acceuser(rs){
	arr('login',6,'',182,rs[0][0][0]+',@@impresa,'+$("#BUSS").attr('idcaja'),0,1,$("#listacierrespendientes"));
    guser = rs[0][0][0];
    $("#uname").removeClass('hide');
    if($("#mcierre").val() == '0'){
    	$("#totalizar").attr('tp',2);
		$("#totcashier").html(parseInt(0).formatMoney(2,'.',','))
		$("#modal-tipomonedas").modal('open');
    }
}

function exitcouser(){
    $("#shcierre").attr('disabled',true);
    $("#chkcierre").attr('disabled',true)
}