<?php 
	$dis = '';
	foreach ($transaccion as $obj) {
		if ($obj[6] > $obj[8] || $obj[8] == 0) {
			$dis = 'disabled';
		}else{
			$dis = '';
		}
?>

<tr>
<td style="width: 10%"><?php echo $obj[3] ?></td>
<td style="width: 10%"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[8] ?></td>
<td style="width: 10%"><?php echo $obj[9] ?></td>
<td style="width: 10%">

    <input type="checkbox" name="processitem" class="filled-in" id="prcitem<?php echo $obj[2] ?>" <?php echo $dis?>/>
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