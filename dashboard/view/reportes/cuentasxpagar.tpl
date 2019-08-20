<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="Cache-Control" content="max-age=86400"/>
  <title>Estado de Cuenta</title>
  {$STY}
  <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-newReport.css?v=10.2.0.1">
</head>
<body class="black">
  <div class=" principal contenedor" >
      <div class="filtros row" porcliente tbltipos="" tipos="" elem="" sp="269" modulo="reportecxc" types=""></div>
      <input type="hidden" id="vishistorico" value="0">
      <input type="hidden" id="visproveedor" value="0">
      <!-- HEADER -->
    <div class="row header">
      <div class="col s4 m4 l4">
        {if $MIS[3]}
        <img src="{$MIS[3]}" class="img-responsive" style="width: 60%">
        {/if}
      </div>
      <div class="col s4 m4 l4" align="center">
          <i class="waves-effect waves-light mdi mdi-chevron-down btn blue der sfiltr" title="Mostrar Filtros" style="display:none;"></i>
          <input type="hidden" class="zelda">
         <font size="4"><b align="center" style="margin-top: 0px;" id="titrep">Estado de Cuenta</b></font><br>
        <font size="3">
          <b>{$MIS[0]}</b><br>
          {if $MIS[2]}<b>{$MIS[2]}</b><br>{/if}
          <b>Cédula:</b> {$MIS[1]}<br>
          <b>Teléfono:</b> {$MIS[5]}<br>
        </font>
         
      </div>
    </div>
    <small id="leyenda"></small>
    
    <table class="table responsive-table centered bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;">
      <thead>
      <tr>
        <td class="white-text blue sinborde" style="text-align: center"><b>Número de Factura</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Monto Fact.</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Abonos</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>NC</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>ND</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Saldo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>Cliente</b></td>
      </tr>
      </thead>
      <tbody class="detrep"></tbody>
    </table>
  <br><br>
  </div>
  {$SCR}
  <script src="../assets/js/modulos/reportes/reportes.js?v=10.2.0.1"></script>
  <script src="../assets/js/modulos/reportes/cxc.js?v=10.2.0.1"></script>
</body>
</html>