<?php
// foreach ($transaccion as $obj) {

//     if ($obj[1] != 0) {
//         $id = $obj[1];
//     }else{
//         $id = '-'.$obj[2];
//     }

//     echo '<div class="chip blue lighten-3" id="l'.$id.'"><input type="hidden" id="htot'.$id.'" value="'.$obj[6].'" precio="'.$obj[5].'"><span class="nomprod" id="n'.$id.'" idproducto="'.$obj[1].'" idservicio="'.$obj[2].'">'.$obj[3].'</span> (<span class="hcant" id="c'.$id.'">'.$obj[4].'</span>)<i class="close material-icons del" id="d'.$id.'">close</i></div>';
// }

foreach ($transaccion as $obj) {
?>
<tr>
<td><?php echo $obj[1] ?></td>
<td><?php echo $obj[2] ?></td>
<td><?php echo $obj[3] ?></td>
<td><?php echo $obj[4] ?></td>
<td>
<a class="btn-color pbtn loadpck modal-trigger" id="e<?php echo $obj[0] ?>" href="#modal-paquetes" title="Editar Paquete"><i class="mdi mdi-pencil mdi-24px"></i></a>
<a class="btn-color pbtn cdel delpck" id="d<?php echo $obj[0] ?>" title="Eliminar Paquete"><i class="mdi mdi-close mdi-24px"></i></a>
</td>
</tr>
<?php
}
?>
