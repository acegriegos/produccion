<?php $config = $kakaroto->kamehameha('',42,'@@impresa')[0];?>
<title>Recibo de Boleta</title>
<meta charset="utf-8">
<link rel="icon" type="image/png" href="../assets/img/favicon.ico">
<link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.2.0.14">
<link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.2.0.14">
<link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-recibo.css?v=10.2.0.14">

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
          
            <b><h3 id="ftipo" style="font-size: 19px">Boleta de <?php echo $transaccion[0][3]; ?></h3></b>
            

          <div class="col s6 m6 l6" id="infofact">

            <div class="row" style="padding: 0% 0% 0% 0%;margin: 0px">
              <!--  -->
              <div class="col s12" style="padding: 0px">
                <b>N°</b>
                <span><?php echo $transaccion[0][0]; ?></span><br>
                <b>Usuario:</b>
                <span><?php echo $transaccion[0][2]; ?></span><br>
            <?php if($transaccion[0][10] == '') {?>
                <b>Bodega:</b>
                <span><?php echo $transaccion[0][8]; ?></span><br>
                <b>Inventario:</b>
                <span><?php echo $transaccion[0][9]; ?></span><br>
            <?php }else{ ?>
                <b>DESDE</b><br>
                <b>Bodega:</b>
                <span><?php echo $transaccion[0][8]; ?></span><br>
                <b>Inventario:</b>
                <span><?php echo $transaccion[0][9]; ?></span><br>
                <b>PARA</b><br>
                <b>Bodega:</b>
                <span><?php echo $transaccion[0][10]; ?></span><br>
                <b>Inventario:</b>
                <span><?php echo $transaccion[0][11]; ?></span><br>
            <?php } ?>
              <br>
              <b>Comentario:</b>
                <span><?php echo $transaccion[0][12]; ?></span><br>
              </div>
          </div> 
        </div>

        <div class="col s6 m6 l6 center-align">

          <div class="col s8 right">
            <div class="card white-text imprimirSINBOR" style="background-color: #3960A7;">
              <div class=" card-content white-text imprimirSINBOR">
                <p><b>Fecha:</b>
                  <span id="ffecha"><?php echo $transaccion[0][1]; ?> </p></span>
              </div>
            </div>

          </div>
          </div>
        </div>


        <table class=" bordered  dt-responsive nowrap " style="border: 0px; font-size: 1.1em;" id="detalle">
          <thead class="white-text imprimirSINBOR margen" style="background-color: #3960A7;">
            <tr>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th1">Pproducto</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th2">Cantidad</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th3">Cantidad Anterior</th>
              <th class="center-align sinborde" style="border-radius: 0px !important;" id="th3">Cantidad Final</th>
            </tr>
          </thead>
          <tbody id="ftbody">
            <?php  
            foreach ($transaccion as $obj) { ?>

              <tr class="tr" >
                <td class="flista1 td center-align"><span id="cant"><?php echo $obj[4] ?></span></td>
                <td class="flista2 td center-align"><span id="desc1"><?php echo $obj[5]; ?></span></td>
                <td class="flista2 td center-align"><span id="desc"><?php echo $obj[6]; ?></span></td>
                <td class="flista2 td center-align"><span id="desc"><?php echo $obj[13]; ?></span></td>
              </tr>

              <?php } ?>
            </tbody>
          </table>

          <!-- @PRINT -->
          <section>
            <div class="row">
              <br>
              <div class="col s12 m8 offset-m2">
                <br><br>
                <section id="sqre">
                  <table id="infotot" width="100%">
                    <tfoot>
                      <th class="center-align">Firma Representante</th>
                      <th class="infospace"></th>
                      <th class="center-align">Cédula</th>
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
            </div>
            <!-- /MAIN -->

          </div>

     </div>


     <script src="../assets/js/jquery.js?v=10.2.0.14"></script>
     <script src="../assets/js/materialize.js?v=10.2.0.14"></script>
     <script src="../assets/js/asgard.js?v=10.2.0.14"></script>
     <script src="../assets/js/modulos/recibos.js?v=10.2.0.14"></script>
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