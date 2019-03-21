var crr = '';
var conteo = 1;

$(document).ready(function(){

 console.log(getDatos('nombre',39,'id = 0',0,0,0));
 $(".modal").modal();
 
 var animating = false,
      submitPhase1 = 1100,
      submitPhase2 = 400,
      logoutPhase1 = 800,
      $login = $(".login"),
      $app = $(".app");
  
  function ripple(elem, e) {
    $(".ripple").remove();
    var elTop = elem.offset().top,
        elLeft = elem.offset().left,
        x = e.pageX - elLeft,
        y = e.pageY - elTop;
    var $ripple = $("<div class='ripple'></div>");
    $ripple.css({top: y, left: x});
    elem.append($ripple);
  };

    setTimeout(function(){$("#user").focus();},100)
    
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
                $("#user").focus();
            }
        }else{
            Materialize.toast(val, 4000, 'red');
        }
    });

    $("#recupss").click(function(){
        if ($("#user").val() == '') {
            $("#msjrecupss").html('Usuario no existe, por favor verifique los datos e intente de nuevo.');
            $("#msjrecupss").addClass('red white-text');
            $("#user").focus();
        }else{
            
            var result = arr('login',4,'',233,'"'+$("#user").val()+'"','',0,'');
            if (result[0].length) {
                $("#msjrecupss").html('<img src="../assets/img/icon/mail_recovery.svg" width="100px"><br><h5>Recuperar Contraseña</h5><p>Enviar código de recuperación al correo:<br><b class="truncate">'+result[0][0][1]+'</b></p><a href="#!" id="sendrecupss" class="modal-action modal-close waves-effect waves-green btn-flat grey lighten-3">Enviar</a>');
                crr = result[0][0][0];
                $("#msjrecupss").removeClass('red white-text');
            }else{
                $("#msjrecupss").html('Usuario no existe, por favor verifique los datos e intente de nuevo.');
                $("#msjrecupss").addClass('red white-text');
                $("#user").focus(); 
            }
        }
    });

    Materialize.updateTextFields();
});

$(document).on("click","#sendrecupss",function(){
    var p = getDatos('',232,"'"+crr+"'",0,0);

    var bdy = p[0][0][0];
    
    enviarCorreo(1,crr,'Petición de Cambio de Contraseña',bdy,0,0,0);

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

    if ($('#user').val() == '') {
        Materialize.toast('No a Ingresado Usuario', 4000, 'red');
        $('#user').focus();
        return false;
    }

    if ($('#pass').val() == '') {
        Materialize.toast('Contraseña no válida', 4000, 'red');
        $('#pass').focus();
        return false;
    }

    var p = mantenimiento('login',3,{user: "~"+$('#user').val(), pss: $('#pass').val()})

    if(p.length == 0){
        Materialize.toast('Archivo Conf. Inválido', 4000, 'red');
        return false;
    }
    if(p[0].length == 2){
        Materialize.toast(p[0][0], 4000, 'red');
        $('#pass').select();
        switch(parseInt(p[0][1])){
        case 1:
        $.getJSON("http://ip-api.com/json", function (data) {

        var correo = '';
        var varibale = $('#user').val();

        if ($('#user').val().indexOf('@') > 0) {
            rs = arr('login',4,'*',92,'correos like \"%'+ $('#user').val() +'%\"',0,0,'')[0];
            correo = rs[0][0];
            varibale = rs[0][1];
        }else{
            if (conteo % 3 == 0) {
                correo = arr('login',4,'mail',1,'user = \"'+ $('#user').val() +'\"',0,0,'')[0][0][0];

                if (correo != ''){
                    var bdy = '<h2>Intento de Ingreso al Sistema</h2><br><b>Usuario:</b> '+ varibale +'<br><b>ISP:</b> ' +data['isp'] + '<br><b>Ubicación:</b> ['+ data['countryCode']+'] ' + data['country'] +', '+ data['regionName'] +', '+ data['city'] +'.<br><b>IP: </b>'+ data['query'] +'<br>';

                    enviarCorreo(1,correo,'Intento de Acceso al Sistema',bdy,0,0,0);
                }
            }
            
        }

        });
        salida = false;
        break;
        }
    }
    
    if (salida){
        direccion = window.location.pathname;
        direccion = direccion.substring(direccion.lastIndexOf('/')+1)
        $("#vdir").val(direccion)
    }else
        $("#vdir").val('')
    
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
