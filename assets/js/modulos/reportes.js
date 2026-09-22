$(function(){

    if (!$(".per12").length)
        $(".basic").addClass('hide')

    if ($(".per26.hide").length || !$(".per26").length)
        $("#conta").parent().addClass('hide')

	$(".report").click(function(){
        var tf = $(this).attr('tf') == undefined ? '' : '&tf='+$(this).attr('tf')
		window.open('reportes?accion=1&rep='+$(this).attr('rep')+tf);
	});

	permisos(1501,1530);
});