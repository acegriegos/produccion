<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Presupuesto</title>
   {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-presupuesto.css?v=10.1.0.52">

  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy">
      <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
        <div class="card-header center blue-grey white-text z-depth-1 pequeño">
          <p class="flow-text head1" >Presupuesto</p>
        </div>
        <nav class="navbar navbar-dark head2 z-depth-1" style="margin-top: -25px;">
          <ul class="nav navbar-nav">
            <li class="nav-item menu3 active" id="m1">
              <a class="nav-link" href="#" title="Mantenimiento">Mantenimiento</a>
            </li>
            <li class="nav-item menu3" id="m2">
              <a class="nav-link" href="#" title="Asignación">Asignación</a>
            </li>
          </ul>
        </nav>
        <br>
        
        <div id="bdymantPresupuesto"></div>
      </div>
    </div> <!-- END BDY -->
    </div>
    {$SRC}
    <script src="../assets/js/modulos/presupuesto.js?v=10.1.0.52"></script>
  </body>
</html>