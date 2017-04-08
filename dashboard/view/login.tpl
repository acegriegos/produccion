<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Login</title>
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link href="../assets/css/materialize.css" rel="stylesheet">
    <link href="../assets/libs/iconos/css/font-awesome.min.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-login.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body style="background-image: url(../assets/img/1.jpg);  background-attachment: fixed;">
  
<div class="bdy ">
<div class="row"><br><br>

    <div class="card" style="width: 340px; margin: 0 auto; min-width: 350px; margin-top: 7%; background-color: rgba(11,56,97,0.7) "><br>
    <div class="card-header"><p class="flow-text center white-text"><b>Sistema BMS</b></p></div>
    <div class="card-content">
    
    <form role="form" id="logF" action="index.php" method="POST">
    <input type="hidden" name="vdir" value="" id="vdir">
        <div class="input-field col s12">
        
            <input id="user" type="text" name="usr" class="validate">
            <label for="user" class="white-text"><b>Ingrese su Usuario</b></label>
        </div>
        <div class="input-field col s12">
            <input id="pass" type="password" name="pss" class="validate">
            <label for="pass" class="white-text"><b>Contraseña</b></label>
        </div>
        <div class="row">
            <div class="col s12"><br>
                <button type="submit" class="btn waves-effect waves-light blue" style="width: 100%;">Ingresar</button>
            </div>

            <div class="col s12 center"><br>
                <small class="white-text"><a href="#modal1" id="recupss" >Olvidó su Contraseña?</a></small>
            </div>

            <div class="col s12">
                <br><br>
                <center>
                    <small class="white-text">© 2016. Copyright. Todos los derechos reservados. logintechCR, S. A. </small>
                </center>
            </div>
        </div>
        <div class="alert alert-danger err_" id="err1" align="center" style="display: none">
            <strong id="errm1"></strong>
        </div>
        <div class="alert alert-success suc_" id="suc1" align="center" style="display: none">
            <strong id="sucm1"></strong>
        </div>
    </form>
    </div>
    
    </div>
</div>
<div id="modal1" class="modal bottom-sheet">
    <div id="msjrecupss" class="modal-content center">
    
    </div>
  </div>

</div>
    <script src="../assets/js/jquery.js"></script>
    <script src="../assets/js/materialize.js"></script>
    <script src="../assets/js/asgard.js"></script>
    <script src="../assets/js/modulos/login.js?v=1.3"></script>
  </body>
</html>
