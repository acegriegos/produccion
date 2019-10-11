var param = '';
var config;
var idext = 0;
var pril;

$(function(){
  param = getParameterByName('tf');
  param = param == '' || param == 1 ? 7 : parseInt(param) ;

  config = getDatos('',42,'@@impresa',0,0)
  config = config[0][0];

  $("#mfacturacion").html(mantenimiento('facturacion',1,param));

    $('.datepicker').pickadate({
        labelMonthNext: 'Siguiente',
        labelMonthPrev: 'Anterior',
        labelMonthSelect: 'Seleccione un Mes',
        labelYearSelect: 'Seleccione un Año',
        monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
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
    
    switch(parseInt(config[11])){
        case 1:
            inicial = $("#codp");
            break;
        case 2:
            inicial = pril =$("#descp");
            break;
        case 3:
            inicial = $("#ecouser");
            break;
        default:
            break;
    }

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
            cargarResembled('PROFORMAS');
            break;
        case 5:
            cargarVentas();
            cargarResembled('PEDIDOS');
            break;
        case 6:
            cargarVentas();
            cargarResembled('PRE-VENTA');
            break;
        case 9:
            //cargarFECompra();
            cargarResembled('COMPRA ELECTRONICA');
            break;
        case 10:
            cargarVentas();
            cargarResembled('EXPORTACION');
            break;
        case 100:
            cargarVentas();
            cargarResembled('PAGO SOBRE ADELANTO');
            break;
        default:
            cargarVentas();
            break;
    }

    pril = parseInt(config[11]) == 2 ? $("#descp") : $("#codp");; 
    cargarGlobal();

    if (asoc == '') {
        var estado = param == 5 ? 5 : 1;

        setTimeout(function(){inicial.focus();},300);
         $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:1,vidodt:0,vexonerado : 0,voc:'', idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vidagente:0,margenes:0,vterminal:config[26]});
    }else{
       var vidp = getParameterByName('id');
       cargarFactura(vidp,asoc);
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

    $(".trOCompra").removeClass('hide');
    $(".trsec.hide").remove(); //.trsec:hidden

    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor");

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode
        if (code == 13) {
            var cant = isNaN($(this).val()) ? 0 : parseFloat($(this).val());
            if ( cant > 0 ) {
                $(".addline").click();
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });

    $(".addline").click(function(){
        if ($("#valores").data('elemento') == undefined) {
            pril.focus();
            return false
        }
        var cant = parseFloat($("#cantp").val());
        var precio = parseFloat($("#precp").val().replace(/,/g,'')),
            total = precio * cant;
        var idp = $("#valores").data('elemento')['idp'];
        var cod = $("#valores").data('elemento')['hcodp'];
        var inv = 0;
        var cnti = 0
        var idprd = $("#valores").data('elemento')['idp'];
        var dcs = 0;
        var mdcs = 0;
        var desc = 0;
        var hinv = 0;
        var unidad = $("#uni option:selected").html();//$("#valores").data('elemento')['hunidad'];
        var comodin = $("#valores").data('elemento')['hcomodin'];
        var desgloce = $("#valores").data('elemento')['isdesgloce'];
        var strimp = $("#valores").data('elemento')['strimp'];
        var exo = $("#valores").data('elemento')['exo'];
        var mobil = $(this).attr('tr') == 2 ? 1 : 0;

        addline(idprd,cod,desc,cant,precio,total,cnti,{iddescuento:0,descuento:0},mdcs,hinv,0,unidad,comodin,desgloce,strimp,exo,mobil);
    });

}//cargar ORDEN COMPRA

function cargarCompras(){
    $("#titfact").html("COMPRAS");
    $(".chg_tipo").attr('disabled',false);
    $("#vplazo").attr('disabled',false);
    $("[for=iva]").removeClass('hide');

    $(".trCompra").removeClass('hide');
    $(".trsec.hide").remove(); //.trsec:hidden

    $(".isfast").addClass('hide');
    $("#ingclie").addClass('hide');

    $("#precp").attr('readonly',false);
    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor").prop('readonly',true);
    $("#vdescuentop").prop('readonly',true);
    $("#monedas").prop('readonly',true).material_select('update');
    $("#vcomentario").prop('readonly',true);

    $("#facturar").html('Aceptar').attr('id','docompra').attr('href','#')

    if($("#fcompra").is(':visible')){
        var comprasacp = getDatos('',295,'@@impresa',0,0,0);

        var strfact = '<option value="0">Seleccione una Factura</option>'
        for(var i=0; i<comprasacp[0].length;i++){
            strfact += '<option value="'+comprasacp[0][i][0]+'" title="'+comprasacp[0][i][2]+'" ref="'+comprasacp[0][i][4]+'" idc="'+comprasacp[0][i][5]+'">'+comprasacp[0][i][1]+'</option>'
        }
        $("#fcompra").html(strfact)
    }

    $("#fcompra").change(function(){
        var vidfact = $('option:selected',this).val();
        var ref = $('option:selected',this).attr('ref');
        var client = $('option:selected',this).attr('title');
        $("#vreferencia").val(ref);
        $("#ncli").val(client);

        $("#ffacturas .zelda").data('triforce')['vidcliente'] = $('option:selected',this).attr('idc');
        $("#fdetallefacturas").html(mantenimiento('facturacion',11,{idfact:vidfact,idtp:1}));
        $(".autocomplete").autocomplete();
    });
    
    $("#celectronica").change(function(){
        $("#fdetallefacturas").html('')
        if($("#celectronica").is(':checked')){
            param = 9
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 9;
            var ncons = getDatos('lpad(consecutivo8+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#idfact").html(ncons);
            $("#precioscat").addClass('hide');
            $("#vimpiva").val(1).material_select('update');

            $("#ncli").prop('readonly',false);
            $("#vdescuentop").prop('readonly',false);
            $("#monedas").prop('readonly',false).material_select('update');
            $("#vcomentario").prop('readonly',false);

            $("#fcompra").addClass('hide');
            $("#vreferencia").prop('readonly','false')
            $(".trComprae").removeClass('hide');
            $("#addliner").removeClass('hide');
            $("#ingclie").removeClass('hide');

            $("#docompra").unbind();
            $("#docompra").html('Facturar').attr('id','facturar');

        }else{
            param = 2;
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 2;
            var ncons = getDatos('lpad(consecutivo1+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#idfact").html(ncons);
            $("#precioscat").removeClass('hide');
            $("#vimpiva").val(8).material_select('update');

            $("#precp").attr('readonly',false);
            $("#ncli").prop('readonly',true);
            $("#vdescuentop").prop('readonly',true);
            $("#monedas").prop('readonly',true).material_select('update');
            $("#vcomentario").prop('readonly',true);

            $("#fcompra").removeClass('hide');
            $("#vreferencia").prop('readonly','true')
            $(".trComprae").addClass('hide');
            $("#addliner").addClass('hide');
            $("#ingclie").addClass('hide');

            $("#facturar").html('Aceptar').attr('id','docompra');
            $("#docompra").click(function(){mdocompra()});
        }
    });

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

    $(document).on("keydown",".eqprod",function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            var tipo = getParameterByName('tf');
            var id = $(this).parent().parent().attr('id')
            $(".autocomplete-content").remove();
            
            $(this).autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",1,@@impresa',0,0,0,1),
                onAutocomplete: function(val){
                    
                    var cod = arr('login',4,'',43,'"'+ val.replace(/"/g,"\\\"") +'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+$("#ffacturas .zelda").data('triforce')['vidtipoventa']+','+$("#invgeneral").val(),0,0,0);
                    if (cod[0][0] != undefined) {
                        $("#"+id).data('triforce')['videntrada'] = cod[0][0][0];
                        $("#"+id).find('.mdi-plus').addClass('hide');
                    }else{
                        $("#"+id).data('triforce')['videntrada'] = 0;
                        $("#"+id).find('.mdi-plus').removeClass('hide');
                    }
                }
            })

            $(".autocomplete-content").css('max-width','250px');
        }
    });

    $("#vplazo").keyup(function(e){
        var code = e.which || e.keyCode
        if(code == 13){
            $(this).blur();
        }
    });

    $("#vplazo").blur(function(){
        doplazo($(this).val());
        $(".zelda").data("triforce")['vidcliente'] == 0 ? $("#ncli").focus() : pril.focus();
    });

    $("#descup").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13){
            /*$("#totp").val((parseFloat($("#precp").val().replace(/,/g,''))*(1-(parseFloat($(this).val())/100))*parseFloat($("#cantp").val())).formatMoney(2,'.',','))
            if($(".ven2").length){
                cargarUtilidad();
                $(".ven2:first").focus();    
            }else{*/
                $(".addline").click();
            //}
        } 
            
    });

    $("#vimpiva").change(function(){
        if ($(".ven2").length)
            $(".ven2:first").focus();
    });

    $("#addliner").addClass('hide');

    $("#docompra").click(function(){mdocompra()});

    function mdocompra(){

        if(!$("#fdetallefacturas .ciclos").length){
            Materialize.toast('No hay Artículos',4000,'red');
            return false;
        }

        var cnt = 1;
        var cant = 0;
        var ppro = 0;

        $("#fdetallefacturas .ciclos").each(function(){
            if($(this).data('triforce')['videntrada'] == 0){
                Materialize.toast('Artículo no Incluido',4000,'red')
                $(this).find('.eqprod').focus();
                cnt = 0;
                return false;
            }
            cant = parseFloat($(this).data('triforce')['vcantidad']);

            ppro = getDatos('id',104,'idproveedor = '+$("#ffacturas .zelda").data('triforce')['vidcliente']+' and idproducto = '+$(this).data('triforce')['videntrada'],0,0,0);
            if(ppro[0].length){
                actualizar(104,'costo = '+$(this).data('triforce')['vprecio']+', ultimafecha = now()','id = '+ppro[0][0][0]);
            }else{
                insertar(104,'','null,'+$(this).data('triforce')['videntrada']+','+$("#ffacturas .zelda").data('triforce')['vidcliente']+',"'+$(this).data('triforce')['vcodigo']+'",'+$(this).data('triforce')['vprecio']+',0,now(),1,0');
            }
            actualizar(97,'cantidad = cantidad+'+$(this).data('triforce')['vcantidad'],'idproducto = '+$(this).data('triforce')['videntrada']);
        });

        insertar(291,'idfactura,compraprocesada',$("#fd1").data('triforce')['vidfactura']+',1');

        if(cnt){
            Materialize.toast('Artículos Incluidos',4000,'green');

            setTimeout(function(){
                location.reload();
            },4000);
        }
    }

    $(document).on("click",".costo",function(){
        if(parseInt($(this).parent().parent().data('triforce')['videntrada']) == 0){
            Materialize.toast('Artículo no Enlazado',4000,'red');
            return false;
        }

        var prod = getDatos('',297,$(this).parent().parent().data('triforce')['videntrada']+','+$(this).parent().parent().data('triforce')['longitud'],0,0,0);
        var str = '';
        if(prod[0].length){
            var cst = parseFloat($(this).parent().parent().data('triforce')['vprecio']);
            var cstold = parseFloat(prod[0][0][1]);
            var ddif = cst - cstold;
            var color = 'black';
            var icon = '';
            if(ddif > 0){
                //AUMENTO EL COSTO
                color = 'red';
                icon = 'mdi-arrow-up';
            }
            var utlnew = 1;
            str += '<label><b>COSTOS</b></label><br> '+cstold.formatMoney(2,'.',',')+' => '+cst.formatMoney(2,'.',',') + ' <span style="color:'+color+'"><i class="mdi '+icon+'"></i> '+((ddif*100)/cstold).formatMoney(2,'.',',')+'% ('+ddif+')</span> <br>  <table> <tr> <td>Utilidad</td> <td style="text-align: right;">'+parseFloat(prod[0][0][5]).formatMoney(0)+'</td> <td>=></td> <td><input type="number" class="browser-default eder" value="'+utlnew+'" style="border: 0px;width:50px;"/></td></tr> <tr> <td>Venta</td> <td style="text-align:right">'+parseFloat(prod[0][0][3]).formatMoney(2,'.',',')+'</td> <td>=></td> <td></td> </tr> <tr> <td>+IVA</td> <td style="text-align:right">'+parseFloat(prod[0][0][4]).formatMoney(2,'.',',')+'</td> <td>=></td> <td></td> </tr>';
            for (var i = 0; i < prod[0].length; i++) {

                str += '<tr> <td>'+prod[0][i][6]+'</td> <td>'+parseFloat(prod[0][i][10]).formatMoney(0)+' => <input type="number" class="browser-default eder" value="'+utlnew+'" style="border: 0px;width:50px;"/> %</td> <td style="text-align:right">'+parseFloat(prod[0][i][8]).formatMoney('2','.',',')+'</td> <td style="text-align:right">'+parseFloat(prod[0][i][9]).formatMoney('2','.',',')+'</td> </tr>';
            }
        }
        $("#marbdy").html(str+'<table>')

        $("#openmargen").sideNav('show');
    });

     $('#openmargen').sideNav({
        menuWidth: 400, // Default is 240
        edge: 'rigth', // Choose the horizontal origin
        closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
        draggable: true // Choose whether you can drag to open on touch screens
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

    $(".addline").click(function(){
        if ($("#valores").data('elemento') == undefined) {
            pril.focus();
            return false
        }
        var cant = parseFloat($("#cantp").val()),
            precio = parseFloat($("#precp").val().replace(/,/g,'')),
            total = precio * cant;
        var cod = $("#valores").data('elemento')['hcodp'];
        var inv = $("#valores").data('elemento')['hinv'];
        var cnti = arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ cod+'" and idinventario = '+inv,'',0,'')[0][0][0];
        var idprd = $("#valores").data('elemento')['idp'];
        var desc = $("#descp").val();
        var hinv = $("#valores").data('elemento')['hinv'];
        var defi = 0;//arr('login',4,'',200,'64,0',0,0,0)[0][0][3];
        var unidad= $("#uni option:selected").html();//$("#valores").data('elemento')['hunidad'];
        var comodin= $("#valores").data('elemento')['hcomodin'];
        var desgloce= $("#valores").data('elemento')['isdesgloce'];
        var strimp = $("#valores").data('elemento')['strimp'];
        var exo = $("#valores").data('elemento')['exo'];
        var mobil = $(this).attr('tr') == 2 ? 1 : 0;

        addline(idprd,cod,desc,cant,precio,total,cnti,{iddescuento:0,descuento:$("#descup").val()},0,hinv,0, unidad, comodin,desgloce,strimp,exo,mobil);
    });

    $("#precp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            if (isNaN($(this).val().replace(/,/g,''))) {
                Materialize.toast('Valor no es Numérico',4000,'red')
                $(this).focus().select();
                return false;
            }
            var valor = $(this).val().replace(/,/g,'');
            $("#totp").val( (parseFloat(valor) * parseFloat($("#cantp").val())).formatMoney(2,'.',',') )
            $("#valores").data('elemento')['hprec'] = valor;
            $("#descup").select().focus();
            
            //cargarUtilidad();
        }
    });

    function cargarUtilidad(){
        var matriz = []
        var id = cganancia = 0;
        var descuentol = (1-(parseFloat($("#descup").val())/100));
        var idp = $("#valores").data('elemento') != undefined ? $("#valores").data('elemento')['idp'] : $("#ffacturas .zelda").data('margenes')['idp'];
        var tpmoneda = getDatos('idmoneda',11,'id = '+ idp ,0,0,0)[0][0][0];
        var tpdivisa = parseInt(tpmoneda) == parseInt($("#monedas").val()) ? 1 : parseFloat($("#monedas [value="+tpmoneda+"]").attr('dv'));
        var ncosto = (parseFloat($("#precp").val().replace(/,/g,''))*descuentol)/($("#iva").is(":checked") ? (parseFloat($("#vimpiva").attr('num'))/100 +1): 1);

        $("#cos2").html(parseFloat(ncosto).formatMoney(2,'.',''));
        matriz['costo'] = $("#cos2").html();

        if(!$("#chgvalor").is(":checked")){
            $(".ven1").each(function(){
                id = $(this).parent().parent().attr('id').substr(1);
                cganancia = (parseFloat($("#n"+id+" .ven1").html())/($("#iva").is(":checked") ? (parseFloat($("#vimpiva").attr('num'))/100 +1): 1)-ncosto);

                    $("#n"+id+" .gan2").val(ncosto == -1*cganancia ? '0.00' : ((cganancia*100)/ncosto).formatMoney(2,'.','')); 
                    $("#n"+id+" .gan2").attr('gn',cganancia);
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*($("#iva").is(":checked") ? (parseFloat($("#vimpiva").attr('num'))/100 +1): 1)).formatMoney(2,'.',''));     
                    matriz[id] = []
                    matriz[id][0] = $("#n"+id+" .ven2").val()
                    matriz[id][1] = $("#n"+id+" .gan2").val()
                    matriz[id][2] = $("#n"+id+" .gan2").attr('gn');
                    matriz[id][3] = id;
                    matriz[id][4] = ncosto;
            });
        }else{
            $(".ven1").each(function(){
                id = $(this).parent().parent().attr('id').substr(1);
                cganancia = parseFloat(ncosto*(parseFloat($("#n"+id+" .gan1").html())/100));
                //if(cganancia){
                    $("#n"+id+" .gan2").val(((cganancia*100)/ncosto).formatMoney(2,'.','')); 
                    $("#n"+id+" .gan2").attr('gn',cganancia);
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*($("#iva").is(":checked") ? (parseFloat($("#vimpiva").attr('num'))/100 +1): 1)).formatMoney(2,'.',''));
                    matriz[id] = {}
                    matriz[id][0] = $("#n"+id+" .ven2").val()
                    matriz[id][1] = $("#n"+id+" .gan2").val()
                    matriz[id][2] = $("#n"+id+" .gan2").attr('gn');
                    matriz[id][3] = id; 
                    matriz[id][4] = ncosto;    
                //}
            });
        }
        $("#valores").data('matriz',matriz);
    }

    $(document).on("click",".margen",function(){
        $("#changemar").removeClass('hide');
        var id = $(this).attr('id').substr(1);
        $("#ffacturas .zelda").data('margenes',{idp:id});
        cargarMargenes();

        var matriz = $("#fd"+id).data('matriz');

        for (var i = 0; i < matriz.length; i++) {
        $("#n"+matriz[i][3]+" .ven2").val(matriz[i][0])
        $("#n"+matriz[i][3]+" .gan2").val(matriz[i][1])
        }

        $("#cos2").html(matriz[0][4]);
    });

    $(document).on("click","#changemar",function(){
        $(".ven1").html('0.00')
        $(".ven2").val('0.00')
        $(".gan1").html('0.00')
        $(".gan2").val('0.00')
        $("#cos1").html('0.00')
        $("#cos2").html('0.00')
        $("#preponderado").html('0.00');
        $(this).addClass('hide');
    });

    $(document).on("change","#chgvalor",function(){
       cargarUtilidad();
    });
}//cargar COMPRAS

