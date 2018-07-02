<?php 

    foreach ($transaccion as $obj) {
        echo '<div class="ciclos chpphone chip" data-triforce=\'{"vaccion":"2","vidtelefono":"'.$obj[0].'","vidtipotel":"'.$obj[1].'","vtelefono":"'.$obj[2].'","vidpais":"52"}\'><img id="ftptt_'.$obj[0].'" src="../assets/img/icon/'.$obj[3].'.png"><span id="tt_'.$obj[0].'" class="_tel" tp="'.$obj[1].'">'.$obj[2].'</span><i id="td_'.$obj[0].'" class="close_phone mdi mdi-close close right"></i></div>';
    }

 ?>