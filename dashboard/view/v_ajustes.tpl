<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Configuración</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/dropzone.css?v=10.1.0.41">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-ajustes.css?v=10.1.0.41">
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
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS eq 5}hide{/if}" href="#m2" id="m2"><a class=" white-text">Descuentos</a></li>
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS eq 5}hide{/if}" href="#m3" id="m3"><a class=" white-text">Impuestos</a></li>
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS neq 0}hide{/if}"# id="m4" id="m4"><a class=" white-text">Cuentas Contables</a></li>
            <li class="menu3 col tab  pbtn {if $smarty.session.BUSS neq 0}hide{/if}" href="#m5" id="m5"><a class=" white-text">Sucursales</a></li>
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS neq 0 && $smarty.session.BUSS neq 3}hide{/if}" href="#m6" id="m6"><a class=" white-text">Bodegas</a></li>
            <li class="menu3 col tab pbtn hide" href="#m7" id="m7"><a class=" white-text">Producción</a></li>
            <li class="menu3 col tab  pbtn per11 hide" href="#m10" id="m10"><a class=" white-text">Restaurante</a></li>
            <li class="menu3 col tab  pbtn {if $smarty.session.BUSS eq 5}hide{/if}" href="#m9 " id="m9 "><a class=" white-text">Productos</a></li>
            <li class="menu3 col tab  pbtn {if $smarty.session.BUSS neq 5}hide{/if}" href="#m11 " id="m11 "><a class=" white-text">Rubros</a></li>
            <li class="menu3 col tab pbtn {if $smarty.session.BUSS neq 0}hide{/if}" href="#m8" id="m8"><a class=" white-text">Accesos</a></li>
        </ul>
      </div>
      <div class="col s12" id="m1"></div>
      <div class="col s12" id="m2"></div>
      <div class="col s12" id="m3"></div>
      <div class="col s12" id="m4"></div>
      <div class="col s12" id="m5"></div>
      <div class="col s12" id="m6"></div>
      <div class="col s12" id="m7"></div>
      <div class="col s12" id="m8"></div>
    </div>


    <div id="majustes" class="pequeño"></div>
  </div>
  {$SCR}
  <script src="../assets/js/dropzone.js?v=10.1.0.41"></script>
  <script src="../assets/js/modulos/ajustes.js?v=10.1.0.41"></script>
</body>
</html>