Dropzone.autoDiscover = false;
var myDropzone;

$(document).ready(function(){
	var tf = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
	switch(tf) {
		case 1:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 2:
			$("[rm=1]").removeClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 3:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 4:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 5:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 7:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
	}

	$("#data-table-facturas").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$("#data-table-productos").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 100, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '4%' // Ending top style attribute
    });

	$("#ret-xml").click(function(){
		$("[xml=3]").addClass('hide');
		$("[xml=2]").addClass('hide');
		$("[xml=1]").removeClass('hide');
		$("#registro-upload").removeAllFiles()
	});
	
	InitDropzone(1,true,'../cargar.php?accion=4',"#registro-upload",1,'text/xml','','',xmlCargar);
});

function xmlCargar(file,response){
	if(response == ''){
		$("[xml=2]").removeClass('hide');
		$("[xml=1]").addClass('hide');

		$.get('../wsdlClient.php',{accion:10,id:file['name']})
			.done(function(data){
				var p;
				$(".iloop").hide();
				try{
					p = JSON.parse(data);
					if (p['succed']) {
						//sacar nombre del tipo venta
						//sacar id de la moneda
						//sacar idtipopago
						//crear proveedor si no existe

						$("#ffacturas .zelda").data('triforce',{vidtipo:p['factura']['tipoventa'], vidtipoventa:2, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:p['clave'], vidmoneda:1, vbisproveedor:1, vidcliente:0, vsubtotal:p['factura']['subtotal'], vdescuento:p['factura']['descuento'], vimv:p['factura']['impuesto'], vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : p['factura']['divisa'],vidusuario:'',vidtipopago:1,vidodt:0,vajuste:0,tmpcorreo:'',videxoneracion:''});
						
						$(".shxml_body").html('');

						for (var i = 0; i < p['detalle'].length; i++) {

							$(".shxml_body").append('<tr class="ciclos" id="fd'+i+'"> <td><input type="checkbox" name="isvalid" id="valid'+p['detalle'][i]['linea']+'" checked><label for="valid'+p['detalle'][i]['linea']+'"></label></td> <td>'+p['detalle'][i]['cantidad']+'</td><td>'+p['detalle'][i]['unidad']+'</td><td>'+p['detalle'][i]['detalle']+'</td><td style="text-align:right;">'+parseFloat(['detalle'][i]['descuento']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['impuesto']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['precio']).formatMoney(2,'.',',')+'</td></tr>');
							//buscar unidad si no existe agregar
							//buscar producto si no existe agregarlo
							$("#fd"+i).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : 0,vcantidad : p['detalle'][i]['cantidad'],vprecio : p['detalle'][i]['precio'],vdescuento : p['detalle'][i]['descuento'],vidinventario : 0,vidodt : 0,vimv : p['detalle'][i]['impuesto'],vcomodin : '',vidunidad : 0,vidimpuestos:'',viddescuentos:''});
						}

						$(".shxml_head").html('<b>Factura:</b>'+p['clave'].substr(21,20)+', Fecha: '+p['factura']['fecha']+', Tipo Venta: '+p['factura']['tipoventa']+', Tipo Pago: '+p['factura']['tipopago']+', Tipo Cambio: '+p['factura']['divisa']+'<br><b>Emisor: </b>'+p['emisor']['nombre']+', Ced.: '+p['emisor']['cedula']+', Correo: '+p['emisor']['correo']);

						var total = (parseFloat(p['factura']['exento'])-parseFloat(p['factura']['descuento'])+parseFloat(p['factura']['impuesto'])+parseFloat(p['factura']['subtotal'])).formatMoney(2,'.',',');

						$(".shxml_foot").html('<tr><td colspan="5" style="padding:0px;text-align:right;"><b>Gravado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['subtotal']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Impuestos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['impuesto']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Exento</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['exento']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Descuentos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['descuento']).formatMoney(2,'.',',')+'</td></tr><tr><td colspan="5" style="padding: 0px;text-align:right"><b>TOTAL</b></td><td colspan="2" style="padding: 0px;text-align:right">'+p['factura']['moneda']+' '+total+'</td></tr>');

						$("[xml=3]").removeClass('hide');
					}else{
						$("[xml=1]").removeClass('hide');
						$("[xml=2]").addClass('hide');
						Materialize.toast(p['ERROR'],4000,'red')
					}
				}catch(e){
					$("[xml=1]").removeClass('hide');
					$("[xml=2]").addClass('hide');
					Materialize.toast('Error Extrayendo XML',4000,'red')
					console.log(data)				
				}
			});
	}else
		Materialize.toast('Error Subiendo el XML',4000,'red')	
};

$(document).on("click","#process",function(){
	var idfactura = $("#process").attr('idfactura');
	var tf = $("#process").attr('tipo');
	var idproducto = new Array();
	var idinventario = new Array();
	$("[name=processitem]:checked").each(function(){
		idproducto.push($(this).attr('idproducto'));
		idinventario.push($(this).attr('idinventario'));
	});
	window.open('facturacion?tf='+tf+'&arr='+idproducto+'&idinventario='+idinventario+'&id='+idfactura);

});

$(document).on("click",".process",function(){
	var id = $(this).attr('id').substr(1);
	var tabla = $("#data-table-productos").DataTable();
	tabla.destroy();
	var prod = arr('login',6,'',161,id,0,1,$("#listaproductos"));
	$("#data-table-productos").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});

	var tipo = arr('login',4,'',161,id,0,0,0)[0];
	$("#process").attr('idfactura',tipo[0][0]);
	$("#process").attr('tipo',tipo[0][7]);
	$("#nomproc").text(tipo[0][1]);
});

$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	switch(id) {
		case 1:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 2:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").removeClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 3:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 4:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 5:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 7:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,'+id+',0,@@impresa',0,1,$("#listafacturas"));
			$("#data-table-facturas").DataTable({
				bFilter :  false,
	            bLengthChange : false,
	            order : []
			});
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
	}
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	// var tv = $(this).attr('tv');
	var tp = !$("#tps").is(":checked");
	window.open('facturacion?accion=6&id='+id+'&tp='+tp);
});

$(document).on("click",".xml",function(){
	window.location = "../wsdlClient.php?accion=2&id="+$(this).attr('id').substr(1);
});

$(document).on("click",".status",function(){
	if ($(this).is("[disabled]")) {
        event.preventDefault();
    }

	$(".status").attr('disabled',true)
	$(this).removeClass('mdi-information-outline').addClass('mdi-spin mdi-loading')
	var vid = $(this).attr('id').substr(1);

	$.get('../wsdlClient.php',{accion:4,id:vid})
		.done(function(data){
			var ex;
			var p;
			var color = '';
			var state = 7;
			try{
				p = JSON.parse(data);
				switch(p['estado']){
					case 'aceptado':
						color = 'green';
						state = 1;
						break;
					case 'rechazado':
						color = 'red';
						state = 3;
						break;
					case 'procesando':
						color = 'yellow';
						state = 2;
						break;
					default:
						break;
				}
				arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
				Materialize.toast(p['rs'],6000,color);
			}catch(ex){
				console.log(data)
				Materialize.toast('Error Obteniendo Estado',6000,'red')
			}
			$(".status").attr('disabled',false)
			$("#e"+vid).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline').css('color',color);
		});
});

$(document).on("click",".mdi-upload",function(){
	$("#modal-getxml").modal('open')
});

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
    	case 'detallefactura':
        case 'factura':
        	break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    
    return salida;
};
