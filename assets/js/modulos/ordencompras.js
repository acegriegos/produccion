$(function(){
    $("#ffacturas").submit(function(){
        return false;
    });

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
            $("#vplazo").focus();
        }
        $("#vfecha").blur();
    } })

    $('select').material_select();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    $(".sclie").blur(function(){
        searchClient($(this).val(),1);
    });

    $("#ncli").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = String.fromCharCode(charCode);

        if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            $("#ncli").autocomplete({
                limit: 20,
                data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",replace(cedula,"-",""),"*")) as nom,null',2,'bisproveedor having nom like "%'+$("#ncli").val()+'%" limit 20',0,0,0,1)
            });
            $("#ncli").siblings($(".autocomplete-content")).css('width','25%');
        }
    });

    $("#limpiar").click(function(){
        $("#valores").data("elemento",{idp : 0,hcodp : 0,hprec : 0,hdesc : 0,hdescm : 0, hinv : 0, hbod:0,hdescu : 0});

        $("#codp").val('');
        $("#descp").val('');
        $("#precp").val(0);
        $("#descup").val(0);
        $("#cantp").val(0);
        $("#totp").val(0);

        $("#codp").focus();
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
                data: arr('login',4,'',6,'"'+$("#descp").val()+'",5',0,0,0,1)
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
            }
            var cod = arr('login',4,'',140, $(".zelda").data('triforce')['vidcliente']+',@@impresa,"'+ kbrota +'"',0,0,0);
            
            if (cod[0][0][0] != null) {
                cod = cod[0][0];

                $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : 0,hdescm : 0, hinv : cod[5], hbod:cod[4],hdescu : 0})

                $("#codp").val(cod[1]);
                $("#descp").val(cod[2]);
                $("#precp").val(parseFloat(cod[3]).formatMoney(2,',','.'));
                $("#descup").val(0);
                $("#totp").val((parseFloat(cod[3])*cantidad).formatMoney(2,',','.'))
                
                if (cod[4] == '?') {
                    $("#cantI").html('∞');
                }else{
                    $("#cantI").html(cod[6]);
                    $("#bname-inv").html(cod[6]);
                }

                var modselec = $("input[name='modselected']:checked").val();
                if (modselec == 1) {
                    $("#cantp").val(cantidad);
                    $("#descup").focus();
                    $("#descup").select();
                }else{
                    var e = jQuery.Event("keyup");
                    e.which = 13;
                    $("#cantp").val(cantidad);
                    $("#cantp").trigger(e);
                }
                Materialize.updateTextFields()
            }else{
                Materialize.toast('Producto no Existente Desea Agregarlo',4000,'red');
                $(this).select()
            }
        }
    });

    $("#descup").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13) {
            $("#valores").data('elemento')['hdescu'] = $(this).val();
            $("#cantp").select();
        }
    });

    $("#cantp").keyup(function(e){
        var code = e.which || e.keyCode;
        var cant = parseFloat($(this).val()),
            precio = parseFloat($("#valores").data('elemento')['hprec']),
            total = precio * cant;
        var descu = $("#valores").data('elemento')['hdescu'];

        $("#totp").val(total.formatMoney(2,'.',','));

        if (code == 13) {
            if (cant > 0) {
                var cod = $("#valores").data('elemento')['hcodp'];
                var inv = $("#valores").data('elemento')['hinv'];
                var cnt = arr('login',4,'if(count(cantidad) = 0,0,cantidad)',97,'idproducto = "'+ cod+'" and idinventario = '+inv,'',0,'')[0][0][0];
                var idprd = $("#valores").data('elemento')['idp'];
                var desc = $("#descp").val();
                var hinv = $("#valores").data('elemento')['hinv'];
                var defi = arr('login',4,'',200,'64,0',0,0,0)[0][0][3];
                $("#valores").removeData('elemento');
                addline(idprd,cod,desc,cant,precio,total,descu,defi,cnt,hinv);
            }else{
                Materialize.toast("Cantidad Debe ser Mayor a 0",4000,'red');
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
            $("#descup").focus();
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

    $("#vidtipopago").change(function(){
        setTimeout(function(){$("#ncli").focus();},300)
    });

    $(".modal").modal();

    setTimeout(function(){$("#vreferencia").focus();},300);
    $("#ffacturas .zelda").data('triforce',{vidtipo:1, vidtipoventa:2, vid:0, vidsucursal:'', videstado:1, visregistrada:0, vidmoneda:1, vbisproveedor:1, vidcliente : 0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vlista1: '',vlista2 : '', vextrapagos : '' , idline : 0});
});//READY

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


$(document).on("keyup","#vreferencia",function(e){
    var code = e.which || e.keyCode;
    if (code == 13)
        $("#vfecha").focus();
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
            $("#vplazo").val(plazo);
        }
        $(".zelda").data('triforce')['vidtipo'] = 2
        $(this).val(2)
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
    var visible = $(this).attr('visible');

    if (visible == 0) {
        $("#errcnt").hide();
        $("#cant"+id).hide();
        $("#prec"+id).hide();
        $("#descu"+id).hide();
        $("#hprc"+id).show();
        $("#hdsc"+id).show();
        $("#vcantidad"+id).show();
        $(this).attr('visible','1');
        $("#hprc"+id).select();
    }else{
        var precio = parseFloat($("#hprc"+id).val());
        var desc = parseFloat($("#hdsc"+id).val());
        var cant = parseFloat($("#vcantidad"+id).val());

        $("#prec"+id).text(precio);
        $("#descu"+id).text(desc);
        $("#cant"+id).text(cant);
        $(".zelda").data('triforce')['vlista2'][id+'-'+$("#fd"+id).data('triforce')['vidinventario']] = desc;

        $("#hprc"+id).hide();
        $("#hdsc"+id).hide();
        $("#vcantidad"+id).hide();

        $("#prec"+id).show();
        $("#descu"+id).show();
        $("#cant"+id).show();

        $(this).attr('visible','0');
        $("#errcnt").hide();

        $("#fd"+id).data('triforce')['vprecio'] = $("#prec"+id).text();
        $("#fd"+id).data('triforce')['vdesc'] = $("#descu"+id).text();
        $("#fd"+id).data('triforce')['vcantidad'] = $("#cant"+id).text();

        totalizar();
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

$(document).on("keyup","#vdescuentop",function(){
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


function addline(idprod,cod,desc,cant,prec,tot,descu,defi,cntinv,hinv) {
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
        var prc = parseFloat(prec);
        prec = prec.formatMoney(2,'.',',');
        $(".zelda").data('triforce')['idline'] = id;
        $("#fdetallefacturas").append('<tr id="fd'+id+'" class="ciclos"><td class="center" id="codprod'+id+'">'+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td><td class="center"><div><span id="prec'+id+'">'+prec+'</span><input type="number" id="hprc'+id+'" value="'+prc+'" min="1" style="display:none;width: 70px"></div></td><td class="center"><div><span id="descu'+id+'">'+descu+'</span> %<input type="number" id="hdsc'+id+'" value="'+descu+'" min="1" style="display:none;width: 70px"></div></td><td class="center"><div><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style="display:none;width: 70px"></div></td><td class="center totp" id="tota'+id+'"></td><td id="desctd'+id+'" align="left"><input type="checkbox" class="filled-in chkivi" id="aivi'+id+'" checked="checked"><label for="aivi'+id+'">I.V.I</label><input type="text" id="ivi'+id+'" value="'+defi+'" placeholder="0" style="width: 50px"><a class="fa fa-archive pbtn black-text chinv" id="chi'+id+'" href="#modal-inventario" title="Cambiar Inventario"></a><a id="edit'+id+'" visible="0" class="material-icons pbtn black-text fedit faccion">edit</a><a id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="material-icons pbtn black-text delf faccion">close</a></td></tr>');
        $("#descu"+id).data('valor',descu);
        $("#fd"+id).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:idprod, vcantidad:cant, vprecio:precio, vdesc:0, vtotal:0, vidinventario:hinv,vidodt : 0});
       
    }
    totalizar();
    if (err == 0) {
        $("#codp").val('');
        $("#descp").val('');
        $("#cantp").val(0);
        $("#precp").val('0.00');
        $("#totp").val('0.00');
        $("#descup").val(0);
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
    var impuestoi = 0;
    var dsct = 0;
    var flete = $("#vflete").val();
    var desc = $("#vdescuentop").val();
    var ajuste = $("#vajuste").val();
    var actajuste = $("#btnAjuste").attr('accion') == 1 ? '' : '-';
    var aimp = [];
    var adesc = [];
    $(".zelda").data('triforce')['vlista1'] = [];
    $(".zelda").data('triforce')['vlista2'] = [];

    flete = isNaN(parseFloat(flete)) || parseFloat(flete) == '' ? 0 : parseFloat(flete);
    desc = isNaN(parseFloat(desc)) || parseFloat(desc) == '' ? 0 : parseFloat(desc);
    ajuste = isNaN(parseFloat(ajuste)) || parseFloat(ajuste) == '' ? 0 : parseFloat(ajuste);

    $(".totp").each(function(){
        var vidlinea = $(this).prop('id').substr(4);
        var vid = $("#fd"+vidlinea).data('triforce')['videntrada'];
        var cantidad = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        var precio = parseFloat($("#fd"+vidlinea).data('triforce')['vprecio']);
        var desct = parseFloat($("#descu"+vidlinea).data('valor'));
        $("#fd"+vidlinea).data('triforce')['vdesc'] = desct;
        $("#vdesc"+vidlinea).val(desct+"%");
        precio = precio * cantidad

        var ivi = isNaN($("#ivi"+vidlinea).val()) ? 0 : parseFloat($("#ivi"+vidlinea).val()); //13
        tmpdesc = precio * (1-(desct/100));
        impuestoi = tmpdesc - tmpdesc / (1+(ivi / 100));
        tdesc = tdesc - impuestoi;
        totd += precio - impuestoi;
        idesc += precio * (desct/100);
        tdesc += tmpdesc; 
        impuesto += impuestoi;

        aimp.push(ivi);
        adesc.push(desct)
        $(".zelda").data('triforce')['vlista1'][vidlinea+'-'+$("#fd"+vidlinea).data('triforce')['vidinventario']] = ivi;
        $(".zelda").data('triforce')['vlista2'][vidlinea+'-'+$("#fd"+vidlinea).data('triforce')['vidinventario']] = desct;

        $("#fd"+vidlinea).data('triforce')['vtotal'] = tmpdesc;
        $("#tota"+vidlinea).html(tmpdesc.formatMoney(2,',','.'));
    });
    $(".zelda").data('triforce')['vlista1'] = aimp;
    $(".zelda").data('triforce')['vlista2'] = adesc;

    $("[id^=imv_]").removeAttr('tmp_imv');
    total = tdesc + impuesto;

    // if (desc != 0) {
    //     dsct = 
    // }

    if (flete != 0) {
        $("#flete").html(flete.formatMoney(2,'.',','));
        total = total + flete;
    }
    if (ajuste != 0) {
        ajuste = parseFloat(actajuste+ajuste);
        total += ajuste;
    }
    
    $("#subtot").html(totd.formatMoney(2,'.',','));
    $(".zelda").data('triforce')['vsubtotal'] = totd.toFixed(2);
    $("#imv_1").html(impuesto.formatMoney(2,'.',','));
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
    // window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked'));
    return false;
}

function searchClient(vvariable,visprv) {
    var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'');

    if (clie[0][0][0] != 0) {
        
        var vclie = clie[0][0]
        $(".zelda").data('triforce')['vidcliente'] = vclie[0];
        $("#ncli").val(vclie[1]+' '+vclie[2]);

        if ($("#vidtipo").val() == 2) {
            $("#vplazo").val(vclie[3]);
        }else{
            $("#vplazo").val(0);
        }
        
        $("#vdescuentop").val(vclie[4]);
        $("#vdescuentop").data('valor',vclie[4])
        
    }else{
        $(".zelda").data('triforce')['vidcliente'] = 0;
        $("#vdescuentop").val(0);
        $("#vdescuentop").data('valor',0);
        $("#vplazo").val(0);
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
    Materialize.updateTextFields();
}