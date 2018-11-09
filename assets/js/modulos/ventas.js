var w;
var str_correos = '';
var tmp_correos = '';
var punidad = 0;

$(window).keydown(function(e){
    var code = e.wich || e.keyCode

    switch(code){
        case 118: //PRODUCT LIST
            $("#lproductos").click();
            break;
        default:
            break;
    }       
        
});

$(document).on("change","#idtipopago",function(){
    $(".zelda").data('triforce')['vidtipopago'] = $(this).val();
});

$(function(){
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});
     $('.dropdown-button').dropdown();
    $('#vcomentario').characterCounter();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    cargarImpuestos(0,'11,2');
    cargarDescuentos(0,'2',undefined,1);

    $("#lproductos").click(function(){
        $("#modal-productos").modal('open');
        $("#bproductos").val($("#descp").val()).focus().select();
    });

    $("#ldevolucion").click(function(){
        $("#modal-devoluciones").modal('open');
        
    });

    $("#bproductos").keyup(function(e){
        var charCode = e.which;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var data = getDatos('',6,'"'+$("#bproductos").val()+'",9,@@impresa',0,0,0);
            $("#bdylproductos").html('');
            if (data['succed']) {
                var strp = '';
                for (var i = 0; i < data[0].length; i++) {
                    strp += '<tr> <td><input type="radio" name="chekme" id="cp'+data[0][i][0]+'"> <label for="cp'+data[0][i][0]+'"></label></td> <td id="cl'+data[0][i][0]+'">'+data[0][i][1]+'</td> <td>'+data[0][i][2]+'</td> <td>'+data[0][i][3]+'</td> <td>'+data[0][i][4]+'</td> <td>'+data[0][i][5]+'</td> <td>'+data[0][i][6]+'</td> <td>'+data[0][i][7]+'</td> </tr>';
                }
                if (strp == '') {
                    strp = strp = '<tr><td colspan="8" align="center">No Hay Productos</td> </tr>';
                }
            }else{
                strp = '<tr><td colspan="8" align="center">No Hay Productos</td> </tr>';
            }

            $("#bdylproductos").html(strp);
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

        if (code == 13 && ciclos > 0  && $(this).val() == ''){
            $("#facturar").click();
        }

        if (code == 13) {
            $(this).blur();
        }
    });
    
    $("#addclie").click(function(){
        if($("#slideCorreo").data('fila1') == undefined && param.toString().match(new RegExp(/[145678]/i))){
            Materialize.toast('Correo sin Asignar',4000,'red');
            $("#slideCorreo").click();
            return false;
        }
        var isprov = param.toString().match(new RegExp(/[23]/i)) ? 1 : 0;
        var pr = getDatos('',172,'1,0,"'+$("#c-ap1").val()+'","'+$("#c-ap2").val()+'","'+$("#c-nom").val()+'","'+$("#c-ced").val()+'",'+$("#c-nom").attr('tipo')+',1,'+isprov+',0,500000,30,0,1,"",@@usr,30,"",0,@@impresa,@id',0,0,0);
 
        if(pr.succed){
            pr = pr[0][0][0];
            
            if ($("#slideCorreo").data('fila1') != undefined) {
                var num = 1;
                var nfila;
                while($("#slideCorreo").data('fila'+num) != undefined){
                    insertar(17,'','null,'+pr+',2,"'+$("#slideCorreo").data('fila'+num)['vcorreo']+'"');
                    $("#slideCorreo").removeData('fila'+num)
                    num++;
                }
            }

            if ($("#slideTelefono").data('fila1') != undefined) {
                num = 1;
                while($("#slideTelefono").data('fila'+num) != undefined){
                    var del = $("#slideTelefono").data('fila'+num)['vtelefono'].substring(0,1);
                    var vtipo = del == 2 || del == 4 ? 2 : 3;
                    insertar(238,'','null,'+vtipo+',"'+$("#slideTelefono").data('fila'+num)['vtelefono']+'",2,'+pr+',52');
                    $("#slideTelefono").removeData('fila'+num)
                    num++;
                }
            }

            var barrio = $("#slideDireccion").data('idbarrio');
            barrio = barrio == '' ? 0 : barrio;
            insertar(239,'','null,'+barrio+',"'+$("#slideDireccion").data('direccion')+'",0,0,2,'+pr);
            Materialize.toast('Cliente Agregado Exitosamente',4000,'green');
            $("#ncli").val($("#c-nom").val()+' '+$("#c-ap1").val()+' '+$("#c-ap2").val()+' *'+$("#c-ced").val()+'*');
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
        }else
            Materialize.toast(pr[0]['ERROR'],4000,'red');
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
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#sinv").click(function(){
        if($("#valores").data('elemento') != undefined){
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
        console.log(comision)
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

    $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,vajuste:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:''});

    $(".modal").modal();

    $("#modal-usuario").modal({
        dismissible:false
    });

    $("#monedas").change(function(){
        cargarMoneda($('option:selected',this).val());
        totalizar();
    });

    $("#doexo").click(function(){
        $("#modal-exo").modal('open');
    });

    $("#editExo").click(function(){
    
        var validator = validarGeneral("#modal-exo");
        if (validator == 1) {
            var tiempo = $("#vtimeDoc").val().length == 5 ? $("#vtimeDoc").val()+':00' : $("#vtimeDoc").val();
            $("#ffacturas .zelda").data('triforce')['videxoneracion'] = $("#vtipodoc").val()+"^"+$("#vnumdoc").val()+"^"+$("#ventidad").val()+"^"+$("#vfechaDoc").val()+"T"+tiempo+"-06:00^"+$("#vmontoexo").val()+"^"+$("#vporcompra").val();
            //$("#imp_1").data('valores')['exoneracion'] = $("#vporcompra").val();
            totalizar();
            $("#modal-exo").modal('close');
        }else
            Materialize.toast(validator,4000,'red');
        
    });

    $("#ecouser").keyup(function(e){
        var code = e.wich || e.keyCode;

        if (code == 13)
            $("#accecouser").click();
    });

    $("#exitcouser").click(function(){
        $("#modal-usuario").modal('close');
        $("#facturar").attr('disabled',true)
    });

     $("#accecouser").click(function(){

        var cod =  $("#ecouser").val();
        var rs = getDatos('',137,'"'+cod+'"',0,0,0);
        if(parseInt(rs['succed'])){
            if (rs[0].length){
                $("#ffacturas .zelda").data('triforce')['vidusuario'] = rs[0][0][0];
                $("#modal-usuario").modal('close');
                $("#codp").focus()
            }
            else{
                Materialize.toast('Usuario no Valido',4000,'red');
                $("#ecouser").focus().select();

            }
        }else{
            Materialize.toast('Usuario no Valido',4000,'red');
             $("#ecouser").focus().select();
        }
     });

    $("[name=ubfactura]").change(function(){
        var id = $(this).attr('val');
        $(".ps").addClass('hide-on-med-and-down')
        $(".p"+id).removeClass('hide-on-med-and-down');       
    });

    cargarMoneda(0);
    $(".zelda").data('triforce')['vidtipopago'] = $("#idtipopago").val();

    permisos(1101,1110);
  
    if (parseInt(config[11]) == 3 && param.toString().match(new RegExp(/[1678]/i)))
        $("#modal-usuario").modal('open');

    if ($("#cantFact:visible").length)
        $("#cantFact").html(getDatos('COUNT(id) as cantidad',64,'idtipoventa = 6 and idestado = 1 and idsucursal = @@impresa',0,0,0)[0][0][0]);
})//READY

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

