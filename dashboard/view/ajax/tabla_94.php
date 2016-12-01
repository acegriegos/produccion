<?php
	echo '<option value="0" valor="0">Seleccionar Descuento</option>';
	foreach ( $transaccion as $obj ) {
		echo '<option value="'.$obj[0].'" valor="'.$obj[2].'">'.$obj[1].' - '.$obj[3].'</option>';
	}
?>