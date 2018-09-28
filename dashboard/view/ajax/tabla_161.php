<?php 
	$dis = '';
	foreach ($transaccion as $index => $obj) {
		if ($obj[6] > $obj[8] || $obj[8] == 0) {
			$dis = 'disabled';
			$tmsj = 'Cantidad Insuficiente en Inventario';
		}else{
			$dis = 'checked';
			$tmsj = 'Agregar Producto';
		}
		$index++;
?>

<tr>
<td style="width: 10%"><?php echo $obj[3] ?></td>
<td style="width: 10%"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[8] ?></td>
<td style="width: 10%"><?php echo $obj[9] ?></td>
<td style="width: 10%">

    <input type="checkbox" name="processitem" class="filled-in tooltipped" id="prcitem<?php echo $index ?>" idproducto="<?php echo $obj[2]?>" idinventario="<?php echo $obj[10]?>" <?php echo $dis?> data-tooltip="<?php echo $tmsj; ?>"  data-position="button" />
    <label for="prcitem<?php echo $index ?>"></label>
</td>
</tr>


<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>