$(document).on("click","#facturar",function(){

    var err = validarFactura();
    if (err){
        Materialize.toast(err,'4000','red');
        return false;
    }

    $("#pcon").val(0.00);
    $("#pcam").text(0.00).css('color','black');
    if ( $(".zelda").data('triforce')['vidtipo'] == 1 && ($(".zelda").data('triforce')['vidtipoventa'] == 1 || $(".zelda").data('triforce')['vidtipoventa'] == 7 || $(".zelda").data('triforce')['vidtipoventa'] == 8)) {

        var tpago = $("#idtipopago option:selected").val();
        var tfact = $(".zelda").data('triforce')['vidtipo'];
        var p = getDatos('',231,tpago+','+tfact,0,0)[0];
        $(this).attr('regex',p[0][2]);

        switch(parseInt( p[0][0]) ){
            case 5:
                $("#mtpagos").html('');
                for (var i = 0; i < p.length; i++) {
                    $("#mtpagos").append('<div class="col s2"> <p> <input type="checkbox"  class="ckmixto" id="tp'+p[i][1]+'" var="'+p[i][0]+'"/> <label for="tp'+p[i][1]+'">'+p[i][1]+'</label> </p> </div>');
                }
                $("#mCheque").val(p[0][3]);
                $("#mDeposito").val(p[0][3]);
                $("#mTarjeta").val(p[0][3]);
                $(".modal-tpago").addClass('hide');
                $("#m-mixto").removeClass('hide');
            break;

            case 4:
                $(".modal-tpago").addClass('hide');
                $("#m-efectivo").removeClass('hide');
                retrasarFocus('pcon');
            break;

            case 2:
                $(".modal-tpago").addClass('hide');
                $("#m-tarjeta").removeClass('hide');
                $("#labeltarjeta").text(p[0][1]);
                retrasarFocus('carddigito');
                $(".icono").html(p[0][3]);
            break;
            case 1:
               $(".modal-tpago").addClass('hide');
                $("#m-deposito").removeClass('hide');
                $("#labeldeposito").text(p[0][1]);
                retrasarFocus('ndeposito');
                $(".icono").html(p[0][3]);
            break;

            case 0:
               $(".modal-tpago").addClass('hide');
                $("#m-cheque").removeClass('hide');
                $("#labelcheque").text(p[0][1]);
                retrasarFocus('ncheque');
                $(".icono").html(p[0][3]);
            break;


            default:
                $(this).attr('disabled',true);
                $("#factreal").click();
                return false;
            break;
        }
        
        var span = $("#tot").text();
        $(".totalfact").html( span );
        $("#modal-tpagos").modal({complete: function() { if($("#modal-tpagos").attr("gfort") == 1) setTimeout(function(){location.reload();},500); }}).modal('open');
        
    }else{
        $("#factreal").click();
    }
});


$("#pcon").blur(function(){
    calcVuelto();
    $("#factreal").focus();
});


$("#factreal").click(function(){
    $(this).blur();
    $("#factreal").attr('disabled',true);
    $("#modal-tpagos").attr("gfort",1);
    $("#facturar").attr('disabled',true)
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
    console.log(str_correos);
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
        checked = str_correos.indexOf(tmp.substr(0,index)) == -1 ? '': 'checked';
        str += '<input type="checkbox" class="selcorreo" '+checked+' id="chk'+i+'"><label for="chk'+i+'">'+tmp.substr(0,index)+'</label><br>';
        tmp = tmp.substr(index+1,tmp.length);
    }

    $('#bdycrr').html(str);
    
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

$(document).on("keyup","#vflete",function(){
    totalizar();
});

$(document).on("keyup","#ajuste",function(){
    totalizar();
});

$(document).on("keyup",".fventa",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $(this).blur();
    
});

$(document).on("change","#uni",function(){

    if (!parseInt(punidad))
        punidad = parseFloat($('option:selected',this).attr('cant'));
    else{
        var pbase = parseFloat($("#precp").val().replace(/,/g,''))*(1/parseFloat(punidad));
        punidad = parseFloat($('option:selected',this).attr('cant'));
        var pfinal = pbase*punidad;
        $("#precp").val(pfinal.formatMoney(2,'.',','));
        $("#valores").data('elemento')['hprec'] = pfinal;
        $("#cantp").focus().select();
    } 
    
});

