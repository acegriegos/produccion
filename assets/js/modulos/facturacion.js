var param = '';

$(document).ready(function(){
  param = getParameterByName('tf');
  param = param == '' ? 1 : parseInt(param) ;

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
     $("#descup").val(0);
     $("#cantI").text(0);
 });

    var asoc = getParameterByName('arr');

    var inicial = $("#ncli");
    switch(param){
        case 2:
            inicial = $("#vreferencia");
            cargarCompras();
            break;
        case 3:
            cargarOCompras();
            break;
        case 4:
            cargarVentas();
            cargarResembled('COTIZACIONES');
            break;
        case 5:
            cargarVentas();
            cargarResembled('PEDIDOS');
            break;
        default:
            cargarVentas();
            break;
    }

    cargarGlobal();

    if (asoc == '') {
        setTimeout(function(){inicial.focus();},300);
         $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vextrapagos : 0,vdivisa : 0, saldo : 0, notific : 0});
    }else{
        var vidp = getParameterByName('id');
        var vfacturap = arr('login',6,'',163,vidp+',\"'+asoc+'\"',0,1,$("#fdetallefacturas"));
        var vfacturap2 = arr('login',4,'',163,vidp+',\"'+asoc+'\"',0,0,0);
        var vf = vfacturap2[0][0];

        $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:1, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:vf[2], vidcliente:vf[0], vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vextrapagos : 0,vdivisa : 0, saldo : 0, notific : 0});
        $("#ncli").val(vf[1]).blur();

        var line = 0;
        var fimv = vfacturap2[0];
        $("#fdetallefacturas tr").each(function(){
            console.log(1)
            // var id = $(this).attr('id').substr(2);
            // var p = $('#h_'+id).attr('idprod');
            // var c = parseFloat($('#h_'+id).attr('cant'));
            // var r = parseFloat($('#h_'+id).attr('prec'));
            // var i = $('#h_'+id).attr('inv');
            // var h = $('#h_'+id).attr('hdesc');
            // var m = $('#h_'+id).attr('hdescm');
            // var t = r * c;
            
            // for (var i = 0; i < fimv.length; i++) {
            //     var exo = fimv[i][9]*(1-(fimv[i][12]/100));
            //     if($("#imp_"+fimv[i][8]).length == 0){
            //         var clip = 0;
            //         if(fimv[i][11] != 0) clip = 'vclipd="'+fimv[i][3]+'"';

            //         var sm = $(".moneda").first().data("triforce")['simbolo'];

            //         $("#sh_imp").append('<tr id="imp_'+fimv[i][8]+'" '+clip+'><td>'+fimv[i][10]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span class="moneda"><b>'+sm+'</b></span><span id="imv_'+fimv[i][8]+'" type="html" class="divisa">0.00</span></td></tr>');
            //         $("#imv_"+fimv[i][8]).data('incl',fimv[i][3]+",");
            //     }else{
            //         var incl = $("#imv_"+fimv[i][8]).data('incl');
            //         $("#imv_"+fimv[i][8]).data('incl',incl+fimv[i][3]+",");
            //     }
            //     $("#imv_"+fimv[i][8]).data({'imv':fimv[i][9]})
            // }
            
            // $(this).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:p, vcantidad:c, vprecio:r, hdesc:h,hdescm:m, vtotal:t, vidinventario:i,vidodt : 0,vcomodin:''});
  
            // $("#vdesc"+id).data({'valor':h,'max':m})
            line += 1;
            // $('#h_'+id).remove();
        });

        // $("#ncli").prop('readonly',true);
        $(".zelda").data('triforce')['idline'] = line;
        Materialize.updateTextFields();
        totalizar();
    }
});