function cargarVentas(){
    $("#titfact").html("TIQUETES");

    $(".trVenta").removeClass('hide');
    $(".trsec.hide").remove(); //.trsec:hidden

    $("#ncli").attr('placeholder',"Nombre o Cédula del Cliente");

    $(document).on("blur","#precp",function(){

        if ( $(this).attr('readonly') == undefined) {
            $("#valores").data('elemento')['hprec'] = parseFloat($(this).val().replace(/,/g,''))*parseFloat($("#monedas option:selected").attr('dv'));
            $("#totp").val((parseFloat($(this).val().replace(/,/g,''))*1).formatMoney(2,'.',','))
        }
        
    });

    $(document).on("keyup","#precp",function(e){
         var code = e.which || e.keyCode;
         if (code == 13) {
            $("#cantp").val(1).focus().select();
            $(this).blur()
         }
    });
    
    $(document).on("keyup","#cantp",function(e){
        
        if ($("#valores").data('elemento') == undefined) {
            return false
        }
        var cant = parseFloat($(this).val()),
            precio = parseFloat($("#valores").data('elemento')['hprec']),
            total = precio * cant;
        $("#totp").val(total.formatMoney(2,'.',','));
        var code = e.which || e.keyCode;
        if (code == 13) {
            if (cant > 0) {
                var idp = $("#valores").data('elemento')['idp'];
                var isi = $("#valores").data('elemento')['inventariado'];
                var inv = $("#valores").data('elemento')['hinv'];
                var idheredado = $("#valores").data('elemento')['idheredado'];
                idp = idheredado != 0 ? idheredado : idp;
                var cnti = isNaN($("#cantI").html()) ? '∞': arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ idp+'" and idinventario = '+inv,'',0,'')[0][0][0];

                var comodin = $("#valores").data('elemento')['hcomodin'].replace(/\^.*\^/g,'');
                if (cant > cnti && comodin == '' && param.toString().match(new RegExp(/[1578]/i)) && parseInt(isi)) {
                   Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red');
                }else if (cant <= cnti || cnti == '∞' || !parseInt(isi) || comodin != '' || param.toString().match(new RegExp(/[234]/i))) {
                    $(".addline").click()
                }else
                    console.log('QUE PROCESO ES');
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });

    $(".addline").click(function(){

        if ($("#valores").data('elemento') == undefined) {
            pril.focus();
            return false
        }
        if($(this).attr('sg')){
            $(this).removeAttr('sg');
            return false
        }
        var cant = parseFloat($("#cantp").val()),
            precio = parseFloat($("#valores").data('elemento')['hprec']),
            total = precio * cant;
        var idprd = $("#valores").data('elemento')['idp'];
        var cod = $("#valores").data('elemento')['hcodp'];
        var dcs = $("#valores").data('elemento')['hdesc'];
        var mdcs = $("#valores").data('elemento')['hdescm'];
        var desc = $("#descp").val();
        var hinv = $("#valores").data('elemento')['hinv'];
        var unidad= $("#uni option:selected").html();//$("#valores").data('elemento')['hunidad'];
        var comodin= $("#valores").data('elemento')['hcomodin'];
        var desgloce= $("#valores").data('elemento')['isdesgloce'];
        var strimp = $("#valores").data('elemento')['strimp'];
        var exo = $("#valores").data('elemento')['exo'];
        var inv = $("#valores").data('elemento')['hinv'];
        var cnti = isNaN($("#cantI").html()) ? '∞': arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ idprd+'" and idinventario = '+inv,'',0,'')[0][0][0];
        var mobil = $(this).attr('tr') == 2 ? 1 : 0;

        addline(idprd,cod,desc,cant,precio,total,cnti,dcs,mdcs,hinv,0, unidad, comodin,desgloce,strimp,exo,mobil);
    });

    if (parseInt(config[12]))
        $("#iva").prop('checked',true)
    else
        $("#iva").prop('checked',false)

}//cargar VENTAS

