var config;
var str_correos = '';

$(document).ready(function(){
	var tf = param = getParameterByName('tf');//parseInt($("input[name=tventa]:checked").attr('id').substr(2));
    config = getDatos('',42,'@@impresa',0,0)[0][0];

	$("#data-table-productos").dataTable({
		bFilter: false,
		order : [],
		"bScrollInfinite": true
	});
    
    if (config[5] == 1){
        $("#tps").attr('checked',false);
    }else{
        $("#tps").attr('checked',true);
    }

    permisos(1107,1110)
    $("#tf"+tf).click().change()
});

function cargarTipo(){
        var tf = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
        $(".tr").addClass('hide');
        switch(tf) {
            case 1:
                $(".trVenta").removeClass('hide')
                break;
            case 2:
                $(".trCompra").removeClass('hide');
                break;
            case 3:
                $(".trOCompra").removeClass('hide')
                $(".trOCompra .delete-view").parent().addClass('per1199')
                $(".trOCompra .delete-view").parent().addClass('hide')

                permisos(1199,1199)                
                break;
            case 4:
                $(".trCot").removeClass('hide')
                break;
            case 5:
                $(".trPedido").removeClass('hide')
                break;
            case 7:
                $(".trTiquete").removeClass('hide')
                break;
            case 8:
                $(".trSpecial").removeClass('hide')
                break;
            case 9:
                $(".trFECompra").removeClass('hide')
                break;
            case 10:
                $(".trExportacion").removeClass('hide')
                break;
            case 104:
                $(".trManual").removeClass('hide')
                break;
            case 108:
                $(".trApartado").removeClass('hide')
                break;
            default:
                break;
        }
    }

$(document).on("click",".delete-view",function(){
    var tipoventa = $("[name=tventa]:checked").attr('id').substr(2);
    if ($(this).attr('cnt') == undefined) {
        if(!$("#_DEL").length){
            var id = $(this).attr('id');
            let msjdel = 'Desea Eliminar Este Registro?';
            let justificar = ''
            let time = 10000
            
            if($(this).attr('justificar') == '1'){
                justificar = '<input type="text" id="txt-justify" placeholder="Razón de Eliminar" class="black-text"/>'
                time = 3600000
            }
            
            if(tipoventa == '108'){
                let abonos = getDatos('count(*),format(sum(valor),2)',301,'idfactura='+id.substr(1)+' and idestado = 1 and idtipo in(3,7)');
                if(abonos[0][0][0] != '0') 
                    msjdel = 'Apartado tiene '+abonos[0][0][0]+' abono(s), Valor de Abonos: '+abonos[0][0][1]
            }
            $(this).attr('mbg',$(this).parent().parent().css('background-color'));
            var $toastContent = $('<span id="_DEL" class="black-text">'+msjdel+justificar+'</span>').add($('<a class="btn red" style="margin:2px" id="deldef" inid="'+id+'">Eliminar</a> <a class="btn btn-default" id="delcan" inid="'+id+'">Cancelar</a>'));
            Materialize.toast($toastContent,time,'orange',function(){if($("#"+id) != undefined) $("#"+id).parent().parent().parent().parent().css('background-color',$("#"+id).attr('mbg'))});
            $(this).parent().parent().parent().parent().css('background-color','#ed5249');

            $("#txt-justify").focus()
        }
    }else{
        deleterow($(this),tipoventa)
    }
});

$(document).on("click",".mh",function(){
    var vid = $(this).attr('id').substr(1);
    var vbody = getDatos('',73,'"'+vid+'"',0,0)[0][0];
    var rs = mantenimiento('login',14,{id:vid,sucursal:vbody[1]},1);
    console.log(rs)
    if(rs["succed"])
        $(this).attr('href',rs["arhivo"]); 
});

$(document).on("click",".pdf",function(e){
    var vid = $(this).attr('id').substr(1);
    var vbody = getDatos('',73,'"'+vid+'"',0,0)[0][0];
    mantenimiento('login',8,{arch:'recibo',id:vid,mic:1,tit:vbody[3],sel:'',tbl:72,where:vid},1);
    console.log({arch:'recibo',id:vid,mic:1,tit:vbody[3],sel:'',tbl:72,where:vid})
    $(this).attr('href','../assets/pdf/'+vbody[3]+' No'+vbody[2]+' '+vbody[1]+'.pdf'); 
});

