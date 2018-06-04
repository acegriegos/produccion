<?php
	foreach ($transaccion as $obj) {
		if ($obj[2] == 0) {
			$color = 'red lighten-1';
		}else{
			$color = 'green lighten-1';
		}
		echo '<li class="collection-item lsperdidas '.$color.'" id="cpr'.$obj[0].'">
			<label id="lpr'.$obj[0].'">'.$obj[1].'</label>
			<i class="pbtn mdi mdi-autorenew mdi-24px right pestado" estado="'.$obj[2].'" id="stp'.$obj[0].'"></i>
		</li>';
	}
?>