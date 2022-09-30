<?php if($transaccion[0][0] != 1) {?>

<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Producto</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Movimiento</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Usuario</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad Inicial</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad Final</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        if(sizeof($transaccion)){
        foreach ($transaccion as $obj) {
    ?>

    <tr style="cursor: pointer" class="detextra" fila="<?php echo $obj[10] ?>" tabla="<?php echo $obj[9] ?>"  data-activates="extra">
        <td style=" padding: 1px;text-align: left;;"><?php echo $obj[8] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[1] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[2] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[7] ?></td> 
        <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo number_format($obj[6],2) ?></td> 
        <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo number_format($obj[3],2) ?></td>
        <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo number_format($obj[5],2) ?></td> 
        <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo $obj[4] ?></td> 
    </tr>

    <?php }
        }else{
    ?>
    <tr>
        <td style=" padding: 1px;" colspan="6">No Hay Datos</td>
       
    </tr>
    <?php 
    
        }
    ?>
</tbody>
</table>

<?php }else {?>

<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Producto</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Movimiento</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad</b></td>
      </tr>
    </thead>
    <tbody>
        <?php 
        if(sizeof($transaccion)){
            $count = 0;
            $suma = 0;
        foreach ($transaccion as $obj) {
            $count++;
            $suma += $obj[3];
    ?>

    <tr>
        <td style=" padding: 1px;text-align: left"><?php echo $obj[1] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[2] ?></td>
        <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo number_format($obj[3],2) ?></td> 
    </tr>

    <?php }
        }else{
    ?>
    <tr>
        <td style=" padding: 1px;" colspan="6">No Hay Datos</td>
       
    </tr>
    <?php 
    
        }
    ?>
    </tbody>
    <tfoot>
        <tr>
            <td style=" padding: 1px;"><b>TOTAL</b></td>
            <td style=" padding: 1px;"><?php echo $count; ?> Lineas</td>
            <td style=" padding: 1px;padding-right: 1%;text-align: right"><?php echo number_format($suma,2) ?></td>
        </tr>
    </tfoot>
</table>

<?php } ?>