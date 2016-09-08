$(document).ready(function(){
    
function validar (varreglo) {
	var salida = {}

	/*VALIDACION FRONT END Y SI SE PUEDE AJAX*/

	for (var i = 0; i < varreglo.length; i++) {
		salida[varreglo[i]] = 2;
	};

	return salida;

}

    $("#mobile_nav").click(function(){
    //toggles nav and ensures other elements play nice too
        if($("#primary_nav").css('left') < "0px"){
            $("#primary_nav").animate({left: "0px"}, 200);
            $("#wrapper_main_content").animate({left: "150px"}, 200);
            $("#wrapper_main_content").css("overflow-y","hidden");
            $("body").css("overflow-x","hidden");
            $("#primary_nav").css("overflow-y","hidden");
        }else{
            $("#primary_nav").animate({left: "-115px"}, 200);
            $("#wrapper_main_content").animate({left: "0px"}, 200);
            $("#wrapper_main_content").css("overflow-y","hidden");
            $("body").css("overflow-x","hidden");   
        }

    });

    $(".display").click(function(){
        var display = $(".display").attr('value');
        // alert(display)

        if (display == 0) {
            $("#menut").show();
            $("#menuu").show();
            $(".display").attr('value',1);
        } else if (display == 1) {
            $("#menut").hide();
            $("#menuu").hide();
            $(".display").attr('value',0);
        }
    });
     
});//end