$(function(){

     $('.chips-initial').material_chip({
        data: getCorreos(),
     });

     $(".chips .input").css("color","white")

     Materialize.updateTextFields();

     $('#lcorreos').click(function(){
        $(this).prop('disabled','disabled');
        mostrar_cargar();
         var para = $('.chips-initial').material_chip('data');
         $("#listcorreos").html("");
         var vbody = $(".hoja").html();
         var vpara=""
         for (var i = 0; i < para.length; i++) {
            vpara += para[i].tag+',';
         }
        vpara=vpara.substring(0,vpara.length -1)
         var e = enviarCorreo(1,vpara,"Factura",vbody,'');
         
     });

});

function getCorreos(){
    var salida = "[";
    var p= getDatos("correo",17,"idcorreo>0 and idtabla=2 and idfila="+$('#vid').val(),0,0,0)[0];

    for (var i = 0; i < p.length; i++) {
        salida+='{"tag":"'+p[i][0]+'"},';
    }

    if (p.length > 0) {
        return JSON.parse(salida.substring(0,salida.length -1)+"]");
    }else
        return '';

    
}
