acc = 1;

$(function(){

    $(".err_").hide();
    $(".suc_").hide();
    
});

$(document).on("click",".load",function(){

    var modulo = $(this).attr('modulo');
    deadclear(modulo);
    var mod = modulo.slice(0,-1)
    var arreglo = {}
    arreglo['modulo'] = modulo;
    var varreglo = loadpool(arreglo,$(this).attr('id').substr(1),$(this).attr('detalle'));

});

$(document).on("click",".add",function(){
    var modulo = $(this).attr('modulo');
    var codigo = $(this).attr('codigo');
    var varias = $(this).attr('vtablas');
    doGlobal(1,modulo,codigo,'',$(this).attr('detalle'),varias);
});

$(document).on("click",".edit",function(){
    var modulo = $(this).attr('modulo');
    var codigo = $(this).attr('codigo');
    var varias = $(this).attr('vtablas');
    doGlobal(2,modulo,codigo,'',$(this).attr('detalle'),varias); 
});

$(document).on("click",".delete",function(){
    
    var modulo = $(this).attr('modulo');
    var codigo = $(this).attr('codigo');
    var id = $(this).attr('id').substr(1);
  
    doGlobal(3,modulo,codigo,id,$(this).attr('detalle'),0);
});

function doGlobal(accion,modulo,codigo,tip,detalle,varias){

    var arreglo = {}
    arreglo['modulo'] = modulo;
    arreglo['tip'] = tip;
    arreglo['atributos'] = baseValidar(1,arreglo);

    if (varias == 1) {
        $("#f"+modulo+"s").find();
        arreglo['varios'] = {};

        $("[vtabla]").each(function(index){
            var arr = {}
            
            arr['modulo'] = $(this).attr('vtabla');
            arr['tip'] = tip;
            arr['atributos'] = baseValidar(1,arr);

        arreglo['varios'][index] = arr;
        });
    }

    $('#err'+codigo).hide();
    $('#suc'+codigo).hide();

    if (arreglo['atributos'] == "[object Object]"){
        arreglo['atributos']['vaccion'] = accion;

        if (detalle != undefined){
            arreglo['detalle'] = {}
            arreglo['detalle']['tabla']     = "detalle"+modulo;
            arreglo['detalle']['registros'] = cargarDetalle("detalle"+modulo);
        }

        var p = mantenimiento('login',2,arreglo);

        if (p['succed'] == 0) {
            $('#err'+codigo).show();
            $('#errm'+codigo).html(p[0]['ERROR']);
        }else{
           
            var tmsj = "Ingresado";
            if (accion == 2){
                tmsj = "Actualizado";
                acc = 2;
            }else if(accion == 3){
                tmsj = "Eliminado";
                acc = 3;
            }

            $('#suc'+codigo).show();
            $('#sucm'+codigo).html('Registro '+tmsj+' Correctamente');
            
            if (detalle == 1) {
                id = p[0][0];
                window.open(modulo+"s?accion=5&id="+id+"&tp="+$("#t_p").val());
                setTimeout(function(){ location.reload(); }, 1000);
            }else{
                setTimeout(function(){ deadclear(arreglo['modulo']); }, 2000);
                thorload(modulo);
            }
            
        }

    }else{
        $('#errm'+codigo).html(arreglo['atributos']);
        $('#err'+codigo).show();
    }
};

function baseValidar(vaccion,vmodulo){
    var salida = {}
    var varreglo = mantenimiento('login',vaccion,vmodulo);
    if (varreglo == "[object Object]"){
        salida = validar(varreglo[0],vmodulo);
        
        if (vmodulo['tip'] != '') {
            salida['vid'] = vmodulo['tip'];
        }
    }else{
        return varreglo//'ERROR DE COMUNICACION';
    }
    
    return salida;
}

function loadpool(vmodulo,vid,vdetalle){

    vmodulo = cargar(vmodulo,vid);
    vform = 'f'+vmodulo['modulo']+'s';
    
    var columns = mantenimiento('login',5,vmodulo);

    for (var i = 0; columns[0][1].length > i; i++) {
        
        if ($("#"+columns[0][1][i]['name']).attr("type") == 'select') 
            $("#"+vform).find($("#"+ columns[0][1][i]['name'])).val(columns[0][0][0][i]);

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'textarea')
            $("#"+vform).find($("#"+columns[0][1][i]['name'])).text(columns[0][0][0][i]);

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'radio')
            $("#"+vform).find($("input[name="+columns[0][1][i]['name']+']:checked')).val(columns[0][0][0][i]);

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'checkbox')
            $("#"+vform).find($("input[name="+columns[0][1][i]['name']+']:checked')).val(columns[0][0][0][i]);

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'html'){
            $("#"+vform).find($("#"+columns[0][1][i]['name'])).html(columns[0][0][0][i]);
        }
        
        else 
            $("#"+vform).find($("#"+columns[0][1][i]['name'])).val(columns[0][0][0][i]);
        
        if ($("#"+columns[0][1][i]['name']).attr("cambio") == 1)
            $("#"+columns[0][1][i]['name']).change();
    }

    if (vdetalle != undefined){
        var arr = {}
        
        arr['sel'] = '';
        arr['tbl'] = 32;
        arr['where'] = "\""+vid+"\"";

        $("#detalle"+vmodulo['modulo']).html(mantenimiento('login',6,arr))
    }


}

function mantenimiento(vmodulo,vaccion, varreglo){
    var p;
    $.ajax({
            async: false,
            url: '../dashboard/'+vmodulo,
            type: 'POST',
            data: {accion: vaccion,arreglo : varreglo}
            })
            .done(function(data) {
                console.error(data)
                try {
                    p = JSON.parse(data);
                }
                catch(err){
                    p = data;
                }
            });
    return p;
}

 function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

