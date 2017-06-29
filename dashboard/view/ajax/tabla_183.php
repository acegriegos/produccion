<?php
	foreach ($transaccion as $obj) {
?>
	
<tr>
	<td style="padding: 10px;"><?php echo $obj[1]?></td>
	<td style="padding: 10px;"><?php echo $obj[2]?></td>
	<td style="padding: 10px;"><?php echo $obj[3]?></td>
	<td style="padding: 10px;"><?php echo $obj[4]?></td>
	<td style="padding: 10px;"><?php echo $obj[5]?></td>
	<td style="padding: 10px;"><?php echo $obj[6]?></td>
	<td style="padding: 10px;"><?php echo $obj[7]?></td>
	<td>
	    <a class="btn-color pbtn cdel material-icons" id="d<?php echo $obj[0]?>" title="" style="font-size: 2em; color: #607d8b">close</a>
	</td>
</tr>

<?php } ?>

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	})
</script>