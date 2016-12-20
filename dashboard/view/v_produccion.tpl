<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title></title>
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-produccion.css">

    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
      <script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>
  <body>
  <br>
    
<div class="bdy">
{$NAV}
  <nav class="nav-extended blue">
    <div class="nav-wrapper">
      <a class="brand-logo center">Producción</a>
      <br>
      <ul class="tabs tabs-transparent">
        <li class="tab menu" id="m1"><a href="#">Crear Proyecto</a></li>
        <li class="tab menu" id="m2"><a href="#">Modificar Proyecto</a></li>
      </ul>
    </div>
  </nav>
  <br>
  <div class="row">
    <div class="input-field col s6 m6">
      <input id="vnombre" type="text" class="validate">
      <label for="vnombre">Nombre de la Receta</label>
    </div>
    <div class="col s6 m6">
      <button type="button" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button>
    </div>
  </div>
  <div class="row">
    <div class="col s12 m6">
      <div class="input-field col s5 m7">
        <input id="vidproducto" type="text">
        <label for="vidproducto">Producto</label>
      </div>
      <div class="input-field col s5 m3">
        <input id="vcantidad" type="text">
        <label for="vcantidad">Cantidad</label>
      </div>
      <div class="col s2 m2">
        <button type="button" class="btn-floating btn-large waves-effect waves-light blue"><i class="material-icons">add</i></button>
      </div>
    </div>
    <div class="col s12 m6">
    <div class="col s6 m6">
      <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
      </ul>
    </div>
    <div class="col s6 m6">
      <ul class="collection with-header">
        <li class="collection-header"><h4>First Names</h4></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
        <li class="collection-item dismissable"><div>Alvin<i class="fa fa-times right red-text"></i></div></li>
      </ul>
    </div>
    </div>
  </div>



</div>

    <script src="../assets/js/modulos/produccion.js"></script>
  </body>
</html>