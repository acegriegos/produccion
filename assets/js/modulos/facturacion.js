$(document).ready(function(){
    param = parseInt(getParameterByName('tf'));

    $("#mfacturacion").html(mantenimiento('facturacion',param,''));
});

function searchClient(vvariable,visprv){
    if (vvariable != '') {
        var clie = arr('login',4,'',63,'\"'+vvariable+'\",'+visprv,'',0,'');
        if (clie[0] != '') {
            clie = clie[0][0]
            $("#vidcliente").val(clie[0]);
            $("#ncli").val(clie[1]);
            $("#ced").val(clie[2]);

            if ($("#vidtipo").val() == 2) {
                $("#vplazo").val(clie[4]);
            }else{
                $("#vplazo").val(0);
            }
            
            $("#vdescuento").val(clie[5]);
            
            Materialize.updateTextFields()
            $("#codp").focus();
        }
    }
}