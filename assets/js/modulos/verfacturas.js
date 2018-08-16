Dropzone.autoDiscover = false;
var myDropzone;
var config;
var estado;

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
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});

	paginate($("ul.pagination").attr('vtbl'),undefined,tf+',0,@@impresa,0,0')

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
	
    $(".add").click(function(){
        $(".mhacienda").attr('disabled',true);
        estado = $(this).attr('dc');
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
                        
						var t_venta = getDatos('nombre',168,'id = '+p['factura']['tipoventa'],0,0,0)[0][0][0];
						var t_moneda = getDatos('id',54,'codigo = "'+p['factura']['moneda']+'"',0,0,0)[0][0][0];
						var t_pago = getDatos('id,nombre',26,'idhacienda = '+p['factura']['tipopago'],0,0,0)[0][0];
						
						if(p['emisor']['id'] == 0){
							$("#ffacturas .zelda").data('proveedor',{cedula : p['emisor']['cedula'],correo: p['emisor']['correo'],nombre:p['emisor']['nombre'],telefono:p['emisor']['telefono'],
								barrio:p['emisor']['barrio'],direccion:p['emisor']['otrassenas'],tipo:['emisor']['tipo']});
							t_prov = 0;
						}
						
						$("#ffacturas .zelda").data('triforce',{vidtipo:p['factura']['tipoventa'], vidtipoventa:2, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:p['clave'], vidmoneda:t_moneda, vidcliente:p['emisor']['id'], vsubtotal:parseFloat(p['factura']['subtotal'])*parseFloat(p['factura']['divisa']), vdescuento: parseFloat(p['factura']['descuento'])*parseFloat(p['factura']['divisa']), vimv:parseFloat(p['factura']['impuesto'])*parseFloat(p['factura']['divisa']), vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : p['factura']['divisa'],vidusuario:'',vidtipopago:t_pago[0],vidodt:0,vajuste:0,tmpcorreo:'',videxoneracion:'',vexento: parseFloat(p['factura']['exento'])*parseFloat(p['factura']['divisa']),vflete:0,vplazo:p['factura']['plazo'],vcomentario:'',vfecha:p['factura']['fsistema']});
						
						$(".shxml_body").html('');

						for (var i = 0; i < p['detalle'].length; i++) {

							$(".shxml_body").append('<tr class="ciclos" id="fd'+i+'"> <td><input type="checkbox" name="isvalid" id="valid'+p['detalle'][i]['linea']+'" checked><label for="valid'+p['detalle'][i]['linea']+'"></label></td> <td>'+p['detalle'][i]['cantidad']+'</td><td>'+p['detalle'][i]['unidad']+'</td><td>'+p['detalle'][i]['detalle']+'</td><td style="text-align:right;">'+parseFloat(['detalle'][i]['descuento']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['impuesto']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['precio']).formatMoney(2,'.',',')+'</td></tr>');

							// $("#fd"+i).data('unidad',{})
							// $("#fd"+i).data('producto',{})
							$("#fd"+i).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : 0,vcantidad : p['detalle'][i]['cantidad'],vprecio : p['detalle'][i]['precio'],vdescuento : p['detalle'][i]['descuento'],vidinventario : 0,vidodt : 0,vimv : p['detalle'][i]['impuesto'],vcomodin : '',vidunidad : 0,vidimpuestos:'',viddescuentos:''});
						}

						$(".shxml_head").html('<b>Factura: </b>'+p['clave'].substr(21,20)+', Fecha: '+p['factura']['fecha']+', Tipo Venta: '+t_venta+', Tipo Pago: '+t_pago[1]+', Tipo Cambio: '+p['factura']['divisa']+'<br><b>Emisor: </b>'+p['emisor']['nombre']+', Ced.: '+p['emisor']['cedula']+', Correo: '+p['emisor']['correo']);

						var total = (parseFloat(p['factura']['exento'])-parseFloat(p['factura']['descuento'])+parseFloat(p['factura']['impuesto'])+parseFloat(p['factura']['subtotal'])).formatMoney(2,'.',',');

						$(".shxml_foot").html('<tr><td colspan="5" style="padding:0px;text-align:right;"><b>Gravado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['subtotal']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Impuestos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['impuesto']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Exento</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['exento']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Descuentos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['descuento']).formatMoney(2,'.',',')+'</td></tr><tr><td colspan="5" style="padding: 0px;text-align:right"><b>TOTAL</b></td><td colspan="2" style="padding: 0px;text-align:right">'+p['factura']['moneda']+' '+total+'</td></tr>');

						$("[xml=3]").removeClass('hide').removeAttr('disabled');
					}else{
						$("[xml=1]").removeClass('hide');
						$("[xml=2]").addClass('hide');
						Materialize.toast(p['ERROR'],4000,'red')
					}
				}catch(e){
					$("[xml=1]").removeClass('hide');
					$("[xml=2]").addClass('hide');
					Materialize.toast('Error Extrayendo XML',4000,'red')
					console.log(e)				
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
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();
	switch(id) {
		case 1:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 2:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
			$("[rm=1]").removeClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
			break;
		case 3:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 4:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 5:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
			break;
		case 7:
			var tabla = $("#data-table-facturas").DataTable();
			tabla.destroy();
			arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
			$("#data-table-facturas").dataTable({
				bFilter: false,
				bScrollInfinite: true,
				bSort: false,
				bLengthChange: false,
				order: [],
				bPaginate: false,
				info: false
			});
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa')
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
			var color = msj = '';
			var state = 0;
			try{
				p = JSON.parse(data);
				switch(p['estado']){
					case 'aceptado':
						color = 'green';
						state = 1;
                        msj = p['rs'].trim().length ? 'Documento Electrónica Aceptado' : p['rs'];
						break;
                    case 'recibido':
                        color = '#8bc34a';
                        state = 9;
                        p['rs'] = 'Documento Electrónico Recibido';
                        break;
					case 'rechazado':
						color = 'red';
						state = 3;
                        msj = p['rs'].trim().length ? 'Documento Electrónico Rechazado' : p['rs'];
						break;
					case 'procesando':
						color = '#cddc39';
						state = 2;
                        msj = p['rs'].trim().length ? 'Procesando Documento Electrónica' : p['rs'];
						break;
					case 'Sin Subir':
						var $toastContent = $('<span style="width: 500px">Generando Factura Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
						Materialize.toast($toastContent);
						sendFE(clave);
						break;
					case 'Sin Internet':
						color = 'red';
						break;
					default:
						break;
				}

				if (state){
					$("#e"+vid).css('color',color);
					arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
				}
                console.log(p)
				Materialize.toast(p['rs'],6000,color);
			}catch(ex){
				console.log(data)
				Materialize.toast('Error Obteniendo Estado',6000,'red')
			}
			$(".status").attr('disabled',false)
			$("#e"+vid).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline');
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
            $("#ffacturas .zelda").data('triforce')['videstado'] = estado;
        	break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    
    return salida;
};

function endDetail(vid,vacc,vmodulo) {
    var factura = getDatos('consecutivo',64,'id = '+vid[0][0],0,0)[0][0][0];
    var clave = vid[0][0];
    config = getDatos('if(p12 is null,0,1) as FE,isinventariado as INV,idtipofactura as FAC,fastshow as FS,printSale',39,'id = @@impresa',0,0)[0][0];

    var $toastContent = $('<span style="width: 500px">Generando Documento Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
    Materialize.toast($toastContent,5000);
    sendFE('^'+clave);
            
    return false;
}

function sendFE(clave){
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: clave, accion : 1}
    })
      .done(function(data) {
        console.log('ENTREGADO');
        var p;
        try {
            p = JSON.parse(data);
            $(".expect").removeClass('progress');
            if (p['succes']) {
                var vfactura = p['num'];
                var vclave = p['clave'];
                arr('login',7,2,64,'feestado=2','id='+clave,0,0);
                $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
                sendVMail(vfactura,vclave,clave);
            }else{
                $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
                Materialize.toast(p['rs'],5000,'red');
                switch(parseInt(p['erno'])){
                    case 1:
                        arr('login',7,2,64,'feestado=0','id='+clave,0,0);
                        break;
                    default:
                        arr('login',7,2,64,'feestado=8','id='+clave,0,0);
                    break;
                }
            }
            
        }
        catch(err){
            console.log(err)
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
            Materialize.toast(data,5000,'red');
            arr('login',7,2,64,'feestado=8','id='+clave,0,0);
        }  
    
  });
}

