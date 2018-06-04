<?php
	foreach ($transaccion as $obj) {
?>
	
<tr>
	<td style="padding: 10px;"><?php echo $obj[1]?></td>
	<td style="padding: 10px;"><?php echo $obj[2]?></td>
	<td style="padding: 10px;"><?php echo $obj[3]?></td>
	<td style="padding: 10px;"><?php echo $obj[2]?></td>
	<td style="padding: 10px;"><?php echo $obj[5]?></td>
	<td style="padding: 10px;"><?php echo $obj[6]?></td>
	<td style="padding: 10px;"><?php echo $obj[7]?></td>
</tr>

<?php } ?>

<input type="hidden" id="hidet" tefe="<?php echo $transaccion[0][10]; ?>" ttar="<?php echo $transaccion[0][11]; ?>" tcre="<?php echo $transaccion[0][8]; ?>" tcon="<?php echo $transaccion[0][9]; ?>">

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	})
</script>