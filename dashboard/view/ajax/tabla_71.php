<div class="card">
    <div class="card-block z-depth-5">
        <h4 class="card-title cta-sh-tit blue-text" align="center" style="font-size: 1.2em; margin: 0; padding: 1%; padding-bottom: 1.5%"></h4>
        <table class="bordered striped highlight centered">
        <thead class="blue">
            <tr>
                <td class="truncate white-text" align="center" style="font-size: 1.2em;text-align: center;">N° Transacción</td>
                <td class="white-text" align="center" style="font-size: 1.2em;text-align: center;">Fecha</td>
                <td class="white-text" align="center" style="font-size: 1.2em;text-align: right;">Debe(CRC)</td>
                <td class="white-text" align="center" style="font-size: 1.2em;text-align: right;">Debe(CRC)</td>
            </tr>
        </thead>
        <tbody style="padding: 2%;max-height: 500px; overflow-y: scroll">
            
<?php
$pagination = ''; 
if(sizeof($transaccion) <> 0){
    $sumd = 0;
    $sumh = 0;
    $num = 0;
    $pg = 1;
    

    foreach ($transaccion as $key) {
        $sumh += $key[2];
        $sumd += $key[3];
        if($num == 6){
            $pg ++;
            $num = 0;
            $pagination .= '<li class="pgli waves-effect"><a href="#!" class="pgbtn">'.$pg.'</a></li>';
        } 
            
         
        echo '<tr class="row pg'.$pg.' pg">

            <td align="center" style="font-size: 1.2em;">    
                <a href="#" class="button-collapse dettran" data-activates="transacciones">'.$key[0].'</a>
            </td>
            <td align="center" style="font-size: 1.2em;text-align:center;">
                '.$key[1].'
            </td>
            <td align="right" style="font-size: 1.2em;text-align: right;">
                '.number_format($key[2],2).'
            </td>
            <td align="right" style="font-size: 1.2em;text-align: right;">
                '.number_format($key[3],2).'
            </td>
        </tr>';

        $num ++;
    }   
?>

</tbody>

<?php 
echo '<tfoot>
    <tr>
        <td></td>
        <td align="center" style="font-size: 1.2em;">
            <b>TOTAL</b>
        </td>
        <td align="right" style="font-size: 1.2em; text-align: right;">
            '.number_format($sumh,2).'
        </td>
        <td align="right" style="font-size: 1.2em; text-align: right;">
            '.number_format($sumd,2).'
        </td>
    </tr>
</tfoot>';
 }//else{
//     $pagination = '<li class="pgli waves-effect"><a href="#!" class="pgbtn">0</a></li>';
// }
?>

        </table>
    <ul class="pagination center">
        <li class="disabled pletf"><a href="#!"><i class="mdi mdi-chevron-left"></i></a></li>
        <li class="pgli active"><a href="#!" class="pgbtn">1</a></li>
        <?php echo $pagination; ?>
        <li class="waves-effect pright"><a href="#!"><i class="mdi mdi-chevron-right"></i></a></li>
    </ul>
    </div>

<br>
</div>


<script type="text/javascript">
    $(function(){
        $(".pg").hide();
        $(".pg1").show();

        $(".pgbtn").click(function(){
            $(".pg").hide();
            $(".pgli").removeClass('active');
            $(this).parent().addClass('active');
            $(".pg"+$(this).html()).show();
        });
    });
</script>