function sendVMail(factura,clave,vid){
    var archivos = '';

    if ($(".zelda").data('triforce')['vidcliente'] != 0) {
        var correos = getDatos("",18,$(".zelda").data('triforce')['vidcliente']+",2",0,0,0);
        
        if (!correos['succed']) {
            Materialize.toast('Correos Inválidos',4000,'red');
            arr('login',7,2,64,'feestado=4','id='+clave,0,0);
        }else{
            for (var i = 0; i < correos[0].length; i++) {
                str_correos += correos[0][i][3]+",";
            }

            str_correos = str_correos.substr(0,str_correos.length-1);
        }
    }

    if (str_correos != '') {
        var vbody = getDatos('',73,vid,0,0)[0][0];
        archivos = makeArchivos(factura,clave,vid,vbody[1]);
        enviarCorreo(3,str_correos,"Factura N° "+factura,vbody[0],archivos);
    }
}


function makeArchivos(vfactura,vclave,vid,vsucursal){
    var archivos = '';

    mantenimiento_async('login',8,{arch:'recibo',id:vid,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vid},1);
    if (vclave == vid)
        archivos = 'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf';
    else{
        archivos = {0:'xml/Factura N°'+vfactura+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
        mantenimiento_async('login',9,{id:vid,factura:vfactura,sucursal:vsucursal},1);
    }
    return archivos;
}
