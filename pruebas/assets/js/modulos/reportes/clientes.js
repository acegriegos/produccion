var tipo = 0;


$(function(){
    var param = getParameterByName('rep');
    switch(param){
        case 'proveedores':
        tipo = 1;
       default:
        break;
         }

    var fecha = new Date()

    $("#xfec").click()
    $("#vdesde").val(fecha.getFullYear()+'-01-01')
    $("#vhasta").val(fecha.getFullYear()+'-12-31')

    $(".excel").data('parametros')['vista'] = '2,1,3,4,5,8,9,11';
    $(".excel").data('parametros')['conteo'] = 1;
    $(".excel").data('parametros')['suma'] = '';
    $(".excel").data('parametros')['original'] = 1;
    arr('login',6,'',181,'@@impresa,'+tipo+',"'+$("#vdesde").val()+'","'+$("#vhasta").val()+'","",""',0,1,$(".detrep"));
    $("#vbisproveedor").val(tipo)

    });