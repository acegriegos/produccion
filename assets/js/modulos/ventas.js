var max = 1;
var exoneracion = 0;

$(function(){
    $("#ffacturas").submit(function(){
        return false;
    });
    fecha = new Date();
    $('#vfecha').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

    $("#data-table-detalle").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });

    $('select').material_select();

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
       
        if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
            $(".autocomplete-content").remove();
        
            $("#ncli").autocomplete({
                limit: 20,
                dropdown: {
                    el: ".autocomplete-content"
                },
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2)) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
                })
        }
    });

    

})//READY

$(document).on("click","#p_v",function(){
    if ($(this).is(":checked"))
        $(this).val(1);
    else
        $(this).val(0);

});

$(document).on("click","#chg_tipo",function(){
    
    var value = parseInt($(this).val())
    //     idcli = $("#vidcliente").val() == '' ? 0 : $("#vidcliente").val();
    // $("#vidtipo").val(value);

    // if (value == 1) {
    //     $(".cre").hide();
    //     $(".con").show();
    //     $("#vplazo").val(0);
    // }else{
    //     $(".con").hide();
    //     $(".cre").show();
    //     if (idcli != 0) {
    //         var plazo = arr('login',4,'plazo',2,'id = '+$("#vidcliente").val(),'',0,'')[0][0][0];
    //         $("#vplazo").val(plazo);
    //     }
        
    // }
    // $("#ncli").focus();
});

$(document).on("keyup","#cantp",function(e){
    var cant = parseFloat($(this).val()),
        prec = $("#hprec").val(),
        precio = parseFloat($("#hprec").val().replace(/,/g,"")),
        total = precio * cant;
        
    $("#precp").val(total.formatMoney(2,'.',','));
    var totp = $("#precp").val();
    var code = e.which || e.keyCode;
    if (code == 13) {
        if (cant > 0) {
            var cod = $("#codp").val();
            var idprd = $("#hcodp").val();
            var desc = $("#descp").val();
            var cnt = arr('login',4,'vcantidad',43,'vcodigo = \"'+ cod+'\"','',0,'')[0];
            
            if (cant > cnt) {
                $("#divcnt").addClass('has-danger');
                $("#cantp").addClass('has-danger form-control-danger');
                $("#err").show(300);
            }else if (cant <= cnt || cnt == '∞') {
                $("#divcnt").removeClass('has-danger');
                $("#cantp").removeClass('has-danger form-control-danger');
                $("#err").hide(300);

                addline(idprd,cod,desc,cant,prec,totp,cnt);
            }
        }else{
            $("#divcnt").addClass('has-danger');
            $("#cantp").addClass('has-danger form-control-danger');
            $("#err").show(300);
            $("#smerr").html("Cantidad Debe ser Mayor a 0");
        }
    }
  
});

$(document).on("change","#cantp",function(){
    var cant = parseFloat($(this).val());
    var prec = $("#hprec").val();
    var precio = parseFloat($("#hprec").val().replace(/,/g,""));
    var total = precio * cant;
    $("#precp").val(total.formatMoney(2,'.',','));
});

$(document).on("keyup","[id^=vcantidad]",function(e){
    var code = e.which || e.keyCode;

    if (code == 13) {
        var id = $(this).attr('id').substr(9);
        var valor = $(this).val();
        var precio = parseFloat($("#vprecio"+id).val());
        var total = precio * valor;
        $("#htotp"+id).val(total);
        $("#tota"+id).text(total.formatMoney(2,'.',','))
        
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val())

    }
});

$(document).on("change","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#htotp"+id).val(total);
    $("#tota"+id).text(total.formatMoney(2,'.',','))
    
    totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
});

$(document).on("blur","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#htotp"+id).val(total);
    $("#tota"+id).text(total.formatMoney(2,'.',','))
    
    totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
    $(this).hide();
    $("#cant"+id).text(valor);
    $("#cant"+id).show();
});

