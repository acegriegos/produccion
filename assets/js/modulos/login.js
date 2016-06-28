$(document).keydown(function(e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            $("#ingr").click();
        }
    });

$(document).ready(function(){
  var id = getParameterByName('msj');
  if (id != 1) {
    $('#err').hide();
  }
});

function getIn(){
  $('#err').hide();
  var salida = true;

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

  return salida;
}

 function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
};

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
