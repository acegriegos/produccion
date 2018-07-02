<?php foreach ($transaccion as $obj) {
?>

<tr id="c_<?php echo $obj[0]; ?>">
    <td <?php if($obj[2] != 1){ ?> class="tooltipped" data-position="top" data-tooltip="Tipo Pago Principal"<?php } ?>><input class="center-align" type="text"  value="<?php echo $obj[1]; ?>" readonly style="border: 0px;margin: 0px; padding: 0px;"></td>
    <td>
        <a class="waves-effect waves-light load_x modal-trigger gtext" modulo="tipopago" id="e<?php echo $obj[0]; ?>" title="Editar Tipo Pago" href='#modal-tipopagos'><i class="mdi mdi-pencil left mdi-24px"></i></a>

        <a class="waves-effect waves-light gtext delete" modulo="tipopago" id="f<?php echo $obj[0]; ?>" title="Eliminar Tipo Pago"><i class="mdi mdi-close left mdi-24px"></i></a>

    </td>
</tr>

<?php } ?>