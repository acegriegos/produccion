<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
	<td><?php echo $obj[2];?></td>
	<td><?php echo $obj[3];?></td>
	<td><?php echo $obj[4];?></td>
	<td><?php echo $obj[5];?></td>
	<td><?php echo $obj[6];?></td>
	<td>
		<a class="pbtn gtext mdi mdi-24px mdi-refresh procmult" id="a<?php echo $obj[0];?>" title="Procesar Multiplicacion"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-view-list mcb" id="b<?php echo $obj[0];?>" title="Ver Medio Cultivo y Bandejas"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-checkbox-multiple-marked-outline invstats" id="c<?php echo $obj[0];?>" title="Procesar Activos" tipo="1"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-arrow-left-box history" id="d<?php echo $obj[0];?>" title="Ver Trayectoria"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-basket-unfill invstats" id="f<?php echo $obj[0];?>" title="Registrar Pérdidas" tipo="0"></a>
		<a class="pbtn gtext mdi mdi-24px mdi-arrow-collapse-right procenr" id="e<?php echo $obj[0];?>" title="Procesar a Enraizamiento"></a>
	</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>