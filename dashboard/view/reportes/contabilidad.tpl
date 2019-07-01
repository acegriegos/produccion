<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Contabilidad</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.1.0.38">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" entrefechas elem="" sp="271" modulo="reporteconta" ></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s6 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px" id="tit"></h2>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s2 m4 l4">
        <input type="hidden" class="zelda">
        <input type="hidden" id="vtrep">
        <input type="hidden" id="vidtipo1" value="0">
      </div>
    </div>
    <small id="leyenda"></small>
    
    <div class="detrep"></div>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.1.0.38"></script>
  <script src="../assets/js/modulos/reportes/contabilidad.js?v=10.1.0.38"></script>
</body>
</html>