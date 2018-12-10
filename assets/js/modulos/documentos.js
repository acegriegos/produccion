Dropzone.autoDiscover = false;
var myDropzone;
var estado;
var str_correos = '';
var config;

$(function(){
    config = getDatos('',42,'@@impresa',0,0)[0][0];

	$('[href="#modal-getxml"]').click(function(){
		$("#modal-getxml").modal('open')
	});

    $('[href="#modal-irobot"]').click(function(){
        $("#modal-irobot").modal('open');
        
        $(".act").addClass('hide');
        $(".actin").removeClass('hide');

        var sucursal = getDatos('cedula,isprueba',39,'id=@@impresa',0,0,0)[0][0];

        $.ajax({
            url: config[18],
            type: "post",
            data: {cmd:4,ced:'"'+sucursal[0]+'"',isp:sucursal[1]}
        })
            .done(function(res){
                var p = JSON.parse(res);
                var str = '';
                var tabla = $("#data-table-compras").DataTable();
                tabla.destroy();

                if(p['rs'].length){

                    for (var i = 0; i < p['rs'].length; i++) {
                        p['rs'][i][17] = p['rs'][i][17] == 'CRC' ? 1 : 2;
                        var idproveedor = getDatos("vid",264,'replace(cedula,"-","") = '+p['rs'][i][39],0,0,0);
                        if(!idproveedor[0].length)
                            insertar(264,'',p['rs'][i][37]+',"'+p['rs'][i][38]+'","'+p['rs'][i][39]+'","'+p['rs'][i][40]+'","'+p['rs'][i][41]+'","'+p['rs'][i][42]+'","'+p['rs'][i][43]+'","'+p['rs'][i][44]+'","'+p['rs'][i][45]+'","'+p['rs'][i][46]+'","'+p['rs'][i][47]+'"');

                        insertar(262,'','null,"'+p['rs'][i][1]+'","'+p['rs'][i][2]+'","'+p['rs'][i][3]+'","'+p['rs'][i][4]+'","'+p['rs'][i][5]+'","'+p['rs'][i][6]+'","'+p['rs'][i][49]+'","'+p['rs'][i][8]+'","'+p['rs'][i][9]+'","'+p['rs'][i][10]+'","'+p['rs'][i][11]+'","'+p['rs'][i][12]+'","'+p['rs'][i][13]+'","'+p['rs'][i][14]+'","'+p['rs'][i][15]+'","'+p['rs'][i][16]+'","'+p['rs'][i][17]+'","'+p['rs'][i][18]+'","'+p['rs'][i][19]+'","'+p['rs'][i][48]+'","'+p['rs'][i][21]+'","'+p['rs'][i][22]+'","'+p['rs'][i][23]+'","'+p['rs'][i][24]+'","'+p['rs'][i][25]+'","'+p['rs'][i][26]+'","'+p['rs'][i][27]+'"');
                        var compra = getDatos('id',262,'referencia = '+p['rs'][i][16],0,0,0)[0][0][0];

                        insertar(263,'','null,"'+compra+'","'+p['rs'][i][31]+'",null,null,"'+p['rs'][i][32]+'","'+p['rs'][i][33]+'","'+p['rs'][i][34]+'",0,"'+p['rs'][i][35]+'","'+p['rs'][i][30]+'","'+p['rs'][i][36]+'","","",0');
                    }
                }

                var temporal = arr('login',6,'',265,'@@impresa',0,1,$("#bcompras"),0);

                $("#data-table-compras").dataTable({
                    LengthChange : false,
                    order : []
                });
                
                $(".act").removeClass('hide');
                $(".actin").addClass('hide');
            })
            .fail(function(){
                console.log('No hay acceso a '+config[18]);
                $(".act").removeClass('hide');
                $(".actin").addClass('hide');
            });
    });

    $("#actAuto").click(function(){
        $("#data-table-facturas").append('<tbody id="loadbody"><tr><td colspan="100"><i class="mdi mdi-spin mdi-refresh mdi-48px center"></i></td><tr></tbody>');
        $("#listafacturas").addClass('hide');

        $.get('../_config/autofacturas.php',{tipo:$("input[name=tventa]:checked").attr('id').substr(2)})
            .done(function(){
                var tabla = $("#data-table-facturas").DataTable();
                tabla.destroy();
                arr('login',6,'',179,'0,0,"1,1,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
                $("#data-table-facturas").dataTable({
                    bFilter: false,
                    bScrollInfinite: true,
                    bSort: false,
                    bLengthChange: false,
                    order: [],
                    bPaginate: false,
                    info: false
                });

                paginate($("ul.pagination").attr('vtbl'),undefined,'1,'+$("input[name=tventa]:checked").attr('id').substr(2)+',@@impresa,0,0');
                $("#loadbody").remove();
                $("#listafacturas").removeClass('hide');
            });
        
    });

	$("#ret-xml").click(function(){
		$("[xml=3]").addClass('hide');
		$("[xml=2]").addClass('hide');
		$("[xml=1]").removeClass('hide');
        $("[xml=4]").removeClass('hide');
        Dropzone.forElement("#registro-upload").removeAllFiles(true);
        Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
	});

	InitDropzone(1,true,'../cargar.php?accion=4',"#registro-upload",1,'text/xml','','',xmlCargar);
    InitDropzone(1,true,'../cargar.php?accion=4',"#hacienda-upload",1,'text/xml','',removeHacienda,xmlCargar);

    $(".add").click(function(){
        $(".mhacienda").attr('disabled',true);
        estado = $(this).attr('dc');
    });

    arr('login',6,'',179,'0,0,"1,1,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
    $("#data-table-facturas").dataTable({
		bFilter: false,
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});

	paginate($("ul.pagination").attr('vtbl'),undefined,'1,1,@@impresa,0,0');
});

$(document).on("click",".msjh",function(){
    var tstado = $(this).attr('tipo');
    var idcomp = $(this).parent().parent().attr('id').substr(2)
    var idfact = getDatos('',266,idcomp+',@@usr,@@impresa,'+tstado,0,0,0);
    
    if(!parseInt(idfact['succed'])){
        Materialize.toast(idfact[0]['ERROR'],4000,'red');
        $(this).parent().parent().remove();
    }else{
        var $toastContent = $('<span style="width: 500px">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
            Materialize.toast($toastContent);
        sendFE('^'+idfact);
    }

});

$(document).on("click",".status",function(){
	if ($(this).is("[disabled]")) {
        event.preventDefault();
    }
    var f1 = new Date($(this).attr('fecha'));
    var f2 = new Date();
    
    /*if(parseInt((f2-f1)/(1000*60)) < 15){
        Materialize.toast("Se Recomienda Esperar 15min",5000,'red');
        return false
    }*/

	$(".status").attr('disabled',true)
	$(this).removeClass('mdi-information-outline').addClass('mdi-spin mdi-loading')
	var vid = $(this).attr('id').substr(1);
	switch(parseInt($("input[name=tventa]:checked").attr('id').substr(2))){
		case 2:
		case 3:
			vid = '-'+vid;
			break;
		case 5:
		case 6:
		case 7:
			vid = '^'+vid;
			break;
		default:
			break;
	}

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
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Aceptado' : p['rs'];
						break;
                    case 'recibido':
                        color = 'green lighten-3';
                        state = 9;
                        msj = 'Documento Electrónico Recibido';
                        break;
					case 'rechazado':
						color = 'red';
						state = 3;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Rechazado' : p['rs'];
						break;
					case 'procesando':
						color = '#cddc39';
						state = 2;
                        msj = 'Procesando Documento Electrónico';
						break;
					case 'Sin Subir':
						var $toastContent = $('<span style="width: 500px">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
						Materialize.toast($toastContent,5000);
						sendFE(vid);
                        color = 'red';
                        state = 0;
                        msj = 'Procesando Documento Electrónico';
						break;
					case 'Sin Internet':
						color = 'red';
                        statue = 0;
                        msj = p['rs'];
						break;
					case 'error':
                        state = 2;
						color = 'red'
						msj = 'Error en Documento Electrónico';
						break;
					default:
						break;
				}

				if (state){
					
					switch(parseInt($("input[name=tventa]:checked").attr('id').substr(2))){
						case 2:
						case 3:
							vid = vid.substr(1);
							$("#e"+vid).css('color',color);
							arr('login',7,2,301,'feestado='+state,'id='+vid,0,0);
							break;
						case 5:
						case 6:
						case 7:
							vid = vid.substr(1);						
							$("#e"+vid).css('color',color);
							arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
							break;
						default:
							$("#e"+vid).css('color',color);
							arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
							break;
					}
					
				}
                //console.log(p+' '+msj)
				Materialize.toast(msj,6000,color);
			}catch(ex){
				console.log(ex)
				console.log(data)
				Materialize.toast('Error Obteniendo Estado',6000,'red')
			}
			$(".status").attr('disabled',false)
			$("#e"+vid).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline');
            $("#e"+vid).css('color',color);
		});
});

