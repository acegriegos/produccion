var ifila = 0;
var ifila2 = 0;
var ifila3 = 0;
var ifila4 = 0;
var tpinv = 0;
var invvar;
// tipo = $("li.menu3 >a.active").parent().attr('id').substr(1)
$(function(){
	
    param = getParameterByName('accion');
    param = param == '' ? 0 : parseInt(param);

    if (param == 3)
        invvar = getDatos('',909,'@@tmp_cia',0,0)[0];
    else
        invvar = getDatos('',909,'@@impresa',0,0)[0];
    switch(param){
    	case 1:
    		loadCultivos();
    		break;
        case 11:
            loadAvispas();
            break;
        case 12:
            loadHongos();
            break;
        case 13:
            loadBM();
            break;
        case 14:
            loadSustrato();
            break;
    	case 3:
    		loadAjustes();
            break;
        case 10:
            loadSeguimiento();
            break;
        default:
            break;
    }
    SSE_SERVER('login',4,{sel:'concat(idempresa,"-",case max(idtipo) when 1 then 2 else max(idtipo) end) as id,count(distinct(lote)) as cantidad',tbl:915,where:'idempresa = @@impresa and idencargado = @@usr and idestado = 1 group by lote'},2);

    setInterval(function(){
        SSE_SERVER('login',4,{sel:'concat(idempresa,"-",case max(idtipo) when 1 then 2 else max(idtipo) end) as id,count(distinct(lote)) as cantidad',tbl:915,where:'idempresa = @@impresa and idencargado = @@usr and idestado = 1 group by lote'},2);
    },5000);

    $('.modal').modal({
        dismissible: true, // Modal can be dismissed by clicking outside of the modal
        opacity: .5, // Opacity of modal background
        inDuration: 300, // Transition in duration
        outDuration: 200, // Transition out duration
        startingTop: '2%', // Starting top style attribute
        endingTop: '2%' // Ending top style attribute
    });

    $("select").material_select();
    $("#m0").click();
});

//fill data
$(document).on("change","[name=tipoclie]",function() {
    $("#fclientes .zelda").data('triforce')['vidtipocliente'] = $(this).attr('tipoclie');
});
$(document).on("keyup","#cedula",function() {
    $("#fclientes .zelda").data('triforce')['vcedula'] = $(this).val();
});
$(document).on("keyup","#nombre",function() {
    $("#fclientes .zelda").data('triforce')['vnombre'] = $(this).val();
});
$(document).on("keyup","#apellido1",function() {
    $("#fclientes .zelda").data('triforce')['vapellido1'] = $(this).val();
});
$(document).on("keyup","#apellido2",function() {
    $("#fclientes .zelda").data('triforce')['vapellido2'] = $(this).val();
});
$(document).on("change","#categoria",function() {
   $("#fclientes .zelda").data('triforce')['vidnivel'] = $(this).val();
});
$(document).on("keyup","#vcodigo",function() {
    $("#fservicios .zelda").data('triforce')['vcodigo'] = $(this).val();
});
$(document).on("keyup","#vnombre",function() {
    $("#fservicios .zelda").data('triforce')['vnombre'] = $(this).val();
});
$(document).on("keyup","#vdescripcion",function() {
    $("#fservicios .zelda").data('triforce')['vdescripcion'] = $(this).val();
});
$(document).on("keyup","#vpbase",function() {
    $("#fservicios .zelda").data('triforce')['vpbase'] = $(this).val();
});
$(document).on("change","#vidinventario",function(){
    $("#fservicios .zelda").data('triforce')['vidinventario'] = $(this).val();
});
// fill data //

// $(document).on("change","#encargado",function(){
    // var idencargado = $(this).val();
    // $("#flaboratorio-ciclos .zelda").data('triforce')['videncargado'] = idencargado;
// });

$(document).on("click",".pestado",function(){
    var id = $(this).attr('id').substr(3);
    var estado = $(this).attr('estado');
    var perdida = $("#lpr"+id).text();
    if (estado == 1)
        estado = 0;
    else
        estado = 1;
    
    arr('login',4,'',943,'2,0,"'+perdida+'",0,0,@@impresa,'+estado,0,0,0);
    arr('login',6,'id,nombre,idestado',913,'id > 0 and isActivo = 0 and idsucursal in (-1,@@impresa) order by nombre,idestado',0,1,$("#listaperdidas"));
});

$(document).on("change","#cfrasco",function(){
    var id = $(this).val();
    $("#hidfrasco").val(id);
});

$(document).on("click",".perdidasxlab",function(){
    arr('login',6,'id,nombre,idestado',913,'id > 0 and isActivo = 0 and idsucursal in (-1,@@impresa) order by nombre,idestado',0,1,$("#listaperdidas"));
    var max = arr('login',4,'max(id)',913,'id > 0',0,0,0)[0][0];
    $("#modal-perdidasxlab").modal('open');
    ifila4 = max;
});

$(document).on("click","#addperdida",function(){
    var perdida = $("#vperdida").val();
    if (perdida != '') {
        ifila4++;
        $("#listaperdidas").append('<li class="collection-item lsperdidas" id="cpr'+ifila4+'"><label id="lpr'+ifila4+'">'+perdida+'</label><i class="pbtn mdi mdi-autorenew mdi-24px right pestado hide" id="stp'+ifila4+'"></i><i class="pbtn mdi mdi-close mdi-24px right delperdida cdel" id="dlp'+ifila4+'"></i></li>');
        $("#vperdida").val('').focus();
    }
});

$(document).on("click",".delperdida",function(){
    var id = $(this).attr('id').substr(3);
    $("#cpr"+id).remove();
});

$(document).on("click",".save-perdidas",function(){
    var bis = 1;
    var p = '';
    $(".pestado").each(function(){
        var id = $(this).attr('id').substr(3);
        var perdida = $("#lpr"+id).text();
        var comp = arr('login',4,'count(id)',913,'id > 0 and idestado = 1 and nombre = "'+perdida+'" and idsucursal = @@impresa',0,0,0)[0][0];
        if (comp == 0) {
            p = arr('login',4,'',943,'1,0,"'+perdida+'",0,0,@@impresa,1',0,0,0);
            console.log(p)
            if (p['succed'] == 1)
                bis = 1;
            else
                bis = 0;
        }
    });

    if (bis) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
        arr('login',6,'id,nombre,idestado',913,'id > 0 and isActivo = 0 and idestado = 1 and idsucursal in (-1,@@impresa) order by nombre,idestado',0,1,$("#listaperdidas"))
    }else{
        Materialize.toast(p[0]['ERROR'], 4000, 'green');
    }
});

