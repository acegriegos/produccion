$(document).keydown(function(e){
   if(e.altKey &&  e.which == 67){
        e.preventDefault();
        $("#chg_tipo").click().change();
   }
});

$(function(){

    $('select').material_select();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    $("#codp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur();
        }
    });

    $("#codp").blur(function(){
        cargarProducto($(this).val(),$(this))
    });

    $("#descp").blur(function(){
        cargarProducto($(this).val(),$(this))
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

    $("#xidinventario").change(function(){
        var p = arr('login',4,'cantidad',97,'idinventario ='+$('option:selected',this).val()+' and idproducto = '+$("#valores").data('elemento')['idp']);
        
        $("#valores").data('elemento')['hbod'] = $("#xidbodega option:selected").val();
        $("#valores").data('elemento')['hinv'] = $('option:selected',this).val();
        $("#cantI").html(p[0]);
        $("#bname-inv").html(p[0]);
    });

    $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'',vextrapagos : 0, vdivisa : 0, idline:0,  saldo : 0, notific : 0});

    $(".modal").modal();

    $("#monedas").change(function(){
        cargarMoneda($('option:selected',this).val());
    });

    cargarMoneda(0);

})//READY

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
        $("#fd"+id).data('triforce')['vtotal'] = total;
        $("#tota"+id).html(total.formatMoney(2,'.',','))
        
        totalizar();

    }
});

$(document).on("change","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#fd"+id).data('triforce')['vtotal'] = total;
    $("#tota"+id).html(total.formatMoney(2,'.',','))
    
    totalizar();
});

$(document).on("blur","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#fd"+id).data('triforce')['vtotal'] = total;
    $("#tota"+id).html(total.formatMoney(2,'.',','))
    
    totalizar();
    $(this).hide();
    $("#cant"+id).text(valor);
    $("#cant"+id).show();
});

// $(document).on("click",".fedit",function(){
//     var id = $(this).attr('id').substr(4);
//     var tipo = getParameterByName('tf');
//    $("#titmod").html($("#desc"+id).html());
//    $("#hdnprd").val(id);
//    if (tipo == 1) {
//         $("#ecantidad").val($("#fd"+id).data('triforce')['vcantidad']);
//         $("#edescuento").val($("#fd"+id).data('triforce')['vdesc']);
//         $("#eunitario").val($("#fd"+id).data('triforce')['vprecio']);
//         $(".eunit").addClass('hide');
//         $(".eimp").addClass('hide');
//    }else if (tipo == 2)
//         $(".eimp").addClass('hide');
//    else
//         console.log('otros');

//     Materialize.updateTextFields();
   
// });

// $(document).on("click","#editprod",function(){
//     //aqui
//     var id = $("#hdnprd").val();
//     var cant,desc,prec = 0;
//     cant = $("#ecantidad").val();
//     desc = $("#edescuento").val();
//     prec = $("#eunitario").val();

//     console.log("cantidad: "+cant+"\ndescuento: "+desc+"\nprecio: "+prec)
//     $("#fd"+id).data('triforce')['vcantidad'] = cant;
//     $("#fd"+id).data('triforce')['vdesc'] = desc;
//     $("#fd"+id).data('triforce')['vprecio'] = prec;
//     totalizar();
//     $("#cant"+id).text(cant);
//     $("#prec"+id).text(prec);
//     $("#vdesc"+id).text(desc+'%')

// });

$(document).on("click","#facturar",function(){

    if ( $(".zelda").data('triforce')['vidtipo'] == 1 && $("#vidtipopago").is(":visible") ) {

    $("#modal-tpagos").modal('open');
    var tpago = $("#vidtipopago option:selected").val();
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
            $("#factreal").click();
            return false;
        break;
    }
    
    var span = $("#tot").text();
    $(".totalfact").html( span );
    
    }else{
        $("#factreal").click();
    }
});


$("#pcon").blur(function(){
        calcVuelto();
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


$("#pcon").keyup(function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        calcVuelto();       
    }
});



