<?php foreach ($transaccion as $obj) {
    if ($obj[4]) {
?>

<li id="0_<?php echo $obj[4] ?>"> <div class="collapsible-header" ><span class="badge"><?php echo $obj[5] ?>(<?php echo $obj[8] ?>): <?php echo $obj[6] ?></span></div> <!-- <div class="collapsible-body"><a class="btn-floating waves-effect waves-light blue edit_ctabnk" id="m0_" title="Editar Cuenta Bancaria"><i class="fa fa-pencil-square-o"></i></a> <a class="btn-floating waves-effect waves-light red del_ctabnk" id="d0_" title="Eliminar Cuenta Bancaria"><i class="fa fa-times"></i></a></div> --> </li>

<?php } } ?>