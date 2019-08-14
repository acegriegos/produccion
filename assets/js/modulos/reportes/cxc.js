$(function(){
    var param = getParameterByName('tp');
    param = param == undefined ? 0 : param;
    $(".pdf").removeClass('hide');
    $(".pdf").attr('tbl',269);
    $(".pdf").attr('arch','cxc');

    switch(parseInt(param)){
        case 1:
            $("#titrep").html('Estado de Cuenta por Pagar');
            arr('login',6,'',269,'0,0,1,@@impresa',0,1,$(".detrep"));
            $("#visproveedor").val(1);
            $(".principal .filtros").attr('bisprov',1);
            $(".pdf").attr('whr','0,0,1,@@impresa');
            break;
        case 2:
            $("#titrep").html('Estado de Cuenta Histórico por Cobrar');
            // arr('login',6,'',269,'0,1,0,@@impresa',0,1,$(".detrep"));
            $("#vishistorico").val(1);
            $(".pdf").attr('whr','0,0,0,@@impresa');
            break;
        case 3:
            $("#titrep").html('Estado de Cuenta Histórico por Pagar');
            // arr('login',6,'',269,'0,1,1,@@impresa',0,1,$(".detrep"));
            $("#visproveedor").val(1);
            $(".principal .filtros").attr('bisprov',1);
            $("#vishistorico").val(1);
            $(".pdf").attr('whr','0,0,1,@@impresa');
            break;
        default:
            $("#titrep").html('Estado de Cuenta por Cobrar');
            arr('login',6,'',269,'0,0,0,@@impresa',0,1,$(".detrep"));
            $(".pdf").attr('whr','0,0,0,@@impresa');
            break;
    }

    $(".excel").data('parametros')['vista'] = '0,1,2,3,4,5,6,7';
    $(".excel").data('parametros')['conteo'] = 1;
    $(".excel").data('parametros')['suma'] = ',2,3,4,5,6,';
    //$(".excel").data('parametros')['original'] = 1;
    
});