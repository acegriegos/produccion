$(document).ready(function(){
  $("#logF").submit(function(){
     return getIn();
  });

  $("#changepssw").click(function(){
    $("#suc1").hide();
    $("#err1").hide();

    var val = validarcambio();
    if (val == false) {
      
      var arr = {};
      arr['sel'] = '';
      arr['tbl'] = 56;
      arr['where'] = '\"'+$("#vuser").val()+'\",\"'+$("#vclave").val()+'\"';
      var p = mantenimiento('login',4,arr)[0];
      if (p == "[object Object]") {
        $("#err1").show();
        $("#errm1").html(p['ERROR']);
      }else{
        $("#suc1").show();
        $("#sucm1").html("Contraseña Cambiada Correctamente");
        $("#salir").click();
        $("#num").focus();
      }
    }else{
      $("#err1").show();
      $("#errm1").html(val);
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
  $('#err').hide();
  var salida = true;

  $('#err').html('<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><strong id="titulo">Error de Autenticación!</strong><br><small id="alerta">Usuario o Contraseña Incorrecta</small>');

  if ($('#pass').val() == '') {
    $('#err').show();
    $('#titulo').html('Error de Ingreso:');
    $('#alerta').html('Contraseña no válida');
    $('#pass').focus();
    salida = false;
  }

  if ($('#num').val() == '') {
    $('#err').show();
    $('#titulo').html('Error de Ingreso:');
    $('#alerta').html('No a Ingresado Usuario');
    $('#num').focus();
    salida = false;
  }
  
  var p = mantenimiento('login',3,{id: $('#num').val(), pss: $('#pass').val()})
  
  if(p[0].length == 2){
         $('#err').show();
         $('#alerta').html(p[0][0]);
   $('#pass').focus();
    switch(parseInt(p[0][1])){
     case 1:
    $.getJSON("http://ip-api.com/json", function (data) {

      var arr = {}
    
      arr['sel'] = 'mail';
      arr['tbl'] = 2;
      arr['where'] = 'id = \"'+ $('#num').val() +'\"';
      var correo = mantenimiento('login',4,arr)[0][0][0];

      if (correo == '')
        correo = '';
      else
        correo += ',';

      arr['sel'] = 'valor';
      arr['tbl'] = 18;
      arr['where'] = 'id = 4';
      var cempresa = mantenimiento('login',4,arr)[0][0][0];


      var bdy = '<h2>Intento de Ingreso al Sistema</h2><br><b>Usuario:</b> '+ $('#num').val() +'<br><b>ISP:</b> ' +data['isp'] + '<br><b>Ubicación:</b> ['+ data['countryCode']+'] ' + data['country'] +', '+ data['regionName'] +', '+ data['city'] +'.<br><b>IP: </b>'+ data['query'] +'<br>';
      
      //enviarCorreo(1,'amiranda@logintechcr.com,'+correo+cempresa,'Intento de Acceso al Sistema',bdy);
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