$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();
	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
	
	arr('login',6,'',179,'0,0,"1,'+id+',@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
	paginate($("ul.pagination").attr('vtbl'),undefined,'1,'+id+',@@impresa,0,0')
    $("ul.pagination").attr('filtro_sp','1,'+id+',@@impresa,0,0');
	$("#data-table-facturas").dataTable({
		bFilter: false,
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});
});

function removeHacienda(file){
    //$("[xml='1']").addClass('disabledbutton');
    $("#myclave").val('');
    $("#mha").html('');
}

function xmlCargar(file,response){
	if(response == ''){
		$.get('../wsdlClient.php',{accion:10,id:file['name'],hclave:$("#myclave").val()})
			.done(function(data){

				var p;
				$(".iloop").hide();
				try{
					p = JSON.parse(data);
					if (p['succed']) {
                        
                        if (p['succed'] == 1) {
                            $("[xml=2]").removeClass('hide');
                            $("[xml=1]").addClass('hide');
                            $("[xml=4]").addClass('hide');

                            var t_venta = getDatos('nombre',168,'id = '+p['factura']['tipoventa'],0,0,0)[0][0][0];
                            var t_moneda = getDatos('id,(valor+suma) as valor',54,'codigo = "'+p['factura']['moneda']+'"',0,0,0)[0][0];
                            var t_divisa = t_moneda[1];
                            t_moneda = t_moneda[0];
                            var t_pago = getDatos('id,nombre',26,'idhacienda = '+p['factura']['tipopago'],0,0,0)[0][0];
                            
                            if(p['emisor']['id'] == 0){
                                $("#fclientes").data('proveedor',{cedula : p['emisor']['cedula'],correo: p['emisor']['correo'],nombre:p['emisor']['nombre'],ap1:p['emisor']['ap1'],ap2:p['emisor']['ap2'],telefono:p['emisor']['telefono'],
                                    barrio:p['emisor']['barrio'],direccion:p['emisor']['otrassenas'],tipo:p['emisor']['tipo']});
                                t_prov = 0;
                            }else{
                                $("#fclientes").data('proveedor',{correo : p['emisor']['correo']});
                            }
                            p['factura']['divisa'] = parseFloat(t_divisa) == 1 ? 1 : p['factura']['divisa'];
                            
                            $("#ffacturas .zelda").data('triforce',{vidtipo:p['factura']['tipoventa'], vidtipoventa:2, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:p['clave'], vidmoneda:t_moneda, vidcliente:p['emisor']['id'], vsubtotal:(parseFloat(p['factura']['subtotal'])+parseFloat(p['factura']['exento']))*parseFloat(p['factura']['divisa']), vdescuento: parseFloat(p['factura']['descuento'])*parseFloat(p['factura']['divisa']), vimv:parseFloat(p['factura']['impuesto'])*parseFloat(p['factura']['divisa']), vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : p['factura']['divisa'],vidusuario:'',vidtipopago:t_pago[0],vidodt:0,vajuste:0,tmpcorreo:'',videxoneracion:'',vexento: parseFloat(p['factura']['exento'])*parseFloat(p['factura']['divisa']),vflete:0,vplazo:p['factura']['plazo'],vcomentario:'',vfecha:p['factura']['fsistema']});
                            
                            $(".shxml_body").html('');

                            for (var i = 0; i < p['detalle'].length; i++) {

                                $(".shxml_body").append('<tr class="ciclos" id="fd'+i+'"> <td><input type="checkbox" name="isvalid" id="valid'+p['detalle'][i]['linea']+'" checked><label for="valid'+p['detalle'][i]['linea']+'"></label></td> <td>'+p['detalle'][i]['cantidad']+'</td><td>'+p['detalle'][i]['unidad']+'</td><td>'+p['detalle'][i]['detalle']+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['descuento']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['impuesto']).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(p['detalle'][i]['precio']).formatMoney(2,'.',',')+'</td></tr>');

                                // $("#fd"+i).data('unidad',{})

                                $("#fd"+i).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : p['detalle'][i]['idproducto'],vcantidad : p['detalle'][i]['cantidad'],vprecio : p['detalle'][i]['unitario'],vdescuento : p['detalle'][i]['descuento'],vidinventario : 6,vidodt : 0,vimv : p['detalle'][i]['impuesto'],vcomodin : '',vunidad : p['detalle'][i]['unidad'],vidunidad : p['detalle'][i]['idunidad'][0],vidimpuestos:'',viddescuentos:'',vdesc : p['detalle'][i]['descuento'],vcodigo:p['detalle'][i]['codigo'],vunitario:p['detalle'][i]['unitario'],ganancia:0,detalle:p['detalle'][i]['detalle']});
                            }

                            $(".shxml_head").html('<b>Factura: </b>'+p['clave'].substr(21,20)+', Fecha: '+p['factura']['fecha']+', Tipo Venta: '+t_venta+', Tipo Pago: '+t_pago[1]+', Tipo Cambio: '+p['factura']['divisa']+'<br><b>Emisor: </b>'+p['emisor']['nombre']+', Ced.: '+p['emisor']['cedula']+', Correo: '+p['emisor']['correo']+'<input type="checkbox" name="icompra" id="invcompra"> <label style="float:right    " for="invcompra">Incluir al Inventario</label>');

                            var total = (parseFloat(p['factura']['exento'])-parseFloat(p['factura']['descuento'])+parseFloat(p['factura']['impuesto'])+parseFloat(p['factura']['subtotal'])).formatMoney(2,'.',',');

                            $(".shxml_foot").html('<tr><td colspan="5" style="padding:0px;text-align:right;"><b>Gravado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['subtotal']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Impuestos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['impuesto']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Exento</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['exento']).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Descuentos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(p['factura']['descuento']).formatMoney(2,'.',',')+'</td></tr><tr><td colspan="5" style="padding: 0px;text-align:right"><b>TOTAL</b></td><td colspan="2" style="padding: 0px;text-align:right">'+p['factura']['moneda']+' '+total+'</td></tr>');

                            $("[xml=3]").removeClass('hide').removeAttr('disabled');
                        }else{
                            $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:2, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:p['clave'], vidmoneda:1, vidcliente:p['idprov'], vsubtotal:p['total'], vdescuento: 0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 1,vidusuario:'',vidtipopago:1,vidodt:0,vajuste:0,tmpcorreo:'',videxoneracion:'',vexento: 0,vflete:0,vplazo:0,vcomentario:'',vfecha:'curdate()'});
                            $(".shxml_body").append('<tr class="ciclos hide" id="fd'+i+'"> <td></td></tr>');

                                $("#fd"+i).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : 0,vcantidad : 1,vprecio : p['total'],vdescuento : 0,vidinventario : 6,vidodt : 0,vimv : p['impuesto'],vcomodin : '',vunidad : 1,vidimpuestos:'',viddescuentos:'',vdesc : 0});
                            //$("[xml='1']").removeClass('disabledbutton');
                            $("[xml=3]").removeClass('hide').removeAttr('disabled');
                            $("#myclave").val(p['clave']);
                            $("#mha").html(p['emisor']+', '+p['cedula']+'<br>Impuesto: '+parseFloat(p['impuesto']).formatMoney(2,'.',',')+'<br>Total: '+parseFloat(p['total']).formatMoney(2,'.',','));
                        }
						
					}else{
						$("[xml=1]").removeClass('hide');
						$("[xml=2]").addClass('hide');
                        emptyDropzones();
						Materialize.toast(p['ERROR'],4000,'red');
					}
				}catch(e){
					$("[xml=1]").removeClass('hide');
					$("[xml=2]").addClass('hide');
					Materialize.toast('Error Extrayendo XML',4000,'red');
                    emptyDropzones()
					console.log(data)
                    console.log(e)				
				}
			});
	}else
		Materialize.toast('Error Subiendo el XML',4000,'red')	
};

