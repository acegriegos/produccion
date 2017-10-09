<div class="card">
    <div class="card-block z-depth-5" style="padding: 2%;">
        <h4 class="card-title cta-sh-tit blue-text" align="center" style="font-size: 1.2em; margin: 0; padding: 1%; padding-bottom: 1.5%"></h4>
        <table class="bordered striped highlight centered">
        <thead class="blue">
            <tr>
                <td class="truncate white-text" align="center" style="font-size: 1.2em;">
                    N° Transacción
                </td>
                <td class="white-text" align="center" style="font-size: 1.2em;">
                    Fecha
                </td>
                <td class="truncate white-text" align="center" style="font-size: 1.2em;">
                    Debe(CRC)
                </td>
                <td class="truncate white-text" align="center" style="font-size: 1.2em;">
                    Haber(CRC)
                </td>
            </tr>
        </thead>
        <tbody>
            
<?php 
if(sizeof($transaccion) <> 0){
    $sumd = 0;
    $sumh = 0;

    foreach ($transaccion as $key) {
        $sumh += $key[2];
        $sumd += $key[3];
        echo '<tr class="row">

    <td align="center" style="font-size: 1.2em;">    
        <a href="#" class="button-collapse dettran" data-activates="transacciones">'.$key[0].'</a>
    </td>
    <td align="center" style="font-size: 1.2em;">
        '.$key[1].'
    </td>
    <td align="center" style="font-size: 1.2em;">
        '.number_format($key[2],2).'
    </td>
    <td align="center" style="font-size: 1.2em;">
        '.number_format($key[3],2).'
    </td>
</tr>';
}
?>

</tbody>

<?php 
echo '
<tfoot>
    <tr>
        <td align="center" style="color: white; font-size: 1.2em;">
            a
        </td>
        <td align="center" style="font-size: 1.2em;">
            <b>TOTAL</b>
        </td>
        <td align="center" style="font-size: 1.2em;">
            '.number_format($sumh,2).'
        </td>
        <td align="center" style="font-size: 1.2em;">
            '.number_format($sumd,2).'
        </td>
    </tr>
</tfoot>';
}
?>

        </table>
    </div>

<br>
</div>

<!--   <a href="#" data-activates="transacciones" class="button-collapse"><i class="material-icons">menu</i></a>
 -->  
