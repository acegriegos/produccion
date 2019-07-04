<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];?>
<title>Recibo de Factura</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.1.0.41">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.1.0.41">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-recibo.css?v=10.1.0.41">


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

        <div class="row" style="padding: 0px">
          <?php if ($transaccion[0][32] != '') { ?>
            <b><h3 id="ftipo" style="font-size: 19px">Documento Electrónico</h3></b>
          <?php } ?>
          <div class="col s6 m6 l6" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 0%;margin: 0px">
              <!--  -->
              <div class="col s12" style="padding: 0px">
                <?php if ($transaccion[0][32] != '') { ?>
                  <b class="fe">Clave: </b>
                  <span id="clave" class="fe"><?php echo $transaccion[0][32]; ?></span><br>
                <?php } ?>
                
                <b><span id="fact"><?php echo $transaccion[0][25] ?></span> </b> de: </b><span id="fclase"><?php echo $datos[1].$datos[31]; ?></span> N°:
                <span id="numfact" class="fe"> <?php echo $datos[0]; ?> </span>
              </div>

             <?php if ($datos[4] != '') { ?>
             <div class="col s12" style="padding: 8px 0px 8px 0px">
                <b><?php echo $datos[30]; ?>:</b><br>
                <b style="color: white;"><?php echo $datos[30]; ?>:</b><span id="fcliente"><?php echo $datos[4]; ?></span>  <br>
            </div>
            <b>Cédula:</b> <?php echo $datos[34]; ?><br>
            <b>Correo:</b> <?php echo $datos[41]; ?><br>
            <?php } ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Usuario:</b></span>
              <span id="fvendedor"><?php echo $datos[16]; ?> </span>
            </div>
            <?php if($datos[12] != ''){ ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Comentario:</b></span><br>
              <span id="fcomentario"><?php echo $datos[12]; ?> </span>
            </div>
          <?php } ?>
          </div> 
        </div>

        <div class="col s6 m6 l6 center-align">

          <div class="col s8 right">
            <div class="card white-text imprimirSINBOR" style="background-color: #3960A7;">
              <div class=" card-content white-text imprimirSINBOR">
                <p><b>Fecha:</b>
                  <span id="ffecha"><?php echo $datos[3].' '.$datos[37]; ?> </p></span>
              </div>
            </div>

          </div>
          <?php if ($transaccion[0][32] != '') { ?>
            <div class="col s8 right">
              <div class="card white-text imprimirSINBOR" style="background-color: #3960A7;">
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
          <?php } ?>
          </div>
        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px; font-size: 1.1em;" id="detalle">
          <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
            <tr>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Código</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Descripción</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">P.Unit</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Tipo</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Descuento</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">IVA%</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">EXO%</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;">Importe</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php 
       
            foreach ($transaccion as $obj) { ?>

              <tr class="tr" >
                <td class="flista1 td center-align"><span id="cant"><?php echo $obj[29].$obj[18]; ?></span></td>
                <td class="flista2 td center-align"><span><?php echo $obj[36]; ?></span></td>
                <td class="flista2 td center-align"><span><?php echo $obj[19]; ?></span></td>
                <td class="flista3 td center-align"><span><?php echo $obj[20]; ?></span></td>
                <td class="flista4 td center-align"><span><?php echo $obj[23]; ?></span></td>
                <td class="flista5 td center-align"><span><?php echo $obj[21]; ?></span></td>
                <td class="flista5 td center-align"><span><?php echo number_format($obj[47],0); ?></span></td>
                <td class="flista5 td center-align"><span><?php echo $obj[46]; ?></span></td>
                <td class="flista6 td right-align"><span><?php echo $obj[22]; ?></span></td>
              </tr>

              <?php } ?>
            </tbody>
            <?php if($obj[33] != ''){
              $exoneracion = explode('^', $obj[33]);
              $time = strtotime($exoneracion[3]);
              $fexo = date('d/m/Y \a \l\a\s H:i:s',$time);

              echo "<span style='text-align:justify;'>Factura exenta del pago del impuestos. Exoneracion emitida por ".$exoneracion[2]." mediante el documento ".$exoneracion[1].", con fecha ".$fexo."</span><br><br>";
            } ?>
            * Producto Exento
            <br>
            ** I.V.I
            <tfoot>
              <tr>
                <td style="padding: 0px !important" colspan="6" class="center ">
                 <!--  <?php 
                                              
                      require_once('../assets/libs/phpqrcode/qrlib.php'); 
     
                      $codeContents = $miscelaneos[11]; 
                       
                      $text = QRcode::text($codeContents); 
                      $raw = join("<br/>", $text); 
                       
                      $raw = strtr($raw, array( 
                          '0' => '<span style="color:white;width=15%">&#9608;&#9608;</span>', 
                          '1' => '&#9608;&#9608;' 
                      )); 
                       
                      echo '<tt style="font-size:5px;">'.$raw.'</tt>'; 
                      
                   ?> -->
                </td>
                <td colspan="3">
                  <table>
                    <tr>


                      <td style="padding: 0px !important" class="left-align sinborde margen2">Gravado</td>
                      <td style="padding: 0px !important" class="right-align sinborde margen2"><span id="fsubtotal"><?php echo $datos[15].$datos[9]; ?></span></td>
                    </tr>

                    <tr>
                      <td style="padding: 0px" class="left-align sinborde margen">Exento</td>
                      <td style="padding: 0px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[8]; ?></span></td>
                    </tr>

                     <tr>
                      <td style="padding: 0px" class="left-align sinborde margen">Exonerado</td>
                      <td style="padding: 0px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[7]; ?></span></td>
                    </tr>

                    <tr>
                      <td style="padding: 0px !important" class="left-align sinborde margen">Descuento</td>
                      <td style="padding: 0px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[6]; ?></span></td>
                    </tr>

                    <tr>
                      <td style="padding: 0px !important" class="left-align sinborde margen">IVA</td>
                      <td style="padding: 0px !important" class="right-align sinborde margen"><span id="fimv"><?php echo $datos[15].$datos[5]; ?></span></td>
                    </tr>

                    <tr>
                      <td  class="left-align white-text sinborde imprimirSINBOR" style="border-radius: 0px !important;  background-color: #3960A7;"><b>TOTAL</b></td>
                      <td  class="right-align white-text sinborde imprimirSINBOR" style="border-radius: 0px !important; padding-right: 0.5px !important; background-color: #3960A7;"><b><span id="ftotal"><?php echo $datos[15].$datos[10]; ?></span></b></td>
                    </tr>
                  </table>
                </td>
              </tr>

            </tfoot>
          </table>

          <!-- @PRINT -->
          <section class="<?php if(!$config[9]) echo 'hide'; ?>">
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

            <?php switch($datos[24]){
              case 1:
              $msj = $datos[26] == 2 ? 'Renuncio mi domicilio y los trámites de juicio ejectivo. Al mismo tiempo doy por aceptadas las condiciones del codigo del comercio según artículo 460. Todo reclamo debe hacerse antes de 5 días hábiles. Acepto ser incluído en la red nacional de créditos' : 'Esta factura constituye Título Ejecutivo de acuerdo al art. 460 del Código de Comercio.';
              break;
              case 4:
              $msj = 'La presente Proforma tiene una durabilidad de OCHO días.';
              break;
              default:
              $msj = '';
              break;
            } ?>
            
              <!-- /FOOTER -->
              <footer class="imprimirSINBOR center " style=" width: 100%; padding-right: 8% !important" >
              <hr>
              <div>
                <?php if ($transaccion[0][32] != '') { ?>
                <p class="center-align" style="font-size: 0.8em;">Autorizado mediante la resolución DGT-R-48-2016 de la Dirección General de Tributación Directa, 07-10-2016. V4.3
                  <br> 
                  <span class="" style="font-size: 0.8em;"><?php echo $msj; ?></span></p><br>
                </div>
                <?php }else echo '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>'; ?>
              </footer>
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


     <script src="../assets/js/jquery.js?v=10.1.0.41"></script>
     <script src="../assets/js/materialize.js?v=10.1.0.41"></script>
     <script src="../assets/js/asgard.js?v=10.1.0.41"></script>
     <script src="../assets/js/modulos/recibos.js?v=10.1.0.41"></script>
     <script type="text/javascript">
       $(function(){
          param = getParameterByName('fp');
          param = param == '' ? 0 : parseInt(param) ;
          
          window.onafterprint = function(){
           window.close();
         }

          if(parseInt(param)){
            window.print();
          }

       })
     </script>

   </body>