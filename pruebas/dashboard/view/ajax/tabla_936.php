<?php 
	
	foreach ($transaccion as $obj) {
?>

 <tr>
    <td class="center" style="margin: 0; padding: 0"><?php echo $obj[1] ?></td>
    <td class="input-field" style="margin: 0; padding: 0">
        <input style="margin: 0; border: 0;" type="text" id="dtra<?php echo $obj[0]?>" class="validate valorextra">
    </td>
   
</tr>

<?php }

 ?>