function cargarOCompras(){
    $("#titfact").html("ORDEN DE COMPRA");
    $(".concre").addClass('hide');
    $("#vplazo").addClass('hide');
    $(".tp_all").addClass('hide');
    $(".isfast").addClass('hide');
    $("._desc").hide();
    $("._flete").hide();
    $("._ajuste").hide();
    $("._odt").hide();
    $(".show_facts").removeClass('m6').addClass('m9');
    $(".show_cliente").removeClass('m3').addClass('m9');

    $(".trOCompra").removeClass('hide');
    $(".trsec:hidden").remove();

    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor");
    $(".trOCompra").removeClass('hide');

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode
        if (code == 13) {
            var cant = isNaN($(this).val()) ? 0 : parseFloat($(this).val());
            if ( cant > 0) {
                var precio = parseFloat($("#precp").val().replace(/,/g,'')),
                    total = precio * cant;
                var idp = $("#valores").data('elemento')['idp'];
                var cod = $("#valores").data('elemento')['hcodp'];
                var inv = 0;
                var cnti = 0
                var idprd = $("#valores").data('elemento')['idp'];
                var dcs = 0;
                var mdcs = 0;
                var desc = $("#descp").val();
                var hinv = 0;
                var unidad= $("#valores").data('elemento')['hunidad'];
                var comodin= $("#valores").data('elemento')['hcomodin'];
                var desgloce= $("#valores").data('elemento')['isdesgloce'];

                addline(idprd,cod,desc,cant,precio,total,cnti,dcs,mdcs,hinv,0,unidad,comodin,desgloce);
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });
}//cargar ORDEN COMPRA

function cargarCompras(){
    $("#titfact").html("COMPRAS");
    $("#reference").removeClass('hide');
    $("#chg_tipo").attr('disabled',false);
    $("#vplazo").attr('disabled',false);

    $(".trCompra").removeClass('hide');
    $(".trsec:hidden").remove();

    $("#precp").attr('readonly',false);
    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor");
    $("#vdescuentop").removeAttr('disabled')

    $("#vreferencia").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13)
            $("#vfecha").focus();
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

    $(document).on("click",".addProduct",function(){
        $("#ecodprod").val($("#codp").val());
        $("#enomprod").val($("#descp").val());
        Materialize.updateTextFields();

        $("#fproductos .zelda").data('triforce',{vid:0,vcodigo:'', vcodigointerno:'',vnombre:'',vcosto:0,vganancia:0,vventa:0,vexoneracion:0, vpeso:0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:0,vidmoneda:1,vimg:''});
        
        $("#modal-producto").modal('open');
    });

    $("#vplazo").keyup(function(e){
        var code = e.which || e.keyCode
        if(code == 13){
            $(this).blur();
        }
    });

    $("#vplazo").blur(function(){
        doplazo($(this).val());
        $(".zelda").data("triforce")['vidcliente'] == 0 ? $("#ncli").focus() : $("#codp").focus();
    });

    $("#descup").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
                var cant = parseFloat($("#cantp").val()),
                    precio = parseFloat($("#precp").val().replace(/,/g,'')),
                    total = precio * cant;
                var cod = $("#valores").data('elemento')['hcodp'];
                var inv = $("#valores").data('elemento')['hinv'];
                var cnti = arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ cod+'" and idinventario = '+inv,'',0,'')[0][0][0];
                var idprd = $("#valores").data('elemento')['idp'];
                var desc = $("#descp").val();
                var hinv = $("#valores").data('elemento')['hinv'];
                var defi = arr('login',4,'',200,'64,0',0,0,0)[0][0][3];
                var unidad= $("#valores").data('elemento')['hunidad'];
                var comodin= $("#valores").data('elemento')['hcomodin'];
                var desgloce= $("#valores").data('elemento')['isdesgloce'];
                
                addline(idprd,cod,desc,cant,precio,total,cnti,$(this).val(),0,hinv,defi, unidad, comodin,desgloce);
        }
    });

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode;
        var cant = parseFloat($(this).val()),
            precio = parseFloat($("#valores").data('elemento')['hprec']),
            total = precio * cant;

        $("#totp").val(total.formatMoney(2,'.',','));

        if (code == 13) {
            if (cant > 0) {
                $("#precp").select().focus();
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });

    $("#precp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            var valor = $(this).val().replace(/,/g,'');
            $("#totp").val( (parseFloat(valor) * parseFloat($("#cantp").val())).formatMoney(2,'.',',') )
            $("#valores").data('elemento')['hprec'] = valor;
            $("#descup").select().focus();
        }
    });
}//cagar COMPRAS

