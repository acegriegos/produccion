<?php /* Smarty version 2.6.17, created on 2016-06-27 15:46:08
         compiled from login.tpl */ ?>
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

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>

    <h1>Sistema BMS</h1>
    <h3>Bussines Management Solution</h3>

 <div class="flip" >
    <form class="flip" action="index.php" method="POST" role="form" onsubmit="return getIn();">
    <div class="content">
        <ul>
            <li>
                <h4 align="center" class="title">Inicio de sesión</h4>
            </li>
            <li>
                <input type="text" placeholder="Usuario" id="num" name='id'/>
            </li>
            <li>
                <input type="password" placeholder="Contraseña" id="pass" name="pss"/>
            </li>
        </ul>
    </div>
        <ul class="button">
            <li class="front">
                Entrar
            </li>
            <li class="back">
                <button id="x" class="btn btn-link btn-lg pull-xs-right btn-close">&times;</button>
                <button type="submit" id="ingr" class="btn btn-primary btn-lg" >Ingresar</button>
                <div style="float: right;"><a href="#" style="color: #337ab7">Olvidó su Contraseña?</a></div>
            </li>
        </ul>
    </form>
    </div>


<center id="dr"><small>© 2016. Copyright. Todos los derechos reservados. LogintechCR, S.A. </small></center>

<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/bootstrap.min.js"></script>
<script src="../assets/js/mask/jquery.mask.js"></script>
<script src="../assets/js/modulos/login.js"></script>

</body>
</html>