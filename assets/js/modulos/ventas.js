var w;
var str_correos = '';
var tmp_correos = '';
var str_dev = '';
var str_camb = '';
var punidad = 0;
var imprimir = 1;

$(window).keydown(function(e){
    var code = e.wich || e.keyCode

    switch(code){
        case 118: //PRODUCT LIST
            $("#lproductos").click();
            break;
        case 119:
            $("#prefact").click();
            return false;
            break;
        default:
            break;
    }       
        
});

$(function(){
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});
    $('.dropdown-button').dropdown();
    $('#vcomentario').characterCounter();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    // if(parseInt(config[3])){
    //     Materialize.toast('<span>Estimado Usuario APSY le informa que sus Credenciales de Factura Electronica son Incorrectos </span> <a href="ajustes" class="btn" style="float:right"> Actualizar</a>','red','red');
    //     $("#facturar").attr('disabled',true);
    // }

    if(config[28] != '0' && config[28] != '-1')
        Materialize.toast('<span>Estimado Usuario APSY le informa que su LLAVE CRIPTOGRAFICA vence el '+config[28]+',<br> Favor proceder actualizar </span> <a href="ajustes" class="btn" style="float:right"> Actualizar</a> <i class="mdi mdi-close pbtn closetoast" style="float:right"></i>','red','red');

    cargarImpuestos(0,'11,2');
    cargarDescuentos(0,'2',undefined,1);

    $("#lproductos").click(function(){
        $("#modal-productos").modal('open');
        $("#bproductos").val($("#descp").val()).focus().select().keyup();
    });

    $("#ldevolucion").click(function(){
        $("#modal-devoluciones").modal('open');
        $("#byfact").focus();
    });

    $("#bproductos").keyup(function(e){
        var charCode = e.which;
        var charStr = keysight(e);

        if ((/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) && $(this).val().trim().length > 1) {
            var data = getDatos('',6,'"'+$("#bproductos").val()+'",9,@@impresa',0,0,0);
            $("#bdylproductos").html('');

            if (data['succed']) {
                var strp = '';
                for (var i = 0; i < data[0].length; i++) {
                    strp += '<tr> <td><input type="radio" name="chekme" id="cp'+data[0][i][0]+'"> <label for="cp'+data[0][i][0]+'"></label></td> <td id="cl'+data[0][i][0]+'">'+data[0][i][1]+'</td> <td>'+data[0][i][2]+'</td> <td>'+data[0][i][3]+'</td> <td>'+data[0][i][6]+'</td> <td>'+data[0][i][7]+'</td> </tr>';
                }
                if (strp == '') {
                    strp = strp = '<tr><td colspan="8" align="center">No Hay Productos</td> </tr>';
                }
            }else{
                strp = '<tr><td colspan="8" align="center">No Hay Productos</td> </tr>';
            }

            $("#bdylproductos").html(strp);
        }else{
            if($(this).val().trim().length <= 2)
                $("#bdylproductos").html('');
        }
    });

    $("#mstprod").click(function(){
        $("#codp").val($("#cl"+$('[name="chekme"]:checked').attr('id').substr(2)).html()).blur();
    });

    $(".optns").click(function(){
        $(".finmanual").removeClass('hide');
    });

    $("#codp").keyup(function(e){
        var code = e.which || e.keyCode;
        var ciclos = parseInt($(".ciclos").length);

        if (code == 13 && ciclos > 0  && $(this).val() == '' && !param.toString().match(new RegExp(/\b2\b|\b104\b|\b9\b/g))){
            $("#facturar").click();
        }

        if (code == 13) {
            $(this).blur();
        }
    });
    
    $("#addclie").click(function(){
        if($("#slideCorreo").data('fila1') == undefined){
            Materialize.toast('Correo sin Asignar',4000,'red');
            $("#slideCorreo").click();
            return false;
        }
        if(param == 9 && parseInt($("#slideDireccion").data('idbarrio')) == 0){
             Materialize.toast('Ubicacion sin Asignar',4000,'red');
            $("#slideDireccion").click();
            return false;
        }
        if(isNaN($("#c-dias").val())){
            Materialize.toast('Valor no Numérico',4000,'red');
            $("#c-dias").focus().select();
            return false;
        }
        if(isNaN($("#c-max").val())){
            Materialize.toast('Valor no Numérico',4000,'red');
            $("#c-max").focus().select();
            return false;
        }
        if(parseInt($("#c-dias").val()) <= 0 && $("#c-dias").is(":visible")){
            Materialize.toast('Valor Debe ser Mayor a Cero(0)',4000,'red');
            $("#c-dias").focus().select();
            return false;
        }

        var isprov = param.toString().match(new RegExp(/\b2\b|\b3\b|\b9\b|\b104\b/g)) ? 1 : 0;

        var pr = getDatos('',172,'1,0,"","","'+$("#c-nom").val()+'","'+$("#c-ced").val()+'",'+$("#c-nom").attr('tipo')+',1,'+isprov+',0,'+$("#c-max").val()+','+$("#c-dias").val()+',0,1,"",@@usr,0,"",0,@@impresa,@id,1,0,0,""',0,0,0);

        if(guardarSlide(1,pr,2)){
            Materialize.toast('Cliente Agregado Exitosamente',4000,'green');
            $("#ncli").val($("#c-nom").val()+' *'+$("#c-ced").val()+'*');
            $("#slideDireccion").data('idbarrio',0);
            $("#slideDireccion").data('direccion','');
            $(".c-st").addClass('hide');
            $("#c-ced").val('');
            ind_2 = 0;
            ind_1 = 0;
            $("#modal-clientes").modal('close');
            $("#ncli").focus();
            var e = jQuery.Event("keyup");
            e.which = 13;
            $("#ncli").trigger(e);
        }
        
    });

    $("#special").click(function(){
        if(parseInt($("#ffacturas .zelda").data('triforce')['vidtipoventa']) != 8){
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 8;
            var ncons = getDatos('lpad(consecutivo7+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#titfact").html('ESPECIAL')
            $("#idfact").html(ncons);
            param = 8;
        }else{
            if(parseInt($("#ffacturas .zelda").data('triforce')['vidcliente']) > 0){
                $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 1;
                var ncons = getDatos('lpad(consecutivo+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
                $("#titfact").html('FACTURAS')
                $("#idfact").html(ncons);
                parem = 1;
            }else{
                $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 7;
                var ncons = getDatos('lpad(consecutivo7+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
                $("#titfact").html('TIQUETES')
                $("#idfact").html(ncons);
                param = 7;
            }
        }
    });

    $("#codp").blur(function(){
        var iscomodin = $("#valores").data("elemento") == undefined ? 0 : $("#valores").data("elemento")['ncomodin'];

        if (!iscomodin)
            cargarProducto($(this).val(),$(this));
        else{
            $("#valores").data("elemento")['ncomodin'] = 0;
            $("#valores").data("elemento")['hcomodin'] = "^"+$(this).val()+"^";
            endCargarProducto($("#valores").data("elemento")['exo'],0);
        }
    });

    $("#descp").blur(function(){
        var iscomodin = $("#valores").data("elemento") == undefined ? 0 : $("#valores").data("elemento")['ncomodin'];

        if (!iscomodin)
            cargarProducto($(this).val(),$(this));
        else{
            $("#valores").data("elemento")['ncomodin'] = 0;
            $("#valores").data("elemento")['hcomodin'] = $(this).val();
            endCargarProducto($("#valores").data("elemento")['exo'],0);
        }
    });

    $("#descp").keyup(function(e){
        var code = e.which || e.keyCode;
        var ciclos = parseInt($(".ciclos").length);
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#sinv").click(function(){

        if($("#valores").data('elemento') != undefined){
            $("#modal-inventario").modal('open');
            $("#xidbodega").val($("#valores").data('elemento')['hbod']);
            $("#xidbodega").material_select('update');
            $("#xidbodega").change()
            $("#xidinventario").val($("#valores").data('elemento')['hinv'])
            $("#xidinventario").material_select('update');
        }
    });

    $(".calpres").keyup(function(e){
        var code = e.wich || e.keyCode;
        if (code == 13){
            if($(this).val() == '' || isNaN($(this).val()))
                $(this).val(0)
            $(this).blur();
        }
    });

    $(".calpres").blur(function(){
        var periodo = parseInt($("#vanos").val())*12+parseInt($("#vmeses").val())
        var interes = parseFloat($("#vinteres").val());
        var tasaefectiva = ((( Math.pow((1+((interes/100)/periodo)),periodo))-1)*100).toFixed(2);
        var interes_mes = (interes/100)/periodo;
        var monto = parseFloat($("#tot").html().replace(/,/g,''));
        var comision = parseFloat($("#vcuotainicial").val().replace(/,/g,''));
        var comision_ = parseInt($("#vcuotainicial").parent().find('.por-num').attr('tipo')) == 1 ? monto*(comision/100) : comision;
        monto = parseInt($("#vcuotainicial").parent().find('.por-num').attr('tipo')) == 1 ? monto*(1-(comision/100)) : monto-comision;

        var cuota_mes = monto*( (interes_mes*Math.pow((1+interes_mes),periodo)) / ((Math.pow((1+interes_mes),periodo))-1) );
        $("#t-efectiva").html(tasaefectiva)
        $("#c-mes").html(cuota_mes.formatMoney(2,'.',','));
        $("#t-pagos").html((cuota_mes*periodo).formatMoney(2,'.',','))
        $("#t-interes").html( ((cuota_mes*periodo)-monto).formatMoney(2,'.',',') )
        $("#t-prima").html( (comision_).formatMoney(2,'.',',') )
        $("#t-cuotas").html( (periodo).formatMoney(2,'.',',') )
    });

    $("#xidinventario").change(function(){
        var p = arr('login',4,'cantidad',97,'idinventario ='+$('option:selected',this).val()+' and idproducto = '+$("#valores").data('elemento')['idp']);
        
        $("#valores").data('elemento')['hbod'] = $("#xidbodega option:selected").val();
        $("#valores").data('elemento')['hinv'] = $('option:selected',this).val();
        $("#cantI").html(p[0]);
        $("#bname-inv").html(p[0]);
    });

    $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:1,vidodt:0,vexonerado : 0,voc:'', idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:'',vidagente:0,margenes:0,vterminal:config[26],xmlotros:0});

    $(".modal").modal();

    $("#modal-noticia").modal({
        dismissible:false
    });

    $("#monedas").change(function(){
        cargarMoneda($('option:selected',this).val());
        totalizar();
    });

    $("#doexo").click(function(){
        $("#modal-exo").modal('open');
    });

    $("#vtipodoc").change(function(){
        if(parseInt($(this).val()) == 3 || parseInt($(this).val()) == 1){
            $("#ventidad").val('').prop('readonly',false)
            $("#vfechaDoc").val('').prop('readonly',false)
            $("#vtimeDoc").val('').prop('readonly',false)
        }else{
            $("#ventidad").val('').attr('readonly',true)
            $("#vfechaDoc").html('').prop('readonly',true)
            $("#vtimeDoc").html('').prop('readonly',true)
        }
    })

    $("#vnumdoc").keyup(function(e){
        var code = e.wich || e.keyCode;
        if(code == 13){
            $.get('../exo.php?',{exo:$(this).val(),ced:$("#vcedula").val().replace(/-/g,'')})
            .done(function(data){
                var p = JSON.parse(data);
                if (p['succed']) {
                    $("#vtipodoc").val(p['tipoDocumento']['codigo'])
                    $("#vtipodoc").material_select('update');
                    $("#vnumdoc").val(p['numeroDocumento']);
                    $("#ventidad").val(p['nombreInstitucion']);
                    $("#vfechaDoc").val(p['fechaEmision'].substring(0,p['fechaEmision'].indexOf('T')));
                    $("#vtimeDoc").val(p['fechaEmision'].substring(p['fechaEmision'].indexOf('T')+1));
                    $("#vfechafin").val(p['fechaVencimiento'].substring(0,p['fechaVencimiento'].indexOf('T')));
                    Materialize.updateTextFields();
                    $("#vporcompra").focus().select();
                }else{
                     Materialize.toast(p['error'],4000,'red');
                     $("#videxoneracion").val(0);
                    $("#vtipodoc").val(0);
                    $("#vtipodoc").material_select('update');
                    $("#vnumdoc").focus().select();
                    $("#ventidad").val('');
                    $("#vfechaDoc").val('');
                    $("#vtimeDoc").val('');
                    $("#vfechafin").val('');
                    $("#vporcompra").val(0);
                }
            })
        }
    });

    $("#editExo").click(function(){

        if(!parseInt($("#vporcompra").val())){
             $("#ffacturas .zelda").data('triforce')['videxoneracion'] = '';
            var producto = $("#fdetallefacturas .ciclos");
            producto.each(function(i) {
                var idlinea = $(this).attr('id').substr(2);

                $("#fd"+idlinea).data('triforce')['videxoneracion'] = '';
            });
            totalizar()
            return false;
        }
        
        if(parseInt($("#vtipodoc option:selected").val())){
            if(!$("#vnumdoc").val().trim().length){
                Materialize.toast('Número de Documento Requerido',4000,'red');
                $("#vnumdoc").focus().select();
                return false;
            }

            if(!$("#ventidad").val().trim().length){
                Materialize.toast('Número de Documento no es Válido',4000,'red');
                $("#vnumdoc").focus().select();
                return false;
            }

            if(isNaN($("#vporcompra").val())){
                Materialize.toast('Porcentaje de Exoneración no Válido',4000,'red');
                $("#vporcompra").focus().select();
                return false;
            }

            if(parseInt($("#vporcompra").val()) < 0){
                Materialize.toast('Porcentaje de Exoneración Debe ser Mayor a Cero',4000,'red');
                $("#vporcompra").focus().select();
                return false;
            }

            if(parseInt($("#vporcompra").val()) > 13){
                Materialize.toast('Porcentaje de Exoneración Debe ser Menor a 13',4000,'red');
                $("#vporcompra").focus().select();
                return false;
            }
            var tiempo = $("#vtimeDoc").val().length == 5 ? $("#vtimeDoc").val()+':00' : $("#vtimeDoc").val();
            $("#ffacturas .zelda").data('triforce')['videxoneracion'] = $("#vtipodoc option:selected").val()+"^"+$("#vnumdoc").val()+"^"+$("#ventidad").val()+"^"+$("#vfechaDoc").val()+"T"+tiempo+"-06:00^"+$("#vporcompra").val();
            var producto = $("#fdetallefacturas .ciclos");
            producto.each(function(i) {
                var idlinea = $(this).attr('id').substr(2);

                $("#fd"+idlinea).data('triforce')['videxoneracion'] = !parseInt($("#fd"+idlinea).data('triforce')['exoneracion']) ? '' : $("#ffacturas .zelda").data('triforce')['videxoneracion'];
            });
            totalizar();
            $("#modal-exo").modal('close');
        }
        
    });

    $("[name=ubfactura]").change(function(){
        var id = $(this).attr('val');
        $(".ps").addClass('hide-on-med-and-down')
        $(".p"+id).removeClass('hide-on-med-and-down');       
    });

    $("[name=tipopago]").change(function(){
        $("#factrealp").removeClass('hide')
        switch(parseInt($('[name=tipopago]:checked').attr('bancos'))){
            case 5: //MIXTO
                var str = '';
                var id = 0;
                var ldescuento = limv = 0;
                $("#fdetallefacturas .ciclos").each(function(){
                    id = $(this).attr('id').substr(2)
                    ldescuento = parseFloat($(this).data('triforce')['vdescuento'])/parseFloat($(this).data('triforce')['vcantidad']);
                    limv = parseFloat($(this).data('triforce')['vimv'])/parseFloat($(this).data('triforce')['vcantidad']);
                    str += '<div class="col s12 mover" imv="'+limv+'" descuento="'+ldescuento+'" tm="1" ridp="'+$(this).data('triforce')['videntrada']+'" idp="'+id+'" style="cursor:pointer;border:1px solid #e2e2e2"><span class="lpname" style="float: left;">'+$("#desc"+id).html()+'</span><span class="lpcant" style="float:right">'+$("#cant"+id).val()+'</span></div>';
                });
                $("#mxtot").attr('imv',$("#ffacturas .zelda").data('triforce')['vimv']);
                $("#mxtot").attr('descuento',$("#ffacturas .zelda").data('triforce')['vdesc']);
                $("#mxtot").attr('subtotal',$("#ffacturas .zelda").data('triforce')['vsubtotal']);
                $("#mxtot").attr('exento',$("#ffacturas .zelda").data('triforce')['vexento']);
                $("#lmp").html(str);
                $("#mxtot").val($("#tot").html());
                Materialize.updateTextFields();
                $(".modal-tpago").addClass('hide');
                $("#m-mixto").removeClass('hide');
                $("#mxt_seg").click().change();
                $("#factrealp").addClass('hide')
            break;

            case 4:
                $(".modal-tpago").addClass('hide');
                $("#m-efectivo").removeClass('hide');
                retrasarFocus('pcon');
            break;

            case 2:
                $(".modal-tpago").addClass('hide');
                $("#m-tarjeta").removeClass('hide');
                $("#labeltarjeta").text('Número de Tarjeta');
                retrasarFocus('carddigito');
                //$(".icono").html(p[0][3]);
            break;
            case 1:
               $(".modal-tpago").addClass('hide');
                $("#m-deposito").removeClass('hide');
                $("#labeldeposito").text('Número de Transferencia');
                retrasarFocus('ndeposito');
                //$(".icono").html(p[0][3]);
            break;

            case 0:
               $(".modal-tpago").addClass('hide');
                $("#m-cheque").removeClass('hide');
                $("#labelcheque").text('Número de Cheque');
                retrasarFocus('ncheque');
                //$(".icono").html(p[0][3]);
            break;


            default:
            break;
        }
        $("#ffacturas .zelda").data('triforce')['vidtipopago'] = $("[name=tipopago]:checked").val();
    });

    if ($("#dfact").length) {
       $("#dfact").sideNav({
            menuWidth: 300,
            edge: 'right',
            closeOnClick: true,
            draggable: true
        });
    }

    $("#ccr").change(function(){
        if($(this).is(":checked"))
            $("#idcc").removeClass('hide')
        else
            $("#idcc").addClass('hide')
    })

    cargarMoneda(0);    
    permisos(1101,1115);

    if ($("#celectronica:visible[disabled=disabled]").length){
        $("#celectronica").change();
    }
    
    $("#modal-usuario").modal({
        dismissible:false,
        ready: function(){
            console.log('ready')
        }
    });

    var au = getParameterByName('au');

    if(au != '0' && au != ''){
        var user = getDatos('nombre',1,'id='+au);
        if(user[0].length){
            $("#ffacturas .zelda").data('triforce')['vidusuario'] = au;
            $("#username").html(user[0][0][0])
            $("#username").parent().parent().removeClass('hide')
        }
    }else{
        if (parseInt(config[11]) == 3 && param.toString().match(new RegExp(/\b1\b|\b6\b|\b7\b|\b8\b/g)) && $(".zelda").attr('tipo') != 1){
            $("#modal-usuario").modal('open');
        }   
    }

    if($("#prefact:visible").length && !$("#cantFact:visible").length){
        $("#previews").append('<a class="btn btn3 tooltipped der white-text" data-position="bottom" data-tooltip="Cargar Facturas" id="cargarfact"><span class="white-text" id="cantFact"></span></a>')
    }

    if ($("#cantFact:visible").length)
        $("#cantFact").html(getDatos('COUNT(id) as cantidad',261,'idtipoventa = 6 and !isregistrada and idsucursal = @@impresa',0,0,0)[0][0][0]);

    $("#newfact").change(function(){

        if($(this).is(":checked")){
            $("#c0-ced").parent().removeClass('hide');
        }else{
            $("#c0-ced").parent().addClass('hide');
            $(".c0-st").addClass('hide');
        }
    });

    $("#montotar").keyup(function(e){
        var total = parseFloat($("#mxcan").val().replace(/,/g,''));
        var tarjeta = $(this).val().replace(/,/g,'');

        tarjeta = isNaN(tarjeta) ? 0 : parseFloat(tarjeta);
        $("#montoefect").val((total-tarjeta).formatMoney(2,'.',','));
    })

    if (parseInt(config[23] == 1))
        $("#special").removeClass('hide');

    if(param.toString().match(new RegExp(/\b1\b|\b7\b|\b9\b|\b10\b/g)) && !config[24]){
        $("#modal-noticia").modal('open');
        $("#codactividad").focus();
        $("#acepnew").click(function(){
            if(!$("#codactividad").val().trim().length){
                Materialize.toast('Codigo Requerido',4000,'red');
                $("#codactividad").focus();
                return false;
            }

            var codact = getDatos('codigo',286,'codigo like "'+$("#codactividad").val().trim()+'"',0,0,0);
            if(!codact[0].length){
                Materialize.toast('Codigo No Existente',4000,'red');
                $("#codactividad").focus().select();
                return false;
            }

            actualizar(39,'codactividad='+$("#codactividad").val().trim(),'id=@@impresa');
            Materialize.toast('Codigo Aceptado',4000,'green');
            setTimeout(function(){location.reload();},500);

        })
    }else{
        var list = '<option value="'+config[24]+'" selected orig>'+config[25]+'</option>';
        var oactivis = getDatos('codactividad,(select actividad from actividades where codigo = codactividad)',293,'idsucursal=@@impresa');
        for (var i = 0; i < oactivis[0].length; i++) {
            list += '<option value="'+oactivis[0][i][0]+'">'+oactivis[0][i][1]+'</option>';
        }
        $("#codact").html(list);
        $("#codact").material_select('update')
    }

    if($(".per11:visible").length && param.toString().match(new RegExp(/\b1\b|\b7\b|\b8\b/g))){//RESTAURANTES
        $(".rest").removeClass('hide')
        $("#impm").attr('checked',config['ch_rest'] == '1' ? true : false);
        $("#impm").change()
        var vmobil = $(".addline").attr('tr') == 2 ? 1 : 0;
    }

    if($(".mstatic:visible").length){
        $("#iva").remove()
    }

    switch (param) {
        case 104: //COMPRAS MANUALES
            if(config[21] == "1")
                $("#cauto").prop('checked',false).change();
            else
                $("#ingclie").removeClass('hide');

            $("#vreferencia").keyup(function(e){
                var code = e.which || e.keyCode
                if(code == 13)
                    $(this).blur();
            });

            $("#vreferencia").blur(function(){
                if($("#vreferencia").val().trim().length == 0){
                    return false;
                }

                if(param != 2){
                   var refprod = getDatos('id',64,'if(CHAR_LENGTH(referencia) =50,substring(referencia,32,10)*1,referencia) = "'+$("#vreferencia").val().trim()+'" and idsucursal = @@impresa and idcliente = '+$("#ffacturas .zelda").data('triforce')['vidcliente'])[0];
                   
                    if (refprod.length) {
                        $("#vreferencia").focus().select();
                        Materialize.toast("Referencia ya Existente",4000,'red');
                        return false;
                    }

                    $("#ncli").focus();    
                } 
                
            });

            $("#pvs").change(function(){
                if($(this).is(':checked')){
                    $("#fservicios").attr('id','fproductos')
                    $("#addps").attr('modulo','producto')
                    $("#fproductos .zelda").data('triforce',{vid:0,vnombre:'',vcodigointerno:'',vcosto:0,vganancia:0,vexoneracion: 0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:6,vidusuario: '',vidmoneda:1,vidsucursal:'',visinventariado:0,vidheredado:0,visvariable:1,vcantequiv:0,visgravamen:0,vcomision:0,vventa:0,vventaiva:0,vtimv:8,vidvarios:0});
                }else{
                    $("#fproductos").attr('id','fservicios');
                    $("#addps").attr('modulo','servicio');
                    $("#fservicios .zelda").data('triforce',{vid:0,vidsucursal:'',vidusuario:'',vpganancia:0,vexento:0,vperiodo:0,vdias:0,vexento:13,vtimv:8,vdescripcion:'',vpfactura:0,vidproveedor:0,vprecio:0,vidinventario:0,vservprofesional:0,vidsuc:0})
                }
            });
            break;
        case 1:
        case 3: //ORDEN COMPRA
        case 4: //PROFORMA
        case 5: //PEDIDO
        case 6: //SPECIAL
        case 7: //TIQUETE
        case 9: //COMPRA ELETRONICA
            if(au != ""){
                $("#facturar").click()
            }
            break;
        case 10:
            $(".export").removeClass('hide');
            break;
        default:
            console.error('XTR-00'+param)
            break;
    }

    //$(".chg_tipo[val="+config[20]+"]").click();

    $("#sg-limit").click(function(e){
        $(this).prop('disabled',true);
        $("#modal-limitcre").data('cont',1);
        $("#facturar").click();
    });

    $("#lmgo").click(function(){
        window.open('cuentas?tf=0&idclie='+$("#ffacturas .zelda").data('triforce')['vidcliente'])
    });

    $("#xo-cont").click(function(){
        $("#ffacturas .zelda").data('triforce')['xmlotros'] = 0;
        $("#facturar").click()
    });

    $("#xo-sh").click(function(){
        $("._xmlotros").find('input').eq(0).focus();
        $("#modal-xmlo").modal('open')
    })

    $("[name=mxt_tp]").change(function(){
        switch(parseInt($(this).attr('val'))){
            case 1: //MIXTO SEGMENTADO
                $("#montoefect").val($("#mxtot").val());
                $("#pconm").focus().select();
                $(".mxt_val_tot").unbind();
                $(".mxt_val_tot").keyup(function(e){
                    var rtot = parseInt($("#mxcan").val().replace(/,/g,'')) > 0 ? $("#mxcan").val() : $("#mxtot").val()
                    if(isNaN($(this).val())){
                        $("#montoefect").val(rtot);
                        return false;
                    }
                    if($(this).attr('tp') == '1'){
                        $("#montoefect").val(rtot);
                    }else{
                        var tarjeta = isNaN($(this).val()) ? 0 : $(this).val();
                        var total = rtot.replace(/,/g,'');
                        var efectivo = total-tarjeta;
                       /* if(efectivo < 0){
                            $(".mxt_val_tot[tp=1]").val( parseFloat(total).formatMoney(2,'.',',') )
                        }else*/
                            $(".mxt_val_tot[tp=1]").val( parseFloat(efectivo).formatMoney(2,'.',',') )

                    }
                });
                break;
            case 2:

                break;
            default:
                break;
        }
    });

    var edt = getParameterByName('edt');
    var vidp = getParameterByName('id');
    if(edt != ''){
        $("#facturar").html('Editar').attr('id','feditar')
        $("#ffacturas .zelda").data('triforce')['vid'] = vidp;
        $("#idfact").html($("#indice").attr('cons'))

        $("#feditar").click(function(){
            var err = validarFactura();
            if (err){
                Materialize.toast(err,'4000','red');
                return false;
            }
            var element = $("#ffacturas .zelda").data('triforce');
            
            var ccomodin = parseInt(element['vidcliente']) == 0 ? $("#ncli").val() : '';

            actualizar(64,'subtotal='+element['vsubtotal']+',exento='+element['vexento']+',exonerado='+element['vexonerado']+',descuento='+element['vdescuento']+',idcliente='+element['vidcliente']+',comodin="'+ccomodin+'",imv='+element['vimv'],'id='+element['vid']);

            var inventario = param.toString().match(new RegExp(/\b104\b|\b5\b|\b9\b/g)) ? 1 : 0;

            $("#fdetallefacturas .ciclos").each(function(){
                var elemt = $(this).data('triforce');
                var ispr = parseInt(elemt['videntrada']) > 0 ? 1 : 0;
                var idpr = ispr > 0 ? elemt['videntrada'] : null;
                var idsr = ispr < 0 ? elemt['videntrada'] : null;

                switch($(this).attr('vaccion')){
                    case '1':
                        if(inventario && ispr > 0){
                            actualizar(97,'cantidad = cantidad+'+elemt['vcantidad'],'idproducto = '+idpr);
                            var cante = getDatos('cantidad',97,'idproducto =  '+idpr,0,0,0);

                            insertar(298,'','null,9,'+parseFloat(elemt['vcantidad'])+',now(),'+idpr+',"",@@impresa,@@usr,'+cante[0][0][0]);
                        }

                        insertar(65,'','NULL,'+vidp+','+idpr+','+idsr+',"'+elemt['vexonerado']+'",'+elemt['vcantidad']+','+elemt['vprecio']+','+elemt['vdescuento']+',0,'+elemt['vimv']+',"'+elemt['vcomodin']+'",'+elemt['vidunidad']+',"'+elemt['vidimpuestos']+'","'+elemt['viddescuentos']+'",6,0');
                        break;
                    case '3':
                        if(inventario && ispr > 0){
                            actualizar(97,'cantidad = cantidad-'+$(this).attr('rcant'),'idproducto = '+idpr);
                            var cante = getDatos('cantidad',97,'idproducto =  '+idpr,0,0,0);

                            insertar(298,'','null,9,'+$(this).attr('rcant')+',now(),'+idpr+',"",@@impresa,@@usr,'+cante[0][0][0]);
                        }

                        eliminar(65,'id='+$(this).attr('rid'));
                        break;
                    default:
                        if(inventario && ispr > 0){
                            var resta = parseFloat(elemt['vcantidad'])-parseFloat($(this).attr('rcant'))
                            actualizar(97,'cantidad = cantidad+'+resta,'idproducto = '+idpr);
                            var cante = getDatos('cantidad',97,'idproducto =  '+idpr,0,0,0);

                            insertar(298,'','null,9,'+resta+',now(),'+idpr+',"",@@impresa,@@usr,'+cante[0][0][0]);
                        }

                        actualizar(65,'idexoneracion = "'+elemt['vexonerado']+'", cantidad='+elemt['vcantidad']+',precio = '+elemt['vprecio']+',descuento='+elemt['vdescuento']+',imv='+elemt['vimv']+',comodin="'+elemt['vcomodin']+'",idunidad='+elemt['vidunidad']+',idimpuestos="'+elemt['vidimpuestos']+'",iddescuentos="'+elemt['viddescuentos']+'"','id='+$(this).attr('rid'));
                        break;
                }
            });

            Materialize.toast('Regitro Editado Correctamente',4000,'green');
            //setTimeout(function(){location.reload();},2000);
        });
    }
    
})//READY

