
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Código</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Descripción</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Marca</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Existencia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Gravado</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Variable</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Inventariado</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Venta</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Venta+IVA</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        foreach ($transaccion as $obj) {
    ?>

    <tr>
        <td style=" padding: 1px;"><?php echo $obj[0] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[2] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[3] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[6] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[] ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[7],0) ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[8] ? '<i class="mdi mdi-check"></i>' : '<i class="mdi mdi-close"></i>' ?></td>
        <td style=" padding: 1px;"><?php echo $obj[9] ? '<i class="mdi mdi-check"></i>' : '<i class="mdi mdi-close"></i>' ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[11],2) ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[5],2) ?></td>
       
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