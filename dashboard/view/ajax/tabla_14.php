<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td style="text-align: right;" class="per4119"><?php echo $obj[5] ?></td>
    <td style="text-align: right;"><?php echo $obj[6] ?></td>
    <td style="text-align: right;" class="per4120"><?php echo $obj[7] ?></td>
    <td style="width: 18%">
        <a class="btn-color pbtn hide info mdi mdi-alert-circle mdi-24px blueh 4110" id="info<?php echo $obj[0]; ?>" href="#modal-info2" title="Mostrar Informacion del Producto"></a>
        <a class="btn-color pbtn descuentos modal-trigger mdi mdi-percent mdi-24px hide" id="desc<?php echo $obj[0]; ?>" href="#modal-descuentos" title="Mostrar Descuentos del Producto" style="color: #686868 !important;"></a>
        <a class="btn-color pbtn hide salidainv mdi mdi-arrow-down-bold-box mdi-24px per410400 modal-trigger" id="s<?php echo $obj[0]; ?>" href="#modal-movinventario" title="Movimiento de Inventario"></a>
        <?php if($_SESSION['BUSS'] == 3){ ?>
        <a class="btn-color pbtn tooltipped notasprod" data-tooltip="Notas del Producto" data-position="bottom" name="<?php echo $obj[3] ?>" tbl="11" row="<?php echo $obj[0]; ?>"><i class="mdi mdi-note mdi-24px"></i></a>
        <?php } ?>
        <a class="btn-color pbtn load mdi mdi-pencil mdi-24px per4108 modal-trigger" modulo="producto" id="m<?php echo $obj[0]; ?>" href="#modal-productos" title="Editar Producto"></a>
        <a class="btn-color pbtn cdel delete mdi mdi-close mdi-24px per4109" modulo="producto" id="d<?php echo $obj[0]; ?>" title="Eliminar Producto"></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(4100,4120);
 	})
 </script>