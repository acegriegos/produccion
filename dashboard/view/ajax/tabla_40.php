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
        <!-- <i class="fa fa-pencil-square-o btn load" id="m" data-toggle="modal" href="#modal-invDevo" modulo="inventario"></i> -->
        <i class="fa fa-info-circle btn" id="c<?php echo $obj[0] ?>" data-toggle="modal" href="#modal-invContaComment" modulo="inventario" title="Detalle de Activo" style="color: #3C8FAD"></i>
        <i class="fa fa-print btn" codigo="" id="p<?php echo $obj[0] ?>" data-toggle="modal" href="#modal-invConta" modulo="inventario"></i>
        <i class="fa fa-times btn delete" codigo="1" modulo="inventario" id="d<?php echo $obj[0] ?>" style="color: #D9534F" title="Anular"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>