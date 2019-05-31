var param = '';
var config;
var idext = 0;
var pril;

$(function(){
  param = getParameterByName('tf');
  param = param == '' || param == 1 ? 7 : parseInt(param) ;

  config = getDatos('',42,'@@impresa',0,0)[0][0];

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
        default:
            cargarVentas();
            break;
    }

    pril = parseInt(config[11]) == 2 ? $("#descp") : $("#codp");; 
    cargarGlobal();

    if (asoc == '') {
        var estado = param == 5 ? 5 : 1;

        setTimeout(function(){inicial.focus();},300);
         $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0,vidusuario:'', vidsucursal:'', videstado:estado, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0,vidtipopago : 0, vextrapagos : 0,vidodt:0,vdivisa : 0, saldo : 0, notific : 0});
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
    $("[for=exct]").removeClass('hide');

    $(".trCompra").removeClass('hide');
    $(".trsec.hide").remove(); //.trsec:hidden

    $(".isfast").addClass('hide');

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
        $("#vcodigo").val($("#codp").val());
        $("#vpnombre").val($("#descp").val());
        Materialize.updateTextFields();

        $("#fproductos .zelda").data('triforce',{vid:0,vnombre:'',vcodigointerno:'',vcosto:0,vganancia:0,vexoneracion: 0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:6,vidusuario: '',vidmoneda:1,vidsucursal:'',visinventariado:1,vidheredado:0,visvariable:0,vcantequiv:0,visgravamen:0,vcomision:0,vventa:0});
        
        $("#modal-producto").modal('open');
        $("#vcodigo").focus()
        $(this).parent().parent().hide();

        $("#pmoneda").val($("#monedas").val());
        $("#pmoneda").material_select('update');
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
            $("#totp").val((parseFloat($("#precp").val().replace(/,/g,''))*(1-(parseFloat($(this).val())/100))*parseFloat($("#cantp").val())).formatMoney(2,'.',','))

            if($("#valor_grabado:visible").length)
                $("#valor_grabado").focus().select();
            else{
                cargarUtilidad();
                $(".ven2:first").focus();
            }
        } 
            
    });

    $("#valor_grabado").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13)
            $(".ven2:first").focus();
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
            if (isNaN($(this).val().replace(/,/g,''))) {
                Materialize.toast('Valor no es Numérico',4000,'red')
                $(this).focus().select();
                return false;
            }
            var valor = $(this).val().replace(/,/g,'');
            $("#totp").val( (parseFloat(valor) * parseFloat($("#cantp").val())).formatMoney(2,'.',',') )
            $("#valores").data('elemento')['hprec'] = valor;
            $("#descup").select().focus();
            
            cargarUtilidad();
        }
    });

    $(document).on("click","[name=hasimpuesto]",function(){

        if($(this).attr('id') == 'exct'){
            $(".valor_grabado").addClass('hide');
            $("#valor_grabado").val(0);
            $("input:checkbox[name=hasimpuesto]").prop('checked',false);
            $(this).prop('checked',true);
        }else{
            if(!$(this).is(":checked")){
                $("input:checkbox[name=hasimpuesto]").prop('checked',false);
            }
            else{
                $("input:checkbox[name=hasimpuesto]").prop('checked',false);
                $(this).prop('checked',true);
                $(".valor_grabado").removeClass('hide');
                if(parseInt($("#valor_grabado").val()) == 0)
                $("#valor_grabado").val($("#valor_grabado").attr('orig'));
            }
        }
    });

    function cargarUtilidad(){
        var matriz = []
        var id = cganancia = 0;
        var descuentol = (1-(parseFloat($("#descup").val())/100));
        var idp = $("#valores").data('elemento') != undefined ? $("#valores").data('elemento')['idp'] : $("#ffacturas .zelda").data('margenes')['idp'];
        var tpmoneda = getDatos('idmoneda',11,'id = '+ idp ,0,0,0)[0][0][0];
        var tpdivisa = parseInt(tpmoneda) == parseInt($("#monedas").val()) ? 1 : parseFloat($("#monedas [value="+tpmoneda+"]").attr('dv'));
        var ncosto = (parseFloat($("#precp").val().replace(/,/g,''))*descuentol)/($("#iva").is(":checked") ? (parseFloat($("#valor_grabado").val())/100 +1): 1);

        $("#cos2").html(parseFloat(ncosto).formatMoney(2,'.',''));
        matriz['costo'] = $("#cos2").html();

        if(!$("#chgvalor").is(":checked")){
            $(".ven1").each(function(){
                id = $(this).parent().parent().attr('id').substr(1);
                cganancia = (parseFloat($("#n"+id+" .ven1").html())/($("#iva").is(":checked") ? (parseFloat($("#valor_grabado").val())/100 +1): 1)-ncosto);

                    $("#n"+id+" .gan2").val(ncosto == -1*cganancia ? '0.00' : ((cganancia*100)/ncosto).formatMoney(2,'.','')); 
                    $("#n"+id+" .gan2").attr('gn',cganancia);
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*($("#iva").is(":checked") ? (parseFloat($("#valor_grabado").val())/100 +1): 1)).formatMoney(2,'.',''));     
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
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*($("#iva").is(":checked") ? (parseFloat($("#valor_grabado").val())/100 +1): 1)).formatMoney(2,'.',''));
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
            $("#cantp").val(1).focus().select();
            $("#totp").val((parseFloat($(this).val().replace(/,/g,''))*1).formatMoney(2,'.',','))
        }
        
    });

    $(document).on("keyup","#precp",function(e){
         var code = e.which || e.keyCode;
         if (code == 13) {
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

    if ($(".trsec:hidden").length == 1)
        $(".trsec.hide-on-large-only").remove();
    else
       $(".trsec.hide-on-med-and-down").remove();

    $("#ingclie").click(function(){
        $("#modal-clientes").modal('open');
        $("#c-ced").focus();

        if (param.toString().match(new RegExp(/[23]/i))){
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
            // var isproveedor = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
            // searchClient($(this).val(),isproveedor);
            $(this).blur()
        }
    });

    $("#ncli").blur(function(){
        if ($(this).val().trim().length > 0) {
            var isproveedor = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
            searchClient($(this).val(),isproveedor);
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
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,gkeydown()+'bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) having nom like "%'+busqueda+'%" limit 20',0,0,0,1)
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
        desc = $("#edescuento").val();
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

function cargarFactura(vidp,asoc){
    var vfacturap = arr('login',6,'',163,vidp+',\"'+asoc+'\"',0,1,$("#fdetallefacturas"));
    idext = vidp;
    if($("#impm:visible").length){
        $("#codp").val('S-500').blur();
        var e = jQuery.Event("keyup");
            e.which = 13;
            $("#cantp").focus().trigger(e);
    }
    Materialize.updateTextFields();
}

function cargarFacturasNota(){
    var vcliente = $("#byclie").attr('cid');
    var vfactura = $("#byfact").val().trim().length ? $("#byfact").val() : 0;
    var str = '';
    var info = getDatos('concat(case idtipoventa when 1 then "F-" else "T-" end,lpad(consecutivo,6,0)),concat((select simbolo from monedas where id = idmoneda),format(subtotal+exento+imv-descuento,2)),date_format(fecha,"%d-%m-%Y"),datediff(curdate(),fecha) as dias,id',64,'id > 0 and if('+vcliente+' = 0,1,idcliente = '+vcliente+') and if("'+vfactura+'" = 0,1,consecutivo = "'+vfactura+'") and idtipoventa in(1,7,8) and idsucursal = @@impresa having dias <= 15',0,0,0);
  
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