<?php foreach ($transaccion as $obj) {
    ?>

    <tr id="f<?php echo $obj[0] ?>">
        <td  style=" padding: 10px;color:black"><?php echo $obj[1] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo substr($obj[2], 0,20).'...'; ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[4] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[5] ?></td>
        <td  style=" padding: 10px;color:black"><?php echo $obj[6] || $obj[7] > 0 ? $obj[8].number_format($obj[7],2) : 'Contado'; ?></td>
        <td  style=" padding: 10px;color:black">
          
          <a href="#modal-addvehiculos" class="modal-trigger hide" style="color:black" title="Vehiculos"><i class="car mdi mdi-car pbtn mdi-24px" id="v<?php echo $obj[0]; ?>"></i></a>

          <a href="#modal-mascotas" class="modal-trigger hide" style="color:black" title="Mascotas"><i class="dog mdi mdi-dog-side pbtn mdi-24px" id="z<?php echo $obj[0]; ?>"></i></a>

          <a href="#modal-agenda" class="modal-trigger hide" style="color:black" title="Agenda"><i class="agenda mdi mdi-calendar pbtn mdi-24px" id="y<?php echo $obj[0]; ?>"></i></a>

          <a href="#modal-servicios" class="modal-trigger hide" style="color:black" title="Servicios"><i class="service mdi mdi-account-details pbtn mdi-24px" id="z<?php echo $obj[0]; ?>"></i></a>

            <?php if ($obj[13] != 1 ) {?>
           <a href="modal-contactos" class="hide modal-trigger" style="color:black" title="Contactos"><i class="contact material-icons pbtn" id="c<?php echo $obj[0]; ?>">contact_phone</i></a>
           
           <?php } ?>

          <?php if($obj[7] > 0){ ?>
            <a href="#" class="" style="color:black" title="Estado de Cuenta"><i class="stado mdi mdi-currency-usd-circle-outline pbtn mdi-24px" id="w<?php echo $obj[0]; ?>"></i></a>
          <?php } ?>

           <a href="#modal-clientes" class="load mdi-pencil mdi mdi-24px pbtn per1002 modal-trigger" id="m<?php echo $obj[0]; ?>" modulo="cliente" style="color:black"></a>

           <a href="#" class="delete mdi-close mdi mdi-24px pbtn per1003" modulo="cliente" id="d<?php echo $obj[0]; ?>" style="color:black"></a>
       </td>
   </tr>

   <?php } ?>