$(document).on("click",".fedit",function(){
	var idfactura = $(this).attr('id').substr(1);
	var tf = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
	tf = tf == 104 ? 2 : tf;
	window.open('facturacion?edt=1&id='+idfactura+'&tf='+tf)
});

$(document).on("click",".process",function(){
	var idfactura = $(this).attr('id').substr(1);

	window.open('facturacion?id='+idfactura)
});

$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();
	var tabla = $("#data-table-facturas").DataTable();
    tabla.destroy();
    arr('login',6,'',158,'0,0,"'+id+',0,@@impresa,0,0,@@usr","0,10"',0,1,$("#listafacturas"));

    $("#data-table-facturas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });
    paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0,@@usr');
    $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?');
});

$(document).on("click",".send",function(){
    var vid = $(this).attr('id').substr(1);
    var archivos = '';
    var factura = getDatos('lpad(consecutivo,6,0),fe_getnumeracion(id),idcliente',64,'id = '+vid,0,0)[0][0];
    rclave = factura[1];
    cliente = factura[2];
    factura = factura[0];
    var clave = rclave;

    var correos = getDatos("",18,cliente+",2",0,0,0);
    str_correos = '';
    
    for (var i = 0; i < correos[0].length; i++) {
        str_correos += correos[0][i][3]+",";
    }
    str_correos = str_correos.substr(0,str_correos.length-1);

    if (str_correos != '') {
        var vbody = getDatos('',73,vid,0,0)[0][0];
        var ntipo = getDatos('if(id=1,"Factura",nombre)',57,'id='+parseInt($("input[name=tventa]:checked").attr('id').substr(2)),0,0)[0][0][0];
        archivos = makeArchivos(rclave,clave,vid,vbody[1],ntipo);
        enviarCorreo(3,str_correos,ntipo+" No "+factura,vbody[0],archivos,1,vid,64);
        Materialize.toast('Correo Enviado',4000,'green');
    }
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	var tp = !$("#tps").is(":checked");
	window.open('facturacion?accion=6&id='+id+'&tp='+tp);
});

$(document).on("click",".xml",function(){
    var vid = $(this).attr('id').substr(1);
    var vbody = getDatos('',73,'"'+vid+'"',0,0)[0][0];
	mantenimiento('login',9,{restado:vbody[3],factura:vbody[2],sucursal:vbody[1],id:vid},1);
    $(this).attr('href','../assets/xml/'+vbody[3]+' No'+vbody[2]+' '+vbody[1]+'.xml'); 
});


function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
    	
        default:
            return vmodulo;
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    
    return salida;
};

function endDetail(vid,vacc,vmodulo) {
            
    return false;
}


function makeArchivos(vfactura,vclave,vid,vsucursal,vestado){
    var archivos = '';

    archivos = {0:'xml/Factura No'+vfactura+' '+vsucursal+'.xml',1:'pdf/Factura No'+vfactura+' '+vsucursal+'.pdf'}
    mantenimiento('login',8,{arch:'recibo',id:vid,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vid},1);
    mantenimiento('login',9,{id:vid,factura:vfactura,sucursal:vsucursal},1);
    
    return archivos;
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function deleterow(elem,tipoventa){
    var id = elem.attr('id');
    switch(tipoventa){
    case "108": //apartado
        actualizar(64,'idtipoventa=-108,isregistrada=1','id='+id.substr(1))
        actualizar(301,'idestado=0,isregistrada=1,idfactura=-'+id.substr(1),'idfactura='+id.substr(1))
        break;
    case '4':
        actualizar(64,'idtipoventa=-4,idestado=3','id='+id.substr(1))
        actualizar(65,'idfactura=-'+id.substr(1),'idfactura='+id.substr(1))
        insertar(279,'id,idtabla,idaccion,descripcion,usuario,fecha,idsucursal,idfila','null,64,3,"Eliminacion de Proforma",@@usr,now(),@@impresa,-'+id.substr(1))
        break;
    case '3':
        actualizar(64,'idtipoventa=-3,idestado=3','id='+id.substr(1))
        actualizar(65,'idfactura=-'+id.substr(1),'idfactura='+id.substr(1))
        insertar(279,'id,idtabla,idaccion,descripcion,usuario,fecha,idsucursal,idfila','null,64,3,"'+$("#"+id).attr('txt-justify')+'",@@usr,now(),@@impresa,-'+id.substr(1))
        break;
    default:
        break;
    }

    $("#"+id).parent().parent().parent().parent().remove()
}