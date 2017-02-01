<?php foreach ($transaccion as $obj) {
    if ($obj[4]) {
?>

<li id="cta_<?php echo $obj[4]; ?>"> <div class="collapsible-header ciclos" vid="<?php echo $obj[4]; ?>" vdet_moneda="<?php echo $obj[7]; ?>" vctabnk="<?php echo $obj[8]; ?>" vidbanco="<?php echo $obj[0]; ?>" vdet_nom="<?php echo $obj[5]; ?>" vdet_cta="<?php echo $obj[6]; ?>"><?php echo $obj[9]; ?><span class="badge"><?php echo $obj[5]; ?>: <?php echo $obj[6]; ?> [<?php echo $obj[10]; ?>]</span></div> </li>

<?php } } ?>