$(document).on("click",".fedit",function(){
    var id = $(this).attr('id').substr(4);
    var cod = $("#codprod"+id).text();
    var visible = $(this).attr('visible');
    var cantinv = arr('login',4,'vcantidad',43,'vcodigo = "'+cod+'"','',0,'')[0][0];
    $("#cnth"+id).val(cantinv);
    $("#vcantidad"+id).attr('max',cantinv)

    if (visible == 0) {
        $("#errcnt").hide();
        $("#cant"+id).hide();
        $("#vcantidad"+id).show();
        $(this).attr('visible','1');
        $("#vcantidad"+id).select();
    }else{
        var cant = parseInt($("#vcantidad"+id).val());
        var cinv = parseInt($("#cnth"+id).val());
        if (cant > cinv) {
           $("#errcnt").show();
           $("#vcantidad"+id).select();
        }else{
           $("#cant"+id).text(cant)
            $("#vcantidad"+id).hide();
            $("#cant"+id).show();
            $(this).attr('visible','0');
            $("#errcnt").hide();
        }
        
    }



});

$(document).on("click","input[name=modo]",function(){
    var id = $(this).attr('id').substr(4);
    $("#modselected").val(id);
});

$(document).on("keyup","#codp",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var kbrota = $(this).val();
        var cantidad = 1;
        
        if ( $("#codp").val().indexOf('*') != -1) {
            cantidad = $("#codp").val().substring(0,$("#codp").val().indexOf('*'));
            kbrota = $("#codp").val().substring($("#codp").val().indexOf('*')+1);
            $("#codp").val(kbrota);
        }

        if ($("#codp").val().substr(0,1) == '-') {
            kbrota = 'S'+$(this).val();
        }else if($("#codp").val().substr(0,1) == '+') {
            kbrota = 'P-'+$(this).val().substr(1);
        }

        var cod = arr('login',4,'vid,vcodigo,vnombre,vprecio,vcantidad,vhcodigo',43,'vcodigo = \"'+ kbrota +'\"','',0,'')[0][0];

        if (cod != undefined) {
            $("#noprod").hide(500);
            $("#idp").val(cod[0]);
            $("#codp").val(cod[1]);
            $("#hcodp").val(cod[5]);
            $("#descp").val(cod[2]);
            $("#precp").val(cod[3]);
            $("#hprec").val(cod[3]);
            if (cod[4] == '?') {
                $("#cantI").html('∞');
            }else{
                $("#cantI").html(cod[4]);
            }

            var modselec = $("#modselected").val();
            if (modselec == 1) {
                // alert('KEYBOARD')
                $("#cantp").val(cantidad);
                $("#cantp").focus();
                $("#cantp").select();

                if(cantidad != 1) {
                    var e = jQuery.Event("keyup");
                    e.which = 13;
                    $("#cantp").trigger(e);
                }
            }else{
                // alert('BARCODE')
                var e = jQuery.Event("keyup");
                e.which = 13;
                $("#cantp").val(cantidad);
                $("#cantp").trigger(e);

                if(cantidad != 1) {
                    $("#cantp").trigger(e);
                }
            }

        }else{
            $("#noprod").show(500);
            $(this).select()
        }
    }
});

$(document).on("keyup","#descp",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var prodf = arr('login',4,'vcodigo,vnombre,vprecio,vcantidad',43,'vnombre like \"'+$(this).val()+'%\"','',0,'')[0][0];
        
        $("#codp").val(prodf[0]);
        $("#descp").val(prodf[1]);
        $("#precp").val(prodf[2]);
        $("#hprec").val(prodf[2]);
        if (prodf[3] == '?') {
            $("#cantI").html('∞');
        }else{
            $("#cantI").html(prodf[3]);
        }
        
        $("#cantp").val(1);
        $("#cantp").select();
    }
});

$(document).on("keyup","#ncli",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        searchClient($(this).val(),$("#vbisproveedor").val());
    }
});

