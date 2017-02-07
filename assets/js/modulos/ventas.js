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

    $("#ncli").focus();

    $('select').material_select();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    $(".sclie").blur(function(){
        searchClient($(this).val(),0);
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
        
        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
        
            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2)) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
            });

            $("#ncli").siblings($(".autocomplete-content")).css('width','25%');
        }
    });

    $(".sclie").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $(this).blur()
        }
    });

    $("#descp").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);
       
        if (/[a-zA-Z0-9-_. ]/i.test(charStr)) {
            $(".autocomplete-content").remove();
            
            $("#descp").autocomplete({
                limit: 20,
                data: arr('login',4,'',6,'"'+$("#descp").val()+'",1',0,0,0,1)
            })

             $("#descp").siblings($(".autocomplete-content")).css('width','50%');
        }
    });

    $("#codp").keyup(function(e){
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

            var cod = arr('login',4,'',43,'"'+ kbrota +'"','',0,'');
            
            if (cod[0][0] != undefined) {
                var fimv = cod[0];
                cod = cod[0][0];

                $("#valores").data("elemento",{idp : cod[0],hcodp : cod[5],hprec : cod[3],hdesc : cod[6],hdescm : cod[13]})

                $("#codp").val(cod[1]);
                $("#descp").val(cod[2]);
                $("#precp").val(cod[3]);

                if (cod[4] == '?') {
                    $("#cantI").html('∞');
                }else{
                    $("#cantI").html(cod[4]);
                }

                for (var i = 0; i < fimv.length; i++) {

                    var exo = fimv[i][9]*(1-(fimv[i][10]/100));

                    if($("#imp_"+fimv[i][7]).length == 0){
                        
                        if(fimv[i][12] != 0) clip = 'vclipd="'+fimv[0][0]+'"';

                        $("#sh_imp").append('<tr id="imp_'+fimv[i][7]+'" '+clip+'><td>'+fimv[i][11]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span><b>¢</b></span><span id="imv_'+fimv[i][7]+'" type="html">0.00</span></td></tr>');
                        $("#imv_"+fimv[i][7]).data('imv'+fimv[i][0],exo);
                        $("#imv_"+fimv[i][7]).data('incl',fimv[i][0]+",");
                    }else{
                        var incl = $("#imv_"+fimv[i][7]).data('incl');
                        $("#imv_"+fimv[i][7]).data('incl',incl+fimv[i][0]+",");
                        $("#imv_"+fimv[i][7]).data('imv'+fimv[i][0],exo);
                    }
                    
                }

                var modselec = $("input[name='modselected']:checked").val();
                if (modselec == 1) {
                    
                    $("#cantp").val(cantidad);
                    $("#cantp").focus();
                    $("#cantp").select();
                }else{
                    
                    var e = jQuery.Event("keyup");
                    e.which = 13;
                    $("#cantp").val(cantidad);
                    $("#cantp").trigger(e);
                }

                Materialize.updateTextFields()
            }else{

                Materialize.toast('Producto no Existente',4000,'red');
                $(this).select()
            }
        }
    });

    $("#descp").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            var cod = arr('login',4,'',43,'"'+ $(this).val() +'"','',0,'')[0][0];

            if (cod != undefined) {
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
            }
            
            $("#cantp").val(1);
            $("#cantp").focus();
            $("#cantp").select();
            Materialize.updateTextFields()
        }
    });
    
    $("#p_v").click(function(){
        if ($(this).is(":checked"))
            $(this).val(1);
        else
            $(this).val(0);

    });
    $("#zelda").data('triforce',{vidtipo:1, vidtipoventa:1, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', idline:0});
})//READY

$(document).on("click","#chg_tipo",function(){
    
    var value = parseInt($(this).val())

    if (value == 2) {
        $(".cre").hide();
        $(".con").show();
        $("#vplazo").val(0);
        $(this).val(1)
        $("#zelda").data('triforce')['vidtipo'] = 1
    }else{
        $(".con").hide();
        $(".cre").show();
        if ($("#zelda").data('triforce')['vidcliente'] != 0) {
            var plazo = arr('login',4,'plazo',2,'id = '+$("#zelda").data('triforce')['vidcliente'],'',0,'')[0][0][0];
            $("#vplazo").val(plazo);
        }
        $("#zelda").data('triforce')['vidtipo'] = 2
        $(this).val(2)
    }
});

