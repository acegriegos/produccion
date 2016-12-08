$(document).ready(function(){
    // alert(1)
    setTimeout(function() {$("#num").focus()}, 500);

    $("#logF").submit(function(){
        return getIn();
    });

$("#changepssw").click(function(){
    var val = validarcambio();
    if (val == false) {
        arr('login',4,'',56,'\"'+$("#vuser").val()+'\",\"'+$("#vclave").val()+'\"','',0,'');
        var p = mantenimiento('login',4,arr)[0];
        if (p == "[object Object]") {
            Materialize.toast(p['ERROR'], 4000, 'red');
        }else{
            Materialize.toast('Contraseña Cambiada Correctamente', 4000, 'green');
            $("#salir").click();
            $("#num").focus();
        }
    }else{
        Materialize.toast(val, 4000, 'red');
    }
});
    
});

function validarcambio(){
    if ($("#vuser").val() == '') {
        $("#vuser").focus();
        return "Usuario Requerido";
    }

    if ($("#vclave").val() == '') {
        $("#vclave").focus();
        return "Contraseña Requerida";
    }

    if ($("#clave").val() == '') {
        $("#clave").focus();
        return "Repetir Contraseña";
    }

    if ($("#vclave").val() != $("#clave").val()) {
        return "Contraseñas Deben Coincidir";
    }

    return false;

}

function getIn(){
    var salida = true;

    if ($('#pass').val() == '') {
        Materialize.toast('Contraseña no válida', 4000, 'red');
        $('#pass').focus();
        return false;
    }

    if ($('#num').val() == '') {
        Materialize.toast('No a Ingresado Usuario', 4000, 'red');
        $('#num').focus();
        return false;
    }

    var p = mantenimiento('login',3,{id: $('#num').val(), pss: $('#pass').val()})

    if(p[0].length == 2){
        Materialize.toast(p[0][0], 4000, 'red');
        $('#pass').select();
        switch(parseInt(p[0][1])){
        case 1:
        $.getJSON("http://ip-api.com/json", function (data) {

        var correo = '';
        var varibale = $('#num').val();

        if ($('#num').val().indexOf('@') > 0) {
            rs = arr('login',4,'*',92,'correos like \"%'+ $('#num').val() +'%\"',0,0,'')[0];
            correo = rs[0][0];
            varibale = rs[0][1];
        }else
            correo = arr('login',4,'mail',1,'user = \"'+ $('#num').val() +'\"',0,0,'')[0][0][0];

            if (correo != ''){
                var bdy = '<h2>Intento de Ingreso al Sistema</h2><br><b>Usuario:</b> '+ varibale +'<br><b>ISP:</b> ' +data['isp'] + '<br><b>Ubicación:</b> ['+ data['countryCode']+'] ' + data['country'] +', '+ data['regionName'] +', '+ data['city'] +'.<br><b>IP: </b>'+ data['query'] +'<br>';

                enviarCorreo(1,correo,'Intento de Acceso al Sistema',bdy);
            }
        });
        break;
        }
        salida = false;
    }
    return salida;
}

// ----------------------------------------------------

$('.button .front').click(function() {
    $(this).parents('.flip').toggleClass('flipped');
    if (document.location.pathname.indexOf('fullcpgrid') == -1){
        $(this).parents('.flip').find('input:eq(0)').focus();
    }
    return false;
});
$('.btn-close').click(function(){
$(this).parents('.flip').toggleClass('flipped');
return false;
});


function demo(){
    /***
      Add your demo script here...
    ***/

    setTimeout(function(){
      $('.button .front').click();
    }, 2000);
}

// -----------------------------------------
