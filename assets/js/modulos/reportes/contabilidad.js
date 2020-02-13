$(function(){
    var param = getParameterByName('tf');

    switch(param){
        case 'asientos':
            var orden = '3,4,5,6';
            var suma = ',5,6,';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            $(".excel").data('parametros')['suma'] = suma;
            $("#titrep").html('Asientos');
            arr('login',6,'',271,'"","",@@impresa,0,0',0,1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));;
            $("#vtrep").val(0);
             $(".principal .filtros").removeAttr('chg');
            break;
       
       case 'estadoresultados':
            var orden = '2,3';
            var suma = '';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            arr('login',6,'',271,'"","",@@impresa,1,0','271_1',1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#titrep").html('Estado Resultado');
            $("#vtrep").val(1)
            break;
         case 'balancegeneral':
            var orden = '2,3';
            var suma = '';
            var conteo = 1;

            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            arr('login',6,'',271,'"","",@@impresa,2,0','271_1',1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#titrep").html('Balance General');
            $("#vtrep").val(2)
            break;
        case 'balancecomprobacion':
            var orden = '0,1,2,3,4,5,6';
            var suma = ',2,3,4,5,6,';
            var conteo = 1;

            $(".excel").data('parametros')['suma'] = suma;
            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            arr('login',6,'',271,'"","",@@impresa,3,0','271_1',1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#titrep").html('Balance Comprobación de Saldos');
            $("#vtrep").val(3)
            $("#hiddens").append('<input type="hidden" id="vdesde" value=""> <input type="hidden" id="vhasta" value="">')
            $(".repcheck[checked]").change();

            $("#vidtipo1").change(function(){
                $("#vdesde").val($(this).val()+'-01');
                doreport()
            })
            break;
        case 'catalogo':
            var orden = '0,1';
            var suma = '';
            var conteo = 1;
            $(".excel").data('parametros')['vista'] = orden;
            $(".excel").data('parametros')['conteo'] = conteo;
            arr('login',6,'',271,'"","",@@impresa,4,0,1',0,1,$(".detrep"),0,Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma)));
            $("#titrep").html('Catalogo de Cuentas');
            $("#vtrep").val(4);
            $("[for=xfec]").addClass('hide')
            break;
      default:
            break;

    }
});