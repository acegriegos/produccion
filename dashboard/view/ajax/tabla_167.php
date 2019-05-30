  <?php
$simbolo = $log->kamehameha('simbolo',54,'principal = 1 and id > 0')[0][0];
$idfactura = 0;
$cantt = $tot = $tde = $tim = $tgr = $exc = 0;

foreach ($transaccion as $obj) {
      echo '<tr>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[0].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[1].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[2].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[3].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.number_format($obj[4],2).'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.number_format($obj[5],2).'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.number_format($obj[6],2).'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.number_format($obj[7],2).'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.number_format($obj[8],2).'</td>

      </tr>';
      $cantt++;
      $tde += str_replace(",", "", $obj[4])*$obj[9];
      $tgr += str_replace(",", "", $obj[5])*$obj[9];
      $tim += str_replace(",", "", $obj[6])*$obj[9];
      $exc += str_replace(",", "", $obj[7])*$obj[9];
      $tot += str_replace(",", "", $obj[8])*$obj[9];
  ?>
  <?php } ?>

   <tr>
      <td colspan="1">Cantidad: <?php echo $cantt; ?></td>
      <td style="border-radius: 0px !important; text-align: center "></td>
      <td style="border-radius: 0px !important; text-align: center "></td>
      <td style="border-radius: 0px !important; text-align: center "><b>TOTAL</b></td>
      <td style="border-radius: 0px !important; text-align: center "><?php echo $simbolo.number_format($tde,2); ?></td>
      <td style="border-radius: 0px !important; text-align: center "><?php echo $simbolo.number_format($tgr,2); ?></td>
      <td style="border-radius: 0px !important; text-align: center "><?php echo $simbolo.number_format($tim,2); ?></td>
      <td style="border-radius: 0px !important; text-align: center "><?php echo $simbolo.number_format($exc,2); ?></td>
      <td style="border-radius: 0px !important; text-align: center "><?php echo $simbolo.number_format($tot,2); ?></td>

      </tr>

  <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
</script>