<?php 
    foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[6] ?></td>
    <td>
        <a class=" mdi mdi-24px mdi-playlist-plus btn-color pbtn modal-trigger assigndesc" href="#modal-assgndsct" id="a<?php echo $obj[0] ?>" title="Asignar Descuento" style="margin-left: 15px"></a>
        <a class="mdi mdi-24px  mdi-playlist-check btn-color pbtn editdesc modal-trigger" href="#modal-editdesc" id="b<?php echo $obj[0] ?>" title="Editar Descuento" style="margin-left: 15px"></a>
        <a class="mdi mdi-24px mdi-playlist-remove btn-color pbtn " id="c<?php echo $obj[0] ?>" title="Deshabilitar descuento" style="margin-left: 15px"><?php
        if ($obj[7] == 1) { ?>
            
        <?php }else{ ?>
            lock_open
        <?php } ?>
        </a>
    </td>
</tr>

<?php }


 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>