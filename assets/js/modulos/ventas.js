// $(document).keydown(function(e){
//    if(e.altKey &&  e.which == 67){
//         e.preventDefault();
//         if(!$("#chg_tipo").attr('disabled'))
//             $("#chg_tipo").click().change();
//    }

//    // if(e.which == 115){ //F4
//    //      e.preventDefault();
//    //      $("#chg_tipo").click().change();
//    // }
// });
var w;
$(document).on("change","#idtipopago",function(){
    $(".zelda").data('triforce')['vidtipopago'] = $(this).val();
});

$(function(){
    $('select').material_select();
    $('.tooltipped').tooltip({delay: 50});
    $('#vcomentario').characterCounter();

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });

    cargarImpuestos(0,'11,2');
    cargarDescuentos(0,'2',undefined,1);

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

    $("#codp").blur(function(){
        var iscomodin = $("#valores").data("elemento") == undefined ? 0 : $("#valores").data("elemento")['ncomodin'];

        if (!iscomodin)
            cargarProducto($(this).val(),$(this));
        else{
            $("#valores").data("elemento")['ncomodin'] = 0;
            $("#valores").data("elemento")['hcomodin'] = "^"+$(this).val()+"^";
            endCargarProducto();
        }
    });

    $("#descp").blur(function(){
        var iscomodin = $("#valores").data("elemento") == undefined ? 0 : $("#valores").data("elemento")['ncomodin'];

        if (!iscomodin)
            cargarProducto($(this).val(),$(this));
        else{
            $("#valores").data("elemento")['ncomodin'] = 0;
            $("#valores").data("elemento")['hcomodin'] = $(this).val();
            endCargarProducto();
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

    $("#xidinventario").change(function(){
        var p = arr('login',4,'cantidad',97,'idinventario ='+$('option:selected',this).val()+' and idproducto = '+$("#valores").data('elemento')['idp']);
        
        $("#valores").data('elemento')['hbod'] = $("#xidbodega option:selected").val();
        $("#valores").data('elemento')['hinv'] = $('option:selected',this).val();
        $("#cantI").html(p[0]);
        $("#bname-inv").html(p[0]);
    });

    $(".zelda").data('triforce',{vidtipo:1, vidtipoventa:param, vid:0, vidsucursal:'', videstado:1, visregistrada:0,vreferencia:'', vidmoneda:1, vbisproveedor:0, vidcliente:0, vsubtotal:0, vdescuento:0, vimv:0, vcomodin:'', vextra : '',vextrapagos : 0, vdivisa : 0,vidusuario:'',vidtipopago:0,vidodt:0,vajuste:0, idline:0,  saldo : 0, notific : 0,tmpcorreo:'',videxoneracion:''});

    $(".modal").modal();

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
            $("#imp_1").data('valores')['exoneracion'] = $("#vporcompra").val();
            totalizar();
            $("#modal-exo").modal('close');
        }else
            Materialize.toast(validator,4000,'red');
        
    });

    cargarMoneda(0);
    $(".zelda").data('triforce')['vidtipopago'] = $("#idtipopago").val();

    permisos(1101,1110);
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
    if ( $(".zelda").data('triforce')['vidtipo'] == 1 && ($(".zelda").data('triforce')['vidtipoventa'] == 1 || $(".zelda").data('triforce')['vidtipoventa'] == 6 || $(".zelda").data('triforce')['vidtipoventa'] == 7)) {

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
    if ( $(this).attr('hclk') == 1)
        $("#exct").attr('hclk', 0);
    else
        $("#exct").attr('hclk', 1);
    
    totalizar();
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

function addline(idprod,cod,desc,cant,prec,tot,cntinv,dcs,mdcs,hinv,defi,uni,comodin,desgloce,vstrimp,vexo) {
    $("#valores").removeData('elemento');
    isiva = $("[for=iva]").css('display') !== 'hide' ? $("#iva").is(":checked") : 0;
    if (param != 2){
        $("[for=iva]").addClass('hide');
        $("#iva").attr('checked',false);

        if (isiva){
            var timpuesto = 0;
            $(".dimpuesto").each(function(){
                if (vstrimp.indexOf(','+$(this).data('valores')['vid']+',') >= 0)
                    timpuesto += parseFloat($(this).data('valores')['vmonto'])
            }); 
            prec = prec/((timpuesto/100)+1);
            tot = prec * cant;     
        }
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

            if ( parseFloat($("#cant"+vid).text())+cant > cntinv && param.toString().match(new RegExp(/[167]/i)) && config[1] == 1 && comodin == '') {
                //EXCEDE EL NUMERO EN INVENTARIO
                Materialize.toast('Cantidad Insuficiente en Inventario 1',4000,'red');
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
                $("#fdetallefacturas").append('<div id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="prec'+id+'">'+(precio/divisa).formatMoney(2,'.',',')+'</div> <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod'+id+'">'+uni+'</div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align totp" id="tota'+id+'">'+(tot/divisa).formatMoney(2,'.',',')+'</div> <div class="right"> <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc'+id+'"></span></div> </div>');
                    break;
            case 2:
                $("#fdetallefacturas").append('<div id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod'+id+'">'+codedg+cod+'</div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc'+id+'">'+desc+'</div>  <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant'+id+'">'+cant+'</span></div> <div style="padding: 0 !important;" class="col s1 center-align divisa" id="prec'+id+'">'+(precio/divisa).formatMoney(2,'.',',')+'</div> <div id="unitprod'+id+'" style="padding: 0 !important;" class="col s1 center-align">'+uni+'</div> <div id="vdesc'+id+'" style="padding: 0 !important;" class="col s1 center-align"> '+dcs['descuento']+'% </div> <div cstyle="padding: 0 !important;" class="col s1 center-align totp" id="tota'+id+'">'+(tot/divisa).formatMoney(2,'.',',')+'</div> <div align="right" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a></div> </div>');
                break;
            case 3:
                $("#fdetallefacturas").append('<tr id="fd'+id+'" xtr="'+$(".zelda").data('triforce')['idcliente']+'" idprod="'+idprod+'" class="ciclos row"><td class="center" id="codprod'+id+'">'+codedg+cod+'</td><td class="center" id="desc'+id+'">'+desc+'</td>  <td class="center"> <div id="divcnt" class="form-group"><span id="cant'+id+'">'+cant+'</span><input type="number" id="vcantidad'+id+'" value="'+cant+'" min="1" style=" display:none;"></div></td> <td class="center divisa hide" id="prec'+id+'">'+precio.formatMoney(2,'.',',')+'</td> <td id="unitprod'+id+'">'+uni+'</td> <td id="vdesc'+id+'" class="center hide"> '+dcs+'% </td> <td class="center totp hide" id="tota'+id+'">'+tot+'</td> <td id="desctd'+id+'" align="left" > <a href="#modal-edit" id="edit'+id+'" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%;font-size: 12px;"></a><a href="#" id="del'+id+'" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%;font-size: 12px;"></a></td> </tr>');
                break;
        }

        $("#fd"+id).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : idprod,vcantidad : cant,vprecio : precio,vdesc : 0,vtotal : 0,vidinventario : hinv,vidodt : 0,vimv : 0,vcomodin : comodin,vidunidad : $("#uni").val(),vidimpuestos:'',viddescuentos:'',strimp : vstrimp,exoneracion:vexo,max: mdcs,iddesc:dcs['iddescuento'],vdescuento : dcs['descuento'],iva:isiva});
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
        
        if ($("#iva").attr('hclk') == 1) {
            iva_imp = $("#imp_1").data('valores')['vmonto'];
            if ($("#iva").is(":checked")) {
                $("#fd"+vidlinea).data('triforce')['vprecio'] = $("#fd"+vidlinea).data('triforce')['vprecio']/(1+(iva_imp/100));
            }else{
                $("#fd"+vidlinea).data('triforce')['vprecio'] = $("#fd"+vidlinea).data('triforce')['vprecio']*(1+(iva_imp/100));
            }
            $("#iva").attr('hclk',0);
        }
       
        cantidad    = parseFloat($("#fd"+vidlinea).data('triforce')['vcantidad']);
        precio      = parseInt($("#monedas option:selected").attr('dv')) == 1 ? parseFloat($("#fd"+vidlinea).data('triforce')['vprecio']) : $("#prec"+vidlinea).html().replace(/,/g,'')*(parseFloat($("#monedas option:selected").attr('dv')));
        
        decindv     = parseFloat($("#fd"+vidlinea).data('triforce')['vdescuento']);
        descmax     = parseFloat($("#fd"+vidlinea).data('triforce')['max']);
        desct       = decindv;//param.toString().match(new RegExp(/[2]/i)) ? decindv : decindv > descmax ? descmax : decindv;

        precio = precio * cantidad
        tmpdesc = precio * (1-(desct/100));
        idesc += precio * ( (desct/100) + ((1-(desct/100)) * (desc/100) ));
        totd += precio;

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
        $("#fd"+vidlinea).data('triforce')['vdesc'] = idesc;
        tmpdesc = tmpdesc * (1-(desc/100));

        $(".dimpuesto").each(function(){
            if (param == 2) {
                if ($("#exct").attr('hclk') == 0)
                    geimv = $(this).data('valores')['exoneracion'];
                else
                    geimv = 100;
            }
            
            if ($("#fd"+vidlinea).data('triforce')['strimp'].indexOf(','+$(this).data('valores')['vid']+',') >= 0) {

                eimv = $("#fd"+vidlinea).data('triforce')['exoneracion'];
                eimv = eimv >= geimv ? eimv : geimv;

                rimv = parseFloat($(this).data('valores')['vmonto']);
                iimv = $(this).data('valores')['vid'];

                if(eimv >= 100 && exov == '') { 
                    //PRODUCTOS O CLIENTES EXENTOS
                    exento += tmpdesc;
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
                }else{ 
                    //PRODUCTOS O CLIENTES GRABADOS Y EXONERADOS
                    simv = parseFloat(tmpdesc*(rimv/100)).toFixed(5);
                    dimv =  parseFloat(tmpdesc*((rimv*(1-(eimv/100)))/100)).toFixed(5);
                    impuesto += parseFloat(dimv);
                    $("#fd"+vidlinea).data('triforce')['vimv'] = dimv;
                    $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = iimv+','+$(this).data('valores')['vmonto']+','+parseFloat(simv).toFixed(5)+','+eimv;
                    $("#imv_"+iimv).html((parseFloat(impuesto)/divisa).formatMoney(2,'.',','));
                }
            }else{
                exento += tmpdesc;
                $("#fd"+vidlinea).data('triforce')['vidimpuestos'] = '';
            }

        });
    });
    
    total = totd + parseFloat(impuesto) - idesc;
    
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
        kbrota = $("#codp").val().substring($("#codp").val().indexOf('/')+1);
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

        $("#valores").data("elemento",{idp : cod[0],hcodp : cod[1],hprec : cod[3],hdesc : dvalor,hdescm : cod[12], hinv : cod[13], hbod:cod[14], hunidad: cod[15], hcomodin: cod[16],isdesgloce: cod[17],exo: cod[9],ncomodin : iscomodin}) //,imp: cod[6]
        $("#codp").val(cod[1]);
        $("#descp").val(cod[2]);
        $("#precp").val(parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv'))).formatMoney(2,'.',','));
        $("#totp").val((parseFloat(cod[3]/parseFloat($("#monedas option:selected").attr('dv')))*cantidad).formatMoney(2,'.',','))
        
        if (cod[4] == '?') {
            $("#cantI").html('∞');
        }else{
            $("#cantI").html(cod[4]);
            $("#bname-inv").html(cod[4]);
        }
        var strimp = cargarImpuestos(cod[0].substr(1)+',0',tabla);

        $("#valores").data("elemento")['strimp'] = strimp;
        cargarunidades(cod[0],cod[15]);
        $("#cantp").val(cantidad);
        
        if(cod[18] && param != 2){ //PRODUCTO DE VALOR VARIABLE
            $("#precp").prop("readonly",cod[18]);
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
            endCargarProducto();   
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
                elemento.select()
                break;
        }
        
    }
}