$(document).on("click","input[name=modo]",function(){
    var id = $(this).attr('id').substr(4);
    $("#modselected").val(id);
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

$(document).on("keyup","#vdescuento",function(){
    totalizar();
});

$(document).on("keyup","#vflete",function(){
    totalizar();
});

$(document).on("keyup","#vajuste",function(){
    totalizar();
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
    
    $('<tr id="fd'+id+'" class="ciclos"><td style="padding: 0.2%"></td><td class="center" id="codprod'+id+'" colspan="2"> <i class="mdi mdi-subdirectory-arrow-right" style="float:left;"></i> <input type="text" placeholder="RUBRO" style="width:85%;margin: 0px;" id="rubro'+id+'" class="rubro"/> </td> <td class="center divisa" id="prec'+id+'"> <input type="text" value="0" class="eder precd" id="precd'+id+'" style="margin: 0px;" /> </td> <td id="unitprod'+id+'"> <select id="unid'+id+'" class="unid" readonly style="margin: 0px;"><option>UN</option></select> </td> <td class="center"> <div id="divcnt" class="form-group"><input type="text" value="1" class="eder cantd" id="cantd'+id+'" style="margin: 0px;" /></div></td><td class="center totp divisa" id="tota'+id+'">0</td> <td id="desctd'+id+'" align="left" > <input type="text" id="vdesc'+id+'" value="0" placeholder="0" class="hide" style="width: 50px" disabled> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></td> </tr>').insertAfter($(this).closest('tr'));

    $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:vidprod, vcantidad:0, vprecio:0, vdesc:0, vtotal:0, vidinventario:0,vidodt : 0,vimv:0,vcomodin:'',vidunidad:0,vidimpuestos:'',viddescuentos:''});
  
    $("#rubro"+id).focus();
    $("#unid"+id).material_select();
    $("#fdetallefacturas .select-wrapper input.select-dropdown").css('margin','0px');
});


