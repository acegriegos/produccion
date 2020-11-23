var param = '';
var config;
var idext = 0;
var pril;

$(function(){
  param = getParameterByName('tf');
  param = param == '' || param == 1 ? 7 : parseInt(param) ;

  config = getDatos('',42,'@@impresa',0,0)[0][0];
  if($(".per11:visible").length)
    config['tp_rest'] = getDatos('valor',809,'descr="SIC_TP"')[0][0][0];

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
            $(document).attr("title", "Facturacion-Compra");
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 3:
            cargarOCompras();
            $(document).attr("title", "Facturacion-Orden Compra");
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 4:
            cargarVentas();
            cargarResembled('PROFORMAS');
            $("#facturar").html('Generar');
            $("#crrclie").removeClass('hide').removeClass('clieBTN');
            $(document).attr("title", "Facturacion-Proformas");
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 5:
            cargarVentas();
            cargarResembled('PEDIDOS');
            $(document).attr("title", "Facturacion-Pedidos");
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 6:
            cargarVentas();
            $(document).attr("title", "Facturacion-Pre-Ventas");
            cargarResembled('PRE-VENTA');
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 9:
            //cargarFECompra();
            cargarResembled('COMPRA ELECTRONICA');
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 10:
            cargarVentas();
            $(document).attr("title", "Facturacion-Exportaciones");
            cargarResembled('EXPORTACION');
            $("#special").removeClass('per1110');
            $("#prefact").removeClass('per1111');
            break;
        case 100:
            $(document).attr("title", "Facturacion-Pago Sobre Adelanto");
            cargarVentas();
            cargarResembled('PAGO SOBRE ADELANTO');
            break;
        default:
            $(document).attr("title", "Facturacion-Ventas");
            cargarVentas();
            break;
    }

    pril = parseInt(config[11]) == 2 ? $("#descp") : $("#codp");; 
    cargarGlobal();

    var vidp = getParameterByName('id');

    if (vidp == '') {
        var estado = param == 5 ? 5 : 1;

        setTimeout(function(){inicial.focus();},300);
         $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:1,vidodt:0,vexonerado : 0,voc:'', idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vidagente:0,margenes:0,vterminal:config[26]});
    }else{
       cargarFactura(vidp,0);
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
    param = 104;

    var ncons = getDatos('lpad(consecutivo103+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
    $("#idfact").html(ncons);
    $("#facturar").html('Aceptar');

    $("#titfact").html("COMPRAS");
    $("[for=iva]").addClass('hide');

    $(".trCompra").removeClass('hide');
    $(".trsec.hide").remove();

    $(".isfast").addClass('hide');
    $("#ingclie").addClass('hide');

    $("#precp").attr('readonly',false);
    $("#ncli").attr('placeholder',"Nombre o Cédula del Proveedor");

    // $("#byprepo").change(function{
    //     $()
    //     if($(this).is(":checked")){

    //     }
    // });

    $("#cauto").change(function(){
        var tp = 1;
        $("#fdetallefacturas").html('');

        if($(this).is(':checked')){ //MANUAL
            $(".v104").removeClass('hide')
            param = 104;
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 104;
            var ncons = getDatos('lpad(consecutivo103+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];

            $(".numfact").removeClass('hide')
            $("#idfact").html(ncons);
            $("#precioscat").removeClass('hide');
            $("#vimpiva").val(8).material_select('update');

            $("#precp").attr('readonly',false);
            $("#ncli").prop('readonly',false);
            $("#vdescuentop").prop('readonly',false);
            $("#monedas").prop('disabled',false).material_select('update');
            $("#vcomentario").prop('readonly',false);

            $("#vreferencia").removeClass("fcompra");
            $("#vreferencia").attr('placeholder','Número de Referencia');
            $("#vreferencia").val('')
            $("#addliner").removeClass('hide');
            $("#ingclie").removeClass('hide');

            $("#docompra").unbind();
            $("#docompra").html('Facturar').attr('id','facturar');

            tp = 0;
            
        }else{ //AUTO

            $(".v104").addClass('hide')
            param = 2;
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 2;
            $("#idfact").html(0);

            $(".numfact").addClass('hide')
            $("#precioscat").addClass('hide');

            $("#ncli").val('').prop('readonly',true);
            $("#vdescuentop").val(0).prop('readonly',true);
            $("#monedas").prop('disabled',true).material_select('update');
            $("#vcomentario").val('').prop('readonly',true);

            $("#vreferencia").addClass("fcompra");
            $("#vreferencia").val('').focus();
            $("#vreferencia").attr('placeholder','Buscar Compra');
            $("#addliner").addClass('hide');
            $("#ingclie").addClass('hide');

            $("#facturar").html('Aceptar').attr('id','docompra');
            $("#docompra").click(function(){mdocompra()});
        }

        visualizarCompra(tp)
    });
    
    $("#celectronica").change(function(){
        $("#cauto").prop('checked',true).change();
        var tp = 0;

        if($("#celectronica").is(':checked')){
            param = 9
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 9;
            var ncons = getDatos('lpad(consecutivo8+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#idfact").html(ncons);
            $("#precioscat").addClass('hide');
            $("#vimpiva").val(1).material_select('update');

            $("#ncli").prop('readonly',false);
            $("#vdescuentop").prop('readonly',false);
            $("#monedas").prop('disabled',false).material_select('update');
            $("#vcomentario").prop('readonly',false);

            $("#vreferencia").removeAttr('readonly');
            $("#addliner").removeClass('hide');
            $("#ingclie").removeClass('hide');

            $("#docompra").unbind();
            $("#docompra").html('Facturar').attr('id','facturar');

            $("[for=cauto]").addClass('hide')
            $("[name=tcompra]").parent().removeClass('hide');
            tp = 2;

        }else{
            $("[for=cauto]").removeClass('hide')
            $("[name=tcompra]").parent().addClass('hide');
        }

        visualizarCompra(tp)
    });

    // $("#vreferencia").keyup(function(e){
    //     var code = e.which || e.keyCode;
    //     if (code == 13)
    //         $("#vfecha").focus();
    // });

    $(document).on("keyup",".fcompra",function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            var fct = getDatos('ifnull((select id from rfacturas where substring(referencia,32,10) = '+$(this).val()+'),0),ifnull((select id from tmpcompras where substring(referencia,32,10) = '+$(this).val()+'),0),ifnull((select id from facturas where substring(referencia,32,10) = '+$(this).val()+'),0)',0,'');

            if(fct[0][0][0] != "0"){
                if(fct[0][0][1] != "0" && fct[0][0][2] == "0"){
                    Materialize.toast('Factura sin Procesar',4000,'red');
                    $(this).focus().select()
                }
            }else{
                Materialize.toast('Factura No Existente',4000,'red');
                $(this).focus().select()
            }
        }
    });

    $(document).on("keydown",".fcompra",function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e)

        if (/[a-zA-Z0-9-_.&," ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : charStr == -1 ? $(this).val() : $(this).val()+charStr;
            var tipo = getParameterByName('tf');
            var id = $(this).parent().parent().attr('id')
            $(".autocomplete-content").remove();

            $(this).autocomplete({
                limit: 20,
                data: arr('login',4,'concat(truncate(substring(referencia,32,10),0),"-",(select nombre from clientes where id = facturas.idcliente)) as nombre,null',64,'idtipoventa = 2 and referencia and id not in(select idfactura from msfacturas where compraprocesada) having nombre like "%'+busqueda+'%"',0,0,0,1),
                onAutocomplete: function(val){
                    
                    var ref = val.substr(0,val.indexOf('-'));
                    var client = val.substr(val.indexOf('-')+1);

                    $("#ncli").val(client);
                    $("#vreferencia").val(ref);

                    var datos = getDatos('id,idcliente,truncate(substring(referencia,32,10),0) as ref,(select nombre from clientes where id = facturas.idcliente) as client',64,'truncate(substring(referencia,32,10),0) = '+ref+' having client = "'+client+'"');
                    var vidfact = datos[0][0][0];
                    $("#ffacturas .zelda").data('triforce')['vidcliente'] = datos[0][0][1];
                    $("#fdetallefacturas").html(mantenimiento('facturacion',11,{idfact:vidfact,idtp:1}));
                    $(".autocomplete").autocomplete();
                }
            })

            $(".autocomplete-content").css('min-width','700px').css('margin-top','5%');
        }
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
                        //$("#"+id).find('.costo').click();
                        $("#grp0").find('.vgan').focus().select()
                    }else{
                        $("#"+id).data('triforce')['videntrada'] = 0;
                        $("#"+id).find('.mdi-plus').removeClass('hide');
                        Materialize.toast('Producto no Existente',4000,'red');
                    }
                }
            })

            $(".autocomplete-content").css('max-width','250px').css('margin-top','5%');
        }
    });

    $(document).on("keyup",".eqprod",function(e){
        var code = e.which || e.keyCode;
        if(code == 13){
            $(this).blur();
        }
    })

    $(document).on("blur",".eqprod",function(e){
        var id = $(this).parent().parent().attr('id')
        var cod = arr('login',4,'',43,'"'+ $(this).val().replace(/"/g,"\\\"") +'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+$("#ffacturas .zelda").data('triforce')['vidtipoventa']+','+$("#invgeneral").val(),0,0,0);
        if (cod[0][0] != undefined) {
            $("#"+id).data('triforce')['videntrada'] = cod[0][0][0];
            $("#"+id).find('.mdi-plus').addClass('hide');
            $("#"+id).find('.costo').click();
            $("#grp0").find('.vgan').focus().select();
        }else{  
            $("#"+id).data('triforce')['videntrada'] = 0;
            $("#"+id).find('.mdi-plus').removeClass('hide');
            Materialize.toast('Producto no Existente',4000,'red')
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

    // $("#descup").keyup(function(e){
    //     var code = e.which || e.keyCode;
    //     if (code == 13){
    //             $(".addline").click();
    //     } 
            
    // });

    $("#descup").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13){
            $("#totp").val((parseFloat($("#precp").val().replace(/,/g,''))*(1-(parseFloat($(this).val())/100))*parseFloat($("#cantp").val())).formatMoney(2,'.',','))
            if($(".ven2:visible").length){
                cargarUtilidad();
                $(".ven2:first").focus();    
            }else{
                $(".addline").click();
            }
        } 
            
    });

    $("#vimpiva").change(function(){
        if ($(".ven2").length){
            cargarMargenes();
            $(".ven2:first").focus();
        }
    });

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

            if($(this).data('triforce')['videntrada'] == 0 && parseInt($(this).data('triforce')['vcantidad']) > 0){
                Materialize.toast('Artículo no Incluido',4000,'red')
                $(this).find('.eqprod').focus();
                cnt = 0;
                return false;
            }

        });

        if(!cnt)
            return false;

        $(this).prop('readonly',true);

        $("#fdetallefacturas .ciclos").each(function(){

            if(parseInt($(this).data('triforce')['vcantidad']) > 0){

                $(this).data('triforce')['exoneracion'] = parseFloat($(this).data('triforce')['exoneracion']).formatMoney(2,'.','');

                cant = parseFloat($(this).data('triforce')['vcantidad']);

                ppro = getDatos('id',104,'idproveedor = '+$("#ffacturas .zelda").data('triforce')['vidcliente']+' and idproducto = '+$(this).data('triforce')['videntrada'],0,0,0);

                if(ppro[0].length){
                    actualizar(104,'venta = '+$(this).data('triforce')['vprecio']+', ultimafecha = now()','id = '+ppro[0][0][0]);
                }else{
                    var cpp = $(this).data('triforce')['vcodigo'].length ? $(this).data('triforce')['vcodigo'] : $("#desc"+$(this).attr('id').substr(2)).html();

                    insertar(104,'','null,'+$(this).data('triforce')['videntrada']+','+$("#ffacturas .zelda").data('triforce')['vidcliente']+',"'+cpp+'",'+$(this).data('triforce')['vprecio']+',0,now(),1,0');
                }

                actualizar(97,'cantidad = cantidad+'+
                    $(this).data('triforce')['vcantidad'],'idproducto = '+$(this).data('triforce')['videntrada']);
                var cante = getDatos('cantidad',97,'idproducto =  '+$(this).data('triforce')['videntrada'],0,0,0);

                insertar(298,'','null,1,'+parseFloat($(this).data('triforce')['vcantidad'])+',now(),'+$(this).data('triforce')['videntrada']+',"",@@impresa,@@usr,'+cante[0][0][0]);

                var matriz = $(this).data('matriz');
                var indice = 0;

                while(matriz[indice]){

                    if(matriz[indice]['mventa']){
                        switch(parseInt(matriz[indice]['tipo'])){
                            case 0: //ACTUALIZAR COSTO-UTILIDAD-VENTA PROD BASE
                                
                                actualizar(11,'costo = '+$(this).data('triforce')['vprecio']+',ganancia='+matriz[indice]['mutilidad']+',timv='+$(this).data('triforce')['timv']+',exoneracion='+$(this).data('triforce')['exoneracion']+',venta = '+matriz[indice]['mventaiva'],'id = '+$(this).data('triforce')['videntrada']);
                                break;
                            default: //ACTUALZAR UTILIDAD-VENTA NIVEL PRODUCTOS
                                if(parseInt(matriz[indice]['id']))
                                    actualizar(105,'ganancia='+matriz[indice]['mutilidad']+',exoneracion='+$(this).data('triforce')['exoneracion']+',venta = '+matriz[indice]['mventaiva'],'id = '+matriz[indice]['id']);
                                else
                                    insertar(105,'','null,'+matriz[indice]['tipo']+','+$(this).data('triforce')['videntrada']+','+matriz[indice]['nsub']+','+matriz[indice]['mutilidad']+','+$(this).data('triforce')['exoneracion']+','+matriz[indice]['mventaiva'] );
                                break;
                        }
                    }
                    indice += 1;
                }
            }

            if(parseInt($(this).data('triforce')['vidnota'])){
                console.log(actualizar(333,'nota="'+$(this).data('triforce')['vnota']+'"','id = '+$(this).data('triforce')['vidnota']))
            }else{
                if($(this).data('triforce')['vnota'] != ''){
                    console.log(insertar(333,'','null,11,'+$(this).data('triforce')['videntrada']+',"'+$(this).data('triforce')['vnota']+'",now(),@@usr,@@impresa,1'))
                }
            }
        });

        insertar(291,'idfactura,compraprocesada',$("#fd1").data('triforce')['vidfactura']+',1');


        if(cnt){
            Materialize.toast('Artículos Incluidos',4000,'green');

            setTimeout(function(){
                location.reload();
            },4000);
        }
    };

    $(document).on("blur","#vnotas",function(){
        $("#"+$("#marbdy").attr('fd')).data('triforce')['vnota'] = $(this).val();
    });

    $(document).on("click",".costo",function(e){
        if(parseInt($(this).parent().parent().data('triforce')['videntrada']) == 0){
            Materialize.toast('Artículo no Enlazado',4000,'red');
            return false;
        }

        var prod = getDatos('',297,$(this).parent().parent().data('triforce')['videntrada']+','+$(this).parent().parent().data('triforce')['longitud'],0,0,0);
        //$(this).parent().parent().data('triforce')['videntrada']+','+$(this).parent().parent().data('triforce')['longitud'];
        var str = '';
        if(prod[0].length){
            var fd = $(this).parent().parent().attr('id');
            if($("#"+fd).data('matriz') == undefined)
                $("#"+fd).data('matriz',{})

            var cst = parseFloat($(this).parent().parent().data('triforce')['vprecio']);
            var cstold = parseFloat(prod[0][0][1]);
            var ddif = cst - cstold;
            var color = 'black';
            var icon = '';
            var miva = $(this).parent().parent().data('triforce')['exoneracion'];

            if(ddif > 0){
                //AUMENTO EL COSTO
                color = 'red';
                icon = 'mdi-arrow-up';
            }else if(ddif < 0){
                color = 'green';
                icon = 'mdi-arrow-down';
                ddif = ddif*-1
            }
            var utlnew = $("#"+fd).data('matriz')[0] == undefined ? prod[0][0][3] : $("#"+fd).data('matriz')[0]['mventa'];
            var perrcent = ''
            if(cstold > 0){
                perrcent = ((ddif*100)/cstold).formatMoney(2,'.',',')+'%';
            }
            var sel = $(this).parent().parent().data('triforce')['vidunidad'] == "1" ? 'selected' : '';
            var optund = '<option value="1" '+sel+'>UNID</option>';
            var lntxt = '';

            if(prod[0][0][19] != "1"){
                sel = $(this).parent().parent().data('triforce')['vidunidad'] == "8" ? 'selected' : '';
                lntxt = '<span style="float: right;"><b>Longitud:</b> 1 Un = '+prod[0][0][19]+'m</span>';
                optund += '<option value="2" '+sel+'>METROS</option>';
                // $(this).parent().parent().data('triforce')['vcantidad'] = parseFloat($(this).parent().parent().data('triforce')['vcantidad'])*$(this).parent().parent().data('triforce')['rcant'] == "0" ? parseFloat(prod[0][0][19]) : $(this).parent().parent().data('triforce')['vcantidad'];
                // $(this).parent().parent().data('triforce')['tcu'] = "2"
            }

            str += '<span><b>COSTOS</b></span> '+lntxt+' <br>'+cstold.formatMoney(2,'.',',')+' => <span id="cst">'+cst.formatMoney(2,'.',',') + '</span> <span style="color:'+color+';border-left:1px solid black;padding-left:2%;" id="perg"><i class="mdi '+icon+'" id="icong"></i> <span id="perrcent">'+perrcent+'</span> (<span id="ddif">'+ddif.formatMoney(2,'.',',')+'</span>) <input type="checkbox" id="prep"> <label for="prep" title="Preponderar Precio">PRD</label></span> <span style="float: right;"><b>Cantidad Actual:</b> '+prod[0][0][23]+'Un</span> <br> <table> <tr> <td style="width:20% !important;"><b>EQUIVALENCIA</b></td> <td style="width:50% !important;"><input id="equiv" type="number" class="browser-default eder" value="" style="border: 0px;height:auto !important;width: 100%;"/></td> <td style="width:20% !important;"><select id="optund" class="browser-default" style="height:auto;">'+optund+'</select></td> </tr> <tr> <td style="width:20% !important;"><b>ENTRADA</b></td> <td style="width:50% !important;"><input id="centrada" type="number" class="browser-default eder" value="'+$(this).parent().parent().data('triforce')['vcantidad']+'" style="border: 0px;height:auto !important;width: 100%;"/></td> <td style="width:20% !important;"><select id="optund_" class="browser-default" style="height:auto;">'+optund+'</select></td> </tr> </table> <br> <div id="gruposmargen" style="max-height: 255px; overflow-y: auto"></div>';

            $("#marbdy").html(str).attr('cst',cst).attr('miva',miva).attr('fd',fd).attr('lno',prod[0][0][19]).attr('oldcst',prod[0][0][1]);
            
            var equivalencia = $(this).parent().parent().data('triforce')['requiv'] == "0" ? 1 : $(this).parent().parent().data('triforce')['requiv']; 

            $("#equiv").val(equivalencia)
            $(this).parent().parent().data('triforce')['requiv'] = equivalencia;
            $(this).parent().parent().data('triforce')['vlong'] = prod[0][0][19];

            // $("#optund").val($(this).parent().parent().data('triforce')['teu'])
            // $("#optund_").val($(this).parent().parent().data('triforce')['tcu'])

            $("#gruposmargen").html('<div class="_row" style="margen:0px;"> <div class="_col s12"> <b>PUBLICO</b> <small id="lgrp0"></small> <hr> <table id="grp0" tipo="0" gid="0" indice="0" lon="1" nsub="0"> <tr> <td style="width:20% !important;">Utilidad</td> <td style="width:20% !important;text-align:right;"><span class="voldgan">'+parseFloat(prod[0][0][5]).formatMoney(0)+'</span></td> <td style="width:5% !important;">=> </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vgan gchange" cc="2" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr>  <tr> <td style="width:20% !important;">Venta</td> <td style="width:20% !important;text-align:right;"><span class="voldbruta">'+parseFloat(prod[0][0][3]).formatMoney(0)+'</span></td> <td style="width:5% !important;"> => </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vbruta gchange" cc="1" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr>  <tr> <td style="width:20% !important;">Venta+IVA</td> <td style="width:20% !important;text-align:right;"><span class="voldneta">'+parseFloat(prod[0][0][4]).formatMoney(0)+'</span></td> <td style="width:5% !important;"> => </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vneta gchange" cc="3" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr> </table> </div>')

            cargarcosto(0,1);
            var indx = 1;
            for (var i = 0; i < prod[0].length; i++) {

                if(prod[0][i][8]){
                    utlnew = $("#"+fd).data('matriz')[(indx)] == undefined ? prod[0][i][10] : $("#"+fd).data('matriz')[(indx)]['mventa'];

                   $("#gruposmargen").append('<br> <div class="col s6"><b>'+prod[0][i][8]+'</b> <small id="lgrp0"></small> <hr> <table id="grp'+(indx)+'" tipo="'+prod[0][i][6]+'" gid="'+prod[0][i][7]+'" indice="'+indx+'" lon="'+prod[0][i][13]+'" nsub="'+prod[0][i][14]+'"> <tr> <td style="width:20% !important;">Utilidad</td> <td style="width:20% !important;text-align:right;"><span class="voldgan">'+parseFloat(prod[0][i][12]).formatMoney(0)+'</span></td> <td style="width:5% !important;"> => </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vgan gchange" cc="2" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr>  <tr> <td style="width:20% !important;">Venta</td> <td style="width:20% !important;text-align:right;"><span class="voldbruta">'+parseFloat(prod[0][i][10]).formatMoney(0)+'</span></td> <td style="width:5% !important;"> => </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vbruta gchange" cc="1" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr>  <tr> <td style="width:20% !important;">Venta+IVA</td> <td style="width:20% !important;text-align:right;"><span class="voldneta">'+parseFloat(prod[0][i][11]).formatMoney(0)+'</span></td> <td style="width:5% !important;"> => </td> <td style="width:20% !important;"><input type="number" class="browser-default eder vneta gchange" cc="3" value="'+utlnew+'" style="border: 0px;height:auto !important;width: 100%;"/></td> </tr> </table> </div>');

                   cargarcosto(indx,1);
                   indx += 1;
               }
            }

            $("#gruposmargen").append('</div>');
        }
        

        $("#openmargen").sideNav('show');
        $("#grp0").find('.vgan').focus().select();

        if($(this).parent().parent().data('triforce')['vidnota'] != undefined){
            prod[0][0][20] = $(this).parent().parent().data('triforce')['vnota'];
        }else{
            $(this).parent().parent().data('triforce')['vnota'] = prod[0][0][20];
            $(this).parent().parent().data('triforce')['vidnota'] = prod[0][0][22];    
        }
        

        $("#marbdy").append('<br> <label><b>Última Compra</b></label> <table><tr> <td style="width:50%"><b>PROVEEDOR</b></td> <td style="width:35%"><b>FECHA</b></td> <td style="width:5%"><b>CANT</b></td> <td style="width:5%"><b>VALOR</b></td> </tr> <tr> <td title="'+prod[0][0][15]+'">'+prod[0][0][18]+'</td> <td>'+prod[0][0][16]+'</td> <td style="text-align: center">'+prod[0][0][17]+'</td> <td style="text-align: center">'+prod[0][0][21]+'</td> </tr> </table>  <br> <label><b>NOTAS</b></label> <br> <textarea id="vnotas" maxlength="100">'+prod[0][0][20]+'</textarea> ')
    });

    $(document).on('click','.divcnt',function(){
        var padre = $(this).parent();
        if($(this).html() != '0'){
            padre.data('triforce')['vcantidad'] = 0;
            padre.find(".costo").addClass('hide');
            $(this).html(0).css('cursor','default');
        }else{
            padre.data('triforce')['vcantidad'] = padre.data('triforce')['ocant'];
            padre.find(".costo").removeClass('hide');
            $(this).html(padre.data('triforce')['ocant']).css('cursor','no-drop');
        }
    });

    $(document).on('keyup','.gchange',function(e){
        var code = e.wich || e.keyCode;
        if(code == 13)
            $(this).blur()
    });

    $(document).on('blur','.gchange',function(e){
        cargarcosto($(this).parent().parent().parent().parent().attr('id').substr(3),$(this).attr('cc'))
    });

    $(document).on('change','#optund',function(){
        $("#equiv").blur();
        if($('option:selected',this).val() != 1 && $("#optund_ option:selected").val() != 1){
            $("#centrada").val(1)
        }
    });

    $(document).on('change','#optund_',function(){
        var valor = $("option:selected",this).val();
        var nvalor = parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['vcantidad']);

        if(valor == 1){
            nvalor = nvalor/parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['vlong']);
        }else{
            nvalor = nvalor;
        }
        $("#centrada").val(nvalor)
    });

    $(document).on('blur','#centrada',function(){
        if(isNaN($(this).val())){
            Materialize.toast('Valor Debe ser Numerico',4000,'red')
            return false;
        }
        if(parseFloat($(this).val()) <= 0){
            Materialize.toast('Valor Debe ser Mayor a Cero',4000,'red')
            return false;
        }
        $("#"+$("#marbdy").attr('fd')).data('triforce')['vcantidad'] = $(this).val()
    });

    $(document).on('keyup','#equiv',function(e){
        var code = e.which || e.keyCode
        if(code == 13)
            $(this).blur();
    });

    $(document).on('blur','#equiv',function(){
        if(isNaN($(this).val()))
            $(this).val(1)

        if(parseFloat($(this).val()) <= 0)
            $(this).val(1)

        var equiv = $(this).val();
        var eu = $("#optund option:selected").val();
        var cu = $("#optund_ option:selected").val();
        var ecant = equiv;

        $("#"+$("#marbdy").attr('fd')).data('triforce')['requiv'] = equiv;

        if(eu=="2"){
            $("#"+$("#marbdy").attr('fd')).data('triforce')['teu'] = 2;
            equiv = equiv*parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['vlong'])
        }else{
            $("#"+$("#marbdy").attr('fd')).data('triforce')['teu'] = 1;
        }

        ecant = cu == "1" ? ecant : equiv;
        $("#centrada").val(ecant);
        $("#"+$("#marbdy").attr('fd')).data('triforce')['vcantidad'] = equiv;

        var rcosto = (parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['original'])/parseFloat($(this).val()))
        var ln =  $("#optund option:selected").val() == 1 ? 1 : parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['vlong']);
        
        rcosto = rcosto*ln;
        $("#"+$("#marbdy").attr('fd')).data('triforce')['vprecio'] = rcosto;
        $("#cst").html(rcosto.formatMoney(2,'.',','))
        $("#marbdy").attr('cst',rcosto)
        cambiarUtilidades();
        resizecosto();
    });

    function visualizarCompra(tipo){
        // switch(parseInt(tipo)){
        //     case 1:
        //         $('.afact').removeClass('hide');
        //         $('.mfact').addClass('hide');
        //         $("#cuerpo").css('width','100%')
        //         break;
        //     default:
        //         $('.afact').addClass('hide')
        //         $('.mfact').removeClass('hide')
        //         $("#cuerpo").css('width','75%')
        //         break;
        // }
        totalizar();
    }

    function cambiarUtilidades(){
        $("[id^='grp'").each(function(){
            cargarcosto($(this).attr('id').substr(3),1)
        })
    }

    function resizecosto(){
        var cst = parseFloat($("#"+$("#marbdy").attr('fd')).data('triforce')['vprecio']);

        var cstold = parseFloat($("#marbdy").attr('oldcst'))
        var ddif = cst - cstold;
        var color = 'black';
        var icon = '';
        var perrcent = '';

        if(ddif > 0){
            //AUMENTO EL COSTO
            color = 'red';
            icon = 'mdi-arrow-up';
        }else if(ddif < 0){
            color = 'green';
            icon = 'mdi-arrow-down';
            ddif = ddif*-1
        }
        if(cstold > 0){
            perrcent = ((ddif*100)/cstold).formatMoney(2,'.',',')+'%';
        }

        $("#perg").css('color',color);
        $("#icong").attr('class','mdi '+icon);
        $("#ddif").html(ddif.formatMoney(2,'.',','))
        $("#perrcent").html(perrcent)
    }

    function cargarcosto(vgrupo,bytipo){
        var venta = parseFloat($("#grp"+vgrupo).find('.voldbruta').html().replace(/,/g,''))
        var ganan = parseFloat($("#grp"+vgrupo).find('.voldgan').html().replace(/,/g,''))
        var viva = parseFloat($("#grp"+vgrupo).find('.voldneta').html().replace(/,/g,''))

        var nventa = nganan =  nviva = nporcent = 0;
        var tmp = 0;
        iva = parseFloat($("#marbdy").attr('miva'));
        var shlon = parseFloat($("#equiv").val()); 
        var vlon = parseFloat($("#grp"+vgrupo).attr('lon'))
        var vcosto = parseFloat($("#marbdy").attr('cst'))/parseFloat(vlon);
        
        switch(parseInt(bytipo)){
            case 1: //BY VENTA
                tmp = parseFloat($("#grp"+vgrupo).find('.vbruta').val().replace(/,/g,''));
                nganan = tmp -vcosto;
                nventa = tmp;
                nviva = nventa*((iva/100)+1);
                nporcent = (nganan*100)/vcosto;
                break;
            case 2: //BY GANANCIA
                tmp =  parseFloat($("#grp"+vgrupo).find('.vgan').val().replace(/,/g,''));
                nganan = vcosto*(tmp/100);
                nventa = vcosto+nganan;
                nviva = nventa*((iva/100)+1);
                nporcent = tmp;
                break;
            case 3 : //BY VENTA +IVA
                tmp = parseFloat($("#grp"+vgrupo).find('.vneta').val().replace(/,/g,''));
                nviva = tmp;
                tmp = tmp/((iva/100)+1);
                nganan = tmp -vcosto;
                nventa = tmp;
                nporcent = (nganan*100)/vcosto;
                break;
            default:
                break;
        }

        var color = 'black';

        if(nventa.toFixed(0) < venta.toFixed(0)) 
            color = 'red'
        else if(nventa.toFixed(0) > venta.toFixed(0))
            color = 'green';

        $("#grp"+vgrupo).find('.vbruta').val(nventa.formatMoney(2,'.','')).css('color',color);

        if(parseFloat(nganan.toFixed(2)) < parseFloat(ganan.toFixed(2))) 
            color = 'red'
        else if(nganan.toFixed(2) > ganan.toFixed(2))
            color = 'green';

        $("#grp"+vgrupo).find('.vgan').val(nporcent.formatMoney(2,'.','')).css('color',color);

        //console.log(nviva.toFixed(0)+' '+ viva.toFixed(0))
        if(nviva.toFixed(0) < viva.toFixed(0)) 
            color = 'red'
        else if(nviva.toFixed(0) > viva.toFixed(0))
            color = 'green';

        $("#grp"+vgrupo).find('.vneta').val(nviva.formatMoney(2,'.','')).css('color',color); 
        var mtz = {};

        mtz = {tipo:$("#grp"+vgrupo).attr('tipo'),id:$("#grp"+vgrupo).attr('gid'),mutilidad:nganan,mporcentaje:nporcent,mventa:nventa,mventaiva:nviva,nsub:$("#grp"+vgrupo).attr('nsub'),notas:''}
        
        if($("#"+$("#marbdy").attr('fd')).data('matriz')[$("#grp"+vgrupo).attr('indice')] == undefined)
                $("#"+$("#marbdy").attr('fd')).data('matriz')[$("#grp"+vgrupo).attr('indice')] = {}
        $("#"+$("#marbdy").attr('fd')).data('matriz')[$("#grp"+vgrupo).attr('indice')] = mtz;     
    }

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

    // $("#precp").keyup(function(e){
    //     var code = e.which || e.keyCode;
    //     if (code == 13) {
    //         if (isNaN($(this).val().replace(/,/g,''))) {
    //             Materialize.toast('Valor no es Numérico',4000,'red')
    //             $(this).focus().select();
    //             return false;
    //         }
    //         var valor = $(this).val().replace(/,/g,'');
    //         $("#totp").val( (parseFloat(valor) * parseFloat($("#cantp").val())).formatMoney(2,'.',',') )
    //         $("#valores").data('elemento')['hprec'] = valor;
    //         $("#descup").select().focus();
    //     }
    // });

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

    function cargarUtilidad(){
        var matriz = []
        var id = cganancia = 0;
        var descuentol = (1-(parseFloat($("#descup").val())/100));
        var idp = $("#valores").data('elemento') != undefined ? $("#valores").data('elemento')['idp'] : $("#ffacturas .zelda").data('margenes')['idp'];
        var tpmoneda = getDatos('idmoneda',11,'id = '+ idp ,0,0,0)[0][0][0];
        var tpdivisa = parseInt(tpmoneda) == parseInt($("#monedas").val()) ? 1 : parseFloat($("#monedas [value="+tpmoneda+"]").attr('dv'));
        var ncosto = (parseFloat($("#precp").val().replace(/,/g,''))*descuentol);

        $("#cos2").html(parseFloat(ncosto).formatMoney(2,'.',''));
        matriz['costo'] = $("#cos2").html();

        if(!$("#chgvalor").is(":checked")){
            $(".ven1").each(function(){
                id = $(this).parent().parent().attr('id').substr(1);
                cganancia = (parseFloat($("#n"+id+" .ven1").html())/(parseFloat($("#vimpiva option:selected").attr('num'))/100 +1))-ncosto;
                    $("#n"+id+" .gan2").val(ncosto == -1*cganancia ? '0.00' : ((cganancia*100)/ncosto).formatMoney(2,'.','')); 
                    $("#n"+id+" .gan2").attr('gn',cganancia);
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*(parseFloat($("#vimpiva option:selected").attr('num'))/100 +1)).formatMoney(2,'.',''));     
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

                if(cganancia){
                    $("#n"+id+" .gan2").val(((cganancia*100)/ncosto).formatMoney(2,'.','')); 
                    $("#n"+id+" .gan2").attr('gn',cganancia);
                    $("#n"+id+" .ven2").val(((ncosto+cganancia)*(parseFloat($("#vimpiva option:selected").attr('num'))/100 +1)).formatMoney(2,'.',''));
                    matriz[id] = {}
                    matriz[id][0] = $("#n"+id+" .ven2").val()
                    matriz[id][1] = $("#n"+id+" .gan2").val()
                    matriz[id][2] = $("#n"+id+" .gan2").attr('gn');
                    matriz[id][3] = id; 
                    matriz[id][4] = ncosto;    
                }
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
       $(".ven2").focus()
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
                if (cant > cnti && comodin == '' && param.toString().match(new RegExp(/\b1\b|\b5\b|\b7\b|\b8\b/g)) && parseInt(isi)) {
                   Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red');
                }else if (cant <= cnti || cnti == '∞' || !parseInt(isi) || comodin != '' || param.toString().match(new RegExp(/\b2\b|\b3\b|\b4\b|\b104\b/g))) {
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

        if (param.toString().match(new RegExp(/\b2\b|\b3\b|\b9\b|\b104\b/g))){
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
            var isproveedor = param.toString().match(new RegExp(/\b104\b|\b3\b|\b9\b/g)) ? 1 : 0;
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

        $("#pvs").prop('checked',true).change();
        
        $("#modal-producto").modal('open');
        $("#vcodigo").focus()
        $(this).parent().parent().hide();

        $("#pmoneda").val($("#monedas").val()).prop('disabled',false).material_select('update');
        $("#pimv").prop('disabled',false).material_select('update')
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
            if(param != 2)
                totalizar();
        }
    });

}//cargar GLOBAL

