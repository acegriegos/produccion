<?php 
	$dis = '';
	foreach ($transaccion as $index => $obj) {
		if ($obj[8] == -1) //{
			$obj[8] = '∞';
		/*	$dis = 'checked';
			$tmsj = 'Agregar Servicio'; 
		}else{
			if ($obj[6] > $obj[8] || $obj[8] == 0 && is_numeric($obj[8])) {
				$dis = 'disabled';
				$tmsj = 'Cantidad Insuficiente en Inventario';
			}else{
				$dis = 'checked';
				$tmsj = 'Agregar Producto';
			}
		}*/
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

    <input type="checkbox" name="processitem" class="filled-in" id="prcitem<?php echo $index ?>" idd="<?php echo $obj[11]?>" title="<?php echo $tmsj; ?>" />
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