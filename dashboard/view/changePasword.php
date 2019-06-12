<!DOCTYPE html>
<html>
<head>
    <title>Cambio de Contraseña</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" href="../assets/css/materialize.min.css?v=10.1.0.33">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css?v=10.1.0.33">
</head>
<body>


<div class="container center" style="margin-top: 5%;border:1px solid #e2e2e2;background-color: white;padding: 2%">
    <img src="../assets/img/logo.png" width="40%">
    
    <div class="input-field" style="width: 50%">
        <input type="password" id="myPss" autofocus autocomplete="off" autosave="off">
        <label for="myPss">Contraseña Nueva</label>
    </div>

    <div class="input-field" style="width: 50%">
        <input type="password" id="mynPss">
        <label for="mynPss">Confirmar Contraseña Nueva</label>
    </div>
    
    <a href="#!" class="btn btn-success" id="chnPss">Cambiar</a>

</div>

<script src="../assets/js/jquery.js?v=10.1.0.33"></script>
<script src="../assets/js/jquery.mask.min.js?v=10.1.0.33"></script>
<script src="../assets/js/materialize.min.js?v=10.1.0.33"></script>
<script src="../assets/js/asgard.js?v=10.1.0.33"></script>

<script type="text/javascript">
    $(function(){


        $("#chnPss").click(function(){
            var param = atob(getParameterByName('sr'));
            var param1 = atob(getParameterByName('cr'));
            var param2 = atob(getParameterByName('tr'));

            var rs = arr('login',4,'',56,'"'+param+'","'+$("#mynPss").val()+'"',0,0,0);

            if(!rs['succed'])
                Materialize.toast(rs[0]['ERROR'],4000,'red');
            else{
                Materialize.toast('Cambio de Contraseña Realizado Correctamente, Redireccionando...',5000,'green');

                var fecha = new Date();
                var msj = '<div align="center"><b>Sistemas APSY</b></div><hr><b>Nombre del Usuario: </b>'+param2+'<br><b>Usuario: </b>'+param+'<br><b>Contraseña del Usuario: </b>'+$("#mynPss").val()+'<br>Hora del Cambio: '+fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear()+' '+fecha.getHours()+':'+fecha.getMinutes()+':'+fecha.getSeconds()+'<br><small style="font-style: italic; bottom:0px;">Mensaje AutoGenerado por el Sistema Favor no Responder"</small>';
                 var user = getCookie('userAPSY');
                if (user.length) 
                    setCookie('pwd',$("#mynPss").val(),365*24*60*60*1000)
                
                setTimeout(function(){ window.location.replace('../') }, 3000);
            }
        });

        $("#myPss").blur(function(){
            if ($(this).val().length != 0) {
                if ($(this).val().length < 8) {
                    Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos', 4000, 'red');
                    $(this).css('border-bottom','1px solid #F44336');
                    $(this).css('box-shadow','0 1px 0 0 #F44336');
                }else{
                    $(this).css('border-bottom','1px solid #4CAF50');
                    $(this).css('box-shadow','0 1px 0 0 #4CAF50');
                    $("#mynPss").focus();
                }
            }else{
                $(this).css('border-bottom','1px solid #9e9e9e');
                $(this).css('box-shadow','none');
            }
        });

        $("#myPss").keyup(function(e){
            var code = e.which || e.keyCode;
            if (code == 13) {
                $(this).blur();
            }
        });

        $("#mynPss").blur(function(){
            if ($(this).val().length != 0) {
                // if ($(this).val().match(/^[a-zA-Z0-9\._-]+@[a-zA-Z0-9-]{2,}[.][a-zA-Z]{2,4}$/)) {
                //     $(this).css('border-bottom','1px solid #4CAF50');
                //     $(this).css('box-shadow','0 1px 0 0 #4CAF50');
                // }else{
                //     Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos',4000,'red');
                //     $(this).css('border-bottom','1px solid #F44336');
                //     $(this).css('box-shadow','0 1px 0 0 #F44336');
                // }

                if ($(this).val().length < 8) {
                    Materialize.toast('Tamaño de Contraseña debe ser mayor a 8 dígitos', 4000, 'red');
                    $(this).css('border-bottom','1px solid #F44336');
                    $(this).css('box-shadow','0 1px 0 0 #F44336');
                }else{
                    $(this).css('border-bottom','1px solid #4CAF50');
                    $(this).css('box-shadow','0 1px 0 0 #4CAF50');
                }

                if ($(this).val() != $("#myPss").val()) {
                    Materialize.toast('Contraseñas Deben ser Iguales', 4000, 'red');
                    $(this).css('border-bottom','1px solid #F44336');
                    $(this).css('box-shadow','0 1px 0 0 #F44336');
                }else{
                    $(this).css('border-bottom','1px solid #4CAF50');
                    $(this).css('box-shadow','0 1px 0 0 #4CAF50');
                    $("#chnPss").click();
                }
            }else{
                $(this).css('border-bottom','1px solid #9e9e9e');
                $(this).css('box-shadow','none');
            }
        })

        $("#mynPss").keyup(function(e){
            var code = e.which || e.keyCode;
            if (code == 13) {
                $(this).blur();
            }
        })
    });
</script>

</body>
</html>