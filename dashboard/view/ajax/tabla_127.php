<?php $PREC = $log->kamehameha('nombre',69,'id > 0'); ?>
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Codigo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Producto</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Cantidad</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Costo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Publico</th>
            <?php foreach ($PREC as $obj) {
                echo '<th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">'.$obj[0].'</th>';
            } ?>
            
            
            
        </tr>
    </thead>
    <tbody>
    <?php 
        $cnt = $totc = $totv = $cntl = 0 ;
        foreach ($transaccion as $obj) {
            $cntl = $obj[2] > 0 ? $obj[2] : 0;
            $totc += $obj[2] * $cntl;
            $totv += $obj[4];
            $atwo = explode(',',$obj[5]);
            $cnt += $cntl;
    ?>

     <tr>
        <td style=" padding: 1px;"><?php echo $obj[0] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[1] ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[2],2) ?></td>
        <td style=" padding: 1px;"><?php echo number_format($obj[3],2); ?></td> 
        <td style=" padding: 1px;"><?php echo number_format($obj[4],2); ?></td> 
        <?php foreach ($PREC as $index => $obj) {
            echo '<td style=" padding: 1px;">'.number_format(isset($atwo[$index]) ? $atwo[$index] : 0,2).'</td>';
        } ?>
       
    </tr>

    <?php }

     ?>
    
</tbody>
<tfoot>
    <tr>
        <td><b>TOTAL</b></td>
        <td></td>
        <td><?php echo $cnt; ?></td>
        <td><?php echo number_format($totc,2); ?></td>
        <td colspan="<?php echo 1+sizeof($PREC); ?>"></td> 
    </tr>
</tfoot>
</table>
 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>