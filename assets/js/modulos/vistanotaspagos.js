$(function(){
	var tf = param = getParameterByName('tf');
	$('#tf'+tf).click();

	config = getDatos('',42,'@@impresa',0,0)[0][0];

	arr('login',6,'',187,'0,0,"'+tf+',@@impresa","0,10"',0,1,$("#listafacturas"));
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
	$(".pagination").attr('filtro_sp',tf+',@@impresa')
	paginate($("ul.pagination").attr('vtbl'),undefined,tf+',@@impresa');
});

$(document).on("change","input[name=tventa]",function(){
	var id = parseInt($(this).attr('id').substr(2));
	$("#search_facturas").val('').attr('filtro',1);
	$("[fltr=1]").click();
	Materialize.updateTextFields();

	var tabla = $("#data-table-facturas").DataTable();
	tabla.destroy();
	arr('login',6,'',187,'0,0,"'+id+',@@impresa","0,10"',0,1,$("#listafacturas"));
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
	
});