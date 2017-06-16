<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td style="width: 40%"><?php echo $obj[1] ?></td>
    <td style="width: 40%"><?php echo $obj[2] ?></td>
    <td style="width: 20%">
        <a class="btn-color pbtn delete" id="d<?php echo $obj[0] ?>" title="Eliminar Servicio Asociado"><i class="material-icons">close</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>