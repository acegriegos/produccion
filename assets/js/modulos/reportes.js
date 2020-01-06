$(function(){

    if ($(".per15.hide").length == 0)
        $("[rep='contabilidad']").parent().removeClass('hide')

	$(".report").click(function(){
        var tf = $(this).attr('tf') == undefined ? '' : '&tf='+$(this).attr('tf')
		window.open('reportes?accion=1&rep='+$(this).attr('rep')+tf);
	});
});