$(function(){
    var html = '';
    var mdate;

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });
    $(".principal .filtros").append('<div class="col s12"><h3 align="center">FILTROS DEL REPORTE</h3><a class="waves-effect waves-light blue btn der" title="Ocultar Filtros"><i class="mdi mdi-chevron-up ofiltr"></i></a><a class="waves-effect waves-light btn der blue" style="margin-right:2%;" title="Generar Reporte" onclick="doreport()">Generar</a> <a class="der btn-floating sendrep" style="margin-right:2%;" title="Enviar por Correo"><i class="mdi mdi-send mdi-24px"></i></a>  <a class="der btn-floating excel" style="margin-right:2%;" title="Exportar a Excel" data-parametros=\'{"vista":"","titulo":"","suma":""}\'><i class="mdi mdi-file-excel mdi-24px"></i></a> </div><br>   <div class="modal modal-fixed-footer" id="modal-correos" style="height: 200px;"><div class="modal-content"><span>Enviar por Correo a:</span> <div class="chips chips-initial white-text" id="listcorreos"></div> </div><div class="modal-footer"><a class="modal-action modal-close waves-effect waves-green btn-flat">Salir</a><a class="modal-action modal-close waves-effect waves-green btn-flat" id="sndcrr">Enviar</a></div></div>');

    mdate = $(".principal .filtros").attr('porcliente');
    if (mdate != undefined){
        var pc = $(".principal .filtros").attr('bisprov') == undefined ? 'Razón Social': parseInt($(".principal .filtros").attr('bisprov')) ? 'Proveedor' : 'Cliente';

        html = '<div class="row col s12 m6 rous" style="margin: 0px"><div class="col s4"><input type="checkbox" id="chkcliente" value="3" class="repcheck"><label for="chkcliente" class="pbtn">Por '+pc+'</label></div><div class="col s8 '+mdate+'" id="fltr3"><div class="input-field" style="margin:0px"><label for="cliente">Nombre</label><input type="text" class="validate init eder autocomplete" id="cliente" style="margin: 0px"><input type="hidden" id="vidcliente" class="inpreport" value="0" /></div></div></div>';

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

        html = '<div class="row col s6 rous"><div class="col s12"><input type="checkbox" id="chkprod" value="4" class="repcheck"><label for="chkprod" class="pbtn">Por Producto</label></div><div class="col s12 '+mdate+'" id="fltr4"><div class="input-field"><label for="productos" class="width:100%">Nombre</label><input type="text" class="validate init autocomplete" id="productos"><input type="hidden" id="vidproducto" class="inpreport" value="0" /></div></div></div>';

        $(".principal .filtros").append(html);

        $("#productos").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#productos").autocomplete({
                    limit: 10,
                    data: arr('login',4,'nombre,null',11,'id >0 and nombre like \"%'+$("#productos").val()+'%\" and idsucursal in(-1,@@impresa) limit 10',0,0,0,1)
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
                           var id = arr('login',4,'id',1,'(nombre = "'+$("#usuario")+'" or user = "'+$("#usuario")+'") and id > 0 and find_in_set(@@impresa,idsucursal)',0,0,0)[0][0];
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
        html = '<div class="row col s12 m6 rous"><div class="col s4"><input type="checkbox" id="xnum" value="2" class="repcheck"><label class="pbtn" for="xnum">Entre <label class="variable-s">Números</label></label></div><div class="col s8 '+mdate+'" id="fltr2"><div class="col s6"><div class="input-field"><input type="number" class="validate init eder inpreport" id="vnum1" value="0"><label for="vnum1">Número1</label></div></div><div class="col s6"><div class="input-field"><input type="number" class="validate eder inpreport" id="vnum2" value="0" ><label for="vnum2">Número2</label></div></div></div></div>';
        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('entrefechas');
    if (mdate != undefined){
        html = '<div class="row col s12 m6 l6 rous"><div class="col s4"><input type="checkbox" id="xfec" value="1" class="repcheck"><label for="xfec" class="pbtn">Entre Fechas</label></div><div class="col s8 '+mdate+'" id="fltr1"><div class="col s6"><input type="date" class="validate init inpreport" id="vdesde" value="" str="1"></div><div class="col s6"><input type="date" class="validate inpreport" id="vhasta" value="" str="1"></div></div></div>';

        $(".principal .filtros").append(html);

        // $('.datepicker').pickadate({
        //     labelMonthNext: 'Siguiente',
        //     labelMonthPrev: 'Anterior',
        //     labelMonthSelect: 'Seleccione un Mes',
        //     labelYearSelect: 'Seleccione un Año',
        //     monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
        //     monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
        //     weekdaysFull: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
        //     weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
        //     weekdaysLetter: [ 'D', 'L', 'K', 'M', 'J', 'V', 'S' ],
        //     today: 'Hoy',
        //     clear: 'Limpiar',
        //     close: 'Cerrar',
        //     format: 'yyyy-mm-dd',
        //     selectMonths: true,
        //     selectYears: 10
        // });


        // var fecha = new Date();
        // var dpick = $('#vdesde');
        // dpick.pickadate('picker').set('select', [fecha.getFullYear(), fecha.getMonth(),fecha.getDate()]);
    }

    mdate = $(".principal .filtros").attr('portipo');
    if (mdate != undefined) {
        if ($(".principal .filtros").attr('portipo') == 'varios') {
            var vtbl = JSON.parse("[" + $(".principal .filtros").attr('tbltipos') + "]");
            var vtype = JSON.parse("[" + $(".principal .filtros").attr('types') + "]");
            var tipos = $(".principal .filtros").attr('tipos').split(",");
            var inc = 0;
            var filtro = 5;
            var type = '';
            for (var i = 0, len = vtbl.length; i < len; i++) {
                inc += 1;

                switch(parseInt(vtype[i])){
                    case 1://para select
                    type = '<select type="select" id="vidtipo'+inc+'" class="inpreport tipos" ttbl="'+vtbl+'"></select>';

                    break;
                    case 2: //para numero
                    type = '<input type="number" id="vidtipo'+inc+'" class="validate inpreport tipos" style="margin:0px"><label for="vidtipo'+inc+'">'+tipos[i]+'</label>';

                    break;
                    case 3: //solo check
                    type = '<input type="hidden" id="vidtipo'+inc+'" class="validate inpreport tipos" style="margin:0px" value="-1">';
                        break;
                    case 4: //select create
                        var options = $(".principal .filtros").attr('options').split(",");
                        var optionsval = $(".principal .filtros").attr('optionsval').split(",");
                        var stroptions = '';
                        for (var j = 0; j < options.length; j++) {
                            stroptions += '<option value="'+optionsval[j]+'">'+options[j]+'</option>';
                        }

                        type = '<select type="select" id="vidtipo'+inc+'" class="inpreport tipos">'+stroptions+'</select>';
                        break;
                    default://para texto
                    type = '<input type="text" id="vidtipo'+inc+'" class="validate inpreport tipos eder" style="margin:0px"><label for="vidtipo'+inc+'">'+tipos[i]+'</label>';

                    break;


                }

                html = '<div class="row col s12 m6 l6 rous" style="margin:0px"><div class="col s3"><input type="checkbox" id="chktipo'+inc+'" value="'+filtro+'" class="repcheck"><label for="chktipo'+inc+'" class="pbtn">'+tipos[i]+'</label></div><div class="col s9 '+mdate+'" id="fltr'+filtro+'"><div class="input-field" style="margin:0px">'+type+'</div></div></div>';
                $(".principal .filtros").append(html);
                
                switch(parseInt(vtbl[i])) {
                    case -1:
                        break;
                    case 0:
                        $("#chktipo"+inc).addClass('justChange').prop('indeterminate',true)
                        break;
                    default:
                        arr('login',6,'id,nombre',vtbl[i],'id > 0 order by id',15,1,$("#vidtipo"+inc));
                        break;
                }
                    
                filtro += 1;
            }
            $('select').material_select();
        }
    }

    $("[id^=fltr]").hide();
    $("[id^=fltr].auto").show();
    $("[id^=fltr].auto").prev().children().children().prop('checked',true);
});

