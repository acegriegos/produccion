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
    var inicial = $("#ncli");
    switch(param){
        case 2:
            inicial = $("#vreferencia");
            cargarCompras();
            break;
        default:
            cargarVentas();
            break;
    }

    $(".trsec:hidden").remove();
    cargarGlobal();

    if (asoc == '') {
        setTimeout(function(){inicial.focus();},300);
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

function cargarCompras(){
    $("#titfact").html("COMPRAS");
    $("#reference").removeClass('hide');
    $("#chg_tipo").attr('disabled',false);
    $("#vplazo").attr('disabled',false);
    $("#precp").attr('readonly',false);
    $(".trCompra").removeClass('hide');

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
            });

        }
    });

    $("#vreferencia").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13)
            $("#vfecha").focus();
    });

    $(".sclie").blur(function(){
        searchClient($(this).val(),1);
    });

    $(document).on("click",".chinv",function(){
        var id = $(this).attr('id').substr(3);
        var inv = $("#fd"+id).data('triforce')['vidinventario'];
        var bod = arr('login',4,'idbodega',111,'id = '+inv,0,0,0)[0][0];
        $("#xidbodega").val(bod);
        $("#xidbodega").material_select();
        $("#xidbodega").change();
        $("#xidinventario").val(inv);
        $("#xidinventario").material_select();
        $("#fd"+id).data('triforce')['vidinventario'] = inv;
    });

    $(document).on("change",".chkivi",function(){
        var id = $(this).attr('id').substr(4);
        if ($(this).is(":checked")) {
            $("#ivi"+id).val(arr('login',4,'',200,'64,0',0,0,0)[0][0][3]);
            $("#ivi"+id).prop('disabled',false);
        }else{
            $("#ivi"+id).val(0);
            $("#ivi"+id).prop('disabled',true);
        }

        totalizar();
    });

    $("#vplazo").keyup(function(e){
        var code = e.which || e.keyCode
        if(code == 13){
            $(this).blur();
        }
    });

    $("#vplazo").blur(function(){
        doplazo($(this).val());
        $("#ncli").focus();
    });

}


function cargarVentas(){
    $("#titfact").html("VENTAS");
    $(".trVenta").removeClass('hide');

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
            });

        }
    });

    $(".sclie").blur(function(){
        searchClient($(this).val(),0);
    });
}

function cargarGlobal(){
    var cons = param-1 == 0 ? '' : param-1;
    var ncons = getDatos('lpad(consecutivo'+cons+'+1,6,0)',39,'id = @@impresa',0,0)[0][0];
    $("#idfact").html(ncons);

    var fecha = new Date();
    var dpick = $('#vfecha').pickadate()
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
    dpick.pickadate('picker').on({close: function() {
        if($(".con").is(":visible")){
            $(".con .select-wrapper .select-dropdown").click();
            $(".con .select-wrapper .select-dropdown").addClass('active');
            $(".con .select-wrapper .select-dropdown").focus();
            $(".con .select-wrapper .select-dropdown").first('li').addClass('selected');
        }else{
            $("#vplazo").focus().select();
        }
        $("#vfecha").blur();
    } });

    $("#vidtipopago").change(function(){
        setTimeout(function(){$("#ncli").focus();},300)
    });

    $("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
       
        if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+$("#descp").val()+'",1',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $("#chg_tipo").change(function(){
        var value = parseInt($(this).attr('val'))

        if (value == 2) {
            $(".cre").hide();
            $(".con").show();
            $("#vplazo").val(0);
            $(this).attr('val',1)
            $(".zelda").data('triforce')['vidtipo'] = 1
        }else{
            $(".con").hide();
            $(".cre").show();
            if ($(".zelda").data('triforce')['vidcliente'] != 0) {
                var plazo = arr('login',4,'plazo',2,'id = '+$(".zelda").data('triforce')['vidcliente'],'',0,'')[0][0][0];
                $("#vplazo").val(plazo);
            }
            $(".zelda").data('triforce')['vidtipo'] = 2
            $(this).attr('val',2)
        }
    });
}

function doplazo(vval){
    if(isNaN(vval)){
        Materialize.toast('Plazo no Válido',4000,'red');
        $("#vplazo").select().focus();
        return false;
    }
    return true;
}