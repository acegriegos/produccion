var max = 1;

$(document).ready(function(){

    $("#fact").click(function(){
        $("#tptit").html('VENTAS');
        $("#nfact").html('N° Factura');

        $("#mfacturacion").empty();
        var p = mantenimiento('compras',1,'');
        $("#mfacturacion").html(p);

        // AUTO COMPLETE CLIENTES
        var optionsc = {

              url: function(phrase) {
                getDatos('clientes');
                return 'view/getClie.php';
              },

              getValue: function(element) {
                return element[1];
              },

              ajaxSettings: {
                dataType: "json",
                method: "POST",
                data: {
                  dataType: "json"
                }
              },

              requestDelay: 400
            };

        $("#ncli").easyAutocomplete(optionsc);
        // AUTO COMPLETE CLIENTES

        // AUTO COMPLETE PRODUCTOS
        var optionsprod = {

              url: function(phrase) {
                getDatos('productos');
                return 'view/getProdfact.php';
              },

              getValue: function(element) {
                return element[1];
              },

              ajaxSettings: {
                dataType: "json",
                method: "POST",
                data: {
                  dataType: "json"
                }
              },

              requestDelay: 400
            };

        $("#descp").easyAutocomplete(optionsprod);
        // AUTO COMPLETE PRODUCTOS

        var consecutivo = arr('login',4,'consecutivo',39,'id = @@impresa','',0,'')[0][0][0];
        var idfact = 0;
        
        if (consecutivo.length == 1) {
            idfact = addZero(consecutivo,parseInt(consecutivo.length)+1);
        }else{
            idfact = consecutivo
        }
        $("#idfact").val(idfact)


        $("#ncli").focus();

    });

    $("#comp").click(function(){
        $("#tptit").html('COMPRAS');
        $("#nfact").html('N° Compra');

        $("#mfacturacion").empty();
        var p = mantenimiento('compras',2,'');
        $("#mfacturacion").html(p);

         // AUTO COMPLETE PROVEEDORES
        var optionsp = {

              url: function(phrase) {
                getDatos('proveedores');
                return 'view/getPrv.php';
              },

              getValue: function(element) {
                return element[1];
              },

              ajaxSettings: {
                dataType: "json",
                method: "POST",
                data: {
                  dataType: "json"
                }
              },

              requestDelay: 400
            };

        $("#nprv").easyAutocomplete(optionsp);
        // AUTO COMPLETE PROVEEDORES

    });

    $("#fact").click();

    $("#ninunclud").click(function(){
        $("#descr").focus();
        $("#descr").select();
        $("#alert-prod").hide();
    });

    $("#includ").click(function(){
        $("#alert-prod").hide();
        
        $("#prod"+max).html($("#descr").val());
        $("#vidproducto"+max).val(0);

        $("#vcantidad"+max).focus();
        $("#vcantidad"+max).select();
    });

    // $(".delf").hide()

    $("#del").click(function(){
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0.00);
        $("#precp").val(0.00);
        $("#totp").val(0.00);
        $("#cantP").html(0);

        $("#codp").focus();
    });

    $("#fcompras").submit(function(){
        return false;
    })

    $("#data-table-detalle").dataTable({
        bFilter : false,
        bScrollInfinite : true,
        bSort : false,
        bLengthChange : false,
        bPaginate :  false,
        bInfo : false
    });

    $(".xort").blur(function(){
        detallar($(this).attr('idx'))
    });

    $("#modo1").click();
});

$(document).on("click","input[name=vidtipo]",function(){
    var value = $(this,"option:selected").val();
    $("#vidtipo").val(value);
});

