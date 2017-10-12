<?php 
    
    foreach ($transaccion as $obj) {
?>
<tr id="dv<?php echo $obj[0] ?>" class="variables" nom="<?php echo $obj[1] ?>" var="<?php echo $obj[2] ?>">
	<td style=" padding: 10px; color:black;"><?php echo $obj[1] ?></td>
	<td style=" padding: 10px; color:black;"><?php echo $obj[2] ?></td>
	<td>
		<a class="btn-color pbtn cdel delvar mdi mdi-close mdi-24px" id="d<?php echo $obj[0] ?>" title="Eliminar Característica" style="color:black;"></a>
	</td>
</tr>

<?php }

 ?>