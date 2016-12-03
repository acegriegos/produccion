<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td>
        <i class="fa fa-pencil-square-o btn loadpck" id="e<?php echo $obj[0]?>" data-toggle="modal" href="#modal-paquetes"></i>
        <i class="fa fa-times btn delpck" id="d<?php echo $obj[0]?>" style="color: #D9534F"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>