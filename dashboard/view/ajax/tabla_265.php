<?php 

    foreach ($transaccion as $obj) {
        echo "<tr id='cp".$obj[4]."'> <td>".$obj[0]."</td> <td>".$obj[1]."</td> <td>".$obj[2]."</td> <td>".$obj[3]."</td> <td> <i class='mdi mdi-eye hide' style='cursor:pointer;' title='Ver Comprobante'></i> <i class='mdi mdi-information-outline ' style='cursor:pointer;' title=''></i>  <a href='#' class='btn msjh' tipo='5'>Aceptar</a> <a href='#' class='btn msjh' tipo='6'>Aceptar-Parcial</a> <a href='#' class='btn msjh' tipo='7'>Rechazar</a> <i class='mdi mdi-settings' style='cursor:pointer;' title='Opciones Avanzadas'></i> </td> </tr>";
    }

 ?>