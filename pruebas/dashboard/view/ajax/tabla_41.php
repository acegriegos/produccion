<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td>
        <i class="pbtn btn-color load mdi mdi-pencil  mdi-24px" id="m<?php echo $obj[0] ?>" modulo="bodega"></i>
        <i class="pbtn btn-color cdel mdi mdi-close delete" id="d<?php echo $obj[0] ?>" modulo="bodega" tip="vidbogega"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>