<?php
$simbolo = $log->kamehameha('simbolo',54,'principal = 1 and id > 0')[0][0];
$idfactura = 0;
$cantt = $tot = $tde = $tim = $tgr = $exc = 0;
foreach ($transaccion as $obj) {
   if ($obj[0] != $idfactura) {
      echo '<tr>
      <td class="detail pbtn" id="dt'.$obj[0].'"><span class="dts">[+]</span></td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[1].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[5].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[7].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[4].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[15].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[34].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[11].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[16].'</td>
      <td style="border-radius: 0px !important; text-align: center ">'.$obj[14].'</td>

      </tr>
      <tr class="detprod hide grey lighten-3" id="xa'.$obj[0].'">
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Código</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Código Interno</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text" colspan="2"><b>Nombre</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Cantidad</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Descuento</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Grabado</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Impuesto</b></td>
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Exento</b></td>   
      <td style="text-align: center; border-radius: 0px !important; background-color:#0B3861" class="white-text"><b>Total</b></td>

      </tr>';
      $idfactura = $obj[0];
      $cantt++;
      $tot += substr(str_replace(",", "", $obj[13]),$obj[33] == 1 ? 2 : 1)*$obj[33];
      $tde += substr(str_replace(",", "", $obj[15]),$obj[33] == 1 ? 2 : 1)*$obj[33];
      $tim += substr(str_replace(",", "", $obj[11]),$obj[33] == 1 ? 2 : 1)*$obj[33];
      $tgr += substr(str_replace(",", "", $obj[34]),$obj[33] == 1 ? 2 : 1)*$obj[33];
      $exc += substr(str_replace(",", "", $obj[14]),$obj[33] == 1 ? 2 : 1)*$obj[33];
  }
  echo '<tr class="detprod hide xb'.$obj[0].' grey lighten-4">
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[24].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[25].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2" colspan="2">'.$obj[26].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[28].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[30].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[35].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[31].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[36].'</td>
  <td style="text-align: center;border-radius: 0px !important" class="white-text blue lighten-2">'.$obj[29].'</td>

  </tr>';
  ?>
  <?php } ?>

   <tr>
      <td colspan="2">Cantidad: <?php echo $cantt; ?></td>
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