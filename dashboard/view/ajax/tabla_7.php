<?php 
    
    foreach ($transaccion as $obj) {
?>



 <tr>
    <td style="padding: 10px; color:black;"><?php echo $obj[3]?></td>
	<td style="padding: 10px; color:black;"><?php echo $obj[4]?></td>
	<td style="padding: 10px; color:black;"><?php echo $obj[5]?></td>
	<td style="padding: 10px; color:black;"><?php echo $obj[6]?></td>
    <td>
        <a class="btn-color pbtn seleccionar mdi mdi-gesture-tap mdi-24px per4108" id="x<?php echo $obj[0]?>" idprestamo="<?php echo $obj[1]?>" idcliente="<?php echo $obj[2]?>" title="Seleccionar prestamo" style="color:black;"></a>
    </td>
</tr>

<?php }
	
 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>