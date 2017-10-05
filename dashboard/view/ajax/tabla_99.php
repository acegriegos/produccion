<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td>
        <a class="btn-color pbtn instoproduct mdi mdi-basket-fill mdi-24px modal-trigger" href="#modal-addtoproducts" id="i<?php echo $obj[0] ?>" title="Ingresar proceso a Inventario Producto Final">system_update_alt</a>
        <a class="btn-color pbtn editproceso mdi mdi-pencil mdi-24px" id="m<?php echo $obj[0] ?>"></a>
        <a class="btn-color pbtn cdel delproceso mdi mdi-close mdi-24px" id="d<?php echo $obj[0] ?>"></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>