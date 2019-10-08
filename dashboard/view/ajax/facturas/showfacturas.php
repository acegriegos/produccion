<?php 
$data = 'data-triforce=\'{"vaccion":0,"vid" : 0,"vidfactura" : "?","videntrada" : '.$transaccion[0][2].',"vcantidad" : "'.$transaccion[0][6].'","vprecio" : "'.$transaccion[0][8].'","vdesc" : "'.$transaccion[0][19].'","vtotal" : "'.$transaccion[0][10].'","vidinventario" : "'.$transaccion[0][11].'","timv":"'.$transaccion[0][12].'","vidodt" : 0,"vterminal" : 0,"vimv" : "'.$transaccion[0][13].'","vcomodin" : "'.$transaccion[0][14].'","vidunidad" : "'.$transaccion[0][15].'","vidimpuestos":"'.$transaccion[0][16].'","videxoneracion": "'.$transaccion[0][17].'","viddescuentos":"'.$transaccion[0][18].'","strimp" : "'.$transaccion[0][20].'","exoneracion":"'.$transaccion[0][21].'","vcomision":"0","max": "'.$transaccion[0][22].'","iddesc":"'.$transaccion[0][23].'","vdescuento" : "'.$transaccion[0][24].'","iva":"'.$transaccion[0][25].'","isinventariado" : "'.$transaccion[0][26].'"}\'';

    switch ($transaccion[0][9]) {
        case 2:
        echo '<div class="row col s12"> <div style="padding: 0 !important;" class="col s2"><b>COD PROV</b></div> <div style="padding: 0 !important;" class="col s3"><b>ARTICULO</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>PROD INT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>CANT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>MEDIDA</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>COSTO</b></div> </div>';
            foreach ($transaccion as $obj) { ?>

<div id="fd<?php echo $obj[0]; ?>" <?php echo $data; ?> xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod<?php echo $obj[0]; ?>"><?php echo $obj[3]; ?></div> <div style="padding: 0 !important;" class="col s3" id="desc<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align" id="unitprod<?php echo $obj[0]; ?>"> <input class="browser-default autocomplete eqprod" style="margin:0px;height: auto !important;" /> </div> <div id="divcnt" style="padding: 0 !important;" class="col s1 right-align"> <?php echo $obj[6]; ?> </div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="totl<?php echo $obj[0]; ?>"><?php echo $obj[7]; ?></div> <div style="padding: 0 !important;" class="col s2 right-align" id="tota<?php echo $obj[0]; ?>"><?php echo number_format($obj[8],2); ?></div> <div class="right"> <i id="cs<?php echo $obj[0]; ?>" class="mdi mdi-24px mdi-clipboard-flow pbtn costo"></i> </div> </div>

            <?php }
            break;
        
        default:
            # code...
            break;
    }
 ?>

 <script type="text/javascript">
     $(function(){
        totalizar();
     });
 </script>