$(document).ready(function(){
    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    $("#lgt").change(function(){
        if ($(this).val() == 1) {
            window.open("logout","_self");
        }
        
    });

    $("#numtrans").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            var numtrans = $(this).val();
            if (numtrans == 1) {
                window.open('facturacion?tf=2','_self');
            }
        }
    });
    
    // //PONER EN F11
    // $("#mobile_nav").click(function(){
    // //toggles nav and ensures other elements play nice too
    //     if($("#primary_nav").css('left') < "0px"){
    //         $("#primary_nav").animate({left: "0px"}, 200);
    //         $("#wrapper_main_content").animate({left: "150px"}, 200);
    //         $("#wrapper_main_content").css("overflow-y","hidden");
    //         $("body").css("overflow-x","hidden");
    //         $("#primary_nav").css("overflow-y","hidden");
    //     }else{
    //         $("#primary_nav").animate({left: "-115px"}, 200);
    //         $("#wrapper_main_content").animate({left: "0px"}, 200);
    //         $("#wrapper_main_content").css("overflow-y","hidden");
    //         $("body").css("overflow-x","hidden");   
    //     }

    // });

    // $(".display").click(function(){
    //     var display = $(".display").attr('value');
    //     // alert(display)

    //     if (display == 0) {
    //         $("#menut").show();
    //         $("#menuu").show();
    //         $(".display").attr('value',1);
    //     } else if (display == 1) {
    //         $("#menut").hide();
    //         $("#menuu").hide();
    //         $(".display").attr('value',0);
    //     }
    // });
     
});//end

// function validar (varreglo) {
//     var salida = {}

//     /*VALIDACION FRONT END Y SI SE PUEDE AJAX*/

//     for (var i = 0; i < varreglo.length; i++) {
//         salida[varreglo[i]] = 2;
//     };

//     return salida;

// }