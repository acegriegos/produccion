<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr><?php echo $obj[1] ?>
    <td style="width: 10%"><?php echo $obj[1] ?></td>
    <td style="width: 10%"><?php echo $obj[2] ?></td>
    <td style="width: 10%"><?php echo $obj[25] ?></td>
    <td style="width: 10%"><?php echo $obj[4] ?></td>
    <td style="width: 10%"><?php echo $obj[9] ?></td>
    <td style="width: 10%"><?php echo $obj[7] ?></td>
    <td style="width: 10%">
        <a class="btn-color pbtn descuentos" id="desc<?php echo $obj[0] ?>" href="#modal-descuentos" title="Agregar Descuentos"><img src="../assets/img/icon/percent.svg"></a>
        <a class="btn-color pbtn salidainv" id="s<?php echo $obj[0] ?>" href="#modal-movinventario" title="Movimiento de Inventario"><i class="material-icons">compare_arrows</i></a>
        <a class="btn-color pbtn editprod" id="m<?php echo $obj[0] ?>" href="#modal-productos" title="Editar Producto"><i class="material-icons">edit</i></a>
        <a class="btn-color pbtn cdel delprod" id="d<?php echo $obj[0] ?>" title="Eliminar Producto"><i class="material-icons">close</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>