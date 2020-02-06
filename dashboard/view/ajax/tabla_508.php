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
        <i class="mdi mdi-pencil pbtn eboleta" title="Editar Boleta" vid="<?php echo $obj[0]; ?>"></i>
        <i class="mdi mdi-settings pbtn" title="Procesar Boleta" vid="<?php echo $obj[0]; ?>"></i>
        <i class="mdi mdi-close pbtn red-text delete-row" id="d<?php echo $obj[0]; ?>" title="Eliminar Boleta"></i>
    </td>

</tr>

<?php }

 ?>