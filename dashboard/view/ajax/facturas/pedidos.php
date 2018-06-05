<meta charset="utf-8">
<link rel="icon" type="image/png" href="../../assets/img/favicon.ico">
<link href="../assets/css/materialize.css?v=10.0.0.2">
<link href="../assets/css/modulos/style-factura.css?v=10.0.0.2">

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
          <b id="fact">Pedido N°</b>
            <span id="numfact"> <?php echo $datos[0]; ?> </span>
          </div>
          <div class="col s12">
           <!-- <b> Factura de: </b><?php echo $datos[1]; ?> -->
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
      <span class=""><b>Vende:</b></span>
        <span class=""><i><?php echo $datos[16]; ?> </i></span>
      </div>
      <div class="col s12">
        <span class=""><b>Comentario:</b></span>
        <span class=""><?php echo $datos[12]; ?> </span>
      </div>
      




   </div>   
 </div>
 <div class="col s3 center-align">
  <div class="card blue-grey white-text imprimirSINBOR">
    <div class=" card-content white-text imprimirSINBOR">
      <p>Fecha:
        <?php echo $datos[3]; ?> </p>
      </div>
    </div>
  </div>
  <div class="col s3 center-align">
  <div class="card  blue-grey white-text imprimirSINBOR">
    <div class=" card-content ">
    <?php if ($datos[2] === 'N/A'){ ?>
      <p>Plazo en Días:
        <?php echo $datos[11]; ?> 
      </p>
     <?php }else{ ?>
      <p>Tipo de Pago:
        <?php echo $datos[2]; ?> 
      </p>
     <?php } ?>
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
        <th class="center-align sinborde"   id="th3">P. Unit</th>
        <th class="center-align sinborde"   id="th6">Tipo</th>
        <th  class="center-align sinborde"  id="th4">Descuento</th>
        <th class="center-align sinborde"  id="th5">Importe</th>
      </tr>
    </thead>
    <tbody >
      <?php foreach ($transaccion as $obj) {?>
     
       <tr class="tr" >
        <td class="td center-align" ><span id="cant"><?php echo $obj[18]; ?></span></td>
        <td class="td center-align"  ><span id="desc"><?php echo $obj[19]; ?></span></td>
        <td class="td center-align"  ><span id="punit"><?php echo $obj[20]; ?></span></td>
        <td class="td center-align"  ><span id="desc"><?php echo $obj[23]; ?></span></td>
        <td class="td center-align"  ><span id="desc"><?php echo $obj[21]; ?></span>%</td>
        <td class="td right-align"><span id="import" ><?php echo $obj[22]; ?></span></td>
      </tr>

      <?php } ?>
    </tbody>
    <tfoot>
      <tr>
      <td class="margen" colspan="4">&nbsp;</td>
      <td  class="left-align sinborde margen2">SubTotal</td>
      <td  class="right-align sinborde margen2"><?php echo $datos[15]; ?><?php echo $datos[9]; ?></td>

    </tr>
     <tr>
    <td class="margen" colspan="4">&nbsp;</td>
      <td  class="left-align sinborde margen">imv</td>
      <td  class="right-align sinborde margen"><?php echo $datos[15]; ?><?php echo $datos[5]; ?></td>
      
    </tr>
    <tr>
    <td class="margen" colspan="4">&nbsp;</td>
      <td  class="left-align sinborde margen">Descuento</td>
      <td  class="right-align sinborde margen"><?php echo $datos[15]; ?><?php echo $datos[6]; ?></td>
      
    </tr>
    <tr>
    <td class="margen" colspan="4">&nbsp;</td>
      <td  class="left-align blue-grey white-text sinborde imprimirSINBOR"><b>TOTAL</b></td>
      <td  class="right-align blue-grey white-text sinborde imprimirSINBOR"><b><?php echo $datos[15]; ?><?php echo $datos[10]; ?></b></td>
      
    </tr>


    </tfoot>
  </table>
  <!-- /DETALLE FACT -->
  <br>
  <!-- INFO FACT -->

  <div class="row">
  <br>
    <div class="col s8 offset-s2">
    <br><br>
      <!-- <section id="sqre">
        <table id="infotot" width="100%">
          <tfoot>
            <th class="center-align">Firma Representante</th>
            <th class="infospace"></th>
            <th class="center-align">Firma de Cliente</th>
          </tfoot>
          <tbody>
            <tr class="ttdr">
              <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
              <td class=""></td>
              <td class="center-align"><hr size="10" style="  background-color: black;  height: 1px; width: 80%;" /></td>
            </tr>
          </tbody>
        </table>
      </section> -->
    </div>
    </div>
    <!-- /INFO FACT -->
    <!-- FOOTER -->
    <hr>
    <!-- <footer class="imprimirSINBOR">
      <p class="center-align">Autorizado mediante la resolución # 11--97 de la Dirección General de Tributación Directa, publicado en el diario La Gaceta #171 el 5 de Setiembre de 1997   <b>|</b>   <span class="leyfooter">Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio. La misma deberá ser cancelada en el plazo que indica, posteriormente al mismo devengará intereses del 5% mensual, no queriendo decir esto que el pago de los intereses sea una prórroga para su cancelación.</span></p>
    </footer> -->
    <!-- /FOOTER -->
  </div>

  <script src="../assets/js/jquery.js?v=10.0.0.2"></script>
  <script src="../assets/js/materialize.js?v=10.0.0.2"></script>
</body>