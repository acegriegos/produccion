<?php 
    header("Content-Type: Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet; charset=utf-8");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: private",false);
    ini_set("memory_limit", -1);

    $tsuma = [];
    //<img src="'.$miscelaneos[3].'" style="width:200px !important;height:152px !important;"/>
    $archivo = '<table width="100%"><tr><td align="center" colspan="10"><font size="3">
            <span style="font-size:48px"><b>'.$tit.'</b></span>
            <br>
             <b><span id="fnombre">'.$miscelaneos[0].'</span></b><br>';
              if ($miscelaneos[2]) 
                 $archivo .= '<b><span id="fnombre">'.$miscelaneos[2].'</span></b><br>';
              
    $archivo .= '<b>Cédula:</b> <span id="fcedula">'.$miscelaneos[1].'</span><br>
          <b>Teléfono:</b> <span id="ftelefono">'.$miscelaneos[5].'</span>
          </font></td></tr>';
    if($tit2)      
      $archivo .= '<tr><td></td></tr><tr><td></td></tr>
          <tr><td align="center" style="font-size:24px"><b>'.$tit2.'</b></td></tr>
          <tr><td></td></tr><tr><td></td></tr></table>';
    else
       $archivo .= '<tr><td></td></tr><tr><td></td></tr></table>';
    $archivo .= "<table><thead><tr>";
    foreach ($transaccion[1] as $index => $obj) {

      if(!is_numeric(strpos($omitir, ",".$index.",")))
        $archivo .= '<td><b>'.strtoupper($obj->name).'</b></td>';

      if($suma != '' && is_numeric(strpos($suma, ",".$index.","))){
        $tsuma[$index]['valor'] = 0;
        $tsuma[$index]['nombre'] = $obj->name;
      }
    }
    $archivo .= "</tr></thead>";

    $archivo .= "<tbody>";
    foreach ($transaccion[0] as $obj) {
      $archivo .= "<tr>";
      foreach ($obj as $indexj => $data) {
        if($suma != '' && is_numeric(strpos($suma, ",".$indexj.","))){
          $tsuma[$indexj]['valor'] += $data;
        }
        
        if(!is_numeric(strpos($omitir, ",".$indexj.","))){
          $data = is_numeric($data) ? number_format($data,2,',','.') : $data;
          $archivo .= '<td style="max-width:100%;white-space:nowrap;">'.$data.'</td>';
        }
      }
      $archivo .= "</tr>";
    }
    
    $archivo .= "</tbody>";

    $archivo .= '</table>';

    /*if ($conteo) {
      $archivo .= '<table><tr><td colspan="2"></td></tr><tr><td><b>Cantidad:</b></td><td>'.sizeof($transaccion[1]).'</td></tr></table>';
    } */

    if (sizeof($tsuma)) {
      $archivo .= '<table><tr><td colspan="2"><b>TOTALES</b></td></tr>';
      foreach ($tsuma as $aindex => $areglo) {
        $archivo .= '<tr><td><b>'.strtoupper($areglo['nombre']).': </b></td><td> '.number_format($areglo['valor'],2,",",".").'</td></tr>';
      }
      $archivo .= '<table>';
    }

    if($save)
      file_put_contents("../assets/excel/".$arch.".xls", "\xEF\xBB\xBF".$archivo);
    else{
      header("Content-Disposition: attachment; filename=\"".$arch.".xls\"");
      echo "\xEF\xBB\xBF";
      print_r($archivo);
    }
 ?>