function emptyDropzones() {
    var one = parseInt(Dropzone.forElement("#registro-upload").files.length);
    if (one) {
        Dropzone.forElement("#registro-upload").removeAllFiles(true);
    }else{
        var dos = parseInt(Dropzone.forElement("#hacienda-upload").files.length);
        if (dos) {
            Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
            $("#myclave").val('');
            $("#mha").html('');
        }
    }

}


function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'detallefactura':
        if ($("#invcompra").is('checked')) {
            var idprov = $("#ffacturas .zelda").data('triforce')['vidcliente'];
            var idunid = 0;
            var isimv = 0;
            var min = 0;
            var max = 0;
            var costoad = 0;
            var idmoneda_ad = 0;
            var idinventario = 0;
            var ganancia = 0;
            var idinventario = 6;
            var cantidad = 0;
            var isinventariado = parseInt(config[1]);

            $("#fdetallefacturas .ciclos").each(function(){
                idunid = $(this).data('triforce')['vidunidad'];
                isimv = $(this).data('triforce')['vimv'] > 0 ? 0 : 100;
                
                if ($(this).data('triforce')['videntrada'] == 0) {

                   if ($(this).data('triforce')['vunidad'] != 'Sp') {
                        $(this).data('triforce')['vidinventario'] = 6;
                        var pd = insertar(11,'','null,"'+$(this).data('triforce')['vcodigo']+'","","'+$(this).data('triforce')['detalle']+'",'+$(this).data('triforce')['vunitario']+','+ganancia+','+isimv+','+idunid+','+min+','+max+',0,0,@@usr,'+$("#ffacturas .zelda").data('triforce')['vidmoneda']+',0,@@impresa,'+isinventariado+',0,'+!isinventariado+',0,0');
                       
                        var pp = insertar(104,'','null,'+pd[0][0][0]+','+idprov+',"'+$(this).data('triforce')['vcodigo']+'",'+$(this).data('triforce')['vunitario']+','+costoad+',now(),'+$("#ffacturas .zelda").data('triforce')['vidmoneda']+','+idmoneda_ad);
                        
                        cantidad = isinventariado ? $(this).data('triforce')['vcantidad'] : 0;
                        var ip = insertar(97,'','null,'+idinventario+','+pd[0][0][0]+','+cantidad);
                        $(this).data('triforce')['videntrada'] = pd[0][0][0];
                   }else{
                        $(this).data('triforce')['videntrada'] = '-0';
                        $(this).data('triforce')['vidinventario'] = 2;
                        $(this).data('triforce')['vcomodin'] = $(this).data('triforce')['detalle'];
                   }
                }else{
                    if ($(this).data('triforce')['vunidad'] != 'Sp') {
                        $(this).data('triforce')['vidinventario'] = 6;
                        var exists = getDatos('id',104,'idproveedor = '+idprov+' and idproducto = '+$(this).data('triforce')['videntrada'],0,0,0);
                        if (exists['succed']) {
                            if (exists[0].length) {
                                var pp = actualizar(104,'codigo="'+$(this).data('triforce')['vcodigo']+'",preciocosto='+$(this).data('triforce')['vunitario']+',costoadicional='+costoad+',idmonedacosto='+$("#ffacturas .zelda").data('triforce')['vidmoneda']+',idmonedaadicional='+idmoneda_ad+',ultimafecha=now()','id='+exists[0][0][0]);
                            }else{
                                var pp = insertar(104,'','null,'+pd[0][0][0]+','+idprov+',"'+$(this).data('triforce')['vcodigo']+'",'+$(this).data('triforce')['vunitario']+','+costoad+',now(),'+$("#ffacturas .zelda").data('triforce')['vidmoneda']+','+idmoneda_ad);
                            }
                        }
                        cantidad = isinventariado ? $(this).data('triforce')['vcantidad'] : 0;
                        var ip = actualizar(97,'cantidad=cantidad+'+cantidad,'idinventario ='+idinventario+' and idproducto ='+$(this).data('triforce')['videntrada']); 

                        var pd = actualizar(11,'exoneracion='+isimv+',ganancia = (costo + ganancia) - getCosto('+$(this).data('triforce')['videntrada']+','+idinventario+'),costo = getCosto('+$(this).data('triforce')['videntrada']+','+idinventario+')','id='+$(this).data('triforce')['videntrada']);
                        console.log(pd+' '+$(this).data('triforce')['videntrada'])
                        $(this).data('triforce')['videntrada'] = pd[0][0][0];
                   }else{
                        $(this).data('triforce')['vidinventario'] = 2;
                        $(this).data('triforce')['videntrada'] = '-0';
                   }
                }
            });
        }
        break;
        case 'factura':
            if ($("#ffacturas .zelda").data('triforce')['vidcliente'] == 0) {
                var ap1 = ap2 = nom = '';
                var tpc = $("#fclientes").data('proveedor')['tipo'];
                var nac = 1;
                var email = $("#fclientes").data('proveedor')['correo'];
                switch(parseInt(tpc)){
                    case 1:
                        nom = $("#fclientes").data('proveedor')['nombre'];
                        ap1 = $("#fclientes").data('proveedor')['ap1'];
                        ap2 = $("#fclientes").data('proveedor')['ap2'];
                        break;
                    case 2:
                        nom = $("#fclientes").data('proveedor')['nombre'];
                        break;
                    default:
                        console.log('ERR TIPO: '+tpc)
                        break;
                }
                var pr = insertar(2,'','null,"'+ap1+'","'+ap2+'","'+nom+'","'+$("#fclientes").data('proveedor')['cedula']+'",'+tpc+',1,1,0,0,0,0,'+nac+',"",now(),@@usr,0,"",@@impresa,0');
                $("#ffacturas .zelda").data('triforce')['vidcliente'] = pr[0][0][0];
                insertar(17,'','null,'+pr[0][0][0]+',2,"'+email+'"');
                //insertar(238,'','null,');
                //insertar(239,'','null,');
                str_correos = email;
            }else{
                str_correos = $("#fclientes").data('proveedor')['correo'];
            }

            $("#ffacturas .zelda").data('triforce')['videstado'] = estado;
        	break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}


