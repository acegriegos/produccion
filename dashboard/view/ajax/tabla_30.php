<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[5] ?></td>
    <td><?php echo $obj[6] ?></td>
    <td>
        <?php if (($obj[13]) != 1){ ?>
        <a href="modal-contactos" style="font-size: 2em; color: #607d8b" title="Contactos"><i class="contact material-icons pbtn" id="c<?php echo $obj[0] ?>">contact_phone</i></a>
        <?php } ?>

        <a href="#modal-clientes" style="font-size: 2em; color: #607d8b"><i class="load material-icons pbtn" id="m<?php echo $obj[0] ?>" modulo="cliente">edit</i></a>
        
        <a href="#" style="font-size: 2em; color: #607d8b"><i class="delete material-icons pbtn" modulo="cliente" id="d<?php echo $obj[0] ?>">delete</i></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>