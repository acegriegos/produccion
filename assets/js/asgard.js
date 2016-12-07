acc = 1;

$(function(){
    $('.dropdown-button').dropdown();
})

$(window).keydown(function(e){
    var code = e.wich || e.keyCode
    if(code == 113){
        $(".menu-btn").click();
    }
});

$(document).on("click",".load",function(){
    var modulo = $(this).attr('modulo');
    deadclear(modulo);
    var mod = modulo.slice(0,-1);
    var arreglo = {};
    arreglo['modulo'] = modulo;
    var varreglo = loadpool(arreglo,$(this).attr('id').substr(1),$(this).attr('detalle'));
});

$(document).on("click",".add",function(){
    var modulo = $(this).attr('modulo');
    var varias = $(this).attr('varias');
    doGlobal(1,modulo,'',$(this).attr('detalle'),varias);
});

$(document).on("click",".edit",function(){
    var modulo = $(this).attr('modulo');
    var varias = $(this).attr('vtablas');
    doGlobal(2,modulo,'',$(this).attr('detalle'),varias); 
});

$(document).on("click",".delete",function(){
    var modulo = $(this).attr('modulo');
    var id = $(this).attr('id').substr(1);
    doGlobal(3,modulo,id,$(this).attr('detalle'),0);
});

function doGlobal(accion,modulo,tip,detalle,varias){

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

    if (arreglo['atributos'] == "[object Object]"){
        arreglo['atributos']['vaccion'] = accion;

        if (detalle != undefined){
            arreglo['detalle'] = {}
            arreglo['detalle']['tabla']     = "detalle"+modulo;
            arreglo['detalle']['registros'] = cargarDetalle("detalle"+modulo);
        }

        var p = mantenimiento('login',2,arreglo);

        if (p['succed'] == 0) {
<<<<<<< HEAD
            Materialize.toast(p[0]['ERROR'], 4000, 'red');
=======
            Materialize.toast(p[0]['ERROR'],4000,'danger');
>>>>>>> a35217298962bea305cd910e96449fa87deacf1b
        }else{
           
            var tmsj = "Ingresado";
            if (accion == 2){
                tmsj = "Actualizado";
                acc = 2;
            }else if(accion == 3){
                tmsj = "Eliminado";
                acc = 3;
            }

<<<<<<< HEAD
            Materialize.toast('Registro '+tmsj+' Correctamente', 4000, 'green');
=======
            Materialize.toast('Registro '+tmsj+' Correctamente',4000,'success');
>>>>>>> a35217298962bea305cd910e96449fa87deacf1b
            
            if (detalle == 1) {
                id = p[0][0];
                endDetail(id);
            }else{
                setTimeout(function(){ deadclear(arreglo['modulo']); }, 2500);
                thorload(modulo);
            }
        }

    }else{
<<<<<<< HEAD
        Materialize.toast(arreglo['atributos'], 4000, 'red');
=======
        Materialize.toast(arreglo['atributos'],4000,'danger');
>>>>>>> a35217298962bea305cd910e96449fa87deacf1b
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
        console.error('eroor en Base Validar')
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

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'html')
            $("#"+vform).find($("#"+columns[0][1][i]['name'])).html(columns[0][0][0][i]);

        else if ($("#"+columns[0][1][i]['name']).attr("type") == 'date')
            $("#"+vform).find($("#"+columns[0][1][i]['name'])).pickadate().pickadate('picker').set('select', columns[0][0][0][i]);
        
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

function mantenimiento(vmodulo,vaccion,varreglo){
    var p;
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

                console.error(p)
            });
    return p;
}

function arr(vref,vaccion,vsel,vtbl,vwhere,vcambio,vch,velemto){
    var salida = 1;
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
    }

    if (vch)
        velemto.html(mantenimiento(vref,vaccion,arr));
    else
        salida = mantenimiento(vref,vaccion,arr);

    return salida;
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
                console.error(data)
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
                    salida[varreglo[i]] = $("#vidusuario"+id).val();
                }
                break;
            case 'vid':
                if (typeof $("#vid"+id).val() == 'undefined') {
                    salida[varreglo[i]] = 0;
                }else{
                    salida[varreglo[i]] = $("#vid"+id).val();
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
                    if (typeof $("#"+varreglo[i]+id) == 'undefined') {
                        salida[varreglo[i]] = '1990-01-01';
                    }else{
                        salida[varreglo[i]] = $("#"+vform).find($("#"+varreglo[i]+id)).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd') == '' ? 
                        '1990-01-01' : $("#"+vform).find($("#"+varreglo[i]+id)).pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');
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
           if ($(this).attr('noClear') == undefined) { 
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
           } 
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
        bFilter :  false,
        bLengthChange : false
    });
    
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
                // console.error(data)
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
        fid = $(this).attr('id').substr(2);
        sid = $(".constante"+fid).val();

        if (sid != ''){
            det = odin(varreglo['atributos'][0],$(this).attr('id'),fid);
            salida.push(det);
        }
    });

    

    return salida;
}
<<<<<<< HEAD

function get_Json(varray,vheader){
    // console.log(vheader)
    has_header = vheader == undefined ? 0 : vheader.length;
    salida = '';

    for (var i = 0; i < varray.length; i++) {
        console.log(varray[i][0])
        if ( has_header ){
            for (var i = 0; i < vheader.length; i++) {
                vheader[i]
            };
        }else{
            salida = salida+'"'+varray[i][0]+'" : "'+varray[i][1]+'","';
        }

    };

    salida = salida.substring(-1);
    return JSON.stringify(salida);
}
=======
<<<<<<< HEAD

=======
>>>>>>> a35217298962bea305cd910e96449fa87deacf1b
>>>>>>> 0ed4460adc3ae8bc2d2c63633a519c934cd2f2a7
// Login Technologies S.A.