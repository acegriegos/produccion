var param = '';
var config;

$(function(){
  param = getParameterByName('tf');
  param = param == '' || param == 1 ? 7 : parseInt(param) ;

  config = getDatos('if(p12 is null,0,1) as FE,isinventariado as INV,idtipofactura as FAC,fastshow as FS,printSale',39,'id = @@impresa',0,0)[0][0];

  $("#mfacturacion").html(mantenimiento('facturacion',1,param));

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
        var estado = param == 5 ? 5 : 1;

        setTimeout(function(){inicial.focus();},300);
         $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0,vidusuario:'', vidsucursal:'', videstado:estado, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0,vidtipopago : 0, vextrapagos : 0,vidodt:0,vdivisa : 0, saldo : 0, notific : 0});
    }else{
        var vidp = getParameterByName('id');
        var vfacturap = arr('login',6,'',163,vidp+',\"'+asoc+'\"',0,1,$("#fdetallefacturas"));
        var vfacturap2 = arr('login',4,'',163,vidp+',\"'+asoc+'\"',0,0,0);
        var vf = vfacturap2[0][0];
        $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:1, vid:0, vidsucursal:'',vidusuario:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:vf[2], vidcliente:vf[0], vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vidtipopago : 0, vidodt:0,vextrapagos : 0,vdivisa : 0, saldo : 0, notific : 0});
        var line = 0;
        var fimv = vfacturap2[0];
        $("#fdetallefacturas tr").each(function(){
            $(this).data('triforce',{vcantidad : vf[7],vidimpuestos : '',viddescuentos : '',vidunidad : vf[18]});
            // $(this).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:p, vcantidad:c, vprecio:r, hdesc:h,hdescm:m, vtotal:t, vidinventario:i,vidodt : 0,vcomodin:''});
            line += 1;
        });
        $(".zelda").data('triforce')['idline'] = line;
        searchClient(vf[1],vf[2]);
        setTimeout(function(){
            $("#ncli").val(vf[1]).blur();
        },200);
        Materialize.updateTextFields();
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
    $(".trsec:hidden").remove();

    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor");

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode
        if (code == 13) {
            var cant = isNaN($(this).val()) ? 0 : parseFloat($(this).val());
            if ( cant > 0) {
                $("#addline").click();
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });

    $("#addline").click(function(){
        if ($("#valores").data('elemento') == undefined) {
            $("#codp").focus();
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
        var desc = $("#descp").val();
        var hinv = 0;
        var unidad = $("#uni option:selected").html();//$("#valores").data('elemento')['hunidad'];
        var comodin = $("#valores").data('elemento')['hcomodin'];
        var desgloce = $("#valores").data('elemento')['isdesgloce'];
        var strimp = $("#valores").data('elemento')['strimp'];
        var exo = 0;//$("#valores").data('elemento')['vexo'];

        addline(idprd,cod,desc,cant,precio,total,cnti,dcs,mdcs,hinv,0,unidad,comodin,desgloce,strimp,exo);
    });

}//cargar ORDEN COMPRA

function cargarCompras(){
    $("#titfact").html("COMPRAS");
    $(".chg_tipo").attr('disabled',false);
    $("#vplazo").attr('disabled',false);

    $(".trCompra").removeClass('hide');
    $(".trsec:hidden").remove();
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
        $("#ecodprod").val($("#codp").val());
        $("#enomprod").val($("#descp").val());
        Materialize.updateTextFields();

        $("#fproductos .zelda").data('triforce',{vid:0,vcodigo:'', vcodigointerno:'',vnombre:'',vcosto:0,vganancia:0,vventa:0,vexoneracion:0, vpeso:0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:0,vidmoneda:1,vimg:'',vidsucursal:'',vidusuario:''});
        
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
        if (code == 13) 
            $("#addline").click()
    });

    $("#addline").click(function(){
        if ($("#valores").data('elemento') == undefined) {
            $("#codp").focus();
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
        var exo = 0;//$("#valores").data('elemento')['vexo'];
        
        addline(idprd,cod,desc,cant,precio,total,cnti,{iddescuento:0,descuento:$("#descup").val()},0,hinv,0, unidad, comodin,desgloce,strimp);
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
    $("#titfact").html("TIQUETES");

    $(".trVenta").removeClass('hide');
    $(".trsec:hidden").remove();

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
                var inv = $("#valores").data('elemento')['hinv'];

                var cnti = isNaN($("#cantI").html()) ? '∞': arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ idp+'" and idinventario = '+inv,'',0,'')[0][0][0];
             
                if (cant > cnti && config[1] == 1) {
                   Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red');
                }else if (cant <= cnti || cnti == '∞' || config[1] == 0) {
                    $("#addline").click()
                }
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
            }
        }
    });

    $("#addline").click(function(){
        if ($("#valores").data('elemento') == undefined) {
            $("#codp").focus();
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
        
        addline(idprd,cod,desc,cant,precio,total,cnti,dcs,mdcs,hinv,0, unidad, comodin,desgloce,strimp,exo);
    });

}//cargar VENTAS

