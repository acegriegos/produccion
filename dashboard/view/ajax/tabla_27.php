<?php foreach ($transaccion as $obj) {
?>

<tr id="b_<?php echo $obj[0]; ?>">
    <td>
        <input type="text" value="<?php echo $obj[1]; ?>" style="border: 0px;margin: 0px; padding: 0px;" class="fast-edit">
    </td>
    <td align="right">
    <?php if ($obj[2] == 0){ ?>
        <a href='#modal-tusuarios' class="btn valorestu" id="c<?php echo $obj[0]; ?>" modulo="moneda" title="Valores en el Sistema">
            <i class="fa fa-gg-circle"></i>
        </a>
        <a href="#" class="btn delete" modulo="tipousuario" id="d<?php echo $obj[0]; ?>" title="Eliminar Tipo Usuario">
            <i class="fa fa-times"  style="color: #D9534F" readonly></i>
        </a>
    </td>
    <?php } ?>
</tr>

<?php } ?>