$(document).on("keyup","#cantp",function(e){
    var cant = parseFloat($(this).val()),
        prec = $("#valores").data('elemento')['hprec'];
        precio = parseFloat($("#valores").data('elemento')['hprec'].replace(/,/g,"")),
        total = precio * cant;
        
    $("#precp").val(total.formatMoney(2,'.',','));
    var totp = $("#precp").val();
    var code = e.which || e.keyCode;
    
    if (code == 13) {
        
        if (cant > 0) {
            var cod = $("#codp").val();
            var idprd = $("#valores").data('elemento')['hcodp'];
            var dcs = $("#valores").data('elemento')['hdesc'];
            var mdcs = $("#valores").data('elemento')['hdescm'];
            var desc = $("#descp").val();
            var cnt = arr('login',4,'',43,'"'+ cod+'"','',0,'')[0][0][4];
            
            if (cant > cnt) {
               Materialize.toast('Cantidad insuficiente en Inventario',4000,'red');
            }else if (cant <= cnt || cnt == '∞') {
                addline(idprd,cod,desc,cant,prec,totp,cnt,dcs,mdcs);
            }
        }else{
            Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
        }
    }
  
});

$(document).on("change","#cantp",function(){
    var cant = parseFloat($(this).val());
    var prec = $("#valores").data('elemento')['hprec'];
    var precio = parseFloat($("#valores").data('elemento')['hprec'].replace(/,/g,""));
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
        
        totalizar()

    }
});

$(document).on("change","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#htotp"+id).val(total);
    $("#tota"+id).text(total.formatMoney(2,'.',','))
    
    totalizar();
});

$(document).on("blur","[id^=vcantidad]",function(){
    var id = $(this).attr('id').substr(9);
    var valor = $(this).val();
    var precio = parseFloat($("#vprecio"+id).val());
    var total = precio * valor;
    $("#htotp"+id).val(total);
    $("#tota"+id).text(total.formatMoney(2,'.',','))
    
    totalizar();
    $(this).hide();
    $("#cant"+id).text(valor);
    $("#cant"+id).show();
});

$(document).on("click",".fedit",function(){
    var id = $(this).attr('id').substr(4);
    var cod = $("#codprod"+id).text();
    var visible = $(this).attr('visible');
    var cantinv = arr('login',4,'',43,'"'+cod+'"','',0,'')[0][0][4];
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
        totalizar()
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
    totalizar();
});

$(document).on("keyup","#vflete",function(){
    totalizar();
});

$(document).on("keyup","#vajuste",function(){
    totalizar();
});

$(document).on("click","#del1",function(){
    // pruebas
});

$(document).on("click",".delf",function(){
    var id = $(this).attr('id').substr(3);
    $("#fd"+id).remove();
    totalizar();

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
    totalizar();
});


