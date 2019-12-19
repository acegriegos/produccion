<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[0] ?></td>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td>
        <i class="mdi mdi-pencil pbtn" title="Editar Boleta"></i>
        <i class="mdi mdi-settings pbtn" title="Procesar Boleta"></i>
    </td>

</tr>

<?php }

 ?>