var config;
var str_correos = '';

$(document).ready(function(){
	var tf = param = getParameterByName('tf');//parseInt($("input[name=tventa]:checked").attr('id').substr(2));
    config = getDatos('',42,'@@impresa',0,0)[0][0];

    $(".tr").addClass('hide');

	switch(tf) {
		case 1:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
            $(".trVenta").removeClass('hide');
			break;
		case 2:
			$("[rm=1]").removeClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
            $(".trCompra").removeClass('hide');
			break;
		case 3:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
            $(".trCot").removeClass('hide');
			break;
		case 4:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
            $(".trOCompra").removeClass('hide');
			break;
		case 5:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").addClass('hide');
			$("[rm=3]").removeClass('hide');
            $(".trPedido").removeClass('hide');
			break;
		case 7:
			$("[rm=1]").addClass('hide');
			$("[rm=2]").removeClass('hide');
			$("[rm=3]").addClass('hide');
            $(".trTiquete").removeClass('hide');
			break;
	}
    arr('login',6,'',158,'0,0,"'+tf+',0,@@impresa,0,0","0,10"',0,1,$("#listafacturas"));

	$("#data-table-facturas").dataTable({
		bFilter: false,
		bScrollInfinite: true,
		bSort: false,
		bLengthChange: false,
		order: [],
		bPaginate: false,
		info: false
	});
    $(".pagination").attr('filtro_sp',tf+',0,@@impresa,^,?')
	paginate($("ul.pagination").attr('vtbl'),undefined,tf+',0,@@impresa,0,0')

	$("#data-table-productos").dataTable({
		bFilter: false,
		order : [],
		"bScrollInfinite": true
	});

	$('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        in_duration: 300, // Transition in duration
        out_duration: 100, // Transition out duration
        startingTop: '4%', // Starting top style attribute
        endingTop: '4%' // Ending top style attribute
    });
    
    if (config[5] == 1){
        $("#tps").attr('checked',false);
    }else{
        $("#tps").attr('checked',true);
    }
});


$(document).on("click","#process",function(){
	var idfactura = $("#process").attr('idfactura');
	var tf = $("#process").attr('tipo');
	var idproducto = new Array();
	$("[name=processitem]:checked").each(function(){
		idproducto.push($(this).attr('idd'));
	});
	window.open('facturacion?tf='+tf+'&arr='+idproducto+'&id='+idfactura);

});

$(document).on("click",".pdf",function(e){
    var vid = $(this).attr('id').substr(1);
    var vbody = getDatos('',73,'"'+vid+'"',0,0)[0][0];
    mantenimiento('login',8,{arch:'recibo',id:vid,mic:1,tit:vbody[3],sel:'',tbl:72,where:vid},1);
    console.log(vbody);
    $(this).attr('href','../assets/pdf/'+vbody[3]+' N°'+vbody[2]+', '+vbody[1]+'.pdf'); 
});


$(document).on("click",".process",function(){
	var id = $(this).attr('id').substr(1);
	var tabla = $("#data-table-productos").DataTable();
	tabla.destroy();
	var prod = arr('login',6,'',161,id,0,1,$("#listaproductos"));
	$("#data-table-productos").DataTable({
		bFilter: false,
        order : [],
        "bScrollInfinite": true
	});

	var tipo = arr('login',4,'',161,id,0,0,0)[0];
	$("#process").attr('idfactura',tipo[0][0]);
	$("#process").attr('tipo',tipo[0][7]);
	$("#nomproc").text(tipo[0][1]);
    $('.tooltipped').tooltip({delay: 50});
    $("#modal-process").modal('open');
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0');
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?')
			// $("[rm=1]").addClass('hide');
			// $("[rm=2]").removeClass('hide');
			// $("[rm=3]").addClass('hide');
            // $(".trVenta").removeClass('hide')
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0')
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?')
			// $("[rm=1]").removeClass('hide');
			// $("[rm=2]").removeClass('hide');
			// $("[rm=3]").addClass('hide');
   //          $(".trCompra").removeClass('hide');
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0');
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?')
			// $("[rm=1]").addClass('hide');
			// $("[rm=2]").addClass('hide');
			// $("[rm=3]").removeClass('hide');
            // $(".trCot").removeClass('hide')
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0');
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?');
			// $("[rm=1]").addClass('hide');
			// $("[rm=2]").addClass('hide');
			// $("[rm=3]").removeClass('hide');
   //          $(".trOCompra").removeClass('hide')
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0');
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?');
			// $("[rm=1]").addClass('hide');
			// $("[rm=2]").addClass('hide');
			// $("[rm=3]").removeClass('hide');
   //          $(".trPedido").removeClass('hide')
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
			paginate($("ul.pagination").attr('vtbl'),undefined,id+',0,@@impresa,0,0');
            $(".pagination").attr('filtro_sp',id+',0,@@impresa,^,?');
			// $("[rm=1]").addClass('hide');
			// $("[rm=2]").removeClass('hide');
			// $("[rm=3]").addClass('hide');
   //          $(".trTiquete").removeClass('hide')
			break;
	}
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
        enviarCorreo(3,str_correos,ntipo+" N° "+factura,vbody[0],archivos,1,vid,64);
        Materialize.toast('Correo Enviado',4000,'green');
    }
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	var tp = !$("#tps").is(":checked");
	window.open('facturacion?accion=6&id='+id+'&tp='+tp);
});

$(document).on("click",".xml",function(){
	window.location = "../wsdlClient.php?accion=2&id="+$(this).attr('id').substr(1);
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

    archivos = {0:'xml/Factura N°'+vfactura+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
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