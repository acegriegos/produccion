<?php foreach ($transaccion as $obj) {
?>

<tr id="f<?php echo $obj[0] ?>">
<td><?php echo $obj[1] ?></td>
<td><?php echo $obj[2] ?></td>
<td><?php echo $obj[4] ?></td>
<td><?php echo $obj[5] ?></td>
<td><?php echo $obj[6] ?></td>
<td>
<a href="#modal-clientes" style="color: #686868"><i class="load material-icons pbtn" id="m<?php echo $obj[0] ?>" modulo="cliente">edit</i></a>
<a href="#" style="color: #686868"><i class="delete material-icons pbtn" modulo="cliente" id="d<?php echo $obj[0] ?>">delete</i></a>
</td>
</tr>

<?php } ?>