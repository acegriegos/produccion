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
        <a class="btn-floating waves-effect waves-light blue loadserv" id="m<?php echo $obj[0] ?>" href="#modal-servicios" title="Editar Servicio"><i class="fa fa-pencil-square-o"></i></a>
    <a class="btn-floating waves-effect waves-light red delete" modulo="servicio" id="d<?php echo $obj[0] ?>" title="Eliminar Producto"><i class="fa fa-times"></i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>