$(document).on("blur",".fventa",function(){
    var valor = $(this).val();
    if (isNaN(valor)) {
        $("#codp").focus();
        return false;
    }

    var impuesto = $(this).attr('imp');
    var valor = valor/(1+(impuesto/100))
    var id = $(this).attr('id').substr(9);
    $("#fd"+id).data('triforce')['vprecio'] = valor;
    totalizar();
    $("#codp").focus();
});

$(document).on("click","#cargarfact",function(){
    $("#modal-facturas").modal('open');
    var facturas = getDatos('',257,'@@impresa',0,0,0)[0];
    var body = '';
    for (var i = 0; i < facturas.length; i++) {
        body += '<tr> <td> <input type="radio" name="factlist" id="l'+facturas[i][0]+'"> <label for="l'+facturas[i][0]+'"></label> </td> <td>'+facturas[i][1]+'</td> <td>'+facturas[i][2]+'</td> <td>'+facturas[i][3]+'</td> </tr>'  
    }
    $("#bdylist").html(body);
});

$(document).on("click","#acepfact",function(){
    if (!$("[name=factlist]").length) {
        Materialize.toast('No hay Factura Disponibles',4000,'red');
        return false;
    }

    
});

$(document).on("click",".delf",function(){
    var id = $(this).attr('id').substr(3);
    $("#fd"+id).remove();
    totalizar();

});

$(document).on("click","#btnAjuste",function(){
    var accion = $(this).attr('accion');
    if (accion == 1) {
        $("#btnAjuste").html('<i class="mdi mdi-minus"></i>');
        $(this).attr('accion',0);
    }else if (accion == 0) {
        $("#btnAjuste").html('<i class="mdi mdi-plus"></i>');
        $(this).attr('accion',1);
    }
    totalizar();
});

$(document).on("click",".addesgloce",function(){
    var id = parseInt($(".zelda").data('triforce')['idline'])+1;
    var vidprod = $(this).parent().parent().data("triforce")['videntrada'];

    $(".zelda").data('triforce')['idline'] = id;
    
    $('<tr id="fd'+id+'" class="ciclos row"><td style="padding: 0.2%"></td><td class="center" id="codprod'+id+'" colspan="2"> <i class="mdi mdi-subdirectory-arrow-right" style="float:left;"></i> <input type="text" placeholder="RUBRO" style="width:85%;margin: 0px;" id="rubro'+id+'" class="rubro"/> </td> <td class="center divisa" id="prec'+id+'"> <input type="text" value="0" class="eder precd" id="precd'+id+'" style="margin: 0px;" /> </td> <td id="unitprod'+id+'"> <select id="unid'+id+'" class="unid" readonly style="margin: 0px;"><option>UN</option></select> </td> <td class="center"> <div id="divcnt" class="form-group"><input type="text" value="1" class="eder cantd" id="cantd'+id+'" style="margin: 0px;" /></div></td><td class="center totp" id="tota'+id+'">0</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></td> </tr>').insertAfter($(this).closest('tr'));

    $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:vidprod, vcantidad:0, vprecio:0, vdesc:0, vtotal:0, vidinventario:0,vidodt : 0,vimv:0,vcomodin:'',vidunidad:0,vidimpuestos:'',viddescuentos:'',strimp:''});
  
    $("#rubro"+id).focus();
    $("#unid"+id).material_select();
    $("#fdetallefacturas .select-wrapper input.select-dropdown").css('margin','0px');
});

$(document).on("change","#iva",function(){
    if (param == 2) {
        $("#iva").attr('hclk',1);
        totalizar();
    }   
});

