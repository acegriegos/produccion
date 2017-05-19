<?php 
	
	foreach ($transaccion as $index =>  $obj) {
		$total = $obj[5] * $obj[6];
?>

<tr id="fd<?php echo $index ?>" class="ciclos">
	<td class="center" id="codprod<?php echo $obj[0] ?>"><?php echo $obj[3] ?></td>
	<td class="center" id="desc<?php echo $obj[0] ?>"><?php echo $obj[4] ?></td>
	<td class="center"><div><span id="cant<?php echo $obj[0] ?>"><?php echo $obj[6] ?></span><input type="number" id="vcantidad<?php echo $obj[0] ?>" value="<?php echo $obj[6] ?>" min="1" style="display:none;width: 70px"></div></td>
	<td class="center"><div><span id="prec<?php echo $obj[0] ?>"><?php echo $obj[5] ?></span><input type="number" id="hprc<?php echo $obj[0] ?>" value="<?php echo $obj[5] ?>" min="1" style="display:none;width: 70px"></div></td>
	<td class="center"><div><span id="descu<?php echo $obj[0] ?>">0.00</span> %<input type="number" id="hdsc<?php echo $obj[0] ?>" value="0.00" min="1" style="display:none;width: 70px"></div></td>
	<td class="center totp" id="tota<?php echo $obj[0] ?>"><?php echo number_format($total,2)?></td>
	<td id="desctd<?php echo $obj[0] ?>" align="left"><input type="checkbox" class="filled-in chkivi" id="aivi<?php echo $obj[0] ?>" checked="checked"><label for="aivi<?php echo $obj[0] ?>">I.V.I</label><input type="text" id="ivi<?php echo $obj[0] ?>" value="<?php echo $obj[7] ?>" placeholder="0" style="width: 50px"><a class="fa fa-archive pbtn black-text chinv" id="chi<?php echo $obj[0] ?>" href="#modal-inventario" title="Cambiar Inventario"></a><a id="edit<?php echo $obj[0] ?>" visible="0" class="material-icons pbtn black-text fedit faccion">edit</a><a id="del<?php echo $obj[0] ?>" style="color: #D9534F" title="Eliminar Fila" class="material-icons pbtn black-text delf faccion">close</a></td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 		$("tr").each(function(){
 			 $(this).data('triforce',{vaccion:0,vid:0, vidfactura:'?',videntrada:idprod, vcantidad:cant, vprecio:precio, vdesc:0, vtotal:0, vidinventario:hinv,vidodt : 0});
 		});
 	});

 </script>


