<?php 
    
    foreach ($transaccion as $obj) {
?>

<tr>
<td><?php echo $obj[1] ?></td>
<td><?php echo $obj[2] ?></td>
<td><?php echo strlen($obj[3]) > 10 ? substr($obj[3],0,10).'...' : $obj[3] ?></td>
<td><?php echo $obj[4] ?></td>
<td><?php echo $obj[6] ?></td>
<!-- <td><?php echo $obj[7] ?></td> -->
<td>
    <a class="btn-color pbtn mdi mdi-file-pdf mdi-24px pdf" download target="_blank" id="q<?php echo $obj[0] ?>"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" id="a<?php echo $obj[0] ?>"  data-tooltip="Visualizar Documento" data-position="bottom"></a>

    <a class="btn-color pbtn mdi mdi-24px mdi-send sendm blueh tooltipped" id="m<?php echo $obj[0] ?>"  data-tooltip="Enviar Documento por Correo" data-position="bottom"></a>

    <a class="btn-color pbtn red-text delete-row mdi mdi-close mdi-24px hide blueh" id="d<?php echo $obj[0] ?>" modulo="estadocuenta" data-tooltip="Eliminar" data-position="bottom"></a>

    <?php  
        if($obj[8] == 5){
            echo '<a class="btn-color mdi mdi-24px mdi-cloud-download-outline xml tooltipped" data-tooltip="Descargar XML" data-position="left" download target="_blank" id="g'.$obj[0].'" data-tooltip=""></a>';
        }
    ?>

</td>
</tr>

<?php } ?>

<script type="text/javascript">
    $(function(){
        $(".tooltipped").tooltip({delay: 50});
        var tf = $("[name=tventa]:checked").attr('id').substr(2);
        if (tf.match(new RegExp(/\b3\b|\b7\b|\b8\b/g)) ){
            $(".delete-row").removeClass('hide')
        }
    });
</script>