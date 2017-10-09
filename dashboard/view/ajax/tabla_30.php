<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
    <td style="padding: 10px;"><?php echo $obj[1] ?></td>
    <td style="padding: 10px;"><?php echo $obj[2] ?></td>
    <td style="padding: 10px;"><?php echo $obj[15] ?></td>
    <td style="padding: 10px;"><?php echo $obj[4] ?></td>
    <td style="padding: 10px;"><?php echo $obj[5] ?></td>
    <td style="padding: 10px;"><?php echo $obj[6] ?></td>
    <td>
        <?php if (($obj[13]) != 1){ ?>
        <a href="modal-contactos" class="hide modal-trigger" style="font-size: 2em; color: #607d8b" title="Contactos"><i class="contact material-icons pbtn" id="c<?php echo $obj[0] ?>">contact_phone</i></a>
        <?php } ?>

        <a href="#modal-clientes" style="font-size: 2em; color: #607d8b" class="load mdi mdi-24px mdi-pencil pbtn modal-trigger" id="m<?php echo $obj[0] ?>" modulo="cliente"></a>
        
        <a href="#" style="font-size: 2em; color: #607d8b" class="delete mdi mdi-24px mdi-close pbtn" modulo="cliente" id="d<?php echo $obj[0] ?>"></a>
    </td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>