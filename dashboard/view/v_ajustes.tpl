<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Configuración</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/dropzone.css?v=10.2.0.40">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-ajustes.css?v=10.2.0.40">
  </head>
<body>
  {$NAV}
  <div class="bdy pequeño">
    <nav class="nav-extended z-depth-3 head1 hide">
      <div class="nav-wrapper">
        <div class="nav-content">
        </div>
      </div>
    </nav>
    <div class="row">
      <div class="col s12">
        <ul class="tabs head2">
            <li class="menu3 col tab pbtn" href="#m1" id="m1"><a class=" white-text" class="active">Empresa</a></li>
            <li class="menu3 col tab pbtn" href="#m2" id="m2"><a class=" white-text">Descuentos</a></li>
            <li class="menu3 col tab pbtn" href="#m3" id="m3"><a class=" white-text">Impuestos</a></li>
            <li class="menu3 col tab pbtn" href="#m4" id="m4"><a class=" white-text">Contabilidad</a></li>
            <li class="menu3 col tab pbtn hide" href="#m5" id="m5"><a class=" white-text">Sucursales</a></li>
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS neq 3}hide{/if}" href="#m6" id="m6"><a class=" white-text">Bodegas</a></li>
            <li class="menu3 col tab  pbtn per11 hide" href="#m10" id="m10"><a class=" white-text">Restaurante</a></li>
            <li class="menu3 col tab  pbtn hide" href="#m9 " id="m9 "><a class=" white-text">Productos</a></li>
            <li class="menu3 col tab  pbtn hide" href="#m11 " id="m11 "><a class=" white-text">Rubros</a></li>
            <li class="menu3 col tab pbtn hide" href="#m8" id="m8"><a class=" white-text">Accesos</a></li>
        </ul>
      </div>
    </div>

    <div id="majustes" class="pequeño"></div>
  </div>
  {$SCR}
  <script src="../assets/js/dropzone.js?v=10.2.0.40"></script>
  <script src="../assets/js/modulos/ajustes.js?v=10.2.0.40"></script>
</body>
</html>