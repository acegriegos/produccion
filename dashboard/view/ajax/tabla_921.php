<?php 	
	foreach ($transaccion as $obj) {
?>
<tr>
	<td class="center" style="padding: 0 !important;"><?php echo $obj[1] ?></td>
	<td class="center" style="padding: 0 !important;"><?php echo $obj[2] ?></td>
	<td class="center" style="padding: 0 !important;">
		<i class="pbtn mdi mdi-close mdi-24px cdel"></i>
		<i class="pbtn mdi mdi-pencil mdi-24px"></i>
	</td>
</tr>
<?php } ?>
<script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
</script>