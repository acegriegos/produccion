<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sistema de Facturación</title>

    <link href="../assets/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="../assets/css/modulos/style_login.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
    <link rel="stylesheet" href="../assets/fonts/tipografia.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
<br><br>
    <h1>Sistema BMS</h1>
    <h3>Bussines Management Solution</h3>

<div class="container">

      <form class="form-signin" action="index.php" method="POST" role="form" onsubmit="return getIn();">
        <h2 class="form-signin-heading">Inicio de sesión</h2>
        <label for="inputEmail" class="sr-only">Email address</label>
        <input type="text" placeholder="Usuario" id="num" name='id' required autofocus>
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" placeholder="Contraseña" id="pass" name="pss" required>
        <div class="checkbox">
          <label>
            <div style="float: right;"><a href="#" style="color: #337ab7">Olvidó su Contraseña?</a></div>
          </label>
        </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Entrar</button>
      </form>

    </div> <!-- /container -->

<center id="dr"><small>© 2016. Copyright. Todos los derechos reservados. LogintechCR, S.A. </small></center>

<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/js/modulos/login.js"></script>

</body>
</html>