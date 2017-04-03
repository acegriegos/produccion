<?php 
    foreach ($transaccion as $obj) {
?>

<tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[3] ?></td>
    <td><?php echo $obj[4] ?></td>
    <td><?php echo $obj[6] ?></td>
    <td>
        <a class="material-icons btn-color pbtn assigndesc" href="#modal-assgndsct" id="a<?php echo $obj[0] ?>" title="Asignar Descuento" style="margin-left: 15px">playlist_add</a>
        <a class="material-icons btn-color pbtn" id="b<?php echo $obj[0] ?>" style="margin-left: 15px">star_border</a>
    </td>
</tr>

<?php }


 ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>