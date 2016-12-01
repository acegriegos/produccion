<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Cuentas</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-cuentas.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
    <nav class="navbar navbar-dark bg-primary" style="border-radius: 0px 0px 5px 5px;">
        <!-- Brand -->
        <a class="navbar-brand" href="#"><b>Cuentas</b></a>
        <!-- Links -->
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link menu4 active" id="m1" href="#" title="Cuentas por Pagar">CxP</a>
            </li>
            <li class="nav-item menu4" id="m2">
                <a class="nav-link" href="#" title="Cuentas por Cobrar">CxC</a>
            </li>
            <li class="nav-item menu4" id="m3">
                <a class="nav-link" href="#" title="Ver Notas y Pagos">Notas y Pagos</a>
            </li>
        </ul>
    </nav>
    <br>
    
    <div class="formServ" id="fservicios">
        <div id="bdymantCuentas"></div>
    </div>
    
    </div>
    <script src="../assets/js/modulos/cuentas.js"></script>
  </body>
</html>