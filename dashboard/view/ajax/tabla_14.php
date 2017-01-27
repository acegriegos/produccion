<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[5] ?></td>
    <td><?php echo $obj[6] ?></td>
    <td>
        <a class="btn-floating waves-effect waves-light green salidainv" id="s<?php echo $obj[0] ?>" href="#modal-movinventario" title="Movimiento de Inventario"><i class=" fa fa-outdent"></i></a>
        <a class="btn-floating waves-effect waves-light blue editprod" id="m<?php echo $obj[0] ?>" href="#modal-productos" title="Editar Producto"><i class="fa fa-pencil-square-o"></i></a>
        <a class="btn-floating waves-effect waves-light red delprod" id="d<?php echo $obj[0] ?>" title="Eliminar Producto"><i class="fa fa-times"></i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>