$(document).ready(function(){

    if(typeof(EventSource) !== "undefined") {
        var source = new EventSource("../sse.php");
        source.onmessage = function(event) {
            Materialize.toast(event.data,4000,"green");
        };
    } else {
        Materialize.toast("Sorry, your browser does not support server-sent events...",4000,"red");
    }
    
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
                window.open('produccion','_self');
            }
        }
    });
    
     
});//end
