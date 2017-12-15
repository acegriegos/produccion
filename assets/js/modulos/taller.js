$(document).ready(function(){

    $(".menu").click(function(){
    	var id = $(this).attr('id').substr(1);
    	$(".menu").removeClass('active');
    	$(this).addClass('active');
    	switch(parseInt(id)) {
    		case 1:
    			var p = mantenimiento('taller', 1, '');
				$("#mtaller").html(p);
    			break;
    		case 2:

    			break;
    		case 3:

    			break;
    	}
    });
    $("#t1").click();
});

$(document).on("keydown","#nclie",function(e){
	var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
            $("#nclie").autocomplete({
                limit: 10,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 10',0,0,0,1)
            });
        $("#nclie").siblings($(".autocomplete-content")).css('width','25%');
    } 
});