function enviarCorreo(vaccion,vto,vsubject,vbody,vadjunto) {
     $.ajax({
            url: '../_config/correoAjax.php',
            type: 'POST',
            data: {accion: vaccion,to : vto, subject : vsubject, body : vbody, adjunto : vadjunto}
            })
            .done(function(data) {
                try {
                    p = JSON.parse(data);
                }
                catch(err){
                    p = data;
                }
            });
}

function odin(varreglo,vform,id) {
    var salida = {}
    id || (id = '');

    for (var i = 0; i < varreglo.length; i++) {
        
        switch(varreglo[i]) {
            case 'vidusuario':                
                if (typeof $("#vidusuario"+id).val() == 'undefined') {
                    salida[varreglo[i]] = '';
                }else{
                    salida[varreglo[i]] = $("#"+vform).find($("#vidusuario"+id)).val();
                }
                break;
            case 'vid':
                if (typeof $("#vid"+id).val() == 'undefined') {
                    salida[varreglo[i]] = 0;
                }else{
                    salida[varreglo[i]] = $("#"+vform).find($("#vid"+id)).val();
                }
                break;
            case 'vaccion':
                salida[varreglo[i]] = 0;
                break
            case 'vidtabla':
                salida[varreglo[i]] = $("#vtabla").val();
                break;
            default:
            
                if ($("#"+varreglo[i]+id).attr("type") == 'select')
                    salida[varreglo[i]] = $("#"+vform).find($("#"+ varreglo[i]+id+" option:selected")).val();

                else if ($("#"+varreglo[i]+id).attr("type") == 'text')
                    salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).val();

                else if ($("#"+varreglo[i]+id).attr("type") == 'textarea')
                    salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).val();

                else if ($("#"+varreglo[i]+id).attr("type") == 'html')
                    salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).html();

                else if (/vfecha/.test(varreglo[i])){
                    if (typeof $("#"+varreglo[i]+id).val() == 'undefined') {
                        salida[varreglo[i]] = '1990-01-01';
                    }else{
                        salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).val() == '' ? 
                        '1990-01-01' : $("#"+vform).find($("#"+varreglo[i]+id)).val();
                    }
                }

                else if ($("#"+varreglo[i]+id).attr("type") == 'radio')
                    salida[varreglo[i]] = $("#"+vform).find($("input[name='"+varreglo[i]+id+"']:checked")).val();

                else if ($("#"+varreglo[i]+id).attr("type") == 'checkbox')
                    salida[varreglo[i]] = $("#"+vform).find($("input[name='"+varreglo[i]+id+"']:checked")).val();

                else
                    salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).val();
                                
                break;

        }
    }
    return salida;
}

function deadclear(vform) {

    $(".err_").hide();
    $(".suc_").hide();

    if (acc == 1) {

        $("#f"+vform+"s :input").each(function(){
            if ($(this).attr("type") == 'select')
                $(this).val(0);

            else if ($(this).attr("type") == 'textarea')
                $(this).text('');

            else if ($(this).attr("type") == 'checkbox')
                $(this).prop('checked',false);

            else if ($(this).attr("type") == 'radio'){
                $(this).val(0);
            }

            else if ($(this).attr("type") == 'hidden')
                $(this).removeClass("form-control")
            else
                $(this).val('');
        });
    }else
        acc = 1;
}

function thorload(vtabla) {
    vtabla += "s";
    var arreglo = cargarSintax(vtabla);
    var tbl = mantenimiento('login',6,arreglo);
    var tabla = $("#data-table-"+vtabla).DataTable();
    tabla.destroy();
    $("#lista"+vtabla).html(tbl);
    $("#data-table-"+vtabla).DataTable({
        bFilter :  false
    });
    
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
                    var op = parseInt(p[i][1]);

                    switch(op){
                        case 1:
                            $(".per"+p[i][0]).css('display','in-line');
                            break;
                        case 2:
                            $(".per"+p[i][0]).attr('disabled',true);
                            break;
                        case 3:
                            $(".per"+p[i][0]).css('display','none');
                            break;
                    }
                };
            })
            .fail(function(x,y,z) {
                // alert(z,' ',y,' ',z)
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

 function cargarDetalle(vdetalle) {

    var salida = [];
    var varreglo = {};
    varreglo['modulo'] = vdetalle;
    varreglo['atributos'] = mantenimiento('login',1,varreglo);

    var id = 0;
    var det;
 
    $("#"+vdetalle+" tr").each(function(index){
       
        fid = $(this).attr('id').substr(1);
        sid = $(".constante"+fid).val()

        if (sid != ''){
            det = odin(varreglo['atributos'][0],$(this).attr('id'),fid);
            salida.push(det);
        }
    });

    return salida;
}

function notify(vicon,vtitle,vmsg,vtype){
    $.notify({
    // options
    icon: vicon,
    title: vtitle,
    message: vmsg,
    target: '_blank'
},{
    // settings
    element: 'body',
    position: null,
    type: vtype,
    allow_dismiss: true,
    newest_on_top: true,
    showProgressbar: false,
    placement: {
        from: "top",
        align: "right"
    },
    offset: 20,
    spacing: 10,
    z_index: 1031,
    delay: 5000,
    timer: 1000,
    url_target: '_blank',
    mouse_over: null,
    animate: {
        enter: 'animated fadeInDown',
        exit: 'animated fadeOutUp'
    },
    // type: 'notify',
    icon_type: 'image',
    template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<div data-notify="icon" class="circle pull-left"></div>' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>' 
});
}