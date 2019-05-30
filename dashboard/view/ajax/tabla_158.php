<?php 
	
	foreach ($transaccion as $obj) {
?>

<tr>
<td style="width: 10%"><?php echo $obj[1] ?></td>
<td style="width: 10%" class="tr trCompra"><?php echo $obj[2] ?></td>
<td style="width: 10%" class="tr trCompra trVenta trCot"><?php echo $obj[4] ?></td>
<td style="width: 10%"><?php echo $obj[5] ?></td>
<td style="width: 10%"><?php echo $obj[6] ?></td>
<td style="width: 10%"><?php echo $obj[7] ?></td>
<td style="width: 10%"><?php echo $obj[8] ?></td>
<td style="width: 10%">
    <a class="dropdown-button btn btn-default" style="cursor: pointer;padding: 0;width: 100%;background-color: #e2e2e2; " data-activates='acciones'><i class="mdi mdi-cursor-default mdi-16px black-text"></i> <i class="der mdi mdi-menu-down mdi-24px black-text"></i></a>
        <ul id='acciones' class='dropdown-content'>

            <li><a class="center print tooltipped mdi mdi-24px mdi-printer" data-tooltip="Visualizar" data-position="left" id="a<?php echo $obj[0] ?>"></a></li>

            <li><a class="center mdi mdi-24px mdi-file-pdf pdf tooltipped" data-tooltip="Descargar PDF" data-position="left" download target="_blank" id="c<?php echo $obj[0] ?>" data-tooltip=""></a></li>

            <li class="tr trVenta trTiquete trExportacion trFECompra"><a class="center mdi mdi-24px mdi-file-xml xml tooltipped" data-tooltip="Descargar XML" data-position="left" download target="_blank" id="g<?php echo $obj[0] ?>" data-tooltip=""></a></li>

            <li class="tr trVenta trTiquete trExportacion trFECompra"><a class="center mdi mdi-24px mdi-xml mh tooltipped" data-tooltip="Descargar Mensaje de Hacienda" data-position="left" download target="_blank" id="h<?php echo $obj[0] ?>" data-tooltip=""></a></li>

            <li class="tr trCot"><a class="center mdi mdi-24px mdi-settings process tooltipped" data-tooltip="Procesar Factura" data-position="left" id="b<?php echo $obj[0] ?>"></a></li>

            <li class="tr trCot trCompra trPedido"><a class="center mdi mdi-24px mdi-pencil edit tooltipped" data-tooltip="Editar" data-position="left" id="e<?php echo $obj[0] ?>" ></a></li>

            <li class="tr"><a class="center mdi mdi-24px mdi-content-duplicate clone tooltipped" data-tooltip="Clonar" data-position="left" id="f<?php echo $obj[0] ?>"></a></li>

            <li class="tr trVenta trCot trOCompra trExportacion"><a class="center mdi mdi-24px mdi-send send tooltipped" data-tooltip="Enviar por Correo" data-position="left" id="d<?php echo $obj[0] ?>"></a></li>
            <!-- tr trVenta trCot trOCompra trPedido -->
        </ul>
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
            $(".trVenta").removeClass('hide')
            break;
        case 2:
            $(".trCompra").removeClass('hide');
            break;
        case 3:
            $(".trOCompra").removeClass('hide')
            break;
        case 4:
            $(".trCot").removeClass('hide')
            break;
        case 5:
            $(".trPedido").removeClass('hide')
            break;
        case 7:
            $(".trTiquete").removeClass('hide')
            break;
        case 8:
            $(".trSpecial").removeClass('hide')
            break;
        case 9:
            $(".trFECompra").removeClass('hide')
            break;
        case 10:
            $(".trExportacion").removeClass('hide')
            break;
    }

        $('.tooltipped').tooltip({delay: 50});
        $('.dropdown-button').dropdown();
 		permisos(310,311);
 	})
 </script>