<?php 

    foreach ($transaccion as $obj) {
        echo '<li id="'.$obj[0].'"> <div class="collapsible-header"><span class="badge">'.$obj[3].'</div> <div class="collapsible-body"><a class="btn-floating waves-effect waves-light blue edit_mail" id="m'.$obj[0].'" title="Editar Correo"><i class="fa fa-pencil-square-o"></i></a> <a class="btn-floating waves-effect waves-light red del_mail" id="d'.$obj[0].'" title="Eliminar Correo"><i class="fa fa-times"></i></a></div> </li>';
    }

 ?>