<?php foreach ($transaccion as $obj) { ?>

<tr id="f<?php echo $obj[0]; ?>">
    <td style=" padding: 10px;"><?php echo $obj[2]; ?></td>
    <td style=" padding: 10px;" id="rn<?php echo $obj[0]; ?>"><?php echo $obj[1]; ?></td>
    <td>
    
        <a href="#" class="der delete pbtn" modulo="ruta" id="d<?php echo $obj[0]; ?>" style="font-size: 2em; color: #607d8b"><i class="fa fa-trash"></i></a>    
        
        <a href="#modal-rutas" class="der load pbtn crut" id="m<?php echo $obj[0]; ?>" modulo="ruta" style="font-size: 2em; color: #607d8b"><i class="fa fa-pencil"></i></a>
        
        <a href="#!" class="der pbtn" id="z<?php echo $obj[0]; ?>" style="font-size: 2em; color: #607d8b" title="Zona de Carga y Descarga"><i class="fa fa-truck"></i></a>

        <a href="#modal-ruser" class="der luser pbtn" id="u<?php echo $obj[0]; ?>" style="font-size: 2em; color: #607d8b" title="Encargados de la Ruta"><i class="fa fa-vcard-o"></i></a>

        <a href="#modal-rcliente" class="der lcliente pbtn" id="c<?php echo $obj[0]; ?>" style="font-size: 2em; color: #607d8b" title="Clientes de la Ruta"><i class="fa fa-group"></i></a>
    </td>
</tr>

<?php } ?>