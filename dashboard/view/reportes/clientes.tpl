<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Clientes</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.45">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" elem="" sp="181" modulo="reporteCliente" bisprov="0"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        <!-- <img src="../assets/img/logo.png" class="img-responsive" style="width: 60%"> -->
      </div>
      <div class="col s6 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px" id="titrep">Clientes</h2>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" id="vbisproveedor">
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" id="ofiltr" title="Mostrar Filtros"></i>
      </div>
    </div>
    <small id="leyenda"></small>
    
    <table class="table responsive-table striped highlight centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cédula</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Nombre</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Telefonos</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Correos</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Tipo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Descuento Máximo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Crédito</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Plazo</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.45"></script>
  <script src="../assets/js/modulos/reportes/clientes.js?v=10.2.0.45-1"></script>
</body>
</html>