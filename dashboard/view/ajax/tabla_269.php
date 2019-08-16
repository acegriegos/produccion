<?php
  $tot = $tnd =$tnc = $tab = $sal = 0;
    foreach ($transaccion as $obj) {
      $tot += $obj[2];
      $tab += $obj[3];
      $tnc += $obj[4];
      $tnd += $obj[5];
      $sal += $obj[6];
    echo '<tr>
      <td style="text-align: center">'.$obj[0].'</td>
      <td style="text-align: center">'.$obj[1].'</td>
      <td style="text-align: center">'.number_format($obj[2],2).'</td>
      <td style="text-align: center">'.number_format($obj[3],2).'</td>
      <td style="text-align: center">'.number_format($obj[4],2).'</td>
      <td style="text-align: center">'.number_format($obj[5],2).'</td>
      <td style="text-align: center">'.number_format($obj[6],2).'</td>
      <td style="text-align: center">'.$obj[7].'</td>
    </tr>';
?>
<?php } 

  echo "<tr><td colspan='2'><b>TOTALES<b></td><td>".number_format($tot,2)."</td><td>".number_format($tab,2)."</td><td>".number_format($tnc,2)."</td><td>".number_format($tnd,2)."</td><td>".number_format($sal,2)."</td><td></td></tr>";

?>