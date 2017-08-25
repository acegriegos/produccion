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
        <a href="#modal-odt" class="pbtn proyect black-text" title="Asignar ODT"><i class="fa fa-folder-o" href="#addPre"></i></a>
        <a href="#addPre" class="pbtn load black-text" modulo="presupuesto" title="Editar Presupuesto" id="e<?php echo $obj[5]; ?>"><i class="fa fa-pencil-square-o "></i></a>
        <i class="fa fa-times pbtn delete" title="Elimiar Presupuesto"></i>
    </td>
</tr>

<?php }

 ?>