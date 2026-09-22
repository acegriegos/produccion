<?php
	$tipopagos = $log->kamehameha('id,nombre,extra,regex',26,'id > 0 and id <> 99 and bancos in(0,1,2,4,5)');
	$strpagos = '<select class="ctip browser-default" style="background: transparent;">';

	foreach ($tipopagos as $obj) {
		$strpagos .= '<option value="'.$obj[0].'" ex="'.$obj[2].'" rg="'.$obj[3].'">'.$obj[1].'</option>';
	}

	$strpagos .= '</select>';

	foreach ($transaccion as $index => $obj) {
		$chk = '';
		if( ($obj[14] != 2 && $obj[13] == 1 && $obj[15] == 1) || $obj[15] == 3)
			$chk = '<input type="checkbox" id="pen'.$index.'" class="cestado"> <label for="pen'.$index.'"></label>';
?>
	
<tr>
	<td style="padding: 10px;"> <?php echo $chk ?> </td>
	<td style="padding: 10px;color: <?php echo $obj[16]; ?>;"><?php echo $obj[1]?></td>
	<td style="padding: 10px;"><?php echo $obj[3]?></td>
	<td style="padding: 10px;"><?php echo $obj[4]?></td>
	<td style="padding: 10px;" class="rtp" rtp="<?php echo $obj[13]?>" rid="<?php echo $obj[0]?>" tp="<?php echo $obj[15]?>" tot="<?php echo str_replace(',', '', $obj[6]); ?>"><?php echo $obj[14] == 1 ? $strpagos : $obj[5]?></td>
	<td style="padding: 10px;"><?php echo $obj[6]?></td>
	<td style="padding: 10px;"><?php echo $obj[7]?></td>
</tr>

<?php } ?>

<input type="hidden" id="hidet" tefe="<?php echo $transaccion[0][10]; ?>" ttar="<?php echo $transaccion[0][11]; ?>" tcre="<?php echo $transaccion[0][8]; ?>" tcon="<?php echo $transaccion[0][9]; ?>" ttot="<?php echo number_format($transaccion[0][17],2,'.',',') ?>">

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	    $(".ctip").each(function(){
	    	$(this).val($(this).parent().attr('rtp'))
	    })
	})
</script>	