$(document).on("change","#impm",function(){
    if($(this).is(':checked'))
        $("#serv").attr('porcentaje',10);
    else
        $("#serv").attr('porcentaje',0);
    totalizar();
});

$(document).on("click","#fdev",function(){
    if($(this).attr('dodev') == '0'){
        return false;
    }

    var variable1 = $(".cdev").filter(function(){ return $(this).val() > 0 })
    var idf = 0;

    if(variable1.length){
        var idusr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        var idcons = getDatos('devoluciones+1',252,'idsucursal=@@impresa')[0][0][0];

        var iddev = insertar(408,'','null,-1*'+$("#detfact").attr('vfact')+',now(),'+idusr+',"'+$("#rdev").val().trim()+'",'+$("#detfact").attr('moneda')+',@@impresa,'+idcons)[0][0][0]; 
        var lcant = 0;
        //GUARDAR DEVOLUCION
        variable1.each(function(){
            idf = $(this).parent().parent().attr('id').substr(1);
            lcant = $("#r"+idf).find('.cdev').val();
            insertar(407,'','null,'+iddev+','+idf+','+lcant+','+$("#r"+idf).find('.trazon').val()+','+$("#r"+idf).find('.tcmb').val());
        });

        var idnota = getDatos('',276,iddev+',@@impresa')
        
        idnota = idnota[0][0][0];
        actualizar(252,'devoluciones='+idcons,'idsucursal=@@impresa');
        var tmpparam = param;
        param = 0;
        sendFE(idnota)
        param = tmpparam;
        Materialize.toast('Devolución Realizada Correctamente',4000,'green');
        window.open("cuentas?accion=4&id="+idnota+"&tp=1")
        cargarFacturasNota(idnota);
        $("#slide-facturas").sideNav('hide');
    }else {
        Materialize.toast('No hay Productos que Devolver',4000,'red')
    }
})

$(document).on("click","#fext",function(){
    $("#slide-facturas").sideNav('hide');
})

$(document).on("keyup",".vextra",function(e){
    var code = e.wich || e.keyCode
    if (code == 13) {
        var elimprimir = $("#factrealp");
        elimprimir = parseInt(config[4]) ? elimprimir : $("#factreal");
        elimprimir.focus();
    }
})

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

$(document).on("change","#vidunidad",function(){
    var id = $(this).val();
});

$(document).on("click","#fastClient",function(){
    addGeneral(1);
    var $toastContent = $('<span>Cliente no Existente</span>').add($('<button class="btn-flat toast-action green white-text clientNotFound" tp="1">Agregarlo</button>'));
    Materialize.toast($toastContent, 5000);
});

$(document).on("click",".ckmixto",function(){
    var id = $(this).attr('id').substr(2);
    var estado = $("#tp"+id).is(':checked');
    if ( estado )
        $(".tp-"+id).removeClass('hide');
    else
        $(".tp-"+id).addClass('hide');
});

$(document).on("keyup","[id^=vcantidad]",function(e){
    var code = e.which || e.keyCode;

    if (code == 13) {
        var id = $(this).attr('id').substr(9);
        var valor = $(this).val();
        var precio = parseFloat($("#vprecio"+id).val());
        var total = precio * valor;
        $("#fd"+id).data('triforce')['vtotal'] = total.toFixed(5);
        $("#tota"+id).html(total.formatMoney(2,'.',','))
        
        totalizar();

    }
});

$(document).on("change","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#fd"+id).data('triforce')['vtotal'] = total.toFixed(5);
    $("#tota"+id).html(total.formatMoney(2,'.',','))
    
    totalizar();
});

