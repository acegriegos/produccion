<DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Productos</title>
    <link rel="stylesheet" type="text/css" href="../assets/css/jquery.auto-complete.css">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-productos.css">
    
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    

<div class="bdy">
{$NAV}
    <nav class="navbar navbar-dark bg-primary" style="border-radius: 0px 0px 5px 5px;">
        <!-- Brand -->
        <a class="navbar-brand" href="#"><b>Inventario</b></a>
        <!-- Links -->
        <ul class="nav navbar-nav">
            <li class="nav-item">
                <a class="nav-link menu3 active" id="m1" href="#">Productos</a>
            </li>
            <li class="nav-item menu3" id="m2">
                <a class="nav-link" href="#">Servicios</a>
            </li>
            <li class="nav-item menu3" id="m3">
                <a class="nav-link" href="#">Paquetes</a>
            </li>
        </ul>
    </nav>
    <br>
    <div class="formServ" id="fservicios">
        <div id="bdymantInventario"></div>
    </div>

</div>
    <script src="../assets/js/notify.js"></script>
    <script src="../assets/js/jquery.auto-complete.min.js"></script>
    <script src="../assets/js/modulos/productos.js"></script>


  </body>
</html>