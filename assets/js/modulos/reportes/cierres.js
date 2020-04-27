$(function(){
	var fecha = new Date();
	$("#vidtipo1").val(fecha.getFullYear()+'-'+("0"+(fecha.getMonth()+1)).slice(-2))
	$("#chktipo1").click();

	var orden = '0,1';
	var suma = '';
	var conteo = 1;

	$(".excel").data('parametros')['vista'] = orden;
    $(".excel").data('parametros')['conteo'] = conteo;
    $(".excel").data('parametros')['suma'] = suma;

	doreport()
})