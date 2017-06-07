<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Ventas Totales</title>
  <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
  <link rel="stylesheet" href="../assets/css/materialize.css">
  <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/jquery.dataTables.css">
  <link rel="stylesheet" type="text/css" href="../assets/libs/DataTables/media/css/dataTables.responsive.css">
  <link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=0.3">
  <link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css">
  <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css">
</head>
<body>
  <div class="container principal">
      <div class="filtros row" entrefechas entrenumeros porcliente porusuario portipo="varios" tbltipos="168,26" tipos="Tipo,Tipo Pago" elem="0,1,@@impresa," sp="167" modulo="reporteFacturas"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        <img src="../assets/img/logo.png" class="img-responsive" style="width: 90%">
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
          <b><?php echo $miscelaneos[0][0]; ?></b><br>
          <b>Cédula:</b> <?php echo $miscelaneos[1][0]; ?><br>
          <b>Teléfono:</b>  <?php echo $miscelaneos[2][0]; ?><br>
        </font>
        <i class="fa fa-level-down btn btn-success der" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
      </div>
    </div>
    <h2 align="center">Ventas Totales</h2>
    <small id="leyenda"></small>
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td style="width: 1%"></td>
        <td style="text-align: center"><b>Número de Factura</b></td>
        <td style="text-align: center"><b>Fecha</b></td>
        <td style="text-align: center"><b>Cliente</b></td>
        <td style="text-align: center"><b>Tipo</b></td>
        <td style="text-align: center"><b>Monto</b></td>
        <td style="text-align: center"><b>Descuento</b></td>
        <td style="text-align: center"><b>I.V.</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  <script src="../assets/js/jquery.js"></script>
  <script src="../assets/js/jquery.mask.min.js"></script>
  <script src="../assets/js/materialize.js?v=0.1"></script>
  <script src="../assets/js/modulos/menu.js?v=0.1"></script>
  <script src="../assets/libs/DataTables/media/js/jquery.dataTables.min.js"></script>
  <script src="../assets/libs/DataTables/media/js/dataTables.responsive.min.js"></script>
  <script src="../assets/js/asgard.js?v=0.2"></script>
  <script src="../assets/js/modulos/reportes/reportes.js?v=0.3"></script>
  <script src="../assets/js/modulos/reportes/ventas.js?v=0.3"></script>
</body>
</html>