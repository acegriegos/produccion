<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Reporte de Ganancias</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.0.0.50">
</head>
<body class="black">
  <div class=" principal contenedor" >
   <div class="row" id="ftr2">
              <div class="input-field col s12 m6">
                <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                <label for="desde">DESDE</label>
                <input type="date" class="datepicker vfecha " id="desde" value="" style="font-size: 1.5em; color: black; font-weight: bold;">
              </div>
              <div class="col s12 m6">
                <div class="input-field">
                  <i class="mdi mdi-24px mdi-calendar-question prefix"></i>
                  <label for="hasta">HASTA</label>
                  <input type="date" class="datepicker vfecha" id="hasta" value="" style="font-size: 1.5em; color: black; font-weight: bold;">
                </div>
              </div> 
              <div class="col s8   offset-m10 offset-s3"><br>
                <a class="waves-effect waves-light btn" id="bus">Buscar</a>
              </div>
            </div>

     <!--  <div class="filtros row" entrefechas portipo="varios" tbltipos="20,21,22,64,2" tipos="Por Familia,Por Tipo,Por Marca,Por Factura,Por Cliente" types="1,1,1,2,1" elem="" sp="307" modulo="ganancia"  bisprov="0"></div> -->
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
    <h2 align="center">Ganancias Por Productos</h2>
    <small id="leyenda"></small>
    
    <table class="table responsive-table striped highlight centered bordered z-depth-3 detrep" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
     
    </table>
  <br><br>

  
  </div>
  {$SCR}
<!--   <script src="../assets/js/modulos/reportes/reportes.js?v=10.0.0.50"></script>
 -->  <script src="../assets/js/modulos/reportes/ganancias.js?v=10.0.0.50"></script>
</body>
</html>