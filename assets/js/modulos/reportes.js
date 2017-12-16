$(function(){
	$(".report").click(function(){
		window.open('reportes?accion=1&rep='+$(this).attr('rep'));
	});
});