function cargarResembled(vnombre) {
    $("#titfact").html(vnombre);

    $(".concre").addClass('hide');
    $("#vplazo").addClass('hide');
    $(".tp_all").addClass('hide');
    $("#cargarfact").addClass('hide');
}//cargar Resembled

function cargarGlobal(){   
    var cons = param-1 == 0 ? 6 : param-1;
    var ncons = getDatos('lpad(consecutivo'+cons+'+1,10,0)',252,'idsucursal = @@impresa and id > 0',0,0)[0][0];
    $("#idfact").html(ncons);

    loadmybussiness();

    var fecha = new Date();
    var dpick = $('#vfecha').pickadate()
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
    dpick.pickadate('picker').on({close: function() {
        if(!$(".con").is(":visible")){
            // $(".con .select-wrapper .select-dropdown").click();
            // $(".con .select-wrapper .select-dropdown").addClass('active');
            // $(".con .select-wrapper .select-dropdown").focus();
            // $(".con .select-wrapper .select-dropdown").first('li').addClass('selected');

            $("#vplazo").focus().select();
        }
        $("#vfecha").blur();
    }});

    if ($(".trsec:hidden").length == 1){
        $(".trsec.hide-on-large-only").remove();
    }
    else
       $(".trsec.hide-on-med-and-down").remove();

    $("#ingclie").click(function(){
        $("#modal-clientes").modal('open');
        $("#c-ced").focus();

        if (param.toString().match(new RegExp(/[239]/i))){
            $("#titagcli").html('Agregar Proveedor');
        }
        
    });

    $(".tdesc").change(function(){
        var tp = $(this).attr('tp');
        $("[tdesc="+tp+"]").addClass('hide');
        if ($(this).val() == "0") {
            $("[tdesc="+tp+"]").removeClass('hide');
            $("[tdesc="+tp+"]").val(0).focus().select();
        }else
            $("[tdesc="+tp+"]").val($(this).val())
    });

    $("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            var tipo = getParameterByName('tf');
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",1,@@impresa',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $("#codp").keydown(function(e){
        
        if (config[6] == 0) {
            var charCode = e.which || e.keyCode;
            var charStr = keysight(e)

            if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
                var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
                $(".autocomplete-content").remove();
                
                $(this).autocomplete({
                    limit: 20,
                    data: arr('login',4,'',6,'"'+busqueda+'",6,@@impresa',0,0,0,1)
                })

                $(this).siblings($(".autocomplete-content")).css('width','50%');
            }
        }else{
            $(".autocomplete-content").remove();
        }
    });

    $(".chg_tipo").change(function(){
        var value = parseInt($(this).attr('val'));
        $(".gen").addClass('hide');
        $(".zelda").data('triforce')['vidtipo'] = value;

        switch(value){
            case 1: //CREDITO
                $(".con").removeClass('hide');
                $("#vplazo").val(0);
                break;
            case 2: //CREDITO
                $(".cre").removeClass('hide');
                if ($(".zelda").data('triforce')['vidcliente'] != 0) {
                    var plazo = arr('login',4,'plazo',2,'id = '+$(".zelda").data('triforce')['vidcliente'],'',0,'')[0][0][0];
                    $("#vplazo").val(plazo);
                }
                break;
            case 3:
                $(".cns").removeClass('hide');
                break;
            case 4:
                $(".apa").removeClass('hide');
                break;
            case 5:
                $(".afc").removeClass('hide');
                break;
            case 6:
                $(".aff").removeClass('hide');
                break;
            default:
                break;
        }

    });

    $("#ncli").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur()
        }
    });

    $("#ncli").blur(function(){
        if ($(this).val().trim().length > 0 || parseInt($("#ffacturas .zelda").data('triforce')['vidcliente'])) {
            var isproveedor = param.toString().match(new RegExp(/[239]/i)) ? 1 : 0;
            searchClient($(this).val(),isproveedor);
        }else{
            $(".chg_tipo").attr('disabled','disabled')
            $(".chg_tipo[val=1]").removeAttr('disabled');
            $(".chg_tipo[val=1]").click()
        }
        
    });

    $("#byclie").keydown(function(e){
        var charCode = e.which //|| e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            
            $(".autocomplete-content").remove();
            $("#byclie").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,gkeydown()+'bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) having nom like "%'+busqueda+'%" limit 20',0,0,0,1),
                onAutocomplete: function(val){
                        var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2," *",cedula,"*") like "%'+$("#byclie").val()+'%" and id > 0 and idsucursal in(-1,@@impresa)',0,0,0);
                        if (id[0].length){
                             $("#byclie").attr('cid',id[0][0][0]);
                        }
                        else
                             $("#byclie").attr('cid',0);
                         cargarFacturasNota();
                    }
            });

            $("#byclie").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $("#byfact").keyup(function(e){
         var code = e.which || e.keyCode;
        if (code == 13)
            cargarFacturasNota();
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which //|| e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            
            $(".autocomplete-content").remove();
            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",ifnull(apellido1,"")," ",ifnull(apellido2,"")," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,gkeydown()+'bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) having nom like "%'+busqueda+'%" limit 20',0,0,0,1)
            });

            $("#descp").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $(document).on("keyup","#nombre",function(){
        $("#fclientes .zelda").data('triforce')['vnombre'] = $(this).val();
    });

    $(document).on("keyup","#apellido1",function(){
       $("#fclientes .zelda").data('triforce')['vapellido1'] = $(this).val(); 
    });

    $(document).on("keyup","#apellido2",function(){
       $("#fclientes .zelda").data('triforce')['vapellido2'] = $(this).val(); 
    });

    $(document).on("keyup","#cedula",function(){
       $("#fclientes .zelda").data('triforce')['vcedula'] = $(this).val(); 
    });

    $(document).on("change","[name=tipoclie]",function(){
       $("#fclientes .zelda").data('triforce')['vidtipocliente'] = $(this).attr('tipoclie'); 
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
        pril.focus();           
    });

    $(document).on("click",".fedit",function(){
        var id = $(this).attr('id').substr(4);

        var tipo = getParameterByName('tf');
        var descuento = $("#fd"+id).data('triforce')['vdescuento'];
        $("#titmod").html($("#desc"+id).html());
        $("#hdnprd").val(id);
        $("#ecantidad").val($("#fd"+id).data('triforce')['vcantidad']);

        $("#edescuento").val(descuento);
        $("#eunitario").val(($("#fd"+id).data('triforce')['vprecio']).formatMoney(5,'.',','));
        $(".ename").addClass('hide');
        $(".eiva").addClass('hide');

        switch(parseInt(tipo)){
            case 2:
                $(".eiva").removeClass('hide');
                $(".eimp").removeClass('hide');
                $("#iva").attr('checked',$("#fd"+id).data('triforce')['iva']);
                break;
            default:
                $(".eunit").addClass('hide');
                $(".eimp").addClass('hide');
                $(".eexct").addClass('hide');
                break;
        }

        var iscomodin = $("#fd"+id).data('triforce')['vcomodin'];
        var entrada = $("#fd"+id).data('triforce')['videntrada'];
        var char1 = entrada.substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        if (param != 2)
            cargarDescuentos(entrada.substr(1)+',0',tabla,1,id);
        if(iscomodin != ''){
            $(".ename").removeClass('hide');
            $("#descpl").val($("#desc"+id).html());
            $("#iva").attr('checked',$("#fd"+id).data('triforce')['iva']);
            $(".eunit").removeClass('hide');
            $(".eiva").removeClass('hide');
        }
        var uni = '';
        var unis = getDatos('',250,entrada,0,0,0);
        unis = unis[0];

        $.each(unis, function(index, valor) {
            uni += '<option value="'+valor[0]+'">'+valor[1]+'</option>';
        });
        $("#uniadl").html(uni);
        $("#uniadl").val($("#fd"+id).data('triforce')['vidunidad']);
        $("#uniadl").material_select('update');
        
        Materialize.updateTextFields();

    });
    
    $(document).on("click",".detalle",function(){
        $("#dfact").sideNav('show');
    });

    $(document).on("click","#editprod",function(){
        var id = $("#hdnprd").val();
        var cant,desc,prec,exo,unid = 0;
        cant = $("#ecantidad").val();
        desc = $("#edescuento").val().replace(',','');
        prec = $("#eunitario").val().replace(',','');
        exo = $("#texct").val();
        unid = $("#uniadl").val();

        $("#fd"+id).data('triforce')['vcantidad'] = cant;
        $("#fd"+id).data('triforce')['vdesc'] = desc;
        $("#fd"+id).data('triforce')['vprecio'] = prec;
        if(param == 2)
            $("#fd"+id).data('triforce')['exoneracion'] = exo;
        $("#fd"+id).data('triforce')['vidunidad'] = unid;
        totalizar();
        $("#cant"+id).text(cant);
        $("#prec"+id).text(parseFloat(prec).formatMoney(2,'.',','));
        $("#unitprod"+id).text($("#uniadl option:selected").html())
    });

    $(document).on("click",".addProduct",function(){
        $("#vcodigo").val($("#codp").val());
        $("#vpnombre").val($("#descp").val());
        Materialize.updateTextFields();

        $("#fproductos .zelda").data('triforce',{vid:0,vnombre:'',vcodigointerno:'',vcosto:0,vganancia:0,vexoneracion: 0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:6,vidusuario: '',vidmoneda:1,vidsucursal:'',visinventariado:0,vidheredado:0,visvariable:1,vcantequiv:0,visgravamen:0,vcomision:0,vventa:0,vventaiva:0,vtimv:8,vidvarios:0});
        
        $("#modal-producto").modal('open');
        $("#vcodigo").focus()
        $(this).parent().parent().hide();

        $("#pmoneda").val($("#monedas").val());
        $("#pmoneda").material_select('update');
    });

    // if (config[1] == 0) {
    //     $("#lproductos").addClass('hide');
    // }
  
    if (config[5] == 1){
        $("#p_v").attr('checked',true);
    }else{
        $("#p_v").attr('checked',false);
    }

    if (config[6] == 1){
        $("#barras").click();
    }else{
        $("#teclado").click();
    }

    $("#p_v").change();

    $(document).on("change","[id^=cant]",function(){
        if($(this).parent().parent().data('triforce') != undefined){
            var valor = $(this).val();
            if(isNaN(valor))
                $(this).val(1)
            if(parseFloat(valor) <= 0)
                $(this).val(1)
            $(this).parent().parent().data('triforce')['vcantidad'] = valor;
            totalizar();
        }
    });

}//cargar GLOBAL

