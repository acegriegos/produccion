<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Inventarios</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.63">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="6" sp="254" modulo="reporteinventario" tbltipos="11,0,0,0,0,0" tipos="Por Producto,Variable,Inventariado,Gravado,Existencia,Negativos" types="0,3,3,3,3,3" portipo="varios" tfiltrar=""></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3] neq ''}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <input type="hidden" id="vidinventario" value="6">  
      <div class="col s4 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px" id="titrep">Inventario</h2>
        <font size="3">
           <b>{$MIS[2]}</b>
        </font>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>
    <small id="leyenda"></small>
    
    <div class="detrep"></div>
  <br><br>
  </div>
  {$SCR}

  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.63"></script>
  <script src="../assets/js/modulos/reportes/inventarios.js?v=10.2.0.63"></script>
</body>
</html>