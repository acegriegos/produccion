$(function(){

	var tf = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
	switch(tf) {
			case 1:
				$("[rm=1]").addClass('hide');
				$("[rm=2]").removeClass('hide');
				break;
			case 2:
				$("[rm=1]").removeClass('hide');
				$("[rm=2]").removeClass('hide');
				break;
			case 3:
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
			case 4:
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
			case 5:
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
	}

	$("#data-table-facturas").dataTable({
		bFilter: false,
		order : [],
		"bLengthChange": false
	});

	$("input[name=tventa]").change(function(){
		var id = parseInt($(this).attr('id').substr(2));
		switch(id) {
			case 1:
				var tabla = $("#data-table-facturas").DataTable();
				tabla.destroy();
				arr('login',6,'',158,'0,'+id+',0',0,1,$("#listafacturas"));
				$("#data-table-facturas").DataTable({
					bFilter :  false,
		            bLengthChange : false,
		            order : []
				});
				$("[rm=1]").addClass('hide');
				$("[rm=2]").removeClass('hide');
				break;
			case 2:
				var tabla = $("#data-table-facturas").DataTable();
				tabla.destroy();
				arr('login',6,'',158,'0,'+id+',0',0,1,$("#listafacturas"));
				$("#data-table-facturas").DataTable({
					bFilter :  false,
		            bLengthChange : false,
		            order : []
				});
				$("[rm=1]").removeClass('hide');
				$("[rm=2]").removeClass('hide');
				break;
			case 3:
				var tabla = $("#data-table-facturas").DataTable();
				tabla.destroy();
				arr('login',6,'',158,'0,'+id+',0',0,1,$("#listafacturas"));
				$("#data-table-facturas").DataTable({
					bFilter :  false,
		            bLengthChange : false,
		            order : []
				});
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
			case 4:
				var tabla = $("#data-table-facturas").DataTable();
				tabla.destroy();
				arr('login',6,'',158,'0,'+id+',0',0,1,$("#listafacturas"));
				$("#data-table-facturas").DataTable({
					bFilter :  false,
		            bLengthChange : false,
		            order : []
				});
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
			case 5:
				var tabla = $("#data-table-facturas").DataTable();
				tabla.destroy();
				arr('login',6,'',158,'0,'+id+',0',0,1,$("#listafacturas"));
				$("#data-table-facturas").DataTable({
					bFilter :  false,
		            bLengthChange : false,
		            order : []
				});
				$("[rm=1]").addClass('hide');
				$("[rm=2]").addClass('hide');
				break;
		}
	});
});

$(document).on("click",".print",function(){
	var id = $(this).attr('id').substr(1);
	var tv = $(this).attr('tv');
	var tp = $(this).attr('tp');
	window.open('facturacion?accion='+tv+'&id='+id+'&tp='+tp)
});