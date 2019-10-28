<?php
    if(!is_array($transaccion))
        exit(0);
    switch ($transaccion[0][9]) {
        case 2:
        echo '<div class="row col s12"> <div style="padding: 0 !important;" class="col s2"><b>COD PROV</b></div> <div style="padding: 0 !important;" class="col s3"><b>ARTICULO</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>PROD INT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>CANT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>MEDIDA</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>COSTO</b></div> </div>';
            foreach ($transaccion as $obj) { ?>
<?php  

        $data = 'data-triforce=\'{"vaccion":0,"vid" : 0,"vidfactura" : "'.$obj[28].'","videntrada" : '.$obj[2].',"vcantidad" : "'.$obj[6].'","vprecio" : "'.$obj[8].'","original" : "'.$obj[8].'","vdesc" : "'.$obj[19].'","vtotal" : "'.$obj[10].'","vidinventario" : "'.$obj[11].'","timv":"'.$obj[12].'","vidodt" : 0,"vterminal" : 0,"vimv" : "'.$obj[13].'","vcomodin" : "'.$obj[14].'","vidunidad" : "'.$obj[15].'","vidimpuestos":"'.$obj[16].'","videxoneracion": "'.$obj[17].'","viddescuentos":"'.$obj[18].'","strimp" : "'.$obj[20].'","exoneracion":"'.$obj[21].'","vcomision":"0","max": "'.$obj[22].'","iddesc":"'.$obj[23].'","vdescuento" : "'.$obj[24].'","iva":"'.$obj[25].'","isinventariado" : "'.$obj[26].'","vcodigo" : "'.$obj[3].'","longitud" : "'.$obj[29].'","teu" : "1","tcu" : "1","rcant" : "0","requiv":"0","ocant" : "'.$obj[6].'"}\'';

        $heqprod = $obj[27] == '' ? '' : 'hide';
?>

<div id="fd<?php echo $obj[0]; ?>" <?php echo $data; ?> xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod<?php echo $obj[0]; ?>"><?php echo $obj[3]; ?></div> <div style="padding: 0 !important;" class="col s3" id="desc<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;position: relative;" class="col s2 center-align" id="unitprod<?php echo $obj[0]; ?>"> <input class="browser-default autocomplete eqprod" style="margin:0px;height: auto !important;" value="<?php echo $obj[27]; ?>" /> <i class="mdi mdi-plus der pbtn addProducto <?php echo $heqprod; ?>" style="position: absolute;" title="Agregar Articulo"></i> </div> <div style="padding: 0 !important;cursor: no-drop;" class="col s1 right-align divcnt"> <?php echo $obj[6]; ?></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="totl<?php echo $obj[0]; ?>"><?php echo $obj[7]; ?></div> <div style="padding: 0 !important;" class="col s2 right-align" id="total<?php echo $obj[0]; ?>"><?php echo number_format($obj[8],2); ?></div> <div class="right"> <i id="cs<?php echo $obj[0]; ?>" class="mdi mdi-24px mdi-clipboard-flow pbtn costo" iscambiado="0" title="Cambiar Márgenes"></i> </div> </div>

            <?php }
            break;
        
        default:
            $data = 'data-triforce=\'{"vaccion":0,"vid" : 0,"vidfactura" : "'.$obj[28].'","videntrada" : '.$obj[2].',"vcantidad" : "'.$obj[6].'","vprecio" : "'.$obj[8].'","vdesc" : "'.$obj[19].'","vtotal" : "'.$obj[10].'","vidinventario" : "'.$obj[11].'","timv":"'.$obj[12].'","vidodt" : 0,"vterminal" : 0,"vimv" : "'.$obj[13].'","vcomodin" : "'.$obj[14].'","vidunidad" : "'.$obj[15].'","vidimpuestos":"'.$obj[16].'","videxoneracion": "'.$obj[17].'","viddescuentos":"'.$obj[18].'","strimp" : "'.$obj[20].'","exoneracion":"'.$obj[21].'","vcomision":"0","max": "'.$obj[22].'","iddesc":"'.$obj[23].'","vdescuento" : "'.$obj[24].'","iva":"'.$obj[25].'","isinventariado" : "'.$obj[26].'"}\'';
        $unit = '';
            ?>
<div id="fd<?php echo $obj[0]; ?>" xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod<?php echo $obj[0]; ?>"><?php echo $obj[3]; ?></div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align divisa hide" id="prec<?php echo $obj[0]; ?>"><?php echo $obj[5]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="fake<?php echo $obj[0]; ?>">0.00</div> <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod<?php echo $obj[0]; ?>"><select class="browser-default pbtn" style="padding: 0;margin: 0;height:auto !important;width:100%;border:0;outline-color: black;"><?php echo $unit; ?></select></div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align">  <input type="number" class="browser-default eder" id="cant<?php echo $obj[0]; ?>" value="<?php echo $obj[6]; ?>" style="border:0px;width:100%;height:auto !important" /></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota<?php echo $obj[0]; ?>"><?php echo $obj[7]; ?></div> <div class="right">  <a href="#modal-edit" id="edit<?php echo $obj[0]; ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding:0"></a><a href="#" id="del<?php echo $obj[0]; ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding:0"></a> <span id="mdesc<?php echo $obj[0]; ?>"></span> </div> </div>
            <?php
            break;
    }
 ?>

 <script type="text/javascript">
     $(function(){
        totalizar();

        $(document).on("click",".addProducto",function(){
            $(".eqprod").removeAttr('activeq');
            $(this).parent().parent().find('.eqprod').attr('activeq',1)
            $("#vcodigo").val($(this).parent().parent().data('triforce')['vcodigo']);
            $("#vpnombre").val($(this).parent().parent().find('[id^=desc]').html());
            Materialize.updateTextFields();

            $("#fproductos .zelda").data('triforce',{vid:0,vnombre:'',vcodigointerno:'',vcosto:0,vganancia:0,vexoneracion: 0,vidunidad:1,vminimo:0,vmaximo:0,vmaxdescuento:0,vidmarca:0,vidinventario:6,vidusuario: '',vidmoneda:1,vidsucursal:'',visinventariado:0,vidheredado:0,visvariable:1,vcantequiv:0,visgravamen:0,vcomision:0,vventa:0,vventaiva:0,vtimv:8,vidvarios:0});
            
            $("#modal-producto").modal('open');
            $("#vcodigo").focus().select(); 

            $("#pmoneda").val($("#monedas").val()).prop('disabled',true).material_select('update');
            $("#pimv").val($(this).parent().parent().data('triforce')['timv']).prop('disabled',true).material_select('update');
        });
     });
 </script>