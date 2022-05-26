var vpara = vbody = "";
var mid = 0;

$(function(){

     var fullmode = getParameterByName('fullmode');
     if(fullmode){
        $(".hideonprint").hide()
        $(".fac").removeClass('m9 l9')
     }

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
  
         for (var i = 0; i < para.length; i++) {
            vpara += para[i].tag+',';
         }
         vpara=vpara.substring(0,vpara.length -1);
         mid = getParameterByName('id');

        var archivos = '';
        var tipo = $("#fact").html();
        mantenimiento('login',8,{arch:'recibo',id:mid,mic:1,tit:tipo+' Electrónica',sel:'',tbl:72,where:mid},1);
        var vfactura = $("#numfact").html().trim();
        vbody = getDatos('',73,mid,0,0)[0][0];
        var vsucursal = vbody[1];

        if (vfactura == mid)
            archivos = 'pdf/'+tipo+' No'+vfactura+', '+vsucursal+'.pdf';
        else{
            archivos = {0:'xml/'+tipo+' No'+vfactura+', '+vsucursal+'.xml',1:'pdf/'+tipo+' No'+vfactura+', '+vsucursal+'.pdf'}
            mantenimiento('login',9,{id:mid,factura:vfactura,sucursal:vsucursal,restado:tipo},1);
        }
        
        var envio = enviarCorreo(3,vpara,tipo+" N° "+vfactura,vbody[0],archivos,1,mid,64);
        vpara = vbody = "";
        mid = 0;

        $('.chips-initial').material_chip();
        $(".chips .input").css("color","white");
     });

});

function postExcecute(vid,p){
    switch(parseInt(vid)){
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