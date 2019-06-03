$(function(){
    var param = getParameterByName('tf');

    switch(param){
        case 'asientos':
            var orden = '3,4,5,6';
            var suma = '';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            $("#tit").html('Asientos');
            arr('login',6,'',271,'"","",@@impresa,0,0',0,1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#vtrep").val(0)
            break;
       
       case 'estadoresultados':
            var orden = '2,3';
            var suma = '';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            arr('login',6,'',271,'"","",@@impresa,1,0',0,1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#tit").html('Estado Resultado');
            $("#vtrep").val(1)
            break;
      default:
            break;
       
        

    }
});