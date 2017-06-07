<?php foreach ($transaccion as $obj) {
?>

<tr id="d_<?php echo $obj[0]; ?>">
	<td><input type="text" id="vnombre" class="fast-edit fast-edit-r center-align" value="<?php echo $obj[1]; ?>" style="border: 0px;margin: 0px; padding: 0px;" maxlength="20"></td>
    <td style=" width: 50%;">
        <a class="waves-effect waves-light load_x" id="g<?php echo $obj[0]; ?>" href='#modal-valorescat' title="Valores en el Sistema"><i class="material-icons left">mode_edit</i></a>

        <a class="waves-effect waves-light load_x" modulo="nivelescliente" id="h<?php echo $obj[0]; ?>" title="Eliminar Nivel de Cliente"><i class="material-icons left">delete</i></a>
    </td>
</tr>

<?php } ?>