function endDetail(vid,vacc,vmodulo){
	switch(vmodulo){
        case 'factura':
            var factura = getDatos('consecutivo',64,'id = '+vid[0][0],0,0)[0][0][0];
            var clave = vid[0][0];

            var $toastContent = $('<span style="width: 500px">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
            Materialize.toast($toastContent);
            sendFE('^'+clave);
            break;
        case 'cliente':
            break;
        default:
            break;
    }
    return false;
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'documentos':
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
        var detbl = 64;
        var color = '';
        estado = $("[xml=3]:visible").length ? estado : $("input[name=tventa]:checked").attr('id').substr(2);

        try {
            p = JSON.parse(data);
            $(".expect").removeClass('progress');

            if (parseInt(p['succes'])) {
                
                var vfactura = p['num'];
                var vclave = p['clave'];
                switch(estado){
                    case 2:
                    case 3:
                        clave = clave.substr(1);
                        detbl = 301;
                        var idfact = factura = getDatos('fe_getclave(idfactura),fe_getnumeracion(idfactura),idfactura',301,'id = '+clave,0,0,0);
                        vfactura = idfact[0][0][1];
                        vclave = idfact[0][0][0];
                        idfact = idfact[0][0][2]
                        break;
                    case 5:
                    case 6:
                    case 7:
                        clave = clave.substr(1);
                        break;
                    default:
                        break;
                }
                color = 'yellow';
                arr('login',7,2,detbl,'feestado=2','id='+clave,0,0);
                $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
                sendVMail(vfactura,vclave,clave);
            }else{
                color = 'red';
                switch(estado){
                    case 2:
                    case 3:
                        clave = clave.substr(1);
                        detbl = 301;
                        break;
                    case 5:
                    case 6:
                    case 7:
                        clave = clave.substr(1);
                        break;
                    default:
                        break;
                }
                $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
                Materialize.toast(p['rs'],5000,'red');
                switch(parseInt(p['erno'])){
                    case 1:
                        arr('login',7,2,detbl,'feestado=0','id='+clave,0,0);
                        break;
                    default:
                        arr('login',7,2,detbl,'feestado=8','id='+clave,0,0);
                    break;
                }
                setTimeout(function(){$("#toast-container").remove();},3000);
            }
            
        }
        catch(err){
            console.log(err)
            switch(estado){
                case 2:
                case 3:
                    clave = clave.substr(1);
                    detbl = 301;
                    break;
                case 5:
                case 6:
                case 7:
                    clave = clave.substr(1);
                    break;
                default:
                    break;
            }
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
            Materialize.toast(data,5000,'red');
            arr('login',7,2,detbl,'feestado=8','id='+clave,0,0);
            setTimeout(function(){$("#toast-container").remove();},10000);
            $(".status").attr('disabled',false)
        }
        if(!$("[xml=3]:visible").length){
            $("#e"+clave).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline');  
            $("#e"+clave).css('color',color)
        }  

  });
}

