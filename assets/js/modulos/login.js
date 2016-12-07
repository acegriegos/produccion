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

  if ($('#pass').val() == '') {
    notify('','Error de Ingreso:','Contraseña no válida','danger');
    $('#pass').focus();
    return false;
  }

  if ($('#num').val() == '') {
    notify('','Error de Ingreso:','No a Ingresado Usuario','danger');
    $('#num').focus();
    return false;
  }
  
  var p = mantenimiento('login',3,{id: $('#num').val(), pss: $('#pass').val()})
  
  if(p[0].length == 2){
          notify('','Error de Ingreso:',p[0][0],'danger');
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
