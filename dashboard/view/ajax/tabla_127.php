
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Codigo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Producto</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Cantidad</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Costo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Publico</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Intermedio</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Distribuidor</th> 
            
            
        </tr>
    </thead>
    <tbody>
    <?php 
        $cnt = $tot = 0 ;
        foreach ($transaccion as $obj) {
            // $cnt += $obj[9];
            // $tot += $obj[6] > 0 ? $obj[6] : 0;
    ?>

     <tr>
        <td style=" padding: 1px;"><?php echo $obj[0] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[1] ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[2],2); ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[3],2); ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[4],2); ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[5],2); ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[6],2); ?></td> 
       
    </tr>

    <?php }

     ?>
</tbody>
<tfoot>
    <tr class="hide">
        <?php $sz = sizeof($transaccion);?>
        <td><b>TOTAL:</b></td>
        <td></td>
        <td><?php echo $cnt; ?></td>
        <td></td>
        <th colspan="3"><?php echo number_format($tot,2); ?></th>
        
    </tr>
</tfoot>
</table>
 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>