$(document).on("click",".finish",function(){
    var id = $(this).attr('id').substr(1);
    var $toastContent = $('<span>Seguro desea terminar el proceso?</span>').add($('<button class="btn-flat toast-action green white-text" id="fin-proc" idproc="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 6000);
});

$(document).on("click","#fin-proc",function(){
    var id = $(this).attr('idproc');
    var fin = arr('login',7,'2',915,'idestado = 3','id = '+id,0,0,0);
    if (fin['succed'] == 1) {
        Materialize.toast('Proceso terminado', 4000, 'green');
        arr('login',6,'',912,'0,0,"2,@@impresa,@@usr","0,10"',0,1,$("#listaciclos"));
    }
});

$(document).on("click","#listadorecepciones",function(){
    arr('login',6,'',934,'0,@@impresa',0,1,$("#listarecepciones"))
});

$(document).on("click","#save-evaluacion",function(){
    var idciclo = $("#hidciclo").val();
    var idestado = $("#vidtipoestado").val();
    var idpruebas = $("#vidtipopruebas").val();
    var comentario = $("#vcomenpruebas").val();
    if (idestado != 0) {
        var ingpruebas = arr('login',4,'',931,'1,0,'+idciclo+','+idestado+',"'+idpruebas+'","'+comentario+'",@@usr,@@impresa',0,0,0);
        if (ingpruebas['succed'] == 1) {
            Materialize.toast('QoS realizado con éxito', 4000, 'green');
            $("#vidtipopruebas").val(0);
            $("#vidtipopruebas").material_select();
            $("#vcomenpruebas").val('');
        }else{
            Materialize.toast(ingpruebas[0]['ERROR'], 4000, 'green');
        }
    }
});

$(document).on("keyup","#vloteaprv",function(e){
    var code = e.which || e.keyCode;
    if (code == 8 && $(this).val() == '')
        $(".evaluarlote").attr('idciclo',0);
});

$(document).on("click",".approve",function(){
    var idciclo = $(this).attr('idciclo');
    var lote = $(this).attr('lote');
    $("#vloteaprv").val(lote);
    $(".evaluarlote").attr('idciclo',idciclo);
    Materialize.updateTextFields();
});

$(document).on("click",".evaluarlote",function(){
    var el = $(this).attr('el'); //6:aceptado 7:rechazado
    if ($(this).attr('idciclo') != 0) {
        $("#hidciclo").val($(this).attr('idciclo'));
        $("#ciclolote").text($("#vloteaprv").val());
        var pruebas = arr('login',4,'id,prueba',930,'id > 0 and idsucursal = @@impresa',0,0,0);
        $("#vidtipopruebas").append('<option value="0" disabled>Seleccione una o varias pruebas</option>');
        $.each(pruebas[0],function(i,dt) {
            $("#vidtipopruebas").append('<option value="'+dt[0]+'">'+dt[1]+'</option>');
        });
        $("#vidtipopruebas").material_select();
        $("#vidtipoestado").val(el);
        $("#modal-evaluarlote").modal('open');
    }else{
        Materialize.toast('Seleccione un lote', 3000, 'green');
    }
});

$(document).on("click",".datoextra",function(){
    $("#modal-datoextra").modal('open');
    var str = ' and bisfinal = 1';
    if($(this).attr('td') == 1)
        str = ' and bismedio = 1';

    arr('login',6,'id,nombre',936,'id > 0 and idtipociclo = '+$("li.menu3 >a.active").parent().attr('id').substr(1)+str,0,1,$("#listadatosextras"))
        console.log(arr('login',4,'id,nombre',936,'id > 0 and idtipociclo = '+$("li.menu3 >a.active").parent().attr('id').substr(1)+str,0,0,0));
});

$(document).on("click",".pruebasQoS",function(){
    var idsuc = $(this).attr('ids');
    $(".savetestqos").attr('idsuc',idsuc);
    $("#modal-pruebasQoS").modal('open');
    var cnt = arr('login',4,'count(id)',930,'id > 0 and idciclo = -1 and idsucursal = '+idsuc,0,0,0)[0][0];
    if (cnt > 0) {
        ifila3 = cnt;
        arr('login',6,'id,prueba',930,'id > 0 and idciclo = -1 and idsucursal = '+idsuc,0,1,$("#testqos"));
    }else
        $("#testqos").html('');
});

$(document).on("click",".modalmediosQoS",function(){
    var tc = $(this).attr('tm');
    var idsuc = $(this).parent().parent().parent().parent().parent().parent().siblings().attr('idsuc');
    $(".savetestqosCiclo").attr({
        'idsuc': idsuc,
        'idciclo': tc
    });
    var cnt = arr('login',4,'count(id)',930,'id > 0 and idciclo = '+tc+' and idsucursal = '+idsuc,0,0,0)[0][0];
    if (cnt > 0) {
        ifila3 = cnt;
        $("#testqosCiclo").html('');
        arr('login',6,'id,prueba',930,'id > 0 and idciclo = '+tc+' and idsucursal = '+idsuc,0,1,$("#testqosCiclo"));
    }else
        $("#testqosCiclo").html('');

    $("#modal-pruebasQoSCiclo").modal('open');
});

$(document).on("click",".modalmediosExtra",function(){
    var tm = $(this).attr('tm');
    var idsuc = $(this).parent().parent().parent().parent().parent().parent().siblings().attr('idsuc');
    var bismedio = '';

    if ($("#dmedio").is(":checked"))
        bismedio = 1;
    else if($("#dfinal").is(":checked"))
        bismedio = 0;

    $(".savetestqosExtra").attr({
        'idciclo': tm,
        'bismedio': bismedio,
        'idsuc': idsuc
    });

    var cnt = arr('login',4,'',938,tm+','+idsuc+','+bismedio,0,0,0)[0];

    if (cnt.length > 0) {
        ifila3 = cnt;
        $("#testqosExtra").html('');
        arr('login',6,'',938,tm+','+idsuc+','+bismedio,930,1,$("#testqosExtra"));
    }else
        $("#testqosExtra").html('');

    $("#modal-datosextra").modal('open');
});

$(document).on("click","#addtestqos",function(){
    var test = $("#tipopruebas").val();
    if (test != '') {
        ifila3++;
        $("#testqos").append('<li class="collection-item pruebasqos" id="clp'+ifila3+'"><label id="qs'+ifila3+'">'+test+'</label><i class="pbtn mdi mdi-close mdi-24px right delprueba" id="dp'+ifila3+'"></i></li>');
        $("#tipopruebas").val('').focus();
    }
    
});

$(document).on("click","#addtestqosExtra",function(){
    var test = $("#tipopruebasExtra").val();
    var sig = 1;
    if (test != '') {
        if ($(".pruebasqos").length > 0) {
            $(".pruebasqos").each(function(){
                var id = $(this).children().attr('id').substr('2');
                var nombre = $("#qs"+id).text().toLowerCase();
                if (nombre == test.toLowerCase()) {
                    Materialize.toast('Dato existente', 4000, 'red');
                    sig = 0;
                }else{
                    sig = 1;
                }
            });
        }
        if (sig == 1) {
            ifila3++;
            // test = test.substr(0,1).toUpperCase()+test.substr(1);
            $("#testqosExtra").append('<li class="collection-item pruebasqos" id="clp'+ifila3+'"><label id="qs'+ifila3+'">'+test+'</label><i class="pbtn mdi mdi-close mdi-24px right delprueba" id="dp'+ifila3+'"></i></li>');
            $("#tipopruebasExtra").val('').focus();
        }
    }
    
});

$(document).on("click","#addtestqosCiclo",function(){
    var test = $("#tipopruebasCiclo").val();
    if (test != '') {
        ifila3++;
        $("#testqosCiclo").append('<li class="collection-item pruebasqos" id="clp'+ifila3+'"><label id="qs'+ifila3+'">'+test+'</label><i class="pbtn mdi mdi-close mdi-24px right delprueba" id="dp'+ifila3+'"></i></li>');
        $("#tipopruebasCiclo").val('').focus();
    }
    
});

$(document).on("keyup","#tipopruebas",function(e){
    var code = e.which || e.keyCode;
    if (code == 13) {
        if (test != '') {
            var test = $("#tipopruebas").val();
            ifila3++;
            $("#testqos").append('<li class="collection-item pruebasqos" id="clp'+ifila3+'"><label id="qs'+ifila3+'">'+test+'</label><i class="pbtn mdi mdi-close mdi-24px right delprueba" id="dp'+ifila3+'"></i></li>');
            $("#tipopruebas").val('').focus();
        }
            
    }
});

$(document).on("click",".delprueba",function(){
    var id = $(this).attr('id').substr(2);
    var $toastContent = $('<span>Seguro desea eliminarlo?</span>').add($('<button class="btn-flat toast-action green white-text" id="delprueba" idfila="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 6000);
});

$(document).on("click","#delprueba",function(){
    var id = $(this).attr('idfila');
    $("#clp"+id).remove();
    $("#toast-container").hide();
});

$(document).on("click",".savetestqos",function(){
    var pass = 0;
    var pruebaqos = '';
    var idsuc = $(this).attr('idsuc');
    $(".pruebasqos").each(function() {
        var id = $(this).children().attr('id').substr('2');
        var prueba = $("#qs"+id).text();
        var valid = arr('login',4,'count(id)',930,'prueba = "'+prueba+'" and idsucursal = '+idsuc,0,0,0)[0];
        if (valid == 0) {
            var pruebaqos = arr('login',4,'',929,'1,0,"'+prueba+'",'+idsuc+',-1',0,0,0);
            if (pruebaqos['succed'] == 1)
                pass = 1;
            else
                pass = 0;
        }
    });
    if (pass == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
    }else{
        Materialize.toast(pruebaqos[0]['ERROR'], 4000, 'red');
    }
});

$(document).on("click",".savetestqosExtra",function(){
    var pass = 0;
    var datoextra = '';
    var idciclo = $(this).attr('idciclo');
    var bismedio = 0;
    if ($("#dmedio").is(":checked")) {
        bismedio = 1;
    }else if ($("#dfinal").is(":checked")) {
        bismedio = 0;
    }
    $(".pruebasqos").each(function() {
        var id = $(this).children().attr('id').substr('2');
        var nombre = $("#qs"+id).text();
        // 936
        var cnt = arr('login',4,'count(id)',936,'nombre = "'+nombre+'"',0,0,0)[0][0];
        if (cnt == 0) {
            var datoextra = arr('login',4,'',939,'1,0,'+idciclo+',"'+nombre+'",'+bismedio,0,0,0);
            if (datoextra['succed'] == 1)
                pass = 1;
            else
                pass = 0;
        }
        
    });
    if (pass == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
    }else{
        Materialize.toast(datoextra[0]['ERROR'], 4000, 'red');
    }
});

$(document).on("click","#dmedio",function(){
    var tm = $(".savetestqosExtra").attr('idciclo');
    var idsuc = $(".savetestqosExtra").attr('idsuc');

    arr('login',6,'',938,tm+','+idsuc+',1',930,1,$("#testqosExtra"));
});

$(document).on("click","#dfinal",function(){
    var tm = $(".savetestqosExtra").attr('idciclo');
    var idsuc = $(".savetestqosExtra").attr('idsuc');

    arr('login',6,'',938,tm+','+idsuc+',0',930,1,$("#testqosExtra"));
});

$(document).on("click",".savetestqosCiclo",function(){
    var pass = 0;
    var pruebaqos = '';
    var idsuc = $(this).attr('idsuc');
    var idciclo = $(this).attr('idciclo');
    $(".pruebasqos").each(function() {
        var id = $(this).children().attr('id').substr('2');
        var prueba = $("#qs"+id).text();
        var valid = arr('login',4,'count(id)',930,'prueba = "'+prueba+'"',0,0,0)[0];
        if (valid == 0) {
            var pruebaqos = arr('login',4,'',929,'1,0,"'+prueba+'",'+idsuc+','+idciclo,0,0,0);
            if (pruebaqos['succed'] == 1)
                pass = 1;
            else
                pass = 0;
        }
    });
    if (pass == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
    }else{
        Materialize.toast(pruebaqos[0]['ERROR'], 4000, 'red');
    }
});

$(document).on("click","#addActivo",function(){
    var tp = $("li.menu3 > a.active").parent().attr('id').substr(1);
    var id = $("#vidciclo").vf.clickal();
    var cantidad = $("#vcant").val();
    var idrazon = $("#vidrazon").val();
    var activo = $("#vactivo").val();
    var idactivo;
    var perdidas = arr('login',4,'',925,'1,0,"'+tp+','+id+'",'+idrazon+',0,'+idactivo+','+cantidad+',@@usr,"Registro de pérdidas"',0,0,0);
});

$(document).on("click","#cancelact",function(){
    emptymedio();
    $("#addmedio").removeAttr('data-ifila');
    $("#actmedio").attr('id','addmedio');
    $("#addmedio").removeClass('mdi-cancel').addClass('mdi-plus');
    $(this).addClass('hide');
});

$(document).on("click",".labedit",function(){
    var id = $(this).attr('id').substr(2);
    var elem = $("#ifila"+id);
    var idproducto = elem.data('idproducto');
    var idunidad = elem.data('idunidad');
    var idinventario = elem.data('idinventario');
    var cantidad = elem.data('cantidad');
    if (idproducto.toString().substr(0,1) != '+') {
        var info = arr('login',4,'',14,idproducto+',0,"","0,1"',0,0,0)[0][0];
        var nombre = info[3]+' - '+info[39];
        var codigo = info[1]+' - '+info[39];
        $("#_vnombre").val(nombre);
        $("#_vcodigo").val(codigo);
        $("#_vcantidad").val(cantidad);
        $("#_vidunidad").val(idunidad);
        Materialize.updateTextFields();
        $("#_vidunidad").material_select();
        $("#addmedio").attr('id','actmedio');
        $("#actmedio").removeClass('mdi-plus').addClass('mdi-pencil');
        $("#actmedio").attr('data-ifila', id);
        $("#cancelact").removeClass('hide');
        $("#_vnombre").attr('readonly', true).removeClass('validate');
        $("#_vcodigo").attr('readonly', true).removeClass('validate');
    }
});

$(document).on("click",".labdel",function(){
    var id = $(this).attr('id').substr(2);
    var $toastContent = $('<span>Desea eliminar esta fila?</span>').add($('<button class="btn-flat toast-action green white-text" id="delcomp" idfila="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 6000);
});

$(document).on("click","#delcomp",function(){
    var id = $(this).attr('idfila');
    $("#ifila"+id).removeData();
    $("#ifila"+id).remove();
});

$(document).on("click","#addmedio",function(){
    addmedio(1,'');
});

$(document).on("click","#adddato",function(){
    var idciclo=$("li.menu3 >a.active").parent().attr('id').substr(1);
    var sig= 1;
    var dato='';
    $(".valorextra").each(function(){
        if($(this).val() != ''){
            var id=$(this).attr('id').substr(4);
            var valor = $("#dtra"+id).val();
            dato= arr('login',4,'',940,'1,0,'+idciclo+','+id+',"'+valor+'"',0,0,0);
            if(dato['succed']==0){
                sig=0;
                return false;
            }else{
                sig=1;
            }
        }
    });
    if (sig == 1){
        Materialize.toast('Registro guardado correctamente', 4000, 'green');

    }else{
         Materialize.toast(dato[0]['ERROR'], 4000, 'red');
    }

});

$(document).on("click","#actmedio",function(){
    addmedio(2,$(this).data('ifila'));
});

function addmedio(tp,idfila) {
    var elemento = $("#_vnombre").val();
    var nombre = elemento.substr(0,elemento.lastIndexOf('-')-1) == '' ? $("#_vnombre").val() : elemento.substr(0,elemento.lastIndexOf('-')-1);
    var inventario = elemento.indexOf('-') < 0 ? '' : elemento.substr(elemento.lastIndexOf('-')+2);
    var comp = arr('login',4,'',920,'"'+nombre+'","'+inventario+'"',0,0,0);
    if (comp['succed'] == 1) {
        var idref = $("#_vidreferencia").val();
        var idciclo = $("#_vidciclo").val();
        var cantidad = $("#_vcantidad").val();
        var idunidad = $("#_vidunidad").val();
        var simbolo = arr('login',4,'UPPER(simbolo)',107,'id > 0 and id = '+idunidad,0,0,0)[0][0];

        if (tp == 1) {
            $("#listamedioscultivos").attr({
                'data-idreferencia': idref,
                'data-idciclo': idciclo
            });
            ifila++;
            //vaccion,vid,vidsolucion,vidproducto,vidunidad,vidinventario,vcantidad
            $("#listamedioscultivos").append(
                '<tr id="ifila'+ifila+'" class="detsolution">'+
                    '<td class="center" style="padding: 1% !important;">'+nombre+'</td>'+
                    '<td class="center" style="padding: 1% !important;">'+cantidad+' '+simbolo+'</td>'+
                    '<td class="center" style="padding: 1% !important;">'+
                        '<i class="pbtn mdi mdi-pencil mdi-24px labedit" id="le'+ifila+'"></i>'+
                        '<i class="pbtn mdi mdi-close mdi-24px cdel labdel" id="ld'+ifila+'"></i>'+
                    '</td>'+
                '</tr>');
            $("#ifila"+ifila).attr({
                'data-idproducto': comp[0][0][0],
                'data-idunidad': idunidad,
                'data-idinventario': comp[0][0][3],
                'data-cantidad': cantidad
            });
        }else{

            var cantidad = $("#_vcantidad").val();
            var idunidad = $("#_vidunidad").val();
            var simbolo = arr('login',4,'UPPER(simbolo)',107,'id > 0 and id = '+idunidad,0,0,0)[0][0];
            $("#ifila"+idfila+" > td:eq(1)").text(cantidad+' '+simbolo)
            $("#ifila"+idfila).data('idunidad',idunidad);
            $("#ifila"+idfila).data('cantidad',cantidad);

            $("#ifila"+idfila).attr({
                'data-cantidad': cantidad,
                'data-idunidad': idunidad
            });
            $("#_vnombre").attr('readonly',false).addClass('validate');
            $("#_vcodigo").attr('readonly',false).addClass('validate');
            $("#actmedio").attr('id', 'addmedio');
            $("#addmedio").removeAttr('data-ifila').removeClass('mdi-pencil').addClass('mdi-plus');
            $("#cancelact").addClass('hide');
        }
        emptymedio();
    }
    else{
        Materialize.toast(comp[0]['ERROR'], 4000, 'red');
        $("#_vnombre").select()
    }
}

$(document).on("keydown","#_vnombre",function(e) {
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)

    var inventario = invvar[1][0]+','+invvar[4][0];
    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
        $(".autocomplete-content").remove();
         $("#_vnombre").autocomplete({
            limit: 10,
            data: arr('login',4,'',917,'1,"'+busqueda+'","'+inventario+'"',0,0,0,1)
        });
        // cargarunidades(vidproducto,vunidad);  
        $("#_vnombre").siblings($(".autocomplete-content")).css('width', '25%');
    }else if(charCode == 13 ) {
        $("#_vcantidad").focus();
    }
});

$(document).on("keydown","#_vcodigo",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = keysight(e)
    var inventario = invvar[1][0]+','+invvar[4][0];

    if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
        var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;

        $(".autocomplete-content").remove();
        $("#_vcodigo").autocomplete({
            limit: 20,
            data: arr('login',4,'',917,'2,"'+busqueda+'","'+inventario+'"',0,0,0,1)
        });
        $("#_vcodigo").siblings($(".autocomplete-content")).css('width', '25%');
    }else if(charCode == 13 ) {
        $("#_vcantidad").focus();
    }
});

$(document).on("click",".savemedio",function(){
    //base: vaccion,vid,vidusuario,vidreferencia,vidsucursal,vidciclo
    var idreferencia = $("#listamedioscultivos").data('idreferencia');
    var idciclo = $("#listamedioscultivos").data('idciclo');
    var sig = 0;
    var antmedios = arr('login',4,'',921,idciclo+',@@impresa',0,0,0);
    var idsolucion = 0;
    var idempresa = $(this).attr('idempresa');
    if (antmedios[0].length == 0) {
        idsolucion = arr('login',4,'',918,'1,0,@@usr,'+idreferencia+','+idempresa+','+idciclo,0,0,0);
        if (idsolucion['succed'] == 1) {
        // detalle: vaccion,vid,vidsolucion,vidproducto,vidunidad,vidinventario,vcantidad
            $(".detsolution").each(function(){
                var id = $(this).attr('id').substr(5);
                var idproducto = $("#ifila"+id).data('idproducto');
                var idunidad = $("#ifila"+id).data('idunidad');
                var idinventario = $("#ifila"+id).data('idinventario');
                var cantidad = $("#ifila"+id).data('cantidad');
                var detalle = arr('login',4,'',919,'1,0,'+idsolucion[0][0]+','+idproducto+','+idunidad+','+idinventario+','+cantidad,0,0,0)
                if (detalle['succed'] == 0) {
                    Materialize.toast('ERROR', 4000, 'red');
                    return false;
                }else{
                    sig = 1;
                }
            });
            if (sig == 1) {
                Materialize.toast('Registro guardado correctamente', 4000, 'green');
            }
        }else{
            if ($("#listamedioscultivos .detsolution").length == 0) {
                Materialize.toast('Debe agregar componentes', 4000, 'red');
            }else{
                Materialize.toast(idsolucion[0]['ERROR'], 4000, 'green');
            }
        }
    }else{
        idsolucion = antmedios[0][0][0];
        arr('login',4,'',919,'3,0,'+idsolucion+',0,0,0,0',0,0,0)
        $(".detsolution").each(function(){
            var id = $(this).attr('id').substr(5);
            var idproducto = $("#ifila"+id).data('idproducto');
            var idunidad = $("#ifila"+id).data('idunidad');
            var idinventario = $("#ifila"+id).data('idinventario');
            var cantidad = $("#ifila"+id).data('cantidad');
            var detalle = arr('login',4,'',919,'1,0,'+idsolucion+','+idproducto+','+idunidad+','+idinventario+','+cantidad,0,0,0)
            if (detalle['succed'] == 0) {
                Materialize.toast('ERROR', 4000, 'red');
                return false;
            }else{
                sig = 1;
            }
        });
        if (sig == 1) {
            Materialize.toast('Registro guardado correctamente', 4000, 'green');
        }
    }

});

function emptymedio() {
    $("#_vnombre").val('');
    $("#_vcodigo").val('');
    $("#_vcantidad").val('');
    $("#_vidunidad").val(0);
    $("#_vidunidad").material_select();
    $(".validate").css('border-bottom', '1px solid #9e9e9e');
    $(".validate").css('box-shadow', 'none');
    $("#_vnombre").focus();
}

$(document).on("click",".modalmedios",function() {
    var tm = $(this).attr('tm');
    var referencias = arr('login',4,'',916,'0',0,0,0)[0];
    var idempresa = $(this).parent().parent().parent().parent().parent().parent().siblings().attr('idsuc');
    $(".savemedio").attr('idempresa',idempresa);
    for (var i = 0, len = referencias.length; i < len; i++) {
        $("#_vidreferencia").append('<option value="'+referencias[i][0]+'">'+referencias[i][1]+'</option>')
    }
    arr('login',6,'id,concat(nombre,"(",simbolo,")")',107,'id > 0 order by nombre',15,1,$("#_vidunidad"))
    $("#_vidciclo").val(tm)
    $("#_vidreferencia").material_select();
    $("#_vidunidad").material_select();
    var comps = arr('login',4,'',921,tm+','+idempresa,0,0,0);
    ifila = comps[0].length;
    if (comps[0].length > 0) {
        $("#listamedioscultivos").attr({
            'data-idreferencia': $("#_vidreferencia").val(),
            'data-idciclo': tm
        });
        arr('login',6,'',921,tm+','+idempresa,0,1,$("#listamedioscultivos"));
    }else{
        $("#listamedioscultivos").html('');
        $("#listamedioscultivos").removeAttr('data-idreferencia').removeAttr('data-idciclo');
    }
    $("#modal-medios").modal('open');
    
});

$(document).on('click','#addFin',function() {
	if ($("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] != 0) {
		$(".titadd").html("Agregar Finca");
		$(".cli").hide();
		$(".serv").hide();
		$(".prod").show();
		$("#ingresar").attr('codigo',"2");
		$("#addClie").modal('open');
        $("#vpais").val('Costa Rica');
        $("#vpais").blur();
        cargarProvincias();
        Materialize.updateTextFields();
	}else{
		Materialize.toast('Cliente Requerido',4000,'red');
		$("#ncli").focus();
	}
});

$(document).on("click","#registrar",function() {
    var id = $(this).attr('id').substr(1);
    if ($("#vvariedad").val() != '') {
        if ($("#videncargado").val() != 0) {
            var activos = arr('login',4,'',917,id+',@@impresa',0,0,0)[0];
            var serv = arr('login',4,'id,nombre',16,'id > 0 and nombre = "'+$("#vvariedad").val()+'"',0,0,0)[0][0];
            arr('login',6,'id,nombre',913,'id > 0 and isActivo = 0',15,1,$("#vidrazon"));
            arr('login',6,'id,nombre',1,'id > 0 and idtipousuario = 4',15,1,$("#encargado"))
            $("#modal-registrar").modal('open');
            $("#vidrazon").material_select();
            $("#encargado").material_select();
            $("#vvvar").text(serv[1]);
            $("#nomvar").val(serv[1]);
            $("#vidservicio").val(serv[0]);
            $("#nomvar").attr('disabled',true);
            Materialize.updateTextFields();
        }else{
            Materialize.toast('Operario requerido', 4000, 'red');
        }
    }else{
        Materialize.toast('Variedad requerida', 4000, 'red');
    }
    
});

// $(document).on("click","#chgbandeja",function() {
//     var idbandeja = $("#cfrasco").val();
//     $("#hidfrasco").val(idbandeja);
//     Materialize.toast('Bandeja seleccionada', 4000, 'green');
// });

$(document).on("click",".proc-ciclo",function() {
    var id = $(this).attr('id').substr(1);
    var tc = $(this).attr('tc');
    $("#titciclo").text($(this).attr('title'));
    $("#titciclo").text();
    $("#doproc").attr('idciclo',id);
    $("#doproc").attr('tc',tc);
    var fecha = new Date();
    var dpick = $('#fechaini');
    dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
    $("#modal-proc-ciclo").modal('open');
    arr('login',6,'id,nombre',913,'id > 0 and isactivo = 0 and idsucursal in(-1,@@impresa)',15,1,$("#srazon"));
    arr('login',6,'id,nombre',1,'id > 0 and idtipousuario = 4',15,1,$("#encargado_qos"));

    /*Obtener Opciones de Ciclo*/
    var opcionesCiclo = getDatos('',935,$("li.menu3 >a.active").parent().attr('id').substr(1),0,0,0);

    var svari = arr('login',4,'',924,id,0,0,0);
    $("#svari").val(svari[0][0][1]);
    $("#varfinal").text(svari[0][0][1]);
    $("#idserv").val(svari[0][0][0]);
    $("#vvvar").text(svari[0][0][1]);
    Materialize.updateTextFields();

    arr('login',6,'',411,invvar[4+(5*(1-1))][0],15,1,$("#cfrasco"));
    if ($("#hidfrasco").val() != 0) {
        $("#cfrasco").val($("#hidfrasco").val());
    }else{
        $("#cfrasco").val(0);
    }
    $("select").material_select();
    // $("#encargado_qos").material_select();
});

$(document).on("click","#doproc",function(){
    // registro total de cantidades
    var idciclo = $(this).attr('tc') == 1 ? parseInt($(this).attr('tc'))+1 : $(this).attr('tc');
    var id = $(this).attr('idciclo');
    var cfinal = $("#cantfinal").val() == '' ? 0 : $("#cantfinal").val();
    var cini = $("#cantinicial").val() == '' ? 0 : $("#cantinicial").val();
    var idservicio = $("#idserv").val();
    var cont = 0;
    var fecha = $("#fechaini").pickadate().pickadate('picker').get('select', 'yyyy-mm-dd');
    if (cfinal != 0) {
        // var finalcount = arr('login',4,'',925,'1,0,"'+parseInt(idciclo-1)+','+id+'",8,'+idservicio+',0,'+cfinal+',@@usr,"Registro de cantidad final de variedad '+$("#varfinal").text()+'"',0,0,0);
        var finalcount = arr('login',4,'',925,'1,0,"'+id+'",7,'+idservicio+',0,'+cfinal+',@@usr,"Registro de cantidad final de variedad '+$("#varfinal").text()+'"',0,0,0);
        if (finalcount['succed'] == 0){
            Materialize.toast('Error de registro de cantidad total', 6000, 'red');
            return false;
        }
        var cantini = arr('login',4,'',925,'1,0,"'+(parseInt(id)+1)+'",1,'+idservicio+',0,'+cini+',@@usr,"Registro de cantidad inicial de siguiente proceso"',0,0,0);
        if (cantini['succed'] == 0){
            Materialize.toast('Error de registro de cantidad inicial', 6000, 'red');
            return false;
        }
        // registro de perdidas
        var idrazon = $("#srazon").val();
        var cant = $("#cantsrv").val() == '' ? 0 : $("#cantsrv").val();
        if (idrazon != 0) {
            if (cant > 0) {
                // var perdidas = arr('login',4,'',925,'1,0,"'+idciclo+','+id+'",'+idrazon+','+idservicio+',0,'+cant+',@@usr,"Registro de pérdidas"',0,0,0);
                var perdidas = arr('login',4,'',925,'1,0,"'+id+'",'+idrazon+','+idservicio+',0,'+cant+',@@usr,"Registro de pérdidas"',0,0,0);
                if (perdidas['succed'] == 0) {
                    Materialize.toast('Error en registro de perdidas', 6000, 'red');
                    return false;
                }
            }else{
                Materialize.toast('Cantidad de pérdida requerida', 4000, 'red');
                return false;
            }
        }else{
            if (cant > 0) {
                Materialize.toast('Razon de pérdida requerida', 4000, 'red');
                return false;
            }
        }
        
        // realizar multiplicacion
        var idbandeja = $("#hidfrasco").val();
        var idmedio = $("#hidmediocultivo").val();
        var ciclo = arr('login',4,'',914,id+','+idciclo+','+idbandeja+','+idmedio+',@@impresa,0,"'+fecha+'"',0,0,0);
        if (ciclo['succed'] == 0) {
            Materialize.toast(ciclo[0]['ERROR'], 4000, 'green');
            return false;
        }else{
             
            Materialize.toast($("#titciclo").text().substr(11)+' procesada', 4000, 'green');
            
            arr('login',6,'',912,'0,0,"'+$("li.menu3 >a.active").parent().attr('id').substr(1)+',@@impresa,@@usr","0,10"',0,1,$("#listaciclos"))
        }
        //procesar a QoS
        var encargado = $("#encargado_qos").val();
        var cantqos = $("#cant_qos").val() == '' ? 0 : $("#cant_qos").val();
        if (encargado != 0 && cantqos > 0) {
            var qos = arr('login',4,'',914,ciclo[0][0]+',5,0,0,@@impresa,'+encargado+','+fecha,0,0,0);
            if (qos['succed']) {
                arr('login',4,'',925,'1,0,"'+qos[0][0]+'",6,'+idservicio+',0,'+cantqos+','+encargado+',"Cantidad en revision"',0,0,0);
            }
        }
        emptyprocmult();
    }else{
        Materialize.toast('Cantidad final necesaria para procesar a multiplicación', 6000, 'red');
    }
});

function emptyprocmult() {
    $("#cantfinal").val('');
    $("#cantsrv").val('');
    $("#srazon").val(0);
    $("#svari").val('');
    $("#idserv").val(0);
    $("#hidfrasco").val(0);
    $("#hidmediocultivo").val(0);
    $("#encargado_qos").val(0);
    $("#cant_qos").val('');
    $("select").material_select();
    Materialize.updateTextFields();
    $(".validate").css('border-bottom', '1px solid #9e9e9e');
    $(".validate").css('box-shadow', 'none');
    $("#modal-procmult").modal('close');
}

$(document).on("click",".mcb",function() {
    var id = $(this).attr('id').substr(1);
    $("#modal-vmediocultivo").modal('open');
    var bdy = '';
    var mats = arr('login',4,'',916,id+',@@impresa',0,0,0)[0];

    for (var i = 0, len = mats.length; i < len;i++) {
        bdy += '<tr><td style="padding: 10px; color:black;">'+mats[i][1]+'</td><td style="padding: 10px; color:black;">'+mats[i][2]+'</td></tr>';
    }
    // Falta medios de cultivo
    $("#listamediocultivos").html(bdy)

});

// $(document).on("click",".procact",function(){
//     var id = $(this).attr('id').substr(1);
//     $("#vidciclo").val(id);
//     arr('login',6,'id,nombre',913,'id > 0 and isActivo = 1',15,1,$("#vidrazon"))
//     var activos = arr('login',4,'',917,id+',@@impresa',0,0,0)[0];
//     $("#modal-procActivos").modal('open');
//     $("#vidrazon").material_select();

//     $("#nomact").keydown(function(e) {
//         var charCode = e.which || e.keyCode;
//         var charStr = keysight(e);
//         if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
//             $(".autocomplete-content").remove();
//             $("#nomact").autocomplete({
//                 limit: 20,
//                 data: arr('login',4,'',917,'"'+$("#nomact").val()+'",'+id+',@@impresa',0,0,0,1)
//             })
//             $("#nomact").siblings($(".autocomplete-content")).css('width','50%');
//         }
//     });
// });

$(document).on("click",".invstats",function(){
    var id = $(this).attr('id').substr(1);
    $("#doinvstat").attr('idciclo',id);
    var tipo = $(this).attr('tipo');
    $("#doinvstat").attr('tipo',tipo);
    if (tipo == 1)
        $("#titinvstat").html('Procesar Activos');
    else
        $("#titinvstat").html('Registrar Pérdidas');
    
    // if
        $("#vactivo").html('');
        $("#vidciclo").val(id);
        $("#listaactivos").html('');
        $("#vcant").val('');
        $(".validate").css('border-bottom', '1px solid #9e9e9e');
        $(".validate").css('box-shadow', 'none');
    // if
    arr('login',6,'',926,id,15,1,$("#vactivo"))
    arr('login',6,'id,nombre',913,'id > 0 and isActivo = '+tipo,15,1,$("#vidrazon"))
    $("select").material_select();
    $("#modal-invstats").modal('open');
});

$(document).on("click","#addActivo",function(){
    var idactivo = $("#vactivo").val();
    var activo = $("#vactivo option:selected").text();
    var cantidad = $("#vcant").val();
    var idrazon = $("#vidrazon").val();
    var razon = $("#vidrazon option:selected").text();
    ifila2++
    if (idactivo == 0) {
        Materialize.toast('Debe seleccionar un activo', 4000, 'orange');
    }else if (idrazon == 0){
        Materialize.toast('Debe seleccionar una razón', 4000, 'orange');
    }else if (cantidad == '' || cantidad <= 0){
        Materialize.toast('Digite una cantidad', 4000, 'orange');
    }
    else{
        $("#listaactivos").append('<tr class="activosperdida" id="ap'+ifila2+'" data-idactivo="'+idactivo+'" data-cantidad="'+cantidad+'" data-idrazon="'+idrazon+'">'+
            '<td class="center" style="padding: 1% !important;">'+activo+'</td>'+
            '<td class="center" style="padding: 1% !important;">'+cantidad+'</td>'+
            '<td class="center" style="padding: 1% !important;">'+razon+'</td>'+
            // '<td class="center">'+
            //     '<i class="pbtn gtext mdi mdi-pencil mdi-24px edit" id="ma'+ifila2+'"></i>'+
            //     '<i class="pbtn gtext mdi mdi-close mdi-24px delete" id="da'+ifila2+'"></i>'+
            // '</td>'+
        '</tr>');
        $("#vactivo").val(0);
        $("#vcant").val('');
        $("#vidrazon").val(0);
        $("select").material_select();
    }
});

$(document).on("click","#doinvstat",function(){
    var idciclo = $("li.menu3 >a.active").parent().attr('id').substr(1);
    var id = $(this).attr('idciclo');
    var comen = '';
    var tipo = $(this).attr('tipo') == 1 ? comen = 'Procesamiento de activos' : comen = 'Registro de pérdidas';
    var perdidas = 0;
    $(".activosperdida").each(function(){
        var idfila = $(this).attr('id').substr(2);
        var idactivo = $("#ap"+idfila).data('idactivo');
        var cantidad = $("#ap"+idfila).data('cantidad');
        var idrazon = $("#ap"+idfila).data('idrazon');
        perdidas = arr('login',4,'',925,'1,0,"'+idciclo+','+id+'",'+idrazon+','+idactivo+',0,'+cantidad+',@@usr,"'+comen+'"',0,0,0);
    });
    if (perdidas['succed'] == 1) {
        Materialize.toast('Registro guardado correctamente', 4000, 'green');
        $("#listaactivos").html('');
    }else{
        Materialize.toast(perdidas[0]['ERROR'], 4000, 'green');
    }
});

$(document).on("blur","#nomact",function(){
    var nombre = $(this).val();
    var prod = arr('login',4,'id',11,'nombre = "'+nombre+'"',0,0,0);
    if (prod[0][0] != undefined) {
        $("#hnomact").val(prod[0]);
    }else{
        $("#hnomact").val(0);
    }
});

$(document).on("click","#prcactivo",function(){
    // vaccion,vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vidusuario,vcomentario
    var idciclo = $("#vidciclo").val(),
    idrazon = $("#vidrazon").val(),
    idproducto = $("#hnomact").val(),
    cantidad = $("#cantact").val(),
    comentario = $("#comentproc").val();
    var idinv = arr('login',4,'',918,'1,0,'+idciclo+','+idrazon+',0,'+idproducto+','+cantidad+',@@impresa,"'+comentario+'"',0,0,0);
    
});

$(document).on("click",".procenr",function(){
    var id = $(this).attr('id').substr(1);
    var $toastContent = $('<span>Proceder a enraizamiento?</span>').add($('<button class="btn-flat toast-action green white-text" id="doenr" idciclo="'+id+'">Aceptar</button>'));
    Materialize.toast($toastContent, 10000);
    
});

$(document).on("click",".perdidas",function(){
    $("#modal-perdidas").modal('open');
});

$(document).on('click','.addVariedad',function(){
	$(".titadd").html("Agregar Variedad");
	$(".serv").show();
	$(".nserv").hide();
	$("#ingresar").attr('codigo',"3");
	$("#vnombre_serv").val($("#vvariedad").val());
	Materialize.updateTextFields();
	$("#addClie").modal('open');
	$("#vcodigo_serv").focus();

});

$(document).on("click","#mbandeja",function(){
    var id = $("#invactivlab").val();
    if (id != 0) {
        $(".zelda").data('triforce')['vidbandeja'] = id;
        var bandeja = $("#invactivlab option:selected").text();
        $("#bandeja").val(bandeja);
        Materialize.toast('Bandeja seleccionada', 4000, 'green');
    }else{
        $(".zelda").data('triforce')['vidbandeja'] = 0;
        $("#bandeja").val('');
    }
});

$(document).on("change","#mc-cantidad",function(){
    var mult = $('option:selected',this).attr('mul');
    var valor = 0;
    $('.premc').each(function(){
        valor = $(this).attr('rpre')*mult;
        $(this).html( (valor).formatMoney(0,'.',',') );
    });
    
    /*if($("#cultivo").val() != '- - -'){
                var solucion = arr('login',7,1,932,'','null,@@usr,now(),'+$("#mc-cantidad").val()+',@@impresa,'+$("li.menu3 >a.active").parent().attr('id').substr(1),0,0);
                
                arr('login',7,2,915,'idmediocultivo = '+solucion[0][0][0]+',id='+ciclo[0][0][0],0,0,0);

                $('.premc').each(function(){
                    arr('login',4,'',933,$(this).attr('rid')+','+solucion[0][0][0],0,0,0);
                });
             }*/
});

$(document).on("click","#gcultivo",function(){
    $(this).attr('save',1);
    Materialize.toast("Medio de Cultivo Asignado",4000,'green');
    $("#cultivo").val("Medio Cultivo "+$("#mc-cantidad option:selected").html());
    $("#modal-formula").modal('close')
});

// $(document).on('click','.addClie',function(){
// 	$(".titadd").html("Agregar Cliente");
// 	$(".cli").show();
// 	$(".prod").hide();
// 	$(".serv").hide();
// 	$("#ingresar").attr('codigo',"1");
// 	$("#pais").val('Costa Rica');
// 	$("#pais").blur();

// 	var tmpname = $("#flaboratorio-explantes #ncli").val();

// 	$("#addClie #vnombre").val(tmpname.substring(0,tmpname.indexOf(' ')));
// 	tmpname = tmpname.substring(tmpname.indexOf(' ')+1);
	
// 	$("#addClie #vapellido1").val(tmpname.indexOf(' ') > 0 ? tmpname.substring(0,tmpname.indexOf(' ')) : tmpname);
// 	tmpname = tmpname.indexOf(' ') > 0 ? tmpname.substring(tmpname.indexOf(' ')+1) : '';

// 	$("#addClie #vapellido2").val(tmpname);
// 	Materialize.updateTextFields();
// 	$("#addClie").modal('open');
// 	$("#vcedula").focus();

// });

function loadAjustes(){

    var opt = '<option disabled selected value="0">Seleccione una Opción</option>';
    var opts = getDatos('id,nombre,idsucursal',111,'id > 0 and if(@@tmp_cia = -1,1, idsucursal in(@@impresa,-1)) order by nombre',0,0,0)[0];
    for (var i = 0; i < opts.length; i++) {
         opt += '<option value='+opts[i][0]+'>'+opts[i][1]+'</option>';
    }
    
    $(".role_inv").material_select('destroy');
    $(".role_inv").html(opt);
    $(".role_inv").material_select();
    var elementoLB = '';
    for (var i = 0; i < invvar.length; i += 5) {

        switch(parseInt(invvar[i][2])){
            case 1:
                elementoLB = 'CT';
                break;
            case 2:
                elementoLB = 'CF';
                break;
            case 3:
                elementoLB = 'HE';
                break;
            case 4:
                elementoLB = 'BM';
                break;
            case 5:
                elementoLB = 'PS';
                break;
            default:
                break;
        }

        $("#invVariedad"+elementoLB).val(invvar[i][0]);
        $("#invreactivos"+elementoLB).val(invvar[i+1][0]);
        $("#invcomp"+elementoLB).val(invvar[i+3][0]);
        $("#inv-bandejas"+elementoLB).val(invvar[i+2][0]);
        $("#inv-frascos"+elementoLB).val(invvar[i+4][0]);
        $("select").material_select();
    }

    $(document).on("change",".role_inv",function(){
        if($(this).attr('tp') != undefined){
            console.log('idinventario = "'+$(this).val()+'"','id='+$(this).attr('tp'))
            arr('login',7,2,907,'idinventario = "'+$(this).val()+'"','id='+$(this).attr('tp'));
        }
    });

    $(document).on("click",".relaciones",function(){
        var vidsucursal = $(this).attr('tp');
        var relacion = arr('login',4,'count(id),ifnull(max(id)+1,1)',911,'id > 0 and idsucursal in(-1,'+vidsucursal+')',0,0,0)[0][0];
        var lastid = relacion[1];
        relacion = relacion[0]
        $("#autoinc").val(lastid);
        $("#curpos").val(lastid);
        $("#flaboratorio-relaciones").html('');
        var index = 4+(5*(vidsucursal-1));
        if (invvar.length == 5)
            index = 4;

        if (relacion == 0) {
            arr('login',6,'',411,invvar[vidsucursal-1][0],15,1,$("#frascos1"))
            
            var p = mantenimiento('laboratorio',9,{"invbandejas":1,"invfrascos":invvar[index][0],"idsucursal" : vidsucursal });

            $("#flaboratorio-relaciones").html(p);
        }else{
            var p = mantenimiento('laboratorio',9,{"invbandejas":1,"invfrascos":invvar[index][0],"idsucursal" : vidsucursal });

            $("#flaboratorio-relaciones").html(p);
            var relaciones = arr('login',4,'*',911,'id > 0 and idsucursal in(-1,'+vidsucursal+')',0,0,0)[0];
            $.each(relaciones,function(index,relation){
                $("#frascos"+relation[0]).val(relation[2]);
            });
        }
        $(".zelda").data('triforce',{vid : 0,vidbandeja : 0,vidfrasco : 0,vcantidad : 1});
        $("#modal-bandejas").modal('open');
        $("select").material_select();
    });
    /*$(document).on("change","[id^=bandejas]",function(){
        var id = $(this).attr('id').substr(8);
        var idbandeja = $(this).val();
        $(".zelda").data('triforce')['vidbandeja'] = idbandeja;
        $("#caben"+id).select();
    });*/

    $(document).on("change","[id^=frascos]",function(){
        var id = $(this).attr('id').substr(7);
        var idfrasco = $(this).val();
        $(".zelda").data('triforce')['vidfrasco'] = idfrasco;
    });

    $(document).on("keyup","[id^=caben]",function(){
        var id = $(this).attr('id').substr(5);
        var cantidad = $(this).val();
        $(".zelda").data('triforce')['vcantidad'] = cantidad;
    });
};

$(document).on("click",".delline",function(){
    // var id = $(this).attr('id').substr(2);
    // if ($(".rowrel").length <= 1) {
    //     $("#bandejas"+id).val(0);
    //     $("#frascos"+id).val(0);
    //     $("#caben"+id).val(1);
    //     $("select").material_select();
    // }else{
    //     $("#rw"+id).remove();
    // }
});

function cargarArr(vid,velemento){
    arr('laboratorio',vid,'',0,'',0,1,velemento);

    $('.datepicker').pickadate({
        labelMonthNext: 'Siguiente',
        labelMonthPrev: 'Anterior',
        labelMonthSelect: 'Seleccione un Mes',
        labelYearSelect: 'Seleccione un Año',
        monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre' ],
        monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
        weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
        weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
        format: 'dd-mm-yyyy'
    });

    if ($("#vfecha").val() != undefined) {
        var fecha = new Date();
        var dpick = $('#vfecha');
        dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
    }

    $('select').material_select();
    $(".comentario").characterCounter();
    $(".modal").modal();
    

    $(".rbandeja").click(function(){
        arr('login',6,'',411,invvar[2][0],15,1,$("#invactivlab"))
        // $("#invactivlab").material_select();
        $("#modal-bandeja").modal('open');
        if ($("#bandeja").val() != '') {
            $("#invactivlab").val($(".zelda").data('triforce')['vidbandeja'])
        }
        $("#invactivlab").material_select();
    });

    Materialize.updateTextFields();
}

function loadCultivos(){

    $(".menu3").click(function(){
    	var id = $(this).attr('id').substr(1);
    	switch(parseInt(id)){
    		case 0:
    			cargarArr(2,$("#labajax"));
    			cargarExplantes();
    			break;
            case 1:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
                break;
            case 2:
                cargarArr(5,$("#labajax"));
                cargarMultiplicacion();
                break;
            case 3:
                cargarArr(5,$("#labajax"));
                cargarEnraizamiento();
                break;
            case 4:
                cargarArr(5,$("#labajax"));
                cargarAclimatacion();
                break;
            case 5:
                cargarArr(8,$("#labajax"));
                cargarQoS();
                break;
            case 6:
                $("#labajax").html('Reportes')
                break;
            case 7:
                cargarArr(17,$("#labajax"));
                cargarMedios();
                break;
    		default:
    			$("#labajax").html('Laboratorio sin Procesar')
    			break;
    	}
    	
        $(document).on("keyup",".numericlab",function(e){
            var code = e.wich || e.keyCode
            if(code == 13)
                $(this).blur()
        });

        $(document).on("blur",".numericlab",function(){
            var dec = $(this).attr('dec') == undefined ? 2 : $(this).attr('dec');
            $(this).val(parseFloat($(this).val().replace(/\./g,'').replace(/,/g,'.')).formatMoney(dec,',','.') )
        });
    });
}
function loadSustrato(){

    $(".menu3").click(function(){
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)){
            case 0:
                cargarArr(2,$("#labajax"));
                cargarExplantes();
                break;
            case 1:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
            case 5:
                cargarArr(8,$("#labajax"));
                cargarQoS();
                break;
            case 6:
                $("#labajax").html('Reportes')
                break;
            case 7:
                cargarArr(17,$("#labajax"));
                break;
            default:
                 cargarArr(16,$("#labajax"));
                break;
        }
        
    });

    
}
function loadBM(){

    $(".menu3").click(function(){
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)){
            case 0:
                cargarArr(2,$("#labajax"));
                cargarExplantes();
                break;
            case 36:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
                break;
            case 5:
                cargarArr(8,$("#labajax"));
                cargarQoS();
                break;
            case 6:
                $("#labajax").html('Reportes')
                break;
            case 7:
                cargarArr(17,$("#labajax"));
                break;
            default:
                 cargarArr(15,$("#labajax"));
                break;
        }
        
    });

    
}

