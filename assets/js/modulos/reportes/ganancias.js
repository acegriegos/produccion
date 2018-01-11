 var tipo = 1;

 $(function(){
    
    var param = getParameterByName('rep');
    

    var fecha = new Date();
    fecha=fecha.getFullYear()+'-'+(fecha.getMonth()+1)+'-'+fecha.getDate();

    switch(param){
        case 'gananciasdtf':
        /*Ganancias detalladas por facturas desglosada por productos*/
        tipo = 1;
        break;
        case 'gananciasdxp':
          /* Ganancias detalladas por productos  
          */
          tipo = 2;
          break;
          
          case 'gananciaspf':
          /* Ganancias detalladas por productos      */
          tipo = 3;
          
          break;
          
          
          
          case 'pedidos':
          tipo = 5; 
          default:
          break;
          
          

      }

      arr('login',6,'',307,''+tipo+',0,0,0,"'+fecha+'","",0,0,0',0,1,$(".detrep"));

  });
 

 
