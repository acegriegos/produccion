<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Rutas</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-rutas.css?v=10.1.0.94">
  </head>
  <body>
  <br>
    {$NAV}
    <div class="bdy" style="font-size: 1.2em !important">
    <div class="card z-depth-3">

        <div class="card-header center head1">
            <p class="flow-text" style="font-size: 1.9em; margin: 0px;">Rutas</p>
        </div>
        
        <nav class="navbar navbar-dark head2 {if $smarty.session.BUSS neq 0} hide {/if}">
            <ul class="nav navbar-nav">
                <li class="nav-item menu active" id="m1">
                    <a class="nav-link" href="#" title="Mantenimiento">Mantenimiento</a>
                </li>
                <li class="nav-item menu" id="m2">
                    <a class="nav-link" href="#" title="Carga/Descarga">Carga/Descarga</a>
                </li>
                <li class="nav-item menu" id="m3">
                    <a class="nav-link" href="#" title="Rastreo">Rastreo</a>
                </li>
            </ul>
        </nav>

        <div id="mainbdy" class="card-content">
            
        </div>
   
    </div>
    </div>
    {$SRC}
    <script src="../assets/js/modulos/rutas.js?v=10.1.0.94"></script>
  </body>
</html>