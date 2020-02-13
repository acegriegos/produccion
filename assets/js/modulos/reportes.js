$(function(){

    if (!$(".per2000").length)
        $(".basic").addClass('hide')

    /*if ($(".per15.hide").length)
        $("#conta").parent().addClass('hide')*/

	$(".report").click(function(){
        var tf = $(this).attr('tf') == undefined ? '' : '&tf='+$(this).attr('tf')
		window.open('reportes?accion=1&rep='+$(this).attr('rep')+tf);
	});
});