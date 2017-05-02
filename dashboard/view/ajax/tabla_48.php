<option value="0" valor="0">Seleccione un Impuesto</option>
<?php
foreach ($transaccion as $obj) {
	echo '<option value="'.$obj[0].'" valor="'.$obj[3].'">'.$obj[1].'</option>';
}
?>