
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Codigo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Producto</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Familia</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Tipo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Marca</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important; width: 10%">Minimo</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important; width: 10%">Maximo</th> 
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Cantidad</th>
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Costo individual</th> 
            <th class="white-text tab1" style="border: 0;  border-radius: 0px !important;">Costo Total</th>
            
            
        </tr>
    </thead>
    <tbody>
    <?php 
    
        foreach ($transaccion as $obj) {
    ?>

     <tr>
        <td style=" padding: 1px;"><?php echo $obj[12] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[4] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[19] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[18] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[17] ?></td> 
        <td style=" padding: 1px; width: 10%"><?php echo $obj[7] ?></td>
        <td style=" padding: 1px; width: 10%"><?php echo $obj[8] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[9] ?></td>
        <td style=" padding: 1px;"><?php echo $obj[5] ?></td> 
        <td style=" padding: 1px;"><?php echo $obj[6] ?></td>
       
        
       <!--   <td style=" padding: 10px;">
           <a class="btn-color pbtn load" id="m<?php echo $obj[0] ?>"><i class="mdi mdi-pencil"></i></a>
            <a class="btn-color pbtn cdel delete" id="d<?php echo $obj[0] ?>"><i class="mdi mdi-delete"></i></a> 
        </td>-->
    </tr>

    <?php }

     ?>
</tbody>
<tfoot>
    <!-- <tr>
        <?php $sz = sizeof($transaccion);?>
        <td>Costo Total</td>
        <td colspan="4"><?php echo $sz ? $transaccion[0][16] : 0 ?></td>
        <td colspan="2">Costo Contable [<?php echo $sz ? $transaccion[0][14] : '-' ?>]</td>
        <th colspan="3"><?php echo $sz ? $transaccion[0][15] : 0 ?></th>
        
    </tr> -->
</tfoot>
</table>
 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>