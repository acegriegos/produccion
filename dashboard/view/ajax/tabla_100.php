<?php 
    
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td style="width: 20%">
        <i class="fa fa-pencil-square-o but" id="a<?php echo $obj[0] ?>" style="margin-left: 15px"></i>
        <i class="fa fa-times but red-text" id="b<?php echo $obj[0] ?>" style="margin-left: 15px"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>