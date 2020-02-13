<?php

    $tsuma = [];
    $vista = $_REQUEST['arreglo']['orden'];
    $suma = $_REQUEST['arreglo']['suma'];
    $align = isset($_REQUEST['arreglo']['align']) ? $_REQUEST['arreglo']['align'] : '' ;
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
    $lastrow = sizeof($transaccion[0])-1;
    $cnt = 0;
    $ufila = '';
    foreach ($transaccion[0] as $indexk => $obj) {
        echo '<tr>';
          foreach ($varray as $indexj => $data) {
            $rvalor = $transaccion[0][$indexk][$data];

            if(is_numeric(strpos($suma, ",".$data.","))){
              if(is_numeric($rvalor))
                $tsuma[$indexj]['valor'] += $rvalor;
            }
               
            $salign = '';
            $pr = '';
            if(is_numeric($rvalor)){
                $salign = 'right';
                $rvalor = number_format($rvalor,2,'.',',');
            }else{
                if(is_numeric(strpos($align, ",".$data."-"))){
                  $pr = substr($align, strpos($align, ",".$data."-")+2+strlen($data),1);
                  switch ($pr) {
                      case 'R':
                          $salign = 'right';
                          break;
                      case 'L':
                          $salign = 'left';
                          break;
                      default:
                          $salign = 'center';
                          break;
                  }
                }
            }
            echo '<td style="text-align: '.$salign.'" >'.strtoupper($rvalor).'</td>';

            if($indexk == $lastrow && sizeof($tsuma)){
                if($indexj == 0)
                    $ufila = '<tr> <td><b>TOTAL CRC:</b></td>';
                else{
                    if(isset($tsuma[$indexj]['valor'])){
                        $sval = 0;

                        if(is_numeric($tsuma[$indexj]['valor']))
                            $sval = number_format($tsuma[$indexj]['valor'],2,'.',',');

                        $ufila .= '<td style="text-align: right;">'.$sval.'</td>';
                    }
                    else
                        $ufila .= '<td></td>';
                }
            }
          }
          echo "</tr>";
    }
    
    if($ufila != '')
        echo $ufila.'</tr>';

    echo '</tbody></table>';

?>