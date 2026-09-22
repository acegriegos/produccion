<?php 
    
    if(!sizeof($transaccion)){
        echo '<tr> <td class="center" colspan="5">No hay Notas Registradas</td> </tr>';
    }else

    foreach ($transaccion as $obj) {
?>
<tr vid="<?php echo $obj[0]; ?>">
    <td width="10%"><?php echo $obj[1]; ?></td>
    <td width="50%" style="word-break: break-all;"><?php echo $obj[2]; ?></td>
    <td width="10%"><?php echo $obj[3]; ?></td>
    <td width="20%"><?php echo $obj[4]; ?></td>
    <td width="10%"> <i class="mdi mdi-pencil mdi-24px _enota pbtn" title="Editar Nota"></i> <i class="mdi mdi-close red-text mdi-24px _dnota pbtn" title="Eliminar Nota"></i> </td>
</tr>

<?php }

 ?>