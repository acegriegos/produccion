<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];?>
<title>Recibo de Factura</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.min.css?v=10.4.0.0">
<link rel="stylesheet" type="text/css" href="../assets/css/materialdesignicons.min.css?v=10.4.0.0">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-recibo.css?v=10.4.0.0">

<style type="text/css">
  html{
    line-height: 1;
  }
</style>
<?php $hide = $datos[24] > 2 ? 'hide':''; $special = $datos[24] == 8 ? 'color:red;' : ''; ?>
<?php $co = isset($_REQUEST['co']) ? 0 : 1 ?>
</a>

<body class="grey darken-4 pequeño" style="font-size: 1.1em;">

  <div class="row">
    <div class="col s12 m9 l9" id="tercero" style="display: none">

      <!-- MAIN -->
      <div class="hoja grey lighten-5" style="padding: 0% 4%">
        <div class="row" style="margin: 0px">
          <div class="col s4" align="center" style="padding: 0% 0% 0% 0%;">
            <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="300px" height="100px">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
          </div>

          <div class="col s4 center">
            <bR>
              <?php
                if ($miscelaneos[10] == 2) {
                   if (trim($miscelaneos[2]) != '') 
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                   else
                      echo '<b><span id="fnombre">'.$miscelaneos[0].'</span></b><br>';
                }else{
                   if (trim($miscelaneos[2]) != ''){
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                      echo '<b><span id="fnombre1">'.$miscelaneos[0].'</span></b><br>';
                   }
                   else
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[0].'</span></b><br>';
                }
                
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[5]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <b>Dirección:</b> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>
          </div>

          <div class="col s4 center" style="padding: 0px;">
            <?php if ($transaccion[0][32] != '') { ?>
              <b><bR><h3 id="ftipo" style="font-size: 15px;padding: 0px;margin:0px">Documento Electrónico</h3></b>
            <?php } else echo "<br>"; ?>
            <b><span id="fact"><?php echo $transaccion[0][25] ?></span> <span id="fclase"><?php echo $datos[1].$datos[31]; ?></span> N°:</b>
                <span id="numfact" class="fe" style="color: red;"> <?php echo $datos[0]; ?> </span>
            <p style="margin-bottom: 0px"><b>Fecha:</b>
                  <span id="ffecha"><?php echo $datos[3]; ?> </span></p>
            <p style="margin: 0px"><b>Hora:</b>
                  <span><?php echo $datos[37]; ?> </span></p>
          </div>

        </div>

        <div class="row" style="padding: 0px">
          
          <div class="col s12" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 0%;margin: 0px">
              <!--  -->
              <div class="col s12" style="padding: 0px">
                <?php if ($transaccion[0][32] != '') { ?>
                  <b class="fe">Clave: </b>
                  <span id="clave" class="fe"><?php echo $transaccion[0][32]; ?></span>
                <?php } ?>

                <?php if ($datos[2] === 'N/A'){ ?>
                  <b class="ftipofact" style="margin-left: 5%">Plazo en Días: </b>
                    <span class="ftipofa"><?php echo $datos[11]; ?></span>
                    <b style="margin-left: 5%">Vence:</b><?php echo $datos[38]; ?>
                  <?php }else if($datos[2]){ ?>
                    <b class="ftipofact" style="margin-left: 5%">Tipo de Pago: </b>
                    <span class="ftipofa"><?php echo $datos[2]; ?></span>
                  <?php } ?>
              </div>

             <?php if ($datos[4] != '') { ?>
             <div class="col s12" style="padding: 8px 0px 8px 0px">
                <b><?php echo $datos[30]; ?>:</b>
                <span id="fcliente"><?php echo $datos[4]; ?></span>
                <b style="padding-left: 5%">Cédula:</b> <?php echo $datos[34]; ?>
                <b style="padding-left: 5%">Teléfono:</b> <?php echo $datos[39]; ?>
                <br>
                <b>Dirección:</b><?php echo $datos[40]; ?>
                <b style="padding-left: 5%">Email:</b><?php echo $datos[41]; ?>
            </div>
            <br>
            <?php } ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Usuario:</b></span>
              <span id="fvendedor"><?php echo $datos[16]; ?> </span>
              <?php if($datos[48]){ ?>
              <b style="padding-left: 5%;">Orden N°:</b><?php echo $datos[48]; } ?>
              <b style="padding-left: 5%;">Agente:</b><?php echo $datos[44]; ?>
              <b style="padding-left: 5%;">Bodega:</b><?php echo $datos[42]; ?>
              <b style="padding-left: 5%; color: red">ARCHIVO</b>
            </div>
            <?php if($datos[12] != ''){ ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Comentario:</b></span><br>
              <span id="fcomentario"><?php echo $datos[12]; ?> </span>
            </div>
          <?php } ?>
          </div> 
        </div>

        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px;" id="detalle">
          <thead class=" margen">
            <tr>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th1">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th2">Código</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th3">Descripción</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th4">P. Unit</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th5">Tipo</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th6">Descuento</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th7">Importe</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php 
          
            foreach ($transaccion as $obj) {?>
              <tr class="tr" >
                <td class="flista1 td center-align" style="padding: 0px"><span id="cant"><?php echo $obj[29].$obj[18]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc1"><?php echo $obj[36]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc"><?php echo $obj[19]; ?></span></td>
                <td class="flista3 td center-align" style="padding: 0px"><span id="punit"><?php echo $obj[20]; ?></span></td>
                <td class="flista4 td center-align" style="padding: 0px"><span id="desc2"><?php echo $obj[23]; ?></span></td>
                <td class="flista5 td center-align" style="padding: 0px"><span id="desc3"><?php echo $obj[21]; ?></span></td>
                <td class="flista6 td right-align" style="padding: 0px"><span id="import" ><?php echo $obj[22]; ?></span></td>
              </tr>

             <?php } ?>
            </tbody>
            <?php if($obj[33] != ''){
              $exoneracion = explode('^', $obj[33]);
              $time = strtotime($exoneracion[3]);
              $fexo = date('d/m/Y \a \l\a\s H:i:s',$time);
              echo "<span style='text-align:justify;'>Factura exenta del pago del impuestos. Exoneracion emitida por ".$exoneracion[2]." mediante el documento ".$exoneracion[1].", con fecha ".$fexo.".</span><br><br>";
            } ?>
            <tfoot>
              <tr>
                <td style="padding: 0px !important" colspan="4" style="padding-bottom: 0;">
                  <div class="row" style="margin: 0px; padding-top: 7%">
                    <div class="col s6 center" >
                      <div style="border-top: 1px solid black;">Recibido Conforme</div>
                    </div>

                    <div class="col s6 center">
                      <div style="border-top: 1px solid black;">Cédula</div>
                    </div>
                  </div>
                </td>
                <td colspan="3" style="padding-bottom: 0;">
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
                      <td  class="left-align sinborde " style="padding:0px;border-radius: 0px !important; "><b>TOTAL</b></td>
                      <td  class="right-align sinborde " style="border-radius: 0px !important; padding:0px !important;"><b><span id="ftotal"><?php echo $datos[15].$datos[10]; ?></span></b>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>

            </tfoot>
          </table>

          <!-- @PRINT -->
          <section class="hide">
            <div class="row">
              <div class="col s12 m8 offset-m2">
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
              $msj = 'La presente Proforma tiene una durabilidad de OCHO días. <br>';
              break;
              case 106:
                $msj = "Este comprobante no puede ser utilizado para fines tributarios, por lo cual no se permitirá su uso para respaldo de créditos o gastos";
                break;
              default:
              $msj = '';
              break;
            } ?>
            
              <!-- /FOOTER -->

              <div class=" center " style=" width: 100%; padding-right: 8% !important" >
              <hr>
              <div>
                <?php if ($transaccion[0][32] != '') { ?>
                <p class="center-align" style="font-size: 0.8em;">AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019
                  <br> 
                  <span class="" style="font-size: 0.8em;"><?php echo $msj; ?>.No se aceptan Devoluciones después de 30 días</span></p><br>
                
                <?php }else echo '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>'; ?>
                </div>
              </div>
            </div>
            <!-- /MAIN -->

          </div>
          <!-- @PRINT -->
          <section class="hideonprint">
            <div class="col s12 m3 l3 white-text">
              <div id="correosclie">
               <input type="hidden" id="vid" value="<?php echo $datos[27]; ?>">
             </div>
             <label>Enviar factura por correo a:</label>
             <div class="row">
              <div class="s10 col">
                <div class="chips chips-initial white-text" id="listcorreos" style="color: white;"></div>
              </div>
              <div class="s2 col">
                <a href="#" id="lcorreos" class="right"><i class="small white-text mdi mdi-send"></i></a>
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

     <div class="row salto" id="segundo" style="display: none">
    <div class="col s12 m9 l9">

      <div class="hoja grey lighten-5" style="padding: 0% 4%">
        <div class="row" style="margin: 0px;">
          <div class="col s4" align="center" style="padding: 0% 0% 0% 0%;">
            <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="300px" height="100px">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
            
          </div>
          <div class="col s4 center">
            <bR>
              <?php

                if ($miscelaneos[10] == 2) {
                   if (trim($miscelaneos[2]) != '') 
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                   else
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[0].'</span></b><br>';
                }else{
                   if (trim($miscelaneos[2]) != ''){
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                      echo '<b><span id="fnombre1">'.$miscelaneos[0].'</span></b><br>';
                   }
                   else
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[0].'</span></b><br>';
                }
                
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[5]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <b>Dirección:</b> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>
          </div>

          <div class="col s4 center" style="padding: 0px;">
            <?php if ($transaccion[0][32] != '') { ?>
              <b><br><h3 id="ftipo" style="font-size: 15px;padding: 0px;margin:0px">Documento Electrónico</h3></b>
            <?php }else echo '<br>' ?>
            <b><span id="fact"><?php echo $transaccion[0][25] ?></span> <span id="fclase"><?php echo $datos[1].$datos[31]; ?></span> N°:</b>
                <span id="numfact" class="fe" style="color: red;"> <?php echo $datos[0]; ?> </span>
            <p style="margin-bottom: 0px"><b>Fecha:</b>
                  <span id="ffecha"><?php echo $datos[3]; ?> </span></p>
            <p style="margin: 0px"><b>Hora:</b>
                  <span><?php echo $datos[37]; ?> </span></p>
          </div>
        </div>

        <div class="row" style="padding: 0px">
          
          <div class="col s12" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 0%;margin: 0px">
              <div class="col s12" style="padding: 0px">
                <?php if ($transaccion[0][32] != '') { ?>
                  <b class="fe">Clave: </b>
                  <span id="clave" class="fe"><?php echo $transaccion[0][32]; ?></span>
                <?php } ?>

                <?php if ($datos[2] === 'N/A'){ ?>
                  <b class="ftipofact" style="margin-left: 5%">Plazo en Días: </b>
                    <span class="ftipofa"><?php echo $datos[11]; ?></span>
                    <b style="margin-left: 5%">Vence:</b><?php echo $datos[38]; ?>
                  <?php }else{ ?>
                    <b class="ftipofact" style="margin-left: 5%">Tipo de Pago: </b>
                    <span class="ftipofa"><?php echo $datos[2]; ?></span>
                  <?php } ?>
              </div>

             <?php if ($datos[4] != '') { ?>
             <div class="col s12" style="padding: 8px 0px 8px 0px">
                <b><?php echo $datos[30]; ?>:</b>
                <span id="fcliente"><?php echo $datos[4]; ?></span>
                <b style="padding-left: 5%">Cédula:</b> <?php echo $datos[34]; ?>
                <b style="padding-left: 5%">Teléfono:</b> <?php echo $datos[39]; ?>
                <br>
                <b>Dirección:</b><?php echo $datos[40]; ?>
                <b style="padding-left: 5%">Email:</b><?php echo $datos[41]; ?>
            </div>
            <br>
            <?php } ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Usuario:</b></span>
              <span id="fvendedor"><?php echo $datos[16]; ?> </span>
              <b style="padding-left: 5%;">Orden N°:</b><?php echo $datos[48]; ?>
              <b style="padding-left: 5%;">Agente:</b><?php echo $datos[44]; ?>
              <b style="padding-left: 5%;">Bodega:</b><?php echo $datos[42]; ?>
              <b style="padding-left: 5%; color: red">COPIA</b>
            </div>
            <?php if($datos[12] != ''){ ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Comentario:</b></span><br>
              <span id="fcomentario"><?php echo $datos[12]; ?> </span>
            </div>
          <?php } ?>
          </div> 
        </div>

        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px;" id="detalle">
          <thead class=" margen">
            <tr>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th1">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th2">Código</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th3">Descripción</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th4">P. Unit</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th5">Tipo</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th6">Descuento</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th7">Importe</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php 
            foreach ($transaccion as $obj) {?>
              <tr class="tr" >
                <td class="flista1 td center-align" style="padding: 0px"><span id="cant"><?php echo $obj[29].$obj[18]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc1"><?php echo $obj[36]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc"><?php echo $obj[19]; ?></span></td>
                <td class="flista3 td center-align" style="padding: 0px"><span id="punit"><?php echo $obj[20]; ?></span></td>
                <td class="flista4 td center-align" style="padding: 0px"><span id="desc2"><?php echo $obj[23]; ?></span></td>
                <td class="flista5 td center-align" style="padding: 0px"><span id="desc3"><?php echo $obj[21]; ?></span></td>
                <td class="flista6 td right-align" style="padding: 0px"><span id="import" ><?php echo $obj[22]; ?></span></td>
              </tr>

              <?php } ?>
            </tbody>
            <?php if($obj[33] != ''){
              $exoneracion = explode('^', $obj[33]);
              $time = strtotime($exoneracion[3]);
              $fexo = date('d/m/Y \a \l\a\s H:i:s',$time);
              echo "<span style='text-align:justify;'>Factura exenta del pago del impuestos. Exoneracion emitida por ".$exoneracion[2]." mediante el documento ".$exoneracion[1].", con fecha ".$fexo.". </span><br><br>";
            } ?>
            * Producto Exento
            <br>
            ** I.V.I
            <tfoot>
              <tr>
                <td style="padding: 0px !important" colspan="4" style="padding-bottom: 0;">
                  <div class="row" style="margin: 0px; padding-top: 7%">
                    <div class="col s6 center" >
                      <div style="border-top: 1px solid black;">Recibido Conforme</div>
                    </div>

                    <div class="col s6 center">
                      <div style="border-top: 1px solid black;">Cédula</div>
                    </div>
                  </div>
                </td>
                <td colspan="3" style="padding-bottom: 0;">
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
                      <td  class="left-align sinborde " style="padding:0px;border-radius: 0px !important; "><b>TOTAL</b></td>
                      <td  class="right-align sinborde " style="border-radius: 0px !important; padding:0px !important;"><b><span id="ftotal"><?php echo $datos[15].$datos[10]; ?></span></b></td>
                    </tr>                    
                  </table>
                </td>
              </tr>

            </tfoot>
          </table>

          <section class="hide">
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
              $msj = 'La presente Proforma tiene una durabilidad de OCHO días. <br>';
              break;
              case 106:
                $msj = "Este comprobante no puede ser utilizado para fines tributarios, por lo cual no se permitirá su uso para respaldo de créditos o gastos";
                break;
              default:
              $msj = '';
              break;
            } ?>
            
              <div class=" center " style=" width: 100%; padding-right: 8% !important" >
              <hr>
              <div>
                <?php if ($transaccion[0][32] != '') { ?>
                <p class="center-align" style="font-size: 0.8em;">AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019
                  <br> 
                  <span class="" style="font-size: 0.8em;"><?php echo $msj; ?>.No se aceptan Devoluciones después de 30 días</span></p><br>
                </div>
                <?php }else echo '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>'; ?>
              </div>
            </div>

          </div>

     </div>
   </div>

     <div class="row salto" >
    <div class="col s12 m9 l9 fac" id="primero">

      <div class="hoja grey lighten-5" style="padding: 0% 4%">
        <div class="row" style="margin: 0px;">
          <div class="col s4" align="center" style="padding: 0% 0% 0% 0%;">
            <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="300px" height="100px">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
            
          </div>
          <div class="col s4 center">
            <br>
              <?php

                if ($miscelaneos[10] == 2) {
                   if (trim($miscelaneos[2]) != '') 
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                   else
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[0].'</span></b><br>';
                }else{
                   if (trim($miscelaneos[2]) != ''){
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[2].'</span></b><br>';
                      echo '<b><span id="fnombre1">'.$miscelaneos[0].'</span></b><br>';
                   }
                   else
                      echo '<b><span id="fnombre" style="'.$special.'">'.$miscelaneos[0].'</span></b><br>';
                }
                
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[5]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <b>Dirección:</b> <span id="fdireccion"><?php echo $miscelaneos[6]; ?></span><br>
          </div>

          <div class="col s4 center" style="padding: 0px;">
            <?php if ($transaccion[0][32] != '') { ?>
              <b><br><h3 id="ftipo" style="font-size: 15px;padding: 0px;margin:0px">Documento Electrónico</h3></b>
            <?php } else echo "<br>"; ?>
            <b><span id="fact"><?php echo $transaccion[0][25] ?></span> <span id="fclase"><?php echo $datos[1].$datos[31]; ?></span> N°:</b>
                <span id="numfact" class="fe" style="color: red;"> <?php echo $datos[0]; ?> </span>
            <p style="margin-bottom: 0px"><b>Fecha:</b>
                  <span id="ffecha"><?php echo $datos[3]; ?> </span></p>
            <p style="margin: 0px"><b>Hora:</b>
                  <span><?php echo $datos[37]; ?> </span></p>
          </div>
        </div>

        <div class="row" style="padding: 0px">
          
          <div class="col s12" id="infofact">
            <div class="row" style="padding: 0% 0% 0% 0%;margin: 0px">
              <!--  -->
              <div class="col s12" style="padding: 0px">
                <?php if ($transaccion[0][32] != '') { ?>
                  <b class="fe">Clave: </b>
                  <span id="clave" class="fe"><?php echo $transaccion[0][32]; ?></span>
                <?php } ?>

                <?php if ($datos[2] === 'N/A'){ ?>
                  <b class="ftipofact" style="margin-left: 5%">Plazo en Días: </b>
                    <span class="ftipofa"><?php echo $datos[11]; ?></span>
                    <b style="margin-left: 5%">Vence:</b><?php echo $datos[38]; ?>
                  <?php }else{ ?>
                    <b class="ftipofact" style="margin-left: 5%">Tipo de Pago: </b>
                    <span class="ftipofa"><?php echo $datos[2]; ?></span>
                  <?php } ?>
              </div>

             <?php if ($datos[4] != '') { ?>
             <div class="col s12" style="padding: 8px 0px 8px 0px">
                <b><?php echo $datos[30]; ?>:</b>
                <span id="fcliente"><?php echo $datos[4]; ?></span>
                <b style="padding-left: 5%">Cédula:</b> <?php echo $datos[34]; ?>
                <b style="padding-left: 5%">Teléfono:</b> <?php echo $datos[39]; ?>
                <br>
                <b>Dirección:</b><?php echo $datos[40]; ?>
                <b style="padding-left: 5%">Email:</b><?php echo $datos[41]; ?>
            </div>
            <br>
            <?php } ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Usuario:</b></span>
              <span id="fvendedor"><?php echo $datos[16]; ?> </span>
              <b style="padding-left: 5%;">Orden N°:</b><?php echo $datos[48]; ?>
              <b style="padding-left: 5%;">Agente:</b><?php echo $datos[44]; ?>
              <b style="padding-left: 5%;">Bodega:</b><?php echo $datos[42]; ?>
              <b style="padding-left: 5%; color: red">ORIGINAL</b>
            </div>
            <?php if($datos[12] != ''){ ?>
            <div class="col s12" style="padding: 0px">
              <span><b>Comentario:</b></span><br>
              <span id="fcomentario"><?php echo $datos[12]; ?> </span>
            </div>
          <?php } ?>
          </div> 
        </div>

        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px;" id="detalle">
          <thead class=" margen">
            <tr>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th1">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th2">Código</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th3">Descripción</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th4">P. Unit</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th5">Tipo</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th6">Descuento</th>
              <th class="center-align sinborde" style="border-radius: 0px !important; padding: 0;" id="th7">Importe</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php 
            foreach ($transaccion as $obj) { ?>

              <tr class="tr" >
                <td class="flista1 td center-align" style="padding: 0px"><span id="cant"><?php echo $obj[29].$obj[18]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc1"><?php echo $obj[36]; ?></span></td>
                <td class="flista2 td center-align" style="padding: 0px"><span id="desc"><?php echo $obj[19]; ?></span></td>
                <td class="flista3 td center-align" style="padding: 0px"><span id="punit"><?php echo $obj[20]; ?></span></td>
                <td class="flista4 td center-align" style="padding: 0px"><span id="desc2"><?php echo $obj[23]; ?></span></td>
                <td class="flista5 td center-align" style="padding: 0px"><span id="desc3"><?php echo $obj[21]; ?></span></td>
                <td class="flista6 td right-align" style="padding: 0px"><span id="import" ><?php echo $obj[22]; ?></span></td>
              </tr>

              <?php } ?>
            </tbody>
            <?php if($obj[33] != ''){
              $exoneracion = explode('^', $obj[33]);
              $time = strtotime($exoneracion[3]);
              $fexo = date('d/m/Y \a \l\a\s H:i:s',$time);

              echo "<span style='text-align:justify;'>Factura exenta del pago del impuestos. Exoneracion emitida por ".$exoneracion[2]." mediante el documento ".$exoneracion[1].", con fecha ".$fexo.". </span><br><br>";
            } ?>
            * Producto Exento
            <br>
            ** I.V.I
            <tfoot>
              <tr>
                <td style="padding: 0px !important" colspan="4" style="padding-bottom: 0;">
                  <div class="row" style="margin: 0px; padding-top: 7%">
                    <div class="col s6 center" >
                      <div style="border-top: 1px solid black;">Recibido Conforme</div>
                    </div>

                    <div class="col s6 center">
                      <div style="border-top: 1px solid black;">Cédula</div>
                    </div>
                  </div>
                  
                </td>
                <td colspan="3" style="padding-bottom: 0;">
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
                      <td  class="left-align sinborde " style="padding:0px;border-radius: 0px !important; "><b>TOTAL</b></td>
                      <td  class="right-align sinborde " style="border-radius: 0px !important; padding:0px !important;"><b><span id="ftotal"><?php echo $datos[15].$datos[10]; ?></span></b>
                      </td>
                    </tr>
                    
                  </table>
                </td>
              </tr>

            </tfoot>
          </table>

          <section class="hide">
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
              $msj = 'La presente Proforma tiene una durabilidad de OCHO días. <br>';
              break;
              case 106:
                $msj = "Este comprobante no puede ser utilizado para fines tributarios, por lo cual no se permitirá su uso para respaldo de créditos o gastos";
                break;
              default:
              $msj = '';
              break;
            } ?>
            
              <div class=" center " style=" width: 100%; padding-right: 8% !important" >
              <hr>
              <div>
                <?php if ($transaccion[0][32] != '') { ?>
                <p class="center-align" style="font-size: 0.8em;">AUTORIZADO MEDIANTE RESOLUCION No DGT-R-033-2019 del 20 DE JUNIO 2019
                  <br> 
                  <span class="" style="font-size: 0.8em;"><?php echo $msj; ?>.No se aceptan Devoluciones después de 30 días</span></p><br>
                </div>
                <?php }else echo '<p class="center-align" style="font-size: 0.8em;">'.$msj.'</p>'; ?>
              </div>
            </div>
             </section>


     </div>

     <script src="../assets/js/jquery.js?v=10.4.0.0"></script>
     <script src="../assets/js/materialize.min.js?v=10.4.0.0"></script>
     <script src="../assets/js/asgard.js?v=10.4.0.0"></script>
     <script src="../assets/js/modulos/recibos.js?v=10.4.0.0"></script>
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