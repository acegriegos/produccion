<?php
	
	foreach ($transaccion as $obj) {

	$default = '';
	if($obj[3] != ''){
		$default = 'class="tooltipped" style="border: 1px solid red;" data-position="top" data-tooltip="Moneda por Defecto"';
	}
?>

    <tr id="f<?php echo $obj[0] ?>">
    <td <?php echo $default ?> ><?php echo $obj[4] ?></td>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td>
        <a class='dropdown-button btn der mydrop' data-activates='dropdown-m<?php echo $obj[0] ?>'><i class="material-icons">menu</i></a>

        <ul id='dropdown-m<?php echo $obj[0] ?>' class='dropdown-content'>
            <li>
                <a class="btn load accion" id="a<?php echo $obj[0] ?>" data-target="modal" href='#modal-monedas' modulo="moneda" title="Editar Moneda"><i class="fa fa-pencil-square-o"></i></a>
            </li>
            <li>
                <a modulo="moneda" id="b<?php echo $obj[0] ?>" style="color: #D9534F" title="Eliminar Moneda" class="btn delete accion"><i class="fa fa-times"></i></a>
            </li>
        </ul>
    </td>

<?php
	}

?>