function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs,hinv,defi,uni,comodin,desgloce) {
    $("#valores").removeData('elemento');

    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec);

    $("#fdetallefacturas tr").each(function(){
        var vid = $(this).attr('id').substr(2);

        if (idprod == $(this).data('triforce')['videntrada'] && hinv == $(this).data('triforce')['vidinventario']) {
            existe = 1;
            if ( parseFloat($("#cant"+vid).text())+cant > cntinv && param.toString().match(new RegExp(/[16]/i))) {
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
        var id = parseInt($(".zelda").data('triforce')['idline'])+1;
        var suni = getDatos('simbolo',107,'id = '+uni,0,0,0)[0][0];
        $(".zelda").data('triforce')['idline'] = id;
        
        var codedg = '';
        if (desgloce == 1)
            codedg = '<span class="pbtn addesgloce" style="font-size:10px">[<i class="mdi mdi-plus"></i>]</span>';

        switch(parseInt(param)){
            case 1:
            case 4:
            case 5:
            case 6:
                $("#fdetallefacturas").append('<tr id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" class="ciclos"><td style="padding: 0.2%"><input type="checkbox" class="delf" name="eliminarf" id="d'+id+'"/><label for="d'+id+'"></label></td><td class="center" id="codprod'+id+'">'+codedg+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td><td class="center divisa" id="prec'+id+'">'+precio.formatMoney(2,'.',',')+'</td> <td id="unitprod'+id+'">'+suni+'</td> <td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;width: 70px"></div></td><td class="center totp divisa" id="tota'+id+'">'+tot+'</td> <td id="desctd'+id+'" align="left" > <input type="text" id="vdesc'+id+'" value="'+dcs+'" placeholder="0" class="hide" style="width: 50px" disabled> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></td> </tr>');
                    break;
            case 2:
                $("#fdetallefacturas").append('<tr id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" class="ciclos"><td style="padding: 0.2%"><input type="checkbox" class="delf" name="eliminarf" id="d'+id+'"/><label for="d'+id+'"></label></td><td class="center" id="codprod'+id+'">'+codedg+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td>  <td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;width: 70px"></div></td> <td class="center divisa" id="prec'+id+'">'+precio.formatMoney(2,'.',',')+'</td> <td id="unitprod'+id+'">'+suni+'</td> <td id="vdesc'+id+'" class="center"> '+dcs+'% </td> <td class="center totp divisa" id="tota'+id+'">'+tot+'</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></td> </tr>');
                break;
            case 3:
                $("#fdetallefacturas").append('<tr id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" class="ciclos"><td style="padding: 0.2%"><input type="checkbox" class="delf" name="eliminarf" id="d'+id+'"/><label for="d'+id+'"></label></td><td class="center" id="codprod'+id+'">'+codedg+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td>  <td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;"></div></td> <td class="center divisa hide" id="prec'+id+'">'+precio.formatMoney(2,'.',',')+'</td> <td id="unitprod'+id+'">KG</td> <td id="vdesc'+id+'" class="center hide"> '+dcs+'% </td> <td class="center totp divisa hide" id="tota'+id+'">'+tot+'</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%;font-size: 12px;"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%;font-size: 12px;"></a></td> </tr>');
                break;
        }

        $("#vdesc"+id).data('valor',dcs);
        $("#vdesc"+id).data('max',mdcs);

        $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:idprod, vcantidad:cant, vprecio:precio, vdesc:dcs, vtotal:0, vidinventario:hinv,vidodt : 0,vimv:0,vcomodin:comodin,vidunidad:0,vidimpuestos:'',viddescuentos:''});
       
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

        $("#codp").focus();
    }
    

}

function totalizar(){
    
    var totd = 0;
    var total = 0;
    var impuesto = 0;
    var idesc = 0;
    var tdesc = 0;
    var tmpdesc = 0;
    var exento = 0;
    var flete = isNaN($("#vflete").val()) ? 0 : parseFloat($("#vflete").val()) > 0 ? parseFloat($("#vflete").val()) : 0;
    var desc = $("#vdescuentop").data('valor');
    var ajuste = $("#vajuste").val();
    var actajuste = $("#btnAjuste").attr('accion') == 1 ? '' : '-';

    flete = isNaN(parseFloat(flete)) || parseFloat(flete) == '' ? 0 : parseFloat(flete);
    desc = isNaN(parseFloat(desc)) || parseFloat(desc) == '' ? 0 : parseFloat(desc);
    ajuste = isNaN(parseFloat(ajuste)) || parseFloat(ajuste) == '' ? 0 : parseFloat(ajuste);

    $("[id^=imv_").html('0.00')

    $(".totp").each(function(){
        var vidlinea = $(this).prop('id').substr(4);
        var vid = $("#fd"+vidlinea).data('triforce')['videntrada'];
        var cantidad = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        var precio = parseFloat($("#fd"+vidlinea).data('triforce')['vprecio']);
        var decindv = parseFloat($("#vdesc"+vidlinea).data('valor'));
        var descmax = parseFloat($("#vdesc"+vidlinea).data('max'));
        var desct = param.toString().match(new RegExp(/[2]/i)) ? decindv : decindv+desc > descmax ? descmax : decindv+desc;
        
        $("#fd"+vidlinea).data('triforce')['vdesc'] = desct;
        $("#vdesc"+vidlinea).val(desct+"%");
        precio = precio * cantidad
        totd += precio;
        tmpdesc = precio * (1-(desct/100));
        idesc += precio * (desct/100);
        tdesc += tmpdesc;
        
        $("#fd"+vidlinea).data('triforce')['vtotal'] = tmpdesc;
        $("#tota"+vidlinea).html(tmpdesc.formatMoney(2,'.',','))
        
        $("[id^=imv_").each(function(){
            var incl = $(this).data('incl');
            var idimv = $(this).prop('id').substr(4);

            incl = incl.indexOf('*') === -1 ? incl.indexOf(vid+",") : -1;
            
            if(incl !== -1){
                var im0 = parseFloat($(this).data('imv'));
                var im1 = $(this).data('imv'+vid) == undefined ? 100 : parseFloat($(this).data('imv'+vid)) ;
                var rimv = im0 <= im1 ? im0 : im1;

                if(rimv == 0)
                    exento += tmpdesc;
                else{
                    var dimv = param.toString().match(new RegExp(/[2]/i)) ? ((tmpdesc*(rimv/100))/((rimv/100)+1)) : tmpdesc*(rimv/100);
                    impuesto += dimv;
                    $("#fd"+vidlinea).data('triforce')['vimv'] = dimv;

                    var tmimv = $(this).attr('tmp_imv') == undefined ? dimv :parseFloat($(this).attr('tmp_imv'))+dimv;
                    $(this).attr('tmp_imv',tmimv)
                    $(this).html(parseFloat($(this).attr('tmp_imv')).formatMoney(2,'.',','))
                }
            }
        });
    });

    $("[id^=imv_]").removeAttr('tmp_imv');

    if (param.toString().match(new RegExp(/[2]/i))) {
        totd = tdesc - impuesto;
        total = tdesc;
    }else{
        total = tdesc + impuesto;
    }
    
    if (flete != 0) {
        $("#vflete").html(flete.formatMoney(2,'.',','));
        total = total + flete;
    }
    
    if (ajuste != 0) {
        if (actajuste != '') {
            ajuste = parseFloat(actajuste*ajuste);
            total = total + ajuste;
        }else{
            total = total + ajuste;
        }
    }
    
    $("#subtot").html(totd.formatMoney(2,'.',','));
    $(".zelda").data('triforce')['vsubtotal'] = totd.toFixed(2);

    $("#descuento_v").html(idesc.formatMoney(2,'.',','));
    $("#flete").html(flete.formatMoney(2,'.',','));
    $(".zelda").data('triforce')['vdescuento'] = idesc.toFixed(2);
    $(".zelda").data('triforce')['vimv'] = impuesto.toFixed(2);
    $(".zelda").data('triforce')['vexento'] = exento.toFixed(2);

    $("#tot").html(total.formatMoney(2,'.',','));
    
    
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
        case 'detallefactura':
            if (vmodulo['tip'] == '') {
                err = validarDetalleFactura();
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

function validarDetalleFactura(){
    var ciclos = $(".ciclos");
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
    }
    return false;
}

function validarFactura() {

    if ($(".ciclos").length == 0) {
        $("#codp").focus()
        return "No se Han Ingresado Productos";
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
        default:
            if ($(".zelda").data('triforce')['vidcliente'] == 0)
            $(".zelda").data('triforce')['vcomodin'] = $("#ncli").val();
            break;
    }


    if($(".zelda").data('triforce')['vidtipo'] == 2){
        $("#vidtipopago").val(0)
        $("#vidtipopago").material_select('update');

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

    if($("#codp").val() == '' && $("#descp").val() == '')
        return false;
            
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

    var cod = arr('login',4,'',43,'"'+ kbrota +'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+$(".zelda").data('triforce')['vidtipoventa'],0,0,0);

    if (cod[0][0] != undefined) {
        var fimv = cod[0];

        cod = cod[0][0];
        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : cod[5],hdescm : cod[12], hinv : cod[13], hbod:cod[14], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17]})
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        $("#precp").val(parseFloat(cod[3]).formatMoney(2,'.',','));
        $("#totp").val((parseFloat(cod[3])*cantidad).formatMoney(2,'.',','))
        
        if (cod[4] == '?') {
            $("#cantI").html('∞');
        }else{
            $("#cantI").html(cod[4]);
            $("#bname-inv").html(cod[4]);
        }

        if (cod[6] != 0) {

            for (var i = 0; i < fimv.length; i++) {

                var exo = fimv[i][8]*(1-(fimv[i][9]/100));

                if($("#imp_"+fimv[i][6]).length == 0){
                    
                    if(fimv[i][11] != 0) var clip = 'vclipd="'+fimv[0][0]+'"';

                    var sm = $(".moneda").first().data("triforce")['simbolo'];

                    $("#sh_imp").append('<tr id="imp_'+fimv[i][6]+'" '+clip+'><td>'+fimv[i][10]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span class="moneda"><b>'+sm+'</b></span><span id="imv_'+fimv[i][6]+'" type="html" class="divisa">0.00</span></td></tr>');
                    $("#imv_"+fimv[i][6]).data('imv'+fimv[i][0],exo);
                    $("#imv_"+fimv[i][6]).data('incl',cod[0]+",");
                }else{
                    var incl = $("#imv_"+fimv[i][6]).data('incl');
                    $("#imv_"+fimv[i][6]).data('incl',incl+cod[0]+",");
                    $("#imv_"+fimv[i][6]).data('imv'+fimv[i][0],exo);
                }
                
            }
        }

        var modselec = $("input[name='modselected']:checked").val();
        if (modselec == 1) {
            $("#cantp").val(cantidad).focus().select();
        }else{
            var e = jQuery.Event("keyup");
            e.which = 13;
            $("#cantp").val(cantidad);
            $("#cantp").trigger(e);
        }
        // cod[15] = unidad
        var uni = getDatos('id,concat(nombre,"(",simbolo,")")',107,'id > 0 ',0,0,0)
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
                elemento.select()
                break;
        }
        
    }
}

function endDetail(vid) {
    window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked'));
    arr('login',7,'1',195,'','null,'+vid+',1,'+$("#p_v").is(':checked'),0,0,0);
    setTimeout(function(){location.reload();},1000);
    return false;
}

function verfacturas() {
    window.open("facturacion?accion=8&tf="+param);
}

function searchClient(vvariable,visprv){
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'');
    
    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0];
        
        $(".zelda").data('triforce')['vidcliente'] = vclie[0];

        $("#ncli").val(vclie[1]+' '+vclie[2]);

        if (vclie[3] > 0){ 
            $("#chg_tipo").removeAttr('disabled');
        }
        else{
            // $("#chg_tipo").val(2);
            // $("#chg_tipo").click();
            $("#chg_tipo").attr('disabled','true')
        }

        if (param == 2){
            $("#chg_tipo").removeAttr('disabled')
        }

        if ($("#vidtipo").val() == 2) {
            $("#vplazo").val(vclie[3]);
        }else{
            $("#vplazo").val(0);
        }

        $("#msaldo").html(parseFloat(vclie[11]).formatMoney(2,'.',','));
        var porcen = vclie[12] == 0 ? 0 : (parseFloat(vclie[11])*100)/parseFloat(vclie[12]);

        if (porcen <= 75)
            $("#msaldo").addClass('green-text');
        else if (porcen > 75 && porcen < 100)
            $("#msaldo").addClass('yellow-text');
        else if (porcen >= 100)
            $("#msaldo").addClass('red-text');
        
        $("#vdescuentop").val(vclie[4]);
        $("#vdescuentop").data('valor',vclie[4])
        
    }else{
        $(".zelda").data('triforce')['vidcliente'] = 0;
        $("#vdescuentop").val(0);
        $("#vdescuentop").data('valor',0);
        $("#ced").val('');
        $("#vplazo").val(0);
        if($("#chg_tipo").val() == 2)
            $("#chg_tipo").click();
        $("#chg_tipo").attr('disabled','disabled')
    }

    // cambio cliente
    var producto = $(".ciclos");
    producto.each(function() {
        var idlinea = $(this).attr('id').substr(2);
        var prod = arr('login',4,'',43,idlinea+',@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+getParameterByName('tf'),0,0,0)[0][0];
        $("#prec"+idlinea).text(prod[3]);
        $("#fd"+idlinea).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:prod[0], vcantidad:$("#fd"+idlinea).data('triforce')['vcantidad'], vprecio:prod[3], vdesc:0, vtotal:0, vidinventario:prod[13],vidodt : 0,vimv:0,vcomodin:''});
        $("#vdesc"+prod[0]).data('valor',prod[5]);
        $("#vdesc"+prod[0]).data('max',prod[12]);
        totalizar();
        // quede aqui
        // $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:idprod, vcantidad:cant, vprecio:precio, vdesc:dcs, vtotal:0, vidinventario:hinv,vidodt : 0,vimv:0,vcomodin:''});
        
    });
    // fin cambio cliente
    
    $("[vclip]").remove();
    var dotot = $("#sh_imp [id^=imp_]").length;

    for (var i = 0; i < clie[0].length; i++) {
        if($("#imp_"+clie[0][i][5]).length == 0){
            var exo = clie[0][i][7]*(1-(clie[0][i][8]/100));
            var clip = incl = '';
            if(clie[0][i][10] != 0) {incl = "";clip = 'vclip="'+clie[0][0][0]+'"';}

            var sm = $(".moneda").first().data("triforce")['simbolo'];

            $("#sh_imp").append('<tr id="imp_'+clie[0][i][5]+'" '+clip+'><td>'+clie[0][i][9]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span class="moneda"><b>'+sm+'</b></span><span id="imv_'+clie[0][i][5]+'" type="html" class="divisa">0.00</span></td></tr>');
            $("#imv_"+clie[0][i][5]).data('imv',exo);
            $("#imv_"+clie[0][i][5]).data('incl',incl);
        }
    }

    if (dotot) totalizar();
    

    $("#codp").focus();
    Materialize.updateTextFields()
    
}

function retrasarFocus(vinput){
    setTimeout(function(){
        $("#"+vinput).focus().select();
    },100);
}

function calcVuelto(){
    var paga = parseFloat( $("#pcon").val().replace(/,/g,'') );
    var totalfact = parseFloat( $(".totalfact").text().replace(/,/g,'') );
    var cambio = (paga - totalfact);
   
   $("#pcam").text(cambio.formatMoney(2,'.',','));

   if (cambio > 0) {
        $("#pcam").css('color','#2196F3');
    }else{
        $("#pcam").css('color','#F3213F');
    }
}