<div class="card">
    <div class="card-block">
        <h4 class="card-title grey white-text cta-sh-tit" align="center" style="font-size: 1.2em; margin: 0;"></h4>
        <div class="card-block sh-cta-card">
            <div class="row">
                <div class="col s2 m3 truncate" align="center" style="font-size: 1.2em;">
                    N° Transacción
                </div>
                <div class="col s4 m3" align="center" style="font-size: 1.2em;">
                    Fecha
                </div>
                <div class="col s3 truncate" align="center" style="font-size: 1.2em;">
                    Debe(CRC)
                </div>
                <div class="col s3 truncate" align="center" style="font-size: 1.2em;">
                    Haber(CRC)
                </div>
            </div>
        </b>
    </div>
    <?php 
    if(sizeof($transaccion) <> 0){
        $sumd = 0;
        $sumh = 0;

        foreach ($transaccion as $key) {
            $sumh += $key[2];
            $sumd += $key[3];
            echo '<div class="card-block sh-cta-card">
            <div class="row">

                <div class="col s2 m3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;
">
                        

                    <div class="chip">
                       <a href="#" class="button-collapse" data-activates="transacciones">'.$key[0].'</a>
                    </div>
                </div>
                <div class="col s4 m3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;
 ">
                    '.$key[1].'
                </div>
                <div class="col s3" align="center" style="border-bottom: 1px solid black; border-right: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;
">
                    '.$key[2].'
                </div>
                <div class="col s3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0;  height: 1.9em;">
                    '.$key[3].'
                </div>
            </div>
        </div>';
    }

    echo '<div class="card-block sh-cta-card"> <div class="row">
    <div class="col s3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;">
        <b>TOTAL</b>
    </div>
    <div class="col s3" align="center" style="border-bottom: 1px solid black;color: white; font-size: 1.2em; margin: 0; height: 1.9em;">
        a
    </div>
    <div class="col s3" align="center" style="border-bottom: 1px solid black; border-right: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;">
        '.$sumh.'
    </div>
    <div class="col s3" align="center" style="border-bottom: 1px solid black; font-size: 1.2em; margin: 0; height: 1.9em;">
        '.$sumd.'
    </div>
</div> </div>';
}
?>
<br>
</div>

<!--   <a href="#" data-activates="transacciones" class="button-collapse"><i class="material-icons">menu</i></a>
 -->        
</div>

<script type="text/javascript">
    $(function(){
        $('.button-collapse').sideNav({
                menuWidth: 600,
                edge: 'left', // Choose the horizontal origin
                closeOnClick: true// Closes side-nav on <a> clicks, useful for Angular/Meteor
            }
        );
    })
</script>