<?php 
	$vbandejas = '<option value="0">Seleccione una opcion</option>';
	$vfrascos = '<option value="0">Seleccione una opción</option>';

	foreach ($bandejas as $ban) {
		$idbandeja = $transaccion[0][1];
		$vbandejas .= '<option value="'.$ban[0].'">'.$ban[1].'</option>';
	}
	foreach ($frascos as $fra) {
		$idfrasco = $transaccion[0][2];
		$vfrascos .= '<option value="'.$fra[0].'">'.$fra[1].'</option>';
	}

	foreach ($transaccion as $obj) {
		$ultimo = 0;
?>
<tr id="rw<?php echo $obj[0]; ?>" class="rowrel zelda">
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="bandejas<?php echo $obj[0]; ?>" class="invbandejas">
				<?php echo $vbandejas; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<input type="number" id="caben<?php echo $obj[0]; ?>" class="caben" value="<?php echo $obj[3]; ?>" min="1">
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="frascos<?php echo $obj[0]; ?>" class="invfrascos">
				<?php echo $vfrascos; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<a class="waves-effect waves-light blue btn-floating addline add" modulo="laboratorio-relacione" id="a<?php echo $obj[0]?>" tp="5"><i class="mdi mdi-plus"></i></a>
		<a class="waves-effect waves-light red btn-floating delline delete" modulo="laboratorio-relacione" id="d<?php echo $obj[0]?>"><i class="mdi mdi-close"></i></a>
	</td>
</tr>
 <?php } 
$ultimo = (int) $obj[0];
$ultimo = $ultimo + 1;
?>
<tr id="rw<?php echo $ultimo; ?>" class="rowrel zelda">
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="bandejas<?php echo $ultimo; ?>" class="invbandejas">
				<?php echo $vbandejas; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<input type="number" id="caben<?php echo $ultimo; ?>" class="caben" value="1" min="1">
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<div class="input-field">
			<select type="select" id="frascos<?php echo $ultimo; ?>" class="invfrascos">
				<?php echo $vfrascos; ?>
			</select>
		</div>
	</td>
	<td style="padding: 10px; color:black;">
		<a class="waves-effect waves-light blue btn-floating addline add" modulo="laboratorio-relacione" id="al<?php echo $ultimo; ?>" tp="5"><i class="mdi mdi-plus"></i></a>
		<a class="waves-effect waves-light red btn-floating delline delete" modulo="laboratorio-relacione" id="dl<?php echo $ultimo; ?>" tp="5"><i class="mdi mdi-close"></i></a>
	</td>
</tr>


 <script type="text/javascript">
 	$(function(){
 		permisos(310,311);
 	})
 </script>