function loadAvispas(){

    $(".menu3").click(function(){
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)){
            case 0:
                cargarArr(2,$("#labajax"));
                cargarExplantes();
                break;
            case 11:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
                break;
            case 6:
                $("#labajax").html('Reportes')
                break;
            case 7:
                cargarArr(17,$("#labajax"));
                break;
            default:
                cargarArr(6,$("#labajax"));
                break;
        }
        
    });

    
}

function loadHongos(){

    $(".menu3").click(function(){
        var id = $(this).attr('id').substr(1);
        switch(parseInt(id)){
            case 0:
                cargarArr(2,$("#labajax"));
                cargarExplantes();
                break;
            case 1:
                cargarArr(4,$("#labajax"));
                cargarIniciacion();
                break;
            case 5:
                cargarArr(8,$("#labajax"));
                cargarQoS();
                break;
            case 6:
                $("#labajax").html('Reportes')
                break;
            case 7:
                cargarArr(17,$("#labajax"));
                break;
            default:
                 cargarArr(7,$("#labajax"));
                break;
        }
        
    });

    $("#m1").click();
}

function loadSeguimiento(){
    $("#vlote").focus();
}

function cargarQoS(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vid:0,vidtipo:4,vidciclo:'',vidmediocultivo:0,vidbandeja:0,vguia:0});
}//cargar QOS