$(document).on("blur","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#fd"+id).data('triforce')['vtotal'] = total.toFixed(5);
    $("#tota"+id).html(total.formatMoney(2,'.',','))
    
    totalizar();
    $(this).hide();
    $("#cant"+id).text(valor);
    $("#cant"+id).show();
});

$(document).on("click","#printOrder",function(){
    var has = $("#impm").is(':checked') ? 1 : 0;
    window.open('facturacion?accion=10&id='+idext+'&has='+has);
});

$(document).on("click","#facturar",function(){

    var err = validarFactura();
    if (err){
        Materialize.toast(err,'4000','red');
        return false;
    }

    $("#pcon").val(0.00);
    $("#pcam").text(0.00).css('color','black');
    if ( $("#ffacturas .zelda").data('triforce')['vidtipo'] == 1 && ($("#ffacturas .zelda").data('triforce')['vidtipoventa'] == 1 || $("#ffacturas .zelda").data('triforce')['vidtipoventa'] == 7 || $("#ffacturas .zelda").data('triforce')['vidtipoventa'] == 8)) {

        var tpago = 1;
        var tfact = $("#ffacturas .zelda").data('triforce')['vidtipo'];

        $("#tpg1").click();
        
        var span = $("#tot").text();
        $(".totalfact").html( span );
        $("#modal-tpagos").modal({complete: function() { if($("#modal-tpagos").attr("gfort") == 1) setTimeout(function(){location.reload();},500); }}).modal('open');
        
    }else{
        $("#factrealp").click();
    }
});


$("#pcon").blur(function(){
    calcVuelto();
    var elimprimir = $("#factrealp");
    elimprimir = parseInt(config[4]) ? elimprimir : $("#factreal");
    elimprimir.focus();
});

$("#pconm").keyup(function(e){
    var code = e.wich || e.keyCode
    if(code == 13)
        if(parseFloat($(this).val()) > 0)
            $(this).blur();
        else{
            $("#montotar").val($("#montoefect").val().replace(/,/g,'')).keyup();
            $("#factreal").focus();
        }
});

$("#pconm").blur(function(){
    if(parseFloat($(this).val()) > 0){
        var tot = parseFloat($("#montoefect").val().replace(/,/g,''));
        var tar = parseFloat($("#montotar").val().replace(/,/g,''));
        var paga = isNaN($(this).val()) ? 0 : parseFloat($(this).val());
        var diff = (paga-tot);
        if(diff > 0){
            $("#pcons").html(diff.formatMoney(2,'.',','))
            $("#factreal").focus();
        }else{
            $("#montoefect").val(paga.formatMoney(2,'.',','))
            $("#montotar").val(Math.abs(diff).formatMoney(2,'.',','));
            $("#factreal").focus();
        }
    }
});

$("#factreal").click(function(){
    if(parseInt($("[name=tipopago]:checked").val()) == 5){
        mixto($(this));
        return false;
    }else{
        $(this).blur();
        $("#factreal").attr('disabled',true);
        $("#factrealp").attr('disabled',true)
        $("#modal-tpagos").attr("gfort",1);
        $("#facturar").attr('disabled',true);
        imprimir = 0;
    }
    
});

$("#factrealp").click(function(){
    if(parseInt($("[name=tipopago]:checked").val()) == 5){
        mixto($(this));
        return false;
    }else{
        $(this).blur();
        $("#factrealp").attr('disabled',true)
        $("#factreal").attr('disabled',true);
        $("#modal-tpagos").attr("gfort",1);
        $("#facturar").attr('disabled',true);
    }
});


$("#pcon").keyup(function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        $(this).blur()      
    }
});

$("#mstrcrr").click(function(){
    str_correos = ''
   $(".selcorreo:checked").each(function(){
        var id = $(this).attr('id');
        str_correos += $("[for="+id+"]").html()+",";
    });
    
    str_correos = str_correos.substr(0,str_correos.length-1)
});

$("#crrclie").click(function(){
    $("#modal-correos").modal('open');
    tmp_correos = tmp_correos == '' ? str_correos : tmp_correos;

    var tmp = tmp_correos;
    var cantidad = tmp_correos.length - tmp_correos.replace(/,/g,'').length;
    var str = '';
    var checked = 'checked';
    var index = 0;
    $('#bdycrr').html('');

    for (var i = 0; i < cantidad+1; i++) {
        index = tmp.indexOf(',') == -1 ? tmp.length : tmp.indexOf(',');
        if(tmp.substr(0,index) != ''){
            checked = str_correos.indexOf(tmp.substr(0,index)) == -1 ? '': 'checked';
            str += '<input type="checkbox" class="selcorreo" '+checked+' id="chk'+i+'"><label for="chk'+i+'">'+tmp.substr(0,index)+'</label><br>';
            tmp = tmp.substr(index+1,tmp.length);
        }
    }
    var ii = $(".selcorreo").length + 1;
    str += '<input type="text" placeholder="Digitar Correo" id="dcorreo">';

    $('#bdycrr').html(str);
    $("#dcorreo").focus();

    $("#dcorreo").keyup(function(e){
        var code = e.wich || e.keyCode
        if(code == 13)
            if(validarCorreo($(this).val().trim())){
                tmp_correos = tmp_correos == '' ? str_correos : tmp_correos;
                tmp_correos += ','+$(this).val().trim();
                $('#bdycrr').prepend('<input type="checkbox" class="selcorreo" checked id="chk'+$(".selcorreo").length+'"><label for="chk'+$(".selcorreo").length+'">'+$(this).val().trim()+'</label><br>');
                $(this).val('')
            }
    });
});

$("#prefact").click(function(){

    if ($("#fdetallefacturas .ciclos").length == 0) {
        Materialize.toast("No se Han Ingresado Productos en Detalle",4000,'red')
        pril.focus();
        return false;
    }
    var comodin = parseInt($("#ffacturas .zelda").data('triforce')['vidcliente']) == 0 ? $("#ncli").val() : '';
 
    if(parseInt($(this).attr('vid')) == 0){
        var cons = getDatos('consecutivo5+1',252,'idsucursal=@@impresa')[0][0][0];
        var user = $("#ffacturas .zelda").data('triforce')['vidusuario'] ? $("#ffacturas .zelda").data('triforce')['vidusuario'] : '@@usr';

        actualizar(252,'consecutivo5 = consecutivo5+1','idsucursal=@@impresa');

        var idtmpf = insertar(261,'','null,6,0,0,now(),'+$("#ffacturas .zelda").data('triforce')['vidcliente']+',0,0,'+$("#ffacturas .zelda").data('triforce')['vimv']+','+$("#ffacturas .zelda").data('triforce')['vsubtotal']+','+$("#ffacturas .zelda").data('triforce')['vexento']+','+$("#ffacturas .zelda").data('triforce')['vdescuento']+',0,0,0,"'+$("#vcomentario").val()+'","",1,'+user+',"'+comodin+'",@@impresa,'+cons+',"",1,0,0,"",0')[0][0][0];

        var usr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        insertar(327,'','null,'+idtmpf+',now(),'+usr+',@@impresa,'+$("#tot").html().replace(/,/g,'')+',1,'+$("#ffacturas .zelda").data('triforce')['vidcliente']);

        $("#fdetallefacturas .ciclos").each(function(){
            var pr = $(this).data('triforce')['videntrada'].substr(0,1) == '-' ? 'null' : $(this).data('triforce')['videntrada'];
            var sr = $(this).data('triforce')['videntrada'].substr(0,1) == '-' ? $(this).data('triforce')['videntrada'].substr(1) : 'null';

            insertar(260,'','null,'+idtmpf+','+pr+','+sr+',null,'+$(this).data('triforce')['vcantidad']+','+$(this).data('triforce')['vprecio']+','+$(this).data('triforce')['vdescuento']+',0,'+$(this).data('triforce')['vimv']+',"'+$(this).data('triforce')['vcomodin']+'",'+$(this).data('triforce')['vidunidad']+',"'+$(this).data('triforce')['vidimpuestos']+'","'+$(this).data('triforce')['viddescuentos']+'",'+$(this).data('triforce')['vidinventario']+',""');

            if(!isNaN(pr))
                actualizar(97,'cantidad=cantidad-'+$(this).data('triforce')['vcantidad'],'idproducto='+pr);
        });
    }else{
        var idtmpf = $(this).attr('vid');

        $("#fdetallefacturas .ciclos").each(function(){
            
            var lid = $(this).attr('rid'); 

            if($(this).is(":visible")){
                var pr = $(this).data('triforce')['videntrada'].toString().substr(0,1) == '-' ? 'null' : $(this).data('triforce')['videntrada'];
                var sr = $(this).data('triforce')['videntrada'].toString().substr(0,1) == '-' ? $(this).data('triforce')['videntrada'].toString().substr(1) : 'null';
                if(lid == undefined){ //INSERTAR
                    insertar(260,'','null,'+idtmpf+','+pr+','+sr+',null,'+$(this).data('triforce')['vcantidad']+','+$(this).data('triforce')['vprecio']+','+$(this).data('triforce')['vdescuento']+',0,'+$(this).data('triforce')['vimv']+',"'+$(this).data('triforce')['vcomodin']+'",'+$(this).data('triforce')['vidunidad']+',"'+$(this).data('triforce')['vidimpuestos']+'","'+$(this).data('triforce')['viddescuentos']+'",'+$(this).data('triforce')['vidinventario']+',""');

                    if(!isNaN(pr))
                        actualizar(97,'cantidad=cantidad-'+$(this).data('triforce')['vcantidad'],'idproducto='+pr);
                }else{ //ACTUALIZAR
                    var pr = $(this).data('triforce')['videntrada'].toString().substr(0,1) == '-' ? 'null' : $(this).data('triforce')['videntrada'];
                    var sr = $(this).data('triforce')['videntrada'].toString().substr(0,1) == '-' ? $(this).data('triforce')['videntrada'].toString().substr(1) : 'null';
                    actualizar(260,'cantidad='+$(this).data('triforce')['vcantidad']+',precio='+$(this).data('triforce')['vprecio']+',comodin="'+$(this).data('triforce')['vcomodin']+'",imv='+$(this).data('triforce')['vimv']+',idimpuestos="'+$(this).data('triforce')['vidimpuestos']+'",iddescuentos="'+$(this).data('triforce')['viddescuentos']+'",descuento='+$(this).data('triforce')['vdescuento'],'id='+lid);

                    if(!isNaN(pr)){
                        var rcant = parseFloat($(this).data('triforce')['vcantidad'])-parseFloat($(this).attr('rcant'));
                        actualizar(97,'cantidad=cantidad+'+rcant,'idproducto='+pr);
                    }
                }
            }else{//ELIMINAR
                var pr = $(this).attr('idprod').toString().substr(0,1) == '-' ? 'null' : $(this).attr('idprod');
                eliminar(260,"id = "+lid);
                if(!isNaN(pr))
                    actualizar(97,'cantidad=cantidad+'+$(this).attr('rcant'),'idproducto='+pr);
            }
        })

        actualizar(261,'fecha=now(),idcliente='+$("#ffacturas .zelda").data('triforce')['vidcliente']+',imv='+$("#ffacturas .zelda").data('triforce')['vimv']+',subtotal='+$("#ffacturas .zelda").data('triforce')['vsubtotal']+',descuento='+$("#ffacturas .zelda").data('triforce')['vdescuento']+',comodin="'+$("#ffacturas .zelda").data('triforce')['vcomodin']+'",idunidad='+$("#ffacturas .zelda").data('triforce')['vidunidad']+',idimpuestos="'+$("#ffacturas .zelda").data('triforce')['vidimpuestos']+'",iddescuentos="'+$("#ffacturas .zelda").data('triforce')['viddescuentos']+'"','id='+idtmpf);

        var usr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
        insertar(327,'','null,'+idtmpf+',now(),'+usr+',@@impresa,'+$("#tot").html().replace(/,/g,'')+',2,'+$("#ffacturas .zelda").data('triforce')['vidcliente']);
    }

    $("#fdetallefacturas").html('');
    $("#ffacturas .zelda").data('triforce')['idline'] = 0;
    $("#ncli").val('').blur();
    $("#vcomentario").val('');
    $(this).attr('vid',0)
    $(this).css('background-color','green !important')
    $(this).html('PRE-FACTURA')

    totalizar();
    Materialize.toast("Pre-Factura Guardada",4000,'green')

});

$(".mcancelar").blur(function(){
    var total = 0;
    var totfact = parseFloat( $(".totalfact").text().replace(/,/g,'') ).toFixed(2);

    $(".mcancelar:visible").each(function(){
        var valor = isNaN( $(this).val() ) ? 0 : $(this).val();
        total += parseFloat(valor);
    });

    var result = totfact - total;

    if (result >= 1) {
        $(".totfact").removeClass('teal-text');
        $(".totfact").removeClass('red-text');
        $(".totfact").addClass('blue-text');
    }else if (result <= -1) {
        $(".totfact").removeClass('teal-text');
        $(".totfact").removeClass('blue-text');
        $(".totfact").addClass('red-text');
    }else{
        $(".totfact").removeClass('blue-text');
        $(".totfact").removeClass('red-text');
        $(".totfact").addClass('teal-text');
    }

    $(".totfact").html(result.formatMoney(0,',','.'));
});



$(document).on("click","input[name=modo]",function(){
    var id = $(this).attr('id').substr(4);
    $("#modselected").val(id);
});

$(document).on("keyup",".fventa",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $(this).blur();
    
});

$(document).on("change","#uni",function(){

     punidad = parseFloat($('option:selected',this).attr('cant'));

     switch(parseInt($(this).val())){
        case 1:
            var nprecio = getDatos('venta,exoneracion',11,'id = '+$("#valores").data('elemento')['idp'],0,0,0);
            break;
        case -99:
            var nprecio = getDatos('venta/(select valor from dimensioproductos where idproducto = '+$("#valores").data('elemento')['idp']+'),exoneracion',11,'id = '+$("#valores").data('elemento')['idp'],0,0,0);
            break;
        default:
            var nprecio = getDatos('venta,exoneracion',105,'idtipoentrada = 2 and identrada = '+$("#valores").data('elemento')['idp']+' and idnivel = '+$(this).val(),0,0,0);
            break;
     }

     if(nprecio[0].length){
        if(!$("#iva").is(":checked") && $("#iva:visible").length)
            var pfinal = parseFloat(nprecio[0][0][0]) / ((parseFloat(nprecio[0][0][1])/100)+1);
        else
            var pfinal = nprecio[0][0][0];
        $("#precp").val(parseFloat(pfinal).formatMoney(2,'.',','));
        $("#valores").data('elemento')['hprec'] = pfinal;
        $("#cantp").focus().select();
        $("#totp").val(parseFloat(pfinal).formatMoney(2,'.',','))
     }else{
        if($(this).attr('old') != undefined){
            var pfinal = getDatos('(select ('+$("#valores").data('elemento')['hprec']+'/a.cantidad)*b.cantidad from unidades a join unidades b on b.id = '+$(this).val()+' where a.id = '+$(this).attr('old')+')',0,'',0,0,0)[0][0][0];
            $("#precp").val(parseFloat(pfinal).formatMoney(2,'.',','));
            $("#valores").data('elemento')['hprec'] = pfinal;
            $("#cantp").focus().select();
            $("#totp").val(parseFloat(pfinal).formatMoney(2,'.',','));
        }
        $(this).attr('old',$(this).val())
     }      
});

$(document).on("blur",".fventa",function(){
    var valor = $(this).val();
    if (isNaN(valor)) {
        pril.focus();
        return false;
    }

    var impuesto = $(this).attr('imp');
    var valor = valor/(1+(impuesto/100))
    var id = $(this).attr('id').substr(9);
    $("#fd"+id).data('triforce')['vprecio'] = valor;
    totalizar();
    pril.focus();
});

$(document).on("click","#cargarfact",function(){
    $("#modal-facturas").modal('open');
    var facturas = getDatos('',257,'@@impresa',0,0,0)[0];
    var body = '';
    for (var i = 0; i < facturas.length; i++) {
        body += '<tr vid="l'+facturas[i][0]+'"> <td> <input type="radio" name="factlist" id="l'+facturas[i][0]+'"> </label> <label for="l'+facturas[i][0]+'"></td> <td class="rd-td">'+facturas[i][1]+'</td> <td class="rd-td">'+facturas[i][2]+'</td> <td class="rd-td eder">'+facturas[i][3]+'</td> <td><i class="mdi mdi-close red-text deltmpfact delete-row" id="w'+facturas[i][0]+'" style="cursor:pointer;"></i></td> </tr>'  
    }
    $("#bdylist").html(body);
});

