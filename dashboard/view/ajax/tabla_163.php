<?php 
	$index = 0;

	if ($transaccion[0][17] == 1) {
		foreach ($transaccion as $obj) {
			$index++;
?>
<!-- mobil -->
<!-- <div id="fd<?php echo $index; ?>" xtr="<?php echo $obj[0]; ?>" idprod="<?php echo $obj[3]; ?>" class="ciclos row col s12"> <div style="padding: 0 !important;" class="center-align hide" id="codprod<?php echo $index; ?>"><?php echo $obj[4]; ?></div> <div class="row col s9" style="padding:0px;"> <div class="col s12" style="padding: 0 !important;font-weight: bold;" id="desc<?php echo $index; ?>"><?php echo $obj[5]; ?></div> <small><span class="col s3" style="padding: 0px">Precio Uni: </span><div style="padding: 0 !important;" class="divisa col s3" id="prec<?php echo $index; ?>"><?php echo $obj[6]; ?></div> <span class="col s3" style="padding: 0px">Precio Venta: </span>  <div style="padding: 0 !important;" class="col s3 center-align totp" id="tota<?php echo $index; ?>"><?php echo $obj[8]; ?></div> </small> <div id="divcnt" style="padding: 0 !important;"><small>Cantidad: <span id="cant<?php echo $index; ?>"><?php echo $obj[7]; ?></span></small></div> </div><div style="padding: 0 !important;" class="col s1 hide center-align" id="unitprod<?php echo $index; ?>"><?php echo $obj[19]; ?></div>   <div class="der"> <a href="#modal-edit" id="edit<?php echo $index; ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del<?php echo $index; ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc<?php echo $index; ?>"></span></div> </div> -->

<div id="fd<?php echo $index; ?>" data-triforce='{"vaccion":0,"vid" : 0,"vidfactura" : "?","videntrada" : <?php echo $obj[3]; ?>,"vcantidad" : "<?php echo $obj[7]; ?>","vprecio" : "<?php echo str_replace(',', '', $obj[6]); ?>","vdesc" : "<?php echo $obj[15]; ?>","vtotal" : "<?php echo str_replace(',', '', $obj[8]); ?>","vidinventario" : <?php echo $obj[13]; ?>,"vidodt" : 0,"vimv" : "<?php echo $obj[9]; ?>","vcomodin" : "<?php echo $obj[10]; ?>","vidunidad" : <?php echo $obj[18]; ?>,"vidimpuestos":"<?php echo $obj[11]; ?>","viddescuentos":"<?php echo $obj[12]; ?>","strimp" : "<?php echo $obj[14]; ?>","exoneracion":<?php echo $obj[20]; ?>,"vcomision":"0","max": "<?php echo $obj[21]; ?>","iddesc":<?php echo $obj[22]; ?>,"vdescuento" : "<?php echo $obj[23]; ?>","iva":0,"isinventariado" : <?php echo $obj[24]; ?>}' xtr="<?php echo $obj[0]; ?>" idprod="<?php echo $obj[3]; ?>}" class="ciclos row col s12"> <div style="padding: 0 !important;" class="col s2 center-align" id="codprod<?php echo $index; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc<?php echo $index; ?>"><?php echo $obj[5]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="prec<?php echo $index; ?>"><?php echo $obj[6]; ?></div> <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod<?php echo $index; ?>"><?php echo $obj[19]; ?></div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align"><span id="cant<?php echo $index; ?>"><?php echo $obj[7]; ?></span></div> <div style="padding: 0 !important;" class="col s1 center-align totp" id="tota<?php echo $index; ?>"><?php echo $obj[8]; ?></div> <div class="right"> <a href="#modal-edit" id="edit<?php echo $index; ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding="0"></a><a href="#" id="del<?php echo $index; ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding="0"></a> <span id="mdesc<?php echo $index; ?>"></span></div> </div>
<?php }
echo '<input type="hidden" id="indice" value="'.$index.'" clie="'.$transaccion[0][1].'" />';

	}else{

		//TEMPORALES
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
		if($("#indice").attr("clie") != ''){
			$("#ncli").val($("#indice").attr("clie"));
			$("#ncli").blur();	
		}else
			$("#codp").focus();
					
		$("#ffacturas .zelda").data('triforce')['idline'] = $("#indice").val();
		totalizar();
	})
</script>