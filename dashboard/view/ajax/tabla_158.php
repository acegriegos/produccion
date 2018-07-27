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

<a class="btn-color pbtn mdi mdi-24px mdi-information-outline status blueh tooltipped" id="e<?php echo $obj[0] ?>" style="color:<?php switch ($obj[11]) { case 1: echo 'green';break;case 2: echo 'yellow'; break; case 3: echo 'red'; break; default: break;
    } ?>;" data-tooltip="Estado de la Factura" data-position="bottom"></a>
</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>