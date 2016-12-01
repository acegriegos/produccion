<?php
$id = 0;
$nombre = '';
foreach ($transaccion as $obj) {

	if ($obj[0] == 0) {
		$id = '-'.$obj[2];
		$nombre = $obj[3];
	}else{
		$id = $obj[0];
		$nombre = $obj[1];
	}

	echo '<li class="list-group-item" id="l'.$id.'"><input type="hidden" id="htot'.$id.'" value="'.$obj[6].'" precio="'.$obj[5].'"><span class="tag tag-default tag-pill pull-xs-right hcant" id="c'.$id.'">'.$obj[4].'</span><input type="hidden" class="form-control ihcant pull-xs-right" style="max-width:22%" id="hcant'.$id.'" value=""><label class="nomprod" id="n'.$id.'" idproducto="'.$obj[0].'" idservicio="'.$obj[2].'">'.$nombre.'</label> <i class="fa fa-times btn del inv" id="d'.$id.'"></i></li>';
}

?>
