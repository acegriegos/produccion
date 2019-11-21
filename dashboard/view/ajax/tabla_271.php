<?php

    $tsuma = [];
    $vista = $_REQUEST['arreglo']['orden'];
    $suma = $_REQUEST['arreglo']['suma'];
    $varray = explode(',', $vista);

    echo '<table class="table responsive-table striped highlight bordered z-depth-3" id="data-table-ventas" cellspacing="0" width="100%" style="background-color: white;"><thead><tr>';
    foreach($varray as $index => $obj) {
        echo '<th>'.strtoupper($transaccion[1][$obj]->name).'</th>';

        if(is_numeric(strpos($suma, ",".$obj.","))){
            $tsuma[$index]['valor'] = 0;
            $tsuma[$index]['nombre'] = $transaccion[1][$obj]->name;
        }
    }
    echo "</tr></thead><tbody>";
    $lastrow = sizeof($varray)-1;
    foreach ($transaccion[0] as $indexk => $obj) {
        echo '<tr>';
          foreach ($varray as $indexj => $data) {
            $rvalor = $transaccion[0][$indexk][$data];

            if(is_numeric(strpos($suma, ",".$data.","))){
              $tsuma[$indexj]['valor'] += $rvalor;
            }
            
            $rvalor = is_numeric($rvalor) ? number_format($rvalor,2,'.','') : $rvalor;
            echo '<td>'.strtoupper($rvalor).'</td>';

            if ($indexk == $lastrow) {
              
              if(isset($tsuma[$indexj])){
                echo strtoupper(number_format($tsuma[$indexj]['valor'],2,".","")); 
              }
            }
          }
          echo "</tr>";
        }

    echo '</tbody></table>'
?>