$(document).on("keyup","#cantp",function(e){
    var cant = parseFloat($(this).val());
    var prec = $("#hprec").val();
    var precio = parseFloat($("#hprec").val().replace(/,/g,""));

    var total = precio * cant;
    $("#precp").val(total.formatMoney(2,'.',','));
    var totp = $("#precp").val();

    var code = e.which || e.keyCode;
    if (code == 13) {
        var cod = $("#codp").val();
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

            addline(cod,desc,cant,prec,totp,cnt);
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

$(document).on("click",".fedit",function(){
    var id = $(this).attr('id').substr(4);
    var visible = $("#vcantidad"+id).attr('visible');

    var cod = $("#codprod"+id).text();
    var arr = {}
    
    arr['sel'] = 'vcodigo, vcantidad';
    arr['tbl'] = 43;
    arr['where'] = 'vcodigo = "'+cod+'"';

    var cantinv = mantenimiento('login',4,arr)[0][0];
    $("#cnth"+id).val(cantinv[1]);

    if (visible == 0) {
        $("#cant"+id).show(100);
        $("#vcantidad"+id).hide();
        $("#vcantidad"+id).attr('visible',1);
    }else{
        $("#cant"+id).hide();
        $("#vcantidad"+id).show(100);
        $("#vcantidad"+id).attr('visible',0);

        $("#vcantidad"+id).keyup(function(e){
            var code = e.which || e.keyCode;
            if (code == 13) {
                $("#cant"+id).text(parseFloat($("#vcantidad"+id).val()));
                $("#cant"+id).show(100);
                $("#vcantidad"+id).hide();

                $("#tota"+id).text( (parseFloat($("#cant"+id).text().replace(/,/g,"")) * parseFloat($("#prec"+id).text().replace(/,/g,""))).formatMoney(2,'.',',') );
            }
        });        
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
            kbrota = 'S'+ $(this).val();
        }

        var cod = arr('login',4,'vcodigo, vnombre, vprecio, vcantidad',43,'vcodigo = \"'+ kbrota +'\"','',0,'')[0][0];

        if (cod != undefined) {
            $("#noprod").hide(500);
            $("#codp").val(cod[0]);
            $("#descp").val(cod[1]);
            $("#precp").val(cod[2]);
            $("#hprec").val(cod[2])
            if (cod[3] == '?') {
                $("#cantP").html('∞');
            }else{
                $("#cantP").html(cod[3]);
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
        var arr = {}
        
        arr['sel'] = 'vcodigo, vnombre, vprecio, vcantidad';
        arr['tbl'] = 43;
        arr['where'] = 'vnombre like \"'+$(this).val()+'%\"';

        var prodf = mantenimiento('login',4,arr)[0][0];
        
        $("#codp"/*+id*/).val(prodf[0]);
        $("#descp"/*+id*/).val(prodf[1]);
        $("#precp"/*+id*/).val(prodf[2]);
        if (prodf[3] == '?') {
            $("#cantP").html('∞');
        }else{
            $("#cantP"/*+id*/).html(prodf[3]);
        }
        
        $("#cantp"/*+id*/).focus();
    }
});

$(document).on("keyup","#ncli",function(e){
    var code = e.which || e.keyCode;
    var isprv = $("#vbisproveedor").val()
    searchClient(code,$(this).val(),isprv);
});

$(document).on("keyup","#ced",function(e){
    var code = e.which || e.keyCode;
    var isprv = $("#vbisproveedor").val();
    searchClient(code,$(this).val(),isprv);
});

$(document).on("keyup","#nprv",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var arr = {}
        
        arr['sel'] = 'vnombre, vcedula';
        arr['tbl'] = 30;
        arr['where'] = 'vnombre like \"%'+$(this).val()+'%\"';
    
        var prv = mantenimiento('login',4,arr)[0][0];

        $("#nprv").val(prv[0]);
        $("#idprv").val(prv[1]);
    }
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

$(document).on("click",".delf",function(){
    var id = $(this).attr('id').substr(3);
    var total = 0;
    //alert
    $("#fd"+id).remove();
    $(".totp").each(function(){
        var precio = parseFloat($(this).text().replace(/,/g,""));
        total += precio;
        $("#hsubtot").val(total);
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());
        // $("#subtot").html(total.formatMoney(2,'.',','));
    });

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

$(document).on('keyup','#vreferencia',function(e){
    var code = e.keyCode || e.which;
    focus = $("#vfecha_inclucion");
    k_p(code,focus);
});

$(document).on('keyup','#vfecha_inclucion',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vfecha_entrega");
    k_p(code,focus);
});

$(document).on('keyup','#vfecha_entrega',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcedula");
    k_p(code,focus);
});

$(document).on('keyup','#idprv',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");
    k_n(code,focus);
});

$(document).on('keyup','#nprv',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");
    k_n(code,focus);
});

$(document).on('keyup','#descr',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcantidad"+max);
    if ($(this).val() != '')
        k_d(code,focus);
});

$(document).on('keyup','#cod',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#vcantidad"+max);
    if ($(this).val() != '')
        k_d(code,focus);
});

$(document).on('keyup','[id^=vcantidad]',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(9)
    var focus = $("#vcosto"+id);
    k_p2(code,focus,id);
});

// $(document).on('blur','#cant'+max,function(){
    
//     if(isNaN($(this).val()))
//         $(this).val(1)
//     var focus = $("#costo"+max);
//     k_p(13,focus);
// });

$(document).on('keyup','[id^=vcosto]',function(e){
    var code = e.keyCode || e.which;
    var id = $(this).attr('id').substr(6)
    var focus = $("#vprecio"+id);
    k_p2(code,focus,id);
});

$(document).on('keyup','[id^=vprecio]',function(e){
    var code = e.keyCode || e.which;
    var focus = $("#descr");

    if (code == 13) {
        var id = $(this).attr('id').substr(7)
        k_p2(code,focus,id)
        if($("vprecio"+(id+1)).val() != 'undefined');
            // line2(id)
        focus.select();
    }
});

// function totalizar(subtotal) {
    
// }

function searchClient(vcode,vvariable,visprv){
    if (vcode == 13) {
        var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'')[0][0];

        $("#vidcliente").val(clie[0]);
        $("#ncli").val(clie[1]);
        $("#ced").val(clie[2]);
        $("#dcli").val(clie[3]);

        $("#codp").focus();
    }
}

