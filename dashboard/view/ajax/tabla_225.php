<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[0]; ?></td>
    <td><?php echo $obj[1]; ?></td>
    <td><?php echo $obj[2]; ?></td>
    <td><?php echo $obj[3]; ?></td>
    <td><?php echo $obj[4]; ?></td>
    <td tid="<?php echo $obj[5]; ?>">
        <a href="#modal-odt" class="pbtn proyect black-text modal-trigger" title="Asignar ODT"><i class="mdi mdi-folder" href="#addPre"></i></a>
        <a href="#addPre" class="pbtn load black-text" modulo="presupuesto" title="Editar Presupuesto" id="e<?php echo $obj[5]; ?>"><i class="mdi mdi-pencil"></i></a>
        <i class="mdi mdi-window-close pbtn delete" title="Elimiar Presupuesto"></i>
    </td>
</tr>

<?php }

 ?>