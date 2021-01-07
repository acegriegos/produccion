var acc = 1;
var ind_1 = ind_2 = 1;
var numero = 0;
var delayTimer;
$(function(){
    $('.dropdown-button').dropdown();
    $('.tooltipped').tooltip({delay: 50,duration:1000});
    $('.modal').modal();   
    $('select').material_select();

    cargarMoneda(0);
});

$(window).keydown(function(e){
    var code = e.wich || e.keyCode
    switch(code){
        case 117: //ABRIR MENU
            $(".menu-btn").click();
            //$("#numtrans").focus();
            break;
        case 123: //F12
            return false;
            break;
        default:
            break;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 73)// Prevent Ctrl+Shift+I
        return false; 

    if (e.ctrlKey && e.keyCode == 83){// Prevent Ctrl+S
        abrirFlujo();
        return false;        
    }

    if (e.ctrlKey && e.keyCode == 73){// Prevent Ctrl+I
        $("#iva").click()
        return false;        
    }

    if (e.ctrlKey && e.keyCode == 79){// Prevent Ctrl+O
        $("#lproductos").click()
        return false;        
    }
});

$(document).on('click','.notasprod',function(){
    arr('login',6,'',334,'@@impresa,'+$(this).attr('tbl')+','+$(this).attr('row'),0,1,$("#_listanotas"));
    $("#mntNotas").attr('idtabla',$(this).attr('tbl')).attr('idfila',$(this).attr('row'));
    $("#_proname").html($(this).attr('name'));
    $("#modal-notasprod").modal('open')
    $("#_vnota").focus();
});

$(document).on('click','._enota',function(){
    $("#mntNotas").attr('tp',2)
    $("#mntNotas").attr('vid',$(this).parent().parent().attr('vid'));
    $("#_vnota").val($(this).parent().parent().find('td').eq(1).html()).focus();
});

$(document).on('click','._dnota',function(){
    console.log(eliminar(333,'id='+$(this).parent().parent().attr('vid')))
    Materialize.toast('Nota Elminada Correctamente',4000,'green');
    arr('login',6,'',334,'@@impresa,'+$("#mntNotas").attr('idtabla')+','+$("#mntNotas").attr('idfila'),0,1,$("#_listanotas"));
});

$(document).on('click','.closetoast',function(){
    $(this).parent().addClass('hide');
});

$(document).on('blur','[trg]',function(){
    $($(this).attr('trg')).val($(this).val().trim());
});

$(document).on('click','.rd-td',function(){
    $("#"+$(this).parent().attr('vid')).click();
});

$(document).on('dblclick','.rd-td',function(){
    $("#"+$(this).parent().attr('vid')).click();
    $("#acepfact").click();
});

$(document).on('click','.alv',function(){
    $(this).attr('disabled',true);
    setTimeout(function(){ $(".alv").removeAttr('disabled'); },2000);
});

$(document).on('click','.por-num',function(){
    var tipo = $(this).attr('tipo');
    if (tipo == 1 || tipo == undefined) {
        $(this).removeClass('mdi-percent');
        $(this).addClass('mdi-currency-usd');
        $(this).attr('tipo',2);
    }else{
        $(this).removeClass('mdi-currency-usd');
        $(this).addClass('mdi-percent');
        $(this).attr('tipo',1);
    }
});

$(document).on("click","#vtelefono",function(){
    $(this).parent().find('a').click()
    $("#telefono_in").focus();
});

$(document).on("click","#vcorreo",function(){
    $(this).parent().find('a').click()
    // $("#correo_in").focus();
});

$(document).on("click","#vdireccion",function(){
    $(this).parent().find('a').click()
    // $("#telefono_in").focus();
});

$(document).on("click","#eslide",function(){
    if($("#direccion_in:visible").length){
        if($("#vidbarrio").val() != null && $("#direccion_in").val().trim() == ''){
            Materialize.toast('Dirección Exacta Requerida',4000,'red')
            $("#direccion_in").focus();
            return false;
        }
        $("#slideDireccion").data('fila1')['vdireccion'] = $("#direccion_in").val();
        $("#slideDireccion").data('fila1')['vidbarrio'] = $("#vidbarrio").val() == null ? 0 : $("#vidbarrio").val();
    }

    if($("#vcorreo:visible").length && $("#correo_in:visible").length){
        $("#vcorreo").val($(".vcoo").html())
    }

    if($("#vtelefono:visible").length && $("#telefono_in:visible").length){
        $("#vtelefono").val($("._tel").html())
    }

    if($("#vdireccion:visible").length && $("#direccion_in:visible").length){
        $("#vdireccion").val($("#direccion_in").val())
    }

    $("#slide-tc").sideNav('hide');
});

$(document).on("click",".tc-show",function(){   

    var code = parseInt($(this).data('num'));

    if ($("#slide-cliente").length == 1)
            $(".s-cliente").sideNav('destroy');

    if ($("#slide-tc").length == 0) {
        var ul = '<ul id="slide-tc" class="side-nav" style="z-index:1500;padding-left:0.5%;"><li><div class="user-view center"><span class="ntit"></span></a></div></li><li><div class="divider"></div></li><li><div id="unico">Subheader</div> <button class="btn btn-default" id="eslide" style="width: 100%;bottom: 10%;position: absolute;">Salir</button></li></ul>';
        $(".bdy").append(ul);
    }
    
    $("#slide-tc").attr('num',code);
    $("#slide-tc").attr('el',$(this).attr('id'));

    $(".tc-show").sideNav('destroy');
    
    $(this).sideNav({
        menuWidth: 300,
        edge: 'right',
        closeOnClick: true,
        draggable: true,
        onOpen: function(){
            var titulo = cuerpo = '';

            switch(code){
                case 1: 
                    titulo = 'Teléfonos';
                    cuerpo = mantenimiento('ajustes',10,{vidfila:$(this).attr('slide-id'),vidtabla:$(this).attr('slide-tbl')});
                    break;
                case 2: 
                    titulo = 'Correos';
                    cuerpo = mantenimiento('ajustes',11,{vidfila:$(this).attr('slide-id'),vidtabla:$(this).attr('slide-tbl')});
                    break;
                case 3: 
                    titulo = 'Ubicación';
                    cuerpo = mantenimiento('ajustes',12,{vidfila:$(this).attr('slide-id'),vidtabla:$(this).attr('slide-tbl')});
                    break;
                default:
                    break;
            }

            $(".ntit").html('<b>'+titulo+'</b>');
            $("#unico").html(cuerpo);
            
            $("#unico").find(".pais").val("Costa Rica");
            $("#unico").find("#vidpais").val(52);
            Materialize.updateTextFields();
        }
    });

    $(this).sideNav('show');
    
});

$(document).on("keyup",".numeric",function(e){
    var code = e.wich || e.keyCode
    if(code == 13)
        $(this).blur()
});


$(document).on('keydown','.pais',function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $(this).autocomplete({
            limit: 20,
            data: arr('login',4,'nombre as nom,bandera',209,'id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
        });
        $(".autocomplete-content").css('width','100%');
    }
});

// direcciones

$(document).on("change","#provincia[tipo=1]",function(){
    var tipo = parseInt($(this).attr('tipo'));
    var tbl = $(this).attr('vtbl');
    llenarDireccion(tipo,tbl,$(this).val());
});

$(document).on("change","#canton[tipo=2]",function(){
    var tipo = parseInt($(this).attr('tipo'));
    var tbl = $(this).attr('vtbl');
    llenarDireccion(tipo,tbl,$(this).val());
});

$(document).on("change","#viddistrito[tipo=3]",function(){
    var tipo = parseInt($(this).attr('tipo'));
    var tbl = $(this).attr('vtbl');
    llenarDireccion(tipo,tbl,$(this).val());
}); 

function llenarDireccion(tp,tbl,id) {
    var elem = '';
    var whr = 'id > 0';
    if (tp == 1) {
        elem = 'canton';
        whr += ' and idprovincia = '+id+' order by nombre';
    }else if(tp == 2) {
        elem = 'viddistrito';
        whr += ' and idcanton = '+id+' order by nombre';
    }else if(tp == 3) {
        elem = 'vidbarrio';
        whr += ' and iddistrito = '+id+' order by nombre';
    }
    tp++;
    $("#"+elem+"[tipo="+tp+"]").prop('disabled',false);
    arr('login',6,'id,nombre',tbl,whr,15,1,$("#"+elem+"[tipo="+tp+"]"))
    $("#"+elem+"[tipo="+tp+"]").material_select();
}

$(document).on("blur",".pais",function(){
    var nombre = $(this).val();
    var idpais = arr('login',4,'id',209,'nombre = "'+nombre+'"',0,0,0)[0][0];

    idpais != undefined ? 0 : idpais;
    $(this).attr('vid',idpais);
});

$(document).on("click",".detallefactura",function(){
    $("#btndetfact").click()
    var id = $(this).attr('id').substr(1);
    var estado = $(this).attr('estado');
    var tabla= $("#data-table-cuentas-detalle").DataTable();
    tabla.destroy();
    var datos=  arr('login',6,'',303,id,0,1,$("#listaCuentasNotaDetalle"));

    if (config[5] == 1){
        $("#tipoimpresion").attr('checked',true);
    }else{
        $("#tipoimpresion").attr('checked',false);
    }

    $('select').material_select();

    switch (parseInt(estado)) {
        case 1:
            $("#data-table-cuentas-detalle").dataTable({

                bFilter: false,
                order : [],
                "bLengthChange": false
            });

            $("#btn-navsalir").click(function(){
                
                $('#detfacturag').sideNav('hide');

            });
            
            $("#btn-divsalir").click(function(){

                $(".divabono").hide();
                $(".divabono").attr('visible',0);

            });

            $("#btn-anular").click(function(){
                var saldo = $("#isaldo").html().replace(/,/g,'').trim().substring(1);
                $("#vvalor").val(saldo);
                $("#vcomentario").val('Factura anulada debido a: ').focus();     
            });
            
            $("#btn-div").click(function(){
                var vi = $(".divabono").attr('visible');
                if (parseInt(vi) == 0) {
                    $(".divabono").show();
                    $(".divabono").attr('visible',1);
                }else{
                    $(".divabono").hide();
                    $(".divabono").attr('visible',0);
                }
            });
            break;
        default:
            break;
    }

});

$(document).on("blur",".numeric",function(){
    $(this).val(parseFloat($(this).val().replace(/,/g,'')).formatMoney(2,'.',',') )
})

$(document).on("blur",".autocomplete",function(){
    $(".autocomplete-content").hide('500');
});

$(document).on("keyup",".autocomplete",function(e){
    var code = e.which || e.keyCode;
    if (code == 27)
     $(".autocomplete-content").hide('500');
 
});

$(document).on("click",".load",function(){
    var modulo = $(this).attr('modulo');
    var arreglo = {};
    arreglo['modulo'] = modulo;
    deadclear(modulo);
    var varreglo = loadpool(arreglo,$(this).attr('id').substr(1),$(this).attr('varias'));
});

$(document).on("click",".add",function(){
    var modulo = $(this).attr('modulo');
    var varias = $(this).attr('varias');
    acc = 1;
    doGlobal(1,modulo,'',varias);
});

$(document).on("click",".edit",function(){
    var modulo = $(this).attr('modulo');
    var varias = $(this).attr('varias');
    acc = 2;
    doGlobal(2,modulo,'',varias); 
});

