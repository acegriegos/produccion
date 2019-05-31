$(function(){
    var param = getParameterByName('tp');
    param = param == undefined ? 0 : param;
    console.log(param)
    switch(parseInt(param)){
        case 1:
            $("#titrep").html('Estado de Cuenta por Pagar');
            arr('login',6,'',269,'0,0,1,@@impresa',0,1,$(".detrep"));
            $("#visproveedor").val(1);
            $(".principal .filtros").attr('bisprov',1);
            break;
        case 2:
            $("#titrep").html('Estado de Cuenta Histórico por Cobrar');
            // arr('login',6,'',269,'0,1,0,@@impresa',0,1,$(".detrep"));
            $("#vishistorico").val(1);
            break;
        case 3:
            $("#titrep").html('Estado de Cuenta Histórico por Pagar');
            // arr('login',6,'',269,'0,1,1,@@impresa',0,1,$(".detrep"));
            $("#visproveedor").val(1);
            $(".principal .filtros").attr('bisprov',1);
            $("#vishistorico").val(1);
            break;
        default:
            $("#titrep").html('Estado de Cuenta por Cobrar');
            arr('login',6,'',269,'0,0,0,@@impresa',0,1,$(".detrep"));
            break;
    }
    
});