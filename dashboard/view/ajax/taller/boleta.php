<!DOCTYPE html>
<html>
<head>
    <title>Boleta de Ingreso</title>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.2.0.46">
    <link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.2.0.46">
    <link rel="stylesheet" type="text/css" href="../assets/css/modulos/style-recibo.css?v=10.2.0.46">

</head>
<body style="font-size: 1.1em;">
  <div class="row white">
    <div class="col s2 center">
        <button class="print" style="cursor: pointer;padding: 10px;
        font-weight: 600;
        font-size: 20px;
        color: #ffffff;
        background-color: #1883ba;
        border-radius: 6px;
        border: 2px solid #0016b0">Imprimir</button>   
    </div>
    <div class="col s8 row" style="border: 1px solid #e2e2e2; height: 100vh">
      <div class="col s4">
          <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="70%">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
      </div>
      <div class="col s4">
          <font size="2.5">
              <?php
                if (trim($miscelaneos[2]) != ''){
                  echo '<b>'.$miscelaneos[2].'</b><br>'.$miscelaneos[0].'<br>';
                }else
                  echo '<b>'.$miscelaneos[0].'</b><br>';
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
              <b>Teléfono:</b> <span id="ftelefono"><?php echo $miscelaneos[5]; ?></span><br>
              <b>Correo:</b> <span id="fcorreo"><?php echo $miscelaneos[4]; ?></span><br>
              <table><tr><td style="padding: 0"><b>Provincia:</b> <?php echo $miscelaneos[12] ?></td> <td style="padding: 0"><b>Cantón:</b> <?php echo $miscelaneos[13] ?></td></tr> <tr> <td style="padding: 0"><b>Distrito:</b> <?php echo $miscelaneos[14]; ?></td> 
              <?php if( $miscelaneos[15] != 'N/A'){ ?>
              <td style="padding: 0"><b>Barrio:</b> <?php echo $miscelaneos[12]; ?></td>
            <?php } ?>
          </tr></table>
              <b>Dirección:</b> <span id="fdireccion"><?php echo $miscelaneos[23]; ?></span><br>
            </font>

      </div>
      <div class="col s4">
        <span style="float: right;"><b>Boleta de Ingreso #</b><span class="red-text"><?php echo $transaccion[0][0]; ?></span> <br> Fecha de Ingreso <span><?php echo $transaccion[0][5]; ?></span> </span>
      </div>

      <div class="col s12">
          <hr>
          <label><b>Datos Cliente</b></label>
          <div class="row">
              <div class="col s6">
                  Nombre: <?php echo $transaccion[0][1]; ?>
              </div>

              <div class="col s3">
                  Tel.: <?php echo $transaccion[0][2]; ?>
              </div>

              <div class="col s3">
                  Email: <?php echo $transaccion[0][3]; ?>
              </div>
          </div>

          <hr>
          <label>Taller</label>
          <br>
          <div class="row" style="margin: 0; border-bottom: 1px solid #e2e2e2">
            <div class="col s4">
            </div>
            <div class="col s4 center">
                Reparaciones
            </div>
            <div class="col s4 center">
                Daños Externos
            </div>
          </div>

          <?php 

            $id = 0;    
            $col1 = $col2 = $col3 = '';
            foreach ($transaccion as $obj) {

                if($obj[6] != $id){
                    $id = $obj[6];
                    $col1 .= '<div class="row" style="margin: 0; border-bottom: 1px solid #e2e2e2"> <div class="col s4"> <b>'.$obj[7].': '.$obj[8].'</b> </div>';
                    if($obj[10]){
                        $col2 .= '<div class="col s4"> '.$obj[10].'<br>';
                    }

                    if($obj[12]){
                        $col3 .= '<div class="col s4"> '.$obj[12].'<br>';
                    }
                }else{

                    if($obj[10]){
                         $col2 .= $obj[10];
                    }

                    if($obj[12]){
                         $col3 .= $obj[12];
                    }

                }


            }

            $col2 .= '</div>';
            $col3 .= '</div>';

            echo $col1.$col2.$col3.'</div>';

           ?>

      </div>
    </div>
    <div class="col s2">
        <section class="hideonprint">
            <div>
              <br>
              <div id="correosclie">
               <input type="hidden" id="vid" value="<?php echo $datos[27]; ?>">
             </div>
             <label>Enviar factura por correo a:</label>
             <div class="row">
              <div class="col s10">
                <div class="chips chips-initial" id="listcorreos" style="color: white;"></div>
              </div>
              <div class="col s1">
                <a href="#" id="lcorreos" class="right"><i class="small material-icons">send</i></a>
              </div>
            </div>
            <div class="row">
             <div align="center">
               <span id="smail"></span>
             </div>
           </div>

         </div>

       </section>
    </div>
  </div>

<script src="../assets/js/jquery.js?v=10.2.0.46"></script>
<script src="../assets/js/materialize.js?v=10.2.0.46"></script>
<script src="../assets/js/asgard.js?v=10.2.0.46"></script>
</body>
</html>
