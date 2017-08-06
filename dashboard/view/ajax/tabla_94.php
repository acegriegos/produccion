<option value="0" valor="0">Seleccione una Opción</option>
<?php
	foreach ( $transaccion as $obj ) {
		echo '<option value="'.$obj[0].'" valor="'.$obj[2].'">'.$obj[1].' - '.$obj[3].'</option>';
	}
?>