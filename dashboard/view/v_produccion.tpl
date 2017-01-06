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
    
<div class="bdy">
{$NAV}
  <nav class="nav-extended blue">
    <div class="nav-wrapper">
      <a class="brand-logo center">Producción</a>
      <br>
      <ul class="tabs tabs-transparent">
        <li class="tab menu" id="m1"><a href="#">Crear Receta</a></li>
        <li class="tab menu" id="m2"><a href="#">Modificar Receta</a></li>
      </ul>
    </div>
  </nav>
  <br>
  <div class="row">
    <div class="col s8 m8 l8" style="border-right: 1px solid #000">
      <div class="row">
        <div class="input-field col s10 m10 l10">
          <input id="vnombre" type="text">
          <label for="vnombre">Nombre de la Receta</label>
          <input type="hidden" id="count" value="0">
          <input type="hidden" id="spot" value="">
          <input type="hidden" id="idproducto" value="0">
        </div>
        <div class="col s2 m2 l2">
          <button type="button" class="btn-floating waves-effect waves-light blue" id="addrecipe"><i class="material-icons">add</i></button>
        </div>
      </div>
      <div class="row">
        <div class="col s12 m12">
          <div class="input-field col s4 m4">
            <input id="vproducto" type="text" class="autocomplete">
            <label for="vproducto">Producto</label>
          </div>
          <div class="input-field col s3 m3">
            <input id="vcantidad" type="text">
            <label for="vcantidad">Cantidad</label>
          </div>
          <div class="input-field col s4 m4">
            <select id="vidunidad">
            {section name=LE loop=$UNI}
            <option value="{$UNI[LE][0]}" unidad="{$UNI[LE][2]}">{$UNI[LE][1]}</option>
            {/section}
            </select>
            <label for="vidunidad">Seleccione una Unidad</label>
          </div>
          <div class="col s1 m1">
            <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button>
          </div>
        </div>
        <div class="col s12 m12">
        <div id="recetas" class="row"></div>
        </div>
      </div>
    </div>
    <div class="col s4 m4 l4">
      <div class="table-responsive">
          <div class="table-responsive">
              <table class="table table-striped table-bordered table-hover dt-responsive nowrap" id="data-table-recetas" cellspacing="0" width="100%" >
                <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Total</th>
                      <th style="width: 20%">Acciones</th>
                    </tr>
                </thead>
                  <tbody id="listarecetas">
                    {section name=LE loop=$REC}
                      <tr>
                          <td>{$REC[LE][1]}</td>
                          <td>{$REC[LE][2]}</td>
                          <td>
                            <a type="button" class="btn-floating waves-effect waves-light blue" id="m{$UNI[LE][0]}"><i class="fa fa-pencil-square-o"></i></a>
                            <a type="button" class="btn-floating waves-effect waves-light red" id="d{$UNI[LE][0]}"><i class="fa fa-times"></i></a>
                          </td>
                      </tr>
                    {/section}
                  </tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="row" style="margin-bottom: 0px">
    <div class="input-field col s6 m6">
      <input id="vnombre" type="text">
      <label for="vnombre">Nombre de la Receta</label>
      <input type="hidden" id="count" value="0">
      <input type="hidden" id="spot" value="">
      <input type="hidden" id="idproducto" value="0">
    </div>
    <div class="col s6 m6">
      <button type="button" class="btn-floating waves-effect waves-light blue" id="addrecipe"><i class="material-icons">add</i></button>
    </div>
  </div> -->
<!-- <div class="row">
  <div class="col s12 m12">
    <div class="input-field col s4 m4">
      <input id="vproducto" type="text" class="autocomplete">
      <label for="vproducto">Producto</label>
    </div>
    <div class="input-field col s3 m3">
      <input id="vcantidad" type="text">
      <label for="vcantidad">Cantidad</label>
    </div>
    <div class="input-field col s4 m4">
        <select id="vidunidad">
          {section name=LE loop=$UNI}
          <option value="{$UNI[LE][0]}" unidad="{$UNI[LE][2]}">{$UNI[LE][1]}</option>
          {/section}
        </select>
        <label for="vidunidad">Seleccione una Unidad</label>
    </div>
    <div class="col s1 m1">
      <button type="button" class="btn-floating waves-effect waves-light blue" id="addproduct"><i class="material-icons">add</i></button>
    </div>
  </div>
  <div class="col s12 m12">
    <div id="recetas" class="row"></div>
  </div>
</div> -->
</div>

    <script src="../assets/js/modulos/produccion.js"></script>
  </body>
</html>