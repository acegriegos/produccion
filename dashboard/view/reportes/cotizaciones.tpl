<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Ventas Totales</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=0.2">
</head>
<body>
  <div class="container principal">
      <div class="filtros row" entrefechas entrenumeros porcliente porusuario portipo="varios" tbltipos="168,26" tipos="Tipo,Tipo Pago" elem="" sp="167" modulo="reporteFactura"></div>
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        <img src="../assets/img/logo.png" class="img-responsive" style="width: 90%">
      </div>
      <div class="col s4 m4 l4" align="center">
        <font size="3">
          <b>{$MIS[0][0]}</b><br>
          <b>Cédula:</b> {$MIS[1][0]}<br>
          <b>Teléfono:</b> {$MIS[2][0]}<br>
        </font>
        <i class="waves-effect waves-light material-icons btn blue der sfiltr" title="Mostrar Filtros" style="display:none;">keyboard_arrow_down</i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
      </div>
    </div>
    <h2 align="center">Cotizaciones Totales</h2>
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
      <tbody id="detrep"></tbody>
    </table>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=0.8"></script>
</body>
</html>