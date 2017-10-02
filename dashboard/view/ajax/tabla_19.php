<?php 

    foreach ($transaccion as $obj) {
        echo '<div id="'.$obj[0].'" tp="'.$obj[1].'" class="chpphone chip"><img src="../../assets/img/icon/'.$obj[3].'.png">'.$obj[2].'<i id="'.$obj[0].'" class="mdi mdi-close close right"></i></div>';
    }

 ?>