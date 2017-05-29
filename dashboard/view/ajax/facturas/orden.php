<meta charset="utf-8">
<link rel="icon" type="image/png" href="../../assets/img/favicon.ico">
<link href="../assets/css/materialize.css" rel="stylesheet">
<link href="../assets/css/modulos/style-factura.css" rel="stylesheet">

<body class="grey darken-4" style="font-size: 1.1em;" >
  <div class="hoja grey lighten-3">
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
          <b id="fact">Orden Compra N°</b>
            <span id="numfact"> <?php echo $datos[1]; ?> </span>
          </div>
       </div>

     </div>
   </div>
   <!-- /HEADER -->
   <!-- INFO CONTACTO -->
   <div class="row">
    <div class="col s9 left-align">
     <div class="row">
       <div class="col s12">
        <span class=""><b>Proveedor:</b></span>   
        <span class=""><?php echo $datos[4]; ?></span>
      </div>
      <div class="col s12">
      <span class=""><b>Usuario:</b></span>
        <span class=""><i><?php echo $datos[6]; ?> </i></span>
      </div>
      <div class="col s12">
        <span class=""><b>Comentario:</b></span>
        <span class=""><?php echo $datos[5]; ?> </span>
      </div>
      




   </div>   
 </div>
 <div class="col s3 center-align">
  <div class="card blue-grey white-text imprimirSINBOR">
    <div class=" card-content white-text imprimirSINBOR">
      <p>Fecha:
        <?php echo $datos[2]; ?> </p>
      </div>
    </div>
  </div>
  <!-- /INFO CONTACTO -->

  <!-- DETALLE FACT -->
  <table class=" bordered  " style="border: 0px; font-size: 1.1em;" id="detalle">
    <thead class=" blue-grey white-text imprimirSINBOR margen">
      <tr>
        <th class="center-align sinborde" id="th1">Cantidad</th>
        <th class="center-align sinborde"  id="th2">Descricpión</th>
      </tr>
    </thead>
    <tbody >
      <?php foreach ($transaccion as $obj) {?>
     
       <tr class="tr" >
        <td class="td center-align" ><span id="cant"><?php echo $obj[10]; ?></span></td>
         <?php
          if ($obj[8] == '' && $obj[9] == '') { ?>
            <td class="td center-align"  ><span id="desc"><?php echo $obj[7]; ?></span></td>
          <?php }elseif ($obj[7] == '' && $obj[9] == '') { ?>
            <td class="td center-align"  ><span id="desc"><?php echo $obj[8]; ?></span></td>
          <?php }elseif ($obj[7] == '' && $obj[8] == '') { ?>
            <td class="td center-align"  ><span id="desc"><?php echo $obj[9]; ?></span></td>
            <?php } ?>
      <?php } ?>
        </tr>
    </tbody>
  </table>
  <!-- /DETALLE FACT -->
  <br>
  <!-- INFO FACT -->

  <div class="row">
  <br>
    <div class="col s6 offset-s3">
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
              <td class=""></td>
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

  <script src="../assets/js/jquery.js"></script>
  <script src="../assets/js/materialize.js"></script>
</body>