var tipo = '1,7,10,106';
var param;

$(function(){
    param = getParameterByName('rep');
    var ajax = 167;

    $(".excel").data('parametros')['vista'] = '0,1,2,3,4,5,8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36';
    $(".excel").data('parametros')['conteo'] = 1;
    $(".excel").data('parametros')['suma'] = ',8,10,13,14,15,16,17,18,19,20,21,22,23,12,24,25,26,27,28,29,30,31,32,33,34,35,40,36,';
    $(".excel").data('parametros')['original'] = 1;
    switch(param){
        case 'compras':
            tipo = 2;
            break;
       
       case 'ordencompra':
            tipo = 3;
              ajax = 168;
            break;

      case 'cotizaciones':
            tipo = 4;
            ajax = 168;
            break;

      case 'pedidos':
            tipo = 5; 
            break;

      default:
            var per = getDatos('',246,'@@usr,1110,1110');

            if(per[0].length)
                if(per[0][0][3] == '1'){
                    $("#vidtipo3").append('<option value="8">Especial</option>');
                    $("#vidtipo3").material_select('update')
                }

            break;
    }
  
  arr('login',6,'',167,'0,"'+tipo+'",@@impresa,0,0,1,"","",0,0,"",0',0,1,$(".detrep"));

});