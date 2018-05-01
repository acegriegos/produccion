<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td class="input-field">
        <input type="text" id="dtra<?php echo $obj[0]?>" class="validate valorextra">
    </td>
   
</tr>

<?php }

 ?>
