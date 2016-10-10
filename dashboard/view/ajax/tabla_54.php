<div class="input-group">
	<div class="input-group-addon"><b>Moneda</b></div>
	<?php
	echo '<select id="vidmoneda" class="form-control" required="required">';
		foreach ($transaccion as $obj) {
			echo '<option value="'.$obj[0].'">'.$obj[1].' - '.$obj[2].' '.$obj[3].'</option>';
		}
	echo '<input type="hidden" id="vmoneda" value="">
	</select>';
	?>
	</div>

<br>