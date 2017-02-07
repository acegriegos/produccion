<?php print_r($transaccion);foreach ($transaccion as $obj) {
?>

<tr id="c_<?php echo $obj[0]; ?>">
    <td><input type="text" readonly value="<?php echo $obj[1]; ?>" style="border: 0px;margin: 0px; padding: 0px;"></td>
    <td align="right">

        <a class="btn load_x" modulo="tipopago" id="e<?php echo $obj[0]; ?>" title="Editar Tipo Pago" href='#modal-tipopagos'><i class="fa fa-pencil-square-o"></i></a>

        <a class="btn delete" modulo="tipopago" id="f<?php echo $obj[0]; ?>" style="color: #D9534F" title="Eliminar Tipo Pago"><i class="fa fa-times"></i></a>  
        
    </td>
</tr>

<?php } ?>