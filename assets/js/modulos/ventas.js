$(function(){
    $("#ffacturas").submit(function(){
        return false;
    });
    fecha = new Date();
    $('#vfecha').pickadate().pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);

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
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'!bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
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

            var cod = arr('login',4,'',43,'"'+ kbrota +'",@@impresa','',0,'');
            
            if (cod[0][0] != undefined) {
                var fimv = cod[0];
                cod = cod[0][0];

                $("#valores").data("elemento",{idp : cod[0],hcodp : cod[5],hprec : cod[3],hdesc : cod[6],hdescm : cod[13], hinv : cod[14], hbod:cod[15]})

                $("#codp").val(cod[1]);
                $("#descp").val(cod[2]);
                $("#precp").val(parseFloat(cod[3]).formatMoney(2,',','.'));
                $("#totp").val((parseFloat(cod[3])*cantidad).formatMoney(2,',','.'))
                
                if (cod[4] == '?') {
                    $("#cantI").html('∞');
                }else{
                    $("#cantI").html(cod[4]);
                    $("#bname-inv").html(cod[4]);
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
            var cod = arr('login',4,'',43,'"'+ $(this).val() +'",@@impresa','',0,'')[0][0];

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

    $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:1, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1:'',vlista2:'', idline:0, vextrapagos : 0, saldo : 0, notific : 0});

    $(".modal").modal();
})//READY

$(document).on("click","#chg_tipo",function(){
    
    var value = parseInt($(this).val())

    if (value == 2) {
        $(".cre").hide();
        $(".con").show();
        $("#vplazo").val(0);
        $(this).val(1)
        $(".zelda").data('triforce')['vidtipo'] = 1
    }else{
        $(".con").hide();
        $(".cre").show();
        if ($(".zelda").data('triforce')['vidcliente'] != 0) {
            var plazo = arr('login',4,'plazo',2,'id = '+$(".zelda").data('triforce')['vidcliente'],'',0,'')[0][0][0];
            var saldo = arr('login',205,'plazo',2,'id = '+$(".zelda").data('triforce')['vidcliente'],'',0,'')[0][0][0];
            $("#vplazo").val(plazo);
        }
        $(".zelda").data('triforce')['vidtipo'] = 2
        $(this).val(2)
    }
});

$(document).on("keyup","#cantp",function(e){
    var cant = parseFloat($(this).val()),
        precio = parseFloat($("#valores").data('elemento')['hprec']),
        total = precio * cant;

    $("#totp").val(total.formatMoney(2,'.',','));

    var code = e.which || e.keyCode;
    
    if (code == 13) {
        
        if (cant > 0) {
            var cod = $("#valores").data('elemento')['idp'];
            var inv = $("#valores").data('elemento')['hinv'];

            var cnt = arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ cod+'" and idinventario = '+inv,'',0,'')[0][0][0];
            
            if (cant > cnt) {
               Materialize.toast('Cantidad insuficiente en Inventario',4000,'red');
            }else if (cant <= cnt || cnt == '∞') {
                var idprd = $("#valores").data('elemento')['hcodp'];
                var dcs = $("#valores").data('elemento')['hdesc'];
                var mdcs = $("#valores").data('elemento')['hdescm'];
                var desc = $("#descp").val();
                var hinv = $("#valores").data('elemento')['hinv'];

                $("#valores").removeData('elemento');
                addline(idprd,cod,desc,cant,precio,total,cnt,dcs,mdcs,hinv);
            }
        }else{
            Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
        }
    }
  
});

