<?php 
    
    foreach ($transaccion as $obj) {
?>
    <tr>
        <td style=" padding: 10px;"><?php echo $obj[1] ?></td>
        <td style=" padding: 10px;"><?php echo $obj[2] ?></td>
        <td style=" padding: 10px;"><?php echo $obj[3] ?></td>
        <td style=" padding: 10px;"><?php echo $obj[4] ?></td>
        <td style=" padding: 10px;">
            <a class="btn-color pbtn load" id="m<?php echo $obj[0] ?>" modulo="tareaproduccione"><i class="material-icons">edit</i></a>
            <a class="btn-color pbtn cdel delete" id="d<?php echo $obj[0] ?>" modulo="tareaproduccione"><i class="material-icons">close</i></a>
        </td>
    </tr>


<?php }

 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>