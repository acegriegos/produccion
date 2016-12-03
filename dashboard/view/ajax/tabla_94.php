<?php
	foreach ( $transaccion as $obj ) {
		echo '<option value="'.$obj[0].'" valor="'.$obj[2].'">'.$obj[1].' - '.$obj[3].'</option>';
	}
?>