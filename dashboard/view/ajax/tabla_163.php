<?php 
	
	foreach ($transaccion as $index =>  $obj) {
		$total = $obj[6] * $obj[7];
		$index++;
?>

<tr id="fd<?php echo $index ?>" class="ciclos">
	<td class="center" id="codprod<?php echo $index ?>"><?php echo $obj[4] ?></td>
	<td class="center" id="desc<?php echo $index ?>"><?php echo $obj[5] ?></td>
	<td class="center"><div><span id="cant<?php echo $index ?>"><?php echo $obj[7] ?></span><input type="number" id="vcantidad<?php echo $index ?>" value="<?php echo $obj[7] ?>" min="1" style="display:none;width: 70px"></div></td>
	<td class="center"><div><span id="prec<?php echo $index ?>"><?php echo $obj[6] ?></span><input type="number" id="hprc<?php echo $index ?>" value="<?php echo $obj[6] ?>" min="1" style="display:none;width: 70px"></div></td>
	<td class="center"><div><span id="descu<?php echo $index ?>">0.00</span> %<input type="number" id="hdsc<?php echo $index ?>" value="0.00" min="1" style="display:none;width: 70px"></div></td>
	<td class="center totp" id="tota<?php echo $index ?>"><?php echo number_format($total,2)?></td>
	<td id="desctd<?php echo $index ?>" align="left"><input type="checkbox" class="filled-in chkivi" id="aivi<?php echo $index ?>" checked="checked"><label for="aivi<?php echo $index ?>">I.V.I</label><input type="text" id="ivi<?php echo $index ?>" value="<?php echo $obj[9] ?>" placeholder="0" style="width: 50px"><a class="fa fa-archive pbtn black-text chinv" id="chi<?php echo $index ?>" href="#modal-inventario" title="Cambiar Inventario"></a><a id="edit<?php echo $index ?>" visible="0" class="material-icons pbtn black-text fedit faccion">edit</a><a id="del<?php echo $index ?>" style="color: #D9534F" title="Eliminar Fila" class="material-icons pbtn black-text delf faccion">close</a>
	<input type="hidden" id="h_<?php echo $index ?>" idprod="<?php echo $obj[3] ?>" cant="<?php echo $obj[7] ?>" prec="<?php echo $obj[6] ?>" inv="<?php echo $obj[12] ?>"></td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
	 	permisos(310,311);

 	});

 </script>


