<?php /* Smarty version 2.6.17, created on 2016-07-30 01:39:10
         compiled from login1.tpl */ ?>
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Login</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/bootstrap.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
    <link href="../assets/libs/iconos/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/modulos/style_login.css">

  </head>
  <body>
  <br><br>
     <!-- BODY SIGNIN -->
    <div class="container boxlogin x1">
        <div class="container">
        <div class="alert alert-danger" role="alert" id="err">
            <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
            <strong id="titulo">Error de Autenticación!</strong><br><small id="alerta">Usuario o Contraseña Incorrecta</small>
        </div>
          <form class="form-signin" action="index.php" method="POST" role="form" onsubmit="return getIn();">
            <h2 class="form-signin-heading">Sistema Logintech</h2><br>
            <label for="inputEmail" class="sr-only">Usuario</label>
            <input autofocus="autofocus" name="id" type="text" id="num" class="form-control" placeholder="Nombre de Usuario" required="">
            <label for="inputPassword" class="sr-only">Contraseña</label>
            <input type="password" name="pss" id="pass" class="form-control" placeholder="Contraseña" required="">
            <div class="checkbox">
              <label>
                <input type="checkbox" value="remember-me"> Recuérdame
              </label>
            </div><br>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
          </form>
    
        </div> <!-- /container -->
    </div>
    <br><br>
    <center><small>© 2016. Copyright. Todos los derechos reservados. LogintechCR, S. A. </small></center>

    <!-- BODY SIGNIN -->
  
        <!-- <div class="jumbotron x1" style="background-color: transparent;width:100%;padding-left:0%;padding-right:0%;padding-bottom:12%">
                <div class="container x1" style="padding-left:15%;padding-right:15%">
                <div class="alert alert-danger" id="err">
                        <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
                        <strong id="titulo">Error de Autenticación!</strong><br><small id="alerta">Usuario o Contraseña Incorrecta</small>
                    </div>    
                <div class="container x1">
                <form action="index.php" method="POST" role="form" onsubmit="return getIn();">
                    <h3 align="center">Sistema BMS</h3>
                
                    <div class="form-group">
                        <label for="">Ingrese su Usuario: </label>
                        <input autofocus= 'autofocus' name='id' type="text" class="form-control" id="num">
                    </div>

                    <div class="form-group">
                        <label for="">Contraseña: </label>
                        <input type="password" name="pss" id="pass" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success">Ingresar</button>
                    <small style="float: right;"><a href="#" style="color: #337ab7">Olvidó su Contraseña?</a></small>
                </form>
            </div>
        </div> -->
    

    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/login.js"></script>
  </body>
</html>