function cargarResembled(vnombre) {
    $("#titfact").html(vnombre);

    $(".concre").addClass('hide');
    $("#vplazo").addClass('hide');
    $(".tp_all").addClass('hide');
}//cargar Resembled

function cargarGlobal(){
    var cons = param-1 == 0 ? 6 : param-1;
    var ncons = getDatos('lpad(consecutivo'+cons+'+1,6,0)',252,'idsucursal = @@impresa and id > 0',0,0)[0][0];
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

    $("#ingclie").click(function(){

//         $("#fclientes .zelda").data("triforce",{vaccion:'1',vid:'0',vapellido1:'',vapellido2:'',vnombre:'',vcedula:'',vidtipocliente:'',videstado:'1',vbisproveedor:'0',vidnivel:'',vcredito:'50000',vplazo:'30',videstadocontable:'0',vbisnacional:'1',vweb:'',vidusuario:'@@usr',vdescuentom:'5',vcodigo:'',vidcuenta:'0',vidsucursal:'@@impresa',_sid:'0'});
        
//         $("#addClie").modal('open')
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
       
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",1,@@impresa',0,0,0,1)
            })

            $("#descp").siblings($(".autocomplete-content")).css('width','100%');
        }
    });

    $("#codp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)
       
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            
            $(this).autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+busqueda+'",6,@@impresa',0,0,0,1)
            })

            $(this).siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $(".chg_tipo").change(function(){
        var value = parseInt($(this).attr('val'));
        $(".gen").addClass('hide');
        $(".zelda").data('triforce')['vidtipo'] = value;
        $(".zelda").data('triforce')['vidtipopago'] = 0;

        switch(value){
            case 1: //CREDITO
                $(".con").removeClass('hide');
                $(".zelda").data('triforce')['vidtipopago'] = $("#idtipopago").val();
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
            $(this).blur();
        }
    });

    $("#ncli").blur(function(){
        var isproveedor = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
        searchClient($(this).val(),isproveedor);
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
            $(".autocomplete-content").remove();
            console.log(arr('login',4,'nombre,null,2,',2,gkeydown()+'bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa))',0,0,0))
            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,gkeydown()+'bisproveedor and id > 0 and find_in_set(idsucursal,concat("-1,",@@impresa)) having nom like "%'+busqueda+'%" limit 20',0,0,0,1)
            });

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
        $("#codp").focus();           
    });

    $(document).on("click",".fedit",function(){
        var id = $(this).attr('id').substr(4);

        var tipo = getParameterByName('tf');
        var descuento = $("#fd"+id).data('triforce')['vdescuento'];
        $("#titmod").html($("#desc"+id).html());
        $("#hdnprd").val(id);
        $("#ecantidad").val($("#fd"+id).data('triforce')['vcantidad']);

        $("#edescuento").val(descuento);
        $("#eunitario").val($("#fd"+id).data('triforce')['vprecio']);

        switch(parseInt(tipo)){
            case 2:
                $(".eimp").removeClass('hide');
                break;
            default:
                $(".eunit").addClass('hide');
                $(".eimp").addClass('hide');
                $(".eexct").addClass('hide');
                break;
        }

        var entrada = $("#fd"+id).data('triforce')['videntrada'];
        var char1 = entrada.substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        if (param != 2)
            cargarDescuentos(entrada.substr(1)+',0',tabla,1,id);

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

    $(document).on("click","#editprod",function(){
        var id = $("#hdnprd").val();
        var cant,desc,prec,exo,unid = 0;
        cant = $("#ecantidad").val();
        desc = $("#edescuento").val();
        prec = $("#eunitario").val();
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
  
    if (config[2] == 1){
        $("#teclado").click();
        $("#p_v").attr('checked',false);
    }else{
        $("#barras").click();
        $("#p_v").attr('checked',true);
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