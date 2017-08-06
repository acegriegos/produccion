<?php 
if ($transaccion[0][13]==1) {

foreach ($transaccion as $obj) {
    ?>

    <tr class="button-collapse detalle" data-activates="acciones" id="f<?php echo $obj[12];?>"  tipo ='1' tp="<?php if($obj[7] == 0) echo 1; else echo 0; ?>">
        <td><?php echo $obj[3];?></td>
        <td><?php echo $obj[1];?></td>
        <td><?php echo $obj[2];?></td>
        <td><?php echo $obj[5];?></td>
        <td><?php echo $obj[6];?></td>
        <td><?php echo $obj[8];?></td>
        <td style="<?php echo $obj[7] < 0 ? 'color:red' : 'color:green'; ?>"><?php echo abs($obj[7]); ?></td>
        <td><?php echo $obj[9];?></td>

    </tr>

    <?php }

    ?>

    <script type="text/javascript">
        $(function(){
            permisos(310,311);
        })
    </script>

<?php }else{ 

    foreach ($transaccion as $obj) {?>

    <tr class="button-collapse detalle" data-activates="acciones" id="f<?php echo $obj[12];?>"  tipo ='2' tp="<?php if($obj[7] == 0) echo 1; else echo 0; ?>">
        <td><?php echo $obj[3];?></td>
        <td><?php echo $obj[4];?></td>
        <td width="20%"><?php echo $obj[1];?></td>
        <td><?php echo $obj[5];?></td>
        <td><?php echo $obj[6];?></td>
        <td><?php echo $obj[8];?></td>
        <td style="<?php echo $obj[7] < 0 ? 'color:red' : 'color:green'; ?>"><?php echo abs($obj[7]); ?></td>
        <td><?php echo $obj[9];?></td>

    </tr>

    <?php } ?>

<?php } ?>