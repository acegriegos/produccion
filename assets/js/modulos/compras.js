var max = 1;
var id = 0;

$(document).ready(function(){

    $("#idprv").focus();

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

    $(".delf").hide()

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

// // //

$(document).on("keyup","#cantp",function(e){
    var id = $(this).attr('id').substr(5);
    var cant = parseFloat($(this).val());

    var code = e.which || e.keyCode;
    if (code == 13) {
        var precio = parseFloat($("#precp"/*+id*/).val().replace(/,/g,""));
        var cod = $("#codp"/*+id*/).val();

        var arr = {}

        arr['sel'] = 'vcodigo, vcantidad';
        arr['tbl'] = 43;
        arr['where'] = 'vcodigo = "'+ cod+'"';

        var cnt = mantenimiento('login',4,arr)[0][0];
        // '∞'
        if (cant > cnt[1]) {
            $("#divcnt"/*+id*/).addClass('has-danger');
            $("#cantp").addClass('has-danger form-control-danger');
            $("#err").show(300);
        }else if (cant <= cnt[1] || cnt[1] == '∞') {
            $("#divcnt"/*+id*/).removeClass('has-danger');
            $("#cantp").removeClass('has-danger form-control-danger');
            $("#err").hide(300);
            var result = (cant * precio);
            $("#totp"/*+id*/).val(result.formatMoney(2,'.',','));

            $("#totp").focus();
        }
    }
});

$(document).on("keyup","#totp",function(e){
    var code = e.which || e.keyCode;

    if (code == 13) {
        // alert(id)
        var codp = $("#codp").val();
        var descp = $("#descp").val();
        var cantp = parseFloat($("#cantp").val());
        var precp = $("#precp").val();
        var totp = $("#totp").val();
        
        var existe = 0;
        $("#detalleFac tr").each(function(){
            var vid = $(this).attr('id').substr(1);
            console.log(vid)
            if (codp == $("#codprod"+vid).text()) {
                existe = 1;
                $("#cant"+vid).html(parseFloat($("#cant"+vid).text().replace(/,/g,""))+cantp);
                $("#tota"+vid).html((parseFloat($("#tota"+vid).text().replace(/,/g,""))+parseFloat(totp.replace(/,/g,""))).formatMoney(2,'.',','));
            }
        });

        if (!existe) {
            id++;

            $("#detalleFac").append('<tr align="center" id="f'+id+'"><td style="width: 5%"><div class="checkbox"><label class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator" id="d'+id+'" class="delf" name="eliminarf" value="1" style="float: right;"></span></label></div></td><td style="width: 10%"><span id="codprod'+id+'">'+codp+'</span></td><td style="width: 27%"><span id="desc'+id+'">'+descp+'</span></td><td style="width: 10%"><span id="cant'+id+'">'+cantp+'</span><input type="number" id="canh'+id+'" class="form-control form-control-sm" value="'+cantp+'" visible="0" style="display:none; width: 70px"></td><td style="width: 14%"><span id="prec'+id+'">'+precp+'</span></td><td style="width: 14%"><span id="tota'+id+'">'+totp+'</span></td><td id="desctd'+id+'" align="left" style="width: 6%"><input type="text" id="h'+id+'" class="form-control form-control-sm desci" placeholder="0" style="width: 50px" disabled><input type="hidden" id="descHide'+id+'"></td><td style="font-size: 0.9em; width: 15%"><i class="fa fa-percent btn desc" id="i'+id+'" title="Descuento individual" data-toggle="modal" href="#modal-MODAL" style="font-size: 0.8em" estado="0"></i><i class="btn fa fa-edit fedit" id="edit'+id+'"></i><i class="fa fa-times btn del" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila"></i></td></tr>');
        }

    } //ENTER

        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0.00);
        $("#precp").val(0.00);
        $("#totp").val(0.00);
        $("#cantP").html(0);

        $("#codp").focus();
});

$(document).on("click",".fedit",function(){
    var id = $(this).attr('id').substr(4);
    var visible = $("#canh"+id).attr('visible');

    var cod = $("#codprod"+id).text();
    var arr = {}
    
    arr['sel'] = 'vcodigo, vcantidad';
    arr['tbl'] = 43;
    arr['where'] = 'vcodigo = "'+cod+'"';

    var cantinv = mantenimiento('login',4,arr)[0][0];

    if (visible == 0) {
        $("#cant"+id).show(100);
        $("#canh"+id).hide();
        $("#canh"+id).attr('visible',1);
    }else{
        $("#cant"+id).hide();
        $("#canh"+id).show(100);
        $("#canh"+id).attr('visible',0);

        $("#canh"+id).keyup(function(e){
            var code = e.which || e.keyCode;
            if (code == 13) {
                $("#cant"+id).text(parseFloat($("#canh"+id).val()));
                $("#cant"+id).show(100);
                $("#canh"+id).hide();

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
        var arr = {}
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

        arr['sel'] = 'vcodigo, vnombre, vprecio, vcantidad';
        arr['tbl'] = 43;
        arr['where'] = 'vcodigo like \"'+ kbrota +'%\"';

        var cod = mantenimiento('login',4,arr)[0][0];

            $("#codp").val(cod[0]);
            $("#descp").val(cod[1]);
            $("#precp").val(cod[2]);
            if (cod[3] == '?') {
                $("#cantP").html('∞');
            }else{
                $("#cantP"/*+id*/).html(cod[3]);
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
            // $("#cantp").val(1);
            $("#cantp").trigger(e);
            var f = jQuery.Event("keyup");
            f.which = 13;
            $("#totp").trigger(f);

            if(cantidad != 1) {
                $("#cantp").trigger(e);
                var g = jQuery.Event("keyup");
                g.which = 13;
                $("#totp").trigger(g);
            }
        }
    }
});

$(document).on("keyup","#descp",function(e){
    // var id = $(this).attr('id').substr(5);

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
    if (code == 13) {
        
        var arr = {}
        
        arr['sel'] = 'vnombre, vcedula';
        arr['tbl'] = 29;
        arr['where'] = 'vnombre like \"%'+$(this).val()+'%\"';

        var clie = mantenimiento('login',4,arr)[0][0];

        $("#ncli").val(clie[0]);
        $("#idcli").val(clie[1]);

        $("#codp"/*1"*/).focus();
    }
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
        $("#h"+id).removeAttr('disabled');
        $(this).attr('estado',1);
        $(this).css('color','#30DE61');
    }else if (estado == 1) {
        $("#h"+id).attr('disabled',true);
        $(this).attr('estado',0);
        $(this).css('color','#3E3E3E');
    }
});

$(document).on("click","#facturar",function(){
    $("#pcon").focus();
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
            addline(id)
        focus.select();
    }
});

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



function totalizar() {

    var cantidad = 1;
    var precio = 1;
    var costo = 1;
    var tot = 0;
    var marg = 0;


   $("#tot").html('0.00');
   $("#tmargen").html('0.00');
   $("#vtsubtotal").val(0);
   $("#vtmargen").val(0);
    
   $("#detallecompra tr").each(function(index){
        
        id = $(this).attr('id').substr(1);

        cantidad = isNaN($("#vcantidad"+id).val()) ? 1 : parseFloat($("#vcantidad"+id).val());
        costo = isNaN($("#vcosto"+id).val()) ? 1 : parseFloat($("#vcosto"+id).val());

        tot += cantidad*(costo/2); 

        if($("#totm"+id).css('color') == 'rgb(255, 0, 0)')
            marg += parseFloat($("#totm"+id).text().replace(/,/g,""))*-1;
        else
            marg += parseFloat($("#totm"+id).text().replace(/,/g,""));
          
   })

   $("#tmargen").html( (parseFloat($("#tmargen").html()) + parseFloat(marg)).formatMoney(2,'.',',') );
   $("#tot").html( (parseFloat($("#tot").html()) + parseFloat(tot)).formatMoney(2,'.',',') );

   $("#vtmargen").val( (parseFloat($("#vtmargen").val()) + parseFloat(marg)).toFixed(2) );
   $("#vtsubtotal").val( (parseFloat($("#vtsubtotal").val()) + parseFloat(tot)).toFixed(2) );
}

function detallar(id) {
    var cantidad = isNaN($("#vcantidad"+id).val()) ? 1 : parseFloat($("#vcantidad"+id).val());
    var precio = isNaN($("#vprecio"+id).val()) ? 1 : parseFloat($("#vprecio"+id).val());
    var costo = isNaN($("#vcosto"+id).val()) ? 1 : parseFloat($("#vcosto"+id).val());

    var margen = (precio-costo)/2;

    if (margen < 0) {
        $("#totm"+id).css("color","red");
        $("#margen"+id).css("color","red");
    }else if (margen == 0) {
        $("#totm"+id).css("color","black");
        $("#margen"+id).css("color","black");
    }else {
        $("#totm"+id).css("color","green");
        $("#margen"+id).css("color","green");
    }
    
    $("#margen"+id).text( Math.abs(margen).formatMoney(2,'.',',') );
    $("#totm"+id).text( Math.abs(margen*cantidad).formatMoney(2,'.',',') );
    $("#prcent"+id).text( (((precio/costo)-1)*100).toFixed(2) );

    totalizar();

}

function addline(id) {
    if( ($("#prod"+id).html() == '') || ($("#prod"+max).html() == '') ){
        $("#descr").focus();
        return false;
    }
    else{
        max += 1;
        $("#detallecompra").append('<tr id="f'+max+'"><td>  <span class="checkbox" id="prod'+max+'"></span><input type="hidden" id="vidproducto'+max+'" class="constante'+max+'" value=""><input type="hidden" id="vidfactura'+max+'" value="?"></td><td><input type="number" id="vcantidad'+max+'" idx="'+max+'" class="form-control xort" value="1" required="required" min="1"></td><td><input type="text" id="vcosto'+max+'" idx="'+max+'" class="form-control xort eder" value="0.00" required="required" data-mas="99999999.99"></td><td><input type="text" id="vprecio'+max+'" idx="'+max+'" class="form-control xort eder" value="0.00" required="required" data-mas="99999999.99"></td><td align="right"><div class="checkbox"> <span class="valores" id="margen'+max+'">0.00</span></div></td><td align="right"><div class="checkbox"> <span class="valores" id="totm'+max+'">0.00</span></div><td align="left"><div class="checkbox"> <input type="checkbox" class="delf" value="'+max+'" name="eliminarf" style="float: right;display: none;"> <span id="prcent'+max+'" value="0">0.00</span>  </div></td></tr>');
    }
}

function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        case 'compra':
            if (vmodulo['tip'] == '') {
                err = validarCompra();
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

function validarCompra() {

    if ($("#vfecha_inclucion").val() == '') {
        $("#vfecha_inclucion").focus();
        return "Fecha de Incluión Requerida";
    }

    if ($("#vidproveedor").val() == 0) {
        $("#nprv").focus()
        return "Proveedor Requerido";
    }

    if ($("#vtsubtotal").val() == '') {
        $("#descr").focus()
        return "No se Han Ingresado Productos";
    }

    if ($("#vcomentario").val() == '') {
        $("#vcomentario").focus();
        return "Comentario Requerido";
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