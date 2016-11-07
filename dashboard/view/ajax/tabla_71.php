<div class="card">
    <div class="card-block">
        <h4 class="card-title cta-sh-tit"></h4>
        <div class="card-block sh-cta-card">
            <b>
            <div class="row">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    N° Transacción
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    Fecha
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black; border-right: 1px solid black;">
                    Debe(CRC)
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
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
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    <p class="card-text">
                        <span class="badge numTransacc btn">'.$key[0].'</span>
                    </p>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    '.$key[1].'
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black; border-right: 1px solid black;">
                    '.$key[2].'
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    '.$key[3].'
                </div>
            </div>
            </div>';
                }

                echo '<div class="card-block sh-cta-card"> <div class="row">
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    <b>TOTAL</b>
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;color: white;">
                    a
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black; border-right: 1px solid black;">
                    '.$sumh.'
                </div>
                <div class="col-xs-3 col-sm-3 col-md-3 col-lg-3" align="center" style="border-bottom: 1px solid black;">
                    '.$sumd.'
                </div>
            </div> </div>';
            }
         ?>
        <br>
        <a href="#" class="btn btn-primary">Button</a>
    </div>
</div>