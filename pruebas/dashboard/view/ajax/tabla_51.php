<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td>
        <a class="load material-icons pbtn btn-color" id="m<?php echo $obj[0] ?>" modulo="impuesto">edit</a>
        <a class="delete material-icons pbtn btn-color cdel" modulo="impuesto" id="d<?php echo $obj[0] ?>">delete</a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>