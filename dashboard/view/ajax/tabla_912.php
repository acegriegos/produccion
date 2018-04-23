<?php 
    
    foreach ($transaccion as $obj) {
    	if ($obj[1] == 1) {
    		$proc = 'Multiplicación';
    	}else{
    		$proc = $obj[7];
    	}
?>

<tr>
	<td><?php echo $obj[2];?></td>
	<td><?php echo $obj[3];?></td>
	<td><?php echo $obj[4];?></td>
	<td><?php echo $obj[5];?></td>
	<td><?php echo $obj[6];?></td>
	<td>
		<a class="pbtn gtext mdi mdi-24px mdi-refresh proc-ciclo" tc="<?php echo $obj[1];?>" id="a<?php echo $obj[0];?>" title="Procesar a <?php echo $proc;?>"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-view-list mcb" id="b<?php echo $obj[0];?>" title="Ver Medio Cultivo y Bandejas"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-checkbox-multiple-marked-outline invstats" id="c<?php echo $obj[0];?>" title="Procesar Activos" tipo="1"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-arrow-left-box history" id="d<?php echo $obj[0];?>" title="Ver Trayectoria"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-basket-unfill invstats" id="f<?php echo $obj[0];?>" title="Registrar Pérdidas" tipo="0"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-arrow-collapse-right proc-ciclo" tc="<?php echo $obj[8];?>" id="e<?php echo $obj[0];?>" title="Procesar a <?php echo $obj[9];?>"></a>
	</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>