$(document).on("click",".delete",function(){
    
    if ($(this).attr('cnt') == undefined) {
        if(!$("#_DEL").length){
            var id = $(this).attr('id');
            $(this).attr('mbg',$(this).parent().parent().css('background-color'));
            var $toastContent = $('<span id="_DEL" >Desea Eliminar Este Registro? </span>').add($('<a class="btn red" style="margin:2px" id="deldef" inid="'+id+'">Elminar</a> <a class="btn btn-default" id="delcan" inid="'+id+'">Cancelar</a>'));
            Materialize.toast($toastContent,10000,'',function(){if($("#"+id) != undefined) $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'))});
            $(this).parent().parent().css('background-color','#ed5249');
        }
    }else{
        
        var modulo = $(this).attr('modulo');
        var id = $(this).attr('id').substr(1);
        vari = $(this).attr('tip') == undefined ? 'vid' : $(this).attr('tip') ;
        acc = 3;
        $(this).removeAttr('cnt');
        doGlobal(3,modulo,id,0);
    }
});

$(document).on("click",".delete-row",function(){

    if ($(this).attr('cnt') == undefined) {
        if(!$("#_DEL").length){
            var id = $(this).attr('id');
            $(this).attr('mbg',$(this).parent().parent().css('background-color'));
            var $toastContent = $('<span id="_DEL" >Desea Eliminar Este Registro? </span>').add($('<a class="btn red" style="margin:2px" id="deldef" inid="'+id+'">Elminar</a> <a class="btn btn-default" id="delcan" inid="'+id+'">Cancelar</a>'));
            Materialize.toast($toastContent,10000,'',function(){if($("#"+id) != undefined) $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'))});
            $(this).parent().parent().css('background-color','#ed5249');
        }
    }else{
        deleterow($(this))
    }
});

$(document).on("click","#deldef",function(){
    var id = $(this).attr("inid");
    $(this).attr('disabled',true)
    $(this).parent().remove();
    $("#"+id).attr('cnt',1);
    $("#"+id).click();
});

$(document).on("click","#delcan",function(){
    var id = $(this).attr("inid");
    $("#"+id).parent().parent().css('background-color',$("#"+id).attr('mbg'));
    $(this).parent().remove();
});

$(document).on("click",".optns",function(){
    $(this).parent().parent().parent().find("[id^=search_]").attr('filtro',$(this).attr('fltr'))
    $(this).parent().parent().parent().find("[for^=search_] span").html($(this).html())
});

$(document).on("keyup",".buscarNom",function(e){
    var charCode = e.which || e.keyCode;
    if (charCode == 13) {
        $(this).blur();
    } 
});

$(document).on("blur",".buscarNom",function(e){
    if($(this).val().trim().length){
        $(this).attr('readonly','true')
    $.get('../sic.php?',{ced:$(this).val()})
        .done(function(data){
            var p = JSON.parse(data);
            if (p['succed']) {
                $(".c-st").addClass('hide');
                
                switch(parseInt(p['tip'])){
                    case 1:
                    case 4:
                        $(".c-stp1").removeClass('hide');
                        $("[for='c-nom']").html('Nombre');
                        break;
                    default:
                        $("[for='c-nom']").html('Razón Social');
                        $(".c-stp2").removeClass('hide');
                        break;
                }
                $("#c-ced").val(p['ced']);
                // $("#c-ap1").val(p['ap1']);
                // $("#c-ap2").val(p['ap2']);
                $("#c-nom").val(p['nom']);
                $("#c-nom").attr('tipo',p['tip']);
            }else
                Materialize.toast(p['error'],4000,'red');

            $(".buscarNom").removeAttr('readonly');
            Materialize.updateTextFields();
        });
    }
});

$(document).on("keyup",".buscarNombre",function(e){
    var charCode = e.which || e.keyCode;
    if (charCode == 13) {
        $(this).blur();
    } 
});

$(document).on("blur",".buscarNombre",function(e){
    if($(this).val().trim().length){

        $(this).attr('readonly','true')
        numero = $(this).attr('num');
    $.get('../sic.php?',{ced:$(this).val()})
        .done(function(data){
            var p = JSON.parse(data);
            if (p['succed']) {
                $(".c"+numero+"-st").addClass('hide');
                
                switch(parseInt(p['tip'])){
                    case 1:
                    case 4:
                        $(".c"+numero+"-stp1").removeClass('hide');
                        $("[for='c"+numero+"-nom']").html('Nombre');
                        break;
                    default:
                        $("[for='c"+numero+"-nom']").html('Razón Social');
                        $(".c"+numero+"-stp2").removeClass('hide');
                        break;
                }
                $("#c"+numero+"-ced").val(p['ced']);
                $("#c"+numero+"-ap1").val(p['ap1']);
                $("#c"+numero+"-ap2").val(p['ap2']);
                $("#c"+numero+"-nom").val(p['nom']);
                $("#c"+numero+"-nom").attr('tipo',p['tip']);
            }else
                Materialize.toast(p['error'],4000,'red');

            $(".buscarNombre [num="+numero+"]").removeAttr('readonly');
            Materialize.updateTextFields();
        });
    }
});

$(document).on("keyup","[id^=search_]",function(e){
    // var code = e.which || e.keyCode
    // if (code == 13) {
        clearTimeout(delayTimer);
        var elem = $(this);
        delayTimer = setTimeout(function() {    
            var a = elem.val().replace(/"/g,'\\\"');
            var b = elem.prop('id').substr(7);
            var c = elem.attr('num').substr(1);
            var e = elem.attr('var');
            var g = elem.attr('cambio') != undefined ? elem.attr('cambio') : 0;
            var j = elem.attr('filtro') == undefined ? 1 : elem.attr('filtro');
            var h = $("ul.pagination").attr('filtro_sp') == undefined ? a+',@@impresa' : $("ul.pagination").attr('filtro_sp').replace('?',a).replace('^',j);
            var i = arr('login',4,'',c,e+',"'+h+'",""',0,0,0)[0][0];
            
            filltable(h,b,c,g);
            $(".pagination").html('');
            paginate(c,i)
        }, 500);
    //}
});

function doGlobal(accion,modulo,tip,varias){

    var arreglo = {}
    arreglo['modulo'] = modulo;
    arreglo['tip'] = tip;
    arreglo['atributos'] = baseValidar(1,arreglo);

    if (varias == 1) {
        arreglo['varios'] = {};
        $("#f"+modulo+"s [vtabla]").each(function(index){
            var arr = {}
            
            arr['modulo'] = $(this).attr('vtabla');
            arr['tip'] = tip;
            arr['atributos'] = baseValidar(1,arr);
            arr['hasTabla'] = $(this).attr('hasTabla') == undefined ? 0 : 1;
            arr['rollback'] = $(this).attr('rollback') == undefined ? 0 : $(this).attr('rollback');
            arreglo['varios'][index] = arr;
        });
    }
    if (arreglo['atributos'] == "[object Object]"){
        arreglo['atributos']['vaccion'] = accion;
        var p = mantenimiento('login',2,arreglo);
        
        if (p['succed'] == 0) {
            Materialize.toast(p[0]['ERROR'], 4000, 'red');
        }else{
         
            var tmsj = "Ingresado";
            if (accion == 2) {
                tmsj = "Actualizado";
            }else if(accion == 3) {
                tmsj = "Eliminado";
            }

            Materialize.toast('Registro '+tmsj+' Correctamente', 4000, 'green');
            id = p[0][0];
            endDetail(id,acc,modulo);
        }

    }else{
        Materialize.toast(arreglo['atributos'], 4000, 'red');
    }
};

function baseValidar(vaccion,vmodulo){
    var salida = {}
    var varreglo = mantenimiento('login',vaccion,vmodulo);
    if ( varreglo['succed'] == 1){
        salida = validar(varreglo[0],vmodulo);
        if (vmodulo['tip'] != '') {
            salida[vari] = vmodulo['tip'];
        }
    }else{
        return varreglo[0]['ERROR'];
    }

    return salida;
}

function getData(vmodulo){
    var dt = mantenimiento('login',1,{modulo:vmodulo});
    if (dt['succed']) {
        var salida = '$("#f'+vmodulo+'s .zelda").data("triforce",{';
        for (var i = 0; i < dt[0].length; i++) {
            salida += dt[0][i]+":'',";
        }
        salida = salida.slice(0,-1);
    }
}

function loadpool(vmodulo,vid,vvarias){
    
    vmodulo = cargar(vmodulo,vid);
    if (vmodulo['sel'] == undefined){
        Materialize.toast(vmodulo,4000,'red');
        return false
    }
    
    vform = 'f'+vmodulo['modulo']+'s';
    var columns = mantenimiento('login',5,vmodulo);
    
    for (var i = 0; columns[0][1].length > i; i++) {

        switch($("#"+vform+" #"+columns[0][1][i]['name']).attr("type")){
            case 'select':

            if ($("#"+vform+" #"+columns[0][1][i]['name']).attr('multiple') == undefined){
                $("#"+vform+" #"+columns[0][1][i]['name']).val(columns[0][0][0][i]);
                $("#"+vform+" #"+columns[0][1][i]['name']).material_select('update');
                
                if (columns[0][0][0][i] != '') 
                    $("#"+vform+" #"+columns[0][1][i]['name']).change();
            }
            else{
                $("#"+vform+" #"+columns[0][1][i]['name']).material_select('destroy');
                $.each(columns[0][0][0][i].split(","), function(j,e){
                    $("#"+vform+" #"+columns[0][1][i]['name']+" option[value='" + e + "']").attr("selected", true);
                });

            }

            if ($("#"+vform+" #"+columns[0][1][i]['name']).attr('defecto') != undefined)
                $("#"+vform+" #"+columns[0][1][i]['name']).attr('defecto',columns[0][0][0][i])

            break;

            case 'radio':
            case 'checkbox':

            var obj = $("#"+vform+" input[name="+columns[0][1][i]['name']+']');
            obj.val(columns[0][0][0][i]);
            obj.prop('checked',columns[0][0][0][i]);
            obj.change();
            break;

            case 'html':
            $("#"+vform+" #"+columns[0][1][i]['name']).html(columns[0][0][0][i]);
            break;

            case 'date':
            $("#"+vform+" #"+columns[0][1][i]['name']).pickadate().pickadate('picker').set('select', columns[0][0][0][i]);
            break;
            case 'textarea':
            case 'text':
            case 'number':
            case 'password':
            case 'time':
            $("#"+vform+" #"+columns[0][1][i]['name']).val(columns[0][0][0][i]);
            break;
            case 'hidden':
            if ($("#"+vform+" #"+columns[0][1][i]['name']).attr("fill") == undefined){
                $("#"+vform+" #"+columns[0][1][i]['name']).val(columns[0][0][0][i]);
            }
            else
                arr('login',6,'',$("#"+vform+" #"+columns[0][1][i]['name']).attr("fill"),$("#vid").val()+","+$("#"+vform+" #"+columns[0][1][i]['name']).attr("tbl"),0,1,$("#"+vform+" #"+columns[0][0][0][i]));
            break;
            default:
                $("#"+vform+" .zelda").data('triforce')[columns[0][1][i]['name']] = columns[0][0][0][i];
            break;

        };           
        
    }

    $("select").material_select();
    Materialize.updateTextFields();

    try{
        postload(vmodulo['modulo']);
    }catch(e){
    }
}

function mantenimiento(vmodulo,vaccion,varreglo,vjson){
    var p;
        if (vjson)
            varreglo['JSON'] = vjson

        $.ajax({
            async: false,
            url: '../dashboard/'+vmodulo,
            type: 'POST',
            data: {accion: vaccion,arreglo : varreglo}
        })
        .done(function(data) {
            try {
                p = JSON.parse(data);
            }
            catch(err){
                p = data;
            }
        })
        .fail(function(x,y,z){
            console.error(x)
        });
    return p;
}

function mantenimiento_async(vmodulo,vaccion,varreglo,vid,vjson){
    var p;
    var stack = new Error().stack || '';
    stack = stack.split('\n').map(function (line) { return line.trim(); });
    stack = stack.splice(stack[0] == 'Error' ? 2 : 1);
    if(stack.length <= 2){
        p = 'Get Lost';
    }else{
        // source.close();
        if (vjson)
            varreglo['JSON'] = vjson

        $.ajax({
            url: '../dashboard/'+vmodulo,
            type: 'POST',
            data: {accion: vaccion,arreglo : varreglo}
        })
        .done(function(data) {
            
            try {
                p = JSON.parse(data);
            }
            catch(err){
                p = data;
            }
            postExcecute(vid,p);
        });
    }
    // setTimeout(function(){source = new EventSource("../sse.php")},5000);
    return true;
}

function actualizar(vtabla,varg1,varg2){
    return arr('login',7,2,vtabla,varg1,varg2,0,0,0);
}

function insertar(vtabla,varg1,varg2){
    return arr('login',7,1,vtabla,varg1,varg2,0,0,0);
}

function eliminar(vtabla,varg1){
    return arr('login',7,3,vtabla,varg1,'',0,0,0);
}

function arr(vref,vaccion,vsel,vtbl,vwhere,vcambio,vch,velemto,vjson,votros = ''){
    var arr = {};

    if(vref == 'login' && vaccion == 7){
        arr['accion'] = vsel;
        arr['tabla'] = vtbl;
        arr['arg1'] = vwhere;
        arr['arg2'] = vcambio;
    }else{
        arr['sel'] = vsel;
        arr['tbl'] = vtbl;
        arr['where'] = vwhere;
        if (vcambio != '') 
            arr['cambio'] = vcambio;

        if (vjson == undefined)
            vjson = 0;
    }

    for (var i = 0; i < votros.length; i++) {
        arr[votros[i][0]] = votros[i][1];
    }
    
    if (vch){
        velemto.html(mantenimiento(vref,vaccion,arr,vjson));
        return true;
    }
    else
        return mantenimiento(vref,vaccion,arr,vjson);

};

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function validarCorreo(valor) {
    if(/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(valor))
        return 1
    else{
        Materialize.toast('Correo no Válido',4000,'red');
        return 0;
    }
}

function enviarCorreo(vaccion,vto,vsubject,vbody,vadjunto,vconcon,vidfila,vidtabla) {

   $.ajax({
        url: '../_config/correoAjax.php',
        type: 'POST',
        data: {accion: vaccion,to : vto, subject : vsubject, body : vbody, adjunto : vadjunto,con_con : vconcon,idfila : vidfila,idtabla : vidtabla}
    })
   .done(function(data) {
        console.log(data);
        
        if($("#smail").is(':visible')){
            Materialize.toast('Correo Enviado &nbsp;&nbsp; <i class="mdi mdi-check"></i>',4000,"green");
            $("#smail").html('')
        }else{
             $(".expect_mail").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
        }
        
        try{
            postSendmail();
        }catch(e){
        } 
    })
   .fail(function(x) {
        console.log("ERROR de Correo: "+x)
        Materialize.toast( "Error Enviando Correo",4000,'red');
    });
}

function odin(varreglo,vform) {
    //revisar detalles, esta guardando con index y si se borra una linea va a dar error
    var salida = {};
    var valorOdin;

    switch($("#"+vform).attr('tp')){
        case "1":
    //LLENADO DE VARIABLES POR ATRIBUTO EN DETALLE
    $("#"+vform+" .ciclos").each(function(index){
        salida[index] = {};
        for (var i = 0; i < varreglo.length; i++) {
            salida[index][varreglo[i][0]] = $(this).attr(varreglo[i][0]);
            }// end FOR
        });//end EACH
    break;

    case "2":
    //LLENADO DE VARIABLES POR ATRIBUTO SIN DETALLE
    for (var i = 0; i < varreglo.length; i++) {
        salida[varreglo[i][0]] = $("#"+vform+" .uniq").attr(varreglo[i][0]);
        }// end FOR
        break;

    case "3":
    //LLENADO DE VARIABLES POR ID EN DETALLE
    $("#"+vform+" .ciclos").each(function(index){
        salida[index] = {};
        for (var i = 0; i < varreglo.length; i++) {
            if ($("#"+vform+" #"+varreglo[i][0]).attr('hid') != undefined)
                salida[index][varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).attr('hid');
            else{
                switch(varreglo[i][0]) {
                    case 'vaccion':
                    salida[index][varreglo[i][0]] = 0;
                    break
                    case 'vidtabla':
                    case 'vidfila':
                    salida[index][varreglo[i][0]] = 0;//$("#"+vform+" #vtabla").val();
                    break;
                    default:
                    if (/vfecha/.test(varreglo[i][0])){
                        if (typeof $("#"+vform+" #"+varreglo[i][0]) == 'undefined') {
                            salida[index][varreglo[i][0]] = '1990-01-01';
                        }else{
                            salida[index][varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ? 
                            '1990-01-01' : $("#"+vform+" #"+varreglo[i][0]).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');
                        }
                    }else{
                        switch($("#"+vform+" #"+varreglo[i][0]).attr("type")){
                            case 'select':
                            if($("#"+vform+" #"+ varreglo[i][0]).attr('multiple') == undefined)
                                salida[index][varreglo[i][0]] =  $("#"+vform+" #"+ varreglo[i][0]+" option:selected").val() == undefined ? $("#"+vform+" #"+ varreglo[i][0]+" option").val() : $("#"+vform+" #"+ varreglo[i][0]+" option:selected").val();
                            else
                                salida[index][varreglo[i][0]] = $("#"+vform+" #"+ varreglo[i][0]).val().toString();

                            break;
                            case 'text':
                            case 'textarea':
                            valorOdin = $("#"+vform+" #"+varreglo[i][0]).val().replace(/"/g,'\"');
                            valorOdin = $("#"+vform+" #"+varreglo[i][0]+".numeric").length ? valorOdin.replace(/,/g,'') : valorOdin;
                            salida[index][varreglo[i][0]] = valorOdin;
                            break;
                            case 'hidden':
                            case 'number':
                            valorOdin = $("#"+vform+" #"+varreglo[i][0]).val();
                            valorOdin = $("#"+vform+" #"+varreglo[i][0]+".numeric").length ? valorOdin.replace(/,/g,'') : valorOdin;
                            salida[index][varreglo[i][0]] = valorOdin;
                            break;
                            case 'html':
                            salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).html();
                            break;
                            case 'radio':
                            salida[index][varreglo[i][0]] = $("#"+vform+" input[name='"+varreglo[i][0]+"']:checked").val();
                            break;
                            case 'checkbox':
                            salida[index][varreglo[i][0]] = $("#"+vform+" input[name='"+varreglo[i][0]+"']").is(":checked") ? 1 : 0;
                            break;
                            default:
                            try{
                                salida[index][varreglo[i][0]] = $("#"+vform+" .zelda").data('triforce')[varreglo[i][0]];
                            }
                            catch(e){
                                console.log(varreglo[i][0]+" No Existe");
                                return "Error Interno, Codigo: Odin"
                            } 
                            break;
                            
                        }//END SWITCH
                }//end if
                }//end SWITCH
            }//end IF
            salida[index][varreglo[i][0]] = salida[index][varreglo[i][0]] == '' && (varreglo[i][1].indexOf('int') >= 0 || varreglo[i][1].indexOf('decimal') >= 0) && (varreglo[i][0] != 'vidusuario' || varreglo[i][0] != 'vidsucursal') ? 0 : salida[index][varreglo[i][0]];
            }// end FOR
        });//end EACH
break;

case "4":
    //LLENADO DE VARIABLES POR DATA EN DETALLE

    $("#"+vform+" .ciclos").each(function(index){
        salida[index] = {};
        for (var i = 0;  i < varreglo.length; i++) {
            salida[index][varreglo[i][0]] = $(this).data('triforce')[varreglo[i][0]];

            salida[index][varreglo[i][0]] = salida[index][varreglo[i][0]] == '' && (varreglo[i][1].indexOf('int') >= 0 || varreglo[i][1].indexOf('decimal') >= 0) && (varreglo[i][0] != 'vidusuario' || varreglo[i][0] != 'vidsucursal' ) ? 0 : salida[index][varreglo[i][0]];
            if (salida[index][varreglo[i][0]] == undefined) {
                if (varreglo[i][0] == 'vidfila' || varreglo[i][0] == 'vidtabla') {
                    varreglo[i][0] = 0;
                }else{
                    console.log(varreglo[i][0]+" No Existe, "+vform);
                    return "Error Interno, Codigo: Odin"
                }
                
            }
            }// end FOR
    });//end EACH
    
    break;
case "5":
        for (var i = 0; i < varreglo.length; i++) {
            salida[varreglo[i][0]] = $("#"+vform+" .zelda").data('triforce')[varreglo[i][0]];

            salida[varreglo[i][0]] = salida[varreglo[i][0]] == '' && (varreglo[i][1].indexOf('int') >= 0 || varreglo[i][1].indexOf('decimal') >= 0) && (varreglo[i][0] != 'vidusuario' || varreglo[i][0] != 'vidsucursal') ? 0 : salida[varreglo[i][0]];
        }
        break;
case "6":
    if ($("#"+vform).data('fila1') != undefined) {
            var num = 1;
            while($("#"+vform).data('fila'+num) != undefined){
                salida[num] = {};
            for (var i = 0;  i < varreglo.length; i++) {
                salida[num][varreglo[i][0]] = $("#"+vform).data('fila'+num)[varreglo[i][0]];
                salida[num][varreglo[i][0]] = salida[num][varreglo[i][0]] == '' && (varreglo[i][1].indexOf('int') >= 0 || varreglo[i][1].indexOf('decimal') >= 0) && (varreglo[i][0] != 'vidusuario' || varreglo[i][0] != 'vidsucursal' ) ? 0 : salida[num][varreglo[i][0]];
                if (salida[num][varreglo[i][0]] == undefined && varreglo[i][0] != 0) {
                    if (varreglo[i][0] == 'vidfila' || varreglo[i][0] == 'vidtabla') {
                        varreglo[i][0] = 0;
                    }else{
                        console.log(varreglo[i][0]+" No Existe,num: "+num+",form: "+vform);
                        return "Error Interno, Codigo: Odin"
                    }
                    
                }
                }// end FOR
                
                if($("#"+vform).data('fila'+num)['vaccion'] == '3')
                    $("#"+vform).removeData('fila'+num);

                num++;
            }
        }
    break;
default:

    //LLENADO DE VARIABLES POR ID SIN DETALLE
    for (var i = 0; i < varreglo.length; i++) {
        if ($("#"+vform+" #"+varreglo[i][0]).attr('hid') != undefined){
            salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).attr('hid');
        }
        else{
            switch(varreglo[i][0]) {
                case 'vaccion':
                salida[varreglo[i][0]] = 0;
                break
                case 'vidtabla':
                salida[varreglo[i][0]] = $("#"+vform+" #vidtabla").val() == undefined ? 0 : $("#"+vform+" #vidtabla").val();
                break;
                default:
                if (/vfecha/.test(varreglo[i][0]) && $("#"+vform+" #"+varreglo[i][0]).length){
                    if (typeof $("#"+vform+" #"+varreglo[i][0]) == 'undefined') {
                        salida[varreglo[i][0]] = '1990-01-01';
                    }else{
                        if ($("#"+vform+" #"+varreglo[i][0]).hasClass('datepicker')) {
                        salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ? 
                        '1990-01-01' : $("#"+vform+" #"+varreglo[i][0]).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');
                        }else
                            salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).val()
                    }
                }else{
                    switch($("#"+vform+" #"+varreglo[i][0]).attr("type")){
                        case 'select':
                        if ($("#"+vform+" #"+varreglo[i][0]).attr("multiple") == undefined) {
                            salida[varreglo[i][0]] = $("#"+vform+" #"+ varreglo[i][0]+" option:selected").val() == undefined ? $("#"+vform+" #"+ varreglo[i][0]).val() : $("#"+vform+" #"+ varreglo[i][0]+" option:selected").val();
                        }else{
                            salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).val().toString();
                        }
                        break;
                        case 'file':
                        salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).attr('src');
                        break;
                        case 'text':
                        case 'textarea':
                        valorOdin = $("#"+vform+" #"+varreglo[i][0]).val().replace(/"/g,'\"');
                        valorOdin = $("#"+vform+" #"+varreglo[i][0]+".numeric").length ? valorOdin.replace(/,/g,'') : valorOdin;
                        salida[varreglo[i][0]] = valorOdin;
                        break;
                        case 'hidden':
                        case 'password':
                        case 'time':
                        case 'number':
                        case 'email':
                        valorOdin = $("#"+vform+" #"+varreglo[i][0]).val();
                        valorOdin = $("#"+vform+" #"+varreglo[i][0]+".numeric").length ? valorOdin.replace(/,/g,'') : valorOdin;
                        salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).val();
                        break;
                        case 'html':
                        salida[varreglo[i][0]] = $("#"+vform+" #"+varreglo[i][0]).html();
                        break;
                        case 'radio':
                        salida[varreglo[i][0]] = $("#"+vform+" input[name='"+varreglo[i][0]+"']:checked").val() == undefined ? 0 : $("#"+vform+" input[name='"+varreglo[i][0]+"']:checked").val();
                        break;
                        case 'checkbox':
                        salida[varreglo[i][0]] = $("#"+vform+" input[name='"+varreglo[i][0]+"']").is(":checked") ? 1 : 0;
                        break;
                        default:
                            if($("#"+vform+" .zelda").data('triforce')[varreglo[i][0]] != undefined)
                                salida[varreglo[i][0]] = $("#"+vform+" .zelda").data('triforce')[varreglo[i][0]];
                            else{
                                console.log(varreglo[i][0]+" No Existe, "+vform );
                                return "Error en Interno, Codigo: Odin"
                            } 
                        break;
                    }
                }
                break;
            }//end SWITCH
        }//end IF
        salida[varreglo[i][0]] = salida[varreglo[i][0]] == '' && (varreglo[i][1].indexOf('int') >= 0 || varreglo[i][1].indexOf('decimal') >= 0) && varreglo[i][0] != 'vidusuario' && varreglo[i][0] != 'vidsucursal' ? 0 : salida[varreglo[i][0]];
    }//end FOR
    break;
    }//end SWITCH
    return salida;
}

function deadclear(vform) {
    
    if (acc == 1) {
        vform = "#f"+vform+"s";
        /*REGLAS PARA VACIAR CAMPOS*/
        $(vform+" [type]").each(function(){
            if ($(this).attr('noClear') == undefined && $(this).prop('id') != '') { 
                switch($(this).attr('type')){
                    case 'checkbox':
                    $(vform+" :input[name='"+$(this).prop('name')+"'][stay='1']").prop('checked', true);
                    $(vform+" :input[name='"+$(this).prop('name')+"'][stay='0']").prop('checked',false);
                    
                    $(this).change();
                    break;
                    case 'radio':
                    //SI ES RADIO SOLO PONER ATRIBUTO PRINCIPAL PARA EL CUAL QUIERE MANTENER CHECKED
                    $(vform+" :input[name='"+$(this).prop('name')+"'][principal='1']").click();
                    break;
                    case 'number':
                    case 'textarea':
                    case 'text':
                    case 'password':
                    case 'time':
                    $(vform+" #"+$(this).prop('id')).val('');
                    break;
                    case 'select':
                    if ($(vform+" #"+$(this).prop('id')).val() == undefined)
                        $(vform+" #"+$(this).prop('id')).val(0)
                    $(vform+" #"+$(this).prop('id')).material_select('update');
                    break;
                    default:
                    break;
                };
                
            }
        });
        
    } else
    acc = 1;
    Materialize.updateTextFields();
}

function thorload(vtabla) {
    vtabla += "s";

    if ($("#search_"+vtabla).val() != undefined && $("#search_"+vtabla).val() != ""){
        var e = jQuery.Event("keyup");
        e.which = 13;
        $("#search_"+vtabla).trigger(e);
    }
    else{
        var arreglo = cargarSintax(vtabla);
        var tbl = mantenimiento('login',6,arreglo);
        var tabla = $("#data-table-"+vtabla).DataTable();
        tabla.destroy();
        $("#lista"+vtabla).html(tbl);
        $("#data-table-"+vtabla).DataTable({
            bFilter: false,
            bScrollInfinite: true,
            bSort: false,
            bLengthChange: false,
            order: [],
            bPaginate: false,
            info: false
        });
    }

    // $('.modal').modal();

}

function addZero(n, len) {
    return (new Array(len + 1).join('0') + n).slice(-len);
}

function permisos(vnumber,vnumber2) {
    $.ajax({
        async: false,
        url: '../_config/permisos.php',
        type: 'POST',
        data: {x1 : vnumber, x2 : vnumber2}
    })
    .done(function(data) {
        p = JSON.parse(data);
        for (var i = 0; i < p.length; i++) {
            var op = parseInt(p[i][3]);
            switch(parseInt(op)){
                case 1:
                $(".per"+p[i][1]).removeClass('hide');
                break;
                case 2:
                $(".per"+p[i][1]).attr('readonly',true);
                break;
                case 3:
                $(".per"+p[i][1]).addClass('hide');
                break;
            }
        };
    })
    .fail(function(x,y,z) {
        
    });
}

Number.prototype.formatMoney = function(c, d, t){
    var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function InitDropzone(vmaxfiles,vmultiple,vurl,velemento,vautoprocess,vfiles,funcionAdded = '',funcionRemoved = '',funcionFinish = ''){
    if(!vfiles){
        vfiles = '*';
    }
    myDropzone = new Dropzone(velemento, {
        url: vurl,
        autoProcessQueue:vautoprocess,
        maxFilesize: 1,
        maxFiles: vmaxfiles,
        addRemoveLinks:true,
        uploadMultiple: vmultiple,
        acceptedFiles: vfiles,
        init: function() {
            this.on("addedfile", function(file) {
                $(velemento).find('.imgDrop').hide();
                if (funcionAdded != '')
                    funcionAdded
               
            });
            this.on("removedfile", function(file) {
                if (!$(velemento+" .dz-preview").length) {
                    $(velemento).find('.imgDrop').show();
                }
                if (funcionRemoved != '')
                    funcionRemoved(file)
            });
            this.on('error', function(file, response) {
                console.log(response)
            });
            this.on('success', function(file, response) {
                if (funcionFinish != '')
                    funcionFinish(file,response)
            });
        }
    });

    $(".dz-message").show();
}

function change_load(vto,vtabla,vval,vset){
    if (vto != '') {
        var tmp = $('#'+vto+' option').first().html();
        $('#'+vto).html('<option value="">'+tmp+'</option>');
        var res = arr('login',4,vval,vtabla,vset,0,0,0)[0];
        for (var i = 0; i < res.length; i++) {
            $('#'+vto).append('<option value="'+res[i][0]+'">'+res[i][1]+'</option>');
        }
        $('#'+vto).material_select('update');
    }
};


function convert(a, b, c, d) {
    // a = idproducto | b = cantidad | c = unidad a convertir | d = precio
    var precio = arr('login',4,'',154,a+','+b+','+c+','+d,0,0,0)[0][0];
    return precio
}

var barChartData = {
  labels: ["2002", "2003", "2004", "2005", "2006", "2007", "2008", "2010", "2011", "2011", "2012", "2013", "2014", "2015"],
  datasets: [{
    label: 'Revenues',
    backgroundColor: "#BBB",
    data: [1450000, 1750000, 1700000, 1510000, 1400000, 1400000, 1535000, 1590000, 1620000, 1590000, 1630000, 1350000, 1350000, 1700000]
  }, {
    label: 'Expenses',
    backgroundColor: "#ceb947",
    data: [1650000, 1600000, 1350000, 1550000, 1300000, 1350000, 1350000, 1390000, 1410000, 1400000, 1700000, 1300000, 1300000, 1455000]
  }, {
    label: 'Poly. (Revenues)',
    type: 'line',
    borderWidth: 0.1,
    pointRadius: 0,
    backgroundColor: "rgba(187, 187, 187, 0.25)",
    data: [1450000, 1750000, 1700000, 1510000, 1400000, 1400000, 1535000, 1590000, 1620000, 1590000, 1630000, 1350000, 1350000, 1700000]
  }, {
    label: 'Poly. (Expenses)',
    type: 'line',
    borderWidth: 0.1,
    pointRadius: 0,
    backgroundColor: "rgba(206, 185, 71, 0.25)",
    data: [1650000, 1600000, 1350000, 1550000, 1300000, 1350000, 1350000, 1390000, 1410000, 1400000, 1700000, 1300000, 1300000, 1455000]
  }]
};

function dibujarGrafico(elemento,texto,etiqueta,tipo,varr,colbase,coldata,colbel) {

    arr['JSON'] = 1;

    var jsonData = $.ajax({
        url: 'login',
        Type: 'POST',
        data: {accion:4,arreglo:varr},
    }).done(function (results) {
        
        results = JSON.parse(results);

        var backgroundColor = [
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(255, 206, 86)',
        'rgb(75, 192, 192)',
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)'
        ];
        var borderColor = [
        'rgba(54, 162, 235, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(255,99,132,1)',
        'rgba(255, 159, 64, 1)'
        ];

        var config1 = {
            type: tipo,
            datasets:[],
            options: {
                responsive: true,
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: texto
                },
                animation: {
                    animateScale: true,
                    animateRotate: true
                },
            },
        };
        var vbase = '';
        var dataset = [];
 
        for ( var i = 0;i < results[0].length; i++) {

            if (vbase != results[0][i][colbase]) {
                if (vbase != ''){
                    config1['datasets'] = dataset;
                    vbase = results[0][i][colbase];
                }

                dataset = [];
                dataset.push({'label':results[0][i][colbel]});
                dataset.push({'backgroundColor':backgroundColor[i]});
                dataset.push({'borderColor': borderColor[i]});
                dataset.push({'data':[] });
                    
            }       
            
            // dataset['data'].push(results[0][i][coldata]);
        }

        config1['datasets'] = dataset;

        switch(tipo){
            case 'bar':
                config1['options']['scales'] = {yAxes:[{ticks:{beginAtZero:true,}}]}
                break;
            default:
                break;
        };
        
        // var ctx = document.getElementById(elemento).getContext("2d");
        // var myLineChart = new Chart(ctx,config1);
    });
};

function rexcel(){
    var filtros = $(".inpreport").length;
    var elem = $(".principal .filtros").attr('elem').split(',');
    elem = $(".principal .filtros").attr('elem').indexOf(',') == -1 ? [] : elem;
    var vtbl = $(".principal .filtros").attr('sp');
    var atributos = '';
    var vmodulo = {};
    vmodulo['modulo'] = $(".principal .filtros").attr('modulo');
    var search = new Array;
    var datos = mantenimiento('login',1,vmodulo)[0];
    datos = datos.splice(elem.length,datos.length-elem.length);

    for (var i = 0, len = datos.length; i < len; i++) {

        if($("#"+datos[i][0]).attr('change') == undefined){

        if ($("#"+datos[i][0]).attr('str') != undefined) {
            if ($("#"+datos[i][0]).attr('type') == 'date') {
                
                if ( $("#"+datos[i][0]).val()=='' ){
                    search[i] = '""';
                }else{
                    search[i] = '"'+$("#"+datos[i][0]).val()+'"';
                }
            }else{
                search[i] = '"'+$("#"+datos[i][0]).val()+'"';
            }
        }else{
            if ($("#"+datos[i][0]).val() == '') {
                search[i] = '""';
            }else{
                search[i] = '"'+$("#"+datos[i][0]).val()+'"';
            }
        }

        if (datos[i][0] == 'vidsucursal')
            search[i] = '@@impresa';
    
        }else{
            search[i] = $("#"+datos[i][0]).attr('change');
        }
    }

    var string = elem.concat(search);
    $.each(string,function(index){
        atributos += string[index]+',';
    });  
    atributos = atributos.substr(0,atributos.length-1).replace(/&/g,',');

    return {tbl:vtbl,vatr:atributos};
}

function rreport(){
    var filtros = $(".inpreport").length;
    var elem = $(".principal .filtros").attr('elem').split(',');
    elem = $(".principal .filtros").attr('elem').indexOf(',') == -1 ? [] : elem;
    var tbl = $(".principal .filtros").attr('sp');
    var orden = $(".excel").data('parametros')['vista'] == undefined ? '' : $(".excel").data('parametros')['vista'];
    var conteo = $(".excel").data('parametros')['conteo'] == undefined ? '' : $(".excel").data('parametros')['conteo'];
    var suma = $(".excel").data('parametros')['suma'] == undefined ? '' : $(".excel").data('parametros')['suma'];
    var align = $(".excel").data('parametros')['align'] == undefined ? '' : $(".excel").data('parametros')['align'];
    var original = $(".excel").data('parametros')['original'] == undefined ? 0 : 1;
    var chg = $(".principal .filtros").attr('chg') == undefined ? 0 : $(".principal .filtros").attr('chg');
    
    if(original)
        var otros = '';
    else
        var otros = Array(Array('orden',orden),Array('conteo',conteo),Array('suma',suma),Array('align',align));
    var atributos = '';
    var vmodulo = {};
    vmodulo['modulo'] = $(".principal .filtros").attr('modulo');
    var search = new Array;
    var datos = mantenimiento('login',1,vmodulo)[0];
    datos = datos.splice(elem.length,datos.length-elem.length);

    for (var i = 0, len = datos.length; i < len; i++) {

        if ($("#"+datos[i][0]).val() != undefined) {
            search[i] = '"'+$("#"+datos[i][0]).val()+'"';
        }
        else if (datos[i][0] == 'vidsucursal')
            search[i] = '@@impresa';
        else if (datos[i][0] == 'vidusuario')
            search[i] = '@@user';
        else
            search[i] = 'null';
    }

    var string = elem.concat(search);
    $.each(string,function(index){
        atributos += string[index]+',';
    });  
    atributos = atributos.substr(0,atributos.length-1).replace(/&/g,',');

    return {vtbl:tbl,vattr:atributos,votros:otros,vchg:chg};
}


function doreport() {
    
    var resultado = rreport();

    console.log('TABLA: '+resultado['vtbl']+' - ATRR: '+resultado['vattr']+' - OTROS: '+resultado['votros']);
    if($("#cabeza").length){
        var cabeza = $("#cabeza")[0].outerHTML;
    }
    arr('login',6,'',resultado['vtbl'],resultado['vattr'],resultado['vchg'],1,$(".detrep"),0,resultado['votros']);

    try {
        rxlxs(cabeza);
    } catch(e) {
    }

}

$(document).on("change","._det",function(){
    var vto = $(this).attr('id');
    // ver xq putas sale el undefined
    if (vto != undefined) {
        var vprev = $("[det='"+vto.substr(3)+"']").attr('prev');
        var vsig = $("[det='"+vto.substr(3)+"']").attr('sig');
        var vtabla = $("[det='"+vsig.substr(3)+"']").attr('d-b');
        var vprimary = $(this).attr('primary');

        if (vprimary && vprev == '' && $("#"+vsig).val() != '') {
            $("._det[primary!=1]").val(0);
            $("select").material_select();
        }
        change_load(vsig,vtabla,'id,nombre','id > 0 and '+vto.substr(1)+' = '+$('option:selected',this).val());
    }
    
});

$(document).on('click',"[det]",function(){
    var vdet = $(this).attr('det');
    var tabla = $(this).attr('d-b');
    var previo = $(this).attr('prev');

    if ($("."+vdet).is(":visible")) {
        $("."+vdet).hide();
        $("."+vdet).parent().append('<div class="_'+vdet+'"><a class="prefix btn-floating red btn-small tooltipped" data-position="button" data-tooltip="Ingresar" href="#!" style="width: 2.5rem" det="'+vdet+'" prev="'+previo+'" d-b="'+tabla+'" id="_'+vdet+'"><i class="fa fa-plus" id="icon'+vdet+'"></i></a> <label for="ing_'+vdet+'">'+vdet.toUpperCase()+'</label> <input type="text" id="ing_'+vdet+'" d-b="'+tabla+'" prev="'+previo+'" d-e-t="'+vdet+'"></div>');
        $("#icon"+vdet).removeClass('fa-plus');
        $("#icon"+vdet).addClass('fa-arrow-left');
        $('#ing_'+vdet).focus();
    }else{
        $("._"+vdet).remove();
        var set = 'id > 0';
        if (previo != '')
            set += " and "+previo.substr(1)+" = "+$("#"+previo+" option:selected").val(); 
        change_load('vid'+vdet,tabla,'id,nombre',set);
        $("."+vdet).show();
    }
    
});

$(document).on("keyup","[id^=ing_]",function(e){
    var code = e.wich || e.keyCode
    if (code == 13) {
        if($(this).val() == ''){
            Materialize.toast("Valor Incorrecto",4000,'red');
            $(this).select();
        }else{
            var tabla = $(this).attr('d-b');
            var insert = 'nombre,idusuario,idsucursal';
            var values = '"'+$(this).val()+'",@@usr,@@impresa';
            if($(this).attr('prev') != ''){
                insert += ','+$(this).attr('prev').substr(1);
                values += ','+$('#'+$(this).attr('prev')+' option:selected').val();
            }
            arr('login',7,1,tabla,insert,values,0,0);
            $("#_"+$(this).attr('d-e-t')).click();
        }
    }
});

function getDatos(vsel,vtbl,vwhere,vcambio=0,velemto=0,vjson=0){
    var vch = velemto == '' || velemto == 0 ? 0: 1;
    return arr('login',4,vsel,vtbl,vwhere,vcambio,vch,velemto,vjson)
}

function getDatos_col(vfila,vidh,velemto,vheader,vmodulo,vomit,vacc){
    var arr = {};

    arr['sel'] = '';
    arr['tbl'] = 175;
    arr['where'] = vfila+',@@impresa,@@usr,'+vidh;
    arr['header'] = vheader;
    arr['modulo'] = vmodulo;
    arr['omit'] = vomit;
    arr['acc'] = vacc;
    if (velemto != undefined) {
        velemto.html(mantenimiento('login',10,arr,0));
        return true;
    }else
        return mantenimiento('login',10,arr,0);
}

function cargarMoneda(idmoneda,elemento){

    var divisas = undefined;

    if (elemento == undefined){
        elemento = $(".moneda");
        divisas = $(".divisa");
    }
    else{
        elemento = $("#"+elemento+" .moneda");
        divisas = $("#"+elemento+" .divisa");
    }

    var moneda = getDatos('nombre,simbolo,valor+suma as valor,id',54,'if( '+idmoneda+' = 0,principal = 1,id = '+idmoneda+')',0,0)[0][0];

    elemento.html('<b>'+moneda[1]+'</b>');
    
    if (idmoneda != 0) {
        var valor = elemento.first().data("triforce")["valor"];
        
        divisas.each(function(){
            var monto = pre = tot = 0;
            monto = parseFloat($(this).is("input") ? $(this).val().replace(/,/g,'') : $(this).html().replace(/,/g,''));  
            var pmonto = $(this).attr('mreal') == undefined ? parseFloat(moneda[2]) : parseFloat($(this).attr('mreal'));

            if (pmonto != 1){
                $(this).attr('base',monto);

                pre = monto / pmonto; 
                tot = parseFloat(pre * valor).toString().split(".");
                decimals = tot[1] == undefined ? 0 : tot[1];
                real = tot[0];
                tot = decimals > 2 ? parseFloat(real+"."+decimals.substr(0,2))+0.01 : parseFloat(real+"."+decimals);
            }else
                tot = parseFloat($(this).attr('base'));
            console.log($(this).attr('id')+' '+tot)
            if ($(this).is("input"))
                $(this).val(tot.formatMoney(2,'.',','));
            else{
                $(this).html(tot.formatMoney(2,'.',','));
            }
            
        })
    }

    elemento.first().data("triforce",{nombre:moneda[0], simbolo: moneda[1], valor: moneda[2], id: moneda[3]}); 
}

function mostrar_cargar(){
    $("#smail").html('<div class="preloader-wrapper small active"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div> <br> Enviando...');
}

// <-- pagination
function filltable(h,b,c,g) {
    var tabla = $("#data-table-"+b).DataTable();
    tabla.destroy();
    arr('login',6,'',c,'0,0,"'+h+'","0,10"',g,1,$("#lista"+b));
    $("#data-table-"+b).DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    });
}

