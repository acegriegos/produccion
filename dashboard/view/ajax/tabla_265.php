<?php 
    $lista = '<option value="1">Compra</option> <option value="2">Gasto</option> <option value="3">Gasto No Diferido</option> <option value="4">Bien de Capital</option> <option value="5">Proporcionalidad</option>';
    foreach ($transaccion as $obj) {
        echo "<tr id='cp".$obj[4]."'> <td>".$obj[0]."</td> <td>".$obj[1]."</td>  <td>".$obj[2]."</td> <td>".$obj[3]."</td> <td><select class='browser-default tcompra'>".$lista."</select></td>  <td> <i class='mdi mdi-eye shcompra' style='cursor:pointer;' title='Ver Comprobante'></i> <a href='#' title='Aceptar' class='btn msjh' tipo='5'>A</a> <a href='#' title='Aceptar Parcial' class='btn msjh' tipo='6'>AP</a> <a href='#' title='Rechazar' class='btn msjh' tipo='7'>R</a> <i class='mdi mdi-settings hide' style='cursor:pointer;' title='Opciones Avanzadas'></i> <i style='cursor:pointer'></i> </td> </tr>";
    }

 ?>