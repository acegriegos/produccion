<?php 

    $lista = '<option value="1">Compra</option> <option value="2">Gasto</option> <option value="3">Gasto No Diferido</option> <option value="4">Bien de Capital</option> <option value="5">Proporcionalidad</option>';
    $color = $titulo = '';
    
    foreach ($transaccion as $obj) {
        $hide = '';
        switch ($obj[5]) {
            case 1:
                $color = 'yellow';  
                break;
            case 2:
                $color = 'yellow';
                break;
            case 3:
                 $color = 'green';
                break;
            default:
                $color = 'red';
                //$hide = 'hide';
                break;
        }
        echo "<tr id='cp".$obj[4]."' tot='".$obj[3]."' imv='".$obj[7]."' gs='".$obj[6]."' cxp='".$obj[9]."'> <td title='Dias Plazo (0 Contado)' class='_cxp' style='width: 2%;'><input type='text' value='".$obj[9]."' class='cxp eder' style='max-width: 20px;'></td> <td title='".$obj[0]."'>".substr($obj[0],0,20)."</td> <td>".$obj[1]."</td>  <td clave='".$obj[10]."' class='clip' style='cursor:pointer;'>".$obj[2]."</td> <td class='eder'>".$obj[8].number_format($obj[3],2)."</td> <td><select class='browser-default tcompra'>".$lista."</select></td> <td class='eder'>".$obj[8]."<span class='gs'>".number_format($obj[6],2)." </span></td> <td class='eder'>".$obj[8]."<span class='imv'>".number_format($obj[7],2)." </span></td> <td style='width: 15%'> <a class='mdi mdi-eye shcompra btn btn-floating ".$color."' style='cursor:pointer;' title='Ver Comprobante'></a> <a href='#' title='Aceptar' class='btn-floating msjh ".$hide."' tipo='5'>A</a> <a href='#' title='Aceptar Parcial' class='btn-floating msjh ".$hide."' tipo='6'>AP</a> <a href='#' title='Rechazar' class='btn-floating msjh' tipo='7'>R</a> <i class='mdi mdi-settings hide' style='cursor:pointer;' title='Opciones Avanzadas'></i> <i style='cursor:pointer'></i> </td> </tr>";
    }

 ?>
<!-- 
 <script type="text/javascript">
    $(function(){
        if($(".per2000").length)
            $("._cxp").removeClass('hide')
    });
 </script> -->