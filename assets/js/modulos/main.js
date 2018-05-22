$(function(){
    $("#mchange").change(function(){
        mantenimiento('main',3,$(this).val())
    });
    generarSSuc();
   var vars = mantenimiento('main',6,'');
   // console.log(vars)
    // dibujarGrafico("chartG1",'Ganancias por Dia','Ganancias','line',{sel:'',tbl:307,where:'3,0,0,0,"'+now()+'","",0,0,0'},2,0,2);
    var hasiniciate = arr('login',4,'id,monto,fmonto',404,'idusuario = @@usr and fmonto is null',0,0,0);


    var has_if = hasiniciate[0][0][1] ;
    if (has_if == '') {
        $("#vmonto").val(0);
        $("#vmonto").attr('disabled',false);
    }else{
        $("#vmonto").val(hasiniciate[0][0][1]);
        $("#vmonto").attr('disabled',true);
    }      
    
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
