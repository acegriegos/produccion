<?php 

    foreach ($transaccion as $obj) {
        echo '<div class="chpcrr chip ciclos" data-triforce=\'{"vaccion":"2","vidcorreo":"'.$obj[0].'","vcorreo":"'.$obj[3].'"}\'><span class="vcoo" id="ce_'.$obj[0].'">'.$obj[3].'</span><i id="cd_'.$obj[0].'" class="close close_mail mdi mdi-close"></i></div>';
    }

 ?>