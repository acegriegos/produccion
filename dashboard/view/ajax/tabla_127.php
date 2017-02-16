<table class="table striped bordered highlight centered" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
        <tr>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Costo</th>
            <th>Costo Total</th>
            <th>Minimo</th>
            <th>Maximo</th>
            <th>Cantidad</th>
            <th>Compras</th>
            <th>Ventas</th>
            <th>Acciones</th>
        </tr>
    </thead>
    <tbody>
    <?php 
    
        foreach ($transaccion as $obj) {
    ?>

     <tr>
        <td><?php echo $obj[12] ?></td>
        <td><?php echo $obj[4] ?></td>
        <td><?php echo $obj[5] ?></td>
        <td><?php echo $obj[6] ?></td>
        <td><?php echo $obj[7] ?></td>
        <td><?php echo $obj[8] ?></td>
        <td><?php echo $obj[9] ?></td>
        <td><?php echo $obj[10] ?></td>
        <td><?php echo $obj[11] ?></td>
        <td>
            <!-- <a class="btn-color pbtn load" id="m<?php echo $obj[0] ?>"><i class="material-icons">edit</i></a>
            <a class="btn-color pbtn cdel delete" id="d<?php echo $obj[0] ?>"><i class="material-icons">close</i></a> -->
        </td>
    </tr>

    <?php }

     ?>
</tbody>
<tfoot>
    <tr>
        <td>Costo Total</td>
        <td colspan="4"><?php echo $transaccion[0][16] ?></td>
        <td colspan="2">Costo Contable [<?php echo $transaccion[0][14] ?>]</td>
        <th colspan="3"><?php echo $transaccion[0][15] ?></th>
    </tr>
</tfoot>
</table>
 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>