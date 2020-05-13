Dropzone.autoDiscover = false;
var myDropzone;
var estado;
var config;
var opcompras = '<option value="1">Compra</option> <option value="2">Gasto</option> <option value="3">Gasto No Diferido</option> <option value="4">Bien de Capital</option> <option value="5">Proporcionalidad</option>';

$(function(){
    config = getDatos('',42,'@@impresa',0,0)[0][0];

    $('[href="#modal-getxml"]').click(function(){
        $("#modal-getxml").modal('open')
    });

    $('[href="#modal-irobot"]').click(function(){
        $("#modal-irobot").modal('open');
        
        $(".act").addClass('hide');
        $(".actin").removeClass('hide');

        var sucursal = getDatos('cedula,isprueba',39,'id=@@impresa',0,0,0)[0][0];
        
        $.ajax({
            url: 'login',
            type: "post",
            data: {accion:15,arreglo:1,server:config[18],ced:sucursal[0],isp:sucursal[1]}
        })
            .done(function(res){  
                var str = '';
                var tabla = $("#data-table-compras").DataTable();   
                tabla.destroy();

                var temporal = arr('login',6,'',265,'@@impresa',0,1,$("#bcompras"),0);

                $("#data-table-compras").dataTable({
                    LengthChange : false,
                    order : []
                });
                
                $(".act").removeClass('hide');
                $(".actin").addClass('hide');
            })
            .fail(function(){
                console.log('No hay acceso a '+config[18]);
                $(".act").removeClass('hide');
                $(".actin").addClass('hide');
            });
    });


    $("#ret-xml").click(function(){
        $("[xml=3]").addClass('hide');
        $("[xml=2]").addClass('hide');
        $("[xml=1]").removeClass('hide');
        $("[xml=4]").removeClass('hide');
        Dropzone.forElement("#registro-upload").removeAllFiles(true);
        Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
    });

    InitDropzone(1,true,'../cargar.php?accion=4',"#registro-upload",1,'text/xml','','',xmlCargar);
    InitDropzone(1,true,'../cargar.php?accion=4',"#hacienda-upload",1,'text/xml','',removeHacienda,xmlCargar);

    arr('login',6,'',179,'0,0,"1,1,@@impresa,0,0,'+$(".tpf.active").attr('tpf')+'","0,10"',0,1,$("#listafacturas"));
    $("#data-table-facturas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });

    $(".tpf").click(function(){
        $(".tpf").removeClass('active');
        $(this).addClass('active');
        var id = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
        var tabla = $("#data-table-facturas").DataTable();
        tabla.destroy();
        
        arr('login',6,'',179,'0,0,"1,'+id+',@@impresa,0,0,'+$(this).attr('tpf')+'","0,10"',0,1,$("#listafacturas"));
        console.log('0,0,"1,'+id+',@@impresa,0,0,'+$(this).attr('tpf')+'","0,10"')
        paginate($("ul.pagination").attr('vtbl'),undefined,'1,'+id+',@@impresa,0,0,'+$(this).attr('tpf'))
        $("ul.pagination").attr('filtro_sp','1,'+id+',@@impresa,^,?,'+$(this).attr('tpf'));
        $("#data-table-facturas").dataTable({
            bFilter: false,
            bScrollInfinite: true,
            bSort: false,
            bLengthChange: false,
            order: [],
            bPaginate: false,
            info: false
        });
    });

    paginate($("ul.pagination").attr('vtbl'),undefined,'1,1,@@impresa,0,0,0');
});

$(document).on("blur",".cxp",function(){
    var valor = $(this).val();
    var padre = $(this).parent().parent();
    if(!valor.trim().length)
        padre.attr('cxp',0)
    else if(isNaN(valor))
        padre.attr('cxp',0)
    else
        padre.attr('cxp',valor);
});

$(document).on("change",".tcompra",function(){
    var id = parseInt($('option:selected',this).val());
    var padre = $(this).parent().parent();
    var gs = padre.attr('gs');
    var iva = padre.attr('imv');
    var tot = padre.attr('tot');
    switch (id) {
        case 2:
        case 4:
            iva =0;
            gs = tot;
            break;
        case 3:
            iva = 0;
            gs = 0;
            break;
        default:
            break;
    }

    padre.find('.gs').html(parseFloat(gs).formatMoney(2,'.',','))
    padre.find('.imv').html(parseFloat(iva).formatMoney(2,'.',','))
});

$(document).on("click",".msjh",function(){
    var tstado = $(this).attr('tipo');
    /*1=>COMPRA 100%
      2=>COMPRA PARCIAL
      3=>BIEN DE CAPITAL
      4=>GASTO
      5=>PROPORCIONALIDAD*/
    var msjreceptor = $("#msjreceptor").val();
    var tipo = credito = gasto = plazo = 0;

    if ($(this).attr('xml') == undefined) {
        var padre = $(this).parent().parent();
        var idcomp = padre.attr('id').substr(2);
        tipo = padre.find('.tcompra').val();
        gasto = padre.find('.gs').html().replace(/,/g,'');
        credito = padre.find('.imv').html().replace(/,/g,'');
        plazo = padre.find('.cxp').val();
        plazo = isNaN(plazo) ? 0 : plazo;

    }else{
       var idcomp = getDatos('',278,$(this).parent().attr('idcompra'),0,0,0)
       idcomp = idcomp[0][0][0];
       tipo = $("#tipo").val();
       credito = $("#credito").val();
       gasto = $("#gasto").val();
    }   

    var idfact = getDatos('',266,idcomp+',@@usr,@@impresa,'+tstado+',"'+msjreceptor+'",'+tipo+','+credito+','+gasto+','+plazo,0,0,0);
    var crrprov = getDatos('correo',264,'vid = (select idcliente from tmpcompras where id ='+idcomp+')',0,0,0);

    crrprov = crrprov[0].length ? crrprov[0][0][0] : '';
    var titulo = parseInt(tstado) == 5 ? 'Aceptación' : parseInt(tstado) == 6 ? 'Acep. Parcial' : 'Rechazo';

    if(!idfact.succed){
        Materialize.toast(idfact[0]['ERROR'],4000,'red');
        $(this).parent().parent().remove();
    }else{

        // var $toastContent = $('<span style="width: 500px" id="t'+idfact[0][0][0]+'">Generando Documento:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        // Materialize.toast($toastContent,2000);
        Materialize.toast('Documento '+titulo+' Correctamente',4000,'green');
        var factura = getDatos('consecutivo,datediff(curdate(),fecha)',64,'id = '+idfact[0][0][0],0,0)[0][0];
        var tlimit = parseInt(factura[1]);

        if(tstado != 5)
            sendFE('^'+idfact[0][0][0],crrprov,64,titulo);

        if($(this).attr('xml') == undefined){
            var tabla = $("#data-table-facturas").DataTable();
            tabla.destroy();
            $(this).parent().parent().remove();
            $("#data-table-facturas").dataTable({
                bFilter: false,
                bScrollInfinite: true,
                bSort: false,
                bLengthChange: false,
                order: [],
                bPaginate: false,
                info: false
            });
        }else{
            $("[xml=3]").addClass('hide');
            $("[xml=2]").addClass('hide');
            $("[xml=1]").removeClass('hide');
            $("[xml=4]").removeClass('hide');
            Dropzone.forElement("#registro-upload").removeAllFiles(true);
            Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
        }        
    }

});

$(document).on("click",".status",function(){
    if ($(this).is("[disabled]")) {
        event.preventDefault();
    }

    if($(this).attr('style').indexOf('lime') > -1){
        Materialize.toast('Documento Electrónico Aceptado',4000,'green');
        return false;
    }

    $(".status").attr('disabled',true)
    var vid = $(this).attr('id').substr(1);
    switch(parseInt($("input[name=tventa]:checked").attr('id').substr(2))){
        case 2:
        case 3:
            vid = '-'+vid;
            break;
        case 5:
        case 6:
        case 7:
            vid = '^'+vid;
            break;
        case 8:
            vid = '!'+vid;
            break;
        default:
            break;
    }
    $(this).removeClass('mdi-information-outline').addClass('mdi-spin mdi-loading')
    $.get('../wsdlClient.php',{accion:4,id:vid})
        .done(function(data){
            var ex;
            var p;
            var color = msj = colort = '';
            var state = 0;

            try{
                p = JSON.parse(data);
                switch(p['estado']){
                    case 'aceptado':
                        color = 'lime';
                        state = 1;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Aceptado' : p['rs'];
                        colort = 'green';
                        break;
                    case 'recibido':
                        color = 'light-green';
                        state = 9;
                        msj = 'Documento Electrónico Recibido';
                        colort = 'light-green';
                        break;
                    case 'rechazado':
                        color = 'red';
                        state = 3;
                        msj = !p['rs'].trim().length ? 'Documento Electrónico Rechazado' : p['rs'];
                        colort = 'red';
                        break;
                    case 'procesando':
                        color = 'yellow';
                        state = 2;
                        msj = 'Procesando Documento Electrónico';
                        colort = 'yellow'
                        break;
                    case 'Sin Subir':
                        msj = 'Sin Subir';
                        colort = 'blue';
                        color = 'blue';
                        state = 7;
                        break;
                    case 'Sin Internet':
                        color = 'blue';
                        state = 0;
                        msj = p['rs'];
                        colort = 'blue';
                        break;
                    case 'error':
                        state = 8;
                        color = 'red'
                        msj = 'Error en Documento Electrónico';
                        colort = 'red';
                        break;
                    default:
                        break;
                }

                if (state){
                    switch(parseInt($("input[name=tventa]:checked").attr('id').substr(2))){
                        case 2:
                        case 3:
                            vid = vid.substr(1);
                            $("#e"+vid).css('color',color);
                            arr('login',7,2,301,'feestado='+state,'id='+vid,0,0);
                            break;
                        case 5:
                        case 6:
                        case 7:
                        case 8:
                            vid = vid.substr(1);                    
                            $("#e"+vid).css('color',color);
                            arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
                            break;
                        default:
                            $("#e"+vid).css('color',color);
                            arr('login',7,2,64,'feestado='+state,'id='+vid,0,0);
                            break;
                    }
                    
                }
                //console.log(p+' '+msj)
                Materialize.toast(msj,6000,colort);
            }catch(ex){
                console.log(ex)
                console.log(data)
                Materialize.toast('Error Obteniendo Estado',6000,'red')
            }
            $(".status").attr('disabled',false)
            $("#e"+vid).removeClass('mdi-spin mdi-loading').addClass('mdi-information-outline');
            $("#e"+vid).css('color',color);
        });
});

$(document).on("click",".shcompra",function(){
    var dtcompra = getDatos('format(cantidad,2),idunidad,comodin,format(descuento,2),format(idpaquete,2),format(idimpuestos,2),format((precio*cantidad)+(imv*(1-(idpaquete/100)))-descuento,2) as total',263,'idfactura = '+$(this).parent().parent().attr('id').substr(2),0,0,0);
    $("#modal-shcompra").modal('open');
    $("#bdtompras").html();

    var str = '';
    for (var i = 0; i < dtcompra[0].length; i++) {
        str += '<tr> <td class="hide"><select class="browser-default tcompraa">'+opcompras+'</select></td> <td>'+dtcompra[0][i][0]+'</td><td>'+dtcompra[0][i][1]+'</td><td>'+dtcompra[0][i][2]+'</td><td>'+dtcompra[0][i][3]+'</td> <td>'+dtcompra[0][i][4]+'</td> <td>'+dtcompra[0][i][5]+'</td> <td>'+dtcompra[0][i][6]+'</td></tr>';
    }
    $("#bdtompras").html(str);
})


$(document).on("change","input[name=tventa]",function(){
    var id = parseInt($(this).attr('id').substr(2));
    $("#search_facturas").val('').attr('filtro',1);
    $("[fltr=1]").click();
    Materialize.updateTextFields();
    var tabla = $("#data-table-facturas").DataTable();
    tabla.destroy();
    
    arr('login',6,'',179,'0,0,"1,'+id+',@@impresa,0,0,'+$(".tpf.active").attr('tpf')+'","0,10"',0,1,$("#listafacturas"));
    console.log('0,0,"1,'+id+',@@impresa,0,0'+$(".tpf.active").attr('tpf')+'","0,10"')
    paginate($("ul.pagination").attr('vtbl'),undefined,'1,'+id+',@@impresa,0,0,'+$(".tpf.active").attr('tpf'))
    $("ul.pagination").attr('filtro_sp','1,'+id+',@@impresa,^,?,'+$(".tpf.active").attr('tpf'));
    $("#data-table-facturas").dataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });
});

