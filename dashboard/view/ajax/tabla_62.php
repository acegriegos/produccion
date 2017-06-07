<?php
foreach ($transaccion as $obj) {

    if ($obj[1] != 0) {
        $id = $obj[1];
    }else{
        $id = '-'.$obj[2];
    }

    echo '<div class="chip blue lighten-3" id="l'.$id.'"><input type="hidden" id="htot'.$id.'" value="'.$obj[6].'" precio="'.$obj[5].'"><span class="nomprod" id="n'.$id.'" idproducto="'.$obj[1].'" idservicio="'.$obj[2].'">'.$obj[3].'</span> (<span class="hcant" id="c'.$id.'">'.$obj[4].'</span>)<i class="close material-icons del" id="d'.$id.'">close</i></div>';
}

?>
