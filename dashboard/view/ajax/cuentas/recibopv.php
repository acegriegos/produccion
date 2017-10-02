<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css">

<!-- <link href="../assets/fonts/materialdesignicons/materialdesignicons.css?v=0.5" rel="stylesheet"> -->

<link href="../assets/css/modulos/style-factura.css" rel="stylesheet">

<title>Recibo de Abono</title>


<!-- <?php $hide = $datos[24] > 2 ? 'hide':'' ?> -->

<body class="grey darken-4" style="font-size: 1.1em;" >
  <!-- HEADER -->

  <div class="row" style="padding-top: 8%">

    <div class="col s12 m9 l9 fac"> 
     <div class="hoja grey lighten-3" >

      <div class="row">
        <div class="col s6 m5 l3">
          <br>
        <img src="<?php echo $miscelaneos[3]; ?>" id="imglogo" class="img-responsive" width="90%">
        </div>
        <div class="col s6 m7 l9 right-align">
          <font size="3">
            <br>
            <b><?php echo $miscelaneos[0]; ?></b><br>
            <b>Cédula:</b> <?php echo $miscelaneos[1]; ?><br>
            <b>Teléfono:</b>  <?php echo $miscelaneos[2]; ?><br>
            <b>Correo:</b> <?php echo $miscelaneos[4]; ?><br>
            <b>Dirección:</b> <?php echo $miscelaneos[6]; ?><br>

          </font>
        </div>


      </div>
      <div class="row">
        <div class="col s6 left-align">
         <div class="row">
           <div class="col s12" id="infofact" >
            <b id="fact">Recibo N°</b>
            <span id="numfact"> <?php echo $datos[1]; ?> </span>
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
          <span class=""><?php echo $datos[4]; ?></span>
        </div>
        <div class="col s12">
          <span class=""><b>Usuario:</b></span>
          <span class=""><i><?php echo $datos[10]; ?> </i></span>
        </div>






      </div>   
    </div>

    <div class="col s6">

      <div class="col s6 center-align ">
        <div class="card   white-text imprimirSINBOR <?php echo $hide ?>"  style="background-color: #3960A7;" style="background-color: #3960A7;">
          <div class=" card-content ">
            <p>Tipo de Pago:
              <?php echo $datos[8]; ?> 
            </p>
          </div>
        </div>
      </div>

      <div class="col s6 center-align">
        <div class="card  white-text imprimirSINBOR" style="background-color: #3960A7;">
          <div class=" card-content white-text imprimirSINBOR">
            <p>Fecha:
              <?php echo $datos[3]; ?> </p>
            </div>
          </div>
        </div>

      </div>
      <!-- /INFO CONTACTO -->

      <!-- DETALLE FACT -->
      <table class=" bordered  " style="border: 0px; font-size: 1.1em;" id="detalle">
        <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
          <tr>
            <th class="center-align sinborde" id="th1">Tipo de movimiento</th>
            <th class="center-align sinborde" id="th2">Fecha</th>
            <th class="center-align sinborde" id="th3">Saldo anterior</th>
            <th class="center-align sinborde" id="th6">Monto abonado</th>
            <th class="center-align sinborde" id="th6">Saldo actual</th>

          </tr>
        </thead>
        <tbody >

         <tr class="tr" >
          <td class="td center-align"><span id="cant"><?php echo $datos[9]; ?></span></td>
          <td class="td center-align"><span id="desc"><?php echo $datos[3]; ?></span></td>
          <td class="td center-align"><span id="punit"><?php echo $datos[11]; ?><?php echo $datos[12]; ?></span></td>
          <td class="td center-align"><span id="desc"><?php echo $datos[11]; ?><?php echo $datos[5]; ?></span></td>
          <td class="td center-align"><span id="desc"><?php echo $datos[11]; ?><?php echo $datos[6]; ?></span></td>

        </tr>

      </tbody>
      <tfoot>
        <tr>
          <td class="margen" colspan="3">&nbsp;</td>
          <tr></tr>
          <td class="margen" colspan="3">&nbsp;</td>

          <td  style="background-color: #3960A7;" class=" white-text sinborde imprimirSINBOR center-align"><b>SALDO TOTAL</b></td>
          <td style="background-color: #3960A7;"  class="white-text sinborde imprimirSINBOR center-align"><b><?php echo $datos[11]; ?><?php echo $datos[6]; ?></b></td>

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
</div>
</div>
<section class="hideonprint">
  <div class="col s12 m3 l3 white-text">
    <br>
    <div id="correosclie">
     <input type="hidden" id="vid" value="<?php echo $datos[27]; ?>">
   </div>
   <label class="white-text">Enviar factura por correo a:</label>
   <div class="row">
    <div class="s10 col">
      <div class="chips chips-initial white-text" id="listcorreos" style="color: white;"></div>
    </div>
   <div class="s2 col">
          <a href="#" id="lcorreos" class="right"><i class="small white-text material-icons">send</i></a>
        </div>
  </div>
  <div class="row">
   <div class="s12 col" align="center">
     <span id="smail"></span>
   </div>
 </div>

</div>

</section>
</div>

<script src="../assets/js/jquery.js"></script>

<script src="../assets/js/materialize.js"></script>
<script src="../assets/js/asgard.js?v=0.1"></script>
<script src="../assets/js/modulos/recibos.js?v=0.5"></script>
</body>