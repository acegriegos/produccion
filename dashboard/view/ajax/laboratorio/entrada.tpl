<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Cache-Control" content="max-age=86400"/>
    <title>Laboratorio #1</title>
    {$STY}
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-laboratorio.css">
  </head>
<body>
  {$NAV}
    <div class="bdy pequeño">
      <div class="card z-depth-5 pequeño">
        <div class="card-header center head1 z-depth-1">
          <h5>Laboratorio</h5>
            <ul class="tabs tabs-fixed-width head2" style="cursor: pointer;">
              <li class="menu3 tab" id="m0"><a class="white-text tamLetra" class="active">Recepción de Explantes</a></li>
              <li class="menu3 tab" id="m1"><a class="white-text tamLetra">Iniciación</a></li>
              <li class="menu3 tab" id="m2"><a class="white-text tamLetra">Multiplicación</a></li>
              <li class="menu3 tab" id="m3"><a class="white-text tamLetra">Enraizamiento</a></li>
              <li class="menu3 tab" id="m4"><a class="white-text tamLetra">Aclimatación</a></li>
              <li class="menu3 tab" id="m5"><a class="white-text tamLetra">QoS</a></li>
              <li class="menu3 tab" id="m6"><a class="white-text tamLetra">Reporte</a></li>
            </ul>
        </div>
          <div class="card-panel pequeño" id="labajax"><!-- AJAX --></div>
        </div>
      </div>


    {$SCR}
    <script src="../assets/js/modulos/laboratorio.js?v=0.1"></script>
  </body>
</html>