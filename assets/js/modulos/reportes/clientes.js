var tipo = 0;


$(function(){
    var param = getParameterByName('rep');
    switch(param){
        case 'proveedores':
        tipo = 1;
       default:
        break;
         }

        arr('login',6,'',181,'0,'+tipo+',0,0,0,""',0,1,$(".detrep"));

    });
 

 