<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.0.0.4">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.0.0.4">
<link href="../assets/css/modulos/style-factura.css?v=10.0.0.4">
<title>Inventario por ruta</title>
<body class="grey darken-4" style="font-size: 1.1em;">
  <div class="row" style="padding-top: 8%">
    <div class="col s12 m9 l9 fac"> 
     <div class="hoja grey lighten-3">
      <div class="row">
        <div class="col s6 m5 l3">
          <br>
          <!-- <?php if ($miscelaneos[3]) {
            echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="90%">';
          } ?> -->
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
           <div class="col s12">
            <b>Ruta:</b>
            <span> Grecia - San Jose </span>
          </div>
        <div class="col s12">
            <b>Rutero:</b>
            <span> Logintech </span>
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
          <span><b>Inventario:</b></span>   
          <span> Ruta SJ01</span>
        </div>
      </div>   
    </div>
    <div class="col s6">
      <div class="col s6 center-align">
        <div class="card  white-text imprimirSINBOR" style="background-color: #3960A7;">
          <div class=" card-content white-text imprimirSINBOR">
            <p>Fecha actual: <?php
              // date_default_timezone_set("America/Costa_Rica");
              echo date("d/m/Y"); ?>
              </p>
            </div>
          </div>
        </div>
      </div>
      <!-- DETALLE FACT -->
      <table class=" bordered  " style="border: 0px; font-size: 1.1em;" id="detalle">
        <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
          <tr>
            <th class="center-align sinborde">Codigo</th>
            <th class="center-align sinborde">Producto</th>
            <th class="center-align sinborde">Cantidad</th>

          </tr>
        </thead>
        <tbody id="ftbody">

         <tr class="tr" >
          <td class="td flista1 center-align">A01</td>
          <td class="td flista2 center-align">Avena</td>
          <td class="td flista3 center-align">2</td>

        </tr>

      </tbody>
      <!-- <tfoot>
        <tr>
          <td class="margen" colspan="3">&nbsp;</td>
          <tr></tr>
          <td class="margen" colspan="3">&nbsp;</td>

          <td  style="background-color: #3960A7;" class=" white-text sinborde imprimirSINBOR center-align"><b>SALDO TOTAL</b></td>
          <td style="background-color: #3960A7;"  class="white-text sinborde imprimirSINBOR center-align"><b></b></td>

        </tr>
      </tfoot> -->
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

<script src="../assets/js/jquery.js?v=10.0.0.4"></script>

<script src="../assets/js/materialize.js?v=10.0.0.4"></script>
<script src="../assets/js/asgard.js?v=10.0.0.4"></script>

</body>