$(document).on("blur","#ncli",function(){
    searchClient($(this).val(),$("#vbisproveedor").val());
});

$(document).on("keyup","#ced",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        searchClient($(this).val(),$("#vbisproveedor").val());
    } 
});

$(document).on("blur","#ced",function(){
    searchClient($(this).val(),$("#vbisproveedor").val());
});

$(document).on("click",".desc",function(){
    var estado = $(this).attr('estado');
    var id = $(this).attr('id').substr(1);

    if (estado == 0) {
        $("#vdesc"+id).removeAttr('disabled');
        $(this).attr('estado',1);
        $(this).css('color','#30DE61');
        $("#vdesc"+id).select();
    }else{
        $("#vdesc"+id).attr('disabled',true);
        $(this).attr('estado',0);
        $(this).css('color','#3E3E3E');
    }
});

$(document).on("keyup",".desci",function(e){
    var code = e.which || e.keyCode;

    if (code == 13) {
        var line = $(this).attr('id').substr(5);

        var desci = $(this).val() == '' ? 0 : parseFloat($(this).val());
        var total = parseFloat($("#htotp"+line).val().replace(/,/g,""));
        
        dodesc(line,desci,total);
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val())
    }
});

$(document).on("blur",".desci",function(){
    var line = $(this).attr('id').substr(5);
    var desci = $(this).val() == '' ? 0 : parseFloat($(this).val());
    var total = parseFloat($("#htotp"+line).val().replace(/,/g,""));
    
    dodesc(line,desci,total);

    $("#vdesc"+line).attr('disabled',true);
    $("#i"+line).attr('estado',0);
    $("#i"+line).css('color','#3E3E3E');
});

$(document).on("keyup","#vdescuento",function(){
    totalizar($(this).val(),$("#vflete").val(),$("#vajuste").val());
});

$(document).on("keyup","#vflete",function(){
    totalizar($("#vdescuento").val(),$(this).val(),$("#vajuste").val());
});

$(document).on("keyup","#vajuste",function(){
    totalizar($("#vdescuento").val(),$("#vflete").val(),$(this).val());
});

$(document).on("click","#del1",function(){
    // pruebas
});

$(document).on("click",".delf",function(){
    var id = $(this).attr('id').substr(3);
    var total = 0;
    $("#fd"+id).remove();

    if ($(".totp").text() == '') {
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val())
    }else{
        $(".totp").each(function(){
            var precio = parseFloat($(this).text().replace(/,/g,""));
            total += precio;
            $("#hsubtot").val(total);
            totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
        });
    }

});

$(document).on("click","#facturar",function(){
    // setTimeout(function(){ $("#pcon").focus(); }, 500);
});

$(document).on("click","#btnAjuste",function(){
    var accion = $(this).attr('accion');
    if (accion == 1) {
        $("#btnAjuste").text('-');
        $(this).attr('accion',0);
    }else if (accion == 0) {
        $("#btnAjuste").text('+');
        $(this).attr('accion',1);
    }
    totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
});