function paginate(vtbl,len,vfiltro) {
    
    $(".pagination").html('');
    if (vfiltro == undefined)
        vfiltro = ',@@impresa';
    
    if (len == undefined) {
        countpag = arr('login',4,'',vtbl,'0,1,"'+vfiltro+'",""',0,0,0)[0][0];
    }else
        countpag = len;

    if (countpag >= 9) {
        $(".pagination").append('<li class="waves-effect"><a href="#!"><i class="mdi-chevron-left mdi mdi-24px prv"></i></a></li><li class="active paginate" id="z1" limit="0,10"><a href="#!">1</a></li><li class="waves-effect paginate" id="z2" limit="10,10"><a href="#!">2</a></li><li class="waves-effect paginate" id="z3" limit="20,10"><a href="#!">3</a></li><li class="waves-effect paginate" id="z4" limit="30,10"><a href="#!">4</a></li><li class="waves-effect paginate" id="z5" limit="40,10"><a href="#!">5</a></li><li class="waves-effect paginate" id="z6" limit="50,10"><a href="#!">6</a></li><li class="waves-effect paginate" id="z7" limit="60,10"><a href="#!">7</a></li><li class="waves-effect paginate" id="z8" limit="70,10"><a href="#!">8</a></li><li class="waves-effect paginate" id="z9" limit="80,10"><a href="#!">9</a></li><li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-right nxt"></i></a></li>');
        $(".pagination").attr('ultimo', 9);
    } else if (parseFloat(countpag) == 0) {
        $(".showing[modulo="+vtbl+"] small").html("Mostrando <span class='pag-desde'>0</span> a <span class='pag-hasta'>0</span> de <span class='pag-tot'>0</span> Entradas")
        return false;
    } else if (parseFloat(countpag) < 1) {
       
    } else {
        var txt = '<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-left prv"></i></a></li>';
        for (var i = 1; i <= Math.ceil(countpag); i++) {
            if (i == 1)
                txt += '<li class="active paginate" id="z' + i + '" limit="0,10"><a href="#!">' + i + '</a></li>';
            else
                txt += '<li class="waves-effect paginate" id="z'+i+'" limit="'+(i-1)+'0,10"><a href="#!">' + i + '</a></li>';
            
            $(".pagination").attr('ultimo', i);
        }
        $(".pagination").append(txt+'<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-right nxt"></i></a></li>');
    }

    var phasta = parseInt(countpag*10) >= 10 ? 10 : parseInt(countpag*10);

    $(".showing[modulo="+vtbl+"] small").html("Mostrando <span class='pag-desde'>1</span> a <span class='pag-hasta'>"+phasta+"</span> de <span class='pag-tot'>"+parseInt(countpag*10)+"</span> Entradas")
}

