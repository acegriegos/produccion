<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td>
    <i class="fa fa-book fa-lg btn state" id="s<?php echo $obj[0] ?>" title="Ver Estado de Cuenta" data-toggle="modal" href="#modal-estadoCuenta"></i>
    <i class="fa fa-check-square fa-lg btn pagovarios" id="sp<?php echo $obj[0] ?>" data-toggle="modal" href='#modal-pagoVariosP' title="Realizar Varios Pagos"></i>
    <i class="fa fa-pencil-square-o fa-lg btn load" modulo="proveedore" title="Modificar Proveedor" id="m<?php echo $obj[0] ?>" data-toggle="modal" href='#modal-Proveedor'></i>
    <i class="fa fa-times btn fa-lg delete per1" title="Eliminar Proveedor" codigo="2" modulo="proveedore" id="d<?php echo $obj[0] ?>"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>