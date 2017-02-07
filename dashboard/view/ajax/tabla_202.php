<?php foreach ($transaccion as $obj) {
?>

<tr id="e_<?php echo $obj[0]; ?>">
    <td><input type="text" value="<?php echo $obj[1]; ?>" class="fast-edit" style="border: 0px;margin: 0px; padding: 0px;"></td>
    <td align="right">

       <a class="btn load" modulo="banco" varias="1" id="i<?php echo $obj[0]; ?>" href='#modal-bancos' title="Valores del Banco" ><i class="fa fa-gg-circle"></i></a>
        
        <a class="btn delete" modulo="banco" id="j<?php echo $obj[0]; ?>" style="color: #D9534F" title="Eliminar Banco"><i class="fa fa-times"></i></a>
        
    </td>
</tr>

<?php } ?>