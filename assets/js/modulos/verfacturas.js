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

});

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
	}
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	var tv = $(this).attr('tv');
	var tp = $(this).attr('tp');
	console.log('facturacion?accion='+tv+'&id='+id+'&tp='+tp);
	window.open('facturacion?accion='+tv+'&id='+id+'&tp='+tp);
});
$(document).on("click",".mdi-format-page-break",function(){
	var id = $(this).attr('id').substr(1);
	var tv = 6;
	var tp = 'true';//$(this).attr('tp');

	window.open('facturacion?accion='+tv+'&id='+id+'&tp='+tp+'&x=1');
});