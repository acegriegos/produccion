<?php 

    foreach ($transaccion as $obj) {
        echo '<li id="'.$obj[0].'" tp="'.$obj[1].'"> <div class="collapsible-header" ><span class="badge">'.$obj[2].'</span><i class="fa '.$obj[3].'"></i></div> <div class="collapsible-body"><a class="btn-floating waves-effect waves-light blue edit_phone" id="m'.$obj[0].'" title="Editar Teléfono"><i class="fa fa-pencil-square-o"></i></a> <a class="btn-floating waves-effect waves-light red del_phone" id="d'.$obj[0].'" title="Eliminar Teléfono"><i class="fa fa-times"></i></a></div> </li>';
    }

 ?>