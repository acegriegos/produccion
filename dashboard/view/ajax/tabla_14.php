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
        <a class="btn-floating waves-effect waves-light amber darken-3 descuentos " id="desc<?php echo $obj[0] ?>" href="#modal-descuentos" title="Agregar Descuentos"><i class="material-icons">%</i></a>
        <a class="btn-floating waves-effect waves-light green salidainv" id="s<?php echo $obj[0] ?>" href="#modal-salida" title="Salida de Inventario"><i class=" fa fa-outdent"></i></a>
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