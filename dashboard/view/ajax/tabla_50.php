<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[0] ?></td>
    <td><?php echo $obj[5] ?></td>
    <td>
        <i class="mdi mdi-24px mdi-pencil btn-color pbtn load " id="e<?php echo $obj[0] ?>" codigo="1" modulo="sucursale"></i>
        <i class="mdi mdi-24px mdi-close btn-color pbtn delete" id="d<?php echo $obj[0] ?>" codigo="1" modulo="sucursale"></i>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>