function removeHacienda(file){
    //$("[xml='1']").addClass('disabledbutton');
    $("#myclave").val('');
    $("#mha").html('');
}

function xmlCargar(file,response){
    console.log(response)
    try{
        response = JSON.parse(response);
        var mced = getDatos('replace(cedula,"-","")',39,'id = @@impresa',0,0,0)[0][0][0];

        $.get('../wsdlClient.php',{accion:10,id:file['name'],hclave:$("#myclave").val(),ced:mced})
            .done(function(data){
                var p;
                $(".iloop").hide();
                try{
                    console.log(data)
                    p = JSON.parse(data);

                    if(!p.succed){
                        Materialize.toast(p['ERROR'],4000,'red');
                        return false;
                    }
                    p['clave'] = p['clave'].length == 50 ? p['clave'] : p['clave'][0]; 
                    var factura = getDatos('',287,p['clave'],0,0,0);

                    if(factura[0].length){

                        switch (parseInt(factura[0][0][0])) {
                            case 0:
                                Materialize.toast('Falta Mensaje de Hacienda',4000,'red');
                                break;
                            case 1:
                                $("[xml=3]").removeClass('hide').removeAttr('disabled');
                                $("#mha").html(factura[0][0][1]+', '+factura[0][0][2]+'<br>Impuesto: '+parseFloat(factura[0][0][3]).formatMoney(2,'.',',')+'<br>Total: '+parseFloat(factura[0][0][4]).formatMoney(2,'.',',')+'<br><select class="browser-default tcompraag" style="color:black">'+opcompras+'</select>');
                                $("#faapr").attr('idcompra',factura[0][0][21]);
                                break;
                            /*case 2:*/
                            case 2:
                                $("[xml=2]").removeClass('hide');
                                $("[xml=1]").addClass('hide');
                                $("[xml=4]").addClass('hide');

                                $(".shxml_head").html('<b>Factura: </b>'+p['clave'].substr(21,20)+', <b>Fecha:</b> '+factura[0][0][5]+', <b>Tipo Venta:</b> '+factura[0][0][6]+', <b>Tipo Pago:</b> '+factura[0][0][7]+', <b>Tipo Cambio:</b> '+factura[0][0][8]+'<br><b>Emisor:</b> </b>'+factura[0][0][1]+', <b>Ced.:</b> '+factura[0][0][2]+', <b>Correo:</b> '+factura[0][0][9]+'<input type="checkbox" name="icompra" id="invcompra"> <label style="float:right" for="invcompra" class="hide">Incluir al Inventario</label> <div class="row"><label class="col s2"><b>TIPO DE COMPRA</b></label><select class="browser-default tcompramg col s10">'+opcompras+'</select></div>');

                                var str = '';
                                

                                for (var i = 0; i < factura[0].length; i++) {
                                    str += '<tr class="ciclos" id="fd'+i+'"> <td class="hide"><select class="browser-default tcompram">'+opcompras+'</select></td> <td>'+factura[0][i][10]+'</td><td>'+factura[0][i][11]+'</td><td>'+factura[0][i][12]+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][13]).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][22]).formatMoney(2,'.',',')+'</td><td style="text-align:center;">'+parseFloat(factura[0][i][14]).formatMoney(2,'.',',')+'</td><td style="text-align:right;">'+parseFloat(factura[0][i][15]).formatMoney(2,'.',',')+'</td> </tr>';
                                }

                                $(".shxml_body").html(str);

                                $(".shxml_foot").html('<tr><td colspan="6" style="padding:0px;text-align:right;"><b>Gravado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][16]).formatMoney(2,'.',',')+'</td></tr>  <tr><td colspan="6" style="padding:0px;text-align:right;"><b>Exento</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][17]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="6" style="padding:0px;text-align:right;"><b>Exonerado</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][18]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="6" style="padding:0px;text-align:right;"><b>Descuentos</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][19]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="6" style="padding:0px;text-align:right;"><b>IVA</b></td><td colspan="2" style="padding:0px;text-align:right;">'+parseFloat(factura[0][0][3]).formatMoney(2,'.',',')+'</td></tr> <tr><td colspan="6" style="padding: 0px;text-align:right"><b>TOTAL</b></td><td colspan="2" style="padding: 0px;text-align:right">'+factura[0][0][20]+' '+parseFloat(factura[0][0][4]).formatMoney(2,'.',',')+'</td></tr>');

                                $("#faapr").attr('idcompra',factura[0][0][21]);
                                $("[xml=3]").removeClass('hide').removeAttr('disabled');

                                break;
                            case 3:
                                Materialize.toast('Documento Rechazado por Hacienda',4000,'red');
                                break;
                            case 5:
                                Materialize.toast('Documento Aceptado',4000,'red');
                                break;
                            case 6:
                                Materialize.toast('Documento Aceptado Parcial',4000,'red');
                                break;
                            case 7:
                                Materialize.toast('Documento Rechazado',4000,'red');
                                break;
                            default:
                                // statements_def
                                break;
                        }
                    }
                }catch(e){
                    $("[xml=1]").removeClass('hide');
                    $("[xml=2]").addClass('hide');
                    Materialize.toast('Error Extrayendo XML',4000,'red');
                    emptyDropzones()
                    console.log(data)
                    console.log(e)              
                }
            });
    }catch(f){
        Materialize.toast('Error Subiendo el XML',4000,'red')   
    }
};

