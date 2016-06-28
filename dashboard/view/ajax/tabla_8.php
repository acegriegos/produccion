<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[0] ?></td>
    <td><?php echo $obj[1] ?></td>
    <td>
    <i class="fa fa-dollar btn precios" title="Ver Precios" id="p<?php echo $obj[0] ?>" data-toggle="modal" href="#modal-vprecant"></i>
    <i class="fa fa-pencil-square-o fa-lg btn load" modulo="producto" title="Modificar Producto" id="m<?php echo $obj[0] ?>" data-toggle="modal" href='#modal-Productos'></i>
    <i class="fa fa-times btn fa-lg delete" title="Eliminar Producto" codigo="2" modulo="producto" id="d<?php echo $obj[0] ?>"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(210,211);
 	});
 </script>