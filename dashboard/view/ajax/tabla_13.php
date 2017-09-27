<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[5] ?></td>
    <td>
        <a class="btn-color pbtn loadserv" id="m<?php echo $obj[0] ?>" href="#modal-servicios" title="Editar Servicio"><i class="mdi mdi-pencil"></i></a>
        <a class="btn-color pbtn cdel delete" modulo="servicio" id="d<?php echo $obj[0] ?>" title="Eliminar Producto"><i class="mdi mdi-close"></i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>