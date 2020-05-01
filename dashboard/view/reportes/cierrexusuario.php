<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];?>
<!DOCTYPE html>
<html>
<head>
<title>Cierres</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.min.css?v=10.2.0.69">
<style>
  @media print {
    .print{
      display: none;
    }

      @page {
    margin: 0;
  }

  body{
    margin-left: 0% !important;
    margin-right: 0% !important;

    font-weight: normal !important; 

  } 
  }


</style>
</head>
<body style="margin-left: 35%;margin-right: 35%" >

  <button class="print" style="cursor: pointer;left:100px;position:fixed;padding: 10px;
    font-weight: 600;
    font-size: 20px;
    color: #ffffff;
    background-color: #1883ba;
    border-radius: 6px;
    border: 2px solid #0016b0">Imprimir</button>

  <div>
      <b>Cierre N°: </b>
      <span > <?php echo $cierre[0]; ?> </span><br>
      <b>Usuario: </b>
      <span > <?php echo $cierre[11]; ?> </span><br>
      <b>Fecha y Hora: </b>
      <span > <?php echo $cierre[1]; ?> </span>
    
    <div>
      <br>
      Ventas en Efectivo: <span style="float: right;"><?php echo $cierre[7]; ?></span><br>
      Ventas con Tarjetas:<span style="float: right;"><?php echo $cierre[8]; ?></span><br>
      Ventas con Depósito:<span style="float: right;"><?php echo $cierre[9]; ?></span><br> 
      <br>
      Total Ventas a Contado:<span style="float: right;"><?php echo $cierre[3]; ?></span><br>
      Total Ventas a Crédito:<span style="float: right;"><?php echo $cierre[2]; ?></span><br> 
      <br>
      Gravado:<span style="float: right;"><?php echo $cierre[24]; ?></span><br>
      Excento:<span style="float: right;"><?php echo $cierre[22]; ?></span><br>
      Descuentos:<span style="float: right;"><?php echo $cierre[25]; ?></span><br>
      IVA:<span style="float: right;"><?php echo $cierre[17]; ?></span><br>
      Ventas Totales: <span style="float: right;"><?php echo $cierre[15]; ?></span><br>
      <br>
      Abonos Clientes: <span style="float: right;"><?php echo $cierre[4]; ?> </span> <br>
      Notas Crédito Cliente:<span style="float: right;"><?php echo $cierre[5]; ?> </span> <br>
      Notas Débito Cliente:<span style="float: right;"><?php echo $cierre[6]; ?> </span> <br>
      Abonos Proveedores: <span style="float: right;"><?php echo $cierre[21]; ?> </span> <br>
      <br>
      <b>Entradas de Efectivo: </b> <span style="float: right;"><?php echo $cierre[19]; ?></span><br>
      <b>Salidas de Efectivo: </b> <span style="float: right;"><?php echo $cierre[20]; ?></span><br>
      <b>Abonos Liquidos Cliente: </b> <span style="float: right;"><?php echo $cierre[22]; ?></span><br>
      <b>Abonos Liquidos Proveedores: </b> <span style="float: right;"><?php echo $cierre[23]; ?></span><br>
      <br>
      Caja Inicial:<span style="float: right;"><?php echo $cierre[14]; ?></span><br>
      Caja Reportada: <span style="float: right;"><?php echo $cierre[12]; ?></span><br>
      Caja del Sistema: <span style="float: right;"><?php echo number_format(str_replace(',', '', $cierre[7])+str_replace(',', '', $cierre[22])-str_replace(',', '', $cierre[5])+str_replace(',', '', $cierre[6])+str_replace(',', '', $cierre[19])-str_replace(',', '', $cierre[20])+str_replace(',', '', $cierre[14]),2); ?></span><br>
      <br>
      Depósito:<span style="float: right;"><?php echo $cierre[20]; ?></span><br>
      Cuenta:<span style="float: right;"><?php echo $cierre[26]; ?></span><br>
      Documento:<span style="float: right;"><?php echo $cierre[27]; ?></span><br>
    </div>
     
      <!-- /INFO CONTACTO -->
      <!-- DETALLE FACT -->
      <?php switch($config[13]){ case 1: ?>
      <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="3" align="center">Facturas</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th >Consecutivo</th>
            <th >T.Pago</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td ><span id="con" ><?php echo $obj[11]; ?></span></td>
            <td ><span id="pag" ><?php echo $obj[15]; ?></span></td>
            <td align="right"><span  ><?php echo number_format($obj[16],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <br>
      <!-- DETALLE FACT -->
      <table style="border: 0px; font-size: 1em;width: 100%;">
        <thead>
          <tr>
            <th colspan="3" align="center">Notas y abonos</th>
          </tr>
        </thead>
        <thead class=" blue-grey white-text imprimirSINBOR margen">
          <tr>
            <th >Factura</th>
            <th >Nota/Abono</th>
            <th align="right">Valor</th>
          </tr>
        </thead>
        <tbody >Notas y
          <?php foreach ($estados as $obj) {?>
          <tr class="tr" >
            <td ><span id="con"><?php echo $obj[0]; ?></span></td>
            <td ><span id="fec"><?php echo $obj[1]; ?></span></td>
            <td ><span id="pag"><?php echo number_format($obj[4],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <?php break;
            case 2:
      ?>
      <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <thead>
          <tr>
            <th colspan="2" align="center">Productos</th>
          </tr>
        </thead>
        <thead>
          <tr>
            <th>Cantidad</th>
            <th >Producto</th>
            <th >Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td align="left"><?php echo $obj[24]; ?></td>
            <td ><span><?php echo $obj[11]; ?></span></td>
            <td align="right"><span><?php echo number_format($obj[16],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>
      <br>
      <?php 
      break;
      case 3:
        ?>
        <br>
        <table style="border: 0px; font-size: 1em; width: 100%" id="detalle">
        <!-- <thead>
          <tr>
            <th colspan="3" align="center">Familias</th>
          </tr>
        </thead> -->
        <thead>
          <tr>
            <th>Cantidad</th>
            <th>Familia</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody >
          <?php foreach ($cierreg as $obj) {?>
          <tr class="tr" >
            <td align="left"><?php echo $obj[37]; ?></td>
            <td ><span><?php echo $obj[36]; ?></span></td>
            <td align="right"><span><?php echo number_format($obj[38],2); ?></span></td>
          </tr>
          <?php } ?>
        </tbody>
      </table>

      <?php
        break;
      default:
            break;
            } ?>
      <br>
      <!-- INFO FACT -->
      <div class="row">
        <div class="col s8 offset-s2">
          <br><br>
          <section id="sqre">
            <table id="infotot" width="100%">
              <tfoot>
              <th class="center-align">Firma Representante</th>
              <th class="infospace"></th>
              </tfoot>
              <tbody>
                <tr class="ttdr">
                  <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
                  <td ></td>
                </tr>
              </tbody>
            </table>
          </section>
        </div>
      </div>
      <!-- /INFO FACT -->
      <!-- FOOTER -->
      <!-- /FOOTER -->
    </div>
    <script src="../assets/js/jquery.js?v=10.2.0.69"></script>
    <script src="../assets/js/materialize.min.js?v=10.2.0.69"></script>

     <script type="text/javascript">
   $(function(){
      window.onafterprint = function(){
        //$("#resolucion").html(navigator.userAgent)
        if( navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         )
            return true;
        else
          window.close();
      }

      $(".print").click(function(){
        window.print();
      });
   })
 </script>
  </body>
</html>