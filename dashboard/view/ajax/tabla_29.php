<?php foreach ($transaccion as $obj) {
    ?>

    <tr id="f<?php echo $obj[0] ?>">
        <td  style=" padding: 10px;color:black"><?php echo $obj[1] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[2] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[18] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[4] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[5] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[6] ?></td>
        <td  style=" padding: 10px;color:black">
        <?php if ($obj[13] != 1 ) {?>
           <a href="modal-contactos" class="hide" style="color:black" title="Contactos"><i class="contact material-icons pbtn" id="c<?php echo $obj[0]; ?>">contact_phone</i></a>
           
           <?php } ?>

           <a href="#modal-clientes" class="load material-icons pbtn per1002" id="m<?php echo $obj[0]; ?>" modulo="cliente" style="color:black">edit</a>

           <a href="#" class="delete material-icons pbtn per1003" modulo="cliente" id="d<?php echo $obj[0]; ?>" style="color:black">delete</a>
       </td>
   </tr>

   <?php } ?>