<?php
    foreach ($transaccion as $obj) {
?>

 <tr>
    <td><?php echo $obj[1] ?></td>
    <td><?php echo $obj[2] ?></td>
    <td style="width: 20%">
       <a class="pbtn btn-color material-icons addserv blueh modal-trigger" id="a{$VP[LE][0]}" href="#modal-assignservices">info_outline</a>
        <i class="pbtn btn-color material-icons load" id="m{$VP[LE][0]}" modulo="variablesproduccione">edit</i>
        <?php if ($obj[0] != 1 && $obj[0] != 2 && $obj[0] != 3) { ?>
        <i class="pbtn btn-color cdel material-icons delete" id="d{$VP[LE][0]}" modulo="variablesproduccione">close</i>
        <?php } ?>
    </td>
</tr>

<?php } ?>

 <script type="text/javascript">
    $(function(){
        permisos(310,311);
    })
 </script>