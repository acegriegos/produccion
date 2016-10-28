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
        <i class="fa fa-pencil-square-o btn editprod" id="m<?php echo $obj[0]?>" data-toggle="modal" href="#modal-productos" title="Editar Producto"></i>
        <i class="fa fa-outdent salidainv" id="s<?php echo $obj[0]?>" data-toggle="modal" href="#modal-salida" modulo="producto" title="Salida de Inventario"></i>
        <i class="fa fa-times btn delprod" id="d<?php echo $obj[0]?>" style="color: #D9534F" title="Eliminar Producto">
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>