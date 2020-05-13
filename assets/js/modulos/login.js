var crr = '';
var conteo = 1;

$(document).ready(function(){
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

    $("#n_tipo").change(function(){
        var val = $('option:selected',this).attr('value');
        switch(val){
            case '1':
                $("#n_valor").val('11,300.00')
                break;
            case '2':
                $("#n_valor").val('16,950.00')
                break;  
            default:
                $("#n_valor").val('0.00')
                Materialize.toast('Opción no válida',4000,'red')
                break;
        }
    });

    $("#atyc").change(function(){
        if($(this).is(":checked"))
            $("#n_acept").removeAttr('disabled');
        else
            $("#n_acept").attr('disabled',true)
    });

    $("#n_acept").click(function(){

        if(!$("#atyc").is(":checked")){
            Materialize.toast('Dede Aceptar los Términos y Condiciones',4000,'red');
            return false;
        }

        if(!$("#n_phone").val().trim().length){
            Materialize.toast('Correo Requerido',4000,'red');
            return false;
        }

        if(!$("#n_phone").val().trim().length){
            Materialize.toast('Telefono Requerido',4000,'red');
            return false;
        }

        $.post( 'http://localhost/wsdlServer.php',{cmd:9,client:{nombre:$("#n_rzocial").val(),cedula:$("#n_ced").val(),tp:$("#n_rzocial").attr('tp'),issuc:$("#issuc").is(":checked") ? 1 : 0,fantasia:$("#n_fant").val(),correo:$("#n_mail").val(),tel:$("#n_phone").val(),fcorte:$("#n_date").val(),servicio:$("#n_tipo option:selected").val(),valor:$("#n_valor").val().replace(/,/g,'')}})
          .done(function( data ) {
            try{
                var p = JSON.parse(data);
                if(p['error'] == '0'){
                    Materialize.toast('Cliente Registrado Correctamente',4000,'green');
                    actualizar(39,'sysmod="'+p['rs']+'"','id='+$("#n_rzocial").attr('rid'));
                    $("[type=submit]").click();
                }else{
                    Materialize.toast(p['msj'],4000,'red')
                }
            }catch(e){
                console.log(e)
                Materialize.toast('ERROR',4000,'red')
            }
          });
    });

    var user = getCookie('userAPSY');
    if (user.length) {
        $("#user").val(user);
        $("#pass").val(getCookie('pwd'));
        $("#remember").prop('checked',true);
        $("#pwd").click().focus();
    }

    Materialize.updateTextFields();
});

$(document).on("click","#sendrecupss",function(){
    var p = getDatos('',232,'"'+crr+'"',0,0);
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

    switch(p[0].length){
        case 2:
            Materialize.toast(p[0][0], 4000, 'red');
            $('#pass').select();
            salida = false;
            break;
        case 3:
            Materialize.toast(p[0][0], 4000, 'red');
            var dsucursal = getDatos('',50,p[0][2])[0][0]
            $("#n_rzocial").val(dsucursal[0])
            $("#n_rzocial").attr('rid',p[0][2]);
            $("#n_ced").val(dsucursal[1])
            $("#n_fant").val(dsucursal[2])
            $("#n_rzocial").attr('tp',dsucursal[10]);
            dsucursal[4] = dsucursal[4].indexOf('/') >= 0 ? dsucursal[4].substring(0,dsucursal[4].indexOf('/')) : dsucursal[4];
            $("#n_mail").val(dsucursal[4])
            dsucursal[5] = dsucursal[5].indexOf('/') >= 0 ? dsucursal[5].substring(0,dsucursal[5].indexOf('/')) : dsucursal[5];
            $("#n_phone").val(dsucursal[5]);

            var fecha = new Date();
            var dia = fecha.getDate();
            var mes = parseInt(fecha.getMonth()+1);
            if(parseInt(dia) > 15){
                mes = mes+1;
                dia = 1;
            }else{
                dia = 15;
            }
            
            $("#n_date").val(fecha.getFullYear()+'-'+("0"+mes).slice(-2)+'-'+("0"+dia).slice(-2));
            
            Materialize.updateTextFields();
            $('#modal2').modal('open');
            salida = false;
            break;
        default:
            break;
    }
    
    if (salida){
        direccion = window.location.pathname;
        direccion = direccion.substring(direccion.lastIndexOf('/')+1)
        $("#vdir").val(direccion)
        var usr = getCookie('userAPSY');
        if ($("#remember").is(':checked') && !usr){
            setCookie('userAPSY',p[0][0][1],365*24*60*60*1000)
            setCookie('pwd',$("#pass").val(),365*24*60*60*1000)
        }
        else if(!$("#remember").is(':checked'))
            deleteCookie('userAPSY');
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
