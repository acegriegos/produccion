<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <link rel="icon" type="image/png" href="../assets/img/favicon.ico">
    <link rel="stylesheet" type="text/css" href="../assets/css/materialize.css?v=10.2.0.94">
    <link rel="stylesheet" type="text/css" href="../assets/fonts/material-icons.css?v=10.2.0.94">
    <link rel="stylesheet" type="text/css" href="../assets/css/system.min.css?v=10.2.0.94">
    <title>Asiento</title>
</head>
<body class="forprint">
    <div class="hojaprint">
        <div class="row">

          <div class="col s4" align="center" style="padding: 0% 0% 0% 0%;">

            <?php if ($miscelaneos[3]) {
              echo '<img src='.$miscelaneos[3].' id="imglogo" class="img-responsive" width="70%">';
            }else{
              $nom = explode(' ', $miscelaneos[2]);
              $luno = substr($nom[0], 0,1);
              $ldos = isset($nom[1]) ? substr($nom[1], 0,1) : substr($nom[0], 1,1);
              echo strtoupper($luno.$ldos);
            }?>
            
          </div>

          <div class="col s4 center" style="padding:0px;">
            <font size="2.5">
              <?php
                if (trim($miscelaneos[2]) != ''){
                  echo '<b>'.$miscelaneos[2].'</b><br>'.$miscelaneos[0].'<br>';
                }else
                  echo '<b>'.$miscelaneos[0].'</b><br>';
              ?>
              <b>Cédula:</b> <span id="fcedula"><?php echo $miscelaneos[1]; ?></span><br>
            </font>
          </div>

          <div class="col s4 eder">
            <b>Asiento N°</b><span style="color:red"><?php echo $transaccion[0][0]; ?></span>    
          </div>
        </div>

        <table cellpadding="0" cellspacing="0" style="width:100%" class="table">
            <tr>
                <td style="padding: 0px;padding-left: 1%;">Fecha: <?php echo $transaccion[0][1]; ?></td>
                <td style="padding: 0px;padding-left: 1%;">Usuario: <?php echo $transaccion[0][2]; ?></td>
                <td style="padding: 0px;padding-left: 1%;"></td>
            </tr>
            <tr>
                <td colspan="3" style="padding: 0px;padding-left: 1%;">Descripción: <?php echo $transaccion[0][3]; ?></td>
            </tr>
            <tr>
                <td colspan="3"></td>
            </tr>
            <tr style="border-bottom: 1px solid black;">
                <td style="padding: 0px;text-align: center">Cuenta</td>
                <td style="padding: 0px;text-align: center;border-right: 1px solid black;">Débitos</td>
                <td style="padding: 0px;text-align: center">Créditos</td>
            </tr>
            <?php $tot1 = $tot2 = 0; foreach($transaccion as $obj){  $tot1+=$obj[5];$tot2+=$obj[6];?>
            <tr>
                <td style="padding: 0px;"><?php echo $obj[4]; ?></td>
                <td style="text-align: right;padding: 0px;padding-right:5px;border-right: 1px solid black; border-left: 1px solid black;"><?php echo number_format($obj[5],2); ?></td>
                <td style="text-align: right;padding: 0px;padding-right:5px;border-right: 1px solid black; border-left: 1px solid black;"><?php echo number_format($obj[6],2); ?></td>
            </tr>
            <?php } ?>
            <tr style="border-top: 1px solid black;">
                <td><b>TOTAL(<?php echo $obj[7]; ?>)</b></td>
                <td style="text-align: right;"><b><?php echo number_format($tot1,2); ?></b></td>
                <td style="text-align: right;"><b><?php echo number_format($tot2,2); ?></b></td>
            </tr>
        </table>
        <br><br>
        <div style="border-top: 1px solid black;margin:0 auto;max-width: 30%;text-align: center;">
            Firma Representante
        </div>
    </div>
</body>
</html>