<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[1] ?></td>
<td style="width: 10%" rm="1"><?php echo $obj[2] ?></td>
<td style="width: 10%" rm="2"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[7] ?></td>
<td style="width: 10%"><?php echo $obj[8] ?></td>
<td style="width: 10%">
    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh" id="a<?php echo $obj[0] ?>" tv="<?php echo $obj[9] ?>" tp="<?php echo $obj[10] ?>" title="Visualizar Factura"></a>
    <a class="btn-color pbtn mdi mdi-24px mdi-settings process blueh modal-trigger waves-effect waves-light" id="b<?php echo $obj[0] ?>" href="#modal-process" title="Procesar Factura" rm="3"></a>
</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>