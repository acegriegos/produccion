<?php
$simbolo = $log->kamehameha('simbolo',54,'principal = 1 and id > 0')[0][0];
$idfactura = 0;
$cantt = $tot = $tde = $tim = $tgr = $text = $texo = $toc = 0;

foreach ($transaccion as $obj) {
      echo '<tr>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[0].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[2].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.substr($obj[3],0,20).'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[5].'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[6],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[7],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[11],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[8],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[12],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[13],2).'</td>
      <td style="border-radius: 0px !important; text-align: right ">'.number_format($obj[14],2).'</td>

      </tr>';
      $cantt++;
      $obj[9] = 1;
      $tgr += str_replace(",", "", $obj[6])*$obj[9];
      $text += str_replace(",", "", $obj[7])*$obj[9];
      $texo += str_replace(",", "", $obj[11])*$obj[9];
      $tde += str_replace(",", "", $obj[8])*$obj[9];
      $toc += str_replace(",", "", $obj[12])*$obj[9];
      $tim += str_replace(",", "", $obj[13])*$obj[9];
      $tot += str_replace(",", "", $obj[14])*$obj[9];
  ?>
  <?php } ?>

   <tr>
      <td colspan="1">Cantidad: <?php echo $cantt; ?></td>
      <td style="border-radius: 0px !important; text-align: center "></td>
      <td style="border-radius: 0px !important; text-align: center "></td>
      <td style="border-radius: 0px !important; text-align: center "><b>TOTAL</b></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($tgr,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($text,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($texo,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($tde,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($toc,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($tim,2); ?></td>
      <td style="border-radius: 0px !important; text-align: right "><?php echo $simbolo.number_format($tot,2); ?></td>

      </tr>

  <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
</script>