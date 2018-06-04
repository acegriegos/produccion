<?php foreach ($transaccion as $obj) {
    $checked = '';
    if ($obj[3] == 1) {
        $checked = 'checked';
    }
?>

<tr id="b_<?php echo $obj[0]; ?>">
    <td style="margin:0;">
        <input type="text" value="<?php echo $obj[1]; ?>"  class="fast-edit center-align" style="border: 0px; margin: 0;">
    </td>
    <td style="margin:0;">
        <p>
            <input type="checkbox" class="vbincierre" id="tp<?php echo $obj[0]; ?>" value="<?php echo $obj[3]; ?>" $checked>
            <label for="tp<?php echo $obj[0]; ?>">Aut. realizar cierre</label>
        </p>
    </td>
    <?php if ($obj[2] == 0){ ?>
        <a href='#modal-tusuarios' id="c<?php echo $obj[0]; ?>" modulo="moneda" title="Valores en el Sistema">
        <i class="small material-icons ">info_outline</i></a>
        <a href="#" modulo="tipousuario" id="d<?php echo $obj[0]; ?>" title="Eliminar Tipo Usuario"><i class="small material-icons ">delete</i></a>
    </td>
    <?php } ?>
</tr>

<?php } ?>