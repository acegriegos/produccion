<?php
if (sizeof($transaccion) > 0) {

if ($transaccion[0][13] == 1) {
foreach ($transaccion as $obj) {
?>
<tr class="button-collapse detalle" data-activates="acciones" id="f<?php echo $obj[12];?>"  tipo ='1' tp="<?php if($obj[7] <= 0) echo 1; else echo 0; ?>">
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[3];?></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[1];?></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[2];?></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[5];?></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[6];?></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[8];?></td>
    <td style=" padding: 5px !important" class="center-align"><span class="<?php echo $obj[7] < 0 ? 'new badge red lighten-2 ' : 'new badge green lighten-2'; ?> " data-badge-caption="" style="font-size: 0.9em; float: none !important;"><?php echo abs($obj[7]); ?></span></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[9];?></td>
</tr>
<?php }
?>
<script type="text/javascript">
$(function(){
permisos(310,311);
})
</script>
<?php }else{
foreach ($transaccion as $obj) {?>
<tr class="button-collapse detalle" data-activates="acciones" id="f<?php echo $obj[12];?>"  tipo ='2' tp="<?php if($obj[7] <= 0) echo 1; else echo 0; ?>">
    <td style=" padding: 5px !important ; color:black !important;" ><?php echo $obj[3];?></td>
    <td style=" padding: 5px !important ; color:black !important;" ><?php echo $obj[4];?></td>
    <td style=" padding: 5px !important ; color:black !important;"  ><?php echo $obj[1];?></td>
    <td style=" padding: 5px !important ; color:black !important;" ><?php echo $obj[5];?></td>
    <td style=" padding: 5px !important ; color:black !important;" ><?php echo $obj[6];?></td>
    <td style=" padding: 5px !important ; color:black !important;" ><?php echo $obj[8];?></td>
    <td style=" padding: 5px !important" class="center-align"><span class="<?php echo $obj[7] < 0 ? 'new badge red lighten-2 ' : 'new badge green lighten-2'; ?> " data-badge-caption="" style="font-size: 0.9em; float: none !important;"><?php echo abs($obj[7]); ?></span></td>
    <td style=" padding: 5px !important ; color:black !important;"><?php echo $obj[9];?></td>
</tr>
<?php } ?>
<?php }
}else{
    echo '<tr>
        <td colspan="8">No Hay Datos Disponibles</td>
    </tr>';
} ?>