$(document).on("change","#exct",function(){
    if ( $(this).is(':checked') ){
        $(".valor_grabado").addClass('hide');
        $("#valor_grabado").val(0);
    }
    else{
        $(".valor_grabado").removeClass('hide');
        if(parseInt($("#valor_grabado").val()) == 0)
            $("#valor_grabado").val($("#valor_grabado").attr('orig'));
    }
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

function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs,hinv,defi,uni,comodin,desgloce,vstrimp,vexo,vmobil) {
    var rpago = parseFloat($("#valores").data('elemento')['retpago']) == 0 ? '' : 'retpago="'+$("#valores").data('elemento')['retpago']+'"';
    var inventariado = $("#valores").data('elemento')['inventariado'];
    
    $("#valores").removeData('elemento');

    isiva = $("[for=iva]:visible").length ? $("#iva").is(":checked") : 0;
    
    if(param.toString().match(new RegExp(/[1678]/i)))
        $("[for=iva]").addClass('hide');
    else{
        var putil = $("#putil").val();
        var pventa = $("#pventa").val();
        var hpventa = $("#pventa").attr('hprec');
        $(".putil").val(0);
        $("#pventa").val(0);
        $(".putil").css('color','black');
    }

        if (isiva && vexo < 100){
            var timpuesto = 0;
            $(".dimpuesto").each(function(){
                if (vstrimp.indexOf(','+$(this).data('valores')['vid']+',') >= 0)
                    timpuesto += parseFloat($(this).data('valores')['vmonto'])
            }); 

            // if (vstrimp.indexOf(','+1+',') >= 0)
            //         timpuesto += parseFloat($("#imp_1").data('valores')['vmonto']);

            prec = prec/((timpuesto/100)+1);
            tot = prec * cant;
        }

    if(comodin.indexOf('^') != -1)
        cod = comodin.replace(/\^/g,'');
    prec = (prec+0).toFixed(5);
    tot = (tot+0).toFixed(5);

    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec);

    $("#fdetallefacturas .ciclos").each(function(){
        var vid = $(this).attr('id').substr(2);

        if ( idprod == $(this).data('triforce')['videntrada'] && hinv == $(this).data('triforce')['vidinventario'] && prec == parseFloat($(this).data('triforce')['vprecio']) && $("#desc"+vid).html().trim() == desc.trim() && cod.trim() == $("#codprod"+vid).html().trim()) {
            existe = 1;

            if ( parseFloat($("#cant"+vid).text())+cant > cntinv && param.toString().match(new RegExp(/[1678]/i)) && parseInt($(this).data('triforce')['isinventariado']) && comodin == '' ) {
                //EXCEDE EL NUMERO EN INVENTARIO
                Materialize.toast('Cantidad Insuficiente en Inventario',4000,'red');
                $("#cantp").select();
                err = 1;
            }else{
                var tcant = parseFloat($(this).data('triforce')['vcantidad'])+cant;
                $(this).data('triforce')['vcantidad'] = tcant;
                $("#cant"+vid).html(tcant);
            }
            
        }
    });

    if (!existe) {
        $(".edetalle").addClass('hide')
        var id = parseInt($(".zelda").data('triforce')['idline'])+1;
        var divisa = parseFloat($("#monedas option:selected").attr('dv'));

        $(".zelda").data('triforce')['idline'] = id;
        
        var codedg = '';
        if (desgloce == 1)
            codedg = '<span class="pbtn addesgloce" style="font-size:10px">[<i class="mdi mdi-plus"></i>]</span>';

        switch(parseInt(param)){
            case 1:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
                if (vmobil) 
                    $("#fdetallefacturas").prepend('<div id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="center-align hide" id="codprod'+id+'">'+codedg+cod+'</div> <div class="row col s9" style="padding:0px;"> <div class="col s12" style="padding: 0 !important;font-weight: bold;" id="desc'+id+'">'+desc+'</div> <small><span class="col s3" style="padding: 0px">Precio Uni: </span><div style="padding: 0 !important;" class="divisa col s3" id="prec'+id+'">'+(precio/divisa).formatMoney(2,'.',',')+'</div> <span class="col s3" style="padding: 0px">Precio Venta: </span>  <div style="padding: 0 !important;" class="col s3 center-align totp" id="tota'+id+'">'+(tot/divisa).formatMoney(2,'.',',')+'</div> </small> <div id="divcnt" style="padding: 0 !important;"><small>Cantidad: <span id="cant'+id+'">'+cant+'</span></small></div> </div><div style="padding: 0 !important;" class="col s1 hide center-align" id="unitprod'+id+'">'+uni+'</div>   <div class="der"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div> </div>');
                else
                    $("#fdetallefacturas").prepend('<div id="fd'+id+'" '+rpago+' xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="prec'+id+'">'+(precio/divisa).formatMoney(2,'.',',')+'</div> <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod'+id+'">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align totp" id="tota'+id+'">'+(tot/divisa).formatMoney(2,'.',',')+'</div> <div class="right"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div> </div>');
                    break;
            case 2:
                $("#fdetallefacturas").prepend('<div id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> <div id="unitprod'+id+'" style="padding: 0 !important;" class="col s1 center-align">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align divisa" id="prec'+id+'">'+(precio/divisa).formatMoney(2,'.',',')+'</div>  <div id="vdesc'+id+'" style="padding: 0 !important;" class="col s1 center-align"> '+dcs['descuento']+'% </div> <div cstyle="padding: 0 !important;" class="col s1 center-align totp" id="tota'+id+'">'+(tot/divisa).formatMoney(2,'.',',')+'</div> <div align="right" > '+putil+' % <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></div> </div>');

                    $("#fd"+id).data('precios',{prec:pventa,hprec:hpventa});
                break;
            case 3:
                $("#fdetallefacturas").prepend('<tr id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row col s12"><td class="center" id="codprod'+id+'">'+codedg+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td>  <td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;"></div></td> <td class="center divisa hide" id="prec'+id+'">'+precio.formatMoney(2,'.',',')+'</td> <td id="unitprod'+id+'">'+uni+'</td> <td id="vdesc'+id+'" class="center hide"> '+dcs+'% </td> <td class="center totp hide" id="tota'+id+'">'+tot+'</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%;font-size: 12px;"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%;font-size: 12px;"></a></td> </tr>');
                break;
        }

        $("#fd"+id).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idprod,vcantidad : cant,vprecio : precio,vdesc : 0,vtotal : 0,vidinventario : hinv,vidodt : 0,vimv : 0,vcomodin : comodin,vidunidad : $("#uni").val(),vidimpuestos:'',viddescuentos:'',strimp : vstrimp,exoneracion:vexo,max: mdcs,iddesc:dcs['iddescuento'],vdescuento : dcs['descuento'],iva:isiva,isinventariado : inventariado});
        if (parseInt($("#monedas option:selected").attr('dv')) != 1)
            $("#prec"+id).attr('base',precio)
       
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
        $("#exct").prop('checked', false);
        $("#exct").attr('hclk',0);

        $("#codp").focus();
    }
    

}

