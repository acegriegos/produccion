<?php
	$tipopagos = $log->kamehameha('id,nombre,extra,regex',26,'id > 0');
	$strpagos = '<select class="ctip browser-default">';

	foreach ($tipopagos as $obj) {
		$strpagos .= '<option vl="'.$obj[0].'" ex="'.$obj[2].'" rg="'.$obj[3].'">'.$obj[1].'</option>';
	}

	$strpagos .= '</select>';

	foreach ($transaccion as $obj) {
?>
	
<tr>
	<td style="padding: 10px;"><?php echo $obj[1]?></td>
	<td style="padding: 10px;"><?php echo $obj[2]?></td>
	<td style="padding: 10px;"><?php echo $obj[3]?></td>
	<td style="padding: 10px;"><?php echo $obj[4]?></td>
	<td style="padding: 10px;" class="rtp" rtp="<?php echo $obj[13]?>"><?php echo $obj[14] == 1 ? $strpagos : $obj[5]?></td>
	<td style="padding: 10px;"><?php echo $obj[6]?></td>
	<td style="padding: 10px;"><?php echo $obj[7]?></td>
</tr>

<?php } ?>

<input type="hidden" id="hidet" tefe="<?php echo $transaccion[0][10]; ?>" ttar="<?php echo $transaccion[0][11]; ?>" tcre="<?php echo $transaccion[0][8]; ?>" tcon="<?php echo $transaccion[0][9]; ?>">

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	    
	})
</script>