$(document).on("click", ".paginate", function () {

    var limit = $(this).attr('limit');
    var vtbl = $("ul.pagination").attr('vtbl');
    var modulo = $("ul.pagination").attr('modulo');
    
    if ($("#search_"+modulo).val() == undefined) {
        manualPaginate(limit);
        $(".paginate").removeClass('active')
        $(this).addClass('active');
        var numl = parseInt($('a',this).html());
        var nfin = (parseInt(limit.substr(limit.indexOf(',')+1).trim())*numl);
        var ntot = parseInt($(".showing[modulo="+vtbl+"] .pag-tot").html());
        var nshow = nfin-ntot >= 0 ? ntot : nfin;
        
        $(".showing[modulo="+vtbl+"] .pag-desde").html((parseInt(limit.substr(0,limit.indexOf(',')).trim())+1))
        $(".showing[modulo="+vtbl+"] .pag-hasta").html(nshow)
        return false;
    }
    
    var cambio = $("ul.pagination").attr('cambio') == undefined ? 0 : $("ul.pagination").attr('cambio');
    var id = $(this).attr('id').substr(1);
    
    var filtro = $("#search_"+modulo).val().replace(/"/g,'\\\"');
    var j = $("#search_"+modulo).attr('filtro') == undefined ? 1 : $("#search_"+modulo).attr('filtro');
    var filtro_sp = $("ul.pagination").attr('filtro_sp') == undefined ? filtro+',@@impresa' : $("ul.pagination").attr('filtro_sp').replace('?',filtro).replace('^',j);
    $(".paginate").removeClass('active')
    $(this).addClass('active');
    llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio)
    var numl = parseInt($('a',this).html());
    var nfin = (parseInt(limit.substr(limit.indexOf(',')+1).trim())*numl);
    var ntot = parseInt($(".showing[modulo="+vtbl+"] .pag-tot").html());
    var nshow = nfin-ntot >= 0 ? ntot : nfin;
    
    $(".showing[modulo="+vtbl+"] .pag-desde").html((parseInt(limit.substr(0,limit.indexOf(',')).trim())+1))
    $(".showing[modulo="+vtbl+"] .pag-hasta").html(nshow)
});

