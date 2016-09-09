<?php

foreach ($transaccion as $obj) {
	echo ' <li class="list-group-item" style="cursor: pointer;">
              <div class="row">
                <div class="col-md-4 col-lg-4">
                    '.$obj[0].'
                </div>
                <div class="col-md-4 col-lg-4" align="center">
                    '.$obj[1].'
                </div>
                <div class="col-md-4 col-lg-4" align="right">
                    '.$obj[2].'
                </div>
              </div>
            </li>';
}

?>

