
<?php

foreach ($transaccion as $obj) {
    if ($obj[1] != 0) {
        $id = $obj[1];
    }else{
        $id = '-'.$obj[2];
    }

    echo '<div class="chip blue lighten-3" id="l'.$id.'"><input type="hidden" id="htot'.$id.'" value="'.$obj[7].'" precio="'.$obj[5].'"><span class="nomprod" id="n'.$id.'" idproducto="'.$obj[1].'" idservicio="'.$obj[2].'">'.$obj[3].'</span> (<span class="hcant" id="c'.$id.'">'.$obj[4].'</span><span class="huni" id="u'.$id.'" idunidad="'.$obj[5].'">'.$obj[6].'</span>)<i class="close mdi mdi-close del" id="d'.$id.'"></i></div>';
}
 ?>

 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>

