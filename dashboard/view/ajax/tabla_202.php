<?php foreach ($transaccion as $obj) { ?>

<tr id="e_<?php echo $obj[0]; ?>">
	<td>
		<input type="text" value="<?php echo $obj[1]; ?>" class="fast-edit center-align" style="border: 0px;margin: 0px; padding: 0px;">
	</td>
	<td style="width: 50% !important">
	<a class="waves-effect load" modulo="banco" varias="1" id="i<?php echo $obj[0]; ?>" href='#modal-bancos' title="Valores del Banco" ><i class="material-icons left">mode_edit</i></a>
	<a class="waves-effect" modulo="banco" id="j<?php echo $obj[0]; ?>"  title="Eliminar Banco"><i class="material-icons left">delete</i></a>
	</td>
</tr>

<?php } ?>