function cargarMedios() {
    $(".mediocultivo").click(function(){

        if ($("#gcultivo").attr('save') == 0) {
            var componentes = getDatos('',923,$("li.menu3 >a.active").parent().attr('id').substr(1)+',@@impresa',0,0,0);
            var tabla = '';
            for (var i = 0; i < componentes[0].length; i++) {
                
                tabla += '<tr id="fmc'+i+'"> <td style="padding: 0px;" class="center"> <input type="checkbox" class="filled-in" id="mccheck'+i+'"/> <label for="mccheck'+i+'"></label> </td> <td style="padding: 0px;"> '+componentes[0][i][0]+' </td><td style="padding: 0px;"> <span class="premc" rid="'+componentes[0][i][3]+'" rpre="'+componentes[0][i][1]+'">'+parseInt(componentes[0][i][1]).formatMoney(0,'.',',')+'</span> '+componentes[0][i][2]+'</td></tr>';
            };
            $("#mcul-lista").html(tabla);
        }

        $("#modal-formula").modal('open');
        
    });
}//CARGAR MEDIOS

function cargarAclimatacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"4,@@impresa,@@usr","0,10"',0,1,$("#listaciclos"))
}//cargar Aclimatacion

function cargarEnraizamiento(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"3,@@impresa,@@usr","0,10"',0,1,$("#listaciclos"))
}//cargar Enraizamiento

function cargarMultiplicacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:''});
    arr('login',6,'',912,'0,0,"2,@@impresa,@@usr","0,10"',0,1,$("#listaciclos"))
}//cargar Multiplicacion

function cargarIniciacion(){
    $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',vidmediocultivo:0,videncargado:0,vidbandeja:0,vcomentario:'',vlote:'',vidsucursal:'',videstado:1});

    $("#vvariedad").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(e);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            var busqueda = charCode == 8 ? $(this).val().slice(0,-1) : $(this).val()+charStr;
            $(".autocomplete-content").remove();

            $("#vvariedad").autocomplete({
                limit: 20,
                data: getVariedad_Down(busqueda)
            });
            $(".autocomplete-content").css('width','30%');
        }
    });

    $("#vvariedad").keyup(function(e){
        var code = e.which || e.keyCode;
        if (code == 13)
            $(this).blur();
    });

    $("#vvariedad").blur(function(){
        iniciarVaridad();
    });

    $(document).on("change","#videncargado",function(){
        $("#flaboratorio-ciclos .zelda").data('triforce')['videncargado'] = $(this).val();
    });

    // $(document).on('click','[id^=_c]',function(){
    //     var id = $(this).attr('id').substr(2);
    //     var elemento = $("#c"+id);
    //     var num = parseFloat($('#_n'+id).val());
    //     var tot = parseFloat($("#tplt").html());

    //     if(elemento.is(":checked")){
    //         elemento.attr('checked',false);
    //         $("#tplt").html(tot-num);
    //     }else{
    //         elemento.attr('checked',true);
    //         $("#tplt").html(tot+num);
    //     }
    // });

    $(document).on("click","[id^=_c]",function(){
        var id = $(this).attr('id').substr(2);
        if ($("#c"+id).is(":checked")) {
            $("#c"+id).attr('checked',false);
        }else{
            $("#c"+id).attr('checked',true);
            $("#_n"+id).select();
        }
        sumavariedad(id,0);

    });

    $(document).on("keyup","[id^=_n]",function(e){
        var code = e.which || e.keyCode;
        if (code != 8) {
            var id = $(this).attr('id').substr(2);
            if ($("#c"+id).is(":checked")) {
                var cant = parseFloat($("#_n"+id).val());
                if (!isNaN(cant)) {
                    sumavariedad(id,cant);
                }else{
                    Materialize.toast('Valor no válido', 4000, 'green');
                }
            }
        }
    });

    function sumavariedad(id,cant) {
        var total = 0;
        var servs = '';
        $("[name=serv]").each(function(){
            var vid = $(this).attr('id').substr(1);
            var cantidad = parseFloat($("#_n"+vid).val());
            if ($(this).is(":checked")) {
                servs += $(this).attr('id').substr(1)+',';
                total += cantidad;
                $("#tplt").text(total);
                
            }else if ($("[name=serv]:checked").length == 0) {
                $("#vidsrvs").val("");
                $("#tplt").text(0);
            }

            if ($(this).is(":checked")) 
                $(this).parent().parent().addClass('ciclos');
            else
                $(this).parent().parent().removeClass('ciclos');
        });
        $("#vidsrvs").val(servs);
    }

    // $(document).on('focus','[id^=_n]',function(){
    //     var elemento = $("#c"+$(this).attr('id').substr(2));
    //     elemento.change();
    // });

    // $(document).on('blur','[id^=_n]',function(){
    //     var id = $(this).attr('id').substr(2);
    //     // var elemento = $("#c"+id);
    //     var valor = $(this).val();
    //     if (isNaN(valor)) {
    //         $(this).focus().select();
    //         Materialize.toast('Valor no es Numérico',4000,'red');
    //         // elemento.attr('checked',false).change();
    //     }else{
    //         if (valor < 0 || valor > parseFloat($("#o"+id).data('cantidad')) ) {
    //             $(this).focus().select();
    //             Materialize.toast('Valor no es Válido',4000,'red');
    //             // elemento.attr('checked',false).change();
    //         }else{

    //         }
    //     }
    // });

}//cargar Iniciacion

