<?php
	
	foreach ($transaccion as $obj) {

?>
    
    <tr id="f<?php echo $obj[0] ?>">
    <td <?php echo $obj[3] != '' ? 'class="tooltipped" style="background-color: rgba(99, 190, 29, 0.3);" data-position="top" data-tooltip="Moneda por Defecto"' : '' ?> > <?php echo $obj[4] ?></td>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td>
        <a class="waves-effect waves-light load" id="a<?php echo $obj[0] ?>" data-target="modal" href='#modal-monedas' modulo="moneda" title="Editar Moneda"><i class="material-icons left">mode_edit</i></a>

        <a class="waves-effect waves-light delete" modulo="moneda" id="b<?php echo $obj[0] ?>"  title="Eliminar Moneda"><i class="material-icons left">delete</i></a>
    </td>

<?php
	}

?>
