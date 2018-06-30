<title>Recibo de Factura</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.0.0.12">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.0.0.12">

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
            <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="100%">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
            
          </div>
          <div class="col s2 m4 l4 hide-for-small-only">&nbsp;</div>
          <div class="col s5 m4 l4 left-align">
            <br><br>
            <font size="2.5">
  
              <?php
                if ($miscelaneos[10] == 2) {
                   if (trim($miscelaneos[2]) != '') 
                      echo '<b><span id="fnombre">'.$miscelaneos[2].'</span></b><br>';
                   else
                      echo '<b><span id="fnombre">'.$miscelaneos[0].'</span></b><br>';
                }else{
                   if (trim($miscelaneos[2]) != ''){
                      echo '<b><span id="fnombre">'.$miscelaneos[2].'</span></b><br>';
                      echo '<b><span id="fnombre1">'.$miscelaneos[0].'</span></b><br>';
                   }
                   else
                      echo '<b><span id="fnombre">'.$miscelaneos[0].'</span></b><br>';
                }
                
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[5]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <b>Dirección:</b><br> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>
            </font>
          </div>
        </div>

        <div class="row" style="padding: 0% 2% 0% 5%">
          <b><h3 id="ftipo">Factura Electrónica</h3></b>
          <div class="col s6 m6 l6" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 5%">
              <!--  -->
              <div class="col s12">
                <b id="fact"><?php echo $datos[25]; ?></b>
                <span id="numfact"> <?php echo $datos[0]; ?> </span>
              </div>
              <div class="col s12 <?php echo $hide ?>">
               <b> Factura de: </b><span id="fclase"><?php echo $datos[1].$datos[31]; ?></span>
             </div>
             <!--  -->
             <div class="col s12">
              <p><b><?php echo $datos[30]; ?></span>:</b></p>
              <span id="fcliente"><?php echo $datos[4]; ?></span>
            </div>
            <div class="col s12"><br>
              <span><b>Vende:</b></span>
              <span id="fvendedor"><?php echo $datos[16]; ?> </span>
            </div>
            <div class="col s12">
              <span><b>Comentario:</b></span><br>
              <span id="fcomentario"><?php echo $datos[12]; ?> </span>
            </div>
          </div> 
        </div>

        <div class="col s6 m6 l6 center-align">

          <div class="col s8 right">
            <div class="card white-text imprimirSINBOR" style="background-color: #3960A7;">
              <div class=" card-content white-text imprimirSINBOR">
                <p><b>Fecha:</b>
                  <span id="ffecha"><?php echo $datos[3]; ?> </p></span>
              </div>
            </div>

          </div>

            <div class="col s8 right">
              <div class="card white-text imprimirSINBOR <?php echo $hide ?>" style="background-color: #3960A7;">
                <div class="card-content ">
                  <?php if ($datos[2] === 'N/A'){ ?>
                  <p><b class="ftipofact">Plazo en Días: </b>
                    <span class="ftipofa"><?php echo $datos[11]; ?></span>
                  </p>
                  <?php }else{ ?>
                  <p><b class="ftipofact">Tipo de Pago: </b>
                    <span class="ftipofa"><?php echo $datos[2]; ?></span>
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
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th1">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th2">Descricpión</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th3">P. Unit</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th6">Tipo</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th4">Descuento</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th5">Importe</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php 
            $grabado = $exento = 0; 
            foreach ($transaccion as $obj) {

              if ($obj[28] > 0) 
                $grabado += str_replace(',', '', $obj[20])*$obj[18];
              else
                $exento += str_replace(',', '', $obj[20])*$obj[18];?>

              <tr class="tr" >
                <td class="flista1 td center-align"><span id="cant"><?php echo $obj[29].$obj[18]; ?></span></td>
                <td class="flista2 td center-align"><span id="desc"><?php echo $obj[19]; ?></span></td>
                <td class="flista3 td center-align"><span id="punit"><?php echo $obj[20]; ?></span></td>
                <td class="flista4 td center-align"><span id="desc"><?php echo $obj[23]; ?></span></td>
                <td class="flista5 td center-align"><span id="desc"><?php echo $obj[21]; ?></span>%</td>
                <td class="flista6 td right-align"><span id="import" ><?php echo $obj[22]; ?></span></td>
              </tr>

              <?php } ?>
            </tbody>
            *Producto Exento
            <tfoot>
              <tr>
                <td style="padding: 6px 5px !important" colspan="4" class="center">
                  <?php 
                                              
                      require_once('../assets/libs/phpqrcode/qrlib.php'); 
     
                      $codeContents = $miscelaneos[11]; 
                       
                      $text = QRcode::text($codeContents); 
                      $raw = join("<br/>", $text); 
                       
                      $raw = strtr($raw, array( 
                          '0' => '<span style="color:white;width=15%">&#9608;&#9608;</span>', 
                          '1' => '&#9608;&#9608;' 
                      )); 
                       
                      echo '<tt style="font-size:5px;">'.$raw.'</tt>'; 
                      
                   ?>
                </td>
                <td colspan="2">
                  <table>

                    <tr>
                      <?php if ($grabado > 0){ ?>

                      <td style="padding: 6px 5px !important" class="left-align sinborde margen2">Grabado</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen2"><span id="fsubtotal"><?php echo $datos[15].number_format($grabado,2); ?></span></td>
                    </tr>

                    <tr>
                      <td style="padding: 6px 5px !important" class="left-align sinborde margen">Imv</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[5]; ?></span></td>
                    </tr>

                    <?php } ?>

                    <?php if ($exento > 0) { ?>

                    <tr>
                      <td style="padding: 6px 5px !important" class="left-align sinborde margen">Exento</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].number_format($exento,2); ?></span></td>
                    </tr>

                     <?php } ?>

                    <?php if (str_replace(',', '', $datos[6]) > 0){ ?>

                    <tr>
                      <td style="padding: 6px 5px !important" class="left-align sinborde margen">Descuento</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[6]; ?></span></td>
                    </tr>
                    <?php } ?>

                    <?php if ($datos[7] > 0){ ?>
                    <tr>
                      <td style="padding: 6px 5px !important" class="left-align sinborde margen">Flete</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].number_format($datos[7],2); ?></span></td>
                    </tr>
                    <?php } ?>

                    <?php if ($datos[8] > 0){ ?>
                    <tr>
                      <td style="padding: 6px 5px !important" class="left-align sinborde margen">Ajuste</td>
                      <td style="padding: 6px 5px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].number_format($datos[8],2) ?></span></td>
                    </tr>
                    <?php } ?>

                    <tr>
                      <td  class="left-align white-text sinborde imprimirSINBOR" style="border-radius: 0px !important; background-color: #3960A7;"><b>TOTAL</b></td>
                      <td  class="right-align white-text sinborde imprimirSINBOR" style="border-radius: 0px !important; background-color: #3960A7;"><b><span id="ftotal"><?php echo $datos[15].$datos[10]; ?></span></b></td>
                    </tr>
                  </table>
                </td>
              </tr>

            </tfoot>
          </table>


          <!-- @PRINT -->
          <section class="hideonprint hide">
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
                <p class="center-align" style="font-size: 0.8em;">Autorizado mediante la resolución DGT-R-48-2016 de la Dirección General de Tributación Directa, 07-10-2016.
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




     <script src="../assets/js/jquery.js?v=10.0.0.12"></script>
     <script src="../assets/js/materialize.js?v=10.0.0.12"></script>
     <script src="../assets/js/asgard.js?v=10.0.0.12"></script>
     <script src="../assets/js/modulos/recibos.js?v=10.0.0.12"></script>

   </body>