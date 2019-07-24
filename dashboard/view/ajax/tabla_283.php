<?php   
    foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[0] ?></td>
    <td><?php echo number_format($obj[1],2) ?></td>
    <td><?php echo number_format($obj[2],2) ?></td>
    <td><?php echo number_format($obj[3],2) ?></td>
    <td><?php echo number_format($obj[4]-$obj[3]+$obj[2]-$obj[1],2)  ?></td>
    <td>
        <?php if($obj[5]){ ?>
        <i class="mdi mdi-24px mdi-plus pbtn" gid="{$obj[6]}" title="Movimientos de la Caja"></i>
        <i class="mdi mdi-24px mdi-plus pbtn" gid="{$obj[6]}" title="Depositar en la Caja"></i>
        <i class="mdi mdi-24px mdi-plus pbtn" gid="{$obj[6]}" title="Ver Abonos"></i>
        <i class="mdi mdi-24px mdi-plus pbtn" gid="{$obj[6]}" title="Ver Préstamos"></i>
        <?php }else{ ?>
        <i class="mdi mdi-24px mdi-clock-start pbtn" gid="{$obj[6]}" title="Iniciar Caja"></i>
        <?php } ?>

    </td>
</tr>

<?php } ?>