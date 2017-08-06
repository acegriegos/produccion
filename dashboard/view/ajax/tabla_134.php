<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td>
        <a class="btn-color pbtn load" id="m<?php echo $obj[0] ?>" modulo="tareaproduccione"><i class="material-icons">edit</i></a>
        <a class="btn-color pbtn cdel delete" id="d<?php echo $obj[0] ?>" modulo="tareaproduccione"><i class="material-icons">close</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>