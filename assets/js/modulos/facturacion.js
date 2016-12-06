$(document).ready(function(){
    param = parseInt(getParameterByName('tf'));

    $("#mfacturacion").html(mantenimiento('facturacion',param,''));
});