$(document).on("click", ".nxt", function () {

    var modulo = $("ul.pagination").attr('modulo');
    var vtbl = $("ul.pagination").attr('vtbl');
    var ultimo = $(".pagination").attr('ultimo');
    var cambio = $("ul.pagination").attr('cambio') == undefined ? 0 : $("ul.pagination").attr('cambio');
    var filtro = $("#search_"+modulo).val() == undefined ? '' : $("#search_"+modulo).val().replace(/"/g,'\\\"');
    var j = $("#search_"+modulo).attr('filtro') == undefined ? 1 : $("#search_"+modulo).attr('filtro');
    var filtro_sp = $("ul.pagination").attr('filtro_sp') == undefined ? filtro+',@@impresa' : $("ul.pagination").attr('filtro_sp').replace('?',filtro).replace('^',j);
    var id = parseInt($("ul.pagination > li.active").attr('id').substr(1));
    var next = id + 1;
    var pags = next - 8;

    if (pags <= 0)
        pags = 1;

    if (ultimo == id) {
        var count = arr('login',4,'',vtbl,'0,1,"'+filtro_sp+'",""',0,0,0)[0][0];
        if (Math.ceil(count) != ultimo) {
            $(".pagination").html('<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-left prv"></i></a></li>');
            for (var i = pags; i <= next; i++) {
                i = parseInt(i);

                $(".pagination").append('<li class="waves-effect paginate" id="z' + i + '" limit="'+(i-1)+'0,10"><a href="#!">' + i + '</a></li>');
                if (i == next)
                    $(".pagination").attr('ultimo', i);
            }
            $(".pagination").append('<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-right nxt"></i></a></li>');
            $(".paginate").removeClass('active');
            $("#z" + next).addClass('active');
            var limit = $("#z" + next).attr('limit');
        }
    } else {
        var limit = $("#z" + next).attr('limit');
        $(".paginate").removeClass('active');
        $("#z" + next).addClass('active');      
    }
    llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio)

    if ($("#z"+next+" a").html() == undefined)
        return

    var numl = parseInt($("#z"+next+" a").html());
    var nfin = (parseInt(limit.substr(limit.indexOf(',')+1).trim())*numl);
    var ntot = parseInt($(".showing[modulo="+vtbl+"] .pag-tot").html());
    var nshow = nfin-ntot >= 0 ? ntot : nfin;
    
    $(".showing[modulo="+vtbl+"] .pag-desde").html((parseInt(limit.substr(0,limit.indexOf(',')).trim())+1))
    $(".showing[modulo="+vtbl+"] .pag-hasta").html(nshow)
});

