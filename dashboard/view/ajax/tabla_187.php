<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[1] ?></td>
<td style="width: 10%"><?php echo $obj[2] ?></td>
<td style="width: 10%"><?php echo $obj[3] ?></td>
<td style="width: 10%"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[7] ?></td>
<td style="width: 10%">
    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a<?php echo $obj[0] ?>"  data-tooltip="Visualizar Documento" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-send sendm blueh tooltipped" id="m<?php echo $obj[0] ?>"  data-tooltip="Enviar Documento por Correo" data-position="bottom"></a>
</td>
</tr>

<?php } ?>

<script type="text/javascript">
    $(function(){
        $(".tooltipped").tooltip({delay: 50});
    });
</script>