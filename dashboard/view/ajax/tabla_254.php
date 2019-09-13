
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Artículo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Existencia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Gravado</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Costo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Venta</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Venta+IVA</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        $cant = $costo = $venta = $ventaiva = 0;

        foreach ($transaccion as $obj) {
            $cant += $obj[6] > 0 ? $obj[6] : 0;
            $costo += $obj[6] > 0 ? $obj[6]*$obj[12] : 0;
    ?>

    <tr>
        <td style=" padding: 1px;text-align: left;"><?php echo $obj[2] ?></td>
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[6],2) ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[4] ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[7],0) ?></td> 
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[12],2) ?></td>
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[11],2) ?></td>
        <td style=" padding: 1px;text-align: right;"><?php echo number_format($obj[5],2) ?></td>
       
    </tr>

    <?php }
     ?>
     <tr>
         <td colspan="1">
             <b>Totales:</b>
         </td>
         <td style="text-align: right;">
             <?php echo number_format($cant,2); ?>
         </td>
         <td></td>
         <td colspan="2" style="text-align: right;">
             <?php echo number_format($costo,2); ?>
         </td>
     </tr>
</tbody>
</table>