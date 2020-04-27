<?php   
    $lista = $transaccion;

    foreach ($lista as $obj) {
        switch ($obj[3]) { 
            case 1: 
                $clr = "lime";
                break;
            case 2: 
                $clr = "yellow";
                break;
            case 3:
                $clr = "red"; 
                break; 
            default: 
                $clr = "blue";
                break;  
        }

    echo '<tr clave="'.$obj[7].'" fact="'.$obj[0].'">
        <td>'.$obj[0].'</td>
        <td>'.$obj[1].'</td>
        <td>'.$obj[6].'</td>
        <td>'.$obj[4].'</td>
        <td>'.$obj[2].'</td>
        <td>'.$obj[8].'</td>
        <td>'.$obj[9].'</td>
        <td>'.$obj[10].'</td>
        <td>'.$obj[11].'</td>
        <td>'.$obj[5].'</td>
        <td style="width: 10%">
             <a class="btn-color pbtn mdi mdi-24px mdi-information-outline status blueh tooltipped" style="color:'.$clr.'" id="e'.$obj[13].'" tv="" title="Ver Estado" data-position="bottom"></a>

            <a class="btn-color pbtn mdi mdi-24px mdi-printer print blueh tooltipped" title="Visualizar" data-position="bottom"></a>';

        if(substr($obj[7], 30,1) != 4){
            echo '<a class="btn-color pbtn mdi mdi-24px mdi-send enviar blueh tooltipped" title="Enviar por Correo" data-position="bottom"></a>';
        }else{
             echo '<a class="btn-color pbtn mdi mdi-24px mdi-send blueh tooltipped" disabled title="Enviar por Correo" data-position="bottom" style="cursor: not-allowed"></a>';
        }      

    echo '</td>
    </tr>';
    }


 ?>