function totalizar(){
    
    var totd = 0;
    var total = 0;
    var impuesto = 0;
    var idesc = 0;
    var tmpdesc = 0;
    var exento = 0;
    var flete = isNaN($("#vflete").val()) ? 0 : parseFloat($("#vflete").val()) > 0 ? parseFloat($("#vflete").val().replace(/,/g,'.')) : 0;
    var desc = $("#vdescuentop").val();
    var ajuste = $("#ajuste").val().replace(/,/g,'');
    var vidlinea = vid = cantidad = precio = decindv = descmax = desct = dimv  = rimv = iva_imp = geimv = simv = 0;
    var divisa = parseFloat($("#monedas option:selected").attr('dv'));
    var exov = $("#ffacturas .zelda").data('triforce')['videxoneracion'] == '' ? 0 : $("#vmontoexo").val;

    flete = isNaN(parseFloat(flete)) || flete == '' ? 0 : parseFloat(flete);
    desc = isNaN(parseFloat(desc)) || desc == '' ? 0 : parseFloat(desc);
    ajuste = isNaN(parseFloat(ajuste)) || ajuste == '' ? 0 : parseFloat(ajuste);
    ajuste = ajuste >= 10 ? 10 : ajuste;
    ajuste = $("#btnAjuste").attr('accion') == 1 ? ajuste : ajuste*-1; 

    $("[id^=imv_").html('0.00')

    $(".totp").each(function(){

        vidlinea = $(this).prop('id').substr(4);
        vid = $("#fd"+vidlinea).data('triforce')['videntrada'];
       
        cantidad    = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        precio      = parseInt($("#monedas option:selected").attr('dv')) == 1 ? parseFloat($("#fd"+vidlinea).data('triforce')['vprecio']) : $("#prec"+vidlinea).html().replace(/,/g,'')*(parseFloat($("#monedas option:selected").attr('dv')));
        
        decindv     = parseFloat($("#fd"+vidlinea).data('triforce')['vdescuento']);
        descmax     = parseFloat($("#fd"+vidlinea).data('triforce')['max']);
        desct       = decindv;//param.toString().match(new RegExp(/[2]/i)) ? decindv : decindv > descmax ? descmax : decindv;

        precio = precio * cantidad
        tmpdesc = precio * (1-(desct/100));
        idesc += precio * ( (desct/100) + ((1-(desct/100)) * (desc/100) ));
        totd += parseFloat($("#fd"+vidlinea).attr('retpago')) > 0 ? 0 : precio;

        $("#fd"+vidlinea).data('triforce')['viddescuentos'] = '';
        $("#mdesc"+vidlinea).html('');

        if (desct > 0){
            $("#fd"+vidlinea).data('triforce')['viddescuentos'] += '['+$("#fd"+vidlinea).data('triforce')['iddesc']+'^'+desct+'^'+precio*(desct/100)+']';
            $("#mdesc"+vidlinea).html('('+desct+'%)')
        }
        if (parseFloat($("#vdescuentop").val()) > 0)
            $("#fd"+vidlinea).data('triforce')['viddescuentos'] += '['+$("#tdescuento").val()+'^'+$("#vdescuentop").val()+'^'+(precio*(1-(desct/100)))*(desc/100)+']';

        $("#fd"+vidlinea).data('triforce')['vtotal'] = tmpdesc.toFixed(5);
        $("#tota"+vidlinea).html((tmpdesc/divisa).formatMoney(2,'.',','))
        $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
        $("#fd"+vidlinea).data('triforce')['vdesc'] = precio * ( (desct/100) + ((1-(desct/100)) * (desc/100) ));
        tmpdesc = tmpdesc * (1-(desc/100));

        $(".dimpuesto").each(function(){
            if ($(this).data('valores')['exoneracion'] != 0) {
                geimv = $(this).data('valores')['exoneracion'];
            }
            
            if ($("#fd"+vidlinea).data('triforce')['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0) {
                eimv = $("#fd"+vidlinea).data('triforce')['exoneracion'];
                eimv = eimv >= geimv ? eimv : geimv;
                eimv = $(this).data('valores')['vid'] == 1 ? eimv : 0;

                rimv = parseFloat($(this).data('valores')['vmonto']);
                iimv = $(this).data('valores')['vid'];
                
                if(parseInt(eimv) >= 100 && (exov == '' || !parseInt(exov))) { 
                    //PRODUCTOS O CLIENTES EXENTOS
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
                    $("#fastVenta"+vidlinea).val(tmpdesc);
                    $("#fastVenta"+vidlinea).attr('imp',0);
                    exento += tmpdesc;
                }else{ 
                    //PRODUCTOS O CLIENTES GRABADOS Y EXONERADOS
                    simv = parseFloat(tmpdesc*(rimv/100)).toFixed(5);
                    dimv =  parseFloat(tmpdesc*((rimv*(1-(eimv/100)))/100)).toFixed(5);
                    impuesto += parseFloat(dimv);
                    $("#fd"+vidlinea).data('triforce')['vimv'] = dimv;
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] += iimv+','+$(this).data('valores')['vmonto']+','+parseFloat(simv).toFixed(5)+','+eimv+']';
                    if ($("#ffacturas .zelda").data('triforce')['videxoneracion'] != '')
                        dimv = 0;
                    var im_variable = parseFloat($("#imv_"+iimv).html().replace(/,/g,''))+parseFloat(dimv)
                    $("#imv_"+iimv).html((im_variable/divisa).formatMoney(2,'.',','));
                    
                    $("#tota"+vidlinea).html((parseFloat($("#tota"+vidlinea).html().replace(/,/g,''))+parseFloat(dimv)).formatMoney(2,'.',','))
                }
            }else{
                exento += tmpdesc;
                $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
            }

        });
    });

    if ($("#ffacturas .zelda").data('triforce')['videxoneracion'] != ''){
        console.log(impuesto)
        impuesto = 0;
    }

    total = totd + parseFloat(impuesto) - idesc;

    $("[retpago]").each(function(){
        var retvalor = parseFloat($(this).attr('retpago'));
        //var retcant = parseFloat($(this).data('triforce')['cantidad']);
        var retid = $(this).attr('id').substr(2);
        var ret = total*(retvalor/100);
        totd = totd + ret;
        exento = exento+ret;
        total = total + ret;

        $(this).data('triforce')['vtotal'] = ret;
        $(this).data('triforce')['vprecio'] = ret;

        $("#prec"+retid).html(ret.formatMoney(2,'.',','))
        $("#tota"+retid).html(ret.formatMoney(2,'.',','))
    });

    if (flete != 0) {
        total = total + flete;
    }
    
    $("#subtot").html((totd/divisa).formatMoney(2,'.',','));
    $("#descuento_v").html((idesc/divisa).formatMoney(2,'.',','));
    $("#flete").html(flete.formatMoney(2,'.',','));

    $(".zelda").data('triforce')['vsubtotal'] = totd.toFixed(5);
    $(".zelda").data('triforce')['ajuste'] = ajuste.toFixed(2);
    $(".zelda").data('triforce')['vdescuento'] = idesc.toFixed(5);
    $(".zelda").data('triforce')['vimv'] = parseFloat(impuesto).toFixed(5);
    $(".zelda").data('triforce')['vexento'] = exento.toFixed(5);

    $("#tot").html(((total+ajuste)/divisa).formatMoney(2,'.',','));

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
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    
    return salida;

}

