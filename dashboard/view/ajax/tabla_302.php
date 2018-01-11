<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr class="button-collapse detalle" data-activates="acciones" id="a<?php echo $obj[4]; ?>">
	<td style=" padding: 10px;"><?php echo $obj[0]; ?></td>
	<td style=" padding: 10px;"><?php echo $obj[1]; ?></td>
	<td style=" padding: 10px;"><?php echo $obj[2]; ?></td>
	<td style=" padding: 10px;"><?php echo $obj[3]; ?></td>
</tr>

<?php }

?>
<script type="text/javascript">
	$(function(){
		permisos(310,311);
	})
</script>