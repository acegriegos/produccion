var config;
var guser = '@@usr';

$(function(){
	 config = getDatos('',42,'@@impresa',0,0)[0][0];
	
	var hascaja = getDatos('monto',404,'fmonto is null and idusuario = @@usr and idsucursal = @@impresa',0,0,0);
	if(hascaja[0].length){
		$("#mcierre").val(parseFloat(hascaja[0][0][0]).formatMoney(2,'.',',')).attr('readonly',true);
	}

	if (parseInt($("#BUSS").val()) != 1) {
		var monto = arr('login',4,'monto',404,'idusuario = '+guser+' and date_format(fecha,"%Y-%m-%d")',0,0,0)[0][0];
		if (monto == undefined) {
			$(".tt").removeAttr('id')
			$(".tt").addClass('tooltipped')
			$('.tt').tooltip({delay: 50,tooltip: 'Debe iniciar caja'});
		}else{
			$(".tt").attr('id','chkcierre');
		}
	}
	
	$("#ecouser").keyup(function(e){
        var code = e.wich || e.keyCode;

        if (code == 13)
            $("#accecouser").click();
    });

	$("#mcierre").keyup(function(e){
		var code = e.wich || e.keyCode
		if (code == 13){
			$("#iniciarcaja").click();
		} 
			
	});

	$("#iniciarcaja").click(function(){
		var valor = $("#mcierre").val()

		if($("#mcierre").attr('readonly') != undefined){
			Materialize.toast('Caja Iniciada',4000,'red')
			return false;
		}

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

		insertar(404,'','null,@@usr,'+valor+',now(),null,null,@@impresa,0');
		Materialize.toast('Caja Iniciada Correctamente',4000,'green');
		$("#mcierre").attr('readonly',true);
	});

    $("#exitcouser").click(function(){
        $("#modal-usuario").modal('close');
        $("#shcierre").attr('disabled',true);
        $("#chkcierre").attr('disabled',true)
    });

     $("#accecouser").click(function(){

        var cod =  $("#ecouser").val();
        var rs = getDatos('',137,'"'+cod+'"',0,0,0);
        if(parseInt(rs['succed'])){
            if (rs[0].length){
                //$("#ffacturas .zelda").data('triforce')['vidusuario'] = rs[0][0][0];
                arr('login',6,'',182,rs[0][0][0],0,1,$("#listacierrespendientes"));
                $("#modal-usuario").modal('close');
                guser = rs[0][0][0];
            }
            else{
                Materialize.toast('Usuario no Valido',4000,'red');
                $("#ecouser").focus().select();

            }
        }else{
            Materialize.toast('Usuario no Valido',4000,'red');
             $("#ecouser").focus().select();
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
		var datos = getDatos('id,date_format(fecha,"%d-%m-%Y") as fecha',314,'idusuario = '+guser+' order by id desc',0,0)[0];
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
	}else
		arr('login',6,'',182,guser,0,1,$("#listacierrespendientes"));
});

$(document).on("click","#refresh",function(){
	var tabla1 = $("#data-table-facturas").DataTable();
	var tabla2 = $("#data-table-estadocuenta").DataTable();
	tabla1.destroy();
	tabla2.destroy();
	arr('login',6,'',182,guser,0,1,$("#listacierrespendientes"));
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
	$("#tcontado").text('0.00');
	$("#tcredito").text('0.00');
	$("#tabono").text('0.00');
	$("#tnotcre").text('0.00');
	$("#tnotdeb").text('0.00');
	$("#chkcierre").removeAttr('vfecha');
	$(".tt").removeClass('modal-trigger');
});

$(document).on("click","#chkcierre",function(){
/*
	var cajainicial
	if (parseInt($("#BUSS").val()) != 1 ) {
		cajainicial = arr('login',4,'monto',404,'idusuario ='+guser+' and idsucursal=@@impresa and fmonto is null',0,0,0,0)[0][0][0];
	}else
		cajainicial = 0;
	*/
	$("#totcashier").text(0);

	if (!$(this).hasClass('tooltipped')) {
		if ($(this).attr('vfecha') == undefined) {
			Materialize.toast('Seleccione un cierre', 4000, 'green');
		}else{
			$(this).addClass('modal-trigger');
			$("#modal-tipomonedas").modal('open');
			$("#totalizar").attr('vfecha',$(this).attr('vfecha'));
		}
	}
	
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
	var total = totalizar();
	$("#tcaja").text(total.formatMoney(2,'.',','));
	var efectivo = $("#tefectivo").html().replace(/,/g,'');
	var caja = $("#totcashier").html().replace(/,/g,'');
	$("#sobrante").text((total-efectivo-caja).formatMoney(2,'.',','));
	// $(this).next().focus();
});

$(document).on("click","#totalizar",function(){
	// chkcierre
	if ($(this).attr('vfecha') != undefined)
		Materialize.toast('Desea realmente ejecutar el cierre de caja? <button type="button" class="waves-effect waves-light btn blue accept" id="docierre" vfecha="'+$(this).attr('vfecha')+'"><i class="mdi mdi-check"></i></button><button type="button" class="waves-effect waves-light btn red cancel"><i class="mdi mdi-close"></i></button>', 10000, 'rounded');
	else
		Materialize.toast('Seleccione un cierre', 4000, 'green');
});

$(document).on("click","#docierre",function(){
	var total = $(".zelda").data('triforce')['vtotal'];
	// var idfactura = arr('login',4,'id',64,'idtipoventa = 1 and idusuario = '+guser+' and date_format(fecha,"%Y-%m-%d") = "'+$(this).attr('vfecha')+'" and isregistrada = 0',0,0,0)[0];
	// var idestadocuenta = arr('login',4,'id',191,'id > 0',0,0,0)[0];

	if (total == 0)
		Materialize.toast('Monto debe ser mayor a 0', 4000, 'green');
	var idcierre = arr('login',4,'',189,''+guser+',@@impresa,'+$("#tcaja").html().replace(/,/g,''),0,0,0)[0][0];

	$('#toast-container').remove();
	$(".getfacturas[vfecha="+$(this).attr('vfecha')+"]").siblings().remove();

	window.open('cierres?accion=1&id='+idcierre);
	location.reload();
});

$(document).on("click",".cancel",function(){
    $('#toast-container').remove();
});

$(document).on("click",".getfacturas",function(){
	var curdate = now();
	var fecha = $(this).attr('vfecha') == 'HOY' ? curdate : $(this).attr('vfecha');
	
	$("#chkcierre").attr('vfecha',fecha);

	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
   
    arr('login',6,'',183,'"'+fecha+'",'+guser+',@@impresa',0,1,$("#listafacturas"));
    
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

$(document).on("click","#order",function(){
	if ($(this).attr('value') == 1) {
		arr('login',6,'contador,fecha',182,'idusuario = '+guser+' order by fecha asc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',2);
	}else{
		arr('login',6,'contador,fecha',182,'idusuario = '+guser+' order by fecha desc',0,1,$("#listacierrespendientes"));
		$("#order").attr('value',1);
	}
});

$(document).on("keyup","#vfecha",function(e){
	var code = e.which || e.keyCode;
	if (code == 13) {
		var fecha = $(this).val();
		var dates = arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
		$("#vfecha").focus();
	}
});
var valor = arr('login',4,'id,valor',405,'id > 0',0,0,0)[0];
$(document).on("change","#vfecha",function(e){
	var fecha = $(this).val();
	arr('login',6,'contador,fecha',182,'fecha = "'+fecha+'" or date_format(fecha,"%d/%m/%Y") = "'+fecha+'"',0,1,$("#listacierrespendientes"));
	$("#vfecha").focus();
});

function totalizar() {
	
	var total = 0;
	for (var i = 0, len = valor.length; i < len; i++) {
		var monto = $("#m"+valor[i][0]).val();
		if (monto != 0 || monto != '') {
			if ( $("#m"+valor[i][0]).attr('id').substr(1) == valor[i][0] )
				total += monto * valor[i][1];
		}
	}
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

function cargarSintax(){
	var arr = {}

	arr['sel'] = '';
	arr['tbl'] = 4;
	arr['where'] = '';

	return arr;
}