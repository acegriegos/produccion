 var tipo = 1;

 $(function(){
    var param = getParameterByName('rep');
    

    $("#bus").click(function(){
      var desde = hasta = "";
     
      if ($("#desde").val() != '') {
        desde= $("#desde").val();
        hasta= $("#hasta").val();

      }
       arr('login', 6, "" , 307, '2,0,0,0,"'+ desde +'","'+ hasta +'",0,0,0',0,1,$(".detrep"));
    });

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
          /* Ganancias detalladas por factura  */
          tipo = 3;
          
          break;
          
          
          
          case 'pedidos':
          tipo = 5; 
          default:
          break;
          
          

      }

      arr('login',6,'',307,''+tipo+',0,0,0,"'+fecha+'","",0,0,0',0,1,$(".detrep"));


          $('.datepicker').pickadate({
               labelMonthNext: 'Siguiente',
               labelMonthPrev: 'Anterior',
               labelMonthSelect: 'Seleccione un Mes',
               labelYearSelect: 'Seleccione un Año',
               monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre' ],
               monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
               weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
               weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
               weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
               today: 'Hoy',
               clear: 'Limpiar',
               close: 'Cerrar',
               format: 'yyyy-dd-mm',
               selectMonths: true,
               selectYears: 10
          });

          var fecha = new Date();
          var dpick = $('#desde').pickadate()
          dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

          dpick = $('#hasta').pickadate()
          dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

          $('select').material_select();

          $("#data-table-Notas").DataTable({
            bFilter: false,
            order : [],
            "bLengthChange": false
          });
  
  });

 
