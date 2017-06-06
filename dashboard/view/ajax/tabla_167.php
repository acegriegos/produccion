<?php
$idfactura = 0;
   	foreach ($transaccion as $obj) {
   		if ($obj[0] != $idfactura) {
   			echo '<tr>
   				<td class="detail" id="dt'.$obj[0].'"><span class="dts">[+]</span></td>
   				<td style="text-align: center">'.$obj[1].'</td>
				<td style="text-align: center">'.$obj[5].'</td>
				<td style="text-align: center">'.$obj[7].'</td>
				<td style="text-align: center">'.$obj[4].'</td>
				<td style="text-align: center">'.$obj[13].'</td>
				<td style="text-align: center">'.$obj[15].'</td>
				<td style="text-align: center">'.$obj[11].'</td>
			</tr>
			<tr class="detprod hide grey lighten-3" id="xa'.$obj[0].'">
				<td style="text-align: center"><b>Código</b></td>
				<td style="text-align: center"><b>Código Interno</b></td>
				<td style="text-align: center"><b>Nombre</b></td>
				<td style="text-align: center"><b>Precio</b></td>
				<td style="text-align: center"><b>Cantidad</b></td>
				<td style="text-align: center"><b>Total</b></td>
				<td style="text-align: center"><b>Descuento</b></td>
				<td style="text-align: center"><b>Impuesto</b></td>
			</tr>';
			$idfactura = $obj[0];
   		}
		echo '<tr class="detprod hide xb'.$obj[0].' grey lighten-4">
			<td style="text-align: center">'.$obj[24].'</td>
			<td style="text-align: center">'.$obj[25].'</td>
			<td style="text-align: center">'.$obj[26].'</td>
			<td style="text-align: center">'.$obj[27].'</td>
			<td style="text-align: center">'.$obj[28].'</td>
			<td style="text-align: center">'.$obj[29].'</td>
			<td style="text-align: center">'.$obj[30].'</td>
			<td style="text-align: center">'.$obj[31].'</td>
		</tr>';
?>
<?php } ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>