function cargarVentas(){
    $("#titfact").html("VENTAS");

    $(".trVenta").removeClass('hide');
    $(".trsec:hidden").remove();

    $("#ncli").attr('placeholder',"Nombre o Cédula del Cliente");

    $(document).on("keyup","#cantp",function(e){
        var cant = parseFloat($(this).val()),
            precio = parseFloat($("#valores").data('elemento')['hprec']),
            total = precio * cant;
        $("#totp").val(total.formatMoney(2,'.',','));
        var code = e.which || e.keyCode;
        if (code == 13) {
            if (cant > 0) {
                var idp = $("#valores").data('elemento')['idp'];
                var cod = $("#valores").data('elemento')['hcodp'];
                var inv = $("#valores").data('elemento')['hinv'];

                var cnti = isNaN($("#cantI").html()) ? '∞': arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ idp+'" and idinventario = '+inv,'',0,'')[0][0][0];
                
                if (cant > cnti) {
                   Materialize.toast('Cantidad insuficiente en Inventario',4000,'red');
                }else if (cant <= cnti || cnti == '∞') {
                    var idprd = $("#valores").data('elemento')['idp'];
                    var dcs = $("#valores").data('elemento')['hdesc'];
                    var mdcs = $("#valores").data('elemento')['hdescm'];
                    var desc = $("#descp").val();
                    var hinv = $("#valores").data('elemento')['hinv'];
                    var unidad= $("#valores").data('elemento')['hunidad'];
                    var comodin= $("#valores").data('elemento')['hcomodin'];
                    var desgloce= $("#valores").data('elemento')['isdesgloce'];

                    addline(idprd,cod,desc,cant,precio,total,cnti,dcs,mdcs,hinv,0, unidad, comodin,desgloce);
                }
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });
}//cargar VENTAS

function cargarResembled(vnombre) {
    $("#titfact").html(vnombre);

    $(".concre").addClass('hide');
    $("#vplazo").addClass('hide');
    $(".tp_all").addClass('hide');
}//cargar Resembled

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

    $("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
       
        if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+$("#descp").val()+'",1,@@impresa',0,0,0,1)
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

    $("#ncli").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#ncli").blur(function(){
        var isproveedor = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
        searchClient($(this).val(),isproveedor);
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,gkeydown()+'bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
            });

        }
    });

    $(document).on("keyup",".rubro",function(e){
        var code = e.which || e.keyCode
        if (code == 13){
            $(this).blur();
        }                    
    });
    
    $(document).on("blur",".rubro",function(e){
        var id = $(this).attr('id').substr(5);
        $("#precd"+id).focus().select();           
    });

    $(document).on("keyup",".precd",function(e){
        var code = e.which || e.keyCode
        if (code == 13){
            $(this).blur();
        }                    
    });
    
    $(document).on("blur",".precd",function(e){
        alert(1)
        var id = $(this).attr('id').substr(5);
        $("#fd"+id).data('triforce')['vprecio'] = $(this).val();
        
        $("#cantd"+id).focus();          
    });

     $(document).on("keyup",".cantd",function(e){
        var code = e.which || e.keyCode
        if (code == 13){
            $(this).blur();
        }                    
    });
    
    $(document).on("blur",".cantd",function(e){
        totalizar();
        $("#codp").focus();           
    });

    $(document).on("click",".fedit",function(){
        var id = $(this).attr('id').substr(4);

        var tipo = getParameterByName('tf');
        $("#titmod").html($("#desc"+id).html());
        $("#hdnprd").val(id);
        $("#ecantidad").val($("#fd"+id).data('triforce')['vcantidad']);
        $("#edescuento").val($("#fd"+id).data('triforce')['vdesc']);
        $("#eunitario").val($("#fd"+id).data('triforce')['vprecio']);
        if (tipo == 1) {
            $(".eunit").addClass('hide');
            $(".eimp").addClass('hide');
        }else if (tipo == 2)
            $(".eimp").addClass('hide');
        else
            console.log('otros');

        Materialize.updateTextFields();

    });

    $(document).on("click","#editprod",function(){
        console.log(1)
        var id = $("#hdnprd").val();
        var cant,desc,prec = 0;
        cant = $("#ecantidad").val();
        desc = $("#edescuento").val();
        prec = $("#eunitario").val();

        console.log("cantidad: "+cant+"\ndescuento: "+desc+"\nprecio: "+prec)
        $("#fd"+id).data('triforce')['vcantidad'] = cant;
        $("#fd"+id).data('triforce')['vdesc'] = desc;
        $("#fd"+id).data('triforce')['vprecio'] = prec;
        totalizar();
        $("#cant"+id).text(cant);
        $("#prec"+id).text(prec);
        $("#vdesc"+id).text(desc+'%');
    });

}//cargar GLOBAL

function gkeydown(){
    return param.toString().match(new RegExp(/[23]/i)) ? '' : '!';
}

function doplazo(vval){
    if(isNaN(vval)){
        Materialize.toast('Plazo no Válido',4000,'red');
        $("#vplazo").select().focus();
        return false;
    }
    return true;
}