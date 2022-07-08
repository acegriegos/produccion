
<table class="table striped pequeño  bordered highlight centered responsive-table z-depth-3" id="data-table-inventarios" cellspacing="0" width="100%" >
    <thead>
       <tr>
        <td class="white-text blue sinborde hide" style="text-align: center"><b>Código</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Artículo</b></td>
        <td class="white-text blue sinborde" style="text-align: center"><b>CBABYS</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Existencia</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Unidad</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Costo</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Factor</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL1</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>VENTA</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>UTIL2</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>VENTA</b></td>
        <td class="white-text blue sinborde " style="text-align: center"><b>Notas</b></td>
      </tr>
    </thead>
    <tbody>
    <?php 
        $cant = $costo = $venta = $ventaiva = 0;

        foreach ($transaccion as $obj) {
            $cant += $obj[6] > 0 ? $obj[6] : 0;
            $costo += $obj[6] > 0 ? $obj[6]*$obj[12] : 0;
    ?>

    <tr id="<?php echo $obj[13]; ?>" metrica="<?php echo $obj[14]; ?>">
        <td style=" padding: 1px;text-align: left;" class="hide"><?php echo $obj[0] ?></td>
        <td style=" padding: 1px;text-align: left;"><?php echo $obj[2]; ?></td>
        <td style=" padding: 1px;text-align: left;"><input type="text" class="eder browser-default focus6" style="border: 0px;width: 110px" maxlength="13" value="<?php echo $obj[26]; ?>"></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus" style="border: 0px;width: 70px;" value="<?php echo number_format($obj[6],2,'.','') ?>" rval="<?php echo $obj[6] ?>"></td> 
        <td style=" padding: 1px;">
            <select class="browser-default um" style="border: 0px;">
                <?php if($obj[20]){
                    echo '<option value="'.$obj[19].'" selected cnt="'.$obj[21].'">'.$obj[22].'</option>
                          <option value="-1" cnt="1">'.$obj[23].'</option>';
                }else{
                    echo '<option value="'.$obj[19].'" selected cnt="'.$obj[21].'">'.$obj[22].'</option>';
                } ?> 
                 
            </select>
        </td> 
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus1" style="border: 0px" value="<?php echo number_format($obj[12],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus2" style="border: 0px" value="<?php echo number_format($obj[14],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus3" style="border: 0px" value="<?php echo number_format($obj[16],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><span class="venta"><?php echo number_format($obj[24],2,'.',',') ?></span></td>
        <td style=" padding: 1px;text-align: right;"><input type="number" class="eder browser-default focus4" style="border: 0px" value="<?php echo number_format($obj[17],2,'.','') ?>"/></td>
        <td style=" padding: 1px;text-align: right;"><span class="seg"><?php echo number_format($obj[25],2,'.',',') ?></span></td>
        <td style=" padding: 1px;text-align: right;"> <!-- <input type="text" class="eder browser-default focus5" style="border: 0px" value="<?php echo $obj[18]; ?>"/> --> <span class="notasprod" name="<?php echo $obj[2] ?>" tbl="11" row="<?php echo $obj[13]; ?>" style="cursor: pointer;"><?php echo $obj[18] ? $obj[18] : '---'; ?></span> </td>
       
    </tr>

    <?php }
     ?>
     <tr>
         <td colspan="1">
             <b>Totales:</b>
         </td>
         <td style="text-align: right;">
             <?php echo number_format($cant,2); ?>
         </td>
         <td colspan="2" style="text-align: right;">
             <?php echo number_format($costo,2); ?>
         </td>
     </tr>
</tbody>
</table>

<script type="text/javascript" src="../assets/js/modulos/254.js?v=10.4.0.2"></script>