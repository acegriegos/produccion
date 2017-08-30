<title>Recibo de Factura</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link href="../assets/css/materialize.css" rel="stylesheet">
<link href="../assets/css/modulos/style-factura.css?v=0.2" media="print" rel="stylesheet">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css">
<link rel="stylesheet" type="text/css" href="../assets/libs/iconos/css/font-awesome.min.css">
<!--   <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
-->
<?php $hide = $datos[24] > 2 ? 'hide':'' ?>
<?php $co = isset($_REQUEST['co']) ? 0 : 1 ?>
</a>

<body class="grey darken-4 pequeño " style="font-size: 1.1em;">

  <div class="row">
    <div class="col s12 m9 l9 fac">

      <!-- MAIN -->
      <div class="hoja grey lighten-5" style="padding: 0% 4%">
        <div class="row">
          <div class="col s12 m1 l1 hide-on-med-and-down">&nbsp;</div>
          <div class="col s5 m3 l3" align="center" style="padding: 6% 0% 0% 0%;">
            <img src="../assets/img/logo.png" id="imglogo" class="img-responsive" width="90%">
          </div>
          <div class="col s2 m4 l4 hide-for-small-only">&nbsp;</div>
          <div class="col s5 m4 l4 left-align">
            <br><br>
            <font size="2.5">
              <b><?php echo $miscelaneos[0][0]; ?></b><br>
              <b>Cédula:</b> <?php echo $miscelaneos[1][0]; ?><br>
              <b>Teléfono:</b>  <?php echo $miscelaneos[2][0]; ?><br>
              <b>Correo:</b> <?php echo $miscelaneos[3][0]; ?><br>
              <b>Dirección:</b><br> <?php echo $miscelaneos[4][0]; ?><br>
            </font>
          </div>
        </div>

        <div class="row" style="padding: 0% 2% 0% 5%">
          <b><h3><?php echo $co ? "Factura Original" : "Copia de Factura";  ?></h3></b>
          <div class="col s6 m6 l6" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 5%">
              <!--  -->
              <div class="col s12">
                <b id="fact"><?php echo $datos[25]; ?> N°</b>
                <span id="numfact"> <?php echo $datos[0]; ?> </span>
              </div>
              <div class="col s12 <?php echo $hide ?>">
               <b> Factura de: </b><?php echo $datos[1]; ?>
             </div>
             <!--  -->
             <div class="col s12">
              <p><b>Cliente:</b></p>
              <span><?php echo $datos[4]; ?></span>
            </div>
            <div class="col s12"><br>
              <span class=""><b>Vende:</b></span>
              <span class=""><?php echo $datos[16]; ?> </span>
            </div>
            <div class="col s12">
              <span class=""><b>Comentario:</b></span><br>
              <span class=""><?php echo $datos[12]; ?> </span>
            </div>
          </div> 
        </div>

        <div class="col s6 m6 l6 center-align">

          <div class="col s8 right">
            <div class="card white-text imprimirSINBOR" style="background-color: #3960A7;">
              <div class=" card-content white-text imprimirSINBOR">
                <p><b>Fecha:</b>
                  <?php echo $datos[3]; ?> </p>
                </div>
              </div>
            </div>

            <div class="col s8 right">
              <div class="card white-text imprimirSINBOR <?php echo $hide ?>" style="background-color: #3960A7;">
                <div class=" card-content ">
                  <?php if ($datos[2] === 'N/A'){ ?>
                  <p><b>Plazo en Días:</b>
                    <?php echo $datos[11]; ?> 
                  </p>
                  <?php }else{ ?>
                  <p><b>Tipo de Pago:</b>
                    <?php echo $datos[2]; ?> 
                  </p>
                  <?php } ?>
                </div>
              </div>
            </div>

          </div>
        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px; font-size: 1.1em;" id="detalle">
          <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
            <tr>
              <th class="center-align sinborde" id="th1">Cantidad</th>
              <th class="center-align sinborde" id="th2">Descricpión</th>
              <th class="center-align sinborde" id="th3">P. Unit</th>
              <th class="center-align sinborde" id="th6">Tipo</th>
              <th class="center-align sinborde" id="th4">Descuento</th>
              <th class="center-align sinborde" id="th5">Importe</th>
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
              <td class="left-align sinborde margen2">Subtotal</td>
              <td class="right-align sinborde margen2"><?php echo $datos[15]; ?><?php echo $datos[9]; ?></td>

            </tr>
            <tr>
              <td class="margen" colspan="4">&nbsp;</td>
              <td class="left-align sinborde margen">Imv</td>
              <td class="right-align sinborde margen"><?php echo $datos[15]; ?><?php echo $datos[5]; ?></td>

            </tr>
            <tr>
              <td class="margen" colspan="4">&nbsp;</td>
              <td  class="left-align sinborde margen">Descuento</td>
              <td  class="right-align sinborde margen"><?php echo $datos[15]; ?><?php echo $datos[6]; ?></td>

            </tr>
            <tr>
              <td class="margen" colspan="4">&nbsp;</td>
              <td  class="left-align white-text sinborde imprimirSINBOR" style="background-color: #3960A7;"><b>TOTAL</b></td>
              <td  class="right-align white-text sinborde imprimirSINBOR" style="background-color: #3960A7;"><b><?php echo $datos[15]; ?><?php echo $datos[10]; ?></b></td>
            </tr>

          </tfoot>
        </table>


        <!-- @PRINT -->
        <section class="hideonprint">
          <div class="row">
            <br>
            <div class="col s12 m8 offset-m2">
              <br><br>
              <section id="sqre">
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
              </section>
            </div>

          </section>
          <!-- @PRINT -->

          <?php 
          $decimales =  substr($datos[10], strpos($datos[10], '.'));
          $entero = str_replace(',', '', substr($datos[10],0,strpos($datos[10], '.')));
          $nombres = array(1=>'Uno',2=>'Dos',3=>'Tres',4=>'Cuatro',5=>'Cinco',6=>'Seis',7=>'Siete',8=>'Ocho',9=>'Nueve',0=>'Cero',10=>'Diez',11=>'Once',12=>'Doce',13=>'Trece',14=>'Catorce',15=>'Quince','10+'=>'Dieci',20=>'Veinte','20+'=>'Veinti',30=>'Treinta y',40=>'Cuarenta y',50=>'Cincuenta y',60=>'Sesenta y',70=>'Setenta',80=>'Ochenta y',90=>'Noventa y',100=>'Cien','100+'=>'Ciento',200=>'Doscientos',300=>'Trescientos',400=>'Cuatrocientos',500=>'Quinientos',600=>'Seiscientos',700=>'Sietecientos',800=>'Ochocientos',900=>'Novecientos',1000=>'Mil',100000=>'Millón');
          $diviciones = round(strlen($entero) / 3,0)-1;
          $salida = '';
          ?> 
          <span class="labelalpha"><?php echo $salida; ?></span>
        

        <!-- FOOTER -->
        <?php switch($datos[24]){
          case 1:
          $msj = $datos[26] == 2 ? 'La misma deberá ser cancelada en el plazo que indica, posteriormente al mismo devengará intereses del 5% mensual, no queriendo decir esto que el pago de los intereses sea una prórroga para su cancelación.' : '';
          break;
          case 4:
          $msj = 'La presente Cotización tiene una durabilidad de OCHO días.';
          break;
          default:
          $msj = '';
          break;
        } ?>
        <footer class="imprimirSINBOR" align="center-align">
        <hr>
          <div style="padding: 0% 12%">
            <p class="center-align" style="font-size: 0.8em;">Autorizado mediante la resolución # 11--97 de la Dirección General de Tributación Directa, publicado en el diario La Gaceta #171 el 5 de Setiembre de 1997.
              <br> 
              <span class="leyfooter" style="font-size: 0.8em;">Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio. <?php echo $msj; ?></span></p><br>
            </div>
          </footer>
          <!-- /FOOTER -->

        </div>
        <!-- /MAIN -->

      </div>
  
  <!-- @PRINT -->
  <section class="hideonprint">
    <div class="col s12 m3 l3 white-text">
    <br>
    <div id="correosclie">
     <input type="hidden" id="vid" value="<?php echo $datos[27]; ?>">
    </div>
      <label>Enviar factura por correo a:</label>
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
 <!-- @PRINT -->
    

    </div>




<script src="../assets/js/jquery.js"></script>
<script src="../assets/js/materialize.js"></script>
<script src="../assets/js/asgard.js"></script>
<script src="../assets/js/modulos/recibos.js?v=0.4"></script>

</body>