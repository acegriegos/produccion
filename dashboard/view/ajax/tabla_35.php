<option value="0">Seleccione una Opción</option>
<?php
 
foreach ($transaccion as $obj) {
	echo '<option value="'.$obj[0].'">'.$obj[1].'</option>';
}

?>