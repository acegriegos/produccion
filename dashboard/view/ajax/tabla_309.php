<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    

    
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>