<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Inventarios</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-inventarios.css">
  </head>

  <body class="pequeño">
    {$NAV}
    <div class="bdy pequeño">
        <div class=" card center blue-grey white-text mbotcero pequeño" >
          <h4 class="center-align white-text mbotcero z-depth-5" style="background-color:#0B3861">Laboratorio</h4>
        </div>
        
        <div class="card pequeño card-content mdinvent z-depth-5 ">

          <div class="row pequeño">
            <div class="col s12 m12 l12 pequeño">
              <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Nombre o cedula cliente</label>
        </div>
        <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Nombre o codigo de producto</label>
        </div>
            <div class="input-field col s6">
          <input id="last_name" type="text" class="validate">
          <label for="last_name">Nombre o codigo de producto</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input disabled value="I am not editable" id="disabled" type="text" class="validate">
          <label for="disabled">Disabled</label>
        </div>
      </div>
      </div>
      <div class="row">
        <div class="col s12">
          This is an inline input field:
          <div class="input-field inline">
            <input id="email" type="email" class="validate">
            <label for="email" data-error="wrong" data-success="right">Email</label>
          </div>
        </div>
      </div>
    </form>
  </div>
            </div>
          </div>
        </div>
    </div>
    {$SCR}
    <script src="../assets/js/modulos/inventarios.js?v=0.1"></script>
  </body>
</html>