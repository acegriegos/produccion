<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Reporte de Ganancias</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.97">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" porcliente  entrefechas portipo="varios"  tbltipos="64" tipos=" Por Factura" types="2" elem="1,0,0,0" sp="307"  bisprov="0"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        <img src="../assets/img/logo.png" class="img-responsive" style="width: 60%">
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
           <b>{$MIS[0]}</b><br>

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
    <h2 align="center">Ganancias Detalladas por Factura</h2>
    <small id="leyenda"></small>
    
    <table class="table responsive-table striped highlight centered bordered z-depth-3 detrep" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
     
    </table>
  <br><br>

  
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.97"></script>
  <script src="../assets/js/modulos/reportes/ganancias.js?v=10.2.0.97"></script>
</body>
</html>