function validarClientes() {

    if ($("#fclientes #vnombre").val() == '') { $("#vnombre").focus(); return 'El campo Nombre es requerido'; };
    if ($("#fclientes #vcedula").val() == '') { $("#vcedula").focus(); return 'El campo Cédula es requerida'; };

}

function validarDetalleFactura(){
    var ciclos = $("#fdetallefacturas .ciclos");
    var fila;
    var cantidad = ciclos.length;
    for (var i = 1; i <= cantidad; i++) {
        fila = $("#fd"+i);
        if (fila.data() == undefined) {
            cantidad++;
            continue;
        }
        if(fila.data('triforce')['vcomodin'] == "1")
            fila.data('triforce')['vcomodin'] = $("#desc"+i).html();
        if ($("#iva").is(':checked'))
            fila.data('triforce')['vcomodin'];
    }
    return false;
}

function validarFactura() {

    if ($("#fdetallefacturas .ciclos").length == 0) {
        $("#codp").focus()
        return "No se Han Ingresado Productos en Detalle";
    }

    if (str_correos.length == '' && param == 1) {
        $("#crrclie").click()
        return "Cliente sin Correo Electrónico";
    }

    switch(parseInt($(".zelda").data('triforce')['vidtipoventa'])){
        case 2:
            if ($(".zelda").data('triforce')['vidcliente'] == 0){
                $("#ncli").focus();
                return "No se Ha Ingresado Proveedor";
            }
            break;
        case 4:
        case 5:
            if ($(".zelda").data('triforce')['vidcliente'] == 0){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }
            break;
        case 6:
            if (!$("#ncli").val().length){
                $("#ncli").focus();
                return "No se Ha Ingresado Cliente";
            }
            break;
        default:
            if ($(".zelda").data('triforce')['vidcliente'] == 0)
            $(".zelda").data('triforce')['vcomodin'] = $("#ncli").val();
            break;
    }


    if($(".zelda").data('triforce')['vidtipo'] == 2 || $(".zelda").data('triforce')['vidtipo'] == 4){
        $("#idtipopago").val(0)
        $("#idtipopago").material_select('update');

        // var p = arr('login',4,'',205,$(".zelda").data('triforce')['vidcliente'],0,0,0);
        // if(p['succed'] == 0){
        //     return p[0]['ERROR'] 
        // }

    }

        if ( !$("#carddigito").val().match(new RegExp($("#facturar").attr('regex'))) ){
            Materialize.toast("Formato de tarjeta incorrecto",4000,'danger');
        }

       $("#ffacturas .zelda").data("triforce")['vidmoneda'] = $(".moneda").first().data("triforce")['id'];
       $("#ffacturas .zelda").data("triforce")['vdivisa'] = $(".moneda").first().data("triforce")['valor'];

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

    $("#precp").attr('base',"0.00");
    $("#totp").attr('base',"0.00");

    if($("#codp").val() == '' && $("#descp").val() == '')
        return false;
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

    if ( $("#codp").val().indexOf('/') != -1) {
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

    var cod = arr('login',4,'',43,'"'+ kbrota +'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+$(".zelda").data('triforce')['vidtipoventa'],0,0,0);
    if (cod[0][0] != undefined) {

        cod = cod[0][0];
        var char1 = cod[0].substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var dvalor = iscomodin ? {descuento:0,iddescuento:0} : cargarDescuentos(cod[0].substr(1)+',0',tabla,2);

        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13] == '' ? 0 : cod[13], hbod:cod[13] == '' ? 0 : cod[13], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin,idheredado : cod[18],retpago : cod[11],inventariado:cod[20]}) //,imp: cod[6]

        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        $("#precp").val(parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(2,'.',','));
        $("#totp").val((parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv')))*cantidad).formatMoney(2,'.',','))
        
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

        if(param != 2){ //PRODUCTO DE VALOR VARIABLE
            if(!parseInt(cod[19]))
                $("#precp").prop("readonly",true);
            else
                $("#precp").removeAttr("readonly");
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

        Materialize.updateTextFields()
    }else{
        switch(param) {
            case 2:
                var $toastContent = $('<span>Producto no Existente</span>').add($('<button class="btn-flat toast-action green white-text addProduct">Agregarlo</button>'));
                Materialize.toast($toastContent, 10000);

                $(".addProduct").focus();
                break;
            default:
                Materialize.toast('Producto no Existente',4000,'red');
                break;
        }
        
    }
}

function endCargarProducto(exo,cod,pesaje){
    var modselec = $("input[name='modselected']:checked").val();

    if (modselec == 1 || cod != 0) {
        
        if (($("#precp").prop("readonly") == undefined || !$("#precp").prop("readonly")) && param != 2){
            $("#precp").focus().select();

            if (exo < 100) {

                var impuestos = 0;
                // $(".dimpuesto").each(function(){
                //     if ($("#valores").data("elemento")['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0)
                //         impuestos += parseFloat($(this).data('valores')['vmonto'])
                // });

                if ($("#valores").data("elemento")['strimp'].indexOf(','+1+',') >= 0)
                        impuestos += parseFloat($("#imp_1").data('valores')['vmonto'])
                //.replace(/,/g,'')
                $("#precp").val( (parseFloat($("#valores").data("elemento")['hprec'])*(1+(impuestos/100))).formatMoney(2,'.',',') ) 
                $("#precp").blur();
                $("#precp").select().focus();
                $("[for=iva]").removeClass('hide');

                if (parseInt(config[12])){
                    $("#iva").prop('checked',true)
                }
                else
                    $("#iva").prop('checked',false)
            }else{
                $("[for=iva]").addClass('hide');
                $("#iva").prop('checked',false);
            }
        }else{
            if (param == 2) {
                $("#valores").data('elemento')['vexo'] = 0;
                if (exo < 100)
                    $("#exct").attr('checked',false)
                else{
                    $("#valores").data('elemento')['vexo'] = 100;
                    $("#exct").attr('checked',true)
                }

                if (parseInt(pesaje)){
                    $("._uni .select-wrapper .select-dropdown").click();
                    $("._uni .select-wrapper .select-dropdown").addClass('active');
                    $("._uni .select-wrapper .select-dropdown").focus();
                    $("._uni .select-wrapper .select-dropdown").first('li').addClass('selected');
                }
                else
                    $("#cantp").focus().select();

                var venta = getDatos('(ganancia*100)/if(!costo,1,costo),ganancia+costo,ganancia,costo',11,'id = '+$("#valores").data("elemento")['idp'],0,0,0)[0][0];
                $("#putil").val(parseFloat(venta[0]).formatMoney(2,'.',','));
                $("#pventa").val(parseFloat(venta[1]).formatMoney(2,'.',','));
                $("#putils").val(parseFloat(venta[2]));
                $("#putil").attr('hprec',venta[0]);
                $("#pventa").attr('hprec',venta[1]);
                $("#putil").attr('hcosto',venta[3]);

            }else{
                $("#cantp").focus().select();
            }
        }
        
    }else{
        if (!parseInt(pesaje)) {
            $("[for=iva]").addClass('hide');
            $("#iva").prop('checked',false);
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

    var factura = getDatos('lpad(consecutivo,6,0)',64,'id = '+vid[0][0],0,0)[0][0][0];
    var clave = vid[0][0];

    if (config[0] == 1 && (param == 1 || param == 7)) {
        var $toastContent = $('<span style="width: 500px">Generando Factura Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        Materialize.toast($toastContent);
        sendFE(clave);
    }else
        sendVMail(factura,clave,vid[0][0]);

    return false;
}

function verfacturas() {
    window.open("facturacion?accion=8&tf="+(param == 7 ? 1 : param));
}

function searchClient(vvariable,visprv){
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv+',@@impresa','',0,'');
    $(".clieBTN").addClass('hide');

    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0];
        $(".zelda").data('triforce')['vidcliente'] = vclie[0];
        $("#ncli").val(vclie[1]+' '+vclie[2]);
        param = param == 7 ? 1 : param;

        if ($(".zelda").data('triforce')['vidtipoventa'] == 7){
            $(".zelda").data('triforce')['vidtipoventa'] = 1;
            var ncons = getDatos('lpad(consecutivo+1,6,0)',252,'idsucursal = @@impresa and id > 0',0,0)[0][0];
            $("#titfact").html('VENTAS')
            $("#idfact").html(ncons);
        }

        $(".chg_tipo").removeAttr('disabled');

        if (vclie[3] > 0 || param==2) {
            $(".chg_tipo[val=2]").removeAttr('disabled');
        }else{
            $(".chg_tipo[val=2]").attr('disabled','true')
        }

        if ($(".zelda").data('triforce')['vidtipo'] == 2)
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
        
        $("#vdescuentop").val(vclie[4]);
        $("#vdescuentop").data('valor',vclie[4]);

        $("#crrclie").removeClass('hide');
        $("#hisclie").removeClass('hide');
        $("#exobtn").removeClass('hide');
        
        if (/[1478]/i.test(param)) {
            var correos = getDatos("",18,$(".zelda").data('triforce')['vidcliente']+",2",0,0,0);
            str_correos = '';
            if (!correos['succed']) {
                Materialize.toast('Correos Inválidos',4000,'red');
                arr('login',7,2,64,'feestado=2','id='+clave,0,0);
            }else{
                for (var i = 0; i < correos[0].length; i++) {
                    str_correos += correos[0][i][3]+",";
                }

                str_correos = str_correos.substr(0,str_correos.length-1);
                tmp_correos = '';
            }
        }
    }else{
        str_correos = '';
        param = param == 1 ? 7 : param;
        if ($(".zelda").data('triforce')['vidtipoventa'] == 1){
            $(".zelda").data('triforce')['vidtipoventa'] = 7;
            var ncons = getDatos('lpad(consecutivo6+1,6,0)',252,'idsucursal = @@impresa and id>0',0,0)[0][0];
            $("#titfact").html('TIQUETES')
            $("#idfact").html(ncons);
        }

        $(".zelda").data('triforce')['vidcliente'] = 0;
        $("#vdescuentop").val(0);
        $("#vdescuentop").data('valor',0);
        $("#ced").val('');
        $("#vplazo").val(0);
        
        $(".chg_tipo").attr('disabled','disabled')
        $(".chg_tipo[val=1]").removeAttr('disabled');

        $(".chg_tipo[val=1]").click()

        $("#ingclie").removeClass('hide');
    }

    cargarImpuestos($(".zelda").data('triforce')['vidcliente'],'2');
    cargarDescuentos($(".zelda").data('triforce')['vidcliente']+',0','2');
    // cambio cliente
    /*var producto = $("#fdetallefacturas .ciclos");
    producto.each(function(i) {
        var idlinea = $(this).attr('id').substr(2);
        var idprod = $("#desc"+idlinea).text();
        var prod = arr('login',4,'',43,'"'+idprod+'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+getParameterByName('tf'),0,0,0);
        console.log(prod)
        var char1 = $("#desc"+idlinea).text().substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var vstrimp = cargarImpuestos($("#desc"+idlinea).text().substr(1)+',0',tabla);

        prod = prod[0][0];
        if (parseFloat(prod[3]) > 0) {
            $("#prec"+idlinea).text(prod[3]);//.formatMoney(2,'.',','));
            $("#fd"+idlinea).data('triforce',{vprecio : prod[3]});
            //vaccion : 0,vid : 0,vidfactura : '?',videntrada : prod[0],vcantidad : $("#fd"+idlinea).data('triforce')['vcantidad'],vprecio : prod[3],vdesc : 0,vtotal : 0,vidinventario : prod[13],vidodt : 0,vimv : 0,vcomodin : '',vidunidad : $("#fd"+idlinea).data('triforce')['vidunidad'],vidimpuestos : $("#fd"+idlinea).data('triforce')['vidimpuestos'],viddescuentos : $("#fd"+idlinea).data('triforce')['viddescuentos'],strimp: vstrimp
        }
    });*/

    totalizar();  

    $("#codp").focus();
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
            textImpuestos = '<tr id="imp_'+imp[i][0]+'" class="dimpuesto" '+noBorrar+'><td id="imp_v'+imp[i][0]+'">'+imp[i][2]+' ['+exo+'%]:</td><td style="float: right;"><span class="moneda">'+sMoneda+'</span><span id="imv_'+imp[i][0]+'" type="html">0.00</span></td></tr>';
            
            $("#sh_imp").append(textImpuestos);

            $("#imp_"+imp[i][0]).data('valores',{vid:imp[i][0],vmonto:imp[i][3],exoneracion:imp[i][4]});
            
            if (param == 2) {
                $("#valor_grabado").attr('orig',exo);
                $("#valor_grabado").val(exo);
                Materialize.updateTextFields();
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
    
    if (param == 2)
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
        case 2:
            break;
        default:
            break;
    }   

    //totalizar();
    return {'descuento':mdesc,'iddescuento': mdescid};
}

function sendFE(clave){
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: clave, accion : 1}
    })
      .done(function(data) {

        var p;
        try {
            p = JSON.parse(data);
            $(".expect").removeClass('progress');
      
            if (p['succes']) {
                var vfactura = p['num'];
                var vclave = p['clave'];
                arr('login',7,2,64,'feestado=2','id='+clave,0,0);
                $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
                sendVMail(vfactura,vclave,clave);
            }else{
                $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
                Materialize.toast(p['rs'],5000,'red');
                switch(parseInt(p['erno'])){
                    case 1:
                        arr('login',7,2,64,'feestado=0','id='+clave,0,0);
                        if (config[4] == 1) {
                            var vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : '';
                            
                            try{ 

                                w = window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked')+vuelto+"&fp=1");
                                
                            }catch(e){
                                Materialize.toast("POP-UP ACTIVADO",4000,'red');
                            }
                        }
                        break;
                    default:
                        arr('login',7,2,64,'feestado=8','id='+clave,0,0);
                    break;
                }
                setTimeout(function(){location.reload();},3000);
            }
            
        }
        catch(err){
            console.log(err)
            $(".expect").removeClass('progress')
            $(".expect").html("<i class='mdi mdi-24px mdi-close red-text'></i>");
            Materialize.toast(data,5000,'red');
            arr('login',7,2,64,'feestado=8','id='+clave,0,0);
            setTimeout(function(){location.reload();},5000);
        }       
  });
}

