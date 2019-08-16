
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde " style="text-align: center"><b>Código</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Descripción</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Marca</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Tipo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Familia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Ventas</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Compras</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Cantidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>P.Compra</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>P.Venta</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>T.Compra</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>T.Venta</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        $cant = $costo = $ventas = 0;
        foreach ($transaccion as $obj) {
        $cant += $obj[9];
        $costo += $obj[6];
        $ventas += $obj[21];
    ?>

     <tr>
        <td style=" padding: 1px;"><?php echo $obj[12] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[4] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[17] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[18] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[19] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[11] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[10] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[9] ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[5],2) ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[20],2) ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[6],2) ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[21],2) ?></td>
       
    </tr>

    <?php }
     ?>
     <tr>
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
     </tr>
</tbody>
</table>
 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>