$(document).on("click",".justChange",function(e){

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
    var sucursal = getDatos('if(pfisico <> "",pfisico,nombre)',39,"id=@@impresa",0,0,0)[0][0][0];
    
    var resultado = rexcel()

    window.location = "login?accion=11&arreglo[sel]=&arreglo[tbl]="+resultado['tbl']+"&arreglo[where]="+resultado['vatr']+"&arreglo[save]=0&arreglo[vista]="+$(".excel").data('parametros')['vista']+"&arreglo[tit]="+$("#titrep").html()+"&arreglo[archivo]="+$("#titrep").html()+", "+sucursal+"&arreglo[conteo]=1&arreglo[suma]="+$(".excel").data('parametros')['suma'];
});

$(document).on("click",".sendrep",function(){
    $("#modal-correos").modal();
    $("#modal-correos").modal('open');

    $('.chips-initial').material_chip({
        data: getCorreos(),
     });
});

$(document).on("blur","#productos",function(){
    var id = arr('login',4,'id',11,'nombre = "'+$(this).val()+'" and id > 0 and idsucursal = @@impresa',0,0,0)[0][0];
    if (id != undefined)
        $("#vidproducto").val(id);
    else
        $("#vidproducto").val(0);
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
    }
    else
        $("#fltr"+id).hide();
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