$(function(){
	$(".report").click(function(){
        var tf = $(this).attr('tf') == undefined ? '' : '&tf='+$(this).attr('tf')
		window.open('reportes?accion=1&rep='+$(this).attr('rep')+tf);
	});
});