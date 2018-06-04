<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td> 
        <a class="delete mdi-pencil mdi mdi-24px pbtn per1003" modulo="taller-vehiculo" id="m<?php echo $obj[0]; ?>" style="color:black"></a>
        <a class="load mdi-close mdi mdi-24px pbtn per1003" modulo="taller-vehiculo" id="d<?php echo $obj[0]; ?>" style="color:black"></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>