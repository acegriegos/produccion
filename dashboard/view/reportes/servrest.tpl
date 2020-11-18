<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Servicio Restaurante</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.3.0.8">
</head>

<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="6" sp="342" modulo="reportemesero" entrefechas tbltipos="39,1" tipos="Sucursal,Usuario" types="1,1" portipo="varios" tfiltrar="" tsel="id,if(!length(trim(pfisico)),nombre,pfisico);;" chg="271"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3] neq ''}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%;max-height: 150px">
        {/if}
      </div>
      <input type="hidden" id="vidinventario" value="6">  
      <div class="col s4 m4 l4" align="center">
        <h4 align="center" style="margin-top: 0px" id="titrep">Servicio Restaurante</h4>
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

  <script src="../assets/js/modulos/reportes/reportes.js?v=10.3.0.8"></script>
  <script src="../assets/js/modulos/reportes/servrest.js?v=10.3.0.8"></script>
</body>
</html>