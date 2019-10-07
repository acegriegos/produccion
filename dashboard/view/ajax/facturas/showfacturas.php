<?php 
    switch ($transaccion[0][9]) {
        case 2:
        echo '<div class="row col s12"> <div style="padding: 0 !important;" class="col s2"><b>COD PROV</b></div> <div style="padding: 0 !important;" class="col s3"><b>ARTICULO</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>PROD INT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>CANT</b></div> <div style="padding: 0 !important;" class="col s1 center"><b>MEDIDA</b></div> <div style="padding: 0 !important;" class="col s2 center"><b>COSTO</b></div> </div>';
            foreach ($transaccion as $obj) { ?>

<div id="fd<?php echo $obj[0]; ?>" rpago xtr="<?php echo $obj[1]; ?>" idprod="<?php echo $obj[2]; ?>" class="ciclos row col s12"> <div class="col s1 hide"><input type="checkbox" id="check<?php echo $obj[0]; ?>" checked><label for="check<?php echo $obj[0]; ?>"></label></div> <div style="padding: 0 !important;" class="col s2" id="codprod<?php echo $obj[0]; ?>"><?php echo $obj[3]; ?></div> <div style="padding: 0 !important;" class="col s3" id="desc<?php echo $obj[0]; ?>"><?php echo $obj[4]; ?></div> <div style="padding: 0 !important;" class="col s2 center-align" id="unitprod<?php echo $obj[0]; ?>"> <input class="browser-default autocomplete eqprod" style="margin:0px;" /> </div> <div id="divcnt" style="padding: 0 !important;" class="col s1 right-align"> <?php echo $obj[6]; ?> </div> <div style="padding: 0 !important;" class="col s1 center-align totp divisa" id="tota<?php echo $obj[0]; ?>"><?php echo $obj[7]; ?></div> <div style="padding: 0 !important;" class="col s2 right-align" id="tota<?php echo $obj[0]; ?>"><?php echo number_format($obj[8],2); ?></div> <div class="right"> <i id="cs<?php echo $obj[0]; ?>" class="mdi mdi-24px mdi-clipboard-flow pbtn costo"></i> </div> </div>

            <?php }
            break;
        
        default:
            # code...
            break;
    }
 ?>