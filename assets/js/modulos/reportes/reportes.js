$(function(){
    var html = '';
    var mdate;
    $(".autocomplete").blur(function(){ 
        $(".autocomplete-content").hide('500'); 
    });
    $(".principal .filtros").append('<div class="col s12"><h3 align="center">FILTROS DEL REPORTE</h3><a class="waves-effect waves-light blue btn der" title="Ocultar Filtros"><i class="material-icons ofiltr">keyboard_arrow_up</i></a><a class="waves-effect waves-light fa fa-check btn der blue" title="Generar Reporte">Generar</a></div><br>');

    mdate = $(".principal .filtros").attr('porcliente');
    if (mdate != undefined){

        html = '<div class="row col s6 rous"><div class="col s3"><input type="checkbox" id="xcli" name="filtros" value="3" class="repcheck" elemlength="1" order="1"><label for="xcli" class="pbtn">Por Cliente</label></div><div class="col s9 '+mdate+'" id="fltr3"><div class="input-field"><label for="nclie" class="width:100%">Nombre o Cédula</label><input type="text" class="validate init eder autocomplete" id="nclie"><input type="hidden" id="vidcliente" class="inpreport" value="0" /></div></div></div>';

        $(".principal .filtros").append(html);

        $("#nclie").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#nclie").autocomplete({
                    limit: 10,
                    data: arr('login',4,'concat(nombre," ",apellido1," ",apellido2),null',2,'concat(nombre," ",apellido1," ",apellido2) like \"%'+$("#nclie").val()+'%\" limit 10',0,0,0,1)
                });
                $("#nclie").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

    mdate = $(".principal .filtros").attr('porusuario');
    if (mdate != undefined) {
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xusu" name="filtros" value="4" class="repcheck" elemlength="1" order="2"><label for="xusu" class="pbtn">Por Usuario</label></div><div class="col s9 '+mdate+'" id="fltr4"><div class="input-field"><label for="nuser">Usuario o Nombre</label><input type="text" class="validate init eder autocomplete" id="nuser"><input type="hidden" id="vidusuario" class="inpreport" value="0" ></div></div></div>';
        $(".principal .filtros").append(html);

        $("#nuser").on("keydown",function(e){
            var charCode = e.which || e.keyCode;
            var charStr = String.fromCharCode(charCode);
            if (/[a-zA-Z0-9-_. ]/i.test(charStr) || charCode == 8) {
                $(".autocomplete-content").remove();
                $("#nuser").autocomplete({
                    limit: 10,
                    data: arr('login',4,'nombre,null',1,'nombre like \"%'+$("#nuser").val()+'%\" or user like \"%'+$("#nuser").val()+'%\" limit 10',0,0,0,1)
                });
                $("#nuser").siblings($(".autocomplete-content")).css('width','25%');
            }
        });
    }

    mdate = $(".principal .filtros").attr('entrenumeros');
    if (mdate != undefined) {
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xnum" name="filtros" value="2" class="repcheck" elemlength="2" order="3"><label class="pbtn" for="xnum">Entre <label class="variable-s">NÚMEROS</label></label></div><div class="col s9 '+mdate+'" id="fltr2"><div class="col s6"><div class="input-field"><input type="number" class="validate init eder inpreport" id="vnum1" value="0"><label for="vnum1">Numero1</label></div></div><div class="col s6"><div class="input-field"><input type="number" class="validate eder inpreport" id="vnum2" value="0" ><label for="vnum2">Numero2</label></div></div></div></div>';
        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('entrefechas');
    if (mdate != undefined){
        html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xfec" name="filtros" value="1" class="repcheck" elemlength="2" order="4"><label for="xfec" class="pbtn">Entre Fechas</label></div><div class="col s9 '+mdate+'" id="fltr1"><div class="col s6"><input type="date" class="validate init inpreport" id="vdesde" value="" str="1"></div><div class="col s6"><input type="date" class="validate inpreport" id="vhasta" value="" str="1"></div></div></div>';

        $(".principal .filtros").append(html);
    }

    mdate = $(".principal .filtros").attr('portipo');
    if (mdate != undefined) {
        if ($(".principal .filtros").attr('portipo') == 'varios') {
            var vtbl = JSON.parse("[" + $(".principal .filtros").attr('tbltipos') + "]");
            var tipos = $(".principal .filtros").attr('tipos').split(",");
            var inc = 0;
            var filtro = 5;
            for (var i = 0, len = vtbl.length; i < len; i++) {
                inc += 1;
                html = '<div class="row col s12 m6 l6 rous"><div class="col s3"><input type="checkbox" id="xtip'+inc+'" name="filtros" value="'+filtro+'" class="repcheck" elemlength="1" order="'+filtro+'"><label for="xtip'+inc+'" class="pbtn">'+tipos[i]+'</label></div><div class="col s9 '+mdate+'" id="fltr'+filtro+'"><div class="input-field"><select type="select" id="vidtipo'+inc+'" class="inpreport tipos" ttbl="168"></select></div></div></div>';
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

$(document).on("click",".detail",function(){
    var id = $(this).attr('id').substr(2);
    $("#dt"+id).text('[ - ]');
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
        $("#nclie").select();
        return 'Cliente no válido';
    }

    if ($("#xusu").is(":checked") && $("#husu").val() == 0) {
        $("#nuser").select();
        return 'Usuario no válido';
    }

    if ($("#xfec").is(":checked") && $("#hfec1").val() < $("#hfec2").val()) {
        $("#hfec1").select();
        return 'Fechas inválidas';
    }
}