function addline(idprod,cod,desc,cant,prec,tot,cntinv) {
    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec.replace(/,/g,""));
    $("#detallefactura tr").each(function(){
        var vid = $(this).attr('id').substr(2);
        if (cod == $("#codprod"+vid).text()) {
            existe = 1;
            if ( parseFloat($("#cant"+vid).text())+cant > cntinv ) {
                $("#divcnt").addClass('has-danger');
                $("#cantp").addClass('has-danger form-control-danger');
                $("#err").show(300);
                $("#cantp").select();
                err = 1;
            }else{
                var descp = $("#vdesc"+vid).val() == '' ? 0 : parseFloat($("#vdesc"+vid).val());
                var totp = parseFloat($("#htotp"+vid).val().replace(/,/g,""));
                
                var htot = totp + (precio * cant);
                var total = 0;
                var tcant = parseFloat($("#cant"+vid).text().replace(/,/g,""))+cant

                $("#vcantidad"+vid).val(tcant)
                $("#cant"+vid).html(tcant);
                $("#htotp"+vid).val(htot);
                $("#tota"+vid).text(htot.formatMoney(2,'.',','))

                if (descp != 0)
                    $("#tota"+vid).html( ( (totp + (precio * cant)) / ((descp/100)+1) ).formatMoney(2,'.',',') );

                $(".totp").each(function(){
                    var precio = parseFloat($(this).text().replace(/,/g,""));
                    total += precio;
                    $("#hsubtot").val( total );
                    
                    // $("#subtot").html( total.formatMoney(2,'.',',') );
                });
            }
            totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
        }
    });

    if (!existe) {
        var id = parseInt($("#idline").val())+1;
        var cprd = 0;
        var csrv = 0;
        var cpck = 0;
        $("#idline").val(id);
        if (idprod.substr(1,1) == '-') {
            cprd = 0;
            csrv = idprod.substr(2);
            cpck = 0;
        }else if(idprod.substr(1,1) == '+') {
            cprd = 0;
            csrv = 0;
            cpck = idprod.substr(2);
        }else{
            cprd = idprod;
            csrv = 0;
            cpck = 0;
        }

        $("#detallefactura").append('<tr align="center" id="fd'+id+'"><td style="width: 5%"><div class="checkbox"><label class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator" id="d'+id+'" class="delf" name="eliminarf" value="1" style="float: right;"></span></label></div></td><td style="width: 10%"><span id="codprod'+id+'">'+cod+'</span><input type="hidden" id="vidproducto'+id+'" class="constante'+id+'" value="'+cprd+'"><input type="hidden" id="vidpaquete'+id+'" value="'+cpck+'"><input type="hidden" id="vidservicio'+id+'" value="'+csrv+'"><input type="hidden" id="vidfactura'+id+'" value="?"></td><td style="width: 27%"><span id="desc'+id+'">'+desc+'</span></td><td style="width: 10%"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" class="form-control form-control-sm" value="'+cant+'" min="1" style=" display:none;width: 70px"><input type="hidden" id="cnth'+id+'" value=""><div id="errcnt" class="form-control-feedback" align="center" style="display:none"><small>Cantidad insuficiente</small></div></div></td><td style="width: 14%"><span id="prec'+id+'">'+prec+'</span><input type="hidden" id="vprecio'+id+'" value="'+precio+'"></td><td style="width: 14%"><span id="tota'+id+'" class="totp">'+tot+'</span><input type="hidden" id="htotp'+id+'" value="'+tot+'"></td><td id="desctd'+id+'" align="left" style="width: 6%"><input type="text" id="vdesc'+id+'" class="form-control form-control-sm desci" value="0.00" placeholder="0" style="width: 50px" disabled><input type="hidden" id="descHide'+id+'"></td><td style="font-size: 0.9em; width: 15%"><i class="fa fa-percent btn desc" id="i'+id+'" title="Descuento individual" data-toggle="modal" href="#modal-MODAL" style="font-size: 0.8em" estado="0"></i><i class="btn fa fa-edit fedit" id="edit'+id+'" visible="0"></i><i class="fa fa-times btn delf" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila"></i></td></tr>');

        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());

    }

    if (err == 0) {
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0);
        $("#precp").val('0.00');
        $("#cantI").text(0);

        $("#codp").focus();
    }
    

}

function dodesc(line,desc,total){
    if (desc != 0) {
        var totdesc = total / ((desc / 100)+1);
        $("#tota"+line).text(totdesc.formatMoney(2,'.',','));
    }else
        $("#tota"+line).text(total.formatMoney(2,'.',','));
    
    var sumaprod = 0;
    $(".totp").each(function(){
        var precio = parseFloat($(this).text().replace(/,/g,""));
        sumaprod += precio;
        
        $("#hsubtot").val(sumaprod);
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
        // $("#subtot").text(sumaprod.formatMoney(2,'.',','));

    });
    

}