function gkeydown(){
    return param.toString().match(new RegExp(/\b104\b|\b3\b|\b9\b/g)) ? '' : '!';
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

    if($(".per11:visible").length){
        $(".order").removeClass('hide');
    }
    
    var vfacturap = arr('login',6,'',163,vidp,0,1,$("#fdetallefacturas"));
    if(parseInt(asoc) == 1)
        var facturah = getDatos('if(comodin <> "",comodin,(select nombre from clientes where id = idcliente)),idcliente,consecutivo,referencia',261,'id=-1*'+vidp);
    else
        var facturah = getDatos('if(comodin <> "",comodin,(select nombre from clientes where id = idcliente)),idcliente,consecutivo,referencia',64,'id='+vidp);
    
    facturah = facturah.length ? facturah[0][0] : '';
    if(facturah[1] == '0' && facturah[0] != '')
        $("#ncli").val(facturah[0]);
    
    $("#vreferencia").val(facturah[3]);

    idext = vidp;

    if($("#prefact:visible").length){
        $("#prefact").attr('vid',parseInt(vidp)*-1)
        $("#prefact").css('background-color','red !important')
        $("#prefact").html('PRE-FACTURA #'+facturah[2])
    }

    // $("#ffacturas .zelda").data('triforce')['vterminal'] = config[26];
    Materialize.updateTextFields();
}

