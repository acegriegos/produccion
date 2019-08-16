<?php
$omitir =  $_REQUEST['arreglo']['omit'];
$acciones =  $_REQUEST['arreglo']['acc'];

if ($_REQUEST['arreglo']['header']) { 
    $head = $transaccion[1];
    $body = $transaccion[0];
?>
    <thead id="cabecera<?php echo $_REQUEST['arreglo']['modulo']; ?>">
        <tr>
        <?php  foreach ($head as $ihd => $hd) {
            if (strpos($omitir, ','.$ihd.',') !==  false) {?>
                <th><?php echo $hd->name ?></th>
            <?php }
        } ?>
        <?php if ($acciones != 0) {?>
            <th>Acciones</th>
        <?php } ?>
        </tr>
    </thead>
    <tbody id="lista<?php echo $_REQUEST['arreglo']['modulo']; ?>">
       <?php 
       if ($acciones != 0) {
           $acc = explode(',', $acciones);
           $stracc = '';
           foreach ($acc as $obj) {
                switch ($obj) {
                    case 3:
                        $stracc .= '<a href="#" class="delete mdi mdi-close mdi-24px pbtn" modulo="'.substr($_REQUEST['arreglo']['modulo'], 0, strlen($_REQUEST['arreglo']['modulo']-1)).'" id="d~" style="color:black"></a>';
                        break;
                    
                    default:
                        break;
                }
           }
        }
       foreach ($body as $by){ 
        echo "<tr>";
        foreach ($by as $iby => $value) {
            if (strpos($omitir, ','.$iby.',') !==  false) {?>
                <td><?php echo $value ?></td>
        <?php } } if($stracc != '') { ?>
            <td><?php echo str_replace('~', $by[0], $stracc); ?></td>
        <?php } echo "</tr>";
        }?>
    </tbody>
<?php }else{ ?>
    
<?php } ?>    