<li class="collection-header"><h4>Cierres Pendientes</h4></li>
<?php 
	$id = 0;
	foreach ($transaccion as $obj) {
		$id++;
?>
	
	<li class="collection-item"><div><span class="blueh pbtn" <?php echo 'id="c'.$id.'"' ?> ><?php echo $obj[1]?></span><a href="#!" class="secondary-content"><div class="chip red white-text"><?php echo $obj[0]?></div></a></div></li>

<?php } ?>

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	})
</script>