$(document).on("click", ".prv", function () {
    var modulo = $("ul.pagination").attr('modulo');
    var vtbl = $("ul.pagination").attr('vtbl');
    var count = $(".pagination").attr('ultimo');
    var cambio = $("ul.pagination").attr('cambio') == undefined ? 0 : $("ul.pagination").attr('cambio');
    var filtro = $("#search_"+modulo).val() == undefined ? '' : $("#search_"+modulo).val().replace(/"/g,'\\\"');
    var j = $("#search_"+modulo).attr('filtro') == undefined ? 1 : $("#search_"+modulo).attr('filtro');
    var filtro_sp = $("ul.pagination").attr('filtro_sp') == undefined ? filtro+',@@impresa' : $("ul.pagination").attr('filtro_sp').replace('?',filtro).replace('^',j);
    var id = parseInt($("ul.pagination > li.active").attr('id').substr(1));
    var prev = id - 1;
    var prv = prev - 8;
    if (prev == 0)
        return false;
    else {
        if (count == id) {
            if (prv > 0 && prev > 0) {
                $(".pagination").html('<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-left prv"></i></a></li>');
                if (prv != 0) {
                    for (var i = prv; i <= prev; i++) {
                        i = parseInt(i);
                        $(".pagination").append('<li class="waves-effect paginate" id="z' + i + '" limit="'+(i-1)+'0,10"><a href="#!">' + i + '</a></li>');
                        if (i == prev)
                            $(".pagination").attr('ultimo', i);
                    }
                    $(".pagination").append('<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-right nxt"></i></a></li>');
                } else {
                    $(".pagination").html('<li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-left prv"></i></a></li><li class="active paginate" id="z1" limit="0,10"><a href="#!">1</a></li><li class="waves-effect paginate" id="z2" limit="10,10"><a href="#!">2</a></li><li class="waves-effect paginate" id="z3" limit="20,10"><a href="#!">3</a></li><li class="waves-effect paginate" id="z4" limit="30,10"><a href="#!">4</a></li><li class="waves-effect paginate" id="z5" limit="40,10"><a href="#!">5</a></li><li class="waves-effect paginate" id="z6" limit="50,10"><a href="#!">6</a></li><li class="waves-effect paginate" id="z7" limit="60,10"><a href="#!">7</a></li><li class="waves-effect paginate" id="z8" limit="70,10"><a href="#!">8</a></li><li class="waves-effect paginate" id="z9" limit="80,10"><a href="#!">9</a></li><li class="waves-effect"><a href="#!"><i class="mdi mdi-24px mdi-chevron-right nxt"></i></a></li>');
                    $(".pagination").attr('ultimo', 9);
                }
                $(".paginate").removeClass('active');
                $("#z" + prev).addClass('active');
                var limit = $("#z" + prev).attr('limit');
                llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio)
               } else {
                $(".paginate").removeClass('active');
                $("#z" + prev).addClass('active');
                var limit = $("#z" + prev).attr('limit');
                llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio)
            }
        } else {
            var limit = $("#z" + prev).attr('limit');
            $(".paginate").removeClass('active');
            $("#z" + prev).addClass('active');
           
            var filtro = $("#search_"+modulo).val().replace(/"/g,'\\\"');
            llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio)
        }
    }
    if ($("#z"+prev+" a").html() == undefined)
        return
    var numl = parseInt($("#z"+prev+" a").html());
    var nfin = (parseInt(limit.substr(limit.indexOf(',')+1).trim())*numl);
    var ntot = parseInt($(".showing[modulo="+vtbl+"] .pag-tot").html());
    var nshow = nfin-ntot >= 0 ? ntot : nfin;

    $(".showing[modulo="+vtbl+"] .pag-desde").html((parseInt(limit.substr(0,limit.indexOf(',')).trim())+1))
    $(".showing[modulo="+vtbl+"] .pag-hasta").html(nshow)
});
// pagination -->

//TELEFONOS Y CORREOS

$(document).on('click','.del_mail',function(){
    vid = $(this).attr('id').substr(1);
    if (vid.indexOf('_') != 0)
        $(this).parent().parent().remove();
    else{
        //CONFIRMACION
        arr('login',7,3,17,'id = '+vid,'',0,0);
        $(this).parent().parent().remove();
    }
});

$(document).on('click','.del_phone',function(){
    vid = $(this).attr('id').substr(1);
    if (vid.indexOf('_') != 0)
        $(this).parent().parent().remove();
    else{
        //CONFIRMACION
        arr('login',7,3,17,'id = '+vid,'',0,0);
        $(this).parent().parent().remove();
    }
});

