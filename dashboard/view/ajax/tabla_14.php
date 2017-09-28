<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr><?php echo $obj[1] ?>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[26] ?></td>
    <td><?php echo $obj[5] ?></td>
    <td><?php echo $obj[10] ?></td>
    <td><?php echo $obj[8] ?></td>
    <td style="width: 18%">
        <a class="btn-color pbtn info material-icons blueh 4110 modal-trigger" id="info<?php echo $obj[0] ?>" href="#modal-info" title="Mostrar Informacion del Producto">info</a>
        <a class="btn-color pbtn descuentos per4103 modal-trigger" id="desc<?php echo $obj[0] ?>" href="#modal-descuentos" title="Mostrar Descuentos del Producto" style="color:black;"><img src="../assets/img/icon/percent.svg"></a>
        <a class="btn-color pbtn salidainv material-icons per4104 modal-trigger" id="s<?php echo $obj[0] ?>" href="#modal-movinventario" title="Movimiento de Inventario" style="color:black;">compare_arrows</a>
        <a class="btn-color pbtn editprod material-icons per4108 modal-trigger" id="m<?php echo $obj[0] ?>" href="#modal-productos" title="Editar Producto" style="color:black;">edit</a>
        <a class="btn-color pbtn cdel delprod material-icons per4109" id="d<?php echo $obj[0] ?>" title="Eliminar Producto" style="color:black;">close</a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>