function cargarExplantes(){
    $("#flaboratorio-explantes .zelda").data('triforce',{vidcliente:0,vidfinca:0,vidregion:0,vid:0,vidservicio: 0,vexpectativa: 0,vcantidad: 0,vguia:0,vidsucursal: ''});

    getIDExplante();

    $('#vfecha').change(function(){
        getIDExplante();
    });

    $("#expectativa").blur(function(){
        var num = isNaN($(this).val().replace(/,/g,'')) ? 0 : $(this).val().replace(/,/g,'');
        $("#flaboratorio-explantes .zelda").data('triforce')['vexpectativa'] = num;
    });

    $("#cantidad").blur(function(){
        var num = isNaN($(this).val().replace(/,/g,'')) ? 0 : $(this).val().replace(/,/g,'');
        $("#flaboratorio-explantes .zelda").data('triforce')['vcantidad'] = num;
    });

    // $("#vvariedad").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = keysight(charCode);
        
    //     if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();

    //         $("#vvariedad").autocomplete({
    //             limit: 20,
    //             data: getVariedad_Down($(this).val())
    //         });

    //         $(".autocomplete-content").css('width','30%');

    //     }
    // });

    // $("#vvariedad").keyup(function(e){
    // 	var code = e.which || e.keyCode;
    // 	if (code == 13)
    // 		$(this).blur();
    // });

    // $("#vvariedad").blur(function(){
    // 	if($(this).val().length <= 3)
    // 		$(this).val('');
    // 	else
    // 		cargarVaridad();
    // });

    // $("#ncli").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = keysight(charCode);
        
    //     if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();

    //         $("#ncli").autocomplete({
    //             limit: 20,
    //             data: arr('login',4,'trim(concat(nombre," ",apellido1," ",apellido2," *",ifnull(replace(cedula,"-",""),""),"*")) as nom,null',2,'!bisproveedor and id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
    //         });

    //         $(".autocomplete-content").css('width','30%');

    //     }
    // });

    $("#finca").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(charCode);
        
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();

            $("#finca").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',904,'id > 0 and idregion = '+$("#flaboratorio-explantes .zelda").data('triforce')['vidregion']+' having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
            });

            $(".autocomplete-content").css('width','25%');

        }
    });

    $("#finca").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		var idfinca = getDatos('id',904,'nombre = '+$(this).val()+' and idregion = '.$("#flaboratorio-explantes .zelda").data('triforce')['idregion'],0,0);
	    	if (idfinca['succed'] == 1) {
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = idfinca[0][0][0];
	    		$("#finca").focus();
	    	}else
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = 0;
    	}
    });

    $("#vregion").keydown(function(e){
        var charCode = e.which || e.keyCode;
        var charStr = keysight(charCode);
        if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
            $(".autocomplete-content").remove();
            $("#vregion").autocomplete({
                limit: 20,
                data: arr('login',4,'nombre as nom,null',903,'id > 0 having nom like "%'+$(this).val()+'%" and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#viddistrito option:selected").val()+' group by idubicacion) limit 20',0,0,0,1)
            });
            $(".autocomplete-content").css('width','25%');
        }
    });

    $("#vregion").keyup(function(e){
    	var code = e.which || e.keyCode;
    	if (code == 13){
    		var idregion = getDatos('id',903,'nombre = '+$(this).val()+' and idubicacion in(select id from developer.ubicaciones where iddistrito = '+$("#viddistrito option:selected").val()+' group by iddistrito)',0,0);

	    	if (idregion['succed'] == 1) {
	   //  		var $toastContent = $('<span>Región no Existente</span>').add($('<button class="btn-flat toast-action green white-text addRegion">Agregarla</button>'));
				// Materialize.toast($toastContent, 10000);
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidregion'] = idregion[0][0][0];
	    		$("#finca").focus();
	    	}else
	    		$("#flaboratorio-explantes .zelda").data('triforce')['vidregion'] = 0;
    	}
    });

    // $("#pais").keydown(function(e){
    //     var charCode = e.which || e.keyCode;
    //     var charStr = keysight(charCode);
    //     if (/[a-zA-Z0-9-_.&, ]/i.test(charStr) || charCode == 8) {
    //         $(".autocomplete-content").remove();
    //         $("#pais").autocomplete({
    //             limit: 20,
    //             data: arr('login',4,'nombre as nom,bandera',209,'id > 0 having nom like "%'+$(this).val()+'%" limit 20',0,0,0,1)
    //         });
    //         $(".autocomplete-content").css('width','25%');
    //     }
    // });

    // $("#pais").keyup(function(e){
    // 	var code = e.which || e.keyCode;
    // 	if (code == 13)
    // 		$(this).blur();
    // });

    // $("#pais").blur(function(){
    // 	cargarProvincias();
    // });

    $("#provincia").change(function(){
    	cargarCantones($('option:selected',this).val());
    });

    $("#canton").change(function(){
    	cargarDistritos($('option:selected',this).val());
    });

    $("#viddistrito").change(function(){
        cargarBarrios($('option:selected',this).val());
    });

    $("#ingresar").click(function(){
    	var validacion = validarCliente();
    	if(validacion)
    		Materialize.toast(validacion,4000,'red');
    	else{
    		switch(parseInt($(this).attr('codigo'))){
		    	case 2:
                    var validarfinca = validarFincas();
                    if (validarfinca == false) {
    		    		var id = $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'];
    		    		var _idubicacion = arr('login',7,1,239,'','null,'+$("#addClie #vidbarrio").val()+',"'+$("#addClie #vdireccion").val()+'",'+$("#addClie #vlatitud").val()+','+$("#addClie #vlongitud").val()+',2,'+id,0,0)[0][0];
    		    		var _idregion = getDatos('',905,'1,0,"'+$("#vregion").val()+'",'+_idubicacion,0,0)[0][0];
    		    		var _idFinca = getDatos('',901,'1,0,"'+$("#finca").val()+'",'+_idregion,0,0);
    		    		Materialize.toast('Finca Agregada Correctamente',4000,'green');
    		    		cargarTblFincas();
                        endDetail(0,1,'finca');
                        $("#addClie").modal('close');
                    }else{
                        Materialize.toast(validarfinca, 4000, 'red');
                    }
		    		break;
		    	default: 
		    		break;
    		}
    	}
    });

    $(document).on("click","[id^=r]",function(){
    	var id = $(this).attr('id').substr(1);
        if (!isNaN(id)) {
            $("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = id;
            $("#s"+id).prop('checked',true);
        }
    });
    Materialize.updateTextFields();
} //END CARGAR EXPLANTES

