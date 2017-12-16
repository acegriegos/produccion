<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td class="pbtn blueh viewreceta" id="s<?php echo $obj[0] ?>"><?php echo $obj[2] ?></td>
    <td>
        <a class="btn-color pbtn blueh selreceta" id="a<?php echo $obj[0] ?>"><i class="material-icons">add</i></a>
    </td>
</tr>

<?php }

?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>