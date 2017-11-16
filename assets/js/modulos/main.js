$(function(){
    $("#mchange").change(function(){
        console.log(mantenimiento('main',3,$(this).val()));
    });
    generarSSuc();
    $("#mchange").val($("#mchange").attr('sel'));
    $("#mchange").material_select('update');
    var date = new Date();
    var now = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
    var hasiniciate = arr('login',4,'count(id),monto',404,'idusuario = @@usr AND date_format(fecha,"%Y-%m-%d") = "'+now+'"',0,0,0)[0][0];
    if (hasiniciate[1] != null) {
        $("#vmonto").val(hasiniciate[1]);
        $("#vmonto").attr('disabled',true);
    }

    // var f = mantenimiento_async('login',8,{arch:'recibo',id:mid,mic:1,tit:'Factura',sel:'',tbl:186,where:mid},1);
    // var bcierre = arr('vref',vacc,'sel',tbl,'where',vcambio,vch,velem,vjson);
     
});

$(document).on("click","#iniciar",function(){
    var simbolo = arr('login',4,'simbolo',54,'principal = 1',0,0,0)[0][0];
    var modulo = $(this).attr('modulo');
    var $toastContent = $('<span>Iniciar caja con '+simbolo+parseFloat($("#vmonto").val()).formatMoney(2,'.',',')+'?</span>').add($('<button class="btn-flat toast-action green white-text add" modulo="'+modulo+'">Aceptar</button>'));
    if ($("#vmonto").val() != '' || $("#vmonto").val() > 0) {
        Materialize.toast($toastContent, 10000,'green');
    }else{
        Materialize.toast('Monto debe ser mayor a 0', 4000,'green');
    }
});

function validar (varreglo,vmodulo) {
    var salida = {}
    /*VALIDACION FRONT END*/
    switch(vmodulo['modulo']) {
        case 'cajainicialusuario':
        if (vmodulo['tip'] == '') {
            err = validarcajainicial();
            if ( err ) {
                return err;
            }
        }
        break;
    }
    salida = odin(varreglo,"f"+vmodulo['modulo']+"s");
    return salida;
}

function validarcajainicial() {
    if ($("#vmonto").val() == '' || $("#vmonto").val() < 0){ $("#vmonto").focus(); return 'Monto debe ser mayor a 0';  };
    return false;
}

function endDetail(id,acc,modulo) {
    if (acc == 1) {
        $("#vmonto").attr('disabled',true);
    }
}