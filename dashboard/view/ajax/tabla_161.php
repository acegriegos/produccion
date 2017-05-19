<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[3] ?></td>
<td style="width: 10%"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%">
    <input type="checkbox" name="processitem" class="filled-in" id="prcitem<?php echo $obj[2] ?>" />
    <label for="prcitem<?php echo $obj[2] ?>"></label>
</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>