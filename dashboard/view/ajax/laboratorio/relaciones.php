<?php 
$ultimo = 0;
if (sizeof($transaccion)) {

	$vfrascos = '<option value="0">Seleccione una opción</option>';

	
	foreach ($frascos as $fra) {
		$idfrasco = $transaccion[0][2];
		$vfrascos .= '<option value="'.$fra[0].'">'.$fra[1].'</option>';
	}

	foreach ($transaccion as $obj) {
		
?>
<tr id="rw<?php echo $obj[0]; ?>" class="rowrel zelda">
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="frascos<?php echo $obj[0]; ?>" class="invfrascos">
				<?php echo $vfrascos; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<input type="number" id="caben<?php echo $obj[0]; ?>" class="caben" value="<?php echo $obj[2]; ?>" min="1">
		</div>
	</td>
	
	<td style="padding: 10px; color:black;">
		<a class="waves-effect waves-light gtext pbtn addline add" modulo="laboratorio-relacione" id="a<?php echo $obj[0]?>" tp="5"><i class="mdi mdi-plus pbtn mdi-18px"></i></a>
		<a class="waves-effect waves-light gtext pbtn delline delete" modulo="laboratorio-relacione" id="d<?php echo $obj[0]?>"><i class="mdi mdi-close pbtn mdi-18px"></i></a>
	</td>
</tr>
<?php 
$ultimo = (int) $obj[0]; } 
}else{
	
	$ultimo = $ultimo + 1;
	$vfrascos = '<option value="0">Seleccione una opción</option>';

	
	foreach ($frascos as $fra) {
		$vfrascos .= '<option value="'.$fra[0].'">'.$fra[1].'</option>';
	}
}?>
<tr id="rw<?php echo $ultimo; ?>" class="rowrel zelda">
	
	
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="frascos<?php echo $ultimo; ?>" class="invfrascos">
				<?php echo $vfrascos; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<input type="number" id="caben<?php echo $ultimo; ?>" class="caben" value="1" min="1">
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<a class="waves-effect waves-light gtext pbtn addline add" modulo="laboratorio-relacione" id="al<?php echo $ultimo; ?>" tp="5"><i class="mdi mdi-plus pbtn mdi-18px"></i></a>
		<a class="waves-effect waves-light gtext pbtn delline delete" modulo="laboratorio-relacione" id="dl<?php echo $ultimo; ?>" tp="5"><i class="mdi mdi-close pbtn mdi-18px"></i></a>
	</td>
</tr>
<script type="text/javascript">
	$(function(){
		permisos(310,311);
	})
</script>