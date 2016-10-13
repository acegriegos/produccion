<?php

foreach ($transaccion as $obj) {
	echo '<li class="list-group-item" id="l'.$obj[0].'"><input type="hidden" id="htot'.$obj[0].'" value="'.$obj[3].'"><span class="tag tag-default tag-pill pull-xs-right hcant" id="c'.$obj[0].'">'.$obj[2].'</span><input type="hidden" class="form-control ihcant pull-xs-right" style="max-width:22%" id="hcant'.$obj[0].'" value=""><label class="nomprod" id="n'.$obj[0].'">'.$obj[1].'</label> <i class="fa fa-times btn del inv" id="d'.$obj[0].'"></i></li>';
}

?>