function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs) {
    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec.replace(/,/g,""));

    $("#detallefactura tr").each(function(){
        var vid = $(this).attr('id').substr(2);
        if (cod == $("#codprod"+vid).text()) {
            existe = 1;
            if ( parseFloat($("#cant"+vid).text())+cant > cntinv ) {
                //EXCEDE EL NUMERO EN INVENTARIO
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
            }
            
        }
    });

    if (!existe) {
        var id = parseInt($("#zelda").data('triforce')['idline'])+1;
        $("#zelda").data('triforce')['idline'] = id;

        $("#detallefactura").append('<tr align="center" id="fd'+id+'" style="border-bottom:1px solid #e2e2e2;"><td style="width: 5%" class="ciclos"><div class="checkbox"><label class="c-input c-checkbox"><input type="checkbox"><span class="c-indicator" id="d'+id+'" class="delf" name="eliminarf" value="1" style="float: right;"></span></label></div></td><td style="width: 10%"><span id="codprod'+id+'">'+cod+'</span><input type="hidden" id="vidfactura'+id+'" value="?"><input type="hidden" id="vvalor'+id+'"><input type="hidden" id="vimv'+id+'"></td><td style="width: 27%"><span id="desc'+id+'">'+desc+'</span></td><td style="width: 10%"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" class="form-control-sm" value="'+cant+'" min="1" style=" display:none;width: 70px"><input type="hidden" id="cnth'+id+'" value=""><div id="errcnt" class="form-control-feedback" align="center" style="display:none"><small>Cantidad insuficiente</small></div></div></td><td style="width: 14%"><span id="prec'+id+'">'+prec+'</span><input type="hidden" id="vprecio'+id+'" value="'+precio+'"></td><td style="width: 14%"><span id="tota'+id+'" class="totp">'+tot+'</span><input type="hidden" id="htotp'+id+'" value="'+tot+'"></td><td id="desctd'+id+'" align="left" style="width: 6%"><input type="text" id="vdesc'+id+'" class="form-control-sm desci" value="" placeholder="0" style="width: 50px" disabled></td><td style="font-size: 0.9em; width: 15%;"><a href="#" id="i'+id+'" title="Descuento individual" data-toggle="modal" href="#modal-MODAL" style="font-size: 0.8em;display:none" estado="0" class="btn desc faccion"><i class="fa fa-percent"></i></a><a href="#" id="edit'+id+'" visible="0" class="btn fedit faccion"><i class="fa fa-edit"></i></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="btn delf faccion"><i class="fa fa-times"></i></a></td></tr>');

        $("#vvalor"+id).data('valor',idprod);
        $("#vdesc"+id).data('valor',dcs);
        $("#vdesc"+id).data('max',mdcs);
       
    }
    totalizar();
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
    
    totalizar();
}

function totalizar() {
    
    var totd = 0;
    var total = 0;
    var impuesto = 0;
    var idesc = 0;
    var tdesc = 0;
    var tmpdesc = 0;
    var exento = 0;
    var flete = $("#vflete").val();
    var desc = $("#vdescuentop").data('valor');
    var ajuste = $("#vajuste").val();
    var actajuste = $("#btnAjuste").attr('accion') == 1 ? '' : '-';

    flete = isNaN(parseFloat(flete)) || parseFloat(flete) == '' ? 0 : parseFloat(flete);
    desc = isNaN(parseFloat(desc)) || parseFloat(desc) == '' ? 0 : parseFloat(desc);
    ajuste = isNaN(parseFloat(ajuste)) || parseFloat(ajuste) == '' ? 0 : parseFloat(ajuste);

    $(".totp").each(function(){
        var vidlinea = $(this).prop('id').substr(4);
        var vid = $("#vvalor"+vidlinea).data('valor');
        var precio = parseFloat($(this).text().replace(/,/g,""));
        var decindv = parseFloat($("#vdesc"+vidlinea).data('valor'));
        var descmax = parseFloat($("#vdesc"+vidlinea).data('max'));
        var desct = decindv+desc > descmax ? descmax : decindv+desc;
        $("#vdesc"+vidlinea).val(desct+"%");
        
        totd += precio;
        tmpdesc = precio * (1-(desct/100));
        idesc += precio * (desct/100);
        tdesc += tmpdesc; 

        $("[id^=imv_").each(function(){

            var incl = $(this).data('incl');
            var idimv = $(this).prop('id').substr(4);
            incl = incl.indexOf('*') === -1 ? incl.indexOf(vid+",") : 0

            if(incl !== -1){
                var im0 = parseFloat($(this).data('imv'));
                var im1 = $(this).data('imv'+vid) == undefined ? 100 : parseFloat($(this).data('imv'+vid)) ;
                var rimv = im0 <= im1 ? im0 : im1;
                console.log(rimv+":"+$(this).data('incl'))
                if(rimv == 0)
                    exento += tmpdesc;
                else{
                    var dimv = tmpdesc*(rimv/100);
                    impuesto += dimv;
                    var tmimv = $(this).attr('tmp_imv') == undefined ? dimv :parseFloat($(this).attr('tmp_imv'))+dimv;
                    $(this).attr('tmp_imv',tmimv)
                    $(this).html(parseFloat($(this).attr('tmp_imv')).formatMoney(2,'.',','))
                }
            }
        });
    });
    $("[id^=imv_]").removeAttr('tmp_imv');

    total = tdesc + impuesto;

    if (flete != 0) {
        $("#vflete").html(flete.formatMoney(2,'.',','));
        total = total + flete;
    }

    if (ajuste != 0) {
        ajuste = parseFloat(actajuste*ajuste);
        total += ajuste;
    }
    
    $("#subtot").html(totd.formatMoney(2,'.',','));
    $("#zelda").data('triforce')['vsubtotal'] = totd.toFixed(2);

    $("#descuento_v").html(idesc.formatMoney(2,'.',','));
    $("#zelda").data('triforce')['vdescuento'] = idesc.toFixed(2);
    $("#zelda").data('triforce')['vimv'] = impuesto.toFixed(2);
    $("#zelda").data('triforce')['vexento'] = exento.toFixed(2);

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
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    console.log(salida);
    return salida;

}

