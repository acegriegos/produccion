<?php
    if(!is_array($transaccion))
        exit(0);
    switch ($transaccion[0][9]) {
        case 2:
        
        echo '<div class="row col s12"> <div style="padding: 0 !important;" class="col s2"><b>ARTICULO</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>PROD INT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>COSTO_CMP</b></div> <div class="col s1 center"><b>RELACION</b></div> <div class="col s1 center"><b>EXISTENCIA</b></div> <div class="col s1 center"><b>CANT</b></div> <div class="col s1 center"><b>COSTO</b></div> <div class="col s1 center"><b>ADICIONAL</b></div>  <div class="col s1 center"><b>UTILIDAD</b></div> <div class="col s1 center"><b>VENTA</b></div> <div class="col s1 center"><b>VENTA+IVA</b></div></div>';
        $tlineas = $tprods = 0;
            foreach ($transaccion as $obj) { 
                $tlineas++;
                $tprods += $obj[6];
                ?>
<?php  

        $data = 'data-triforce=\'{"vaccion":0,"vid" : 0,"vidfactura" : "'.$obj[28].'","videntrada" : '.$obj[2].',"vcantidad" : "'.$obj[6].'","vprecio" : "'.$obj[8].'","original" : "'.$obj[8].'","vdesc" : "'.$obj[19].'","vtotal" : "'.$obj[10].'","vidinventario" : "'.$obj[11].'","timv":"'.$obj[12].'","vidodt" : 0,"vterminal" : 0,"vimv" : "'.$obj[13].'","vcomodin" : "'.$obj[14].'","vidunidad" : "'.$obj[15].'","vidimpuestos":"'.$obj[16].'","videxoneracion": "'.$obj[17].'","viddescuentos":"'.$obj[18].'","strimp" : "'.$obj[20].'","exoneracion":"'.$obj[21].'","vcomision":"0","max": "'.$obj[22].'","iddesc":"'.$obj[23].'","vdescuento" : "'.$obj[24].'","iva":"'.$obj[25].'","isinventariado" : "'.$obj[26].'","vcodigo" : "'.$obj[3].'","longitud" : "'.$obj[29].'","teu" : "1","tcu" : "1","rcant" : "0","requiv":"0","cabys" : "'.$obj[31].'","ocant" : "'.$obj[6].'"}\'';

        $heqprod = $obj[27] == '' ? '' : 'hide';
        $unidad = floor($obj[6]) != $obj[6] ? number_format($obj[6],1) : number_format($obj[6],0); 
?>

<div id="fd<?php echo $obj[0]; ?>" vid="<?php echo $obj[34] ?>" <?php echo $data; ?> xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2"><?php echo $unidad.'x<span id="desc'.$obj[0].'">'.$obj[4].'</span>'; ?></div> 
<div style="padding: 0 !important;position: relative;" class="col s1 center-align" id="unitprod<?php echo $obj[0]; ?>"> <input class="browser-default autocomplete eqprod" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo $obj[27]; ?>" /> <i class="mdi mdi-plus der pbtn addProducto <?php echo $heqprod; ?>" style="position: absolute;" title="Agregar Articulo"></i> </div> 
<div style="padding: 0 !important;" class="col s1 right-align divcnt hide"> <?php echo $unidad; ?></div> 
<div style="padding: 0 !important;" class="col s1 right-align int_total" id="total<?php echo $obj[0]; ?>"><?php echo number_format($obj[8],2); ?></div> <div class="right"> <i id="cs<?php echo $obj[0]; ?>" class="mdi mdi-24px mdi-clipboard-flow pbtn costo hide" iscambiado="0" title="Cambiar Márgenes"></i> </div>  
<div class="col s1"> <small tipo="1" class="apl_costo hide" style="cursor: pointer; border: 1px solid green; border-radius: 50px; color:white; background-color:  green;position: absolute;"> APL </small> <input type="text" class="browser-default int_rel eder" style="width:100%; height: auto !important; border: none;" value="<?php echo $obj[32]; ?>"></div> 
<div class="col s1"> <input type="text" class="browser-default int_exi numeric eder" style="width:100%; height: auto !important; border: none;" value="<?php echo $obj[33]; ?>"></div> 
<div class="col s1"> <input type="text" class="browser-default int_cnt numeric eder" style="width:100%; height: auto !important; border: none;" value="<?php echo $unidad; ?>"></div> 
<div class="col s1 info_costo tooltipped" data-position="button" data-tooltip="" style="text-align:right">
    <small> <a tipo="0" class="preponderado" style="cursor: pointer; border: 1px solid #e2e2e2; border-radius: 50px; color:grey;">PRE</a> </small>  
    <span class="int_variable"></span>
    <span class="int_costo"></span> </div> 
<div class="col s1"> 
    <small> <a tipo="0" class="adicional" style="cursor: pointer; border: 1px solid #e2e2e2; border-radius: 50px; color:grey;position: absolute;">SUM</a> </small>
    <input type="text" class="browser-default int_adic eder" style="width:100%; height: auto !important; border: none;" value="0"> </div>
<div class="col s1"><input type="text" class="browser-default int_utl numeric eder" style="width:100%; height: auto !important; border: none;" value="0"></div> 
<div class="col s1"><input type="text" class="browser-default int_venta numeric eder" style="width:100%; height: auto !important; border: none;" value="0"></div> <div class="col s1"> <input type="text" class="browser-default int_ventaiva numeric eder" style="width:100%; height: auto !important; border: none;" value="0"> <i class="mdi hide mdi-clipboard-list pbtn cargarReferencias" vid="<?php echo $obj[2]; ?>" style="position: absolute;" title="Cargar Referencias"></i> </div> </div>

            <?php }
            break;
        
        default:
            $data = 'data-triforce=\'{"vaccion":0,"vid" : 0,"vidfactura" : "'.$obj[28].'","videntrada" : '.$obj[2].',"vcantidad" : "'.$obj[6].'","vprecio" : "'.$obj[8].'","vdesc" : "'.$obj[19].'","vtotal" : "'.$obj[10].'","vidinventario" : "'.$obj[11].'","timv":"'.$obj[12].'","vidodt" : 0,"vterminal" : 0,"vimv" : "'.$obj[13].'","vcomodin" : "'.$obj[14].'","vidunidad" : "'.$obj[15].'","vidimpuestos":"'.$obj[16].'","videxoneracion": "'.$obj[17].'","viddescuentos":"'.$obj[18].'","strimp" : "'.$obj[20].'","exoneracion":"'.$obj[21].'","vcomision":"0","max": "'.$obj[22].'","iddesc":"'.$obj[23].'","vdescuento" : "'.$obj[24].'","iva":"'.$obj[25].'","isinventariado" : "'.$obj[26].'"}\'';
        $unit = '';
            ?>
<div id="fd<?php echo $obj[0]; ?>" xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod<?php echo $obj[0]; ?>"><?php echo $obj[3]; ?></div> <div style="padding: 0 !important;" class="col s3 center-align" id="desc<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align divisa hide" id="prec<?php echo $obj[0]; ?>"><?php echo $obj[5]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align divisa" id="fake<?php echo $obj[0]; ?>">0.00</div> <div style="padding: 0 !important;" class="col s1 center-align" id="unitprod<?php echo $obj[0]; ?>"><select class="browser-default pbtn" style="padding: 0;margin: 0;height:auto !important;width:100%;border:0;outline-color: black;"><?php echo $unit; ?></select></div> <div id="divcnt" style="padding: 0 !important;" class="col s1 center-align">  <input type="number" class="browser-default eder" id="cant<?php echo $obj[0]; ?>" value="<?php echo $obj[6]; ?>" style="border:0px;width:100%;height:auto !important" /></div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota<?php echo $obj[0]; ?>"><?php echo $obj[7]; ?></div> <div class="right">  <a href="#modal-edit" id="edit<?php echo $obj[0]; ?>" visible="0" class="mdi mdi-pencil modal-trigger pbtn black-text fedit" style="padding:0"></a><a href="#" id="del<?php echo $obj[0]; ?>" style="color: #D9534F" title="Eliminar Fila" class="mdi mdi-close pbtn black-text delf" style="padding:0"></a> <span id="mdesc<?php echo $obj[0]; ?>"></span> </div> </div>

 <input type="hidden" id="totales" lineas="<?php echo $tlineas ?>" productos="<?php echo $tprods ?>">

<?php
    break;
    case 3:
        echo '<div class="row col s12"> <div style="padding: 0 !important;" class="col s3"><b>ARTICULO</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>COSTO COMPRA</b></div> <div class="col s1 center"><b>EXISTENCIA</b></div> <div class="col s1 center"><b>CANT</b></div> <div class="col s1 center"><b>COSTO</b></div> <div class="col s1 center"><b>ADICIONAL</b></div>  <div class="col s1 center"><b>UTILIDAD</b></div> <div class="col s1 center"><b>VENTA</b></div> <div class="col s1 center"><b>VENTA+IVA</b></div></div>';
        foreach ($transaccion as $obj) { 
        ?>
        <div id="fd<?php echo $obj[0]; ?>" idprod="<?php echo $obj[11]; ?>" class="ciclos row col s12" iva="<?php echo $obj[25]; ?>" cabys="<?php echo $obj[29]; ?>" inventario="<?php echo $obj[30]; ?>" is_comodin="<?php echo $obj[31]; ?>"> 

         <div style="padding: 0 !important;border-bottom: 1px dashed;position: relative;padding-left: 20px !important;" class="col s3 left-align"> 
            <i class="mdi mdi-note-text pbtn notasprod" name="<?php echo $obj[1] ?>" tbl="11" row="<?php echo $obj[11]; ?>" title="Click para Ver Notas" style="position: absolute; left: 0;"></i>

            <i class="mdi mdi-arrow-expand-horizontal pbtn cambiar_producto" vid="<?php echo $obj[28] ?>" title="Click para Cambiar Producto" style="position: absolute; right: 0;"></i>

            <span title="Click para Ver Referencias" class="pbtn cargarReferencias" vid="<?php echo $obj[11]; ?>"> <?php echo $obj[1]; ?> </span>         
        </div>
          
         <div style="padding: 0 !important;" class="col s2 right-align int_oc_costo" vid="<?php echo $obj[2]; ?>"> <?php echo number_format($obj[2],2); ?></div>

         <div style="padding: 0 !important;" class="col s1 right-align int_oc_exi prod_movs button-collapse pbtn" title="Click para Ver Movimientos" data-activates="slide-movprod" vidprod="<?php echo $obj[11]; ?>" vid="<?php echo $obj[13]; ?>"> <?php echo $obj[3]; ?></div>

         <div style="padding: 0 !important;" class="col s1 right-align">  
            <input class="browser-default autocomplete int_oc_cant eder" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[4],2); ?>" idu="<?php echo $obj[27]; ?>"/>
        </div>

        <?php 
            $color = 'green-text';
            $flecha = 'mdi-arrow-up';

            if($obj[5] > $obj[2]){
                $flecha = 'mdi-arrow-down';
            }elseif ($obj[5] < $obj[2]) {
                $color = 'red-text';
            }else{
                $flecha = 'mdi-equal';
            }

            $variable = '<i class="mdi '.$flecha.' '.$color.'"></i>';
         ?>

         <div class="col s1 info_costo tooltipped" data-position="button" data-tooltip="Costo Anterior: <?php echo number_format($obj[5],2) ?>" style="text-align:right;padding: 0;position: relative;">
            <small> <a tipo="0" class="preponderado" style="cursor: pointer; border: 1px solid #e2e2e2; border-radius: 50px; color:grey;position: absolute; left: 0;">PRE</a> </small>  
            <span class="int_oc_variable"><?php echo $variable; ?></span>
            <span class="int_oc_costo_orig <?php echo $color ?>" vid="<?php echo $obj[5] ?>"> <?php echo number_format($obj[2],2) ?> </span> </div> 

        <div style="padding: 0 !important;position: relative;" class="col s1 right-align">  
            <input class="browser-default autocomplete int_oc_adic eder numeric" style="margin:0px;height: auto !important;font-size: 12px" value="0" />
            <i style="position: absolute;left: 0;" class="mdi mdi-plus blue-text oc_adic_tipo" vid="1" title="Cantidad Entera"></i>
        </div>

         <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_utl oc_financiero eder numeric" vfin="1" vtipo="0" o="<?php echo $obj[6] ?>" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format(round($obj[6],2),2); ?>" />
        </div>

        <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_venta oc_financiero eder numeric" vfin="2" vtipo="0" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[7],2); ?>" />
        </div>

        <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_venta_iva oc_financiero eder numeric" vfin="3" vtipo="0" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[8],2); ?>" />
        </div>  
          
         <?php 
            if($obj[15] > 1){ ?>

                <div class="col s12 row dim_row" vid="<?php echo $obj[16] ?>" idu="<?php echo $obj[18] ?>" unidad="<?php echo $obj[17] ?>" razon="<?php echo $obj[26] ?>" style="padding: 0;">
                    
                    <div style="padding: 0 !important;" class="col s3 left-align"></div>

                    <div style="padding: 0 !important;" class="col s2 right-align int_oc_dim_rcosto"> <?php echo number_format($obj[2]/$obj[26],2) ?> </div>

                    <div style="padding: 0 !important;" class="col s1 right-align"> <?php echo $obj[19]; ?></div>

                    <div style="padding: 0 !important;" class="col s1 right-align">  
                        <input class="browser-default autocomplete int_oc_dim_cant eder" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[20],2); ?>" />
                    </div>

                    <div class="col s1 tooltipped" data-position="button" data-tooltip="" style="text-align:right;padding: 0;">
                    
                        <span class="int_oc_dim_costo" vid="<?php echo $obj[21] ?>" valor="<?php echo $obj[26] ?>"> <?php echo number_format($obj[21],2) ?> </span> 
                    </div> 

                    <div style="padding: 0 !important;" class="col s1">  
                    </div>

                     <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_dim_utl eder oc_financiero" vtipo="1" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[22],2); ?>" />
                    </div>

                    <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_dim_venta oc_financiero eder" vfin="2" vtipo="1" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[23],2); ?>" />
                    </div>

                    <div style="padding: 0 !important;" class="col s1 right-align">  <input class="browser-default autocomplete int_oc_venta_dim_iva oc_financiero eder" vfin="3" vtipo="1" style="margin:0px;height: auto !important;font-size: 12px" value="<?php echo number_format($obj[24],2); ?>" />
                    </div>

                </div>

        <?php  
            }
        ?>

        </div>
<?php
    }
    break;
    }
 ?>