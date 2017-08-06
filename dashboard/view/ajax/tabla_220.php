<?php 
    
    foreach ($transaccion as $obj) {
?>



 <tr>
    <td><?php echo $obj[0] ?></td>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[5] ?> <i class="der fa fa-minus delclie pbtn" style="color:red" title="Quitar Cliente de la Ruta" id="r<?php echo $obj[6] ?>"></i></td>
</tr>

<?php }

 ?>