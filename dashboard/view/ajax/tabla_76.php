<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td>
        <a class="btn-floating waves-effect waves-light blue loadpck" id="e<?php echo $obj[0]?>" href="#modal-paquetes" title="Editar Paquete"><i class="fa fa-pencil-square-o"></i></a>
        <a class="btn-floating waves-effect waves-light red delpck" id="d<?php echo $obj[0]?>" title="Eliminar Paquete"><i class="fa fa-times"></i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>