$(document).on("change","#cantp",function(){
    var cant = parseFloat($(this).val()),
        precio = parseFloat($("#valores").data('elemento')['hprec']),
        total = precio * cant;
    $("#totp").val(total.formatMoney(2,'.',','));
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
        
        totalizar()

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

$(document).on("click",".fedit",function(){
    var id = $(this).attr('id').substr(4);
    var cod = $("#codprod"+id).text();
    var visible = $(this).attr('visible');
    var cantinv = arr('login',4,'',43,'"'+cod+'",@@impresa','',0,'')[0][0][4];
    $("#vcantidad"+id).attr('max',cantinv)

    if (visible == 0) {
        $("#errcnt").hide();
        $("#cant"+id).hide();
        $("#vcantidad"+id).show();
        $(this).attr('visible','1');
        $("#vcantidad"+id).select();
    }else{
        var cant = parseInt($("#vcantidad"+id).val());
        var cinv = parseInt(cantinv);
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
        $("#btnAjuste").text('-');
        $(this).attr('accion',0);
    }else if (accion == 0) {
        $("#btnAjuste").text('+');
        $(this).attr('accion',1);
    }
    totalizar();
});


function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs,hinv) {
    var err = 0;
    var existe = 0;
    var precio = parseFloat(prec);

    $("#fdetallefacturas tr").each(function(){
        var vid = $(this).attr('id').substr(2);

        if (idprod == $(this).data('triforce')['videntrada'] && hinv == $(this).data('triforce')['vidinventario']) {
            existe = 1;
            if ( parseFloat($("#cant"+vid).text())+cant > cntinv ) {
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
        $(".zelda").data('triforce')['idline'] = id;

        $("#fdetallefacturas").append('<tr id="fd'+id+'" class="ciclos"><td style="padding: 0"><input type="checkbox" class="delf" name="eliminarf" id="d'+id+'"/><label for="d'+id+'"></label></td><td  class="center" id="codprod'+id+'">'+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td><td class="center" id="prec'+id+'">'+precio.formatMoney(2,',','.')+'</td><td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;width: 70px"></div></td><td class="center totp" id="tota'+id+'"></td><td id="desctd'+id+'" align="left" ><input type="text" id="vdesc'+id+'" value="" placeholder="0" style="width: 50px" disabled><a href="#" id="edit'+id+'" visible="0" class="material-icons pbtn black-text fedit faccion">edit</a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="material-icons pbtn black-text delf faccion">close</a></td></tr>');

        $("#vdesc"+id).data('valor',dcs);
        $("#vdesc"+id).data('max',mdcs);
        $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:idprod, vcantidad:cant, vprecio:precio, vdesc:0, vtotal:0, vidinventario:hinv,vidodt : 0});
       
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
        var vid = $("#fd"+vidlinea).data('triforce')['videntrada'];
        var cantidad = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        var precio = parseFloat($("#fd"+vidlinea).data('triforce')['vprecio']);
        var decindv = parseFloat($("#vdesc"+vidlinea).data('valor'));
        var descmax = parseFloat($("#vdesc"+vidlinea).data('max'));
        var desct = decindv+desc > descmax ? descmax : decindv+desc;
        $("#fd"+vidlinea).data('triforce')['vdesc'] = desct;
        $("#vdesc"+vidlinea).val(desct+"%");
        precio = precio * cantidad

        totd += precio;
        tmpdesc = precio * (1-(desct/100));
        idesc += precio * (desct/100);
        tdesc += tmpdesc; 

        $("#fd"+vidlinea).data('triforce')['vtotal'] = tmpdesc;
        $("#tota"+vidlinea).html(tmpdesc.formatMoney(2,',','.'))

        $("[id^=imv_").each(function(){

            var incl = $(this).data('incl');
            var idimv = $(this).prop('id').substr(4);
            incl = incl.indexOf('*') === -1 ? incl.indexOf(vid+",") : 0

            if(incl !== -1){
                var im0 = parseFloat($(this).data('imv'));
                var im1 = $(this).data('imv'+vid) == undefined ? 100 : parseFloat($(this).data('imv'+vid)) ;
                var rimv = im0 <= im1 ? im0 : im1;

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
    $(".zelda").data('triforce')['vsubtotal'] = totd.toFixed(2);

    $("#descuento_v").html(idesc.formatMoney(2,'.',','));
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
            break;
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    // console.log(salida);
    return salida;

}

function validarFactura() {

    if ($("#subtot").text() == '0.00') {
        $("#codp").focus()
        return "No se Han Ingresado Productos";
    }

    if ($("#vcomentario").val() == '') {
        $("#vcomentario").val('');
    }

    if ($(".zelda").data('triforce')['vidcliente'] == 0)
        $(".zelda").data('triforce')['vcomodin'] = $("#ncli").val();

    if($(".zelda").data('triforce')['vidtipo'] == 2){
        $("#vidtipopago").val(0)
        $("#vidtipopago").material_select('update');

        // var p = arr('login',4,'',205,$(".zelda").data('triforce')['vidcliente'],0,0,0);
        // if(p['succed'] == 0){
        //     return p[0]['ERROR'] 
        // }
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

function endDetail(vid) {
    window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked'));
    return false;
}

function searchClient(vvariable,visprv){
    
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'');
    
    if (clie[0][0][0] != 0) {
        var vclie = clie[0][0]
        $(".zelda").data('triforce')['vidcliente'] = vclie[0];
        $("#ncli").val(vclie[1]+' '+vclie[2]);

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

        $("#msaldo").html(parseFloat(vclie[11]).formatMoney(2,'.',','));
        var porcen = vclie[12] == 0 ? 100 : (parseFloat(vclie[11])*100)/parseFloat(vclie[12]);
        console.log(porcen)
        if (porcen <= 75)
            $("#msaldo").css('color','green');
        else if (porcen > 75 && porcen < 100)
            $("#msaldo").css('color','yellow');
        else if (porcen >= 100)
            $("#msaldo").css('color','red');
        
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