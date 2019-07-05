Dropzone.autoDiscover = false;
var myDropzone;
var estado;
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
            url: 'login',
            type: "post",
            data: {accion:15,arreglo:1,server:config[18],ced:sucursal[0],isp:sucursal[1]}
        })
            .done(function(res){
                var str = '';
                var tabla = $("#data-table-compras").DataTable();   
                tabla.destroy();

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

    if ($(this).attr('xml') == undefined) {
        var idcomp = $(this).parent().parent().attr('id').substr(2)
    }else{
       var idcomp = getDatos('',278,$(this).parent().attr('idcompra'),0,0,0)
       console.log(idcomp)
       idcomp = idcomp[0][0][0];
    }

    var idfact = getDatos('',266,idcomp+',@@usr,@@impresa,'+tstado,0,0,0);
    var crrprov = getDatos('group_concat(correo)',17,'idtabla = 2 and idfila = (select idcliente from facturas where id ='+idcomp+') group by idfila',0,0,0);
    crrprov = crrprov[0].length ? '' : crrprov[0][0][0];
    var titulo = parseInt(tstado) == 5 ? 'Aceptación' : paseInt(tstado) == 6 ? 'Acep. Parcial' : 'Rechazo';

    if(!idfact.succed){
        Materialize.toast(idfact[0]['ERROR'],4000,'red');
        $(this).parent().parent().remove();
    }else{
        var $toastContent = $('<span style="width: 500px" id="t'+idfact[0][0][0]+'">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        Materialize.toast($toastContent,5000);
        var factura = getDatos('consecutivo,datediff(curdate(),fecha)',64,'id = '+idfact[0][0][0],0,0)[0][0];
        var tlimit = parseInt(factura[1]);

        if(tlimit <= 38)
            sendFE('^'+idfact[0][0][0],crrprov,64,titulo);

        if($(this).attr('xml') == undefined){
            var tabla = $("#data-table-facturas").DataTable();
            tabla.destroy();
            $(this).parent().parent().remove();
            $("#data-table-facturas").dataTable({
                bFilter: false,
                bScrollInfinite: true,
                bSort: false,
                bLengthChange: false,
                order: [],
                bPaginate: false,
                info: false
            });
        }else{
            $("[xml=3]").addClass('hide');
            $("[xml=2]").addClass('hide');
            $("[xml=1]").removeClass('hide');
            $("[xml=4]").removeClass('hide');
            Dropzone.forElement("#registro-upload").removeAllFiles(true);
            Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
        }

        // if(parseInt(config[21])){ //INVENTARIO AUTOMATICO
        //     switch(parseInt(tstado)){
        //         case 5:
        //             var dtcompra = getDatos('comodin,format(cantidad,2),format(precio,2),format(precio*cantidad+imv-descuento,2)',263,'idfactura = '+$(this).parent().parent().attr('id').substr(2),0,0,0);
        //             $("#modal-shcompra").modal('open');
        //             $("#bdtompras").html();
        //             var str = '';
        //             for (var i = 0; i < dtcompra[0].length; i++) {
        //                 str += '<tr><td></td></tr>';
        //             }
        //             $("#bdtompras").html(str);
        //             break;
        //         default:
        //             break;
        //     }    
        // }
        
    }

});

$(document).on("click",".status",function(){
	if ($(this).is("[disabled]")) {
        event.preventDefault();
    }

    if($(this).attr('style').indexOf('lime') > -1){
        Materialize.toast('Documento Electrónico Aceptado',4000,'green');
        return false;
    }

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
        case 8:
            vid = '!'+vid;
            break;
		default:
			break;
	}

	$.get('../wsdlClient.php',{accion:4,id:vid})
		.done(function(data){
			var ex;
			var p;
			var color = msj = colort = '';
			var state = 0;

			try{
				p = JSON.parse(data);
                console.log(p['estado'])
				switch(p['estado']){
					case 'aceptado':
						color = 'lime';
						state = 1;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Aceptado' : p['rs'];
                        colort = 'green';
						break;
                    case 'recibido':
                        color = 'light-green';
                        state = 9;
                        msj = 'Documento Electrónico Recibido';
                        colort = 'light-green';
                        break;
					case 'rechazado':
						color = 'red';
						state = 3;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Rechazado' : p['rs'];
                        colort = 'red';
						break;
					case 'procesando':
						color = 'yellow';
						state = 2;
                        msj = 'Procesando Documento Electrónico';
                        colort = 'yellow'
						break;
					case 'Sin Subir':
						var $toastContent = $('<span style="width: 500px">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
						Materialize.toast($toastContent,5000);
						sendFE(vid,);
                        color = 'blue';
                        state = 2;
                        msj = 'Procesando Documento Electrónico';
                        colort = 'blue';
						break;
					case 'Sin Internet':
						color = 'blue';
                        state = 0;
                        msj = p['rs'];
                        colort = 'blue';
						break;
					case 'error':
                        state = 8;
						color = 'red'
						msj = 'Error en Documento Electrónico';
                        colort = 'red';
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
                        case 8:
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
				Materialize.toast(msj,6000,colort);
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
$(document).on("click",".shcompra",function(){
    var dtcompra = getDatos('comodin,format(cantidad,2),format(precio,2),format(precio*cantidad+imv-descuento,2)',263,'idfactura = '+$(this).parent().parent().attr('id').substr(2),0,0,0);
    $("#modal-shcompra").modal('open');
    $("#bdtompras").html();
    var str = '';
    for (var i = 0; i < dtcompra[0].length; i++) {
        str += '<tr><td>'+dtcompra[0][i][0]+'</td><td>'+dtcompra[0][i][1]+'</td><td>'+dtcompra[0][i][2]+'</td><td>'+dtcompra[0][i][3]+'</td></tr>';
    }
    $("#bdtompras").html(str);
})


$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();
	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
	
	arr('login',6,'',179,'0,0,"1,'+id+',@@impresa,0,0","0,10"',0,1,$("#listafacturas"));
    console.log('0,0,"1,'+id+',@@impresa,0,0","0,10"')
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
					var factura = getDatos('',287,p['clave'],0,0,0);

                    if(factura[0].length){

                        switch (parseInt(factura[0][0][0])) {
                            case 0:
                                Materialize.toast('Falta Mensaje de Hacienda',4000,'red');
                                break;
                            case 1:
                                $("[xml=3]").removeClass('hide').removeAttr('disabled');
                                $("#mha").html(factura[0][0][1]+', '+factura[0][0][2]+'<br>Impuesto: '+parseFloat(factura[0][0][3]).formatMoney(2,'.',',')+'<br>Total: '+parseFloat(factura[0][0][4]).formatMoney(2,'.',','));
                                $("#faapr").attr('idcompra',factura[0][0][21]);
                                break;
                            case 2:
                                $("[xml=2]").removeClass('hide');
                                $("[xml=1]").addClass('hide');
                                $("[xml=4]").addClass('hide');

                                $(".shxml_head").html('<b>Factura: </b>'+p['clave'].substr(21,20)+', Fecha: '+factura[0][0][5]+', Tipo Venta: '+factura[0][0][6]+', Tipo Pago: '+factura[0][0][7]+', Tipo Cambio: '+factura[0][0][8]+'<br><b>Emisor: </b>'+factura[0][0][1]+', Ced.: '+factura[0][0][2]+', Correo: '+factura[0][0][9]+'<input type="checkbox" name="icompra" id="invcompra"> <label style="float:right    " for="invcompra">Incluir al Inventario</label>');

                                var str = '';

                                for (var i = 0; i < factura[0].length; i++) {
                                    str += '<tr class="ciclos" id="fd'+i+'"> <td><input type="checkbox" name="isvalid" id="valid'+i+'" checked><label for="valid'+i+'"></label></td> <td>'+factura[0][i][10]+'</td><td>'+factura[0][i][11]+'</td><td>'+factura[0][i][12]+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][13]).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][14]).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][15]).formatMoney(2,'.',',')+'</td></tr>';
                                }

                                $(".shxml_body").html(str);

                                $(".shxml_foot").html('<tr><td colspan="5" style="padding:0px;text-align:right;"><b>Gravado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][16]).formatMoney(2,'.',',')+'</td></tr>  <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Exento</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][17]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Exonerado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][18]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>Descuentos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][19]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding:0px;text-align:right;"><b>IVA</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][3]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="5" style="padding: 0px;text-align:right"><b>TOTAL</b></td><td colspan="2" style="padding: 0px;text-align:right">'+factura[0][0][20]+' '+parseFloat(factura[0][0][4]).formatMoney(2,'.',',')+'</td></tr>');

                                $("#faapr").attr('idcompra',factura[0][0][21]);
                                $("[xml=3]").removeClass('hide').removeAttr('disabled');

                                break;
                            case 3:
                                Materialize.toast('Documento Rechazado por Hacienda',4000,'red');
                                break;
                            case 5:
                                Materialize.toast('Documento Aceptado',4000,'red');
                                break;
                            case 6:
                                Materialize.toast('Documento Aceptado Parcial',4000,'red');
                                break;
                            case 7:
                                Materialize.toast('Documento Rechazado',4000,'red');
                                break;
                            default:
                                // statements_def
                                break;
                        }
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
            var factura = getDatos('consecutivo,datediff(curdate(),fecha)',64,'id = '+vid[0][0],0,0)[0][0];
            var tlimit = parseInt(factura[1]);
            factura = factura[0]
            var clave = vid[0][0];

            if(tlimit <= 38){
                var $toastContent = $('<span style="width: 500px">Generando Documento Electrónico:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
                Materialize.toast($toastContent,5000);
                sendFE('^'+clave);
            }
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

function sendFE(clave,str_correos,vtabla,vtit){
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: clave, accion : 1,to:str_correos,idfila : clave,idtabla : vtabla,tit:vtit}
    })
      .done(function(data) {

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
                setTimeout(function(){$("#t"+clave).parent().parent().remove();},3000);
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
            setTimeout(function(){$("#t"+clave).parent().parent().remove();},10000);
            $(".status").attr('disabled',false)
        } 

  });
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {
}