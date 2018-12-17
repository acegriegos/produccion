<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Inventarios</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventarios.css?v=10.0.0.84">
  </head>
  <body class="pequeño">
    {$NAV}
    <div class="bdy pequeño">
      <div class=" card center blue-grey white-text mbotcero pequeño" >
        <h4 class="center-align mbotcero z-depth-3 head1">Inventario</h4>
      </div>
      <div class="card pequeño card-content mdinvent z-depth-3 ">
        <div class="row pequeño">
          <div class="input-field col s12 m6 l6 pequeño" >
            <select type="select" class="_det" id="vidbodega" det="bodega" sig="vidinventario" prev="" d-b="41">
              <option value="0">Seleccione una Bodega</option>
              {section name=LE loop=$BOD}
              <option value="{$BOD[LE][0]}">{$BOD[LE][1]}</option>
              {/section}
            </select>
            <label for="vidbodega">Bodega</label>
          </div>
          <div class="input-field col s12 m6 l6 pequeño">
            <select type="select" det="inventario" id="vidinventario" d-b="111">
              <option value="0">Seleccione un Inventario</option>
            </select>
            <label for="vidinventario">Inventario</label>
          </div>
        </div>
        <div class="row pequeño">
          <div class="col s12 m12 l12 pequeño">
            <div class="pequeño" id="listainventarios"><!-- JS --></div>
          </div>
        </div>
      </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/inventarios.js?v=10.0.0.84"></script>
  </body>
</html>