function addline(cod,desc,cant,prec,tot,cntinv) {
    
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
        $("#idline").val(id)


        $("#detallefactura").append('<tr align="center" id="fd'+id+'"><td style="width: 5%"><div class="checkbox"><label class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator" id="d'+id+'" class="delf" name="eliminarf" value="1" style="float: right;"></span></label></div></td><td style="width: 10%"><span id="codprod'+id+'">'+cod+'</span><input type="hidden" id="vidproducto'+id+'" class="constante'+id+'" value="'+cod+'"><input type="hidden" id="vidfactura'+id+'" value="?"></td><td style="width: 27%"><span id="desc'+id+'">'+desc+'</span></td><td style="width: 10%"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" class="form-control form-control-sm" value="'+cant+'" visible="0" style=" display:none;width: 70px"><input type="hidden" id="cnth'+id+'" value=""></td><td style="width: 14%"><span id="prec'+id+'">'+prec+'</span><input type="hidden" id="vprecio'+id+'" value="'+precio+'"></td><td style="width: 14%"><span id="tota'+id+'" class="totp">'+tot+'</span><input type="hidden" id="htotp'+id+'" value="'+tot+'"></td><td id="desctd'+id+'" align="left" style="width: 6%"><input type="text" id="vdesc'+id+'" class="form-control form-control-sm desci" value="0.00" placeholder="0" style="width: 50px" disabled><input type="hidden" id="descHide'+id+'"></td><td style="font-size: 0.9em; width: 15%"><i class="fa fa-percent btn desc" id="i'+id+'" title="Descuento individual" data-toggle="modal" href="#modal-MODAL" style="font-size: 0.8em" estado="0"></i><i class="btn fa fa-edit fedit" id="edit'+id+'"></i><i class="fa fa-times btn delf" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila"></i></td></tr>');

        var total = parseFloat($("#hsubtot").val().replace(/,/g,"")) + parseFloat(tot.replace(/,/g,""));
        // $("#subtot").html(total.formatMoney(2,'.',','));
        // $("#hsubtot").val();
        totalizar($("#vdescuento").val(),$("#vflete").val(),$("#vajuste").val());

    }

    if (err == 0) {
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0.00);
        $("#precp").val(0.00);
        $("#totp").val(0.00);
        $("#cantP").html(0);

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

function k_p(code,focus) {
	if (code == '13') {
		focus.focus();
	}
}

function k_p2(code,focus,index) {
    if (code == '13') {
        focus.focus();
        detallar(index)
    }
}

function k_n(code,focus) {
    if (code == '13') {
        var nombre = $("#nprv").val();
        var cedula = $("#idprv").val();
        var arr = {}
        arr['sel'] = 'id,cedula,nombre';
        arr['tbl'] = 3;
        arr['where'] = 'nombre = \"'+nombre+'\" or cedula = \"'+cedula+'\" having id > 0';
        var p = mantenimiento('login',4,arr)[0][0];
        
        $("#vidproveedor").val(p[0]);
        $("#idprv").val(p[1]);
        $("#nprv").val(p[2]);
        focus.focus();
        focus.select()
    }
}

function k_d(code,focus)
{
	if (code == '13') {
		var prod = $("#descr").val();
        var codigo = $("#cod").val();
	    var arr = {};
	    arr['sel'] = 'id,nombre';
	    arr['tbl'] = 7;
	    arr['where'] = 'nombre = \"'+prod+'\" or id = \"'+codigo+'\" having id > 0';
	    var p = mantenimiento('login',4,arr);

        if(p[0].length == 0){
            $("#alert-prod").show()
            focus = $("#descr");
        }else{
            p = p[0][0];
             $("#alert-prod").hide()
    	    $("#prod"+max).html(p[1]);
    	    $("#vidproducto"+max).val(p[0]);
        }
	    focus.focus()
        focus.select()
	}
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

    impuesto = totd * (imv / 100);
    total = totd + impuesto;
    idesc = total * (desc / 100);
    tdesc = total / ((desc / 100)+1);

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

        array['sel'] = 'vid, vnombre, vcedula';
        array['tbl'] = 29;
        array['where'] = 'vnombre like \"%'+$("#ncli").val()+'%\"';

        p = mantenimiento('compras',3,array);
        return p;
    break;

    case 'productos':
        var array = {};

        array['sel'] = 'vcodigo, vnombre, vprecio, vcantidad';
        array['tbl'] = 43;
        array['where'] = 'vnombre like \"%'+$("#descp").val()+'%\"';

        p = mantenimiento('compras',5,array);
        return p;
    break;

    case 'proveedores':
        var array = {};

        array['sel'] = 'vid, vnombre, vcedula';
        array['tbl'] = 30;
        array['where'] = 'vnombre like \"%'+$("#nprv").val()+'%\"';

        p = mantenimiento('compras',4,array);
        return p;
    break;
    }
}