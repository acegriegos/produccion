<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css" rel="stylesheet">
<link href="../assets/css/modulos/style-factura.css" rel="stylesheet">
<!-- <?php $hide = $datos[24] > 2 ? 'hide':'' ?> -->
<body class="grey darken-4" style="font-size: 1.1em;" >
  <div class="hoja grey lighten-3" style="margin-top: 8%">
    <!-- HEADER -->
    <div class="row">
      <div class="col s6 m5 l3">
      <br>
        <img src="../assets/img/logo.png" class="img-responsive" width="100%">
      </div>
      <div class="col s6 m7 l9 right-align">
        <font size="3">
          <br>
          <b><?php echo $miscelaneos[0][0]; ?></b><br>
          <b>Cédula:</b> <?php echo $miscelaneos[1][0]; ?><br>
          <b>Teléfono:</b>  <?php echo $miscelaneos[2][0]; ?><br>
          <b>Correo:</b> <?php echo $miscelaneos[3][0]; ?><br>
          <b>Dirección:</b> <?php echo $miscelaneos[4][0]; ?><br>
          
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
  <div class="card  blue-grey white-text imprimirSINBOR <?php echo $hide ?>" >
    <div class=" card-content ">
      <p>Tipo de Pago:
        <?php echo $datos[8]; ?> 
      </p>
      </div>
    </div>
  </div>

  <div class="col s6 center-align">
  <div class="card blue-grey white-text imprimirSINBOR">
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
    <thead class=" blue-grey white-text imprimirSINBOR margen">
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

      <td  class="  blue-grey white-text sinborde imprimirSINBOR center-align"><b>SALDO TOTAL</b></td>
      <td  class=" blue-grey white-text sinborde imprimirSINBOR center-align"><b><?php echo $datos[11]; ?><?php echo $datos[6]; ?></b></td>
      
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

  <script src="../assets/js/jquery.js"></script>
  <script src="../assets/js/materialize.js"></script>
</body>