var param;

$(function(){

    var tf  = getParameterByName('tf');
    tf = !tf ? 3 : tf;
    param = getParameterByName('tp');
    
    if(param == 0){
        $("#titg").html('Movimientos Cuentas por Cobrar');
    }else{
        $("#titg").html('Movimientos Cuentas por Pagar');
        $("#tf7").attr('id','tf8');
        $("[for=tf7]").attr('for','tf8')
    }

    $('#tf'+tf).prop('checked',true);

    config = getDatos('',42,'@@impresa',0,0)[0][0];
    arr('login',6,'',187,'0,0,"'+tf+'|'+param+'|@@impresa|||","0,10"',0,1,$("#listafacturas"));
    console.log('0,0,"'+tf+'|'+param+'|@@impresa|||","0,10"')
    var tabla = $("#data-table-facturas").DataTable();
    tabla.destroy();
    $("#data-table-facturas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });

    $(".pagination").attr('filtro_sp',tf+'|'+param+'|@@impresa|^|?|')
    paginate($("ul.pagination").attr('vtbl'),undefined,tf+'|'+param+'|@@impresa|||');
});

$(document).on("change","input[name=tventa]",function(){
    var id = parseInt($(this).attr('id').substr(2));
    $("#search_facturas").val('').attr('filtro',1);
    $("[fltr=1]").click();
    Materialize.updateTextFields();

    var tabla = $("#data-table-facturas").DataTable();
    tabla.destroy();
    arr('login',6,'',187,'0,0,"'+id+'|'+param+'|@@impresa","0,10"',0,1,$("#listafacturas"));
    console.log('0,0,"'+id+'|'+param+'|@@impresa","0,10"')
    $("#data-table-facturas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });

    $(".pagination").attr('filtro_sp',id+'|'+param+'|@@impresa|^|?|')
    paginate($("ul.pagination").attr('vtbl'),undefined,id+'|'+param+'|@@impresa|||');
    
});

$(document).on("click",".print",function(){
    var id = $(this).attr('id').substr(1);
    var tp = $("#tps").is(":checked") ? 0 : 1;
    var tf = $("[name=tventa]:checked").attr('id').substr(2);
    if (tf == '7' || tf == '8')
        window.open('cuentas?accion=5&id='+id+'&tp='+tp);
    else
        window.open('cuentas?accion=4&id='+id+'&tp='+tp);
});

$(document).on("click",".sendm",function(){
    var clave = $(this).attr('id').substr(1);
    var factura =  getDatos('idfactura,fe_getnumeracion(id*-1)',301,'id = '+clave,0,0,0)[0][0];
    var vclave = factura[1];
    factura = factura[0];
    config[3] = 1;
    sendVMail(factura,clave,vclave);
});

function sendVMail(idfact,idnota,cnota){
    var archivos = '';
    var idcliente = getDatos('idcliente,fe_getnumeracion(id),fe_getclave(id)',64,'id='+idfact,0,0);
    var factura = idcliente[0][0][1];
    var clave = idcliente[0][0][2];
    idcliente = parseInt(idcliente[0][0][0]);

    if(config[3] == 1){ //ENVIO RAPIDO DE FACTURA
        str_correos = '';

        if (idcliente != 0) {
            var correos = getDatos("",18,idcliente+",2",0,0);
            
            if (correos == undefined) {
                Materialize.toast('Correos Inválidos',4000,'red');
                arr('login',7,2,301,'feestado=2','id='+idnota,0,0);
            }else{
                for (var i = 0; i < correos[0].length; i++) {
                    str_correos += correos[0][i][3]+",";
                }

                str_correos = str_correos.substr(0,str_correos.length-1);
            }
        }

        if (str_correos != '') {
            var vbody = getDatos('',73,'-'+idnota,0,0)[0][0];
            var vestado = $("#tf5").is(":checked") ? 'Nota Credito' : 'Nota Debito';
            archivos = makeArchivos(cnota,factura,idfact,'-'+idnota,vbody[1],vestado);
            enviarCorreo(3,str_correos,"Nota Credito No "+cnota,vbody[0],archivos,1,idnota,301);
        }
    
        //
    }
}

function makeArchivos(vnota,vfactura,vidfactura,vidnota,vsucursal,vestado){
    var archivos = '';
    mantenimiento_async('login',8,{arch:'recibo-notas-pagos',id:vidnota*-1,mic:1,tit:vestado,sel:'',tbl:186,where:vidnota*-1},1);

    archivos = {0:'xml/'+vestado+' No'+vnota+', '+vsucursal+'.xml',1:'pdf/'+vestado+' No'+vnota+', '+vsucursal+'.pdf'}
    mantenimiento_async('login',9,{id:vidnota,factura:vnota,sucursal:vsucursal,restado:vestado},1);
    console.log(vsucursal+' 1')
    return archivos;
}

function postExcecute(vid,p){

    return false;
}

function postSendmail() {
    switch(parseInt(vid)){
        default:
            Materialize.toast('Correo Enviado',4000,'green')
            break;
    }
}

function deleterow(elem){
    var id = elem.attr('id').substr(1);
    getDatos('',300,'3,'+id+','+$("[name=tventa]:checked").attr('id').substr(2)+',0,0,@@usr,0,0,0,0,0,"",@@impresa,"",0,0,""');
    $("[id=d"+id+"]").parent().parent().remove()
}