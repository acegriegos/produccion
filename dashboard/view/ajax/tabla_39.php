<?php 
	foreach ($transaccion as $obj) {
         echo '<tr>
            <td>'.$obj[1].'</td>
            <td>'.$obj[2].'</td>
            <td>
                <i class="fa fa-pencil btn load" id="e'.$obj[0].'" codigo="1" modulo="sucursale"></i>
                <i class="fa fa-times btn delete" id="d'.$obj[0].'" codigo="1" modulo="sucursale"></i>
            </td>
        </tr>';
    }
?>

