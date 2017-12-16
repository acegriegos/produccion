<li class="collection-header">
	<div class="row marginzero">
		<div class="col s12 m12 l12">
			<h4>Cierres Pendientes</h4>
		</div>
	</div>
	<div>
		<div class="row marginzero">
			<div class="col s12 m12 l12">
				<span class="blue-text pbtn" id="filtro">Filtro</span>
				<span class="right blue-text inv">Ordenar por fecha: <i class="mdi mdi-swap-vertical mdi-24px pbtn" id="order" value="1"></i></span>
			</div>
		</div>
		<div class="row marginzero inv">
			<div class="col s6 m5 l5">
				<br><span>Buscar:</span>
			</div>
			<div class="input-field col s6 m7 l7">
				<input type="date" id="vfecha" class="validate">
			</div>
		</div>
	</div>
</li>
<?php 
	$id = 0;
	foreach ($transaccion as $obj) {
		$id++;
?>
	
	<li class="collection-item"><div><span class="blueh pbtn getfacturas" <?php echo 'id="c'.$id.'" vfecha="'.$obj[1].'"' ?> ><?php echo $obj[1]?></span><a class="secondary-content"><div class="chip red white-text"><?php echo $obj[0]?></div></a></div></li>

<?php } ?>

<script type="text/javascript">
	$(function(){
	    permisos(310,311);
	})
</script>