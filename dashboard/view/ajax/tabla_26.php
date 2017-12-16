<?php foreach ($transaccion as $obj) {
?>


<tr id="c_<?php echo $obj[0]; ?>">
    <td <?php echo $obj[2] != 0 ? 'class="tooltipped" style="background-color: rgba(99, 190, 29, 0.3);" data-position="top" data-tooltip="Tipo Moneda Principal"' : '' ?>>
        <input class="center-align" type="text"  value="<?php echo $obj[1]; ?>" readonly style="border: 0px;margin: 0px; padding: 0px;">
    </td>
    <td>
        <a class="waves-effect waves-light load_x" modulo="tipopago" id="e<?php echo $obj[0]; ?>" title="Editar Tipo Pago" href='#modal-tipopagos' ><i class="material-icons left">mode_edit</i></a>
        <?php if($obj[0] != 0){?>
        <a class="waves-effect waves-light delete" modulo="tipopago" id="f<?php echo $obj[0]; ?>"  title="Eliminar Tipo Pago"><i class="material-icons left">delete</i></a>
        <?php } ?>      
    </td>
</tr>

<?php } ?>