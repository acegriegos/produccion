<?php
    foreach ($transaccion as $obj) {
        echo '<tr>
            <td style="text-align: center">'.$obj[0].'</td>
            <td style="text-align: center">'.$obj[1].'</td>
            <td style="text-align: center">'.$obj[2].'</td>
            <td style="text-align: center">'.$obj[3].'</td>
            <td style="text-align: center">'.$obj[4].'</td>
            <td style="text-align: center">'.$obj[5].'</td>
            <td style="text-align: center">'.$obj[6].'</td>
            <td style="text-align: center">'.$obj[7].'</td>
            <td style="text-align: center">'.$obj[8].'</td>
        </tr>';
?>
<?php } ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>