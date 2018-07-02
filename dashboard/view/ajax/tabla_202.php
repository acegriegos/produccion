<?php foreach ($transaccion as $obj) { ?>

<tr id="e_<?php echo $obj[0]; ?>">
    <td><input type="text" value="<?php echo $obj[1]; ?>" class="fast-edit center-align" style="border: 0px;margin: 0px; padding: 0px;"></td>
    <td>
        <a class="load modal-trigger" modulo="banco" varias="1" id="i<?php echo $obj[0]; ?>" href='#modal-bancos' title="Valores del Banco" ><i class="mdi mdi-pencil left mdi-24px gtext"></i></a>
        <a class="waves-effect" modulo="banco" id="j<?php echo $obj[0]; ?>"  title="Eliminar Banco"><i class="mdi mdi-close left mdi-24px gtext delete"></i></a>
    </td>
</tr>

<?php } ?>