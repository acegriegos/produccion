$(function(){
    var html = '';
    var mdate;

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });
    $(".principal .filtros").append('<div class="col s12" id="fbtns"><span style="font-weight: bold;font-size: 20px;">FILTROS DEL REPORTE</span><a class="waves-effect waves-light blue btn der" title="Ocultar Filtros"><i class="mdi mdi-chevron-up ofiltr"></i></a><a class="waves-effect waves-light btn der blue" style="margin-right:2%;" title="Generar Reporte" onclick="doreport()">Generar</a> <a class="der btn-floating sendrep" style="margin-right:2%;" title="Enviar por Correo"><i class="mdi mdi-send mdi-24px"></i></a>  <a class="der btn-floating excel" style="margin-right:2%;" title="Exportar a Excel" data-parametros=\'{"vista":"","titulo":"","suma":""}\'><i class="mdi mdi-file-excel mdi-24px"></i> <i class="mdi mdi-send mdi-24px"></i></a> <a class="hide" id="irpdf"></a>  <a class="der btn-floating pdf hide" style="margin-right:2%;" title="Exportar a PDF"><i class="mdi mdi-file-pdf mdi-24px"></i> </a> </div><br>   <div class="modal modal-fixed-footer" id="modal-correos" style="height: 200px;"><div class="modal-content"><span>Enviar por Correo a:</span> <div class="chips chips-initial white-text" id="listcorreos"></div> </div><div class="modal-footer"><a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a><a class="modal-action modal-close waves-effect waves-green btn-flat" id="sndcrr">Enviar</a></div></div>');

    mdate = $(".principal .filtros").attr('porcliente');
    if (mdate != undefined){
        var pc = $(".principal .filtros").attr('bisprov') == undefined ? 'Razón Social': parseInt($(".principal .filtros").attr('bisprov')) ? 'Proveedor' : 'Cliente';

        html = '<div class="row col s12 m6 rous" style="margin: 0px"><div class="col s4"><input type="checkbox" id="chkcliente" value="3" class="repcheck"><label for="chkcliente" class="pbtn">Por '+pc+'</label></div><div class="col s8 '+mdate+'" id="fltr3"><div class="input-field" style="margin:0px"><label for="cliente">Nombre</label><input type="text" class="validate init eder autocomplete" id="cliente" style="margin: 0px" autocomplete="off"><input type="hidden" id="vidcliente" class="inpreport" value="0" /></div></div></div>';

        $(".principal .filtros").append(html);

        $("#cliente").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            var prov = $(".principal .filtros").attr('bisprov') == undefined ? '': 'and bisproveedor='+$(".principal .filtros").attr('bisprov');
            var prov_select = $(".principal .filtros").attr('bisprov') == undefined ? ',if(bisproveedor,"(Proveedor)","")': '';
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#cliente").autocomplete({
                    limit: 10,
                    data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2,", ",cedula),null',2,'id > 0 '+prov+' and concat(nombre," ",apellido1," ",apellido2) like \"%'+$("#cliente").val()+'%\" and idsucursal in(-1,@@impresa) limit 10',0,0,0,1),
                    onAutocomplete: function(val){
                        var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2,", ",cedula) like "%'+$("#cliente").val()+'%" and id > 0 '+prov+'  and idsucursal in(-1,@@impresa)',0,0,0)[0][0];

                            if (id != undefined){
                                $("#vidcliente").val(id);
                                doreport();
                            }
                            else
                                $("#vidcliente").val(0);
                    }
                });
                $("#cliente").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

     mdate = $(".principal .filtros").attr('porProducto');
    if (mdate != undefined){

        html = '<div class="row col s6 rous" style="margin:0;"><div class="col s4"><input type="checkbox" id="chkprod" value="4" class="repcheck"><label for="chkprod" class="pbtn">Por Producto</label></div><div class="col s8 '+mdate+'" id="fltr4" style="paddin:0"><div class="input-field" style="margin:0;"><label for="productos" class="width:100%">Nombre</label><input type="text" class="validate init autocomplete" style="margin:0;padding:0" id="productos"><input type="hidden" id="vidproducto" class="inpreport" value="0" /></div></div></div>';

        $(".principal .filtros").append(html);

        $("#productos").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#productos").autocomplete({
                    limit: 10,
                    data: arr('login',4,'nombre,null',11,'id >0 and nombre like \"%'+$("#productos").val().replace(/"/g,'\\\"')+'%\" and idsucursal in(-1,@@impresa) order by nombre limit 10',0,0,0,1),
                     onAutocomplete: function(val){
                        var id = arr('login',4,'id',11,'nombre = "'+$("#productos").val().replace(/"/g,'\\"')+'" and id > 0  and idsucursal in(-1,@@impresa)',0,0,0)[0][0];
                            if (id != undefined){
                                $("#vidproducto").val(id[0]);
                                doreport();
                            }
                            else
                                $("#vidproducto").val(0);
                    }
                });
                $("#productos").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

    mdate = $(".principal .filtros").attr('porusuario');
    if (mdate != undefined) {
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="chkusuario" value="4" class="repcheck"><label for="chkusuario" class="pbtn">Por Usuario</label></div><div class="col s9 '+mdate+'" id="fltr4"><div class="input-field"><label for="usuario">Usuario o Nombre</label><input type="text" class="validate init eder autocomplete" id="usuario"><input type="hidden" id="vidusuario" class="inpreport" value="0" ></div></div></div>';
        $(".principal .filtros").append(html);

        $("#usuario").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#usuario").autocomplete({
                    limit: 10,
                    data: arr('login',4,'nombre,null',1,'nombre like \"%'+$("#usuario").val()+'%\" or user like \"%'+$("#usuario").val()+'%\" and find_in_set(@@impresa,idsucursal) limit 10',0,0,0,1),
                     onAutocomplete: function(val){
                           var id = arr('login',4,'id',1,'(nombre = "'+$("#usuario").val()+'" or user = "'+$("#usuario").val()+'") and id > 0 and find_in_set(@@impresa,idsucursal)',0,0,0)[0][0];
                            if (id != undefined)
                                $("#vidusuario").val(id);
                            else
                                $("#vidusuario").val(0);
                    }
                });
                $("#usuario").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

    mdate = $(".principal .filtros").attr('entrenumeros');
    if (mdate != undefined) {
        html = '<div class="row col s12 m6 rous" style="margin:0;"><div class="col s4"><input type="checkbox" id="xnum" value="2" class="repcheck"><label class="pbtn" for="xnum">Entre <label class="variable-s">Números</label></label></div><div class="col s8 '+mdate+'" id="fltr2"><div class="col s6"><div class="input-field"><input type="number" class="validate init eder inpreport" id="vnum1" value="0"><label for="vnum1">Número1</label></div></div><div class="col s6"><div class="input-field"><input type="number" class="validate eder inpreport" id="vnum2" value="0" ><label for="vnum2">Número2</label></div></div></div></div>';
        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('entrefechas');

    if (mdate != undefined){
        var tmfech = (mdate.length - mdate.replace(/,/g,'').length);
        html = '';
        var vl = '';
        tmfech = !tmfech ? 1 : tmfech;
        for(var i = 1 ;i <= tmfech;i++){
            vl = i == 1 ? '' : i;
            html += '<div class="row col s12 m6 l6 rous" style="margin:0"><div class="col s4"><input type="checkbox" id="xfec'+vl+'" value="1" class="repcheck"><label for="xfec'+vl+'" class="pbtn">Entre Fechas</label></div><div class="col s8" id="fltr1"><div class="col s6"><input type="date" class="validate init inpreport" id="vdesde'+vl+'" value="" str="1"></div><div class="col s6"><input type="date" class="validate inpreport" id="vhasta'+vl+'" value="" str="1"></div></div></div>';
        }
        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('pormarca');
    if (mdate != undefined) {
        var opts;
        var stropts;

        opts = getDatos('id,if(char_length(trim(nombre)),nombre,"Sin Asignar") as nombre ',20,'id > 0 and idsucursal = @@impresa group by nombre order by nombre',0,0,0);
        console.log(opts)
        stropts = '<option value="0">Sin Asignar</option>';
        for(var j = 0;j<opts[0].length;j++)
            stropts += '<option value="'+opts[0][j][0]+'">'+opts[0][j][1]+'</option>';

        html = '<div class="row col s12 m6 l6 rous" style="margin:0px"><div class="col s3"><input type="checkbox" id="porfam" value="5" class="repcheck"><label for="porfam" class="pbtn">Por Familia</label></div><div class="col s9" id="fltr5"><select type="select" id="vporfam" class="inpreport tipos" ttbl="20">'+stropts+'</select></div></div> <div class="row col s12 m6 l6 rous" style="margin:0px"><div class="col s3"><input type="checkbox" id="portip" value="6" class="repcheck"><label for="portip" class="pbtn">Por Tipo</label></div><div class="col s9" id="fltr6"><select type="select" id="vportip" class="inpreport tipos" ttbl="21"><option value="0">Seleccione una Familia</option></select></div> </div> <div class="row col s12 m6 l6 rous" style="margin:0px"><div class="col s3"><input type="checkbox" id="pormar" value="7" class="repcheck"><label for="pormar" class="pbtn">Por Marca</label></div><div class="col s9" id="fltr7"><select type="select" id="vpormar" class="inpreport tipos" ttbl="22"><option value="0">Seleccione un Tipo</option></select></div></div>';

        $(".principal .filtros").append(html);

        $("#_porfam").change(function(){

        })
    }

    mdate = $(".principal .filtros").attr('portipo');
    if (mdate != undefined) {
        if ($(".principal .filtros").attr('portipo') == 'varios') {
            var vtbl = JSON.parse("[" + $(".principal .filtros").attr('tbltipos') + "]");
            var vtype = JSON.parse("[" + $(".principal .filtros").attr('types') + "]");
            var tipos = $(".principal .filtros").attr('tipos').split(",");
            var active = $(".principal .filtros").attr('tpactive') == undefined ? '' : $(".principal .filtros").attr('tpactive').split(',');
            var vwhere = $(".principal .filtros").attr('tfiltar') == undefined ? {} : $(".principal .filtros").attr('tfiltar').split(',');
            var vsel = $(".principal .filtros").attr('tsel') == undefined ? '' : $(".principal .filtros").attr('tsel').split(';');
            var vids = $(".principal .filtros").attr('vids') == undefined ? '' : $(".principal .filtros").attr('vids').split(','); 
            var inc = 0;
            var filtro = 5;
            var type = stractive = '';
            var strwhere;
            var opts;
            var stropts;
            var sel;
            var mid;
            for (var i = 0, len = vtbl.length; i < len; i++) {
                inc += 1;
                stractive = active[i] == '1' ? 'checked' : '';
                mdi = 'vidtipo'+inc;
                if(vids != '')
                    mdi = vids[i] == '0' ? mdi : vids[i];

               switch(parseInt(vtype[i])){
                    case 1://para select
                    case 7:// multiple
                    vwhere[i] = vwhere[i] == undefined ? '' : vwhere[i];

                    if(vwhere[i].startsWith('(')){
                        vwhere[i] = vwhere[i].replace(/\(/g,'').replace(/\)/g,'').replace(/\^/g,',')
                        let vsel = vwhere[i].substr(0,vwhere[i].indexOf(','))
                        vwhere[i] = vwhere[i].substr(vwhere[i].indexOf(',')+1)
                        let vtbl = vwhere[i].substr(0,vwhere[i].indexOf(','))
                        vwhere[i] = vwhere[i].substr(vwhere[i].indexOf(',')+1)
                        opts = getDatos(vsel,vtbl,vwhere[i]) 
                        vwhere[i] = undefined;
                    }
                    else{
                        sel = vsel[i] == undefined ? 'id,nombre' : vsel[i] == '' ? 'id,nombre' : vsel[i]; 
                        opts = getDatos(sel,vtbl[i],'id > 0');
                    }
                    
                    stropts = '';
                    for(var j = 0;j<opts[0].length;j++)
                        stropts += '<option value="'+opts[0][j][0]+'">'+opts[0][j][1]+'</option>';

                    if(vtype[i] == '7')
                        type = '<select type="select" multiple id="'+mdi+'" class="inpreport tipos" ttbl="'+vtbl[i]+'"><option selected disbaled value="0">Seleccione una Opción</option>'+stropts+'</select>';
                    else
                        type = '<select type="select" id="'+mdi+'" class="inpreport tipos" ttbl="'+vtbl[i]+'"><option selected disbaled value="0">Seleccione una Opción</option><option value="-1">Todas</option>'+stropts+'</select>';

                    break;
                    case 2: //para numero
                        type = '<input type="number" id="'+mdi+'" class="validate inpreport tipos eder" style="margin:0px"><label for="'+mdi+'" str="1">'+tipos[i]+'</label>';

                    break;
                    case 3: //solo check
                        type = '<input type="hidden" id="'+mdi+'" class="validate inpreport tipos" style="margin:0px" value="-1" str="1">';
                        break;
                    case 4: //select create
                        var options = $(".principal .filtros").attr('options').split(",");
                        var optionsval = $(".principal .filtros").attr('optionsval').split(",");
                        var stroptions = '';
                        for (var j = 0; j < options.length; j++) {
                            stroptions += '<option value="'+optionsval[j]+'">'+options[j]+'</option>';
                        }

                        type = '<select type="select" id="'+mdi+'" class="inpreport tipos">'+stroptions+'</select>';
                        break;
                    case 5: //para fecha unica
                        type = '<input type="date" id="'+mdi+'" class="validate inpreport tipos" style="margin:0px" str="1">'
                        break;
                    case 6: //para fecha de mes
                        type = '<input type="month" id="'+mdi+'" class="validate inpreport tipos" style="margin:0px;border:0px;" str="1">';
                        break;
                    case 8: //PARA FILTRO AÑADIDO
                        type = '<input type="number" id="'+mdi+'" class="validate inpreport tipos eder" style="margin:0px"><label for="'+mdi+'" str="1">'+tipos[i]+'</label>';
                        break;
                    default://para texto
                        type = '<input type="text" id="'+mdi+'" class="validate inpreport tipos eder" style="margin:0px"><label for="'+mdi+'" str="1">'+tipos[i]+'</label>';

                    break;
                }

                html = '<div class="row col s12 m6 l6 rous" style="margin:0px"><div class="col s3"><input type="checkbox" id="chktipo'+inc+'" value="'+filtro+'" class="repcheck" '+stractive+'><label for="chktipo'+inc+'" class="pbtn">'+tipos[i]+'</label></div><div class="col s9 '+mdate+'" id="fltr'+filtro+'"><div class="input-field" style="margin:0px">'+type+'</div></div></div>';
                $(".principal .filtros").append(html);
                
                switch(parseInt(vtbl[i])) {
                    case -1:
                        break;
                    case 0:
                        $("#chktipo"+inc).addClass('justChange').prop('indeterminate',true)
                        break;
                    default:
                        if(vwhere[i] != undefined){
                            strwhere = vwhere[i] == '0' ? '' : ' and id in('+vwhere[i].replace(/&/g,',')+')';
                            arr('login',6,'id,nombre',vtbl[i],'id > 0 '+strwhere+' order by id',15,1,$("#vidtipo"+inc));
                        }
                        break;
                }
                    
                filtro += 1;
            }
            $('select').material_select();
        }
    }

    var dt_filtro = $(".filtros").data('filtros');
    if(dt_filtro){
        html = '<div class="row col s4" id="nselects"></div> <div class="row col s4" id="selects"></div> <div class="row col s3" id="checks"></div>'
        $(".principal .filtros").append(html);
        
        $.each(dt_filtro,function(v,i){
            let name = v;
            let type = dt_filtro[v]['tipo'] == undefined ? 0 : dt_filtro[v]['tipo'];
            let text = dt_filtro[v]['texto'] == undefined ? '' : dt_filtro[v]['texto'];
            let item = '';
            let spre = '';
            let pre_vl = 0;

            if(dt_filtro[v]['pre'] != undefined){
                let pre = dt_filtro[v]['pre'];
                let lpre = '';
                
                switch(parseInt(pre['tipo'])){
                    case 1:
                    default:
                        $.each(pre['opciones'],function(x,y){
                            lpre += '<li>'+y['name']+'</li>';
                        });
                        spre = '<a class="dropdown-button tooltipped pbtn" data-activates="_'+pre['id']+'" data-position="button" data-tooltip="Cambiar Filtro" style="position:absolute;top:15">'+pre['default']+'</a>'+
                            '<ul id="_'+pre['id']+'" class="dropdown-content">'+lpre+'</ul>';
                            pre_vl = pre['value'] == undefined ? 0 : pre['value'];
                        break;
                }
            }

            switch(type){
                case 3: //CHECK
                    let checked = dt_filtro[v]['checked'] == undefined ? '' : 'checked';

                    item = '<input type="checkbox" id="'+v+'" '+checked+'><label for="'+v+'" class="pbtn">'+text+'</label>';
                    break;
                case 2: //NUMBER
                    item = '<span class="prefix" style="font-size:16px;">'+text+spre+'</span><input type="number" id="'+v+'" class="eder" style="margin:0px" placeholder="--">';
                    break;
                case 1: //INPUT TEXT
                default:
                    let auto = "";
                    let hd = "";
                    let eclass = "";
                    let eattr = "";

                    if(dt_filtro[v]['autocomplete'] != undefined){
                        auto = "autocomplete"
                        hd = '<input type="hidden" id="'+dt_filtro[v]['autocomplete']['id']+'" value="0" />'
                    }

                    if(dt_filtro[v]['class'] != undefined){
                        eclass = dt_filtro[v]['class']
                    }

                    if(dt_filtro[v]['attr'] != undefined){
                        eattr = dt_filtro[v]['attr']
                    } 

                    item = '<span class="prefix" style="font-size:16px;">'+text+'</span><input type="text" id="'+v+'" class="eder '+auto+' '+eclass+'" '+eattr+' style="margin:0px" placeholder="--" autocomplete="off">'+hd;
                    break;
            }

            switch(type){
                case 1:
                case 2:
                    $("#nselects").append('<div class="input-field" style="margin:0px;">'+item+'</div>');
                    break;
                case 3:
                    $("#checks").append('<div class="col s6" style="margin:0px;">'+item+'</div>');
                    if(dt_filtro[v]['indeterminate'] != undefined)
                        $("#"+v).prop('indeterminate',true).addClass('_justChange').val(-1)
                    break;
                default:
                    break;
            }

            if($("#"+v).attr('vl') != undefined)
                $("#"+v).val($("#"+v).attr('vl'))
            
            if(pre_vl != 0)
                $("#"+dt_filtro[v]['pre']['id']).val(pre_vl)
        })

        $('.dropdown-button').dropdown();
        $('.tooltipped').tooltip({delay: 50,duration:1000});

        if(!$("#selects").children().length)
            $("#selects").remove()
        if(!$("#nselects").children().length)
            $("#nselects").remove()
        if(!$("#checks").children().length)
            $("#checks").remove()
    }

    $("[id^=fltr]").hide();
    $("[id^=fltr].auto").show();
    $("[id^=fltr].auto").prev().children().children().prop('checked',true);
});

$(document).on("click",".optnsflt",function(){
    var elem = $("#"+$(this).parent().parent().attr('id').substr(1));
    elem.removeAttr('class')
    elem.addClass('mdi '+$(this).attr('tipo')+' mdi-24px')
    elem.val($(this).attr('fltr'));
});

$(document).on("click",".justChange",function(){

    var id =  $(this).attr('id').substr(7)
    var valor = 0;
    var status = $(this).attr('stat') == undefined ? 1 : $(this).attr('stat');

    switch(parseInt(status)){
        case 1: //check
            $(this).prop('checked',true)
            valor = 1;
            status = 2;
            break;
        case 2: //uncheck
            $(this).prop('checked',false)
            valor = 0;
            status = 3;
            break;
        case 3: //itermediate
            $(this).prop('indeterminate',true)
            valor = -1;
            status = 1;
            break;
        default:
            break;
    }
    
    $("#vidtipo"+id).val(valor)
    $(this).attr('stat',status);
});

$(document).on("keydown",".cliente",function(e){
    var charCode = e.which || e.keyCode;
    var charStr = String.fromCharCode(charCode);
    var elem = $(this);
    var prov = elem.attr('bisprov') == undefined ? '': 'and bisproveedor';
    
    if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
        $(".autocomplete-content").remove();
        elem.autocomplete({
            limit: 10,
            data: arr('login',4,'concat(nombre,", ",cedula),null',2,'id > 0 '+prov+' and nombre like \"%'+elem.val()+'%\" and idsucursal in(-1,@@impresa) limit 10',0,0,0,1),
            onAutocomplete: function(val){
                var id = arr('login',4,'id',2,'concat(nombre,", ",cedula) like "%'+elem.val()+'%" and id > 0 '+prov+'  and idsucursal in(-1,@@impresa)',0,0,0)[0][0];

                    if (id != undefined){
                        $("#vidcliente").val(id);
                        doreport();
                    }
                    else
                        $("#vidcliente").val(0);
            }
        });
        elem.siblings($(".autocomplete-content")).css('width','25%');
    }
});

$(document).on("click","._justChange",function(){
    var valor = 0;
    var status = $(this).attr('stat') == undefined ? 1 : $(this).attr('stat');

    switch(parseInt(status)){
        case 1: //check
            $(this).prop('checked',true)
            valor = 1;
            status = 2;
            break;
        case 2: //uncheck
            $(this).prop('checked',false)
            valor = 0;
            status = 3;
            break;
        case 3: //itermediate
            $(this).prop('indeterminate',true)
            valor = -1;
            status = 1;
            break;
        default:
            break;
    }
    
    $(this).val(valor)
    $(this).attr('stat',status);
});

$(document).on("click","#sndcrr",function(){
    var vpara = '';
    var para = $('.chips-initial').material_chip('data');
    var sucursal = getDatos('if(pfisico <> "",pfisico,nombre)',39,"id=@@impresa",0,0,0)[0][0][0];

    for (var i = 0; i < para.length; i++) {
        if(para[i].tag.length)
            vpara += para[i].tag+',';
    }
    vpara=vpara.substring(0,vpara.length -1);

    var resultado = rexcel();

    mantenimiento('login',11,{sel:'',tbl:resultado['tbl'],where:resultado['vatr'],vista:$(".excel").data('parametros')['vista'],tit:$("#titrep").html(),archivo:$("#titrep").html()+", "+sucursal,save:1,conteo:1,suma:$(".excel").data('parametros')['suma']},1);

    enviarCorreo(3,vpara,"Reporte de "+$("#titrep").html()+", "+sucursal,"Se adjuntan los archivos correspondientes.",'excel/'+$("#titrep").html()+", "+sucursal+".xlsx",0,0,0);

    Materialize.toast('Correo Enviado',4000,'green');
});

$(document).on("click",".excel",function(){
    var sucursal = getDatos('replace(if(pfisico <> "",pfisico,nombre),"#","^")',39,"id=@@impresa",0,0,0)[0][0][0];
    
    var resultado = rexcel()

    window.location = "login?accion=11&arreglo[sel]=&arreglo[tbl]="+resultado['tbl']+"&arreglo[where]="+resultado['vatr']+"&arreglo[save]=0&arreglo[vista]="+$(".excel").data('parametros')['vista']+"&arreglo[tit]="+$("#titrep").html()+"&arreglo[archivo]="+$("#titrep").html()+", "+sucursal+"&arreglo[conteo]=1&arreglo[suma]="+$(".excel").data('parametros')['suma'];
});

$(document).on("click",".pdf",function(){

    var resultado = rreport();

    var $toastContent = $('<span style="width: 500px" id="shpdf">Generando PDF:</span>').add($('<div class="progress expect"><div class="indeterminate"></div></div>'));
        Materialize.toast($toastContent);

    $.get('login',{accion:8,arreglo:{sel:'',tbl:resultado.vtbl,where:resultado.vattr,mic:1,tit:$("#titrep").html(),arch:$(this).attr('arch')}})
        .done(function(data){
           $("#shpdf").html('PDF Generado')
           $(".expect").removeClass('progress');
           $(".expect").html("<i class='mdi mdi-24px mdi-check green-text'></i>");
           data =JSON.parse(data);
            var link = document.createElement('a');
            link.href = '../assets/pdf/'+data;
            link.download = data;
            link.dispatchEvent(new MouseEvent('click'));
            
           //setTimeout(function(){ 
                $("#shpdf").parent().remove();
                $.get('login',{accion:17,arreglo:{file:'../assets/pdf/'+data}})
                .done(function(data){
                    console.log(data);
                })
            //}, 3000);
           
        })
});

$(document).on("click",".sendrep",function(){
    $("#modal-correos").modal();
    $("#modal-correos").modal('open');

    $('.chips-initial').material_chip({
        data: getCorreos(),
     });
});

$(document).on("click",".detail",function(){
    var id = $(this).attr('id').substr(2);
    $("#dt"+id).text('[-]');
    $(this).removeClass('detail');
    $(this).addClass('lessdetail')
    $("#xa"+id).removeClass('hide');
    $(".xb"+id).removeClass('hide');
});

$(document).on("click",".lessdetail",function(){
    var id = $(this).attr('id').substr(2);
    $("#dt"+id).text('[+]');
    $(this).removeClass('lessdetail');
    $(this).addClass('detail')
    $("#xa"+id).addClass('hide');
    $(".xb"+id).addClass('hide');
});

$(document).on("change",".repcheck",function(){
    var id = $(this).attr('value');
    if($(this).prop('checked')){
        $("#fltr"+id).show();
        $("#fltr"+id).find('.init').select();
        $("#vidtipo"+ $(this).attr('id').substr(7)).focus();
    }
    else{
        $("#fltr"+id).hide();
        $("#fltr"+id+' input').each(function(){
            switch($(this).attr('type')){
                case 'date':
                case 'text':
                    $(this).val('');
                    break;
                case 'number':
                    $(this).val(0);
                    break;
                default:
                    break;
            }
        })
    }
});

// $(document).on("blur",".vid",function(){
//     arr('login',4,'id',$(this).attr('tbl'),'nombre = \"'+$(this).val()+'\"',0,0,0)[0][0];
// });

$(document).on("click",".ofiltr",function(){
    $(".filtros").hide();
    $(".sfiltr").show();
});

$(document).on("click",".sfiltr",function(){
    $(".filtros").show();
    $(this).hide();
});

function validar (varreglo,vmodulo) {

    var salida = {}
    switch(vmodulo['modulo']) {
        case 'reporteFactura':
        if (vmodulo['tip'] == '') {
            err = validarReporte();
            if (err)
                return err
        }
        break;
        default:
        return 'Módulo "'+vmodulo['modulo']+'" no Existente';
        break;
    }
    
    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    // console.log(salida)
    return salida;

}

function validarReporte() {
    if ($("#xcli").is(":checked") && $("#hcli").val() == 0) {
        $("#cliente").select();
        return 'Cliente no válido';
    }

    if ($("#xusu").is(":checked") && $("#husu").val() == 0) {
        $("#usuario").select();
        return 'Usuario no válido';
    }

    if ($("#xfec").is(":checked") && $("#hfec1").val() < $("#hfec2").val()) {
        $("#hfec1").select();
        return 'Fechas inválidas';
    }
}

function getCorreos(){
    var salida = "[";
    var p= getDatos('correoconta',40,'idsucursal = @@impresa',0,0,0)[0];

    for (var i = 0; i < p.length; i++) {
        salida+='{"tag":"'+p[i][0]+'"},';
    }

    if (p.length > 0) {
        return JSON.parse(salida.substring(0,salida.length -1)+"]");
    }else
        return '';
}

function postSendmail() {
    etTimeout(function(){$(".toast").remove();},1000)
}