function sendVMail(factura,clave,vid){
    var archivos = '';

    if(config[3] == 1){ //ENVIO RAPIDO DE FACTURA
        switch(param){
            case 2:
                break;
            default:
                
                if (config[4] == 1 && (param == 1 || param == 7)) {
                    var vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : '';
                    
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
            archivos = makeArchivos(factura,clave,vid,vbody[1],ntipo);
            enviarCorreo(3,str_correos,ntipo+" N° "+factura,vbody[0],archivos);
        }else{
            if ($("#pcon").is(":visible") && parseFloat($("#pcon").val()) > 0 ) {
                setTimeout(function(){location.reload();},7000);
            }else
                setTimeout(function(){location.reload();},2000);
        }
        
    }else{
        switch(param){
            case 2:
                break;
            default:
                if (config[4] == 1 && (param == 1 || param == 7)) {

                    var vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : '';
                   
                    try{    
                         w = window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked')+vuelto+"&fp=1");
                    }catch(e){
                        Materialize.toast("POP-UP ACTIVADO",4000,'red');
                    }

                    if ($("#pcon").is(":visible") && parseFloat($("#pcon").val()) > 0 ) {
                        setTimeout(function(){location.reload();},7000);
                    }else
                        setTimeout(function(){location.reload();},2000);
                    }
                break;
        }
    }
}


function makeArchivos(vfactura,vclave,vid,vsucursal,ntipo){
    var archivos = '';
    var vtit = param == 1 ? 'Factura Electrónica' : ntipo;
    mantenimiento_async('login',8,{arch:'recibo',id:vid,mic:1,tit:vtit,sel:'',tbl:72,where:vid},1);
    if (vclave == vid || (param != 1 && param != 7))
        archivos = 'pdf/'+ntipo+' N°'+vfactura+', '+vsucursal+'.pdf';
    else{
        archivos = {0:'xml/Factura N°'+vfactura+', '+vsucursal+'.xml',1:'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf'}
        mantenimiento_async('login',9,{id:vid,factura:vfactura,sucursal:vsucursal},1);
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
    if ($("#pcon").is(":visible") && parseFloat($("#pcon").val()) > 0 ) {
        setTimeout(function(){location.reload();},7000);
    }else
        setTimeout(function(){location.reload();},2000);
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