function now() {
    var date = new Date();
    date = date.getFullYear()+"-"+addZero(date.getMonth()+1,2)+"-"+addZero(date.getDate(),2);
    return date;
}

// fast client
$(document).on('keydown','[addG=1]',function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("[addG=1]").autocomplete({
            limit: 20,
            data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
        });
        $(".autocomplete-content").css('width','30%');
    }
});
$(document).on('keyup','[addG=1]',function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var isClie = findClient($(this).val(),0);
        if (!isClie) {
            var op = parseInt($(this).attr('addG'));
            addGeneral(op);
        }
    }
});
$(document).on('blur','[addG=1]',function(){
    if ($(this).val() != '') {
        var isClie = findClient($(this).val(),1);
        if (!isClie) {
            var op = parseInt($(this).attr('addG'));
            addGeneral(op);
        }
    }
});

$(document).on('click','.loadRefBussiness',function(){
    if ($(this).attr('ex') != undefined) {
        if($(this).attr('ex').size){
            Materialize.toast($(this).attr('msj'))
            return false;
        }
    }
    $("#sucname").html($(this).html());
    mantenimiento('main',3,$(this).attr('suc'));
    location.reload();
});


function llenarTablaPaginate(modulo,vtbl,filtro_sp,limit,cambio){
    $("#data-table-"+modulo).append('<tbody id="loadbody"><tr><td colspan="100"><i class="mdi mdi-spin mdi-refresh mdi-48px center"></i></td><tr></tbody>');
    $("#lista"+modulo).addClass('hide');
    var tabla = $("#data-table-"+modulo).DataTable();
    tabla.destroy();
    arr('login',6,'',vtbl,'0,0,"'+filtro_sp+'","'+limit+'"', cambio, 1, $("#lista"+modulo));
    console.log('0,0,"'+filtro_sp+'","'+limit+'"')
    $("#data-table-"+modulo).DataTable({
        bFilter: false,
        bScrollInfinite: true,
        bSort: false,
        bLengthChange: false,
        order: [],
        bPaginate: false,
        info: false
    }); 
    setTimeout(function(){
        $("#loadbody").remove();
        $("#lista"+modulo).removeClass('hide');
    }, 500);
    
}

function findClient(nom,blr) {
    var clie = getDatos('',63,'\"'+nom+'\",0,@@tmp_cia',0,0,0);
    if (nom != '') {
        if (clie[0][0][0] != 0) {
            var vclie = clie[0][0];
            $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] = vclie[0];
            $("#ncli").val(vclie[1]+' '+vclie[2]);
            cargarTblFincas();
            return true;
        }else{
            $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] = 0;
            if (!$(".clientNotFound").is(':visible')) {
                var $toastContent = $('<span>Cliente no Existente</span>').add($('<button class="btn-flat toast-action green white-text clientNotFound" tp="1">Agregarlo</button>'));
                Materialize.toast($toastContent, 5000);
            }else{
                if (blr == 0)
                    $(".clientNotFound").click();
            }
            return false;
        }
    }
}

$(document).on('click','.clientNotFound',function(){
    if ($(this).attr('tp') == 1) {
        $(".titadd").html("Agregar Cliente");
    }
    $("#pais").val('Costa Rica');
    $("#pais").blur();
    var tmpname = $("#ncli").val();
    $("#modal-generalCliente #nombre").val(tmpname.indexOf(' ') > 0 ? tmpname.substring(0,tmpname.indexOf(' ')) : tmpname);

    $("#fclientes .zelda").data('triforce')['vnombre'] = tmpname.indexOf(' ') > 0 ? tmpname.substring(0,tmpname.indexOf(' ')) : tmpname;

    tmpname = tmpname.substring(tmpname.indexOf(' ')+1);

    $("#fclientes .zelda").data('triforce')['vapellido1'] = tmpname.substring(0,tmpname.indexOf(' '));

    $("#modal-generalCliente #apellido1").val(tmpname.substring(0,tmpname.indexOf(' ')));
    tmpname = tmpname.indexOf(' ') > 0 ? tmpname.substring(tmpname.indexOf(' ')+1) : '';

    $("#fclientes .zelda").data('triforce')['vapellido2'] = tmpname;

    $("#modal-generalCliente #apellido2").val(tmpname);
    Materialize.updateTextFields();
    $("#modal-generalCliente").modal();
    $("#modal-generalCliente").modal('open');
    $("#cedula").focus();

});

$(document).on('keyup','.validateMail',function(e){
    var code = e.wich || e.keyCode;
    if(code == 13)
        $(this).blur()
});

$(document).on('blur','.validateMail',function(){
    if (!$(this).val().match(/^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i) && $(this).val().trim().length) {
        Materialize.toast('Correo no Válido',4000,'red');
        $(this).select().focus();
    }
});

// fast product
$(document).on('keydown','[addG=2]',function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        $("[addG=2]").autocomplete({
            limit: 20,
            data: arr('login',4,'nombre,null',16,'id > 0 having nombre like "%'+$(this).val()+'%" limit 20',0,0,0,1)
        });
        $(".autocomplete-content").css('width','30%');
    }
});
$(document).on('keyup','[addG=2]',function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        var isServ = findService($(this).val(),0);
        if (!isServ) {
            var op = parseInt($(this).attr('addG'));
            addGeneral(op);
        }
        $(".autocomplete-content").remove();
    }
});
$(document).on('blur','[addG=2]',function(){
    if ($(this).val() != '') {
        var isServ = findService($(this).val(),1);
        if (!isServ) {
            var op = parseInt($(this).attr('addG'));
            addGeneral(op);
        }
    }
});
function findService(nom,blr) {
    var vserv = getDatos('id,nombre',16,'nombre = "'+nom+'"',0,0,0);
    if (nom != '') {
        if (vserv[0][0] != undefined) {
            vserv = vserv[0][0];
            $(".zelda").data('triforce')['vidservicio'] = vserv[0];
            $("#vvariedad").val(vserv[1]);
            return true;
        }else{
            $(".zelda").data('triforce')['vidservicio'] = 0;
            if (!$(".serviceNotFound").is(":visible")) {
                var $toastContent = $('<span>Variedad no Existente</span>').add($('<button class="btn-flat toast-action green white-text serviceNotFound" tp="2">Agregarlo</button>'));
                Materialize.toast($toastContent, 5000);
            }else{
                if (blr == 0)
                    $(".serviceNotFound").click();
            }
            return false;
        }
    }
}
$(document).on('click','.serviceNotFound',function(){
    var tmpname = $("#vvariedad").val();
    $("#modal-generalServicio #vnombre").val(tmpname);
    $("#fservicios .zelda").data('triforce')['vnombre'] = tmpname;
    Materialize.updateTextFields();
    $("#modal-generalServicio").modal();
    $("#modal-generalServicio").modal('open');
    $("#modal-generalServicio #vcodigo").focus();

});
function addGeneral(op) {
    switch (op) {
        case 1: //clientes
            if ($("#fclientes").length > 0) {
                $("#modal-clientes").html('');
                ingGeneral(1);
            }else{
                reconstruirModal(1);
            }
            break;
        case 2: //servicios
            if ($("#fservicios").length > 0) {
                $("#modal-servicios").html('');
                ingGeneral(2);
            }else{
                reconstruirModal(2);
            }
            break;
        case 3: //fincas
            if ($("#ffincas").length > 0) {
                $("#modal-fincas").html('');
                ingGeneral(3);
            }else{
                reconstruirModal(3);
            }
            break;
        case 4: //productos
    }
}
function ingGeneral(tp) {

}

function reconstruirModal(tp) {
    var p = mantenimiento('main',4,tp);
    $("#modalMainGeneral").html(p);
    $("modal").modal();
    // var str = '';
    // var nombres = invvar[0][1].split(',');
    // var ids = invvar[0][0].split(',');
    // $.each(invvar[0][0].split(","), function(j,e){
    //     str += '<option value="'+ids[j]+'">'+nombres[j]+'</option>';
    // });
    // $("#vidinventario").append(str);

    $("select").material_select();
    Materialize.updateTextFields();
    // $(".zelda").removeData();
    if (tp == 1) {
        $("#fclientes .zelda").data('triforce',{vid : 0,vapellido1 : '',vapellido2 : '',vnombre : '',vcedula : '',vidtipocliente : 1,videstado : 1,vbisproveedor : 0,vidnivel : 0,vcredito : 0,vplazo : 0,videstadocontable : 0,vbisnacional : 1,vweb : '',vdescuentom : 0,vcodigo : '',vidcuenta : 0,_sid : '@@@'});
    }else if (tp == 2) {
        var vinv = getDatos('idinventario',907,'idsucursal = @@impresa order by idtipoinventario',0,0)[0];
        $("#fservicios .zelda").data('triforce',{vaccion:0,vid:0,vcodigo:'',vnombre:'',vdescripcion:'',vpbase:0,vperiodo:0,vdias:0,vidproveedor:0,vprecio:0,vpganancia:0,vidinventario:vinv,vidusuario:0,vidmoneda:1,vidsucursal:'',vservprofesional:0,vidsuc:-1});

        // vaccion,vid,vcodigo,vnombre,vdescripcion,vpbase,vperiodo,vdias,vidproveedor,vprecio,vpganancia,vidinventario,vidusuario,vidmoneda,vidsucursal,vservprofesional,vidsuc
    }
}

