<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventarios.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
    {$NAV}
     <div class="bdy">
<!-- codigo de prueba -->

<div class="card">
        <div class="card-header center blue-grey white-text" >
          <h4 class="center-align blue-grey white-text">Inventario </h4>
      </div>
      <div class="card-tabs">
          <ul class="tabs tabs-fixed-width">
            <li class="tab menu5" id="m1"><a href="#">Insumos</a></li>
            <li class="tab menu5" id="m2"><a href="#">Gastos</a></li>
            <li class="tab menu5" id="m3"><a href="#">Producción</a></li>
            <li class="tab menu5" id="m4"><a href="#">Ruta</a></li>
            <li class="tab menu5" id="m5"><a href="#">Devoluciones</a></li>
            <li class="tab menu5" id="m6"><a href="#">Mal Estado</a></li>
        </ul>
    </div>
    <div class="card-content grey lighten-4">
      <div class="formInventarios" id="finventarios">
        <div id="bdymantInvGeneral"></div>
    </div>
    </div>
</div>





    </div>
    <script src="../assets/js/modulos/inventarios.js"></script>
  </body>
</html>