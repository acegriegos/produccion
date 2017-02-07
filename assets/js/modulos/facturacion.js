$(document).ready(function(){
  param = parseInt(getParameterByName('tf'));

  $("#mfacturacion").html(mantenimiento('facturacion',param,''));
  mantenimiento('facturacion',param,'');

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
     close: 'Cerrar'
 });

    //function
    $("#cleanspace").click(function(){
     $("#codp").val('');
     $("#descp").val('');
     $("#precp").val(0.00);
     $("#cantp").val(1);
     $("#precp").val(0.00);
     $("#cantI").text(0);
 });

});
