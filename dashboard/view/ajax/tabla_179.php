<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[1]; ?></td>
<td style="width: 10%"><?php echo $obj[2]; ?></td>
<td style="width: 10%" title="<?php echo $obj[3]; ?>"><?php echo substr($obj[3], 0,20); ?>...</td>
<td style="width: 10%"><?php echo $obj[4]; ?></td>
<td style="width: 10%"><?php echo $obj[5]; ?></td>
<td style="width: 10%">
<a class="btn-color pbtn mdi mdi-24px mdi-information-outline status blueh tooltipped" id="e<?php echo $obj[0] ?>" style="color:<?php switch ($obj[8]) { case 1: echo 'lime';break;case 2: echo 'yellow'; break; case 3: echo 'red'; break; default: echo 'blue'; break;
    } ?>;" data-tooltip="Estado de la Factura" data-position="bottom" fecha="<?php echo $obj[9] ?>"></a>
</td>
</tr>

<?php } ?>