<?php 
	if ($transaccion[0][17] == 1) {
		foreach ($transaccion as $index => $obj) {
		$total = $obj[6] * $obj[7];
			$index++;
?>
<tr id="fd<?php echo $index ?>" xtr="<?php echo $obj[0] ?>" idprod="<?php echo $obj[3]?>" class="ciclos">
	<td style="padding: 0.2%">
		<input type="checkbox" class="delf" name="eliminarf" id="d<?php echo $index ?>"/>
		<label for="d<?php echo $index ?>"></label>
	</td>
	<td class="center" id="codprod<?php echo $index ?>"><?php echo $obj[4] ?></td>
	<td class="center" id="desc<?php echo $index ?>"><?php echo $obj[5] ?></td>
	<td class="center divisa" id="prec<?php echo $index ?>"><?php echo $obj[6] ?></td>
	<td id="unitprod<?php echo $index ?>"><?php echo $obj[19] ?></td>
	<td class="center">
		<div id="divcnt" class="form-group">
			<span id="cant<?php echo $index ?>"><?php echo $obj[7] ?></span>
			<input type="number" id="vcantidad<?php echo $index ?>" value="<?php echo $obj[7] ?>" min="1" style=" display:none;width: 70px">
		</div>
	</td>
	<td class="center totp divisa" id="tota<?php echo $index ?>"><?php echo number_format($total,2) ?></td>
	<td id="desctd<?php echo $index ?>" align="left" >
		<input type="text" id="vdesc<?php echo $index ?>" value="<?php echo $obj[15] ?>" placeholder="0" class="hide" style="width: 50px" disabled>
		<a href="#modal-edit" id="edit<?php echo $index ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a>
		<a href="#" id="del<?php echo $index ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a>
	</td>
</tr>
<?php }
	}else{
		foreach ($transaccion as $index => $obj) {
			$total = $obj[6] * $obj[7];
			$index++;
?>
<tr id="fd<?php echo $index ?>" xtr="<?php echo $obj[2] ?>" idprod="<?php echo $obj[3]?>" class="ciclos" data-triforce="">
	<td style="padding: 0.2%">
		<input type="checkbox" class="delf" name="eliminarf" id="d<?php echo $index ?>"/>
		<label for="d<?php echo $index ?>"></label>
	</td>
	<td class="center" id="codprod<?php echo $index ?>"><?php echo $obj[4] ?></td>
	<td class="center" id="desc<?php echo $index ?>"><?php echo $obj[5] ?></td>
	<td class="center">
		<div id="divcnt" class="form-group">
			<span id="cant<?php echo $index ?>"><?php echo $obj[7] ?></span>
			<input type="number" id="vcantidad<?php echo $index ?>" value="<?php echo $obj[7] ?>" min="1" style=" display:none;width: 70px">
		</div>
	</td>
	<td class="center divisa" id="prec<?php echo $index ?>"><?php echo $obj[6] ?></td>
	<td id="unitprod<?php echo $index ?>"><?php echo $obj[19] ?></td>
	<td id="vdesc<?php echo $index ?>" class="center"><?php echo $obj[15] ?></td>
	<td class="center totp divisa" id="tota<?php echo $index ?>"><?php echo number_format($total,2)?></td>
	<td id="desctd<?php echo $index ?>" align="left">
		<a href="#modal-edit" id="edit<?php echo $index ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit faccion" style="padding="0.2%"></a>
		<a href="#" id="del<?php echo $index ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf faccion" style="padding="0.2%"></a>
	</td>
</tr>
<?php }
}
?>
<script type="text/javascript">
 	$(function(){
	 	permisos(310,311);
 	});
</script>