function keysight(e) {
    e = e.keyCode || e.wich;
    var t={1:"!",2:"@",3:"#",4:"$",5:"%",6:"^",7:"&",8:"*",9:"(",0:")",13:"",16:"",20:"",37:"",38:"",39:"",40:"",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",61:"=",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",108:"13",109:"-",110:".",111:"/",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",223:"`"};
    var salida = t[e];
    //salida = salida == undefined ? 0 : salida; //String.fromCharCode(e) == undefined ? 0 : String.fromCharCode(e)
    return salida == undefined ? '-1' : salida;
}

function crreo_addon_ckub(vfila,vcorreo){
    var cont = parseInt($(".chpcrr").length) + 1;

    if (validarCorreo(vcorreo)) {
        if (vfila == undefined) {
            $("#fcorreos").append('<div id="cgl'+cont+'" class="chpcrr chip ciclos"><span class="vcoo" id="c0_'+cont+'" style="font-size: 16px;font-weight: bold;">'+$("#correo_in").val()+'</span><i id="cd_'+cont+'" class="close close_mail mdi mdi-close"></i></div>');
            $("#slideCorreo").data('fila'+cont,{vaccion:1,vidcorreo:0,vcorreo:$("#correo_in").val()});
            
            $("#correo_in").val('');
            ind_2 += 1;
            $('.collapsible').collapsible();
        }else{
            $("#ichp"+vfila).html(vcorreo);
            $("#"+vfila).html(vcorreo);
            $("#slideCorreo").data('fila'+vfila.substr(3))['vcorreo'] = vcorreo;
            $("#slideCorreo").data('fila'+vfila.substr(3))['vaccion'] = 2;
            $("#correo_in").removeAttr('idfila');
            $("#correo_in").val('');
        }
        
    }else{
        // Materialize.toast('Correo no Válido',4000,'danger');
        $("#correo_in").select();
    }
}

function phone_addon_ckub(vfila,vphone){
    var tipotel;
    var vtipo = vphone.substring(0,1) == 2 || vphone.substring(0,1) == 4 ? 2 : 3;
    var cont = parseInt($(".chpphone").length) + 1;
    
    if (vtipo == 1) { tipotel = 'home'; }else if (vtipo == 2) { tipotel = 'business'; }else if (vtipo == 3) { tipotel = 'phone'; };

    if (vtelefono && vtipo) {
        if (vfila == undefined) {
            $("#ftelefonos").append('<div id="tgl'+cont+'" class="chpphone chip ciclos" tp="'+vtipo+'" country="'+$("#vidpais").val()+'" gid="0"> <span id="t0_'+cont+'" class="_tel">'+$("#telefono_in").val()+'</span> <img id="ftpt0_'+cont+'" src="../assets/img/icon/'+tipotel+'.png"> <i id="td_'+cont+'" class="close_phone mdi mdi-close right" style="cursor:pointer"></i></div>');
            $("#slideTelefono").data('fila'+cont,{vaccion:1,vidtelefono:0,vidtipotel:vtipo,vtelefono:$("#telefono_in").val(),vidpais:$("#vidpais").val()});

            $("#telefono_in").val('');
            ind_2 += 1;
            $('.collapsible').collapsible();
        }else{
            // $("#itchp"+vfila).html('<img src="../assets/img/icon/'+tipotel+'.png">'+vphone);
            $("#"+vfila).html(vphone);
            $("#ftp"+vfila).attr('src','../assets/img/icon/'+tipotel+'.png');
            $("#slideTelefono").data('fila'+vfila.substr(3))['vtelefono'] = vphone;
            $("#slideTelefono").data('fila'+vfila.substr(3))['vidtipotel'] = vtipo;
            $("#telefono_in").removeAttr('idfila');
            $("#telefono_in").val('');
        }
    }else{
        Materialize.toast('Teléfono no Válido '+vphone+' '+vtipo,4000,'danger');2
        $("#telefono_in").select();
    }
}

    $(document).on('keyup',"#correo_in",function(e){
        var code = e.which || e.keyCode
        if (code == 13) 
            $(this).blur();
    });

    $(document).on('blur',"#correo_in",function(){
        var correo = $("#correo_in").val();
        if (correo.length > 1) {
            var idfila = $(this).attr('idfila');
            crreo_addon_ckub(idfila,correo);
        }
        
    });

    $(document).on('keyup',"#telefono_in",function(e){
        var code = e.which || e.keyCode
        if (code == 13) {
            $(this).blur();
        }
    });

    $(document).on('blur',"#telefono_in",function(){
        var telefono = $(this).val();

        if (telefono.length >= 8) {
            if (isNaN(telefono.replace('-',''))) {
                Materialize.toast('Telefono Invalido',4000,'red')
                return false;
            }

            if (telefono.length > 20) {
                Materialize.toast('Telefono Invalido',4000,'red')
                return false;   
            }
            
            var idfila = $(this).attr('idfila');
            phone_addon_ckub(idfila,telefono);
        }else if(telefono.length < 0){
            Materialize.toast('Telefono Invalido',4000,'red')
            return false;
        }
        
    });

    $(document).on('blur',"#direccion_in",function(){
        var direccion = $(this).val();
        if (direccion.length > 1) {
            $("#slideDireccion").data('direccion', direccion);
        }
    });

    $(document).on('change',"#vidbarrio",function(){
        $("#slideDireccion").data('idbarrio', $(this).val());
    });


$(document).on("click",".close_mail",function(){
    $(this).parent().removeClass('chip');
    $(this).parent().addClass('hide');
    $("#slideCorreo").data('fila'+$(this).attr('id').substr(3))['vaccion'] = 3;
});

$(document).on("click",".close_phone",function(){
    $(this).parent().removeClass('chip');
    $(this).parent().addClass('hide');
    $("#slideTelefono").data('fila'+$(this).attr('id').substr(3))['vaccion'] = 3;
});

$(document).on("click",".vcoo",function(){
    var id = $(this).attr('id').substr(3);
    $("#correo_in").val($(this).html()).select().focus();
    $("#correo_in").attr('idfila',$(this).attr('id'));
    Materialize.updateTextFields();
});

$(document).on("click","._tel",function(){
    $("#telefono_in").val($(this).html()).select().focus();
    $("#telefono_in").attr('idfila',$(this).attr('id'));
    Materialize.updateTextFields();
});

function actPaginate(vmodulo){
    if ($("#data-table-"+vmodulo).length){
        console.log('YA EXISTE UN MODULO IGUAL')
        return false;
    }
    if (!$("[pmodulo='"+vmodulo+"']").length) {
        console.log("MODULO "+vmodulo+" NO EXISTENTE")
        return false;   
    }
    var elemento = $("[pmodulo='"+vmodulo+"']");
    var vfila = elemento.attr('vtbl');
    var vomit = elemento.attr('omit');
    var vacc = elemento.attr('acc');

    elemento.append('<table class="table centered striped bordered highlight z-depth-3 pequeño dt-responsive nowrap" id="data-table-'+vmodulo+'" cellspacing="0" width="100%" style="width: 100%"></table>');
    var cantidad = getDatos('',175,vfila+',@@impresa,@@usr,1',0,0,0);
    getDatos_col(vfila,0,$('#data-table-'+vmodulo),1,vmodulo,vomit,vacc); 

}

function loadmybussiness(vform){
    var rs = getDatos('',155,'@@usr',0,0);
    var impresa = $("#loadMyBussiness").attr('impresa');

    if (parseInt(rs['succed'])) {
       var size = rs[0].length
       if (size > 1) {
            var sucname = rs[0][0][1];
            var mhtml = '<a class="prefix dropdown-button tooltipped pbtn white-text"  data-activates="sucu_1" data-position="right" data-tooltip="Cambiar Filtro"><span id="sucname"></span><i class="mdi mdi-chevron-down mdi-24px"></i></a> <ul id="sucu_1" class="dropdown-content">';
            for (var i = 0; i < size; i++) {
                if (rs[0][i][0] != -1){
                    mhtml += '<li><a class="loadRefBussiness" href="#!" suc="'+rs[0][i][0]+'">'+rs[0][i][1]+'</a></li>';
                    if (parseInt(rs[0][i][0]) == parseInt(impresa))
                        sucname = rs[0][i][1]
                }
                
            }
            
            $("#loadMyBussiness").html(mhtml+'</ul>');
             $('.dropdown-button').dropdown();
             $("#sucname").html(sucname)
       }else{
             $("#loadMyBussiness").html(rs[0][0][1]);
       }
    }
}

function guardarSlide(vaccion,pr,vtabla){
    switch(vaccion){
        case 1:
            if(pr.succed){
                pr = pr[0][0][0];
                
                if ($("#slideCorreo").data('fila1') != undefined) {
                    var num = 1;
                    var nfila;
                    while($("#slideCorreo").data('fila'+num) != undefined){
                        insertar(17,'','null,'+pr+','+vtabla+',"'+$("#slideCorreo").data('fila'+num)['vcorreo']+'"');
                        $("#slideCorreo").removeData('fila'+num)
                        num++;
                    }
                }

                if ($("#slideTelefono").data('fila1') != undefined) {
                    num = 1;
                    while($("#slideTelefono").data('fila'+num) != undefined){
                        var del = $("#slideTelefono").data('fila'+num)['vtelefono'].substring(0,1);
                        var vtipo = del == 2 || del == 4 ? 2 : 3;
                        insertar(238,'','null,'+vtipo+',"'+$("#slideTelefono").data('fila'+num)['vtelefono']+'",'+vtabla+','+pr+',52');
                        $("#slideTelefono").removeData('fila'+num);
                        num++;
                    }
                }

                var barrio = $("#slideDireccion").data('idbarrio');
                barrio = barrio == '' ? 0 : barrio;
                insertar(239,'','null,'+barrio+',"'+$("#slideDireccion").data('direccion')+'",0,0,'+vtabla+','+pr);

                return 1;
            }else{
                Materialize.toast(pr[0]['ERROR'],4000,'red');
                return 0;
            }
            break;
        case 2:
            if(pr){
                pr = pr[0][0][0];
                
                if ($("#slideCorreo").data('fila1') != undefined) {
                    var num = 1;
                    var nfila;
                    while($("#slideCorreo").data('fila'+num) != undefined){
                        insertar(17,'','null,'+pr+','+vtabla+',"'+$("#slideCorreo").data('fila'+num)['vcorreo']+'"');
                        $("#slideCorreo").removeData('fila'+num)
                        num++;
                    }
                }

                if ($("#slideTelefono").data('fila1') != undefined) {
                    num = 1;
                    while($("#slideTelefono").data('fila'+num) != undefined){
                        var del = $("#slideTelefono").data('fila'+num)['vtelefono'].substring(0,1);
                        var vtipo = del == 2 || del == 4 ? 2 : 3;
                        insertar(238,'','null,'+vtipo+',"'+$("#slideTelefono").data('fila'+num)['vtelefono']+'",'+vtabla+','+pr+',52');
                        $("#slideTelefono").removeData('fila'+num)
                        num++;
                    }
                }

                var barrio = $("#slideDireccion").data('idbarrio');
                barrio = barrio == '' ? 0 : barrio;
                insertar(239,'','null,'+barrio+',"'+$("#slideDireccion").data('direccion')+'",0,0,'+vtabla+','+pr);

                return 1;
            }else{
                Materialize.toast(pr[0]['ERROR'],4000,'red');
                return 0;
            }
            break;
        default:
            break;
    }
    
}

function setCookie(tipo,valor,suma){
    var d = new Date();
    d.setTime(d.getTime() + suma);
    var expires = "expires="+ d.toUTCString();
    document.cookie = tipo + "=" + valor + ";" + expires + ";path=/";
}

function deleteCookie(cname){
    document.cookie = cname + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function validarNumero(elem,msj='Valor',zero=1,dec=2,min=0,max=0){
    var valor = elem.val().replace(/,/g,'').trim(); 

    if(isNaN(valor))
        elem.val('0.00')

    switch (zero) {
        case 1: // x > 0
            if(parseFloat(valor) <= 0){
                elem.focus().select();
                Materialize.toast(msj+' Debe ser Mayor a Cero',4000,'red');
                return false;
            }
            break;
        default:
            break;
    }

    return true;
}

function validarTexto(elem,msj='Valor',mxln=0,mnln=0){
    var valor = elem.val().trim(); 

    if(!valor.length){
        elem.focus().select();
        Materialize.toast(msj+' Requerido',4000,'red');
        return false;
    }

    if(mxln && valor.length > mxln){
        elem.focus().select();
        Materialize.toast(msj+' Superior a '+mxln+' Caractéres',4000,'red');
        return false;
    }

    if(mnln && valor.length < mnln){
        elem.focus().select();
        Materialize.toast(msj+' Inferior a '+mxln+' Caractéres',4000,'red');
        return false;
    }

    return true;
}

// addgeneral

// autocomplete
// function autocomplete(charCode,charStr,nom,tabla) {
//     if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
//         $(".autocomplete-content").remove();
//         $("#"+nom).autocomplete({
//             limit: 10,
//             data: arr('login',4,'',tabla,'nombre like \"%'+$("#"+nom).val()+'%\" limit 10',0,0,0,1)
//         }); 
//         $("#"+nom).siblings($(".autocomplete-content")).css('width','25%');
//     }
// }

// APSY CR
