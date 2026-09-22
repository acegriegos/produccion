<?php foreach ($transaccion as $obj) { ?>

<tr id="f<?php echo $obj[0]; ?>">
    <td style=" padding: 10px;"><?php echo $obj[2]; ?></td>
    <td style=" padding: 10px;" id="rn<?php echo $obj[0]; ?>"><?php echo $obj[1]; ?></td>
    <td>
    
        <a href="#modal-rutas" class="load pbtn crut modal-trigger gtext" id="m<?php echo $obj[0]; ?>" modulo="ruta" style="font-size: 2em;"><i class="mdi mdi-24px mdi-pencil" title="Editar Ruta"></i></a>

        <!-- <a href="#!" class="pbtn gtext" id="z<?php echo $obj[0]; ?>" style="font-size: 2em;" title="Zona de Carga y Descarga"><i class="mdi mdi-24px mdi-truck gtxt"></i></a> -->

        <a href="#modal-ruser" class="luser pbtn modal-trigger gtext" id="u<?php echo $obj[0]; ?>" style="font-size: 2em;" title="Encargados de la Ruta"><i class="mdi mdi-24px mdi-tag"></i></a>

        <a href="#modal-rcliente" class="lcliente pbtn modal-trigger gtext" id="c<?php echo $obj[0]; ?>" style="font-size: 2em;" title="Clientes de la Ruta"><i class="mdi mdi-24px mdi-account-star"></i></a>
        
        <a href="#" class="delete pbtn gtext" modulo="ruta" id="d<?php echo $obj[0]; ?>" style="font-size: 2em;" title="Eliminar Ruta"><i class="mdi mdi-24px mdi-delete"></i></a>
    </td>
</tr>

<?php } ?>