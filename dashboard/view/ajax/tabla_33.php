<?php

foreach ($transaccion as $obj) {
	echo ' <tr class="view-cuenta" style="cursor: pointer;" id="c'.$obj[3].'">
            <td class="center-align" style="font-size: 1.2em">
                '.$obj[0].'
            </td>
            <td class="center-align" style="font-size: 1.2em" id="n'.$obj[3].'">
                '.$obj[1].'
            </td>
            <td class="center-align" style="font-size: 1.2em">
                '.$obj[2].'
            </td>
        </tr>';
}

?>

