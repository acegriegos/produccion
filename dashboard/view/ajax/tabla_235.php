<?php 
    foreach ($transaccion as $obj) { ?>

<tr>
    <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[0]; ?></td>
    <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[4]; ?></td>
    <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[1]; ?></td>
    <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[2]; ?></td>
    <td style="border-radius: 0px !important; text-align: center"><?php echo $obj[3]; ?></td>
</tr>

<?php    }
 ?>
<tr class="hide"><td colspan="5" id="leyend"><?php echo $obj[5]; ?></td></tr>
 <script type="text/javascript">
     $(function(){
        $("#leyenda").html($("#leyend").html())

    });
 </script>