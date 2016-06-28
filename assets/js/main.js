$(function(){

    $(".chmoneda").click(function(){
        
        $.ajax({
            async: true,
            url: '../miscelaneo/moneda.php',
            type: 'POST',
            data: {accion : 2, moneda : $(this).attr("id"), valor : $("#m"+$(this).attr("id")).val()}
            })
            .done(function(data) {
            });
    });

    $(document).on("mouseover",".ico",function(){
        var id = $(this).attr('icono').substr(1);
        $("#ico"+id).css("margin-top","0px");
    });

    $(document).on("mouseout",".ico",function(){
        var id = $(this).attr('icono').substr(1);
        $("#ico"+id).css("margin-top","-22px");
    });

    permisos(1,50)
});

function mantMoneda(x1){
    var p;
    $.ajax({
            async: false,
            url: '../miscelaneo/moneda.php',
            type: 'POST',
            data: {accion : 1, moneda : x1}
            })
            .done(function(data) {
                p = JSON.parse(data);
            });
    return p;
}

