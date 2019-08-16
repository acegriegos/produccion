var tipo = '1,7';

$(function(){
    var param = getParameterByName('rep');
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
  $(".excel").data('parametros')['vista'] = '0,1,2,3,4,5,6,7,8,9,10';
  $(".excel").data('parametros')['conteo'] = 1;
  $(".excel").data('parametros')['suma'] = ',4,5,6,7,8,';
  $(".excel").data('parametros')['original'] = 1;
	arr('login',6,'',167,'0,"'+tipo+'",@@impresa,0,0,0,0,curdate(),"",0,0,1',0,1,$(".detrep"));
});