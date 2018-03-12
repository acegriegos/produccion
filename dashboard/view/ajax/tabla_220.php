<?php 
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td style="font-size: 0.8em;"><?php echo $obj[0] ?></td>
    <td style="font-size: 0.8em;"><?php echo $obj[1] ?></td>
    <td style="font-size: 0.8em;"><?php echo $obj[2] ?></td>
    <td style="font-size: 0.8em;"><?php echo $obj[3] ?></td>
    <td style="font-size: 0.8em;"><?php echo $obj[4] ?></td>
    <td style="font-size: 0.8em;"><?php echo $obj[5] ?></td>
    <td><i id="r<?php echo $obj[6] ?>" class="der mdi mdi-close delclie delete pbtn" title="Quitar Cliente de la Ruta"></i></td>
</tr>

<?php }

 ?>