<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Ventas Totales</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.0.0.42">
</head>
<body class="black">
  <div class=" principal contenedor" >
           <div class="filtros row" entrefechas entrenumeros porcliente porusuario portipo="varios" tbltipos="168,26" tipos="Tipo,Tipo Pago" elem='0,"1&7&6"' sp="167" modulo="reporteFactura" types="1,1" bisprov="0"></div>

      <!-- HEADER -->

    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px">Ventas Totales</h2>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
        <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
      </div>
      <div class="col s4 m4 l4">
        <input type="hidden" class="zelda">
      </div>
    </div>
    
    <small id="leyenda"></small>
    F: Factura, T: Tickete<br>
    [A]: Anulada, [C]: Cancelada, [P]: Pendiente
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="width: 1%"></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Número de Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cliente</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Tipo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Descuento</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>I.V.</b></td>
                <td class="white-text blue sinborde" style="text-align: center"><b>Monto</b></td>

      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.0.0.42"></script>
  <script src="../assets/js/modulos/reportes/ventas.js?v=10.0.0.42"></script>
</body>
</html>