$(function(){
    var orden = '0,1,2,3,4,5';
    var conteo = 1;
    var suma = ',3,4,5,';

    arr('login',6,'',342,'"","",0,0',271,1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));

    $(".excel").data('parametros')['vista'] = orden;
    $(".excel").data('parametros')['conteo'] = conteo;
    $(".excel").data('parametros')['suma'] = suma;

    $("#xfec").click();
    var fecha  = new Date();
    fecha.setDate(fecha.getDate()+(1-fecha.getDay()))
    $("#vdesde").val(fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+(fecha.getDate()+'').padStart(2,0));
    fecha = new Date();
    fecha.setDate(fecha.getDate()+(8-fecha.getDay()))
    $("#vhasta").val(fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+(fecha.getDate()+'').padStart(2,0));
    
});