<?php 
    if(!is_array($transaccion)){
        echo '<tr><td colspan="4" class="center">No Hay Datos</td></tr>';
        exit(0);
    }
    if(!sizeof($transaccion)){
        echo '<tr><td colspan="4" class="center">No Hay Datos</td></tr>';
        exit(0);
    }

    switch ($transaccion[0][0]) {
        case 1:
            echo '<tbody>
                  <tr>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Tipo</b></td>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Total Mercancias</b></td>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Total Servicios</b></td>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Notas Débito</b></td>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Notas Crédito</b></td>
                    <td class="white-text blue sinborde" style="text-align: center"><b>Total a Declarar</b></td>
                  </tr>
                  </tbody>';
            $idf = 0;
            foreach ($transaccion as $obj){

                if($idf != $obj[1]){
                    $idf = $obj[1];
                    echo '<tr> <td colspan="3" style="text-align: left;"><b>'.$obj[2].'</b>, '.$obj[3].'</td> <td colspan="3" style="text-align: left;"><b>TEL:</b> '.$obj[7].'</td> <tr>';
                }
        ?>

            <tr>
                <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[4]; ?></td>
                <td style="border-radius: 0px !important; text-align: right;"><?php echo number_format($obj[5],2,'.',''); ?></td>
                <td style="border-radius: 0px !important; text-align: right;"><?php echo number_format($obj[6],2,'.',''); ?></td>
                <td style="border-radius: 0px !important; text-align: right;"><?php echo number_format($obj[8]+$obj[10],2,'.',''); ?></td>
                <td style="border-radius: 0px !important; text-align: right;"><?php echo number_format($obj[9]+$obj[11],2,'.',''); ?></td>
                <td style="border-radius: 0px !important; text-align: right;"><?php echo number_format($obj[5]+$obj[6]+$obj[8]+$obj[10]-$obj[9]-$obj[11],2,'.',''); ?></td>
            </tr>

            <?php    }  ?>
            <!-- <tr class="hide"><td colspan="5" id="leyend"><?php echo $transaccion[0][5]; ?></td></tr>
             <script type="text/javascript">
                 $(function(){
                    $("#leyenda").html($("#leyend").html())

                });
             </script> -->
<?php 
            break;
        
        default:
            break;
}   