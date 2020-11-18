<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Cierre General</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.3.0.8">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" portipo="varios" tbltipos="-1" tipos="Mes" tfiltar="0" elem='0' types="6" sp="330" modulo="reportecierre" chg="271"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3] neq ''}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="2">
           <b>{$MIS[2]}</b><br>
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>
    <h5 align="center">Cierre General</h5>
    <small id="leyenda"></small>
    <div class="detrep"></div>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.3.0.8"></script>
  <script src="../assets/js/modulos/reportes/cierres.js?v=10.3.0.8"></script>
</body>
</html>