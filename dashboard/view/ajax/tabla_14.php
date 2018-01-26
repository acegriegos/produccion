<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[29] ?></td>
    <td><?php echo $obj[6] ?></td>
    <td><?php echo $obj[12] ?></td>
    <td><?php echo $obj[9] ?></td>
    <td style="width: 18%">
        <a class="btn-color pbtn info mdi mdi-alert-circle mdi-24px blueh 4110" id="info<?php echo $obj[0]; ?>" href="#modal-info2" title="Mostrar Informacion del Producto"></a>
        <a class="btn-color pbtn descuentos per4103 modal-trigger" id="desc<?php echo $obj[0]; ?>" href="#modal-descuentos" title="Mostrar Descuentos del Producto" style="color: #686868 !important;"><img src="../assets/img/icon/percent.svg"></a>
        <a class="btn-color pbtn salidainv mdi mdi-arrow-down-bold-box mdi-24px per4104 modal-trigger" id="s<?php echo $obj[0]; ?>" href="#modal-movinventario" title="Movimiento de Inventario"></a>
        <a class="btn-color pbtn editprod mdi mdi-pencil mdi-24px per4108 modal-trigger" id="m<?php echo $obj[0]; ?>" href="#modal-productos" title="Editar Producto"></a>
        <a class="btn-color pbtn cdel delprod mdi mdi-close mdi-24px per4109" id="d<?php echo $obj[0]; ?>" title="Eliminar Producto"></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>