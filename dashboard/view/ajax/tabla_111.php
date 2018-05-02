<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td>
        <a class="btn-color pbtn load" id="m<?php echo $obj[0] ?>" modulo="inventario"><i class="mdi mdi-pencil mdi-24px"></i></a>
        <a class="btn-color pbtn cdel delete" id="d<?php echo $obj[0] ?>" modulo="inventario" tip="vidinventario"><i class="mdi mdi-close mdi-24px"></i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>