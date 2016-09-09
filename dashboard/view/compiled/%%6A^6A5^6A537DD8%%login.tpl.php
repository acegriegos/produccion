<?php /* Smarty version 2.6.17, created on 2016-09-08 17:36:51
         compiled from login.tpl */ ?>
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
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-login.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="background-image: url(../assets/img/bg-azul.jpg)">
     
  <div class="container boxlogin x1">
        <div class="jumbotron x1" style="background-color: transparent;width:100%;padding-left:0%;padding-right:0%;padding-bottom:12%">
                <div class="container x1" style="padding-left:15%;padding-right:15%">

                <div class="alert alert-danger" id="err" style="display:none">
                    
                </div>

                <div class="container x1">
                <form role="form" id="logF" action="index.php" method="POST">
                    <h2 align="center">Sistema BMS</h2>
                    <br><br>
                    <div class="form-group">
                        <label for=""><p>Ingrese su Usuario: </p></label>
                        <input autofocus= 'autofocus' name='id' type="text" class="form-control" id="num">
                    </div>

                    <div class="form-group">
                        <label for=""><p>Contraseña: </p></label>
                        <input type="password" name="pss" id="pass" class="form-control">
                    </div>
                    <button type="submit" class="btn btn-success">Ingresar</button>
                    <small style="float: right;"><a href="#" style="color: #337ab7">Olvidó su Contraseña?</a></small>
                </form>
            </div>
        </div>
        
    </div>

    <center><small>© 2016. Copyright. Todos los derechos reservados. LogintechCR, S. A. </small></center>
    

    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/bootstrap.min.js"></script>
    <script src="../assets/js/mask/jquery.mask.js"></script>
    <script src="../assets/libs/DataTables/media/js/jquery.dataTables.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/login.js"></script>
  </body>
</html>