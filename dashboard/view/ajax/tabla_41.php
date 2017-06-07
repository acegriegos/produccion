<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td>
        <i class="pbtn btn-color material-icons load" id="m<?php echo $obj[0] ?>" modulo="bodega">edit</i>
        <i class="pbtn btn-color cdel material-icons delete" id="d<?php echo $obj[0] ?>" modulo="bodega" tip="vidbogega">close</i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>