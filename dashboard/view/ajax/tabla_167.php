<?php
$simbolo = $log->kamehameha('simbolo',54,'principal = 1 and id > 0')[0][0];
$idfactura = 0;
$cantt = $tot = $tde = $tim = $tgr = $text = $texo = $toc = 0;
set_time_limit(0);

foreach ($transaccion as $obj) {

      if($obj[5] == ''){
        $obj[5] = substr($obj[1], 0,2);
        $obj[6] = -1*($obj[28]+$obj[31]+$obj[33]+$obj[35]+$obj[37]);
        $obj[7] = -1*($obj[39]);
        $obj[13] = -1*($obj[30]+$obj[32]+$obj[34]+$obj[36]+$obj[38]);
        $obj[14] = -1*$obj[40];
      }
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