function emptyDropzones() {
    var one = parseInt(Dropzone.forElement("#registro-upload").files.length);
    if (one) {
        Dropzone.forElement("#registro-upload").removeAllFiles(true);
    }else{
        var dos = parseInt(Dropzone.forElement("#hacienda-upload").files.length);
        if (dos) {
            Dropzone.forElement("#hacienda-upload").removeAllFiles(true);
            $("#myclave").val('');
            $("#mha").html('');
        }
    }

}


function validar (varreglo,vmodulo) {
    
    var salida = {}
    
        /*VALIDACION FRONT END*/
    
    switch(vmodulo['modulo']) {
        default:
            return 'Módulo no Existente';
            break;
    }

    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    return salida;

}


function endDetail(vid,vacc,vmodulo){
    switch(vmodulo){
        case 'factura':
            break;
        case 'cliente':
            break;
        default:
            break;
    }
    return false;
}

function cargar(vmodulo,vid) {


    switch(vmodulo['modulo']) {
        case 'documentos':
            vmodulo['sel'] = '';
            vmodulo['tbl'] = 3;
            vmodulo['where'] ='';
            break;
        default:
            return 'Módulo no Existente';
            break;
    }
    
    return vmodulo;
}

function cargarSintax(){
    var arr = {}

    arr['sel'] = '';
    arr['tbl'] = 4;
    arr['where'] = '';

    return arr;
}

function sendFE(clave,str_correos,vtabla,vtit){
    $.ajax({
        async: true,
        url: "../wsdlClient.php",
        type: 'POST',
        data: {id: clave, accion : 1,to:str_correos,idfila : clave,idtabla : vtabla,tit:vtit}
    })
      .done(function(data) {
        console.log(data);
  });
}

function postExcecute(vid,p){

    switch(parseInt(vid)){
        default:
            break;
    }
}

function postSendmail() {
}