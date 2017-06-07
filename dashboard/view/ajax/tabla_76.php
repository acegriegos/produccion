<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td>
    <a class="btn-color pbtn loadpck" id="e<?php echo $obj[0]?>" href="#modal-paquetes" title="Editar Paquete"><i class="material-icons">edit</i></a>
    <a class="btn-color pbtn cdel delpck" id="d<?php echo $obj[0]?>" title="Eliminar Paquete"><i class="material-icons">close</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>