function endCargarProducto(){
    var modselec = $("input[name='modselected']:checked").val();

    if (modselec == 1) {
        if (($("#precp").prop("readonly") == undefined || !$("#precp").prop("readonly")) && param != 2){
            $("#precp").focus().select();
            $("[for=iva]").removeClass('hide');
            $("#iva").attr('checked',true);
        }else{
            $("#cantp").focus().select();
        }
        
    }else{
        var e = jQuery.Event("keyup");
        e.which = 13;
        $("#cantp").trigger(e);
    }     
}

function cargarunidades(vidproducto,vunidad) {
    var uni = '';
    var unis = getDatos('',250,vidproducto,0,0,0)[0];

    $.each(unis, function(index, valor) {
        uni += '<option value="'+valor[0]+'">'+valor[1]+'</option>';
    });
    $("#uni").html(uni);
    $("#uni").val(vunidad);
    $("#uni").material_select('update');
}

function endDetail(vid,vacc,vmodulo) {
    var factura = getDatos('consecutivo',64,'id = '+vid[0][0],0,0)[0][0][0];
    var clave = vid[0][0];

    if (config[0] == 1 && (param == 1 || param == 7)) {
        var $toastContent = $('<span style="width: 500px">Generado Factura Electronica:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
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
        
        if ($(".zelda").data('triforce')['vidtipoventa'] == 7){
            $(".zelda").data('triforce')['vidtipoventa'] = 1;
            var ncons = getDatos('lpad(consecutivo+1,6,0)',252,'idsucursal = @@impresa and id > 0',0,0)[0][0];
            $("#titfact").html('VENTAS')
            $("#idfact").html(ncons);
        }

        $(".chg_tipo").removeAttr('disabled');

        if (vclie[3] > 0) {
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
        
    }else{
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

        if($("#ncli").val().length > 0)
            $("#ingclie").removeClass('hide');
    }

    cargarImpuestos($(".zelda").data('triforce')['vidcliente'],'2');
    cargarDescuentos($(".zelda").data('triforce')['vidcliente']+',0','2');
    // cambio cliente
    var producto = $("#fdetallefacturas .ciclos");
    producto.each(function(i) {
        var idlinea = $(this).attr('id').substr(2);
        var idprod = $("#desc"+idlinea).text();
        var prod = arr('login',4,'',43,'"'+idprod+'",@@impresa,'+$(".zelda").data('triforce')['vidcliente']+','+getParameterByName('tf'),0,0,0);
        var char1 = $("#desc"+idlinea).text().substring(0,1);
        var tabla = char1 == '+' ? 58 : char1 == '-' ? 16 : 11;
        var vstrimp = cargarImpuestos($("#desc"+idlinea).text().substr(1)+',0',tabla);

        prod = prod[0][0];
        if (parseFloat(prod[3]) > 0) {
            $("#prec"+idlinea).text(prod[3].formatMoney(2,'.',','));
            $("#fd"+idlinea).data('triforce',{vaccion : 0,vid : 0,vidfactura : '?',videntrada : prod[0],vcantidad : $("#fd"+idlinea).data('triforce')['vcantidad'],vprecio : prod[3],vdesc : 0,vtotal : 0,vidinventario : prod[13],vidodt : 0,vimv : 0,vcomodin : '',vidunidad : $("#fd"+idlinea).data('triforce')['vidunidad'],vidimpuestos : $("#fd"+idlinea).data('triforce')['vidimpuestos'],viddescuentos : $("#fd"+idlinea).data('triforce')['viddescuentos'],strimp: vstrimp});
        }
    });

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
    var noBorrar = vtabla = '11,2' ? 'noBorrar' : '';
    var impuestoStr = '';
 
    for (var i = 0; i < imp.length; i++) {
        impuestoStr += ","+imp[i][0]+",";

        if (!$("#imp_"+imp[i][0]).length) {
            exo = (parseFloat(imp[i][3])*(1-(parseFloat(imp[i][4])/100))).toFixed(2);
            textImpuestos = '<tr id="imp_'+imp[i][0]+'" class="dimpuesto" '+noBorrar+'><td id="imp_v'+imp[i][0]+'">'+imp[i][2]+' ['+exo+'%]:</td><td style="float: right;"><span class="moneda">'+sMoneda+'</span><span id="imv_'+imp[i][0]+'" type="html">0.00</span></td></tr>';
            
            $("#sh_imp").append(textImpuestos);

            $("#imp_"+imp[i][0]).data('valores',{vid:imp[i][0],vmonto:imp[i][3],exoneracion:imp[i][4]});
        }else{
            if (vtabla == 2){
                $("#imp_"+imp[i][0]).data('valores')['exoneracion'] = imp[i][4];
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
            // if (parseInt($("#fd"+vidfila).data("triforce")['iddesc']) == 1) {

            // }
            $("#tdescuentol").html(strDesc)
            $("#tdescuentol").material_select('update');
            $("#edescuento").val(mdesc);
            break;
        case 2:
            break;
        default:
            break;
    }   

    totalizar();
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
        console.log('ENTREGADO');
        var p;
        try {
            p = JSON.parse(data);
            $(".expect").removeClass('progress');
            if (p['succed']) {
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
                        break;
                    default:
                        arr('login',7,2,64,'feestado=8','id='+clave,0,0);
                    break;
                }
                setTimeout(function(){location.reload();},5000);
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
        var str_correos = '';
        switch(param){
            case 2:
                break;
            default:
                if ($(".zelda").data('triforce')['vidcliente'] != 0) {
                    var correos = getDatos("",18,$(".zelda").data('triforce')['vidcliente']+",2",0,0,0);
                    
                    if (!correos['succed']) {
                        Materialize.toast('Correos Inválidos',4000,'red');
                        arr('login',7,2,64,'feestado=4','id='+clave,0,0);
                    }else{
                        for (var i = 0; i < correos[0].length; i++) {
                            str_correos += correos[0][i][3]+",";
                        }

                        str_correos = str_correos.substr(0,str_correos.length-1);
                    }
                }
                
                if (config[4] == 1) {
                    var vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : '';
                    w = window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked')+vuelto);
                    try{ 
                        w.print();
                      setTimeout(function(){
                     
                         w.close();
/*                        window.focus();
*/                            },500);
                      
                        
                    }catch(e){
                        Materialize.toast("POP-UP ACTIVADO",4000,'red');
                    }
                }
                break;
        }
        
        if (str_correos != '') {
            var vbody = getDatos('',73,vid,0,0)[0][0];
            archivos = makeArchivos(factura,clave,vid,vbody[1]);
            enviarCorreo(3,str_correos,"Factura N° "+factura,vbody[0],archivos);
        }
        
    }else{
        switch(param){
            case 2:
                break;
            default:
                if (config[4] == 1) {

                    var vuelto = $("#pcam").is(":visible") ? '&pvuelto='+$("#pcon").val()+'&vuelto='+$("#pcam").html() : '';
                    w = window.open('facturacion?accion=6&id='+vid+'&tp='+$("#p_v").is(':checked')+vuelto);
                    try{ 
                        w.print();
                        setTimeout(function(){w.close();},500);
                      
                        
                    }catch(e){
                        console.log(e)
                        Materialize.toast("POP-UP ACTIVADO",4000,'red');
                    }
                }
                break;
        }
    }

    setTimeout(function(){location.reload();},3000);
}


function makeArchivos(vfactura,vclave,vid,vsucursal){
    var archivos = '';
    
    mantenimiento_async('login',8,{arch:'recibo',id:vid,mic:1,tit:'Factura Electrónica',sel:'',tbl:72,where:vid},1);
    if (vclave == vid)
        archivos = 'pdf/Factura N°'+vfactura+', '+vsucursal+'.pdf';
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