function sendVMail(factura,clave,vid){
    var archivos = '';

    if (str_correos != '') {
        var vbody = getDatos('',73,'"'+vid+'"',0,0);
        vbody = vbody[0][0];
        var estr = '';

        switch(parseInt(estado)){
            case 2:
                estr = 'Nota de Crédito';
                break;
            case 2:
                estr = 'Nota de Débito';
                break;
            case 5:
                estr = 'Aceptación';
                break;
            case 6:
                estr = 'Aceptación Parcial';
                break;
            case 7:
                estr = 'Rechazo';
                break;
            default:
                estr = 'Factura';
                break;
        }
        archivos = makeArchivos(factura,clave,vid,vbody[1],estr);

        enviarCorreo(3,str_correos,estr+" N° "+factura,vbody[0],archivos);
    }
}


function makeArchivos(vfactura,vclave,vid,vsucursal,vestado){
    var archivos = '';
    if (vestado == 'Factura') {
        mantenimiento_async('login',8,{arch:'recibo',id:vid,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vid},1);
        if (vclave == vid){
            archivos = 'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf';
        }
        else{
            archivos = {0:'xml/Factura N°'+vfactura+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
            mantenimiento_async('login',9,{id:vid,factura:vfactura,sucursal:vsucursal},1);
        }
    }else{
        archivos = {0:'xml/'+vestado+' N°'+vfactura+', '+vsucursal+'.xml'};
            mantenimiento_async('login',9,{id:vid,factura:vfactura,sucursal:vsucursal,restado:vestado},1);
    }
    
    return archivos;
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {
    setTimeout(function(){$("#toast-container").remove();},3000);
}