$(document).on("click","#acepfact",function(){
    if (!$("[name=factlist]").length) {
        Materialize.toast('No hay Factura Disponibles',4000,'red');
        return false;
    }

    if (!$("[name=factlist]:checked").length) {
        Materialize.toast('No Se a Seleccionado una Factura',4000,'red');
        return false;
    }

    var sid = $(".per11:visible").length || $(".per1111:visible").length ? 1 : 0;

    /*if($(".per11:visible").length){
        $("#fdetallefacturas").html('');
        $("#ffacturas .zelda").data('triforce')['idline'] = 0;

        var vmobil = $(".addline").attr('tr') == 2 ? 1 : 0;

        $(".order").removeClass('hide');

        var detalles = getDatos('(select codigo from productos where id = idproducto),cantidad',260,'idfactura ='+$("input[name=factlist]:checked").attr('id').substr(1),0,0,0);

        if(detalles[0].length){
            idext = "-"+$("input[name=factlist]:checked").attr('id').substr(1);
            var e = jQuery.Event("keyup");

            for (var i = 0; i < detalles[0].length; i++) {
                $("#codp").val(detalles[0][i][0])
                e = jQuery.Event("keyup");
                e.which = 13;
                $("#codp").trigger(e);

                e = jQuery.Event("keyup");
                e.which = 13;
                $("#precp").trigger(e);

                $("#cantp").val(detalles[0][i][1])
                e = jQuery.Event("keyup");
                e.which = 13;
                $("#cantp").trigger(e);
            }
        }
    }
    else*/
        cargarFactura('-'+$("input[name=factlist]:checked").attr('id').substr(1),sid); 

    $("#modal-facturas").modal('close');
});

$(document).on("click",".delf",function(){
    var id = $(this).attr('id').substr(3);
    var pr = $("#fd"+id).data('triforce')['videntrada'];
    var edt = getParameterByName('edt');

    if($("#prefact:visible").length && pr.toString().substr(0,1) != '-'){
        if($("#prefact:visible").attr('vid') != 0){
            $("#fd"+id).addClass('hide');
            $("#fd"+id).data('triforce','');
            
        }else {
            $("#fd"+id).remove();
        }
    }else {
        if (edt != '' && $("#fd"+id).attr('rid') != undefined) {
            $("#fd"+id).addClass('hide');
            $("#fd"+id).attr('vaccion',3)
        }else
            $("#fd"+id).remove();
    }

    totalizar();

});

$(document).on("click",".detalle",function(){
    var id = $(this).attr('id').substr(1);

    if(str_dev == ''){
        str_dev = '<option value="1">Mal Estado</option><option value="2">Vencido</option><option value="3" selected>Otros</option>';
        //VER ESTADO DE CUENTA SINO CARGAR EN EL
        str_camb = '<option value="1">Efectivo</option><option value="2">Otro Producto</option><option value="3" selected>Otros</option>';
    }

    var pdetalle = getDatos('if(comodin = "",(select nombre from productos where id = idproducto),comodin),cantidad-ifnull((select sum(cantidad) from detalledevoluciones where idddetfact = detallefacturas.id),0),format(precio*cantidad-descuento+imv,2) as valorfact,idproducto,id',65,'idproducto is not null and idfactura = '+id,0,0,0);
    var str = '';
    for (var i = 0; i < pdetalle[0].length; i++) {
        str += '<tr id="r'+pdetalle[0][i][4]+'" idp="'+pdetalle[0][i][3]+'"> <td class="mxv">'+pdetalle[0][i][1]+'</td> <td style="font-size: 12px; line-height: 1;">'+pdetalle[0][i][0]+'</td> <td><input type="number" value="0" class="eder cdev"></td> <td><select class="browser-default trazon">'+str_dev+'</select></td> <td><select class="browser-default tcmb">'+str_camb+'</select></td></tr>';
    }
    $("#detfact").attr('vfact',id).attr('debe',$(this).attr('debe')).attr('haber',$(this).attr('haber')).attr('moneda',$(this).attr('moneda'));
    $("#detfact").html(str);
});

$(document).on("blur",".cdev",function(){
    var mx = $(this).parent().parent().find('.mxv').html();
    if( isNaN($(this).val())){
        Materialize.toast('Cantidad Debe ser Numérica',4000,'red')
        $(this).focus().select();
        $("#fdev").attr('dodev',0)
    }else
        $("#fdev").attr('dodev',1)

    if(parseFloat(mx) < parseFloat($(this).val())){
        Materialize.toast('Cantidad Debe ser Menor o Igual a '+mx,4000,'red')
            $(this).focus().select();
        $("#fdev").attr('dodev',0)
    }else
        $("#fdev").attr('dodev',1)
})

$(document).on("click",".addesgloce",function(){
    var id = parseInt($("#ffacturas .zelda").data('triforce')['idline'])+1;
    var vidprod = $(this).parent().parent().data("triforce")['videntrada'];

    $("#ffacturas .zelda").data('triforce')['idline'] = id;
    
    $('<tr id="fd'+id+'" class="ciclos row"><td style="padding: 0.2%"></td><td class="center" id="codprod'+id+'" colspan="2"> <i class="mdi mdi-subdirectory-arrow-right" style="float:left;"></i> <input type="text" placeholder="RUBRO" style="width:85%;margin: 0px;" id="rubro'+id+'" class="rubro"/> </td> <td class="center divisa" id="prec'+id+'"> <input type="text" value="0" class="eder precd" id="precd'+id+'" style="margin: 0px;" /> </td> <td id="unitprod'+id+'"> <select id="unid'+id+'" class="unid" readonly style="margin: 0px;"><option>UN</option></select> </td> <td class="center"> <div id="divcnt" class="form-group"><input type="text" value="1" class="eder cantd" id="cantd'+id+'" style="margin: 0px;" /></div></td><td class="center totp" id="tota'+id+'">0</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></td> </tr>').insertAfter($(this).closest('tr'));

    $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:vidprod, vcantidad:0, vprecio:0, vdesc:0, vtotal:0, vidinventario:0,vidodt : 0,vimv:0,vcomodin:'',vidunidad:0,vidimpuestos:'',viddescuentos:'',strimp:''});
  
    $("#rubro"+id).focus();
    $("#unid"+id).material_select();
    $("#fdetallefacturas .select-wrapper input.select-dropdown").css('margin','0px');
});

$(document).on("change","#tdescuento",function(){
    $("#vdescuentop").val($("option:selected",this).attr('valor'));
    totalizar();
});

$(document).on("change","#tdescuentol",function(){
    var id = $("#hdnprd").val();
    var valor = $("option:selected",this).attr('valor');
    $("#edescuento").val(valor);
    $("#fd"+id).data('triforce')['vdescuento'] = valor;
    totalizar();
});

$(document).on("keyup","#edescuento",function(e){
    var code = e.which || e.keyCode
    if(code == 13){
        if(isNaN($(this).val())){
            Materialize.toast('Descuento no Válido',4000,'red')
            $(this).select().focus();
        }else
            $(this).blur();
        
    }
});


$(document).on("blur","#edescuento",function(){
    var id = $("#hdnprd").val();
    $("#fd"+id).data('triforce')['vdescuento'] = $(this).val();
    totalizar();
});

$(document).on("keyup","#vdescuentop",function(e){
    var code = e.which || e.keyCode
    if(code == 13){
        if(isNaN($(this).val())){
            Materialize.toast('Descuento no Válido',4000,'red')
            $(this).select().focus();
        }else
            $(this).blur();
    }
});

$(document).on("blur","#vdescuentop",function(){
    totalizar();
});

$(document).on("focus",".ven2",function(){
   $(this).select();
});

$(document).on("focus",".gan2",function(){
   $(this).select();
});

$(document).on("keyup",".ven2",function(e){
    var index = parseInt($(".ven2").index(this));
    var tam = parseInt($(".ven2").length);
    var code = e.wich || e.keyCode;

    if (code == 13) {
        $(this).blur();
        if(index+1 == tam)
            $(".addline").click();
        else
            $(".ven2").eq(index+1).focus();
    }
});

$(document).on("keyup",".gan2",function(e){
   var code = e.wich || e.keyCode;
   if (code == 13) {
        $(this).blur();
   }
});

$(document).on("blur",".ven2",function(){
    var id = $(this).parent().parent().attr('id').substr(1);
    var costo = parseFloat($("#cos2").html().replace(/,/g,''));
    var valorv = $("#n"+id+" .ven1").html();
    var valor = $(this).val();
    var imp = (parseFloat($("#vimpiva option:selected").attr('num'))/100+1);
    var divisa = parseFloat($("#monedas option:selected").attr('dv'));
    valor = isNaN(valor) ? valorv : valor;
    var g = parseFloat(valor)/imp - costo;
    var gg = (g*100)/costo
    $("#n"+id+" .gan2").val((gg).formatMoney(2,'.',''));
    $("#n"+id+" .gan2").attr('gn',g);
});

$(document).on("blur",".gan2",function(){
    var id = $(this).parent().parent().attr('id').substr(1);
    var costo = parseFloat($("#cos2").html().replace(/,/g,''));
    var valorv = $("#n"+id+" .gan1").html();
    var valor = $(this).val();
    var imp = (parseFloat($("#vimpiva option:selected").attr('num'))/100+1);
    var divisa = parseFloat($("#monedas option:selected").attr('dv'));
    valor = isNaN(valor) ? valorv : valor;
    $(this).attr('gn',(costo*(parseFloat(valor)/100+1))-costo);
    $("#n"+id+" .ven2").val((costo*(parseFloat(valor)/100+1)*imp).formatMoney(2,'.',''));
});

$(document).on("click",".mover",function(){
    var idp = $(this).attr('idp');
    var cantidad = parseFloat($(".lpcant",this).html());
    var nombre = $(".lpname",this).html();
    var valor = parseFloat($("#fd"+idp).data('triforce')['vprecio'])+parseFloat($("#fd"+idp).data('triforce')['vimv'])/parseFloat($("#fd"+idp).data('triforce')['vcantidad']);
    var otros = parseFloat($("#fd"+idp).data('triforce')['otros'])/parseFloat($("#fd"+idp).data('triforce')['vcantidad']);
    var cancelar = parseFloat($("#mxcan").val().replace(/,/g,''));
    var total = parseFloat($("#mxtot").val().replace(/,/g,''));
    var pbase = parseFloat($("#fd"+idp).data('triforce')['vprecio']);
    var imv = parseFloat($(this).attr('imv'));
    var descuento = $(this).attr('descuento');

    if($(this).attr('tm') == 1){
        if(cantidad > 0){
            var cnt = $("#lpc [idp="+idp+"]").length;
            $(".lpcant",this).html(cantidad-1);
            if(cnt){
                var cntact = parseFloat($("#lpc [idp="+idp+"] .lpcant").html())+1;
                $("#lpc [idp="+idp+"] .lpcant").html(cntact);
            }else{
                $("#lpc").append('<div class="col s12 mover" tm="2" ridp="'+$("#fd"+idp).data('triforce')['videntrada']+'" pbase="'+pbase+'" imv="'+imv+'" descuento="'+descuento+'" idp="'+idp+'" style="cursor:pointer;border:1px solid #e2e2e2"><span class="lpname" style="float: left;">'+nombre+'</span><span class="lpcant" style="float:right">1</span></div>');
            }

            $("#mxtot").val((total-valor-otros).formatMoney(2,'.',','))
            $("#mxcan").val((cancelar+valor+otros).formatMoney(2,'.',','))
            
            if(imv > 0)
                $("#mxcan").attr('subtotal',parseFloat($("#mxcan").attr('subtotal'))+pbase);
            else
                $("#mxcan").attr('exento',parseFloat($("#mxcan").attr('exento'))+pbase)
            $("#mxcan").attr('descuento',parseFloat($("#mxcan").attr('descuento'))+descuento);
            $("#mxcan").attr('imv',parseFloat($("#mxcan").attr('imv'))+imv);

            $("#mxtot").attr('imv',parseFloat($("#mxtot").attr('imv'))-parseFloat($("#mxcan").attr('imv')));
            $("#mxtot").attr('descuento',parseFloat($("#mxtot").attr('descuento'))-parseFloat($("#mxcan").attr('descuento')));
            $("#mxtot").attr('subtotal',parseFloat($("#mxtot").attr('subtotal'))-parseFloat($("#mxcan").attr('subtotal')));
            $("#mxtot").attr('exento',parseFloat($("#mxtot").attr('exento'))-parseFloat($("#mxcan").attr('exento')));

            $("#montoefect").val((cancelar+valor+otros).formatMoney(2,'.',','))
        }
    }else{
        var cntact = parseFloat($("#lmp [idp="+idp+"] .lpcant").html())+1;
        $("#lmp [idp="+idp+"] .lpcant").html(cntact);

        if(cantidad-1 > 0){
            $(".lpcant",this).html(cantidad-1);
        }else
            $(this).remove();

        $("#mxtot").val((total+valor+otros).formatMoney(2,'.',','))
        $("#mxcan").val((cancelar-valor-otros).formatMoney(2,'.',','))
        $("#mxcan").attr('subtotal',parseFloat($("#mxcan").attr('subtotal'))-pbase);
        if(imv > 0)
            $("#mxcan").attr('exento',parseFloat($("#mxcan").attr('exento'))-pbase)
        $("#mxcan").attr('descuento',parseFloat($("#mxcan").attr('descuento'))-descuento)
        $("#mxcan").attr('imv',parseFloat($("#mxcan").attr('imv'))-imv);
        $("#montoefect").val((cancelar-valor-otros).formatMoney(2,'.',','))

        $("#mxtot").attr('imv',parseFloat($("#mxtot").attr('imv'))-parseFloat($("#mxcan").attr('imv')));
        $("#mxtot").attr('descuento',parseFloat($("#mxtot").attr('descuento'))+parseFloat($("#mxcan").attr('descuento')));
        $("#mxtot").attr('subtotal',parseFloat($("#mxtot").attr('subtotal'))+parseFloat($("#mxcan").attr('subtotal')));
        $("#mxtot").attr('exento',parseFloat($("#mxtot").attr('exento'))+parseFloat($("#mxcan").attr('exento')));
    }

    $("#pconm").focus().select();
})

