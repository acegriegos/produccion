<?php 
    
    if(!sizeof($transaccion)){
        echo '<tr> <td class="center" colspan="5">No hay Notas Registradas</td> </tr>';
    }else

    foreach ($transaccion as $obj) {
?>
<tr vid="<?php echo $obj[0]; ?>">
    <td><?php echo $obj[1]; ?></td>
    <td><?php echo $obj[2]; ?></td>
    <td><?php echo $obj[3]; ?></td>
    <td><?php echo $obj[4]; ?></td>
    <td> <i class="mdi mdi-pencil mdi-24px _enota pbtn" title="Editar Nota"></i> <i class="mdi mdi-close red-text mdi-24px _dnota pbtn" title="Eliminar Nota"></i> </td>
</tr>

<?php }

 ?>