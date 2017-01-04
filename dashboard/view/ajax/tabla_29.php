<?php foreach ($transaccion as $obj) {
?>

<tr id="f<?php echo $obj[0] ?>">
<td><?php echo $obj[1] ?></td>
<td><?php echo $obj[2] ?></td>
<td><?php echo $obj[4] ?></td>
<td><?php echo $obj[5] ?></td>
<td><?php echo $obj[6] ?></td>
<td>
<a href="#modal-clientes" class="btn-floating load modal-trigger" id="m<?php echo $obj[0] ?>" modulo="cliente"><i class="fa fa-pencil-square-o"></i></a>
<a href="#!" class="btn-floating delete" modulo="cliente" id="d<?php echo $obj[0] ?>" style="color: #D9534F"><i class="fa fa-times"></i></a>
</td>
</tr>

<?php } ?>