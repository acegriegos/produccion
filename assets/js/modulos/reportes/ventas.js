var tipo = 1;

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
            default:
            break;
       
        

    }

	arr('login',6,'',167,'0,'+tipo+',@@impresa,0,0,0,0,"1990-01-01","1990-01-01",0,0',0,1,$(".detrep"));
});