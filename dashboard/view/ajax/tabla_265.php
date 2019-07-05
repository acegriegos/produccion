<?php 

    foreach ($transaccion as $obj) {
        echo "<tr id='cp".$obj[4]."'> <td>".$obj[0]."</td> <td>".$obj[1]."</td> <td>".$obj[2]."</td> <td>".$obj[3]."</td> <td>  <a href='#' title='Aceptar' class='btn msjh' tipo='5'>A</a> <a href='#' title='Aceptar Parcial' class='btn msjh' tipo='6'>AP</a> <a href='#' title='Rechazar' class='btn msjh' tipo='7'>R</a> <i class='mdi mdi-eye shcompra' style='cursor:pointer;' title='Ver Comprobante'></i> <i class='mdi mdi-settings hide' style='cursor:pointer;' title='Opciones Avanzadas'></i> <i style='cursor:pointer'></i> </td> </tr>";
    }

 ?>