<?php
   	foreach ($transaccion as $obj) {
		echo '<tr>
			<td style="text-align: center">'.$obj[2].'</td>
			<td style="text-align: center">'.$obj[1].'</td>
			<td style="text-align: center">'.$obj[3].'</td>
			<td style="text-align: center">'.$obj[4].'</td>
			<td style="text-align: center">'.$obj[5].'</td>
			<td style="text-align: center">'.$obj[10].'</td>
			<td style="text-align: center">'.$obj[8].'</td>
			<td style="text-align: center">'.$obj[9].'</td>
			<td style="text-align: right">'.number_format($obj[11],2).'</td>
		</tr>';
?>
<?php } ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>