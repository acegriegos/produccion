<?php
foreach ($transaccion as $obj) {
	echo '<tr>
	    <td>'.$obj[1].'</td>
	    <td>'.$obj[2].'</td>
	    <td>'.$obj[3].'</td>
	    <td>'.$obj[4].'</td>
	    <td>
	      <i class="fa fa-pencil-square-o btn loadpck" id="e'.$obj[0].'" data-toggle="modal" href="#modal-paquetes"></i>
	      <i class="fa fa-times btn delpck" id="d'.$obj[0].'" style="color: #D9534F"></i>
	    </td>
	</tr>';
}


?>
