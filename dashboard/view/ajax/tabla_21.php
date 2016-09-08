<?php
echo '<option value="0">Sin Tipo</option>';
foreach ($transaccion as $obj) {
	echo '<option value="'.$obj[0].'">'.$obj[1].'</option>';
}
?>