function getIDExplante(){
    var fch = $("#vfecha").pickadate().pickadate('picker').get('select', 'dd-mm-yyyy') == '' ? 'curdate()' : '"'+$("#vfecha").pickadate().pickadate('picker').get('select', 'dd-mm-yyyy')+'"';

    var rs = getDatos('concat(date_format('+fch+',"%d%m%Y"),lpad(count(id)+1,2,0)) as id',900,'fecha = "'+fch.replace(/"/g,"")+' 00:00:00" group by date_format(fecha,"%Y%m%d") and idsucursal = @@impresa',0,0)[0];

    rs = rs.length > 0 ? rs[0][0] : fch.replace(/-/g,'').replace(/"/g,"")+'01';

    $("#flaboratorio-explantes #vnombre").val(rs);
}

function getVariedad_Down(variedad) {
	return getDatos('',906,'"'+variedad+'","'+invvar[0][0]+'"',0,0,1);
}

function cargarProvincias(){
	var provincias = arr('login',4,'id,nombre',8,'idpais = (select id from developer.paises where nombre = \"'+$("#vpais").val()+'\")',0,0,0);
	$("#addClie #provincia").html('');
	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';
    if (provincias['succed']) {
    	for (var i = 0; i < provincias[0].length; i++) {
    		lprov += '<option value="'+provincias[0][i][0]+'">'+provincias[0][i][1]+'</option>';
    	}
    }
    $("#addClie #provincia").append(lprov);
    $("#addClie #provincia").val(0);
    $("#addClie #provincia").material_select('update');
};

function cargarCantones(vidprovincia){
	var cantones = arr('login',4,'id,nombre',9,'idprovincia = '+vidprovincia,'',0,'');
	$("#addClie #canton").html('');
	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';
    if (cantones['succed']) {
    	for (var i = 0; i < cantones[0].length; i++) {
    		lprov += '<option value="'+cantones[0][i][0]+'">'+cantones[0][i][1]+'</option>';
    	}
    }
    $("#addClie #canton").append(lprov);
    $("#addClie #canton").val(0);
    $("#addClie #canton").material_select('update');
};

function cargarDistritos(vidcanton){
	var distritos = arr('login',4,'id,nombre',10,'idcanton = '+vidcanton,'',0,'');
	$("#addClie #viddistrito").html('');
	var lprov = '<option value="0" disabled>Seleccione una Opción</option>';
    if (distritos['succed']) {
    	for (var i = 0; i < distritos[0].length; i++) {
    		lprov += '<option value="'+distritos[0][i][0]+'">'+distritos[0][i][1]+'</option>';
    	}
    }
    $("#addClie #viddistrito").append(lprov);
    $("#addClie #viddistrito").val(0);
    $("#addClie #viddistrito").material_select('update');
};

function cargarBarrios(viddistrito){
    var barrios = arr('login',4,'id,nombre',84,'iddistrito = '+viddistrito,'',0,'');
    $("#addClie #vidbarrio").html('');
    var lprov = '<option value="0" disabled>Seleccione una Opción</option>';
    if (barrios['succed']) {
        for (var i = 0; i < barrios[0].length; i++) {
            lprov += '<option value="'+barrios[0][i][0]+'">'+barrios[0][i][1]+'</option>';
        }
    }
    $("#addClie #vidbarrio").append(lprov);
    $("#addClie #vidbarrio").val(0);
    $("#addClie #vidbarrio").material_select('update');
};

function iniciarVaridad(){
    if ($("#vvariedad").val() != '') {
        var servicio = arr('login',4,'',910,'"'+$("#vvariedad").val()+'",@@impresa',0,0,0);
        if (servicio[0].length) {
            var obj;
            var str = '<div class="col s12 head1 padding1"><h6>Variedad: <b>'+servicio[0][0][1]+'</b></h6></div><table class="responsive-table striped highlight" id="resulti00"><thead class="tab2"><tr><th colspan="2" class="center">Cantidad</th> <th class="center">Procedencia</th> <th class="center">Fecha</th> </tr> </thead> <tbody vtabla="laboratorio-investadistica" id="flaboratorio-investadisticas" tp="4" rollback="">'; // id="bdyi00"

            for (var i = 0; i < servicio[0].length; i++) {
                obj = servicio[0][i];
                str += '<tr id="o'+obj[7]+'" idservicio="'+obj[2]+'" data-cantidad="'+obj[0]+'" ><td style="padding:0.5%; margin:0px" id="_c'+obj[7]+'"><input type="checkbox" id="c'+obj[7]+'" name="serv"/><label for="c'+obj[7]+'"></label></td><td style="padding:0.5px; margin:0px; padding-left: 20px;padding-right: 20px;width: 20%"><input type="text" id="_n'+obj[7]+'" value="'+obj[0]+'" style="padding:0.5px; margin:0px;height:1rem;width=80%" class="eder _var"/> <input type="hidden" id="hc'+obj[7]+'" value="'+obj[0]+'"/></td><td style="padding:0.5%; margin:0px">'+obj[4]+'</td><td style="padding:0.5%; margin:0px">'+obj[5]+' </td></tr>';
            }
            $("#vlote").val(servicio[0][0][6]);
            $("#flaboratorio-ciclos .zelda").data('triforce')['vlote'] = servicio[0][0][6];
            Materialize.updateTextFields();
            $("#result00").html(str+'</tbody></table>');
        }else{
            Materialize.toast("Variedad no Existente en Recepción", 4000,'red');
            //$("#result00").html('No se ha Elegido la Variedad');
        }
    } 
}

$(document).on("blur","._var",function(){
    var variedad = $(this).val();
    var id = $(this).attr('id').substr(2);
    var hvariedad = $("#hc"+id).val();
    if ( variedad < hvariedad) {
        Materialize.toast("No puede ingresarse una cantidad mayor a la asignada", 4000,'orange');
        $("#_n"+id).val(hvariedad).select().focus();
    }
});

function cargarVaridad(){
	var servicio = arr('login',4,'',43,'\"[SERV] '+$("#vvariedad").val()+'\",0,0,0','',0,'');

    if (servicio[0].length) {
        var vservicio = servicio[0][0];
        
        $("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = parseInt(vservicio[0])*-1;

        $("#vvariedad").val(vservicio[2].substr(7));

    }else{
    	$("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = 0;

	 	var $toastContent = $('<span>Variedad no Existente</span>').add($('<button class="btn-flat toast-action green white-text addVariedad">Agregarla</button>'));
		Materialize.toast($toastContent, 10000);
    }
}


// function cargarCliente(){
// 	var clie = arr('login',4,'',63,'\"'+$("#ncli").val()+'\",0','',0,'');

//     if (clie[0][0][0] != 0) {
//         var vclie = clie[0][0];
        
//         $(".zelda").data('triforce')['vidcliente'] = vclie[0];

//         $("#ncli").val(vclie[1]+' '+vclie[2]);
//         cargarTblFincas();
//     }else{
//     	$(".zelda").data('triforce')['vidcliente'] = 0;
//     	$(".zelda").data('triforce')['vidfinca'] = 0;
// 	 	var $toastContent = $('<span>Cliente no Existente</span>').add($('<button class="btn-flat toast-action green white-text addClie">Agregarlo</button>'));
// 		Materialize.toast($toastContent, 10000);
//     }
// }

function cargarTblFincas(){
	var fincas = getDatos('',902,$("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'],0,0);

	$("#fincas").html('');
	var lista = '<tr><td colspan="3" class="center">No Hay Datos Registrados</td></tr>';
    var checked = '';
	if(fincas['succed']){
		lista = '';
		for (var i = 0; i < fincas[0].length; i++) {
            if (fincas[0].length == 1) {
                checked = 'checked';
            }
			lista += '<tr id="r'+fincas[0][i][3]+'"><td><input type="radio" name="selfinca" id="s'+fincas[0][i][3]+'" class="der with-gap" '+checked+'/>  <label for="s'+fincas[0][i][3]+'"></label></td><td>'+fincas[0][i][0]+'</td><td>'+fincas[0][i][1]+'</td><td>'+fincas[0][i][2]+' </td></tr>';
		}
	}
    $("#flaboratorio-explantes .zelda").data('triforce')['vidfinca'] = fincas[0][0][3];
	$("#fincas").append(lista);
}

function validar (varreglo,vmodulo) {
	
	var salida = {}
	
		/*VALIDACION FRONT END*/
	
	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
			if (vmodulo['tip'] == '') {
				err = validarExplantes();
				if ( err ) {
					return err;
				}
			}
			break;
        case 'laboratorio-ciclo':
            if (vmodulo['tip'] == '') {
                err = validarCiclos();
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'cliente':
            if (vmodulo['tip'] == '') {
                err = validarClientes(vmodulo['modulo']);
                if ( err ) {
                    return err;
                }else{
                    // if ($("#viddistrito").val() == null) {
                    //     $("#viddistrito").children('option').prop('disabled',false);
                    //     $("#viddistrito").val(0);
                    //     $("#viddistrito").material_select();
                    // }
                }
            }
            break;
        case 'servicio':
            if (vmodulo['tip'] == '') {
                err = validarServicios(vmodulo['modulo']);
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'ubicacione':
            
            break;
        case 'laboratorio-relacione':
            if (vmodulo['tip'] == '') {
                err = validarRelaciones(vmodulo['modulo']);
                if ( err ) {
                    return err;
                }
            }
            break;
        case 'laboratorio-investadistica':

            break;
		default:
			return 'Módulo no Existente';
			break;
	}

	salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
	return salida;

}

function validarRelaciones() {
    var id = $("#autoinc").val();
    if ($("#frascos"+id).val() == 0) {
        return 'Seleccione un frasco';
    }

    if ($("#caben"+id).val() == 0 || $("#caben"+id).val() == '') {
        return 'Cantidad debe ser mayor a 0';
    }

    return false
}

function validarFincas() {
    if ($("#addClie #vidpais").val() == '') {
        $("#addClie #vidpais").focus();
        return 'Pais requerido';
    }

    if ($("#addClie #vidbarrio").val() == null || $("#addClie #vidbarrio").val() == 0) {
        return 'Barrio requerido';
    }

    if ($("#addClie #vregion").val() == '') {
        return 'Region requerido';
    }

    if ($("#addClie #finca").val() == '') {
        return 'Finca requerido';
    }

    return false;
}

function validarClientes(mod) {
    if ($("#f"+mod+"s #cedula").val().trim().length == 0) {
        $("#f"+mod+"s #cedula").focus();
        return 'El campo Cédula es requerido';
    }

    if ($("#f"+mod+"s #nombre").val().trim().length == 0) {
        $("#f"+mod+"s #nombre").focus();
        return 'El campo Nombre es requerido';
    }

    if ($("#f"+mod+"s #vidbarrio").val() == null) {
        return 'El campo Barrio es requerido';
    }

}

function validarServicios(mod) {
    if ($("#f"+mod+"s #vcodigo").val().trim().length == 0) {
        $("#f"+mod+"s #vcodigo").focus();
        return 'El campo Código es requerido';
    }

    if ($("#f"+mod+"s #vnombre").val().trim().length == 0) {
        $("#f"+mod+"s #vnombre").focus();
        return 'El campo Nombre es requerido';
    }

    if ($("#f"+mod+"s #vidinventario").val() == 0) {
        return 'El campo Inventario es requerido';
    }

}

function validarCiclos(){
     var idtipo = parseInt($(".zelda").data('triforce')['vidtipo']);

    switch(idtipo){
        case 1: //INICIACION

            var id  = 0;
            $("#flaboratorio-ciclos .zelda").data('triforce')['vidciclo'] = '';
            $("#flaboratorio-investadisticas tr").each(function(){
                id = $(this).attr('id').substr(1);
                if($("#c"+id).is(":checked")) {
                    $("#flaboratorio-ciclos .zelda").data('triforce')['vidciclo'] += id+',';
                    // vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vfecha datetime,vidusuario,vcomentario
                    // '?,'+
                    $("#o"+id).data('triforce',{vaccion:0,vid:0,vidciclo:id,vidtipo:$("li.menu3 >a.active").parent().attr('id').substr(1),vidservicio:$("#o"+id).attr('idservicio'),vidproducto:0,vcantidad:$("#_n"+id).val(),vidusuario:0,vcomentario:'Cantidad inicial de proceso'});
                }
            })

            if ($("#flaboratorio-ciclos .zelda").data('triforce')['vidciclo'] == '' ) {
                return 'No se a Seleccionado una Recepción';
            }

            if ($("#videncargado").val() == 0 ) {
                $("#videncargado").focus();
                return 'No se a Seleccionado el Operario';
            }

            if ($("#vcomentario").val().length <= 0 ) {
                $("#vcomentario").focus();
                return 'Comentario Requerido';
            }

            if ($("#encargado").val() != 0) {
                $("#flaboratorio-ciclos .zelda").data('triforce')['videstado'] = 2;
            }else{
                $("#flaboratorio-ciclos .zelda").data('triforce')['videstado'] = 1;
            }
            
            $(".zelda").data('triforce')['vcomentario'] = $("#vcomentario").val()

            break;
        default:
            break;
    }
    return false;
}

function validarExplantes() {

	return false;
}

function validarCliente(){

	switch(parseInt($("#ingresar").attr('codigo'))){
		case 1:
			if (trim($("#addClie #vnombre").val().length) == 0) {
				$("#addClie #vnombre").focus();
				return 'Nombre de Cliente Requerido';
			}

			if (trim($("#addClie #vcedula").val().length) == 0) {
				$("#addClie #vcedula").focus();
				return 'Cédula de Cliente Requerida';
			}

			if ($("#addClie #vdistrito option:selected").val() == 0) {
				$("#addClie #vdistrito").focus();
				return 'Distrito de Cliente Requerido';
			}
			break;
		case 2:
			if ($("#addClie #vdistrito option:selected").val() == 0) {
				$("#addClie #vdistrito").focus();
				return 'Distrito de Cliente Requerido';
			}
			break;
		default:
			break;

	}

	return false;
}

function endDetail(vid,vacc,modulo){
    if (vacc == 1) {
    	switch(modulo){
    		case 'laboratorio-explante':
    			
    			break;
            case 'laboratorio-ciclo':
                var idtipo = parseInt($(".zelda").data('triforce')['vidtipo']);
                switch(idtipo){
                    case 1: //INICIACION
                        //INGRESAR INV. ESTADISTICA
                        // vaccion,vid,vidciclo,vidtipo,vidservicio,vidproducto,vcantidad,vidusuario,vcomentario
                        var tipo = $("#vidrazon").val(),
                        serv = arr('login',4,'id',16,'nombre = "'+$("#nomvar").val()+'"',0,0,0)[0][0],
                        prod = 0,
                        cant = $("#cantact").val(),
                        comen = $("#comentproc").val(),
                        fecha = $("#fechaini").val(),
                        encargado = $("#flaboratorio-ciclos .zelda").data('triforce')['videncargado'] == 0 ? '@@ur' : $("#flaboratorio-ciclos .zelda").data('triforce')['videncargado'];
                        arr('login',4,'',918,'1,0,'+vid+','+tipo+','+serv+','+prod+','+cant+',@@usr,"'+comen+'"',0,0,0);
                        $("#modal-registrar").modal('close');
                       
                        var perdida = arr('login',4,'',925,'1,0,"'+vid+'",'+tipo+','+serv+',0,'+cant+','+encargado+',"'+comen+'"',0,0,0);
                        if ($("#encargado").val() != 0) {
                            var qos = arr('login',4,'',914,vid+',5,0,0,@@impresa,'+$("#encargado").val()+','+fecha,0,0,0);
                            if (qos['succed']) {
                                arr('login',4,'',925,'1,0,"'+qos[0][0]+'",6,'+serv+',0,'+$("#cantqos").val()+','+$("#encargado").val()+',"Cantidad en revision"',0,0,0);
                            }
                        }
                        $("#vidrazon").val(0);
                        $("#nomvar").val('');
                        $("#cantact").val(0);
                        $("#comentproc").val('');
                        $("#cantqos").val('');
                        $("#vidrazon").material_select();
                        $(".validate").css('border-bottom', '1px solid #9e9e9e');
                        $(".validate").css('box-shadow', 'none');
                        break;
                    default:
                        break;
                }
                deadclear(modulo);
                $(".zelda").removeData('triforce');
                $("#flaboratorio-ciclos .zelda").data('triforce',{vaccion:0,vid:0,vidtipo:1,vidciclo:'',videncargado:0,vidbandeja:0,vcomentario:'',vlote:'',vidempresa:''});
                $("#result00").html('No se ha Elegido la Variedad');
                $("#tplt").text(0);
                break;
            case 'cliente':
                deadclear('cliente');
                $("#ncli").val($("#fclientes .zelda").data('triforce')['vnombre']+" "+$("#fclientes .zelda").data('triforce')['vapellido1']+" "+$("#fclientes .zelda").data('triforce')['vapellido2']);
                $("#fclientes .zelda").removeData();
                $("#fclientes .zelda").data('triforce',{vid : 0,vapellido1 : '',vapellido2 : '',vnombre : '',vcedula : '',vidtipocliente : 1,videstado : 1,vbisproveedor : 0,vidnivel : 0,vcredito : 0,vplazo : 0,videstadocontable : 0,vbisnacional : 1,vweb : '',vdescuentom : 0,vcodigo : '',vidcuenta : 0,_sid : '@@@'});
                $("#flaboratorio-explantes .zelda").data('triforce')['vidcliente'] = vid[0][0];
                $(".validate").css('border-bottom', '1px solid #9e9e9e');
                $(".validate").css('box-shadow', 'none');
                $("#provincia").val(0);
                $("#canton").val(0);
                $("select").material_select();
                break;
            case 'finca':
                clearform('finca');
                $("#canton").val(0);
                $("#viddistrito").val(0);
                $("#vidbarrio").val(0);
                $("select").material_select();
                break;
            case 'servicio':
                deadclear('servicio');
                $("#vvariedad").val($("#fservicios .zelda").data('triforce')['vnombre']);
                $("#fservicios .zelda").removeData();
                $("#fservicios .zelda").data('triforce',{vid : 0,vcodigo : '',vnombre : '',vdescripcion : '',vpbase : 0,vperiodo : 0,vdias : 0,vidproveedor : 0,vprecio : 0,vpganancia : 0,vidinventario : 0,vidmoneda : 1,vservprofesional : 0,vidsuc : -1});
                $("#flaboratorio-explantes .zelda").data('triforce')['vidservicio'] = vid[0][0];
                $(".validate").css('border-bottom', '1px solid #9e9e9e');
                $(".validate").css('box-shadow', 'none');
                break;
            case 'laboratorio-relacione':
                var vidsucursal = $(".relaciones").attr('tp');
                var id = parseInt($("#autoinc").val());
                console.log(id)
                id++;
                $("#flaboratorio-relaciones").append('<tr id="rw'+id+'" class="rowrel zelda"><td style="padding: 10px; color:black;"><div class="input-field"><select type="select" id="frascos'+id+'" class="invfrascos"></select></div></td><td style="padding: 10px; color:black;"><div class="input-field"><input type="number" id="caben'+id+'" class="caben" value="1" min="1"></div></td><td style="padding: 10px; color:black;"><a class="waves-effect waves-light gtext pbtn addline add" modulo="laboratorio-relacione" id="al'+id+'" tp="5"><i class="mdi mdi-plus pbtn mdi-18px"></i></a><a class="waves-effect waves-light gtext pbtn delline delete" modulo="laboratorio-relacione" id="dl'+id+'" tp="5"><i class="mdi mdi-close pbtn mdi-18px"></i></a></td></tr>');
                setTimeout(function(){
                    /*arr('login',6,'',411,invvar[2][0],15,1,$("#bandejas"+id));*/
                    var index = 4+(5*(vidsucursal-1));
                    if (invvar.length == 5) {
                        index = 4;
                    }
                    arr('login',6,'',411,invvar[index][0],15,1,$("#frascos"+id));
                    $("select").material_select();
                    // $(".zelda").data('triforce',{vid : 0,vidfrasco : 0,vcantidad : 1})
                    $(".zelda").data('triforce',{vid : 0,vidbandeja : 0,vidfrasco : 0,vcantidad : 1})
                    $("#autoinc").val(id)
                },100);
                
                break;
            case 'mediocultivo':
                var idciclo = $("#_vidciclo").val();
                arr('login',6,'',921,idciclo+',@@impresa',0,1,$("#listamedioscultivos"));
                $("#_vnombre").val('');
                $("#_vcodigo").val('');
                $("#_vcantidad").val('');
                $("#_vidunidad").val('');
                $("#_vidreferencia").val(1);
                $("select").material_select();
                break;
            default:
                break;
    	}
    }else if (vacc == 3) {
        if ($(".rowrel").length <= 1) {
            $("#bandejas"+vid).val(0);
            $("#frascos"+vid).val(0);
            $("#caben"+vid).val(1);
            $("select").material_select();
        }else{
            $("#rw"+vid).remove();
        }
    }
    return false;
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

function clearform(vform) {
    switch (vform) {
        case 'finca':
            $("#addClie #pais").val('');
            $("#addClie #provincia").val(0);
            $("#addClie #canton").val(0);
            $("#addClie #viddistrito").val(0);
            $("#addClie #vregion").val('');
            $("#addClie #finca").val('');
            $("#addClie #vdireccion").val('');
            $("#addClie #vlatitud").val(0);
            $("#addClie #vlongitud").val(0);
            break;
        $("select").material_select();
        Materialize.updateTextFields();
    }
}

function cargar(vmodulo,vid) {


	switch(vmodulo['modulo']) {
		case 'laboratorio-explante':
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
