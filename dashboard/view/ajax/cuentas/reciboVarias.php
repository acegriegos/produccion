<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.2.0.56">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-factura.css?v=10.2.0.56">
<!-- <?php $hide = $datos[24] > 2 ? 'hide':'' ?> -->
<title>Recibo de Dinero Multiple</title>

<body class="grey darken-4" style="font-size: 1.1em;" >
  <div class="hoja grey lighten-3" style="margin-top: 8%">
    <!-- HEADER -->
    <div class="row">
     <div class="col s6 m5 l3">
          <br>
       <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="90%">';
            } ?>
        </div>
        <div class="col s6 m7 l9 right-align">
          <font size="3">
            <br>
             <b><span id="fnombre"><?php echo $miscelaneos[0]; ?></span></b><br>
              <?php if ($miscelaneos[2]) 
                echo '<b><span id="fnombre">'.$miscelaneos[2].'</span></b><br>';
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[2]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <b>Dirección:</b><br> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>

          </font>
        </div>


    </div>
    <div class="row">
      <div class="col s6 left-align">
       <div class="row">
         <div class="col s12" id="infofact" >
          <b id="fact">Recibo N°</b>
            <span id="numfact"><?php echo $transaccion[0][1]; ?> </span>
          </div>
         

       </div>

     </div>
   </div>
   <!-- /HEADER -->
   <!-- INFO CONTACTO -->
   <div class="row">
    <div class="col s6 left-align">
     <div class="row">
       <div class="col s12">
        <span class=""><b>Cliente:</b></span>   
        <span class=""><?php echo $transaccion[0][2]; ?></span>
        <br>
        <span class=""><b>Cedula:</b></span>   
        <span class=""><?php echo $transaccion[0][12]; ?></span>
        <br>
        <span class=""><b>Usuario:</b></span>   
        <span class=""><?php echo $transaccion[0][3]; ?></span>
        <br>
        <span><b>Monto de Abono:</b></span>
        <span><?php echo $transaccion[sizeof($transaccion)-1][10] ?></span>
      </div>
     
   </div>   
 </div>

 <div class="col s6">

  <div class="col s6 center-align ">
  <div class="card  white-text imprimirSINBOR <?php echo $hide ?>" style="background-color: #3960A7;">
    <div class=" card-content ">
      <p>Tipo de Pago:
       Efectivo
      </p>
      </div>
    </div>
  </div>

  <div class="col s6 center-align">
  <div class="card  white-text imprimirSINBOR" style="background-color: #3960A7;">
    <div class=" card-content white-text imprimirSINBOR">
      <p>Fecha:
       <?php echo $transaccion[0][7]; ?>
      </div>
    </div>
  </div>

  </div>
  <!-- /INFO CONTACTO -->

  <!-- DETALLE FACT -->
  <table class=" bordered  " style="border: 0px; font-size: 1.1em;" id="detalle">
        <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
      <tr>
        <th class="center-align sinborde" id="th1">No de factura</th>
        <th class="center-align sinborde" id="th3">Saldo anterior</th>
        <th class="center-align sinborde" id="th6">Monto abonado</th>
        <th class="center-align sinborde" id="th6">Saldo actual</th>
      </tr>
    </thead>
    <tbody >
       <?php  for ($i = 0; $i < count($transaccion); $i++) { ?>
      <tr class="tr" >
        <td class="td center-align"><span id="desc"><?php echo $transaccion[$i][5]; ?> </span>
        <td class="td center-align"><span id="desc"><?php echo $transaccion[$i][7]; ?> </span>
        <td class="td center-align"><span id="desc"><?php echo $transaccion[$i][9]; ?> </span> 
          <td class="td center-align"><span id="desc"><?php echo $transaccion[$i][8]; ?> </span>
        </td>
      </tr>
<?php } ?>
    </tbody>
    <tfoot>
    <tr>
    <td class="margen" colspan="4">&nbsp;</td>
    <tr></tr>
        <td class="margen" colspan="2">&nbsp;</td>

      <td  class="   white-text sinborde imprimirSINBOR center-align" style="background-color: #3960A7;"><b>SALDO CLIENTE</b></td>
      <td  class="  white-text sinborde imprimirSINBOR center-align" style="background-color: #3960A7;"><b><?php echo $transaccion[0][11]; ?></b></td> 
    </tr>
    </tfoot>
  </table>
  <!-- /DETALLE FACT -->
  <br>
  <!-- INFO FACT -->
  <div class="row">
  <br>
  </div>
  </div>

<script src="../assets/js/jquery.js?v=10.2.0.56"></script>

<script src="../assets/js/materialize.js?v=10.2.0.56"></script>
<script src="../assets/js/asgard.js?v=10.2.0.56"></script>
<script src="../assets/js/modulos/recibos-notas-pagos.js?v=10.2.0.56"></script>
</body>