function totalizar(desc,flete,ajuste) {
    var imv = arr('login',4,'valor',51,'id = 1','',0,'')[0][0];
    var imp = (imv / 100) + 1;
    var totd = 0;
    var total = 0;
    var impuesto = 0;
    var vtsubtot = 0;
    var tdesc = 0;
    var tajuste = 0;
    var flete = isNaN(parseFloat(flete)) || parseFloat(flete) == '' ? 0 : parseFloat(flete);
    var desc = isNaN(parseFloat(desc)) || parseFloat(desc) == '' ? 0 : parseFloat(desc);
    var ajuste = isNaN(parseFloat(ajuste)) || parseFloat(ajuste) == '' ? 0 : parseFloat(ajuste);
    var actajuste = $("#btnAjuste").attr('accion') == 1 ? '' : '-';

    $(".totp").each(function(){
        var precio = parseFloat($(this).text().replace(/,/g,""));
        totd += precio;
    });

    // formula
    // subtotal * (1-(descuento / 100)) * (1+(imv / 100))

    // impuesto = totd * (imv / 100);
    // total = totd + impuesto;
    idesc = totd * (desc / 100);
    tdesc =  totd - idesc;
    impuesto = tdesc * (imv / 100);
    // tdesc = total / ((desc / 100)+1);
    total = tdesc + impuesto;

    if (flete == 0) {
        $("#flete").html('0.00');
        total = tdesc;
    }else{
        $("#flete").html(flete.formatMoney(2,'.',','));
        total = tdesc + flete;
    }

    if (desc != 0)
        total = tdesc + flete;

    if (ajuste != 0) {
        ajuste = parseFloat(actajuste+ajuste);
        total += ajuste;
    }
    
    $("#subtot").html(totd.formatMoney(2,'.',','));
    $("#vimv").val(imv);
    $("#imv").html(impuesto.formatMoney(2,'.',','));
    $("#descuento").html(idesc.formatMoney(2,'.',','));
    $("#tdesc").val(tdesc);
    $("#tot").html(total.formatMoney(2,'.',','));
    $("#vsubtotal").val(totd.toFixed(2));
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        case 'factura':
            if (vmodulo['tip'] == '') {
                err = validarFactura();
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

function validarFactura() {


    if ($("#ncli").val() == '') {
        $("#ncli").focus()
        return "Cliente Requerido";
    }

    if ($("#subtot").text() == '0.00') {
        $("#codp").focus()
        return "No se Han Ingresado Productos";
    }

    if ($("#vcomentario").val() == '') {
        $("#vcomentario").val('');
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
    arr['where'] = '1 and Id > 0 order by `Razón Social`';

    return arr;
}

function getDatos(vmodulo){

    switch (vmodulo){
    case 'clientes':
        var array = {};

        array['sel'] = 'vid, nombre, vcedula';
        array['tbl'] = 29;
        array['where'] = 'nombre like \"%'+$("#ncli").val()+'%\" and isproveedor = 0';

        p = mantenimiento('facturacion',3,array);
        return p;
    break;

    case 'productos':
        var array = {};

        array['sel'] = 'vcodigo, vnombre, vprecio, vcantidad';
        array['tbl'] = 43;
        array['where'] = 'vnombre like \"%'+$("#descp").val()+'%\"';

        p = mantenimiento('facturacion',5,array);
        return p;
    break;
    
    case 'proveedores':
        var array = {};

        array['sel'] = 'vid, vnombre, vcedula';
        array['tbl'] = 30;
        array['where'] = 'vnombre like \"%'+$("#nprv").val()+'%\"';

        p = mantenimiento('facturacion',4,array);
        return p;
    break;
    }
}
function endDetail(vid) {
    window.open('facturacion?accion=6&id='+vid);
    return false;
}