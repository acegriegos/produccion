<?php
    foreach ($transaccion as $obj) {
        $cfact = '';    
        if($obj[0] != '')
          $cfact = 'detextra';
        echo '<tr>
            <td style="text-align: center">'.$obj[9].'</td>
            <td class="'.$cfact.'" fila="'.$obj[10].'" tabla="64"  data-activates="extra" style="text-align: center;cursor: pointer">'.$obj[0].'</td>
            <td style="text-align: center">'.$obj[1].'</td>
            <td style="text-align: center">'.$obj[2].'</td>
            <td style="text-align: center">'.$obj[3].'</td>
            <td style="text-align: right">'.$obj[4].'</td>
            <td style="text-align: right">'.$obj[5].'</td>
            <td style="text-align: right">'.$obj[6].'</td>
            <td style="text-align: right">'.$obj[7].'</td>
            <td style="text-align: right">'.$obj[8].'</td>
        </tr>';
?>
<?php } ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>