function cargarFacturasNota(){
    var vcliente = $("#byclie").attr('cid');
    var vfactura = $("#byfact").val().trim().length ? $("#byfact").val() : 0;
    var str = '';
    var info = getDatos('concat(case idtipoventa when 1 then "F-" when 8 then "S-" when 10 then "E-" else "T-" end,lpad(consecutivo,10,0)) as consecutivo,subtotal+exento+imv-descuento+exonerado as vorig,date_format(fecha,"%d-%m-%Y"),datediff(curdate(),fecha) as dias,id,getSaldoFact(id) as actu,(select simbolo from monedas where id = idmoneda),idmoneda,divisa',64,'id > 0 and if('+vcliente+' = 0,1,idcliente = '+vcliente+') and if("'+vfactura+'" = 0,1,consecutivo = "'+vfactura+'") and idtipoventa in(1,7,8,10) and idsucursal = @@impresa having /*dias <= 15 and*/ actu > 0',0,0,0);
 
    $("#listafacturas").html('');
    if (info.succed) {
        for (var i = 0; i < info[0].length; i++) {
            str += '<tr class="detalle" id="h'+info[0][i][4]+'" debe="'+info[0][i][1]+'" haber="'+(parseFloat(info[0][i][1])-parseFloat(info[0][i][3]))+'" moneda="'+info[0][i][7]+'" divisa="'+info[0][i][8]+'" style="cursor:pointer"><td></td><td>'+info[0][i][0]+'</td><td>'+info[0][i][6]+parseFloat(info[0][i][1]).formatMoney(2,'.',',')+'</td><td>'+info[0][i][6]+parseFloat(info[0][i][5]).formatMoney(2,'.',',')+'</td><td>'+info[0][i][2]+'</td></tr>';
        }
        $("#listafacturas").html(str);
    }else{
        $("#listafacturas").html('<tr><td colspan="3" align="center" >No hay Facturas Disponibles</td></tr>');
    }
}