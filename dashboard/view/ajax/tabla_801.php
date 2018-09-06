<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr id="a_<?php echo $obj[0]; ?>">
    <td><?php echo $obj[1]; ?></td>
    <td><?php echo $obj[2]; ?></td>
    <td><?php echo $obj[3]; ?></td>
    <td>
        <a class="waves-effect waves-light load gtext" modulo="restaurantes-mesa" id="h<?php echo $obj[0]; ?>"  title="Editar Mesa"><i class="mdi mdi-pencil mdi-24px"></i></a>
        <a class="waves-effect waves-light delete gtext" modulo="restaurantes-mesa" id="b<?php echo $obj[0]; ?>"  title="Eliminar Mesa"><i class="mdi mdi-close mdi-24px"></i></a>
    </td>
</tr>
<?php } ?>