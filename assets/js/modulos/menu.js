// var source;

$(document).ready(function(){

    // if(typeof(EventSource) !== "undefined") {
    //     source = new EventSource("../sse.php");
    //     source.onmessage = function(event) {
    //         var data=JSON.parse(event.data);
    //         if(data['data'] != '')
    //             Materialize.toast('<a href="notificaciones" class="white-text">'+data["data"]+'</a>',4000,"green");
    //         $("#newnot").html(data['cantidad']);
    //     };
    // } else {
    //     Materialize.toast("Sorry, your browser does not support server-sent events...",4000,"red");
    // }

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'left', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
    });

    $("#lgt").change(function(){
        switch(parseInt($(this).val())){
            case 1:
                window.open("informacion","_self");
                break;
            case 2: 
                window.open("notificaciones","_self");
                break;
            default:
                window.open("cierres","_self");
                break;
        }
        
    });

    $("#numtrans").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            var numtrans = $(this).val();
            if (numtrans == 1) {
                window.open('produccion','_self');
            }
        }
    });
    
     
});//end
