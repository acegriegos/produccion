var param = '';
$(document).ready(function(){
  param = parseInt(getParameterByName('tf'));

  $("#mfacturacion").html(mantenimiento('facturacion',1,''));

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

    var asoc = getParameterByName('arr');

    switch(param){
        case 2:
            $("#titfact").html("COMPRAS");
            break;
        default:
            $("#titfact").html("VENTAS");
            break;
    }

    if (asoc == '') {
        setTimeout(function(){$("#ncli").focus();},300);
         $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vextrapagos : 0,vdivisa : 0, saldo : 0, notific : 0});
    }else{
        var vidp = getParameterByName('id');
        var vfacturap = arr('login',6,'',163,vidp+',\"'+asoc+'\"',0,1,$("#fdetallefacturas"));
        var vfacturap2 = arr('login',4,'',163,vidp+',\"'+asoc+'\"',0,0,0);
        var vf = vfacturap2[0][0];

         $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:1, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:vf[2], vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vextrapagos : 0,vdivisa : 0, saldo : 0, notific : 0});

        var line = 0;
        var fimv = vfacturap2[0];
        $("#fdetallefacturas tr").each(function(){
            var id = $(this).attr('id').substr(2);
            var p = $('#h_'+id).attr('idprod');
            var c = parseFloat($('#h_'+id).attr('cant'));
            var r = parseFloat($('#h_'+id).attr('prec'));
            var i = $('#h_'+id).attr('inv');
            var h = $('#h_'+id).attr('hdesc');
            var m = $('#h_'+id).attr('hdescm');
            var t = r * c;
            
            for (var i = 0; i < fimv.length; i++) {
                var exo = fimv[i][9]*(1-(fimv[i][12]/100));
                if($("#imp_"+fimv[i][8]).length == 0){
                    var clip = 0;
                    if(fimv[i][11] != 0) clip = 'vclipd="'+fimv[i][3]+'"';

                    var sm = $(".moneda").first().data("triforce")['simbolo'];

                    $("#sh_imp").append('<tr id="imp_'+fimv[i][8]+'" '+clip+'><td>'+fimv[i][10]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span class="moneda"><b>'+sm+'</b></span><span id="imv_'+fimv[i][8]+'" type="html" class="divisa">0.00</span></td></tr>');
                    $("#imv_"+fimv[i][8]).data('incl',fimv[i][3]+",");
                }else{
                    var incl = $("#imv_"+fimv[i][8]).data('incl');
                    $("#imv_"+fimv[i][8]).data('incl',incl+fimv[i][3]+",");
                }
                $("#imv_"+fimv[i][8]).data({'imv':fimv[i][9]})
            }
            
            $(this).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:p, vcantidad:c, vprecio:r, hdesc:h,hdescm:m, vtotal:t, vidinventario:i,vidodt : 0,vcomodin:''});
            // $("#descu"+id).data('valor',0);
            $("#vdesc"+id).data({'valor':h,'max':m})
            line += 1;
            $('#h_'+id).remove();
        });
        $("#ncli").val(vf[1]);
        $("#ncli").prop('readonly',true);
        $(".zelda").data('triforce')['idline'] = line;
        Materialize.updateTextFields();
        totalizar();
    }

});
