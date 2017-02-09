<?php foreach ($transaccion as $obj) {
?>

<tr id="d_<?php echo $obj[0]; ?>">
    <td><input type="text" id="vnombre" class="fast-edit" value="<?php echo $obj[1]; ?>" style="border: 0px;margin: 0px; padding: 0px;"></td>
    <td align="right">

        <a class="btn valorescc" id="g<?php echo $obj[0]; ?>" href='#modal-valorescat' title="Valores en el Sistema"> <i class="fa fa-gg-circle"></i> </a>
        
        <a class="btn delete" modulo="nivelescliente" id="h<?php echo $obj[0]; ?>" style="color: #D9534F" title="Eliminar Nivel de Cliente"><i class="fa fa-times"></i></a>    
        
    </td>
</tr>

<?php } ?>