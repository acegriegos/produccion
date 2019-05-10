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
  $(".excel").data('parametros')['vista'] = '1,4,5,7,38,37,33,15,14,12,11,13';
  $(".excel").data('parametros')['conteo'] = 1;
  $(".excel").data('parametros')['suma'] = ',11,12,13,14,15,';
	arr('login',6,'',167,'0,"'+tipo+'",@@impresa,0,0,0,0,curdate(),"",0,0',0,1,$(".detrep"));
});