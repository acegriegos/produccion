<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr><?php echo $obj[1] ?>
    <td style="width: 12%"><?php echo $obj[1] ?></td>
    <td style="width: 12%"><?php echo $obj[2] ?></td>
    <td style="width: 25%"><?php echo $obj[3] ?></td>
    <td style="width: 10%"><?php echo $obj[26] ?></td>
    <td style="width: 10%"><?php echo $obj[5] ?></td>
    <td style="width: 10%"><?php echo $obj[10] ?></td>
    <td style="width: 5%"><?php echo $obj[8] ?></td>
    <td style="width: 16%">
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