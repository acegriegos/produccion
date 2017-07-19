<?php 
    
    foreach ($transaccion as $obj) {
?>
<tr id="dv<?php echo $obj[0] ?>" class="variables" nom="<?php echo $obj[1] ?>" var="<?php echo $obj[2] ?>">
	<td style=" padding: 10px; color:black;"><?php echo $obj[1] ?></td>
	<td style=" padding: 10px; color:black;"><?php echo $obj[2] ?></td>
	<td>
		<a class="btn-color pbtn cdel delvar material-icons" id="d<?php echo $obj[0] ?>" title="Eliminar Característica" style="color:black;">close</a>
	</td>
</tr>

<?php }

 ?>