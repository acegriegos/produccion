$(function(){
	var tf = param = getParameterByName('tf');
	$('#tf'+tf).click();

	config = getDatos('',42,'@@impresa',0,0)[0][0];
    tf = tf == '' ? '3,7' : tf;
	arr('login',6,'',187,'0,0,"'+tf+'|@@impresa","0,10"',0,1,$("#listafacturas"));
    console.log('0,0,"'+tf+',@@impresa","0,10"')
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
	$(".pagination").attr('filtro_sp',tf+'|@@impresa')
	paginate($("ul.pagination").attr('vtbl'),undefined,tf+'|@@impresa');
});

$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
    id = id ==3 ? '3,7' : id;
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();

	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
	arr('login',6,'',187,'0,0,"'+id+'|@@impresa","0,10"',0,1,$("#listafacturas"));
	$("#data-table-facturas").dataTable({
		bFilter: false,
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});

	$(".pagination").attr('filtro_sp',id+',@@impresa')
	paginate($("ul.pagination").attr('vtbl'),undefined,id+',@@impresa');
	
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	var tp = $("#tps").is(":checked") ? 0 : 1;
	window.open('cuentas?accion=4&id='+id+'&tp='+tp);
});

$(document).on("click",".sendm",function(){
	var clave = $(this).attr('id').substr(1);
	var factura =  getDatos('idfactura,fe_getnumeracion(id*-1)',301,'id = '+clave,0,0,0)[0][0];
	var vclave = factura[1];
	factura = factura[0];
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
            var vestado = $("#tf5").is(":checked") ? 'Nota Crédito' : 'Nota Débito';
            archivos = makeArchivos(cnota,factura,idfact,'-'+idnota,vbody[1],vestado);
            enviarCorreo(3,str_correos,"Nota Crédito N° "+cnota,vbody[0],archivos);
        }
    
		//
    }
}

function makeArchivos(vnota,vfactura,vidfactura,vidnota,vsucursal,vestado){
    var archivos = '';
    mantenimiento_async('login',8,{arch:'recibo',id:vidfactura,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vidfactura},1);

    archivos = {0:'xml/'+vestado+' N°'+vnota+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
    mantenimiento_async('login',9,{id:vidnota,factura:vnota,sucursal:vsucursal,restado:vestado},1);

    return archivos;
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {
    setTimeout(function(){$(".toast").remove();},3000);
}