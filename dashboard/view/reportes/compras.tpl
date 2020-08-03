<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Compras Totales</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.82">
</head>
<body class="black">
  <div class=" principal contenedor" >
           <div class="filtros row" entrefechas porcliente porusuario portipo="varios" tbltipos="168,26,57" tipos="Tipo Factura,Tipo Pago,Tipo Documento" tfiltar="0,0,2&105&9" elem='0,"2&9"' sp="167" modulo="reporteFactura" types="1,1,1" bisprov="1"></div>

      <!-- HEADER -->
    <input type="hidden" id="vdetalle" value="1" change="2">
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s6 m4 l4" align="center">
        <h2 align="center" style="margin-top: 0px" id="titrep">Compras Totales</h2>
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
        <input type="hidden" id="vdetalle" value="2">
      </div>
    </div>
    
    <small id="leyenda"></small>
    F: Factura, T: Tickete<br>
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="text-align: center"><b>Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cliente</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Tipo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Gravado</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Exento</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Exonerado</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Descuento</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Otros Cargos</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>IVA</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Total</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.82"></script>
  <script src="../assets/js/modulos/reportes/ventas.js?v=10.2.0.82"></script>
  <script src="../assets/libs/jspdf/jspdf.js?v=10.2.0.82"></script>
</body>
</html>