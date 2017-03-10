<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td>
        <a class="btn-color pbtn actlinea" id="a<?php echo $obj[0] ?>" idreceta="<?php echo $obj[2]?>"><i class="material-icons">edit</i></a>
        <a class="btn-color pbtn cdel" id="b<?php echo $obj[0] ?>" idreceta="<?php echo $obj[2]?>"><i class="material-icons">close</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>