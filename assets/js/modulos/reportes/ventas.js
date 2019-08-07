var tipo = '1,7,10';
var param;

$(function(){
    param = getParameterByName('rep');
    var ajax = 167;

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
            break;
    }
  $(".excel").data('parametros')['vista'] = '0,26,1,2,12,3,6,4,24,5,25,29,7,8,27,28,11,9,16,17,18,19,20,21,22,30';
  $(".excel").data('parametros')['conteo'] = 1;
  $(".excel").data('parametros')['suma'] = ',3,4,5,6,7,8,16,17,18,19,20,21,22,24,25,27,28,29,30,';
  $(".excel").data('parametros')['original'] = 1;
  arr('login',6,'',167,'0,"'+tipo+'",@@impresa,0,0,1,"","",0,0,0',0,1,$(".detrep"));

});