
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Movimiento</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Fecha</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Producto</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad</b></td>

      </tr>
    </thead>
    <tbody>
    <?php 
        foreach ($transaccion as $obj) {
    ?>

    <tr>
        <td style=" padding: 1px;"><?php echo $obj[0] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[1] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[2] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[3] ?></td> 
       
    </tr>

    <?php }
     ?>
<!--      <tr>
         <td colspan="7">
             <b>Totales:</b>
         </td>
         <td>
             <?php echo number_format($cant,2); ?>
         </td>
         <td colspan="2">
             <?php echo number_format($costo,2); ?>
         </td>
         <td colspan="2">
             <?php echo number_format($ventas,2); ?>
         </td>
     </tr> -->
</tbody>
</table>