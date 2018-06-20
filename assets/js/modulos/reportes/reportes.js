$(function(){
    var html = '';
    var mdate;

    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });
    $(".principal .filtros").append('<div class="col s12"><h3 align="center">FILTROS DEL REPORTE</h3><a class="waves-effect waves-light blue btn der" title="Ocultar Filtros"><i class="mdi mdi-chevron-up ofiltr"></i></a><a class="waves-effect waves-light btn der blue" title="Generar Reporte" onclick="doreport()">Generar</a></div><br>');

    mdate = $(".principal .filtros").attr('porcliente');
    if (mdate != undefined){
        var pc = parseInt($(".principal .filtros").attr('bisprov')) ? 'Proveedor' : 'Cliente';

        html = '<div class="row col s6 rous"><div class="col s12"><input type="checkbox" id="chkcliente" value="3" class="repcheck"><label for="chkcliente" class="pbtn">Por '+pc+'</label></div><div class="col s12 '+mdate+'" id="fltr3"><div class="input-field"><label for="cliente" class="width:100%">Nombre</label><input type="text" class="validate init eder autocomplete" id="cliente"><input type="hidden" id="vidcliente" class="inpreport" value="0" /></div></div></div>';

        $(".principal .filtros").append(html);

        $("#cliente").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#cliente").autocomplete({
                    limit: 10,
                    data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2),null',2,'id >0 and bisproveedor='+$(".principal .filtros").attr('bisprov')+' and concat(nombre," ",apellido1," ",apellido2) like \"%'+$("#cliente").val()+'%\" limit 10',0,0,0,1)
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
                    data: arr('login',4,'nombre,null',11,'id >0 and nombre like \"%'+$("#productos").val()+'%\"limit 10',0,0,0,1)
                });
                $("#cliente").siblings($(".autocomplete-content")).css('width','25%');
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
                    data: arr('login',4,'nombre,null',1,'nombre like \"%'+$("#usuario").val()+'%\" or user like \"%'+$("#usuario").val()+'%\" limit 10',0,0,0,1)
                });
                $("#usuario").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

    mdate = $(".principal .filtros").attr('entrenumeros');
    if (mdate != undefined) {
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xnum" value="2" class="repcheck"><label class="pbtn" for="xnum">Entre <label class="variable-s">NÚMEROS</label></label></div><div class="col s9 '+mdate+'" id="fltr2"><div class="col s6"><div class="input-field"><input type="number" class="validate init eder inpreport" id="vnum1" value="0"><label for="vnum1">Numero1</label></div></div><div class="col s6"><div class="input-field"><input type="number" class="validate eder inpreport" id="vnum2" value="0" ><label for="vnum2">Numero2</label></div></div></div></div>';
        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('entrefechas');
    if (mdate != undefined){
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xfec" value="1" class="repcheck"><label for="xfec" class="pbtn">Entre Fechas</label></div><div class="col s9 '+mdate+'" id="fltr1"><div class="col s6"><input type="date" class="validate init inpreport datepicker" id="vdesde" value="" str="1"></div><div class="col s6"><input type="date" class="validate inpreport datepicker" id="vhasta" value="" str="1"></div></div></div>';

        $(".principal .filtros").append(html);

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
            format: 'yyyy-mm-dd',
            selectMonths: true,
            selectYears: 10
        });


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
                    type = '<select type="select" id="vidtipo'+inc+'" class="inpreport tipos" ttbl="'+vtbl+'"></select>';/*168*/

                    break;
                    case 2:
                    type = '<input type="number" id="vidtipo'+inc+'" class="validate inpreport tipos"><label for="vidtipo'+inc+'">'+tipos[i]+'</label>';

                    break;

                    default://para texto
                    type = '<input type="text" id="vidtipo'+inc+'" class="validate inpreport tipos eder"><label for="vidtipo'+inc+'">'+tipos[i]+'</label>';

                    break;


                }

                html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="chktipo'+inc+'" value="'+filtro+'" class="repcheck"><label for="chktipo'+inc+'" class="pbtn">'+tipos[i]+'</label></div><div class="col s9 '+mdate+'" id="fltr'+filtro+'"><div class="input-field">'+type+'</div></div></div>';
                $(".principal .filtros").append(html);
                arr('login',6,'id,nombre',vtbl[i],'id > 0 order by id',15,1,$("#vidtipo"+inc));
                filtro += 1;
            }
            $('select').material_select();
        }
    }

    $("[id^=fltr]").hide();
    $("[id^=fltr].auto").show();
    $("[id^=fltr].auto").prev().children().children().prop('checked',true);
});

$(document).on("blur","#cliente",function(){
    var id = arr('login',4,'id',2,'concat(nombre," ",apellido1," ",apellido2) like "%'+$(this).val()+'%"',0,0,0)[0][0];
    if (id != undefined)
        $("#vidcliente").val(id);
    else
        $("#vidcliente").val(0);
});

$(document).on("blur","#usuario",function(){
    var id = arr('login',4,'id',1,'nombre = "'+$(this).val()+'" or user = "'+$(this).val()+'"',0,0,0)[0][0];
    if (id != undefined)
        $("#vidusuario").val(id);
    else
        $("#vidusuario").val(0);
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

$(document).on("click",".fa-check",function(){
    generarReporte();
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