function gkeydown(){
    return param.toString().match(new RegExp(/[239]/i)) ? '' : '!';
}

function doplazo(vval){
    if(isNaN(vval)){
        Materialize.toast('Plazo no Válido',4000,'red');
        $("#vplazo").select().focus();
        return false;
    }
    return true;
}

function cargarFactura(vidp,asoc){
    var vfacturap = arr('login',6,'',163,vidp+',\"'+asoc+'\"',0,1,$("#fdetallefacturas"));

    idext = vidp;
    if($("#impm:visible").length){
        var vmobil = $(".addline").attr('tr') == 2 ? 1 : 0;
        if($("#impm").is(':checked')){
            $("#ffacturas .zelda").data('triforce')['idline'] = parseInt($("#ffacturas .zelda").data('triforce')['idline'])+1;
            addline('-0','sr','',1,0,0,99,{iddescuento:0,descuento:0},0,0,0,0,'10% Servicios Restaurante','','',0,vmobil);        
            $("#fd"+$("#ffacturas .zelda").data('triforce')['idline']).addClass('hide')
        }
        $(".order").removeClass('hide');
    }

    // $("#ffacturas .zelda").data('triforce')['vterminal'] = config[26];
    Materialize.updateTextFields();
}

function cargarFacturasNota(){
    var vcliente = $("#byclie").attr('cid');
    var vfactura = $("#byfact").val().trim().length ? $("#byfact").val() : 0;
    var str = '';
    var info = getDatos('concat(case idtipoventa when 1 then "F-" when 8 then "S-" when 10 then "E-" else "T-" end,lpad(consecutivo,6,0)),concat((select simbolo from monedas where id = idmoneda),format(subtotal+exento+imv-descuento+exonerado,2)),date_format(fecha,"%d-%m-%Y"),datediff(curdate(),fecha) as dias,id',64,'id > 0 and if('+vcliente+' = 0,1,idcliente = '+vcliente+') and if("'+vfactura+'" = 0,1,consecutivo = "'+vfactura+'") and idtipoventa in(1,7,8,10) and idsucursal = @@impresa having dias <= 15',0,0,0);

    $("#listafacturas").html('');
    if (info.succed) {
        for (var i = 0; i < info[0].length; i++) {
            str += '<tr class="detalle" id="h'+info[0][i][4]+'" style="cursor:pointer"><td></td><td>'+info[0][i][0]+'</td><td>'+info[0][i][1]+'</td><td>'+info[0][i][2]+'</td></tr>';
        }
        $("#listafacturas").html(str);
    }else{
        $("#listafacturas").html('<tr><td colspan="3" align="center" >No hay Facturas Disponibles</td></tr>');
    }
}