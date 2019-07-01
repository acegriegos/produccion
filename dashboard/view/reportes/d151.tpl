<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Reporte D-151</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.1.0.36">
</head>
<body class="black">
  <div class="principal contenedor" >
      <div class="filtros row" porcliente entrefechas entrenumeros portipo="varios" tbltipos="123" tipos="Declaración" types="1" elem="@@impresa" sp="235" modulo="dinformativa"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
         
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>

    <div class="center">
      <h3>Declaraciones Informativas</h3>
      <span id="leyenda"></span>
    </div>
    
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="text-align: center"><b>Razón Social</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Teléfonos</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Tipo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Total Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Total a Declarar</b></td>
      </tr>
      </thead>
      <tbody class="detrep">
        <tr><td colspan="5" class="center">No se a Seleccionado Ninguna Declaración</td></tr>
      </tbody>
 
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.1.0.36"></script>
  <script src="../assets/js/modulos/reportes/financiero.js?v=10.1.0.36"></script>
</body>
</html>