function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs,hinv,defi,uni,comodin,desgloce,vstrimp,vexo,vmobil) {

    var isiva = $("[for=iva]:visible").length ? $("#iva").is(":checked") : config[6];


    if(param.toString().match(new RegExp(/\b1\b|\b3\b|\b4\b|\b5\b|\b6\b|\b7\b/g)))
        $("[for=iva]").addClass('hide');
    else{
        isiva = 0;
        vexo = $("#vimpiva option:selected").attr('num')
    }

    if (isiva && vexo > 0){ 
        vexo = parseFloat(vexo);
        prec = prec/((vexo/100)+1);
    }

    tot = prec * cant;
    // var cst = getDatos('if(truncate(costo*(select (mnventa/100)+1 from ajustessucursales where idsucursal = @@impresa),5) >= '+prec+',1,0),truncate(costo*(select (mnventa/100)+1 from ajustessucursales where idsucursal = @@impresa),5)',11,'id='+idprod,0,0,0);

    // if(parseInt(cst[0][0][0]) && param.toString().match(new RegExp(/[1345678]/i))){
    //     $("[for=iva]").removeClass('hide');
    //     $(".addline").attr('sg',1);
    //     $("#precp").focus().select();
    //     Materialize.toast("Precio de Venta no Permitido",4000,"red");
    //     return false;
    // }

    if($("#valores").data('elemento') != undefined){
        var rpago = parseFloat($("#valores").data('elemento')['retpago']) == 0 ? '' : 'retpago="'+$("#valores").data('elemento')['retpago']+'"';
        var inventariado = $("#valores").data('elemento')['inventariado'];
        var comision = $("#valores").data('elemento')['comision'];
        var tmpidmoneda = $("#valores").data('elemento')['moneda'];
        var tmpdivisa = $("#valores").data('elemento')['divisa'];
        var vtimv = $("#vimpiva option:selected").val() != undefined ? $("#vimpiva option:selected").val() : $("#valores").data('elemento')['timv'];
    }else{
        var rpago = 'retpago=10';
        var inventariado = 0;
        var comision = 0;
        var tmpidmoneda = 1;
        var tmpdivisa = 1;
        var vtimv = 1;
    }


    $("#valores").removeData('elemento');

    if(comodin.indexOf('^') != -1)
        cod = comodin.replace(/\^/g,'');
    prec = (prec+0);
    tot = (tot+0);

    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec);

    $("#fdetallefacturas .ciclos").each(function(){
        var vid = $(this).attr('id').substr(2);
        
        var evalor = $(this).data('triforce')['vorig'] != undefined ? parseFloat($(this).data('triforce')['vorig']) :parseFloat($(this).data('triforce')['vprecio']);
        if ( idprod == $(this).data('triforce')['videntrada'] && hinv == $(this).data('triforce')['vidinventario'] && prec == evalor && $("#desc"+vid).html().trim() == desc.trim() && cod.trim() == $("#codprod"+vid).html().trim()) {
            existe = 1;

            if ( parseFloat($("#cant"+vid).text())+cant > cntinv && param.toString().match(new RegExp(/\b1\b|\b6\b|\b7\b|\b8\b/g)) && parseInt($(this).data('triforce')['isinventariado']) && comodin == '' ) {
                //EXCEDE EL NUMERO EN INVENTARIO
                Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red');
                $("#cantp").select();
                err = 1;
            }else{
                var tcant = (parseFloat($(this).data('triforce')['vcantidad'])+parseFloat(cant)).toFixed(3);
                $(this).data('triforce')['vcantidad'] = tcant;
                $("#cant"+vid).val(tcant);
            }
            
        }
    });

    if (!existe) {
        $(".edetalle").addClass('hide')
        var id = parseInt($("#ffacturas .zelda").data('triforce')['idline'])+1;
        var divisa = parseFloat($("#monedas option:selected").attr('dv'));

        var strprec = '<div style="padding: 0 !important;" class="col s2 center-align divisa" id="prec'+id+'">'+(precio).formatMoney(2,'.',',')+'</div>';

        $("#ffacturas .zelda").data('triforce')['idline'] = id;
        
        strprec = '<div style="padding: 0 !important;" class="col s2 center-align divisa hide" id="prec'+id+'">'+(precio).formatMoney(2,'.',',')+'</div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="fake'+id+'">0.00</div>'

        var codedg = '';
        if (desgloce == 1)
            codedg = '<span class="pbtn addesgloce" style="font-size:10px">[<i class="mdi mdi-plus"></i>]</span>';

        vmobil = $(".mstatic:visible").length ? 1 : 0;
        switch(parseInt(param)){
            case 1:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                if (vmobil) 
                    $("#fdetallefacturas").append('<div id="fd'+id+'" xtr="'+$("#ffacturas .zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div class="row col s12" style="padding:0px;"> <div class="col s12" style="padding: 0 !important;font-weight: bold;"><span id="desc'+id+'">'+desc+'</span> <div class="der"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div></div> <small><span class="col s3" style="padding: 0px">Precio Uni: </span><div style="padding: 0 !important;" class="divisa col s3" id="prec'+id+'">'+(precio+0).formatMoney(2,'.',',')+'</div> <span class="col s3" style="padding: 0px">Total: </span>  <div style="padding: 0 !important;" class="col s3 center-align totp" id="tota'+id+'">'+tot+'</div> </small> <div id="divcnt" style="padding: 0 !important;"><small>Cantidad: <span id="cant'+id+'">'+cant+'</span></small></div> </div><div style="padding: 0 !important;" class="col s1 hide center-align" id="unitprod'+id+'">'+uni+'</div>  </div>');
                else
                    $("#fdetallefacturas").prepend('<div id="fd'+id+'" '+rpago+' xtr="'+$("#ffacturas .zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check'+id+'" checked><label for="check'+id+'"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> '+strprec+' <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod'+id+'"><select class="browser-default pbtn" style="padding: 0;margin: 0;height:auto !important;width:100%;border:0;outline-color: black;">'+$("#uni").html()+' </select></div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align">  <input type="number" class="browser-default eder" id="cant'+id+'" value="'+cant+'" style="border:0px;width:100%;height:auto !important" /></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota'+id+'">'+tot+'</div> <div class="right">  <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding:0px"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding:0px"></a> <span id="mdesc'+id+'"></span></div> </div>');
                    break;
            case 104:
            case 9:
                var mboton = !$(".ven2").length ? '' : '<a href="#" id="m'+id+'" visible="0" class="mdi margen mdi-ticket-percent pbtn black-text" style="padding="0.2%" title="Cargar Margenes"></a>';
                $("#fdetallefacturas").prepend('<div id="fd'+id+'" xtr="'+$("#ffacturas .zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> <div id="unitprod'+id+'" style="padding: 0 !important;" class="col s1 center-align">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align divisa" id="prec'+id+'">'+(precio+0).formatMoney(2,'.',',')+'</div>  <div id="vdesc'+id+'" style="padding: 0 !important;" class="col s1 center-align"> '+dcs['descuento']+'% </div> <div cstyle="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota'+id+'">'+tot+'</div> <div align="right" > '+mboton+' <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding:0.2%"></a> <a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding:0.2%"></a></div> </div>');
                
                escribirMatriz($("#fd"+id));

                $(".ven1").html('0.00')
                $(".ven2").val('0.00')
                $(".gan1").html('0.00')
                $(".gan2").val('0.00')
                $("#cos1").html('0.00')
                $("#cos2").html('0.00')
                $("#preponderado").html('0.00')
                $("#vimpiva").val(8).material_select('update');
                break;
            case 3:
                $("#fdetallefacturas").prepend('<div id="fd'+id+'" '+rpago+' xtr="'+$("#ffacturas .zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> '+strprec+' <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod'+id+'">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota'+id+'">'+tot+'</div> <div class="right"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div> </div>');
                break;
        case 10:
            $("#fdetallefacturas").prepend('<div id="fd'+id+'" '+rpago+' xtr="'+$("#ffacturas .zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> '+strprec+' <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod'+id+'">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota'+id+'">'+tot+'</div> <div class="right"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div> </div>')
            break;
        }

        $("#fd"+id).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idprod,vcantidad : cant,vprecio : precio,vdesc : 0,vtotal : 0,vidinventario : hinv,vidodt : 0,vimv : 0,vcomodin : comodin,vidunidad : $("#uni").val(),vidimpuestos:'',viddescuentos:'',strimp : vstrimp,exoneracion:vexo,max: mdcs,iddesc:dcs['iddescuento'],vdescuento : dcs['descuento'],iva:isiva,isinventariado : inventariado,vcomision : comision,videxoneracion : vexo == 0 ? '' : $("#ffacturas .zelda").data('triforce')['videxoneracion'],timv : vtimv,partida_arancelaria:'',montoExo : 0});

        if (parseInt($("#monedas option:selected").attr('dv')) != 1)
            $("#prec"+id).attr('base',precio);

        $("#fd"+id).attr('vaccion',1);
    }
    totalizar();
    if (err == 0) {
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0);
        $("#precp").val('0.00');
        $("#totp").val('0.00');
        $("#cantI").text(0);
        $("#bname-inv").html(0.00);
        pril.focus();
    }
    

}

function totalizar(){
    
    var totd = 0;
    var total = 0;
    var impuesto = 0;
    var idesc = 0;
    var tmpdesc = 0;
    var gravado = exento = exonerado = 0;
    var desc = $("#vdescuentop").val();

    var vidlinea = vid = cantidad = precio = decindv = descmax = desct = dimv = timv  = rimv = iva_imp = geimv = simv = dunit = lrest = trest = 0;
    var divisa =parseFloat($("#monedas option:selected").attr('dv'));
    var exov = cexov = orig = 0;

    desc = isNaN(parseFloat(desc)) || desc == '' ? 0 : parseFloat(desc);

    $("[id^=imv_").html('0.00')

    $(".totp:visible").each(function(){

        vidlinea = $(this).prop('id').substr(4);
        
        exov = $("#fd"+vidlinea).data('triforce')['videxoneracion'] == '' ? 0 : parseInt($("#fd"+vidlinea).data('triforce')['videxoneracion'].substring(($("#fd"+vidlinea).data('triforce')['videxoneracion'].lastIndexOf('^'))+1));

        vid = $("#fd"+vidlinea).data('triforce')['videntrada'];
        cantidad    = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        precio      = parseFloat($("#fd"+vidlinea).data('triforce')['vprecio'])/(param == 2 ? 1 : divisa);
        
        if(config['tp_rest'] != undefined){
            switch(parseInt(config['tp_rest'])){
                case 0:
                    if($("#fd"+vidlinea).data('triforce')['vorig'] == undefined)
                        $("#fd"+vidlinea).data('triforce')['vorig'] = precio
                    else
                        precio = $("#fd"+vidlinea).data('triforce')['vorig'];

                    precio = $("#impm").is(':checked') ? (precio*(1+(parseFloat($("#fd"+vidlinea).data('triforce')['exoneracion'])/100)) )/(1.1+((parseFloat($("#fd"+vidlinea).data('triforce')['exoneracion'])/100)) ) : precio;

                    $("#fd"+vidlinea).data('triforce')['vprecio'] = precio;
                    break;
                default:
                    break;
            }
        }

        decindv     = parseFloat($("#fd"+vidlinea).data('triforce')['vdescuento']);
        descmax     = parseFloat($("#fd"+vidlinea).data('triforce')['max']);
        desct       = decindv;
        precio = precio * cantidad;
        tmpdesc = precio * (1-(desct/100));

        dunit = parseFloat(precio * ( (desct/100) + ((1-(desct/100)) * (desc/100) ))).toFixed(5);
        idesc += parseFloat(dunit);

        $("#fd"+vidlinea).data('triforce')['viddescuentos'] = '';
        $("#mdesc"+vidlinea).html('');

        if (desct > 0){

            $("#fd"+vidlinea).data('triforce')['viddescuentos'] += '['+$("#fd"+vidlinea).data('triforce')['iddesc']+'^'+dunit+']';
            $("#mdesc"+vidlinea).html('('+desct+'%)')
        }
        if (parseFloat($("#vdescuentop").val()) > 0)
            $("#fd"+vidlinea).data('triforce')['viddescuentos'] += '['+$("#tdescuento").val()+'^'+$("#vdescuentop").val()+'^'+dunit+']';

        $("#fd"+vidlinea).data('triforce')['vtotal'] = tmpdesc.toFixed(5);
        $("#tota"+vidlinea).html((tmpdesc).formatMoney(2,'.',','))
        $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
        $("#fd"+vidlinea).data('triforce')['vdesc'] = parseFloat(dunit).toFixed(5);
        tmpdesc = tmpdesc * (1-(desc/100));

        $(".dimpuesto").each(function(){
            if (parseFloat($(this).data('valores')['exoneracion']) != 0) {
                geimv = parseFloat($(this).data('valores')['exoneracion']);
            }

            // if ($("#fd"+vidlinea).data('triforce')['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0) {

                eimv = $("#fd"+vidlinea).data('triforce')['exoneracion'];
                timv = $("#fd"+vidlinea).data('triforce')['timv'];
                rimv = $("#vimpiva:visible").length ? $("#vimpiva option:selected").attr('num') : eimv;
                iimv = $(this).data('valores')['vid'];
                var simv = dimve = oimv  = 0

                if(parseInt(eimv) == 0 && $("#fd"+vidlinea+":visible").length || param == 8) { 
                    //PRODUCTOS O CLIENTES EXENTOS
                    if(parseFloat(param)== 8){
                        tmpdesc = parseFloat(tmpdesc*(1+rimv/100));
                    }
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
                    $("#fastVenta"+vidlinea).val(tmpdesc);
                    $("#fastVenta"+vidlinea).attr('imp',0);
                    exento += precio;
                    /*if (parseInt(config[16]))
                        $("#fake"+vidlinea).html(((((parseFloat(precio)+parseFloat(dimv))/cantidad))).formatMoney(2,'.',','))
                    else*/
                    $("#fake"+vidlinea).html(((((parseFloat(precio))/cantidad))).formatMoney(2,'.',','))

                    tmpdesc = 0;
                }

                if(tmpdesc && parseInt(eimv) > 0){ 
                    //PRODUCTOS O CLIENTES GRAVADOS
                    
                    if(parseInt(exov) && parseInt(eimv) > 0){
                        orig = tmpdesc;
                        var rexov = exov > rimv ? rimv : exov;

                        dimve = parseFloat(orig*(rimv/100)); //.toFixed(5)

                        exonerado += parseFloat(orig*(rexov/rimv));//.toFixed(5));
                        gravado += parseFloat(orig*(1-(rexov/rimv)));//.toFixed(5)));
                        simv = parseFloat(orig*(1-(rexov/rimv)/*.toFixed(5)*/))*(rimv/100);
                        $("#fd"+vidlinea).data('triforce')['montoExo'] = (dimve-simv).toFixed(5);
                        dimve = dimve-simv;
                        var lexo = $("#fd"+vidlinea).data('triforce')['videxoneracion'];
                        $("#fd"+vidlinea).data('triforce')['videxoneracion'] = lexo.substr(0,(lexo.lastIndexOf('^')))+'^'+parseFloat(rexov).toFixed(0);
                    }
                    else{
                        gravado += precio;
                        simv = parseFloat(tmpdesc*(rimv/100)).toFixed(5);
                    }
                    dimv =  simv
                    impuesto += parseFloat(dimv);

                    $("#fd"+vidlinea).data('triforce')['vimv'] = parseFloat(dimv).toFixed(5);
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = iimv+','+eimv+','+(parseFloat(dimv)+parseFloat(dimve)).toFixed(5)+','+timv;
                
                    var im_variable = parseFloat($("#imv_"+iimv).html().replace(/,/g,''))+parseFloat(dimv)
                    $("#imv_"+iimv).html((im_variable).formatMoney(2,'.',','));

                    tmpdesc = orig == 0 ? tmpdesc : orig;
                    
                    if (parseInt(config[16])) {
                        $("#tota"+vidlinea).html((parseFloat(tmpdesc)+parseFloat(dimv)).formatMoney(2,'.',','))
                        if($("#fake"+vidlinea).length)
                            $("#fake"+vidlinea).html(((((parseFloat(precio)+parseFloat(dimv))/cantidad))).formatMoney(2,'.',','))
                        else
                            $("#prec"+vidlinea).html(((((parseFloat(precio)+parseFloat(dimv))/cantidad))).formatMoney(2,'.',','))
                    }else{
                        $("#tota"+vidlinea).html(parseFloat(tmpdesc).formatMoney(2,'.',','))
                        $("#fake"+vidlinea).html((parseFloat(precio)/cantidad).formatMoney(2,'.',','))
                    }
                }

            if($("#serv:visible").length){
                lrest = precio*($("#serv").attr('porcentaje')/100);
                trest += lrest;
                $("#fd"+vidlinea).data('triforce')['otros'] = lrest;
            }

            totd += parseFloat($("#fd"+vidlinea).attr('retpago')) > 0 ? 0 : precio;
        });
    });

    total = totd + parseFloat(impuesto) - idesc;
    
     $("[retpago]").each(function(){
        var retvalor = parseFloat($(this).attr('retpago'));
        //var retcant = parseFloat($(this).data('triforce')['cantidad']);
        var retid = $(this).attr('id').substr(2);
        if($("#fake"+retid).length)
            $("#fake"+retid).html(0)
        else
            $("#prec"+retid).html(0)
    
        var ret = (totd-idesc)*(retvalor/100);
        total = total + ret;

        $(this).data('triforce')['vtotal'] = ret;
        $(this).data('triforce')['vprecio'] = ret;

         $("[id^=fake]:visible").each(function(){
            var id = $(this).attr('id').substr(4);
            var unit = (parseFloat($("#fd"+id).data('triforce')['vprecio'])*((retvalor/100)+1))+(parseFloat($("#fd"+id).data('triforce')['vimv'])/parseFloat(parseFloat($("#fd"+id).data('triforce')['vcantidad'])));
            $(this).html((unit).formatMoney(2,'.',','))
        });

        $("[id^=tota]:visible").each(function(){
            var id = $(this).attr('id').substr(4);
            var totln = (parseFloat($("#fd"+id).data('triforce')['vtotal'])*((retvalor/100)+1))+(parseFloat($("#fd"+id).data('triforce')['vimv']));
            $(this).html((totln).formatMoney(2,'.',','))
        });
    });

    $(".otroscargos:visible").each(function(){
        //var retvalor = parseFloat($(this).attr('porcentaje'));
        //var ret = 0;
        if(trest){
            //RET BRUTA: GRAVADO-----RET NETA: GRAVADO-IDESC
            // ret = (gravado+exonerado+exento-idesc)/parseFloat(retvalor);
            total+=trest;
            $("#serv").html(trest.formatMoney(2,'.',',')).attr('rret',trest.formatMoney(5,'.',''));
        }else{
            $("#serv").html(trest.formatMoney(2,'.',',')).attr('rret',trest.formatMoney(5,'.',''));
        }
     });
    
    $("#subtot").html((gravado).formatMoney(2,'.',','));
    $("#exent").html((exento).formatMoney(2,'.',','));
    $("#exonerado").html((exonerado).formatMoney(2,'.',','));
    $("#descuento_v").html((idesc).formatMoney(2,'.',','));

    $("#ffacturas .zelda").data('triforce')['vsubtotal'] = gravado.toFixed(5);
    $("#ffacturas .zelda").data('triforce')['vdescuento'] = parseFloat(idesc).toFixed(5);
    $("#ffacturas .zelda").data('triforce')['vimv'] = parseFloat(impuesto).toFixed(5);
    $("#ffacturas .zelda").data('triforce')['vexento'] = exento.toFixed(5);
    $("#ffacturas .zelda").data('triforce')['vexonerado'] = exonerado.toFixed(5);
    
    $("#tot").html(((total)).formatMoney(2,'.',','));

}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    switch(vmodulo['modulo']) {
        case 'factura':
            // if (vmodulo['tip'] == '') {
                
            //     err = validarFactura();
            //     if ( err ) {
            //         return err;
            //     }
            // }
            break;
        case 'detallefactura':
            if (vmodulo['tip'] == '') {
                err = validarDetalleFactura();
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'cliente':
            if (vmodulo['tip'] == '') {
                err = validarClientes();

                if ( err ) {
                    return err;
                }
            }
            break;
        case 'correo':
            break;
        case 'producto':
            if (vmodulo['tip'] == '') {
                err = validarProductos();

                if ( err ) {
                    return err;
                }
            }
            break;
        case 'servicio':
            if (vmodulo['tip'] == '') {
                err = validarServicios();

                if ( err ) {
                    return err;
                }
            }
            break;
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");

    return salida;

}

function validarClientes(){
    if ($("#fclientes #vnombre").val() == '') { $("#fclientes #vnombre").focus(); return 'El campo Nombre es requerido'; };
    if ($("#fclientes #vcedula").val() == '') { $("#fclientes #vcedula").focus(); return 'El campo Cédula es requerida'; };
}

function validarProductos() {

    if ($("#fproductos #vpnombre").val() == '') { $("#fproductos #vpnombre").focus(); return 'El campo Nombre es requerido'; };
    if ($("#fproductos #vcodigo").val() == '') { $("#fproductos #vcodigo").focus(); return 'El campo Codigo es requerido'; };
    $("#fproductos .zelda").data('triforce')['vnombre'] = $("#fproductos #vpnombre").val();
    $("#fproductos .zelda").data('triforce')['vidmoneda'] = $("#fproductos #pmoneda").val();
    $("#fproductos .zelda").data('triforce')['vexoneracion'] = $("#pimv option:selected").attr('num');
    $("#fproductos .zelda").data('triforce')['vtimv'] = $("#pimv option:selected").val();
}

function validarServicios() {

    if ($("#fservicios #vpnombre").val() == '') { $("#fservicios #vpnombre").focus(); return 'El campo Nombre es requerido'; };
    if ($("#fservicios #vcodigo").val() == '') { $("#fservicios #vcodigo").focus(); return 'El campo Codigo es requerido'; };
    $("#fservicios .zelda").data('triforce')['vnombre'] = $("#fservicios #vpnombre").val();
    $("#fservicios .zelda").data('triforce')['vidmoneda'] = $("#fservicios #pmoneda").val();
    $("#fservicios .zelda").data('triforce')['vexento'] = $("#pimv option:selected").attr('num');
    $("#fservicios .zelda").data('triforce')['vtimv'] = $("#pimv option:selected").val();
}

function validarDetalleFactura(){
    var ciclos = $("#fdetallefacturas .ciclos");
    var fila;
    var cantidad = ciclos.length;
    var divisa = parseFloat($("#monedas option:selected").attr('dv'));

    for (var i = 1; i <= cantidad; i++) {
        fila = $("#fd"+i);
        if (fila.data() == undefined) {
            cantidad++;
            continue;
        }
        if(fila.data('triforce')['vcomodin'] == "1")
            fila.data('triforce')['vcomodin'] = $("#desc"+i).html();

        if(param == 6)
            fila.data('triforce')['vid'] = -1;

        if (divisa != 1) { 
            if(param == 2)
                fila.data('triforce')['vprecio'] = parseFloat(fila.data('triforce')['vprecio'])*divisa;
            fila.data('triforce')['vimv'] = parseFloat(fila.data('triforce')['vimv'])*divisa;
            fila.data('triforce')['vdescuento'] = parseFloat(fila.data('triforce')['vdescuento'])*divisa;
            fila.data('triforce')['vexonerado'] = parseFloat(fila.data('triforce')['vexonerado'])*divisa;
            fila.data('triforce')['montoExo'] = parseFloat(fila.data('triforce')['montoExo'])*divisa;
        }

        if(fila.data('triforce')['videxoneracion'] != '')
            fila.data('triforce')['videxoneracion'] += '^'+fila.data('triforce')['montoExo'];
    }

    return false;
}

function validarFactura() {

    /*if(parseInt($("#ffacturas .zelda").data('triforce')['xmlotros'])){
        $("#xo-sh").click()
        return 'Datos por llenar';
    }*/

    if(config[28] == '-1')
        return 'Su Llave CRIPTOGRAFICA a caducado, favor <a href="ajustes" class="btn" style="float:right"> Actualizar</a>';

    if($("#fdetallefacturas:visible").length){ //NORMAL
        if ($("#fdetallefacturas .ciclos:visible").length == 0) {
            pril.focus()
            return "No se Han Ingresado Productos en Detalle";
        }
    }else{ //NUBE
        if ($("#fdetallefacturas .ciclos").length == 0) {
            pril.focus()
            return "No se Han Ingresado Productos en Detalle";
        }
    }
    
    if (str_correos.length == '' && param == 1) {
        $("#crrclie").click()
        return "Cliente sin Correo Electrónico";
    }

    switch(parseInt($("#ffacturas .zelda").data('triforce')['vidtipoventa'])){
        case 9:
        case 104:
            if ($("#ffacturas .zelda").data('triforce')['vidcliente'] == 0){
                $("#ncli").focus();
                return "No se Ha Ingresado Proveedor";
            }

            if($("#ffacturas .zelda").data('triforce')['vidtipoventa'] == "9"){
                var dirprov = getDatos('idbarrio',239,'idtabla = 2 and idfila = '+$("#ffacturas .zelda").data('triforce')['vidcliente'],0,0,0);
                if(dirprov[0][0][0] == "0"){
                    return 'Requiere Establecer Ubicacion del Proveedor';
                }
            }     
            
            $("#ffacturas .zelda").data('triforce')['visregistrada'] = parseInt($("[name='tcompra']:checked").val())

            if ($("#vreferencia").val().trim() == ''){
                $("#vreferencia").focus();
                return "No se Ha Ingresado la Referencia";
            }

            var refprod = getDatos('id',64,'if(CHAR_LENGTH(referencia) =50,substring(referencia,32,10)*1,referencia) = "'+$("#vreferencia").val().trim()+'" and idsucursal = @@impresa and id <> '+$("#ffacturas .zelda").data('triforce')['vid']+' and idcliente = '+$("#ffacturas .zelda").data('triforce')['vidcliente'])[0];

            if (refprod.length) {
                $("#vreferencia").focus().select();
                return "Referencia ya Existente";
            }
            break;
        case 4:
            if(!$("#ncli").val().trim().length){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }

            if ($("#ffacturas .zelda").data('triforce')['vidcliente'] == 0){
                $("#ffacturas .zelda").data('triforce')['vcomodin'] = $("#ncli").val();
            }

            break;
        case 5:
            if ($("#ffacturas .zelda").data('triforce')['vidcliente'] == 0){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }
            break;
        case 6:
            if (!$("#ncli").val().length){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }

            if(!parseInt($("#ffacturas .zelda").data('triforce')['vidcliente']))
                $("#ffacturas .zelda").data('triforce')['vcomodin'] = $("#ncli").val().trim();
            break;
        case 10:
            if (!$("#ncli").val().length){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }
            $("#fdetallefacturas .ciclos").each(function(){
                $(this).data('triforce')['partida_arancelaria'];
            });

            return 'MANTENIMIENTO';
            break;
        default:
            if ($("#ffacturas .zelda").data('triforce')['vidcliente'] == 0)
                $("#ffacturas .zelda").data('triforce')['vcomodin'] = $("#ncli").val();
            break;
    }

    switch(parseInt( $("#ffacturas .zelda").data('triforce')['vidtipo'])) {
        case 2:
            if(isNaN($("#vplazo").val())){
                $("#vplazo").focus()
                return 'Plazo del Crédito no Válido';
            }

            if(parseInt($("#vplazo").val()) <= 0){
                $("#vplazo").focus()
                return 'Plazo del Crédito Debe ser Mayor a 0';
            }

            var p = arr('login',4,'',205,$("#ffacturas .zelda").data('triforce')['vidcliente']+',1,'+$("#tot").html().replace(/,/g,''),0,0,0);

            var clr = 'black';
            p[0][0][0] = $("#modal-limitcre").data('cont') == undefined ? p[0][0][0] : 0;
            switch(p[0][0][0]){
                case '1':
                case '2':
                    var num = parseInt(p[0][0][0]);
                    $("#tit-creli").html($('#ncli').val());
                    var head = getDatos('format(getSaldoCliente('+$("#ffacturas .zelda").data('triforce')['vidcliente']+',0),2) as cre,format(getSaldoCliente('+$("#ffacturas .zelda").data('triforce')['vidcliente']+',1),2) as ven,plazo,format(credito,2)',2,'id='+$("#ffacturas .zelda").data('triforce')['vidcliente'])[0][0];
                    var cuerpo = getDatos('',255,$("#ffacturas .zelda").data('triforce')['vidcliente']+',1');
                    var ctot = cuerpo[0].length;
                   
                    if(ctot){
                        var appd = '';
                        for (var i = 0; i < cuerpo[0].length; i++) {
                            appd += '<tr> <td>'+cuerpo[0][i][0]+'</td> <td>'+cuerpo[0][i][1]+'</td> <td>'+cuerpo[0][i][2]+'</td> <td>'+cuerpo[0][i][3]+'</td> <td>'+parseFloat(cuerpo[0][i][4]).formatMoney(2,'.',',')+'</td> <td>'+cuerpo[0][i][5]+'</td> </tr>';
                        }
                        $("#listvencidas").html(appd)
                    }else {
                        $("#listvencidas").html('<tr> <td colspan="6" style="text-align=center;" >No Hay Facturas Vencidas</td> </tr>')
                    }
                    var tmventa = (parseFloat(head[0].replace(/,/g,''))+parseFloat($("#tot").html().replace(/,/g,''))).formatMoney(2,'.',',')
                    $("#lmtot").val(head[0]).css('color',num == 2 && parseFloat(head[0].replace(/,/g,'')) > parseFloat(head[3].replace(/,/g,'')) ? 'red' : clr);
                    $("#lmmon").val(head[1]).css('color',clr);
                    $("#lmday").val(head[2]).css('color',clr);
                    $("#lmcre").val(head[3]).css('color',num == 2  ? 'red' : clr );
                    $("#lmven").val(ctot);
                    $("#lmrtot").val(tmventa).css('color',num == 2 && parseFloat(tmventa.replace(/,/g,'')) > parseFloat(head[3].replace(/,/g,'')) ? 'red' : clr );
                    Materialize.updateTextFields();

                    $("#modal-limitcre").modal('open');
                    return 'Venta Excede el Límite de Crédito';
                    break;
                default:
                    break;
            }

            break;
        default:
            break;
    }
 
    if($(".vextra:visible").length){
        $("#ffacturas .zelda").data('triforce')['vextrapagos'] = $(".vextra:visible").val();
    }
    
    $("#ffacturas .zelda").data("triforce")['voc'] = $("#oc").val();
    $("#ffacturas .zelda").data("triforce")['vidmoneda'] = $(".moneda").first().data("triforce")['id'];
    $("#ffacturas .zelda").data("triforce")['vdivisa'] = $(".moneda").first().data("triforce")['valor'];
    var divisa = parseFloat($("#ffacturas .zelda").data("triforce")['vdivisa']);

       if (divisa != 1) {
            $("#ffacturas .zelda").data('triforce')['vimv'] = parseFloat($("#ffacturas .zelda").data('triforce')['vimv']*divisa);
            $("#ffacturas .zelda").data('triforce')['vsubtotal'] = parseFloat($("#ffacturas .zelda").data('triforce')['vsubtotal']*divisa);
            $("#ffacturas .zelda").data('triforce')['vexento'] = parseFloat($("#ffacturas .zelda").data('triforce')['vexento']*divisa);
            $("#ffacturas .zelda").data('triforce')['vdescuento'] = parseFloat($("#ffacturas .zelda").data('triforce')['vdescuento']*divisa);
            $("#ffacturas .zelda").data('triforce')['vexonerado'] = parseFloat($("#ffacturas .zelda").data('triforce')['vexonerado']*divisa);
        }
        
    return false;
}

function cargar(vmodulo,vid) {

    switch(vmodulo['modulo']) {
        case 'compra':
            vmodulo['sel'] = 'id as vid,cedula as vcedula,nombre as vnombre';
            vmodulo['tbl'] = 3;
            vmodulo['where'] ='id ='+vid;
            break;
        default:
            return 'Módulo no Existente';
            break;
    }
    return vmodulo;
}

function cargarSintax(){
    var arr = {}
    arr['sel'] = '*';
    arr['tbl'] = 4;
    arr['where'] = 'Id > 0 order by `Razón Social`';
    return arr;
}

function cargarProducto(kbrota,elemento) {

    var cantidad = 1;
    var iscomodin = 0;
    var divisa = parseFloat($("#monedas option:selected").attr('dv'));
    
    $("#precp").attr('base',"0.00");
    $("#totp").attr('base',"0.00");
    $("#uni").removeAttr('old');

    if($("#codp").val() == '' && $("#descp").val() == '')
        return false;

    if($("#codp").val().substr(0,2) == config[30] && $("#codp").val().trim().length > 10 && parseInt(config[30])){ //LECTOR DE CODIGOS
        var romana = getDatos('prefijo,codigo,peso,omitir',341,'caja=0')[0][0];
        var r_codigo =  romana[1].split(',');
        r_codigo = $("#codp").val().trim().substr(r_codigo[0],r_codigo[1]);
        var r_peso =  romana[2].split(',');
        var r_decimales = r_peso[2];
        r_peso = $("#codp").val().trim().substr(r_peso[0],r_peso[1]);
        $("#codp").val(((r_peso*1/(Math.pow(10,r_decimales)))+'*'+r_codigo*1));
    }

    /*COMODIN = 0 => NORMAL
              = 1 => CAMBIO_NOMBRE_SIN_ID_GRABADO
              = 2 => CAMBIO_NOMBRE_SIN_ID_EXENTO
              = 3 => CAMBIO_NOMBRE_CON_ID
              = 4 => CAMBIO_CODIGO
    */
    if ( $("#codp").val().indexOf('*') != -1) {
        if ($("#codp").val().length == 1) {
            iscomodin = 1
        }else{
            if($("#codp").val() == '**'){
                iscomodin = 2
            }else{  
                kbrota = $("#codp").val().substring($("#codp").val().indexOf('*')+1);
                cantidad = $("#codp").val().substring(0,$("#codp").val().indexOf('*'));
                if(cantidad == ''){
                    iscomodin = 4;
                } 
            }
                 
        }
    }
    
    if ( $("#codp").val().indexOf('/') != -1 && $("#codp").val().indexOf('/') == $("#codp").val().length-1) {
        kbrota = $("#codp").val().substring(0,$("#codp").val().indexOf('/'));
        if(kbrota.length){
            iscomodin = 3;
        }
    }

    if ($("#codp").val().substr(0,1) == '-') {
        kbrota = 'S'+$(this).val();
    }else if($("#codp").val().substr(0,1) == '+') {
        kbrota = 'P-'+$(this).val().substr(1);
    }

    if (parseInt(config[12])){
        $("#iva").prop('checked',true)
    }
    else
        $("#iva").prop('checked',false)

    var cod = arr('login',4,'',43,'"'+ kbrota.replace(/"/g,"\\\"") +'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+param+','+$("#invgeneral").val(),0,0,0);
   
    if (cod[0][0] != undefined) {

        cod = cod[0][0];
        var char1 = cod[0].substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var dvalor = iscomodin ? {descuento:0,iddescuento:0} : cargarDescuentos(cod[0].substr(1)+',0',tabla,2);          
        if(!$("#iva").is(":checked") && $("#iva:visible").length && !param.toString().match(new RegExp(/\b9\b|\b104\b|\b8\b/g)) )
                cod[3] = parseFloat(cod[3])/((parseFloat(cod[8])/100)+1);

        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13] == '' ? 0 : cod[13], hbod:cod[13] == '' ? 0 : cod[13], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin,idheredado : cod[18],retpago : cod[11],inventariado:cod[20],comision:cod[23],moneda:cod[24],divisa : cod[25],timv:cod[26]}) //,imp: cod[6]

        if (param.toString().match(new RegExp(/\b9\b|\b104\b/g))){
             cod[3] = cod[3]/(divisa == 1 ? 1 : parseFloat(cod[25]));
             $("#precp").attr('mreal',cod[25]);
         }
        else 
            cod[3] = cod[3]/divisa;
        
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        $("#precp").val(parseFloat(cod[3]).formatMoney(2,'.',','));
        $("#totp").val((parseFloat(cod[3])*cantidad).formatMoney(2,'.',','))
        
        if (cod[4] == '?') {
            $("#cantI").html('∞');
        }else{
            $("#cantI").html(cod[4]);
            $("#tuni").html(cod[22]);
            $("#bname-inv").html(cod[4]);
        }
        cargarunidades(cod[0],cod[15])

        var strimp = cargarImpuestos(cod[0].substr(1)+',0',tabla);
        $("#valores").data("elemento")['strimp'] = strimp;

        if (strimp.substr(strimp.indexOf(',',2)+1).length) {
            strimp = strimp.substr(0,strimp.indexOf(',',2)+1)
            var _sum = strimp.substr(strimp.indexOf(',',2)+1) == '' ? cod[9] : strimp.substr(strimp.indexOf(',',2)+1);
            $("#valores").data("elemento")['exo'] = _sum;
            cod[9] = _sum;
        }

        $("#cantp").val(cantidad);

        if(param != 104 && param != 9){ //PRODUCTO DE VALOR VARIABLE
            if(!parseInt(cod[19])){
                $("#precp").prop("readonly",true);
            }
            else
                $("#precp").removeAttr("readonly");
        }

        if(param == 104 || param == 9){
            $("#vimpiva").val(cod[7]).material_select('update');
        }

        if (iscomodin) {
            switch(iscomodin){
                case 4:
                    $("#codp").select().focus();
                    break;
                default:
                    $("#precp").prop("readonly",false);
                    $("#descp").select().focus();
                    break;
            }
        }else{
            endCargarProducto(cod[9],cod[19],cod[21]);   
        }

        var notas = getDatos('nota',333,'idtipo=2 and idsucursal = @@impresa and idtabla = 11 and idfila = '+cod[0]);
        if(notas[0].length && param.toString().match(new RegExp(/\b1\b|\b7\b|\b10\b|\b8\b/g))){
            $("#shnotas").removeClass('hide')
        }
        Materialize.updateTextFields()
    }else{
        switch(param) {
            case 104:
            case 9:
            case 4:
                var $toastContent = $('<span>Item no Existente</span>').add($('<button class="btn-flat toast-action green white-text addProduct">Agregarlo</button>'));
                Materialize.toast($toastContent, 10000);

                $(".addProduct").focus();
                break;
            default:
                Materialize.toast('Item no Existente',4000,'red');
                break;
        }
        
    }
}

function endCargarProducto(exo,cod,pesaje){
    var modselec = $("input[name='modselected']:checked").val();

    if (modselec == 1 || cod != 0 || param == 9 || param == 104) {

        if (($("#precp").prop("readonly") == undefined || !$("#precp").prop("readonly")) && (param != 104 && param != 9)){
            $("#precp").focus().select();

            if (exo > 0) {

                var impuestos = 0;

                $("#precp").val( (parseFloat($("#valores").data("elemento")['hprec'])).formatMoney(2,'.',',') ) 
                $("#precp").blur();
                $("#precp").select().focus();
                $("[for=iva]").removeClass('hide');
                
            }
        }else{
            if (param == 9 || param == 104) {
                
                $("#vimpiva").val($("#valores").data("elemento")['timv']).material_select('update');
                if (parseInt(pesaje)){
                    $("._uni .select-wrapper .select-dropdown").click();
                    $("._uni .select-wrapper .select-dropdown").addClass('active');
                    $("._uni .select-wrapper .select-dropdown").focus();
                    $("._uni .select-wrapper .select-dropdown").first('li').addClass('selected');
                }
                else
                    $("#cantp").focus().select();
                
                if($(".ven2").length){
                    $("#ffacturas .zelda").data('triforce')['margenes'] = $("#valores").data('elemento')['idp'];
                    cargarMargenes();
                }
            }else{
                $("[for=iva]").removeClass('hide');
                $("#cantp").focus().select();
            }
        }
        
    }else{
        if (!parseInt(pesaje)) {
            $("[for=iva]").addClass('hide');
            var e = jQuery.Event("keyup");
            e.which = 13;
            $("#cantp").trigger(e);
        }else{
            $("[for=iva]").removeClass('hide');
            $("#iva").prop('checked',false);
            $("#cantp").focus().select();
        }
        
    }     
}

function cargarunidades(vidproducto,vunidad) {
    var uni = '';
    var unis = getDatos('',250,vidproducto,0,0,0)[0];

    $.each(unis, function(index, valor) {
        uni += '<option value="'+valor[0]+'" cant="'+valor[2]+'">'+valor[1]+'</option>';
    });
    $("#uni").html(uni);
    $("#uni").val(vunidad);
    $("#uni").material_select('update');
    if(vunidad != 1)
        $("#uni").change();
    else
        punidad = 0;
}

function endDetail(vid,vacc,vmodulo) {
    switch(vmodulo){
        case 'factura':
            var factura = getDatos('lpad(consecutivo,6,0),fe_getclave(id)',64,'id = '+vid[0][0],0,0)[0][0];
            rclave = factura[1];
            factura = factura[0];
            var clave = vid[0][0];

            if($(".per15:visible").length){
                getDatos('',321,vid[0][0]+',1'); 
            }

            switch(parseInt(param)) {
                case 104:
                $("#ffacturas .ciclos").each(function(){
                   var idp =  $(this).data('triforce')['videntrada'];
                   var matriz = $(this).data('matriz');
                   var rrmoneda = parseInt(getDatos('idmoneda',11,'id = '+idp,0,0,0)[0][0][0]);
                   var rrdivisa = parseInt($("#monedas").val());
                   
                   var rdivisa = rrmoneda == rrdivisa ? 1 : parseFloat($("#monedas option:selected").attr('dv'));
                   var rmoneda = rrmoneda == rrdivisa ? 1 : parseFloat($("#monedas option[value="+rrmoneda+"]").attr('dv'));

                   for (var i = 0; i < matriz.length; i++) {
                        matriz[i][2] = (parseFloat(matriz[i][2])/rmoneda)*rdivisa;
                        matriz[i][0] = (parseFloat(matriz[i][0])/rmoneda)*rdivisa;

                       if(parseInt(matriz[i][3])){
                            var precioe = getDatos('id',105,'idtipoentrada = 1 and identrada = '+idp+' and idnivel = '+matriz[i][3],0,0,0);

                            if(precioe[0].length)
                                actualizar(105,'ganancia = '+matriz[i][2]+',venta = '+matriz[i][0],'idtipoentrada = 1 and identrada = '+idp+' and idnivel = '+matriz[i][3]);
                            else
                                insertar(105,'','null,1,'+idp+','+matriz[i][3]+','+matriz[i][2]+',0,'+matriz[i][0]);
                       }else{ //PRECIO PUBLICO 
                            insertar(330,'','null,1,0,'+matriz[0][0]+',0,now(),'+idp+',@@usr,@@impresa,'+matriz[0][2]+',0,'+$(this).data('triforce')['vprecio']+',0');
                            actualizar(11,'costo = '+$(this).data('triforce')['vprecio']+',ganancia = '+matriz[0][2]+',venta = '+matriz[0][0]+',exoneracion='+$(this).data('triforce')['exoneracion']+',timv='+$(this).data('triforce')['timv'],'id = '+idp);
                       }
                   }
                });
                    break;
                case 1:
                case 7:
                case 8:
                    var ms = 0
                    var set = '';

                    if($("#codact option:selected").attr('orig') == undefined){
                        ms = 1;
                        set += 'codactividad = "'+$("#codact option:selected").val()+'",';
                    }

                    if($("#impm:visible").length){
                        var sr = parseFloat($("#serv").attr('rret').replace(/,/g,''));
                        if (sr > 0) {
                            ms = 1;
                            set += 'servmesero = '+sr+',';
                        }
                    }

                    if(ms){
                        set = set.substr(0,set.length-1);
                        insertar(291,'idfactura',vid[0][0]);
                        actualizar(291,set,'idfactura = '+vid[0][0]);
                    }

                    if(config[29] != '' && config[29] != '99'){ 
                        insertar(338,'','null,'+vid[0][0]+',64,1,"",0,@@impresa');
                        insertar(338,'','null,'+vid[0][0]+',65,1,"",0,@@impresa');
                    }
                    break;
                default:
                    break;
                }

            if (parseInt(idext) < 0){
                var usr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
                insertar(327,'','null,'+idext+',now(),'+usr+',@@impresa,'+$("#tot").html().replace(/,/g,'')+',4,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+vid[0][0]);
                getDatos('',259,'0,'+idext+',0',0,0,0);
            } 

            $("._xmlotros").each(function(){
                insertar(332,'',vid[0][0]+','+$(this).attr('vid')+',"'+$(this).find('input').val()+'"');
            });

            if (config[0] == 1 && param.toString().match(new RegExp(/\b1\b|\b7\b|\b10\b/g))) {
                var $toastContent = $('<span style="width: 500px">Generando Factura Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
                Materialize.toast($toastContent,5000);
                sendFE(clave);
            }else{
                sendVMail(factura,clave,vid[0][0]);
            }
            break;
        case 'producto':

            $("#modal-producto").modal('close');

            if($("#codp:visible").length)
                $("#codp").val($("#vcodigo").val()).blur();
            else{
                $("[activeq=1]").val($("#vcodigo").val());
                $("[activeq=1]").parent().parent().data('triforce')['videntrada'] = vid[0][0];
                $("[activeq=1]").parent().find('.addProducto').hide()
            }
            break;
        case 'servicio':

            $("#modal-producto").modal('close');

            if($("#codp:visible").length)
                $("#codp").val($("#vcodigo").val()).blur();
            else{
                $("[activeq=1]").val($("#vcodigo").val());
                $("[activeq=1]").parent().parent().data('triforce')['videntrada'] = vid[0][0];
                $("[activeq=1]").parent().find('.addProducto').hide()
            }
            break;
        default:
            console.log('Modulo no Existente ENDDETAIL: '+vmodulo);
            break;
    }
    

    return false;
}

function verfacturas() {
    window.open("facturacion?accion=8&tf="+(param == 7 ? 1 : param));
}

function searchClient(vvariable,visprv){
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv+',@@impresa','',0,'');

    $(".clieBTN").addClass('hide');
    $("#xo-sh").addClass('hide');

    if(parseInt(clie[0][0][22])){
        $("#ffacturas .zelda").data('triforce')['xmlotros'] = clie[0][0][22];
        var xmlo = getDatos('id,label,val',331,'idtabla=2 and enfactura and idfila='+clie[0][0][0])[0];

        var xo_bdy = '';

        for (var i = 0; i < xmlo.length; i++) {
            if(xmlo[i][2] == '%ORDEN_COMPRA%'){
                
                xmlo[i][2] = $("#oc").val();
                $("#oc").attr('trg',"._xmlotros[vid="+xmlo[i][0]+"] .inp")
            }

            xo_bdy += '<tr class="_xmlotros" vid="'+xmlo[i][0]+'"> <td>'+xmlo[i][1]+'</td> <td> <input type="text" class="inp" value="'+xmlo[i][2]+'"> </td> </tr>';
        }
        $("#xo-bdy").html(xo_bdy);
        $("#xo-sh").removeClass('hide');
    }

    if (clie[0][0][0] != "0") {
        var vclie = clie[0][0];
        $("#ffacturas .zelda").data('triforce')['vidcliente'] = vclie[0];
        $("#ncli").val(vclie[1]+' '+vclie[2]);
        param = param == 7 ? 1 : param;

        if ($("#ffacturas .zelda").data('triforce')['vidtipoventa'] == 7){
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 1;
            var ncons = getDatos('lpad(consecutivo+1,10,0)',252,'idsucursal = @@impresa and id > 0',0,0)[0][0];
            $("#titfact").html('FACTURAS')
            $("#idfact").html(ncons);
        }

        $(".chg_tipo").removeAttr('disabled');

        if ((vclie[3] > 0 || param==2) && $(".concre:visible").length) {
            $(".chg_tipo[val=2]").removeAttr('disabled');
            $(".chg_tipo[val=2]").click();
        }
        // else{
        //     $(".chg_tipo[val=2]").attr('disabled','true')
        // }

        if ($("#ffacturas .zelda").data('triforce')['vidtipo'] == 2)
            $("#vplazo").val(vclie[3]);
        else
            $("#vplazo").val(0);
    
        $("#msaldo").html(parseFloat(vclie[11]).formatMoney(2,'.',','));
        var porcen = vclie[12] == 0 ? 0 : (parseFloat(vclie[11])*100)/parseFloat(vclie[12]);

        if (porcen <= 75)
            $("#msaldo").addClass('green-text');
        else if (porcen > 75 && porcen < 100)
            $("#msaldo").addClass('yellow-text');
        else if (porcen >= 100)
            $("#msaldo").addClass('red-text');

        if (parseInt(visprv)) {
            $("#hisclie").removeClass('hide');
        }else{
            if (!param.toString().match(new RegExp(/\b6\b|\b5\b|\b8\b/g))) {
                $("#exobtn").removeClass('hide');
                $("#norden").removeClass('hide');
            }
            $("#crrclie").removeClass('hide');
            $("#hisclie").removeClass('hide');
        }
        
        
        if (/[1478]/i.test(param)) {
            $("#vdescuentop").val(vclie[4]);
            $("#vdescuentop").data('valor',vclie[4]);

            var correos = getDatos("",18,$("#ffacturas .zelda").data('triforce')['vidcliente']+",2",0,0,0);
            str_correos = '';
            if (!correos['succed']) {
                Materialize.toast('Correos Inválidos',4000,'red');
            }else{
                for (var i = 0; i < correos[0].length; i++) {
                    str_correos += correos[0][i][3]+",";
                }

                str_correos = str_correos.substr(0,str_correos.length-1);
                tmp_correos = '';
            
            $("#vidagente").val(vclie[14]).change();
            $("#vidagente").material_select('update');
            }

        }else{
            $("#vdescuentop").val();
            $("#vdescuentop").data('valor',0);
        }

        if (vclie[13] != 1) {
            $("#monedas").val(vclie[13]).change();
            $("#monedas").material_select('update');
        }

        if (parseInt(vclie[16]) && (param == 1 || param == 10 || param == 4 || param == 5)) {

            $("#vtipodoc").val(vclie[16]).material_select('update')
            $("#vnumdoc").val(vclie[17])
            $("#ventidad").val(vclie[18])
            $("#vfechaDoc").val(vclie[19])
            $("#vtimeDoc").val(vclie[20])
            $("#vporcompra").val(vclie[21])

            $("#ffacturas .zelda").data('triforce')['videxoneracion'] = vclie[16]+"^"+vclie[17]+
            "^"+vclie[18]+"^"+vclie[19]+"T"+vclie[20]+"-06:00^"+vclie[21];
        }

    }else{
        str_correos = '';
        param = param == 1 ? 7 : param;
        if ($("#ffacturas .zelda").data('triforce')['vidtipoventa'] == 1){
            $("#ffacturas .zelda").data('triforce')['vidtipoventa'] = 7;
            var ncons = getDatos('lpad(consecutivo6+1,10,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#titfact").html('TIQUETES')
            $("#idfact").html(ncons);
        }

        $("#ffacturas .zelda").data('triforce')['vidcliente'] = 0;
        $("#vdescuentop").val(0);
        $("#vdescuentop").data('valor',0);
        $("#ced").val('');
        $("#vplazo").val(0);

        $("#ffacturas .zelda").data('triforce')['videxoneracion'] = '';
        $(".chg_tipo").attr('disabled','disabled')
        $(".chg_tipo[val=1]").removeAttr('disabled');
        $(".chg_tipo[val=1]").click()

        $("#ingclie").removeClass('hide');
    }

    cargarImpuestos($("#ffacturas .zelda").data('triforce')['vidcliente'],'2');
    cargarDescuentos($("#ffacturas .zelda").data('triforce')['vidcliente']+',0','2');
    // cambio cliente
    var producto = $("#fdetallefacturas .ciclos");
    producto.each(function(i) {
        var idlinea = $(this).attr('id').substr(2);
        // var idprod = $("#desc"+idlinea).text();
        // var prod = arr('login',4,'',43,'"'+idprod+'",@@impresa,'+$("#ffacturas .zelda").data('triforce')['vidcliente']+','+getParameterByName('tf'),0,0,0);
        // var char1 = $("#desc"+idlinea).text().substring(0,1);
        // var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        // var vstrimp = cargarImpuestos($("#desc"+idlinea).text().substr(1)+',0',tabla);

        // prod = prod[0][0];
        // if (parseFloat(prod[3]) > 0) {
        //     $("#prec"+idlinea).text(prod[3]);//.formatMoney(2,'.',','));
        //     $("#fd"+idlinea).data('triforce',{vprecio : prod[3]});
        //     //vaccion : 0,vid : 0,vidfactura : '?',videntrada : prod[0],vcantidad : $("#fd"+idlinea).data('triforce')['vcantidad'],vprecio : prod[3],vdesc : 0,vtotal : 0,vidinventario : prod[13],vidodt : 0,vimv : 0,vcomodin : '',vidunidad : $("#fd"+idlinea).data('triforce')['vidunidad'],vidimpuestos : $("#fd"+idlinea).data('triforce')['vidimpuestos'],viddescuentos : $("#fd"+idlinea).data('triforce')['viddescuentos'],strimp: vstrimp
        // }

        $("#fd"+idlinea).data('triforce')['videxoneracion'] = !parseInt($("#fd"+idlinea).data('triforce')['exoneracion']) ? '' : $("#ffacturas .zelda").data('triforce')['videxoneracion'];
    });

    totalizar();  

    pril.focus();
    Materialize.updateTextFields()
    
}

function retrasarFocus(vinput){
    setTimeout(function(){
        $("#"+vinput).focus().select();
    },100);
}

function calcVuelto(){
    var paga = parseFloat($("#pcon").val().replace(/,/g,''));
    var totalfact = Math.ceil(parseInt( $(".totalfact").text().replace(/,/g,'') )/5)*5;
    var cambio = (paga - totalfact);

   $("#pcam").text( (cambio*parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(0,'.',','));

   if (cambio > 0) {
        $("#pcam").css('color','#2196F3');
    }else{
        $("#pcam").css('color','#F3213F');
    }
}

function cargarImpuestos(vfila,vtabla){

    var imp = getDatos('',109,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0)[0];

    var textImpuestos = '';
    var exo = 0;
    var sMoneda = $(".moneda").html();
    var aexo = 0;
    var noBorrar = vtabla = '11,2' ? '16' : '';
    var impuestoStr = '';
 
    for (var i = 0; i < imp.length; i++) {
        impuestoStr += ","+imp[i][0]+",";

        if (!$("#imp_"+imp[i][0]).length) {
            exo = (parseFloat(imp[i][3])*(1-(parseFloat(imp[i][4])/100))).toFixed(2);
            textImpuestos = '<tr id="imp_'+imp[i][0]+'" class="dimpuesto" '+noBorrar+'><td id="imp_v'+imp[i][0]+'">'+imp[i][2]+':</td><td style="float: right;"><span class="moneda">'+sMoneda+'</span><span id="imv_'+imp[i][0]+'" type="html">0.00</span></td></tr>';
            
            $("#sh_imp").append(textImpuestos);

            $("#imp_"+imp[i][0]).data('valores',{vid:imp[i][0],vmonto:imp[i][3],exoneracion:imp[i][4]});
            
            if (param == 2) {
                $("#vimpiva").val(8).material_select('update');
            }
            
        }else{
            if (vtabla == 2){
                $("#imp_"+imp[i][0]).data('valores')['exoneracion'] = imp[i][4];
            }

            if (imp[i][4] > 0) {
                impuestoStr += imp[i][4];
            }
        }
        
    }
    return impuestoStr;
}

function cargarDescuentos(vfila,vtabla,vtipo,vcarga,vidfila){

    if (/[23]/i.test(param))
        return 0;
    var desc = getDatos('',115,'@@impresa,"'+vfila+'","'+vtabla+'"',0,0);
    var strDesc = '<option value="" valor="0">No Aplica - 0%</option>';
    var valor;

    if (desc['succed']) {
        var mdesc = mdescid =  0;
        var smdesc;
        for (var i = 0; i < desc[0].length; i++) {
            smdesc = '';
            if (parseFloat(desc[0][i][1]) > mdesc && desc[0][i][3] == 0)  {
                mdesc = desc[0][i][1];
                smdesc = 'selected';
                mdescid = desc[0][i][0];
            }
            strDesc += '<option value="'+desc[0][i][0]+'" valor="'+desc[0][i][1]+'" '+smdesc+'>'+desc[0][i][2]+"</option>"
        }
    }else
        console.log('ERROR con Descuentos: '+desc)

    if ($(".per1103.hide").length == 0 || vcarga == 1)
        strDesc += '<option value="0" class="per1103" valor="0">Por Vendedor</option>';

    switch(vtipo){
        case undefined:
            $("#tdescuento").html(strDesc);
            $("#tdescuento").material_select('update');
            $("#vdescuentop").val(mdesc);
            break;
        case 1:
            $("#tdescuentol").html(strDesc)
            $("#tdescuentol").material_select('update');
            $("#edescuento").val(mdesc);
            break;
        case 104:
            break;
        default:
            break;
    }   

    //totalizar();
    return {'descuento':mdesc,'iddescuento': mdescid};
}

function sendFE(clave){
    var ap = param == 9 ? '!' : param == 0 ? '-' : '';
    var vtit = param == 1 ? 'Factura' : 'Nota de Credito';
    var vtbl = param == 0 ? 301 : 64;
    
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: ap+clave, accion : 1,to:str_correos,idfila : clave,idtabla : vtbl,tit:vtit}
    })
      .done(function(data) {
        //console.log(data)
        
        var vclave = p['clave'];
        $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
        str_correos = '';
        if(ap == '')
            sendVMail(0,0,clave);  
                    
  });
}

function sendVMail(factura,clave,vid){
    var archivos = ''; 

    switch(param){
        case 104:
            setTimeout(function(){window.close();},2000);
            str_correos = '';
            break;
        case 6:
            str_correos = '';
            break;
        default:
            var con_con = 0;
            if (imprimir) {
                var vuelto = parseInt(param) == 1 ? 1 : 0;
                if((param == 1 || param == 7 || param == 8)){
                    vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : $("#pconm").is(":visible") ? '&pvuelto='+$("#pconm").val()+'&vuelto='+$("#pcons").html() : '';
                }
                try{ 
                    w = window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked')+vuelto+"&fp=1");
                }catch(e){
                    Materialize.toast("POP-UP ACTIVADO",4000,'red');
                }
            }
            break;
    }
    if (str_correos != '') {
        var vbody = getDatos('',73,vid,0,0)[0][0];
        var ntipo = getDatos('if(id=1,"Factura",nombre)',57,'id='+param,0,0)[0][0][0];
        archivos = makeArchivos(vbody[2],clave,vid,vbody[1],ntipo);
        enviarCorreo(3,str_correos,ntipo+" No"+vbody[2],vbody[0],archivos,con_con,vid,64);
    }else{
        
        if(parseInt($("[name=tipopago]:checked").val()) != 5){
            if (parseInt(idext) > 0) {
                setTimeout(function(){window.close();},2000);
            }else{
                if ($("#pcon").is(":visible") && parseFloat($("#pcon").val()) > 0 ) {
                    setTimeout(function(){
                        if(getParameterByName('ebd') == '1')
                            window.close();
                        else
                            location.reload();},4000);
            }else
                setTimeout(function(){
                    if(getParameterByName('ebd') == '1')
                            window.close();
                    else
                        location.reload();
                },2000);
            }
        }else{
            if(parseFloat($("#mxtot").val()) == 0)
                 setTimeout(function(){window.close();},2000);
            else{
                $("#montotar").val(0)
                $("#montoefect").val($("#mxtot").val())
            }
            //$("#tpg5").attr('value',-1);
        }
    }
}


function makeArchivos(vfactura,vclave,vid,vsucursal,ntipo){
    
    var archivos = '';
    var vtit = param == 1 ? 'Factura Electrónica' : ntipo;
    mantenimiento('login',8,{arch:'recibo',id:vid,mic:1,tit:vtit,sel:'',tbl:72,where:vid},1);
    if (vclave == vid || (param != 1 && param != 7))
        archivos = 'pdf/'+ntipo+' No'+vfactura+', '+vsucursal+'.pdf';
    else{
        archivos = {0:'xml/Factura No'+vfactura+', '+vsucursal+'.xml',1:'pdf/Factura No'+vfactura+', '+vsucursal+'.pdf'}
        mantenimiento('login',9,{id:vid,factura:vfactura,sucursal:vsucursal},1);
    }
    return archivos;
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {

    if(parseInt($("[name=tipopago]:checked").val()) != -1){
        if (parseInt(idext) > 0) {
            setTimeout(function(){window.close();},2000);
        }else{
            if ($("#pcon").is(":visible") && parseFloat($("#pcon").val()) > 0 ) {
                setTimeout(function(){
                    if(getParameterByName('ebd') == '1')
                        window.close();
                    else
                        location.reload();
                },4000);
            }else
                setTimeout(function(){
                    if(getParameterByName('ebd') == '1')
                        window.close();
                    else
                        location.reload();
                },2000);
        }
    }else
        if(parseFloat($("#mxtot").val()) < 5)
            setTimeout(function(){window.close();},2000);
}

function validarGeneral(velemento) {
    var salida = 1;
    var msj = '';
    $(velemento+" .validate").each(function(){
        if ($(this).attr('id') != undefined){
            msj = "'"+$("label[for="+$(this).attr('id')+"]").text()+"'";
            if ($(this).val().length == 0){
                $(this).select().focus();
                salida = "Campo "+msj+" Requerido";
                return false;
            }

            if($(this).attr('isnumeric') == 1 && isNaN($(this).val().replace(/,/g,''))){
                $(this).select().focus();
                salida = "Campo "+msj+" no es Numérico";
                return false;
            }

            if ($(this).attr('type') == 'select' && $(this).val() == 0) {
                $(this).select().focus();
                salida = "Campo "+msj+" Requerido";
                return false;
            }
      }  
        
    });
    return salida;
}


function cargarMargenes(){
    var margenes = getDatos('',270,$("#ffacturas .zelda").data('triforce')['margenes'],0,0,0)[0]; 

    if(margenes[0][3]){
        var niveles = margenes[0][3].split(',');
        var ventas = margenes[0][4].split(',');
        var promedios = margenes[0][5].split(',');
        var ganancias = margenes[0][6].split(',');
        
        for (var i = 0; i < niveles.length; i++) {
            $("#n"+niveles[i]+" .ven1").html(ventas[i])
            $("#n"+niveles[i]+" .gan1").html(promedios[i])
        }
    }

    $("#n0 .ven1").html(margenes[0][1])
    $("#n0 .gan1").html(margenes[0][7])

    $("#cos1").html(margenes[0][0]);
}


function escribirMatriz(elemento){
    var matriz = []
    $(".ven1").each(function(index){
        id = $(this).parent().parent().attr('id').substr(1);
            matriz[index] = {}
            matriz[index][0] = $("#n"+id+" .ven2").val()
            matriz[index][1] = $("#n"+id+" .gan2").val()
            matriz[index][2] = $("#n"+id+" .gan2").attr('gn');
            matriz[index][3] = id; 
            matriz[index][4] = $("#cos2").html().replace(/,/g,'');    
        //}
    });
    elemento.data('matriz',matriz);
}

function mixto(el){

        switch(parseInt($("[name=mxt_tp]:checked").attr('val'))){
            case 1:
                if(parseFloat($("#montoefect").val().replace(/,/g,'')) < 0){
                    $("#pconm").focus().select();
                    Materialize.toast('Valores no Validos',4000,'red');
                    return false;
                }
                // $("#tpg5").attr('value',5);
                // $("#ffacturas .zelda").data('triforce')['vidtipopago'] = 5;

                //el.click();
                break;
            default:
                break;
        }

        $("#factrealp").removeClass('add');
        $("#factreal").removeClass('add');
        var total = parseFloat($("#mxcan").val().replace(/,/g,''));
        total = isNaN(total) ? 0 : parseFloat(total)

        var efectivo = parseFloat($("#montoefect").val().replace(/,/g,''));
        var tarjeta = $("#montotar").val().replace(/,/g,'');
        tarjeta = isNaN(tarjeta) ? 0 : parseFloat(tarjeta);

        var lista = "#lpc .mover";
        var lprod = 'ridp';
        var rtot = 'mxcan';
        if(total == 0){
            lista = "#lmp .mover";
            rtot = 'mxtot';
            total = efectivo+tarjeta;
        }

        if(efectivo+tarjeta > total){
            Materialize.toast('Suma de Tarjeta y Efectivo no puede ser Mayor al Total a Cancelar',4000,'red');
            $("#montotar").focus().select();
            return false;
        }

        //if($("#newfact").is(":checked")){
            //COMODIN DE CLIENTE FACTURA
        //}else{
            //TIQUETE ELECTRONICO, 66, 67
            var factura = getDatos('',66,'1,0,7,'+$("#ffacturas .zelda").data('triforce')['vidtipo']+',5,0,1,0,'+$("#"+rtot).attr('imv')+','+$("#"+rtot).attr('subtotal')+','+$("#"+rtot).attr('exento')+','+$("#mxcan").attr('descuento')+',0,"",0,"'+$("#vcomentario").val()+'","",'+$("#ffacturas .zelda").data('triforce')['vidmoneda']+',@@usr,@@impresa,"",0,"","'+$("#ntarjmixto").val()+'","",'+$("#ffacturas .zelda").data('triforce')['vdivisa']+',"'+$("#ffacturas .zelda").data('triforce')['videxoneracion']+'",0,'+config[26],0,0,0);
   
            if(factura.succed){
                factura = factura[0][0][0];

                var detfactura;
                var lvidimpuesto = lviddescuento = "";
                var ms = tsr = limv = 0
                var set = '';
                var rlinea;

                $(lista).each(function(){
                    
                    rlinea = $("#fd"+$(this).attr('idp'));
                    lvidimpuesto = rlinea.data('triforce')['vidimpuestos'];
                    if(lvidimpuesto != ''){
                        limv = parseFloat($(this).attr('imv'))*parseFloat($(".lpcant",this).html());
                        lvidimpuesto = lvidimpuesto.split(',');
                        lvidimpuesto = lvidimpuesto[0]+','+lvidimpuesto[1]+','+limv+','+lvidimpuesto[3];
                    }

                    detfactura = getDatos('',67,'1,0,'+factura+','+$(this).attr(lprod)+','+$(".lpcant",this).html()+','+rlinea.data('triforce')['vprecio']+','+parseFloat($(this).attr('descuento'))*parseFloat($(".lpcant",this).html())+',6,0,'+limv+',"",'+rlinea.data('triforce')['vidunidad']+',"'+lvidimpuesto+'","'+lviddescuento+'",0,""',0,0,0);
                   
                    if($("#impm:visible").length){
                        var sr = (parseFloat(rlinea.data('triforce')['otros'])/parseFloat(rlinea.data('triforce')['vcantidad']))*parseFloat($(".lpcant",this).html());
                        if (sr > 0) {
                            ms = 1;
                            tsr += sr;
                        }
                    }

                    $("#fd"+$(this).attr('idp')).data('triforce')['vcantidad'] = parseFloat($("#fd"+$(this).attr('idp')).data('triforce')['vcantidad'])-parseFloat($(".lpcant",this).html());

                    $("#cant"+$(this).attr('idp')).val($("#fd"+$(this).attr('idp')).data('triforce')['vcantidad'])

                    if (parseInt(idext) < 0){
                        actualizar(260,'cantidad = cantidad-'+$(".lpcant",this).html(),'idfactura = -1*'+idext+' and idproducto = '+$(this).attr('ridp'),0,0,0);
                    }

                    if(parseFloat($("#fd"+$(this).attr('idp')).data('triforce')['vcantidad']) <= 0){
                        $("#fd"+$(this).attr('idp')).remove();
                    }
                         
                    $(this).remove(); 
                });

                switch(parseInt($("[name=mxt_tp]:checked").attr('val'))){
                    case 1:
                        if(parseInt($("#montoefect").val().replace(/,/g,'')) > 0)
                            insertar(336,'','null,'+factura+',1,"",'+$("#montoefect").val().replace(/,/g,''))

                        if(parseInt($("#montotar").val().replace(/,/g,'')) > 0)
                            insertar(336,'','null,'+factura+',2,"'+$("#ntarjmixto").val()+'",'+$("#montotar").val().replace(/,/g,''))
                        break;
                    default:
                        break;
                }

                if($("#impm:visible").length)
                    set += 'servmesero = '+tsr+',';

                if(ms){
                    set = set.substr(0,set.length-1);
                    insertar(291,'idfactura',factura);
                    actualizar(291,set,'idfactura = '+factura);
                }

                if (parseInt(idext) < 0)
                    eliminar(260,'cantidad <= 0 and idfactura = -1*'+idext)

                totalizar();
                $("#mxcan").val('0.00');
                $("#mxcan").attr('subtotal',0);
                $("#mxcan").attr('imv',0);
                $("#mxcan").attr('exento',0);
                $("#mxcan").attr('descuento',0);

                Materialize.toast('Tiquete Registrado Correctamente',4000,'green');
                var $toastContent = $('<span style="width: 500px">Generando Factura Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
                Materialize.toast($toastContent,4000);

                if(parseInt($("#ffacturas .zelda").data('triforce')['vidtipoventa']) != 8)
                    sendFE(factura);
                else
                    sendVMail(factura,0,0);
            // }else{
            //     Materialize.toast('Problemas Generando el Tiquete',4000,'red');
            // }


        }
}

function deleterow(elem){
    var id = elem.attr('id').substr(1);
    var usr = $("#ffacturas .zelda").data('triforce')['vidusuario'] == '' ? '@@usr' : $("#ffacturas .zelda").data('triforce')['vidusuario'];
    insertar(327,'','null,'+id+',now(),'+usr+',@@impresa,'+$("#tot").html().replace(/,/g,'')+',3,'+$("#ffacturas .zelda").data('triforce')['vidcliente']);
    getDatos('',326,"1,"+id)
    $("[vid=l"+id+"]").remove()
}

function acceuser(rs){
    $("#ffacturas .zelda").data('triforce')['vidusuario'] = rs[0][0][0];
    $("#username").parent().parent().removeClass('hide')
    pril.focus()
}

function exitcouser(){
    $("#facturar").attr('disabled',true)
}