function validarFactura() {


    // if ($("#ncli").val() == '') {
    //     $("#ncli").focus()
    //     return "Cliente Requerido";
    // }

    if ($("#subtot").text() == '0.00') {
        $("#codp").focus()
        return "No se Han Ingresado Productos";
    }

    if ($("#vcomentario").val() == '') {
        $("#vcomentario").val('');
    }

    if ($("#zelda").data('triforce')['vidcliente'] == 0)
        $("#zelda").data('triforce')['vcomodin'] = $("#ncli").val();
    
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

function searchClient(vvariable,visprv){
    
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'');
    
    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0]
        $("#zelda").data('triforce')['vidcliente'] = vclie[0];
        $("#ncli").val(vclie[1]);
        $("#ced").val(vclie[2]);

        if (vclie[3] > 0){ 
            $("#chg_tipo").removeAttr('disabled')
        }
        else{
            $("#chg_tipo").val(2);
            $("#chg_tipo").click();
            $("#chg_tipo").attr('disabled','disabled')
        }

        if ($("#vidtipo").val() == 2) {
            $("#vplazo").val(vclie[3]);
        }else{
            $("#vplazo").val(0);
        }
        
        $("#vdescuentop").val(vclie[4]);
        $("#vdescuentop").data('valor',vclie[4])
        
    }else{
        $("#zelda").data('triforce')['vidcliente'] = 0;
        $("#vdescuentop").val(0);
        $("#vdescuentop").data('valor',0);
        $("#ced").val('');
        $("#vplazo").val(0);
        if($("#chg_tipo").val() == 2)
            $("#chg_tipo").click();
        $("#chg_tipo").attr('disabled','disabled')
    }
    
    $("[vclip]").remove();
    var dotot = $("#sh_imp [id^=imp_]").length;

    for (var i = 0; i < clie[0].length; i++) {
        if($("#imp_"+clie[0][i][5]).length == 0){
            var exo = clie[0][i][7]*(1-(clie[0][i][8]/100));
            var clip = incl = '';
            if(clie[0][i][10] != 0) {incl = "*";clip = 'vclip="'+clie[0][0][0]+'"';}
            
            $("#sh_imp").append('<tr id="imp_'+clie[0][i][5]+'" '+clip+'><td>'+clie[0][i][9]+' ['+(0+exo).toFixed(2)+'%]:</td><td style="float: right;"><span><b>¢</b></span><span id="imv_'+clie[0][i][5]+'" type="html">0.00</span></td></tr>');
            $("#imv_"+clie[0][i][5]).data('imv',exo);
            $("#imv_"+clie[0][i][5]).data('incl',incl);
        }
    }

    if (dotot) totalizar();

    $("#codp").focus();
    Materialize.updateTextFields()
    
}