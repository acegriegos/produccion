<?php 	
	foreach ($transaccion as $obj) {
?>
<tr id="ifila<?php echo $obj[1]?>" class="detsolution" data-idproducto="<?php echo $obj[2]?>" data-idunidad="<?php echo $obj[4]?>" data-idinventario="<?php echo $obj[7]?>" data-cantidad="<?php echo $obj[5]?>">
	<td class="center" style="padding: 0 !important;"><?php echo $obj[3] ?></td>
	<td class="center" style="padding: 0 !important;"><?php echo $obj[6] ?></td>
	<td class="center" style="padding: 0 !important;">
		<i class="pbtn mdi mdi-pencil mdi-24px labedit" id="le<?php echo $obj[1]?>"></i>
		<i class="pbtn mdi mdi-close mdi-24px cdel labdel" id="ld<?php echo $obj[1]?>"></i>
	</td>
</tr>
<?php } ?>