<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[1] ?></td>
<td style="width: 10%" rm="1"><?php echo $obj[2] ?></td>
<td style="width: 10%" rm="2"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[7] ?></td>
<td style="width: 10%"><?php echo $obj[8] ?></td>
<td style="width: 10%">
    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a<?php echo $obj[0] ?>" tv="<?php echo $obj[9] ?>" data-tooltip="Visualizar Factura" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-file-pdf pdf blueh tooltipped" download target="_blank" id="c<?php echo $obj[0] ?>" data-tooltip="Descargar PDF" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-send send blueh tooltipped tr trVenta trCot trOCompra trPedido" id="d<?php echo $obj[0] ?>" data-tooltip="Enviar por Correo" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-settings process blueh hide tooltipped" id="b<?php echo $obj[0] ?>"  data-position="bottom" data-tooltip="Procesar Factura" rm="3"></a>
</td>
</tr>

<?php }

 ?>

 <script type="text/javascript">
 	$(function(){
        var tf = parseInt($("input[name=tventa]:checked").attr('id').substr(2));
        $(".tr").addClass('hide');
        switch(tf) {
        case 1:
            $("[rm=1]").addClass('hide');
            $("[rm=2]").removeClass('hide');
            $("[rm=3]").addClass('hide');
            $(".trVenta").removeClass('hide')
            break;
        case 2:
            $("[rm=1]").removeClass('hide');
            $("[rm=2]").removeClass('hide');
            $("[rm=3]").addClass('hide');
            $(".trCompra").removeClass('hide');
            break;
        case 3:
            $("[rm=1]").addClass('hide');
            $("[rm=2]").addClass('hide');
            $("[rm=3]").removeClass('hide');
            $(".trCot").removeClass('hide')
            break;
        case 4:
            $("[rm=1]").addClass('hide');
            $("[rm=2]").addClass('hide');
            $("[rm=3]").removeClass('hide');
            $(".trOCompra").removeClass('hide')
            break;
        case 5:
            $("[rm=1]").addClass('hide');
            $("[rm=2]").addClass('hide');
            $("[rm=3]").removeClass('hide');
            $(".trPedido").removeClass('hide')
            break;
        case 7:
            $("[rm=1]").addClass('hide');
            $("[rm=2]").removeClass('hide');
            $("[rm=3]").addClass('hide');
            $(".trTiquete").removeClass('hide')
            break;
    }

        $('.tooltipped').tooltip({delay: 50});
 		permisos(310,311);
 	})
 </script>