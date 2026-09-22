<?php 
	
	set_time_limit(0);

	foreach ($transaccion as $obj) {
	  echo '<tr>
	  	<td>'.$obj[1].'</td>
	  	<td style="cursor: pointer" class="detextra" fila="'.$obj[0].'" tabla="64"  data-activates="extra">'.$obj[2].'</td>
	  	<td>'.$obj[3].'</td>
	  	<td>'.$obj[4].'</td>
	  	<td>'.$obj[5].'</td>
        <td>'.$obj[6].'</td>
	  </tr>';
	}

?>