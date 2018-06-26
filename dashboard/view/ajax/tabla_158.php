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
    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a<?php echo $obj[0] ?>" tv="<?php echo $obj[9] ?>" data-tooltip="Visualizar Factura" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-xml xml blueh tooltipped" id="x<?php echo $obj[0] ?>" data-tooltip="Descargar XML" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-settings process blueh hide modal-trigger waves-effect waves-light" id="b<?php echo $obj[0] ?>" href="#modal-process" data-position="bottom" data-tooltip="Procesar Factura" rm="3"></a>
</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>