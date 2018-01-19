<?php 
    
    foreach ($transaccion as $obj) {
?>



 <tr>
    <td class="tabla-pad " style="  color:black !important;"><?php echo $obj[9] ?></td>
     <td class="tabla-pad " style="  color:black !important;"><?php echo $obj[11] ?></td>
    <td style=" padding: 10px !important ; color:black !important;"><?php echo $obj[4] ?></td>
    <td style=" padding: 10px !important ; color:black !important;"><?php echo $obj[8] ?></td>
    <td style=" padding: 10px !important ; color:black !important;"><?php echo $obj[5] ?></td>
        <td style=" padding: 10px !important ; color:black !important;"><?php echo $obj[10] ?></td>

</tr>

<?php }

 ?>