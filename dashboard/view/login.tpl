<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Login</title>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">

  <link href="../assets/css/materialize.min.css" rel="stylesheet">
  <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css"> 
  <link rel="stylesheet"  href="../assets/css/modulos/style-login.css?v=0.1">


</head>
<body>

  <div class="cont">
    <div class="demo">
      <div class="login">
       <form role="form" id="logF" action="index.php" method="POST">
        <input type="hidden" name="vdir" value="" id="vdir"> 

        <div class="login__check" align="center">
          <img id="img" src="../assets/img/login/2.png">
        </div>
        <div class="login__form">
          <div class="input-field">
          <svg class="login__icon name svg-icon prefix" viewBox="0 0 20 20">
              <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
            </svg>
            <input type="text"  id="user" name="usr" class="login__input "  placeholder="Usuario" />

          </div>

          <div class="input-field">
            <svg class="login__icon pass svg-icon prefix" viewBox="0 0 20 20">
              <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
            </svg>
            <input type="password" id="pass" class="login__input " name="pss" placeholder="Contraseña"/>

          </div>
          <button type="submit" class="login__submit btn">Ingresar</button>

          <p class="login__signup"> Olvido su contraseña? &nbsp;<a href="#modal1" class="modal-trigger" id="recupss" >Recuperar</a> <span id="smail"></span></p>
        </div>
      </form>
    </div>

    <div id="modal1" class="modal bottom-sheet">
      <div id="msjrecupss" class="modal-content center">
      
      </div>
    </div>

  </div>
</div>
<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/materialize.min.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/login.js?v=0.2"></script>
</body>
</html>
