var vpara = vbody = "";
var mid = 0;

$(function(){
     $('.chips-initial').material_chip({
        data: getCorreos(),
     });

     $(".chips .input").css("color","white");

     Materialize.updateTextFields();

     $('#lcorreos').click(function(){
        $(this).prop('disabled','disabled');
        mostrar_cargar();
         var para = $('.chips-initial').material_chip('data');
         $("#listcorreos").html("");
         vbody = generarhoja();
  
         for (var i = 0; i < para.length; i++) {
            vpara += para[i].tag+',';
         }
         vpara=vpara.substring(0,vpara.length -1);
         mid = getParameterByName('id');

         var f = mantenimiento_async('login',8,{arch:'recibo-notas-pagos',id:mid,mic:1,tit:'Factura',sel:'',tbl:186,where:mid},1);


         $('.chips-initial').material_chip();
         $(".chips .input").css("color","white");
     });

});

function postExcecute(vid,p){
    switch(parseInt(vid)){
        case 1:
            var e = enviarCorreo(3,vpara,"Recibo",vbody,'pdf/Factura '+mid+'.pdf',0,0,0);
            vpara = vbody = "";
            mid = 0;
            break;
        default:
            break;
    }
}

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