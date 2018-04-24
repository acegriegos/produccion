<?php
	foreach ($transaccion as $obj) {
		echo '<li class="collection-item pruebasqos" id="clp'.$obj[0].'">
			<label id="qs'.$obj[0].'">'.$obj[1].'</label>
			<i class="pbtn mdi mdi-close mdi-24px right delprueba" id="dp'.$obj[0].'"></i>
		</li>';
	}
?>