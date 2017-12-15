<?php 
    
    foreach ($transaccion as $obj) {
?>



 <tr>
    <td style="padding: 10px; color:black;"><?php echo $obj[1]?></td>
	<td style="padding: 10px; color:black;"><?php echo $obj[2]?></td>
	<td style="padding: 10px; color:black;"><?php echo $obj[3]?></td>
	<td>
		<a class="btn-color pbtn borrow mdi mdi-database-plus mdi-24px per4108 modal-trigger" href="#modal-borrow" id="p<?php echo $obj[0]?>" title="Pedir prestamo" style="color:black;"></a>
        <a class="btn-color pbtn contacto mdi mdi-account-card-details mdi-24px per4108 modal-trigger" href="#modal-contacto" id="c<?php echo $obj[0]?>" title="Datos de contacto" style="color:black;"></a>
        <a class="btn-color pbtn load mdi mdi-pencil mdi-24px per4108 modal-trigger" modulo="cliente" id="m<?php echo $obj[0]?>" href="#modal-client" title="Editar cliente" style="color:black;"></a>
        <a class="btn-color pbtn delete mdi mdi-close mdi-24px per4109" modulo="cliente" id="d<?php echo $obj[0]?>" title="Eliminar cliente" style="color:black;"></a>
    </td>
</tr>

<?php }
	
 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>